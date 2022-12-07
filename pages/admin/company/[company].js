import { arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Layout from '../../../components/Layout'
import Loading from '../../../components/Loading'
import ShowAllDrives from '../../../components/ShowAllDrives'
import { useUserAuth } from '../../../context/auth'
import { db, fetchData, storage } from '../../../context/firebase_config'
import CreateModal from '../../../components/CreateModal'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

const Company = ({ setMessage }) => {
	const router = useRouter()
	const { company } = router.query
	const { user } = useUserAuth()
	const [data, setData] = useState();
	const [uploading, setUploading] = useState(false)
	const [jobName, setJobName] = useState("")
	const inputRef = useRef()
	const [drives, setDrives] = useState([])
	const [loading, setLoading] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [showUpdateModal, setShowUpdateModal] = useState(false)
	const [photoURL, setPhotoURL] = useState("/assets/sigce.png")
	useEffect(() => {
		if (user && company) {
			setLoading(true)
			const unsub = onSnapshot(doc(db, "company", company), (doc) => {
				setData(fetchData(doc));
				const q = query(collection(db, "drives"), where("companyId", "==", doc.data().companyId));
				const unsubscribe = onSnapshot(q, (querySnapshot) => {
					const arr = [];
					querySnapshot.forEach((doc) => {
						arr.push(fetchData(doc));
					});
					setDrives(arr)
					setLoading(false)
				});
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

	// useEffect(() => {
	// 	window.addEventListener('keyup', (e) => {
	// 		if (e.code === "Escape") {
	// 			setShowModal(false)
	// 		}
	// 	})
	// }, []);

	const handleChangeImage = (e) => {
		setUploading(true)
		let file = e.target.files[0]
		const storageRef = ref(storage, `company/${uuidv4()}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on('state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused');
						break;
					case 'running':
						console.log('Upload is running');
						break;
				}
			},
			(error) => {
				// Handle unsuccessful uploads
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
					setUploading(false)
					setPhotoURL(downloadURL)
					const docRef = doc(db, "company", data.id);
					await updateDoc(docRef, { photoURL: downloadURL })
						.then(() => {
							setMessage("Profile Image Updated!");
						})
				});
			}
		);
	}
	return (
		<>
			<CreateModal showModal={showUpdateModal} setShowModal={setShowUpdateModal} update={true} data={data} />
			<ShowAllDrives data={drives} setShowModal={setShowModal} showModal={showModal} />
			<Layout title={"Company"} className={"py-10 px-10 bg-custom-gradient"}>
				<div className='bg-white py-10 shadow-lg rounded-lg h-[90vh] overflow-y-auto'>
					<div className='flex'>
						<div className='flex-col items-center w-3/12 flex justify-center'>
							<img src={data && data.photoURL || "/assets/sigce.png"} className={uploading ? 'animate-pulse h-28 w-28 rounded-full' : 'object-cover h-28 w-28 rounded-full'} alt="" />
							<button className='mt-3 font-bold' onClick={() => { inputRef.current.click() }}>Update</button>
							<input type="file" accept='image/*' onInput={handleChangeImage} ref={inputRef} className='hidden' />
						</div>
						<div className='w-9/12'>
							<h1 className='mt-3 text-4xl font-bold'>{data && data.companyName}</h1>
							<div className='flex justify-between'>
								<p className='font-semibold mt-2'>Location: {data && data.companyCity}</p>
								<div className='flex mt-10'>
									<Button handler={() => { setShowUpdateModal(true) }} className='bg-green-600 hover:bg-green-700 mr-4 w-20 text-sm' text={`Edit`} />
									<Button handler={() => { setShowModal(true) }} className='mr-16  text-sm' text={`View Drives (${drives && drives.length})`} />
								</div>
							</div>
						</div>
					</div>
					<div className='mt-6 px-10'>
						<div className="flex flex-col">
							<h3 className='text-lg px-3 font-semibold'>Company HR: </h3>
							<div className="w-full px-3 grid grid-cols-2 pb-4 border-b">
								<div>
									<p className='mt-2'>Name: {data && data.hr1name}</p>
									<p>Email: <a href={`mailto:${data && data.hr1email}`}>{data && data.hr1email}</a></p>
									<p>Contact: <a href={`tel:${data && data.hr1contact}`}>{data && data.hr1contact}</a></p>
								</div>
								<div>
									<p className='mt-2'>Name: {data && data.hr2name}</p>
									<p>Email: <a href={`mailto:${data && data.hr2email}`}>{data && data.hr2email}</a></p>
									<p>Contact: <a href={`tel:${data && data.hr2contact}`}>{data && data.hr2contact}</a></p>
								</div>
							</div>
						</div>
						<div className='p-3'>
							<h3 className='text-lg font-semibold mt-3'>Company Description: </h3>
							<p className='mt-1' dangerouslySetInnerHTML={{ __html: data && data.companyDescription }}></p>
						</div>
						<div className="w-full p-3 mt-3">
							<h3 className='text-lg font-semibold'>Company Details: </h3>
							<div className='grid grid-cols-2'>
								<p className='mt-2 col-span-2'><span className='font-semibold'>Address:</span> {data && data.companyAddress}</p>
								<p className='mt-2'><span className='font-semibold'>State:</span> {data && data.companyState}</p>
								<p className='mt-2'><span className='font-semibold'>Zipcode:</span> {data && data.companyPincode}</p>
								<p className='mt-2'><span className='font-semibold'>Company Email:</span> <a href={`mailto:${data && data.companyEmail}`}>{data && data.companyEmail}</a></p>
								<p className='mt-2'><span className='font-semibold'>Company Contact:</span> <a href={`tel:${data && data.companyNumber}`}>{data && data.companyNumber}</a></p>
							</div>
						</div>
					</div>
					<div className='gap-x-4 grid grid-cols-2 mt-4 p-3 px-10 bg-white'>
						{/* <button onClick={() => {router.push(`update/${data && data.id}`)}}>edit</button> */}
						<div className='p-3 flex items-center flex-col'>
							<Input placeholder={"Enter Job Name"} labelClass="text-lg" label='Job Name' id={"JobName"} parentClass="w-full" value={jobName} changeHandler={(e) => { setJobName(e.target.value) }} />
							<Button type='button' text={"Submit"} className="mt-3" handler={updateCompany} />
						</div>
						<div className='border-l-2 p-3 px-6'>
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