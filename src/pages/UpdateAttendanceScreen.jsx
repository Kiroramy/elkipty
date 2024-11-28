import React, { useState, useEffect } from "react";
import { format } from "date-fns"; // Ensure date-fns is installed with npm install date-fns

const UpdateAttendanceScreen = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students from Google Sheets
    fetch(
      "https://script.google.com/macros/s/AKfycbzOMhog6vtihK6t_DpbaBXBqjdGK57uREN32yuj9jDFeREYNvd3q5Yf1y76JAU_lECKBg/exec"
    )
      .then((response) => response.json())
      .then((data) => {
        // Format dates to yyyy/MM/dd
        const formattedData = data.map((student) => ({
          ...student,
          date: format(new Date(student.date), "yyyy/MM/dd"),
        }));
        setStudents(formattedData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleUpdateAttendance = () => {
    fetch(
      "https://script.google.com/macros/s/AKfycbzOMhog6vtihK6t_DpbaBXBqjdGK57uREN32yuj9jDFeREYNvd3q5Yf1y76JAU_lECKBg/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateAttendance", students }),
      }
    )
      .then((response) => response.text())
      .then((responseText) => alert("Response", responseText))
      .catch((error) => {
        console.error("Error:", error);
        alert("Error", "Failed to update attendance.");
      });
  };

  const toggleAttribute = (index, attribute) => {
    const updatedStudents = [...students];
    updatedStudents[index][attribute] =
      updatedStudents[index][attribute] === "نعم" ? "لا" : "نعم";
    setStudents(updatedStudents);
  };

  const copyToClipboard = async (number) => {
    navigator.clipboard.writeText(number);
    alert(`Number ${number} copied to clipboard`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>تحديث حالة الحضور</h2>
      <div style={styles.listContainer}>
        {students.map((item, index) => (
          <div key={item.StudentNumber} style={styles.studentContainer}>
            <h3 style={styles.studentName}>{item.StudentName}</h3>
            <div
              style={styles.copyText}
              onClick={() => copyToClipboard(`0${item.StudentNumber}`)}
            >
              <p>Student Number: 0{item.StudentNumber}</p>
            </div>
            <div
              style={styles.copyText}
              onClick={() => copyToClipboard(`0${item.ParentNumber}`)}
            >
              <p>Parent Number: 0{item.ParentNumber}</p>
            </div>

            <div style={styles.switchRow}>
              <label style={styles.label}>حضور:</label>
              <input
                type="checkbox"
                checked={item.status === "نعم"}
                onChange={() => toggleAttribute(index, "status")}
              />
              <span style={styles.statusText}>{item.status}</span>
            </div>
            <div style={styles.switchRow}>
              <label style={styles.label}>كتاب:</label>
              <input
                type="checkbox"
                checked={item.HaveBook === "نعم"}
                onChange={() => toggleAttribute(index, "HaveBook")}
              />
              <span style={styles.statusText}>{item.HaveBook}</span>
            </div>
            <div style={styles.switchRow}>
              <label style={styles.label}>ID:</label>
              <input
                type="checkbox"
                checked={item.HaveId === "نعم"}
                onChange={() => toggleAttribute(index, "HaveId")}
              />
              <span style={styles.statusText}>{item.HaveId}</span>
            </div>
            <p style={styles.dateText}>Date: {item.date}</p>
          </div>
        ))}
      </div>
      <button style={styles.button} onClick={handleUpdateAttendance}>
        حفظ الحضور
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  listContainer: {
    marginBottom: "20px",
  },
  studentContainer: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
  },
  studentName: {
    fontSize: "16px",
    marginBottom: "5px",
  },
  copyText: {
    cursor: "pointer",
  },
  switchRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  label: {
    fontSize: "16px",
    marginRight: "10px",
  },
  statusText: {
    marginLeft: "10px",
    fontSize: "16px",
  },
  dateText: {
    marginTop: "10px",
    fontSize: "14px",
    color: "gray",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: "10px",
    marginTop: "20px",
    textAlign: "center",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
  },
};

export default UpdateAttendanceScreen;
