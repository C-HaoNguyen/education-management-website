import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HeaderComponent from "./components/HeaderComponent";
import CourseComponent from "./components/CoursesComponent";
import TeacherComponent from "./components/TeacherComponent";
import StudentComponent from "./components/StudentComponent";

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
                    </Routes>
                </div>
            </div>

        </BrowserRouter>
    </>;
}

export default App
