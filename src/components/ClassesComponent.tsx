import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ClassesComponent() {
    const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] = useState(false);
    const [deletedClass, setDeletedClass] = useState({
        classId: 0,
        className: "",
    });

    const [classes, setClasses] = useState([{
        classId: 0,
        className: "",
        teacherId: "",
        teacherName:"",
        courseId: "",
        courseName:"",
        startDate: ""
    }]);

    useEffect(() => {
        refreshClassList();
    }, []);

    function refreshClassList() {
        fetch("http://localhost:8080/classes/allDetail", {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                const sortedClasses = [...data].sort((a, b) =>
                    a.className.localeCompare(b.className)
                );
                setClasses(sortedClasses);
            });
    }

    function handleDeleteClass() {
        const formData = new URLSearchParams();
        formData.append("classId", deletedClass.classId.toString());
        const response = fetch('http://localhost:8080/classes/delete', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        });

        response.then(() => {
            // fetch updated list
            refreshClassList();
        });
        setIsShowConfirmDeleteModal(false);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Class Management</h1>

            <table className="border-collapse border border-gray-400 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">Class name</th>
                        <th className="border border-gray-400 px-4 py-2">Teacher Name</th>
                        <th className="border border-gray-400 px-4 py-2">Course Name</th>
                        <th className="border border-gray-400 px-4 py-2">Start Date</th>
                        <th className="border border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((lop) => (
                        <tr>
                            <td className="border border-gray-400 px-4 py-2">{lop.className}</td>
                            <td className="border border-gray-400 px-4 py-2">{lop.teacherName}</td>
                            <td className="border border-gray-400 px-4 py-2">{lop.courseName}</td>
                            <td className="border border-gray-400 px-4 py-2">{lop.startDate}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2" onClick={() => {
                                    // setEditingStudent(student);
                                    // setShowEditModal(true);
                                }}>
                                    <Edit size={18} />
                                </button>

                                <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => {
                                    setDeletedClass(lop);
                                    setIsShowConfirmDeleteModal(true);
                                }}>
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {
                isShowConfirmDeleteModal &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                        <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Delete</h2>
                        <p className="mb-6">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-red-600">{deletedClass.className}</span>?
                            This action cannot be undone.
                        </p>
                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsShowConfirmDeleteModal(false)}
                                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteClass}
                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}