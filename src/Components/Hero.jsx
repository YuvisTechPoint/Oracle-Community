import Keyboardside from '../assets/keyboard-side.png'
import Keyboardmid from '../assets/keyboard-mid.png'
import Togglebutton from './Togglebutton'
import Backgroundimage from '../assets/Hero-section.png'

const Hero = () => {
  return (
    <div className="relative w-full min-h-[100vh] bg-white overflow-hidden flex flex-col items-center pt-40 pb-20">
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
      > <img src={Backgroundimage} alt="" /></div>

      {/* Top Right Keyboard */}
      <div className="absolute top-30 -right-[8%] w-[200px] md:w-[400px] z-10 rotate-[21.26°] scale-110">
        <img
          src={Keyboardside}
          alt="Keyboard side"
          className="w-full h-auto"
        />
      </div>

      {/* Text Section */}
      <div className="relative z-40 flex flex-col items-center mt-10">
        <h1 className="text-7xl md:text-8xl font-serif text-[#800000] mb-2 tracking-wide font-medium">
          Connect.
        </h1>
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#ff0000] tracking-widest uppercase">
          Collaborate. Create.
        </h2>

        {/* Toggle Button */}
        <div className="mt-8 z-30 flex items-center justify-center cursor-pointer">
          <Togglebutton />
        </div>

      </div>

      {/* Main Keyboard */}
      <div className="relative z-20 mt-[-20]
       w-full max-w-4xl px-4 flex justify-center scale-120  rotate-[-3.5deg] ">
        <img
          src={Keyboardmid}
          alt="Keyboard main"
          className="w-[95%] h-auto "

        />
      </div>

      {/* Bottom Left Stats */}
      <div className="absolute bottom-10 left-30 z-20 flex top-220 flex-col gap-2">

        <p className="text-[#311b92] font-semibold text-[20px]">Students joined us</p>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            <img className="w-20 h-20 rounded-full border-[3px] border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=1" alt="Student" />
            <img className="w-20 h-20 rounded-full border-[3px] border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=5" alt="Student" />
            <img className="w-20 h-20 rounded-full border-[3px] border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=3" alt="Student" />
          </div>
          <span className="text-[#1a0b5a] font-black text-3xl">1000+</span>
        </div>
      </div>
    </div>
  )
}

export default Hero