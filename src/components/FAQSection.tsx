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
      "Please also remember to complete the India e-Arrival Card (e-arrival.gov.in) within 3 days before departure, as this is required for entry.",
    ],
  },
  {
    question: "Will there be an open bar?",
    answer: ["Sip, sip, hooray! Yes — there will be an open bar at all events where alcohol is being served."],
  },
  {
    question: "Would you advise getting a car?",
    answer: ["It's optional. Udaipur is easily navigable with autos or taxi apps, and since all wedding events and your stay are at Royal Retreat, you won't need a car for the wedding weekend itself."],
  },
  {
    question: "Would you advise staying at Royal Retreat after the wedding?",
    answer: ["Since all wedding events are at Royal Retreat, staying here for the weekend is most convenient."],
  },
];

const FAQSection = () => {
  return (
    <section className="section-container py-20 bg-transparent md:bg-secondary/30">
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