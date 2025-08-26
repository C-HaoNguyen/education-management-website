import { useEffect, useState } from 'react';
import TeacherCard from './TeacherCard';


export default function TeacherComponent() {

	const [showAddModal, setShowAddModal] = useState(false);
	const [newTeacherName, setNewTeacherName] = useState("");
	const [newTeacherEmail, setNewTeacherEmail] = useState("");
	const [newTeacherPhoneNumber, setNewTeacherPhoneNumber] = useState("");
	const [hasError, setHasError] = useState(false);

	const [teachers, setTeachers] = useState([{
		teacherId: 1,
		teacherName: 'Nguyen Van A',
		email: 'a@gmail.com',
		phoneNumber: '012321421'
	}]);

	useEffect(() => {
		refreshTeacherList();
	}, []);

	function handleSaveNewTeacher() {
		if (newTeacherName == '' || newTeacherEmail == '' || newTeacherPhoneNumber == '') {
			setHasError(true);
			return;
		}
		const formData = new URLSearchParams();
		formData.append("teacherName", newTeacherName);
		formData.append("email", newTeacherEmail);
		formData.append("phoneNumber", newTeacherPhoneNumber);

		const response = fetch("http://localhost:8080/teachers/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: formData.toString(),
		});
		response.then(() => {
			refreshTeacherList();
			setShowAddModal(false);
			setNewTeacherName("");
			setNewTeacherEmail("");
			setNewTeacherPhoneNumber("");
			setHasError(false);
		})
			.catch(error => console.error("Error:", error));
	}

	function handleCancelAddTeacher() {
		setShowAddModal(false);
		setNewTeacherName("");
		setHasError(false);
	}

	function handleOnUpdatedTeacher() {
		refreshTeacherList();
	}

	function refreshTeacherList() {
		fetch("http://localhost:8080/teachers/all", {
			method: 'GET',
		})
			.then(res => res.json())
			.then(data => {
				const sortedTeachers = [...data].sort((a, b) =>
					a.teacherName.localeCompare(b.teacherName)
				);
				setTeachers(sortedTeachers);
			});
	}

	return (
		<div className="bg-white h-full p-6 rounded-lg shadow">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold text-gray-800">Teachers</h2>
				<button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
					onClick={() => setShowAddModal(true)}>
					Add Teacher
				</button>
			</div>

			{showAddModal ?
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg shadow-lg w-96 p-6">
						<h2 className="text-xl font-bold mb-4">Add New Teacher</h2>
						{hasError ? <h3 className='text-red-500'>Please enter all field before save modal!</h3> : <></>}
						<h4> Teacher Name:</h4> <input className="h-full w-full border border-green-200" value={newTeacherName} onChange={(e) => setNewTeacherName(e.target.value)} />
						<h4> Email:</h4> <input className="h-full w-full border border-green-200" value={newTeacherEmail} onChange={(e) => setNewTeacherEmail(e.target.value)} />
						<h4> Phone Number:</h4> <input className="h-full w-full border border-green-200" value={newTeacherPhoneNumber} onChange={(e) => setNewTeacherPhoneNumber(e.target.value)} />
						<div className="pt-2">
							<button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700  mr-2"
								onClick={handleSaveNewTeacher}>
								Save
							</button>
							<button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
								onClick={handleCancelAddTeacher}>
								Cancel
							</button>
						</div>
					</div>
				</div> : <></>
			}

			<div className="grid grid-cols-5 gap-4">
				{teachers.map((teacher) => (
					<TeacherCard key={teacher.teacherId} teacherId={teacher.teacherId} name={teacher.teacherName} email={teacher.email} phoneNumber={teacher.phoneNumber} 
					onUpdatedTeacher={handleOnUpdatedTeacher}/>
				))}
			</div>
		</div>
	);
}