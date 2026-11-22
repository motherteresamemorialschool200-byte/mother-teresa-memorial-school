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
interface Staff {
  _id?: string;
  name: string;
  role: string;
  qualification?: string;
  age?: number;
  fatherName?: string;
  image?: ImageSource;
  imageUrl?: string;
}

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

const fallbackNews: Notice[] = [
  { date: "20 NOV 2025", title: "Annual Sports Day Announcement", content: "The Annual Sports Meet will be held on 15th December. All students must report by 7:30 AM in their house colors.", isUrgent: true, category: "General", imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop" },
  { date: "18 NOV 2025", title: "Winter Uniform Guidelines", content: "As the temperature drops, students are required to wear their complete winter uniforms (sweaters and blazers) starting next Monday.", category: "General", imageUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop" },
  { date: "15 NOV 2025", title: "Parent-Teacher Meeting", content: "A mandatory PTM is scheduled for 25th November to discuss the half-yearly exam results and student progress.", category: "Examination", imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop" },
];

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

const fallbackTeachingStaff: Staff[] = [
  { name: "Anil Kumar Das", role: "Mathematics Teacher", qualification: "M.Tech, B.Ed", age: 38, fatherName: "Ramesh Das", imageUrl: "" },
  { name: "Priya Sharma", role: "Science Teacher", qualification: "B.Tech, B.Ed", age: 32, fatherName: "Suresh Sharma", imageUrl: "" },
  { name: "Sunita Murmu", role: "English Teacher", qualification: "M.A. English, B.Ed", age: 35, fatherName: "Lakhan Murmu", imageUrl: "" },
  { name: "Rakesh Hembrom", role: "Social Science Teacher", qualification: "M.A., B.Ed", age: 40, fatherName: "Mohan Hembrom", imageUrl: "" },
  { name: "Kavita Singh", role: "Hindi Teacher", qualification: "M.A. Hindi, B.Ed", age: 34, fatherName: "Ram Singh", imageUrl: "" },
  { name: "Deepak Oraon", role: "Computer Teacher", qualification: "B.Tech (CS), B.Ed", age: 30, fatherName: "Late Som Oraon", imageUrl: "" },
];

const fallbackNonTeachingStaff: Staff[] = [
  { name: "Suresh Marandi", role: "School Driver", qualification: "10th Pass, Heavy License", age: 42, fatherName: "Late Budhan Marandi", imageUrl: "" },
  { name: "Ramesh Kisku", role: "Bus Driver", qualification: "8th Pass, Heavy License", age: 45, fatherName: "Nakul Kisku", imageUrl: "" },
  { name: "Mohan Tudu", role: "Peon", qualification: "8th Pass", age: 38, fatherName: "Lakhan Tudu", imageUrl: "" },
  { name: "Sanjay Murmu", role: "Security Guard", qualification: "10th Pass", age: 40, fatherName: "Dinesh Murmu", imageUrl: "" },
  { name: "Asha Devi", role: "Cook / Helper", qualification: "5th Pass", age: 36, fatherName: "Ramdev Prasad", imageUrl: "" },
  { name: "Vijay Soren", role: "Cleaner", qualification: "8th Pass", age: 34, fatherName: "Late Som Soren", imageUrl: "" },
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
  schoolInfo, notices, gallery, admissions, events, faculty, achievements, calendar, faqs,
  teachingStaff, nonTeachingStaff
}: { 
  schoolInfo: SchoolInfo | null; notices: Notice[]; gallery: GalleryItem[]; admissions: Admission[];
  events: Event[]; faculty: Faculty[]; achievements: Achievement[]; calendar: CalendarItem[]; faqs: FAQ[];
  teachingStaff?: Staff[]; nonTeachingStaff?: Staff[];
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
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // Staff expansion
  const [showAllTeaching, setShowAllTeaching] = useState(false);
  const [showAllNonTeaching, setShowAllNonTeaching] = useState(false);

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
  const dNews = fallbackNews;
  const dNotices = notices?.length ? notices : fallbackNotices;
  const dGallery = gallery?.length ? gallery : [];
  const dEvents = events?.length ? events : fallbackEvents;
  const dFaculty = faculty?.length ? faculty : fallbackFaculty;
  const dAchievements = achievements?.length ? achievements : fallbackAchievements;
  const dCalendar = calendar?.length ? calendar : fallbackCalendar;
  const dFaqs = faqs?.length ? faqs : fallbackFaqs;
  const dTeachingStaff = teachingStaff?.length ? teachingStaff : fallbackTeachingStaff;
  const dNonTeachingStaff = nonTeachingStaff?.length ? nonTeachingStaff : fallbackNonTeachingStaff;

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

  // Visible staff slices
  const visibleTeaching = showAllTeaching ? dTeachingStaff : dTeachingStaff.slice(0, 3);
  const visibleNonTeaching = showAllNonTeaching ? dNonTeachingStaff : dNonTeachingStaff.slice(0, 3);

  // Reusable staff card
  const StaffCard = ({ s }: { s: Staff }) => (
    <div className={`rounded-3xl overflow-hidden border hover-lift group ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-100"}`}>
      <div className="h-56 relative bg-gradient-to-br from-[#0F1E36] to-[#1E293B] flex items-center justify-center overflow-hidden">
        {s.image ? (
          <Image src={urlFor(s.image).url()} alt={s.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
        ) : s.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.imageUrl} alt={s.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        ) : (
          <span className="text-[#C59B27] text-8xl font-black opacity-30 group-hover:scale-110 transition duration-500">
            {s.name.charAt(0)}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-[#C59B27] text-[#0F1E36] uppercase tracking-wider">
            {s.role}
          </span>
          {typeof s.age === "number" && (
            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#0F1E36]">
              Age {s.age}
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-black text-lg leading-tight">{s.name}</h3>
        {s.fatherName && (
          <p className="text-xs opacity-60 mt-1 font-medium">S/o {s.fatherName}</p>
        )}
        {s.qualification && (
          <div className="mt-3">
            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              🎓 {s.qualification}
            </span>
          </div>
        )}
        <button
          onClick={() => setSelectedStaff(s)}
          className="mt-4 text-xs font-black text-[#C59B27] flex items-center gap-1 hover:gap-2 transition-all"
        >
          View Full Profile <span>→</span>
        </button>
      </div>
    </div>
  );

  return (
    <main className={`relative min-h-screen font-sans overflow-hidden transition-colors duration-300 ${isDarkMode ? "dark bg-[#0B1221] text-gray-200" : "bg-[#FDFDFD] text-[#0F1E36]"}`}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .glass-card { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.6); }
        .dark .glass-card { background: rgba(30, 41, 59, 0.85); border: 1px solid rgba(255, 255, 255, 0.1); }
        .premium-shadow { box-shadow: 0 30px 60px -15px rgba(15, 30, 54, 0.15); }
        .dark .premium-shadow { box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6); }
        .hover-lift { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease; }
        .hover-lift:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 40px 70px -20px rgba(15, 30, 54, 0.2); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .bg-pattern { background-image: radial-gradient(#C59B27 1px, transparent 1px); background-size: 24px 24px; opacity: 0.08; }
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
      <section id="home" className="relative overflow-hidden px-5 py-32 text-center text-white sm:py-40 bg-[#0F1E36]">
        <div className="absolute inset-0 bg-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1E36]/95" />
        
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
            <a href="#admission-process" className="rounded-xl bg-gradient-to-r from-[#C59B27] to-[#E5C66C] px-8 py-4 font-bold text-[#0F1E36] shadow-[0_10px_30px_rgba(197,155,39,0.4)] hover:shadow-[0_15px_40px_rgba(197,155,39,0.6)] hover:-translate-y-1 transition-all">
              Admission Process
            </a>
            <a href="#about" className="rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md px-8 py-4 font-bold text-white hover:bg-white hover:text-[#0F1E36] transition-all">
              Explore Campus
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={`relative z-20 pt-16 pb-8 px-5 ${isDarkMode ? "bg-[#0B1221]" : "bg-[#F8F7F2]"}`}>
        <div className="mx-auto max-w-5xl">
          <div className={`grid grid-cols-2 md:grid-cols-4 rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(15,30,54,0.15)] border ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-100"}`}>
            <div className={`flex flex-col items-center justify-center py-8 px-4 text-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"} transition-colors`}>
              <p className="text-4xl sm:text-5xl font-black text-[#C59B27] tracking-tight">100%</p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mt-3 text-gray-500 dark:text-gray-400">Day Scholars</p>
            </div>
            <div className={`flex flex-col items-center justify-center py-8 px-4 text-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"} transition-colors`}>
              <p className="text-4xl sm:text-5xl font-black text-[#C59B27] tracking-tight">842</p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mt-3 text-gray-500 dark:text-gray-400">Students</p>
            </div>
            <div className={`flex flex-col items-center justify-center py-8 px-4 text-center md:border-r border-gray-100 dark:border-gray-700 ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"} transition-colors`}>
              <p className="text-4xl sm:text-5xl font-black text-[#C59B27] tracking-tight">14</p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mt-3 text-gray-500 dark:text-gray-400">Classrooms</p>
            </div>
            <div className={`flex flex-col items-center justify-center py-8 px-4 text-center ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"} transition-colors`}>
              <p className="text-4xl sm:text-5xl font-black text-[#C59B27] tracking-tight">30+</p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mt-3 text-gray-500 dark:text-gray-400">Teachers</p>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST NEWS & NOTICES */}
      <section className={`px-5 py-16 ${isDarkMode ? "bg-[#0F172A]" : "bg-white"}`}>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#C59B27] uppercase">Stay Updated</span>
              <h2 className="text-4xl font-black mt-2">Latest News & Notices</h2>
            </div>
            <a href="#events" className="text-sm font-bold text-[#C59B27] hover:underline mt-4 md:mt-0 flex items-center gap-2">
              View All <span>→</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dNews.map((news, i) => (
              <div key={i} onClick={() => setSelectedNotice(news)} className={`group rounded-3xl overflow-hidden cursor-pointer hover-lift border ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-[#F8F7F2] border-gray-100"}`}>
                <div className="h-48 w-full relative overflow-hidden bg-[#0F1E36] flex items-center justify-center">
                  {news.imageUrl ? (
                    <Image src={news.imageUrl} alt={news.title || "News"} fill className="object-cover group-hover:scale-110 transition duration-700" />
                  ) : (
                    <span className="text-6xl drop-shadow-lg">📢</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#C59B27] text-[#0F1E36] text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">{news.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-[#C59B27] mb-2 block">{news.date}</span>
                  <h3 className="font-bold text-xl mb-3 group-hover:text-[#C59B27] transition line-clamp-2">{news.title}</h3>
                  <p className="text-sm opacity-70 line-clamp-2">{news.content}</p>
                  <div className="mt-6 flex items-center text-xs font-bold text-[#C59B27]">
                    Read More <span className="ml-2 group-hover:translate-x-2 transition">→</span>
                  </div>
                </div>
              </div>
            ))}
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
          <div className={`relative rounded-[2rem] p-12 text-center text-white shadow-[0_30px_60px_-15px_rgba(15,30,54,0.3)] overflow-hidden hover-lift ${isDarkMode ? "bg-gradient-to-br from-[#1E293B] to-[#0F1E36] border border-gray-700" : "bg-gradient-to-br from-[#0F1E36] to-[#091426]"}`}>
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
                <div className="text-5xl mb-6 drop-shadow-md">{feat.icon}</div>
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
                   <span className="text-6xl group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">{item.icon}</span>
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

      {/* CAMPUS LIFE */}
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
                <div key={item._id || idx} onClick={() => setSelectedGalleryImg(item)} className="relative rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid shadow-md hover:shadow-2xl transition-all">
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

      {/* EVENTS & NOTICES */}
      <section id="events" className={`px-5 py-24 ${isDarkMode ? "bg-[#0B1221]" : "bg-[#F8F7F2]"}`}>
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#C59B27] rounded-full"></span> Upcoming Events
            </h2>
            <div className="space-y-6">
              {dEvents.map((ev, i) => (
                <div key={i} className={`rounded-3xl border overflow-hidden transition-all hover-lift group ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-100"}`}>
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

          <div>
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#C59B27] rounded-full"></span> Important Notices
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
                <div key={i} onClick={() => setSelectedNotice(n)} className={`rounded-3xl border overflow-hidden cursor-pointer hover-lift group transition-all ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-100"}`}>
                  <div className={`h-48 w-full relative overflow-hidden flex flex-col items-center justify-center ${(!n.image && !n.imageUrl) ? "bg-[#0F1E36]" : ""}`}>
                    {n.image ? (
                      <Image src={urlFor(n.image).url()} alt={n.title || "Notice"} fill className="object-cover group-hover:scale-105 transition duration-500" />
                    ) : n.imageUrl ? (
                      <Image src={n.imageUrl} alt={n.title || "Notice"} fill className="object-cover group-hover:scale-105 transition duration-500" />
                    ) : (
                      <>
                        <div className="absolute top-4 left-4 w-12 h-3 bg-black/50 rounded-full"></div>
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-2">
                           <span className="text-5xl drop-shadow-lg">📢</span>
                        </div>
                      </>
                    )}
                    {(!n.image && !n.imageUrl) ? null : (
                      <div className="absolute top-4 left-4 flex gap-2 z-10">
                         <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full">{n.category}</span>
                         {n.isUrgent && <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse">URGENT</span>}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {(!n.image && !n.imageUrl) && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#C59B27]/20 text-[#C59B27] text-[10px] font-bold px-3 py-1 rounded-full">{n.category}</span>
                        {n.isUrgent && <span className="bg-red-500/20 text-red-500 text-[10px] font-bold px-3 py-1 rounded-full animate-pulse">URGENT</span>}
                      </div>
                    )}
                    <h3 className="font-bold text-xl group-hover:text-[#C59B27] transition line-clamp-2 mt-2">{n.title}</h3>
                    <div className="mt-6 text-sm font-bold text-[#C59B27] flex items-center gap-2">
                      Read Full Notice <span className="text-xl leading-none group-hover:translate-x-1 transition">→</span>
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
          
          <div className={`rounded-[2rem] overflow-hidden border hover-lift group mb-16 flex flex-col md:flex-row shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-100"}`}>
             <div className="md:w-1/3 h-80 md:h-auto relative bg-gradient-to-br from-[#0F1E36] to-[#1E293B] flex items-center justify-center overflow-hidden">
                <span className="text-[#C59B27] text-9xl font-black opacity-30 group-hover:scale-110 transition duration-500">B</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
             </div>
             <div className="md:w-2/3 p-10 flex flex-col items-center text-center justify-center relative">
                <div className={`inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#C59B27] to-[#E5C66C] text-[#0F1E36] mb-6 shadow-lg w-max`}>Secretary&apos;s Message</div>
                <h3 className="text-4xl sm:text-5xl font-black mb-6">Boniface Kisku</h3>
                <p className="text-lg opacity-70 leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                  Dedicated to providing an environment where every child discovers their unique strengths. At MTMS, we believe that education is a partnership between the school, the teachers, and the parents.
                </p>
                <button 
                  onClick={() => setShowSecretaryModal(true)} 
                  className="bg-[#0F1E36] text-white px-10 py-5 rounded-2xl font-black hover:bg-[#C59B27] hover:text-[#0F1E36] transition-all shadow-[0_15px_30px_rgba(15,30,54,0.3)] hover:-translate-y-1 w-full max-w-md flex items-center justify-center gap-3 text-lg border border-white/10"
                >
                  <svg className="w-6 h-6 text-blue-200 group-hover:text-[#0F1E36] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  Welcome from Secretary
                </button>
             </div>
          </div>

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

      {/* TEACHING STAFF */}
      <section className={`px-5 py-24 ${isDarkMode ? "bg-[#0F172A]" : "bg-white"}`}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-[#C59B27] uppercase">Our Team</span>
            <h2 className="text-4xl font-black mt-2">Teaching Staff</h2>
            <p className="opacity-70 mt-2 max-w-2xl mx-auto">Dedicated educators shaping young minds with passion and expertise.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTeaching.map((s, i) => (
              <StaffCard key={s._id || i} s={s} />
            ))}
          </div>

          {dTeachingStaff.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllTeaching(!showAllTeaching)}
                className="px-8 py-4 rounded-xl bg-[#0F1E36] text-white font-black hover:bg-[#C59B27] hover:text-[#0F1E36] transition-all shadow-lg hover:-translate-y-1 inline-flex items-center gap-3"
              >
                {showAllTeaching ? (
                  <>Show Less <span className="text-lg">↑</span></>
                ) : (
                  <>See More Staff ({dTeachingStaff.length - 3} more) <span className="text-lg">→</span></>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* NON-TEACHING STAFF */}
      <section className={`px-5 py-24 ${isDarkMode ? "bg-[#0B1221]" : "bg-[#F8F7F2]"}`}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-[#C59B27] uppercase">Support Team</span>
            <h2 className="text-4xl font-black mt-2">Non-Teaching Staff</h2>
            <p className="opacity-70 mt-2 max-w-2xl mx-auto">The backbone of our daily operations — drivers, guards, helpers, and more.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleNonTeaching.map((s, i) => (
              <StaffCard key={s._id || i} s={s} />
            ))}
          </div>

          {dNonTeachingStaff.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllNonTeaching(!showAllNonTeaching)}
                className="px-8 py-4 rounded-xl bg-[#0F1E36] text-white font-black hover:bg-[#C59B27] hover:text-[#0F1E36] transition-all shadow-lg hover:-translate-y-1 inline-flex items-center gap-3"
              >
                {showAllNonTeaching ? (
                  <>Show Less <span className="text-lg">↑</span></>
                ) : (
                  <>See More Staff ({dNonTeachingStaff.length - 3} more) <span className="text-lg">→</span></>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ACADEMIC CALENDAR */}
      <section className={`px-5 py-24 ${isDarkMode ? "bg-[#0F172A]" : "bg-white"}`}>
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black">Academic Calendar</h2>
            <p className="opacity-70 mt-2">Important dates for the current session</p>
          </div>
          <div className={`rounded-3xl border overflow-hidden shadow-2xl ${isDarkMode ? "border-gray-700 bg-[#1E293B]" : "border-gray-100 bg-[#F8F7F2]"}`}>
            {dCalendar.map((cal, i) => (
              <div key={i} className={`grid grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 items-center p-5 sm:p-6 border-b last:border-0 transition hover:bg-[#C59B27]/5 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className="flex justify-start">
                  <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold tracking-wider whitespace-nowrap ${cal.type === "Exam" ? "bg-red-100 text-red-700" : cal.type === "Holiday" ? "bg-green-100 text-green-700" : "bg-[#C59B27]/20 text-[#C59B27]"}`}>
                    {cal.type}
                  </span>
                </div>
                <div className="font-bold text-sm sm:text-lg leading-snug">
                  {cal.title}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#C59B27] text-right whitespace-nowrap">
                  {cal.date}
                </div>
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
                  <span className="text-6xl group-hover:scale-125 group-hover:rotate-6 transition duration-500 drop-shadow-md">{fac.icon}</span>
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
                <div className="text-[#C59B27] text-5xl mb-4">“</div>
                <p className="text-base opacity-80 italic mb-6 leading-relaxed">{test.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#0F1E36] text-[#C59B27] flex items-center justify-center font-black text-2xl shadow-inner">{test.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold text-lg">{test.name}</h4>
                    <p className="text-xs opacity-60 font-bold uppercase tracking-wider">{test.child}</p>
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
                <div className="text-7xl font-black text-[#C59B27] opacity-10 absolute top-2 right-4">{item.step}</div>
                <h3 className="font-bold text-xl mb-3 mt-4 text-[#C59B27]">{item.title}</h3>
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
            <div className="relative w-full max-w-xl rounded-[2rem] border border-[#C59B27]/50 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 sm:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] transform hover:rotate-x-0 rotate-x-6 transition duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-6 gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl animate-float drop-shadow-lg">🧮</span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#E5C66C] tracking-wider uppercase leading-tight">Live Calculator</h3>
                    <p className="text-xs text-gray-400 mt-1">Estimate your first month</p>
                  </div>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Grand Total</p>
                  <p className="text-4xl sm:text-5xl font-black text-[#E5C66C] drop-shadow-md">₹{grandTotal.toLocaleString("en-IN")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-gray-700 bg-[#0B1221] p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-wrap gap-3 mb-8 border-b border-gray-800 pb-4">
              {["class", "uniform", "books", "van"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 text-sm font-bold capitalize rounded-xl transition-all ${activeTab === tab ? "bg-[#C59B27] text-[#0F1E36] shadow-[0_10px_20px_rgba(197,155,39,0.3)] scale-105" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
                  {tab === "class" ? "Class Fees" : tab === "uniform" ? "Uniforms" : tab === "books" ? "Books" : "Van Routes"}
                </button>
              ))}
            </div>

            {activeTab === "class" && (
              <div className="animate-in fade-in zoom-in duration-300">
                <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full p-4 rounded-xl bg-[#0F172A] border border-gray-700 text-white text-lg font-bold mb-6 focus:ring-2 focus:ring-[#C59B27] outline-none">
                  {Object.keys(fallbackClassFees).map(c => <option key={c}>{c}</option>)}
                </select>
                <div className="bg-[#0F172A] p-6 sm:p-8 rounded-xl border border-gray-700 space-y-4">
                  <div className="flex justify-between text-gray-300 text-lg"><span>Admission Fee</span><span className="font-bold text-white">₹{currentAdmissionFee}</span></div>
                  <div className="flex justify-between text-gray-300 text-lg"><span>Monthly Tuition</span><span className="font-bold text-white">₹{currentTuitionFee}</span></div>
                  <div className="flex justify-between pt-6 border-t border-gray-700 font-bold text-[#E5C66C] text-2xl"><span>Total First Month</span><span>₹{(currentAdmissionFee + currentTuitionFee).toLocaleString('en-IN')}</span></div>
                </div>
              </div>
            )}

            {activeTab === "uniform" && (
              <div className="grid md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-300">
                <div className="space-y-4">
                  <div className="flex gap-2 p-1 bg-[#0F172A] rounded-xl border border-gray-700">
                    <button onClick={() => setUniGender("boy")} className={`flex-1 py-3 rounded-lg font-bold transition ${uniGender === "boy" ? "bg-[#C59B27] text-[#0F1E36]" : "text-gray-400 hover:text-white"}`}>Boys</button>
                    <button onClick={() => setUniGender("girl")} className={`flex-1 py-3 rounded-lg font-bold transition ${uniGender === "girl" ? "bg-[#C59B27] text-[#0F1E36]" : "text-gray-400 hover:text-white"}`}>Girls</button>
                  </div>
                  <select value={uniSize} onChange={e => setUniSize(e.target.value)} className="w-full p-4 rounded-xl bg-[#0F172A] border border-gray-700 text-white font-bold outline-none">
                    {uniformSizes.map(s => <option key={s} value={s}>Size {s}</option>)}
                  </select>
                </div>
                <div className="bg-[#0F172A] p-6 sm:p-8 rounded-xl border border-gray-700 flex flex-col justify-center">
                  <div className="flex justify-between py-3 border-b border-gray-700 text-lg"><span className="text-gray-300">{currentUniform.item1}</span><span className="font-bold">₹{currentUniform.cost1}</span></div>
                  <div className="flex justify-between py-3 border-b border-gray-700 text-lg"><span className="text-gray-300">{currentUniform.item2}</span><span className="font-bold">₹{currentUniform.cost2}</span></div>
                  <div className="flex justify-between pt-4 font-bold text-[#E5C66C] text-2xl"><span>Total</span><span>₹{currentUniform.total}</span></div>
                </div>
              </div>
            )}

            {activeTab === "books" && (
              <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <input type="number" placeholder="Textbooks ₹" onChange={e => setTextbookCost(Number(e.target.value))} className="p-4 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none focus:border-[#C59B27] font-medium" />
                  <input type="number" placeholder="Drawing ₹" onChange={e => setDrawingCost(Number(e.target.value))} className="p-4 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none focus:border-[#C59B27] font-medium" />
                  <input type="number" placeholder="Small Copies" onChange={e => setSmallCopies(Number(e.target.value))} className="p-4 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none focus:border-[#C59B27] font-medium" />
                  <input type="number" placeholder="Big Copies" onChange={e => setBigCopies(Number(e.target.value))} className="p-4 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none focus:border-[#C59B27] font-medium" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <select onChange={e => setTieType(e.target.value)} className="w-full p-4 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none font-medium">
                    <option value="Small">Tie: Small (₹50)</option>
                    <option value="Big">Tie: Big (₹100)</option>
                  </select>
                  <select onChange={e => setBeltType(e.target.value)} className="w-full p-4 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none font-medium">
                    <option value="Small">Belt: Small (₹75)</option>
                    <option value="Big">Belt: Big (₹100)</option>
                  </select>
                  <select onChange={e => setSockSize(e.target.value)} className="w-full p-4 rounded-xl bg-[#0F172A] border border-gray-700 text-white outline-none font-medium">
                    {sockSizes.map(s => <option key={s.size} value={s.size}>Socks {s.size} - ₹{s.cost}</option>)}
                  </select>
                </div>
                <label className="flex items-center gap-3 p-5 bg-[#0F172A] rounded-xl border border-gray-700 cursor-pointer w-max hover:border-[#C59B27] transition">
                  <input type="checkbox" onChange={e => setHasDiary(e.target.checked)} className="w-6 h-6 accent-[#C59B27] rounded" />
                  <span className="font-bold text-base">Add School Diary (₹150)</span>
                </label>
              </div>
            )}

            {activeTab === "van" && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in duration-300">
                {fallbackVanRoutes.map(r => (
                  <button key={r.name} onClick={() => setSelectedRoute(r.name)} className={`p-5 rounded-xl border text-left transition ${selectedRoute === r.name ? "bg-[#C59B27] text-[#0F1E36] border-[#C59B27] scale-105 shadow-[0_10px_20px_rgba(197,155,39,0.3)]" : "bg-[#0F172A] border-gray-700 hover:border-gray-500 text-gray-300"}`}>
                    <span className="block font-bold text-lg">{r.name}</span><span className="text-sm font-medium opacity-80">₹{r.cost}/mo</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center text-sm font-bold text-red-300 bg-red-500/10 p-5 rounded-xl border border-red-500/20 backdrop-blur-sm shadow-lg">
            ⚠️ Informational estimator only; no online payment. Please pay fees at the school office.
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`px-5 py-24 ${isDarkMode ? "bg-[#0B1221]" : "bg-white"}`}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-black text-center mb-16">Contact & Location</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className={`p-8 rounded-3xl border hover-lift ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-[#F8F7F2] border-gray-200"}`}>
              <div className="w-14 h-14 bg-[#C59B27]/20 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">📍</div>
              <h3 className="font-bold text-xl mb-3">School Address</h3>
              <p className="text-sm font-medium opacity-70 leading-relaxed">At- Kauri Khutana, PO- Bhagaiya, PS- Mirzachowki, Dist- Sahibganj, Jharkhand (813208)</p>
            </div>
            <div className={`p-8 rounded-3xl border hover-lift ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-[#F8F7F2] border-gray-200"}`}>
              <div className="w-14 h-14 bg-[#C59B27]/20 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">📞</div>
              <h3 className="font-bold text-xl mb-3">Phone</h3>
              <a href="tel:+919955080617" className="text-base font-bold text-[#C59B27] hover:underline">+91 99550 80617</a>
            </div>
            <div className={`p-8 rounded-3xl border hover-lift ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-[#F8F7F2] border-gray-200"}`}>
              <div className="w-14 h-14 bg-[#C59B27]/20 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">✉️</div>
              <h3 className="font-bold text-xl mb-3">Email</h3>
              <a href="mailto:mtmschoolofficial2005@gmail.com" className="text-sm font-bold text-[#C59B27] hover:underline break-all">mtmschoolofficial2005@gmail.com</a>
            </div>
          </div>

          <div className={`p-8 sm:p-10 rounded-3xl border shadow-lg ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-[#F8F7F2] border-gray-200"}`}>
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3"><span className="text-[#C59B27] text-3xl">🗺️</span> Get Directions</h3>
            <form onSubmit={handleGetDirections} className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" placeholder="Enter your starting address..." value={userAddress} onChange={(e) => setUserAddress(e.target.value)}
                className={`flex-1 p-5 rounded-xl border font-bold focus:outline-none focus:ring-2 focus:ring-[#C59B27] ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"}`} required
              />
              <div className="flex gap-3 w-full md:w-auto">
                <select value={travelMode} onChange={(e) => setTravelMode(e.target.value)} className={`p-5 rounded-xl border font-bold outline-none flex-1 md:flex-none ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"}`}>
                  <option value="driving">🚗 Car</option>
                  <option value="two-wheeler">🏍️ Bike</option>
                  <option value="walking">🚶‍♂️ Walk</option>
                </select>
                <button type="submit" className="flex-1 md:flex-none bg-[#0F1E36] text-white font-black px-6 md:px-10 py-5 rounded-xl hover:bg-[#C59B27] hover:text-[#0F1E36] transition shadow-[0_10px_20px_rgba(15,30,54,0.2)] whitespace-nowrap">Get Route</button>
              </div>
            </form>
          </div>

          <div className="mt-10 rounded-3xl overflow-hidden shadow-2xl h-[450px] border-8 border-white dark:border-gray-800">
            <iframe src="https://maps.google.com/maps?q=Mother%20Teresa%20Memorial%20School,%20Kauri%20Khutana,%20Bhagaiya,%20Sahibganj,%20Jharkhand&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Map"></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`px-4 py-12 sm:py-14 text-center ${isDarkMode ? "bg-black" : "bg-[#091426]"} text-white relative overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C59B27] to-transparent" />
        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.12em] leading-snug text-[#C59B27]">
            MOTHER TERESA
            <span className="block mt-1">MEMORIAL SCHOOL</span>
          </h2>
          <p className="text-sm font-semibold text-gray-400 mt-4 tracking-wider">
            UDISE Code: {schoolInfo?.udiseCode || "20090212202"}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mt-8 text-sm font-semibold">
            <Link href="/privacy" className="text-gray-300 hover:text-[#C59B27] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-300 hover:text-[#C59B27] transition-colors">Terms & Conditions</Link>
            <Link href="/mandatory-disclosure" className="text-gray-300 hover:text-[#C59B27] transition-colors">Mandatory Disclosure</Link>
          </div>
          <div className="w-full max-w-3xl mt-8 pt-5 border-t border-white/10">
            <p className="text-xs sm:text-sm font-medium text-gray-400 leading-relaxed">
              © 2026 Mother Teresa Memorial School. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ============ POPUP MODALS ============ */}
      
      {/* Secretary Modal */}
      {showSecretaryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in" onClick={() => setShowSecretaryModal(false)}>
          <div className={`relative w-full max-w-2xl rounded-[2rem] shadow-2xl animate-in zoom-in-95 flex flex-col max-h-[90vh] overflow-hidden ${isDarkMode ? "bg-[#1E293B] border border-gray-700 text-white" : "bg-white"}`} onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#0F1E36] to-[#1E293B] p-6 sm:p-10 text-white relative shrink-0">
              <button onClick={() => setShowSecretaryModal(false)} className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold hover:bg-red-500 transition z-10 text-white">✕</button>
              <h3 className="text-2xl sm:text-4xl font-black mb-2 pr-14">Welcome to MTMS</h3>
              <p className="text-[#C59B27] font-bold text-sm sm:text-lg">Message from the Secretary</p>
            </div>
            <div className="p-6 sm:p-10 space-y-4 sm:space-y-5 text-base sm:text-lg leading-relaxed font-medium overflow-y-auto rounded-b-[2rem]">
              <p>Dear Parents and Students,</p>
              <p>It gives me immense pleasure to welcome you to Mother Teresa Memorial School. Our goal is not just academic excellence, but to instill strong moral values, discipline, and a sense of responsibility in every child.</p>
              <p>At MTMS, we believe that education is a partnership between the school, the teachers, and the parents. Together, we can create an environment where children feel safe, valued, and inspired to learn.</p>
              <div className="mt-10 pt-8 border-t dark:border-gray-700">
                <p className="font-bold">Warm Regards,</p>
                <p className="text-2xl font-black text-[#C59B27] mt-2">Boniface Kisku</p>
                <p className="text-sm font-bold opacity-60">Secretary, Mother Teresa Memorial School</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Lightbox */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedGalleryImg(null)}>
          <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedGalleryImg(null)} className="absolute -top-14 right-0 text-white hover:text-[#C59B27] text-2xl font-bold bg-white/10 w-12 h-12 rounded-full flex items-center justify-center transition">✕</button>
            <div className="relative w-full h-[80vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"><Image src={urlFor(selectedGalleryImg.image).url()} alt={selectedGalleryImg.title || "Gallery"} fill className="object-contain bg-black" /></div>
            <p className="text-white text-2xl font-bold mt-8 bg-white/10 px-8 py-3 rounded-full backdrop-blur-md">{selectedGalleryImg.title}</p>
          </div>
        </div>
      )}

      {/* Notice Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedNotice(null)}>
          <div className={`relative w-full max-w-2xl rounded-[2rem] shadow-2xl animate-in zoom-in-95 overflow-hidden flex flex-col max-h-[90vh] ${isDarkMode ? "bg-[#1E293B] border border-gray-700 text-white" : "bg-white"}`} onClick={e => e.stopPropagation()}>
            {selectedNotice.image || selectedNotice.imageUrl ? (
              <div className="h-64 w-full relative shrink-0">
                <Image src={selectedNotice.image ? urlFor(selectedNotice.image).url() : (selectedNotice.imageUrl as string)} alt={selectedNotice.title || "Notice"} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
            ) : null}
            <div className="p-6 sm:p-10 overflow-y-auto rounded-b-[2rem]">
              <button onClick={() => setSelectedNotice(null)} className="absolute top-6 right-6 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center font-bold hover:bg-red-500 transition z-10">✕</button>
              <div className="flex items-center gap-3 mb-6 pr-12">
                <span className="text-[#C59B27] font-bold text-sm uppercase tracking-widest bg-[#C59B27]/10 px-3 py-1 rounded-full">{selectedNotice.category}</span>
                <span className="text-gray-400 text-sm font-bold">•</span>
                <span className="text-gray-500 text-sm font-bold">{selectedNotice.date}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black mb-6 leading-tight">{selectedNotice.title}</h3>
              <p className="text-base sm:text-lg leading-relaxed opacity-80 whitespace-pre-wrap font-medium">{selectedNotice.content}</p>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedAchievement(null)}>
          <div className={`relative w-full max-w-lg rounded-[2rem] p-8 sm:p-10 shadow-2xl animate-in zoom-in-95 ${isDarkMode ? "bg-[#1E293B] border border-gray-700 text-white" : "bg-white"}`} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedAchievement(null)} className="absolute top-6 right-6 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold hover:bg-red-100 hover:text-red-600 transition">✕</button>
            <div className="w-20 h-20 bg-[#C59B27]/20 rounded-3xl flex items-center justify-center text-4xl mb-8">🏆</div>
            <span className="text-[#C59B27] text-xs font-bold uppercase tracking-widest">{selectedAchievement.category}</span>
            <h3 className="text-3xl font-black mb-4 mt-2 pr-10">{selectedAchievement.title}</h3>
            <p className="text-lg leading-relaxed opacity-80 font-medium">{selectedAchievement.description}</p>
          </div>
        </div>
      )}

      {/* Facility Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedFacility(null)}>
          <div className={`relative w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[90vh] ${isDarkMode ? "bg-[#1E293B] border border-gray-700 text-white" : "bg-white"}`} onClick={(e) => e.stopPropagation()}>
            <div className="h-48 w-full bg-gradient-to-br from-[#0F1E36] to-[#1E293B] flex items-center justify-center relative shrink-0">
               <span className="text-8xl drop-shadow-lg">{selectedFacility.icon}</span>
               <button onClick={() => setSelectedFacility(null)} className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-red-500 z-10 transition">✕</button>
            </div>
            <div className="p-8 sm:p-10 overflow-y-auto rounded-b-[2rem]">
              <h3 className="text-3xl font-black mb-4 text-[#C59B27] pr-10">{selectedFacility.title}</h3>
              <p className={`leading-relaxed text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{selectedFacility.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Staff Profile Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedStaff(null)}>
          <div className={`relative w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[90vh] ${isDarkMode ? "bg-[#1E293B] border border-gray-700 text-white" : "bg-white"}`} onClick={(e) => e.stopPropagation()}>
            <div className="h-56 w-full bg-gradient-to-br from-[#0F1E36] to-[#1E293B] flex items-center justify-center relative shrink-0 overflow-hidden">
              {selectedStaff.image ? (
                <Image src={urlFor(selectedStaff.image).url()} alt={selectedStaff.name} fill className="object-cover" />
              ) : selectedStaff.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={selectedStaff.imageUrl} alt={selectedStaff.name} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <span className="text-[#C59B27] text-9xl font-black opacity-30">{selectedStaff.name.charAt(0)}</span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <button onClick={() => setSelectedStaff(null)} className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-red-500 z-10 transition">✕</button>
              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black bg-[#C59B27] text-[#0F1E36] uppercase tracking-wider shadow-lg">
                  {selectedStaff.role}
                </span>
              </div>
            </div>
            <div className="p-8 sm:p-10 overflow-y-auto rounded-b-[2rem]">
              <h3 className="text-3xl font-black mb-6 text-[#0F1E36] dark:text-white">{selectedStaff.name}</h3>
              <div className="space-y-4">
                {selectedStaff.fatherName && (
                  <div className={`p-4 rounded-xl border flex items-center gap-3 ${isDarkMode ? "bg-[#0F172A] border-gray-700" : "bg-[#F8F7F2] border-gray-200"}`}>
                    <span className="text-2xl">👨‍👦</span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Father&apos;s Name</p>
                      <p className="font-bold">{selectedStaff.fatherName}</p>
                    </div>
                  </div>
                )}
                {selectedStaff.qualification && (
                  <div className={`p-4 rounded-xl border flex items-center gap-3 ${isDarkMode ? "bg-[#0F172A] border-gray-700" : "bg-[#F8F7F2] border-gray-200"}`}>
                    <span className="text-2xl">🎓</span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Qualification</p>
                      <p className="font-bold">{selectedStaff.qualification}</p>
                    </div>
                  </div>
                )}
                {typeof selectedStaff.age === "number" && (
                  <div className={`p-4 rounded-xl border flex items-center gap-3 ${isDarkMode ? "bg-[#0F172A] border-gray-700" : "bg-[#F8F7F2] border-gray-200"}`}>
                    <span className="text-2xl">🎂</span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Age</p>
                      <p className="font-bold">{selectedStaff.age} Years</p>
                    </div>
                  </div>
                )}
                <div className={`p-4 rounded-xl border flex items-center gap-3 ${isDarkMode ? "bg-[#0F172A] border-gray-700" : "bg-[#F8F7F2] border-gray-200"}`}>
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Designation</p>
                    <p className="font-bold">{selectedStaff.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COOKIE BANNER */}
      {showCookies && (
        <div className={`fixed bottom-8 left-8 right-8 md:right-auto md:max-w-md z-[90] border p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2rem] animate-in slide-in-from-bottom-10 ${isDarkMode ? "bg-[#1E293B] border-gray-700 text-gray-200" : "bg-white border-gray-200"}`}>
          <h3 className="text-xl sm:text-2xl font-black mb-3 flex items-center gap-3">🍪 We value your privacy</h3>
          <p className={`text-sm font-medium mb-6 sm:mb-8 leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>We use cookies to enhance your browsing experience and analyze our traffic.</p>
          <div className="flex gap-3 sm:gap-4">
            <button onClick={() => setShowCookies(false)} className="flex-1 bg-[#C59B27] text-[#0F1E36] font-black py-3 sm:py-4 rounded-xl hover:bg-yellow-500 transition shadow-lg hover:-translate-y-1 text-sm sm:text-base">Accept</button>
            <button onClick={() => setShowCookies(false)} className={`flex-1 border-2 border-gray-300 dark:border-gray-600 font-black py-3 sm:py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm sm:text-base`}>Reject</button>
          </div>
        </div>
      )}

      {/* SCROLL TO TOP */}
      {showTopBtn && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-32 right-8 z-[80] h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#C59B27] text-[#0F1E36] shadow-[0_15px_30px_rgba(197,155,39,0.5)] flex items-center justify-center hover:bg-yellow-500 transition-all transform hover:-translate-y-2 border-4 border-white dark:border-gray-800"
          title="Go to Top"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
        </button>
      )}

      {/* AI ASSISTANT CHAT */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[80] flex flex-col items-end">
        {chatOpen && (
          <div className={`mb-6 w-[90vw] sm:w-[420px] rounded-[2rem] shadow-2xl border flex flex-col animate-in slide-in-from-bottom-5 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-200"}`}>
            <div className="bg-gradient-to-r from-[#0F1E36] to-[#1E293B] p-5 sm:p-6 flex justify-between items-center text-white rounded-t-[2rem]">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#C59B27] flex items-center justify-center font-black text-[#0F1E36] shadow-inner text-lg sm:text-xl">M</div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold">MTMS Assistant</h4>
                  <p className="text-[10px] sm:text-xs text-[#C59B27] font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white bg-white/10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition">✕</button>
            </div>
            
            <div className={`h-80 overflow-y-auto p-4 sm:p-6 space-y-4 ${isDarkMode ? "bg-[#0F172A]" : "bg-[#F8F7F2]"}`}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 sm:p-4 text-sm font-medium shadow-sm ${msg.sender === "user" ? "bg-[#C59B27] text-[#0F1E36] rounded-br-none" : `${isDarkMode ? "bg-[#1E293B] text-gray-200 border-gray-700" : "bg-white text-gray-700 border-gray-200"} border rounded-bl-none`}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-xs text-gray-400 italic flex items-center gap-1"><span className="animate-bounce">●</span><span className="animate-bounce delay-100">●</span><span className="animate-bounce delay-200">●</span></div>}
            </div>

            <div className={`p-4 sm:p-5 border-t rounded-b-[2rem] ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-100"}`}>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-3 sm:mb-4">
                {["Fees", "Timings", "Admission", "Van Routes"].map(q => (
                  <button key={q} onClick={() => handleSuggestedQuestion(q)} className="text-xs whitespace-nowrap bg-[#C59B27]/10 text-[#C59B27] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold hover:bg-[#C59B27] hover:text-[#0F1E36] transition shadow-sm">{q}</button>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2 sm:gap-3">
                <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask a question..." className={`flex-1 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-[#C59B27] ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-gray-50 border-gray-200"}`} />
                <button id="chat-submit-btn" type="submit" className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl bg-[#0F1E36] text-[#C59B27] hover:bg-[#C59B27] hover:text-[#0F1E36] transition shadow-lg hover:-translate-y-1">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                </button>
              </form>
            </div>
          </div>
        )}
        
        <button onClick={() => setChatOpen(!chatOpen)} className="relative flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 bg-[#0F1E36] rounded-full shadow-[0_15px_40px_rgba(15,30,54,0.5)] hover:scale-110 hover:bg-[#C59B27] transition-all duration-300 border-4 border-[#C59B27] group">
          <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-14 sm:h-14 group-hover:scale-110 transition drop-shadow-md">
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
          <div className="absolute top-0 right-0 bg-red-500 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 sm:border-4 border-white animate-pulse"></div>
        </button>
      </div>
    </main>
  );
}