function registrarUsuario(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreCompleto").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;
  const genero = document.getElementById("genero").value;
  
  const medios = Array.from(document.querySelectorAll("input[name='medio']:checked"))
                      .map(cb => cb.value);

  if (!nombre || !correo || !contrasena) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const usuario = {
    nombre,
    correo,
    contrasena,
    fechaNacimiento,
    genero,
    medios
  };

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios.find(u => u.correo === correo)) {
    alert("Este correo ya está registrado.");
    return;
  }

  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("¡Usuario registrado correctamente!");
  window.location.href = "login.html";
}

function iniciarSesion(event) {
  event.preventDefault();

  const correo = document.getElementById("correoLogin").value;
  const contrasena = document.getElementById("contrasenaLogin").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioEncontrado = usuarios.find(
      (u) => u.correo === correo && u.contrasena === contrasena
  );

  if (usuarioEncontrado) {
      alert("¡Inicio de sesión exitoso!");
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
      window.location.href = "home.html";
  } else {
      alert("Correo o contraseña incorrectos.");
  }
}

function mostrarBienvenida() {
    const usuario = localStorage.getItem("usuarioActivo");
    if (usuario) {
        document.getElementById("bienvenida").textContent = `¡Bienvenido/a, ${usuario}!`;
    }
}

const comentarios = [
  { nombreUsuario: "Javier Morales", correo: "javier.morales@gmail.com", textoComentario: "Sus recursos educativos y programas comunitarios están marcando una verdadera diferencia." },
  { nombreUsuario: "Ana Torres", correo: "ana.torres@gmail.com", textoComentario: "¡Iniciativa ecológica excelente! Definitivamente volveré a participar." },
  { nombreUsuario: "Manuel Varela", correo: "manuel.varela@gmail.com", textoComentario: "Me encanta cómo EcoFood conecta a agricultores locales con diversos consumidores." },
  { nombreUsuario: "Camila Fernández", correo: "camila.fernandez@gmail.com", textoComentario: "Gracias a EcoFood, he aprendido a comprar y cocinar de forma más responsable." },
  { nombreUsuario: "Matías Vega", correo: "matias.vega@gmail.com", textoComentario: "EcoFood nos ha enseñado a mí y mis alumnos sobre los desperdicios alimentarios y cómo ayudar a nuestro planeta." }
];

