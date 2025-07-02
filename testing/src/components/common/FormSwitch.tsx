import React from "react"
import type { UseFormRegister } from "react-hook-form"

interface Props {
	label: string
	name: string
	register: UseFormRegister<any>
	defaultChecked?: boolean
}

const FormSwitch: React.FC<Props> = ({ label, name, register, defaultChecked = false }) => {
	return (
		<div className="flex items-center justify-between">
			<span className="text-gray-700 dark:text-gray-200 font-medium">{label}</span>
			<label className="inline-flex items-center cursor-pointer relative">
				<input type="checkbox" {...register(name)} defaultChecked={defaultChecked} className="sr-only peer" />
				<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500" />
			</label>
		</div>
	)
}

export default FormSwitch
