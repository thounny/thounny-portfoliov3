/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./Work.css";
import { Link } from "react-router";

import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import Cursor from "../../components/Cursor/Cursor";
import Transition from "../../components/Transition/Transition";
import BackButton from "../../components/BackButton/BackButton";

import { ReactLenis } from "@studio-freight/react-lenis";

import { IoMdArrowForward } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

const Work = () => {
  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, 0);

    return () => clearTimeout(scrollTimeout);
  }, []);

  return (
    <ReactLenis root>
      <Cursor />
      <div className="sample-project">
        <BackButton />

        <section className="sp-title">
          <div className="container">
            <h1>[Project Name] by [Client/Studio Name]</h1>
          </div>
        </section>

        <section className="sp-banner">
          <img src="/work/work1.jpg" alt="[Project Banner]" />
        </section>

        <section className="sp-details">
          <div className="container">
            <div className="sp-details-col">
              <p className="sp-details-name">[Project Name]</p>

              <div className="sp-tags">
                <p>[Tag 1]</p>
                <p>[Tag 2]</p>
                <p>[Tag 3]</p>
                <p>[Tag 4]</p>
              </div>

              <div className="sp-date">
                <p>[Month, Year]</p>
              </div>

              <div className="sp-link">
                {/* Link to GitHub repo or website */}
                <Link to="/">
                  <button>
                    <div className="icon">
                      <IoIosArrowRoundForward size={16} />
                    </div>
                    View Project
                  </button>
                </Link>
              </div>
            </div>
            <div className="sp-details-col">
              <p>Challenge</p>
              <p>
                [Brief description of the project&apos;s challenge or main goal. Describe the key problem you aimed to solve with the project.]
              </p>
            </div>
          </div>
        </section>

        <section className="showreel">
          <VideoPlayer />
        </section>

        <section className="sp-info">
          <div className="container">
            <div className="sp-info-title">
              <h3>Challenge</h3>
            </div>

            <div className="sp-info-desc">
              <p>
                [Detailed description of the challenge. Include insights into the design process, the story, or the concept behind the project.]
              </p>
            </div>
          </div>
        </section>

        <section className="sp-img">
          <div className="container">
            <img src="/work/work2.jpg" alt="[Placeholder Image 1]" />
          </div>
        </section>

        <section className="sp-info">
          <div className="container">
            <div className="sp-info-title">
              <h3>Creative Solution</h3>
            </div>

            <div className="sp-info-desc">
              <p>
                [Explain the creative solution implemented in the project. Share the methods, technologies, or design decisions that brought the vision to life.]
              </p>
            </div>
          </div>
        </section>

        <section className="sp-img">
          <div className="container">
            <img src="/work/work3.jpg" alt="[Placeholder Image 2]" />
          </div>
        </section>

        <section className="credits">
          <div className="container">
            <h2>Credits</h2>

            <div className="credits-row">
              <div className="credits-col">
                <div className="credits-header">
                  <p>Project</p>
                </div>
                <div className="credits-copy">
                  <p>[Project Name]</p>
                </div>
              </div>
              <div className="credits-col">
                <div className="credits-header">
                  <p>Our Role</p>
                </div>
                <div className="credits-copy">
                  <p>[Roles, e.g., Design, Development, Animation]</p>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="credits-row">
              <div className="credits-col">
                <div className="credits-header">
                  <p>Team</p>
                </div>
              </div>
              <div className="credits-col">
                <div className="credits-header">
                  <p>Directors</p>
                </div>
                <div className="credits-copy">
                  <p>[Director Names]</p>
                </div>
              </div>
            </div>

            <div className="credits-row">
              <div className="credits-col"></div>
              <div className="credits-col">
                <div className="credits-header">
                  <p>Creative Producer</p>
                </div>
                <div className="credits-copy">
                  <p>[Producer Name]</p>
                </div>
              </div>
            </div>

            {/* Repeat as necessary for additional credits */}
          </div>
        </section>

        <section className="next-project">
          <div className="next-project-img">
            <img src="/projects/project4.jpg" alt="[Next Project Placeholder]" />
          </div>

          <div className="container">
            <div className="next-project-header">
              <div className="next-project-icon">
                <h1>
                  <IoMdArrowForward />
                </h1>
              </div>
              <div className="next-project-title">
                {/* Make sure to link next project */}
                <h1>[Next Project Name by Studio]</h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ReactLenis>
  );
};

export default Transition(Work);
