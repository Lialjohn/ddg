import db from './db'
import apiRouter from './api'
import authRouter from './auth/local'
import app from './app'
import * as path from "path"

const PORT_DEV = 3001

// api routes

app.use('/auth', authRouter)
app.use('/api', apiRouter)

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build/index.html'))
})

app.use((req, res) => {
    // needs more error page
    res.json('not found')
})

const syncDb = () => db.sync({force: true})

const startListening = () => {
    app.listen(PORT_DEV, () => {
        console.log(`Example app listening on port ${PORT_DEV}!`)
    })
}
const boot = async () => {
    await syncDb()
    await startListening()
}

boot()