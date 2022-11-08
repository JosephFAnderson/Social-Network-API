const { Thought, User } = require('../models');

module.exports = {
    getAllThoughts: async (req, res) => {
        try{
            const thoughtData = await Thought.find();
            res.status(200).json(thoughtData);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    getOneThought: async (req, res) => {
        try{
            const thoughtData = await Thought.findById(req.params.id);

            !thoughtData ? 
              res.status(400).json("Thought not found") :
              res.status(200).json(thoughtData);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    createThought: async (req, res) => {
        try{
            const user = await User.findOne({username: req.body.username});
            const thoughtData = await Thought.create(req.body);
            user.thoughts.push(thoughtData._id);
            await User.findByIdAndUpdate(user._id, user, {new: true});

            res.status(200).json(thoughtData);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    updateThought: async (req, res) => {
        try{
            const thoughtData = await Thought.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json(thoughtData);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    deleteThought: async (req, res) => {
        try{
            const thoughtData = await Thought.findByIdAndDelete(req.params.id);
            res.status(200).json(`${thoughtData._id} has been deleted.`)
        }catch (err) {
            res.status(500).json(err);
        }
    }
}