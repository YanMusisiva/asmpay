import React from 'react';
import Link from 'next/link';
import { Zap, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/40 backdrop-blur-lg border-t border-cyan-500/30 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <Zap className="h-5 w-5 text-black" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                StellarPay
              </span>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              La plateforme de Mobile Money qui simplifie vos transactions en Uganda, Burundi et RDC. 
              Sans vérification d'identité, sans frais cachés.
            </p>
            <div className="flex space-x-4">
              {['🇺🇬', '🇧🇮', '🇨🇩'].map((flag, index) => (
                <div key={index} className="text-2xl hover:scale-110 transition-transform cursor-pointer">
                  {flag}
                </div>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liens rapides</h3>
            <div className="space-y-2">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Comment ça marche', href: '/how-it-works' },
                { label: 'Tarifs', href: '/pricing' },
                { label: 'Support', href: '/support' },
                { label: 'FAQ', href: '/faq' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span>support@stellarpay.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span>+256 700 000 000</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span>Kampala, Uganda</span>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-6">
              <h4 className="text-white font-medium mb-3">Suivez-nous</h4>
              <div className="flex space-x-3">
                {['Twitter', 'LinkedIn', 'Telegram'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-8 h-8 bg-gray-800 hover:bg-cyan-500 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <span className="text-xs">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} StellarPay. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {[
                'Politique de confidentialité',
                'Conditions d\'utilisation',
                'Mentions légales'
              ].map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;