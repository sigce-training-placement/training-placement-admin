import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import Button from './Button';
import Input from './Input'
import { addDoc, collection } from "firebase/firestore";
import { db } from '../context/firebase_config';
import { useUserAuth } from '../context/auth';
import TextEditor from './TextEditor'

const CreateModal = ({ showModal, setShowModal, setMessage }) => {
	const companyLogo = useRef()
	const { user } = useUserAuth()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		window.addEventListener('keyup', (e) => {
			if(e.code === "Escape"){
				setShowModal(false)
			}
		})
	}, []);

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

	useEffect(() => {
		if (formState.companyName && formState.companyCity) {
			setFormState({
				...formState,
				["companyId"]: `${formState.companyName.replaceAll(" ", "_").toUpperCase()}_${formState.companyCity.replace(" ", "_").toUpperCase()}`
			})
		}
	}, [formState.companyCity, formState.companyName]);

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value
		})
	}
	const handleSubmit = async () => {
		if (formState.companyId) {
			setLoading(true)
			const docRef = await addDoc(collection(db, "company"), { ...formState, companyDescription: content }).then(() => {
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
			setMessage("Company Id Not found!");
		}
	}

	return (
		<>
			<div className={showModal ? 'bg-black bg-opacity-40 h-screen w-screen fixed top-0 left-0 opacity-100 duration-500 ' : 'pointer-events-none opacity-0 duration-500 bg-black bg-opacity-40 h-screen w-screen fixed top-0 left-0'} style={{ zIndex: "1000" }}></div>
			<div style={{ zIndex: 1400, width: "95vw", height: "95vh" }} className={showModal ? "p-5 rounded-lg shadow-lg duration-300 opacity-100 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto" : "overflow-y-auto pointer-events-none bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 duration-300"}>
				<button onClick={() => { setShowModal(false) }} className='absolute top-5 right-5 p-2 bg-gray-100 duration-300 hover:bg-gray-300 h-8 w-8 rounded-lg flex items-center justify-center'><IoClose /></button>
				<h1 className='text-2xl font-bold text-center'>Create Company</h1>
				<div className='flex justify-center mt-5'>
					<img src="/assets/sigce.png" onClick={() => { companyLogo.current.click() }} className='h-20 w-20 rounded-full' alt="" />
					<input type="file" ref={companyLogo} className="hidden" />
				</div>
				<div className='grid grid-cols-2 gap-x-10 gap-y-5 mt-5 px-4'>
					<Input id={"companyId"} value={formState.companyId} changeHandler={handleChange} label="Company ID" placeholder={"Enter company ID"} />
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
					<TextEditor content={content} setContent={setContent} />
				</div>
				<div className='flex justify-center'>
					<Button text="Create" className={"py-2 mt-4"} loading={loading} handler={handleSubmit} />
				</div>
			</div>
		</>
	)
}

export default CreateModal