const express = require('express')
const router = express.Router()

const connecttodb = require('./mongo/index.js')

router.get("/", async (req, res) => {
    const client = await connecttodb();
    const dbo = client.db("sampledb")
    const result = await dbo.collection("ecommerce").find({}, { projection: { _id: 0 } }).toArray();
    res.status(200).json(result)
})
router.get("/:id", async (req, res) => {
    console.log(req.params.id)
    const client = await connecttodb();
    const dbo = client.db("sampledb")
    const query = { id: parseInt(req.params.id) };
    const result = await dbo.collection("ecommerce").findOne(query,{ projection: { _id: 0 } });
    res.status(200).json(result)
})
router.post("/", async (req, res) => {
    const client = await connecttodb();
    const dbo = client.db("sampledb");
    const data = req.body;
    let check = false;
    for (const key in data) {
        if (key == "id" || key == "product_id" || key == "product_name" || key == "price" || key == "category" || key == "discount") {
            check = true
            continue;
        } else {
            check = false;
            res.status(400).json({ message: "Bad request" })
            break;
        }
    }
    if (check) {
        const result = await dbo.collection("ecommerce").insertOne(req.body)
        res.status(201).json({ message: "created", data: req.body })

    }
})

router.put("/:id",async (req,res)=>{
    const client = await connecttodb();
    const dbo=client.db("sampledb");
    const data = req.body;
    let check = false;
    for (const key in data) {
        if (key == "id" || key == "product_id" || key == "product_name" || key == "price" || key == "category" || key == "discount") {
            check = true
            continue;
        } else {
            check = false;
            res.status(400).json({ message: "Bad request" })
            break;
        }
    }
   
    if (check) {
    const result=await dbo.collection("ecommerce").updateOne({id:parseInt(req.params.id)},{$set:req.body})
    res.status(200).json({ message: "updated", data: req.body })
    }
})

router.delete("/:id",async(req,res)=>{
    const client= await connecttodb();
    const dbo=client.db("sampledb")
    const result=await dbo.collection("ecommerce").deleteOne({id:parseInt(req.params.id)})
    res.status(200).json({message:"deleted successfully"})
})

module.exports = router;