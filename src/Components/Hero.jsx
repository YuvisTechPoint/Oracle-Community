import Keyboardside from '../assets/keyboard-side.png'
import Keyboardmid from '../assets/keyboard-mid.png'
import Togglebutton from './Togglebutton'
import Backgroundimage from '../assets/Hero-section.png'

const Hero = () => {
  return (
    <div className="relative w-full min-h-[100vh] bg-white overflow-hidden flex flex-col items-center pt-24 sm:pt-32 md:pt-40 pb-10 sm:pb-16 md:pb-20">
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
      >
        <img src={Backgroundimage} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Top Right Keyboard - Hidden on mobile, visible on sm+ */}
      <div className="absolute top-20 sm:top-24 md:top-30 -right-[15%] sm:-right-[10%] md:-right-[8%] w-[120px] sm:w-[180px] md:w-[280px] lg:w-[400px] z-10 rotate-[21.26deg] scale-75 sm:scale-90 md:scale-110">
        <img
          src={Keyboardside}
          alt="Keyboard side"
          className="w-full h-auto"
        />
      </div>

      {/* Text Section */}
      <div className="relative z-40 flex flex-col items-center mt-4 sm:mt-6 md:mt-10 px-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#800000] mb-1 sm:mb-2 tracking-wide font-medium text-center">
          Connect.
        </h1>
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#ff0000] tracking-widest uppercase text-center">
          Collaborate. Create.
        </h2>

        {/* Toggle Button */}
        <div className="mt-6 sm:mt-8 z-30 flex items-center justify-center cursor-pointer scale-90 sm:scale-100">
          <Togglebutton />
        </div>
      </div>

      {/* Main Keyboard */}
      <div className="relative z-20 mt-4 sm:mt-0 md:mt-[-20px] w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-2 sm:px-4 flex justify-center rotate-[-3.5deg]">
        <img
          src={Keyboardmid}
          alt="Keyboard main"
          className="w-full h-auto"
        />
      </div>

      {/* Bottom Left Stats */}
      <div className="relative sm:absolute bottom-4 sm:bottom-8 md:bottom-10 left-0 sm:left-4 md:left-8 lg:left-30 z-20 flex flex-col gap-2 mt-6 sm:mt-0 px-4 sm:px-0">
        <p className="text-[#311b92] font-semibold text-sm sm:text-base md:text-[20px]">Students joined us</p>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex -space-x-2 sm:-space-x-3">
            <img className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-2 sm:border-[3px] border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=1" alt="Student" />
            <img className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-2 sm:border-[3px] border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=5" alt="Student" />
            <img className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-2 sm:border-[3px] border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=3" alt="Student" />
          </div>
          <span className="text-[#1a0b5a] font-black text-xl sm:text-2xl md:text-3xl">1000+</span>
        </div>
      </div>
    </div>
  )
}

export default Hero