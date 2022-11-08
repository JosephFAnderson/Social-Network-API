const { User, Thought } = require('../models');

module.exports = {
    getAllUsers: async (req, res) => {
        try{
            const userData = await User.find();
            res.status(200).json(userData);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    getOneUser: async (req, res) => {
        try{
            const userData = await User.findById(req.params.id);

            !userData ? 
              res.status(400).json("User not found") : 
              res.status(200).json(userData);           
        }catch (err) {
            res.status(500).json(err);
        }
    },
    createUser: async (req, res) => {
        try{
            const userData = await User.create(req.body);
            res.status(200).json(userData);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    updateUser: async (req, res) => {
        try{
            const userData = await User.findByIdAndUpdate( req.params.id, {$set: req.body}, {new: true});
            res.status(200).json(userData);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    deleteUser: async (req, res) => {
        try{
            const deleted = await User.findByIdAndDelete(req.params.id);
            await Thought.deleteMany( {username: deleted.username} );
            res.status(200).json(`${deleted.username} has been removed from the document`);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    addFriend: async (req, res) => {
        try{
            const newFriend = await User.findByIdAndUpdate(req.params.userId, {$push: {friends: req.params.friendId}}, {new: true});
            res.status(200).json(newFriend);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    removeFriend: async (req, res) => {
        try{
            const deleted = await User.findByIdAndUpdate(req.params.userId, {$pull: {friends: req.params.friendId}}, {new: true})
            res.status(200).json(`Removed ${req.params.friendId} from user ${deleted.username}'s friends.`)
        }catch (err) {
            res.status(500).json(err);
        }
    }
}