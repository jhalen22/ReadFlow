import { useState } from 'react'
import type { ReactNode } from 'react'

type IconName =
  | 'home' | 'book' | 'library' | 'chart' | 'eye' | 'alert' | 'mail'
  | 'settings' | 'logout' | 'users' | 'upload' | 'plus' | 'bar'
  | 'clock' | 'menu' | 'x'

const students = [
  { name: 'MS Maria Santos', level: 'medium', streak: 7, last: 85, average: 85, risk: false },
  { name: 'JD Juan dela Cruz', level: 'easy', streak: 2, last: 62, average: 62, risk: true },
  { name: 'AR Ana Reyes', level: 'hard', streak: 14, last: 97, average: 95, risk: false },
  { name: 'PB Pedro Bautista', level: 'medium', streak: 5, last: 71, average: 71, risk: false },
  { name: 'LG Liza Gomez', level: 'easy', streak: 1, last: 55, average: 55, risk: true },
  { name: 'CT Carlos Tan', level: 'medium', streak: 9, last: 80, average: 80, risk: false },
]

const navItems: { label: string; icon: IconName; badge?: string }[] = [
  { label: 'Dashboard', icon: 'home' },
  { label: 'Learning Rooms', icon: 'book' },
  { label: 'Content Library', icon: 'library' },
  { label: 'Analytics', icon: 'chart' },
  { label: 'Live Monitor', icon: 'eye' },
  { label: 'Interventions', icon: 'alert', badge: '2' },
  { label: 'Reports', icon: 'mail' },
  { label: 'Settings', icon: 'settings' },
]

const quickActions: { label: string; icon: IconName }[] = [
  { label: 'Upload Reading Material', icon: 'upload' },
  { label: 'Create Learning Room', icon: 'plus' },
  { label: 'View Analytics', icon: 'bar' },
  { label: 'Monitor Students Live', icon: 'eye' },
  { label: 'Intervention Dashboard', icon: 'clock' },
  { label: 'View Weekly Reports', icon: 'mail' },
]

function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (name) {
    case 'home': return <svg {...common}><path d="m3 10 9-7 9 7"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-7h6v7"/></svg>
    case 'book': return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16"/></svg>
    case 'library': return <svg {...common}><path d="M4 5h12"/><path d="M4 9h12"/><path d="M4 13h8"/><path d="M4 17h8"/><path d="M18 4v16"/></svg>
    case 'chart': return <svg {...common}><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 15 3-4 3 2 5-7"/></svg>
    case 'eye': return <svg {...common}><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/></svg>
    case 'alert': return <svg {...common}><path d="M10.3 4.4 2.6 18a1.5 1.5 0 0 0 1.3 2.2h16.2a1.5 1.5 0 0 0 1.3-2.2L13.7 4.4a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    case 'mail': return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
    case 'settings': return <svg {...common}><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/><path d="m19.4 15 .2.1a2 2 0 0 1-2 3.5l-.2-.1a2 2 0 0 0-2.8 1.2l-.1.2a2 2 0 0 1-3.8-1.1v-.2a2 2 0 0 0-2.8-1.2l-.2.1a2 2 0 1 1-2-3.5l.2-.1a2 2 0 0 0 0-3.2l-.2-.1a2 2 0 1 1 2-3.5l.2.1A2 2 0 0 0 10.5 6l.1-.2a2 2 0 1 1 3.8 1.1v.2a2 2 0 0 0 2.8 1.2l.2-.1a2 2 0 1 1 2 3.5l-.2.1a2 2 0 0 0 0 3.2Z"/></svg>
    case 'logout': return <svg {...common}><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M13 4h6v16h-6"/></svg>
    case 'users': return <svg {...common}><path d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20"/><circle cx="10" cy="7" r="3"/><path d="M16 4.5a3 3 0 0 1 0 5.8"/><path d="M19.5 20v-1.5a4.5 4.5 0 0 0-2.4-4"/></svg>
    case 'upload': return <svg {...common}><path d="M12 15V3"/><path d="m7 8 5-5 5 5"/><path d="M4 14v5h16v-5"/></svg>
    case 'plus': return <svg {...common}><circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/></svg>
    case 'bar': return <svg {...common}><path d="M5 20V11"/><path d="M12 20V5"/><path d="M19 20v-8"/></svg>
    case 'clock': return <svg {...common}><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>
    case 'menu': return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    case 'x': return <svg {...common}><path d="m6 6 12 12M18 6 6 18"/></svg>
  }
}

