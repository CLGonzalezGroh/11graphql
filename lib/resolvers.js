"use strict";

const courses = [
  {
    _id: "jsjsj13323",
    title: "Introduction 1",
    teacher: "Marisa",
    description: "How to introduce",
    topic: "Math",
  },
  {
    _id: "jsjsj12113",
    title: "Introduction 2",
    teacher: "Marisa",
    description: "How to introduce",
    topic: "Math",
  },
  {
    _id: "jsjsj12113",
    title: "Introduction 3",
    teacher: "Marisa",
    description: "How to introduce",
    topic: "Math",
  },
];

module.exports = {
  hello: () => {
    "Resolver for hello";
    return "Hello resolver";
  },
  greeting: () => {
    "Resolver for greeting";
    return "greeting resolver";
  },
  getCourses: () => {
    "List courses";
    return courses;
  },
};
