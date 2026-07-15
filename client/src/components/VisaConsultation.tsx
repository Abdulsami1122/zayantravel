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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Why Choose Zayan Travel Consultants
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We combine expertise, personalized service, and proven success rates to make your visa journey smooth and stress-free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Background glowing elements for added premium feel */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <ServiceCard
              index={0}
              icon={<Globe2 className="w-8 h-8" />}
              title="Personalized Guidance"
              description="One-on-one sessions tailored to your specific travel and documentation needs. Our experts understand every case is unique."
            />
            <ServiceCard
              index={1}
              icon={<FileCheck2 className="w-8 h-8" />}
              title="Complete File Preparation"
              description="From visa forms to financial documents, everything is reviewed, organized, and prepared to perfection by our team."
            />
            <ServiceCard
              index={2}
              icon={<Users className="w-8 h-8" />}
              title="Family & Group Support"
              description="Specialized support for couples, families, and group applications ensuring a smooth process for everyone involved."
            />
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

const ServiceCard = ({ icon, title, description, index = 0 }: { icon: React.ReactNode; title: string; description: string; index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
    whileHover={{ y: -12 }}
    className="relative bg-white p-8 sm:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 border border-slate-100 hover:border-slate-200 h-full overflow-hidden group z-10"
  >
    {/* Decorative background flares on hover */}
    <div className="absolute -right-20 -top-20 w-48 h-48 bg-slate-50 group-hover:bg-blue-50/80 rounded-full blur-3xl transition-colors duration-700 -z-10" />
    <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-slate-50 group-hover:bg-amber-50/80 rounded-full blur-3xl transition-colors duration-700 -z-10" />

    <div className="w-16 h-16 bg-slate-50/80 border border-slate-100 rounded-2xl flex items-center justify-center mb-8 text-slate-600 group-hover:bg-slate-900 group-hover:text-white group-hover:-rotate-3 group-hover:scale-110 transition-all duration-500 shadow-sm relative z-20">
      <div className="absolute inset-0 rounded-2xl bg-slate-900 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500 z-10"></div>
      <div className="relative z-20">
        {icon}
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-slate-800 transition-colors duration-300 relative z-20">{title}</h3>
    <p className="text-slate-600/90 leading-relaxed text-base relative z-20">{description}</p>

    {/* Bottom decorative animated underline */}
    <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-slate-800 to-slate-600 group-hover:w-full transition-all duration-700 ease-in-out" />
  </motion.div>
);

export default VisaConsultation;
