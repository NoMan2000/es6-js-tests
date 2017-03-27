import chai from 'chai';
import db from './../../../db/db.js';
import mongoDB from 'mongodb';
import task from './../../../models/task.js';

const expect = chai.expect;

describe("Task model tests", () => {
  let sampleTask,
    sampleTasks;

  before( (done) => {
    db.connect("mongodb://localhost/todotest", done);
  });

  after( () => {
    db.close();
  });

});