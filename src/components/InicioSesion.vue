<template>
  <div id="inicio">
    <!-- Robot Animation Section -->


    <!-- Form Section -->
    <div class="d-flex align-items-center bg-cover"
    style="height: 100vh; background-size: cover;">
      <div class="row m-3">


        <div class="col-md-8 d-flex bg-dark-ct text-white">
          <div class="col-md-8 pt-3">
            <div class="container">
              <img src="../assets/Logo_blancofull.png" alt="" class="img-fluid">
            </div>

            <h1 class="display-2">Bienvenido</h1>
            <p class="lead">Un lugar vibrante y dinámico para conectar, crear y colaborar. ¡Únete y empieza a construir
              el futuro hoy! 🚀🌟</p>
          </div>
          <div class="col-md-4 d-flex justify-content-end">
            <div id="robot-animation" class="three-container"></div>
          </div>
        </div>

        <div class="col-md-4 text-white">
          <div class="card bg-dark-ct text-white h-100">
            <div class="card-body">
              <h5 class="card-title">Ingresar</h5>
              <form @submit.prevent="submitForm">

                <!-- Campo de email -->
                <div class="form-group pt-2">
                  <label for="email">Email</label>
                  <input type="email" class="form-control radio-wrap" id="email" v-model="email" required
                    placeholder="ejemplo@micorreo.com">
                </div>

                <!-- Campo de contraseña con icono dentro del input -->
                <div class="form-group pt-2">
                  <label for="password">Contraseña</label>
                  <div class="input-group" style="width: 100%; border-radius: 9px;">
                    <input :type="isPasswordVisible ? 'text' : 'password'" class="form-control" id="password"
                      v-model="password" required placeholder="contraseña" style="border-radius: 9px">
                    <!-- Botón con el ícono dentro del input -->
                     
                    <button type="button" @click="togglePasswordVisibility"
                      style="background: none; border: none; display: none;">
                      <i :class="isPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'" style="color: white;"></i>
                    </button>
                  
                  </div>
                </div>

                <!-- Botón para enviar el formulario -->
                <div class="pt-4">
                  <button type="submit" class="btn"
                    :class="{ 'btn-primary': isFormValid, 'btn-secondary': !isFormValid }" :disabled="!isFormValid">
                    Entrar
                  </button>
                </div>
              </form>

              <!-- Enlace para olvidé mi contraseña -->
              <div class="pt-3"><a href="#" class="card-link">¿Olvidé mi contraseña?</a></div>
              <router-link to="/registro" class="card-link">¿No tienes una cuenta? Regístrate</router-link>
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
      email: '',
      password: '',
      selectedColor: '#527B90',
      model: null,
      originalColors: null,
      isPasswordVisible: false
    };
  },
  computed: {
    isFormValid() {
      return this.email !== '' && this.password !== '';
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
      // Mock de las credenciales
      const mockEmail = "prueba@correo.com";
      const mockPassword = "1234";

      // Verificar si el email y la contraseña son correctos
      if (this.email === mockEmail && this.password === mockPassword) {
        // Cambia el estado de inicio de sesión a true
        this.$emit('login');  // Emitir evento al componente padre para cambiar la vista
      } else {
        // Mostrar un mensaje de error o realizar alguna acción si las credenciales no son correctas
        alert("Email o contraseña incorrectos. Por favor intenta de nuevo.");
      }
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
  background-color: (100, 100, 100, 0.4);
}

.input-group {
  border-radius: 9px;
}

.btn-secondary {
  background-color: grey;
  border-color: grey;
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