// import { useEffect, useState } from "react"
// import { jwtDecode } from "jwt-decode"
// import axios from "axios"
// import { type Blog } from "../../types/Blog"
// import { type Comment } from "../../types/Comment"
// import { useNavigate } from "react-router-dom" // ✅ added
// import AuthService from "../../services/auth"
// import { blogService } from "../../services/blog"
// import { commentService } from "../../services/comment"

// interface JwtPayload {
// 	sub: number
// 	userName: string
// 	iat: number
// 	exp: number
// }

// function Profile_Grids() {
// 	const [blogs, setBlogs] = useState<Blog[]>([])
// 	const [comments, setComments] = useState<{ [key: number]: Comment[] }>({})
// 	const [token, setToken] = useState<string | null>(null)
// 	const [userId, setUserId] = useState<number | null>(null)
// 	const navigate = useNavigate()

// 	useEffect(() => {
// 		const storedToken = AuthService.getAuthToken()
// 		if (!storedToken) return

// 		setToken(storedToken)
// 		const decoded = jwtDecode<JwtPayload>(storedToken)
// 		setUserId(decoded.sub)

// 		fetchUserBlogs(decoded.sub, storedToken)
// 	}, [])

// 	const fetchUserBlogs = async (id: number, token: string) => {
// 		try {
// 			const res = await blogService.getBlogsByUserId(id, token)
// 			setBlogs(res.data)
// 		} catch (err) {
// 			console.error("Failed to fetch blogs:", err)
// 		}
// 	}

// 	const fetchComments = async (blogId: number) => {
// 		if (!token) return
// 		try {
// 			const res = await commentService.getCommentsByBlogId(blogId, token)
// 			setComments(prev => ({ ...prev, [blogId]: res.data }))
// 		} catch (err) {
// 			console.error("Failed to fetch comments:", err)
// 		}
// 	}

// 	return (
// 		<div>
// 			<div className="bg-gray-50 dark:bg-gray-900 px-4 md:px-12 py-10">
// 				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// 					{blogs.map(blog => (
// 						<div
// 							key={blog.id}
// 							onClick={() => navigate(`/blog/${blog.id}`)} // ✅ click to open blog
// 							className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer"
// 						>
// 							<h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{blog.title}</h3>
// 							<p className="text-gray-700 dark:text-gray-300 mb-4">{blog.body}</p>
// 							<small className="text-sm text-gray-500">Author: {blog.author.userName}</small>
// 							<div className="mt-4">
// 								<button
// 									onClick={e => {
// 										e.stopPropagation() // ✅ prevent navigation when clicking the button
// 										fetchComments(blog.id)
// 									}}
// 									className="text-blue-600 hover:underline"
// 								>
// 									Show Comments
// 								</button>
// 							</div>

// 							{comments[blog.id] && (
// 								<ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
// 									{comments[blog.id].map(comment => (
// 										<li key={comment.id}>
// 											<span className="font-medium">{comment.author.userName}:</span>{" "}
// 											{comment.content}
// 										</li>
// 									))}
// 								</ul>
// 							)}
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default Profile_Grids

import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchBlogsByUserId, selectUserBlogs } from "../../store/slices/blog.slice"
import type { JwtPayload } from "../../types/Jwt"
import { type Comment } from "../../types/Comment"
import AuthService from "../../services/auth"
import { commentService } from "../../services/comment"
import type { AppDispatch } from "../../store/index"
import { useState } from "react"
import { blogService } from "../../services/blog"

function Profile_Grids() {
	const dispatch = useDispatch<AppDispatch>()
	const blogs = useSelector(selectUserBlogs)
	const [comments, setComments] = useState<{ [key: number]: Comment[] }>({})
	const navigate = useNavigate()

	useEffect(() => {
		const token = AuthService.getAuthToken()
		if (token) {
			const decoded = jwtDecode<JwtPayload>(token)
			dispatch(fetchBlogsByUserId({ userId: decoded.sub, token }))
		}
	}, [dispatch])

	const fetchComments = async (blogId: number) => {
		const token = AuthService.getAuthToken()
		if (!token) return
		try {
			const res = await commentService.getCommentsByBlogId(blogId, token)
			setComments(prev => ({ ...prev, [blogId]: res.data }))
		} catch (err) {
			console.error("Failed to fetch comments:", err)
		}
	}

	return (
		<div className="bg-gray-50 dark:bg-gray-900 px-4 md:px-12 py-10">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{blogs.map(blog => (
					<div
						key={blog.id}
						onClick={() => navigate(`/blog/${blog.id}`)}
						className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer"
					>
						<h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{blog.title}</h3>
						<p className="text-gray-700 dark:text-gray-300 mb-4">{blog.body}</p>
						<small className="text-sm text-gray-500">Author: {blog.author.userName}</small>
						<div className="mt-4">
							<button
								onClick={e => {
									e.stopPropagation()
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
	)
}

export default Profile_Grids
