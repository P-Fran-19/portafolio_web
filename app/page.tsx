"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Language = 'es' | 'en';

type PortfolioContent = {
  nav: {
    about: string;
    skills: string;
    projects: string;
    timeline: string;
    contact: string;
  };
  badge: string;
  heroTitlePrefix: string;
  heroText: string;
  heroButtons: {
    projects: string;
    contact: string;
  };
  stats: ReadonlyArray<readonly [string, string]>;
  snapshotTitle: string;
  snapshotSubtitle: string;
  snapshotItems: ReadonlyArray<readonly [string, string]>;
  sections: {
    aboutKicker: string;
    aboutTitle: string;
    skillsKicker: string;
    skillsTitle: string;
    skillsText: string;
    projectsKicker: string;
    projectsTitle: string;
    projectsText: string;
    timelineKicker: string;
    timelineTitle: string;
    contactKicker: string;
    contactTitle: string;
    contactText: string;
  };
  cards: ReadonlyArray<{
    title: string;
    text: string;
  }>;
  projects: ReadonlyArray<{
    title: string;
    tag: string;
    description: string;
    highlights: readonly string[];
  }>;
  timeline: ReadonlyArray<{
    year: string;
    title: string;
    text: string;
  }>;
  contactItems: ReadonlyArray<readonly [string, string]>;
  featured: string;
  footer: string;
  langLabel: string;
};

