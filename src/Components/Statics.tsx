import { useGSAP } from "@gsap/react";
import { statics } from "../constants";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const Statics = () => {
  useGSAP(() => {
    gsap.to(".statics-card", {
      opacity: 1,
      stagger: 0.1,
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".statics-card",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);
  return (
    <section className="flex section-padding justify-between items-center max-sm:flex-col gap-4">
      {statics.map((item, index) => (
        <div className="statics-card" key={index}>
          <p className="text-3xl font-bold text-blue-300 flex items-center justify-center">
            {item.state}
            {item.icon && <item.icon className="inline-block ml-2" />}
          </p>
          <h4 className="text-sm text-gray-300">{item.title}</h4>
        </div>
      ))}
    </section>
  );
};

export default Statics;
