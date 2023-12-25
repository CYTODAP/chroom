'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import "../firebase"

const auth = getAuth()

export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    // router.push("/home")
    onAuthStateChanged(auth, user => {
      if(user){
        router.push("/home")
      } else{
        router.push("/login")
      }
    })
  },[])
  return (
    <></>
  )
}
