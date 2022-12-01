import React, { useState } from 'react'

export default function Select({ options = [], disabled = false, label, type = "text", value, changeHandler, placeholder, id, className, readOnly, selected }) {
	return (
		<fieldset disabled={disabled}>
			<div className={'flex flex-col ' + className}>
				<label htmlFor={id} className='mb-1 font-semibold cursor-pointer'>{label}: </label>
				<select name={id} readOnly={readOnly} id={id} className={'appearance-none disabled:cursor-not-allowed focus:border-indigo-500 duration-300 border-2 rounded-lg outline-none px-4 py-3 focus:bg-indigo-50'} type={type} value={value} onChange={changeHandler} placeholder={placeholder} >
					<option value="" key={options.length}>{selected}</option>
					{
						options.map((option, index) => {
							return <option value={option.value} key={option + index}>{option.label}</option>
						})
					}
				</select>
			</div>
		</fieldset>
	)
}
