import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Layout from '../../../components/Layout'
import Loading from '../../../components/Loading'
import { useUserAuth } from '../../../context/auth'
import { db, fetchData } from '../../../context/firebase_config'

const Company = ({ setMessage }) => {
	const router = useRouter()
	const { company } = router.query
	const { user } = useUserAuth()
	const [data, setData] = useState();
	const [uploading, setUploading] = useState(false)
	const [jobName, setJobName] = useState("")
	const inputRef = useRef()
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		if (user && company) {
			const unsub = onSnapshot(doc(db, "company", company), (doc) => {
				setData(fetchData(doc));
				setLoading(false)
			});
			return () => {
				unsub()
			};
		}
	}, [user]);

	const updateCompany = async () => {
		if (jobName) {
			setLoading(true)
			const docRef = doc(db, "company", data.id);
			await updateDoc(docRef, {
				jobs: arrayUnion(jobName)
			})
				.then(() => {
					setLoading(false)
					setJobName("")
					setMessage("Data Updated!")
				})
				.catch((err) => {
					setLoading(false)
					setMessage(err.message)
				})
		}
	}

	return (
		<>
			{/* {loading && <Loading />} */}
			<Layout title={"Company"} className={"py-10 px-10 bg-custom-gradient"}>
				<div className='bg-white py-10 shadow-lg rounded-lg h-[90vh] overflow-y-auto'>
					<div className='flex'>
						<div className='flex-col items-center w-3/12 flex justify-center'>
							<img src="/assets/sigce.png" className='h-28 w-28' alt="" />
							<button className='mt-3 font-bold' onClick={() => { inputRef.current.click() }}>Update</button>
							<input type="file" accept='image/*' ref={inputRef} className='hidden' />
						</div>
						<div className='w-9/12'>
							<h1 className='mt-3 text-4xl font-bold'>{data && data.companyName}</h1>
							<p className='font-semibold mt-2'>Location: {data && data.companyCity}</p>
						</div>
					</div>
					<div className='mt-6 px-10'>
						<div className="flex">
							<div className="w-4/12 p-3">
								<h3 className='text-lg font-semibold'>Company HR: </h3>
								<p className='mt-2'>Name: {data && data.hr1name}</p>
								<p>Email: <a href={`mailto:${data && data.hr1email}`}>{data && data.hr1email}</a></p>
								<p>Contact: <a href={`tel:${data && data.hr1contact}`}>{data && data.hr1contact}</a></p>
								<div className='h-[1px] bg-gray-300 w-full my-2'></div>
								<p className='mt-2'>Name: {data && data.hr2name}</p>
								<p>Email: <a href={`mailto:${data && data.hr2email}`}>{data && data.hr2email}</a></p>
								<p>Contact: <a href={`tel:${data && data.hr2contact}`}>{data && data.hr2contact}</a></p>
							</div>
							<div className="border-l w-8/12 px-6 py-3">
								<h3 className='text-lg font-semibold'>Company Details: </h3>
								<p className='mt-2'><span className='font-semibold'>Address:</span> {data && data.companyAddress}</p>
								<p className='mt-2'><span className='font-semibold'>State:</span> {data && data.companyState}</p>
								<p className='mt-2'><span className='font-semibold'>Zipcode:</span> {data && data.companyPincode}</p>
								<p className='mt-2'><span className='font-semibold'>Company Email:</span> <a href={`mailto:${data && data.companyEmail}`}>{data && data.companyEmail}</a></p>
								<p className='mt-2'><span className='font-semibold'>Company Contact:</span> <a href={`tel:${data && data.companyNumber}`}>{data && data.companyNumber}</a></p>
							</div>
						</div>
						<div className='p-3'>
							<h3 className='text-lg font-semibold mt-3'>Company Description: </h3>
							<p className='mt-1' dangerouslySetInnerHTML={{ __html: data && data.companyDescription }}></p>
						</div>
					</div>
					<div className='gap-x-4 grid grid-cols-2 mt-4 p-3 px-10 bg-white'>
						<div className='p-3 flex items-center flex-col'>
							<Input placeholder={"Enter Job Name"} label='Job Name' id={"JobName"} parentClass="w-full" value={jobName} changeHandler={(e) => { setJobName(e.target.value) }} />
							<Button type='button' text={"Submit"} className="mt-3" handler={updateCompany} />
						</div>
						<div className='border-l-2 p-3'>
							<h2 className='text-lg mb-1 font-bold'>JOBS: </h2>
							{
								data && data.jobs && data.jobs.map((job) => {
									return <div>{job}</div>
								})
							}
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Company