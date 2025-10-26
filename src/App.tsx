import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HeaderComponent from "./components/HeaderComponent";
import CourseComponent from "./components/CoursesComponent";
import TeacherComponent from "./components/TeacherComponent";
import StudentComponent from "./components/StudentComponent";
import ClassesComponent from './components/ClassesComponent';
import LogInComponent from './components/LogInComponent';   

function App() {
    return <>
        <BrowserRouter>
            <HeaderComponent/>
            <div className="flex h-screen">
                <Sidebar/>
                <div className="flex-1 bg-gray-200 p-4 overflow-y-auto">
                    <Routes>
                        <Route path="/course" element={<CourseComponent/>}></Route>
                        <Route path="/teacher" element={<TeacherComponent/>}></Route>
                        <Route path="/student" element={<StudentComponent/>}></Route>
                        <Route path="/classes" element={<ClassesComponent/>}></Route>
                        <Route path="/login" element={<LogInComponent/>}></Route>
                    </Routes>
                </div>
            </div>

        </BrowserRouter>
    </>;
}

export default App
