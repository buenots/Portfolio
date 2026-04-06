import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { C } from "./constants";
import { GlobalCursor } from "./components/GlobalCursor";
import { FluidBlob } from "./components/FluidBlob";
import { BackgroundScene } from "./components/BackgroundScene";
import { SkillParticles } from "./components/SkillParticles";
import { NeonBtn } from "./components/NeonBtn";
import { Section } from "./components/Section";
import { ProjectCard } from "./components/ProjectCard";
import { SkillBadge } from "./components/SkillBadge";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════ */
export default function BrunoDevPortfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  const heroWrapperRef = useRef();
  const heroTitleRef = useRef();
  const heroSubRef = useRef();
  const heroCTARef = useRef();
  const navRef = useRef();
  
  /* ─── Lenis Smooth Scroll ─── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
    });

    lenis.on('scroll', (e) => {
      setScrollY(window.scrollY);
      ScrollTrigger.update();
    });

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  /* ─── Parallax & GSAP Animations ─── */
  useEffect(() => {
    // 1. Initial Hero Entrance (No scrub)
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(heroTitleRef.current, { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: "power4.out" })
      .fromTo(heroSubRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, "-=1")
      .fromTo(heroCTARef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, "-=0.8");

    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: "power4.out" });

    // 2. Hero Scrub Parallax (Lando-style fade and shrink on scroll)
    gsap.to(heroWrapperRef.current, {
      y: 200,
      scale: 0.9,
      opacity: 0,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // 3. About Section Scrubbing
    gsap.fromTo(".about-word", 
      { y: 40, opacity: 0 }, 
      {
        y: 0, opacity: 1, stagger: 0.02,
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          end: "top 40%",
          scrub: 1, // Smooth catch-up
        }
      }
    );
    
    gsap.fromTo(".about-stat", 
      { y: 80, opacity: 0 }, 
      {
        y: 0, opacity: 1, stagger: 0.1,
        scrollTrigger: {
          trigger: "#about",
          start: "top 60%",
          end: "center center",
          scrub: 1,
        }
      }
    );

    // 4. Projects Parallax (Cards come in dynamically mapped to scroll)
    const cards = gsap.utils.toArray(".project-card-container");
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 150, opacity: 0.2 },
        { 
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            end: "top 60%",
            scrub: true,
          }
        }
      );
    });

    // 5. Skills Reveal
    gsap.fromTo(".skill-badge-item", 
      { x: -50, opacity: 0 }, 
      {
        x: 0, opacity: 1, stagger: 0.1,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 70%",
          end: "center center",
          scrub: 1,
        }
      }
    );

    // 6. Section Trackers
    const sections = ["hero", "about", "projects", "skills", "contact"];
    sections.forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const projects = [
    { title: "NEON_ARENA", tags: ["Unity", "C#", "GLSL"], desc: "Battle royale tático com shaders procedurais e sistema de física customizado." },
    { title: "CYBER_DASH", tags: ["Godot", "GDScript", "WebGL"], desc: "Runner infinito exportado para web com WebAssembly, alta performance." },
    { title: "STELLAR_UI", tags: ["React", "Three.js", "GSAP"], desc: "Design system com componentes 3D interativos para dashboards focados." },
    { title: "VOID_NET", tags: ["Node.js", "WebSocket", "Canvas"], desc: "Plataforma multiplayer real-time com engine de colisão extrema." },
  ];

  const skills = [
    { name: "Three.js / WebGL", level: 90 },
    { name: "React / Next.js", level: 88 },
    { name: "Unity / C#", level: 85 },
    { name: "GSAP / Animação", level: 82 },
    { name: "Node.js / APIs", level: 80 },
    { name: "GLSL / Shaders", level: 75 },
    { name: "Godot / GDScript", level: 72 },
    { name: "TypeScript", level: 78 },
  ];

  const navLinks = ["about", "projects", "skills", "contact"];

  const aboutWords = "Construo experiências digitais que vivem na interseção entre arte e velocidade. O código corre pelas veias, arquitetado pixel a pixel para transbordar impacto, fluidez e alta performance.".split(" ");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@400;500;700;900&family=Bebas+Neue&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html.lenis {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }
        body { background: ${C.bg}; color: ${C.text}; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.neon}; border-radius: 4px; }
        ::selection { background: ${C.neon}; color: ${C.bg}; }
        * { cursor: none !important; }
        @media (max-width: 768px) { * { cursor: auto !important; } }
      `}</style>

      <GlobalCursor />

      <nav ref={navRef} style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: "24px clamp(24px, 6vw, 80px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 50 ? `${C.bg}e0` : "transparent",
        backdropFilter: scrollY > 50 ? "blur(32px)" : "none",
        borderBottom: scrollY > 50 ? `1px solid #ffffff05` : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "14px", fontWeight: "bold",
          color: C.text, letterSpacing: "0.15em",
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          <span style={{ color: C.neon }}>//</span> BRUNO.DEV
        </div>

        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          {navLinks.map((link) => (
            <a key={link} href={`#${link}`} style={{
              fontFamily: "'Space Mono', monospace", fontSize: "11px", fontWeight: "bold",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: activeSection === link ? C.text : C.muted,
              textDecoration: "none",
              transition: "color 0.3s ease",
              position: "relative",
            }}
              onMouseEnter={(e) => e.target.style.color = C.neon}
              onMouseLeave={(e) => e.target.style.color = activeSection === link ? C.text : C.muted}
            >
              {link}
            </a>
          ))}
        </div>
      </nav>

      <Section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", padding: 0 }}>
        {/* NEW REACTIVE 3D FLUID BLOB AS BACKGROUND */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
            <FluidBlob />
          </Canvas>
        </div>

        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, ${C.bg} 90%)`,
        }} />

        {/* This wrapper is animated dynamically with scrubbing */}
        <div ref={heroWrapperRef} style={{
          position: "relative", zIndex: 2,
          padding: "0 clamp(24px, 8vw, 120px)",
          maxWidth: "1100px",
          width: "100%",
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: "12px", fontWeight: "bold",
            color: C.neon, letterSpacing: "0.4em", textTransform: "uppercase",
            marginBottom: "32px", display: "flex", alignItems: "center", gap: "16px",
          }}>
            <span style={{ width: "60px", height: "2px", background: C.neon }} />
            GAMER • PROGRAMADOR • VELOCIDADE
          </div>

          <h1 ref={heroTitleRef} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(90px, 18vw, 240px)",
            lineHeight: "0.80",
            letterSpacing: "0.01em",
            color: C.text,
            marginBottom: "16px",
            opacity: 0, // setup for fromTo
          }}>
            BRUNO<br />
            <span style={{
              color: C.neon,
            }}>DEV</span>
          </h1>

          <p ref={heroSubRef} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(16px, 2vw, 20px)",
            color: C.muted, lineHeight: "1.6",
            maxWidth: "540px", marginTop: "40px", marginBottom: "56px",
            opacity: 0,
            fontWeight: "400",
          }}>
            Desenvolvedor focado em performance extrema para <span style={{ color: C.text, fontWeight: "bold" }}>jogos e plataforma web</span>. Arquitetura fluida e limpa construída para vencer as barreiras do browser.
          </p>

          <div ref={heroCTARef} style={{ display: "flex", gap: "24px", flexWrap: "wrap", opacity: 0 }}>
            <NeonBtn href="#projects">INICIAR CORRIDA</NeonBtn>
          </div>
        </div>
      </Section>

      <Section id="about">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "80px", alignItems: "center" }}>
            <div>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: "11px", fontWeight: "bold",
                color: C.neon, letterSpacing: "0.3em", textTransform: "uppercase",
                marginBottom: "24px",
              }}>01 / SOBRE</div>

              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(56px, 8vw, 110px)",
                lineHeight: "0.9", color: C.text,
                marginBottom: "64px", letterSpacing: "0.02em",
              }}>QUEM<br /><span style={{ color: C.muted }}>SOU EU</span></h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                {[
                  { n: "5+", l: "Anos de XP" },
                  { n: "20+", l: "Projetos" },
                  { n: "8", l: "Jogos Lançados" },
                  { n: "100%", l: "Performance" },
                ].map((s) => (
                  <div key={s.l} className="about-stat" style={{
                    borderTop: `2px solid #ffffff10`,
                    paddingTop: "24px",
                  }}>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "56px", color: C.text, lineHeight: 1,
                    }}>{s.n}</div>
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px", fontWeight: "bold", color: C.neon, letterSpacing: "0.15em",
                      textTransform: "uppercase", marginTop: "12px",
                    }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(20px, 3vw, 32px)",
                fontWeight: "500",
                lineHeight: "1.5", color: C.text,
                letterSpacing: "-0.01em"
              }}>
                {aboutWords.map((w, i) => (
                  <span key={i} className="about-word" style={{ display: "inline-block", marginRight: "8px", opacity: 0 }}>
                    {w}
                  </span>
                ))}
              </p>

              <div style={{ marginTop: "56px", padding: "32px", border: `1px solid #ffffff10`, background: C.surface, borderRadius: "16px" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: C.neon, marginBottom: "16px", fontWeight: "bold" }}>
                  <span style={{ color: C.muted }}>const</span> MINDSET = [
                </div>
                {["'Game Development'", "'Web 3D Experiences'", "'Real-time Engineering'", "'Creative Architecture'"].map((f, i) => (
                  <div key={i} style={{
                    fontFamily: "'Space Mono', monospace", fontSize: "12px",
                    color: C.text, paddingLeft: "24px", marginBottom: "8px"
                  }}>{f},</div>
                ))}
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: C.neon, marginTop: "8px", fontWeight: "bold" }}>];</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="projects" style={{ background: C.surface }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)" }}>
          <div style={{ marginBottom: "88px" }}>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: "11px", fontWeight: "bold",
              color: C.neon, letterSpacing: "0.3em", textTransform: "uppercase",
              marginBottom: "24px",
            }}>02 / PROJETOS</div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(56px, 8vw, 110px)",
              lineHeight: "0.9", color: C.text, letterSpacing: "0.02em",
            }}>TRABALHOS<br /><span style={{ color: C.muted }}>SELECIONADOS</span></h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "32px",
          }}>
            {projects.map((p, i) => (
               <div key={p.title} className="project-card-container">
                 <ProjectCard {...p} index={i} />
               </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="skills">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            <div style={{ position: "sticky", top: "150px" }}>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: "11px", fontWeight: "bold",
                color: C.neon, letterSpacing: "0.3em", textTransform: "uppercase",
                marginBottom: "24px",
              }}>03 / SKILLS</div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(56px, 8vw, 110px)",
                lineHeight: "0.9", color: C.text, letterSpacing: "0.02em",
                marginBottom: "48px",
              }}>STACK<br /><span style={{ color: C.muted }}>TÉCNICA</span></h2>

              <div style={{ height: "360px", borderRadius: "16px", overflow: "hidden", background: C.surface, border: `1px solid #ffffff05` }}>
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                  <ambientLight intensity={0.1} />
                  <pointLight color={C.neon} intensity={4} position={[3, 3, 3]} />
                  <pointLight color="#ffffff" intensity={1} position={[-3, -3, 2]} />
                  <SkillParticles />
                </Canvas>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingTop: "0px" }}>
              {skills.map((s, i) => (
                <div key={s.name} className="skill-badge-item">
                  <SkillBadge {...s} delay={0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact" style={{ background: C.surface }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)", textAlign: "center" }} className="contact-inner">
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: "11px", fontWeight: "bold",
            color: C.neon, letterSpacing: "0.3em", textTransform: "uppercase",
            marginBottom: "24px",
          }}>04 / CONTATO</div>

          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(64px, 10vw, 140px)",
            lineHeight: "0.85", color: C.text, letterSpacing: "0.02em",
            marginBottom: "32px",
          }}>
            VAMOS<br />
            <span style={{ color: C.neon }}>CRIAR</span><br />
            JUNTOS
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "18px",
            color: C.muted, marginBottom: "64px", maxWidth: "480px", margin: "0 auto 64px",
            lineHeight: "1.6"
          }}>
            Pronto para novos desafios técnicos. Aberto para projetos freelance, colaborações exclusivas e posições desafiadoras.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "48px" }}>
            {["Seu nome", "seu@email.com"].map((ph) => (
              <input key={ph} type={ph === "seu@email.com" ? "email" : "text"} placeholder={ph} style={{
                background: C.bg,
                border: `1px solid #ffffff10`,
                borderRadius: "12px",
                padding: "20px 24px",
                color: C.text,
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                outline: "none",
                transition: "all 0.3s ease",
              }}
                onFocus={(e) => {
                  e.target.style.borderColor = C.neon;
                  e.target.style.boxShadow = `0 4px 20px ${C.neon}15`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#ffffff10";
                  e.target.style.boxShadow = "none";
                }}
              />
            ))}
            <textarea placeholder="Sua mensagem..." rows={5} style={{
              background: C.bg,
              border: `1px solid #ffffff10`,
              borderRadius: "12px",
              padding: "20px 24px",
              color: C.text,
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              outline: "none",
              resize: "none",
              transition: "all 0.3s ease",
            }}
              onFocus={(e) => {
                e.target.style.borderColor = C.neon;
                e.target.style.boxShadow = `0 4px 20px ${C.neon}15`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ffffff10";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <NeonBtn>ENVIAR MENSAGEM</NeonBtn>
          </div>

          <div style={{
            marginTop: "80px", paddingTop: "48px",
            borderTop: `1px solid #ffffff10`,
            display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap",
          }}>
            {["GitHub", "LinkedIn", "Twitter", "Itch.io"].map((s) => (
              <a key={s} href="#" style={{
                fontFamily: "'Space Mono', monospace", fontSize: "12px", fontWeight: "bold",
                color: C.muted, textDecoration: "none",
                letterSpacing: "0.15em", textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
                onMouseEnter={(e) => e.target.style.color = C.neon}
                onMouseLeave={(e) => e.target.style.color = C.muted}
              >{s}</a>
            ))}
          </div>
        </div>
      </Section>

      <footer style={{
        padding: "32px clamp(24px, 6vw, 80px)",
        borderTop: `1px solid #ffffff05`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "16px",
      }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", fontWeight: "bold", color: C.muted }}>
          © 2026 BRUNO.DEV
        </span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", fontWeight: "bold", color: C.muted }}>
          BUILT FOR <span style={{ color: C.text }}>SPEED</span> + <span style={{ color: C.neon }}>PERFORMANCE</span>
        </span>
      </footer>
    </>
  );
}