import express from "express"
import jwt from "jsonwebtoken"
import { addUser, getUser, loginUser } from "./users.js"

const secretKey = process.env.JWT_SECRET_KEY || 'secret'

const authRouter = express.Router()

//signup
authRouter.post("/signup", (req, res) => {
    const user = req.body
    const newUser = addUser(user)
    res.status(201).send({
        "id": newUser.id,
        "name": newUser.name,
        "token": jwt.sign({ id: newUser.id, name: newUser.name }, secretKey, { expiresIn: '1h' })
    })
})

//login
authRouter.post("/login", (req, res) => {
    const user = loginUser(req.body.name, req.body.password)
    res.status(200).send({
        "id": user.id,
        "name": user.name,
        "token": jwt.sign({ id: user.id, name: user.name }, secretKey, { expiresIn: '1h' })
    })
})

//me
authRouter.get("/me", (req, res) => {
    const header = req.headers.authorization
    const token = header && header.split(' ')[1]
    if (!token) return res.status(401).send({ error: 'Unauthorized' })
    const data = jwt.verify(token, secretKey)
    if (!data.id) return res.status(401).send({ error: 'Unauthorized' })
    return res.status(200).send(getUser(data.id))
})

export default authRouter