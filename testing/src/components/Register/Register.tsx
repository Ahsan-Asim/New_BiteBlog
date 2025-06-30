import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Register: React.FC = () => {
	const [formData, setFormData] = useState({
		userId: "",
		userName: "",
		userPassword: "",
	})

	const [message, setMessage] = useState("")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await axios.post("http://localhost:3000/users/register", formData)
			setMessage("✅ Registration successful!")
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setMessage(error.response?.data.message || "❌ Registration failed")
			} else {
				setMessage("❌ An unexpected error occurred")
			}
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
			<div className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
				<h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
				<form onSubmit={handleSubmit} className="flex flex-col">
					<label className="mb-1 font-medium">User ID</label>
					<input
						type="text"
						name="userId"
						value={formData.userId}
						onChange={handleChange}
						placeholder="Enter your ID"
						required
						className="p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
					/>
					<label className="mt-4 mb-1 font-medium">Username</label>
					<input
						type="text"
						name="userName"
						value={formData.userName}
						onChange={handleChange}
						placeholder="Choose a username"
						required
						className="p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
					/>
					<label className="mt-4 mb-1 font-medium">Password</label>
					<input
						type="password"
						name="userPassword"
						value={formData.userPassword}
						onChange={handleChange}
						placeholder="Enter a secure password"
						required
						className="p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
					/>
					<button
						type="submit"
						className="mt-6 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-3 rounded-md"
					>
						Sign Up
					</button>
					{message && <p className="mt-4 text-center text-sm text-orange-400">{message}</p>}
				</form>
				<p className="mt-6 text-sm text-center text-gray-400">
					Already have an account?{" "}
					<Link to="/login" className="text-orange-400 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Register
