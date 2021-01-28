import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../api/courseApi";
import CourseList from "./CourseList";

function CoursesPage () {
    const [ courses, setCourses ] = useState([]);

    useEffect(() => {
        getCourses().then(_courses => setCourses(_courses));
    }, []); // We use an empty dependenc array so that this is only called once

    return (
        <>
            <h2>Courses</h2>
            <Link to="/course" className="btn btn-primary">Add course</Link>
            <CourseList courses={courses}/>
        </>
    );
}

export default CoursesPage;