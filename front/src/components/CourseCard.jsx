export default function CourseCard({ course, onSelect }) {

  const labelStyles = {
    "Obrigatória": "text-blue-600 bg-blue-50",
    "Alternativa": "text-purple-600 bg-purple-50",
    "Eletiva": "text-green-600 bg-green-50",
    "Adicional": "text-orange-600 bg-orange-50",
  };

  const courseLabel = course.label || "Obrigatória"; // Default to "Obrigatória"
  const labelStyle = labelStyles[courseLabel] || "text-blue-600 bg-blue-50";

  return (
    <div className="group relative p-4 rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:border-blue-300 transition-all text-black">
      <h3 className="font-semibold text-lg text-gray-900 mb-4 min-h-14 flex items-start">{course.name}</h3>
      
      <div className="space-y-2 mb-4 text-sm">
        <div className="text-gray-700">
          <span className="font-medium text-gray-800">Código:</span> <span className="text-gray-600">{course.id}</span>
        </div>
        <div className="text-gray-700">
          <span className="font-medium text-gray-800">Carga Horária:</span> <span className="text-gray-600">{course.hours}h</span>
        </div>
        <div className="text-gray-700">
          <span className="font-medium text-gray-800">Créditos:</span> <span className="text-gray-600">{course.credits}</span>
        </div>
      </div>

      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${labelStyle}`}>
        {courseLabel}
      </span>
    </div>
  );
}
