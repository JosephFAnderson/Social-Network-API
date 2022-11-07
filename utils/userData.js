const { User } = require('../models');



const userData = [
    {
        username: "Tsunami278",
        email: "tsunami@gmail.com",
    },
    {
        username: "LawfulAwesome",
        email: "dragon@yahoo.com"
    },
    {
        username: "Sonix",
        email: "gottagofast@gmail.com"
    }
];

const seedUser = async () => {
    await User.deleteMany({});
    await User.insertMany(userData);
};

module.exports = seedUser;