import { useEffect, useState, useMemo } from "react";
import { X } from "lucide-react";

export default function PlannerModal({
    onClose,
    allCourses = [],
    chosenVersion = 0,
    onChosenChanged,
    userId
}) {

    const [chosenCourses, setChosenCourses] = useState([]);
    const [dragOver, setDragOver] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
      const controller = new AbortController();

      (async () => {
        try {
        const res = await fetch(`${apiUrl}/api/courses/chosen?userId=${userId}`);
        
        console.log('Fetching chosen from:', `${apiUrl}/api/courses/chosen?userId=${userId}`, { signal: controller.signal });
        
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const responseData = await res.json();
        console.log('Response data:', responseData);
        
        const chosen = Array.isArray(responseData.chosen) 
            ? responseData.chosen
            : [];
        console.log('Parsed chosen:', chosen);

        setChosenCourses(chosen);

    }   catch (err) {
        console.error("Erro ao carregar chosen:", err);
    }
   })();
     return () => controller.abort();
}, [chosenVersion, allCourses, apiUrl]);

    const creditsSum = (list) =>
        list.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);

    const updateCourseSemester = async (courseId, semesterPlanner) => {
        const res = await fetch(`${apiUrl}/api/courses/chosen/${courseId}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            userId: userId,
            semesterPlanner,
            }),
        });

        if (!res.ok) {
            throw new Error("Erro ao atualizar semestre da cadeira");
        }

        return res.json();
    };

    // const handleDrop = (to, e) => {
    //     e.preventDefault();
    //     setDragOver(null);

    //     const courseId = e.dataTransfer.getData("courseId");
    //     if (!courseId) return;

    //     const course =
    //         s1.find((c) => c.id === courseId) ||
    //         s2.find((c) => c.id === courseId) ||
    //         allCourses.find((c) => c.id === courseId);

    //     if (!course) return;

    //     setS1((prev) => prev.filter((c) => c.id !== courseId));
    //     setS2((prev) => prev.filter((c) => c.id !== courseId));

    //     if (to === "s1") setS1((prev) => (prev.some((c) => c.id === courseId) ? prev : [...prev, course]));
    //     if (to === "s2") setS2((prev) => (prev.some((c) => c.id === courseId) ? prev : [...prev, course]));
    // };

    const handleDrop = async (toSemester, e) => {
        e.preventDefault();
        setDragOver(null);

        const courseId = e.dataTransfer.getData("courseId");
        if (!courseId) return;

        const previousChosenCourses = chosenCourses;

        const updatedChosenCourses = chosenCourses
        .map((course) =>
            course.id === courseId
            ? { ...course, semesterPlanner: toSemester }
            : course
        );

        setChosenCourses(updatedChosenCourses);

        try {
            await updateCourseSemester(courseId, toSemester);
        } catch (err) {
            console.error("Erro ao atualizar semestre:", err);
            setChosenCourses(previousChosenCourses);
        }
    };

    const removeFromPlanner = async (courseId) => {
        const previousChosenCourses = chosenCourses;

        const updatedChosenCourses = chosenCourses.filter(
            (course) => course.id !== courseId
        );

        setChosenCourses(updatedChosenCourses);

        try {
        await fetch(`${apiUrl}/api/courses/chosen/${courseId}?userId=${userId}`, {
            method: "DELETE",
        });
        
        onChosenChanged?.();
        } catch (err) {
            console.error("Erro ao remover:", err);
            setChosenCourses(previousChosenCourses);
        }
    };

    const coursesBySemester = useMemo(() => {
        return chosenCourses.reduce((coursesBySemester, course) => {
            const semesterKey = String(course.semesterPlanner ?? 1);

            if (!coursesBySemester[semesterKey]) coursesBySemester[semesterKey] = [];
            coursesBySemester[semesterKey].push(course);

            return coursesBySemester;
        }, {});
    }, [chosenCourses]);

    const Column = ({ title, list, colKey }) => (
        <div
        className="flex-1 min-w-[260px] rounded-2xl border border-gray-200 bg-white p-4"
        >
        <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">{title}</h3>
            <span className="text-xs text-gray-500">
            {creditsSum(list)} cr
            </span>
        </div>

        <div className={["h-[420px] overflow-y-auto rounded-xl border border-dashed border-gray-200 bg-gray-50 p-3 space-y-2 transition-all",  
                dragOver === colKey ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-gray-50",
            ].join(" ")}
            onDragOver={(e) => {
                e.preventDefault();
                setDragOver(colKey);
            }}
            onDragLeave={() => setDragOver(null)}
            onDrop={(e) => handleDrop(colKey, e)}
        >
            {list.length === 0 ? (
            <div className="text-sm text-gray-400 text-center pt-10">
                Arraste aqui
            </div>
            ) : (
            list.map((c) => (
                <div
                key={c.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("courseId", c.id)}
                className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm cursor-grab active:cursor-grabbing h-fit"
                >
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 pr-2">
                    <p className="font-semibold text-sm text-gray-900 whitespace-normal break-words">
                        {c.name}
                    </p>
                    <p className="text-xs text-gray-500">
                        {c.id} • {c.credits} cr
                    </p>
                    </div>

                    <button
                        onClick={() =>
                        removeFromPlanner(c.id)
                        }
                    className="text-xs px-2 py-1 rounded-lg bg-gray-100 hover:bg-red-100 text-black hover:text-red-600 transition-colors border-2 border-transparent border-black hover:border-red-500 focus:outline-none"
                    >
                        Remover
                    </button>
                </div>
                </div>
            ))
            )}
        </div>
        </div>
    );

    return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full p-6 border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5 pr-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Planejador de Jornada
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          <Column title="Semestre 1" list={coursesBySemester["1"] || []} colKey="1" />
          <Column title="Semestre 2" list={coursesBySemester["2"] || []} colKey="2" />
        </div>
      </div>
    </div>
    );
}
