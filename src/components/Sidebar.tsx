import {Link} from "react-router-dom";

export default function Sidebar() {

    function isLoggedIn() {
        const accessToken = localStorage.getItem("accessToken");
        return accessToken !== null;
    }
    return (
        <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">

            {/* Menu */}
            {isLoggedIn() &&    
            <nav className="flex-1 p-2">
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
                        <a href="/student" className="block p-2 rounded hover:bg-gray-700 transition">
                            Student Management
                        </a>
                    </li>
                    <li>
                        <a href="/classes" className="block p-2 rounded hover:bg-gray-700 transition">
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
            }
        </div>
    );
}