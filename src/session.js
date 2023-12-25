'use client'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import "./firebase"

const auth = getAuth()

export default function Session() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(()=>{
    // router.push("/home")
    const unlisten = onAuthStateChanged(auth, user => {
      console.log("auth: changed")
      if(!user){
        router.push("/login")
        console.log(pathname)
      }
      else{
        if(pathname== "/login" || pathname== "/register"){
          router.replace("/home")
          console.log("Logged in")
        }
      }
    })
    return ()=>{
      unlisten()
    }
  },[])
  return (
    <></>
  )
}
