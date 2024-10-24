import { createRouter, createWebHistory } from 'vue-router';
import InicioSesion from './components/InicioSesion.vue';
import RegistroUsuario from './components/RegistroUsuario.vue';
import SesionIniciada from './components/SesionIniciada.vue';

const routes = [
  { path: '/', component: InicioSesion },
  { path: '/registro', component: RegistroUsuario },
  { path: '/sesion-iniciada', component: SesionIniciada }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;