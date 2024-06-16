

import express from "express"
import os from "node:os"
import Sodas from "./responses/sodas.js"

const app = express()
const host = 1234

app.use(express.json())

const descriptions = {
    404: "not found",
    200: "good response"
}

const AddResponseData = (status, data) => {
    return {
        description: descriptions[status],
        status: status,
        data: data,
        timesec: Date.now()
    }
}

// app.use("/", (req, res, next) => {
   
//     if (req.method !== "POST") {return next()}
//     let data = ""

//     req.on('data', chunk => {
//         data += chunk.toString()
//     })

//     req.on('end', () => {
//         data = JSON.parse(data)
//         req.body = data
//         next()
//     })
// })

app.post('/sodas', (req, res, next) => {
    

    res.json(req.body)
})

app.get('/sodas', (req, res) => {

    const {lowerto} = req.query

    if (lowerto) {
        const filteredSodas = Sodas.sodas.filter((item) => {
            const itemPrice = item.price
            
            if (itemPrice < lowerto) {
                return true
            }
            return false
        })

        res.send(AddResponseData(200, filteredSodas))
        return
    }

    res.send(AddResponseData(200, Sodas))
})

app.get("/sodas/search/:name", (req, res) => {
    const {name} = req.params
    const newJson = Sodas.sodas.filter((item) => {
        if (item.name.toLowerCase().includes(name.toLowerCase()) === true) {
            return true
        }
        return false
    })

    if (newJson.length > 0) {
        res.json(AddResponseData(200, newJson))
        return
    }
    res.json(AddResponseData(404, {}))
})

app.use((req, res) => {
    res.status(404).json(AddResponseData(404, {}))
})

app.listen(host, () => {
    console.log('Server listening at host: ' + host)
})