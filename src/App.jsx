import { useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import {
  Activity, ArrowDownToLine, ArrowUpRight, Bell, BookOpen, CalendarDays,
  Check, ChevronDown, CircleDollarSign, ClipboardCheck, Clock3, GraduationCap,
  LayoutDashboard, Menu, Plus, Search, Settings2, Users, Wallet, X,
} from 'lucide-react';

const seedStudents = [
  { id: 'ST-2041', name: 'Amelia Parker', email: 'amelia.parker@northstar.edu', course: 'Computer Science', year: 'Year 2', status: 'Active', color: 'coral' },
  { id: 'ST-2042', name: 'Noah Williams', email: 'noah.williams@northstar.edu', course: 'Business Admin', year: 'Year 3', status: 'Active', color: 'blue' },
  { id: 'ST-2043', name: 'Olivia Chen', email: 'olivia.chen@northstar.edu', course: 'Graphic Design', year: 'Year 1', status: 'Active', color: 'purple' },
  { id: 'ST-2044', name: 'Ethan Brooks', email: 'ethan.brooks@northstar.edu', course: 'Computer Science', year: 'Year 4', status: 'Inactive', color: 'green' },
  { id: 'ST-2045', name: 'Mia Thompson', email: 'mia.thompson@northstar.edu', course: 'Psychology', year: 'Year 2', status: 'Active', color: 'yellow' },
  { id: 'ST-2046', name: 'Lucas Rivera', email: 'lucas.rivera@northstar.edu', course: 'Business Admin', year: 'Year 1', status: 'Active', color: 'blue' },
  { id: 'ST-2047', name: 'Sophia Patel', email: 'sophia.patel@northstar.edu', course: 'Psychology', year: 'Year 3', status: 'Active', color: 'coral' },
];

const seedCourses = [
  { name: 'Computer Science', code: 'CS-201', students: 128, instructor: 'Dr. James Miller', color: 'coral', progress: 74 },
  { name: 'Business Admin', code: 'BA-105', students: 96, instructor: 'Prof. Sarah Davis', color: 'blue', progress: 58 },
  { name: 'Graphic Design', code: 'GD-310', students: 64, instructor: 'Ms. Nina Patel', color: 'purple', progress: 82 },
  { name: 'Psychology', code: 'PS-220', students: 87, instructor: 'Dr. Mark Lewis', color: 'yellow', progress: 66 },
];

const seedFees = [
  { id: 'INV-2041', student: 'Amelia Parker', course: 'Computer Science', amount: 2400, due: 'Nov 28, 2026', status: 'Paid' },
  { id: 'INV-2042', student: 'Noah Williams', course: 'Business Admin', amount: 1800, due: 'Nov 25, 2026', status: 'Pending' },
  { id: 'INV-2043', student: 'Olivia Chen', course: 'Graphic Design', amount: 2100, due: 'Nov 20, 2026', status: 'Overdue' },
  { id: 'INV-2044', student: 'Ethan Brooks', course: 'Computer Science', amount: 2400, due: 'Dec 02, 2026', status: 'Pending' },
  { id: 'INV-2045', student: 'Mia Thompson', course: 'Psychology', amount: 1950, due: 'Nov 18, 2026', status: 'Paid' },
];

const seedSchedule = [
  { time: '09:00', end: '10:30', course: 'Introduction to Algorithms', code: 'CS-201', room: 'Room 204', instructor: 'Dr. James Miller', color: 'coral' },
  { time: '10:45', end: '12:15', course: 'Principles of Marketing', code: 'BA-105', room: 'Room 108', instructor: 'Prof. Sarah Davis', color: 'blue' },
  { time: '13:00', end: '14:30', course: 'Visual Communication', code: 'GD-310', room: 'Studio 3', instructor: 'Ms. Nina Patel', color: 'purple' },
  { time: '14:45', end: '16:15', course: 'Research Methods', code: 'PS-220', room: 'Room 302', instructor: 'Dr. Mark Lewis', color: 'yellow' },
];

const navigation = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Students', path: '/students', icon: Users },
  { label: 'Attendance', path: '/attendance', icon: ClipboardCheck },
  { label: 'Courses', path: '/courses', icon: BookOpen },
  { label: 'Fees & payments', path: '/fees', icon: Wallet },
  { label: 'Timetable', path: '/timetable', icon: CalendarDays },
  { label: 'Reports', path: '/reports', icon: Activity },
];

