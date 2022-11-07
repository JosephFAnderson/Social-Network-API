const { Thought } = require('../models');

const thoughtData = [
    {
        thoughtText: "I like coding",
        username: "Tsunami278",
        reactions: {
            reactionBody: "I enjoy coding as well!",
            username: "LawfulAwesome"
        }
    },
    {
        thoughtText: "When I am not working, I enjoy playing DnD with friends",
        username: "LawfulAwesome",
        reactions: {
            reactionBody: "Got room for another player?",
            username: "NateIsGreat"
        }
    }
];

const seedThought = async () => {
    await Thought.deleteMany({});
    await Thought.insertMany(thoughtData);
};

module.exports = seedThought;