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
    <div className="group relative p-4 rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:border-blue-300 transition-all text-black flex flex-col h-full">
      <h3 className="font-semibold text-lg text-gray-900 mb-4 min-h-14 flex items-start">{course.name}</h3> {/* min h 24 */ }
      
      <div className="space-y-2 mb-4 text-sm flex-1">
        <div className="text-gray-700">
          <span className="font-medium text-gray-800">Código:</span> <span className="text-gray-600">{course.id}</span>
        </div>
        
        <div className="flex justify-between items-center text-gray-700">
          <div>
            <span className="font-medium text-gray-800">Créditos:</span> <span className="text-gray-600">{course.credits}</span>
          </div>
          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${labelStyle}`}>
            {courseLabel}
          </span>
        </div>
      </div>

      <button onClick={() => onSelect(course)} className="w-full bg-gray-200 hover:bg-blue-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
        Detalhes
      </button>
    </div>
  );
}
