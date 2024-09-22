const express = require('express');
const router = express.Router();

const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const isLoggedIn = require('../routes/isLoggedIn');
const signUpUser = require('../models/signUpUser');
const resumeData = require('../models/resumedata');


router.get('/', (req, res, next) => {
  res.render('index');
});


router.get("/pdf", isLoggedIn, (req, res) => {
  // Query parameter se filename le rahe hain
  const fileName = req.query.file;

  // Check kar rahe hain agar filename nahi diya gaya ho
  if (!fileName) {
    return res.status(400).send("Filename is required");
  }

  const filePath = `./files/${fileName}`;

  // File read kar rahe hain aur response mein bhej rahe hain
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).send("PDF Not Available, please Try Again");
    }

    res.setHeader('Content-Type', 'application/pdf');
    // View ke liye Content-Disposition ko inline set karte hain
    res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
    res.send(data);
  });
});

router.get("/download", isLoggedIn, (req, res) => {
  const fileName = req.query.file;

  if (!fileName) {
    return res.status(400).send("Filename is required");
  }

  const filePath = `./files/${fileName}`;

  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("File Not Downloading");
    }
  });
});


router.get("/signup", (req, res) => {
  res.render("signup", { messages: req.flash('error') });
});

router.post("/signup", (req, res) => {
  const { fullname, collegename, email, mobileno, password } = req.body;

  if (!fullname || !collegename || !email || !mobileno || !password) {
    req.flash('error', 'Please fill up all fileds');
    return res.redirect("/signup");
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        console.log(err.message);
      }
      try {
        const existingUser = await signUpUser.findOne({ email });

        if (existingUser) {
          req.flash('error', 'Email already exists');
          return res.redirect("/signup");
        }
        let user = await signUpUser.create({
          fullname,
          collegename,
          email,
          mobileno,
          password: hash
        });

        const token = jwt.sign({ email }, "skcnke4xc3xcsd5");
        res.cookie("token", token);
        res.redirect("/profile");

      } catch (error) {
        console.error(error);
        req.flash('error', 'An error occurred');
        res.redirect("/signup");
      }
    });
  });
});

router.get("/login", (req, res) => {
  res.render("login", { messages: req.flash('error') });
});

router.post("/login", async (req, res) => {
  let userlogin = await signUpUser.findOne({ email: req.body.email });
  if (!userlogin) {
    req.flash('error', 'Incorrect Email');
    return res.redirect('/login');
  }

  bcrypt.compare(req.body.password, userlogin.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: userlogin.email }, "skcnke4xc3xcsd5");
      res.cookie("token", token);
      return res.redirect('/profile');
    }
    else {
      req.flash('error', 'Incorrect Password');
      return res.redirect('/login');
    }
  });

});

router.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/resume", isLoggedIn, (req, res) => {
  res.render('build-resume');
});

router.post("/resume", isLoggedIn ,async (req, res) => {
  try {
    let { firstname, lastname, mobileno, address, email, social, message, collegename, course, graduate,
      passyears, technialskills, softskills, frontendLanguage, backendLanguage, framework, database,
      firstCertificate, idate, project, secondProject, summary, _id } = req.body;

    let user = await signUpUser.findOne(_id);

    if (!user) {
      return res.status(404).send("user not found");
    }

    let resume = await resumeData.create({
      user: user._id,
      firstname, lastname, mobileno, address, email, social, message, collegename, course, graduate,
      passyears, technialskills, softskills, frontendLanguage, backendLanguage, framework, database,
      firstCertificate, idate, project, secondProject, summary
    });
    user.resumeData.push(resume._id);
    await user.save();
    res.redirect("/");

  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/resource",(req,res) => {
  res.render('resources');
});
module.exports = router;
