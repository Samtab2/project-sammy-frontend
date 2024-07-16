import "./About.css";
import aboutImage from "../../assets/aboutPicture.png";
function About() {
  return (
    <section className="about">
      <img src={aboutImage} alt="aboutImage" className="about__image" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          Hello, I'm Sammy Tabally, I'm full stack engineer proficient in
          JavaScript, React, Express, Node, HTML, CSS. I had a warehouse job
          before I started studying in web development.
          <p className="about__pargraph">
          I started learning to code at TripleTen Bootcamp. There, I
          received thorough training and learned how to handle difficult
          programming tasks. I'm skilled in creating smooth user experiences
          with React and building large scalable backend systems with Node.js
          Whether you want to improve online presence or upgrade your tech
          setup, I can provide smart solutions and achive effective outcomes.
          Let's work together to turn your ideas into reality, step by step.
          </p>
        </p>
      </div>
    </section>
  );
}

export default About;
