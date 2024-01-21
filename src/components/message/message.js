import { useEffect, useState } from "react"
import { addDoc, collection, collectionGroup, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firestore } from "../../firebase"
import styles from './message.module.css'
import '../../app/globals.css'
import { TextField } from "@mui/material";



const auth = getAuth();
export default function Message({ chatid, uid, user }) {

  const [message, setMessage] = useState([

  ])

  const [inputMessage, setInputMessage] = useState("")

  const [chat, setChat] = useState(null)
  useEffect(() => {
    if (chatid) {
      getDoc(doc(firestore, 'chats', chatid)).then(chat => {
        console.log(chat.data())
        setChat(chat)
      })
    }
  }, [chatid])


  useEffect(() => {
    if (chat) {
      const col = collection(chat.ref, 'messages')
      const queryChat = query(col, orderBy("createdDate", "desc"))
      const unlisten = onSnapshot(queryChat, (messages) => {
        console.log(messages)
        setMessage(messages.docs)
      })
      return () => {
        unlisten()
      }
    }
  }, [chat])


  const sendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.replace(/\s/g, '').length) {
      addDoc(collection(chat.ref, 'messages'), {
        desc: inputMessage,
        createdDate: new Date(),
        owner: {
          uid: uid,
          name: user.username
        },
      }).then(() => {
        setInputMessage('')
      })
    }
  }

  return (
    <div className="h100">
      {chat ?
        <div className="h100">
          <div className={styles.message_header}>
            {chat.data().name} <div className={styles.refcode}>&nbsp;#{chat.data().refCode}</div>
          </div>
          <div className={styles.chatboard}>
            {message.map((ms, i) => {
              return (
                <div className={uid == ms.data().owner.uid ? styles.owner_message_box : styles.message_box} key={i}>
                  <div >
                    {uid == ms.data().owner.uid ? <></> : <div className={styles.user_chatname}>{ms.data().owner.name}</div>}
                    <div>{ms.data().desc}</div>
                  </div>
                  <div className={styles.sendDate}>{ms.data().createdDate.toDate().toLocaleDateString('en-EN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                  </div>
                </div>
              )
            })}
          </div>
          <form onSubmit={sendMessage} className={"input_message " + styles.inputMessage}>
            <TextField
              className={styles.inputForm}
              type="text"
              // variant="outlined"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              // required
              autoComplete="off"
            />
          </form>
        </div> :
        <></>
      }
      <div></div>
    </div>
  )
}