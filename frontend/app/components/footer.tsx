import FooterCredit from "./footerCredit";
import snake from "../assets/images/snake.svg";
import BouncingFooterShapes from "./effects/bouncingFooterShapes";
import type {
  FooterData,
  SocialPlatform,
} from "~/sanity/interfaces/siteSettings";

interface FooterProps {
  footerData: FooterData;
}

const Footer: React.FC<FooterProps> = ({ footerData }) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const devedYear = 2025;
  const copyrightYearString =
    devedYear == currentYear ? "2025" : `${devedYear} - ${currentYear}`;

  // Filter only enabled social links
  const enabledSocialLinks = footerData.socialLinks.filter(
    (link) => link.isEnabled
  );

  // Function to capitalize platform names for display
  const formatPlatformName = (platform: SocialPlatform): string => {
    switch (platform) {
      case "linkedin":
        return "LinkedIn";
      case "behance":
        return "Behance";
      case "github":
        return "GitHub";
      case "youtube":
        return "YouTube";
      case "tiktok":
        return "TikTok";
      case "facebook":
        return "Facebook";
      default:
        return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  };

  return (
    <div>
      <div>
        {/* Main footer content with unified responsive padding */}
        <div className="px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-12 lg:py-16 xl:px-16 xl:py-20">
          <div className="flex flex-col gap-12 lg:gap-16 lg:flex-row">
            {/* Left section - Call to action */}
            <div className="flex-1 flex lg:items-end">
              <div className="w-full">
                <span className="w-full flex justify-end mb-6 lg:mb-8">
                  <img src={snake} alt="snake" />
                </span>

                <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 justify-start">
                  <h4 className="text-white text-xl sm:text-2xl lg:text-3xl leading-relaxed">
                    let's build your million-dollar idea
                  </h4>

                  <h2 className="text-white text-sm sm:text-base lg:text-lg italic leading-relaxed">
                    Have a bold product vision? I help founders and teams bring
                    standout digital products to life — from polished UX to
                    production-ready designs. Let's talk!
                  </h2>

                  {/* <button className="px-4 py-3 sm:px-5 sm:py-3 bg-[#0FB492] text-white w-fit rounded-lg animate-pulse hover:animate-none transition-all duration-300 text-sm sm:text-base">
                    view more
                  </button> */}
                </div>
              </div>
            </div>

            {/* Right section - Collaboration details */}
            <div className="flex-1">
              <div className="flex flex-col justify-between min-h-full">
                <div className="flex-1 flex flex-col justify-center">
                  {/* Main heading */}
                  <div className="mb-12 sm:mb-16 lg:mb-20">
                    <h1 className="text-3xl sm:text-4xl text-white md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-normal leading-tight">
                      Let's <span className="italic font-bold">Collab</span>
                      <span className="text-yellow-400 text-lg">■</span>
                    </h1>
                  </div>

                  {/* Services and contact grid */}
                  <div className="grid gap-8 sm:gap-10 lg:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Services */}
                    <div>
                      <h2 className="text-base sm:text-lg md:text-xl font-medium mb-4 sm:mb-5 lg:mb-6">
                        Service
                      </h2>
                      <div className="space-y-2 sm:space-y-3">
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base italic">
                          User Interface Design
                        </p>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base italic">
                          User Experience Design
                        </p>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base italic">
                          Wireframe and Prototype
                        </p>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base italic">
                          Mobile App Development
                        </p>
                      </div>
                    </div>

                    {/* Social links */}
                    <div>
                      <h2 className="text-base sm:text-lg md:text-xl font-medium mb-4 sm:mb-5 lg:mb-6">
                        Connect
                      </h2>
                      <div className="space-y-2 sm:space-y-3">
                        {enabledSocialLinks.map((socialLink, index) => (
                          <a
                            key={index}
                            href={socialLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-gray-300 text-xs sm:text-sm md:text-base italic hover:text-white transition-colors duration-200"
                          >
                            {formatPlatformName(socialLink.platform)}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="sm:col-span-2 lg:col-span-1">
                      <h2 className="text-base sm:text-lg md:text-xl font-medium mb-4 sm:mb-5 lg:mb-6">
                        Get in touch
                      </h2>
                      <a href={`mailto:${footerData.email}`} className="text-gray-300 text-xs sm:text-sm md:text-base italic break-all sm:break-normal">
                      {footerData.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 sm:mt-16 lg:mt-20 xl:mt-24">
                  <p className="text-gray-400 text-xs sm:text-sm">
                    © Copyright  {copyrightYearString}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BouncingFooterShapes />
        <FooterCredit />
      </div>
    </div>
  );
};

export default Footer;
