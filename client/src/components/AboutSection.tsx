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
      <section className="pt-24 pb-8 bg-[#f4f5f7]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-x-12 gap-y-8">
            <motion.div
              initial="initial"
              animate="animate"
              className="flex-1 text-left max-w-2xl"
              variants={{ animate: { transition: { staggerChildren: 0.15 } } }}
            >
              <motion.span variants={fadeIn} className="inline-block text-sm uppercase tracking-[0.25em] font-extrabold text-[#1e293b] mb-6">
                ABOUT Zayan Travel Consultants
              </motion.span>
              <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] font-bold tracking-tight mb-8 text-[#0a1128]">
                Your trusted path,<br />to a global future
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg md:text-[1.15rem] text-[#475569] leading-relaxed max-w-xl">
                We make global immigration simpler with trusted visa guidance, expert document support, and a people-first process helping thousands worldwide.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative inline-flex items-center justify-center flex-shrink-0 group cursor-default"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden shadow-2xl relative z-10 border-[6px] border-white"
              >
                <img
                  src="/passports.png"
                  alt="Our Team"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pt-20 pb-10 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-16 lg:grid-cols-[0.9fr_0.9fr] items-center relative">
          <motion.div variants={fadeIn} initial="initial" animate="animate" className="space-y-6 relative z-10">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400 font-semibold">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15]">Focused on real results for families and professionals.</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Since 2009, our team has supported thousands of clients with every type of visa journey. We combine personal care, legal knowledge, and practical support so you can move forward with confidence.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 pt-4">
              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="relative group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-xl hover:border-rose-300 transition-all duration-300 overflow-hidden">
                <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] group-hover:opacity-25 transition-all transform group-hover:scale-110 group-hover:rotate-12 duration-500 text-rose-500">
                  <Heart size={80} className="group-hover:fill-rose-500/20 transition-all duration-500" />
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-[0.24em] font-semibold mb-3">Trusted by</p>
                <p className="text-4xl md:text-5xl font-black text-slate-900">10,000+</p>
                <p className="mt-2 text-slate-600 font-medium">clients worldwide</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="relative group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden">
                <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:rotate-12 duration-500 text-blue-600">
                  <TrendingUp size={80} />
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-[0.24em] font-semibold mb-3">Success rate</p>
                <p className="text-4xl md:text-5xl font-black text-slate-900">98%</p>
                <p className="mt-2 text-slate-600 font-medium">approved applications</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative group rounded-[2.5rem] bg-slate-900 p-10 md:p-12 text-white shadow-2xl overflow-hidden border border-slate-800">
            {/* Beautiful gradient blurs mapping */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/20 rounded-full blur-[80px] group-hover:bg-emerald-500/30 transition-colors duration-700 select-none pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-colors duration-700 select-none pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs uppercase tracking-[0.24em] text-emerald-300 font-semibold">Why choose us</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold leading-tight">Personalized support at every step.</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                We listen to your goals, review your documents carefully, and keep you informed throughout the process so your visa journey is clear and stress-free.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col items-start gap-4 shadow-lg backdrop-blur-sm">
                  <div className="p-2.5 rounded-xl bg-emerald-400/20 text-emerald-400 border border-emerald-400/20">
                    <Heart size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-200/70 font-bold mb-1.5">Dedicated team</p>
                    <p className="text-base font-semibold text-white">Experienced specialists</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col items-start gap-4 shadow-lg backdrop-blur-sm">
                  <div className="p-2.5 rounded-xl bg-blue-400/20 text-blue-400 border border-blue-400/20">
                    <ShieldCheck size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-blue-200/70 font-bold mb-1.5">Clear process</p>
                    <p className="text-base font-semibold text-white">Easy steps to approval</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Testimonials Section */}
      <section className="pt-6 pb-20 bg-slate-50 overflow-hidden border-t border-slate-100">
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
