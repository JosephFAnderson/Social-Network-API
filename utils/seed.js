const seedThought = require('./thoughtData');
const seedUser = require('./userData');
const connection = require('../config/connection');

connection.on('err', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    console.log("Seeding Thought Data");
    await seedThought();
    console.log("Seeding User Data");
    await seedUser();

    process.exit(0);
});