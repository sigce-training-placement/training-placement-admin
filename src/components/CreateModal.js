import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import Button from './Button';
import Input from './Input'
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from '../context/firebase_config';
import { useUserAuth } from '../context/auth';
import TextEditor from './TextEditor'
import { v4 as uuidv4 } from 'uuid'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CreateModal = ({ showModal, setShowModal, setMessage, getDate, update = false, data }) => {
	const companyLogo = useRef()
	const { user } = useUserAuth()
	const [loading, setLoading] = useState(false)
	const [uploading, setUploading] = useState(false)
	const [photoURL, setPhotoURL] = useState("/assets/sigce.png")


	const initialFormState = {
		companyId: "",
		companyName: "",
		hr1name: "",
		hr1contact: "",
		hr1email: "",
		hr2name: "",
		hr2contact: "",
		hr2email: "",
		companyCity: "",
		companyState: "",
		companyAddress: "",
		companyPincode: "",
		companyNumber: "",
		companyEmail: "",
	}
	const [content, setContent] = useState('');
	const [formState, setFormState] = useState(initialFormState)

	// useEffect(() => {
	// 	if (formState.companyName && formState.companyCity) {
	// 		setFormState({
	// 			...formState,
	// 			["companyId"]: `${formState.companyName.replaceAll(" ", "_").toUpperCase()}_${formState.companyCity.replace(" ", "_").toUpperCase()}`
	// 		})
	// 	}
	// }, [formState.companyCity, formState.companyName]);

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value
		})
	}

	useEffect(() => {
		if (update && data) {
			setFormState(data)
			setPhotoURL(data.photoURL)
			setContent(data.companyDescription)
		}
	}, [data]);

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
					if (update) {
						const docRef = doc(db, "company", data.id);
						await updateDoc(docRef, { photoURL: downloadURL })
						.then(() => {
							setMessage("Profile Image Updated!");
						})
					}
				});
			}
		);
	}

	const handleSubmit = async () => {
		if (formState.companyId && content && photoURL) {
			setLoading(true)
			const docRef = await addDoc(collection(db, "company"), { ...formState, companyDescription: content, photoURL }).then(() => {
				setLoading(false)
				setMessage("Company Added!");
				setFormState(initialFormState)
				setShowModal(false)
			})
				.catch((err) => {
					setMessage(err.message);
					setLoading(false)
				})
		} else {
			setMessage("Fill the form properly");
		}
	}
	const handleUpdate = async () => {
		setLoading(true)
		const docRef = doc(db, "company", data.id);
		await updateDoc(docRef, { ...formState, companyDescription: content })
		.then(() => {
			setLoading(false)
			setMessage("Profile Updated")
		})
	}
	return (
		<>
			<div className={showModal ? 'bg-black bg-opacity-40 h-screen w-screen fixed top-0 left-0 opacity-100 duration-500 ' : 'pointer-events-none opacity-0 duration-500 bg-black bg-opacity-40 h-screen w-screen fixed top-0 left-0'} style={{ zIndex: "1000" }}></div>
			<div style={{ zIndex: 1400, width: "95vw", height: "95vh" }} className={showModal ? "p-5 rounded-lg shadow-lg duration-300 opacity-100 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto" : "overflow-y-auto pointer-events-none bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 duration-300 hidden"}>
				<button onClick={() => { setShowModal(false) }} className='absolute top-5 right-5 p-2 bg-gray-100 duration-300 hover:bg-gray-300 h-8 w-8 rounded-lg flex items-center justify-center'><IoClose /></button>
				<h1 className='text-2xl font-bold text-center'>{update ? "Update" : "Create"} Company</h1>
				<div className='flex justify-center mt-5 relative'>
					{uploading && <div className='border border-indigo-500 animate-pulse bg-gray-500 h-20 w-20 rounded-full' alt="" />}
					{!uploading && !update && <img src={photoURL} onClick={() => { companyLogo.current.click() }} className={uploading ? 'border border-indigo-500 animate-pulse h-20 w-20 rounded-full' : 'border border-indigo-500 h-20 w-20 rounded-full'} alt="" />}
					<input type="file" ref={companyLogo} accept="image/*" onInput={handleChangeImage} className="hidden" />
				</div>
				<div className='grid grid-cols-2 gap-x-10 gap-y-5 mt-5 px-4'>
					<Input id={"companyId"} value={formState.companyId} changeHandler={handleChange} readOnly={update} label="Company ID" placeholder={"Enter company ID"} />
					<Input id={"companyName"} value={formState.companyName} changeHandler={handleChange} label="Company Name" placeholder={"Enter Company Name"} />
					<Input id={"companyEmail"} value={formState.companyEmail} changeHandler={handleChange} label="Company Email" placeholder={"Enter Company Email"} />
					<Input id={"companyNumber"} value={formState.companyNumber} changeHandler={handleChange} label="Company Contact" placeholder={"Enter Company Contact"} />
					<Input id={"hr1name"} value={formState.hr1name} changeHandler={handleChange} label="HR Name" placeholder={"Enter HR name"} />
					<Input id={"hr1email"} value={formState.hr1email} changeHandler={handleChange} label="HR Email" placeholder={"Enter HR Email"} />
					<Input id={"hr2name"} value={formState.hr2name} changeHandler={handleChange} label="HR Name" placeholder={"Enter HR name"} />
					<Input id={"hr2email"} value={formState.hr2email} changeHandler={handleChange} label="HR Email" placeholder={"Enter HR Email"} />
					<Input id={"hr1contact"} value={formState.hr1contact} changeHandler={handleChange} label="HR Mobile Number" placeholder={"Enter HR mobile number"} />
					<Input id={"hr2contact"} value={formState.hr2contact} changeHandler={handleChange} label="HR Mobile Number" placeholder={"Enter HR mobile number"} />
					<Input id={"companyCity"} value={formState.companyCity} changeHandler={handleChange} label="Company City" placeholder={"Enter Company City"} />
					<Input id="companyState" value={formState.companyState} changeHandler={handleChange} label="Company State" placeholder={"Enter Company State"} />
					<Input id={"companyAddress"} value={formState.companyAddress} changeHandler={handleChange} label="Company Address" placeholder={"Enter address"} />
					<Input id={"companyPincode"} value={formState.companyPincode} changeHandler={handleChange} label="Company Pincode" placeholder={"Enter pincode"} />
					<div className='col-span-2'><TextEditor label="Description" value={content} setValue={setContent} /></div>
				</div>
				<div className='flex justify-center'>
					{!update && <Button text="Create" className={"py-2 mt-4"} loading={loading} handler={handleSubmit} />}
					{update && <Button text="Update" className={"py-2 mt-4"} loading={loading} handler={handleUpdate} />}
				</div>
			</div>
		</>
	)
}

export default CreateModal