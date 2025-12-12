import { motion } from 'framer-motion'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { Scene3D } from './components/Scene3D'
import { ParticleField } from './components/ParticleField'
// import { MagneticCursor } from './components/MagneticCursor'
import { LiquidBackground } from './components/LiquidBackground'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { AnimatedText } from './components/AnimatedText'
import { SkillSphere3D } from './components/SkillSphere3D'

// Point this to your résumé asset in /public. Using the JPG the user placed.
const resumeLink = '/resume.jpg'

const projects = [
  {
    title: 'Property Management System',
    description:
      'A full-stack solution for managing real estate assets, tenant relationships, and lease tracking.',
    tags: ['Next.js', 'Node.js', 'Firebase'],
    link: 'https://property-management-system-amber.vercel.app/',
  },
  {
    title: 'Realtime Collaboration Suite',
    description:
      'Multiplayer editing with presence indicators, offline sync, and optimistic UI updates.',
    tags: ['React', 'WebSockets', 'CRDT', 'Node'],
    link: '#',
  },
  {
    title: 'E-commerce Growth Engine',
    description:
      'Landing, checkout, and analytics bundle that lifted conversion by 18% month-over-month.',
    tags: ['Next.js', 'Stripe', 'Analytics', 'Testing'],
    link: '#',
  },
]

const skills = [
  { label: 'React', icon: '⚛️' },
  { label: 'Node.js', icon: '🟢' },
  { label: 'Next.js', icon: '⏭️' },
  { label: 'Firebase', icon: '🔥' },
  { label: 'TypeScript', icon: '🧭' },
  { label: 'JavaScript', icon: '✨' },
  { label: 'HTML', icon: '📄' },
  { label: 'CSS', icon: '🎨' },
  { label: 'MySQL', icon: '🗄️' },
  { label: 'SQL', icon: '📊' },
  { label: 'PHP', icon: '🐘' },
  { label: 'Java', icon: '☕' },
  { label: 'C++', icon: '🧱' },
]



