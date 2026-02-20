export default function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  titleRight = null
}) {
  return (
    <section id={id} className={`py-16 px-10 ${className}`}>
      <div className="w-full mx-auto text-black">
        {title && (
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className={`text-3xl font-bold ${titleClassName}`}>{title}</h2>
            {titleRight}
          </div>
        )}
        {subtitle && <p className={`mb-8 text-m text-neutral-600 ${subtitleClassName}`}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}