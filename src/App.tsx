import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HeaderComponent from "./components/HeaderComponent";
import CourseComponent from "./components/CoursesComponent";

function App() {
    return <>
        <BrowserRouter>
            <HeaderComponent/>
            <div className="flex h-screen">
                <Sidebar/>
                <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                    <Routes>
                        <Route path="/course" element={<CourseComponent/>}></Route>
                    </Routes>
                </div>
            </div>

        </BrowserRouter>
        </>;
}

export default App
