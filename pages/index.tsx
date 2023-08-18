import Footer from '@/src/components/Footer';
import Cover from '@/src/components/Home/Cover';
import Locations from '@/src/components/Locations';
import OfferSection from '@/src/components/OfferSection';
import TrustSection from '@/src/components/TrustSection';
import BecomePartner from '@/src/components/becomePartner';
import Header from '@/src/components/header';
import useTranslation from 'next-translate/useTranslation';

export default function Home() {
  return (
    <main className="min-h-screen w-full relative flex flex-col items-center">
      <Header/>
      <Cover/>
      <TrustSection/>
      <OfferSection/>
      <BecomePartner/>
      <Locations/>
      <Footer/>
    </main>
  )
}
