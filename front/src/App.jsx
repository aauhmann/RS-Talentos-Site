import { useEffect, useState } from "react";
import SectionWrapper from "./components/SectionWrapper";
import CourseModal from "./components/CourseModal";
import Roadmap from "./components/Roadmap";

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <>
      <SectionWrapper id="matriz" title="Cursos - Engenharia de Computação UFRGS">
        {error ? (
          <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        ) : null}

        <Roadmap courses={data} onSelect={handleSelectCourse} />
      </SectionWrapper>

      {isModalOpen && (
        <CourseModal course={selectedCourse} onClose={handleCloseModal} />
      )}
    </>
  );
}
