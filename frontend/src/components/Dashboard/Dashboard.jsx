import { FaUsers, FaUserGraduate, FaBookOpen } from 'react-icons/fa';

export default function Dashboard() {
  const stats = [
    { icon: <FaUsers size={48} />, value: '12.75k', label: 'Active learners' },
    { icon: <FaUserGraduate size={48} />, value: '12.65k', label: 'Graduates' },
    { icon: <FaBookOpen size={48} />, value: '150', label: 'Total courses offered' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Stats Cards */}
        <div className="flex justify-between mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white w-[393px] h-[336px] rounded-tl-none rounded-tr-none rounded-b-[12px] shadow-md flex flex-col items-center justify-center p-8"
            >
              <div className="text-naita-red mb-6">{stat.icon}</div>
              <div className="text-[40px] font-extrabold text-naita-red mb-2">{stat.value}</div>
              <div className="text-[20px] text-naita-gray-light font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Most Demanded Courses Card */}
        <div className="bg-white p-8 rounded-[12px] shadow-md">
          <h2 className="text-[32px] font-bold mb-6">Most Demanded Courses - 2025</h2>
          <div className="h-[400px] bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Bar Chart Visualization Will Appear Here</p>
          </div>
        </div>
      </div>
    </section>
  );
}