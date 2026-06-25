import React from 'react';
import Link from 'next/link';

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
  githubText: "GitHub",
  githubHref: "#",
};

const Navbar = (props: Partial<NavbarProps>) => {
  const { logoText, links, loginText, loginHref, githubText, githubHref } = { ...defaultProps, ...props };

  return (
    <nav className="flex items-center justify-between px-8 py-4 w-full max-w-7xl mx-auto">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7V17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 9.5V19.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 9.5V19.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-bold text-xl tracking-tight">{logoText}</span>
      </div>

      {/* Links (Center) */}
      <div className="hidden md:flex items-center gap-8 bg-gray-50/80 px-6 py-2 rounded-full border border-gray-100">
        {links?.map((link, i) => (
          <Link key={i} href={link.href} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <Link href={loginHref!} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
          {loginText}
        </Link>
        <Link href={githubHref!} className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          {githubText}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </Link>
      </div>
    </nav>
  );
};

export { Navbar };
