
import './index.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import CommunityArea from './Components/CommunityArea'
import Carousel from './Components/Crausal'
import MissionPage from './Components/MissionPage'
import TeamDetail from './Components/TeamDetail'
import Footer from './Components/footer'
import ContactUs from './Components/Contactus'
import Course_section from './Components/Course_section'



function App() {

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <CommunityArea />
      <Carousel />
      <Course_section />
      <MissionPage />
      <TeamDetail />
      <ContactUs />
      <Footer />




    </div>
  )
}

export default App
