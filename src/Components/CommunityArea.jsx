import Logo from '../assets/Logo.png';
import KolkataCity from '../assets/kolkata_design.svg';

export default function CommunityArea() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        background: 'white',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Left vertical line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '70px',
        width: '1.5px',
        height: '900px',
        backgroundColor: '#cc0000',
        zIndex: 20,
        opacity: 0.35,
      }} />
      {/* Right vertical line */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: '70px',
        width: '1.5px',
        height: '900px',
        backgroundColor: '#cc0000',
        zIndex: 20,
        opacity: 0.35,
      }} />

      {/* Top content row: Logo left, Stats right */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '40px 48px 0 48px',
        }}
      >
        {/* Left — Oracle Kolkata Community logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'absolute', height: '200px' }}>
          <img
            src={Logo}
            alt="Oracle Kolkata Community Logo"
            style={{ width: '550px', height: 'auto', bottom: '50px', left: -10, zIndex: 20, padding: '20px' }}
          />
        </div>

        {/* Right — Stats */}
        <div style={{ display: 'flex', gap: '35px', alignItems: 'flex-start', paddingTop: '8px', marginLeft: '800px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '60px', fontWeight: 800, color: '#1a1a2e', margin: 0, lineHeight: 1 }}>
              12+
            </p>
            <p style={{ fontSize: '40px', color: '#555', marginTop: '4px', fontWeight: 500 }}>
              Meetups
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '60px', fontWeight: 800, color: '#1a1a2e', margin: 0, lineHeight: 1 }}>
              10+
            </p>
            <p style={{ fontSize: '40px', color: '#555', marginTop: '4px', fontWeight: 500 }}>
              Missions
            </p>
          </div>
        </div>
      </div>

      {/* Kolkata City Skyline — full width, blends into black */}
      <div style={{ position: 'relative', zIndex: 5, marginTop: 0 }}>
        <img
          src={KolkataCity}
          alt="Kolkata City Skyline"
          style={{
            width: '100%',
            display: 'block',
            objectFit: 'cover',
            objectPosition: 'center top',
            padding: '0 70px 0 70px',
            boxSizing: 'border-box',
          }}
        />
      </div>
    </section>
  );
}
