//jshint esversion:6

const bodyParser = require('body-parser');
const request = require('request');
const express = require('express');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));




app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
})
app.post("/",(req,res)=>{
    let firstName = req.body.fname;    
    let lastName = req.body.lname;
    let email = req.body.email;
    let data = {
        members:[
            {email_address: email,
             status:"subscribed",
             merge_fields:{
                FNAME: firstName,
                LNAME: lastName
             }
            }
            
        ]
    }

    let jsonData = JSON.stringify(data);
 
    

    var option = {
        url: "https://us11.api.mailchimp.com/3.0/lists/579bb1d5d7",
        method:"POST",
        headers:{
            "Authorization":"chimpchimp 341e0bf83357278c5ece3ac508252992-us11"
        },
        body:jsonData
        
    }
    request(option,(error,response,body)=>{
        if(error){
            console.log(error);
        }else{
            console.log(response.statusCode);
        }
    })
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})


//341e0bf83357278c5ece3ac508252992-us11
//579bb1d5d7.