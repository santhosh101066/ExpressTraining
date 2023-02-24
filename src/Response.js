const express = require('express')
const route = express.Router()

route.get('/params/:id',(req,res)=>{
    console.dir(res.headersSent);
    res.append("Set-Cookie",'happy=true')
    res.append('Warning', '199 Miscellaneous warning')
    res.links({next:'/',last:'/request'})
    res.send(`<pre>
    prams :${req.params.id}
    headders: ${JSON.stringify(res.getHeaders())}
    </pre>`)
    console.log(res.headersSent);
})
route.get('/locate',(req,res)=>{
    res.location("/hiii")
    res.send("location Changes in headder : "+JSON.stringify(res.getHeaders()))
})
route.get('/redirect',(req,res)=>{
    res.redirect('/response/params/Aspire')
})
route.get('/file',(req,res)=>{
    res.attachment(__dirname+'../Public/aspires.jpeg')
    res.end()
})
route.get('/download',(req,res)=>{
    res.attachment(__dirname+'../Public/aspires.jpeg')
    res.send()
})


module.exports=route