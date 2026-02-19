export default function SectionWrapper({ id, title, subtitle, children, className = "", titleClassName = "", subtitleClassName = "" }) {
  return (
    <section id={id} className={`py-16 px-10 ${className}`}>
      <div className="w-full mx-auto text-black">
        {title && <h2 className={`text-3xl font-bold mb-8 ${titleClassName}`}>{title}</h2>}
        {subtitle && <p className={`mb-8 text-sm text-neutral-600 ${subtitleClassName}`}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}