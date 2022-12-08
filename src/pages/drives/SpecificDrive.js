import { doc, onSnapshot } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Layout from '../../components/Layout'
import { db, fetchData } from '../../context/firebase_config';

const IndividualDrives = () => {
  const { drive } = useParams()
  const [driveData, setDriveData] = useState()
  const [companyData, setCompanyData] = useState()
  useEffect(() => {
    if (drive) {
      const unsub = onSnapshot(doc(db, "drives", drive), (driveDoc) => {
        setDriveData(fetchData(driveDoc));
        const unsub1 = onSnapshot(doc(db, "company", driveDoc.data().companyRefID), (item) => {
          setCompanyData(fetchData(item));
        });
      });
      return () => {
        unsub()
      };
    }
  }, [drive]);
  return (
    <>
      <Layout title={"Drive"} className={"py-10 px-10 bg-custom-gradient"}>
        <div className='bg-white py-10 shadow-lg rounded-lg h-[90vh] overflow-y-auto'>
          <div className='flex'>
            <div className='flex-col items-center w-3/12 flex justify-center'>
              <img src={companyData && companyData.photoURL} className={false ? 'animate-pulse h-28 w-28 rounded-full' : 'object-cover h-28 w-28 rounded-full'} alt="" />
              {/* <button className='mt-3 font-bold' >Update</button>
              <input type="file" accept='image/*' className='hidden' /> */}
            </div>
            <div className='w-9/12'>
              <h1 className='mt-3 text-4xl font-bold'>{driveData && driveData.drivename}</h1>
              <div className='flex justify-between'>
                <p className='font-semibold mt-2'>Job Location: {driveData && driveData.joblocation}</p>
                <div className='flex mt-10'>
                  <Button className='bg-green-600 hover:bg-green-700 mr-4 w-20 text-sm' text={`Edit`} />
                  <Link to={`/company/${driveData && driveData.companyRefID}`} ><Button className='mr-16  text-sm' text={`View Company`} /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default IndividualDrives