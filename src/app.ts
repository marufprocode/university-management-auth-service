import cors from 'cors'
import express, { Application, Request, Response } from 'express'
const app: Application = express()

// Application routes

// using cors
app.use(cors())

// parse data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('University Management Authentication Server Running')
})

export default app
