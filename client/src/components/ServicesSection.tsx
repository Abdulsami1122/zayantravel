"use client";

import Image from "next/image";
import { GraduationCap, Plane, FileText, BedDouble, ShieldCheck, CalendarCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

const VectorLogo = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full p-6 md:p-8" fill="white">
    {/* Globe */}
    <g transform="translate(100, 50) scale(1.4)">
      <circle cx="0" cy="0" r="20" fill="none" stroke="white" strokeWidth="2.5" />
      <ellipse cx="0" cy="0" rx="8" ry="20" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="M-20 0 L20 0" stroke="white" strokeWidth="1.5" />
      <path d="M-17 -10 Q0 -5 17 -10" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="M-17 10 Q0 5 17 10" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="M -8 -12 Q -3 -16 2 -8 T -3 5 Q -10 -5 -8 -12" fill="white" />
      <path d="M 5 0 Q 15 -3 10 8 T 3 12 Q -2 5 5 0" fill="white" />
    </g>

    {/* Left Suitcase */}
    <g transform="translate(42, 38)">
      <rect x="-8" y="-5" width="16" height="26" rx="2" fill="white" />
      <path d="M-4 -5 L-4 -12 L4 -12 L4 -5" fill="none" stroke="white" strokeWidth="2.5" />
      <rect x="-6" y="21" width="3" height="4" rx="1" fill="white" />
      <rect x="3" y="21" width="3" height="4" rx="1" fill="white" />
    </g>

    {/* Right Person & small case */}
    <g transform="translate(158, 38)">
      <circle cx="-6" cy="-14" r="4.5" fill="white" />
      <rect x="-9" y="-7" width="6" height="30" rx="1.5" fill="white" />
      <rect x="1" y="8" width="10" height="15" rx="1.5" fill="white" />
      <path d="M3 8 L3 3 L9 3 L9 8" fill="none" stroke="white" strokeWidth="1.5" />
    </g>

    {/* Text */}
    <text x="100" y="125" textAnchor="middle" fontSize="56" fontWeight="900" fontFamily="Arial, sans-serif" fill="white" letterSpacing="-1.5">Zayan</text>
    <text x="100" y="148" textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="1.5" fontFamily="Arial, sans-serif" fill="white">TRAVEL CONSULTANTS</text>
  </svg>
);

export default function ServicesPage() {
  const { settings } = useSettings();
  const displayLogo = settings?.logoUrl || "/zayan_logo_new.png";

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-[#f4f5f7] pt-10 text-[#1a1f2c] font-sans overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 mt-4 gap-x-12 gap-y-16">
          <motion.div 
            {...fadeUp}
            className="flex-1 text-left max-w-2xl"
          >
            <span className="inline-block text-sm uppercase tracking-[0.25em] font-extrabold text-[#1e293b] mb-6">
              OUR SERVICES
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] font-bold tracking-tight mb-8 text-[#0a1128]">
              Expert guidance,<br />built for success
            </h1>
            <p className="text-lg md:text-[1.15rem] text-[#475569] leading-relaxed max-w-xl">
              We offer a full range of travel and visa support services, including document preparation, appointments, reservations, and insurance guidance.
            </p>
          </motion.div>

          <div className="relative inline-flex items-center justify-center flex-shrink-0 pr-0 md:pr-16 lg:pr-24 group cursor-default w-full md:w-auto">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] md:w-[280px] md:h-[280px] rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border-[6px] border-slate-900 bg-slate-900 flex items-center justify-center"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <VectorLogo />
                </div>
              </motion.div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            { 
              title: "Visa Assistance", 
              description: "Expert guidance for smooth visa processing.", 
              icon: GraduationCap,
              iconColor: "text-blue-600",
              bgColor: "bg-blue-100"
            },
            { 
              title: "Ticket Reservations", 
              description: "Instant bookings on all major airlines.", 
              icon: Plane,
              iconColor: "text-sky-600",
              bgColor: "bg-sky-100"
            },
            { 
              title: "Hotel Bookings", 
              description: "Exclusive rates on premium accommodations.", 
              icon: BedDouble,
              iconColor: "text-amber-600",
              bgColor: "bg-amber-100"
            },
            { 
              title: "Travel Insurance", 
              description: "Comprehensive coverage for peace of mind.", 
              icon: ShieldCheck,
              iconColor: "text-red-600",
              bgColor: "bg-red-100"
            },
            { 
              title: "Online Forms Filling", 
              description: "Fast, accurate processing of applications.", 
              icon: FileText,
              iconColor: "text-slate-700",
              bgColor: "bg-slate-200"
            },
            { 
              title: "Online Appointments", 
              description: "Schedule consultations at your convenience.", 
              icon: CalendarCheck,
              iconColor: "text-indigo-600",
              bgColor: "bg-indigo-100"
            }
          ].map((service, index) => {
            const Icon = service.icon;
            return (
              <Link key={service.title} href="#contact" className="block h-full group">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative rounded-[1.5rem] p-6 sm:p-8 flex flex-col h-full bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-slate-200"
                >
                  <div className={`mb-6 inline-flex h-[60px] w-[60px] items-center justify-center rounded-2xl ${service.bgColor} ${service.iconColor} shadow-sm`}>
                    <Icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-[15px] leading-relaxed text-slate-600 mb-6 flex-grow">
                    {service.description}
                  </p>
                  <div className="flex items-center text-[15px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    Learn More <ChevronRight className="ml-1 w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* How We Work Section */}
      <section className="pt-12 pb-16 bg-white relative">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[13px] uppercase tracking-[0.25em] text-[#94a3b8] font-bold"
            >
              How we work
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-[2.5rem] font-bold text-[#0a1128] tracking-tight"
            >
              Simple process. Better outcomes.
            </motion.h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Consultation", desc: "Expert assessment of your profile, eligibility, and immigration goals.", img: "/consultation_v2.png" },
              { step: "02", title: "Planning", desc: "Strategizing secure pathways and precise document collection.", img: "/planning_new.png" },
              { step: "03", title: "Submission", desc: "Flawless filing of your application safely to the authorities.", img: "/submission_new.png" },
              { step: "04", title: "Approval", desc: "Receiving your final visa and preparing for your global journey.", img: "/tourist_visa.png" }
            ].map((item, index) => (
              <Link key={item.step} href="#contact" className="block">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group relative h-[300px] w-full overflow-hidden rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] cursor-pointer"
                >
                <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-[#0a1128]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute top-5 left-5 inline-flex h-[40px] w-[40px] text-sm items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold shadow-sm z-10 transition-colors duration-300 group-hover:bg-[#3b82f6] group-hover:border-transparent">
                  {item.step}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                    <p className="text-[14px] leading-relaxed text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
