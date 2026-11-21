"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);
type ImageSource = Parameters<typeof builder.image>[0];

interface SchoolInfo { admissionsOpen?: boolean; newSessionStartDate?: string; schoolLogo?: ImageSource; motto?: string; address?: string; timings?: string; publicPhone?: string; publicEmail?: string; udiseCode?: string; }
interface Notice { _id?: string; date?: string; title?: string; content?: string; isUrgent?: boolean; category?: string; image?: ImageSource; imageUrl?: string; }
interface GalleryItem { _id: string; title?: string; image: ImageSource; category?: string; }
interface Admission { _id?: string; classLevel: string; admissionFee?: number; monthlyTuition?: number; }
interface Event { _id?: string; title: string; date: string; description?: string; category?: string; isUpcoming?: boolean; image?: ImageSource; imageUrl?: string; }
interface Faculty { _id?: string; name: string; role: string; bio?: string; image?: ImageSource; }
interface Achievement { _id?: string; title: string; description?: string; category?: string; image?: ImageSource; }
interface CalendarItem { _id?: string; title: string; date: string; type: string; }
interface FAQ { _id?: string; question: string; answer: string; }

const urlFor = (source: ImageSource) => builder.image(source);

const navLinks = [
  ["Home", "#home"], ["About", "#about"], ["Academics", "#academics"],
  ["Campus Life", "#campus-life"], ["Admission", "#admission-process"],
  ["Events", "#events"], ["Facilities", "#facilities"], ["Contact", "#contact"],
];

const fallbackClassFees: Record<string, { admission: number; tuition: number }> = {
  "Nursery": { admission: 1500, tuition: 700 }, "LKG": { admission: 1500, tuition: 700 }, "UKG": { admission: 1500, tuition: 700 },
  "Class 1": { admission: 1800, tuition: 850 }, "Class 2": { admission: 1800, tuition: 850 }, "Class 3": { admission: 2000, tuition: 900 },
  "Class 4": { admission: 2000, tuition: 950 }, "Class 5": { admission: 2200, tuition: 1000 }, "Class 6": { admission: 2500, tuition: 1100 },
  "Class 7": { admission: 2500, tuition: 1150 }, "Class 8": { admission: 2800, tuition: 1200 },
};

const uniformSizes = [16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42];
const sockSizes = [{ size: "2no", cost: 30 }, { size: "3no", cost: 40 }, { size: "4no", cost: 50 }, { size: "5no", cost: 60 }, { size: "6no", cost: 70 }, { size: "7no", cost: 80 }];
const fallbackVanRoutes = [{ name: "Hatya", cost: 500 }, { name: "Local", cost: 400 }, { name: "Sripur", cost: 600 }, { name: "Bhagaiya", cost: 550 }, { name: "Sahibganj Town", cost: 700 }];

