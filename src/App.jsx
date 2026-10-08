import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  GitBranch,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
  ExternalLink,
  MapPin,
  Phone,
  Code2,
  Database,
  Brain,
  Server,
  Award,
  GraduationCap,
  BriefcaseBusiness
} from "lucide-react";

import {
  personalInfo,
  skills,
  softSkills,
  internship,
  internshipProjects,
  personalProjects,
  certificates,
  education,
  navLinks,
  socialLinks
} from "./data/portfolioData";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", !darkMode);
  }, [darkMode]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find(
          (entry) => entry.isIntersecting
        );

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -65% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    setMenuOpen(false);
  };

  const getSocialIcon = (name) => {
    if (name === "GitHub") {
      return <GitBranch size={18} />;
    }

    if (name === "LinkedIn") {
      return <Linkedin size={18} />;
    }

    return <Mail size={18} />;
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const subject = encodeURIComponent(`Portfolio Contact - ${name}`);

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className={darkMode ? "app dark-app" : "app light-app"}>
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-container">
          <button
            className="brand"
            onClick={() => scrollToSection("home")}
            aria-label="Go to home"
          >
            <span className="brand-logo">VS</span>
            <span className="brand-name">Veena Sahu</span>
          </button>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            {navLinks.map((link) => (
              <button
                key={link.name}
                className={
                  activeSection === link.href.substring(1)
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={() =>
                  scrollToSection(link.href.substring(1))
                }
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button
              className="menu-toggle"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="hero section">
          <div className="hero-glow hero-glow-one"></div>
          <div className="hero-glow hero-glow-two"></div>

          <div className="section-container hero-container">
            <div className="hero-content">
              <span className="hero-badge">
                <span className="status-dot"></span>
                Available for opportunities
              </span>

              <p className="hero-small-text">Hello, I'm</p>

              <h1>
                Veena <span>Sahu</span>
              </h1>

              <h2>{personalInfo.headline}</h2>

              <p className="hero-description">
                {personalInfo.shortIntro}
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-button"
                  onClick={() => scrollToSection("projects")}
                >
                  View My Work
                  <ArrowUpRight size={18} />
                </button>

                <button
                  className="secondary-button"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact Me
                  <Mail size={18} />
                </button>
              </div>

              <div className="hero-socials">
                {socialLinks.map((social) => {
                  if (!social.url) return null;

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      className="social-icon"
                    >
                      {getSocialIcon(social.name)}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-image-glow"></div>

              <div className="hero-image-card">
                <div className="image-top-line"></div>

                <img
                  src={personalInfo.profileImage}
                  alt="Veena Sahu"
                  className="profile-image"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.parentElement.classList.add(
                      "image-fallback"
                    );
                  }}
                />

                <div className="profile-overlay">
                  <span>Full Stack Developer</span>
                </div>
              </div>

              <div className="floating-card floating-card-one">
                <Code2 size={19} />
                <span>Full Stack</span>
              </div>

              <div className="floating-card floating-card-two">
                <Brain size={19} />
                <span>AI / ML</span>
              </div>
            </div>
          </div>

          <button
            className="scroll-indicator"
            onClick={() => scrollToSection("about")}
          >
            <span>Scroll to explore</span>
            <div className="scroll-line"></div>
          </button>
        </section>

        {/* About */}
        <section id="about" className="section about-section">
          <div className="section-container">
            <div className="section-heading">
              <span className="section-label">ABOUT ME</span>

              <h2>
                Building digital experiences with{" "}
                <span>code & creativity.</span>
              </h2>

              <p>
                I enjoy turning ideas into useful, responsive and
                scalable web applications.
              </p>
            </div>

            <div className="about-grid">
              <div className="about-content">
                <p>{personalInfo.about}</p>

                <div className="about-location">
                  <MapPin size={18} />
                  <span>{personalInfo.location}</span>
                </div>

                <div className="about-contact">
                  <a href={`mailto:${personalInfo.email}`}>
                    <Mail size={17} />
                    {personalInfo.email}
                  </a>

                  <a href={`tel:${personalInfo.phone}`}>
                    <Phone size={17} />
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="about-cards">
                <div className="about-card">
                  <div className="about-card-icon">
                    <Code2 size={23} />
                  </div>

                  <h3>Frontend Development</h3>

                  <p>
                    Modern, responsive and interactive user interfaces
                    using React.js, Next.js and JavaScript.
                  </p>
                </div>

                <div className="about-card">
                  <div className="about-card-icon">
                    <Server size={23} />
                  </div>

                  <h3>Backend Development</h3>

                  <p>
                    REST APIs, CRUD operations, authentication and
                    backend services using Node.js, Express.js and
                    Python.
                  </p>
                </div>

                <div className="about-card">
                  <div className="about-card-icon">
                    <Database size={23} />
                  </div>

                  <h3>Database</h3>

                  <p>
                    Experience with MongoDB, SQL and PostgreSQL for
                    storing and managing application data.
                  </p>
                </div>

                <div className="about-card">
                  <div className="about-card-icon">
                    <Brain size={23} />
                  </div>

                  <h3>AI / ML</h3>

                  <p>
                    Exploring Python, Artificial Intelligence,
                    Machine Learning and AI-powered applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section skills-section">
          <div className="section-container">
            <div className="section-heading">
              <span className="section-label">TECHNICAL SKILLS</span>

              <h2>
                Technologies I <span>work with.</span>
              </h2>

              <p>
                A growing toolkit focused on full-stack development
                and AI-powered applications.
              </p>
            </div>

            <div className="skills-grid">
              <div className="skill-card">
                <div className="skill-card-header">
                  <Code2 size={22} />
                  <h3>Frontend</h3>
                </div>

                <div className="skill-tags">
                  {skills.frontend.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-card-header">
                  <Server size={22} />
                  <h3>Backend</h3>
                </div>

                <div className="skill-tags">
                  {skills.backend.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-card-header">
                  <Database size={22} />
                  <h3>Database</h3>
                </div>

                <div className="skill-tags">
                  {skills.databases.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-card-header">
                  <ExternalLink size={22} />
                  <h3>API & Development</h3>
                </div>

                <div className="skill-tags">
                  {skills.apiDevelopment.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-card-header">
                  <Brain size={22} />
                  <h3>AI / ML</h3>
                </div>

                <div className="skill-tags">
                  {skills.aiMl.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-card-header">
                  <GitBranch size={22} />
                  <h3>Tools</h3>
                </div>

                <div className="skill-tags">
                  {skills.tools.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="soft-skills">
              <h3>Soft Skills</h3>

              <div className="skill-tags">
                {softSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section
          id="experience"
          className="section experience-section"
        >
          <div className="section-container">
            <div className="section-heading">
              <span className="section-label">EXPERIENCE</span>

              <h2>
                My professional <span>journey.</span>
              </h2>
            </div>

            <div className="experience-card">
              <div className="experience-icon">
                <BriefcaseBusiness size={25} />
              </div>

              <div className="experience-main">
                <div className="experience-top">
                  <div>
                    <span className="experience-label">
                      INTERNSHIP
                    </span>

                    <h3>{internship.role}</h3>
                    <h4>{internship.company}</h4>
                  </div>

                  <span className="experience-duration">
                    {internship.duration}
                  </span>
                </div>

                <p className="experience-description">
                  {internship.description}
                </p>

                <div className="responsibility-list">
                  {internship.responsibilities.map(
                    (item, index) => (
                      <div
                        className="responsibility"
                        key={index}
                      >
                        <span className="responsibility-dot"></span>
                        <span>{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section projects-section">
          <div className="section-container">
            <div className="section-heading">
              <span className="section-label">PROJECTS</span>

              <h2>
                Things I've <span>built.</span>
              </h2>

              <p>
                A selection of internship and personal projects
                developed using modern web and AI technologies.
              </p>
            </div>

            {/* Internship Projects */}
            <div className="project-group">
              <div className="project-group-heading">
                <div>
                  <span>01</span>
                  <h3>Internship Projects</h3>
                </div>

                <p>
                  Projects worked on during my Bodex internship.
                </p>
              </div>

              <div className="projects-grid">
                {internshipProjects.map((project) => (
                  <article
                    className="project-card"
                    key={project.id}
                  >
                    <div className="project-image">
                      <img
                        src={project.image}
                        alt={`${project.title} project thumbnail`}
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";

                          event.currentTarget.parentElement.classList.add(
                            "project-image-fallback"
                          );
                        }}
                      />

                      <div className="project-image-overlay">
                        <span>{project.category}</span>
                      </div>
                    </div>

                    <div className="project-content">
                      <div className="project-title-row">
                        <h3>{project.title}</h3>

                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="project-arrow"
                          aria-label={`Open ${project.title}`}
                        >
                          <ArrowUpRight size={19} />
                        </a>
                      </div>

                      <p>{project.description}</p>

                      <div className="project-tech">
                        {project.technologies.map(
                          (technology) => (
                            <span key={technology}>
                              {technology}
                            </span>
                          )
                        )}
                      </div>

                      <div className="project-actions">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="project-live-button"
                        >
                          <ExternalLink size={16} />
                          Live Project
                        </a>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="project-github-button"
                          >
                            <GitBranch size={16} />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Personal Projects */}
            <div className="project-group personal-project-group">
              <div className="project-group-heading">
                <div>
                  <span>02</span>
                  <h3>Personal Projects</h3>
                </div>

                <p>
                  Self-developed full-stack and AI projects.
                </p>
              </div>

              <div className="projects-grid">
                {personalProjects.map((project) => (
                  <article
                    className="project-card"
                    key={project.id}
                  >
                    <div className="project-image">
                      <img
                        src={project.image}
                        alt={`${project.title} project thumbnail`}
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";

                          event.currentTarget.parentElement.classList.add(
                            "project-image-fallback"
                          );
                        }}
                      />

                      <div className="project-image-overlay">
                        <span>{project.category}</span>
                      </div>
                    </div>

                    <div className="project-content">
                      <div className="project-title-row">
                        <h3>{project.title}</h3>

                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="project-arrow"
                          aria-label={`Open ${project.title}`}
                        >
                          <ArrowUpRight size={19} />
                        </a>
                      </div>

                      <p>{project.description}</p>

                      <div className="project-tech">
                        {project.technologies.map(
                          (technology) => (
                            <span key={technology}>
                              {technology}
                            </span>
                          )
                        )}
                      </div>

                      <div className="project-actions">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="project-live-button"
                        >
                          <ExternalLink size={16} />
                          Live Project
                        </a>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="project-github-button"
                          >
                            <GitBranch size={16} />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section
          id="certificates"
          className="section certificates-section"
        >
          <div className="section-container">
            <div className="section-heading">
              <span className="section-label">CERTIFICATES</span>

              <h2>
                Certifications & <span>training.</span>
              </h2>

              <p>
                Professional training and certifications supporting
                my technical foundation.
              </p>
            </div>

            <div className="certificates-grid">
              {certificates.map((certificate) => (
                <article
                  className="certificate-card"
                  key={certificate.id}
                >
                  <div className="certificate-image">
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";

                        event.currentTarget.parentElement.classList.add(
                          "certificate-image-fallback"
                        );
                      }}
                    />

                    <div className="certificate-icon">
                      <Award size={22} />
                    </div>
                  </div>

                  <div className="certificate-content">
                    <span className="certificate-label">
                      CERTIFICATE
                    </span>

                    <h3>{certificate.title}</h3>

                    <p className="certificate-organization">
                      {certificate.organization}
                    </p>

                    <span className="certificate-date">
                      {certificate.date}
                    </span>

                    {certificate.description && (
                      <p className="certificate-description">
                        {certificate.description}
                      </p>
                    )}

                    {certificate.credentialId && (
                      <small>
                        Credential ID:{" "}
                        {certificate.credentialId}
                      </small>
                    )}

                    {certificate.url && (
                      <a
                        href={certificate.url}
                        target="_blank"
                        rel="noreferrer"
                        className="certificate-link"
                      >
                        View Certificate
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section
          id="education"
          className="section education-section"
        >
          <div className="section-container">
            <div className="section-heading">
              <span className="section-label">EDUCATION</span>

              <h2>
                My academic <span>background.</span>
              </h2>
            </div>

            <div className="education-list">
              {education.map((item) => (
                <article
                  className="education-card"
                  key={item.id}
                >
                  <div className="education-icon">
                    <GraduationCap size={24} />
                  </div>

                  <div className="education-content">
                    <span>{item.type}</span>

                    <h3>{item.degree}</h3>

                    <p>{item.institution}</p>

                    <small>{item.duration}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section contact-section">
          <div className="section-container">
            <div className="contact-wrapper">
              <div className="contact-info">
                <span className="section-label">CONTACT</span>

                <h2>
                  Let's build something{" "}
                  <span>great together.</span>
                </h2>

                <p>
                  Have a project, opportunity or idea in mind? Feel
                  free to reach out. I'm always interested in
                  learning, building and collaborating.
                </p>

                <div className="contact-details">
                  <a href={`mailto:${personalInfo.email}`}>
                    <div className="contact-icon">
                      <Mail size={19} />
                    </div>

                    <div>
                      <span>Email</span>
                      <strong>{personalInfo.email}</strong>
                    </div>
                  </a>

                  <a href={`tel:${personalInfo.phone}`}>
                    <div className="contact-icon">
                      <Phone size={19} />
                    </div>

                    <div>
                      <span>Phone</span>
                      <strong>{personalInfo.phone}</strong>
                    </div>
                  </a>

                  <div className="contact-detail-item">
                    <div className="contact-icon">
                      <MapPin size={19} />
                    </div>

                    <div>
                      <span>Location</span>
                      <strong>{personalInfo.location}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <form
                className="contact-form"
                onSubmit={handleContactSubmit}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>

                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Write your message..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Send Message
                  <ArrowUpRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="section-container">
          <div className="footer-top">
            <button
              className="footer-brand"
              onClick={() => scrollToSection("home")}
            >
              <span className="brand-logo">VS</span>

              <div>
                <strong>Veena Sahu</strong>
                <span>Full Stack Developer</span>
              </div>
            </button>

            <div className="footer-socials">
              {socialLinks.map((social) => {
                if (!social.url) return null;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                  >
                    {getSocialIcon(social.name)}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} Veena Sahu. All rights
              reserved.
            </p>

            <button
              className="back-to-top"
              onClick={() => scrollToSection("home")}
            >
              Back to top
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;