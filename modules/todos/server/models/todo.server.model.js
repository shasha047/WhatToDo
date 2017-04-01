'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false
  }

});

mongoose.model('Todo', TodoSchema);
