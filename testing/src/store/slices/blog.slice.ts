// src/store/slices/blog.slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { blogService } from "../../services/blog"
import type { Blog } from "../../types/Blog"
import type { RootState } from "../index"

interface BlogState {
	blogs: Blog[]
	loading: boolean
	error: string | null
}

const initialState: BlogState = {
	blogs: [],
	loading: false,
	error: null,
}

export const fetchBlogsByUserId = createAsyncThunk(
	"blogs/fetchByUserId",
	async ({ userId, token }: { userId: number; token: string }, thunkAPI) => {
		try {
			const res = await blogService.getBlogsByUserId(userId, token)
			return res.data
		} catch (err: any) {
			return thunkAPI.rejectWithValue("Failed to fetch blogs")
		}
	},
)

const blogSlice = createSlice({
	name: "blogs",
	initialState,
	reducers: {
		clearBlogs: state => {
			state.blogs = []
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchBlogsByUserId.pending, state => {
				state.loading = true
			})
			.addCase(fetchBlogsByUserId.fulfilled, (state, action) => {
				state.loading = false
				state.blogs = action.payload
			})
			.addCase(fetchBlogsByUserId.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	},
})

export const { clearBlogs } = blogSlice.actions
export default blogSlice.reducer

// Selectors
export const selectUserBlogs = (state: RootState) => state.blogs.blogs
export const selectBlogsLoading = (state: RootState) => state.blogs.loading
