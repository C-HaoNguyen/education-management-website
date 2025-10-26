

export default function LogInComponent() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
            >
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Đăng nhập ngay!
                </h2>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập tên đăng nhập..."
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập mật khẩu..."
                    />
                </div>

                <button
                    type="button"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}