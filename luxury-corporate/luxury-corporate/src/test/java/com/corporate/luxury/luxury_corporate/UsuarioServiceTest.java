package com.corporate.luxury.luxury_corporate;

import com.corporate.luxury.luxury_corporate.model.Usuario;
import com.corporate.luxury.luxury_corporate.model.Usuario.Rol;
import com.corporate.luxury.luxury_corporate.service.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UsuarioServiceTest {

    private UsuarioService usuarioService;

    @BeforeEach
    void setUp() {
        // Inicializamos el servicio antes de cada test para tener un entorno limpio
        usuarioService = new UsuarioService();
    }

    @Test
    void testCrearUsuarioExitoso() {
        // Arrange (Preparar)
        Usuario nuevo = new Usuario();
        nuevo.setNombre("Carlos Mendoza Perez");
        nuevo.setEmail("carlos@smartcorp.com");
        nuevo.setRol(Rol.OPERADOR);
        nuevo.setUbicacion("Sede Arequipa");

        // Act (Actuar)
        Usuario creado = usuarioService.crear(nuevo);

        // Assert (Afirmar)
        assertNotNull(creado, "El usuario devuelto no debería ser nulo");
        assertNotNull(creado.getId(), "El ID autogenerado no debería ser nulo");
        assertEquals("Carlos Mendoza Perez", creado.getNombre(), "El nombre debería coincidir");
        assertEquals(Usuario.Estado.ACTIVO, creado.getEstado(), "El estado por defecto debería ser ACTIVO");
    }

    @Test
    void testFallaAlGuardarUsuarioNulo() {
        // Arrange & Act & Assert
        // Requisito de la rúbrica: un test que falle (lance excepción) si los datos son nulos
        
        Exception excepcionTotal = assertThrows(IllegalArgumentException.class, () -> {
            usuarioService.crear(null);
        });
        assertEquals("El usuario no puede ser nulo", excepcionTotal.getMessage());

        Exception excepcionNombre = assertThrows(IllegalArgumentException.class, () -> {
            Usuario usuarioVacio = new Usuario();
            usuarioService.crear(usuarioVacio);
        });
        assertEquals("El nombre del usuario es obligatorio", excepcionNombre.getMessage());
    }
}
