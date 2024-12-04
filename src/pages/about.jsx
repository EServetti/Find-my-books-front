import "../styles/about.css";

function About() {
  return (
    <div className="main-about">
      <aside className="about-aside"></aside>
      <div className="main-about-contant">
        <h2>Find your books</h2>
        <div className="about-contact">
          <section className="about-section">
            <h3>About:</h3>
            <p>
            A project created by Emilio Servetti, using the knowledge I've gained from various courses. The tools used include:
            </p>
            <ul>
                <li>Node.js and Express to create the server.</li>
                <li>MongoDB to store all the information.</li>
                <li>React for the front-end development.</li>
                <li>OpenAI API to generate a list of books from a description.</li>
                <li>Google Books API to manage book information.</li>
            </ul>
          </section>
          <section className="contact-section">
            <h3>Contact</h3>

            <p>You can contact me through the following media:</p>
            <ul>
                <li><a href="https://emilio-servetti.vercel.app/">My portfolio</a></li>
                <li><a href="https://github.com/EServetti">Git Hub</a></li>
                <li><a href="https://www.linkedin.com/in/emilio-servetti-3981592ba/">My Linkedin</a></li>
                <li>Or email me at servettiemilio1@gmail.com</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
