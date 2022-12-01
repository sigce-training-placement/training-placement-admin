import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Layout from '../components/Layout'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../context/firebase_config'

const Login = ({ setMessage }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false);

	const handleClick = () => {
		setLoading(true)
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setLoading(false)
				setMessage('Logged In Successfully!')
			})
			.catch((error) => {
				setMessage("Something went wrong!")
				setLoading(false)
			});
	}

	const handlePasswordReset = () => {
		if (email.length === 0) {
			setMessage("Enter the email id")
		} else {
			sendPasswordResetEmail(auth, email)
				.then(() => {
					setMessage("Password reset email sent successfully! Please check the spam section as well")
				})
				.catch((error) => {
					const errorMessage = error.message;
					setMessage(errorMessage)
				});
		}
	}

	return (
		<>
			<Layout title={'Login'} className={'flex items-center'}>
				<div className='w-7/12 bg-white rounded-xl px-10 py-5 m-auto shadow-lg'>
					<h1 className='text-center font-bold text-3xl mb-5'>Login</h1>
					<div>
						<Input type={'email'} label={'Email'} value={email} changeHandler={(e) => { setEmail(e.target.value) }} placeholder={'Enter Your Email Address'} id={'adminEmail'} />
						<Input type="password" label={'Password'} value={password} changeHandler={(e) => { setPassword(e.target.value) }} placeholder={'Enter Your Password'} id={'adminPassword'} className={'mt-3'} />
						<p className='mt-3 font-bold text-right cursor-pointer' onClick={handlePasswordReset}>forget password?</p>
						<Button loading={loading} handler={handleClick} className={'mt-3 m-auto w-full'} text="Login" />
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Login