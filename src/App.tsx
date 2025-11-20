import './index.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HeaderComponent from "./components/HeaderComponent";
import CourseComponent from "./components/CoursesComponent";
import TeacherComponent from "./components/TeacherComponent";
import StudentComponent from "./components/StudentComponent";
import ClassesComponent from './components/ClassesComponent';
import LogInComponent from './components/LogInComponent';
import WelcomeComponent from './components/WelcomeComponent';
import SignUpComponent from './components/SignUpComponent';
import AvailableCourses from "./components/AvaialableCourses";
import NoPermissionComponent from "./components/NoPermissionComponent";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return <>
        <BrowserRouter>
            <HeaderComponent />
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 bg-gray-200 p-4 overflow-y-auto">
                    <Routes>
                        // ADMIN ROUTES
                        <Route path="/course" element={
                            <ProtectedRoute requireRole={"admin"}>
                                <CourseComponent />
                            </ProtectedRoute>}>
                        </Route>

                        <Route path="/teacher" element={
                            <ProtectedRoute requireRole={"admin"}>
                                <TeacherComponent />
                            </ProtectedRoute>}>
                        </Route>

                        <Route path="/student" element={
                            <ProtectedRoute requireRole={"admin"}>
                                <StudentComponent />
                            </ProtectedRoute>}>
                        </Route>

                        <Route path="/classes" element={
                            <ProtectedRoute requireRole={"admin"}>
                                <ClassesComponent />
                            </ProtectedRoute>}>
                        </Route>
                        
                        <Route path="/login" element={<LogInComponent />}></Route>
                        <Route path="/" element={<WelcomeComponent />}></Route>
                        <Route path="/signup" element={<SignUpComponent />}></Route>

                        // STUDENT ROUTES
                        <Route path="/available-courses" element={<AvailableCourses />}></Route>

                        // FALLBACK ROUTE
                        <Route path="/no-permission" element={<NoPermissionComponent />}></Route>
                    </Routes>
                </div>
            </div>

        </BrowserRouter>
    </>;
}

export default App
