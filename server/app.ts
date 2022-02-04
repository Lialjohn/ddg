import express from "express"
import session from 'express-session'
import SeqStore from 'connect-session-sequelize'
import db from './db'

const seqStore = SeqStore(session.Store)
const store = new seqStore({db})
const app: express.Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    store,
    secret: 'tempsecret',
    name: "SeshID",
    resave: false,
    saveUninitialized: false
}))

app.use("/", express.static("build/"))


export default app