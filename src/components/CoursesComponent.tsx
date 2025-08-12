import {useState} from "react";

export default function CourseComponent() {

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [count, setCount] = useState(0);

    const courses = [
        {id: 1, name: "React Basics", category: "Web Development", instructor: "John Doe"},
        {id: 2, name: "Java Spring Boot", category: "Backend", instructor: "Jane Smith"},
        {id: 3, name: "Java Spring Boot", category: "Backend", instructor: "Jane Smith"},
        {id: 4, name: "Java Spring Boot", category: "Backend", instructor: "Jane Smith"},
        {id: 5, name: "Java Spring Boot", category: "Backend", instructor: "Jane Smith"},
        {id: 6, name: "Java Spring Boot", category: "Backend", instructor: "Jane Smith"},
        {id: 7, name: "Java Spring Boot", category: "Backend", instructor: "Jane Smith"},
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Course Management, số lần Add Course: {count}</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => {
                    setShowAddModal(true);
                    setCount(count + 1)
                }}>
                    + Add Course
                </button>
            </div>

            {/* Modal/Dialog/Popup */}
            {showAddModal ?
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                        <h2 className="text-xl font-bold mb-4">Add New Course</h2>
                        <h4> Course Name: Please enter course name</h4>
                        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={() => setShowAddModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div> : <></>
            }

            {showEditModal ?
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                        <h2 className="text-xl font-bold mb-4">Edit Course</h2>
                        <h4> Course Name: Spring Boot</h4>
                        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={() => setShowEditModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div> : <></>
            }

            {
                showConfirmDeleteModal ?
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                            <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Delete</h2>
                            <p className="mb-6">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold"> Spring Boot</span>?
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
                    </div> : <></>
            }


            {/* Table */}
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-200">
                    <th className="p-3 text-left">Course Name</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Instructor</th>
                    <th className="p-3 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((course) => (
                    <tr key={course.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{course.name}</td>
                        <td className="p-3">{course.category}</td>
                        <td className="p-3">{course.instructor}</td>
                        <td className="p-3 space-x-2">
                            <button className="text-blue-600 hover:underline"
                                    onClick={() => setShowEditModal(true)}>Edit
                            </button>
                            <button
                                onClick={() => setShowConfirmDeleteModal(true)}
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