import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const About = () => {
  return (
    <section id ="about" className="w-[90vw] min-h-[60vh] mx-auto flex flex-col items-center justify-center text-center p-[4vh] bg-white shadow-lg">
      <h2 className="text-3xl font-semibold mb-[2vh]">About Me</h2>
      <div className="w-[20vw] border-t-2 border-black mb-[2vh]"></div>
      <p className="text-[1.1vw] leading-[1.7] max-w-[70vw] mb-[4vh]">
        I'm a Computer Science student with a deep passion for Graphic Design, where digital design and web development are my playgrounds. While I'm currently diving deep into my studies, I fuel my creativity by pursuing design projects out of sheer love for the craft. Though I'm focused on mastering my skills, I'm always on the lookout for exciting projects that offer the right challenge and opportunity.
      </p>
      <div className="flex gap-[2vw] mt-[2vh] text-[2.5vw]">
        <a href="https://github.com/KarthikaSuresh03" target="_blank" rel="noopener noreferrer">
          <FaGithub className="hover:scale-110 transition-transform duration-200" />
        </a>
        <a href="https://in.linkedin.com/in/karthika-suresh-6b030329b?trk=public_profile_samename-profile&original_referer=https%3A%2F%2Fwww.google.com%2F" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="hover:scale-110 transition-transform duration-200" />
        </a>
        <a href="https://www.instagram.com/___.karthiii?igsh=bWk1ejB3eXQxejB3" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:scale-110 transition-transform duration-200" />
        </a>
        <a href="mailto:karthi03014@gmail.com">
          <HiOutlineMail className="hover:scale-110 transition-transform duration-200" />
        </a>
      </div>
    </section>
  );
};

export default About;
