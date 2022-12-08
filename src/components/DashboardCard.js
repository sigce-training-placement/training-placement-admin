import React from 'react'

const DashboardCard = ({number, text, link}) => {
	return (
		<div className='h-52 w-52 rounded-lg shadow-lg bg-white flex items-center flex-col justify-center'>
			<h1 className='text-4xl font-bold'>{number}</h1>
			<p className='mt-1 text-lg font-medium'>{text}</p>
		</div>
	)
}

export default DashboardCard