import { use, useEffect, useState } from "react";
import SectionWrapper from "./components/SectionWrapper";
import CourseModal from "./components/CourseModal";
import Roadmap from "./components/Roadmap";
import PlannerModal from "./components/PlannerModal";

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [plannerOpen, setPlannerOpen] = useState(false);
  const [chosenVersion, setChosenVersion] = useState(0);
  const [chosenIds, setChosenIds] = useState(new Set());

  function getUserId() {
    let id = localStorage.getItem("userId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("userId", id);
    }
    return id;
  }
  const userId = getUserId();

  // Removes userId after exiting or refreshing
  window.addEventListener("beforeunload", () => {
    localStorage.removeItem("userId");
  });

  useEffect(() => {
    async function load() {
      try {
        setError("");
      
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${apiUrl}/api/courses`);
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

  useEffect(() => {
    async function loadChosen() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${apiUrl}/api/courses/chosen?userId=${userId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const ids = new Set(json.map((c) => c.id));
        setChosenIds(ids);
      } catch (e) {
        console.error('Erro ao carregar chosen:', e);
      }
    }

    loadChosen();
  }, [chosenVersion]);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleChosenChanged = () => {
    setChosenVersion((v) => v + 1);
  };

  return (
    <>
      <SectionWrapper 
        id="matriz" 
        title="Cursos - Engenharia de Computação UFRGS"
        subtitle={
          <span className="flex flex-wrap items-center gap-3">
            <span className="flex items-center">
              <span className="text-neutral-800 font-bold"></span>
              Legenda:
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
              Selecionada
            </span>
            <span className="pl-3.5 flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-purple-400"></span>
              Pré-Requisito
            </span>
            <span className="pl-3.5 flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-orange-400"></span>
              Liberada
            </span>
            <span className="pl-3.5 flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
              Adicionada ao Planejador
            </span>
          </span>
        }
        titleClassName="sticky left-10 z-10 w-fit"
        subtitleClassName="sticky left-11 z-10 w-fit text-gray-900 text-m"
        titleRight={
          <div className="sticky right-10 z-10 w-fit">
            <button
              onClick={() => setPlannerOpen(true)}
              className="bg-[#F7F7F9] hover:bg-red-500 text-black hover:text-white text-xl font-medium py-4 px-6 rounded-lg transition-colors whitespace-nowrap border-2 border-gray-500 hover:border-red-500"
            >
              Planejador
            </button>
          </div>
        }
      >

        {error ? (
          <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        ) : null}

        <Roadmap 
          courses={data} 
          onSelect={handleSelectCourse} 
          onChosenChanged={handleChosenChanged} 
          chosenIds={chosenIds} 
          userId={userId}
        />
      </SectionWrapper>

      {isModalOpen && (
        <CourseModal course={selectedCourse} onClose={handleCloseModal} />
      )}

      {plannerOpen && (
        <PlannerModal
          onClose={() => setPlannerOpen(false)}
          allCourses={data}
          chosenVersion={chosenVersion}
          onChosenChanged={handleChosenChanged}
          userId={userId}
        />
      )}
      
    </>
  );
}