function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const update = (next) => {
    setValue((previous) => {
      const result = typeof next === 'function' ? next(previous) : next;
      localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };
  return [value, update];
}

function App() {
  const [students, setStudents] = useStoredState('campusly-students', seedStudents);
  const [attendance, setAttendance] = useStoredState('campusly-attendance', {});
  const [fees, setFees] = useStoredState('campusly-fees', seedFees);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const pageTitle = navigation.find((item) => item.path === location.pathname)?.label ?? 'Dashboard';
  const shared = { students, setStudents, attendance, setAttendance, fees, setFees };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><GraduationCap size={21} strokeWidth={2.2} /></span>
          <span>campusly<span className="brand-period">.</span></span>
        </Link>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path} end={path === '/'} onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
              {label === 'Students' && <span className="nav-count">{students.length}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="term-card"><span className="term-dot" /><span><b>Fall semester</b><small>Aug 24 – Dec 18, 2026</small></span><ChevronDown size={15} /></div>
          <button className="profile-button" type="button">
            <span className="avatar avatar-profile">JD</span><span className="profile-copy"><b>Jordan Davis</b><small>Administrator</small></span><Settings2 size={17} />
          </button>
        </div>
      </aside>

      {menuOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Menu size={20} /></button>
          <div className="breadcrumb"><span>Workspace</span><span className="crumb-divider">/</span><b>{pageTitle}</b></div>
          <div className="topbar-actions"><span className="today-label">Tuesday, November 24, 2026</span><button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button><span className="avatar avatar-small">JD</span></div>
        </header>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard {...shared} />} />
            <Route path="/students" element={<StudentsPage {...shared} />} />
            <Route path="/attendance" element={<AttendancePage {...shared} />} />
            <Route path="/courses" element={<CoursesPage students={students} />} />
            <Route path="/fees" element={<FeesPage {...shared} />} />
            <Route path="/timetable" element={<TimetablePage />} />
            <Route path="/reports" element={<ReportsPage {...shared} />} />
            <Route path="*" element={<Dashboard {...shared} />} />
          </Routes>
        </div>
        <footer className="page-footer"><span>Campusly Student Management</span><span>Academic year 2026–27</span></footer>
      </main>
    </div>
  );
}

