import { ChangeEvent, useState, useEffect, ChangeEventHandler } from "react";

export default function CourseComponent() {

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [course, setCourse] = useState({ name: 'Spring Boot', time: 5 })
    const [editingCourse, setEditingCourse] = useState({ courseId: 0, description: "Default" });
    const [deletedCourse, setDeletedCourse] = useState({ courseId: 0, description: "Default" });
    const [courses, setCourses] = useState([{
        courseId: 1,
        description: "Default Courses"
    }]);
    const [newCourseName, setNewCourseName] = useState("");
    const [filterValue, setFilterValue] = useState("");


    useEffect(() => {
        const token = localStorage.getItem("access_token");
        fetch("http://localhost:8080/courses/all", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
        })
            .then(response => response.json())
            .then(data => {
                // sort part
                const sortedCourses = [...data].sort((a, b) =>
                    a.description.localeCompare(b.description)
                );
                // filter part
                if (filterValue === "") {
                    setCourses(sortedCourses);
                } else {
                    const filteredCourses = sortedCourses.filter(value => value.description.includes(filterValue));
                    setCourses(filteredCourses)
                }

            })
            .catch(error => console.error("Error:", error));
            
    }, [filterValue]); //dependency object

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
        if (newCourseName == '') {
            alert("Vui lòng nhập tên khóa học!");
            return;
        }
        const formData = new URLSearchParams();
        formData.append("courseDescription", newCourseName);
        const response = fetch('http://localhost:8080/courses/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        });

        response.then(() => {
            // fetch updated list
            fetch("http://localhost:8080/courses/all", {
                method: 'GET',
            })
                .then(res => res.json())
                .then(data => {
                    const sortedCourses = [...data].sort((a, b) =>
                        a.description.localeCompare(b.description)
                    );
                    setCourses(sortedCourses)
                });
        });
        setNewCourseName('');
        setShowAddModal(false);
    }

    function handleCancelAddCourse() {
        setNewCourseName('');
        setShowAddModal(false);
    }

    function handleEditCourseName(e: ChangeEvent<HTMLInputElement>) {
        //Java Basic 2343254325
        const newUpdatingCourseName = e.target.value;
        editingCourse.description = newUpdatingCourseName;
    }

    function handleEditCourse() {
        const formData = new URLSearchParams();
        formData.append("id", editingCourse.courseId.toString());
        formData.append("courseDescription", editingCourse.description);
        const response = fetch('http://localhost:8080/courses/update', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        });

        response.then(() => {
            // fetch updated list
            fetch("http://localhost:8080/courses/all", {
                method: 'GET',
            })
                .then(res => res.json())
                .then(data => {
                    const sortedCourses = [...data].sort((a, b) =>
                        a.description.localeCompare(b.description)
                    );
                    setCourses(sortedCourses)
                });
        });
        setShowEditModal(false);
    }

    function handleDeleteCourse() {
        const formData = new URLSearchParams();
        formData.append("id", deletedCourse.courseId.toString());
        const response = fetch('http://localhost:8080/courses/delete', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        });

        response.then(() => {
            // fetch updated list
            fetch("http://localhost:8080/courses/all", {
                method: 'GET',
            })
                .then(res => res.json())
                .then(data => {
                    const sortedCourses = [...data].sort((a, b) =>
                        a.description.localeCompare(b.description)
                    );
                    setCourses(sortedCourses)
                });
        });
        setShowConfirmDeleteModal(false);
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Course Management</h1>
                {/* Thanh tìm kiếm (optional) */}
                <div className="hidden md:block">
                    <div className="relative w-128">
                        <input
                            type="text"
                            placeholder="Search by course name..."
                            className="w-full h-10 px-3 py-1 rounded bg-white text-black border-gray focus:outline-blue-500"
                            onChange={(e) => setFilterValue(e.target.value)}
                        />
                        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                            />
                        </svg>
                    </div>
                </div>
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
                        <h4> Course Name:</h4> <input className="h-full w-full border border-green-200" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} />
                        <div className="pt-2">
                            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700  mr-2"
                                onClick={handleSaveNewCourse}>
                                Save
                            </button>
                            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={handleCancelAddCourse}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div> : <></>
            }

            {showEditModal &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                        <h2 className="text-xl font-bold mb-4">Edit Course</h2>
                        <h4> Course Name: </h4>
                        <input className="h-full w-full border border-green-200" defaultValue={editingCourse.description} onChange={handleEditCourseName} />
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700  mr-2"
                            onClick={handleEditCourse}>
                            Save
                        </button>
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
                                onClick={handleDeleteCourse}
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