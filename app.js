const express = require("express");
const morgan = require("morgan");
const compression=require('compression')
const { readFile } = require("fs");
const cors=require('cors')
const request = require("./src/Request");
const response = require("./src/Response");
const multerReq = require("./src/MulterProcess");
const Cookie=require('cookies');
const connectDB = require("./src/DBDriver");
const keys=["I will Keep You Secured"]
const app = express();
const admin=express()
const port = 3000;
app.use(compression())
app.use(cors())
app.use(express.static("Public"))
app.use('/content',express.static("uploads"))
app.engine("html", (filePath, options, next) => {
  readFile(filePath, (err, data) => {
    if (err) return next(err);
    let view = data.toString();
    options.val &&
      Object.entries(options.val).forEach(([key, value]) => {
        view = view.replace(`{{${key}}}`, value);
      });
    return next(null, view);
  });
});
app.set("view engine", "html");
app.set("views", ".");
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("Requested at " + new Date());
  next();
});

admin.on('mount',(parent)=>{
  console.log('Mounted');
})

admin.get("/",(req,res)=>{
  console.log(admin.mountpath);
  res.send("Admin Home")
})

app.use(['/admin','/manager'],admin)

app.use('/request',request)
app.use('/response',response)
app.use(multerReq)
app.use('/base',connectDB)

app.get("/", (req, res) => {
  const cookie=new Cookie(req,res,{keys})
  var last_visit=cookie.get('last_visit',{signed:true})
  cookie.set('last_visit',new Date().toTimeString(),{signed:true})
  let content =  last_visit? 'Welcome Back! Nothing Have changed since your last visit at '+last_visit : 'Welcome first time visitor!'
  res.render("index", { val: { name: "Aspire System" , content }  });
});

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  res.send("Got Post request");
});

app.put("/", (req, res) => {
  res.send("Got Put request");
});

app.delete("/", (req, res) => {
  res.send("Got Delete request");
});

app.get("/error", (req, res) => {
  throw new Error("Broken Page");
});

app.get('/closehost',(req,res)=>{
  res.send("Server is closed")
 server.close()
 
})


app.use((req,res)=>{
    res.status(404).send("Not Found")
})

var server= app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

