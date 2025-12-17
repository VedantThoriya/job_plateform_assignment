const express = require('express');
const router = express.Router();
const {
    getJobs,
    getJob
} = require('../controllers/jobController');

router.route('/')
    .get(getJobs)

router.route('/:id')
    .get(getJob)

module.exports = router;
