import numberOne from "@/assets/FAQ1.png";
import numberTwo from "@/assets/FAQ2.png";
import numberThree from "@/assets/FAQ3.png";
import numberFour from "@/assets/FAQ4.png";
import numberFive from "@/assets/FAQ5.png";
import numberSix from "@/assets/FAQ6.png";

const faqImages = [numberOne, numberTwo, numberThree, numberFour, numberFive, numberSix];

interface FAQItem {
  question: string;
  answer: string[];
}

const faqs: FAQItem[] = [
  {
    question: "What airport do we fly into?",
    answer: ["Udaipur has one airport: Maharana Pratap Airport (UDR)."],
  },
  {
    question: "How far is the airport from the hotel?",
    answer: ["Royal Retreat, Udaipur is approximately a 45-minute drive from Maharana Pratap Airport (UDR)."],
  },
  {
    question: "Do I need a visa to travel to India?",
    answer: [
      "Yes. Most guests will need a tourist visa. For UK, US, and Canadian passport holders a 30 day e-visa costs USD $25. We recommend applying 3-4 weeks before travel.",
      "Please make sure you apply via the official Indian government website only, third party websites often charge significantly more for an e-visa.",
      "Please also remember to complete the India e-Arrival Card (e-card) online within 3 days before departure, as this is required for entry",
      "if you are not a UK, USA, or Canadian passport holder, we'll be in touch to help guide you through the process."
    ],
  },
  {
    question: "Will there be an open bar?",
    answer: ["Sip, sip, hooray! Yes — there will be an open bar at all events where alcohol is being served."],
  },
  {
    question: "Would you advise getting a car?",
    answer: ["It's optional. Udaipur is easily navigable with taxis or ride apps, and since all wedding events and your stay are at Royal Retreat, you won't need a car for the wedding weekend itself.If you plan to explore the city or nearby attractions after the wedding,having a car can be convenient."],
  },
  {
    question: "Would you advise staying at Royal Retreat after the wedding?",
    answer: ["Since all wedding events are at Royal Retreat, staying here for the weekend is most convenient.If you plan to explore Udaipur or nearby areas afterward, you could also consider other hotels or report in the city for a longer stay experience"],
  },
];

const FAQSection = () => {
  return (
    <section className="section-container -py-[80px] md:12 bg-transparent ">
      <div className="text-center mb-16">
        <h2 className="font-display text-5xl md:text-6xl text-primary tracking-wide">
          FAQs
        </h2>
        <div className="w-24 h-0.5 bg-primary/30 mx-auto mt-4" />
      </div>

      <div className="space-y-12 max-w-3xl mx-auto px-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="grid grid-cols-[auto_1fr] gap-6 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start">
              <img 
                src={faqImages[index]} 
                alt={(index + 1).toString()} 
                /* Logic: If it's the first item (index 0), use w-7, otherwise use w-10 */
                className={`${index === 0 ? "w-6" : "w-10"} h-auto object-contain`} 
              />
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-xl text-primary font-semibold">
                {faq.question}
              </h3>
              <div className="space-y-3">
                {faq.answer.map((paragraph, pIndex) => (
                  <p key={pIndex} className="font-serif text-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
