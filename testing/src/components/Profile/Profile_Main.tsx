import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { blogInitialValues, blogSchema } from "../../Schema/Blog/BlogSchema"
import FormInput from "../common/FormInput"
import FormTextArea from "../common/FormTextArea"
import AuthService from "../../services/auth"
import { blogService } from "../../services/blog"
import { toast } from "react-toastify"

type BlogFormValues = typeof blogInitialValues

function Profile_Main() {
	const [token, setToken] = useState<string | null>(null)
	const [userId, setUserId] = useState<number | null>(null)
	const [showForm, setShowForm] = useState(false)

	useEffect(() => {
		const storedToken = AuthService.getAuthToken()
		if (storedToken) {
			setToken(storedToken)
			const decoded = JSON.parse(atob(storedToken.split(".")[1]))
			setUserId(decoded.sub)
		}
	}, [])

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<BlogFormValues>({
		defaultValues: blogInitialValues,
		resolver: yupResolver(blogSchema),
	})

	const onSubmit = async (data: BlogFormValues) => {
		if (!token || !userId) return

		try {
			await blogService.createBlog({ ...data, userId }, token)
			// toast.success("Blog created successfully!") // optional manual toast
			reset()
			setShowForm(false)
		} catch (err) {
			console.error("Blog creation failed:", err)
		}
	}

	return (
		<div className={`bg-gray-50 dark:bg-gray-900 px-4 md:px-12 ${showForm ? "py-10" : "py-0"}`}>
			<h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Your Blogs</h2>

			<div className="mb-6">
				<button
					onClick={() => setShowForm(prev => !prev)}
					className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
				>
					{showForm ? "Cancel" : "Create Blog"}
				</button>
			</div>

			<div
				className={`transition-all duration-500 ease-in-out overflow-hidden ${
					showForm ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				{showForm && (
					<div className="flex justify-center">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-12 max-w-4xl w-full space-y-6"
						>
							<FormInput
								label="Title"
								name="title"
								register={register}
								errors={errors}
								placeholder="Enter blog title"
							/>

							<FormTextArea
								label="Body"
								name="body"
								register={register}
								errors={errors}
								placeholder="Write your blog here..."
								rows={6}
							/>

							<div className="flex items-center justify-between">
								<span className="text-gray-700 dark:text-gray-200 font-medium">Make Public</span>
								<input type="checkbox" {...register("isPublic")} className="w-5 h-5" />
							</div>

							<div className="pt-4">
								<button
									type="submit"
									className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition"
								>
									Publish Blog
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	)
}

export default Profile_Main
