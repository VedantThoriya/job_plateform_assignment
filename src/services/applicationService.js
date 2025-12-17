const Application = require('../models/Application');
const Job = require('../models/Job');

const applyForJob = async (userId, jobId, resumePath) => {
    const job = await Job.findById(jobId);
    if (!job) {
        throw new Error('Job not found');
    }

    // Check if already applied
    const alreadyApplied = await Application.findOne({
        job: jobId,
        applicant: userId
    });

    if (alreadyApplied) {
        throw new Error('You have already applied to this job');
    }

    const application = await Application.create({
        job: jobId,
        applicant: userId,
        resumeUrl: resumePath
    });

    return application;
};

const getUserApplications = async (userId) => {
    return await Application.find({ applicant: userId })
        .populate('job', 'title company location');
};


module.exports = {
    applyForJob,
    getUserApplications,
};
