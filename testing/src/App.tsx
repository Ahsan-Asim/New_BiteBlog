// src/App.tsx
import "./App.css"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import LandingPage from "./pages/Landing_Page"
import Header from "./components/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing_Card from "./components/Landing_Card"
import Footer from "./components/Footer"
import ShowBlog from "./components/Show_Blog"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/" element={<LandingPage />} />
				<Route path="header" element={<Header />} />

				<Route path="card" element={<Landing_Card />} />
				<Route path="/footer" element={<Footer />} />
				<Route path="/blog/:id" element={<ShowBlog />} />
				{/* Add more routes here if needed */}
			</Routes>
		</Router>
	)
}

export default App
