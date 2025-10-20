import { servicesData } from "@/data/services-data";
import { FlipCard } from "./flip-card";

export const ServicesSection = () => {
  return (
    <div id="services" className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-foreground">
            What we <span className="text-primary">Offer</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions to transform your business
          </p>
        </div>

        {/* Grid with exactly 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesData.map((card, idx) => (
            <FlipCard key={idx} front={card.front} back={card.back} />
          ))}
        </div>
      </div>
    </div>
  );
};
