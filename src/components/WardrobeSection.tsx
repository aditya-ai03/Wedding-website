import wardrobeHeader from "@/assets/1.png";
import dateOct26 from "@/assets/2.png";
import dateOct28 from "@/assets/9.png";
import dateOct27 from "@/assets/4.png";
import outfit1 from "@/assets/3.png";
import outfit2 from "@/assets/5.png";
import outfit3 from "@/assets/6.png";
import outfit4 from "@/assets/7.png";
import outfit5 from "@/assets/8.png";
import WeddingHeader from "./WeddingHeader";

interface WeddingEvent {
  date: string;
  dateImage?: string;
  title: string;
  subtitle?: string;
  description: string[];
  outfitImage: string;
  womenNote?: string;
  menNote?: string;
  note?: string;
}

const events: WeddingEvent[] = [
  {
    date: "OCTOBER 26, 2026",
    dateImage: dateOct26,
    title: "Rhythm & Riwaaz",
    subtitle: "Indian festive wear - wear any Indian outfit you like.",
    description: [],
    outfitImage: outfit1,
    womenNote: "Colourful, and celebratory!",
    
  },
  {
    date: "OCTOBER 27, 2026",
    dateImage: dateOct27,
    title: "Haldi Hues",
    subtitle: "Light Indian wear or indo-western",
    description: [],
    outfitImage: outfit2,
  },
  {
    date: "",
    title: "The Wedding",
    description: [
      "Women: Indian attire only (lehenga or sari preferred)",
      "Men: Sherwani, bandhgala, formal kurta on formal waistcoats"
    ],
    outfitImage: outfit3,
    note: "Please Do Not Wear white and red, as these colours are reserved for my wife.Even white shirts and trousers",
  },
  {
    date: "",
    dateImage: dateOct28,
    title: "Poolside Mela",
    subtitle: "Fun, comfortable outfits; you don't need getting wet or messy",
    description: [],
    outfitImage: outfit4,
  },
  {
    date: "",
    title: "The Grand Finale",
    description: [],
    outfitImage: outfit5,
    womenNote: "Dress to impress — just don't try to look better than my wife.",
    menNote: "Black tie / tuxedo",
    note: "Please don't be that guy who turns up in a grey suit",
  },
];

const WardrobeSection = () => {
  return (
    <section className="section-container">
      {/* Header */}
      <div className="text-center mb-16">
        <img 
          src={wardrobeHeader} 
          alt="Wardrobe Planner - Decode Your Dresscode" 
          className="mx-auto max-w-md w-full"
        />
      </div>
      

      {/* Events Timeline */}
      <div className="space-y-16">
        {events.map((event, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            {/* Date divider if exists */}
            {event.dateImage ? (
              <div className="mb-8">
                <img 
                  src={event.dateImage} 
                  alt={event.date} 
                  className="mx-auto w-full max-w-lg"
                />
              </div>
            ) : event.date ? (
              <div className="wine-divider mb-8">
                <span className="text-primary font-serif text-sm tracking-[0.3em] uppercase">
                  {event.date}
                </span>
              </div>
            ) : null}

            {/* Event content */}
            <div className="flex flex-row gap-4 items-start md:grid md:grid-cols-2 md:gap-8 md:items-center">
              {/* Text content */}
              <div className={`flex-1 min-w-0 space-y-4 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <h3 className="font-display text-3xl text-primary">{event.title}</h3>
                
                {event.subtitle && (
                  <p className="font-serif text-lg text-muted-foreground italic">
                    {event.subtitle}
                    <br />
                    {event.womenNote}
                  </p>
                )}

                {event.description.length > 0 && (
                  <ul className="space-y-2">
                    {event.description.map((item, i) => (
                      <li key={i} className="font-serif text-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {(event.womenNote || event.menNote) && (
                  <div className="space-y-2 pt-2">
                    {/* {event.womenNote && (
                      <p className="font-serif text-foreground">
                        <span className="font-serif text-lg text-muted-foreground italic"></span>
                      </p>
                    )} */}
                    {/* {event.menNote && (
                      <p className="font-serif text-foreground">
                        <span className="font-semibold text-primary">Men:</span> {event.menNote}
                      </p>
                    )} */}
                  </div>
                )}

                {event.note && (
                  <p className="font-serif text-sm text-muted-foreground italic pt-2 border-t border-border">
                    {event.note}
                  </p>
                )}
              </div>

              {/* Outfit image */}
              <div className={`flex justify-end md:justify-center flex-shrink-0 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <img 
                  src={event.outfitImage} 
                  alt={`Outfit for ${event.title}`}
                  className="w-28 sm:w-36 md:w-auto md:max-h-96 object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WardrobeSection;