const content: Record<Language, PortfolioContent> = {
  es: {
    nav: {
      about: 'Sobre mí',
      skills: 'Skills',
      projects: 'Proyectos',
      timeline: 'Trayectoria',
      contact: 'Contacto',
    },
    badge: 'Estudiante de Ingeniería en Informática',
    heroTitlePrefix: 'Hola, soy',
    heroText:
      'Construyo soluciones con enfoque en programación, lógica, bases de datos, desarrollo web y análisis técnico. Me interesa crear software sólido, bien diseñado y visualmente profesional.',
    heroButtons: {
      projects: 'Ver proyectos',
      contact: 'Contactarme',
    },
    stats: [
      ['+6', 'Proyectos destacados'],
      ['Full Stack', 'Perfil técnico'],
      ['IA + Software', 'Intereses principales'],
    ],
    snapshotTitle: 'Profile Snapshot',
    snapshotSubtitle: 'Software • Data • Logic',
    snapshotItems: [
      ['Enfoque', 'Resolución de problemas y desarrollo de software'],
      ['Título', 'Analista de Sistemas'],
      ['Fortalezas', 'OOP, bases de datos, lógica, backend y visualización'],
      ['Objetivo', 'Conseguir oportunidades para crecer profesionalmente'],
    ],
    sections: {
      aboutKicker: 'Sobre mí',
      aboutTitle: 'Una presentación profesional con foco técnico',
      skillsKicker: 'Skills',
      skillsTitle: 'Tecnologías y áreas en las que trabajo',
      skillsText:
        'Mi perfil combina programación, fundamentos teóricos y experiencia práctica en proyectos académicos y personales. Busco que cada solución tenga lógica, estructura y buena presentación.',
      projectsKicker: 'Proyectos',
      projectsTitle: 'Experiencia aplicada en desarrollo y análisis',
      projectsText:
        'Una selección de trabajos y áreas donde apliqué programación, lógica, arquitectura, debugging, simulación, visualización y calidad técnica.',
      timelineKicker: 'Trayectoria',
      timelineTitle: 'Mi recorrido hasta ahora',
      contactKicker: 'Contacto',
      contactTitle: '¿Buscás un perfil con base técnica y proyección profesional?',
      contactText:
        'Estoy abierto a oportunidades, proyectos, prácticas profesionales y experiencias donde pueda seguir creciendo como estudiante y futuro ingeniero en informática.',
    },
    cards: [
      {
        title: 'Pensamiento lógico',
        text: 'Me destaco resolviendo problemas con enfoque estructurado y atención al detalle.',
      },
      {
        title: 'Perfil técnico',
        text: 'Combino programación, bases de datos, arquitectura de software y análisis.',
      },
      {
        title: 'Aprendizaje constante',
        text: 'Estoy en formación continua y me adapto rápido a nuevas herramientas y desafíos.',
      },
      {
        title: 'Orientación profesional',
        text: 'Busco oportunidades para crecer, aportar valor y construir soluciones sólidas.',
      },
    ],
    projects: [
      {
        title: 'AI Reasoning Annotation Project',
        tag: 'AI / Logic / Quality',
        description:
          'Evaluación y corrección de respuestas de modelos de IA, enfocándome en razonamiento lógico, precisión matemática y mejora de calidad.',
        highlights: ['Razonamiento paso a paso', 'Control de calidad', 'Detección de errores lógicos'],
      },
      {
        title: 'Sistema de Turnos Médicos',
        tag: 'Java / OOP / JDBC',
        description:
          'Desarrollo de un sistema orientado a objetos para gestionar médicos, pacientes, turnos, consultorios y reportes de cobros.',
        highlights: ['Arquitectura por capas', 'DAO + Service', 'Modelado de dominio'],
      },
      {
        title: 'Ticketing Web App',
        tag: 'PHP / MySQL / Mail',
        description:
          'Aplicación web para gestión de entradas con autenticación, dashboard, integración con base de datos y envío de emails.',
        highlights: ['Login con sesiones', 'CRUD', 'PHPMailer'],
      },
      {
        title: 'SimCity Mini en Python',
        tag: 'Python / Tkinter / Simulation',
        description:
          'Simulación urbana en un mapa 10x10 con construcción, demoliciones, eventos y lógica de evolución del entorno.',
        highlights: ['Lógica de simulación', 'Interfaz visual', 'Eventos dinámicos'],
      },
      {
        title: 'Concurrencia e IPC en C',
        tag: 'C / Threads / System V',
        description:
          'Resolución de ejercicios avanzados con colas de mensajes, memoria compartida, sincronización y procesamiento concurrente.',
        highlights: ['pthread', 'shmget/msgget', 'Debug de procesos'],
      },
      {
        title: 'Dashboards y Modelado Analítico',
        tag: 'Data / BI / Visualización',
        description:
          'Construcción de modelos analíticos y dashboards para comunicar métricas, resultados y conclusiones de negocio.',
        highlights: ['KPIs', 'Storytelling visual', 'Toma de decisiones'],
      },
    ],
    timeline: [
      {
        year: 'Actualidad',
        title: 'Estudiante de Ingeniería en Informática',
        text: 'Formación enfocada en software, lógica, estructuras de datos, bases de datos, sistemas, redes y resolución de problemas complejos.',
      },
      {
        year: 'Pasantías',
        title: 'Ministerio Público Fiscal',
        text: 'Experiencia en un entorno profesional aplicando conocimientos técnicos, aprendiendo procesos reales y fortaleciendo habilidades prácticas.',
      },
      {
        year: 'Título',
        title: 'Analista de Sistemas Universitario',
        text: 'Obtención del título intermedio dentro de la carrera de Ingeniería en Informática.',
      },
      {
        year: 'Proyectos',
        title: 'Desarrollo Full Stack y Backend',
        text: 'Trabajo en proyectos académicos y personales aplicando programación orientada a objetos, desarrollo web, bases de datos y arquitectura.',
      },
      {
        year: 'IA y Calidad',
        title: 'Entrenamiento y evaluación de modelos',
        text: 'Participación en tareas relacionadas con análisis lógico, corrección paso a paso y mejora de calidad en respuestas generadas por IA.',
      },
    ],
    contactItems: [
      ['Email', 'j.francisco.huber@gmail.com'],
      ['LinkedIn', 'www.linkedin.com/in/francisco-huber'],
      ['GitHub', 'github.com/P-Fran-19'],
    ],
    featured: 'Destacado',
    footer: '© 2026 Francisco · Portfolio Ingeniería en Informática',
    langLabel: 'EN',
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      timeline: 'Journey',
      contact: 'Contact',
    },
    badge: 'Computer Engineering Student',
    heroTitlePrefix: 'Hi, I’m',
    heroText:
      'I build solutions focused on programming, logic, databases, web development, and technical analysis. I am interested in creating solid, well-designed, and visually professional software.',
    heroButtons: {
      projects: 'View projects',
      contact: 'Contact me',
    },
    stats: [
      ['+6', 'Featured projects'],
      ['Full Stack', 'Technical profile'],
      ['AI + Software', 'Main interests'],
    ],
    snapshotTitle: 'Profile Snapshot',
    snapshotSubtitle: 'Software • Data • Logic',
    snapshotItems: [
      ['Focus', 'Problem solving and software development'],
      ['Degree', 'Systems Analyst'],
      ['Strengths', 'OOP, databases, logic, backend, and visualisation'],
      ['Goal', 'To secure opportunities for professional growth'],
    ],
    sections: {
      aboutKicker: 'About',
      aboutTitle: 'A professional presentation with a technical focus',
      skillsKicker: 'Skills',
      skillsTitle: 'Technologies and areas I work with',
      skillsText:
        'My profile combines programming, theoretical foundations, and hands-on experience in academic and personal projects. I aim for every solution to have logic, structure, and strong presentation.',
      projectsKicker: 'Projects',
      projectsTitle: 'Applied experience in development and analysis',
      projectsText:
        'A selection of work and areas where I applied programming, logic, architecture, debugging, simulation, visualisation, and technical quality.',
      timelineKicker: 'Journey',
      timelineTitle: 'My path so far',
      contactKicker: 'Contact',
      contactTitle: 'Looking for a profile with technical foundations and professional potential?',
      contactText:
        'I am open to opportunities, projects, internships, and experiences where I can continue growing as a student and future computer engineer.',
    },
    cards: [
      {
        title: 'Logical thinking',
        text: 'I stand out for solving problems with a structured approach and close attention to detail.',
      },
      {
        title: 'Technical profile',
        text: 'I combine programming, databases, software architecture, and analysis.',
      },
      {
        title: 'Continuous learning',
        text: 'I am constantly learning and I adapt quickly to new tools and challenges.',
      },
      {
        title: 'Professional mindset',
        text: 'I aim to grow, add value, and build solid solutions.',
      },
    ],
    projects: [
      {
        title: 'AI Reasoning Annotation Project',
        tag: 'AI / Logic / Quality',
        description:
          'Evaluation and correction of AI model responses, focusing on logical reasoning, mathematical accuracy, and quality improvement.',
        highlights: ['Step-by-step reasoning', 'Quality assurance', 'Logical error detection'],
      },
      {
        title: 'Medical Appointment System',
        tag: 'Java / OOP / JDBC',
        description:
          'Development of an object-oriented system to manage doctors, patients, appointments, consulting rooms, and billing reports.',
        highlights: ['Layered architecture', 'DAO + Service', 'Domain modelling'],
      },
      {
        title: 'Ticketing Web App',
        tag: 'PHP / MySQL / Mail',
        description:
          'Web application for ticket management with authentication, dashboard, database integration, and email sending.',
        highlights: ['Session-based login', 'CRUD', 'PHPMailer'],
      },
      {
        title: 'Mini SimCity in Python',
        tag: 'Python / Tkinter / Simulation',
        description:
          'Urban simulation on a 10x10 map with building, demolitions, events, and environment evolution logic.',
        highlights: ['Simulation logic', 'Visual interface', 'Dynamic events'],
      },
      {
        title: 'Concurrency and IPC in C',
        tag: 'C / Threads / System V',
        description:
          'Advanced exercises using message queues, shared memory, synchronisation, and concurrent processing.',
        highlights: ['pthread', 'shmget/msgget', 'Process debugging'],
      },
      {
        title: 'Dashboards and Analytical Modelling',
        tag: 'Data / BI / Visualisation',
        description:
          'Creation of analytical models and dashboards to communicate metrics, results, and business conclusions.',
        highlights: ['KPIs', 'Visual storytelling', 'Decision-making'],
      },
    ],
    timeline: [
      {
        year: 'Present',
        title: 'Computer Engineering Student',
        text: 'Education focused on software, logic, data structures, databases, systems, networks, and complex problem solving.',
      },
      {
        year: 'Internships',
        title: 'Public Prosecutor\'s Office',
        text: 'Professional experience applying technical knowledge, learning real-world processes, and strengthening practical skills.',
      },
      {
        year: 'Degree',
        title: 'University Systems Analyst',
        text: 'Intermediate degree obtained within the Computer Engineering program.',
      },
      {
        year: 'Projects',
        title: 'Full Stack and Backend Development',
        text: 'I work on academic and personal projects applying object-oriented programming, web development, databases, and software architecture.',
      },
      {
        year: 'AI and Quality',
        title: 'Model training and evaluation',
        text: 'Participation in tasks related to logical analysis, step-by-step correction, and quality improvement in AI-generated responses.',
      },
    ],
    contactItems: [
      ['Email', 'j.francisco.huber@gmail.com'],
      ['LinkedIn', 'www.linkedin.com/in/francisco-huber'],
      ['GitHub', 'github.com/P-Fran-19'],
    ],
    featured: 'Featured',
    footer: '© 2026 Francisco · Professional Computer Engineering Portfolio',
    langLabel: 'ES',
  },
};

