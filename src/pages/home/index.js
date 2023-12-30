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
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'

const auth = getAuth();
export default function Home() {
  const [activeId, setActiveId] = useState("")
  const [modalAddChat, setModalAddChat] = useState(false)
  const [chatName, setChatName] = useState("")
  const [user, setUser] = useState(null)
  const [uid, setUID] = useState("")
  const [chatlist, setChatlist] = useState([
    {
      id: "111",
      name: "chat1"
    },
    {
      id: "112",
      name: "chat2"
    },
    {
      id: "113",
      name: "chat3"
    },
    {
      id: "114",
      name: "chat4"
    },
    {
      id: "115",
      name: "chat5"
    },
    {
      id: "116",
      name: "chat6"
    },
    {
      id: "117",
      name: "chat7"
    },
    {
      id: "118",
      name: "chat8"
    },
    {
      id: "119",
      name: "chat9"
    },
    {
      id: "120",
      name: "chat10"
    },
  ])

  useEffect(()=>{
    onAuthStateChanged(auth, userData => {
      if (userData) {
        setUID(userData.uid)
        getDoc(doc(firestore, 'users', userData.uid)).then(userDB => {
          setUser(userDB.data())
        })
      }
    })
  },[])
  
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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const addChats = (e) => {
    e.preventDefault()
    addDoc(collection(firestore, 'chats'), {
      name: chatName,
      createdDate: new Date()
    }).then((chatRef) => {
      addDoc(collection(chatRef, 'members'), {
        username: user.username,
        uid
      })
      setModalAddChat(false)
      setChatName('')
    })
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
              <div key={i} className={activeId == chat.id ? styles.chat_row_active : styles.chat_row} onClick={() => activeChat(chat)}>{chat.name}</div>
            )
          })}
        </div>
        <div className={styles.chat_interface}>

        </div>
      </div>
      <Modal
        open={modalAddChat}
        onClose={() => setModalAddChat(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter name to create your chatroom
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={addChats}>
              <TextField
                className={styles.inputForm}
                type="text"
                variant="outlined"
                value={chatName}
                onChange={e => setChatName(e.target.value)}
                required
              />
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
