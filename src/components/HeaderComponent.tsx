import avatar from '../assets/user-avatar.jpg';

export default function HeaderComponent() {
    return (
            <header className="flex items-center h-20 justify-between px-6 py-3 bg-slate-400 text-white shadow">
                {/* Logo / Tên */}
                <div className="text-xl font-bold">
                    Education Management
                </div>

                {/* Thanh tìm kiếm (optional) */}
                <div className="hidden md:block">
                    <div className="relative w-128">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full h-10 px-3 py-1 rounded bg-white text-black border-gray focus:outline-blue-500"
                        />
                        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                            />
                        </svg>
                    </div>
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
            </header>
        );
}