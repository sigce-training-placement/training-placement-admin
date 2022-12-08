import React, { createContext, useContext, useEffect, useState } from "react";
import {
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { doc, onSnapshot, where } from "firebase/firestore"
import { auth, db } from "./firebase_config";
import { useNavigate } from "react-router-dom";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children, setMessage }) {
	const navigate = useNavigate()
	const [user, setUser] = useState();
	const [userData, setUserData] = useState();

	const logOut = () => {
		signOut(auth)
			.then(() => {
				setUser()
				setUserData()
				navigate("/login")
			})
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			if (currentuser) {
				const unsub = onSnapshot(doc(db, "users", currentuser.uid), (doc) => {
					if (doc.data() && doc.data().role === "admin") {
						setUser(currentuser)
						setUserData(doc.data())
						// navigate(`/`)
					} else {
						setMessage("No data available!");
					}
				});
			}else{
				navigate(`/login`)
			}
		});
		return () => {
			unsubscribe()
		};
	}, []);

	return (
		<userAuthContext.Provider value={{ user, setUser, userData, setUserData, logOut }}>
			{children}
		</userAuthContext.Provider>
	)
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
