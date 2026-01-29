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
  index: number;
}

const EventItem = ({ title, date, time, description, icon, isLast = false, index }: EventItemProps) => {
  // index 0, 2, 4 (Even) -> Title (Left) | Line | Details + Icon (Right)
  // index 1, 3, 5 (Odd)  -> Icon + Title (Left) | Line | Details (Right)
  const isOdd = index % 2 !== 0;

  return (
    <div className={`relative ${!isLast ? 'border-b border-[#C5A059]/30' : ''} py-10 md:py-16`}>
      <div className="flex flex-row items-stretch gap-4 md:gap-10">
        
        {/* 1. LEFT SIDE: Title container */}
        <div 
          className={`
            w-[40%] md:w-[42%] flex items-center gap-3 md:gap-10 
            ${isOdd ? 'flex-row-reverse md:pl-20 lg:pl-60' : 'flex-row'} 
            justify-end
          `}
        >
          {/* Title Section: Shifts right when NOT odd (no icon on this side) */}
          <div className={`text-right ${!isOdd ? 'pl-8 md:pl-20' : 'pl-0'}`}>
            <h3 className="font-cormorant text-xl md:text-4xl text-primary leading-tight italic font-semibold">
              {title.split(' & ').map((part, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="block text-2xl md:text-3xl my-1">&</span>}
                  {part}
                </React.Fragment>
              ))}
            </h3>
          </div>

          {/* Icon Section (Shows on Left ONLY for ODD indices) */}
          {isOdd && icon && (
            <div className="flex-shrink-0">
              <div className="w-14 h-14 md:w-28 md:h-28">
                <img src={icon} alt="" className="w-full h-full object-contain opacity-90" />
              </div>
            </div>
          )}
        </div>

        {/* 2. MIDDLE SIDE: Vertical Gold Line */}
        <div className="relative flex flex-col items-center">
          <div className="w-[1.5px] h-full bg-[#C5A059]"></div>
        </div>

        {/* 3. RIGHT SIDE: Details container */}
        <div className="flex-grow flex items-center gap-4 md:gap-8 justify-between">
          <div className="flex-grow pt-1 text-left">
            <p className="font-lora text-[10px] md:text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">
              {date}
            </p>
            <p className="font-lora text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest mb-4">
              {time}
            </p>
            <div className="font-lora text-xs md:text-sm text-gray-700 leading-relaxed max-w-lg">
              {description}
            </div>
          </div>

          {/* Icon Section (Shows on Right ONLY for EVEN indices) */}
          {!isOdd && icon && (
            <div className="flex-shrink-0">
              <div className="w-14 h-14 md:w-28 md:h-28">
                <img src={icon} alt="" className="w-full h-full object-contain opacity-90" />
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
      description: "Take your time, unpack, catch up with familiar faces, and ease into the days ahead. There might be a cold cocktail waiting for you.",
      icon: icon1,
    },
    {
      title: "Rhythm & Riwaaz",
      date: "MONDAY, OCTOBER 26, 2026",
      time: "6 PM ONWARDS",
      description: "Our Sangeet and mehndi will start in the early evening and flow late into the night with henna, music, and dancing.",
      icon: sangeetIcon,
    },
    {
      title: "Blessings & Prayers",
      date: "TUESDAY, OCTOBER 27, 2026",
      time: "8 AM",
      description: "A Ganesh Pooja and blessing ceremony to begin the wedding day with intention, gratitude, and grace.",
      icon: blessings,
    },
    {
      title: "Haldi Hues",
      date: "TUESDAY, OCTOBER 27, 2026",
      time: "11 AM ONWARDS",
      description: "A joyful Haldi ceremony filled with colour and laughter. Wear something you won't be too attached to!",
      icon: haldiIcon,
    },
    {
      title: "The Wedding",
      date: "TUESDAY, OCTOBER 27, 2026",
      time: "4 PM ONWARDS",
      description: (
        <>
          <p className="font-bold text-primary">Jaan Entrance | 4:00 PM</p>
          <p className="mb-2">The groom’s arrival, filled with music and energy.</p>
          <p className="font-bold text-primary">Ceremony | 5:30 PM</p>
          <p>As the sun sets, the ceremony unfolds surrounded by family and love.</p>
        </>
      ),
      icon: weddingIcon,
    },
    {
      title: "Poolside Mela",
      date: "WEDNESDAY, OCTOBER 28, 2026",
      time: "11 AM ONWARDS",
      description: "A high-energy daytime celebration with music and colour to set the tone for the final night.",
      icon: poolpartyIcon,
    },
    {
      title: "The Grand Finale",
      date: "WEDNESDAY, OCTOBER 28, 2026",
      time: "7 PM ONWARDS",
      description: "Dinner, music, dancing, and one last night together to celebrate our new beginning.",
      icon: finaleIcon,
    },
  ];

  return (
    <section 
      className="w-full py-16"
      style={{
        backgroundImage: `url(${background3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {events.map((event, index) => (
          <EventItem
            key={index}
            index={index}
            {...event}
            isLast={index === events.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default EventsTimeline;
