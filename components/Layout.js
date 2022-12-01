import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useUserAuth } from '../context/auth';
import PageHead from './PageHead';

const Layout = ({ children, className, title }) => {
	const { userData, logOut } = useUserAuth()

	return (
		<>
			<PageHead title={title} />
			<div className={'h-full min-h-screen bg-color w-10/12 absolute top-0 position-right ' + className}>
				{children}
			</div>
		</>
	)
}

export default Layout