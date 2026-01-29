export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-caviro">{title}</h2>
      <p className="text-gray-600 mt-2">{subtitle}</p>
    </div>
  );
}
