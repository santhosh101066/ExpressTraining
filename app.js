const express = require("express");
const morgan = require("morgan");
const compression=require('compression')
const { readFile } = require("fs");
const request = require("./src/Request");
const response = require("./src/Response");
const multerReq = require("./src/MulterProcess");
const app = express();
const admin=express()
const port = 3000;
app.use(compression())
// app.use(express.static("Public"))
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
app.set("views", "./Public");
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

app.get("/", (req, res) => {
  res.render("index", { val: { name: "Aspire System" } });
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


app.use((req,res)=>{
    res.status(404).send("Not Found")
})

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
