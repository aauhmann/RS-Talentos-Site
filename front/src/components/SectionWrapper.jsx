export default function SectionWrapper({ id, title, children, className = "" }) {
  return (
    <section id={id} className={`py-24 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
        {children}
      </div>
    </section>
  );
}
