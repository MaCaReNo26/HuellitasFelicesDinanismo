

//cuadro de finalizacion de adopcion
function mostrarMensaje() {
    const mensaje = document.getElementById("mensajeFelicidades");
    mensaje.style.display = "block";
    const botones = document.querySelectorAll(".aceptar, .cancelar, h2,h4");
    botones.forEach(boton => boton.style.display = "none");
}

// Registro de usuario
function registrarUsuario() {
    const nombre = document.getElementById("nombre").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const genero = document.getElementById("genero").value;
    const foto = document.getElementById("foto").files[0];
    // Validación básica
    if (!nombre || !usuario || !correo || !contrasena || !edad || !genero) {
        alert("Por favor completa todos los campos.");
        return;
    }
    if (contrasena.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
    }
    // Revisar si el usuario ya existe
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioExiste = usuariosGuardados.some(u => u.usuario === usuario || u.correo === correo);
    if (usuarioExiste) {
        alert("El usuario o correo ya está registrado.");
        return;
    }
    // Convertir foto a base64 para guardarla
    if (foto) {
        const reader = new FileReader();
        reader.onload = function (e) {
            guardarUsuario(e.target.result);
        };
        reader.readAsDataURL(foto);
    } else {
        guardarUsuario(null);
    }
    function guardarUsuario(fotoBase64) {
        const nuevoUsuario = {
            nombre,
            usuario,
            correo,
            contrasena,
            edad,
            genero,
            foto: fotoBase64
        };
        usuariosGuardados.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
        // Guardar sesión actual
        localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario));
        alert("Registro exitoso 🎉");
        window.location.href = "finalLogin.html";
    }
}

//Mostrar informacion del usuario
document.addEventListener("DOMContentLoaded", function () {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    if (!usuarioActual) return;
    // Mostrar mensaje
    const mensaje = document.getElementById("mensajeUsuario");
    mensaje.innerHTML = `¡Hola ${usuarioActual.nombre}! <br>Bienvenido a Huellitas Felices`;
    // Mostrar datos del usuario
    const datosDiv = document.getElementById("datosUsuario");

    let html = `
        <p><strong>INFORMACION PERSONAL</strong></p>
        <p><strong>Nombre:</strong> ${usuarioActual.nombre}</p>
        <p><strong>Usuario:</strong> ${usuarioActual.usuario}</p>
        <p><strong>Correo:</strong> ${usuarioActual.correo}</p>
        <p><strong>Edad:</strong> ${usuarioActual.edad} años</p>
        <p><strong>Género:</strong> ${usuarioActual.genero}</p>
    `;

    // Si subió una foto la mostramos
    if (usuarioActual.foto) {
        html += `<img src="${usuarioActual.foto}" alt="Foto de perfil" class="foto-perfil">`;
    }
    datosDiv.innerHTML = html;
});

//Mostrar que esta logeado
document.addEventListener("DOMContentLoaded", () => {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    if (usuarioActual) {
        const headerBox = document.getElementById("usuarioHeader");
        const nombre = document.getElementById("nombreUsuarioHeader");
        const foto = document.getElementById("fotoUsuarioHeader");
        // Mostrar el recuadro
        headerBox.style.display = "flex";
        // Nombre
        nombre.textContent = usuarioActual.usuario;
        // Foto si existe
        if (usuarioActual.foto) {
            foto.src = usuarioActual.foto;
        } else {
            foto.src = "IMAGENES HF/fotoGenerica.png";
        }
    }
});
function cerrarSesion() {
    localStorage.removeItem("usuarioActual");
    window.location.reload();
}

