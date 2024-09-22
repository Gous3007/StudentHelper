const express = require('express');
const router = express.Router();
const { data } = require('../backend/data');

router.get("/resources",(req,res)=>{
    res.render('resources');
  });
  
router.get('/api/backend-resources', (req, res) => {
    res.json(data);
});

module.exports = router;