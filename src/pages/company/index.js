import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import Button from '../../components/Button'
import CreateModal from '../../components/CreateModal'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import { useUserAuth } from '../../context/auth'
import { useUserData } from '../../context/data'


const CompanyMain = ({ getDate, setMessage }) => {
	const { companyArr } = useUserData()
	const [result, setResult] = useState(companyArr && companyArr)
	const { user } = useUserAuth();
	const [showCompanyCreateModal, setShowCompanyCreateModal] = useState(false)
	return (
		<>
			<CreateModal showModal={showCompanyCreateModal} setShowModal={setShowCompanyCreateModal} setMessage={setMessage} />
			<Layout title="Company" className={" px-10 bg-custom-gradient overflow-y-hidden"}>
				<PageHeader searchBar={true} data={companyArr} setData={setResult} getDate={getDate} buttoncomponent={<Button text="Create" className={"py-2"} handler={() => { setShowCompanyCreateModal(true) }} />} />
				<div className='w-full bg-white mt-4 rounded-lg shadow-lg border'>
					<div className='w-full flex-col items-center'>
						<div className='w-full text-center'>
							<div>
								<div className='grid grid-cols-4 font-bold py-3 border-b-2'>
									<div>{"Company ID"}</div>
									<div>{"Company Name"}</div>
									<div>{"HR Name"}</div>
									<div>{"HR Contact"}</div>
								</div>
							</div>
							<div className='text-center grid grid-cols-1'>
								{
									companyArr.map((company) => {
										return <Link to={`/company/${company.id}`} key={company.id} className="grid grid-cols-4 py-3 border-b">
											<div>{company.companyId}</div>
											<div>{company.companyName}</div>
											<div>{company.hr1name}</div>
											<div>{company.hr1contact}</div>
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

export default CompanyMain