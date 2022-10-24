const express = require("express");
const app = express();
const mongoose = require("mongoose");
const logger = require("logger");
const bcryptjs = require("bcryptjs");

const cors = require("cors");
const jwt = require("jsonwebtoken");

const jwt_secrete="skadfhdsfghsdfghd";

const whitelist= ['http://localhost:3000/signup','http://localhost:3000'];
const corsOption ={
    origin : (origin,callback) => {
        if(whitelist.indexOf(origin ) !== -1 || !origin){
            callback(null,true)
        }
        else{
            callback(new Error('Not allowed ny CORS'));
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(corsOption));

app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Acess-Control-Allow-Headers","Origin,X-Requested-with, Content-Type,Accept");
    next();
})


app.use(express.json())


  


const mongoUrl = "mongodb+srv://yash:yash123@cluster0.zza4ad3.mongodb.net/test";

mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log("connected to database");
})
    .catch((e) => console.log(e));




const corsOptions ={
    origin:'http://localhost:3000/signup', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.post("/post", async (req, res) => {
    // console.log(req.body);
    console.log(req.body);
    res.send(req.body);
})

require("./schema/userDetails");

const user = mongoose.model("UserInfo");

app.post("/signup", async (req, res) => {
 
    const { name, uemail, upassword} = req.body;
    const encryptpassword = await bcryptjs.hash(upassword,10);
    try {
        let olduser = await user.findOne({email:uemail});

        if(olduser){
           return res.send({status:"User Exist"});
        }

        await user.create({
            uname: name,
            email: uemail,
            password: encryptpassword,
          
        });
        res.send({status:"ok"});
    

    } catch (error) {
        res.send({status:"error"});

    }
})

app.post("/login", async (req, res) => {
 
  try {
    const { uemail, upassword} = req.body;
    const validuser = await user.findOne({email:uemail})
    if(!validuser){
        return res.json({error:"User not found"});

    }
    if(await bcryptjs.compare(upassword,validuser.password)){
        const token = jwt.sign({email:validuser.email},jwt_secrete);
        if(res.status(201)){
            return res.json({status:"ok",data:token});
        }
        else{
            return res.json({status:"error"});
        }

    }
res.json({status:"error",error:"Invalid password"});
    
  } catch (error) {
    res.send(error.message)
    
  }
    
});

app.listen(5000, () => {
    console.log("server started");
})