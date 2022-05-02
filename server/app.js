const express = require("express")
const mongoose = require("mongoose");
const config = require("config")

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/users', require("./api/users.js"))
app.use('/api/groups', require("./api/groups.js"))
app.use('/api/days/monday', require("./api/monday.js"))
app.use('/api/days/tuesday', require("./api/tuesday.js"))
app.use('/api/days/wednesday', require("./api/wednesday.js"))
app.use('/api/days/thursday', require("./api/thursday.js"))
app.use('/api/days/friday', require("./api/friday.js"))
app.use('/api/days/saturday', require("./api/saturday.js"))
app.use('/api/days/sunday', require("./api/sunday.js"))

const PORT = config.get("serverPort")

async function api() {
    try {
        await mongoose.connect(config.get("dbUrl"))
        app.listen(PORT, () => console.log(`App has been started on ${PORT}`))
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

api();