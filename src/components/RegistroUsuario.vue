<template>
    <div id="registro">
      <!-- Robot Animation Section -->
  
      <!-- Form Section -->
      <div class="d-flex align-items-center bg-light"
        style="height: 100vh; background-image: url('your-image.jpg'); background-size: cover;">
        <div class="row m-3">
  
          <div class="col-md-8 d-flex bg-dark text-white">
            <div class="col-md-8 pt-3">
              <div class="container">
                <img src="../assets/Logo_blancofull.png" alt="" class="img-fluid">
              </div>
  
              <h1 class="display-2">Regístrate</h1>
              <p class="lead">Únete a nuestra comunidad vibrante y dinámica para conectar, crear y colaborar. ¡Empieza a construir el futuro hoy! 🚀🌟</p>
            </div>
            <div class="col-md-4 d-flex justify-content-end">
              <div id="robot-animation" class="three-container"></div>
            </div>
          </div>
  
          <div class="col-md-4 text-white">
            <div class="card bg-dark text-white">
              <div class="card-body">
                <h5 class="card-title">Crear Cuenta</h5>
                <form @submit.prevent="submitForm">
  
                  <!-- Campo de nombre de usuario -->
                  <div class="form-group">
                    <label for="username">Nombre de Usuario</label>
                    <input type="text" class="form-control radio-wrap" id="username" v-model="username" required
                      placeholder="Nombre de Usuario">
                  </div>
  
                  <!-- Campo de email -->
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control radio-wrap" id="email" v-model="email" required
                      placeholder="ejemplo@micorreo.com">
                  </div>

                  <!-- Campor de fecha de nacimiento-->
                   <div class="form-group">
                    <label for="fechaNacimiento">Fecha de Nacimiento</label>
                    <input type="date" class="form-control radio-wrap" id="fechaNacimiento" v-model="fechaNacimiento" required
                      placeholder="Fecha de Nacimiento">
                    </div>
                  
  
                  <!-- Campo de contraseña con icono dentro del input -->
                  <div class="form-group">
                    <label for="password">Contraseña</label>
                    <div class="input-group" style="width: 100%; border-radius: 9px;">
                      <input :type="isPasswordVisible ? 'text' : 'password'" class="form-control" id="password"
                        v-model="password" required placeholder="contraseña" style="border-radius: 9px">
                      <!-- Botón con el ícono dentro del input -->
                      <button type="button" @click="togglePasswordVisibility"
                        style="background: none; border: none;">
                        <i :class="isPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'" style="color: white;"></i>
                      </button>
                    </div>
                  </div>
  
                  <!-- Campo de confirmación de contraseña con icono dentro del input -->
                  <div class="form-group">
                    <label for="confirmPassword">Confirmar Contraseña</label>
                    <div class="input-group" style="width: 100%; border-radius: 9px;">
                      <input :type="isConfirmPasswordVisible ? 'text' : 'password'" class="form-control" id="confirmPassword"
                        v-model="confirmPassword" required placeholder="confirmar contraseña" style="border-radius: 9px">
                      <!-- Botón con el ícono dentro del input -->
                      <button type="button" @click="toggleConfirmPasswordVisibility"
                        style="background: none; border: none;">
                        <i :class="isConfirmPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'" style="color: white;"></i>
                      </button>
                    </div>
                  </div>
  
                  <!-- Botón para enviar el formulario -->
                  <div class="p-3">
                    <button type="submit" class="btn"
                      :class="{ 'btn-primary': isFormValid, 'btn-secondary': !isFormValid }" :disabled="!isFormValid">
                      Registrarse
                    </button>
                  </div>
                </form>
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
  import { changeModelColor, saveOriginalColors } from '../assets/scripts/animations.js';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        fechaNacimiento: '',
        password: '',
        confirmPassword: '',
        selectedColor: '#527B90',
        model: null,
        originalColors: null,
        isPasswordVisible: false,
        isConfirmPasswordVisible: false
      };
    },
    computed: {
      isFormValid() {
        return this.username !== '' && this.email !== '' && this.password !== '' && this.password === this.confirmPassword;
      }
    },
    watch: {
      isFormValid(newVal) {
        this.changeRobotColor(newVal);
      }
    },
    mounted() {
      initScene('robot-animation').then((model) => {
        this.model = model;  // Guardar la referencia al modelo
        this.originalColors = saveOriginalColors(model);  // Guardar los colores originales
      });
    },
    methods: {
      submitForm() {
        // Aquí puedes agregar la lógica para registrar al usuario
        // Por ejemplo, enviar los datos a un servidor o guardarlos en una base de datos
        alert("Usuario registrado con éxito");
        this.$emit('register');  // Emitir evento al componente padre para cambiar la vista
      },
      changeRobotColor(isValid) {
        if (this.model) {
          if (isValid) {
            const color = new THREE.Color(this.selectedColor);
            changeModelColor(this.model, color);
          } else {
            changeModelColor(this.model, null, this.originalColors);
          }
        }
      },
      togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
      },
      toggleConfirmPasswordVisibility() {
        this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
      }
    }
  };
  </script>
  
  <style scoped>
  .form-control.radio-wrap {
    border-radius: 9px;
  }
  
  .three-container {
    width: 100%;
    height: 400px;
    background-color: rgba(100, 100, 100, 0.4);
  }
  
  .input-group {
    border-radius: 9px;
  }
  
  .btn-secondary {
    background-color: grey;
    border-color: grey;
  }
  </style>