"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Award, TrendingUp, Star } from "lucide-react";
import Link from 'next/link';

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="pt-10 pb-20 bg-[#f8fafc] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-12 lg:gap-16">
            
            {/* ROW 1: About & Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Top Left: About Text */}
              <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
                <span className="inline-block text-[12px] font-bold text-slate-500 mb-4 tracking-[0.2em] uppercase">
                  About Zayan Travel Consultants
                </span>
                <h2 className="text-4xl md:text-[3.25rem] leading-[1.1] font-bold text-[#0a1128] mb-6">
                  Your trusted path,<br/>to a global future
                </h2>
                <p className="text-[15px] text-slate-500 leading-relaxed pr-4 max-w-[90%]">
                  We make global immigration simpler with trusted visa guidance, expert document support, and a people-first process helping thousands worldwide.
                </p>
              </motion.div>
              
              {/* Top Right: Rectangle Image */}
              <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} className="flex justify-center w-full">
                <div className="relative w-[280px] h-[200px] md:w-[340px] md:h-[260px] rounded-[1.5rem] overflow-hidden shadow-xl border-[6px] border-white z-10 bg-slate-200">
                  <img src="/passports.png" alt="Passports" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>

            {/* ROW 2: Our Story & Dark Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-end">
              
              {/* Bottom Left: Our Story Text & Stats */}
              <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
                <span className="inline-block text-[12px] font-bold text-slate-400 mb-4 tracking-[0.2em] uppercase">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-[2.5rem] leading-[1.2] font-bold text-[#0a1128] mb-6 max-w-[90%]">
                  Focused on real results for families and professionals.
                </h2>
                <p className="text-[15px] text-slate-500 leading-relaxed max-w-[90%] mb-10">
                  Since 2009, our team has supported thousands of clients with every type of visa journey. We combine personal care, legal knowledge, and practical support so you can move forward with confidence.
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 shadow-sm relative overflow-hidden group">
                    <Heart className="absolute -top-4 -right-4 w-24 h-24 text-red-50 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                    <div className="relative z-10">
                      <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 mb-1 sm:mb-2 tracking-wider uppercase">Trusted By</p>
                      <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-none mb-1 sm:mb-2">10,000+</p>
                      <p className="text-[11px] sm:text-[13px] text-slate-500 font-medium">clients worldwide</p>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 shadow-sm relative overflow-hidden group">
                    <TrendingUp className="absolute -top-4 -right-4 w-24 h-24 text-blue-50 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                    <div className="relative z-10">
                      <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 mb-1 sm:mb-2 tracking-wider uppercase">Success Rate</p>
                      <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-none mb-1 sm:mb-2">98%</p>
                      <p className="text-[11px] sm:text-[13px] text-slate-500 font-medium leading-tight">approved applications</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Right: Dark Card */}
              <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
                <div className="relative w-full bg-[#0a1128] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-8 md:p-10">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 mb-8 border border-emerald-500/30 rounded-full px-4 py-1.5 bg-[#0a1128]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] font-bold tracking-[0.15em] text-emerald-500 uppercase">Why Choose Us</span>
                  </div>

                  {/* Heading */}
                  <h3 className="text-[1.75rem] md:text-[2rem] font-bold text-white mb-6 leading-[1.2]">
                    Personalized support at every step.
                  </h3>

                  {/* Paragraph */}
                  <p className="text-[14.5px] text-slate-300 leading-relaxed mb-10">
                    We listen to your goals, review your documents carefully, and keep you informed throughout the process so your visa journey is clear and stress-free.
                  </p>

                  {/* Two Inner Cards */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    
                    {/* Dedicated Team */}
                    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 flex flex-col hover:border-slate-700 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
                        <Heart className="w-4 h-4 text-emerald-500" />
                      </div>
                      <h4 className="text-[10px] font-bold tracking-[0.1em] text-emerald-500 uppercase mb-2">Dedicated Team</h4>
                      <p className="text-[13px] font-semibold text-white">Experienced specialists</p>
                    </div>

                    {/* Clear Process */}
                    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 flex flex-col hover:border-slate-700 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                        <ShieldCheck className="w-4 h-4 text-blue-500" />
                      </div>
                      <h4 className="text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase mb-2">Clear Process</h4>
                      <p className="text-[13px] font-semibold text-white">Easy steps to approval</p>
                    </div>

                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>



      {/* Testimonials Section */}
      <section className="pt-6 pb-12 bg-slate-50 overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 font-bold text-xs tracking-wider uppercase mb-4 shadow-sm border border-blue-200/50">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Client Testimonial
          </div>
          <h2 className="text-[36px] md:text-[46px] font-black text-[#0a1128] tracking-tight">
            What Our Client Says
          </h2>
        </div>

        <div className="flex overflow-hidden relative group w-full">
          <motion.div
            className="flex gap-6 px-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          >
            {[
              {
                name: "Sarah Jenkins",
                text: "The team made my student visa process incredibly smooth. Their attention to detail meant my application was approved in record time without any hassle.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop"
              },
              {
                name: "David Chen",
                text: "I was overwhelmed by the immigration paperwork for my work visa. Zayan Travel Consultants handled everything professionally and kept me informed at every step.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop"
              },
              {
                name: "Elena Rodriguez",
                text: "Thanks to their expert guidance, my family and I successfully secured our permanent residency. Truly a life-changing service that I highly recommend.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop"
              },
              {
                name: "Michael O'Connor",
                text: "Outstanding consultation! They mapped out clear pathways for my business visa and provided honest, transparent advice avoiding common pitfalls.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop"
              },
              {
                name: "Aisha Patel",
                text: "Professional from start to finish. They practically held my hand through the tourist visa process. I couldn't have asked for a better experience.",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop"
              },
              // Duplicating the array items seamlessly to create the infinite loop
              {
                name: "Sarah Jenkins",
                text: "The team made my student visa process incredibly smooth. Their attention to detail meant my application was approved in record time without any hassle.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop"
              },
              {
                name: "David Chen",
                text: "I was overwhelmed by the immigration paperwork for my work visa. Zayan Travel Consultants handled everything professionally and kept me informed at every step.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop"
              },
              {
                name: "Elena Rodriguez",
                text: "Thanks to their expert guidance, my family and I successfully secured our permanent residency. Truly a life-changing service that I highly recommend.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop"
              },
              {
                name: "Michael O'Connor",
                text: "Outstanding consultation! They mapped out clear pathways for my business visa and provided honest, transparent advice avoiding common pitfalls.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop"
              },
              {
                name: "Aisha Patel",
                text: "Professional from start to finish. They practically held my hand through the tourist visa process. I couldn't have asked for a better experience.",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop"
              }
            ].map((testimonial, i) => (
              <div key={i} className="flex-shrink-0 w-[340px] md:w-[600px] bg-white rounded-[2rem] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col md:flex-row gap-6 group">
                <div className="w-full md:w-1/2 h-[220px] md:h-auto md:min-h-[250px] relative rounded-[1.5rem] overflow-hidden">
                  <img src={testimonial.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={testimonial.name} />
                </div>
                <div className="w-full md:w-1/2 py-2 md:py-6 px-4 md:px-0 md:pr-6 flex flex-col justify-center">
                  <div className="mb-3">
                    <h4 className="font-bold text-slate-900 text-[18px] md:text-xl">{testimonial.name}</h4>
                    <p className="text-sm font-semibold text-blue-500">Satisfied Client</p>
                  </div>
                  <div className="flex gap-1 mb-4 text-amber-400">
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[14px] md:text-[15px] italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
