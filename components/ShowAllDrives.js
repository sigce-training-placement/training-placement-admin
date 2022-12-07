import Link from 'next/link'
import React from 'react'
import { IoClose } from 'react-icons/io5'

const ShowAllDrives = ({ data, setShowModal, showModal }) => {
	return (
		<>
			<div className={showModal ? 'h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-60 z-[3000] opacity-100 duration-500' : 'h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-60 z-[3000] duration-500 opacity-0 pointer-events-none'}></div>
			<div className={showModal ? 'p-10 rounded-lg shadow-xl h-[90vh] w-[92vw] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3001] opacity-100 duration-500' : 'p-10 rounded-lg shadow-xl h-[90vh] w-[92vw] bg-white fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3001] pointer-events-none opacity-0 duration-500'}>
				<button className='absolute top-5 right-5 p-2 bg-gray-100 duration-300 hover:bg-gray-300 h-8 w-8 rounded-lg flex items-center justify-center' onClick={() => { setShowModal(false) }}><IoClose /></button>
				<h1 className='text-center text-3xl font-bold'>All drives</h1>
				<div className='grid grid-cols-1 gap-y-2 mt-6'>
					{
						data && data.map((drive, index) => {
							let tint = drive && drive.active ? "bg-green-500" : "bg-red-500"
							return <Link href={`/admin/drives/${drive.id}`} className='shadow-lg w-full bg-gray-50 rounded-lg p-6 relative'>
								<div className={'absolute top-4 right-6 animate-ping  h-3 w-3 rounded-full ' + tint}></div>
								<div className={'absolute top-4 right-6 h-3 w-3 rounded-full ' + tint}></div>
								<h2 className='text-lg font-bold flex'>{index + 1 <= 9 ? `0${index + 1}` : index + 1}. {drive.drivename} <p className='ml-3 text-sm font-semibold text-gray-600 mt-1'>{drive && drive.jobPost}</p></h2>
								<div className='flex'>
									<p className='text-sm font-semibold text-gray-600 mt-1'>Date: {drive && drive.dateofdrive}</p>
								</div>
							</Link>
						})
					}
				</div>
				<div></div>
			</div>
		</>
	)
}

export default ShowAllDrives