'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Phone, Globe, Zap, CheckCircle } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flag: string;
  operators: string[];
  phonePrefix: string;
}

const countries: Country[] = [
  {
    code: 'UG',
    name: 'Uganda',
    flag: '🇺🇬',
    operators: ['MTN MoMo', 'Airtel Money'],
    phonePrefix: '+256'
  },
  {
    code: 'BI',
    name: 'Burundi',
    flag: '🇧🇮',
    operators: ['Econet Leo', 'Smart Money'],
    phonePrefix: '+257'
  },
  {
    code: 'CD',
    name: 'RDC',
    flag: '🇨🇩',
    operators: ['Vodacom M-Pesa', 'Airtel Money'],
    phonePrefix: '+243'
  }
];

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    operator: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedCountry = countries.find(c => c.code === formData.country);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value,
      // Reset operator when country changes
      ...(name === 'country' && { operator: '' })
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName) newErrors.lastName = 'Le nom est requis';
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.country) newErrors.country = 'Sélectionnez votre pays';
    if (!formData.operator) newErrors.operator = 'Sélectionnez votre opérateur';
    
    if (!formData.phone) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (formData.phone.length < 8) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Vous devez accepter les conditions d\'utilisation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulation de l'inscription
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirection vers dashboard
      window.location.href = '/dashboard';
    } catch {
      setErrors({ general: 'Erreur lors de l\'inscription. Réessayez.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 flex items-center justify-center px-6 py-12">
      {/* Étoiles d'arrière-plan */}
      <div className="fixed inset-0 z-0">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6 group">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-black" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              StellarPay
            </span>
          </Link>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            Créer un compte
          </h1>
          <p className="text-gray-400">
            Rejoignez la révolution des transferts Mobile Money
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-cyan-500/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Nom et Prénom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-white font-medium mb-2">
                  Prénom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.firstName
                        ? 'border-red-500/50 focus:ring-red-500/50'
                        : 'border-gray-600 focus:ring-cyan-500/50 focus:border-cyan-500/50'
                    }`}
                    placeholder="Jean"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-white font-medium mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.lastName
                      ? 'border-red-500/50 focus:ring-red-500/50'
                      : 'border-gray-600 focus:ring-cyan-500/50 focus:border-cyan-500/50'
                  }`}
                  placeholder="Dupont"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-red-500/50 focus:ring-red-500/50'
                      : 'border-gray-600 focus:ring-cyan-500/50 focus:border-cyan-500/50'
                  }`}
                  placeholder="jean@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Pays et Opérateur */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-white font-medium mb-2">
                  Pays
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
                      errors.country
                        ? 'border-red-500/50 focus:ring-red-500/50'
                        : 'border-gray-600 focus:ring-cyan-500/50 focus:border-cyan-500/50'
                    }`}
                  >
                    <option value="" className="bg-gray-800">Sélectionnez votre pays</option>
                    {countries.map(country => (
                      <option key={country.code} value={country.code} className="bg-gray-800">
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.country && (
                  <p className="text-red-400 text-sm mt-1">{errors.country}</p>
                )}
              </div>

              <div>
                <label htmlFor="operator" className="block text-white font-medium mb-2">
                  Opérateur
                </label>
                <select
                  id="operator"
                  name="operator"
                  value={formData.operator}
                  onChange={handleInputChange}
                  disabled={!selectedCountry}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
                    errors.operator
                      ? 'border-red-500/50 focus:ring-red-500/50'
                      : 'border-gray-600 focus:ring-cyan-500/50 focus:border-cyan-500/50'
                  } ${!selectedCountry ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option value="" className="bg-gray-800">Sélectionnez l&apos;opérateur</option>
                  {selectedCountry?.operators.map(operator => (
                    <option key={operator} value={operator} className="bg-gray-800">
                      {operator}
                    </option>
                  ))}
                </select>
                {errors.operator && (
                  <p className="text-red-400 text-sm mt-1">{errors.operator}</p>
                )}
              </div>
            </div>

            {/* Numéro de téléphone */}
            <div>
              <label htmlFor="phone" className="block text-white font-medium mb-2">
                Numéro Mobile Money
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <div className="flex">
                  <div className="flex items-center px-3 bg-white/5 border border-r-0 border-gray-600 rounded-l-xl text-gray-400">
                    {selectedCountry?.phonePrefix || '+XXX'}
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`flex-1 pl-4 pr-4 py-3 bg-white/10 border rounded-r-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? 'border-red-500/50 focus:ring-red-500/50'
                        : 'border-gray-600 focus:ring-cyan-500/50 focus:border-cyan-500/50'
                    }`}
                    placeholder="700123456"
                  />
                </div>
              </div>
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Ce numéro sera utilisé pour vos retraits personnels
              </p>
            </div>

            {/* Mots de passe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-white font-medium mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.password
                        ? 'border-red-500/50 focus:ring-red-500/50'
                        : 'border-gray-600 focus:ring-cyan-500/50 focus:border-cyan-500/50'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">
                  Confirmer
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword
                        ? 'border-red-500/50 focus:ring-red-500/50'
                        : 'border-gray-600 focus:ring-cyan-500/50 focus:border-cyan-500/50'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-3"> 
                <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className={`h-5 w-5 text-cyan-500 border-gray-600 rounded focus:ring-cyan-500/50 transition-all ${
                    errors.agreeTerms ? 'border-red-500/50' : ''
                    }`}
                />
                <label htmlFor="agreeTerms" className="text-gray-400">
                    J&apos;accepte les{' '}
                    <Link href="/terms" className="text-cyan-400 hover:underline">
                    conditions d&apos;utilisation
                    </Link>
                </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-red-400 text-sm mt-1">{errors.agreeTerms}</p>
            )}

            {/* Bouton d'inscription */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <CheckCircle className="animate-spin h-5 w-5" />
                  <span>Chargement...</span>
                </span>
              ) : (
                'Créer mon compte'
              )}
            </button>   
            </form>
            </div>
            </div>
        </div>
      
    );
};
export default RegisterPage;