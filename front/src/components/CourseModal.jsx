import { X } from "lucide-react";

export default function CourseModal({ course, onClose }) {
  if (!course) return null;

  const labelStyles = {
    "Obrigatória": "text-blue-600 bg-blue-50",
    "Alternativa": "text-purple-600 bg-purple-50",
    "Eletiva": "text-green-600 bg-green-50",
    "Adicional": "text-orange-600 bg-orange-50",
  };

  const courseLabel = course.label || "Obrigatória";
  const labelStyle = labelStyles[courseLabel] || "text-blue-600 bg-blue-50";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:text-gray-800 transition-colors bg-gray-100 text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <span className="text-lg">📚</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{course.name}</h2>
            <p className="text-sm text-gray-600">{course.id}</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${labelStyle}`}>
            {courseLabel}
          </span>
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
            {course.credits} créditos
          </span>
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
            {course.hours} horas
          </span>
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
            {course.term}º período
          </span>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed mb-6">
          {course.description || "Nenhuma descrição disponível."}
        </p>

        <div className="p-3 rounded-xl bg-gray-50 mb-6">
          <p className="text-xs font-semibold text-gray-700 mb-1">Pré-requisitos</p>
          <p className="text-sm text-gray-800"> {course.prerequisites.join(", ") || "Nenhum"}</p>
        </div>
      </div>
    </div>
  );
}
