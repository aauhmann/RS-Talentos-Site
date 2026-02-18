import CourseCard from "./CourseCard";

export default function SemesterColumn({
  name,
  subjects,
  highlightedId,
  prereqIds,
  dependentIds,
  onHover,
  onSelect,
}) {

    let totalCredits = 0;

    for (let i = 0; i < subjects.length; i++) {
        totalCredits += subjects[i].credits || 0;
    }

  return (
    <div className="flex flex-col min-w-[320px] w-[280px] flex-shrink-0"> {/* horizontal layout */}
      <div className="rounded-t-xl bg-gradient-to-b from-primary/15 to-primary/5 px-4 py-3 border border-b-0 border-border">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          <h3 className="text-sm font-bold tracking-wide text-foreground text-black">{name}</h3>
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5 text-black">
          {totalCredits} créditos · {subjects.length} cadeiras
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-3 p-3 bg-card/50 border border-t-0 border-border rounded-b-xl backdrop-blur-sm">
        {subjects.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onSelect={onSelect}
            onHover={onHover}
            isHighlighted={highlightedId === course.id}
            isPrereq={prereqIds.has(course.id)}
            isDependent={dependentIds.has(course.id)}
          />
        ))}
      </div>
    </div>
  );
}
