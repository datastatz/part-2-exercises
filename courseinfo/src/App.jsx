import React from "react";

const Course = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Total = (props) => {
  return (
    <>
      <strong>total of {props.total} exercises</strong>
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
  ];

  const backendCourses = [
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  // Calculate total exercises
  const totalExercises = courses
    .flatMap((course) => course.parts) // Combine all parts into a single array
    .reduce((accumulator, part) => accumulator + part.exercises, 0); // Sum up exercises

  return (
    <div>
      {/* Render all courses */}
      {courses.map((course) => (
        <div key={course.id}>
          <h1>{course.name}</h1>
          {course.parts.map((part) => (
            <Course key={part.id} name={part.name} exercises={part.exercises} />
          ))}
        </div>
      ))}

      <Total total={totalExercises} />

      {/* Render all backend courses */}
      {backendCourses.map((course) => (
        <div key={course.id}>
          <h1>{course.name}</h1>
          {course.parts.map((part) => (
            <Course key={part.id} name={part.name} exercises={part.exercises} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
