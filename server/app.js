const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/users', require("./api/users.js"));

const PORT = config.get("serverPort")

async function api() {
    try {
        await mongoose.connect(config.get("dbUrl"))
        app.listen(PORT, () => console.log(`App has been started on ${PORT}`));
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

api();