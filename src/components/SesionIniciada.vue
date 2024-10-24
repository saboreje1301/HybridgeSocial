<template>
    <div id="sesion-iniciada">
        <div class="d-flex align-items-center bg-cover"
        style="height: 100vh; background-size: cover;">
        <div class="row m-3">
            
          <div class="col-md-12 d-flex bg-dark-ct text-white p-5" style="height: 500px">
            <div class="col-md-4">
                <div id="robot-animation" class="three-container"></div>
            </div>
            <div class="col-md-8 pt-3">
              <div class="container">
                <img src="../assets/Logo_blancofull.png" alt="" class="img-fluid" style="max-height: 100px;">
              </div>
              <h5 class="display-4">¡Bienvenido, {{ nombre }}!</h5>
              <h4 class="display-4">{{ welcomeMessage }}</h4>
              <div class="p-3">
                <button @click="$emit('logout')" class="btn btn-primary">Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import * as THREE from 'three';
import { initScene } from '../assets/scripts/robot.js';
import { getRandomWelcomeMessage } from '../assets/scripts/mensajes.js';
import { saveOriginalColors, changeModelColor } from '../assets/scripts/animations.js';

export default {
  props: {
    nombre: String // Pasamos el email del usuario como prop
  },
  data() {
    return {  
      model: null,  // Guardar la referencia a la luz direccional
      originalColors: null,
      selectedColor: '0xDEECE7',  // Color seleccionado por el usuario
      welcomeMessage: getRandomWelcomeMessage() // Obtener un mensaje de bienvenida aleatorio
    };
  },
  mounted() {
    // Inicializamos la escena del robot
    initScene('robot-animation').then((model) => {
      this.model = model;  // Guardar la referencia al modelo
      this.originalColors = saveOriginalColors(model);  // Guardar los colores originales
    });
  },
  methods: {
    changeRobotColor() {
      if (this.model) {
        const color = new THREE.Color(this.selectedColor);
        changeModelColor(this.model, color);  // Cambiar el color del modelo
      }
    }
  }
};
    
  </script>
  
  <style scoped>
  .three-container {
    width: 100%;
    height: 400px;
    
  }
  #robot-animation {
  display: flex;            
  justify-content: center;  
  align-items: center;      
  width: 100%;              
  height: 100%;             
  position: relative;       
}

canvas {
  display: block;    
  max-width: 100%;   
  height: auto;     
}

.bg-cover {
    background-size: cover;
    background-position: center;
    background-image: url('../assets/bg-vrsocial.png');
}

.bg-dark-ct{
  background-color: rgba(19, 17, 17, 0.603);
}
  </style>