import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function PlannerModal({
    onClose,
    allCourses = [],
    chosenVersion = 0,
    onChosenChanged
}) {

    const [s1, setS1] = useState([]);
    const [s2, setS2] = useState([]);
    const [dragOver, setDragOver] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
      const controller = new AbortController();

      (async () => {
        try {
        const res = await fetch(`${apiUrl}/api/courses/chosen`);
        
        console.log('Fetching chosen from:', `${apiUrl}/api/courses/chosen`, { signal: controller.signal });
        
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const text = await res.text();
        console.log('Response text:', text);
        
        const chosen = text ? JSON.parse(text) : [];
        console.log('Parsed chosen:', chosen);

        const normalized = chosen
        .map((item) => {
            if (typeof item === "string") {
                return allCourses.find((c) => c.id === item);
            }
            return item;
        })
        .filter(Boolean);

        console.log('Normalized courses:', normalized);
        setS1(normalized);

    }   catch (err) {
        console.error("Erro ao carregar chosen:", err);
    }
   })();
     return () => controller.abort();
}, [chosenVersion, allCourses, apiUrl]);

    const creditsSum = (list) =>
        list.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);

    const handleDrop = (to, e) => {
        e.preventDefault();
        setDragOver(null);

        const courseId = e.dataTransfer.getData("courseId");
        if (!courseId) return;

        const course =
            s1.find((c) => c.id === courseId) ||
            s2.find((c) => c.id === courseId) ||
            allCourses.find((c) => c.id === courseId);

        if (!course) return;

        setS1((prev) => prev.filter((c) => c.id !== courseId));
        setS2((prev) => prev.filter((c) => c.id !== courseId));

        if (to === "s1") setS1((prev) => (prev.some((c) => c.id === courseId) ? prev : [...prev, course]));
        if (to === "s2") setS2((prev) => (prev.some((c) => c.id === courseId) ? prev : [...prev, course]));
    };

    const removeFromS1 = async (courseId) => {
        try {
        await fetch(`${apiUrl}/api/courses/chosen/${courseId}`, {
            method: "DELETE",
        });
        setS1((prev) => prev.filter((c) => c.id !== courseId));
        onChosenChanged?.();
        } catch (err) {
        console.error("Erro ao remover:", err);
        }
    };

    const removeFromS2 = async (courseId) => {
    try {
        await fetch(`${apiUrl}/api/courses/chosen/${courseId}`, {
            method: "DELETE",
        });
        setS2((prev) => prev.filter((c) => c.id !== courseId));
        onChosenChanged?.();
    } catch (err) {
        console.error("Erro ao remover:", err);
    }
};

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

        <div className={["min-h-[420px] rounded-xl border border-dashed border-gray-200 bg-gray-50 p-3 space-y-2 transition-all",  
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
                        colKey === "s1"
                        ? removeFromS1(c.id)
                        : removeFromS2(c.id)
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
          <Column title="Semestre 1" list={s1} colKey="s1" />
          <Column title="Semestre 2" list={s2} colKey="s2" />
        </div>
      </div>
    </div>
    );
}
