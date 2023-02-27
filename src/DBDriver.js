const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

router.get("/", async (req, res) => {
  await client.connect();
  const db = client.db("express");
  const data =await db.collection("products").find().toArray();
  res.json(data)
  await client.close()
});

router.post("/add",bodyParser.json(),async(req,res)=>{
    await client.connect()
    const db= client.db('express');
    const info= await db.collection('products').insertOne(req.body)
    res.json(info)
    await client.close()
    // console.log(req.body);
    // res.send(req.body)

})

router.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id
    await client.connect()
    const db= client.db('express');
    const info= await db.collection('products').deleteOne({_id:new ObjectId(id)})
    res.json(info)
    await client.close()
})

module.exports=router