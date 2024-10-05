const express = require("express");
const app = express();
const users = require("./router/user.js");
const posts = require("./router/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions = {
    secret : "mysupersecretstring",
    resave : false,
    saveUninitialized : true
};

app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});
app.get("/register",(req,res)=>{
    let{name ="anonymous"} = req.query;
    req.session.name = name;
    //console.log(req.session.name);
    if(name === "anonymous"){
        req.flash("error","user not registered");
    }else{
        req.flash("success","user registered sucessfully!");
    }
    
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
    // res.send(`hello, ${req.session.name}`);
    //console.log(req.flash("success"));
    // res.locals.successMsg = req.flash("success");
    // res.locals.errorMsg = req.flash("error");//using middleware we can handle this
    res.render("page.ejs",{name : req.session.name});
});

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/test", (req,res)=>{
//     res.send("test successful");
// });

app.listen(3000,()=>{
    console.log("app is listening on port 3000");
});
