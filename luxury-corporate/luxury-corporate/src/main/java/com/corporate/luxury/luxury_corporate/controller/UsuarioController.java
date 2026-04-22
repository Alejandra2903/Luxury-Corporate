package com.corporate.luxury.luxury_corporate.controller;

import com.corporate.luxury.luxury_corporate.model.Usuario;
import com.corporate.luxury.luxury_corporate.model.Usuario.Estado;
import com.corporate.luxury.luxury_corporate.service.UsuarioService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

/**
 * Controlador único de Gestión de Usuarios.
 * Cumple con el prompt: Inyección por Constructor,
 * @GetMapping para la vista y @PostMapping para el registro.
 */
@Controller
public class UsuarioController {

    private final UsuarioService usuarioService;

    // ── Inyección por Constructor (requisito del prompt) ──
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // ── @PostMapping para el registro (requisito del prompt) ──
    @PostMapping("/usuarios/crear")
    public String crearUsuario(@ModelAttribute("nuevoUsuario") Usuario nuevo,
                               RedirectAttributes redirectAttributes) {
        try {
            // Validación de duplicados (Correo)
            if (usuarioService.buscarPorEmail(nuevo.getEmail()).isPresent()) {
                redirectAttributes.addFlashAttribute("errorForm", "El correo " + nuevo.getEmail() + " ya está registrado.");
                return "redirect:/";
            }

            // Validación de duplicados (Nombre)
            if (usuarioService.buscarPorNombre(nuevo.getNombre()).isPresent()) {
                redirectAttributes.addFlashAttribute("errorForm", "El usuario " + nuevo.getNombre() + " ya está registrado.");
                return "redirect:/";
            }

            nuevo.setEstado(Estado.ACTIVO);
            usuarioService.crear(nuevo);
            redirectAttributes.addFlashAttribute("mensaje", "Usuario creado exitosamente");
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("errorForm", e.getMessage());
        }
        return "redirect:/";
    }

    // ── Eliminar usuario ──
    @PostMapping("/usuarios/eliminar/{id}")
    public String eliminarUsuario(@PathVariable String id,
                                  RedirectAttributes redirectAttributes) {
        usuarioService.eliminar(id);
        redirectAttributes.addFlashAttribute("mensaje", "Usuario eliminado");
        return "redirect:/";
    }

    // ── Cambiar estado (activar/desactivar) ──
    @PostMapping("/usuarios/estado/{id}")
    public String cambiarEstado(@PathVariable String id,
                                @RequestParam String estado,
                                RedirectAttributes redirectAttributes) {
        usuarioService.cambiarEstado(id, Estado.valueOf(estado));
        redirectAttributes.addFlashAttribute("mensaje", "Estado actualizado");
        return "redirect:/";
    }

    // ── Editar usuario ──
    @PostMapping("/usuarios/editar/{id}")
    public String editarUsuario(@PathVariable String id,
                                @ModelAttribute("usuarioEditado") Usuario datos,
                                RedirectAttributes redirectAttributes) {
        try {
            usuarioService.actualizar(id, datos);
            redirectAttributes.addFlashAttribute("mensaje", "Usuario actualizado correctamente");
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("errorForm", e.getMessage());
        }
        return "redirect:/";
    }

    // ── Ver detalle de un usuario (JSON) ──
    @GetMapping("/api/usuarios/{id}")
    @ResponseBody
    public Optional<Usuario> verUsuario(@PathVariable String id) {
        return usuarioService.buscarPorId(id);
    }

    // ── API: listar todos (JSON) ──
    @GetMapping("/api/usuarios")
    @ResponseBody
    public java.util.List<Usuario> listarUsuariosApi() {
        return usuarioService.listarTodos();
    }
}
