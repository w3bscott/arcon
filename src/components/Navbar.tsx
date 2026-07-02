"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cuboid } from 'lucide-react';

export interface NavbarProps {
  logoText: string;
  links: Array<{ label: string; href: string }>;
  loginText: string;
  loginHref: string;
  githubText: string;
  githubHref: string;
}

const defaultProps: NavbarProps = {
  logoText: "arcon",
  links: [
    { label: "Components", href: "#" },
    { label: "Architecture", href: "#" },
    { label: "Docs", href: "#" },
  ],
  loginText: "Login",
  loginHref: "#",
  githubText: "Components",
  githubHref: "#",
};

const Navbar = (props: Partial<NavbarProps>) => {
  const { logoText, links, loginText, loginHref, githubText, githubHref } = { ...defaultProps, ...props };
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-50 w-full transition-all duration-300 px-3 md:px-4 ${isScrolled ? 'pt-3' : 'pt-0'}`}>
      <nav 
        className={`flex items-center justify-between px-4 md:px-8 py-3 md:py-4 mx-auto w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/85 backdrop-blur-md shadow-xsm border border-gray-200 rounded-2xl max-w-5xl' 
            : 'bg-transparent border border-transparent rounded-none max-w-7xl'
        }`}
      >
      {/* Logo */}
      <div className="flex items-center gap-2 text-foreground">
        <Cuboid className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
        <span className="font-bold text-lg md:text-xl tracking-tight">{logoText}</span>
      </div>

      {/* Links (Center) */}
      <div className="hidden md:flex items-center gap-8 px-6 py-2 ">
        {links?.map((link, i) => (
          <Link key={i} href={link.href} className="text-sm font-medium text-gray-800 hover:text-black transition-colors">
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        <Link href={loginHref!} className="text-sm font-medium text-gray-800 hover:text-black transition-colors">
          {loginText}
        </Link>
        <Link href={githubHref!} className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm font-medium border border-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
          {githubText}
          {/* <FolderGit2 className="w-4 h-4" /> */}
        </Link>
      </div>
      </nav>
    </div>
  );
};

export { Navbar };
