import React from 'react'

const Alert = ({ message }) => {
	return (
		<div className='flex justify-center'>
			<div className={message.length != 0 ? 'z-50 text-center bg-white shadow-xl rounded-lg border h-10 px-10 py-6 font-semibold text-lg flex items-center top-16 duration-300 fixed origin-center' : 'font-semibold z-50 -top-10 duration-300 fixed bg-white shadow-lg rounded-lg border h-10 origin-center flex items-center'}>{message}</div>
		</div>
	)
}

export default Alert