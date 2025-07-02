import * as Yup from "yup"

export const loginInitialValues = {
	userName: "",
	userPassword: "",
}

export const loginSchema = Yup.object().shape({
	userName: Yup.string().required("Username is required"),
	userPassword: Yup.string().required("Password is required"),
})
