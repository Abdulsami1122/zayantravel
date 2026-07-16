'use client';

import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AssessmentForm from './AssessmentForm';
import StarButton from '@/components/ui/star-button';
import {
  Globe2,
  FileCheck2,
  Users,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Shield,
  Award,
  TrendingUp,
  Phone,
  Upload,
  Loader2
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchAdminComments, fetchCustomerSubmission } from '@/redux/slices/formSubmission/formSubmissionSlice';

type Country = { name: string; image: string; flag: string };
type AdminComment = {
  documentId: string;
  documentName: string;
  comment: string;
  createdAt: string;
};

const VisaConsultation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [hasViewedComments, setHasViewedComments] = useState(false);
  const [reuploadingDocId, setReuploadingDocId] = useState<string | null>(null);
  const [reuploadFiles, setReuploadFiles] = useState<{ [key: string]: File }>({});
  const typedEl = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);



  useEffect(() => {
    if (!typedEl.current) return;

    const options = {
      strings: [
        "Welcome to<br><span class=\"block mt-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300\">Zayan Consultants</span>"
      ],
      startDelay: 300,
      typeSpeed: 40,
      backSpeed: 40,
      backDelay: 5000,
      showCursor: false,
      smartBackspace: true,
      loop: true,
    };

    const typed = new Typed(typedEl.current, options);

    return () => {
      // Destroy Typed instance during cleanup to prevent memory leaks
      typed.destroy();
    };
  }, []);



  const { user } = useSelector((state: RootState) => state.auth) as { user: { email: string; name: string } | null };
  const { adminComments, currentSubmission } = useSelector((state: RootState) => state.formSubmission);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchAdminComments(user.email));
    }
  }, [user?.email, dispatch]);

  const prevCommentsLength = useRef(adminComments.length);

  // Reset viewed status only if NEW comments arrive
  useEffect(() => {
    if (adminComments.length > prevCommentsLength.current) {
      setHasViewedComments(false);
    }
    prevCommentsLength.current = adminComments.length;
  }, [adminComments.length]);

  const groupCommentsByDocument = (comments: AdminComment[]) => {
    const grouped: { [key: string]: { name: string; comments: AdminComment[] } } = {};
    comments.forEach((c) => {
      const id = c.documentId;
      if (!grouped[id]) {
        grouped[id] = { name: c.documentName, comments: [] };
      }
      grouped[id].comments.push(c);
    });
    return grouped;
  };

  const handleReuploadFile = (docId: string, file: File) => {
    setReuploadFiles(prev => ({ ...prev, [docId]: file }));
  };

  const handleReuploadSubmit = async (docId: string) => {
    const file = reuploadFiles[docId];
    if (!file) {
      console.error('No file selected for re-upload');
      return;
    }

    console.log('🚀 Starting re-upload for document:', docId);
    console.log('📄 File details:', {
      name: file.name,
      size: file.size,
      type: file.type
    });
    console.log('👤 User logged in:', !!user);
    console.log('📧 User email:', user?.email);

    setReuploadingDocId(docId);
    console.log('⏳ Set reuploading state for document:', docId);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentId', docId);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/reupload-document`;
      console.log('🔗 NEXT_PUBLIC_API_URL environment variable:', process.env.NEXT_PUBLIC_API_URL);
      console.log('🌐 Sending request to:', apiUrl);
      console.log('📡 Full API URL constructed:', apiUrl);
      console.log('🔑 Token exists:', !!token);
      console.log('📦 FormData contents:');
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`- ${key}: ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`- ${key}: ${value}`);
        }
      }

      console.log('📤 Making fetch request...');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      console.log('📥 Response status:', response.status);
      console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`Failed to re-upload document: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Response body:', result);
      console.log('🎉 Re-upload success:', result);

      // Clear the re-upload file for this document
      setReuploadFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[docId];
        return newFiles;
      });

      // Refresh both admin comments and current submission to show updated image
      if (user?.email) {
        console.log('🔄 Refreshing admin comments for user:', user.email);
        dispatch(fetchAdminComments(user.email));

        // Also refresh the current submission to update the image URLs
        console.log('🔄 Refreshing current submission for user:', user.email);
        dispatch(fetchCustomerSubmission(user.email));

        console.log('⏳ Waiting for state updates...');
        // Add a small delay to ensure state updates are processed
        setTimeout(() => {
          console.log('✅ State refresh completed - image should be updated now');
        }, 1000);
      }

      alert('Document re-uploaded successfully!');
    } catch (error) {
      console.error('Re-upload error:', error);
      alert(`Failed to re-upload document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setReuploadingDocId(null);
    }
  };

  const stats = [
    { value: '10,000+', label: 'Successful Applications', icon: <CheckCircle2 className="w-6 h-6" /> },
    { value: '98%', label: 'Success Rate', icon: <TrendingUp className="w-6 h-6" /> },
    { value: '15+', label: 'Years Experience', icon: <Award className="w-6 h-6" /> },
    { value: '24/7', label: 'Support Available', icon: <Shield className="w-6 h-6" /> },
  ];



  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section - Modern Design */}
      <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <video
          className="absolute -top-[20px] left-0 w-full h-[calc(100%+40px)] object-cover z-0"
          src="/zayanbanner.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-slate-900/70 z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">Trusted Visa Consultants Since 2009</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[220px]">
              <span ref={typedEl}></span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
              We offer a full range of travel and visa support services, including document preparation, appointments, reservations, and insurance guidance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="#contact">
                <StarButton>
                  Book an Appointment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </StarButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative bg-white border-b border-slate-100 overflow-hidden">
        {/* Subtle background gradient to make it look "light" and elegant */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative flex flex-col items-center p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-200 hover:border-slate-300 transition-all duration-500"
              >
                {/* Light color glow on hover behind the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-amber-50/60 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />

                <div className="relative z-20 inline-flex items-center justify-center w-20 h-20 bg-slate-50 border border-blue-50 rounded-2xl mb-6 text-slate-600 group-hover:bg-white group-hover:text-amber-600 group-hover:border-amber-200 group-hover:shadow-md group-hover:-translate-y-2 group-hover:rotate-3 transition-all duration-500">
                  {/* Subtle inner glow for icon container */}
                  <div className="absolute inset-0 bg-amber-400 opacity-0 group-hover:opacity-10 blur-xl rounded-2xl transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    {stat.icon}
                  </div>
                </div>

                <div className="relative z-20 text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight group-hover:text-slate-800 transition-colors">
                  {stat.value}
                </div>
                <div className="relative z-20 text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider group-hover:text-amber-600 transition-colors duration-300 text-center">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Why Choose Zayan Section */}
      <section className="pt-10 pb-10 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[2.5rem] font-bold text-[#0a1128] mb-4">Why Choose Zayan Travel Consultants</h2>
            <div className="w-full flex justify-center mb-6">
              <div className="w-[80%] max-w-lg h-[2px] bg-gradient-to-r from-transparent via-[#c19d60] to-transparent"></div>
            </div>
            <p className="text-[#475569] max-w-2xl mx-auto text-[17px] leading-relaxed">
              We combine expertise, personalized service, and proven success rates to make your visa journey smooth and stress-free.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pb-10">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-8 border-t-[4px] border-[#c19d60] shadow-[0_6px_0_-1px_#ffffff,0_7px_0_-1px_#cbd5e1,0_12px_0_-2px_#ffffff,0_13px_0_-2px_#cbd5e1,0_20px_25px_-5px_rgba(0,0,0,0.1)] text-center relative hover:-translate-y-1 transition-transform duration-300"
            >
              <svg width="70" height="70" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 drop-shadow-md">
                <path d="M32 2 L36 12 L32 10 L28 12 Z" fill="#c19d60" />
                <path d="M32 62 L36 52 L32 54 L28 52 Z" fill="#c19d60" />
                <path d="M2 32 L12 28 L10 32 L12 36 Z" fill="#c19d60" />
                <path d="M62 32 L52 28 L54 32 L52 36 Z" fill="#c19d60" />
                <circle cx="32" cy="32" r="20" fill="#e2e8f0" stroke="#0a1128" strokeWidth="2.5"/>
                <path d="M28 14 C35 12, 40 18, 38 24 C36 30, 44 32, 46 38 C48 44, 40 50, 32 50 C24 50, 20 42, 22 36 C24 30, 18 24, 22 18 C26 12, 28 14, 28 14 Z" fill="#0a1128"/>
                <path d="M42 16 C46 16, 48 20, 46 24 C44 28, 40 24, 42 16 Z" fill="#c19d60"/>
                <circle cx="32" cy="32" r="24" stroke="#0a1128" strokeWidth="2" strokeDasharray="5 5"/>
              </svg>
              <h3 className="text-[1.35rem] font-bold text-[#0a1128] mb-3">Personalized Guidance</h3>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                One-on-one sessions tailored to your specific travel and documentation needs. Our experts understand every case is unique.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-8 border-t-[4px] border-[#c19d60] shadow-[0_6px_0_-1px_#ffffff,0_7px_0_-1px_#cbd5e1,0_12px_0_-2px_#ffffff,0_13px_0_-2px_#cbd5e1,0_20px_25px_-5px_rgba(0,0,0,0.1)] text-center relative hover:-translate-y-1 transition-transform duration-300"
            >
              <svg width="70" height="70" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 drop-shadow-md">
                <rect x="20" y="10" width="30" height="40" rx="3" fill="#cbd5e1" stroke="#0a1128" strokeWidth="2.5"/>
                <rect x="14" y="16" width="30" height="40" rx="3" fill="#f8fafc" stroke="#0a1128" strokeWidth="2.5"/>
                <line x1="20" y1="26" x2="38" y2="26" stroke="#0a1128" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="20" y1="32" x2="34" y2="32" stroke="#0a1128" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="20" y1="38" x2="38" y2="38" stroke="#0a1128" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="20" y1="44" x2="28" y2="44" stroke="#0a1128" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M40 54 L37 45 L45 45 L42 54 L39.5 52 Z" fill="#c19d60" stroke="#0a1128" strokeWidth="1.5"/>
                <circle cx="41" cy="43" r="7" fill="#c19d60" stroke="#0a1128" strokeWidth="2.5"/>
                <circle cx="41" cy="43" r="3" fill="#f8fafc"/>
              </svg>
              <h3 className="text-[1.35rem] font-bold text-[#0a1128] mb-3">Complete File Preparation</h3>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                From visa forms to financial documents, everything is reviewed, organized, and prepared to perfection by our team.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-8 border-t-[4px] border-[#c19d60] shadow-[0_6px_0_-1px_#ffffff,0_7px_0_-1px_#cbd5e1,0_12px_0_-2px_#ffffff,0_13px_0_-2px_#cbd5e1,0_20px_25px_-5px_rgba(0,0,0,0.1)] text-center relative hover:-translate-y-1 transition-transform duration-300"
            >
              <svg width="70" height="70" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 drop-shadow-md">
                <circle cx="20" cy="22" r="5" fill="#c19d60" stroke="#0a1128" strokeWidth="2.5"/>
                <path d="M12 38 C12 30, 28 30, 28 38" fill="#c19d60" stroke="#0a1128" strokeWidth="2.5"/>
                <circle cx="44" cy="22" r="5" fill="#94a3b8" stroke="#0a1128" strokeWidth="2.5"/>
                <path d="M36 38 C36 30, 52 30, 52 38" fill="#94a3b8" stroke="#0a1128" strokeWidth="2.5"/>
                <circle cx="32" cy="28" r="6" fill="#7dd3fc" stroke="#0a1128" strokeWidth="2.5"/>
                <path d="M22 46 C22 36, 42 36, 42 46 V50 H22 V46 Z" fill="#7dd3fc" stroke="#0a1128" strokeWidth="2.5"/>
                <circle cx="20" cy="42" r="4" fill="#fcd34d" stroke="#0a1128" strokeWidth="2.5"/>
                <path d="M14 54 C14 48, 26 48, 26 54 V56 H14 V54 Z" fill="#fcd34d" stroke="#0a1128" strokeWidth="2.5"/>
                <circle cx="44" cy="42" r="4" fill="#86efac" stroke="#0a1128" strokeWidth="2.5"/>
                <path d="M38 54 C38 48, 50 48, 50 54 V56 H38 V54 Z" fill="#86efac" stroke="#0a1128" strokeWidth="2.5"/>
              </svg>
              <h3 className="text-[1.35rem] font-bold text-[#0a1128] mb-3">Family & Group Support</h3>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                Specialized support for couples, families, and group applications ensuring a smooth process for everyone involved.
              </p>
            </motion.div>
          </div>
        </div>
      </section>










      <AssessmentForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setPreviewImageUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewImageUrl(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 text-slate-900 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white shadow-lg transition-all duration-300"
              >
                <span className="text-xl font-bold">✕</span>
              </button>

              <div className="relative w-full h-[80vh] bg-slate-50">
                <Image
                  src={previewImageUrl}
                  alt="Document Preview"
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



export default VisaConsultation;
