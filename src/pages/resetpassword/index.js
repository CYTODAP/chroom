import { useRouter } from 'next/navigation'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styles from './resetpassword.module.css'
import { TextField } from '@mui/material';
import '../../app/globals.css'
import { useState } from 'react';
import "../../firebase"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const auth = getAuth();
export default function ResetPassword(){
  const router = useRouter()
  const [email, setEmail] = useState("")

  const sendEmail = (e) => {
    e.preventDefault()
    sendPasswordResetEmail(auth, email)
      .then(()=>{
        router.replace('login')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode+" , "+errorMessage, {
          position: 'bottom-right'
        })
        // ..
      });
  }

  return(
    <div className={styles.container}>
      {/* <Session></Session> */}
      <ToastContainer />
      <form className={styles.login_pattern} onSubmit={sendEmail}>
        <div className={styles.welcome}>Enter your email</div>
        <TextField
          className={styles.inputForm}
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {/* <TextField
          className={styles.inputForm}
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /> */}
        {/* <span className=''></span>
        <div className={styles.checkbox_remember}>
          <input type='checkbox' className={styles.checkbox}></input>
          <lebel className={styles.label_checkbox}>Remember me</lebel>
        </div> */}
        <button type='submit' className={styles.login_button}>Send</button>
        {/* <a className={styles.forgotpassword}>Forgot Password?</a>
        <a className={styles.forgotpassword} onClick={() => router.push("/register")}>Register</a> */}
      </form>
    </div>
  )
}