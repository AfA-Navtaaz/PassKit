import React from 'react'
import {useState} from 'react'
import axios from "axios"
function Home() {
  const [password,setpassword]=useState("")
  const [title,settitle]=useState("")
  const submit= async()=>{
    console.log(password);
    console.log(title);
   try{await axios.post('https://password-manager-afa.herokuapp.com/push',{
      password:password,
      title:title
    })
    setpassword("")
    settitle("")}catch(e){
      console.log(e);
      settitle("OOPS  already exists!")
      setpassword("")
    }
      }
  return (
    <div className ="container">
    <label htmlFor="title"  >
        TYPE YOUR TITLE
      </label>
      <input  type="text" value={title} id="title" onChange={(e)=>{
        settitle(e.target.value)
      }}>
      </input>
      <label htmlFor="password">
        TYPE YOUR PASSWORD
      </label>
      <input type="password"  value={password} id="password" onChange={(e)=>{
        setpassword(e.target.value)
        
      }}>
      </input>
      
      <input type="submit" className="submit" onClick={submit}>

      </input>
      
    </div>
  );
}

export default Home