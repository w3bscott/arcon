interface SectionHeadingProps {
  title: string;
  description?: string;
  id?: string;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <div id={id} className={`mb-6 scroll-mt-24 ${className}`}>
      <h2 className="text-base font-semibold text-gray-900 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-sm text-gray-500 leading-6">{description}</p>
      )}
    </div>
  );
}
