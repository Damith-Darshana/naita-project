export default function StatCard({ value, label, year, icon }) {
  return (
    <div className="bg-white flex flex-col items-center justify-center rounded-sm w-26 shadow-sm p-2 lg:w-auto lg:p-4 lg:rounded-md">
      {icon && (
        <div className="bg-red-300/25 w-8 h-8 flex items-center justify-center rounded-full mb-2 lg:w-16 lg:h-16">
          <img 
            src={icon} 
            alt={label} 
            className="w-4 h-4 lg:w-8 lg:h-8" 
          />
        </div>
      )}
      <div className="text-base text-gray-900 font-bold text-center lg:text-2xl">
        {value}
      </div>
      <div className="text-xs text-gray-600 text-wrap text-center lg:text-base">
        {label}
      </div>
      {year && (
        <div className="text-xs text-gray-600 text-nowrap text-center lg:text-base">
          {year}
        </div>
      )}
    </div>
  );
}