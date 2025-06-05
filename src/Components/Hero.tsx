import gsap from "gsap";
import { FaRobot } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
const Hero = () => {
  useGSAP(() => {
    gsap.to("#arrow", {
      y: -5,
      repeat: -1,
      yoyo: true,
      ease: "power2.out",
    });

    gsap.fromTo(
      "#hero",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.4,
      }
    );
  }, []);

  return (
    <section className="section-padding flex justify-center items-center flex-col gap-10 ">
      <FaRobot
        className="text-white transform -rotate-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-4  opacity-0"
        size={80}
        id="hero"
      />
      <div className="text-center space-y-4 flex flex-col items-center">
        <h1
          className="text-6xl font-bold bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 text-transparent opacity-0"
          id="hero"
        >
          AI-Powered Developer Assistant
        </h1>
        <p
          className="max-w-2xl text-xl text-gray-300 leading-relaxed"
          id="hero"
        >
          Your intelligent programming companion that understands your code,
          solves problems, and helps you build better software.
        </p>
      </div>
      <div className="flex space-x-5">
        <Link
          to="/chat"
          className="button-link flex gap-3 items-center bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:-translate-y-3  "
        >
          <FaRobot size={20} />
          Start Coding Now
          <IoIosArrowRoundForward size={25} id="arrow" />
        </Link>
        <button className="button-link flex gap-4 items-center bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-3 border border-gray-700 hover:border-transparent ">
          <FaGithub size={20} />
          View on GitHub
        </button>
      </div>
    </section>
  );
};

export default Hero;
