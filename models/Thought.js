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
        get: date => {
            const newDate = new Date(date);
            return `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`
        }
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    virtuals: {
        reactionCount: {
            get() {
                return this.reactions.length;
            }
        }
    },
    toJSON: {
        getters: true
    },
    id: false
});

const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;