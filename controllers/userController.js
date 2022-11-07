const { User } = require('../models');

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
            res.status(200).json(`${deleted.username} has been removed from the document`);
        }catch (err) {
            res.status(500).json(err);
        }
    }
}