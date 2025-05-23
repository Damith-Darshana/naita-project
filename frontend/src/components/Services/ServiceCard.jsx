export default function ServiceCard({ title, description, icon }) {
  return (
    <div className="bg-white p-4 rounded-sm shadow-sm border-t-2 min-h-32 border-red-800 lg:rounded-md lg:border-r-0 lg:border-l-0 lg:border-t-4 lg:min-h-48 lg:shadow-md lg:rounded-t-none">
      {icon && (
        <div className="bg-red-300/25 w-8 h-8 flex items-center justify-center rounded-full mb-2 lg:w-12 lg:h-12">
          <i className={`text-red-800 text-lg ${icon}`}></i>
        </div>
      )}
      <div className="text-sm text-gray-700 font-semibold pb-2 lg:text-xl">
        {title}
      </div>
      <div className="text-xs text-gray-600 lg:text-base">
        {description}
      </div>
    </div>
  );
}