"use strict";

const { ObjectID } = require("mongodb");
const connectDB = require("./db");
const errorHandler = require("./errorHandler");

module.exports = {
  getCourses: async () => {
    "List courses";
    let db;
    let courses = [];
    try {
      db = await connectDB();
      courses = await db.collection("courses").find().toArray();
    } catch (error) {
      errorHandler(error);
    }

    return courses;
  },

  getCourse: async (root, { id }) => {
    "List course by id";
    let db;
    let course = "";
    try {
      db = await connectDB();
      course = await db.collection("courses").findOne({ _id: ObjectID(id) });
    } catch (error) {
      errorHandler(error);
    }

    return course;
  },
  getPeople: async () => {
    "List student";
    let db;
    let students = [];
    try {
      db = await connectDB();
      students = await db.collection("students").find().toArray();
    } catch (error) {
      errorHandler(error);
    }

    return students;
  },

  getPerson: async (root, { id }) => {
    "List student by id";
    let db;
    let student = "";
    try {
      db = await connectDB();
      student = await db.collection("students").findOne({ _id: ObjectID(id) });
    } catch (error) {
      errorHandler(error);
    }

    return student;
  },
};
