const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Task', taskSchema);
