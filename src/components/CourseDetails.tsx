import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAccessToken } from "../utils/AuthUtils";

export default function CourseDetails() {
    const [course, setCourse] = useState({
        courseId: 0,
        description: "",
        duration: 0,
        details: ""
    });

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    let details = {
        courseId: 0,
        description: "",
        duration: 0,
        details: ""
    };
    const courseId = params.get("courseId");

    useEffect(() => {
        loadCourseDetails();
    }, []);

    async function loadCourseDetails() {
        const formData = new URLSearchParams();

        if (!courseId) {
            alert("No course ID provided");
            return;
        }

        formData.append("id", courseId);

        const response = await fetch(`http://localhost:8080/courses/course-details`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${getAccessToken()}`
            },
            body: formData,
        });

        details = await response.json();
        setCourse({
            courseId: details.courseId,
            description: details.description,
            duration: details.duration,
            details: details.details
        });
        console.log(details);
    }

    return (
        <>
            <div>Course Details</div>
            <div>
                <label htmlFor="description">Description: {course.description}</label>
            </div>

            <div>
                <label htmlFor="duration">Duration: {course.duration} months</label>
            </div>
            
            <div>
                <label htmlFor="details">Details: {course.details}</label>
            </div>
        </>
    );
}