import avatar from '../assets/user-avatar.jpg';

export default function HeaderComponent() {
    return (
            <header className="flex items-center h-20 justify-between px-6 py-3 bg-slate-400 text-white shadow">
                {/* Logo / Tên */}
                <div className="text-xl font-bold">
                    Education Management
                </div>

                {/* User info */}
                <div className="flex items-center gap-3">
                    <span className="hidden sm:block">Hi, John</span>
                    <img
                        src={avatar}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full border border-gray-300"
                    />
                </div>

                {/* Login button */}
                <a href="/login" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                    Đăng nhập
                </a>
            </header>
        );
}