/**
 * Keep-Alive Cron Job
 * -------------------
 * This cron job periodically sends a GET request to the backend API.
 *
 * Purpose:
 * - Used only during deployment/testing on free-tier hosting platforms
 * - Helps keep the service responsive for evaluation and testing
 *
 * Notes:
 * - This is infrastructure support logic, not part of core application features
 * - The job is configurable via environment variables
 */

const { CronJob } = require("cron");
const https = require("https");

/**
 * CRON SCHEDULES
 *
 * TEST_CRON_TIME:
 * - Used during local testing
 * - Runs every 5 seconds
 *
 * CRON_TIME:
 * - Production schedule
 * - Runs every 14 minutes
 * - Chosen to stay below common free-tier idle timeouts
 */
const TEST_CRON_TIME = "*/5 * * * * *";
const CRON_TIME = "*/14 * * * *";

/**
 * Create cron job instance
 */
const job = new CronJob(CRON_TIME, function () {
  // Backend URL to ping (from environment variable or fallback)
  const backendUrl = process.env.API_URL || "http://localhost:5000";

  console.log(`[CRON] Pinging backend: ${backendUrl}`);

  https
    .get(backendUrl, (res) => {
      const { statusCode } = res;

      if (statusCode === 200) {
        console.log(`[CRON] Success | Status: ${statusCode}`);
      } else {
        console.warn(`[CRON] Non-OK response | Status: ${statusCode}`);
      }

      // Consume response to free memory
      res.resume();
    })
    .on("error", (error) => {
      console.error(`[CRON] Request error: ${error.message}`);
    });
});

module.exports = job;

// CRON JOB EXPLANATION:
// Cron jobs are scheduled tasks that run periodically at fixed intervals
// we want to send 1 GET request for every 14 minutes

// How to define a "Schedule"?
// You define a schedule using a cron expression, which consists of 5 fields representing:

//! MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

//? EXAMPLES && EXPLANATION:
//* 14 * * * * - Every 14 minutes
//* 0 0 * * 0 - At midnight on every Sunday
//* 30 3 15 * * - At 3:30 AM, on the 15th of every month
//* 0 0 1 1 * - At midnight, on January 1st
//* 0 * * * * - Every hour