//validacion de login
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();
            const correo = document.getElementById("correoLogin").value.trim();
            const clave = document.getElementById("claveLogin").value.trim();
            // Obtener usuarios del registro
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            // Buscar coincidencia
            const usuarioEncontrado = usuarios.find(
                u => u.correo === correo && u.contrasena === clave
            );
            if (!usuarioEncontrado) {
                alert("Correo o contraseña incorrectos.");
                return;
            }
            // Guardar sesión sin contraseña
            const usuarioActual = {
                nombre: usuarioEncontrado.nombre,
                usuario: usuarioEncontrado.usuario,
                correo: usuarioEncontrado.correo,
                edad: usuarioEncontrado.edad,
                genero: usuarioEncontrado.genero,
                foto: usuarioEncontrado.foto
            };
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
            alert("Inicio de sesión exitoso");
            window.location.href = "index.html";
        });
    }
});


// Registro de mascota para adopcion
function registrarMascota() {
    const nombreDueno = document.getElementById("nombre").value.trim();
    const nombreMascota = document.getElementById("usuario").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const raza = document.getElementById("raza").value.trim();
    const genero = document.getElementById("genero").value;
    const foto = document.getElementById("foto").files[0];
    if (!nombreDueno || !nombreMascota || !telefono || !edad || !descripcion || !genero || !raza) {
        alert("Por favor completa todos los campos.");
        return;
    }
    const mascotasGuardadas = JSON.parse(localStorage.getItem("mascotas")) || [];
    // Convertir foto
    if (foto) {
        const reader = new FileReader();
        reader.onload = e => guardarMascota(e.target.result);
        reader.readAsDataURL(foto);
    } else {
        guardarMascota(null);
    }
    function guardarMascota(fotoBase64) {
        const nuevaMascota = {
            nombreDueno,
            nombreMascota,
            telefono,
            edad,
            descripcion,
            raza,
            genero,
            foto: fotoBase64
        };
        mascotasGuardadas.push(nuevaMascota);
        localStorage.setItem("mascotas", JSON.stringify(mascotasGuardadas));
        alert("Mascota registrada con éxito");
        window.location.href = "finalDarAdopcion.html";
    }
}
//Mostrar informacion de la mascota registrada
if (document.getElementById("datosMascota")) {

    const mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];
    const ultima = mascotas[mascotas.length - 1]; // última registrada

    const contenedor = document.getElementById("datosMascota");

    if (ultima) {
        contenedor.innerHTML = `
            <div class="tarjeta-registrada">
                <h3>${ultima.nombreMascota}</h3>
                <img src="${ultima.foto}" alt="${ultima.nombreMascota}">
                <p><strong>Raza:</strong> ${ultima.raza}</p>
                <p><strong>Edad:</strong> ${ultima.edad}</p>
                <p><strong>Género:</strong> ${ultima.genero}</p>
                <p><strong>Descripción:</strong> ${ultima.descripcion}</p>
                <p><strong>Dueño:</strong> ${ultima.nombreDueno}</p>
                <p><strong>Teléfono:</strong> ${ultima.telefono}</p>
            </div>
        `;
    } else {
        contenedor.innerHTML = "<p>No se encontró la mascota registrada.</p>";
    }
}

// Ver mascota seleccionada
function verMascota(i) {
    const mascotasDefault = [
        { nombre: "MAX", raza: "Labrador", descripcion: "Perrito de 2 años esperando buscar una familia que lo quiera", foto: "IMAGENES HF/labrador.png" },
        { nombre: "LUNA", raza: "Siames", descripcion: "Gatita de 1 añito que come mucho pero le gusta estar en su casa", foto: "IMAGENES HF/siames.png" },
        { nombre: "ROCKY", raza: "Mestizo", descripcion: "Perroto de 3 años que quiere volver a ser amado por una familia", foto: "IMAGENES HF/Pcafe.png" }
    ];
    const mascotasLS = JSON.parse(localStorage.getItem("mascotas")) || [];
    const todasMascotas = [
        ...mascotasDefault,
        ...mascotasLS.map(m => ({
            nombre: m.nombreMascota,
            raza: m.raza,
            descripcion: m.descripcion,
            foto: m.foto
        }))
    ];
    localStorage.setItem("mascotaSeleccionada", JSON.stringify(todasMascotas[i]));
    window.location.href = "infoMascota.html";
}

