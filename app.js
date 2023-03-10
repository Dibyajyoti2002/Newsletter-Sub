const express=require("express");
const bodyParser=require("body-parser");
const en = require('dotenv').config();
const request=require("request");
const https=require("https");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})


app.post("/",function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    const data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME:lastName
            }
        }]
    };
    const jsonData=JSON.stringify(data);
    const list_id=process.env.LIST_ID;
    const url=process.env.URL;

    const options={
        method:"POST",
        auth:"dg:94dd24c5ebbd8a879493d04233e662f4-us17"
    }

    const request=http.request(url,options,function(response){
        if(response.statusCode===200)
        res.sendFile(__dirname+"/success.html");
        else
        res.sendFile(__dirname+"/failure.html");
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();
});


app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server listening on port 3000");
})

