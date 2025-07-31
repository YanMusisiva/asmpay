'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, Shield, Globe, Send, Star } from 'lucide-react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

const HomePage: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Générer des étoiles aléatoirement
    const newStars: Star[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 2,
    }));

    // Générer des particules flottantes
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
    }));

    setStars(newStars);
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white overflow-hidden relative">
      {/* Étoiles d'arrière-plan */}
      <div className="fixed inset-0 z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Particules flottantes */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-bounce"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: '6s',
            }}
          />
        ))}
      </div>

      {/* Header */}
      {/* <header className="relative z-20 border-b border-cyan-500/30 bg-black/20 backdrop-blur-lg">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              StellarPay
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Accueil', 'Services', 'Tarifs', 'À propos'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex space-x-4">
            <button className="px-4 py-2 text-cyan-400 border border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300">
              Connexion
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105">
              S'inscrire
            </button>
          </div>
        </nav>
      </header> */}

      {/* Section Hero */}
      <main className="relative z-20 pt-16">
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-white to-cyan-200 bg-clip-text text-transparent animate-pulse">
                Transferts Mobile Money
                <span className="block mt-2">Inter-Pays</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Déposez, retirez et transférez de l'argent entre Uganda, Burundi et RDC. 
                Sans vérification d'identité, sans frais cachés.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
              <button className="group px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full text-lg font-semibold hover:from-green-400 hover:to-cyan-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 flex items-center justify-center space-x-2">
                <ArrowRight className="h-5 w-5 rotate-90" />
                <span>Déposer</span>
              </button>
              
              <button className="group px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-lg font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 flex items-center justify-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Transférer</span>
              </button>
              
              <button className="px-6 py-3 border-2 border-purple-400 text-purple-400 rounded-full text-lg font-semibold hover:bg-purple-400 hover:text-black transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <ArrowRight className="h-5 w-5 -rotate-90" />
                <span>Retirer</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { number: '3', label: 'Pays disponibles' },
                { number: '0€', label: 'Frais supplémentaires' },
                { number: '0', label: 'Vérification requise' }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Comment ça marche */}
        <section className="py-20 px-6 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Comment ça marche ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Dépôt */}
              <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 backdrop-blur-sm rounded-3xl p-6 border border-green-500/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                    <ArrowRight className="h-6 w-6 text-black rotate-90" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400">Déposer</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-black text-sm font-bold mt-1">1</div>
                    <p className="text-gray-300 text-sm">Recevez un numéro selon votre pays</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-black text-sm font-bold mt-1">2</div>
                    <p className="text-gray-300 text-sm">Envoyez l'argent via Mobile Money</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-black text-sm font-bold mt-1">3</div>
                    <p className="text-gray-300 text-sm">Balance mise à jour après confirmation</p>
                  </div>
                </div>
              </div>

              {/* Transfert Inter-Pays */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-6 border border-cyan-500/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center mr-4">
                    <Send className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-400">Transférer</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-sm font-bold mt-1">1</div>
                    <p className="text-gray-300 text-sm">Saisissez le numéro de destination</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-sm font-bold mt-1">2</div>
                    <p className="text-gray-300 text-sm">Choisissez le montant à envoyer</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-sm font-bold mt-1">3</div>
                    <p className="text-gray-300 text-sm">Destinataire reçoit sur son Mobile Money</p>
                  </div>
                </div>
              </div>

              {/* Retrait */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-4">
                    <ArrowRight className="h-6 w-6 text-black -rotate-90" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-400">Retirer</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-black text-sm font-bold mt-1">1</div>
                    <p className="text-gray-300 text-sm">Cliquez sur "Retirer" dans votre compte</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-black text-sm font-bold mt-1">2</div>
                    <p className="text-gray-300 text-sm">Montant débité de votre balance</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-black text-sm font-bold mt-1">3</div>
                    <p className="text-gray-300 text-sm">Recevez sur votre numéro d'inscription</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Exemple de transfert inter-pays */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-center mb-6 text-white">
                🌍 Exemple : Transfert Uganda → RDC
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🇺🇬</span>
                  </div>
                  <p className="text-white font-semibold">Jean (Uganda)</p>
                  <p className="text-gray-400 text-sm">MTN: +256 7XX XXX XXX</p>
                </div>
                
                <div className="flex items-center">
                  <ArrowRight className="h-8 w-8 text-cyan-400 animate-pulse" />
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send className="h-8 w-8 text-black" />
                  </div>
                  <p className="text-white font-semibold">StellarPay</p>
                  <p className="text-gray-400 text-sm">Traitement sécurisé</p>
                </div>
                
                <div className="flex items-center">
                  <ArrowRight className="h-8 w-8 text-cyan-400 animate-pulse" />
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🇨🇩</span>
                  </div>
                  <p className="text-white font-semibold">Marie (RDC)</p>
                  <p className="text-gray-400 text-sm">Vodacom: +243 8XX XXX XXX</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Pays supportés */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Pays & Opérateurs Supportés
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { country: '🇺🇬 Uganda', operators: 'MTN MoMo, Airtel Money' },
                { country: '🇧🇮 Burundi', operators: 'Econet Leo, Smart Money' },
                { country: '🇨🇩 RDC', operators: 'Vodacom M-Pesa, Airtel Money' }
              ].map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300">
                  <div className="text-xl font-semibold text-white mb-3">{item.country}</div>
                  <div className="text-cyan-400 font-medium">{item.operators}</div>
                </div>
              ))}
            </div>
            
            <p className="text-gray-400 text-lg">
              D'autres pays seront ajoutés prochainement selon la demande
            </p>
          </div>
        </section>

        {/* Section Fonctionnalités */}
        <section className="py-20 px-6 bg-black/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Pourquoi StellarPay ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="h-12 w-12 text-cyan-400" />,
                  title: 'Transferts Inter-Pays',
                  description: 'Envoyez de l\'argent entre Uganda, Burundi et RDC sans frontières'
                },
                {
                  icon: <Shield className="h-12 w-12 text-green-400" />,
                  title: 'Aucun frais caché',
                  description: 'Payez uniquement les frais standards de votre opérateur mobile'
                },
                {
                  icon: <Globe className="h-12 w-12 text-blue-400" />,
                  title: 'Sans vérification',
                  description: 'Aucun KYC requis - vous êtes déjà identifié sur votre réseau mobile'
                }
              ].map((feature, index) => (
                <div key={index} className="group p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-3xl border border-cyan-400/30">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Prêt à connecter l'Afrique de l'Est ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Rejoignez la révolution des transferts Mobile Money inter-pays sans contraintes
              </p>
              <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xl font-bold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50">
                Commencer maintenant
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="relative z-20 border-t border-cyan-500/30 bg-black/40 backdrop-blur-lg py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              StellarPay
            </span>
          </div>
          <p className="text-gray-400 mb-6">
            © 2025 StellarPay. Tous droits réservés dans cette galaxie et au-delà.
          </p>
          <div className="flex justify-center space-x-6">
            {['Confidentialité', 'Conditions', 'Support', 'Contact'].map((item) => (
              <a key={item} href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default HomePage;