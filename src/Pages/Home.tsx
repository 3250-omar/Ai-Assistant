import Features from "../Components/Features";
import Hero from "../Components/Hero";
import Statics from "../Components/Statics";

const Home = () => {

  return (
    <div className="home-padding w-full min-h-screen bg-gradient-to-br from-indigo-800 via-purple-900 to-pink-900 text-gray-200 ">
      <Hero />
      <Features />
      <Statics />
    </div>
  );
};

export default Home;
