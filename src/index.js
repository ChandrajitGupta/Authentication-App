import express from 'express'
import authRouter from './auth.js'
import cors from 'cors'

const app = express()

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.json(`Hello Jee`)
})

app.use("/api/auth", authRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})