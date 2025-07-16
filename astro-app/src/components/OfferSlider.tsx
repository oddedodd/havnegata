import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Tilbud } from '../utils/sanity';
import { urlFor } from '../utils/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import '../styles/slider.css';

interface OfferSliderProps {
  tilbud: Tilbud[];
  textColor?: { hex: string };
  title?: string;
  companyName?: string;
  autoPlay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

const OfferSlider: React.FC<OfferSliderProps> = ({
  tilbud,
  textColor = { hex: '#222' },
  title,
  companyName,
  autoPlay = true,
  showNavigation = true,
  showPagination = true,
}) => {
  // Generate title
  const displayTitle = title || (companyName ? `Tilbud fra ${companyName}` : "Tilbud");

  if (!tilbud || tilbud.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 
        className="text-2xl font-bold mb-6 text-center" 
        style={{ color: textColor.hex }}
      >
        {displayTitle}
      </h2>
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={showNavigation}
        pagination={showPagination ? { clickable: true } : false}
        autoplay={autoPlay ? { delay: 5000, disableOnInteraction: false } : false}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        className="offer-swiper"
      >
        {tilbud.map((item: Tilbud, index: number) => (
          <SwiperSlide key={`tilbud-${index}`}>
            <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
              {/* Image Section */}
              {item.image && item.image.asset && (
                <div className="mb-4">
                  <img
                    src={urlFor(item.image).width(400).height(300).url() as string}
                    alt={(item.image.alt as string) || item.name}
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}
              
              {/* Content Section */}
              <div className="flex-1 flex flex-col">
                <h3 
                  className="text-xl font-semibold mb-2 flex-shrink-0" 
                  style={{ color: textColor.hex }}
                >
                  {item.name}
                </h3>
                
                {item.price && (
                  <div className="text-lg font-bold mb-2 text-purple-700 flex-shrink-0">
                    {item.price}
                  </div>
                )}
                
                {item.description && (
                  <p className="mb-4 text-gray-700 text-sm flex-1">
                    {item.description}
                  </p>
                )}
                
                {/* Links Section */}
                {item.links && item.links.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2">
                    {item.links.map((link, linkIndex) => (
                      link.url && (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-purple-100 text-purple-700 px-3 py-2 rounded-md hover:bg-purple-200 transition-colors duration-200 text-sm font-medium"
                        >
                          {link.title || "Les mer"}
                        </a>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OfferSlider; 