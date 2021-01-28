import React, { useState } from "react";
import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
    const [ course, setCourse ] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: ""
    });

    function handleCourseChange({target}) {
        setCourse({...course, [target.name]: target.value});
    }

    function handleSubmit(event) {
        event.preventDefault();
        courseApi.saveCourse(course).then(() => {
            props.history.push("/courses");
            toast.success("Course saved");
        });
    }

    return (
        <>
            <h2>Manage course</h2>
            <Prompt when={true} message="Are you sure you want to leave?"/>
            <CourseForm course={course} onCourseChange={handleCourseChange} onSubmit={handleSubmit}/>
        </>
    );
}

export default ManageCoursePage;