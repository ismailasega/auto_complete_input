// * @Author: Ismail Debele Asega
// * @Email: asega03@gmail.com
// * @LinkedIn: https://www.linkedin.com/in/asegaismail/
// * @Github: https://github.com/ismailasega
// * @GitLab: https://gitlab.com/asegaismail
// * @Tel: +256-784-491412 / +256-756-454376

import "./styles.css";
import StudentList from "../src/data/students";
import { useState } from "react";

export default function App() {
  const [student, setStudent] = useState("");
  const [students, setStudents] = useState([...StudentList]);
  const [studentList, setStudentList] = useState(false);

  const [error, setError] = useState("");

  // Filter
  const studentInputChange = (e) => {
    const studentName = e.target.value;
    const autoComplete = StudentList.filter(
      (name) =>
        name.first_name
          .toString()
          .toLowerCase()
          .indexOf(studentName.toString().toLowerCase()) > -1 ||
        name.last_name
          .toString()
          .toLowerCase()
          .indexOf(studentName.toString().toLowerCase()) > -1
    );
    setStudents(autoComplete);
    setStudent(studentName);
  };

  // Show student list dropdown
  const showStudentList = () => {
    setError("");
    setStudentList(true);
  };

  const hideStudentList = (e) => {
    setTimeout(() => {
      setStudentList(false);
      if (!e.target.value) {
        setError("Student need required");
      }
    }, 200);
  };

  return (
    <div className="App">
      <h3 className="heading-text">Select Student</h3>
      <div className="input-section">
        <div className="field">
          <label className="">Student List</label>
          <input
            onChange={studentInputChange}
            onFocus={showStudentList}
            onBlur={hideStudentList}
            value={student}
          />
          {error && <span className="error-text">{error}</span>}
          {studentList && (
            <div className="list-container">
              {students.length > 0 &&
                students.map((student, i) => (
                  <div
                    className="item"
                    key={i}
                    onClick={() =>
                      setStudent(student.first_name + " " + student.last_name)
                    }
                  >
                    <span className="student-name">
                      {student.first_name + " " + student.last_name}
                    </span>
                  </div>
                ))}
              {students.length <= 0 && (
                <span className="no-data-text">No student data found</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
