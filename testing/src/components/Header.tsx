import React from "react"
import { useLocation } from "react-router-dom"

type HeaderProps = {
	showAuthButtons?: boolean
}

function Header({ showAuthButtons = true }: HeaderProps) {
	const location = useLocation()

	const isLanding = location.pathname === "/"

	const isActive = (path: string) =>
		location.pathname === path
			? "text-primary-700 dark:text-white font-semibold"
			: "text-gray-700 dark:text-gray-400 hover:text-primary-700 dark:hover:text-white"

	return (
		<header>
			<nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-900">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
					<a href="/" className="flex items-center">
						<img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
						<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
							Blogbite
						</span>
					</a>

					{/* ✅ Conditionally show Login/Register */}
					{showAuthButtons && (
						<div className="flex items-center lg:order-2">
							<a
								href="/login"
								className="text-gray-800 dark:text-white hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
							>
								Log in
							</a>
							<a
								href="/register"
								className="text-gray-800 bg-primary-700 hover:bg-gray-400 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
							>
								Get started
							</a>
						</div>
					)}

					{/* Main menu */}
					<div
						className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
						id="mobile-menu-2"
					>
						<ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
							<li>
								<a href="/" className={`block py-2 pr-4 pl-3 ${isActive("/")}`}>
									Home
								</a>
							</li>
							<li>
								<a
									href={isLanding ? "/login" : "/profile"}
									className={`block py-2 pr-4 pl-3 ${isActive("/profile")}`}
								>
									My Blogs
								</a>
							</li>
							<li>
								<a
									href={isLanding ? "/login" : "/messages"}
									className={`block py-2 pr-4 pl-3 ${isActive("/messages")}`}
								>
									Messages
								</a>
							</li>
							<li>
								<a
									href="#"
									className="block py-2 pr-4 pl-3 text-gray-700 dark:text-gray-400 hover:text-primary-700 dark:hover:text-white"
								>
									About
								</a>
							</li>
							<li>
								<a
									href="#"
									className="block py-2 pr-4 pl-3 text-gray-700 dark:text-gray-400 hover:text-primary-700 dark:hover:text-white"
								>
									Team
								</a>
							</li>
							<li>
								<a
									href="#"
									className="block py-2 pr-4 pl-3 text-gray-700 dark:text-gray-400 hover:text-primary-700 dark:hover:text-white"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header
