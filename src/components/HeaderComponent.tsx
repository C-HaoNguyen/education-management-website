export default function HeaderComponent() {
    return (
            <header className="flex items-center justify-between px-6 py-3 bg-gray-800 text-white shadow">
                {/* Logo / Tên */}
                <div className="text-xl font-bold">
                    Education Management
                </div>

                {/* Thanh tìm kiếm (optional) */}
                <div className="hidden md:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 py-1 rounded bg-white text-black focus:outline-none"
                    />
                </div>

                {/* User info */}
                <div className="flex items-center gap-3">
                    <span className="hidden sm:block">Hi, John</span>
                </div>
            </header>
        );
}