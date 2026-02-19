import { useMemo, useState } from "react";
import SemesterColumn from "./SemesterColumn";
import { parseRequisites } from "../lib/parseRequisites";

export default function Roadmap({ courses = [], onSelect }) {
  const [highlightedId, setHighlightedId] = useState(null);

  const subjects = useMemo(() => {
    return courses.map((c) => ({
      ...c,
      semester: Number(c.term || 0),
      prerequisites: parseRequisites(c.requisites),
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
      const sem = s.semester || 0;
      if (!grouped[sem]) grouped[sem] = [];
      grouped[sem].push(s);
    });
    return grouped;
  }, [subjects]);

  const semesterList = useMemo(() => {
    const sems = Array.from(new Set(subjects.map((s) => s.semester)))
      .filter((n) => n > 0)
      .sort((a, b) => a - b);

    return sems.map((sem) => ({ sem, name: `Semestre ${sem}` }));
  }, [subjects]);

  return (
    <div className="relative">
      <div className="relative overflow-x-auto">
        <div className="relative z-10 flex gap-3 py-4 ">
          {semesterList.map(({ sem, name }) => (
            <SemesterColumn
              key={sem}
              name={name}
              subjects={semesters[sem] || []}
              highlightedId={highlightedId}
              prereqIds={prereqIds}
              dependentIds={dependentIds}
              onHover={setHighlightedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
