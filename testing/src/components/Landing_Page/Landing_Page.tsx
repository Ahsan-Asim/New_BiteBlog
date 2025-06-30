import { useEffect, useState } from "react"
import axios from "axios"
import type { Blog } from "../../types/Blog"
import { useNavigate } from "react-router-dom"
// import "./LandingPage.css" // 👈 Add this new CSS file
import Header from "../Header"
import Landing_Card from "../Landing_Card"
import Footer from "../Footer"

// const LandingPage = () => {
// 	const [blogs, setBlogs] = useState<Blog[]>([])
// 	const [newComments, setNewComments] = useState<{ [key: number]: string }>({})
// 	const navigate = useNavigate()

// 	useEffect(() => {
// 		fetchBlogs()
// 	}, [])

// 	const fetchBlogs = () => {
// 		axios
// 			.get("http://localhost:3000/blog/public")
// 			.then(res => setBlogs(res.data))
// 			.catch(err => console.error("Error fetching public blogs:", err))
// 	}

// 	const handleCommentChange = (blogId: number, value: string) => {
// 		setNewComments({ ...newComments, [blogId]: value })
// 	}

// 	// const handleAddComment = async (blogId: number) => {
// 	// 	const content = newComments[blogId]
// 	// 	if (!content) return

// 	// 	try {
// 	// 		await axios.post("http://localhost:3000/comments", {
// 	// 			content,
// 	// 			blogId,
// 	// 		})

// 	// 		setNewComments({ ...newComments, [blogId]: "" })
// 	// 		fetchBlogs() // Refresh to show updated comments
// 	// 	} catch (err) {
// 	// 		console.error("Error adding comment:", err)
// 	// 		alert("You must be logged in to comment")
// 	// 	}
// 	// }

// 	return (
// 		<div style={{ padding: "2rem" }}>
// 			<div className="blog-grid">
// 				{blogs.map(blog => (
// 					<div
// 						key={blog.id}
// 						className="blog-card"
// 						onClick={() => alert("Open details or do something later!")}
// 					>
// 						<h2>{blog.title}</h2>
// 						<p>{blog.body}</p>
// 						<small>By: {blog.author.userName}</small>

// 						{/* <div className="comments">
// 							<h4>Comments:</h4>
// 							{blog.comments.length === 0 ? (
// 								<p className="no-comments">No comments yet.</p>
// 							) : (
// 								<ul>
// 									{blog.comments.map(comment => (
// 										<li key={comment.id}>
// 											<strong>{comment.content}</strong>
// 										</li>
// 									))}
// 								</ul>
// 							)}
// 						</div>

// 						<div className="comment-input">
// 							<input
// 								type="text"
// 								placeholder="Write a comment"
// 								value={newComments[blog.id] || ""}
// 								onChange={e => handleCommentChange(blog.id, e.target.value)}
// 							/>
// 							<button
// 								onClick={e => {
// 									e.stopPropagation() // prevent card click
// 									handleAddComment(blog.id)
// 								}}
// 							>
// 								Add
// 							</button>
// 						</div> */}
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	)
// }

function LandingPage() {
	return (
		<div className="dark:bg-gray-950">
			<Landing_Card />
			<Footer />
		</div>
	)
}
export default LandingPage
