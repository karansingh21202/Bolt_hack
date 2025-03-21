import React, { useEffect, useRef, useState } from 'react';

const ThreeJsSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let cleanup: (() => void) | undefined;

    const loadThreeJs = async () => {
      try {
        // Dynamically import Three.js
        const THREE = await import('three');
        
        if (!isMounted || !containerRef.current) return;

        // Set up scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          80, // FOV (Field of View) - Increase for wider view, decrease for narrower
          window.innerWidth / window.innerHeight,
          0.1, // Near clipping plane
          1000 // Far clipping plane
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Background color and opacity
        containerRef.current.appendChild(renderer.domElement);

        // SPHERE PARAMETERS
        // ----------------
        const sphereGeometry = new THREE.SphereGeometry(
          80,    // Radius - Large sphere
          32,   // Width segments
          32    // Height segments
        );
        const sphereMaterial = new THREE.MeshBasicMaterial({
          color: 0x6a1b9a,
          wireframe: true,
          transparent: true,
          opacity: 0.2        // Made more transparent to see internal connections better
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);
        
        // POINTS PARAMETERS
        // ----------------
        const numSpherePoints = 45;   // Increased number of points for more connections
        const pointMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xab47bc,
          transparent: true,
          opacity: 0.5     // Reduced opacity for subtler points
        });
        
        // Point size
        const pointGeometry = new THREE.SphereGeometry(
          0.4,  // Reduced point size significantly
          8,
          8
        );

        // CURVE/CONNECTION PARAMETERS
        // -------------------------
        const maxConnections = 30;     // More connections for visual density
        const curveLifetime = 200;    // Longer lifetime for smoother animation

        // Connection creation frequency
        const connectionInterval = 15; // Adjusted timing

        // ANIMATION PARAMETERS
        // ------------------
        const globalTimeIncrement = 0.015;  // Overall animation speed
        
        // Sphere rotation speeds
        const rotationSpeedX = 0.005;  // X-axis rotation speed
        const rotationSpeedY = 0.007;  // Y-axis rotation speed

        // Camera position
        camera.position.z = 40;        // Camera distance - Increase to move camera back
        
        // Create points on the sphere for connections
        const spherePoints: any[] = [];
        for (let i = 0; i < numSpherePoints; i++) {
          // Create random points on sphere surface
          const phi = Math.acos(-1 + (2 * Math.random()));
          const theta = 2 * Math.PI * Math.random();
          
          const x = 70 * Math.sin(phi) * Math.cos(theta);
          const y = 70 * Math.sin(phi) * Math.sin(theta);
          const z = 70 * Math.cos(phi);
          
          const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
          pointMesh.position.set(x, y, z);
          scene.add(pointMesh);
          
          spherePoints.push(pointMesh);
        }
        
        // Create and manage curves
        const curves: any[] = [];
        
        function createCurvedConnection() {
          // Remove oldest curve if we have too many
          if (curves.length >= maxConnections) {
            scene.remove(curves[0].curve);
            curves.shift();
          }
          
          // Pick two random points on the sphere
          const startPointIndex = Math.floor(Math.random() * numSpherePoints);
          let endPointIndex = Math.floor(Math.random() * numSpherePoints);
          while (endPointIndex === startPointIndex) {
            endPointIndex = Math.floor(Math.random() * numSpherePoints);
          }
          
          const startPoint = spherePoints[startPointIndex].position.clone();
          const endPoint = spherePoints[endPointIndex].position.clone();
          
          // Calculate the midpoint between start and end points
          const midPoint = new THREE.Vector3();
          midPoint.addVectors(startPoint, endPoint);
          midPoint.divideScalar(2);
          
          // Calculate direction towards center
          const directionToCenter = midPoint.clone().normalize();
          
          // Create control point that curves inward
          const controlPoint = midPoint.clone();
          const distanceToCenter = midPoint.length();
          const inwardFactor = Math.random() * 0.8 + 0.1; // Random factor between 0.1 and 0.9
          controlPoint.multiplyScalar(inwardFactor); // This pulls the control point inward
          
          // CURVE COLOR PARAMETERS
          const hue = Math.random();
          const curveMaterial = new THREE.LineBasicMaterial({ 
            transparent: true, 
            opacity: 0.8  // Slightly more transparent for layered effect
          });
          curveMaterial.color.setHSL(
            hue,
            1,
            0.8  // Increased brightness
          );
          
          // Create curve
          const curve = new THREE.QuadraticBezierCurve3(
            startPoint,
            controlPoint,
            endPoint
          );
          
          // Create line from curve with more points for smoother curves
          const points = curve.getPoints(70);
          const curveGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const curveLine = new THREE.Line(curveGeometry, curveMaterial);
          scene.add(curveLine);
          
          curves.push({
            curve: curveLine,
            startPointIndex: startPointIndex,
            endPointIndex: endPointIndex,
            controlPoint: controlPoint.clone(),
            life: curveLifetime,
            opacity: 1,
            hue: hue,
            inwardFactor: inwardFactor // Store the inward factor for animation
          });
        }
        
        // Animation variables
        let connectionCounter = 0;
        let globalTime = 0;

        // Animation loop
        function animate() {
          const animationId = requestAnimationFrame(animate);
          globalTime += globalTimeIncrement;  // Animation speed
          
          // Sphere rotation
          sphere.rotation.x += rotationSpeedX;
          sphere.rotation.y += rotationSpeedY;
          
          // Connection creation timing
          connectionCounter++;
          if (connectionCounter >= connectionInterval) {
            createCurvedConnection();
            connectionCounter = 0;
          }
          
          // Update existing curves
          for (let i = curves.length - 1; i >= 0; i--) {
            const curveObj = curves[i];
            curveObj.life--;
            
            // Pulse effect parameters
            const pulseFrequency = 1.5;    // Slower pulse for smoother effect
            const pulseAmplitude = 0.15;   // Smaller amplitude for subtle movement
            const pulseEffect = Math.sin(globalTime * pulseFrequency + i) * pulseAmplitude;
            
            // Update control point with inward pulsing
            const animatedControlPoint = curveObj.controlPoint.clone();
            const newInwardFactor = curveObj.inwardFactor * (1 + pulseEffect);
            animatedControlPoint.normalize().multiplyScalar(70 * newInwardFactor);
            
            // Fade out curve as it gets older
            if (curveObj.life < 50) {
              curveObj.curve.material.opacity = curveObj.life / 50;
            }
            
            // Color animation parameters
            const colorChangeSpeed = 0.1; // Speed of color cycling
            const currentHue = (curveObj.hue + globalTime * colorChangeSpeed) % 1;
            
            // Enhanced color animation for newer connections
            curveObj.curve.material.color.setHSL(currentHue, 1, 0.6);
            
            // Remove curve if its lifetime is over
            if (curveObj.life <= 0) {
              scene.remove(curveObj.curve);
              curves.splice(i, 1);
            }
            
            // Update curve positions based on sphere rotation
            if (curveObj.life > 0 && i < curves.length) {
              try {
                const startPoint = spherePoints[curveObj.startPointIndex].position;
                const endPoint = spherePoints[curveObj.endPointIndex].position;
                
                // Update the curve with animated points
                const curve = new THREE.QuadraticBezierCurve3(
                  startPoint,
                  animatedControlPoint,
                  endPoint
                );
                
                const points = curve.getPoints(50);
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                curveObj.curve.geometry.dispose();
                curveObj.curve.geometry = geometry;
              } catch (err) {
                console.error('Error updating curve:', err);
              }
            }
          }
          
          renderer.render(scene, camera);
        }
        
        // Handle window resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Start animation
        animate();
        
        // Loading complete
        if (isMounted) {
          setIsLoading(false);
        }
        
        // Cleanup function
        cleanup = () => {
          window.removeEventListener('resize', handleResize);
          
          // Dispose of Three.js resources
          sphereGeometry.dispose();
          sphereMaterial.dispose();
          scene.remove(sphere);
          
          spherePoints.forEach(point => {
            scene.remove(point);
            if (point.geometry) point.geometry.dispose();
            if (point.material) point.material.dispose();
          });
          
          curves.forEach(curveObj => {
            scene.remove(curveObj.curve);
            if (curveObj.curve.geometry) curveObj.curve.geometry.dispose();
            if (curveObj.curve.material) curveObj.curve.material.dispose();
          });
          
          // Remove renderer
          if (containerRef.current?.contains(renderer.domElement)) {
            containerRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
        };
        
      } catch (err) {
        console.error('Failed to load Three.js:', err);
        if (isMounted) {
          setError('Failed to load 3D visualization');
          setIsLoading(false);
        }
      }
    };

    loadThreeJs();

    return () => {
      isMounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/50 text-sm">Loading 3D visualization...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/50 text-sm">{error}</div>
        </div>
      )}
    </div>
  );
};

export default ThreeJsSphere; 