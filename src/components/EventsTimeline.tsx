import React from 'react';
import blessings from '@/assets/icon3.png';
import icon1 from '@/assets/icon_1.png';
import sangeetIcon from '@/assets/icon2.png';
import haldiIcon from '@/assets/icon4.png';
import weddingIcon from '@/assets/icon5.png';
import poolpartyIcon from '@/assets/icon6.png';
import finaleIcon from '@/assets/icon7.png';
import background3 from '@/assets/background-3.jpeg';

interface EventItemProps {
  title: string;
  date: string;
  time: string;
  description: string | React.ReactNode;
  icon?: string;
  isLast?: boolean;
}

const EventItem = ({ title, date, time, description, icon, isLast = false }: EventItemProps) => {
  return (
    <div className={`py-8 ${!isLast ? 'border-b border-border' : ''}`}>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        
        {/* 1. Title Section: Full width on mobile, 1/4 width on desktop */}
        <div className="md:w-1/4 flex-shrink-0">
          <h3 className="event-title text-xl md:text-2xl font-bold">{title}</h3>
        </div>
        
        {/* 2. Content Wrapper: Always horizontal (flex-row) */}
        <div className="flex flex-row items-start gap-4 md:w-3/4">
          
          {/* Details Column */}
          <div className="flex-grow">
            <p className="font-lora text-[10px] md:text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              {date}
            </p>
            {time && (
              <p className="font-lora text-[10px] md:text-xs font-semibold text-primary mb-3">
                {time}
              </p>
            )}
            <div className="font-lora text-sm md:text-base text-foreground leading-relaxed">
              {description}
            </div>
          </div>

          {/* Icon Column: Fixed width so it doesn't shrink */}
          {icon && (
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-24 md:h-24">
                <img 
                  src={icon} 
                  alt={`${title} icon`} 
                  className="w-full h-full object-contain" 
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const EventsTimeline = () => {
  const events = [
    {
      title: "The Royal Arrival",
      date: "MONDAY, OCTOBER 26, 2026",
      time: "12 PM ONWARDS",
      description: (
        <>
          <p className="font-semibold mb-2">Arrivals & Check in</p>
          <p> Take your time, unpack, catch up with familiar faces, and ease into the days ahead.</p>
          <p className="mt-1">There might be a cold cocktail waiting for you,  who knows. </p>
        </>
      ),
      icon: icon1,
    },
    {
      title: "Rhythm & Riwaaz",
      date: "MONDAY, OCTOBER 26, 2026",
      time: "6 PM ONWARDS",
      description: (
        <>
          <p>Our Sangeet and mehndi will start in the early evening and flow late into the night with henna, music, dancing, and plenty of time together.</p>
          <p className="mt-2">This is where the celebrations truly begin.</p>
          <p className="italic mt-2 text-primary/80">We can't wait to dance with you!</p>
        </>
      ),
      icon: sangeetIcon,
    },
    {
      title: "Blessings & Prayers",
      date: "TUESDAY, OCTOBER 27, 2026",
      time: "8 AM",
      description: (
        <>
          <p>A Ganesh Pooja and blessing ceremony to begin the wedding day with intention, gratitude, and grace.</p>
          <p className="mt-2">Your prayers and good wishes mean the world to us.</p>
        </>
      ),
      icon: blessings,
    },
    {
      title: "Haldi Hues",
      date: "TUESDAY, OCTOBER 27, 2026",
      time: "11 AM ONWARDS",
      description: (
        <>
          <p>A joyful Haldi ceremony filled with colour, laughter, and tradition and very likely a bit of mess.

</p>
          <p className="italic mt-2 text-primary/80">Wear something you won't be too attached to.</p>
        </>
      ),
      icon: haldiIcon,
    },
    {
      title: "The Wedding",
      date: "TUESDAY, OCTOBER 27, 2026",
      time: "",
      description: (
        <>
          <div className="mb-4">
            <p className="font-semibold text-primary">Jaan Entrance | 4:00 PM</p>
            <p> The groom’s arrival, filled with music, movement, and energy. Please join in and celebrate with us.</p>
          </div>
          <div>
            <p className="font-semibold text-primary">Wedding Ceremony | 5:30 PM – 7:00 PM</p>
            <p>As the sun begins to set, Aditi will make her entrance, and the ceremony will unfold surrounded by family, tradition, and love.</p>
          </div>
          <p className="italic mt-3 text-primary/80">Your presence and blessings complete this moment for us.</p>
        </>
      ),
      icon: weddingIcon,
    },
    {
      title: "Poolside Mela",
      date: "WEDNESDAY, OCTOBER 28, 2026",
      time: "11 AM ONWARDS",
      description: (
        <>
          <p>This is not a wind-down, it's the warm-up.</p>
          <p className="mt-2">A high-energy daytime celebration with music, colour, and just enough chaos to set the tone for the final night.</p>
          <p className="italic mt-2 text-primary/80">Pace yourselves. The best is yet to come.</p>
        </>
      ),
      icon: poolpartyIcon,
    },
    {
      title: "The Grand Finale",
      date: "WEDNESDAY, OCTOBER 28, 2026",
      time: "7 PM ONWARDS",
      description: (
        <p>Dinner, music, dancing, and one last night together.</p>
      ),
      icon: finaleIcon,
      isLast: true,
    },
  ];

  return (
    <section 
      className="max-w-6xl mx-auto px-6 md:px-12 py-12 relative"
      style={{
        backgroundImage: `url(${background3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {events.map((event, index) => (
        <EventItem
          key={index}
          title={event.title}
          date={event.date}
          time={event.time}
          description={event.description}
          icon={event.icon}
          isLast={index === events.length - 1}
        />
      ))}
    </section>
  );
};

export default EventsTimeline;