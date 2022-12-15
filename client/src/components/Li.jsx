import React,{useState} from 'react'


function Li({decryptPassword,elem,deletePassword}) {
    const [ show,setShow]=useState('eye-icon')
  return (
    <li key={elem._id} >{elem.title } <button   onClick={() => {
        decryptPassword({
          password: elem.password,
          iv: elem.iv,
          _id: elem._id,
        });
        setShow("eye-icon-none")
      }} className={show}>👁‍🗨</button><button   style={{ fontSize:"20px"}} className={show} onClick={()=>{
        deletePassword(elem._id);
      }}>	
      &#128465;</button></li>
  )
}

export default Li