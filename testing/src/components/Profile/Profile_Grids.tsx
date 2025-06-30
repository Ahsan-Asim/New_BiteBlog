import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { type Blog } from "../../types/Blog"
import { type Comment } from "../../types/Comment"
import Profile_Main from "./Profile_Main"
import { useNavigate } from "react-router-dom" // ✅ added

interface JwtPayload {
	sub: number
	userName: string
	iat: number
	exp: number
}

function Profile_Grids() {
	const [blogs, setBlogs] = useState<Blog[]>([])
	const [comments, setComments] = useState<{ [key: number]: Comment[] }>({})
	const [token, setToken] = useState<string | null>(null)
	const [userId, setUserId] = useState<number | null>(null)
	const navigate = useNavigate() // ✅ added

	useEffect(() => {
		const storedToken = localStorage.getItem("token")
		if (!storedToken) return

		setToken(storedToken)
		const decoded = jwtDecode<JwtPayload>(storedToken)
		setUserId(decoded.sub)

		fetchUserBlogs(decoded.sub, storedToken)
	}, [])

	const fetchUserBlogs = (id: number, token: string) => {
		axios
			.get(`http://localhost:3000/blog/user-id/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				console.log(res)
				setBlogs(res.data)
			})
			.catch(err => console.error(err))
	}

	const fetchComments = async (blogId: number) => {
		if (!token) return
		try {
			const res = await axios.get(`http://localhost:3000/comments/blog/${blogId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setComments(prev => ({ ...prev, [blogId]: res.data }))
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div>
			<div className="bg-gray-50 dark:bg-gray-900 px-4 md:px-12 py-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{blogs.map(blog => (
						<div
							key={blog.id}
							onClick={() => navigate(`/blog/${blog.id}`)} // ✅ click to open blog
							className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer"
						>
							<h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{blog.title}</h3>
							<p className="text-gray-700 dark:text-gray-300 mb-4">{blog.body}</p>
							<small className="text-sm text-gray-500">Author: {blog.author.userName}</small>
							<div className="mt-4">
								<button
									onClick={e => {
										e.stopPropagation() // ✅ prevent navigation when clicking the button
										fetchComments(blog.id)
									}}
									className="text-blue-600 hover:underline"
								>
									Show Comments
								</button>
							</div>

							{comments[blog.id] && (
								<ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
									{comments[blog.id].map(comment => (
										<li key={comment.id}>
											<span className="font-medium">{comment.author.userName}:</span>{" "}
											{comment.content}
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Profile_Grids
