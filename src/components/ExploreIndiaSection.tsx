import exploreBanner from "@/assets/exp1.png";
import destination1 from "@/assets/exp2.png";
import destination2 from "@/assets/exp3.png";
import destination3 from "@/assets/exp4.png";
import destination4 from "@/assets/exp5.png";
import destination5 from "@/assets/exp6.png";

interface Destination {
  image: string;
  title: string;
  octoberTitle: string;
  octoberPoints: string[];
}

const destinations: Destination[] = [
  {
    image: destination1,
    title: "Goa (Relaxed + Fun)",
    octoberTitle: "Why it's great in October:",
    octoberPoints: [
      "Monsoon ends — greenery + fewer crowds",
      "Beach clubs reopen, weather is pleasant (not crazy hot)",
    ],
  },
  {
    image: destination2,
    title: "Pondicherry (Puducherry) - French + Calm",
    octoberTitle: "Why October works:",
    octoberPoints: ["Coastal breeze, peaceful vibe", "Less touristy than Goa"],
  },
  {
    image: destination3,
    title: "Ranthambore National Park (Tiger Safari)",
    octoberTitle: "Why October is ideal:",
    octoberPoints: [
      "Park reopens in October after monsoon",
      "Lush green forest + good wildlife sightings",
    ],
  },
  {
    image: destination4,
    title: "Jawai Leopard Safari (Luxury + Unique)",
    octoberTitle: "Why it's special:",
    octoberPoints: [
      "Leopard in natural rocky landscape",
      "Super exclusive and peacefull",
      "Luxury tented camps"
    ],
  },
  {
    image: destination5,
    title: "Jaipur + Agra (Royal + Iconic India)",
    octoberTitle: "Why October works:",
    octoberPoints: [
      "Comfortable sightseeing weather",
      "Festive Season starting",
    ],
  },
];

const ExploreIndiaSection = () => {
  return (
    <section className="py-16 bg-transparent">
      {/* Hero Banner */}
      <div className="w-full mb-16">
        <img
          src={exploreBanner}
          alt="Explore India"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="section-container pt-0 md:flex md:flex-col md:items-center">
        {/* Intro */}
        <div className="text-center mb-16 md:mb-12 max-w-2xl mx-auto">
          <p className="font-serif text-lg text-muted-foreground leading-relaxed">
            For those wishing to explore more of India, here are a few travel ideas
            to enjoy before or after the wedding celebrations.
          </p>
          <p className="font-serif text-lg text-muted-foreground leading-relaxed">
            Late October offers beautiful weather and an ideal time to travel.
          </p>
        </div>

        {/* Destinations */}
        <div className="space-y-16 md:space-y-10 md:w-full md:max-w-3xl">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="md:grid md:grid-cols-2 md:gap-8 md:max-w-4xl md:mx-auto md:items-center">
                
                {/* MOBILE: Image + Title Row */}
                <div className="flex items-center gap-4 md:block">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-[150px] rounded-xl md:w-full md:max-w-2xl md:rounded-2xl"
                  />

                  <h3 className="font-display text-xl font-semibold text-primary md:hidden">
                    {destination.title}
                  </h3>
                </div>

                {/* Text */}
                <div className="mt-4 md:mt-0 flex flex-col space-y-2 md:space-y-3">
                  {/* DESKTOP Title */}
                  <h3 className="hidden md:block font-display text-2xl text-primary font-semibold">
                    {destination.title}
                  </h3>

                  {/* October Content */}
                  <div className="pt-1">
                    <p className="font-serif text-sm text-muted-foreground italic mb-1">
                      {destination.octoberTitle}
                    </p>
                    <ul className="list-disc list-inside font-serif text-sm text-muted-foreground space-y-1">
                      {destination.octoberPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreIndiaSection;
