import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { loadCourses, deleteCourse } from "../actions/courseActions";

function CoursesPage () {
    const [ courses, setCourses ] = useState(courseStore.getCourses());

    useEffect(() => {
        courseStore.addChangeListener(onChange);
        
        if (courses.length === 0) loadCourses();
        return () => courseStore.removeChangeListener(onChange); // this is called when component unmounts
    }, []); // We use an empty dependency array so that this is only called once

    function onChange() {
        setCourses(courseStore.getCourses());
    }

    return (
        <>
            <h2>Courses</h2>
            <Link to="/course" className="btn btn-primary">Add course</Link>
            <CourseList courses={courses} deleteCourse={deleteCourse}/>
        </>
    );
}

export default CoursesPage;