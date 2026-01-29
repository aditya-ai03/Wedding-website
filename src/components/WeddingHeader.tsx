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
    ${useTopLogo ? "-mt-3" : "mt-4"}
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

  {/* Navigation — Reduced mobile mt-20 to mt-6, kept md:mt-20 */}
  {showNav && (
    <nav
      className={cn(
        // Mobile: one line, NO scrolling. Desktop: unchanged layout.
        "mt-6 md:mt-20 w-full flex flex-row items-center justify-between md:justify-center whitespace-nowrap px-3 md:px-12 overflow-x-hidden md:overflow-x-visible",
        navClassName
      )}
    >
      {navItems.map((item, index) => (
        <span key={item.label} className="flex items-center flex-1 min-w-0 md:flex-none">
          {item.path.startsWith('/') ? (
            <Link
              to={item.path}
              className={cn(
                "nav-link uppercase transition-all duration-300",
                // mobile: compact, one-line, no scroll
                "block w-full text-center text-[9px] tracking-[0.08em] px-1 py-2 rounded-full md:w-auto md:text-base md:tracking-[0.2em] md:px-0 md:py-0 md:rounded-none",
                activeNav === item.label
                  ? "font-semibold text-burgundy bg-burgundy/10 border border-burgundy/30 md:bg-transparent md:border-0 md:border-b-2 md:border-burgundy md:pb-2"
                  : "text-gray-500 hover:text-burgundy border border-transparent hover:border-burgundy/20 md:border-0 md:pb-2"
              )}
            >
              <span className="md:hidden">
                {item.label === "Travel & Arrival"
                  ? "Travel"
                  : item.label === "Accommodation"
                    ? "Stay"
                    : item.label === "Dress Code"
                      ? "Dress"
                      : item.label === "Experience India"
                        ? "Explore"
                        : item.label}
              </span>
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          ) : (
            <a
              href={item.path}
              className={cn(
                "nav-link uppercase transition-all duration-300",
                "block w-full text-center text-[9px] tracking-[0.08em] px-1 py-2 rounded-full md:w-auto md:text-base md:tracking-[0.2em] md:px-0 md:py-0 md:rounded-none",
                activeNav === item.label
                  ? "font-semibold text-burgundy bg-burgundy/10 border border-burgundy/30 md:bg-transparent md:border-0 md:border-b-2 md:border-burgundy md:pb-2"
                  : "text-gray-500 hover:text-burgundy border border-transparent hover:border-burgundy/20 md:border-0 md:pb-2"
              )}
            >
              <span className="md:hidden">
                {item.label === "Travel & Arrival"
                  ? "Travel"
                  : item.label === "Accommodation"
                    ? "Stay"
                    : item.label === "Dress Code"
                      ? "Dress"
                      : item.label === "Experience India"
                        ? "Explore"
                        : item.label}
              </span>
              <span className="hidden md:inline">{item.label}</span>
            </a>
          )}

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
