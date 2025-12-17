const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');
const seedJobs = require('./config/seedJobs');

// Load env vars
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to database and start server
const startServer = async () => {
    await connectDB();
    await seedJobs();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
