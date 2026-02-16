import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setError("");

        const res = await fetch("/api/courses");

        const text = await res.text(); 
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);

        const json = JSON.parse(text);
        setData(json);
      } catch (e) {
        console.error(e);
        setError(String(e.message || e));
      }
    }

    load();
  }, []);

  return (
  <div>
    <h1>Curso Engenharia de Computação UFRGS</h1>

    {data.map((course) => (
      <div key={course.id} style={{
        border: "1px solid #444",
        padding: "16px",
        marginBottom: "12px",
        borderRadius: "8px"
      }}>
        <h2>{course.name}</h2>
        <p><strong>Código:</strong> {course.id}</p>
        <p><strong>Carga Horária:</strong> {course.hours}h</p>
        <p><strong>Créditos:</strong> {course.credits}</p>
        <p><strong>Departamento:</strong> {course.department}</p>
      </div>
    ))}
  </div>
);

}
