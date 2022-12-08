import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { useUserAuth } from '../context/auth'
import Button from './Button'

const Navbar = () => {
	// const { logOut, userData, user } = useUserAuth()

	const ADMIN_ROUTES = [
		{
			label: 'Dashboard',
			url: '/admin/'
		},
		{
			label: 'Students',
			url: '/student'
		},
		{
			label: 'Company',
			url: '/company'
		},
		{
			label: 'Drive',
			url: '/drive'
		},
		{
			label: 'Training',
			url: '/training'
		},
	]
	return (
		<>
			<nav className='bg-white fixed top-0 left-0 h-screen py-5 px-3 shadow-xl w-2/12 flex flex-col items-center z-0'>
				{/* <img src="/assets/sigce.png" className='h-12 mr-20' alt="" /> */}
				{
					ADMIN_ROUTES.map((route) => {
						return <Link className='text-red-300' key={route.url} to={route.url}><p>{route.label}</p></Link>
					})
				}
				{/* <Button text={"Logout"} handler={logOut} /> */}
			</nav>
		</>
	)
}

export default Navbar