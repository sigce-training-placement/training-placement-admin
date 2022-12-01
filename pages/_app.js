import { useEffect, useState } from 'react'
import Alert from '../components/Alert'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '../styles/style.css'
import moment from 'moment'
import { UserAuthContextProvider } from '../context/auth'
import { UserDataContextProvider } from '../context/data'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const [message, setMessage] = useState("")
  const [showLargeModal, setShowLargeModal] = useState(false)
  const router = useRouter()
  const [routing, setRouting] = useState(false)
  useEffect(() => {
    router.events.on('routeChangeStart', () => { setRouting(true) })
    setTimeout(() => {
      router.events.on('routeChangeComplete', () => { setRouting(false) })
    }, 100);
    return () => {
      router.events.off('routeChangeStart', () => { setRouting(true) })
      router.events.off(' () => { setRouting(true) }', () => { setRouting(false) })
    }
  }, []);

  useEffect(() => {
    if (message.length != 0) {
      setTimeout(() => {
        setMessage('')
      }, 4000);
    }
  }, [message]);

  const yearArray = (init, year = 8) => {
    let arr = []
    const dateObj = new Date()
    if (init === "prev") {
      let startYear = dateObj.getFullYear() - year;
      for (let index = dateObj.getFullYear(); index > startYear; index--) {
        let Obj = {
          label: index,
          value: index
        }
        arr.push(Obj)
      }
      return arr
    } else if (init === "next") {
      let startYear = dateObj.getFullYear();
      for (let index = dateObj.getFullYear() - year; index < startYear + 8; index++) {
        let Obj = {
          label: index,
          value: index
        }
        arr.push(Obj)
      }
      return arr
    }
  }
  const getDate = (format) => {
    const dateObj = new Date();
    if (format === undefined) {
      return `Today, ${moment(dateObj).format("DD MMM YYYY")}`
    } else if(format === "normal"){
      return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
    }
  }

  return (
    <>
      <div className={routing ? 'h-screen w-screen duration-500 bg-white z-[3000] fixed top-0 left-0 opacity-100' : 'h-screen w-screen duration-500 bg-white z-[3000] fixed top-0 left-0 opacity-0 pointer-events-none'}></div>
      <UserAuthContextProvider setMessage={setMessage}>
        <UserDataContextProvider setMessage={setMessage}>
          <Alert message={message} />
          <Navbar />
          <Component {...pageProps} setMessage={setMessage} yearArray={yearArray} getDate={getDate} showLargeModal={showLargeModal} setShowLargeModal={setShowLargeModal} />
        </UserDataContextProvider>
      </UserAuthContextProvider>
    </>
  )
}

export default MyApp
