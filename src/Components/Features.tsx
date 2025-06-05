import { features } from "../constants";

const Features = () => {
  return (
    <section className="flex w-full justify-between items-center section-padding gap-4 max-sm:flex-col">
      {features.map((feature, index) => (
        <div key={index} className={`card`}>
          <feature.icon
            className={`text-4xl p-2 rounded-lg ${feature.backgroundColor} icon`}
            size={45}
          />
          <h3 className="text-xl font-bold">{feature.title}</h3>
          <p className="max-w-sm text-md text-gray-300 ">{feature.details}</p>
        </div>
      ))}
    </section>
  );
};

export default Features;
