const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Username required.',
    trim: true,
  },
  email: {
    type: String,
    required: 'Email address required.',
    unique: true,
    match: [/.+@.+\..+/, 'Must match a valid email address.']
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
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

// Define a virtual property 'friendCount'
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Define a virtual property 'thoughtCount'
UserSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.length;
});

const User = model('User', UserSchema);

module.exports = User;