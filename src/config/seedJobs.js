const Job = require('../models/Job');
const sampleJobs = require('../../data/sampleJobs');

async function seedJobs() {
  try {
    const jobCount = await Job.countDocuments();
    if (jobCount > 0) {
      return;
    }

    console.log("Seeding jobs...");
    await Job.insertMany(sampleJobs);
    console.log("Sample jobs inserted");
  } catch (error) {
    console.error("Error seeding jobs:", error);
  }
}

module.exports = seedJobs;
