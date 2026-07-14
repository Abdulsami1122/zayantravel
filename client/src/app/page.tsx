import VisaConsultation from '@/components/VisaConsultation'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
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
      <div id="contact">
        <ContactSection/>
      </div>
    </div>
  )
}

export default page
