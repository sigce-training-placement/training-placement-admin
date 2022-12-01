import Spinner from './Spinner'
import React from 'react'

const Button = ({ disabled, text, loading, handler, type = 'button', className }) => {
	return (
		<button className={'flex justify-center items-center disabled:bg-indigo-300 text-white font-bold bg-indigo-600 hover:bg-indigo-500 duration-300 px-3 py-2 rounded-lg ' + className} onClick={handler} disabled={loading || disabled} type={type} > {loading ? <Spinner /> : text}</button >
	)
}

export default Button