const fallbackNotices: Notice[] = [
  { date: "15 MAR 2025", title: "New Academic Session Begins", content: "The new academic session for 2025-26 will commence on 16th March. All students must report in their new uniforms.", isUrgent: true, category: "General", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" },
  { date: "10 MAR 2025", title: "Final Evaluation Results Declared", content: "Results for the final evaluation are now available. Parents can collect report cards from the class teachers.", category: "Examination", imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop" },
  { date: "05 MAR 2025", title: "Parent-Teacher Meeting (PTM)", content: "A mandatory PTM is scheduled for 10th March to discuss student progress, upcoming academic goals, and the new curriculum.", category: "General", imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop" },
  { date: "28 FEB 2025", title: "Holi Holiday Announcement", content: "The school will remain closed from 13th to 15th March on account of Holi. Regular classes will resume on 16th March.", category: "Holiday", imageUrl: "https://images.unsplash.com/photo-1526634622266-7f6c99e7ee5c?q=80&w=800&auto=format&fit=crop" },
];

const fallbackEvents: Event[] = [
  { title: "Annual Day & Cultural Function", date: "25 APR 2025", description: "A grand celebration of our students' talents in dance, music, drama, and art.", category: "Cultural", isUpcoming: true, imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
  { title: "Inter-House Science Exhibition", date: "10 MAY 2025", description: "Students showcase their innovative science projects, working models, and robotics.", category: "Academic", isUpcoming: true, imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop" },
  { title: "Summer Yoga & Wellness Camp", date: "01 JUN 2025", description: "A week-long morning yoga camp for students to promote physical and mental well-being.", category: "Sports", isUpcoming: true, imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop" },
];

const fallbackFaculty: Faculty[] = [
  { name: "Boniface Kisku", role: "Secretary", bio: "Dedicated to providing an environment where every child discovers their unique strengths.", image: undefined },
  { name: "Benjamin Kisku", role: "President", bio: "Guiding the school with a vision for holistic education and moral values.", image: undefined },
  { name: "Rina Jaiswal", role: "Principal", bio: "Committed to academic excellence and the overall welfare of our students.", image: undefined },
  { name: "Nirmal Tudu", role: "Wise Principal", bio: "Bringing wisdom and compassionate leadership to our academic community.", image: undefined },
];

const fallbackAchievements: Achievement[] = [
  { title: "District Level Kabaddi Champions", description: "Our school Kabaddi team brought home the 1st place trophy in the Sahibganj district championship.", category: "Sports" },
  { title: "Inter-School Science Quiz Winners", description: "Class 8 students secured 1st place in the regional science quiz for their innovative solar model.", category: "Academic" },
  { title: "Best Cultural Performance Award", description: "Awarded for our spectacular tribal dance performance at the Jharkhand State Cultural Fest.", category: "Cultural" },
];

const fallbackCalendar: CalendarItem[] = [
  { title: "New Session Begins", date: "16 MAR 2025", type: "Function" },
  { title: "Holi Holidays", date: "13-15 MAR 2025", type: "Holiday" },
  { title: "Parent-Teacher Meeting", date: "10 MAR 2025", type: "Meeting" },
  { title: "Annual Day Celebration", date: "25 APR 2025", type: "Function" },
  { title: "Mid-Term Exams", date: "15-20 JUL 2025", type: "Exam" },
];

const fallbackFaqs: FAQ[] = [
  { question: "What is the admission process?", answer: "Visit the school office to collect the form. Nursery requires Child's & Parents' Aadhaar. Transfer students need an SLC." },
  { question: "What are the school timings?", answer: "The school operates from Monday to Saturday, 8:00 AM to 2:00 PM." },
  { question: "Do you provide school transport?", answer: "Yes, we have a reliable van facility covering Hatya, Local, Sripur, Bhagaiya, and Sahibganj Town." },
  { question: "Are uniforms and books sold at the school?", answer: "Yes, uniforms, ties, belts, socks, copies, and diaries are sold at the school shop. Shoes must be purchased from the open market." },
  { question: "Is there an online payment option?", answer: "No, this website is strictly for information. All fees must be paid directly at the school office." },
];

const facilitiesData = [
  { title: "Smart Classrooms", desc: "14 instructional classrooms with digiboards and DTH connections for interactive learning.", icon: "📺" },
  { title: "Computer Lab", desc: "Equipped with 12 desktops, printers, and scanners to teach digital literacy.", icon: "💻" },
  { title: "Science Lab", desc: "Hands-on laboratory for physics, chemistry, and biology experiments.", icon: "🔬" },
  { title: "Library", desc: "A quiet, well-stocked library featuring encyclopedias and academic references.", icon: "📚" },
  { title: "CCTV Surveillance", desc: "24/7 monitoring covering all entry gates and corridors for a safe campus.", icon: "🛡️" },
  { title: "Sports & Yoga", desc: "Spacious grounds for physical fitness, games, and daily morning yoga.", icon: "🏅" },
];

const academicsData = [
  { id: "nursery", title: "Nursery & KG", desc: "Early learning foundation focusing on play-based activities and social skills.", color: "from-pink-500 to-rose-400", icon: "🎨" },
  { id: "primary", title: "Classes 1 to 5", desc: "Building strong fundamentals in English, Mathematics, and Science.", color: "from-blue-500 to-cyan-400", icon: "📖" },
  { id: "middle", title: "Classes 6 to 8", desc: "Preparing for higher education with a structured CBSE curriculum and labs.", color: "from-emerald-500 to-teal-400", icon: "🎓" },
];

export default function SchoolHomeClient({ 
  schoolInfo, notices, gallery, admissions, events, faculty, achievements, calendar, faqs 
}: { 
  schoolInfo: SchoolInfo | null; notices: Notice[]; gallery: GalleryItem[]; admissions: Admission[];
  events: Event[]; faculty: Faculty[]; achievements: Achievement[]; calendar: CalendarItem[]; faqs: FAQ[];
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCookies, setShowCookies] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showSecretaryModal, setShowSecretaryModal] = useState(false);
  
  // Modals
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<GalleryItem | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<null | typeof facilitiesData[0]>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Filters
  const [noticeFilter, setNoticeFilter] = useState("All");
  const [galleryFilter, setGalleryFilter] = useState("All");

  // Fee Estimator State
  const [activeTab, setActiveTab] = useState("class");
  const [selectedClass, setSelectedClass] = useState("Nursery");
  const [uniGender, setUniGender] = useState("boy");
  const [uniSize, setUniSize] = useState("16");
  const [tieType, setTieType] = useState("Small");
  const [beltType, setBeltType] = useState("Small");
  const [sockSize, setSockSize] = useState("2no");
  const [textbookCost, setTextbookCost] = useState(0);
  const [drawingCost, setDrawingCost] = useState(0);
  const [smallCopies, setSmallCopies] = useState(0);
  const [bigCopies, setBigCopies] = useState(0);
  const [hasDiary, setHasDiary] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("Hatya");

  // Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([{ text: "Hello! I am the MTMS Assistant. How can I help you today?", sender: "bot" }]);
  const [isTyping, setIsTyping] = useState(false);

  // Maps State
  const [userAddress, setUserAddress] = useState("");
  const [travelMode, setTravelMode] = useState("driving");

  // Fallbacks
  const dNotices = notices?.length ? notices : fallbackNotices;
  const dGallery = gallery?.length ? gallery : [];
  const dEvents = events?.length ? events : fallbackEvents;
  const dFaculty = faculty?.length ? faculty : fallbackFaculty;
  const dAchievements = achievements?.length ? achievements : fallbackAchievements;
  const dCalendar = calendar?.length ? calendar : fallbackCalendar;
  const dFaqs = faqs?.length ? faqs : fallbackFaqs;

  // Fee Calculations
  const liveClassData = admissions?.find((a) => a.classLevel === selectedClass);
  const currentAdmissionFee = liveClassData?.admissionFee ?? fallbackClassFees[selectedClass]?.admission ?? 1500;
  const currentTuitionFee = liveClassData?.monthlyTuition ?? fallbackClassFees[selectedClass]?.tuition ?? 700;

  const calculateUniform = () => {
    const idx = uniformSizes.indexOf(Number(uniSize));
    if (uniGender === "boy") return { item1: "Fullpant", cost1: 280 + (idx * 20), item2: "Shirt", cost2: 260 + (idx * 30), total: (280 + (idx * 20)) + (260 + (idx * 30)) };
    return { item1: "Skirt", cost1: 290 + (idx * 40), item2: "Shirt", cost2: 310 + (idx * 20), total: (290 + (idx * 40)) + (310 + (idx * 20)) };
  };
  const currentUniform = calculateUniform();

  const getTieCost = () => tieType === "Small" ? 50 : 100;
  const getBeltCost = () => beltType === "Small" ? 75 : 100;
  const getSocksCost = () => sockSizes.find((s) => s.size === sockSize)?.cost ?? 30;
  const getBooksCost = () => (smallCopies * 45) + (bigCopies * 85) + (hasDiary ? 150 : 0) + textbookCost + drawingCost;
  const currentVanCost = fallbackVanRoutes.find((r) => r.name === selectedRoute)?.cost ?? 0;

  const grandTotal = currentAdmissionFee + currentTuitionFee + currentUniform.total + getTieCost() + getBeltCost() + getSocksCost() + getBooksCost() + currentVanCost;

  // Effects
  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Chat Logic
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const q = chatInput.toLowerCase();
    setMessages((prev) => [...prev, { text: chatInput, sender: "user" }]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      const matchedFaq = dFaqs.find(f => f.question.toLowerCase().includes(q) || q.includes(f.question.toLowerCase().substring(0, 4)));
      const reply = matchedFaq ? matchedFaq.answer : "I'm sorry, I don't have that information right now. Please contact the school office at +91 99550 80617 for confirmation.";
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
      setIsTyping(false);
    }, 800);
  };

  const handleSuggestedQuestion = (q: string) => {
    setChatInput(q);
    setTimeout(() => {
      const btn = document.getElementById("chat-submit-btn");
      if (btn) btn.click();
    }, 100);
  };

  // Maps Logic
  const handleGetDirections = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAddress.trim()) return;
    const dest = encodeURIComponent("Mother Teresa Memorial School, Kauri Khutana, Bhagaiya, Sahibganj, Jharkhand 813208");
    const org = encodeURIComponent(userAddress);
    const url = `https://www.google.com/maps/dir/?api=1&origin=${org}&destination=${dest}&travelmode=${travelMode}`;
    window.open(url, "_blank");
  };

  const filteredGallery = galleryFilter === "All" ? dGallery : dGallery.filter(g => g.category === galleryFilter);
  const filteredNotices = noticeFilter === "All" ? dNotices : dNotices.filter(n => n.category === noticeFilter);

  return (
    <main className={`relative min-h-screen font-sans overflow-hidden transition-colors duration-300 ${isDarkMode ? "dark bg-[#0B1221] text-gray-200" : "bg-[#FDFDFD] text-[#0F1E36]"}`}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.5); }
        .dark .glass-card { background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.05); }
        .premium-shadow { box-shadow: 0 20px 40px -10px rgba(15, 30, 54, 0.1); }
        .dark .premium-shadow { box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5); }
        .hover-lift { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 25px 50px -12px rgba(15, 30, 54, 0.15); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .bg-pattern { background-image: radial-gradient(#C59B27 1px, transparent 1px); background-size: 24px 24px; opacity: 0.08; }
        
        /* TWINKLING STARS */
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 15px #E5C66C; }
        }
        .star { position: absolute; background: white; border-radius: 50%; animation: twinkle 3s infinite; z-index: 1; }
      `}} />

      {schoolInfo?.admissionsOpen && (
        <div className="bg-gradient-to-r from-[#C59B27] via-[#FDE08B] to-[#C59B27] px-4 py-2.5 text-center text-xs sm:text-sm font-black text-[#0F1E36] tracking-[0.2em] relative z-50 shadow-md">
          🎓 ADMISSIONS OPEN FOR 2025-26 | LIMITED SEATS AVAILABLE 🎓
        </div>
      )}

      {/* HEADER */}
      <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${isDarkMode ? "bg-[#0B1221]/90 border-gray-800" : "bg-white/90 border-gray-100"} backdrop-blur-xl shadow-sm`}>
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4">
          <a href="#home" className="flex items-center gap-3 group">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[#C59B27] text-xl font-black sm:h-14 sm:w-14 shadow-lg transition-transform group-hover:scale-105 ${isDarkMode ? "bg-gray-800 text-[#C59B27]" : "bg-[#0F1E36] text-[#C59B27]"}`}>MT</div>
            <div>
              <h1 className={`text-base font-black leading-tight tracking-wide sm:text-xl ${isDarkMode ? "text-white" : "text-[#0F1E36]"}`}>MOTHER TERESA</h1>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#C59B27] sm:text-xs">MEMORIAL SCHOOL</p>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-bold lg:flex">
            {navLinks.map(([label, href]) => (
              <a key={label} href={href} className={`relative py-2 transition-colors hover:text-[#C59B27] group ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C59B27] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2.5 rounded-full border transition-all hover:scale-110 shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800 text-yellow-400" : "border-gray-200 bg-gray-50 text-gray-600"}`}>
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className={`flex h-11 w-11 items-center justify-center rounded-xl border text-xl lg:hidden transition-all ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-[#0F1E36] border-[#0F1E36] text-white"}`}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
          {menuOpen && (
            <nav className={`absolute left-0 right-0 top-full border-t p-4 shadow-2xl lg:hidden ${isDarkMode ? "bg-[#0B1221] border-gray-800" : "bg-white border-gray-100"}`}>
              {navLinks.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} className="block py-3 px-4 font-bold rounded-lg hover:bg-[#C59B27]/10 hover:text-[#C59B27] transition">{label}</a>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* HERO WITH STARS */}
      <section id="home" className="relative overflow-hidden px-5 py-28 text-center text-white sm:py-36 bg-[#0F1E36]">
        <div className="absolute inset-0 bg-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1E36]/90" />
        
        {/* TWINKLING STARS */}
        <div className="star" style={{ top: '15%', left: '10%', width: '4px', height: '4px', animationDelay: '0s' }}></div>
        <div className="star" style={{ top: '30%', left: '20%', width: '6px', height: '6px', animationDelay: '1s' }}></div>
        <div className="star" style={{ top: '20%', right: '15%', width: '5px', height: '5px', animationDelay: '0.5s' }}></div>
        <div className="star" style={{ top: '60%', left: '8%', width: '3px', height: '3px', animationDelay: '2s' }}></div>
        <div className="star" style={{ top: '70%', right: '10%', width: '4px', height: '4px', animationDelay: '1.5s' }}></div>
        <div className="star" style={{ top: '45%', right: '25%', width: '7px', height: '7px', animationDelay: '0.8s' }}></div>
        <div className="star" style={{ top: '80%', left: '30%', width: '4px', height: '4px', animationDelay: '2.5s' }}></div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <span className="mb-6 inline-block rounded-full border border-[#C59B27] bg-[#C59B27]/20 backdrop-blur-md px-6 py-2 text-xs font-bold tracking-[0.2em] text-[#E5C66C] shadow-[0_0_20px_rgba(197,155,39,0.3)] animate-pulse">
            WELCOME TO EXCELLENCE
          </span>
          <h2 className="text-4xl font-black leading-tight sm:text-7xl drop-shadow-2xl tracking-tight">
            SHAPING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C59B27] to-[#FDE08B]">BRIGHT</span><br/>FUTURES
          </h2>
          <p className="mt-6 text-lg text-gray-300 sm:text-xl font-medium max-w-2xl mx-auto">
            Quality Education · Strong Values · A tradition of excellence since 2005.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#admissions" className="rounded-xl bg-gradient-to-r from-[#C59B27] to-[#E5C66C] px-8 py-4 font-bold text-[#0F1E36] shadow-[0_10px_30px_rgba(197,155,39,0.4)] hover:shadow-[0_10px_40px_rgba(197,155,39,0.6)] hover:-translate-y-1 transition-all">
              Apply for Admission
            </a>
            <a href="#about" className="rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md px-8 py-4 font-bold text-white hover:bg-white hover:text-[#0F1E36] transition-all">
              Explore Campus
            </a>
          </div>
        </div>
      </section>

      {/* STATS (2x2 CHART STYLE) */}
      <section className={`relative z-20 -mt-10 px-5 ${isDarkMode ? "bg-[#0B1221]" : "bg-[#F8F7F2]"}`}>
        <div className="mx-auto max-w-3xl">
          <div className={`grid grid-cols-2 p-6 sm:p-10 rounded-3xl shadow-[0_20px_50px_-12px_rgba(15,30,54,0.1)] ${isDarkMode ? "bg-[#1E293B] border border-gray-700" : "bg-white border border-gray-100"}`}>
            {/* Top Left */}
            <div className="flex flex-col items-center justify-center py-6 sm:py-10 border-b border-r border-gray-200 dark:border-gray-700">
              <p className="text-5xl sm:text-7xl font-black text-[#C59B27] tracking-tight">100%</p>
              <p className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.2em] mt-3 text-gray-500 dark:text-gray-400">Day Scholars</p>
            </div>
            {/* Top Right */}
            <div className="flex flex-col items-center justify-center py-6 sm:py-10 border-b border-gray-200 dark:border-gray-700">
              <p className="text-5xl sm:text-7xl font-black text-[#C59B27] tracking-tight">842</p>
              <p className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.2em] mt-3 text-gray-500 dark:text-gray-400">Students</p>
            </div>
            {/* Bottom Left */}
            <div className="flex flex-col items-center justify-center py-6 sm:py-10 border-r border-gray-200 dark:border-gray-700">
              <p className="text-5xl sm:text-7xl font-black text-[#C59B27] tracking-tight">14</p>
              <p className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.2em] mt-3 text-gray-500 dark:text-gray-400">Classrooms</p>
            </div>
            {/* Bottom Right */}
            <div className="flex flex-col items-center justify-center py-6 sm:py-10">
              <p className="text-5xl sm:text-7xl font-black text-[#C59B27] tracking-tight">30+</p>
              <p className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.2em] mt-3 text-gray-500 dark:text-gray-400">Teachers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={`px-5 py-24 ${isDarkMode ? "bg-[#0B1221]" : "bg-[#F8F7F2]"}`}>
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#C59B27] uppercase">Our Legacy</span>
            <h2 className="text-4xl font-black mt-2 mb-6 leading-tight">Education with Values and Purpose</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#C59B27] to-transparent mb-8" />
            <div className={`space-y-5 opacity-80 text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              <p><strong className={isDarkMode ? "text-white" : "text-[#0F1E36]"}>Mother Teresa Memorial School</strong> in Raj Gaon Arazi (Kauri Khutana, Bhagaiya) is a premier co-educational school established in <strong>2005</strong>. Located in the Mandro block of Sahibganj, we provide English-medium education that blends modern academics with traditional values.</p>
              <p>Registered under <strong>UDISE Code {schoolInfo?.udiseCode || "20090212202"}</strong>, our school serves over 840 students from diverse backgrounds, offering a safe, inclusive, and stimulating environment.</p>
              <p>From pre-primary to Class 8, our structured CBSE curriculum is designed to foster critical thinking, creativity, and leadership in every child.</p>
            </div>
          </div>
          <div className={`relative rounded-3xl p-10 text-center text-white shadow-2xl overflow-hidden hover-lift ${isDarkMode ? "bg-gradient-to-br from-[#1E293B] to-[#0F1E36] border border-gray-700" : "bg-gradient-to-br from-[#0F1E36] to-[#091426]"}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C59B27] opacity-10 rounded-bl-full" />
            <div className="relative z-10">
              <div className="text-6xl text-[#C59B27] font-serif leading-none h-10">“</div>
              <p className="text-2xl italic font-serif leading-relaxed mt-4 mb-8">
                {schoolInfo?.motto || "Be faithful in small things because it is in them that your strength lies."}
              </p>
              <div className="h-1 w-16 bg-[#C59B27] mx-auto mb-4" />
              <p className="font-bold tracking-widest text-[#E5C66C] text-sm">— MOTHER TERESA</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className={`px-5 py-24 ${isDarkMode ? "bg-[#0F172A]" : "bg-white"}`}>
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-black mb-4">Why Choose MTMS?</h2>
          <p className="opacity-70 mb-16 max-w-2xl mx-auto">We provide a nurturing environment that balances academics, sports, and moral values.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🛡️", title: "Safe Campus", desc: "24/7 CCTV surveillance and secure boundaries." },
              { icon: "👩‍🏫", title: "Expert Faculty", desc: "30+ highly qualified and caring teachers." },
              { icon: "💻", title: "Smart Tech", desc: "Digiboards and modern computer labs." },
              { icon: "🏆", title: "Proven Results", desc: "Consistent academic and sports achievements." }
            ].map((feat, i) => (
              <div key={i} className={`p-8 rounded-3xl border transition-all hover-lift ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-[#F8F7F2] border-gray-100"}`}>
                <div className="text-5xl mb-6">{feat.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-sm opacity-70">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMICS */}
      <section id="academics" className={`px-5 py-24 ${isDarkMode ? "bg-[#0B1221]" : "bg-[#F8F7F2]"}`}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black">Our Academics</h2>
            <div className="h-1.5 w-24 bg-[#C59B27] mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {academicsData.map((item) => (
              <div key={item.id} className={`group relative rounded-3xl overflow-hidden hover-lift ${isDarkMode ? "bg-[#1E293B]" : "bg-white border border-gray-100"}`}>
                <div className={`h-48 w-full bg-gradient-to-br ${item.color} flex items-center justify-center p-6 relative overflow-hidden`}>
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition" />
                   <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{item.icon}</span>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS LIFE (GALLERY) */}
      <section id="campus-life" className={`px-5 py-24 ${isDarkMode ? "bg-[#0F172A]" : "bg-white"}`}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black">Campus Gallery</h2>
            <p className="opacity-70 mt-2">A glimpse into our vibrant school life</p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {["All", "Campus", "Classrooms", "Sports", "Cultural", "Events"].map(cat => (
                <button key={cat} onClick={() => setGalleryFilter(cat)} className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${galleryFilter === cat ? "bg-[#C59B27] text-[#0F1E36] shadow-md scale-105" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredGallery.length > 0 ? (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
              {filteredGallery.map((item, idx) => (
                <div key={item._id || idx} onClick={() => setSelectedGalleryImg(item)} className="relative rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid">
                  <Image src={urlFor(item.image).url()} alt={item.title || "Gallery"} width={600} height={400} className="w-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                    <p className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className={`aspect-square rounded-2xl flex flex-col items-center justify-center border-2 border-dashed transition-all hover:border-[#C59B27] group ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-300"}`}>
                  <svg className="w-10 h-10 text-gray-400 group-hover:text-[#C59B27] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span className="text-xs font-bold text-gray-400 mt-2 group-hover:text-[#C59B27]">Coming Soon</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EVENTS & NEWS */}
      <section id="events" className={`px-5 py-24 ${isDarkMode ? "bg-[#0B1221]" : "bg-[#F8F7F2]"}`}>
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16">
          
          {/* EVENTS */}
          <div>
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#C59B27] rounded-full"></span> Upcoming Events
            </h2>
            <div className="space-y-6">
              {dEvents.map((ev, i) => (
                <div key={i} className={`rounded-2xl border overflow-hidden transition-all hover-lift group ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-100"}`}>
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-32 sm:h-auto relative overflow-hidden">
                      {ev.image ? (
                         <Image src={urlFor(ev.image).url()} alt={ev.title} fill className="object-cover group-hover:scale-110 transition duration-500" />
                      ) : ev.imageUrl ? (
                         <Image src={ev.imageUrl} alt={ev.title} fill className="object-cover group-hover:scale-110 transition duration-500" />
                      ) : (
                         <div className="w-full h-full bg-gradient-to-br from-[#0F1E36] to-[#1E293B] flex items-center justify-center"><span className="text-3xl">📅</span></div>
                      )}
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-[#C59B27] uppercase tracking-wider bg-[#C59B27]/10 px-2 py-1 rounded">{ev.category}</span>
                        <span className="text-xs font-bold opacity-60">📅 {ev.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#C59B27] transition">{ev.title}</h3>
                      <p className="text-sm opacity-70 leading-relaxed line-clamp-2">{ev.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NEWS / NOTICES */}
          <div>
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#C59B27] rounded-full"></span> Latest Notices
            </h2>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {["All", "General", "Examination", "Holiday"].map(cat => (
                <button key={cat} onClick={() => setNoticeFilter(cat)} className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap font-bold transition ${noticeFilter === cat ? "bg-[#0F1E36] text-white dark:bg-[#C59B27] dark:text-[#0F1E36]" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
              {filteredNotices.map((n, i) => (
                <div key={i} onClick={() => setSelectedNotice(n)} className={`rounded-2xl border overflow-hidden cursor-pointer hover-lift group transition-all ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-100"}`}>
                  <div className="h-40 w-full relative overflow-hidden">
                    {n.image ? (
                      <Image src={urlFor(n.image).url()} alt={n.title || "Notice"} fill className="object-cover group-hover:scale-105 transition duration-500" />
                    ) : n.imageUrl ? (
                      <Image src={n.imageUrl} alt={n.title || "Notice"} fill className="object-cover group-hover:scale-105 transition duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0F1E36] to-[#1E293B] flex items-center justify-center"><span className="text-4xl">📢</span></div>
                    )}
                    <div className="absolute top-4 left-4 flex gap-2">
                       <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full">{n.category}</span>
                       {n.isUrgent && <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse">URGENT</span>}
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-[#C59B27] mb-2 block">{n.date}</span>
                    <h3 className="font-bold text-lg group-hover:text-[#C59B27] transition line-clamp-1">{n.title}</h3>
                    <p className="text-sm opacity-60 line-clamp-2 mt-2">{n.content}</p>
                    <div className="mt-4 text-xs font-bold text-[#C59B27] flex items-center gap-1">
                      Read Full Notice <span className="text-lg leading-none">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className={`px-5 py-24 ${isDarkMode ? "bg-[#0F172A]" : "bg-white"}`}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-black text-center mb-16">Student Achievements</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dAchievements.map((ach, i) => (
              <div key={i} onClick={() => setSelectedAchievement(ach)} className={`rounded-3xl p-8 border cursor-pointer hover-lift relative overflow-hidden group ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-[#F8F7F2] border-gray-100"}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C59B27] opacity-5 rounded-bl-full group-hover:scale-150 transition-transform duration-500" />
                <span className="text-[10px] font-bold text-[#C59B27] uppercase tracking-wider">{ach.category}</span>
                <h3 className="text-xl font-bold mt-3 mb-3 group-hover:text-[#C59B27] transition">{ach.title}</h3>
                <p className="text-sm opacity-70 line-clamp-3">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP & FACULTY */}
      <section className={`px-5 py-24 ${isDarkMode ? "bg-[#0B1221]" : "bg-[#F8F7F2]"}`}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-black text-center mb-16">Guiding Our Vision</h2>
          
          {/* SECRETARY CARD */}
          <div className={`rounded-3xl overflow-hidden border hover-lift group mb-12 flex flex-col md:flex-row ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-100"}`}>
             <div className="md:w-1/3 h-80 md:h-auto relative bg-gradient-to-br from-[#0F1E36] to-[#1E293B] flex items-center justify-center overflow-hidden">
                <span className="text-[#C59B27] text-9xl font-black opacity-30 group-hover:scale-110 transition duration-500">B</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
             </div>
             <div className="md:w-2/3 p-10 flex flex-col items-center text-center justify-center relative">
                <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#C59B27] to-[#E5C66C] text-[#0F1E36] mb-4 shadow-lg w-max`}>Secretary</div>
                <h3 className="text-4xl font-black mb-4">Boniface Kisku</h3>
                <p className="text-lg opacity-70 leading-relaxed mb-8 max-w-xl mx-auto">
                  Dedicated to providing an environment where every child discovers their unique strengths. At MTMS, we believe that education is a partnership between the school, the teachers, and the parents.
                </p>
                <button 
                  onClick={() => setShowSecretaryModal(true)} 
                  className="bg-[#0F1E36] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#C59B27] hover:text-[#0F1E36] transition-all shadow-[0_10px_20px_rgba(15,30,54,0.2)] w-full max-w-sm flex items-center justify-center gap-3 text-lg border border-white/10"
                >
                  <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  Welcome from Secretary
                </button>
             </div>
          </div>

          {/* OTHER FACULTY */}
          <div className="grid sm:grid-cols-3 gap-8">
            {dFaculty.filter(f => f.role !== "Secretary").map((f, i) => (
              <div key={i} className={`rounded-3xl overflow-hidden border hover-lift group ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-100"}`}>
                <div className="h-56 relative bg-gradient-to-br from-[#0F1E36] to-[#1E293B] flex items-center justify-center overflow-hidden">
                  {f.image ? (
                    <Image src={urlFor(f.image).url()} alt={f.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
                  ) : (
                    <span className="text-[#C59B27] text-8xl font-black opacity-30 group-hover:scale-110 transition duration-500">{f.name.charAt(0)}</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="p-6 text-center relative -mt-10 z-10">
                  <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#C59B27] to-[#E5C66C] text-[#0F1E36] mb-3 shadow-lg`}>{f.role}</div>
                  <h3 className="text-2xl font-black">{f.name}</h3>
                  {f.bio && <p className="text-sm opacity-60 mt-3 leading-relaxed line-clamp-2">{f.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC CALENDAR */}
      <section className={`px-5 py-24 ${isDarkMode ? "bg-[#0F172A]" : "bg-white"}`}>
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black">Academic Calendar</h2>
            <p className="opacity-70 mt-2">Important dates for the current session</p>
          </div>
          <div className={`rounded-3xl border overflow-hidden shadow-xl ${isDarkMode ? "border-gray-700 bg-[#1E293B]" : "border-gray-100 bg-[#F8F7F2]"}`}>
            {dCalendar.map((cal, i) => (
              <div key={i} className={`flex justify-between items-center p-5 border-b last:border-0 transition hover:bg-[#C59B27]/5 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className="flex items-center gap-5">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider ${cal.type === "Exam" ? "bg-red-100 text-red-700" : cal.type === "Holiday" ? "bg-green-100 text-green-700" : "bg-[#C59B27]/20 text-[#C59B27]"}`}>{cal.type}</span>
                  <span className="font-bold text-sm sm:text-base">{cal.title}</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#C59B27]">{cal.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section id="facilities" className={`px-5 py-24 ${isDarkMode ? "bg-[#0B1221]" : "bg-[#F8F7F2]"}`}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-black text-center mb-16">World-Class Facilities</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilitiesData.map((fac, i) => (
              <button key={i} onClick={() => setSelectedFacility(fac)} className={`group flex flex-col text-left rounded-3xl border overflow-hidden hover-lift ${isDarkMode ? "border-gray-700 bg-[#1E293B]" : "border-gray-100 bg-white"}`}>
                <div className="h-40 w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0F172A] dark:to-[#1E293B] flex items-center justify-center relative overflow-hidden">
                  <span className="text-6xl group-hover:scale-125 group-hover:rotate-6 transition duration-500">{fac.icon}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <h3 className={`text-xl font-bold group-hover:text-[#C59B27] transition ${isDarkMode ? "text-gray-200" : "text-[#0F1E36]"}`}>{fac.title}</h3>
                  <span className="mt-4 text-xs font-bold text-[#C59B27] uppercase tracking-wider flex items-center gap-2">Explore <span className="group-hover:translate-x-2 transition">→</span></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={`px-5 py-24 ${isDarkMode ? "bg-[#0F172A]" : "bg-white"}`}>
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-black mb-4">What Parents Say</h2>
          <p className="opacity-70 mb-16">Trusted by hundreds of families in Sahibganj.</p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { name: "Rajesh Kumar", child: "Parent of Class 4 Student", text: "The teachers here are incredibly supportive. My child has shown massive improvement in English and Maths. The campus is very safe and clean." },
              { name: "Sunita Devi", child: "Parent of UKG Student", text: "I love the cultural activities and the moral values taught at MTMS. The van facility is very reliable and the staff is always polite." },
              { name: "Amit Singh", child: "Parent of Class 8 Student", text: "The science lab and computer facilities are excellent. My son is well-prepared for his board exams thanks to the dedicated faculty." }
            ].map((test, i) => (
              <div key={i} className={`p-8 rounded-3xl border hover-lift ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-[#F8F7F2] border-gray-100"}`}>
                <div className="text-[#C59B27] text-4xl mb-4">“</div>
                <p className="text-sm opacity-80 italic mb-6">{test.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0F1E36] text-[#C59B27] flex items-center justify-center font-bold text-xl">{test.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold">{test.name}</h4>
                    <p className="text-xs opacity-60">{test.child}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION PROCESS */}
      <section id="admission-process" className={`px-5 py-24 ${isDarkMode ? "bg-[#0B1221]" : "bg-[#F8F7F2]"}`}>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl font-black text-center mb-16">Admission Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Enquiry", desc: "Visit the school office during morning hours to collect the admission form." },
              { step: "02", title: "Documents", desc: "Submit Nursery Aadhaar or Transfer SLC along with required forms." },
              { step: "03", title: "Assessment", desc: "A friendly student interview and basic performance assessment." },
              { step: "04", title: "Confirmation", desc: "Management verifies details and confirms the admission." }
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-3xl border relative hover-lift ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-100"}`}>
                <div className="text-6xl font-black text-[#C59B27] opacity-10 absolute top-4 right-4">{item.step}</div>
                <h3 className="font-bold text-lg mb-3 mt-4 text-[#C59B27]">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEE ESTIMATOR */}
      <section id="admissions" className={`px-5 py-24 ${isDarkMode ? "bg-[#0F172A] text-white" : "bg-[#0F1E36] text-white"}`}>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-black text-center mb-12">Fee Estimator</h2>
          
          <div className="mb-12 flex justify-center perspective-1000">
            <div className="relative w-full max-w-xl rounded-3xl border border-[#C59B27]/50 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:rotate-x-0 rotate-x-6 transition duration-500">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl animate-float">🧮</span>
                  <div>
                    <h3 className="text-sm font-bold text-[#E5C66C] tracking-wider uppercase">Live Calculator</h3>
                    <p className="text-xs text-gray-400">Estimate your first month</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Grand Total</p>
                  <p className="text-4xl font-black text-[#E5C66C] drop-shadow-md">₹{grandTotal.toLocaleString("en-IN")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-700 bg-[#0B1221] p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-800 pb-4">
              {["class", "uniform", "books", "van"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 text-sm font-bold capitalize rounded-xl transition-all ${activeTab === tab ? "bg-[#C59B27] text-[#0F1E36] shadow-lg scale-105" : "text-gray-400 hover:bg-gray-800"}`}>
                  {tab === "class" ? "Class Fees" : tab === "uniform" ? "Uniforms" : tab === "books" ? "Books" : "Van Routes"}
                </button>
              ))}
            </div>

            {activeTab === "class" && (
              <div className="animate-in fade-in zoom-in duration-300">
                <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full p-4 rounded-xl bg-[#0F172A] border border-gray-700 text-white text-lg font-bold mb-6 focus:ring-2 focus:ring-[#C59B27] outline-none">
                  {Object.keys(fallbackClassFees).map(c => <option key={c}>{c}</option>)}
                </select>
                <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-700 space-y-3">
                  <div className="flex justify-between text-gray-300"><span>Admission Fee</span><span className="font-bold text-white">₹{currentAdmissionFee}</span></div>
                  <div className="flex justify-between text-gray-300"><span>Monthly Tuition</span><span className="font-bold text-white">₹{currentTuitionFee}</span></div>
                  <div className="flex justify-between pt-4 border-t border-gray-700 font-bold text-[#E5C66C] text-xl"><span>Total First Month</span><span>₹{(currentAdmissionFee + currentTuitionFee).toLocaleString('en-IN')}</span></div>
                </div>
              </div>
            )}

            {activeTab === "uniform" && (
              <div className="grid md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-300">
                <div className="space-y-4">
                  <div className="flex gap-2 p-1 bg-[#0F172A] rounded-xl border border-gray-700">
                    <button onClick={() => setUniGender("boy")} className={`flex-1 py-2 rounded-lg font-bold transition ${uniGender === "boy" ? "bg-[#C59B27] text-[#0F1E36]" : "text-gray-400"}`}>Boys</button>
                    <button onClick={() => setUniGender("girl")} className={`flex-1 py-2 rounded-lg font-bold transition ${uniGender === "girl" ? "bg-[#C59B27] text-[#0F1E36]" : "text-gray-400"}`}>Girls</button>
                  </div>
                  <select value={uniSize} onChange={e => setUniSize(e.target.value)} className="w-full p-4 rounded-xl bg-[#0F172A] border border-gray-700 text-white font-bold outline-none">
                    {uniformSizes.map(s => <option key={s} value={s}>Size {s}</option>)}
                  </select>
                </div>
                <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-700 flex flex-col justify-center">
                  <div className="flex justify-between py-2 border-b border-gray-700"><span className="text-gray-300">{currentUniform.item1}</span><span className="font-bold">₹{currentUniform.cost1}</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-700"><span className="text-gray-300">{currentUniform.item2}</span><span className="font-bold">₹{currentUniform.cost2}</span></div>
                  <div className="flex justify-between pt-4 font-bold text-[#E5C66C] text-xl"><span>Total</span><span>₹{currentUniform.total}</span></div>
                </div>
              </div>
            )}

            {activeTab === "books" && (
              <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <input type="number" placeholder="Textbooks ₹" onChange={e => setTextbookCost(Number(e.target.value))} className="p-3 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none focus:border-[#C59B27]" />
                  <input type="number" placeholder="Drawing ₹" onChange={e => setDrawingCost(Number(e.target.value))} className="p-3 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none focus:border-[#C59B27]" />
                  <input type="number" placeholder="Small Copies" onChange={e => setSmallCopies(Number(e.target.value))} className="p-3 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none focus:border-[#C59B27]" />
                  <input type="number" placeholder="Big Copies" onChange={e => setBigCopies(Number(e.target.value))} className="p-3 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none focus:border-[#C59B27]" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <select onChange={e => setTieType(e.target.value)} className="w-full p-3 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none">
                    <option value="Small">Tie: Small (₹50)</option>
                    <option value="Big">Tie: Big (₹100)</option>
                  </select>
                  <select onChange={e => setBeltType(e.target.value)} className="w-full p-3 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none">
                    <option value="Small">Belt: Small (₹75)</option>
                    <option value="Big">Belt: Big (₹100)</option>
                  </select>
                  <select onChange={e => setSockSize(e.target.value)} className="w-full p-3 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none">
                    {sockSizes.map(s => <option key={s.size} value={s.size}>Socks {s.size} - ₹{s.cost}</option>)}
                  </select>
                </div>
                <label className="flex items-center gap-3 p-4 bg-[#0F172A] rounded-xl border border-gray-700 cursor-pointer w-max">
                  <input type="checkbox" onChange={e => setHasDiary(e.target.checked)} className="w-5 h-5 accent-[#C59B27]" />
                  <span className="font-bold text-sm">Add School Diary (₹150)</span>
                </label>
              </div>
            )}

            {activeTab === "van" && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in duration-300">
                {fallbackVanRoutes.map(r => (
                  <button key={r.name} onClick={() => setSelectedRoute(r.name)} className={`p-4 rounded-xl border text-left transition ${selectedRoute === r.name ? "bg-[#C59B27] text-[#0F1E36] border-[#C59B27] scale-105 shadow-lg" : "bg-[#0F172A] border-gray-700 hover:border-gray-500"}`}>
                    <span className="block font-bold">{r.name}</span><span className="text-sm opacity-80">₹{r.cost}/mo</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center text-xs font-bold text-red-300 bg-red-500/10 p-4 rounded-xl border border-red-500/20 backdrop-blur-sm">
            ⚠️ Informational estimator only; no online payment. Please pay fees at the school office.
          </div>
        </div>
      </section>

      {/* CONTACT & MAPS */}
      <section id="contact" className={`px-5 py-24 ${isDarkMode ? "bg-[#0B1221]" : "bg-white"}`}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-black text-center mb-16">Contact & Location</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className={`p-8 rounded-3xl border hover-lift ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-[#F8F7F2] border-gray-200"}`}>
              <div className="w-12 h-12 bg-[#C59B27]/20 rounded-2xl flex items-center justify-center text-2xl mb-4">📍</div>
              <h3 className="font-bold text-lg mb-2">School Address</h3>
              <p className="text-sm opacity-70 leading-relaxed">At- Kauri Khutana, PO- Bhagaiya, PS- Mirzachowki, Dist- Sahibganj, Jharkhand (813208)</p>
            </div>
            <div className={`p-8 rounded-3xl border hover-lift ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-[#F8F7F2] border-gray-200"}`}>
              <div className="w-12 h-12 bg-[#C59B27]/20 rounded-2xl flex items-center justify-center text-2xl mb-4">📞</div>
              <h3 className="font-bold text-lg mb-2">Phone</h3>
              <a href="tel:+919955080617" className="text-sm font-bold text-[#C59B27] hover:underline">+91 99550 80617</a>
            </div>
            <div className={`p-8 rounded-3xl border hover-lift ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-[#F8F7F2] border-gray-200"}`}>
              <div className="w-12 h-12 bg-[#C59B27]/20 rounded-2xl flex items-center justify-center text-2xl mb-4">✉️</div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <a href="mailto:mtmschoolofficial2005@gmail.com" className="text-sm font-bold text-[#C59B27] hover:underline break-all">mtmschoolofficial2005@gmail.com</a>
            </div>
          </div>

          <div className={`p-8 rounded-3xl border ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-[#F8F7F2] border-gray-200"}`}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><span className="text-[#C59B27]">🗺️</span> Get Directions</h3>
            <form onSubmit={handleGetDirections} className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" placeholder="Enter your starting address..." value={userAddress} onChange={(e) => setUserAddress(e.target.value)}
                className={`flex-1 p-4 rounded-xl border font-medium focus:outline-none focus:ring-2 focus:ring-[#C59B27] ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"}`} required
              />
              <div className="flex gap-2">
                <select value={travelMode} onChange={(e) => setTravelMode(e.target.value)} className={`p-4 rounded-xl border font-bold ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"}`}>
                  <option value="driving">🚗 Car</option>
                  <option value="two-wheeler">🏍️ Bike</option>
                  <option value="walking">🚶‍♂️ Walk</option>
                </select>
                <button type="submit" className="bg-[#0F1E36] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#C59B27] hover:text-[#0F1E36] transition shadow-lg whitespace-nowrap">Get Route</button>
              </div>
            </form>
          </div>

          <div className="mt-8 rounded-3xl overflow-hidden shadow-xl h-[400px] border-4 border-white dark:border-gray-800">
            <iframe src="https://maps.google.com/maps?q=Mother%20Teresa%20Memorial%20School,%20Kauri%20Khutana,%20Bhagaiya,%20Sahibganj,%20Jharkhand&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Map"></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`px-5 py-16 text-center ${isDarkMode ? "bg-black" : "bg-[#091426]"} text-white relative overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C59B27] to-transparent" />
        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <h2 className="text-2xl font-black tracking-widest text-[#C59B27]">MOTHER TERESA MEMORIAL SCHOOL</h2>
          <p className="text-xs text-gray-400 mt-3 tracking-widest">UDISE Code: {schoolInfo?.udiseCode || "20090212202"}</p>
          
          <div className="flex flex-wrap justify-center gap-8 mt-8 mb-8 text-sm font-bold">
            <Link href="/privacy" className="hover:text-[#C59B27] transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#C59B27] transition">Terms & Conditions</Link>
            <Link href="/mandatory-disclosure" className="hover:text-[#C59B27] transition">Mandatory Disclosure</Link>
          </div>

          <p className="text-xs text-gray-500">© 2024 Mother Teresa Memorial School. All rights reserved.</p>
        </div>
      </footer>

      {/* POPUP MODALS */}
      
      {/* Secretary Modal */}
      {showSecretaryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in" onClick={() => setShowSecretaryModal(false)}>
          <div className={`relative w-full max-w-2xl rounded-3xl shadow-2xl animate-in zoom-in-95 overflow-hidden ${isDarkMode ? "bg-[#1E293B] border border-gray-700 text-white" : "bg-white"}`} onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#0F1E36] to-[#1E293B] p-8 text-white relative">
              <button onClick={() => setShowSecretaryModal(false)} className="absolute top-5 right-5 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center font-bold hover:bg-red-500 transition z-10 text-white">✕</button>
              <h3 className="text-3xl font-black mb-2">Welcome to MTMS</h3>
              <p className="text-[#C59B27] font-bold">Message from the Secretary</p>
            </div>
            <div className="p-8 space-y-4 text-base leading-relaxed">
              <p>Dear Parents and Students,</p>
              <p>It gives me immense pleasure to welcome you to Mother Teresa Memorial School. Our goal is not just academic excellence, but to instill strong moral values, discipline, and a sense of responsibility in every child.</p>
              <p>At MTMS, we believe that education is a partnership between the school, the teachers, and the parents. Together, we can create an environment where children feel safe, valued, and inspired to learn.</p>
              <div className="mt-8 pt-6 border-t dark:border-gray-700">
                <p className="font-bold">Warm Regards,</p>
                <p className="text-xl font-black text-[#C59B27]">Boniface Kisku</p>
                <p className="text-sm opacity-60">Secretary, Mother Teresa Memorial School</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Lightbox */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedGalleryImg(null)}>
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedGalleryImg(null)} className="absolute -top-12 right-0 text-white hover:text-[#C59B27] text-2xl font-bold bg-white/10 w-10 h-10 rounded-full flex items-center justify-center">✕</button>
            <div className="relative w-full h-[75vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl"><Image src={urlFor(selectedGalleryImg.image).url()} alt={selectedGalleryImg.title || "Gallery"} fill className="object-contain bg-black" /></div>
            <p className="text-white text-xl font-bold mt-6 bg-white/10 px-6 py-2 rounded-full backdrop-blur-md">{selectedGalleryImg.title}</p>
          </div>
        </div>
      )}

      {/* Notice Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedNotice(null)}>
          <div className={`relative w-full max-w-xl rounded-3xl shadow-2xl animate-in zoom-in-95 overflow-hidden ${isDarkMode ? "bg-[#1E293B] border border-gray-700 text-white" : "bg-white"}`} onClick={e => e.stopPropagation()}>
            {selectedNotice.image || selectedNotice.imageUrl ? (
              <div className="h-56 w-full relative">
                <Image src={selectedNotice.image ? urlFor(selectedNotice.image).url() : (selectedNotice.imageUrl as string)} alt={selectedNotice.title || "Notice"} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ) : null}
            <div className="p-8">
              <button onClick={() => setSelectedNotice(null)} className="absolute top-5 right-5 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center font-bold hover:bg-red-500 transition z-10">✕</button>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#C59B27] font-bold text-xs uppercase tracking-widest">{selectedNotice.category}</span>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-gray-500 text-xs">{selectedNotice.date}</span>
              </div>
              <h3 className="text-3xl font-black mb-6 leading-tight">{selectedNotice.title}</h3>
              <p className="text-base leading-relaxed opacity-80 whitespace-pre-wrap">{selectedNotice.content}</p>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedAchievement(null)}>
          <div className={`relative w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 ${isDarkMode ? "bg-[#1E293B] border border-gray-700 text-white" : "bg-white"}`} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedAchievement(null)} className="absolute top-5 right-5 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold hover:bg-red-100 hover:text-red-600 transition">✕</button>
            <div className="w-16 h-16 bg-[#C59B27]/20 rounded-2xl flex items-center justify-center text-3xl mb-6">🏆</div>
            <span className="text-[#C59B27] text-xs font-bold uppercase tracking-widest">{selectedAchievement.category}</span>
            <h3 className="text-2xl font-black mb-3 mt-1">{selectedAchievement.title}</h3>
            <p className="text-base leading-relaxed opacity-80">{selectedAchievement.description}</p>
          </div>
        </div>
      )}

      {/* Facility Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedFacility(null)}>
          <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 ${isDarkMode ? "bg-[#1E293B] border border-gray-700 text-white" : "bg-white"}`} onClick={(e) => e.stopPropagation()}>
            <div className="h-48 w-full bg-gradient-to-br from-[#0F1E36] to-[#1E293B] flex items-center justify-center relative">
               <span className="text-7xl">{selectedFacility.icon}</span>
               <button onClick={() => setSelectedFacility(null)} className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-red-500 z-10">✕</button>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-[#C59B27]">{selectedFacility.title}</h3>
              <p className={`leading-relaxed text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{selectedFacility.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* COOKIE BANNER */}
      {showCookies && (
        <div className={`fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md z-[90] border p-6 shadow-2xl rounded-3xl animate-in slide-in-from-bottom-10 ${isDarkMode ? "bg-[#1E293B] border-gray-700 text-gray-200" : "bg-white border-gray-200"}`}>
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">🍪 We value your privacy</h3>
          <p className={`text-sm mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>We use cookies to enhance your browsing experience and analyze our traffic.</p>
          <div className="flex gap-3">
            <button onClick={() => setShowCookies(false)} className="flex-1 bg-[#C59B27] text-[#0F1E36] font-bold py-3 rounded-xl hover:bg-yellow-500 transition shadow-lg">Accept</button>
            <button onClick={() => setShowCookies(false)} className={`flex-1 border-2 border-gray-300 dark:border-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition`}>Reject</button>
          </div>
        </div>
      )}

      {/* SCROLL TO TOP */}
      {showTopBtn && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-28 right-6 z-[80] h-14 w-14 rounded-full bg-[#C59B27] text-[#0F1E36] shadow-[0_10px_30px_rgba(197,155,39,0.4)] flex items-center justify-center hover:bg-yellow-500 transition-all transform hover:-translate-y-2 border-2 border-white dark:border-gray-800"
          title="Go to Top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
        </button>
      )}

      {/* AI ASSISTANT CHAT */}
      <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end">
        {chatOpen && (
          <div className={`mb-4 w-[90vw] sm:w-[400px] rounded-3xl shadow-2xl border flex flex-col animate-in slide-in-from-bottom-5 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-200"}`}>
            <div className="bg-gradient-to-r from-[#0F1E36] to-[#1E293B] p-5 flex justify-between items-center text-white rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#C59B27] flex items-center justify-center font-black text-[#0F1E36] shadow-inner text-lg">M</div>
                <div>
                  <h4 className="text-base font-bold">MTMS Assistant</h4>
                  <p className="text-[10px] text-[#C59B27] font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white bg-white/10 w-8 h-8 rounded-full flex items-center justify-center">✕</button>
            </div>
            
            <div className={`h-80 overflow-y-auto p-5 space-y-4 ${isDarkMode ? "bg-[#0F172A]" : "bg-[#F8F7F2]"}`}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm shadow-sm ${msg.sender === "user" ? "bg-[#C59B27] text-[#0F1E36] rounded-br-none" : `${isDarkMode ? "bg-[#1E293B] text-gray-200 border-gray-700" : "bg-white text-gray-700 border-gray-200"} border rounded-bl-none`}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-xs text-gray-400 italic flex items-center gap-1"><span className="animate-bounce">●</span><span className="animate-bounce delay-100">●</span><span className="animate-bounce delay-200">●</span></div>}
            </div>

            <div className={`p-4 border-t rounded-b-3xl ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-100"}`}>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-3">
                {["Fees", "Timings", "Admission", "Van Routes"].map(q => (
                  <button key={q} onClick={() => handleSuggestedQuestion(q)} className="text-xs whitespace-nowrap bg-[#C59B27]/10 text-[#C59B27] px-3 py-1.5 rounded-full font-bold hover:bg-[#C59B27] hover:text-[#0F1E36] transition">{q}</button>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask a question..." className={`flex-1 rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-2 focus:ring-[#C59B27] ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-gray-50 border-gray-200"}`} />
                <button id="chat-submit-btn" type="submit" className="h-11 w-11 flex items-center justify-center rounded-xl bg-[#0F1E36] text-[#C59B27] hover:bg-[#C59B27] hover:text-[#0F1E36] transition shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                </button>
              </form>
            </div>
          </div>
        )}
        
        <button onClick={() => setChatOpen(!chatOpen)} className="relative flex items-center justify-center h-16 w-16 bg-[#0F1E36] rounded-full shadow-[0_10px_30px_rgba(15,30,54,0.4)] hover:scale-110 hover:bg-[#C59B27] transition-all duration-300 border-2 border-[#C59B27] group">
          <svg viewBox="0 0 100 100" className="w-12 h-12 group-hover:scale-110 transition">
            <ellipse cx="50" cy="65" rx="35" ry="25" fill="#2E7D32" />
            <ellipse cx="50" cy="65" rx="25" ry="15" fill="#4CAF50" />
            <path d="M 30 65 L 70 65 M 50 45 L 50 85 M 35 50 L 65 80 M 65 50 L 35 80" stroke="#1B5E20" strokeWidth="2" />
            <ellipse cx="25" cy="85" rx="10" ry="6" fill="#4CAF50" />
            <ellipse cx="75" cy="85" rx="10" ry="6" fill="#4CAF50" />
            <circle cx="50" cy="35" r="15" fill="#4CAF50" />
            <circle cx="45" cy="32" r="2" fill="#000" />
            <circle cx="55" cy="32" r="2" fill="#000" />
            <path d="M 45 40 Q 50 45 55 40" stroke="#000" strokeWidth="2" fill="none" />
            <g className="turtle-arm">
              <ellipse cx="70" cy="50" rx="12" ry="6" fill="#4CAF50" transform="rotate(-30 70 50)" />
            </g>
          </svg>
          <div className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      </div>
    </main>
  );
}