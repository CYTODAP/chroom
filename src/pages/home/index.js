import styles from './home.module.css'
import '../../app/globals.css'
import Header from "@/components/header/header"
import { useState } from 'react'
import Image from "next/image"
import PlusSymbol from "../../assets/image/addsymbol.png"
import { Modal } from '@mui/material'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { addDoc, collection, collectionGroup, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { firestore } from "../../firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import Message from '@/components/message/message'

const auth = getAuth();
export default function Home() {
  const [activeId, setActiveId] = useState("")
  const [modalAddChat, setModalAddChat] = useState(false)
  const [chatName, setChatName] = useState("")
  const [user, setUser] = useState(null)
  const [uid, setUID] = useState("")
  const [chatlist, setChatlist] = useState([])
  const [shiftCreate, setShiftCreate] = useState("name")

  useEffect(() => {
    onAuthStateChanged(auth, userData => {
      if (userData) {
        setUID(userData.uid)
        getDoc(doc(firestore, 'users', userData.uid)).then(userDB => {
          setUser(userDB.data())
        })
      }
    })
  }, [])

  useEffect(() => {
    if (uid) {
      const col = collection(firestore, 'chats')
      const queryChat = query(col, where("members", "array-contains", uid))
      const unlisten = onSnapshot(queryChat, (chats) => {
        setChatlist(chats.docs)
      })
      return () => {
        unlisten()
      }
    }
  }, [uid])

  const switchCreate = () => {
    setShiftCreate(shiftCreate == "name" ? "ref" : "name")
  }

  const activeChat = (chat) => {
    setActiveId(chat.id)
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
  };
  const addChats = (e) => {
    e.preventDefault()
    if (shiftCreate == "name") {
      const col = collection(firestore, 'chats')
      addDoc(col, {
        refCode: new Date().getTime().toString(36).toUpperCase(),
        name: chatName,
        createdDate: new Date(),
        updatedDate: new Date(),
        members: [uid]
      }).then((chatRef) => {
        setModalAddChat(false)
        setChatName('')
        setActiveId(chatRef.id)
      })
    } else { 
      const col = collection(firestore, 'chats')
      const queryChat = query(col, where("refCode", "==", chatName))
      getDocs(queryChat).then((chats)=>{
        if(chats.size>0){
          chats.docs.forEach(doc => {
            updateDoc(doc.ref, {
              members: doc.data().members.concat(uid),
              updatedDate: new Date(),
            }).then(() => {
              setModalAddChat(false)
              setChatName('')
              setActiveId(doc.id)
            })
          });
        }
      })
    }
  }

  return (
    <div className={styles.container_user}>
      <Header></Header>
      <div className={styles.chat_container}>
        <div className={styles.chatlist}>
          <div className={styles.create_chat} onClick={() => setModalAddChat(true)}>
            <Image src={PlusSymbol} alt="addChats" width={30} style={{ marginBottom: "5px", cursor: "pointer" }} />
          </div>
          {chatlist.map((chat, i) => {
            return (
              <div key={i} className={activeId == chat.id ? styles.chat_row_active : styles.chat_row} onClick={() => activeChat(chat)}>{chat.data().name}</div>
            )
          })}
        </div>
        <div className={styles.chat_interface}>
          <Message chatid={activeId} uid={uid} user={user}></Message>
        </div>
      </div>
      <Modal
        open={modalAddChat}
        onClose={() => setModalAddChat(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // className={styles.modal_interface}
      >
        <Box sx={style}>
          {shiftCreate == "name" ?
            <>
              <Typography className={styles.modalform} id="modal-modal-title" variant="h6" component="h2">
                Create your chatroom
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form className={styles.modalform} onSubmit={addChats}>
                  <TextField
                    className={styles.inputForm}
                    type="text"
                    variant="outlined"
                    value={chatName}
                    onChange={e => setChatName(e.target.value)}
                    placeholder='Your chatroom name'
                    required
                  />
                </form>
                <div className={styles.modalform}><button className={styles.switchButton} onClick={() => switchCreate()}>Insert Chatroom Code</button></div>
              </Typography>
            </> :
            <><Typography className={styles.modalform} id="modal-modal-title" variant="h6" component="h2">
              Enter code to join chat
            </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form className={styles.modalform} onSubmit={addChats}>
                  <TextField
                    className={styles.inputForm}
                    type="text"
                    variant="outlined"
                    value={chatName}
                    onChange={e => setChatName(e.target.value)}
                    required
                  />
                </form>
                <div className={styles.modalform}><button className={styles.switchButton} onClick={() => switchCreate()}>Create chat</button></div>
              </Typography>
            </>
          }
        </Box>
      </Modal>
    </div>
  )
}
