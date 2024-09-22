const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    fullname: String,
    collegename: String,
    email: String,
    mobileno: Number,
    password: String,
    resumeData: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResumeData"
    }]
});

module.exports = mongoose.model("signUpUser", userSchema);
