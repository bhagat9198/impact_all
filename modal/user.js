const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  courses: [
    {
      name: {
        type: String,
        require: true
      },
      startDate: {
        type: Date,
        require: true
      },
      endDate: {
        type: Date,
        require: true
      }
    }
  ]

})

module.exports = mongoose.model("users", userSchema)