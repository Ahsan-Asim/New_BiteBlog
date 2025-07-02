import React from "react"
import type { FieldError, UseFormRegister, FieldErrors } from "react-hook-form"

interface Props {
	label: string
	name: string
	register: UseFormRegister<any>
	errors?: FieldErrors
	rows?: number
	placeholder?: string
	className?: string
}

const FormTextArea: React.FC<Props> = ({ label, name, register, errors, rows = 5, placeholder, className = "" }) => {
	const error = errors?.[name] as FieldError | undefined

	return (
		<div className="flex flex-col w-full">
			<label className="text-gray-700 dark:text-gray-200 font-medium mb-1">{label}</label>
			<textarea
				{...register(name)}
				rows={rows}
				placeholder={placeholder}
				className={`p-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
			/>
			{error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
		</div>
	)
}

export default FormTextArea
