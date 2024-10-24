<template>
    <div id="sesion-iniciada">
      <div class="d-flex align-items-center bg-light" style="height: 100vh; background-image: url('your-image.jpg'); background-size: cover;">
        <div class="row m-3">
          <div class="col-md-12 d-flex bg-dark text-white">
            <div class="col-md-4 d-flex justify-content-end">
                <div id="robot-animation" class="three-container" @mouseover="handleMouseOver" @mouseout="handleMouseOut"></div>
            </div>
            <div class="col-md-8 pt-3">
              <div class="container">
                <img src="../assets/Logo_blancofull.png" alt="" class="img-fluid">
              </div>
              <h5 class="display-4">¡Bienvenido, {{ email }}!</h5>
              <h4 class="lead">{{ welcomeMessage }}</h4>
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
import { changeLightColor } from '@/assets/scripts/animations.js';

export default {
  props: {
    email: String // Pasamos el email del usuario como prop
  },
  data() {
    return {
      model: null,
      dirLight: null,  // Guardar la referencia a la luz direccional
      originalColors: null,
      welcomeMessage: getRandomWelcomeMessage() // Obtener un mensaje de bienvenida aleatorio
    };
  },
  mounted() {
    // Inicializamos la escena del robot
    initScene('robot-animation').then(({ model, dirLight }) => {
      this.model = model;  
      this.dirLight = dirLight;
    });
  },
  methods: {
    handleMouseOver() {
      if (this.dirLight) {
        const newColor = new THREE.Color(Math.random(), Math.random(), Math.random());
        changeLightColor(this.dirLight, newColor); 
      }
    },
    handleMouseOut() {
      if (this.dirLight) {
        changeLightColor(this.dirLight, 0xffffff);  
      }
    }
  }
};
    
  </script>
  
  <style scoped>
  .three-container {
    width: 100%;
    height: 400px;
    background-color: rgba(100, 100, 100, 0.4);
  }
  </style>