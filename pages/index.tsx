import Cover from '@/src/components/Home/Cover';
import Header from '@/src/components/header';
import useTranslation from 'next-translate/useTranslation';

export default function Home() {
  const {t} = useTranslation('common')
  return (
    <main className="min-h-screen w-full relative flex flex-col items-center">
      <Header/>
      <Cover/>
    </main>
  )
}
