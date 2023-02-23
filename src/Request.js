const express = require('express')
const router=express.Router()
const bodyParser=require('body-parser')

router.get('/base',(req,res)=>{
    res.send(req.baseUrl)
})
router.get('/pass/:info',(req,res)=>{
    res.send(req.params.info+" "+req.fresh+" "+req.hostname+" "+req.ip+" "+req.method+" ")
})
router.post('/text',bodyParser.text({extended:false}),(req,res)=>{
    res.send(req.body)
})
router.post('/json',bodyParser.json(),(req,res)=>{
    res.send(req.body)
})


module.exports=router