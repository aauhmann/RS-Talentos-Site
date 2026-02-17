import { useEffect, useState } from "react";
import SectionWrapper from "./components/SectionWrapper";
import CourseCard from "./components/CourseCard";

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
    <>
      <SectionWrapper id="matriz" title="Cursos - Engenharia de Computação UFRGS">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onSelect={(c) => console.log("Selecionado:", c)}
            />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
