import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const HeroAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Create geometries for different 3D objects
    const objects: THREE.Mesh[] = [];
    
    // Icosahedron (complex polyhedron)
    const icosaGeometry = new THREE.IcosahedronGeometry(0.8, 0);
    const icoMaterial = new THREE.MeshPhongMaterial({
      color: 0x6366F1,
      wireframe: true,
      emissive: 0x3B82F6,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.9
    });
    const icosahedron = new THREE.Mesh(icosaGeometry, icoMaterial);
    icosahedron.position.set(-2, 0, 0);
    scene.add(icosahedron);
    objects.push(icosahedron);

    // Torus (donut shape)
    const torusGeometry = new THREE.TorusGeometry(0.6, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({
      color: 0x8B5CF6,
      wireframe: false,
      emissive: 0x6366F1,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.85
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(2, 0.5, 1);
    scene.add(torus);
    objects.push(torus);

    // Octahedron (diamond shape)
    const octaGeometry = new THREE.OctahedronGeometry(0.7, 0);
    const octaMaterial = new THREE.MeshPhongMaterial({
      color: 0x3B82F6,
      wireframe: true,
      emissive: 0x8B5CF6,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.7
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(0, -1, 2);
    scene.add(octahedron);
    objects.push(octahedron);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6366F1, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x3B82F6, 2);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create stars/particles in the background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Rotate objects
      icosahedron.rotation.x += 0.005;
      icosahedron.rotation.y += 0.01;
      
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      
      octahedron.rotation.x += 0.01;
      octahedron.rotation.z += 0.01;

      // Make objects float up and down slightly
      const time = Date.now() * 0.001;
      objects.forEach((obj, i) => {
        obj.position.y += Math.sin(time + i) * 0.003;
      });

      // Subtle particle rotation
      particlesMesh.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };
    
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-10"
      style={{ 
        height: '100%', 
        width: '100%',
        maxWidth: '800px', 
        margin: '0 auto',
        pointerEvents: 'none' 
      }}
    />
  );
};

export default HeroAnimation; 