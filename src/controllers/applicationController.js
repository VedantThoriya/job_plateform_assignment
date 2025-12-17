const applicationService = require('../services/applicationService');

const applyJob = async (req, res) => {
    try {
        const { jobId } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a resume' });
        }

        const application = await applicationService.applyForJob(req.user.id, jobId, req.file.path);
        res.status(201).json(application);

    } catch (error) {
        console.error(error);
        if (error.message === 'Job not found') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'You have already applied to this job') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};

const getMyApplications = async (req, res) => {
    try {
        const applications = await applicationService.getUserApplications(req.user.id);
        res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    applyJob,
    getMyApplications
};
