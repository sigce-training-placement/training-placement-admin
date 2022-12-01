import React from 'react'
import Select from 'react-select';

const CustomSelect = ({ label, disabled, handleChange, id, options, defaultValue = "" }) => {
	return (
		<div className={'flex flex-col '}>
			<label className=' mb-1 font-semibold cursor-pointer'>{label}: </label>
			<Select
				className={'Montserrat read-only:cursor-pointer disabled:cursor-not-allowed focus:border-indigo-500 duration-300 border-2 rounded-lg outline-none py-[5px] h-fit focus:bg-indigo-50'}
				isDisabled={disabled}
				isLoading={false}
				isClearable={false}
				onChange={handleChange}
				isSearchable={true}
				name={id}
				id={id}
				defaultValue={defaultValue}
				options={options}
			/>
		</div>
	)
}

export default CustomSelect