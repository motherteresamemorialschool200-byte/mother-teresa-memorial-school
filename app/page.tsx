import SchoolHomeClient from "./SchoolHomeClient";
import { client } from "@/sanity/lib/client";

async function getCachedData() {
  'use cache';
  return await client.fetch(`{
    "schoolInfo": *[_type == "schoolInfo"][0],
    "notices": *[_type == "notice"] | order(_createdAt desc),
    "gallery": *[_type == "gallery"],
    "admissions": *[_type == "admission"],
    "events": *[_type == "event"] | order(_createdAt desc),
    "faculty": *[_type == "faculty"],
    "achievements": *[_type == "achievement"],
    "calendar": *[_type == "calendar"] | order(date asc),
    "faqs": *[_type == "faq"]
  }`);
}

export default async function Page() {
  let schoolInfo = null, notices = [], gallery = [], admissions = [], events = [], faculty = [], achievements = [], calendar = [], faqs = [];

  try {
    const data = await getCachedData();
    schoolInfo = data.schoolInfo;
    notices = data.notices;
    gallery = data.gallery;
    admissions = data.admissions;
    events = data.events;
    faculty = data.faculty;
    achievements = data.achievements;
    calendar = data.calendar;
    faqs = data.faqs;
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: 'Mother Teresa Memorial School',
    url: 'https://motherteresamemorialschool.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kauri Khutana, Bhagaiya',
      addressLocality: 'Sahibganj',
      addressRegion: 'Jharkhand',
      postalCode: '813208',
      addressCountry: 'IN',
    },
    foundingDate: '2005',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SchoolHomeClient 
        schoolInfo={schoolInfo} notices={notices} gallery={gallery} admissions={admissions}
        events={events} faculty={faculty} achievements={achievements} calendar={calendar} faqs={faqs}
      />
    </>
  );
}
