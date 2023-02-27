const express = require("express");
const router = express.Router();
const multer=require('multer')
const uploads=multer({dest:'uploads/'})
const { renameSync }=require('fs')
router.post('/singlefile',uploads.single('single'),(req,res)=>{
    renameSync(req.file.path,'./uploads/'+req.file.originalname)
    res.send(`<script>
    alert("File Uploaded Sucessfully And the text field is ${req.body.text}")
    window.location.href='/'
    </script>`)
})
router.post('/multiple',uploads.array('multi',5),(req,res)=>{
    req.files.map(val=>{
        renameSync(val.path,'./uploads/'+val.originalname)
    })
    res.send(`<script>
    alert("Files Uploaded Sucessfully")
    window.location.href='/'
    </script>`)
})

module.exports=router