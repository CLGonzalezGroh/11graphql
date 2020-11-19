"use strict";

const { ObjectID } = require("mongodb");
const connectDB = require("./db");

module.exports = {
  Query: {
    getCourses: async () => {
      "List courses";
      let db;
      let courses = [];
      try {
        db = await connectDB();
        courses = await db.collection("courses").find().toArray();
      } catch (error) {
        console.error(error);
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
        console.error(error);
      }

      return course;
      // const course = courses.filter((course) => course._id === args.id);
      // return course.pop();
    },
  },
};
