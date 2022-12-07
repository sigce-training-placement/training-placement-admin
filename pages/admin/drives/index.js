import Link from 'next/link'
import React, { useState } from 'react'
import Button from '../../../components/Button'
import CreateDriveModal from '../../../components/CreateDriveModal'
import Layout from '../../../components/Layout'
import PageHeader from '../../../components/PageHeader'
import { useUserData } from '../../../context/data'

const DrivesHome = ({ getDate, setMessage }) => {
	const [showDriveCreateModal, setShowDriveCreateModal] = useState(false)
	const [result, setResult] = useState([])
	const { driveArr } = useUserData();

	return (
		<>
			<CreateDriveModal getDate={getDate} showModal={showDriveCreateModal} setShowModal={setShowDriveCreateModal} setMessage={setMessage} />
			<Layout title={"Drives"} className={"px-10 bg-custom-gradient"}>
				<PageHeader searchBar={true} data={driveArr} result={setResult} getDate={getDate} buttoncomponent={<Button text="Create" className={"py-2"} handler={() => { setShowDriveCreateModal(true) }} />} />
				<div className='w-full bg-white mt-4 rounded-lg shadow-lg border'>
					<div className='w-full flex-col items-center'>
						<div className='w-full text-center'>
							<div>
								<div className='grid grid-cols-5 font-bold py-3 border-b-2'>
									<div>{"Drive Id"}</div>
									<div>{"Drive Name"}</div>
									<div>{"Company Id"}</div>
									<div>{"Date"}</div>
									<div>{"Location"}</div>
								</div>
							</div>
							<div className='text-center grid grid-cols-1'>
								{
									driveArr && driveArr.map((drive) => {
										return <Link href={`drives/${drive.id}`} key={drive.driveid} className="grid grid-cols-5 py-3 border-b">
											<div>{drive.driveid}</div>
											<div>{drive.drivename}</div>
											<div>{drive.companyId}</div>
											<div>{drive.dateofdrive}</div>
											<div>{drive.joblocation}</div>
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

export default DrivesHome