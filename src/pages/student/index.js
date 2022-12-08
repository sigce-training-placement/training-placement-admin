import axios from 'axios'
import { doc, updateDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import { useOnClickOutside } from '../../context/contextMenu'
import { useUserData } from '../../context/data'
import { db } from '../../context/firebase_config'

const StudentMain = ({ setMessage, getDate }) => {
	const contextMenuRef = useRef(null)
	const initialContextMenu = { x: 0, y: 0, show: false, data: { restrict: false, email: "", studentid: "" } }
	const [contextMenu, setContextMenu] = useState(initialContextMenu)
	const header = [
		{
			value: "regno",
			label: 'Reg No'
		},
		{
			value: "email",
			label: "Email"
		},
		{
			value: "name",
			label: "Name"
		},
		{
			value: "branch",
			label: "Branch"
		}
	]
	const { studentArr } = useUserData()
	const [result, setResult] = useState(studentArr)

	const handleClick = (e, email, studentid, restrict = false) => {
		e.preventDefault()
		if (window.innerWidth - e.pageX <= 250) {
			e.pageX = e.pageX - 250
		}
		setContextMenu({ x: e.pageX, y: e.pageY, data: { email, studentid, restrict }, show: true })
	}

	const handleRestrictSettings = async (restrict, studentid) => {
		if (studentid) {
			setContextMenu(initialContextMenu)
			const docRef = doc(db, "users", studentid);
			await updateDoc(docRef, { restrict })
				.then(() => {
					setMessage("Updated")
				})
		}
	}

	const sendEmail = (email) => {
		setContextMenu(initialContextMenu)
		if (email) {
			axios('http://localhost:3001/api/sendprofilecompleteemail', {
				method: "POST",
				data: {
					email
				}
			})
				.then(() => {
					setMessage("Email Sent")
				})
		}
	}
	useOnClickOutside(contextMenuRef, () => { setContextMenu(initialContextMenu) })
	return (
		<>
			<div ref={contextMenuRef} className={contextMenu.show ? 'w-[250px] text-sm flex flex-col border-2 bg-gray-600 p-2  rounded-md shadow-xl z-[4000] absolute text-white' : 'w-[250px] text-sm flex-col hidden pointer-events-none bg-gray-800 text-white p-2 rounded-md shadow-xl z-[4000] absolute'} style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}>
				<Link to={`/student/${contextMenu.data.studentid}`} className='rounded-md cursor-pointer px-2 py-1 font-semibold text-center hover:bg-gray-400 duration-100 '>View</Link>
				<span className='rounded-md cursor-pointer px-2 py-1 font-semibold text-center hover:bg-gray-400 duration-100' onClick={() => { handleRestrictSettings(!contextMenu.data.restrict, contextMenu.data.studentid) }}>{contextMenu.data.restrict ? "Unrestrict" : "Restrict"}</span>
				<span className='rounded-md cursor-pointer px-2 py-1 font-semibold text-center hover:bg-gray-400 duration-100' onClick={() => { sendEmail(contextMenu.data.email) }}>Profile Complete Email</span>
			</div>
			<Layout title="Students" className={" px-10 bg-custom-gradient overflow-y-hidden"}>
				<PageHeader getDate={getDate} searchBar={true} data={studentArr} setData={setResult} />
				<div className='w-full bg-white mt-4 rounded-lg shadow-lg border'>
					<div className='w-full flex-col items-center'>
						<div className='w-full text-center'>
							<div>
								<div className='grid grid-cols-4 font-bold py-3 border-b-2'>
									{
										header.map((header) => {
											return <div key={header.value}>{header.label}</div>
										})
									}
								</div>
							</div>
							<div className='text-center grid grid-cols-1'>
								{
									studentArr.map((student) => {
										return <div key={student.id} onContextMenu={(e) => { handleClick(e, student.email, student.id, student.restrict) }} className="cursor-pointer grid grid-cols-4 py-3 border-b">
											<Link to={`/student/${student.id}`} className="text-blue-700">{student.regno}</Link>
											<div>{student.email}</div>
											<div>{student.firstname} {student.lastname}</div>
											<div className='uppercase'>{student.branch}</div>
										</div>
									})
								}
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default StudentMain