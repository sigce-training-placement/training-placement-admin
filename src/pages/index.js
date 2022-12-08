import React from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import { useUserAuth } from '../context/auth'
import PageHeader from '../components/PageHeader'
import DashboardCard from '../components/DashboardCard'
import { useUserData } from '../context/data'

export default function Home({getDate }) {
	const { userData } = useUserAuth();
	const { companyArr, studentArr, driveArr } = useUserData()
	return (
		<>
			<Navbar />
			<Layout title={"Admin"} className="px-10 bg-custom-gradient">
				<PageHeader getDate={getDate} />
				<div className='w-full mt-4 flex flex-col gap-y-6'>
					<div className='custom-height rounded-lg shadow-lg p-4 bg-white'>
						30/400
					</div>
					<div className='flex-wrap rounded-lg py-4 w-full flex justify-center gap-5'>
						<DashboardCard number={driveArr.length} text={"Drives"} />
						<DashboardCard number={studentArr.length} text={"Students"} />
						<DashboardCard number={companyArr.length} text={"Companies"} />
						<DashboardCard number={89} text={"Selected"} />
						<DashboardCard number={43} text={"Trainings"} />
					</div>
				</div>
			</Layout>
		</>
	)
}
