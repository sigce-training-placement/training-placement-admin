import React, { useState } from 'react'
import Button from '../../../components/Button'
import CreateDriveModal from '../../../components/CreateDriveModal'
import Layout from '../../../components/Layout'
import PageHeader from '../../../components/PageHeader'

const DrivesHome = ({ getDate, setMessage }) => {
	const [showDriveCreateModal, setShowDriveCreateModal] = useState(false)
	const [result, setResult] = useState([])
	return (
		<>
			<CreateDriveModal getDate={getDate} showModal={showDriveCreateModal} setShowModal={setShowDriveCreateModal} setMessage={setMessage} />
			<Layout title={"Drives"} className={"px-10 bg-custom-gradient"}>
				<PageHeader searchBar={true} data={[]} result={setResult} getDate={getDate} buttoncomponent={<Button text="Create" className={"py-2"} handler={() => { setShowDriveCreateModal(true) }} />} />
			</Layout>
		</>
	)
}

export default DrivesHome