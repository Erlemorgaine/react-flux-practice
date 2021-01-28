import React from "react";
import { Prompt } from "react-router-dom";

const ManageCoursePage = (props) => {

    return (
        <>
            <h2>Manage course</h2>
            <Prompt when="true" message="Are you sure youwant to leave?"/>
            { props.match.params.slug }
        </>
    );
}

export default ManageCoursePage;