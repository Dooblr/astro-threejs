// cube.js
import * as THREE from 'three';

export function initCube(container) {
  console.log('initCube called with container:', container);
  
  if (!container) {
    console.error('Container is null or undefined');
    return null;
  }

  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    75, 
    container.clientWidth / container.clientHeight, 
    0.1, 
    1000
  );
  camera.position.z = 3;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 1);
  
  // Clear container and add canvas
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Cube geometry and material
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00, 
    wireframe: true 
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    renderer.render(scene, camera);
  }
  animate();

  // Handle window resize
  function handleResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
  }
  
  window.addEventListener('resize', handleResize);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
    renderer.dispose();
    geometry.dispose();
    material.dispose();
  };
}