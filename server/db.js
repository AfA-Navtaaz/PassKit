const mongoose=require('mongoose')
const DB='mongodb+srv://harshit123:nobita@cluster0.kxf5g.mongodb.net/Password-manager?retryWrites=true&w=majority'
mongoose.connect(DB).then(()=>{console.log('connection is successful')}).catch((e)=>{console.log(e)});

const passwordSchema= new mongoose.Schema({
    title:{type:String,unique:true,trim:true},
    password:String,
    iv:String
});

const Passwords = new mongoose.model("password",passwordSchema);
const postpassword =async (temp)=>{
    const pswd= new Passwords({
        title:temp.title,
        password:temp.password,
        iv:temp.iv
    });

    const res= await pswd.save();
    console.log("password inserted into the database successfully",res);
}

const getpasswords= async ()=>{
  const res= await Passwords.find();
  console.log(res);
  return res;
}
const deletepassword=async (id)=>{
   
    const res= await Passwords.findByIdAndDelete(id);
    return res;
}

//postpassword({title:'demo2',password:'demo2',iv:'demo2'});

//getpasswords();

module.exports={getpasswords,postpassword,deletepassword};