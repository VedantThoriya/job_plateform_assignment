const jobService = require('../services/jobService');

const getJobs = async (req, res) => {
    try {
        const jobs = await jobService.getJobs();
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getJob = async (req, res) => {
    try {
        const job = await jobService.getJobById(req.params.id);
        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        if (error.message === 'Job not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getJobs,
    getJob
};
