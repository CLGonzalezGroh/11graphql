"use strict";

const { ObjectID } = require("mongodb");
const connectDB = require("./db");
const errorHandler = require("./errorHandler");

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: "",
      topic: "",
    };
    const newCourse = Object.assign(defaults, input);
    let db;
    let course;
    try {
      db = await connectDB();
      course = await db.collection("courses").insertOne(newCourse);
      newCourse._id = course.insertedId;
    } catch (error) {
      errorHandler(error);
    }
    return newCourse;
  },
  editCourse: async (root, { id, input }) => {
    let db;
    let course;
    try {
      db = await connectDB();
      await db
        .collection("courses")
        .updateOne({ _id: ObjectID(id) }, { $set: input });
      course = await db.collection("courses").findOne({ _id: ObjectID(id) });
    } catch (error) {
      errorHandler(error);
    }
    return course;
  },
  deleteCourse: async (root, { id }) => {
    let db;
    let course;
    try {
      db = await connectDB();
      course = await db.collection("courses").findOne({ _id: ObjectID(id) });
      await db.collection("courses").deleteOne({ _id: ObjectID(id) });
    } catch (error) {
      errorHandler(error);
    }
    return course;
  },
  createPerson: async (root, { input }) => {
    let db;
    let student;
    try {
      db = await connectDB();
      student = await db.collection("students").insertOne(input);
      input._id = student.insertedId;
    } catch (error) {
      errorHandler(error);
    }
    return input;
  },
  editPerson: async (root, { id, input }) => {
    let db;
    let student;
    try {
      db = await connectDB();
      await db
        .collection("students")
        .updateOne({ _id: ObjectID(id) }, { $set: input });
      student = await db.collection("students").findOne({ _id: ObjectID(id) });
    } catch (error) {
      errorHandler(error);
    }
    return student;
  },
  deletePerson: async (root, { id }) => {
    let db;
    let student;
    try {
      db = await connectDB();
      student = await db.collection("students").findOne({ _id: ObjectID(id) });
      await db.collection("students").deleteOne({ _id: ObjectID(id) });
    } catch (error) {
      errorHandler(error);
    }
    return student;
  },
  addPerson: async (root, { courseId, personId }) => {
    let db;
    let course;
    let person;
    try {
      db = await connectDB();
      course = await db
        .collection("courses")
        .findOne({ _id: ObjectID(courseId) });
      person = await db
        .collection("students")
        .findOne({ _id: ObjectID(personId) });
      if (!course || !person)
        throw new Error("The course or the person doesn't exist");

      await db
        .collection("courses")
        .updateOne(
          { _id: ObjectID(courseId) },
          { $addToSet: { people: ObjectID(personId) } }
        );
    } catch (error) {
      errorHandler(error);
    }
    return course;
  },
};