function cargarComentarios() {
  const contenedor = document.getElementById("comentarios-container");
  contenedor.innerHTML = "";
  comentarios.forEach(com => {
    const card = document.createElement("div");
    card.className = "card mb-3 shadow-sm";
    card.innerHTML = `
      <div class="card-body">
        <h6 class="fw-bold mb-1">
          ${com.nombreUsuario} 
          ${com.correo ? `<span class="text-muted fw-normal">&lt;${com.correo}&gt;</span>` : ""}
        </h6>
        <p class="mb-0">${com.textoComentario}</p>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

function agregarComentario(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const texto = document.getElementById("comentario").value;

  if (nombre && correo && texto) {
    comentarios.push({ nombreUsuario: nombre, correo: correo, textoComentario: texto });
    cargarComentarios();
    event.target.reset();

    alert("¡Comentario agregado con éxito!");
  } else {
    alert("Por favor, completa todos los campos.");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  cargarComentarios();
  document.querySelector("form").addEventListener("submit", agregarComentario);
});
  
function cargarContenidoHome() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuarioActivo && usuarioActivo.nombre) {
      const bienvenida = document.getElementById("mensajeBienvenida");
      if (bienvenida) {
        bienvenida.textContent = `¡Bienvenido/a, ${usuarioActivo.nombre}!`;
      }
    }
  
    const consejos = [
      "Planifica tus comidas semanalmente para reducir el desperdicio alimentario y ahorrar dinero.",
      "Almacena adecuadamente frutas y verduras para prolongar su vida útil.",
      "Usa sobras de comida para crear nuevas recetas en lugar de desecharlas.",
      "Compra solo lo que necesitas y evita compras impulsivas.",
      "Aprende a interpretar las fechas de caducidad: 'consumir preferentemente antes de' no significa que esté malo."
    ];
  
    const consejoAleatorio = consejos[Math.floor(Math.random() * consejos.length)];
    
    const consejoEl = document.getElementById("consejoDelDia");
    if (consejoEl) {
      consejoEl.textContent = consejoAleatorio;
    }
  }
  
  function cerrarSesion() {
    window.location.href = "login.html";
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("home.html")) {
      cargarContenidoHome();
      const cerrarBtn = document.querySelector(".btn-danger");
      if (cerrarBtn) {
        cerrarBtn.addEventListener("click", cerrarSesion);
      }
    }
  });

function cargarFraseQuienesSomos() {
    const frases = [
      "La primera organización comprometida con la reducción del desperdicio alimentario",
      "La iniciativa pionera en promover el consumo responsable de alimentos.",
      "La organización líder en combatir el desperdicio en toda la cadena alimentaria.",
      "Estamos dedicados a transformar sobras en oportunidades sostenibles."
    ];
  
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    const h3 = document.getElementById("fraseQuienesSomos");
  
    if (h3) {
      h3.textContent = fraseAleatoria;
    }
  }
  
  if (window.location.pathname.includes("index.html")) {
    document.addEventListener("DOMContentLoaded", cargarFraseQuienesSomos);
  }

function validarFormularioContacto() {
    const form = document.getElementById("formContacto");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const mensaje = document.getElementById("mensaje");
    const mensajeExito = document.getElementById("mensajeExito");
  
    if (!form || !nombre || !correo || !mensaje) return;
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      if (nombre.value.trim() === "" || correo.value.trim() === "" || mensaje.value.trim() === "") {
        alert("Por favor, completa todos los campos.");
        return;
      }
  
      mensajeExito.classList.remove("d-none");
      form.reset();
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("contacto.html")) {
      validarFormularioContacto();
    }
  });

  const faqs = [
    {
      pregunta: "¿Qué es EcoFood?",
      respuesta: "EcoFood es una plataforma que promueve el consumo responsable y apoya a productores locales."
    },
    {
      pregunta: "¿Cómo puedo participar en las iniciativas de EcoFood?",
      respuesta: "Puedes participar registrándote en nuestro sitio y uniéndote a nuestros eventos comunitarios."
    },
    {
      pregunta: "¿EcoFood tiene algún costo para los usuarios?",
      respuesta: "No, los servicios de concientización de EcoFood son gratuitos."
    },
    {
      pregunta: "¿Dónde están ubicados los mercados asociados a EcoFood?",
      respuesta: "Trabajamos con mercados locales en varias regiones. Puedes consultar el mapa en nuestras redes sociales."
    },
    {
      pregunta: "¿Cómo ayudan a reducir el desperdicio de alimentos?",
      respuesta: "Educamos a los consumidores, facilitamos donaciones de excedentes y promovemos recetas sostenibles."
    },
    {
      pregunta: "¿EcoFood ofrece educación sobre alimentación sostenible?",
      respuesta: "Sí, contamos con talleres, guías digitales y eventos educativos abiertos al público."
    },
    {
      pregunta: "¿Puedo colaborar como voluntario?",
      respuesta: "¡Por supuesto! Contamos con un programa de voluntariado en el que puedes inscribirte desde tu perfil de usuario."
    },
    {
      pregunta: "¿Cómo se aseguran de que los productores sean locales y responsables?",
      respuesta: "Validamos cada proveedor mediante entrevistas, visitas y certificaciones locales de producción sostenible."
    },
    {
      pregunta: "¿Puedo donar alimentos a través de EcoFood?",
      respuesta: "Sí, trabajamos con organizaciones comunitarias para canalizar donaciones de alimentos de manera segura y eficiente."
    },
    {
      pregunta: "¿Cómo protege EcoFood mis datos personales?",
      respuesta: "Utilizamos cifrado, buenas prácticas de privacidad y no compartimos tu información sin tu consentimiento explícito."
    }
  ];
  
  function cargarFAQs() {
    const contenedor = document.getElementById("faq-container");
    if (!contenedor) return;
  
    faqs.forEach((faq, index) => {
      const item = document.createElement("div");
      item.className = "accordion-item";
      item.innerHTML = `
        <h2 class="accordion-header" id="heading${index}">
          <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="${index === 0}" aria-controls="collapse${index}">
            ${faq.pregunta}
          </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading${index}" data-bs-parent="#faq-container">
          <div class="accordion-body">
            ${faq.respuesta}
          </div>
        </div>
      `;
      contenedor.appendChild(item);
    });
  }
  
  document.addEventListener("DOMContentLoaded", cargarFAQs);