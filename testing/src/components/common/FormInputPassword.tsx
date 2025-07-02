import React, { useState } from "react"
import FormInput from "./FormInput"
import type { FieldErrors, UseFormRegister } from "react-hook-form"

interface Props {
	register: UseFormRegister<any>
	name: string
	label?: string
	errors?: FieldErrors
	containerClass?: string
	errorClass?: string
	loading?: boolean
}

const FormInputPassword: React.FC<Props> = ({ register, name, label, errors, containerClass, errorClass, loading }) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className={`relative ${containerClass}`}>
			<FormInput
				type={showPassword ? "text" : "password"}
				register={register}
				name={name}
				label={label}
				errors={errors}
				loading={loading}
				errorClass={errorClass}
			/>
			<span
				className="absolute right-4 top-[42px] cursor-pointer text-sm text-white"
				onClick={() => setShowPassword(prev => !prev)}
			>
				{showPassword ? "🙈 Hide" : "👁 Show"}
			</span>
		</div>
	)
}

export default FormInputPassword
