import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTiktok } from "react-icons/fa";
import { useSettings } from "@/context/SettingsContext";

const Footer = () => {
  const { settings } = useSettings();
  const displayLogo = "/zayan_logo.png";
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Visa Assistance", href: "/#services" },
    { name: "Ticket Reservations", href: "/#services" },
    { name: "Online Forms Filling", href: "/#services" },
    { name: "Hotel Bookings", href: "/#services" },
    { name: "Travel Insurance", href: "/#services" },
    { name: "Online Appointments", href: "/#services" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Destinations", href: "/#destinations" },
    { name: "Contact", href: "/#contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src={displayLogo}
                alt="Zayan Travel Consultants"
                className="w-12 h-12 object-contain rounded-lg"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-tight">
                  Zayan Travel Consultants
                </span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Zayan Travel Consultants is a premier visa and travel advisory firm established in 2009. We specialize in providing expert guidance and end-to-end support for student visas, work permits, tourist applications, flight ticket reservations, hotel bookings, travel insurance, and embassy appointments.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href={settings.socialLinks?.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors border border-slate-700"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-white text-sm" />
              </a>
              <a
                href={settings.socialLinks?.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors border border-slate-700"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white text-sm" />
              </a>
              <a
                href={settings.socialLinks?.tiktok || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors border border-slate-700"
                aria-label="TikTok"
              >
                <FaTiktok className="text-white text-sm" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-3 group-hover:bg-white transition-colors" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-3 group-hover:bg-white transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-700">
                  <FaMapMarkerAlt className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-1">Address</p>
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                    {settings.address || "Deans Trade Center, UG 455\nPeshawar, Pakistan"}
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-700">
                  <FaEnvelope className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-1">Email</p>
                  <a
                    href={`mailto:${settings.emailAddress || "zayantravelconsultants@gmail.com"}`}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {settings.emailAddress || "zayantravelconsultants@gmail.com"}
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-700">
                  <FaPhone className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-1">Phone</p>
                  <a
                    href={`tel:${settings.phoneNumber || "091-5603394"}`}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {settings.phoneNumber || "091-5603394"}
                  </a>
                  <p className="text-slate-400 text-sm mt-1">Mobile: 0313-7376309</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} <span className="text-white font-semibold">Zayan Travel Consultants</span>.
              All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
