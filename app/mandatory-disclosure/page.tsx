import { client } from '@/sanity/lib/client';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function MandatoryDisclosure() {
  const schoolInfo = await client.fetch(`*[_type == "schoolInfo"][0]`);
  const disclosures = await client.fetch(`*[_type == "mandatoryDisclosure"]`);

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#0F1E36] font-sans pb-20">
      <header className="bg-[#0F1E36] text-white p-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wider">Mandatory Public Disclosure</h1>
          <Link href="/" className="text-[#C59B27] font-bold hover:underline text-sm">← Back to Home</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
        
        <div className="mb-10 pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-extrabold mb-4 text-[#C59B27]">General Information</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm opacity-80">
            <p><strong>School Name:</strong> Mother Teresa Memorial School</p>
            <p><strong>UDISE+ Code:</strong> {schoolInfo?.udiseCode || "20090212202"}</p>
            <p><strong>Establishment Year:</strong> 2005</p>
            <p><strong>Address:</strong> Kauri Khutana, Bhagaiya, Sahibganj, Jharkhand (813208)</p>
            <p><strong>Medium:</strong> English</p>
            <p><strong>Classes:</strong> Nursery to Class 8</p>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold mb-6 text-[#C59B27]">Official Documents</h2>
        
        {disclosures && disclosures.length > 0 ? (
          <div className="space-y-3">
            {disclosures.map((doc: any) => (
              <div key={doc._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="mb-2 sm:mb-0">
                  <span className="text-xs font-bold text-[#C59B27] uppercase tracking-wider block mb-1">
                    {doc.category || "Document"}
                  </span>
                  <span className="font-semibold text-sm">{doc.title}</span>
                </div>
                <a 
                  href={doc.file?.asset?.url || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#0F1E36] text-white px-4 py-2 rounded text-xs font-bold hover:bg-[#C59B27] hover:text-[#0F1E36] transition"
                >
                  Download PDF
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-lg">
            <p className="font-bold mb-2">Documents Pending Upload</p>
            <p className="text-sm">The school management has not uploaded the official certificates to the CMS yet. Please check back later.</p>
          </div>
        )}
      </main>
    </div>
  );
}
