'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Zap, 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  CreditCard,
  History,
  UserCheck
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  balance: number;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();

  // Simulation d'utilisateur connecté (à remplacer par vraie auth)
  useEffect(() => {
    // Simuler la récupération de l'utilisateur
    const mockUser: User = {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean@example.com',
      role: 'user',
      balance: 45000
    };
    
    // Simuler si on est sur une page qui nécessite d'être connecté
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
      setUser(mockUser);
      setNotifications(3);
    }
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/features', label: 'Fonctionnalités' },
    { href: '/pricing', label: 'Tarifs' },
    { href: '/support', label: 'Support' },
  ];

  const userNavLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: <CreditCard className="h-4 w-4" /> },
    { href: '/dashboard/deposit', label: 'Déposer', icon: <Zap className="h-4 w-4" / >},
    { href: '/dashboard/withdraw', label: 'Retirer', icon: <Zap className="h-4 w-4 rotate-180" /> },
    { href: '/dashboard/history', label: 'Historique', icon: <History className="h-4 w-4" /> },
  ];

  const adminNavLinks = [
    { href: '/admin', label: 'Admin', icon: <UserCheck className="h-4 w-4" /> },
    { href: '/admin/users', label: 'Utilisateurs', icon: <User className="h-4 w-4" /> },
    { href: '/admin/transactions', label: 'Transactions', icon: <CreditCard className="h-4 w-4" /> },
  ];

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              StellarPay
            </span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {!user ? (
              // Navigation pour utilisateur non connecté
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group ${
                      pathname === link.href ? 'text-cyan-400' : ''
                    }`}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </>
            ) : (
              // Navigation pour utilisateur connecté
              <>
                {userNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-1 text-gray-300 hover:text-cyan-400 transition-colors duration-300 ${
                      pathname === link.href ? 'text-cyan-400' : ''
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
                
                {user.role === 'admin' && (
                  <>
                    <div className="w-px h-6 bg-gray-600"></div>
                    {adminNavLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center space-x-1 text-gray-300 hover:text-purple-400 transition-colors duration-300 ${
                          pathname === link.href ? 'text-purple-400' : ''
                        }`}
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </>
                )}
              </>
            )}
          </div>

          {/* Partie droite */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              // Boutons pour utilisateur non connecté
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-cyan-400 border border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300"
                >
                  Connexion
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105"
                >
                  S'inscrire
                </Link>
              </>
            ) : (
              // Interface pour utilisateur connecté
              <>
                {/* Balance */}
                <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full border border-green-400/30">
                  <span className="text-green-400 font-semibold">
                    {formatBalance(user.balance)}
                  </span>
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-300 hover:text-cyan-400 transition-colors">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>

                {/* Menu utilisateur */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-black" />
                    </div>
                    <span className="text-sm text-gray-300">{user.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
                      <div className="p-3 border-b border-gray-700">
                        <p className="text-sm text-gray-300">{user.email}</p>
                        <p className="text-xs text-cyan-400">
                          {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/dashboard/settings"
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Paramètres</span>
                        </Link>
                        <button className="flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-800 w-full text-left">
                          <LogOut className="h-4 w-4" />
                          <span>Déconnexion</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Menu mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menu mobile ouvert */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            {!user ? (
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 space-y-3">
                  <Link
                    href="/auth/login"
                    className="block w-full px-4 py-2 text-center text-cyan-400 border border-cyan-400 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block w-full px-4 py-2 text-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="px-3 py-2 border-b border-gray-700">
                  <p className="text-sm text-gray-300">{user.name}</p>
                  <p className="text-green-400 font-semibold">
                    {formatBalance(user.balance)}
                  </p>
                </div>
                {userNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
                {user.role === 'admin' && (
                  <>
                    <div className="border-t border-gray-700 pt-3">
                      {adminNavLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-purple-400 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;