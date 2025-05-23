export default function CourseBar({ name, percentage }) {
  // Ensure percentage is a number between 0-100
  const percentageValue = Math.min(100, Math.max(0, Number(percentage) || 0));
  
  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-xs lg:text-base">
        <span>{name}</span>
        <span className="text-gray-500 text-xs lg:text-base">
          {percentageValue}%
        </span>
      </div>
      <div className="w-full bg-red-700/25 h-2 rounded lg:h-4 lg:rounded-l-none">
        <div 
          className="bg-red-700 h-2 rounded lg:h-4 lg:rounded-l-none" 
          style={{ width: `${percentageValue}%` }}
        ></div>
      </div>
    </div>
  );
}