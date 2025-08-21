import TeacherAvatar from '../assets/TeacherAvatar.jpg';

type TeacherCardProps = {
    name: string;
    email: string;
    phoneNumber: string;
  };

export default function TeacherCard({name, email, phoneNumber} : TeacherCardProps) {
    return (
        <div className="w-50 h-50">
            {/* Khối màu nền cho ảnh */}
            <div className="bg-gray-400">
                <img
                    src={TeacherAvatar}
                    alt={`Ảnh của ${name}`}
                    className="w-50 h-30"
                />
            </div>
            {/* Tên và Môn dạy */}
            <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                <p className="text-gray-500">{email}</p>
                <p className="text-gray-500">{phoneNumber}</p>
            </div>
        </div>
    );
}