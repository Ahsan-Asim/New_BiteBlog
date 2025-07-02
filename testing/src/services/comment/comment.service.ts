// src/services/comment/comment.service.ts
import axios from "axios"
import type { Comment } from "../../types/Comment"

const ROOT_PATH = "http://localhost:3000/comments"

export default class CommentService {
	static getCommentsByBlogId = (blogId: number, token: string) =>
		axios.get<Comment[]>(`${ROOT_PATH}/blog/${blogId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

	static addComment = (blogId: number, content: string, token: string) =>
		axios.post(
			"http://localhost:3000/comments",
			{ blogId, content },
			{ headers: { Authorization: `Bearer ${token}` } },
		)

	static addReply = (blogId: number, content: string, parentId: number, token: string) =>
		axios.post(
			"http://localhost:3000/comments",
			{ blogId, content, parentId },
			{ headers: { Authorization: `Bearer ${token}` } },
		)
}
