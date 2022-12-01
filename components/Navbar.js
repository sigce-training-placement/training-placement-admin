import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/auth'
import Button from './Button'

const Navbar = () => {
	const { logOut, userData, user } = useUserAuth()

	const ADMIN_ROUTES = [
		{
			label: 'Dashboard',
			url: '/admin/'
		},
		{
			label: 'Students',
			url: '/admin/student'
		},
		{
			label: 'Company',
			url: '/admin/company'
		},
		{
			label: 'Drive',
			url: '/admin/drives'
		},
		{
			label: 'Training',
			url: '/admin/training'
		},
	]
	return (
		<>
			<nav className='bg-white fixed top-0 left-0 h-screen py-5 px-3 shadow-xl w-2/12 flex flex-col items-center z-0'>
				{/* <img src="/assets/sigce.png" className='h-12 mr-20' alt="" /> */}
				{
					ADMIN_ROUTES.map((route) => {
						return <Link key={route.url} href={route.url}><p>{route.label}</p></Link>
					})
				}
				<Button text={"Logout"} handler={logOut} />
			</nav>
		</>
	)
}

export default Navbar