// src/services/auth/auth.service.ts
import axios from "axios"

const ROOT_PATH = "http://localhost:3000/auth"

export default class AuthService {
	static login = (credentials: { userName: string; userPassword: string }) =>
		axios.post(`${ROOT_PATH}/login`, credentials)

	static register = (data: { userId: string; userName: string; userPassword: string }) =>
		axios.post("http://localhost:3000/users/register", data)

	static setAuthToken = (token: string) => localStorage.setItem("token", token)
	static getAuthToken = () => localStorage.getItem("token") || ""

	static logout = () => localStorage.clear()
}
