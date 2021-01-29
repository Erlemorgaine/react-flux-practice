import React, { useState, useEffect } from "react";
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

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const slug = props.match.params.slug;

        if (slug) {
            courseApi.getCourseBySlug(slug).then(_course => setCourse(_course));
        }
        
    }, [props.match.params.slug]);

    function handleCourseChange({target}) {
        setCourse({...course, [target.name]: target.value});
    }

    function formIsValid() {
        const _errors = {};

        if (!course.title) _errors.title = "Title is required";
        if (!course.authorId) _errors.authorId = "Author is required";
        if (!course.category) _errors.category = "Category is required";

        setErrors(_errors);
        // Return true if there are no errors
        return Object.keys(_errors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (formIsValid()) {
            courseApi.saveCourse(course).then(() => {
                props.history.push("/courses");
                toast.success("Course saved");
            });
        };
    }

    return (
        <>
            <h2>Manage course</h2>
            <Prompt when={true} message="Are you sure you want to leave?"/>
            <CourseForm 
                course={course} 
                onCourseChange={handleCourseChange} 
                onSubmit={handleSubmit}
                errors={errors}
            />
        </>
    );
}

export default ManageCoursePage;