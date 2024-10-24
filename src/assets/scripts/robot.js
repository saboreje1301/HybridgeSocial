import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { animateJumpAndNodWithHover } from './animations.js';  // Importar animaciones

export function initScene(containerId) {
  return new Promise((resolve, reject) => {
    const container = document.getElementById(containerId);
    
    // Inicialización de cámara, escena, luces
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.4, 100);
    camera.position.set(-1, 2, 7);
    camera.lookAt(0, 1, 2);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(0, 20, 10);
    scene.add(dirLight);

    // Suelo
    //const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshPhongMaterial({ color: 0x1a1a1a, depthWrite: true }));
    //ground.rotation.x = -Math.PI / 2;
    //scene.add(ground);

    // Cargar modelo del gato robot
    const loader = new GLTFLoader();
    loader.load('/models/robot/robot.glb', function (gltf) {
      const model = gltf.scene;
      model.scale.set(1.5, 1.5, 1.5);
      scene.add(model);

      // Iniciar animación de salto y asentimiento
      animateJumpAndNodWithHover(model, scene, camera, renderer, stats);

      resolve(model);  // Resolver la promesa con el modelo cargado
    }, undefined, function (error) {
      console.error(error);
      reject(error);  // Rechazar la promesa en caso de error
    });

    // Renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });  // alpha: true para fondo transparente
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);  // Asegúrate de que el fondo sea transparente
    
    container.appendChild(renderer.domElement);

    // Estadísticas
    const stats = new Stats();
    container.appendChild(stats.dom);

    // Manejar el redimensionado de la ventana
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  });
}