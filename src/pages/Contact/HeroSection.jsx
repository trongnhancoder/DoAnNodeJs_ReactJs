// src/components/HeroSection.jsx
function HeroSection({ title, subtitle, backgroundImage }) {
    return (
      <div
        className="relative h-[400px] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white animate-fade-in-down">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-2 animate-fade-in-up">
            {subtitle}
          </p>
        </div>
      </div>
    );
  }
  
  export default HeroSection;