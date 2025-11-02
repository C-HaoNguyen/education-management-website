import { useState } from 'react';
import avatar from '../assets/user-avatar.jpg';
import {jwtDecode} from "jwt-decode";

export default function HeaderComponent() {
    const [username, setUsername] = useState("");

    function isLoggedIn() {
        const accessToken = localStorage.getItem("accessToken");
        getUsernameFromToken();
        return accessToken !== null;
    }

    function getUsernameFromToken() {
        const token = localStorage.getItem("accessToken");
        if (!token) return null;

        try {
            const decoded = jwtDecode(token);
            console.log("Decode jwt value:" + decoded);
            // decoded có thể chứa: { sub: "username", exp: 1730482973, iat: 1730479373 }
        } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}

    return (
            <header className="flex items-center h-20 justify-between px-6 py-3 bg-slate-400 text-white shadow">
                {/* Logo / Tên */}
                <div className="text-xl font-bold">
                    Education Management
                </div>

                {/* User info */}
                <div className="flex items-center gap-3">
                    <span className="hidden sm:block">Hi</span>
                    <img
                        src={avatar}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full border border-gray-300"
                    />
                </div>

                {/* {!isLoggedIn() &&
                 <a href="/login" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                    Đăng Xuất
                </a>} */}
                {/* Login button */}
                {isLoggedIn() &&
                <a href="/login" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                   onClick={() => {
                       localStorage.removeItem("accessToken");
                       localStorage.removeItem("refreshToken");
                   }}>
                    Đăng Xuất
                </a>}
            </header>
        );
}