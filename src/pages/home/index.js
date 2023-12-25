import styles from './home.module.css'
import '../../app/globals.css'
import Header from "@/components/header/header"

export default function Home() {
  return (
    <div>
      <Header></Header>
      <div className={styles.container_user}></div>
    </div>
  )
}
