'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Todo = mongoose.model('Todo'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an todo
 */
exports.create = function (req, res) {
  var todo = new Todo(req.body);
  todo.user = req.user;

  todo.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(todo);
    }
  });
};

/**
 * Show the current todo
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var todo = req.todo ? req.todo.toJSON() : {};

  // Add a custom field to the Todo, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Todo model.
  todo.isCurrentUserOwner = !!(req.user && todo.user && todo.user._id.toString() === req.user._id.toString());

  res.json(todo);
};

/**
 * Update an todo
 */
exports.update = function (req, res) {
  var todo = req.todo;

  todo.isDone = req.body.isDone;

  todo.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(todo);
    }
  });
};

/**
 * Delete an todo
 */
exports.delete = function (req, res) {
  var todo = req.todo;

  todo.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(todo);
    }
  });
};

/**
 * List of Todos
 */
exports.list = function (req, res) {
  Todo.find().exec(function (err, todos) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(todos);
    }
  });
};

/**
 * Todo middleware
 */
exports.todoByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Todo is invalid'
    });
  }

  Todo.findById(id).populate('user', 'displayName').exec(function (err, todo) {
    if (err) {
      return next(err);
    } else if (!todo) {
      return res.status(404).send({
        message: 'No todo with that identifier has been found'
      });
    }
    req.todo = todo;
    next();
  });
};
