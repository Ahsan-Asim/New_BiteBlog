import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom"

import FormInput from "../common/FormInput"
import FormInputPassword from "../common/FormInputPassword"
import AuthService from "../../services/auth"
import { loginSchema } from "../../Schema/Login/LoginSchema"

interface LoginFormValues {
	userName: string
	userPassword: string
}

const Login: React.FC = () => {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormValues>({
		defaultValues: {
			userName: "",
			userPassword: "",
		},
		resolver: yupResolver(loginSchema),
	})

	const onSubmit = async (data: LoginFormValues) => {
		try {
			const response = await AuthService.login(data)
			AuthService.setAuthToken(response.data.access_token)
			alert("Login successful!")
			navigate("/profile")
		} catch (err) {
			alert("Invalid credentials")
			console.error(err)
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
			<div className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
				<h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<FormInput register={register} errors={errors} name="userName" label="Username" type="text" />

					<FormInputPassword register={register} errors={errors} name="userPassword" label="Password" />

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full mt-4 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-3 rounded-md"
					>
						{isSubmitting ? "Logging in..." : "Login"}
					</button>
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
