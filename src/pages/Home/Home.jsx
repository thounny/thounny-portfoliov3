/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, useRef } from "react";
import "./Home.css";
import { Link } from "react-router";

import HeroGradient from "../../components/HeroGradient/HeroGradient";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import NavBar from "../../components/NavBar/NavBar";
import Cursor from "../../components/Cursor/Cursor";
import Transition from "../../components/Transition/Transition";

import { projects } from "./projects";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ReactLenis from "@studio-freight/react-lenis";

import { HiArrowRight } from "react-icons/hi";
import { RiArrowRightDownLine } from "react-icons/ri";

const Home = () => {
  const manifestoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, 0);

    return () => clearTimeout(scrollTimeout);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: ".footer",
      start: "top 80%",
      onEnter: () => {
        document.querySelector(".team").classList.add("light");
        document.querySelector(".footer").classList.add("light");
      },
      onLeaveBack: () => {
        document.querySelector(".team").classList.remove("light");
        document.querySelector(".footer").classList.remove("light");
      },
    });

    if (!isMobile) {
      gsap.set(".project", { opacity: 0.35 });
    }

    if (!isMobile) {
      const projects = document.querySelectorAll(".project");

      projects.forEach((project) => {
        const projectImg = project.querySelector(".project-img img");

        project.addEventListener("mouseenter", () => {
          gsap.to(project, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(projectImg, {
            scale: 1.2,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        project.addEventListener("mouseleave", () => {
          gsap.to(project, {
            opacity: 0.35,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(projectImg, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });
    }

    const manifestoText = new SplitType(".manifesto-title h1", {
      types: ["words", "chars"],
      tagName: "span",
      wordClass: "word",
      charClass: "char",
    });

    const style = document.createElement("style");
    style.textContent = `
       .word {
         display: inline-block;
         margin-right: 0em;
       }
       .char {
         display: inline-block;
       }
     `;
    document.head.appendChild(style);

    gsap.set(manifestoText.chars, {
      opacity: 0.25,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".manifesto",
        start: "top 35%",
        end: "bottom 75%",
        scrub: true,
        markers: false,
      },
    });

    manifestoText.chars.forEach((char, index) => {
      tl.to(
        char,
        {
          opacity: 1,
          duration: 0.1,
          ease: "none",
        },
        index * 0.1
      );
    });

    gsap.to(".marquee-text", {
      scrollTrigger: {
        trigger: ".marquee",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        markers: false,
        onUpdate: (self) => {
          const moveAmount = self.progress * -1000;
          gsap.set(".marquee-text", {
            x: moveAmount,
          });
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      manifestoText.revert();
      style.remove();
    };
  }, [isMobile]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rows = document.querySelectorAll(".row");
    const isMobileView = window.innerWidth <= 900;

    const getStartX = (index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      return direction * (isMobileView ? 150 : 300);
    };

    if (rows.length > 0) {
      rows.forEach((row, index) => {
        const existingTrigger = ScrollTrigger.getAll().find(
          (st) => st.trigger === ".gallery" && st.vars?.targets === row
        );
        if (existingTrigger) {
          existingTrigger.kill();
        }

        const startX = getStartX(index);

        gsap.set(row, { x: startX });

        gsap.to(row, {
          scrollTrigger: {
            trigger: ".gallery",
            start: "top bottom",
            end: "bottom top",
            scrub: isMobileView ? 0.5 : 1,
            onUpdate: (self) => {
              const moveAmount = startX * (1 - self.progress);
              gsap.set(row, {
                x: moveAmount,
              });
            },
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  return (
    <ReactLenis root>
      <div className="home">
        <Cursor />
        <NavBar />
        <section className="hero" id="hero">
          <HeroGradient />
          <div className="header-container">
            <div className="header h-1">
              <h1>[Main Heading 1]</h1>
              <h1>[Subheading 1]</h1>
            </div>
            <div className="header h-2">
              <h1>[Main Heading 2]</h1>
              <h1>[Subheading 2]</h1>
            </div>
            <div className="header h-3">
              <h1>[Localized Heading 1]</h1>
              <h1>[Localized Subheading 1]</h1>
            </div>
            <div className="header h-4">
              <h1>[Main Heading 3]</h1>
              <h1>[Subheading 3]</h1>
            </div>
          </div>
        </section>


        <section className="work" id="work">
          <div className="container">
            <div className="work-header">
              <HiArrowRight size={13} />
              <p>Selected projects</p>
            </div>

            <div className="projects">
              <div className="project-col">
                {projects
                  .filter((project) => project.column === 1)
                  .map((project) => (
                    <Link to="/work" key={project.id}>
                      <div className="project">
                        <div className="project-img">
                          <img src={project.image} alt="Project Thumbnail" />
                        </div>
                        <div className="project-name">
                          <h2>{project.title}</h2>
                        </div>
                        <div className="project-description">
                          <p>{project.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              <div className="project-col">
                {projects
                  .filter((project) => project.column === 2)
                  .map((project) => (
                    <Link to="/work" key={project.id}>
                      <div className="project">
                        <div className="project-img">
                          <img src={project.image} alt="Project Thumbnail" />
                        </div>
                        <div className="project-name">
                          <h2>{project.title}</h2>
                        </div>
                        <div className="project-description">
                          <p>{project.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="cta-bg-img">
            <img src="/cta/cta-bg.png" alt="" />
          </div>
          <div className="cta-title">
            <p>Trusted by visionaries</p>
          </div>
          <div className="cta-header">
            <h2>
              Apple, Netflix, Gucci, Tesla, Uniqlo, Sephora, Google, Moët &
              Chandon, Spotify, BMW, Montblanc, Panasonic, Nespresso, L’Oréal,
              Samsung
            </h2>
          </div>
          <div className="cta-btn">
            <button>Discover more at origin.co</button>
          </div>
        </section>

        <section className="manifesto" id="manifesto" ref={manifestoRef}>
          <div className="container">
            <div className="manifesto-header">
              <HiArrowRight size={13} />
              <p>Manifesto</p>
            </div>
            <div className="manifesto-title">
              <h1>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </h1>
            </div>
          </div>
        </section>

        <section className="processes">
          <div className="container">
            <div className="process">
              <div className="process-title">
                <RiArrowRightDownLine />
                <p>Integrate</p>
              </div>
              <div className="process-info">
                <div className="process-icon">
                  <div className="process-icon-wrapper">
                    <img src="/processes/icon-1.png" alt="" />
                  </div>
                </div>
                <div className="process-description">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>

            <div className="process">
              <div className="process-title">
                <RiArrowRightDownLine />
                <p>Collaborate</p>
              </div>
              <div className="process-info">
                <div className="process-icon">
                  <div className="process-icon-wrapper">
                    <img src="/processes/icon-2.png" alt="" />
                  </div>
                </div>
                <div className="process-description">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>

            <div className="process">
              <div className="process-title">
                <RiArrowRightDownLine />
                <p>Challenge</p>
              </div>
              <div className="process-info">
                <div className="process-icon">
                  <div className="process-icon-wrapper">
                    <img src="/processes/icon-3.png" alt="" />
                  </div>
                </div>
                <div className="process-description">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee">
          <div className="marquee-text">
            <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          </div>
        </div>

        <section className="showreel">
          <VideoPlayer />
        </section>

        <section className="about" id="about">
          <div className="container">
            <div className="about-col">
              <div className="about-header">
                <HiArrowRight size={13} />
                <p>[Section Title, e.g., About Us]</p>
              </div>
              <div className="about-copy">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur.
                </p>
              </div>
            </div>
            <div className="about-col">
              <div className="cta-btn">
                <button>Lorem ipsum at lorem.co</button>
              </div>
            </div>
          </div>
        </section>


        <section className="gallery">
          <div className="gallery-wrapper">
            <div className="row">
              <div className="img">
                <img src="/marquee/img1.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img2.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img3.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img4.jpeg" alt="" />
              </div>
            </div>
            <div className="row">
              <div className="img">
                <img src="/marquee/img5.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img6.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img7.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img8.jpeg" alt="" />
              </div>
            </div>
            <div className="row">
              <div className="img">
                <img src="/marquee/img9.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img10.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img11.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img12.jpeg" alt="" />
              </div>
            </div>
            <div className="row">
              <div className="img">
                <img src="/marquee/img13.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img14.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img15.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img16.jpeg" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="about-me" id="about-me">
          <div className="container">
            <div className="about-me-header">
              <HiArrowRight />
              <p>About Me</p>
            </div>

            <div className="about-me-intro">
              <h1>
                Bridging creativity & technology, <br />
                crafting experiences that inspire.
              </h1>
            </div>

            <div className="profile">
              <div className="profile-img">
                <img src="/profile/profile.jpg" alt="Your Name" />
              </div>
              <div className="profile-info">
                <h2>Your Name</h2>
                <p>
                  I’m a creative developer and designer passionate about blending art
                  and technology to create immersive digital experiences. With a
                  foundation in modern web technologies and a knack for problem-solving,
                  I aim to turn bold ideas into reality.
                </p>
                <p>
                  Whether designing pixel-perfect interfaces or developing
                  high-performance web applications, I focus on crafting solutions that
                  are both functional and visually striking.
                </p>
              </div>
            </div>

            <div className="skills">
              <h3>Skills & Expertise</h3>
              <div className="skills-list">
                <p>Web Development</p>
                <p>Creative Coding</p>
                <p>UI/UX Design</p>
                <p>Animation & Motion Design</p>
                <p>Interactive Experiences</p>
              </div>
            </div>
          </div>
        </section>

        <section className="footer" id="contact">
          <div className="container">
            <div className="footer-header">
              <HiArrowRight />
              <p>Contact</p>
            </div>

            <div className="footer-title">
              <h1>[Your Heading Here]</h1>
            </div>

            <div className="footer-email">
              <p>[Your Subheading or Message Here]</p>
              <h2>[Your Email Here]</h2>
            </div>

            <div className="footer-content">
              <div className="footer-col">
                <div className="footer-col-header">
                  <p>[Your Section Title Here]</p>
                </div>

                <div className="footer-col-content">
                  <div className="footer-sub-col">
                    <div className="location">
                      <h3>[Location Title 1]</h3>
                      <p>[Line 1 of Address]</p>
                      <p>[Line 2 of Address]</p>
                      <p>[City, State, ZIP]</p>
                      <p>[Country]</p>

                      <p>
                        <HiArrowRight /> [Action Text, e.g., &quot;View on map&quot;]
                      </p>
                    </div>

                    <div className="location">
                      <h3>[Location Title 2]</h3>
                      <p>[Line 1 of Address]</p>
                      <p>[Line 2 of Address]</p>
                      <p>[City, State, ZIP]</p>
                      <p>[Country]</p>

                      <p>
                        <HiArrowRight /> [Action Text, e.g., &quot;View on map&quot;]
                      </p>
                    </div>
                  </div>
                  <div className="footer-sub-col">
                    <div className="location">
                      <h3>[Location Title 3]</h3>
                      <p>[Line 1 of Address]</p>
                      <p>[Line 2 of Address]</p>
                      <p>[City, State, ZIP]</p>
                      <p>[Country]</p>

                      <p>
                        <HiArrowRight /> [Action Text, e.g., &quot;View on map&quot;]
                      </p>
                    </div>

                    <div className="location">
                      <h3>[Location Title 4]</h3>
                      <p>[Line 1 of Address]</p>
                      <p>[Line 2 of Address]</p>
                      <p>[City, State, ZIP]</p>
                      <p>[Country]</p>

                      <p>
                        <HiArrowRight /> [Action Text, e.g., &quot;View on map&quot;]
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-col">
                <div className="footer-col-header">
                  <p>[Social Links Title]</p>
                </div>
                <div className="footer-sub-col">
                  <p>[Social Platform 1]</p>
                  <p>[Social Platform 2]</p>
                  <p>[Social Platform 3]</p>
                  <p>[Social Platform 4]</p>
                  <p>[Social Platform 5]</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </ReactLenis>
  );
};

export default Transition(Home);