function PageHeading({ eyebrow, title, description, action }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

function StatCard({ label, value, note, icon: Icon, tone, change }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={19} /></div><div className="stat-change">{change}</div><div className="stat-value">{value}</div><div className="stat-label">{label}</div><div className="stat-note">{note}</div></div>;
}

function Avatar({ student, small = false }) {
  const initials = student.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
  return <span className={`avatar avatar-${student.color} ${small ? 'avatar-xs' : ''}`}>{initials}</span>;
}

function StudentTable({ students, limit }) {
  return <div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>STUDENT ID</th><th>COURSE</th><th>YEAR</th><th>STATUS</th></tr></thead><tbody>
    {students.slice(0, limit ?? students.length).map((student) => <tr key={student.id}><td><div className="person-cell"><Avatar student={student} small /><span><b>{student.name}</b><small>{student.email}</small></span></div></td><td className="id-cell">{student.id}</td><td>{student.course}</td><td>{student.year}</td><td><span className={`status-pill ${student.status === 'Active' ? 'status-active' : 'status-inactive'}`}><i />{student.status}</span></td></tr>)}
    {students.length === 0 && <tr><td colSpan="5" className="empty-state">No students found. Try a different search or add a student.</td></tr>}
  </tbody></table></div>;
}

function Dashboard({ students, attendance, fees }) {
  const active = students.filter((student) => student.status === 'Active').length;
  const paid = fees.filter((fee) => fee.status === 'Paid').length;
  const attendanceCount = Object.values(attendance).filter(Boolean).length;
  return <>
    <PageHeading eyebrow="TUESDAY, NOVEMBER 24, 2026" title="Good morning, Jordan" description="Here's what's happening across your campus today." action={<Link className="button button-primary" to="/students"><Plus size={17} /> Add student</Link>} />
    <section className="stats-grid" aria-label="Overview statistics">
      <StatCard label="Total students" value={students.length.toLocaleString()} note={`${active} active students`} icon={Users} tone="tone-coral" change={<span className="positive-change"><ArrowUpRight size={13} /> 8.2%</span>} />
      <StatCard label="Courses running" value="24" note="Across 4 departments" icon={BookOpen} tone="tone-blue" change={<span className="stat-neutral">This semester</span>} />
      <StatCard label="Attendance today" value={`${attendanceCount || 92}%`} note="Campus-wide average" icon={ClipboardCheck} tone="tone-yellow" change={<span className="positive-change"><ArrowUpRight size={13} /> 2.4%</span>} />
      <StatCard label="Fees collected" value={`$${(paid * 2.1).toFixed(1)}k`} note="This semester" icon={CircleDollarSign} tone="tone-purple" change={<span className="positive-change"><ArrowUpRight size={13} /> 12.6%</span>} />
    </section>
    <section className="dashboard-grid">
      <div className="panel students-panel"><div className="panel-heading"><div><h2>Recent students</h2><p>Your newest student records</p></div><Link className="text-link" to="/students">View all <ArrowUpRight size={14} /></Link></div><StudentTable students={students} limit={5} /></div>
      <div className="panel attendance-panel"><div className="panel-heading"><div><h2>Attendance overview</h2><p>Weekly average this semester</p></div><button className="more-button" aria-label="Attendance options"><span>···</span></button></div><div className="attendance-number">92<span>%</span><small><span className="chart-legend-dot" /> Average attendance</small></div><div className="chart-bars" aria-label="Weekly attendance chart">{[67, 82, 72, 91, 76, 97, 84].map((height, index) => <div className="bar-column" key={index}><div className={`chart-bar ${index === 5 ? 'bar-highlight' : ''}`} style={{ height: `${height}%` }} /><span>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span></div>)}</div><div className="chart-footer"><span><b>+2.4%</b> from last month</span><Link to="/attendance">Details <ArrowUpRight size={13} /></Link></div></div>
      <div className="panel schedule-panel"><div className="panel-heading"><div><h2>Today's schedule</h2><p>Tuesday, November 24</p></div><Link className="text-link" to="/timetable">Full timetable <ArrowUpRight size={14} /></Link></div><div className="schedule-list">{seedSchedule.slice(0, 3).map((item) => <div className="schedule-item" key={item.code}><div className={`schedule-time tone-text-${item.color}`}>{item.time}<small>{item.end}</small></div><div className={`schedule-marker ${item.color}`} /><div className="schedule-details"><b>{item.course}</b><small>{item.code} <span>·</span> {item.room}</small></div></div>)}</div></div>
      <div className="panel tasks-panel"><div className="panel-heading"><div><h2>Quick overview</h2><p>A few things to keep an eye on</p></div><span className="today-tag">TODAY</span></div><div className="overview-list"><Link to="/fees" className="overview-row"><span className="overview-icon overview-orange"><Wallet size={16} /></span><span><b>3 payments due</b><small>Review pending invoices</small></span><ArrowUpRight size={15} /></Link><Link to="/attendance" className="overview-row"><span className="overview-icon overview-green"><Clock3 size={16} /></span><span><b>Attendance check-in</b><small>Mark today's attendance</small></span><ArrowUpRight size={15} /></Link><Link to="/reports" className="overview-row"><span className="overview-icon overview-blue"><Activity size={16} /></span><span><b>Monthly report ready</b><small>November summary is available</small></span><ArrowUpRight size={15} /></Link></div></div>
    </section>
  </>;
}

function StudentsPage({ students, setStudents }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All students');
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('Computer Science');
  const filtered = useMemo(() => students.filter((student) => {
    const matchesText = `${student.name} ${student.id} ${student.email} ${student.course}`.toLowerCase().includes(query.toLowerCase());
    return matchesText && (filter === 'All students' || student.status === filter);
  }), [students, query, filter]);

  function addStudent(event) {
    event.preventDefault();
    const nextId = `ST-${2041 + students.length}`;
    setStudents([{ id: nextId, name: name.trim(), email: email.trim(), course, year: 'Year 1', status: 'Active', color: ['coral', 'blue', 'purple', 'green', 'yellow'][students.length % 5] }, ...students]);
    setName(''); setEmail(''); setShowForm(false);
  }

  return <>
    <PageHeading eyebrow="PEOPLE & RECORDS" title="Students" description="Manage student profiles, enrollment, and academic status." action={<button className="button button-primary" onClick={() => setShowForm(true)}><Plus size={17} /> Add student</button>} />
    <div className="panel directory-panel"><div className="directory-toolbar"><div className="student-count"><b>All students</b><span>{students.length} records</span></div><div className="table-controls"><label className="search-box"><Search size={16} /><input placeholder="Search students..." value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search students" /></label><select className="select-control" value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter by status"><option>All students</option><option>Active</option><option>Inactive</option></select></div></div><StudentTable students={filtered} /></div>
    {showForm && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowForm(false)}><form className="modal" onSubmit={addStudent}><div className="modal-heading"><div><div className="eyebrow">NEW RECORD</div><h2>Add a student</h2></div><button type="button" className="icon-button" onClick={() => setShowForm(false)} aria-label="Close"><X size={19} /></button></div><label>Full name<input required autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Alex Morgan" /></label><label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="alex@northstar.edu" /></label><label>Course<select value={course} onChange={(event) => setCourse(event.target.value)}>{seedCourses.map((item) => <option key={item.code}>{item.name}</option>)}</select></label><div className="modal-actions"><button className="button button-quiet" type="button" onClick={() => setShowForm(false)}>Cancel</button><button className="button button-primary" type="submit"><Plus size={16} /> Create student</button></div></form></div>}
  </>;
}

function AttendancePage({ students, attendance, setAttendance }) {
  const todayKey = '2026-11-24';
  const present = students.filter((student) => attendance[student.id] !== false).length;
  return <>
    <PageHeading eyebrow="DAILY CHECK-IN" title="Attendance" description="Track today's presence and keep class records up to date." action={<button className="button button-outline" onClick={() => setAttendance(Object.fromEntries(students.map((student) => [student.id, true])))}><Check size={16} /> Mark all present</button>} />
    <section className="stats-grid compact-stats"><StatCard label="Present" value={present} note="Students checked in" icon={Check} tone="tone-green" change={<span className="stat-neutral">Today</span>} /><StatCard label="Absent" value={students.length - present} note="Needs follow-up" icon={Users} tone="tone-coral" change={<span className="stat-neutral">Today</span>} /><StatCard label="Attendance rate" value={`${students.length ? Math.round((present / students.length) * 100) : 0}%`} note="Based on enrollment" icon={Activity} tone="tone-blue" change={<span className="stat-neutral">Today</span>} /><StatCard label="Class date" value="Nov 24" note="Fall semester 2026" icon={CalendarDays} tone="tone-yellow" change={<span className="stat-neutral">Tuesday</span>} /></section>
    <div className="panel directory-panel"><div className="directory-toolbar"><div className="student-count"><b>Today's register</b><span>{todayKey} · {students.length} students</span></div><span className="register-hint"><span className="status-dot" /> Changes save automatically</span></div><div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>STUDENT ID</th><th>COURSE</th><th>CHECK-IN</th><th>ATTENDANCE</th></tr></thead><tbody>{students.map((student) => { const isPresent = attendance[student.id] !== false; return <tr key={student.id}><td><div className="person-cell"><Avatar student={student} small /><span><b>{student.name}</b><small>{student.email}</small></span></div></td><td className="id-cell">{student.id}</td><td>{student.course}</td><td className="id-cell">{isPresent ? '09:02 AM' : '—'}</td><td><button className={`attendance-toggle ${isPresent ? 'checked' : ''}`} onClick={() => setAttendance((current) => ({ ...current, [student.id]: !isPresent }))} aria-pressed={isPresent}><span>{isPresent && <Check size={12} />}</span>{isPresent ? 'Present' : 'Absent'}</button></td></tr>; })}</tbody></table></div></div>
  </>;
}

function CoursesPage({ students }) {
  return <>
    <PageHeading eyebrow="ACADEMIC PROGRAMS" title="Courses" description="A clear view of your courses, instructors, and enrollment." action={<button className="button button-outline" onClick={() => window.print()}><ArrowDownToLine size={16} /> Export overview</button>} />
    <div className="course-summary"><span><b>4</b> departments</span><span><b>24</b> active courses</span><span><b>{students.length}</b> students in records</span></div>
    <section className="course-grid">{seedCourses.map((course) => <article className="panel course-card" key={course.code}><div className="course-card-top"><span className={`course-icon ${course.color}`}><BookOpen size={19} /></span><span className="course-code">{course.code}</span></div><h2>{course.name}</h2><p className="instructor-name">{course.instructor}</p><div className="course-meta"><span><Users size={15} /> {course.students} enrolled</span><span><CalendarDays size={15} /> Fall 2026</span></div><div className="course-progress-label"><span>Semester progress</span><b>{course.progress}%</b></div><div className="progress-track"><span className={`progress-fill ${course.color}`} style={{ width: `${course.progress}%` }} /></div></article>)}</section>
  </>;
}

function FeesPage({ fees, setFees }) {
  const collected = fees.filter((fee) => fee.status === 'Paid').reduce((total, fee) => total + fee.amount, 0);
  const pending = fees.filter((fee) => fee.status !== 'Paid').reduce((total, fee) => total + fee.amount, 0);
  return <>
    <PageHeading eyebrow="FINANCE & BILLING" title="Fees & payments" description="Keep track of tuition, due dates, and student payments." action={<button className="button button-outline" onClick={() => downloadCsv('campusly-fees.csv', ['Invoice,Student,Course,Amount,Due date,Status', ...fees.map((fee) => `${fee.id},${fee.student},${fee.course},${fee.amount},${fee.due},${fee.status}`)])}><ArrowDownToLine size={16} /> Export CSV</button>} />
    <section className="stats-grid compact-stats"><StatCard label="Collected" value={`$${collected.toLocaleString()}`} note="Payments received" icon={CircleDollarSign} tone="tone-green" change={<span className="positive-change">This term</span>} /><StatCard label="Outstanding" value={`$${pending.toLocaleString()}`} note="Awaiting payment" icon={Wallet} tone="tone-yellow" change={<span className="stat-neutral">This term</span>} /><StatCard label="Invoices" value={fees.length} note="Total issued" icon={ClipboardCheck} tone="tone-blue" change={<span className="stat-neutral">Fall 2026</span>} /><StatCard label="Overdue" value={fees.filter((fee) => fee.status === 'Overdue').length} note="Requires follow-up" icon={Clock3} tone="tone-coral" change={<span className="stat-neutral">Action needed</span>} /></section>
    <div className="panel directory-panel"><div className="directory-toolbar"><div className="student-count"><b>Recent invoices</b><span>{fees.length} records</span></div><span className="register-hint">Fall semester 2026</span></div><div className="table-wrap"><table><thead><tr><th>INVOICE</th><th>STUDENT</th><th>COURSE</th><th>AMOUNT</th><th>DUE DATE</th><th>STATUS</th><th></th></tr></thead><tbody>{fees.map((fee) => <tr key={fee.id}><td className="id-cell">{fee.id}</td><td><b>{fee.student}</b></td><td>{fee.course}</td><td className="amount-cell">${fee.amount.toLocaleString()}</td><td>{fee.due}</td><td><span className={`status-pill ${fee.status === 'Paid' ? 'status-active' : fee.status === 'Overdue' ? 'status-overdue' : 'status-pending'}`}><i />{fee.status}</span></td><td>{fee.status !== 'Paid' && <button className="table-action" onClick={() => setFees((current) => current.map((item) => item.id === fee.id ? { ...item, status: 'Paid' } : item))}>Mark paid</button>}</td></tr>)}</tbody></table></div></div>
  </>;
}

function TimetablePage() {
  const [day, setDay] = useState('Tuesday');
  return <>
    <PageHeading eyebrow="CLASS SCHEDULE" title="Timetable" description="Plan the day and find every class at a glance." action={<button className="button button-outline" onClick={() => window.print()}><ArrowDownToLine size={16} /> Print schedule</button>} />
    <div className="timetable-toolbar"><div className="day-tabs">{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((item) => <button key={item} className={day === item ? 'day-tab active' : 'day-tab'} onClick={() => setDay(item)}>{item}</button>)}</div><span className="timetable-date"><CalendarDays size={16} /> November 23–27, 2026</span></div>
    <div className="panel timetable-panel"><div className="timetable-day-heading"><div><span className="eyebrow">FALL SEMESTER · WEEK 14</span><h2>{day}, November {day === 'Monday' ? '23' : day === 'Tuesday' ? '24' : day === 'Wednesday' ? '25' : day === 'Thursday' ? '26' : '27'}</h2></div><span className="today-tag">4 CLASSES</span></div><div className="timetable-list">{seedSchedule.map((item) => <div className="timetable-row" key={item.code}><div className="timetable-time">{item.time}<small>{item.end}</small></div><div className={`timetable-accent ${item.color}`} /><div className="timetable-course"><b>{item.course}</b><span>{item.code} <i>·</i> {item.instructor}</span></div><span className="room-pill">{item.room}</span></div>)}</div><div className="schedule-end"><span>End of schedule</span></div></div>
  </>;
}

function ReportsPage({ students, fees, attendance }) {
  const activeCount = students.filter((student) => student.status === 'Active').length;
  const paid = fees.filter((fee) => fee.status === 'Paid').length;
  const reportCards = [
    { title: 'Student enrollment', desc: 'Enrollment by course and academic year', tag: 'STUDENTS', icon: Users, tone: 'tone-coral', value: students.length, suffix: 'records' },
    { title: 'Attendance summary', desc: 'Daily and weekly class attendance', tag: 'ATTENDANCE', icon: ClipboardCheck, tone: 'tone-blue', value: `${attendance && Object.keys(attendance).length ? Math.round((Object.values(attendance).filter(Boolean).length / Math.max(Object.keys(attendance).length, 1)) * 100) : 92}%`, suffix: 'average' },
    { title: 'Fee collection', desc: 'Payments received and outstanding balances', tag: 'FINANCE', icon: Wallet, tone: 'tone-yellow', value: `${paid} / ${fees.length}`, suffix: 'invoices paid' },
    { title: 'Active students', desc: 'Current students in good standing', tag: 'ACADEMIC', icon: GraduationCap, tone: 'tone-purple', value: activeCount, suffix: 'active' },
  ];
  return <>
    <PageHeading eyebrow="INSIGHTS & ANALYTICS" title="Reports" description="A snapshot of enrollment, attendance, and campus finances." action={<button className="button button-outline" onClick={() => downloadCsv('campusly-students.csv', ['Student ID,Name,Email,Course,Year,Status', ...students.map((student) => `${student.id},${student.name},${student.email},${student.course},${student.year},${student.status}`)])}><ArrowDownToLine size={16} /> Export students</button>} />
    <div className="report-period"><CalendarDays size={16} /><span>Reporting period</span><b>Fall semester 2026</b><ChevronDown size={15} /></div><section className="report-grid">{reportCards.map(({ title, desc, tag, icon: Icon, tone, value, suffix }) => <article className="panel report-card" key={title}><div className="report-card-head"><span className={`stat-icon ${tone}`}><Icon size={18} /></span><span className="report-tag">{tag}</span></div><h2>{title}</h2><p>{desc}</p><div className="report-card-value">{value}<small>{suffix}</small></div><button className="text-link" onClick={() => window.print()}>Download report <ArrowDownToLine size={14} /></button></article>)}</section>
  </>;
}

function downloadCsv(filename, rows) {
  const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default App;