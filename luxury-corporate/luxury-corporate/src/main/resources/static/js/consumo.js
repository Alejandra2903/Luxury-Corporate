/** ── CONSUMO JS (Vanilla Logic) ── **/

document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('consumoForm');
    const inputSede = document.getElementById('sede');
    const inputMonto = document.getElementById('monto');
    const errorSede = document.getElementById('errorSede');
    const errorMonto = document.getElementById('errorMonto');
    const btnSimular = document.getElementById('btnSimular');
    const statusBox = document.getElementById('statusMessage');

    // ── 1. VALIDACIÓN DE FORMULARIO ──
    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;

            // Limpiar estados previos
            errorSede.style.display = 'none';
            errorMonto.style.display = 'none';
            inputSede.style.borderColor = '#2A2F3D';
            inputMonto.style.borderColor = '#2A2F3D';

            // Validar Sede (mínimo 3 caracteres)
            if (inputSede.value.trim().length < 3) {
                errorSede.textContent = "La sede debe tener al menos 3 caracteres.";
                errorSede.style.display = 'block';
                inputSede.style.borderColor = '#EF4444';
                isValid = false;
            }

            // Validar Monto (debe ser mayor a 0)
            if (parseFloat(inputMonto.value) <= 0 || isNaN(parseFloat(inputMonto.value))) {
                errorMonto.textContent = "El monto debe ser un número positivo mayor a cero.";
                errorMonto.style.display = 'block';
                inputMonto.style.borderColor = '#EF4444';
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
                showDynamicMessage("Corrige los errores en el formulario.", "error");
            }
        });
    }

    // ── 2. MANEJO DE EVENTO "SIMULAR" (DOM Manipulation) ──
    if (btnSimular) {
        btnSimular.addEventListener('click', () => {
            // Mostramos un mensaje dinámico antes de que el formulario se envíe (UX)
            showDynamicMessage("Iniciando motor de simulación de recursos...", "success");
        });
    }

    // ── 3. FUNCIÓN PARA MENSAJES DINÁMICOS ──
    function showDynamicMessage(text, type) {
        // Crear elemento dinámicamente si no existe
        let msgDiv = document.createElement('div');
        msgDiv.className = `status-message ${type === 'error' ? 'error' : ''}`;
        msgDiv.style.position = 'fixed';
        msgDiv.style.bottom = '20px';
        msgDiv.style.right = '20px';
        msgDiv.style.zIndex = '1000';
        msgDiv.textContent = text;
        
        document.body.appendChild(msgDiv);

        // Remover después de 3 segundos
        setTimeout(() => {
            msgDiv.style.opacity = '0';
            setTimeout(() => msgDiv.remove(), 500);
        }, 3000);
    }

    // ── 4. LIMPIAR FORMULARIO (Si hubo éxito) ──
    if (statusBox && statusBox.textContent.includes("éxito")) {
        form.reset();
    }

});
