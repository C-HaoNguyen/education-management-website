import {ChangeEvent, useState, useEffect} from "react";

export default function CourseComponent() {

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [course, setCourse] = useState({name: 'Spring Boot', time: 5})
    const [editingCourse, setEditingCourse] = useState({courseId: 0, description: "Default"});
    const [deletedCourse, setDeletedCourse] = useState({courseId: 0, description: "Default"});
    const [courses, setCourses] = useState([{
        courseId: 1,
        description: "Default Courses"
    }]);
    const [newCourseName, setNewCourseName] = useState("");


    useEffect(() => {
        fetch("http://localhost:8080/courses/all")
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error("Error:", error));
    }, []);

    function checkTimeValue(event: ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value;
        const numericValue = Number(newValue); // convert sang number

        if (!isNaN(numericValue)) {
            console.log("New value is correct!");
        } else {
            console.log("Please update correct number!");
        }
    }

    function handleSaveNewCourse() {
        console.log('Handle save');
        const formData = new URLSearchParams();
        formData.append("courseDescription", newCourseName);
        fetch('http://localhost:8080/courses/add', {
            method: 'POST',
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
          })
          .then(() => {
            // fetch updated list
            return fetch("http://localhost:8080/courses/all")
                .then(res => res.json())
                .then(data => setCourses(data));
        });
        setShowAddModal(false);
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Course Management</h1>
                <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={() => {
                    setShowAddModal(true);
                }}>
                    + Add Course
                </button>
            </div>

            {/* Modal/Dialog/Popup */}
            {showAddModal ?
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                        <h2 className="text-xl font-bold mb-4">Add New Course</h2>
                        <h4> Course Name:</h4> <input className="h-full w-full border border-green-200" value={newCourseName} onChange= {(e) => setNewCourseName(e.target.value)}/>
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                onClick={handleSaveNewCourse}>
                            Save
                        </button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={() => setShowAddModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div> : <></>
            }

            {showEditModal &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                        <h2 className="text-xl font-bold mb-4">Edit Course</h2>
                        <h4> Course Name: </h4> <input className="h-full w-full border border-green-200" defaultValue={editingCourse.description}/>
                        <h4> Time (month):</h4> <input onChange={checkTimeValue} defaultValue={0}/>
                        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={() => setShowEditModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            }

            {
                showConfirmDeleteModal &&
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                            <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Delete</h2>
                            <p className="mb-6">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold text-red-600">{deletedCourse.description}</span>?
                                This action cannot be undone.
                            </p>
                            {/* Actions */}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowConfirmDeleteModal(false)}
                                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setShowConfirmDeleteModal(false)}
                                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
            }


            {/* Table */}
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-200">
                    <th className="p-3 text-left">Course Name</th>
                    <th className="p-3 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((course) => (
                    <tr key={course.courseId} className="border-b hover:bg-gray-50">
                        <td className="p-3">{course.description}</td>
                        <td className="p-3 space-x-2">
                            <button className="text-blue-600 hover:underline"
                                    onClick={() => {
                                        setEditingCourse(course);
                                        setShowEditModal(true);
                                    }}>Edit
                            </button>
                            <button
                                onClick={() => {
                                    setDeletedCourse(course);
                                    setShowConfirmDeleteModal(true)
                                }}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}