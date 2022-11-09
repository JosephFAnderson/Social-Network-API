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
            await User.findByIdAndUpdate(user._id, {$push: {thoughts: thoughtData._id}}, {new: true});

            res.status(200).json(thoughtData);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    updateThought: async (req, res) => {
        try{
            const thoughtData = await Thought.findByIdAndUpdate(req.params.id, {thoughtText: req.body.thoughtText}, {new: true});
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
    },
    addReaction: async (req, res) => {
        try{
            const reactionBody = req.body.reactionBody;
            const username = req.body.username;
            if(!reactionBody || !username){
                res.status(400).json("Invalid reaction");
                return;
            }            
            const newReaction = await Thought.findByIdAndUpdate(req.params.thoughtId, {$addToSet: {reactions: {reactionBody, username}}}, {new: true});
            res.status(200).json(newReaction);
        }catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    deleteReaction: async (req, res) => {
        try{
            const reactionId = req.body.reactionId;
            if(!reactionId){
                res.status(400).json("Invalid reaction id");
                return;
            }
            const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, {$pull: {reactions: {reactionId}}}, {new: true});
            res.status(200).json(updatedThought);
        }catch (err) {
            res.status(500).json(err);
        }
    }
}