import React from "react"
import type { FieldError, UseFormRegister, FieldErrors } from "react-hook-form"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	register: UseFormRegister<any>
	name: string
	label?: string
	errors?: FieldErrors
	containerClass?: string
	errorClass?: string
	loading?: boolean
}

const FormInput: React.FC<Props> = ({
	register,
	name,
	label,
	errors = {},
	containerClass = "",
	errorClass = "",
	loading,
	...rest
}) => {
	const error = errors[name] as FieldError | undefined

	return (
		<div className={`flex flex-col ${containerClass}`}>
			{label && <label className="mb-1 font-medium text-white">{label}</label>}
			<input
				{...register(name)}
				{...rest}
				disabled={loading || rest.disabled}
				className={`p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 ${rest.className}`}
			/>
			{error && <p className={`mt-1 text-sm text-red-400 ${errorClass}`}>{error.message}</p>}
		</div>
	)
}

export default FormInput
