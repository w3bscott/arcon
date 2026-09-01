interface FooterProps {
  brandName?: string;
  copyright?: string;
  disclaimer?: string;
  email?: string;
  className?: string;
}

const defaultProps: FooterProps = {
  brandName: "ARCFORGE",
  copyright: "©2026 ArcForge",
  disclaimer:
    "ArcForge is not officially affiliated with arc.io or shadcn/ui or Tailwind CSS.\nThis project wouldn't be possible without the open-source shadcn/ui project.",
  email: "info@arcforge.com",
};

const Footer = (props: Partial<FooterProps>) => {
  const { brandName, copyright, disclaimer, email, className } = {
    ...defaultProps,
    ...props,
  };

  return (
    <footer className={`w-full overflow-hidden border-t border-gray-100 bg-background ${className ?? ""}`}>
      <div className="w-full max-w-7xl mx-auto px-5 md:px-16 py-8 md:py-12">

        {/* Watermark */}
        <p
          className="w-full select-none text-center font-bold leading-none opacity-40 text-[clamp(36px,16vw,190px)]"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(255,255,255,0.15))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {brandName}
        </p>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 pt-7 md:pt-10 border-t border-gray-100/0">

          <span className="text-xs md:text-sm text-gray-400">
            {copyright}
          </span>

          <p className="text-xs md:text-sm text-gray-400 text-center leading-5 max-w-[28rem]">
            {disclaimer?.split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </p>


          <a href={`mailto:${email}`}
            className="text-xs md:text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            {email}
          </a>

        </div>
      </div>
    </footer>
  );
};

export { Footer };
