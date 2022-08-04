const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const db = require('./database_config/DB_connection')
const objectId = require('mongodb').ObjectId

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

////////////////////////////////////////////////////////////////////////////////////

app.get('/categories', async (req, res) => {
    let data = await db.get().collection('categories').find().toArray()
    // console.log(data)
    res.send(data)
})

app.post('/categories', (req, res) => {
    // console.log(req.body)
    db.get().collection('categories').insertOne(req.body).then((res) => {
        // console.log(res)
    })
})

app.post('/products', (req, res) => {
    // console.log(req.body)
    db.get().collection('products').insertOne(req.body).then((res) => {
        // console.log(res)
    })
})

app.put('/products', async (req, res) => {
    // console.log(req.body)
    let data = await db.get().collection('products').find({ category: { $in: req.body.subs } }).toArray()
    res.send(data)
})

app.get('/category/:id', async (req, res) => {
    let data = await db.get().collection('categories').aggregate([
        {
            $match: { _id: objectId(req.params.id) }
        },
        {
            $lookup: {
                from: "categories",
                localField: "subCategories",
                foreignField: "category",
                as: "subs"
            }
        }
    ]).toArray()
    // console.log(data) 
    res.send(data)
})

////////////////////////////////////////////////////////////////////////////////////

db.connect((err) => {
    if (err) console.log('Database connection error : ' + err)
    else console.log('Database connected')
})

app.listen(process.env.PORT, () => {
    console.log(`server started running in port : ${process.env.PORT}`)
})