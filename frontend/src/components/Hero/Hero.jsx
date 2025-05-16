import heroImage from '../../assets/Training1.jpg';

export default function Hero() {
  return (
    <div 
      className="relative w-full h-[879px] bg-cover bg-center"
      style={{ backgroundImage: `url("${heroImage}")` }}
    >
      <div className="absolute inset-0 bg-black/30 bg-opacity-40 flex items-center">
        <div className="container ml-4 mt-50 ">
          <div className="bg-white bg-opacity-90 w-[1038px] h-[533px] rounded-[5px] p-12">
            <h1 className="text-5xl font-bold text-[#242424] mb-6">
              National Apprentice and Industrial Training Authority - Sri Lanka
            </h1>
            <p className="text-2xl text-[#414141] mb-8 max-w-3xl">
              In 1971, the National Apprentice Board (NAB) was created to manage and organize job-based training programs for students. With help from the United Nations and the International Labor Organization, NAB developed skills to improve apprenticeship training.
            </p>
            <button className=" bg-red-800 text-white w-[372px] h-[91px] rounded-[12px] text-[24px] font-medium hover:bg-opacity-90 transition mt-12 ">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}