document.addEventListener('DOMContentLoaded', () => {
    
    const btnNuevaRegla = document.getElementById('btnNuevaRegla');
    const modalRegla = document.getElementById('modalRegla');
    const btnCerrarModal = document.getElementById('btnCerrarModal');

    if (btnNuevaRegla) {
        btnNuevaRegla.addEventListener('click', () => {
            modalRegla.classList.add('active');
        });
    }

    if (btnCerrarModal) {
        btnCerrarModal.addEventListener('click', () => {
            modalRegla.classList.remove('active');
        });
    }

    // Cerrar al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === modalRegla) {
            modalRegla.classList.remove('active');
        }
    });

    // Pequeña animación para las tarjetas al cargar
    const cards = document.querySelectorAll('.regla-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
