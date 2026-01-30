import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';
import topLogo from '@/assets/top_logo.png';
import { cn } from '@/lib/utils';

interface WeddingHeaderProps {
  showNav?: boolean;
  activeNav?: string;
  useTopLogo?: boolean;
  containerClassName?: string;
  logoContainerClassName?: string;
  navClassName?: string;
}

const WeddingHeader = ({
  showNav = true,
  activeNav = 'Home',
  useTopLogo = false,
  containerClassName,
  logoContainerClassName,
  navClassName,
}: WeddingHeaderProps) => {
  const displayLogo = useTopLogo ? topLogo : logo;
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Travel & Arrival', path: '/travel-arrival' },
    { label: 'Accommodation', path: '/accommodation' },
    { label: 'RSVP', path: '/rsvp' },
    { label: 'Dress Code', path: '/dress-code' },
    { label: 'Experience India', path: '/experience-india' },
    { label: 'FAQs', path: '/faqs' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={cn(
        "flex flex-col items-center pt-6 md:pt-[50vh] pb-8 transition-all duration-1000",
        containerClassName
      )}
    >
      {/* Logo Container */}
      <div
        className={cn(
          `
          w-32 md:w-56 lg:w-64 
          mb-8 md:mb-10 
          transform 
          translate-y-4 md:-translate-y-28 
          transition-transform duration-700 
          md:mt-10 
          ${useTopLogo ? "-mt-4" : "md:mt-36 relative md:top-28"}
          `,
          logoContainerClassName
        )}
      >
        <img
          src={displayLogo}
          alt="Aditi & Nikhil"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Date & Location (Home only) */}
      {isHomePage && (
        <p className="font-lora text-[10px] md:text-sm text-burgundy-light tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium whitespace-nowrap text-center">
          October 26-28, 2026 · Udaipur, India
        </p>
      )}

      {/* Navigation */}
      {showNav && (
        <nav
  className={cn(
    "mt-4 md:mt-6 w-full flex flex-row items-start justify-between md:justify-center px-2 md:px-12 overflow-x-hidden md:overflow-x-visible",
    navClassName
  )}
>
  {navItems.map((item, index) => (
    <span key={item.label} className="flex items-start justify-center md:flex-none">
      <Link
        to={item.path}
        className={cn(
          "nav-link uppercase transition-all duration-300",
          "flex items-center justify-center w-full text-center text-[8px] leading-[1.1] tracking-[0.05em] px-0.5 py-2 hover:no-underline md:block md:w-auto md:text-base md:tracking-[0.2em] md:px-0 md:py-0",
          activeNav === item.label
            ? "font-semibold text-burgundy md:border-b-2 md:border-burgundy md:pb-2"
            : " hover:text-burgundy md:border-b-2 md:border-transparent md:pb-2"
        )}
      >
        <span className="md:hidden">
          {item.label === "Travel & Arrival" ? (
            "Travel"
          ) : item.label === "Accommodation" ? (
            "Stay"
          ) : item.label === "Dress Code" ? (
            <>Dress<br />Code</>
          ) : item.label === "Experience India" ? (
            <>Explore<br />India</>
          ) : (
            item.label
          )}
        </span>
        <span className="hidden md:inline whitespace-nowrap">{item.label}</span>
      </Link>

      {index < navItems.length - 1 && (
        <span className="hidden md:inline text-gray-200 mx-2 md:mx-6 lg:mx-10 font-extralight">
          |
        </span>
      )}
    </span>
  ))}
</nav>

      )}
    </header>
  );
};

export default WeddingHeader;
