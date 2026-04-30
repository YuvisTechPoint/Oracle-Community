import { useState } from 'react';
import Logo from '../assets/Logo.png';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navItems = ['Home', 'StudentCorner', 'About us'];
  return (
    <>
      <div className="flex items-center justify-between absolute w-full px-16 pt-3 z-50">
        <img className='h-32 w-auto object-contain' src={Logo} alt="Oracle Kolkata Community" />
        <nav className="flex items-center gap-12 bg-[#1f0404] rounded-full px-10 py-3 shadow-2xl">
          {/* Navigation Links */}
          <div className="flex items-center gap-14">
            {navItems.map((item) => (
              <div
                key={item}
                onClick={() => setActiveItem(item)}
                className="relative cursor-pointer flex flex-col items-center"
              >
                <span
                  className={`${activeItem === item
                    ? 'text-white text-[22px]'
                    : 'text-[#b31b1b] text-lg hover:text-red-500'
                    } font-normal tracking-wide pb-1 transition-all duration-300`}
                >
                  {item}
                </span>
                {activeItem === item && (
                  <div className="absolute bottom-0 w-[70%] h-[3px] bg-red-500 rounded-full transition-all duration-300"></div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-6 pl-4 border-l border-[#3a0b0b]">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="bg-white text-black px-10 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors tracking-widest"
            >
              LOGIN
            </button>

            <button className="border-[1.5px] border-[#b31b1b] text-[#b31b1b] px-6 py-2.5 rounded-full text-[15px] font-normal hover:bg-[#b31b1b] hover:text-white transition-all">
              Talk to an expert
            </button>
          </div>
        </nav>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  )
}

export default Navbar