import Navbar from '@/components/Navbar'
import PlanoCompleto from '@/components/PlanoCompleto'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import MetodoAmazonAutor from '@/components/MetodoAmazonAutor'
import Stats from '@/components/Stats'
import PublishedBooks from '@/components/PublishedBooks'
import HowItWorks from '@/components/HowItWorks'
import Benefits from '@/components/Benefits'
import Testimonials from '@/components/Testimonials'
import VideoTestimonials from '@/components/VideoTestimonials'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PlanoCompleto />
        <Portfolio />
        <MetodoAmazonAutor />
        <Stats />
        <PublishedBooks />
        <HowItWorks />
        <Benefits />
        <VideoTestimonials />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
