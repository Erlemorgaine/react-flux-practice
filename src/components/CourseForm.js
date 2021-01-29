import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

const CourseForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <TextInput
                id="title"
                name="title"
                label="Title"
                value={props.course.title}
                onChange={props.onCourseChange}
                error={props.errors.title}
            />

            <div className="form-group">
                <label htmlFor="author">Author</label>
                <div className="field">
                    <select
                        id="author"
                        name="authorId"
                        className="form-control"
                        value={props.course.authorId || ""}
                        onChange={props.onCourseChange}
                    >
                        <option value=""></option>
                        <option value="1">Cory House</option>
                        <option value="2">Scott Allen</option>
                    </select>
                </div>
                {props.errors.authorId && <div className="alert alert-danger">{props.errors.authorId}</div>}
            </div>

            <TextInput
                id="category"
                name="category"
                label="Category"
                value={props.course.category}
                onChange={props.onCourseChange}
                error={props.errors.category}
            />

            <input type="submit" value="Save" className="btn btn-primary"/>
        </form>
    )
}

CourseForm.propTypes = {
    course: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCourseChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

export default CourseForm;