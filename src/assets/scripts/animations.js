let isJumpingUp = true;
let isNoddingForward = true;
let jumpSpeed = 0.01;
let nodSpeed = 0.005;
let maxHeight = 2;
let minHeight = 0;
let maxNodDistance = 0.2;
let minNodDistance = -0.2;
let isHovering = false;  // Controla si el mouse está sobre el modelo

export function animateJumpAndNodWithHover(model, scene, camera, renderer, stats) {
  const container = document.getElementById('robot-animation');

  // Eventos de hover
  container.addEventListener('pointerover', () => isHovering = true);
  container.addEventListener('pointerout', () => isHovering = false);

  // Animación principal
  function animate() {
    requestAnimationFrame(animate);

    // Animación de salto
    if (isJumpingUp) {
      model.position.y += jumpSpeed;
      if (model.position.y >= maxHeight) isJumpingUp = false;
    } else {
      model.position.y -= jumpSpeed;
      if (model.position.y <= minHeight) isJumpingUp = true;
    }

    // Animación de movimiento adelante/atrás (asentir "sí")
    if (isNoddingForward) {
      model.position.z -= nodSpeed;
      if (model.position.z <= minNodDistance) isNoddingForward = false;
    } else {
      model.position.z += nodSpeed;
      if (model.position.z >= maxNodDistance) isNoddingForward = true;
    }

    // Reaccionar al hover inclinando la cabeza o cuerpo
    if (isHovering) {
      model.rotation.z = Math.sin(Date.now() * 0.005) * 0.2;
      model.rotation.x = Math.sin(Date.now() * 0.005) * 0.1;
      model.rotation.y = Math.sin(Date.now() * 0.005) * 0.2;
    } else {
      model.rotation.z = 0;  // Vuelve a su posición normal
    }

    // Renderizar la escena
    renderer.render(scene, camera);
    stats.update();  // Actualizar estadísticas
  }
  animate();
}

export function changeModelColor(model, color, originalColors = null) {
  model.traverse((child) => {
    if (child.isMesh) {
      if (color) {
        child.material.color.set(color);
      } else if (originalColors && originalColors[child.uuid]) {
        child.material.color.copy(originalColors[child.uuid]);
      }
    }
  });
}

export function saveOriginalColors(model) {
  const originalColors = {};
  model.traverse((child) => {
    if (child.isMesh) {
      originalColors[child.uuid] = child.material.color.clone();
    }
  });
  return originalColors;
}

export function changeLightColor(light, color) {
  light.color.set(color);
}
