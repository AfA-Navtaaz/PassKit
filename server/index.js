const express=require('express')
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json())
const PORT=process.env.PORT||8000
const {getpasswords,postpassword,deletepassword}=require('./db');
const {login,register}=require('./users')

const { encrypt, decrypt } = require("./encryption");




app.post("/push",(req,res)=>{
    const {password,title}=req.body;
    const hashedPassword = encrypt(password);
    
const t={
    
    title:title,
    password:hashedPassword.password,
    iv:hashedPassword.iv

}
      
    postpassword(t).then(()=>{res.status(201).send("done")}).catch((e)=>{res.status(402).send(e)});
})
app.get("/allpasswords",(req,res)=>{
     getpasswords().then((r)=>{res.status(200).send(r);}).catch((e)=>{console.log(e)});
    
})
app.post("/decryptpassword",(req,res)=>{
    res.send(decrypt(req.body));
})
app.delete("/remove",(req,res)=>{
const id=req.body.id;
console.log(req)
try{
    deletepassword(id).then((r)=>{res.send(r)}).catch((e)=>{console.log(e)});
}catch(e){
    res.status(500).send(e);
}

})



app.post("/login", (req, res)=> {
    login(req,res);
})
app.post("/register", (req, res)=> {
    register(req,res);
})
app.listen(PORT,()=>{
    console.log('app is running hurray');
})