// CARRUSEL DE MASCOTAS
document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.getElementById("contenedorMascotas");
    if (!contenedor) return;
    // Mascotas por defecto
    const mascotasDefault = [
        { nombre: "MAX", raza: "Labrador", descripcion: "Perrito de 2 años esperando buscar una familia que lo quiera", foto: "IMAGENES HF/labrador.png" },
        { nombre: "LUNA", raza: "Siames", descripcion: "Gatita de 1 añito que come mucho pero le gusta estar en su casa", foto: "IMAGENES HF/siames.png" },
        { nombre: "ROCKY", raza: "Mestizo", descripcion: "Perrito de 3 años que quiere volver a ser amado por una familia", foto: "IMAGENES HF/Pcafe.png" }
    ];
    // Mascotas guardadas en localStorage
    const mascotasLS = JSON.parse(localStorage.getItem("mascotas")) || [];
    // Unir ambas listas
    const todasMascotas = [
        ...mascotasDefault,
        ...mascotasLS.map(m => ({
            nombre: m.nombreMascota,
            raza: m.raza,
            foto: m.foto
        }))
    ];
    let index = 0;        // posición actual
    const porPagina = 3;  // cuántas mostrar al mismo tiempo
    function mostrarMascotas() {
        contenedor.innerHTML = "";
        const visibles = todasMascotas.slice(index, index + porPagina);
        visibles.forEach((m, i) => {
            const realIndex = index + i;
            contenedor.innerHTML += `
            <div class="tarjeta">
                <h3>${m.nombre}</h3>
                <img src="${m.foto}" alt="${m.nombre}">
                <p>${m.raza || ""}</p>
                <button onclick="verMascota(${realIndex})">ADOPTAR</button>
            </div>
        `;
        });
    }
    mostrarMascotas();
    // Flechas
    document.getElementById("flechaDer").addEventListener("click", () => {
        if (index + porPagina < todasMascotas.length) {
            index += porPagina;
            mostrarMascotas();
        }
    });
    document.getElementById("flechaIzq").addEventListener("click", () => {
        if (index - porPagina >= 0) {
            index -= porPagina;
            mostrarMascotas();
        }
    });

});
// MOSTRAR MASCOTA EN infoMascotas.html
if (document.getElementById("contenedorDetalleMascota")) {

    const mascota = JSON.parse(localStorage.getItem("mascotaSeleccionada"));
    const contenedor = document.getElementById("contenedorDetalleMascota");

    if (mascota) {
        contenedor.innerHTML = `
        <div class="imagen">
            <img src="${mascota.foto}" alt="${mascota.nombre}">
        </div>
        <div class="texto-detalle">
            <h2>${mascota.nombre}</h2>
            <h3>INFORMACIÓN</h3>
            <p><strong>Descripción: </strong>${mascota.descripcion || "No disponible"}</p>
            <p><strong>Raza: </strong>${mascota.raza}</p>
            <button onclick="window.location.href='formAdopcion.html'">ADOPTAR</button>
            <button onclick="window.location.href='adopta.html'">REGRESAR</button>
        </div>
    `;
    }
}

//Verificar si el usuario esta logeado antes de cualquier accion
function verificarLogin() {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    if (!usuarioActual) {
        alert("Debes iniciar sesión para acceder aquí.");
        window.location.href = "login.html";
    }
}
//dinanismo en informacion
document.addEventListener("DOMContentLoaded", function () {
    const img = document.getElementById("imgNosotros");
    if (!img) return;
    // Imágenes disponibles
    const imagenes = [
        "IMAGENES HF/cuatro.png",
        "IMAGENES HF/bucle2.png",
        "IMAGENES HF/bucle3.png",
        "IMAGENES HF/bucle4.png"
    ];
    let index = 0;
    // Cambiar al pasar el mouse
    img.addEventListener("mouseenter", () => {
        index = (index + 1) % imagenes.length;
        img.src = imagenes[index];
    });
});
