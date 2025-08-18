export default function TeacherComponent() {
    let teachers = [
        {id: 1, name: "Nguyen Van A", subject: "Mathematics"},
        {id: 2, name: "Nguyen Van B", subject: "Physics"},
        {id: 3, name: "Nguyen Van B", subject: "Physics"},
        {id: 4, name: "Nguyen Van B", subject: "Physics"},
        {id: 5, name: "Nguyen Van B", subject: "Physics"},
    ]

    const TeamMemberCard = ({ imageUrl, name, title }) => {
      return (
        <div className="text-center">
          {/* Khối màu nền cho ảnh */}
          <div className="bg-amber-400 p-4 rounded-lg inline-block">
            <img
              src={imageUrl}
              alt={`Ảnh của ${name}`}
              className="w-56 h-64 object-cover rounded-md"
            />
          </div>
          {/* Tên và chức vụ */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <p className="text-gray-500">{title}</p>
          </div>
        </div>
      );
    };
}