import * as Yup from "yup"

export const registerInitialValues = {
	userId: "",
	userName: "",
	userPassword: "",
}

export const registerSchema = Yup.object().shape({
	userId: Yup.string().required("User ID is required"),
	userName: Yup.string().required("Username is required"),
	userPassword: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})