const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/woldemariam-amare-759323392', icon: '🔗' },
  { label: 'GitHub', href: 'https://github.com/woldsh/portfolio', icon: '💻' },
  { label: 'Dribbble', href: 'https://dribbble.com', icon: '🎨' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

function App() {
  return (
    <ThemeProvider>
      {/* 3D Background Layers */}
      {/* <Scene3D /> */}
      <ParticleField />
      {/* <LiquidBackground /> */}

      {/* Custom Cursor */}
      {/* <MagneticCursor /> */}

      {/* Theme Switcher */}
      <ThemeSwitcher />

      <div className="page">
        <div className="ambient ambient-1" />
        <div className="ambient ambient-2" />
        <div className="grid-overlay" />

        <motion.nav
          className="nav"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        >
          <div className="logo-mark">WA</div>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-cta">
            <a className="pill soft" href={resumeLink} target="_blank" rel="noreferrer">
              Résumé
            </a>
            <a className="pill" href="#contact">
              Let&apos;s talk
            </a>
          </div>
        </motion.nav>

        <motion.header
          className="hero"
          id="home"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-copy" variants={fadeUp}>
            <p className="eyebrow">Full Stack Web Developer</p>
            <h1>
              Hi, I&apos;m Woldemariam Amare.
              <span className="gradient-text"> I build polished web products</span>
            </h1>
            <p className="lede">
              Blending thoughtful UX with robust engineering—React on the front,
              Node/Firebase on the back—to ship performant, reliable products end to end.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#work">
                View projects
              </a>
              <a className="btn ghost" href="#contact">
                Book a call
              </a>
            </div>
            <div className="hero-meta">
              <div className="stat">
                <strong>5+</strong>
                <span>years shipping full-stack apps</span>
              </div>
              <div className="stat">
                <strong>20+</strong>
                <span>products launched</span>
              </div>
              <div className="stat">
                <strong>100ms</strong>
                <span>p75 interactions targeted</span>
              </div>
            </div>
          </motion.div>
          <motion.div className="hero-card" variants={fadeUp}>
            <motion.div
              className="avatar"
              animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
            >
              <div className="glow" />
              <span role="img" aria-label="Avatar">
                🚀
              </span>
            </motion.div>
            <motion.div
              className="card"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
              <p>Currently available for select freelance engagements.</p>
              <div className="socials">
                {socials.map((item) => (
                  <a key={item.label} href={item.href}>
                    <span aria-hidden>{item.icon}</span>
                    {item.label}
                  </a>
                ))}
              </div>
              <a
                className="resume-preview"
                href={resumeLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Open résumé"
              >
                <img src={resumeLink} alt="Résumé preview" />
              </a>
            </motion.div>
          </motion.div>
        </motion.header>

        <main>
          <motion.section
            id="work"
            className="section"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="section-head" variants={fadeUp}>
              <p className="eyebrow">Selected work</p>
              <h2>
                <AnimatedText text="Impactful projects" />
              </h2>
              <p>
                Case studies designed to highlight the bridge between product
                thinking, interaction design, and robust engineering.
              </p>
            </motion.div>
            <div className="grid">
              {projects.map((project, idx) => (
                <motion.article
                  key={project.title}
                  className="card project"
                  variants={fadeUp}
                  custom={idx}
                  whileHover={{
                    y: -5,
                    scale: 1.01,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="badge-row">
                    {project.tags.map((tag) => (
                      <span key={tag} className="pill soft">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a className="link" href={project.link}>
                    View case study →
                  </a>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="skills"
            className="section muted"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="section-head">
              <p className="eyebrow">Capabilities</p>
              <h2>
                <AnimatedText text="What I do best" />
              </h2>
              <p>Product strategy, design systems, and performant frontends.</p>
            </div>
            <div className="pill-cloud">
              {skills.map((skill) => (
                <motion.span
                  key={skill.label}
                  className="pill large"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >
                  <span aria-hidden>{skill.icon}</span>
                  {skill.label}
                </motion.span>
              ))}
            </div>

            {/* 3D Skill Sphere */}
            <SkillSphere3D />

            <motion.div className="card highlight" whileHover={{ scale: 1.01 }} style={{ marginTop: '20px' }}>
              <div>
                <h3>Design systems first</h3>
                <p>
                  I build reusable foundations—tokens, components, and patterns—
                  that keep teams shipping consistent experiences at speed.
                </p>
              </div>
              <a className="btn ghost" href="#contact">
                Need a system?
              </a>
            </motion.div>
          </motion.section>



          <motion.section
            id="contact"
            className="section muted contact"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div>
              <p className="eyebrow">Let&apos;s collaborate</p>
              <h2>
                <AnimatedText text="Have a project in mind?" />
              </h2>
              <p>
                I love partnering with teams to design, build, and launch products
                that users genuinely enjoy. Tell me about your goals.
              </p>
              <div className="contact-actions">
                <a className="btn primary" href="mailto:sonempire12@gmail.com">
                  Email me
                </a>
                <a className="btn ghost" href={resumeLink} target="_blank" rel="noreferrer">
                  View résumé
                </a>
              </div>
            </div>
            <motion.form
              className="card contact-form"
              action="https://formspree.io/f/xjknjgno"
              method="POST"
              whileHover={{ scale: 1.005 }}
            >
              <label>
                Your name
                <input name="name" placeholder="Jane Doe" required />
              </label>
              <label>
                Email
                <input name="email" type="email" placeholder="you@example.com" required />
              </label>
              <label>
                Project detail
                <textarea name="message" placeholder="Tell me about the outcome you want." required />
              </label>
              <button className="btn primary" type="submit">
                Send message
              </button>
            </motion.form>
          </motion.section>
        </main>

        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>Crafted with care in React. Ready to join your next mission.</p>
          <div className="footer-links">
            {socials.map((item) => (
              <a key={item.label} href={item.href}>
                {item.icon} {item.label}
              </a>
            ))}
          </div>
        </motion.footer>
      </div>
    </ThemeProvider>
  )
}

export default App
