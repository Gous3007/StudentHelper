const mongoose = require("mongoose");

let resumeSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    mobileno: Number,
    address: String,
    email: String,
    social: String,
    message: String,
    collegename: String,
    course: String,
    graduate: String,
    passyears: String,
    technialskills: String,
    softskills: String,
    frontendLanguage: String,
    backendLanguage: String,
    framework: String,
    database: String,
    firstCertificate: String,
    idate: String,
    project: String,
    secondProject: String,
    summary: String,
    signupUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signUpUser"
    }
});

module.exports = mongoose.model("ResumeData", resumeSchema);