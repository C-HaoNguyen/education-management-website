import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAccessToken } from "../utils/AuthUtils";
import { Trash2 } from "lucide-react";

export default function ClassDetailsComponent() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const classId = params.get("classId");

    const [students, setStudents] = useState([{
        studentId: 1,
        studentName: "",
        email: "",
        birthday: "",
        phoneNumber: ""
    }]);

    useEffect(() => {
        loadListStudentsOfClass();
    }, []);

    async function loadListStudentsOfClass() {
        const formData = new URLSearchParams();

        if (!classId) {
            alert("No class ID provided");
            return;
        }
        formData.append("classId", classId);

        const response = await fetch(`http://localhost:8080/classes/get-list-students-of-class`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${getAccessToken()}`
            },
            body: formData,
        });

        if (!response.ok) {
            console.error("Error status:", response.status);
            console.error("Error text:", await response.text());
            return;
        }

        const text = await response.text();
        console.log("Raw response:", text);

        if (!text) {
            console.error("Empty response from server!");
            return;
        }

        const json = JSON.parse(text);
        setStudents(json);
    }

    return (
        <div>
            <h1>List students of class</h1>
            <table className="border-collapse border border-gray-400 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">Name</th>
                        <th className="border border-gray-400 px-4 py-2">Email</th>
                        <th className="border border-gray-400 px-4 py-2">Birthday</th>
                        <th className="border border-gray-400 px-4 py-2">Phone Number</th>
                        <th className="border border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr>
                            <td className="border border-gray-400 px-4 py-2">{student.studentName}</td>
                            <td className="border border-gray-400 px-4 py-2">{student.email}</td>
                            <td className="border border-gray-400 px-4 py-2">{student.birthday}</td>
                            <td className="border border-gray-400 px-4 py-2">{student.phoneNumber}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => {
                                    alert(`Delete student with ID: ${student.studentId}`);
                                }}>
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}