function Logo() {
  return (
    <div className="logo" aria-label="ReadFlow">
      <div className="logo-word">Read<span>Flow</span></div>
      <svg className="logo-wave" viewBox="0 0 100 20" aria-hidden="true">
        <path d="M2 14c18-13 30 8 49-3 18-10 27-3 47-7" />
        <path d="M18 17c16-7 26-1 39-6 15-6 25-4 39-8" />
      </svg>
    </div>
  )
}

function StatCard({ title, value, icon, tone }: { title: string; value: string; icon: IconName; tone: 'blue' | 'green' | 'purple' | 'red' }) {
  return (
    <div className="stat-card">
      <div>
        <p className="eyebrow">{title}</p>
        <p className={tone === 'red' ? 'stat-value red-text' : 'stat-value'}>{value}</p>
      </div>
      <div className={`stat-icon ${tone}`}><Icon name={icon} size={19} /></div>
    </div>
  )
}

function App() {
  const [active, setActive] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [noticeVisible, setNoticeVisible] = useState(true)

  const handleAction = (label: string) => {
    window.alert(`${label} selected`)
  }

  return (
    <div className="app-shell">
      {sidebarOpen && <button className="mobile-overlay" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top">
          <Logo />
          <nav>
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`nav-item ${active === item.label ? 'active' : ''}`}
                onClick={() => { setActive(item.label); setSidebarOpen(false) }}
              >
                <Icon name={item.icon} size={15} />
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            ))}
          </nav>
        </div>
        <div className="profile-area">
          <div className="profile-row">
            <div className="avatar">U</div>
            <div><strong>User</strong><span>Teacher</span></div>
          </div>
          <button className="logout" onClick={() => window.alert('Logout selected')}><Icon name="logout" size={13} /> Logout</button>
        </div>
      </aside>

      <main className="main">
        <header className="mobile-header">
          <button onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Icon name="menu" size={22} /></button>
          <Logo />
          <div className="avatar small">U</div>
        </header>

        <div className="content">
          <div className="page-heading">
            <div>
              <h1>Welcome back, Teacher!</h1>
              <p>Here's your teaching overview and recent activities.</p>
            </div>
          </div>

          {noticeVisible && (
            <div className="risk-banner">
              <div className="risk-copy">
                <span className="warning-dot">▲</span>
                <strong>2 at-risk students</strong>
                <span>— Juan dela Cruz and Liza Gomez have scored below 80% on 3+ consecutive assessments.</span>
              </div>
              <div className="risk-actions">
                <button className="intervention-link" onClick={() => handleAction('View interventions')}>View Interventions →</button>
                <button className="close-notice" onClick={() => setNoticeVisible(false)} aria-label="Dismiss"><Icon name="x" size={14} /></button>
              </div>
            </div>
          )}

          <section className="stats-grid">
            <StatCard title="Classes Teaching" value="1" icon="book" tone="blue" />
            <StatCard title="Total Students" value="6" icon="users" tone="green" />
            <StatCard title="Resources Uploaded" value="6" icon="upload" tone="purple" />
            <StatCard title="At-Risk Students" value="2" icon="alert" tone="red" />
          </section>

          <section className="dashboard-grid">
            <div className="panel classes-panel">
              <div className="panel-heading">
                <div><h2>Your Classes</h2><p>Classes you're currently teaching</p></div>
                <button className="view-all" onClick={() => handleAction('View all classes')}>View All</button>
              </div>
              <div className="student-list">
                {students.map((student) => (
                  <div className="student-row" key={student.name}>
                    <div className="student-main">
                      <div className="student-name-line">
                        <strong>{student.name}</strong>
                        <span className={`level ${student.level}`}>{student.level}</span>
                        {student.risk && <span className="risk-pill"><span>▲</span> At-Risk</span>}
                      </div>
                      <span className="student-meta">Streak: {student.streak} days • Last score: {student.last}%</span>
                    </div>
                    <div className="average">
                      <span>Quiz Average</span>
                      <strong className={student.average < 70 ? 'red-text' : student.average >= 80 ? 'green-text' : 'orange-text'}>{student.average}%</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel actions-panel">
              <div className="panel-heading simple">
                <div><h2>Quick Actions</h2><p>Common tasks you can do quickly</p></div>
              </div>
              <div className="quick-list">
                {quickActions.map((action) => (
                  <button className="quick-action" key={action.label} onClick={() => handleAction(action.label)}>
                    <Icon name={action.icon} size={14} />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
