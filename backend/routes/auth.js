const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   let obj = {
    name: 'khizer',
    age: 23
    }
    res.json(obj)
})

module.exports = router;