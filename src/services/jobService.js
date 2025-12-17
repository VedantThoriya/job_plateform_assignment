const Job = require('../models/Job');

const getJobs = async () => {
    return await Job.find();
};

const getJobById = async (id) => {
    const job = await Job.findById(id);
    if (!job) {
        throw new Error('Job not found');
    }
    return job;
};

module.exports = {
    getJobs,
    getJobById
};
