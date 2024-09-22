const mongoose = require('mongoose');
const config = require("config");
const debug = require("debug")("development:mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/StudentHeler`).then(() => {
    debug("connected Succesfully");
}).catch((err) => {
    console.error("Connection Error", err);
});

module.exports = mongoose.connection;
