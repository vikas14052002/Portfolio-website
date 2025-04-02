import React, { useState, useEffect } from 'react';
import { Menu, Code, Briefcase, User, Mail, ChevronDown, ExternalLink, Github } from 'lucide-react';
import HeroAnimation from './components/HeroAnimation';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './config/emailjs';

// Add animations CSS
const floatAnimation = `
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;

// User data configuration
const userData = {
  name: "Kommana Vikas",
  title: "Full Stack Developer & AI Enthusiast",
  about: "I'm a passionate developer with over 1.9 years of experience in creating beautiful, functional, and user-friendly websites and applications. I specialize in modern web technologies and have a keen eye for design.",
  skills: [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'UI/UX Design', level: 85 }
  ],
  education: [
    {
      id: 'btech',
      degree: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      institution: "Indian Institute of Technology(IIT), Hyderabad",
      period: "2019 - 2023",
      score: "CGPA: 6.99/10",
      description: "Specialized in Artificial Intelligence and Machine Learning with a focus on practical applications in web development.",
      images: [
        "https://images.indianexpress.com/2021/06/IIT-Hyderabad-1.jpg",
        "data:image/jpeg;base64,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",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtwusMS2Fa4_Etnv1AblAZjJTR8qox2Eqxag&s"
      ]
    },
    {
      id: 'highschool',
      degree: "Higher Secondary Education",
      field: "Maths Physics and Chemistry",
      institution: "Narayana Junior College",
      period: "2017 - 2019",
      score: "Percentage: 96.%",
      description: ""
    }
  ],
  certifications: [
    {
      name: "Advanced React and Redux",
      issuer: "Udemy",
      year: "2022",
      color: "blue"
    },
    {
      name: "Machine Learning Specialization",
      issuer: "Coursera",
      year: "2021",
      color: "purple"
    }
  ],
  projects: [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "fullstack",
      technologies: ["React", "Node.js", "PostgreSQL"],
      links: {
        github: "https://github.com",
        live: "https://example.com"
      }
    },
    {
      title: "AI Image Generator",
      description: "An AI-powered image generation tool using machine learning",
      image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "ai",
      technologies: ["Python", "TensorFlow", "React"],
      links: {
        github: "https://github.com",
        live: "https://example.com"
      }
    },
    {
      title: "Social Media Dashboard",
      description: "Real-time analytics dashboard for social media management",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "frontend",
      technologies: ["React", "D3.js", "Tailwind CSS"],
      links: {
        github: "https://github.com",
        live: "https://example.com"
      }
    }
  ],
  experience: [
    {
      company: "Kore.ai Pvt Ltd.",
      position: "Software Engineer",
      period: "Jun 2023 - Present",
      description: "Led development of enterprise-scale applications, mentored junior developers, and implemented CI/CD pipelines.",
      technologies: ["React","Angular", "Node.js", "MongoDB", "LLMs", "Agents", "MCP"]
    },
    {
      company: "Carelon Health Technologies",
      position: "Associate Software Intern",
      period: "Jun 2022 - Aug 2022",
      description: "Built and maintained multiple client websites and internal tools.",
      technologies: ["Python", "Data Science", "Machine learning", "LLM"]
    }
  ]
};

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPopup, setShowPopup] = useState(false);
  const [revealScore, setRevealScore] = useState(false);
  const [selectedEduIndex, setSelectedEduIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    // Add animation styles to head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = floatAnimation;
    document.head.appendChild(styleElement);
    
    // Cleanup function
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Slideshow effect
  useEffect(() => {
    // Only set up slideshow if we have images
    const images = userData.education[0]?.images || [];
    if (images.length) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => 
          prev === images.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, []);

  // Get unique project categories
  const projectCategories = ['all', ...new Set(userData.projects.map(project => project.category))];

  const handleScoreClick = (index: number) => {
    setSelectedEduIndex(index);
    setShowPopup(true);
    setRevealScore(false);
  };

  const handleConfirmPayment = () => {
    setRevealScore(true);
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setShowPopup(false);
      setRevealScore(false);
    }, 5000);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setRevealScore(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const templateParams = {
        to_email: 'vikas14052002@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen dark bg-gray-900 text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50 py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full right-0 md:top-auto bg-gray-900 md:bg-transparent w-48 md:w-auto rounded-lg shadow-lg md:shadow-none mt-2 md:mt-0 py-2 md:py-0 gap-2`}>
            {['About', 'Skills', 'Education', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90" />
        <HeroAnimation />
        
        <div className="container mx-auto px-6 py-24 text-center z-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">{userData.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 animate-fade-in-delay">
            {userData.title}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
            <a
              href="#projects"
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2 hover:scale-105 transition-transform"
            >
              View My Work <ChevronDown size={20} />
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-white rounded-full hover:bg-gray-800 transition-colors hover:scale-105 transition-transform"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 mb-6">
              {userData.about}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-gray-700 rounded-xl shadow-sm">
                <Code className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Development</h3>
                <p className="text-gray-300">Clean, modern development with best practices</p>
              </div>
              <div className="p-6 bg-gray-700 rounded-xl shadow-sm">
                <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Business</h3>
                <p className="text-gray-300">Strong business acumen and project management</p>
              </div>
              <div className="p-6 bg-gray-700 rounded-xl shadow-sm">
                <User className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">User Focus</h3>
                <p className="text-gray-300">User-centered approach to problem solving</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {userData.skills.map((skill) => (
              <div key={skill.name} className="p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Education</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                {userData.education.map((edu, index) => (
                  <div key={index} className="bg-gray-700 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
                    <div className="flex items-center mb-2">
                      <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {index === 0 ? (
                            <>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5" />
                            </>
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          )}
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{edu.degree}</h3>
                        <p className="text-blue-400">{edu.field}</p>
                      </div>
                    </div>
                    <div className="ml-18 pl-14">
                      <p className="text-gray-300 mb-2">{edu.institution}</p>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{edu.period}</span>
                        {edu.id === 'btech' ? (
                          <button 
                            onClick={() => handleScoreClick(index)}
                            className="font-medium cursor-pointer text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                          >
                            <span className="bg-gray-600 px-2 py-1 rounded">
                              {edu.score.replace(/[0-9.]/g, "•")}
                            </span>
                            <span className="ml-1 text-xs">(Click to reveal)</span>
                          </button>
                        ) : (
                          <span>{edu.score}</span>
                        )}
                      </div>
                      {edu.description && (
                        <div className="mt-4">
                          <p className="text-gray-300">{edu.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 md:order-2 relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600 opacity-30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600 opacity-30 rounded-full blur-3xl"></div>
              
              {/* IIT Hyderabad Slideshow */}
              <div className="relative w-full h-80 rounded-2xl overflow-hidden">
                {userData.education[0].images?.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`IIT Hyderabad campus - ${index + 1}`} 
                      className="w-full h-full object-cover rounded-2xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
                  </div>
                ))}
                
                {/* Slideshow navigation dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
                  {userData.education[0].images?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="absolute -right-4 -bottom-4 bg-gray-900 p-4 rounded-xl shadow-xl z-30 transform transition-all duration-300 hover:scale-110">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">4+</div>
                <div className="text-sm text-gray-300">Years of Learning</div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-10 bg-blue-600/30 blur-xl rounded-full"></div>
              <h3 className="text-2xl font-semibold text-center mb-6">Certifications</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.certifications.map((cert, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg flex items-center transform transition-all duration-300 hover:bg-gray-600">
                  <div className={`w-12 h-12 bg-${cert.color}-600/20 rounded-lg flex items-center justify-center mr-4`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${cert.color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-sm text-gray-400">{cert.issuer} - {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Projects</h2>
          
          <div className="flex justify-center gap-4 mb-12">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userData.projects
              .filter((project) => selectedCategory === 'all' || project.category === selectedCategory)
              .map((project) => (
                <div
                  key={project.title}
                  className="bg-gray-700 rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-600 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-blue-400"
                      >
                        <Github size={20} /> Code
                      </a>
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-blue-400"
                      >
                        <ExternalLink size={20} /> Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Experience</h2>
          <div className="max-w-4xl mx-auto">
            {userData.experience.map((job, index) => (
              <div
                key={job.company}
                className="relative pl-8 pb-12 last:pb-0"
              >
                <div className="absolute left-0 top-0 h-full w-px bg-blue-500" />
                <div className="absolute left-0 top-2 w-2 h-2 -ml-1 rounded-full bg-blue-500" />
                
                <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{job.position}</h3>
                    <span className="text-gray-300">{job.period}</span>
                  </div>
                  <h4 className="text-blue-400 mb-4">{job.company}</h4>
                  <p className="text-gray-300 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Get In Touch</h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors h-32 resize-none"
                  placeholder="Your message"
                  required
                />
              </div>
              {submitStatus.type && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-3 bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Mail size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Payment Popup */}
      {showPopup && selectedEduIndex !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full relative">
            <button 
              onClick={handleClosePopup}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              ×
            </button>
            
            {!revealScore ? (
              <>
                <h3 className="text-xl font-bold mb-4">Unlock Score</h3>
                <div className="bg-blue-900/30 rounded-lg p-4 mb-6">
                  <p className="text-gray-300 mb-2">
                    To view the exact score for <span className="text-blue-400 font-semibold">{userData.education[selectedEduIndex].degree}</span>, please complete a small payment.
                  </p>
                  <p className="text-sm text-gray-400">
                    This helps support the development of this portfolio.
                  </p>
                </div>
                {/* <div className="border border-gray-600 rounded-lg p-4 mb-6">
                  <p className="font-medium mb-2">Payment Amount: <span className="text-green-400">$2.00</span></p>
                  <div className="flex flex-col gap-2">
                    <input type="text" placeholder="Card Number" className="bg-gray-700 rounded p-2 border border-gray-600" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="MM/YY" className="bg-gray-700 rounded p-2 border border-gray-600" />
                      <input type="text" placeholder="CVC" className="bg-gray-700 rounded p-2 border border-gray-600" />
                    </div>
                  </div>
                </div> */}
                <div className="flex gap-3">
                  <button 
                    onClick={handleClosePopup}
                    className="flex-1 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>`
                  <button 
                    onClick={handleConfirmPayment}
                    className="flex-1 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Pay $2.00
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Just Kidding!</h3>
                <p className="text-gray-300 mb-4">
                  No payment needed. The actual score is:
                </p>
                <div className="bg-blue-600/20 rounded-lg p-3 inline-block">
                  <span className="text-2xl font-bold text-white">{userData.education[selectedEduIndex].score}</span>
                </div>
                <p className="text-sm text-gray-400 mt-6">
                  This popup will close automatically in a few seconds.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;