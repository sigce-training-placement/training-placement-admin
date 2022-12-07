import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import Button from '../../../../components/Button';
import Input from '../../../../components/Input'
import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, fetchData } from '../../../../context/firebase_config';
import { useUserAuth } from '../../../../context/auth';
import TextEditor from '../../../../components/TextEditor'
import Layout from '../../../../components/Layout';
import { useRouter } from 'next/router';

const UpdateCompany = ({ showModal, setMessage }) => {
	const companyLogo = useRef()
	const { user } = useUserAuth()
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState()
	const router = useRouter()

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

	useEffect(() => {
		if (data) {
			setFormState(data)
		}
	}, [data]);

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value
		})
	}
	useEffect(() => {
		const unsub = onSnapshot(doc(db, "company", router.query.company), (doc) => {
			setData(fetchData(doc));
		});

		return () => {
		};
	}, []);
	const handleSubmit = async () => {
		if (formState.companyId) {
			setLoading(true)
			const docRef = doc(db, "company", router.query.company);
			await updateDoc(docRef, { ...formState, companyDescription: content }).then(() => {
				setLoading(false)
				setMessage("Company Updated!");
				setFormState(initialFormState)
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
			<Layout title="Update Company">
				<div className={"p-5 rounded-lg shadow-lg duration-300 opacity-100 bg-white"}>
					<h1 className='text-2xl font-bold text-center'>Update Company</h1>
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
						<Button text="Update" className={"py-2 mt-4"} loading={loading} handler={handleSubmit} />
					</div>
				</div>
			</Layout>
		</>
	)
}

export default UpdateCompany