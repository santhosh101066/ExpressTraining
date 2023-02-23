const nodemon=require('nodemon')

nodemon({script:'app.js',env:{DEBUG:'express:*'}})
.on("start",()=>{console.log("Started");})
.on("exit",()=>console.log("Program Ended"))