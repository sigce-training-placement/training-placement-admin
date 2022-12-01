import Link from 'next/link'
import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import PageHeader from '../../../components/PageHeader'
import Table from '../../../components/Table'
import { useUserData } from '../../../context/data'

const Students = ({ getDate }) => {
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
	return (
		<>
			<Layout title="Students" className={" px-10 bg-custom-gradient overflow-y-hidden"}>
				<PageHeader searchBar={true} data={studentArr} setData={setResult} getDate={getDate} />
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
									result.map((student) => {
										return <Link href={`student/${student.id}`} key={student.id} className="grid grid-cols-4 py-3 border-b">
											<div>{student.regno}</div>
											<div>{student.email}</div>
											<div>{student.firstname} {student.lastname}</div>
											<div>{student.branch}</div>
										</Link>
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

export default Students