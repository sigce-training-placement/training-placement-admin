import React from 'react'
import Spinner from './Spinner'

const Loading = () => {
	return (
		<>
			<div className='h-screen w-screen bg-black bg-opacity-50 fixed top-0 left-0 z-[2000] backdrop-blur-sm flex items-center justify-center'>
				<Spinner scale={70}/>
			</div>
		</>
	)
}

export default Loading