const {Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $addToSet: { thoughts: thought._id } },
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'Thought created, but found no user with that ID',
                })
              : res.json('Created the thought 🎉')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    //   deleteUser(req, res) {
    //     User.findOneAndRemove({ _id: req.params.videoId })
    //       .then((user) =>
    //         !user
    //           ? res.status(404).json({ message: 'No user with this id!' })
    //           : User.findOneAndUpdate(
    //               { videos: req.params.videoId },
    //               { $pull: { videos: req.params.videoId } },
    //               { new: true }
    //             )
    //       )
    //       .then((user) =>
    //         !user
    //           ? res
    //               .status(404)
    //               .json({ message: 'Video created but no user with this id!' })
    //           : res.json({ message: 'Video successfully deleted!' })
    //       )
    //       .catch((err) => res.status(500).json(err));
    //   },

}