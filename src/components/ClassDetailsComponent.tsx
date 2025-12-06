import { useLocation } from "react-router-dom";

export default function ClassDetailsComponent() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const classId = params.get("classId");
    
    return (
        <div>
            <h1>Class Details Component</h1>
            {/* Add your class details implementation here */}
        </div>
    );
    
}