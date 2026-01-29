import logo from '@/assets/logo.png';
import backgroundMobile from '@/assets/background-3.jpeg';

const WeddingFooter = () => {
  return (
    <>
      <style>{`
        .footer-mobile-bg {
          background-image: url(${backgroundMobile});
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        @media (min-width: 768px) {
          .footer-mobile-bg {
            background-image: none;
          }
        }
      `}</style>

      {/* FULL WIDTH FOOTER */}
      <footer className="footer-mobile-bg w-full py-12 px-4 md:px-8">
        
        {/* INNER CONTAINER – CONTROLS CONTENT WIDTH */}
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <p className="font-lora text-sm md:text-base text-primary text-center mb-8 italic">
            We can't wait to celebrate, laugh, and create memories together as part of this festival.
          </p>

          {/* Footer Logo */}
          <div className="w-28 md:w-36 mb-3">
            <img
              src={logo}
              alt="Aditi & Nikhil"
              className="w-full h-auto"
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default WeddingFooter;
