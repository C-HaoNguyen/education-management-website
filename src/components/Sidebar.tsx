import {Link} from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">

            {/* Menu */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                        <a href="/course" className="block p-2 rounded hover:bg-gray-700 transition">
                            Course Management
                        </a>
                    </li>
                    <li>
                        <a href="/teacher" className="block p-2 rounded hover:bg-gray-700 transition">
                            Teacher Management
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block p-2 rounded hover:bg-gray-700 transition">
                            Student Management
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block p-2 rounded hover:bg-gray-700 transition">
                            Class Management
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block p-2 rounded hover:bg-gray-700 transition">
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700">
                <button className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
                    Logout
                </button>
            </div>
        </div>
    );
}