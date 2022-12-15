import React, { useEffect } from 'react'
import {useState} from 'react'
import axios from "axios"
import Li from './Li'
function Passwords() {
  const [passwordList,setPasswordList]=useState([])
  
  const getpasswordlist= async()=>{
    const res=await axios.get('https://password-manager-afa.herokuapp.com/allpasswords');
    setPasswordList(res.data);
    console.log(res.data);
    
    
  }
  const deletePassword=async (id)=>{
    const identity={id:id};
    const res=await axios.delete('https://password-manager-afa.herokuapp.com/remove',{data:identity});
    console.log(res.data);
    
    getpasswordlist();

  }
  useEffect(()=>{
  getpasswordlist();
  },[])
    
  

  const decryptPassword = (encryption) => {
    axios.post("https://password-manager-afa.herokuapp.com/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      console.log(encryption._id)
      console.log(passwordList)
      setPasswordList(
        passwordList.map((val) => {
          return val._id == encryption._id
            ? {
                _id: val._id,
                password:  val.password,
                title: response.data,
                iv: val.iv,
              }
            : val;
        })
      );
    });
  };
  return (<>
    
    <div className="passwordlist">
    <h1 style={{textAlign:"center"}}>These are your passwords</h1>{
      <ul>
     {
    passwordList.map((elem,index)=>{
   return <Li decryptPassword={decryptPassword} elem={elem} deletePassword={deletePassword}/>;
      })}</ul>}</div>
      </>
  )
}

export default Passwords