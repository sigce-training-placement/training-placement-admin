import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db, fetchData } from "./firebase_config";
import { useUserAuth } from "./auth";

const UserDataContext = createContext();

export function UserDataContextProvider({ children, setMessage }) {
	const { user } = useUserAuth()
	const [companyArr, setCompanyArr] = useState([])
	const [studentArr, setStudentArr] = useState([])
	const [driveArr, setDriveArr] = useState([])

	useEffect(() => {
		const companyQuery = query(collection(db, "company"));
		const unsubscribeCompany = onSnapshot(companyQuery, (querySnapshot) => {
			let companyArray = [];
			querySnapshot.forEach((doc) => {
				companyArray.push(fetchData(doc));
			});
			setCompanyArr(companyArray)
		});
		const studentQuery = query(collection(db, "users"), where("role", "==", "student"), orderBy("branch"));
		const unsubscribeQuery = onSnapshot(studentQuery, (querySnapshot) => {
			let studentArray = [];
			querySnapshot.forEach((doc) => {
				studentArray.push(fetchData(doc));
			});
			setStudentArr(studentArray)
		});
		const driveQuery = query(collection(db, "drives"));
		const unsubscribeDrives = onSnapshot(driveQuery, (querySnapshot) => {
			let driveArray = [];
			querySnapshot.forEach((doc) => {
				driveArray.push(fetchData(doc));
			});
			setDriveArr(driveArray)
		});
		return () => {
			unsubscribeCompany()
			unsubscribeQuery()
			unsubscribeDrives()
		}
	}, []);

	return (
		<UserDataContext.Provider value={{ companyArr, setCompanyArr, studentArr, setStudentArr, driveArr, setDriveArr }}>
			{children}
		</UserDataContext.Provider>
	)
}

export function useUserData() {
	return useContext(UserDataContext);
}
