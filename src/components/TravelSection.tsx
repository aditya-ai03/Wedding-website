import travelHeader from "@/assets/trav1.png";
import passportCloud from "@/assets/trav2.png";
import luggageIllustration from "@/assets/trav3.png";
import floralDivider from "@/assets/trav4.png";
import cloudDecoration from "@/assets/trav5.png";

const TravelSection = () => {
  return (
    <section className="section-container ">
    

      {/* Header with passport illustration */}
      <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 mb-10 md:mb-12 md:gap-8">
        {/* Travel title */}
        <img
          src={travelHeader}
          alt="Travel & Arrival"
          className="w-[120px] sm:w-32 md:w-[300px] h-auto md:absolute md:left-8"
        />

        {/* Illustration 1 */}
        <img
          src={passportCloud}
          alt="Passport illustration"
          className="w-24 sm:w-32 md:w-[400px] h-auto"
        />

        {/* Illustration 2 */}
        <img
          src={luggageIllustration}
          alt="Travel luggage illustration"
          className="w-[120px] sm:w-32 md:w-[300px] h-auto md:absolute md:right-8"
        />
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        {/* Airport Info */}
        <div className="text-center space-y-4">
          <p className="font-serif text-lg text-foreground leading-relaxed">
            The nearest airport is <span className="font-semibold text-primary">Udaipur (UDR)</span>.
          </p>
          <p className="font-serif text-foreground leading-relaxed">
            If you're travelling by road from Ahmedabad, the drive usually takes around 
            <span className="font-semibold text-primary"> 4-5 hours</span>, depending on traffic and breaks.
          </p>
        </div>

        {/* Floral Divider */}
        {/* <div className="flex justify-center py-4">
          <img 
            src={floralDivider} 
            alt="" 
            className="w-48 opacity-80"
          />
        </div> */}

        {/* Arrival Info */}
        <div className="space-y-4">
          <p className="font-serif text-foreground leading-relaxed text-center">
            If you arrive in Udaipur a day earlier, we’d love to begin the celebrations together 
with a relaxed evening in the heart of the city, good food, and time to settle in 
before the days ahead. Please let us know if this is part of your plan so we can 
organise it together.

          </p>
        </div>

       

        {/* Flight Info */}
        <div className="space-y-4">
          <p className="font-serif text-foreground leading-relaxed text-center">
            Once you’ve booked your flights, please share the details with us and we’ll help 
coordinate travel so everyone arrives comfortably and without stress.

          </p>
        </div>
      </div>
       {/* Floral Divider */}
        <div className="flex justify-center py-4">
          <img 
            src={floralDivider} 
            alt="" 
            className="w-75 md:w-[600px] opacity-80"
          />
        </div>

     <div className="flex justify-center py-4">
          <img 
            src={cloudDecoration} 
            alt="" 
            className="w-48 opacity-80"
          />
        </div>
    </section>
  );
};

export default TravelSection;
