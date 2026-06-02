import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';

const ProcessSection = dynamic(
  () => import('@/components/ProcessSection'),
  { ssr: true },
);
const ServicesSection = dynamic(
  () => import('@/components/ServicesSection'),
  { ssr: true },
);
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

export default function Home() {
  return (
    <main
      id="main-content"
      className="w-full flex-col min-h-screen relative overflow-x-clip selection:bg-[#EF4A2A] selection:text-white"
    >
      <HeroSection />
      <ProcessSection />
      <ServicesSection />
      <Footer />
    </main>
  );
}
