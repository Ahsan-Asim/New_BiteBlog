import React, { useEffect, useState } from "react"
import axios from "axios"

function Profile_Main() {
	const [token, setToken] = useState<string | null>(null)
	const [userId, setUserId] = useState<number | null>(null)
	const [showForm, setShowForm] = useState(false)

	const [newBlog, setNewBlog] = useState({
		title: "",
		body: "",
		isPublic: true,
	})

	useEffect(() => {
		const storedToken = localStorage.getItem("token")
		if (storedToken) {
			setToken(storedToken)
			const decoded = JSON.parse(atob(storedToken.split(".")[1]))
			setUserId(decoded.sub)
		}
	}, [])

	const handleCreateBlog = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!token || !userId) return

		try {
			await axios.post(
				"http://localhost:3000/blog/create",
				{
					title: newBlog.title,
					body: newBlog.body,
					isPublic: newBlog.isPublic,
					userId,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			setNewBlog({ title: "", body: "", isPublic: true })
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
							onSubmit={handleCreateBlog}
							className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-12 max-w-2xl w-full space-y-6 transition-all duration-500"
						>
							<div>
								<label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">Title</label>
								<input
									type="text"
									placeholder="Enter blog title"
									value={newBlog.title}
									onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
									required
									className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div>
								<label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">Body</label>
								<textarea
									placeholder="Write your blog here..."
									value={newBlog.body}
									onChange={e => setNewBlog({ ...newBlog, body: e.target.value })}
									required
									className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-gray-700 dark:text-gray-200 font-medium">Make Public</span>
								<label className="inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={newBlog.isPublic}
										onChange={e => setNewBlog({ ...newBlog, isPublic: e.target.checked })}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500 relative" />
								</label>
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
