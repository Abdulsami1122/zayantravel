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
      <div id="about">
        <AboutSection/>
      </div>
      <div id="services">
        <ServicesSection/>
      </div>
      <DestinationsSection/>
      <div id="contact">
        <ContactSection/>
      </div>
    </div>
  )
}

export default page
