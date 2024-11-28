import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import the Link component

const AddStudentScreen = () => {
  const [studentName, setStudentName] = useState("");
  const [parentNumber, setParentNumber] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [studentDateBirth, setStudentDateBirth] = useState("");
  const [status, setStatus] = useState("نعم");
  const [classs, setClass] = useState("");

  const [date, setDate] = useState(new Date().toLocaleDateString());

  const handleAddStudent = () => {
    fetch(
      "https://script.google.com/macros/s/AKfycbzOMhog6vtihK6t_DpbaBXBqjdGK57uREN32yuj9jDFeREYNvd3q5Yf1y76JAU_lECKBg/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addStudent",
          StudentName: studentName,
          ParentNumber: parentNumber,
          StudentNumber: studentNumber,
          StudentDateBirth: studentDateBirth,
          status: status,
          class: classs,
          date: date,
        }),
      }
    )
      .then((response) => response.text())
      .then((responseText) => {
        alert("Response", responseText);
        resetFields();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error", "Failed to add student.");
      });
  };

  const resetFields = () => {
    setStudentName("");
    setParentNumber("");
    setStudentNumber("");
    setStudentDateBirth("");
    setStatus("نعم");
    setClass("");
    setDate(new Date().toLocaleDateString());
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>إضافة المخدوم</h2>
      <input
        placeholder="اسم المخدوم"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="رقم ولي الأمر"
        value={parentNumber}
        onChange={(e) => setParentNumber(e.target.value)}
        type="tel"
        style={styles.input}
      />
      <input
        placeholder="رقم المخدوم"
        value={studentNumber}
        onChange={(e) => setStudentNumber(e.target.value)}
        type="number"
        style={styles.input}
      />
      <input
        placeholder="المستوي"
        value={classs}
        onChange={(e) => setClass(e.target.value)}
        type="text"
        style={styles.input}
      />
      <input
        placeholder="تاريخ ميلاد المخدوم"
        value={studentDateBirth}
        onChange={(e) => setStudentDateBirth(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="حالة الحضور (نعم/لا)"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={styles.input}
      />
      <button style={styles.addButton} onClick={handleAddStudent}>
        إضافة المخدوم
      </button>
      {/* Link to the /update route */}
      <Link to="/update" style={styles.link}>
        <button style={{ ...styles.addButton, ...styles.navigateButton }}>
          الذهاب لتحديث الحضور
        </button>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    maxWidth: "500px",
    margin: "auto",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: "1px",
    borderColor: "#ddd",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    width: "100%",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
  },
  navigateButton: {
    backgroundColor: "#2196F3",
  },
  link: {
    textDecoration: "none", // Remove the underline from the Link
  },
};

export default AddStudentScreen;
