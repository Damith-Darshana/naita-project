import { MapPin, Phone, Mail } from 'react-feather';

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12" style={{ maxWidth: '1920px', height: '529px' }}>
        <div className="flex flex-wrap justify-between">
          {/* Left Column - Logo and Description */}
          <div className=" md:w-1/3 mb-8 md:mb-0">
            <img 
              src="/naita-logo.png" 
              alt="NAITA Logo" 
              className="h-40 -ml-3.5"
            />
            <p className="text-[18px] text-[#303030] font-normal mb-6 -mt-5">
              Empowering the future through knowledge and innovation. Our training center is committed to excellence, equipping individuals with the skills and expertise needed to drive progress. Join us in shaping a smarter, more capable tomorrow.
            </p>
            <a href="/privacy-policy" className="text-[#DF6113] text-[18px] font-bold hover:underline">
              Privacy Policy
            </a>
          </div>

          {/* Middle Columns - Links and Community */}
          <div className="flex flex-wrap md:flex-nowrap gap-12">
            {/* Links Column */}
            <div className="w-1/2 md:w-auto mt-18 -ml-0">
              <h3 className="text-[24px] font-bold text-black mb-6">Links<span className="text-[#87212E]">.__</span></h3>
              <div className="flex">
  <ul className="space-y-4 mr-8"> {/* Added margin-right for spacing */}
    {['Home', 'Courses', 'FAQs'].map((link) => (
      <li key={link}>
        <a
          href={`/${link.toLowerCase().replace(' ', '-')}`}
          className="text-[18px] text-[#303030] hover:text-[#87212E] hover:underline"
        >
          {link}
        </a>
      </li>
    ))}
  </ul>
  <ul className="space-y-4">
    {['About Us', 'Contact Us'].map((link) => (
      <li key={link}>
        <a
          href={`/${link.toLowerCase().replace(' ', '-')}`}
          className="text-[18px] text-[#303030] hover:text-[#87212E] hover:underline"
        >
          {link}
        </a>
      </li>
    ))}
  </ul>
</div>
            </div>

            {/* Community Column */}
            <div className="w-1/2 md:w-auto mt-18 pl-16">
              <h3 className="text-[24px] font-bold text-black mb-6">Community<span className="text-[#87212E]">.__</span></h3>
              <ul className="space-y-4">
                {['Board of Management', 'District Offices', 'National Institutes'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`/${item.toLowerCase().replace(' ', '-')}`} 
                      className="text-[18px] text-[#303030] hover:text-[#87212E] hover:underline"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Official Info */}
          <div className="w-full md:w-1/4 mt-18 ">
            <h3 className="text-[24px] font-bold text-black mb-6">Official Info<span className="text-[#87212E]">.__</span></h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="text-[#87212E] mr-3 mt-1" size={32} />
                <p className="text-[18px] text-[#303030]">
                  No. 971, Sri Jayewardenepura Mawatha, Welikada, Rajagiriya, Sri Lanka.
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="text-[#87212E] mr-3" size={20} />
                <p className="text-[18px] text-[#303030]">0112888782</p>
              </div>
              <div className="flex items-center">
                <Mail className="text-[#87212E] mr-3" size={20} />
                <p className="text-[18px] text-[#303030]">Naita@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-[#87212E] h-[68px] flex items-center justify-center">
        <p className="text-[18px] font-medium text-white">
          Copyright @ 2025 NAITA THRIVE All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}