import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import heroImage from "@/assets/about/about-hero.jpg";
import homeimage from "@/assets/home/home-main.png";
import studioImage from "@/assets/studio/studio-main.png"
import aboutImage from "@/assets/about/about-hero.jpg"
import cafeImage from "@/assets/cafe/hero image-2.png"
import galleryImage from "@/assets/gallery/Hero Image-3.png";
//contact



interface NavigationItem {
  id: string;
  number: string;
  title: string;
  image: string;
  href: string;
}

interface HorizontalNavigationProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const HorizontalNavigation: React.FC<HorizontalNavigationProps> = ({
  isExpanded,
  onToggle,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname === href;

  const navigationItems: NavigationItem[] = [
    {
      id: "001",
      number: "001",
      title: "HOME",
      image: homeimage,
      href: "/",
    },
    {
      id: "002",
      number: "002",
      title: "ABOUT",
      image: aboutImage,
      href: "/about",
    },
    {
      id: "003",
      number: "003",
      title: "STUDIO",
      image: studioImage,
      href: "/studio",
    },
    {
      id: "004",
      number: "004",
      title: "CAFE",
      image: cafeImage,
      href: "/cafe",
    },
    {
      id: "005",
      number: "005",
      title: "GALLERY",
      image: galleryImage,
      href: "/gallery",
    },
    {
      id: "006",
      number: "006",
      title: "CONTACT",
      image: heroImage,
      href: "/contact",
    },
  ];

  // Horizontal scroll effect for expanded menu
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const percent = mouseX / bounds.width;

    const maxScroll = container.scrollWidth - bounds.width;
    const targetOffset = -maxScroll * percent;

    x.set(targetOffset);
  };

  // Navigate using useNavigate and close menu
  const handleItemClick = (href: string) => {
    if (isExpanded) onToggle();
    navigate(href);
    window.scrollTo(0, 0);
  };

  // Framer Motion variants for staggered letters hover effect
  const containerVariants = {
    hover: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0,
      },
    },
    initial: {},
  };

  const letterVariants = {
    initial: { y: 0, opacity: 1 },
    hover: {
      y: -8,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Split text into animated letters
  const renderStaggeredText = (text: string) => (
    <motion.div
      className="inline-block"
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <>
      {/* Bottom nav bar — always fixed in place */}
      <div className="fixed bottom-0 left-0 right-0 z-40 h-20 bg-background/90 backdrop-blur-md border-t border-border/50">
        <div className="h-full flex items-center justify-evenly select-none">
          {navigationItems.map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              <div
                key={item.id}
                className="text-center cursor-pointer"
                onClick={() => handleItemClick(item.href)}
              >
                <div
                  className={`text-sm tracking-widest mb-1 transition-colors duration-300 ${
                    isActive
                      ? "text-primary font-semibold border-b-2 border-primary pb-0.5"
                      : "text-foreground"
                  }`}
                >
                  {renderStaggeredText(item.title)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded menu overlay */}
      <div
        className={`fixed inset-x-0 bottom-20 z-50 bg-background shadow-xl transition-all duration-700 ease-in-out overflow-hidden ${
          isExpanded ? "h-[calc(80vh-5rem)] opacity-100" : "h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <button
              onClick={onToggle}
              className="text-foreground text-sm tracking-widest hover:text-primary transition-colors duration-300"
            >
              CLOSE
            </button>
            <div className="text-foreground font-light tracking-widest text-lg">
              BASHAR ART HOUZ
            </div>
            <button
              onClick={() => handleItemClick("/contact")}
              className="text-foreground text-sm tracking-widest hover:text-primary transition-colors duration-300"
            >
              CONTACTS
            </button>
          </div>

          {/* Horizontal Navigation */}
          <div
            className="flex-1 flex items-center px-[15vw] overflow-hidden relative"
            onMouseMove={handleMouseMove}
            ref={containerRef}
          >
            <motion.div className="flex gap-8" style={{ x: smoothX }}>
              {navigationItems.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                <div
                  key={item.id}
                  className={`flex-none w-[300px] group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                    isActive ? "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-lg p-1" : ""
                  }`}
                  onClick={() => handleItemClick(item.href)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Number and Title */}
                  <div className="text-center mb-4">
                    <div
                      className={`text-2xl font-light tracking-wider mb-2 transition-colors duration-300 ${
                        isActive || hoveredItem === item.id
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {item.number}
                    </div>
                    <div className="text-sm tracking-widest overflow-hidden">
                      <span
                        className={`inline-block transition-transform duration-500 ${
                          hoveredItem === item.id ? "translate-x-2" : ""
                        } ${isActive ? "text-primary font-semibold" : "text-foreground"}`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted group-hover:shadow-2xl transition-shadow duration-500">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredItem === item.id ? "scale-110 brightness-110" : ""
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent transition-opacity duration-500 ${
                        hoveredItem === item.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-foreground text-xs tracking-widest opacity-90">
                          EXPLORE {item.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </motion.div>
          </div>

          {/* Footer Info */}
          <div className="px-6 py-6 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-muted-foreground space-y-4 md:space-y-0">
              <div className="space-y-1">
                <div>BASHAR ART HOUZ</div>
                <div>WHERE ART MEETS PASSION, TRADITION MEETS INNOVATION</div>
                <div>STUDIO × CAFE × GALLERY</div>
              </div>
              <div className="space-y-1 text-right">
                <div>CONTACT@BASHARTHOUZ.COM</div>
                <div>FOLLOW US ON SOCIAL MEDIA</div>
                <div>© 2025 BASHAR ART HOUZ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalNavigation;