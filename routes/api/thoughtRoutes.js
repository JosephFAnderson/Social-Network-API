const router = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,

} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reaction').put(addReaction);

module.exports = router;