import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import AuthService from "../../services/auth"
import { blogService } from "../../services/blog"
import { commentService } from "../../services/comment"

interface Blog {
	id: number
	title: string
	body: string
	author: { userName: string }
}

interface Comment {
	id: number
	content: string
	author: { userName: string }
	parent?: Comment | null
	children?: Comment[]
}

import { jwtDecode } from "jwt-decode"

interface JwtPayload {
	sub: number
	userName: string
	iat: number
	exp: number
}

function ShowBlog() {
	const { id } = useParams()
	const navigate = useNavigate()

	const [blog, setBlog] = useState<Blog | null>(null)
	const [comments, setComments] = useState<Comment[]>([])
	const [newComment, setNewComment] = useState("")
	const [token, setToken] = useState<string | null>(null)

	useEffect(() => {
		const storedToken = AuthService.getAuthToken()
		if (storedToken) setToken(storedToken)

		if (id) {
			fetchBlog(id, storedToken)
			if (storedToken) fetchComments(id, storedToken)
		}
	}, [id])

	const fetchBlog = async (blogId: string, token?: string | null) => {
		try {
			const res = await blogService.getBlogById(blogId, token || "")
			setBlog(res.data)
		} catch {
			navigate("/not-found")
		}
	}

	const fetchComments = async (blogId: number, token: string) => {
		try {
			const res = await commentService.getCommentsByBlogId(blogId, token)
			setComments(res.data)
		} catch (err) {
			console.error("Failed to fetch comments:", err)
		}
	}

	const handleAddComment = async () => {
		if (!newComment.trim() || !token || !id) return
		try {
			const res = await commentService.addComment(parseInt(id), newComment.trim(), token)
			const decoded = jwtDecode<JwtPayload>(token)
			const commentWithAuthor: Comment = {
				...res.data,
				author: { userName: decoded.userName },
			}
			setComments(prev => [commentWithAuthor, ...prev])
			setNewComment("")
		} catch (err) {
			console.error("Failed to add comment:", err)
		}
	}

	const handleAddReply = async (content: string, parentId: number) => {
		if (!content.trim() || !token || !id) return
		try {
			await commentService.addReply(parseInt(id), content.trim(), parentId, token)
			fetchComments(id, token)
		} catch (err) {
			console.error("Failed to add reply:", err)
		}
	}

	function buildCommentTree(flat: Comment[]): Comment[] {
		const map = new Map<number, Comment & { children: Comment[] }>()
		const roots: Comment[] = []
		flat.forEach(c => map.set(c.id, { ...c, children: [] }))
		map.forEach(c => {
			if (c.parent?.id) map.get(c.parent.id)?.children?.push(c)
			else roots.push(c)
		})
		return roots
	}

	function CommentItem({ comment }: { comment: Comment }) {
		const [showReply, setShowReply] = useState(false)
		const [replyText, setReplyText] = useState("")

		return (
			<div className="ml-4 mt-4">
				<p className="text-gray-900 dark:text-white font-semibold">
					{comment.author?.userName || "Unknown Author"}
				</p>
				<p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
				<button
					onClick={() => setShowReply(!showReply)}
					className="text-sm text-orange-600 float-right hover:underline"
				>
					Reply
				</button>
				{showReply && (
					<div className="mt-2">
						<input
							type="text"
							className="w-full px-3 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
							placeholder="Write a reply..."
							value={replyText}
							onChange={e => setReplyText(e.target.value)}
						/>
						<button
							onClick={() => handleAddReply(replyText, comment.id)}
							className="mt-1 bg-orange-500 hover:bg-orange-600 text-white text-sm py-1 px-4 rounded"
						>
							Reply
						</button>
					</div>
				)}
				{comment.children?.map(child => (
					<CommentItem key={child.id} comment={child} />
				))}
			</div>
		)
	}

	return (
		<main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
			<div className="flex justify-center px-4 mx-auto max-w-screen-xl">
				<article className="w-full max-w-4xl px-4 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
					{blog ? (
						<>
							<header className="mb-4">
								<h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{blog.title}</h1>
								<p className="text-sm text-gray-500 dark:text-gray-400">By {blog.author.userName}</p>
							</header>
							<p className="text-lg text-gray-800 dark:text-gray-300 mb-8">{blog.body}</p>
							<section className="mt-10">
								<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Comments</h2>
								{token ? (
									<>
										<div className="mb-6">
											<input
												type="text"
												className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
												placeholder="Write your comment..."
												value={newComment}
												onChange={e => setNewComment(e.target.value)}
											/>
											<button
												className="mt-3 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-2 px-6 rounded-md"
												onClick={handleAddComment}
											>
												Add Comment
											</button>
										</div>
										{comments.length > 0 ? (
											<ul className="space-y-4">
												{buildCommentTree(comments).map(comment => (
													<CommentItem key={comment.id} comment={comment} />
												))}
											</ul>
										) : (
											<p className="text-gray-600 dark:text-gray-400">No comments yet.</p>
										)}
									</>
								) : (
									<a href="/login" className="text-red-600 font-medium">
										Kindly login to view and add comments.
									</a>
								)}
							</section>
						</>
					) : (
						<p className="text-gray-500">Loading...</p>
					)}
				</article>
			</div>
		</main>
	)
}

export default ShowBlog
