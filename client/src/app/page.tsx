import VisaConsultation from '@/components/VisaConsultation'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import DestinationsSection from '@/components/DestinationsSection'
import ContactSection from '@/components/ContactSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <VisaConsultation/>
      <div id="about" className="scroll-mt-24">
        <AboutSection/>
      </div>
      <div id="services" className="scroll-mt-24">
        <ServicesSection/>
      </div>
      <div id="destinations" className="scroll-mt-24">
        <DestinationsSection/>
      </div>
      <div id="contact" className="scroll-mt-24">
        <ContactSection/>
      </div>
    </div>
  )
}

export default page
