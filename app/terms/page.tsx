import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#0F1E36] font-sans pb-20">
      <header className="bg-[#0F1E36] text-white p-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wider">Terms & Conditions</h1>
          <Link href="/" className="text-[#C59B27] font-bold hover:underline text-sm">← Back to Home</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-200 leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl font-extrabold mb-6 text-[#C59B27]">1. Website Usage</h2>
        <p className="mb-4 opacity-80">By using this website, you agree to use it for lawful, informational purposes only. You may not attempt to breach the security of the website, extract administrative data, or misuse the AI Assistant tool.</p>

        <h2 className="text-2xl font-extrabold mb-6 mt-8 text-[#C59B27]">2. Information Accuracy</h2>
        <p className="mb-4 opacity-80">While we strive to keep all information (like events, news, and calendar dates) accurate and up-to-date, the school management reserves the right to modify or cancel any event or notice without prior notice.</p>

        <h2 className="text-2xl font-extrabold mb-6 mt-8 text-[#C59B27]">3. Admissions & Fee Estimator</h2>
        <p className="mb-4 opacity-80"><strong>Informational Only:</strong> The Fee Estimator on this website is a tool for parents to understand approximate costs. It does not constitute a final fee quotation, nor does it allow online payments. All admissions and fee transactions must be completed physically at the school office. Final admission decisions rest solely with the school management.</p>

        <h2 className="text-2xl font-extrabold mb-6 mt-8 text-[#C59B27]">4. AI Assistant Disclaimer</h2>
        <p className="mb-4 opacity-80">Our AI Assistant provides automated responses based on verified school FAQ data. While it is designed to be helpful, it may not cover every specific situation. For critical issues, please always contact the school office directly.</p>
      </main>
    </div>
  );
}
