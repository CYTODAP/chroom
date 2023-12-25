import { TextField } from '@mui/material';
import styles from './login.module.css'
import '../../app/globals.css'
import { useState } from 'react';
import "../../firebase"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Session from "../../session"


const auth = getAuth();
export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const logIn = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Email or Password Invalid", {
          position: 'bottom-right'
        })
        // ..
      });
  }

  return (
    <div className={styles.container}>
      <Session></Session>
      <ToastContainer />
      <form className={styles.login_pattern} onSubmit={logIn}>
        <div className={styles.welcome}>Welcome</div>
        <TextField
          className={styles.input}
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <TextField
          className={styles.input}
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <span className=''></span>
        <div className={styles.checkbox_remember}>
          <input type='checkbox' className={styles.checkbox}></input>
          <lebel className={styles.label_checkbox}>Remember me</lebel>
        </div>
        <button type='submit' className={styles.login_button}>Login</button>
        <a className={styles.forgotpassword}>Forgot Password?</a>
        <a className={styles.forgotpassword} onClick={() => router.push("/register")}>Register</a>
      </form>
    </div>
  )
}
