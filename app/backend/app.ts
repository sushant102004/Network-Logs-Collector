import express from 'express'
import mongoose from 'mongoose'
import { Response, Request } from 'express'

const app = express()
const PORT = 3000

mongoose.set('strictQuery', false)

mongoose.connect
('mongodb://root:root1234@127.0.0.1:27017/networkLogsVisualizer?authSource=admin')
    .then(() => {
        app.listen(PORT)
        console.log(`Listening On Port : ${PORT}`)
    }).catch((err) => console.log(err))


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'This is home route.'
    })
})