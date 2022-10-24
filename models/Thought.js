const { Schema, model } = require('mongoose');
const Reaction = require('./Response');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => timeSince(date),
        
    },
    username: { 
        type: String, 
        required: true, 
    },
    description: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


thoughtSchema
.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;