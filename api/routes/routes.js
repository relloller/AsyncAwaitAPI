'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => res.status(200).send("AsyncAwaitAPI /api"));

router.post('/register', (req,res) => {});

router.post('/login', (req,res) => {});


module.exports = router;