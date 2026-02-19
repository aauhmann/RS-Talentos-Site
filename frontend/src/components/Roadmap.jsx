import { useMemo, useState } from "react";
import SemesterColumn from "./SemesterColumn";

export default function Roadmap({ courses = [], onSelect }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [pinnedId, setPinnedId] = useState(null);

  const highlightedId = pinnedId ?? hoveredId;
  
  const withHover = !!highlightedId;

  const subjects = useMemo(() => {
    return courses.map((c) => ({
      ...c,
      semester: c.term !== "" && !isNaN(Number(c.term)) ? Number(c.term) : null,
      prerequisites: c.requisites,
    }));
  }, [courses]);

  const subjectMap = useMemo(() => {
    return new Map(subjects.map((s) => [s.id, s]));
  }, [subjects]);

  const prereqIds = useMemo(() => {
    if (!highlightedId) return new Set();

    const collect = (id, visited = new Set()) => {
      const subj = subjectMap.get(id);
      if (!subj) return visited;

      (subj.prerequisites || []).forEach((pid) => {
        if (!visited.has(pid)) {
          visited.add(pid);
          collect(pid, visited);
        }
      });

      return visited;
    };

    return collect(highlightedId);
  }, [highlightedId, subjectMap]);

  const dependentIds = useMemo(() => {
    if (!highlightedId) return new Set();

    const collect = (id, visited = new Set()) => {
      subjects.forEach((s) => {
        if ((s.prerequisites || []).includes(id) && !visited.has(s.id)) {
          visited.add(s.id);
          collect(s.id, visited);
        }
      });
      return visited;
    };

    return collect(highlightedId);
  }, [highlightedId, subjects]);

  const semesters = useMemo(() => {
    const grouped = {};
    subjects.forEach((s) => {
      const sem = s.semester ?? "semPeriodo";
      
      if (!grouped[sem]) grouped[sem] = [];
      grouped[sem].push(s);
    });
    return grouped;
  }, [subjects]);

  const semesterList = useMemo(() => {
    const sems = Array.from(new Set(subjects.map((s) => s.semester)))

    const list = sems
    .filter((n) => typeof n === "number")
    .sort((a, b) => a - b)
    .map((sem) => ({ sem, name: `Semestre ${sem}` }));

    if (sems.includes(null)) list.push({ sem: "semPeriodo", name: "Sem período definido" });

    return list;
  }, [subjects]);

  return (
    <div className="relative w-full">
      <div className="relative roadmap-scroll w-full">
        <div className="relative z-10 flex gap-3 py-4">
          {semesterList.map(({ sem, name }) => (
            <SemesterColumn
              key={sem}
              name={name}
              subjects={semesters[sem] || []}
              highlightedId={highlightedId}
              prereqIds={prereqIds}
              dependentIds={dependentIds}
              pinnedId={pinnedId}
              onHover={(id) => {
                if (pinnedId) return;
                setHoveredId(id);
              }}
              onTogglePin={(id) => {
                setPinnedId((prev) => (prev === id ? null : id));
              }}
              onSelect={onSelect}
              withHover={withHover}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
