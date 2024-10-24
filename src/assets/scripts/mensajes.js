const welcomeMessages = [
  "¡Prepárate para explorar y crear cosas increíbles! 🚀✨",
  "Tu creatividad es nuestra inspiración. 🌟",
  "¡Vamos a hacer algo asombroso! 💡",
  "¡Es hora de innovar y colaborar! 🤝",
  "Estamos emocionados de ver lo que crearás hoy. 🎨",
  "Tu presencia ilumina nuestro espacio. 🌟",
  "¡Vamos a construir el futuro juntos! 🚀",
  "Tu energía positiva es contagiosa. 😊",
  "Estamos listos para apoyarte en tus proyectos. 💪",
  "¡Vamos a hacer magia juntos! ✨",
  "Tu creatividad es el motor de nuestra comunidad. 🌟",
  "Nos encanta tenerte aquí. ¡Vamos a crear! 🎨",
  "¡Es hora de innovar y colaborar! 🤝",
  "Tu presencia hace la diferencia. 😊",
  "Estamos emocionados de ver lo que crearás hoy. 🚀",
  "¡Vamos a hacer algo asombroso! 💡",
  "Tu energía positiva es contagiosa. 🌟",
  "Tu creatividad es nuestra inspiración. 🎨",
  "¡Vamos a construir el futuro juntos! 🚀",
  "Tu presencia ilumina nuestro espacio. 😊",
  "Estamos listos para apoyarte en tus proyectos. 💪",
  "¡Vamos a hacer magia juntos! ✨",
  "Tu creatividad es el motor de nuestra comunidad. 🌟",
  "Nos encanta tenerte aquí. ¡Vamos a crear! 🎨",
  "¡Es hora de innovar y colaborar! 🤝",
  "Tu presencia hace la diferencia. 😊",
  "Estamos emocionados de ver lo que crearás hoy. 🚀",
  "¡Vamos a hacer algo asombroso! 💡",
  "Tu energía positiva es contagiosa. 🌟",
  "Tu creatividad es nuestra inspiración. 🎨",
  "¡Vamos a construir el futuro juntos! 🚀",
  "Tu presencia ilumina nuestro espacio. 😊",
  "Estamos listos para apoyarte en tus proyectos. 💪",
  "¡Vamos a hacer magia juntos! ✨",
  "Tu creatividad es el motor de nuestra comunidad. 🌟",
  "Nos encanta tenerte aquí. ¡Vamos a crear! 🎨",
  "¡Es hora de innovar y colaborar! 🤝",
  "Tu presencia hace la diferencia. 😊",
  "Estamos emocionados de ver lo que crearás hoy. 🚀",
  "¡Vamos a hacer algo asombroso! 💡"
];

export function getRandomWelcomeMessage() {
  const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
  return welcomeMessages[randomIndex];
}