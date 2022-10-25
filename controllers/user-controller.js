const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

      deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json({ message: 'User successfully deleted!' }))
              // : Thought.findOneAndUpdate(
              //     { username: user.username },
              //     { $pull: { username: req.params.userId.username } },
              //     { new: true }
              //   )
        //  )
          // .then((thought) =>
          //   !thought
          //     ? res
          //         .status(404)
          //         .json({ message: 'No user with this id!' })
          //     : res.json({ message: 'User successfully deleted!' })
          // )
          .catch((err) => res.status(500).json(err));
      },

    addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId  } },
        { runValidators: true, new: true }
    )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
      },
      deleteFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId  } },
          { runValidators: true, new: true }
      )
          .then((user) =>
              !user
                  ? res.status(404).json({ message: 'No user with this id!' })
                  : res.json(user)
          )
          .catch((err) => {
              console.log(err);
              res.status(500).json(err);
          });
        },
}