import * as Yup from "yup"

export const blogInitialValues = {
	title: "",
	body: "",
	isPublic: true,
}

export const blogSchema = Yup.object().shape({
	title: Yup.string().required("Title is required").trim(),
	body: Yup.string().required("Body is required").trim(),
	isPublic: Yup.boolean().required(),
})
