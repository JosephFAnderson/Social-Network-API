const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema( {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^([A-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
        }
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ]
}, {
    virtuals: {
        // Retrieves length of the user's friends array on query.
        friendCount: {
            get() {
                return this.friends.length;
            }
        }
    },
    toJSON: {
        getters: true
    }
});

const User = model('users', userSchema);

module.exports = User;