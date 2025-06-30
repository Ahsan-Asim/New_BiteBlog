import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {
	const [userName, setUserName] = useState("")
	const [userPassword, setUserPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const response = await axios.post("http://localhost:3000/auth/login", {
				userName,
				userPassword,
			})

			localStorage.setItem("token", response.data.access_token)
			alert("Login successful!")
			navigate("/profile")
		} catch (err: any) {
			setError("Invalid credentials")
			console.error(err)
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
			<div className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
				<h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
				<form onSubmit={handleLogin} className="flex flex-col">
					<label className="mb-1 font-medium text-white">Username</label>
					<input
						type="text"
						placeholder="Enter your username"
						value={userName}
						onChange={e => setUserName(e.target.value)}
						required
						className="p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
					/>

					<label className="mt-4 mb-1 font-medium">Password</label>
					<input
						type="password"
						placeholder="Enter your password"
						value={userPassword}
						onChange={e => setUserPassword(e.target.value)}
						required
						className="p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
					/>

					<button
						type="submit"
						className="mt-6 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-3 rounded-md"
					>
						Login
					</button>

					{error && <p className="mt-4 text-center text-red-400">{error}</p>}
				</form>

				<p className="mt-6 text-sm text-center text-gray-400">
					Don't have an account?{" "}
					<a href="/register" className="text-orange-400 hover:underline">
						Register
					</a>
				</p>
			</div>
		</div>
	)
}

export default Login
