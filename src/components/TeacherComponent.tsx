import { useEffect, useState } from 'react';
import TeacherCard from './TeacherCard';


export default function TeacherComponent() {

	const [teachers, setTeachers] = useState([{
		teacherName: 'Nguyen Van A',
		email: 'a@gmail.com',
        phoneNumber: '012321421'
	}]);

	useEffect(() => {
		fetch("http://localhost:8080/teachers/all")
			.then(response => response.json())
			.then(data => setTeachers(data))
			.catch(error => console.error("Error:", error));
	}, []);

    return <div className="grid grid-cols-5 gap-4">
        {teachers.map((teacher) => (
            <TeacherCard name={teacher.teacherName} email={teacher.email} phoneNumber={teacher.phoneNumber}/>
        ))}
    </div>;
}