const skills = [
  { name: 'Java', level: 82 },
  { name: 'Python', level: 85 },
  { name: 'C', level: 82 },
  { name: 'SQL', level: 92 },
  { name: 'JavaScript', level: 80 },
  { name: 'HTML & CSS', level: 88 },
  { name: 'Cybersecurity', level: 75 },
  { name: 'Data Analysis', level: 78 },
] as const;

function runDataChecks(): void {
  if (content.es.timeline.length !== content.en.timeline.length) {
    throw new Error('Timeline data must have the same number of entries in both languages.');
  }
  if (content.es.cards.length !== content.en.cards.length) {
    throw new Error('Cards data must have the same number of entries in both languages.');
  }
  if (skills.length === 0) {
    throw new Error('Skills data cannot be empty.');
  }
}

runDataChecks();

export default function PortfolioFrancisco() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-section]').forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-card]').forEach((card, index) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 36, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: index * 0.03,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-timeline-item]').forEach((item, index) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, x: -28 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.45,
            delay: index * 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-skill-fill]').forEach((fill) => {
        const finalWidth = fill.dataset.width || '0%';
        gsap.fromTo(
          fill,
          { width: '0%' },
          {
            width: finalWidth,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: fill,
              start: 'top 95%',
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((layer, index) => {
        const depth = Number(layer.dataset.depth || 0.15);
        const axis = layer.dataset.axis || 'y';
        const amount = depth * 180;
        const tweenProps = axis === 'x'
          ? { x: index % 2 === 0 ? amount : -amount }
          : { y: index % 2 === 0 ? amount : -amount };

        gsap.to(layer, {
          ...tweenProps,
          rotationZ: Number(layer.dataset.rotate || 0),
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-float]').forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 === 0 ? -18 : 18,
          x: index % 2 === 0 ? 10 : -10,
          duration: 5 + index * 0.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      gsap.to('[data-orbit-ring="one"]', {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });

      gsap.to('[data-orbit-ring="two"]', {
        rotate: -360,
        duration: 36,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });

      gsap.fromTo(
        '[data-aurora]',
        { opacity: 0.35, scale: 0.96 },
        {
          opacity: 0.65,
          scale: 1.08,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.4,
        }
      );
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, [language]);

  const t = content[language];
  const timelineData = useMemo(() => t.timeline, [t]);

  return (
    <div
      ref={rootRef}
      className="min-h-screen overflow-x-hidden bg-neutral-950 text-white selection:bg-cyan-400 selection:text-black"
    >
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes gridMove {
          0% { transform: translateY(0px); }
          100% { transform: translateY(40px); }
        }
        @keyframes shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .glass {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.12);
        }
        .hero-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 42px 42px;
          animation: gridMove 10s linear infinite;
          mask-image: radial-gradient(circle at center, black 35%, transparent 85%);
          -webkit-mask-image: radial-gradient(circle at center, black 35%, transparent 85%);
        }
        .shine-text {
          background: linear-gradient(90deg, #ffffff, #67e8f9, #ffffff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shine 6s linear infinite;
        }
        .scene-3d {
          perspective: 1400px;
          transform-style: preserve-3d;
          overflow: hidden;
        }
        .mesh-panel {
          position: absolute;
          border: 1px solid rgba(255,255,255,0.16);
          background: linear-gradient(135deg, rgba(103,232,249,0.16), rgba(168,85,247,0.12));
          box-shadow: 0 25px 100px rgba(0,0,0,0.32), 0 0 35px rgba(34,211,238,0.12);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .mesh-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background-image:
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0.55;
          mix-blend-mode: screen;
        }
        .wire-orb {
          position: absolute;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.22);
          box-shadow: inset 0 0 45px rgba(255,255,255,0.08), 0 0 55px rgba(34,211,238,0.16);
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), rgba(255,255,255,0.05) 35%, transparent 60%);
        }
        .wire-orb::before {
          content: '';
          position: absolute;
          inset: 12%;
          border-radius: 9999px;
          border: 1px dashed rgba(103,232,249,0.30);
        }
        .depth-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px);
          background-size: 70px 70px;
          opacity: 0.75;
        }
        .aurora-ribbon {
          position: absolute;
          filter: blur(50px);
          opacity: 0.5;
          mix-blend-mode: screen;
          background: linear-gradient(135deg, rgba(34,211,238,0.28), rgba(168,85,247,0.2), rgba(59,130,246,0.18));
        }
        .orbit-shell {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
        }
        .orbit-ring {
          position: absolute;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 0 40px rgba(34,211,238,0.08), inset 0 0 25px rgba(255,255,255,0.03);
        }
        .star-node {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.9);
          box-shadow: 0 0 16px rgba(255,255,255,0.65), 0 0 36px rgba(34,211,238,0.25);
        }
        .creative-noise {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image: radial-gradient(rgba(255,255,255,0.9) 0.7px, transparent 0.7px);
          background-size: 22px 22px;
          mask-image: radial-gradient(circle at center, black 30%, transparent 82%);
          -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 82%);
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 scene-3d">
        <div
          data-parallax
          data-depth="0.18"
          data-axis="y"
          className="absolute inset-0 depth-grid"
          style={{ transform: 'translate3d(0, 0, -220px) rotateX(72deg) scale(1.8)' }}
        />
        <div className="creative-noise" />

        <div data-aurora data-float className="aurora-ribbon left-[-10%] top-[8%] h-[22rem] w-[38rem] rounded-full rotate-[-18deg]" />
        <div data-aurora data-float className="aurora-ribbon right-[-8%] top-[22%] h-[26rem] w-[34rem] rounded-full rotate-[22deg]" />
        <div data-aurora data-float className="aurora-ribbon left-[18%] bottom-[-6%] h-[24rem] w-[42rem] rounded-full rotate-[8deg]" />

        <div
          data-parallax
          data-depth="0.22"
          data-axis="y"
          data-rotate="6"
          data-float
          className="wire-orb left-[4%] top-[8%] h-56 w-56"
          style={{ transform: 'translate3d(0, 0, 120px)' }}
        />
        <div
          data-parallax
          data-depth="0.28"
          data-axis="y"
          data-rotate="-8"
          data-float
          className="wire-orb right-[6%] top-[12%] h-80 w-80"
          style={{ transform: 'translate3d(0, 0, 180px)' }}
        />
        <div
          data-parallax
          data-depth="0.2"
          data-axis="x"
          data-rotate="4"
          data-float
          className="wire-orb left-[14%] bottom-[6%] h-64 w-64"
          style={{ transform: 'translate3d(0, 0, 90px)' }}
        />

        <div
          data-parallax
          data-depth="0.24"
          data-axis="y"
          data-rotate="-12"
          data-float
          className="mesh-panel left-[8%] top-[22%] h-56 w-56 rounded-[2rem]"
          style={{ transform: 'translate3d(0, 0, 140px) rotateX(62deg) rotateZ(-24deg)' }}
        />
        <div
          data-parallax
          data-depth="0.26"
          data-axis="x"
          data-rotate="10"
          data-float
          className="mesh-panel right-[12%] top-[12%] h-64 w-64 rounded-[2.5rem]"
          style={{ transform: 'translate3d(0, 0, 160px) rotateX(68deg) rotateZ(18deg)' }}
        />
        <div
          data-parallax
          data-depth="0.16"
          data-axis="y"
          data-rotate="7"
          data-float
          className="mesh-panel left-[28%] bottom-[2%] h-72 w-72 rounded-[2.5rem]"
          style={{ transform: 'translate3d(0, 0, 110px) rotateX(70deg) rotateZ(12deg)' }}
        />

        <div className="orbit-shell absolute inset-0">
          <div data-parallax data-depth="0.12" data-axis="y" className="orbit-ring h-[26rem] w-[26rem]" data-orbit-ring="one">
            <span className="star-node left-[8%] top-1/2 -translate-y-1/2" />
            <span className="star-node right-[8%] top-1/2 -translate-y-1/2" />
          </div>
          <div data-parallax data-depth="0.08" data-axis="x" className="orbit-ring h-[38rem] w-[38rem] opacity-60" data-orbit-ring="two">
            <span className="star-node left-1/2 top-[7%] -translate-x-1/2" />
            <span className="star-node left-1/2 bottom-[7%] -translate-x-1/2" />
          </div>
        </div>

        <div className="absolute left-[-8rem] top-[-5rem] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" style={{ animation: 'pulseGlow 6s ease-in-out infinite' }} />
        <div className="absolute right-[-6rem] top-[10rem] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" style={{ animation: 'pulseGlow 7s ease-in-out infinite' }} />
        <div className="absolute bottom-[-5rem] left-[30%] h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" style={{ animation: 'pulseGlow 8s ease-in-out infinite' }} />
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%),linear-gradient(to_bottom,rgba(10,10,10,0.25),rgba(10,10,10,0.82))]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/25 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="#inicio" className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
            FH / Portfolio
          </a>
          <div className="flex items-center gap-4">
            <nav className="hidden gap-6 text-sm text-white/75 md:flex">
              <a href={language === 'en' ? '#about-me' : '#sobre-mi'} className="transition hover:text-cyan-300">{t.nav.about}</a>
              <a href="#skills" className="transition hover:text-cyan-300">{t.nav.skills}</a>
              <a href={language === 'en' ? '#projects' : '#proyectos'} className="transition hover:text-cyan-300">{t.nav.projects}</a>
              <a href={language === 'en' ? '#journey' : '#trayectoria'} className="transition hover:text-cyan-300">{t.nav.timeline}</a>
              <a href={language === 'en' ? '#contact' : '#contacto'} className="transition hover:text-cyan-300">{t.nav.contact}</a>
            </nav>
            <button
              onClick={() => setLanguage((prev) => (prev === 'es' ? 'en' : 'es'))}
              className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-300/20"
            >
              {t.langLabel}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section data-section id="inicio" className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
              {t.badge}
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              {t.heroTitlePrefix} <span className="shine-text">Francisco</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{t.heroText}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={language === 'en' ? '#projects' : '#proyectos'}
                className="rounded-2xl border border-cyan-300/30 bg-cyan-300/15 px-6 py-3 text-sm font-semibold text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.15)] transition duration-300 hover:-translate-y-1 hover:bg-cyan-300/20"
              >
                {t.heroButtons.projects}
              </a>
              <a
                href={language === 'en' ? '#contact' : '#contacto'}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                {t.heroButtons.contact}
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {t.stats.map(([big, small]) => (
                <div key={big} data-card className="glass rounded-3xl p-5 shadow-2xl shadow-black/20">
                  <div className="text-2xl font-bold text-white">{big}</div>
                  <div className="mt-1 text-sm text-white/60">{small}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="glass relative w-full max-w-md rounded-[2rem] p-6 shadow-[0_25px_100px_rgba(0,0,0,0.45)]" style={{ animation: 'floatSlow 6s ease-in-out infinite' }}>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">{t.snapshotTitle}</p>
                  <h2 className="mt-2 text-2xl font-bold">{t.snapshotSubtitle}</h2>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-300/40 to-fuchsia-400/30 ring-1 ring-white/20" />
              </div>

              <div className="space-y-4">
                {t.snapshotItems.map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">{label}</p>
                    <p className="mt-2 text-sm leading-7 text-white/80">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section data-section id={language === 'en' ? 'about-me' : 'sobre-mi'} className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">{t.sections.aboutKicker}</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t.sections.aboutTitle}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {t.cards.map((card, index) => (
              <div key={card.title} data-card className="glass group rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/25 hover:bg-white/10">
                {/* ICONO DINÁMICO */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300/10 ring-1 ring-cyan-200/20 text-cyan-200 text-xl transition group-hover:scale-110">
                  {index === 0 && '🧠'}
                  {index === 1 && '💻'}
                  {index === 2 && '📈'}
                  {index === 3 && '🚀'}
                </div>

                {/* TITULO */}
                <h3 className="text-lg font-semibold">{card.title}</h3>

                {/* DESCRIPCIÓN */}
                <p className="mt-3 text-sm leading-7 text-white/70">{card.text}</p>

                {/* MINI EXTRA (para que no quede vacío) */}
                <div className="mt-4 text-xs text-cyan-300/70">
                  {language === 'en' ? 'Key strength' : 'Fortaleza clave'}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section data-section id="skills" className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">{t.sections.skillsKicker}</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t.sections.skillsTitle}</h2>
              <p className="mt-4 max-w-xl leading-8 text-white/70">{t.sections.skillsText}</p>
            </div>

            <div className="glass rounded-[2rem] p-6 sm:p-8">
              <div className="space-y-5">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-white/85">{skill.name}</span>
                      <span className="text-white/45">{skill.level}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                      <div
                        data-skill-fill
                        data-width={`${skill.level}%`}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400"
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section data-section id={language === 'en' ? 'projects' : 'proyectos'} className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-16">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">{t.sections.projectsKicker}</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t.sections.projectsTitle}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/65">{t.sections.projectsText}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {t.projects.map((project) => (
              <div key={project.title} data-card className="glass group rounded-[2rem] p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/25 hover:shadow-[0_20px_70px_rgba(8,145,178,0.15)]">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/75">{project.tag}</p>
                    <h3 className="mt-2 text-2xl font-semibold leading-tight">{project.title}</h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">{t.featured}</div>
                </div>
                <p className="mt-4 text-sm leading-8 text-white/70">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.highlights.map((item) => (
                    <span key={item} className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100/90">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section data-section id={language === 'en' ? 'journey' : 'trayectoria'} className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-16">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">{t.sections.timelineKicker}</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t.sections.timelineTitle}</h2>
          </div>

          <div className="relative ml-3 border-l border-white/10 pl-8">
            {timelineData.map((item, index) => (
              <div data-timeline-item key={`${item.year}-${item.title}`} className={`relative pb-10 ${index === timelineData.length - 1 ? 'pb-0' : ''}`}>
                <div className="absolute -left-[2.15rem] top-1 h-5 w-5 rounded-full border border-cyan-200/30 bg-cyan-300/20 shadow-[0_0_20px_rgba(34,211,238,0.35)]" />
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/70">{item.year}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-8 text-white/70">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section data-section id={language === 'en' ? 'contact' : 'contacto'} className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
          <div className="glass rounded-[2rem] p-8 sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">{t.sections.contactKicker}</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t.sections.contactTitle}</h2>
                <p className="mt-5 max-w-2xl leading-8 text-white/70">{t.sections.contactText}</p>
              </div>

              <div className="grid gap-4">
                {t.contactItems.map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/45">{label}</p>
                    <p className="mt-2 text-sm font-medium text-white/85">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/45 lg:px-10">
        {t.footer}
      </footer>
    </div>
  );
}
