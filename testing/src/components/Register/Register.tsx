import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerInitialValues, registerSchema } from "../../Schema/Register/RegisterSchema"
import FormInput from "../common/FormInput"
import FormInputPassword from "../common/FormInputPassword"
import AuthService from "../../services/auth"
import { loginSchema } from "../../Schema/Login/LoginSchema"
import { useNavigate } from "react-router-dom"

const Register: React.FC = () => {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: registerInitialValues,
		resolver: yupResolver(registerSchema),
	})

	const onSubmit = async (data: typeof registerInitialValues) => {
		try {
			await AuthService.register(data)
			alert("Registration successful!")
			reset()
			navigate("/login")
		} catch (error: any) {
			alert(error?.response?.data?.message || "Registration failed")
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
			<div className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
				<h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<FormInput
						name="userId"
						label="User ID"
						placeholder="Enter your ID"
						register={register}
						errors={errors}
					/>
					<FormInput
						name="userName"
						label="Username"
						placeholder="Choose a username"
						register={register}
						errors={errors}
					/>
					<FormInputPassword name="userPassword" label="Password" register={register} errors={errors} />
					<button
						type="submit"
						className="mt-4 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-3 rounded-md"
					>
						Sign Up
					</button>
				</form>
				<p className="mt-6 text-sm text-center text-gray-400">
					Already have an account?{" "}
					<a href="/login" className="text-orange-400 hover:underline">
						Login
					</a>
				</p>
			</div>
		</div>
	)
}

export default Register
