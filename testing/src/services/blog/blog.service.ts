// src/services/blog/blog.service.ts
import api from "../../config/api"
import type { Blog } from "../../types/Blog"

const ROOT_PATH = "/blog"

export default class BlogService {
	static getPublicBlogs = () => api.get<Blog[]>(`${ROOT_PATH}/public`)

	static getBlogsByUserId = (userId: number, token: string) => {
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`
		return api.get(`${ROOT_PATH}/user-id/${userId}`)
	}

	static createBlog = (data: { title: string; body: string; isPublic: boolean; userId: number }, token: string) => {
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`
		return api.post(`${ROOT_PATH}/create`, data)
	}

	static getBlogById = (id: string, token: string) => {
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`
		return api.get(`${ROOT_PATH}/${id}`)
	}
}
