import { useMemo, useState } from "react";
import { MODULES } from "./data";
import { generateRoomCode, loadClassrooms, saveClassrooms } from "./storage";
import { Assignment, Classroom, Difficulty, Student } from "./types";

type Page = "rooms" | "assign" | "progress" | "students" | "assignments";

const difficultyLabel: Record<Difficulty, string> = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
};

function App() {
  const [classrooms, setClassrooms] = useState<Classroom[]>(loadClassrooms);
  const [selectedRoomId, setSelectedRoomId] = useState("room-1");
  const [page, setPage] = useState<Page>("rooms");
  const [showCreate, setShowCreate] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedRoom = classrooms.find((r) => r.id === selectedRoomId) ?? classrooms[0];

  const updateClassrooms = (next: Classroom[]) => {
    setClassrooms(next);
    saveClassrooms(next);
  };

  const createRoom = (name: string, section: string) => {
    const room: Classroom = {
      id: `room-${Date.now()}`,
      name,
      section,
      roomCode: generateRoomCode(classrooms),
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      active: true,
      students: [],
      assignments: [],
    };
    updateClassrooms([...classrooms, room]);
    setSelectedRoomId(room.id);
    setShowCreate(false);
  };

  const assignModule = (moduleId: string, dueDate: string) => {
    if (!selectedRoom) return;
    const module = MODULES.find((m) => m.id === moduleId);
    if (!module) return;

    const assignment: Assignment = {
      id: `assignment-${Date.now()}`,
      roomId: selectedRoom.id,
      moduleId: module.id,
      moduleName: module.name,
      dueDate,
      assignedAt: new Date().toISOString().slice(0, 10),
      status: "Assigned",
    };

    updateClassrooms(
      classrooms.map((room) =>
        room.id === selectedRoom.id
          ? { ...room, assignments: [assignment, ...room.assignments] }
          : room
      )
    );
    setPage("assignments");
  };

  const removeAssignment = (assignmentId: string) => {
    if (!selectedRoom) return;
    updateClassrooms(
      classrooms.map((room) =>
        room.id === selectedRoom.id
          ? { ...room, assignments: room.assignments.filter((a) => a.id !== assignmentId) }
          : room
      )
    );
  };

  const copyCode = async () => {
    if (!selectedRoom) return;
    try {
      await navigator.clipboard.writeText(selectedRoom.roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  if (!selectedRoom) {
    return <div className="min-h-screen bg-slate-100 p-8">Create a classroom to get started.</div>;
  }

  return (
    <div className="min-h-screen bg-[#eef1f7] text-slate-800">
      <div className="flex min-h-screen">
        <aside className="hidden w-56 shrink-0 bg-[#202133] text-white md:block">
          <div className="px-7 pt-7 pb-6">
            <div className="text-2xl font-extrabold tracking-tight">Read<span className="text-cyan-300">Flow</span></div>
            <div className="mt-1 text-xs text-slate-400">Teacher Dashboard</div>
          </div>
          <nav className="space-y-1 px-3">
            <SideItem label="Overview" icon="⌂" active={false} onClick={() => setPage("rooms")} />
            <SideItem label="Learning Rooms" icon="♧" active={page === "rooms" || page === "students"} onClick={() => setPage("rooms")} />
            <SideItem label="Content Library" icon="▤" active={false} onClick={() => setPage("assign")} />
            <SideItem label="Analytics" icon="◒" active={page === "progress"} onClick={() => setPage("progress")} />
            <SideItem label="Live Monitor" icon="◉" active={false} onClick={() => setPage("students")} />
            <SideItem label="Interventions" icon="◉" active={false} badge="2" onClick={() => setPage("progress")} />
            <SideItem label="Reports" icon="▣" active={false} onClick={() => setPage("progress")} />
            <SideItem label="Settings" icon="⚙" active={false} onClick={() => setPage("rooms")} />
          </nav>
          <div className="absolute bottom-0 w-56 border-t border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-600 text-sm font-bold">U</div>
              <div><div className="text-sm font-semibold">User</div><div className="text-xs text-slate-400">Teacher</div></div>
            </div>
            <div className="mt-5 text-xs text-slate-500">↪ Logout</div>
          </div>
        </aside>

        <main className="flex-1 p-5 md:p-8">
          <header className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div>
              <h1 className="text-2xl font-bold">Learning Rooms</h1>
              <p className="mt-1 text-sm text-slate-500">Create and manage virtual classrooms with unique room codes.</p>
            </div>
            <button onClick={() => setShowCreate(true)} className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
              + Create New Room
            </button>
          </header>

          <div className="mb-5 flex flex-wrap gap-2">
            {classrooms.map((room) => (
              <button key={room.id} onClick={() => { setSelectedRoomId(room.id); setPage("rooms"); }} className={`rounded-lg border px-4 py-2 text-sm ${room.id === selectedRoom.id ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "bg-white text-slate-600"}`}>
                {room.name} - {room.section}
              </button>
            ))}
          </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="font-bold">{selectedRoom.name} - {selectedRoom.section}</h2>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{selectedRoom.active ? "Active" : "Inactive"}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">Created {selectedRoom.createdAt} • Room code: {selectedRoom.roomCode}</p>
                  </div>
                  <button onClick={copyCode} className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-slate-50">{copied ? "Copied!" : "⧉ Copy Code"}</button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-b border-slate-200 px-5 py-3">
                <Tab active={page === "rooms"} onClick={() => setPage("rooms")}>Overview</Tab>
                <Tab active={page === "students"} onClick={() => setPage("students")}>Enrolled Students</Tab>
                <Tab active={page === "assign"} onClick={() => setPage("assign")}>Assign Module</Tab>
                <Tab active={page === "assignments"} onClick={() => setPage("assignments")}>Assignments</Tab>
                <Tab active={page === "progress"} onClick={() => setPage("progress")}>Progress</Tab>
              </div>

              <div className="p-5">
                {page === "rooms" && <RoomOverview room={selectedRoom} onStudents={() => setPage("students")} onAssign={() => setPage("assign")} />}
                {page === "students" && <StudentsView students={selectedRoom.students} />}
                {page === "assign" && <AssignModule modules={MODULES} onAssign={assignModule} />}
                {page === "assignments" && <AssignmentsView assignments={selectedRoom.assignments} onRemove={removeAssignment} onAssign={() => setPage("assign")} />}
                {page === "progress" && <ProgressView students={selectedRoom.students} assignments={selectedRoom.assignments} />}
              </div>
            </section>

            <aside className="space-y-5">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold">Classroom Management</h3>
                <div className="mt-4 space-y-2">
                  <ActionButton onClick={() => setPage("students")} label="View Enrolled Students" icon="👥" />
                  <ActionButton onClick={() => setPage("assign")} label="Assign a Module" icon="📚" />
                  <ActionButton onClick={() => setPage("assignments")} label="Manage Assignments" icon="✓" />
                  <ActionButton onClick={() => setPage("progress")} label="View Student Progress" icon="▥" />
                </div>
              </div>
              <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
                <h3 className="font-bold text-indigo-900">Room Code</h3>
                <div className="mt-3 rounded-lg bg-white px-4 py-3 text-center text-xl font-extrabold tracking-widest text-indigo-700">{selectedRoom.roomCode}</div>
                <p className="mt-2 text-xs text-indigo-700/70">Students can use this code to join the classroom.</p>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {showCreate && <CreateRoomModal onClose={() => setShowCreate(false)} onCreate={createRoom} />}
    </div>
  );
}

function SideItem({ label, icon, active, badge, onClick }: { label: string; icon: string; active: boolean; badge?: string; onClick: () => void }) {
  return <button onClick={onClick} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${active ? "bg-white/10 font-semibold text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}><span className="w-5 text-center">{icon}</span><span className="flex-1">{label}</span>{badge && <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px]">{badge}</span>}</button>;
}

function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} className={`rounded-md px-3 py-2 text-sm font-medium ${active ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:bg-slate-50"}`}>{children}</button>;
}

function ActionButton({ onClick, label, icon }: { onClick: () => void; label: string; icon: string }) {
  return <button onClick={onClick} className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-sm hover:border-indigo-200 hover:bg-indigo-50"><span>{icon}</span><span>{label}</span><span className="ml-auto text-slate-400">›</span></button>;
}

function RoomOverview({ room, onStudents, onAssign }: { room: Classroom; onStudents: () => void; onAssign: () => void }) {
  const avg = room.students.length ? Math.round(room.students.reduce((sum, s) => sum + s.average, 0) / room.students.length) : 0;
  const atRisk = room.students.filter((s) => s.atRisk || s.average < 80).length;
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Enrolled Students" value={room.students.length} />
        <Stat label="Class Average" value={`${avg}%`} />
        <Stat label="At-Risk Students" value={atRisk} />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <button onClick={onStudents} className="rounded-xl border p-5 text-left hover:border-indigo-300"><div className="text-2xl">👥</div><h3 className="mt-3 font-bold">Enrolled Students</h3><p className="mt-1 text-sm text-slate-500">View students, levels, streaks, badges, and latest scores.</p></button>
        <button onClick={onAssign} className="rounded-xl border p-5 text-left hover:border-indigo-300"><div className="text-2xl">📚</div><h3 className="mt-3 font-bold">Classroom Assignments</h3><p className="mt-1 text-sm text-slate-500">{room.assignments.length} module assignment(s) are currently linked to this classroom.</p></button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-xl border bg-slate-50 p-4"><div className="text-xs uppercase tracking-wide text-slate-400">{label}</div><div className="mt-1 text-2xl font-bold">{value}</div></div>;
}

function StudentsView({ students }: { students: Student[] }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between"><div><h3 className="font-bold">Enrolled Students ({students.length})</h3><p className="text-xs text-slate-400">Student list connected to this classroom.</p></div></div>
      {students.length === 0 ? <Empty text="No students have joined this classroom yet." /> : <div className="overflow-x-auto rounded-lg border"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-400"><tr><th className="px-4 py-3">Student</th><th>Level</th><th>Streak</th><th>Badges</th><th>Last Score</th><th>Average</th></tr></thead><tbody>{students.map(s => <tr key={s.id} className="border-t"><td className="px-4 py-3 font-semibold">{s.name}</td><td><DifficultyBadge value={s.difficulty} /> {s.atRisk && <span className="ml-1 rounded bg-red-100 px-2 py-1 text-[10px] font-bold text-red-600">AT RISK</span>}</td><td>{s.streak}d</td><td>{s.badges}</td><td>{s.lastScore}%</td><td className={s.average < 80 ? "font-bold text-red-500" : "font-bold text-emerald-600"}>{s.average}%</td></tr>)}</tbody></table></div>}
    </div>
  );
}

function DifficultyBadge({ value }: { value: Difficulty }) {
  const classes = value === "easy" ? "bg-emerald-50 text-emerald-600" : value === "medium" ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600";
  return <span className={`rounded px-2 py-1 text-[10px] font-bold ${classes}`}>{difficultyLabel[value]}</span>;
}

function AssignModule({ modules, onAssign }: { modules: typeof MODULES; onAssign: (moduleId: string, dueDate: string) => void }) {
  const [moduleId, setModuleId] = useState(modules[0].id);
  const [dueDate, setDueDate] = useState("2026-09-30");
  const selected = modules.find(m => m.id === moduleId)!;
  return <div className="mx-auto max-w-2xl"><h3 className="text-lg font-bold">Assign Module</h3><p className="mt-1 text-sm text-slate-500">Choose a ready-made module and assign it to the selected classroom.</p>
    <div className="mt-6 grid gap-3">{modules.map(m => <button key={m.id} onClick={() => setModuleId(m.id)} className={`rounded-xl border p-4 text-left ${moduleId === m.id ? "border-indigo-500 bg-indigo-50" : "hover:bg-slate-50"}`}><div className="flex items-center justify-between"><span className="font-bold">{m.name}</span><DifficultyBadge value={m.difficulty} /></div><p className="mt-1 text-sm text-slate-500">{m.description}</p></button>)}</div>
    <div className="mt-5 rounded-xl bg-slate-50 p-4"><label className="text-sm font-semibold">Due Date</label><input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="mt-2 w-full rounded-lg border bg-white px-3 py-2" /></div>
    <button onClick={() => onAssign(selected.id, dueDate)} className="mt-5 w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700">Assign {selected.name}</button>
  </div>;
}

function AssignmentsView({ assignments, onRemove, onAssign }: { assignments: Assignment[]; onRemove: (id: string) => void; onAssign: () => void }) {
  return <div><div className="mb-4 flex items-center justify-between"><div><h3 className="font-bold">Classroom Assignment Management</h3><p className="text-xs text-slate-400">Manage modules assigned to all students in this classroom.</p></div><button onClick={onAssign} className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">+ Assign Module</button></div>
    {assignments.length === 0 ? <Empty text="No modules assigned yet." /> : <div className="space-y-3">{assignments.map(a => <div key={a.id} className="flex flex-col justify-between gap-3 rounded-xl border p-4 sm:flex-row sm:items-center"><div><div className="font-bold">{a.moduleName}</div><div className="mt-1 text-xs text-slate-400">Assigned {a.assignedAt} • Due {a.dueDate}</div></div><div className="flex items-center gap-2"><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{a.status}</span><button onClick={() => onRemove(a.id)} className="rounded border px-3 py-1.5 text-xs text-red-500 hover:bg-red-50">Remove</button></div></div>)}</div>}
  </div>;
}

function ProgressView({ students, assignments }: { students: Student[]; assignments: Assignment[] }) {
  const progress = useMemo(() => students.map((s, i) => ({ ...s, completion: assignments.length ? Math.min(100, 35 + ((i * 13 + s.average) % 66)) : 0 })), [students, assignments]);
  return <div><div className="mb-4"><h3 className="font-bold">Student Progress</h3><p className="text-xs text-slate-400">Dummy progress data for development; replace with real assessment records later.</p></div>
    <div className="overflow-x-auto rounded-lg border"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-400"><tr><th className="px-4 py-3">Student</th><th>Assigned Modules</th><th>Completion</th><th>Average Score</th><th>Status</th></tr></thead><tbody>{progress.map(s => <tr key={s.id} className="border-t"><td className="px-4 py-3 font-semibold">{s.name}</td><td>{assignments.length}</td><td className="min-w-48"><div className="flex items-center gap-2"><div className="h-2 flex-1 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-indigo-500" style={{width: `${s.completion}%`}} /></div><span className="w-10 text-right text-xs font-semibold">{s.completion}%</span></div></td><td className={s.average < 80 ? "font-bold text-red-500" : "font-bold text-emerald-600"}>{s.average}%</td><td>{s.average < 80 ? <span className="rounded-full bg-red-50 px-2 py-1 text-xs text-red-600">Needs Support</span> : <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-600">On Track</span>}</td></tr>)}</tbody></table></div>
  </div>;
}

function Empty({ text }: { text: string }) { return <div className="rounded-xl border border-dashed p-10 text-center text-sm text-slate-400">{text}</div>; }

function CreateRoomModal({ onClose, onCreate }: { onClose: () => void; onCreate: (name: string, section: string) => void }) {
  const [name, setName] = useState("Grade 5");
  const [section, setSection] = useState("");
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><div className="flex items-center justify-between"><h2 className="text-lg font-bold">Create New Classroom</h2><button onClick={onClose} className="text-xl text-slate-400">×</button></div><p className="mt-1 text-sm text-slate-500">A unique ReadFlow room code will be generated automatically.</p>
    <label className="mt-5 block text-sm font-semibold">Grade / Classroom Name<input value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2" /></label>
    <label className="mt-4 block text-sm font-semibold">Section<input value={section} onChange={e => setSection(e.target.value)} placeholder="e.g. Section B" className="mt-2 w-full rounded-lg border px-3 py-2" /></label>
    <div className="mt-6 flex justify-end gap-2"><button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm">Cancel</button><button disabled={!name.trim() || !section.trim()} onClick={() => onCreate(name.trim(), section.trim())} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40">Create Classroom</button></div>
  </div></div>;
}

export default App;
