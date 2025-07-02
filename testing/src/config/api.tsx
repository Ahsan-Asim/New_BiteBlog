// src/config/api.ts
import axios from "axios"
import type { AxiosResponse, AxiosError } from "axios"
import { toast } from "react-toastify"

const api = axios.create({
	baseURL: "http://localhost:3000",
})

api.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.data.successMessage) {
			toast.success(response.data.successMessage)
		}
		if (response.data.warningMessage) {
			toast.warn(response.data.warningMessage)
		}
		return response
	},
	(error: AxiosError<any>) => {
		const message = error?.response?.data?.message || "Something went wrong"
		toast.error(Array.isArray(message) ? message.join(", ") : message)
		return Promise.reject(error)
	},
)

export const setAuthToken = (token: string) => {
	api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export default api
