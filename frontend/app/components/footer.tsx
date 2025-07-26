import FooterCredit from "./footerCredit";

import snake from "../assets/images/snake.svg";
import BouncingFooterShapes from "./effects/bouncingFooterShapes";

const Footer: React.FC = () => {
  const date = new Date();

  const currentYear = date.getFullYear();

  const devedYear = 2025;

  const copyrightYearString =
    devedYear == currentYear ? "2025" : `${devedYear - currentYear}`;
  return (
    <div>
      <div>
        <div className="flex flex-col  p-6 md:p-12  lg:p-16 lg:flex-row">
          <div className="flex-1 flex lg:items-end">
            <div>
              <span className="w-full flex justify-end">
                <img src={snake} alt="snake" />
              </span>

              <div className="flex flex-col gap-12 justify-start">
                <h4 className="text-white text-2xl">
                  let's build your million-dollar idea
                </h4>

                <h2 className="text-white text-base italic">
                  Have a bold product vision? I help founders and teams bring
                  standout digital products to life — from polished UX to
                  production-ready designs. Let’s talk!
                </h2>
                <button className="px-3 py-2 bg-[#0FB492] text-white w-fit  rounded-lg animate-pulse hover:animate-none transition-all duration-300">
                  view more
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className=" flex flex-col justify-between p-6 md:p-12 lg:p-16">
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight">
                    Let's <span className="italic">Collab</span>
                    <span className="text-yellow-400">.</span>
                  </h1>
                </div>

                <div
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  }}
                >
                  <div>
                    <h2 className="text-lg md:text-xl font-medium mb-4 md:mb-6">
                      Service
                    </h2>
                    <div className="space-y-2 md:space-y-3">
                      <p className="text-gray-300 text-sm md:text-base italic">
                        User Interface Design
                      </p>
                      <p className="text-gray-300 text-sm md:text-base italic">
                        User Experience Design
                      </p>
                      <p className="text-gray-300 text-sm md:text-base italic">
                        Wireframe and Prototype
                      </p>
                      <p className="text-gray-300 text-sm md:text-base italic">
                        Mobile App Development
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg md:text-xl font-medium mb-4 md:mb-6">
                      Connect
                    </h2>
                    <div className="space-y-2 md:space-y-3">
                      <p className="text-gray-300 text-sm md:text-base italic">
                        Linkedin
                      </p>
                      <p className="text-gray-300 text-sm md:text-base italic">
                        Behance
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-1 lg:col-span-1">
                    <h2 className="text-lg md:text-xl font-medium mb-4 md:mb-6">
                      Get in touch
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base italic">
                      suarauthman@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 md:mt-24">
                <p className="text-gray-400 text-xs md:text-sm">
                  © Copyright {copyrightYearString}
                </p>
              </div>
            </div>
          </div>
        </div>

        <>
          <BouncingFooterShapes />
        </>

        <>
          <FooterCredit />
        </>
      </div>
    </div>
  );
};

export default Footer;
