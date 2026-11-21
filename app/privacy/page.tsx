import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#0F1E36] font-sans pb-20">
      <header className="bg-[#0F1E36] text-white p-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wider">Privacy Policy</h1>
          <Link href="/" className="text-[#C59B27] font-bold hover:underline text-sm">← Back to Home</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-200 leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl font-extrabold mb-6 text-[#C59B27]">1. Information We Display</h2>
        <p className="mb-4 opacity-80">Mother Teresa Memorial School website is designed as an informational portal. We do not require you to create an account, nor do we host public student or parent logins. We only display authorized information such as school notices, events, facilities, and contact details.</p>

        <h2 className="text-2xl font-extrabold mb-6 mt-8 text-[#C59B27]">2. Data Collection & Cookies</h2>
        <p className="mb-4 opacity-80">We do not collect personal data (like your name, phone number, or address) unless you explicitly contact us via email or phone. We may use basic cookies to improve your browsing experience (e.g., remembering dark mode preferences). We do not sell your data to third parties.</p>

        <h2 className="text-2xl font-extrabold mb-6 mt-8 text-[#C59B27]">3. How We Protect Your Information</h2>
        <p className="mb-4 opacity-80">Our website is hosted securely (via Vercel) using HTTPS encryption. Any administrative data (like fee structures or staff details) is managed securely through our Sanity CMS. Only authorized school management has access to the admin dashboard.</p>

        <h2 className="text-2xl font-extrabold mb-6 mt-8 text-[#C59B27]">4. Contact Us</h2>
        <p className="mb-4 opacity-80">If you have any questions about this privacy policy, or if you need to request the removal of any photo or information, please contact the school office at <strong>+91 99550 80617</strong> or email us at <strong>mtmschoolofficial2005@gmail.com</strong>.</p>
      </main>
    </div>
  );
}
