import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import CustomCalendar from './CustomCalendar'
import Input from './Input'
import { useUserData } from '../context/data'
import { doc, onSnapshot, collection, addDoc } from 'firebase/firestore';
import { db, fetchData } from '../context/firebase_config';
import CustomSelect from './CustomSelect'
import TextEditor from './TextEditor'
import Button from './Button';

const CreateDriveModal = ({ showModal, setShowModal, setMessage, getDate }) => {
	const companyLogo = useRef();
	const { companyArr } = useUserData()
	const [companyDropdown, setCompanyDropdown] = useState(companyArr && companyArr)
	const [companyId, setCompanyId] = useState(companyArr && companyArr)
	const [companyData, setCompanyData] = useState()
	const [disabled, setDisabled] = useState(false)

	useEffect(() => {
		setCompanyDropdown(companyArr)
	}, [companyArr]);

	const [dateofdrive, setDateofdrive] = useState(getDate("normal"));
	const initialFormState = {
		drivename: "",
		driveid: "",
		package: "",
		openings: 0,
		joblocation: ""
	}

	const [formState, setFormState] = useState(initialFormState)
	const [displayCalender, setDisplayCalender] = useState(false)
	const [content, setContent] = useState("")
	const [year, setYear] = useState([])
	const [branch, setBranch] = useState([])
	const [loading, setLoading] = useState(false)
	const [aptitude, setAptitude] = useState(false)
	const [gd, setGD] = useState(false)
	const [active, setActive] = useState(false)
	const [jobPost, setJobPost] = useState()
	const [campustype, setCampusType] = useState()

	const handleSubmit = async () => {
		if (formState.driveid && campustype && active && branch && year) {
			setLoading(true)
			const docRef = await addDoc(collection(db, "drives"), {
				...formState, branch: branch && branch.map((data) => {
					return data.value
				}), dateofdrive, year: year && year.map((data) => {
					return data.value
				}), content, companyId: companyData && companyData.companyId, aptitude: aptitude && aptitude.value, gd: gd && gd.value, active: active && active.value, campustype: campustype && campustype.value, jobPost: jobPost && jobPost.value, companyRefID: companyData.id
			})
				.then(() => {
					setLoading(false)
					setShowModal(false)
					setActive(false)
					setYear([])
					setBranch([])
					setFormState(initialFormState)
					setGD(false)
					setAptitude(false)
					setContent("")
					setMessage("Drive Created Successfully!")
				})
		} else {
			setMessage("Please specify the drive id")
		}
	}

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value
		})
	}
	useEffect(() => {
		if (companyId && companyData) {
			setDisabled(false)
		} else {
			setDisabled(true)
		}
	}, [companyId, companyData]);

	useEffect(() => {
		window.addEventListener('keyup', (e) => {
			if (e.code === "Escape") {
				setShowModal(false)
			}
		})
	}, []);

	const handleCompanyChange = (company) => {
		if (company) {
			setCompanyId(company.value)
			const unsub = onSnapshot(doc(db, "company", company.value), (doc) => {
				setCompanyData(fetchData(doc));
			});
		}
	}

	const handleDateChange = (e) => {
		const date = new Date(e)
		setDateofdrive(`${date.getFullYear()}-${date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}-${date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`}`)
		setDisplayCalender(false)
	}
	return (
		<>
			<div className={showModal ? 'bg-black bg-opacity-40 h-screen w-screen fixed top-0 left-0 opacity-100 duration-500 ' : 'pointer-events-none opacity-0 duration-500 bg-black bg-opacity-40 h-screen w-screen fixed top-0 left-0'} style={{ zIndex: "1000" }}></div>
			<div style={{ zIndex: 1400, width: "95vw", height: "95vh" }} className={showModal ? "p-5 rounded-lg shadow-lg duration-300 opacity-100 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto" : "overflow-y-auto pointer-events-none bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 duration-300"}>
				<button onClick={() => { setShowModal(false) }} className='absolute top-5 right-5 p-2 bg-gray-100 duration-300 hover:bg-gray-300 h-8 w-8 rounded-lg flex items-center justify-center'><IoClose /></button>
				<h1 className='text-2xl font-bold text-center'>Create Drive</h1>
				<div className='flex justify-center mt-5'>
					<img src={companyData && companyData.photoURL} className='object-cover h-20 w-20 rounded-full' alt="" />
					<input type="file" ref={companyLogo} className="hidden" />
				</div>
				<div className='grid grid-cols-2 gap-x-10 gap-y-5 mt-5 px-4'>
					<Input changeHandler={handleChange} label={"Drive Id"} placeholder={"Enter ID of drive"} readOnly={false} id="driveid" value={formState.driveid} />
					<Input changeHandler={handleChange} label={"Drive Name"} placeholder={"Enter Name of drive"} readOnly={false} id="drivename" value={formState.drivename} />
					<CustomSelect label="Company" handleChange={handleCompanyChange} id="company" options={companyDropdown.map((company) => {
						return { label: `${company.companyName}, ${company.companyCity}`, value: company.id,}
					})} />
					<div className={'flex flex-col '}>
						<label htmlFor={"dod"} className=' mb-1 font-semibold cursor-pointer'>{"Date Of Drive"}: </label>
						<div className='relative -top-10'><CustomCalendar showCalendar={displayCalender} onChange={handleDateChange} value={dateofdrive} /></div>
						<input onFocus={() => { setDisplayCalender(true) }} readOnly value={dateofdrive} name={"dod"} id={"dod"} className={'Montserrat read-only:cursor-pointer disabled:cursor-not-allowed focus:border-indigo-500 duration-300 border-2 rounded-lg outline-none px-4 py-3 focus:bg-indigo-50'} type={"text"} />
					</div>
					<Input disabled={disabled} label={"Company Id"} placeholder={"Enter Company ID"} readOnly={true} id="companyId" value={companyData && companyData.companyId} />
					<Input disabled={disabled} label={"Company Name"} placeholder={"Enter Company Name"} readOnly={true} id="companyName" value={companyData && companyData.companyName} />
					<Input disabled={disabled} label={"Company Location"} placeholder={"Enter Company Location"} readOnly={true} id="companyLocation" value={companyData && companyData.companyCity} />
					<CustomSelect label="Job Posting" handleChange={(e) => { setJobPost(e) }} disabled={disabled} id="jobposting" options={companyData && companyData.jobs && companyData.jobs.map((job) => {
						return { label: job, value: job }
					})} />
					<CustomSelect label="Campus type" handleChange={(e) => { setCampusType(e) }} disabled={disabled} id="campustype" options={[{ label: "On Campus", value: true }, { label: "Off Campus", value: false }]} />
					<Input disabled={disabled} label={"Job Location"} placeholder={"Enter Job Location"} readOnly={false} id="joblocation" value={formState.joblocation} changeHandler={handleChange} />
					<Input disabled={disabled} label={"Package"} placeholder={"Enter Package"} readOnly={false} id="package" value={formState.package} changeHandler={handleChange} />
					<Input disabled={disabled} label={"Number Of Openings"} placeholder={"Enter Number Of Openings"} readOnly={false} id="openings" value={formState.openings} changeHandler={handleChange} type="number" />
					<CustomSelect isMulti={true} label="Year" handleChange={(e) => { setYear(e) }} disabled={disabled} id="year" options={[{ label: "Third Year", value: "Third Year" }, { label: "Fourth Year", value: "Fourth Year" }]} />
					<CustomSelect isMulti={true} label="Branch" handleChange={(e) => { setBranch(e) }} disabled={disabled} id="branch" options={[{ label: "Computer", value: "computer" }, { label: "AI-ML", value: "aiml" }, { label: "IOT", value: "iot" }, { label: "Electrical", value: "electrical" }]} />
					<CustomSelect label="Active" handleChange={(e) => { setActive(e) }} disabled={disabled} id="active" options={[{ label: "Active", value: true }, { label: "Inactive", value: false }]} />
					<div className='grid grid-cols-2 gap-x-6'>
						<CustomSelect label="Aptitude Test" handleChange={(e) => { setAptitude(e) }} disabled={disabled} id="aptitude" options={[{ label: "Yes", value: true }, { label: "No", value: false }]} />
						<CustomSelect label="Group Discussion" handleChange={(e) => { setGD(e) }} disabled={disabled} id="groupdiscussion" options={[{ label: "Yes", value: true }, { label: "No", value: false }]} />
					</div>
					<div className='py-3 col-span-2'>
						<TextEditor label="Drive Description" setValue={setContent} value={content} />
					</div>
				</div>
				<div className='flex justify-center mt-3'><Button handler={handleSubmit} loading={loading} text="Create" /></div>
			</div>
		</>
	)
}

export default CreateDriveModal