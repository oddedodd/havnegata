import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Tilbud } from "../utils/sanity";
import { urlFor } from "../utils/image";
import { getAllTilbud } from "../utils/sanity";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/slider.css";

/**
 * OfferSlider Component
 *
 * A flexible React component for displaying offers/tilbud in a card-based slider layout.
 * Can be used to show all offers or filter by company-specific offers.
 *
 * USAGE PATTERNS:
 *
 * 1. GLOBAL OFFERS (shows all tilbud from Sanity):
 *    - Used without the 'tilbud' prop
 *    - Component automatically fetches all tilbud using getAllTilbud()
 *    - Example: <OfferSlider companyName="NA Kreativ" client:load />
 *
 * 2. COMPANY-SPECIFIC OFFERS (shows filtered tilbud):
 *    - Receives pre-filtered tilbud for a specific company via the 'tilbud' prop
 *    - Uses company's textColor for consistent branding
 *    - Example: <OfferSlider tilbud={companyTilbud} textColor={textColor} companyName={name} client:load />
 *
 * DATA FLOW:
 * - If 'tilbud' prop is provided → uses that data directly (no fetching)
 * - If 'tilbud' prop is NOT provided → fetches all tilbud from Sanity automatically
 * - Component handles loading states and error handling internally
 *
 * PROPS:
 * - tilbud?: Tilbud[] - Array of offer objects (optional, fetches all if not provided)
 * - title?: string - Custom title for the section (optional)
 * - textColor?: { hex: string } - Text color for titles (defaults to #222)
 * - companyName?: string - Company name for title generation (optional)
 * - autoPlay?: boolean - Enable/disable auto-play (defaults to true)
 * - showNavigation?: boolean - Show/hide navigation arrows (defaults to true)
 * - showPagination?: boolean - Show/hide pagination dots (defaults to true)
 *
 * DATA STRUCTURE (Tilbud):
 * - name: string - Offer name/title
 * - price?: string - Price information
 * - description?: string - Offer description
 * - image?: ImageAsset - Offer image with alt text
 * - links?: Array<{title?: string, url?: string}> - Action links
 * - company: Company - Associated company information
 *
 * SLIDER FEATURES:
 * - Mobile-friendly swipe gestures
 * - Responsive design (1 card on mobile, 2 on tablet, 3 on desktop)
 * - Auto-play with pause on interaction
 * - Navigation arrows and pagination dots
 * - Smooth transitions and animations
 */
interface OfferSliderProps {
  tilbud?: Tilbud[];
  textColor?: { hex: string };
  title?: string;
  companyName?: string;
  autoPlay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

const OfferSlider: React.FC<OfferSliderProps> = ({
  tilbud: passedTilbud,
  textColor = { hex: "#222" },
  title,
  companyName,
  autoPlay = true,
  showNavigation = true,
  showPagination = true,
}) => {
  // State to store the tilbud data (either from props or fetched)
  const [tilbud, setTilbud] = useState<Tilbud[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTilbud = async () => {
      // USE CASE 1: Company-specific offers
      // If tilbud is passed as prop, use it directly (no fetching needed)
      if (passedTilbud) {
        setTilbud(passedTilbud);
        return;
      }

      // USE CASE 2: Global offers
      // If no tilbud prop provided, fetch all tilbud from Sanity
      setLoading(true);
      try {
        const allTilbud = await getAllTilbud();
        setTilbud(allTilbud);
      } catch (error) {
        console.error("Error fetching tilbud:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTilbud();
  }, [passedTilbud]);

  // Generate title based on props
  // Priority: custom title > company-specific title > default title
  const displayTitle =
    title || (companyName ? `Tilbud fra ${companyName}` : "Tilbud");

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center">Loading tilbud...</div>
      </div>
    );
  }

  // If there are no tilbud, render nothing (return null)
  if (!tilbud || tilbud.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Section Title */}
      <h2
        className="text-2xl font-bold mb-6 text-center"
        style={{ color: textColor.hex }}
      >
        {displayTitle}
      </h2>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={showNavigation}
        pagination={showPagination ? { clickable: true } : false}
        autoplay={
          autoPlay ? { delay: 5000, disableOnInteraction: false } : false
        }
        loop={true}
        // Responsive breakpoints for different screen sizes
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
        {/* Render each tilbud as a slide */}
        {tilbud.map((item: Tilbud, index: number) => (
          <SwiperSlide key={`tilbud-${index}`}>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6 h-full flex flex-col justify-between">
              {item.image?.asset ? (
                <div className="mb-4">
                  <img
                    src={
                      urlFor(item.image).width(400).height(300).url() as string
                    }
                    alt={item.image.alt || item.name}
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              ) : null}

              {/* Content Section */}
              <div className="flex-1 flex flex-col">
                {/* Offer Title */}
                <h3
                  className="text-xl font-semibold mb-2 flex-shrink-0"
                  style={{ color: textColor.hex }}
                >
                  {item.name}
                </h3>

                {/* Price - Only show if price exists */}
                {item.price && (
                  <div className="text-lg font-bold mb-2 text-purple-700 flex-shrink-0">
                    {item.price}
                  </div>
                )}

                {/* Description - Only show if description exists */}
                {item.description && (
                  <p className="mb-4 text-gray-700 text-sm flex-1">
                    {item.description}
                  </p>
                )}

                {/* Action Links Section - Only show if links exist */}
                {item.links && item.links.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2">
                    {item.links
                      .filter((link) => link.url)
                      .map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-purple-100 text-purple-700 px-3 py-2 rounded-md hover:bg-purple-200 transition-colors duration-200 text-sm font-medium"
                        >
                          {link.title || "Les mer"}
                        </a>
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
