import React from 'react'

export default function ClubCard({ data, index }) {
	return (
		<>
			<div className='border w-full shadow-lg rounded-lg p-4'>
				<h3 className='text-xl font-bold'>{index <= 9 ? `0${index + 1}` : `${index + 1}`}. {data.name}</h3>
				<p className='text-sm font-bold text-gray-600 mt-1'>Year: {data.fromyear} - {data.toyear}</p>
			</div>
		</>
	)
}
