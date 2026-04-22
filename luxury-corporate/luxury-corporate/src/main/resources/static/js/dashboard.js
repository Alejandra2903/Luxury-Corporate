document.addEventListener('DOMContentLoaded', () => {
    
    // ── MOBILE MENU TOGGLE ──
    const btnMobileMenu = document.getElementById('btnMobileMenu');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (btnMobileMenu && sidebar && sidebarOverlay) {
        btnMobileMenu.addEventListener('click', () => {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
        });

        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }

    // ── INTERACCIÓN Y VALIDACIÓN (Requisito Vanilla JS) ──
    const form = document.getElementById('usuarioForm');
    const inputNombre = document.getElementById('nombre');
    const inputEmail = document.getElementById('email');
    const selectRol = document.getElementById('rol');
    
    const errorNombre = document.getElementById('errorNombre');
    const errorEmail = document.getElementById('errorEmail');

    // Evento: Cambia el color del select dependiendo del rol seleccionado
    if (selectRol) {
        selectRol.addEventListener('change', function(e) {
            const rol = e.target.value;
            if (rol === 'ADMINISTRADOR') {
                selectRol.style.borderColor = 'var(--primary-yellow)';
                selectRol.style.color = 'var(--primary-yellow)';
            } else if (rol === 'SUPERVISOR') {
                selectRol.style.borderColor = '#3B82F6';
                selectRol.style.color = '#3B82F6';
            } else {
                selectRol.style.borderColor = 'var(--border-color)';
                selectRol.style.color = 'var(--text-primary)';
            }
        });
    }

    // Validación de formulario CREAR antes del submit
    if (form) {
        form.addEventListener('submit', function(e) {
            let valid = true;
            
            // Limpiar errores
            errorNombre.style.display = 'none';
            errorEmail.style.display = 'none';
            inputNombre.style.borderColor = 'var(--border-color)';
            inputEmail.style.borderColor = 'var(--border-color)';

            // Validar Nombre: mínimo 3 palabras (Nombre + 2 Apellidos)
            const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}(\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,})*$/;
            if (!nameRegex.test(inputNombre.value.trim())) {
                errorNombre.textContent = "Debes ingresar Nombre y 2 Apellidos (ej: Juan Pérez Gómez).";
                errorNombre.style.display = 'block';
                inputNombre.style.borderColor = 'var(--danger-red)';
                valid = false;
            }

            // Validar Email: solo correo corporativo @smartcorp.com
            const emailRegex = /^[a-zA-Z0-9._%+-]+@smartcorp\.com$/;
            if (!emailRegex.test(inputEmail.value.trim())) {
                errorEmail.textContent = "Solo se permiten correos corporativos (@smartcorp.com).";
                errorEmail.style.display = 'block';
                inputEmail.style.borderColor = 'var(--danger-red)';
                valid = false;
            }

            if (!valid) e.preventDefault();
        });
    }

    // ── MODAL CREAR ──
    const btnNuevoUsuario = document.getElementById('btnNuevoUsuario');
    const modalNuevoUsuario = document.getElementById('modalNuevoUsuario');
    const btnCerrarModal = document.getElementById('btnCerrarModal');

    if (btnNuevoUsuario && modalNuevoUsuario) {
        btnNuevoUsuario.addEventListener('click', () => {
            modalNuevoUsuario.style.display = 'flex';
        });
    }
    if (btnCerrarModal && modalNuevoUsuario) {
        btnCerrarModal.addEventListener('click', () => {
            modalNuevoUsuario.style.display = 'none';
        });
    }
    window.addEventListener('click', (e) => {
        if (e.target === modalNuevoUsuario) {
            modalNuevoUsuario.style.display = 'none';
        }
    });

    // ── MODAL EDITAR ──
    const modalEditar = document.getElementById('modalEditarUsuario');
    const btnCerrarEditar = document.getElementById('btnCerrarModalEditar');
    const editarForm = document.getElementById('editarForm');

    // Escuchar clic en todos los botones de editar
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', function() {
            const id       = this.getAttribute('data-id');
            const nombre   = this.getAttribute('data-nombre');
            const email    = this.getAttribute('data-email');
            const rol      = this.getAttribute('data-rol');
            const ubicacion = this.getAttribute('data-ubicacion');
            const estado   = this.getAttribute('data-estado');

            // Rellenar campos del modal con los datos actuales del usuario
            document.getElementById('editNombre').value   = nombre;
            document.getElementById('editEmail').value    = email;
            document.getElementById('editRol').value      = rol;
            document.getElementById('editUbicacion').value = ubicacion;
            document.getElementById('editEstado').value   = estado;

            // Apuntar el form al endpoint correcto con el ID del usuario
            editarForm.action = `/usuarios/editar/${id}`;

            // Mostrar el modal
            modalEditar.style.display = 'flex';
        });
    });

    // Validación en modal editar al hacer submit
    if (editarForm) {
        editarForm.addEventListener('submit', function(e) {
            let valid = true;
            const editNombreInput = document.getElementById('editNombre');
            const editEmailInput  = document.getElementById('editEmail');
            const errEditNombre   = document.getElementById('errorEditNombre');
            const errEditEmail    = document.getElementById('errorEditEmail');

            errEditNombre.textContent = '';
            errEditEmail.textContent  = '';
            editNombreInput.style.borderColor = 'var(--border-color)';
            editEmailInput.style.borderColor  = 'var(--border-color)';

            const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}(\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,})*$/;
            if (!nameRegex.test(editNombreInput.value.trim())) {
                errEditNombre.textContent = 'Nombre y 2 Apellidos obligatorios (ej: Juan Pérez Gómez).';
                editNombreInput.style.borderColor = 'var(--danger-red)';
                valid = false;
            }
            const emailRegex = /^[a-zA-Z0-9._%+-]+@smartcorp\.com$/;
            if (!emailRegex.test(editEmailInput.value.trim())) {
                errEditEmail.textContent = 'Solo correos @smartcorp.com.';
                editEmailInput.style.borderColor = 'var(--danger-red)';
                valid = false;
            }

            if (!valid) e.preventDefault();
        });
    }

    // Cerrar modal editar
    if (btnCerrarEditar && modalEditar) {
        btnCerrarEditar.addEventListener('click', () => {
            modalEditar.style.display = 'none';
        });
    }
    window.addEventListener('click', (e) => {
        if (e.target === modalEditar) {
            modalEditar.style.display = 'none';
        }
    });

    // ── MÓDULO 8 (TRAZABILIDAD) ──
    document.addEventListener('mouseleave', () => {
        console.warn('Evento de Seguridad: Pérdida de foco detectada en Gestión de Usuarios');
    });

});
