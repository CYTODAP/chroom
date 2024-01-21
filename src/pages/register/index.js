import { TextField } from '@mui/material';
import styles from './register.module.css'
import '../../app/globals.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { firestore } from "../../firebase"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { doc, setDoc } from "firebase/firestore";


const auth = getAuth();
export default function Register() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpass, setConfirmpass] = useState("")
  const signUp = (e) => {
    e.preventDefault()
    if (password == confirmpass) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          // Signed up 
          const user = userCredential.user;
          if (user) {
            // Add a new document with a generated id.
            setDoc(doc(firestore, 'users', user.uid), {
              username: username,
              email: email
            })
            router.replace("/home")
          }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      toast.error("Password Invalid", {
        position: 'bottom-right'
      })
    }
  }
  return (
    <div className={styles.container}>
      <ToastContainer />
      <form className={styles.login_pattern} onSubmit={signUp}>
        <div className={styles.welcome}>Register</div>
        <TextField
          className={styles.input}
          type="text"
          label="Username"
          variant="outlined"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
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
        <TextField
          className={styles.input}
          type="password"
          label="Confirm Password"
          variant="outlined"
          value={confirmpass}
          onChange={e => setConfirmpass(e.target.value)}
          required
        />
        <span className=''></span>
        <div className={styles.checkbox_remember}>
          <input type='checkbox' className={styles.checkbox}></input>
          <label className={styles.label_checkbox}>Remember me</label>
        </div>
        <button type='submit' className={styles.login_button}>Sign Up</button>
        {/* <a href="#" className={styles.forgotpassword}>Forgot Password?</a> */}
      </form>
    </div>
  )
}
