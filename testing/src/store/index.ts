import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "./slices/blog.slice"

export const store = configureStore({
	reducer: {
		blogs: blogReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
