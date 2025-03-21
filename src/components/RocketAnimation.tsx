import React, { useEffect, useRef } from 'react';
import './RocketAnimation.css';

const RocketAnimation: React.FC = () => {
  const rocketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rocket = rocketRef.current;
    if (!rocket) return;

    // Add gas particles
    

    // Create gas particles periodically

    });

  return (
    <div className="rocket-container">
      <div ref={rocketRef} className="rocket">
        <img src="/svgs/Rocket.png" alt="Rocket" className="rocket-image" />
      </div>
    </div>
  );
};

export default RocketAnimation; 