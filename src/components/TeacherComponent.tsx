import TeacherAvatar from '../assets/TeacherAvatar.jpg';
import MaleTeacher from '../assets/MaleTeacher.jpg';

import React, { useEffect, useState } from 'react';

export default function TeacherComponent() {

	const [teachers, setTeachers] = useState([{
		teacherName: "Nguyen Van A",
		subject: "Java"
	}]);

	useEffect(() => {
		fetch("http://localhost:8080/teachers/all")
			.then(response => response.json())
			.then(data => setTeachers(data))
			.catch(error => console.error("Error:", error));
	}, []);

    const TeacherCard = ({imageUrl = TeacherAvatar, name, subject}) => {
        return (
            <div className="w-50 h-50">
                {/* Khối màu nền cho ảnh */}
                <div className="bg-gray-400">
                    <img
                        src={imageUrl}
                        alt={`Ảnh của ${name}`}
                        className="w-50 h-30"
                    />
                </div>
                {/* Tên và Môn dạy */}
                <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                    <p className="text-gray-500">{subject}</p>
                </div>
            </div>
        );
    };

    return <div className="grid grid-cols-5 gap-4">
        {teachers.map((teacher) => (
            <TeacherCard name={teacher.name} subject={teacher.subject}/>
        ))}
    </div>;
}