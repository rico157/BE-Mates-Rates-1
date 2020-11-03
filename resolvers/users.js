const User = require('../models/users');
const mongoose = require('mongoose');

const userResolvers = {
    users: () => {
        return User.find()
        .then((result) => {
            return result
        })
    },
    userById: ( { id }) => {
        const mongooseID = mongoose.Types.ObjectId(id);
        return User.findById(mongooseID)
        .then((result) => {
            return result
        })
    },
    createUser: ({ userInput }) => {
        const newUser = new User({
            name: userInput.name,
            username: userInput.username,
            avatarURL: userInput.avatarURL,
        });
        return newUser.save()
    },
    updateUser: ({ id, userInput }) => {
        const mongooseID = mongoose.Types.ObjectId(id);
        return User.findByIdAndUpdate(mongooseID, userInput)
    }
}

module.exports = { userResolvers }