'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

type Country = { name: string; image: string; flag: string };

const MobileDestinationSlider = ({ destinations }: { destinations: Country[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [destinations.length]);

  return (
    <div className="relative w-full overflow-hidden h-[540px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full flex flex-col items-center"
        >
          {/* Main City Image */}
          <div className="w-full h-[320px] relative rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] mb-6 border border-slate-100">
            <Image
              src={destinations[currentIndex].image}
              alt={destinations[currentIndex].name}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-3xl font-bold text-white tracking-tight drop-shadow-md text-center">
                {destinations[currentIndex].name}
              </h3>
            </div>
          </div>
          
          {/* Flag Card */}
          <div className="w-[200px] bg-white p-4 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center">
            <div className="w-full aspect-video mb-3 relative overflow-hidden rounded-lg bg-slate-100 border border-slate-100">
              <Image
                src={destinations[currentIndex].flag}
                alt={`${destinations[currentIndex].name} flag`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <h4 className="font-semibold text-slate-900 text-center text-sm">
              {destinations[currentIndex].name}
            </h4>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const DestinationsSection = () => {
  const [carouselDuration, setCarouselDuration] = useState<number>(18);

  useEffect(() => {
    const updateDuration = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      // Faster on small screens
      setCarouselDuration(w < 640 ? 12 : 18);
    };
    updateDuration();
    window.addEventListener('resize', updateDuration);
    return () => window.removeEventListener('resize', updateDuration);
  }, []);

  const popularDestinations: Country[] = [
    { name: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop', flag: 'https://flagcdn.com/gb.svg' },
    { name: 'United States', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop', flag: 'https://flagcdn.com/us.svg' },
    { name: 'Turkey', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop', flag: 'https://flagcdn.com/tr.svg' },
    { name: 'Dubai', image: 'https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg?auto=compress&cs=tinysrgb&w=800', flag: 'https://flagcdn.com/ae.svg' },
    { name: 'Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop', flag: 'https://flagcdn.com/th.svg' },
    { name: 'Spain', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=800&auto=format&fit=crop', flag: 'https://flagcdn.com/es.svg' },
  ];

  return (
    <section id="destinations" className="pt-8 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Popular Visa Destinations
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We help you get visas for the most sought-after destinations worldwide
          </p>
        </motion.div>

        <div className="hidden md:block overflow-hidden relative mb-8 pt-4">
          <motion.div
            className="flex gap-6 px-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: carouselDuration, repeat: Infinity }}
          >
            {[...popularDestinations, ...popularDestinations].map((country, index) => (
              <div
                key={`${country.name}-img-${index}`}
                className="min-w-[320px] w-[320px] group relative h-[320px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 border border-slate-100"
              >
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={country.image}
                    alt={country.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                </div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-md">
                      {country.name}
                    </h3>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-sm font-semibold text-amber-400">Explore Visas</span>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="hidden md:block overflow-hidden relative">
          <motion.div
            className="flex gap-6 px-3"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: carouselDuration, repeat: Infinity }}
          >
            {[...popularDestinations, ...popularDestinations].map((country, index) => (
              <div
                key={`${country.name}-flag-${index}`}
                className="min-w-[260px] w-[260px] bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-200 hover:border-slate-300 cursor-pointer group"
              >
                <div className="aspect-video mb-4 relative overflow-hidden rounded-lg bg-slate-100">
                  <Image
                    src={country.flag}
                    alt={country.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <h3 className="font-semibold text-slate-900 text-center group-hover:text-slate-700 transition-colors">
                  {country.name}
                </h3>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="md:hidden w-full px-2 mt-4">
          <MobileDestinationSlider destinations={popularDestinations} />
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
