import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";
import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";

const ManageCoursePage = (props) => {
    const [ course, setCourse ] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: ""
    });

    const [courses, setCourses] = useState(courseStore.getCourses())
    const [errors, setErrors] = useState({});

    useEffect(() => {
        courseStore.addChangeListener(onChange);

        const slug = props.match.params.slug;

        if (courses.length === 0) {
            courseActions.loadCourses();
        } else if (slug) { // Can be an else if since course.length is an dependency, so useEffect will be fired again after course array is filled
            setCourse(courseStore.getCourseBySlug(slug));
        }
        
        return () => courseStore.removeChangeListener(onChange);
    }, [courses.length, props.match.params.slug]);

    function onChange() {
        setCourses(courseStore.getCourses());
    }

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
            courseActions.saveCourse(course).then(() => {
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