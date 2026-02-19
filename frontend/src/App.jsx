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
      <SectionWrapper 
        id="matriz" 
        title="Cursos - Engenharia de Computação UFRGS"
        subtitle={
          <span className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
              Selecionada
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-purple-400"></span>
              Pré-Requisito
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-orange-400"></span>
              Liberadas
            </span>
          </span>
        }
        titleClassName="sticky left-10 z-10 w-fit"
        subtitleClassName="sticky left-11 z-10 w-fit"
      >

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
