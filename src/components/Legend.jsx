export default function Legend() {
  const items = [
    { color: 'bg-red-400', label: 'Public Holiday', desc: 'Mandatory day off' },
    { color: 'bg-teal-500', label: 'Extended Weekend', desc: 'Click to plan a trip!' },
    { color: 'bg-amber-500', label: 'Bridge Day', desc: 'Take leave = mega holiday' },
    { color: 'bg-gray-300', label: 'Regular Weekend', desc: 'Sat / Sun' },
  ];

  return (
    <div className="mt-1.5 flex flex-wrap gap-3 justify-center sm:justify-start">
      {items.map(item => (
        <div key={item.label} className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-sm ${item.color} flex-shrink-0`} />
          <div>
            <span className="text-[11px] font-medium text-gray-700">{item.label}</span>
            <span className="text-[11px] text-gray-400 ml-1 hidden sm:inline">— {item.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
