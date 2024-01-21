import Session from "../../session"
import styles from './header.module.css'
import '../../app/globals.css'
import Image from "next/image"
import Logo from "../../assets/image/ChroomLogoPNG.png"
import LogoutLogo from "../../assets/image/logoutlogo.png"
import { Button } from "react-bootstrap"
import "../../firebase"
import { getAuth, signOut } from "firebase/auth";


const auth = getAuth();

export default function Header() {
  const logOut = (e) =>{
    e.preventDefault()
    signOut(auth)
  }
  return (
    <div>
      <Session></Session>
      <div className={styles.topbar}>
        <div className={styles.pagename}><Image src={Logo} alt="chroomlogo" width={30} style={{margin: "0px 10px"}}/>Chroom</div>
        <Button className={styles.logoutBtn} onClick={logOut}><Image src={LogoutLogo} alt="logoutlogo" width={20} height={20} style={{margin: "0px 10px 0px 0px"}}/>Logout</Button>
      </div>
    </div>
  )
}
