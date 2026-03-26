interface CouponFilterProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function CouponFilter({ filters, activeFilter, onFilterChange }: CouponFilterProps) {
  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeFilter === filter
              ? "bg-[#72C2FF] text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:border-[#72C2FF] hover:text-[#72C2FF]"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
