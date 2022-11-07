const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // get: date => format date return here
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    virtuals: {
        // Retrieves length of the thought's reactions array field on query
        reactionCount: {
            get() {
                return this.reactions.length;
            }
        }
    },
    toJSON: {
        getters: true
    }
});

const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;