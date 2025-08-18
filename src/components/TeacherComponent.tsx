import TeacherAvatar from '../assets/TeacherAvatar.jpg';
import MaleTeacher from '../assets/MaleTeacher.jpg';

export default function TeacherComponent() {
    let teachers = [
        {id: 1, name: "Nguyen Van A", subject: "Mathematics"},
        {id: 2, name: "Nguyen Van B", subject: "Physics"},
        {id: 3, name: "Nguyen Van B3", subject: "Physics"},
        {id: 4, name: "Nguyen Van B4", subject: "Physics"},
        {id: 5, name: "Nguyen Van B5", subject: "Physics"},
        {id: 6, name: "Nguyen Van B6", subject: "Physics"},
        {id: 7, name: "Nguyen Van B7", subject: "Physics"},
        {id: 8, name: "Nguyen Van B8", subject: "Physics"},
        {id: 9, name: "Nguyen Van B9", subject: "Physics"},
        {id: 10, name: "Nguyen Van B10", subject: "Physics"},
    ]

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