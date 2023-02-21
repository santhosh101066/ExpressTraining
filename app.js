const express=require('express')
const morgan = require('morgan')
const app=express()
const port=3000

app.use(express.static("Public"))

app.use(morgan('dev'))
app.use((req,res,next)=>{
    console.log("Requested at "+new Date());
    next()
})
app.get('/hello',(req,res)=>{
    res.send("Hello World")
})

app.post('/',(req,res)=>{
    res.send("Got Post request")
})

app.put('/',(req,res)=>{
    res.send("Got Put request")
})

app.delete('/',(req,res)=>{
    res.send("Got Delete request")
})

app.listen(port,()=>{
    console.log(`Running on http://localhost:${port}`);
})