export default function SectionWrapper({ id, title, children, className = "" }) {
  return (
    <section id={id} className={`py-16 px-10 ${className}`}>
      <div className="max-w-[1600px] mx-auto text-black">
        {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
        {children}
      </div>
    </section>
  );
}
