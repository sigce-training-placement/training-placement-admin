import React, { useState } from 'react'

export default function Input({ labelClass, textarea=false, parentClass, disabled = false, label, type = "text", value, changeHandler, placeholder, id, className, readOnly, accept }) {
	return (
		<fieldset disabled={disabled} className={parentClass}>
			{
				textarea ?
					<div className={'flex flex-col ' + className}>
						<label htmlFor={id} className={' mb-1 font-semibold cursor-pointer ' + labelClass}>{label}: </label>
						<textarea name={id} readOnly={readOnly} id={id} className={'h-48 resize-none Montserrat read-only:cursor-pointer disabled:cursor-not-allowed focus:border-indigo-500 duration-300 border-2 rounded-lg outline-none px-4 py-3 focus:bg-indigo-50'} type={type} value={value} onChange={changeHandler} placeholder={placeholder} ></textarea>
					</div> :
					<div className={'flex flex-col ' + className}>
						<label htmlFor={id} className={' mb-1 font-semibold cursor-pointer ' + labelClass}>{label}: </label>
						{type !== "file" ? <input name={id} readOnly={readOnly} id={id} className={'Montserrat read-only:cursor-pointer disabled:cursor-not-allowed focus:border-indigo-500 duration-300 border-2 rounded-lg outline-none px-4 py-3 focus:bg-indigo-50'} type={type} value={value} onChange={changeHandler} placeholder={placeholder} />
							: <input accept={accept} name={id} readOnly={readOnly} id={id} className={'Montserrat read-only:cursor-pointer disabled:cursor-not-allowed focus:border-indigo-500 duration-300 border-2 rounded-lg outline-none px-4 py-3 focus:bg-indigo-50'} type={type} onChange={changeHandler} placeholder={placeholder} />}
					</div>
			}
		</fieldset>
	)
}
