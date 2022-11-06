const { Schema, Types } = require('mongoose');

const thoughScheme = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
    },
    username: {
        type: String,
        required: true
    },
    reactions: {
        type: Array, //nested documents from reactionSchema 
        ref: "reaction"
    }
}, {
    virtuals: {
        // Retrieves length of the thought's reactions array field on query
        reactionCount: {
            get() {
                return this.reactions.length;
            }
        }
    }
})