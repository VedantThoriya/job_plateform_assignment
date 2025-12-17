const express = require('express');
const router = express.Router();
const {
    applyJob,
    getMyApplications
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('resume'), applyJob);
router.get('/me', protect, getMyApplications);

module.exports = router;
