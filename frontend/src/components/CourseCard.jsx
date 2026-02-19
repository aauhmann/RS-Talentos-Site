export default function CourseCard({
  course,
  onSelect,
  onHover,
  onTogglePin,
  isPinned = false,
  isHighlighted = false,
  isPrereq = false,
  isDependent = false,
  withHover = false,
  isRelated = false
}) {
  const labelStyles = {
    "Obrigatória": "text-blue-600 bg-blue-50",
    "Alternativa": "text-purple-600 bg-purple-50",
    "Eletiva": "text-green-600 bg-green-50",
    "Adicional": "text-orange-600 bg-orange-50",
  };

  const courseLabel = course.label || "Obrigatória";
  const labelStyle = labelStyles[courseLabel] || "text-blue-600 bg-blue-50";

  const highlightClass = 
      isPinned
    ? "ring-2 ring-blue-500 shadow-lg scale-[1.01]"
    : isHighlighted
    ? "ring-2 ring-gray-500 shadow-lg scale-[1.01]"
    : isPrereq
    ? "ring-2 ring-purple-400 shadow-md scale-[1.01]"
    : isDependent
    ? "ring-2 ring-orange-400 shadow-md scale-[1.01]"
    : "hover:shadow-lg hover:border-blue-300 hover:scale-[1.005]";

  const fadeClass = withHover && !isRelated ? "opacity-45" : "opacity-100";

  return (
    <div
      id={`subject-${course.id}`}
      onMouseEnter={() => onHover?.(course.id)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => onTogglePin?.(course.id)}
      className={[
        "group relative p-2.5 rounded-xl border border-gray-200 bg-white transition-all text-black flex flex-col transition-all",
        fadeClass,
        highlightClass,
      ].join(" ")}
    >
      <h3 className="font-semibold text-base text-gray-900 mb-1 line-clamp-2 min-h-[44px]">
        {course.name}
      </h3>

      <div className="space-y-1.5 mb-3 text-sm flex-1">
        <div className="text-gray-700">
          <span className="font-medium text-gray-800">Código:</span>{" "}
          <span className="text-gray-600">{course.id}</span>
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

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(course);
          }}
          className="flex-1 bg-gray-200 hover:bg-blue-300 text-gray-800 font-medium py-1 px-2 rounded-lg transition-colors"
        >
          Detalhes
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            // Ação do botão +
          }}
          className="bg-gray-200 hover:bg-green-300 text-gray-800 font-medium py-1 px-3 rounded-lg transition-colors border-2 border-transparent hover:border-green-500 focus:outline-none"
        >
          +
        </button>
      </div>
    </div>
  );
}