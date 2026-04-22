package com.corporate.luxury.luxury_corporate.controller;

import com.corporate.luxury.luxury_corporate.model.Usuario;
import com.corporate.luxury.luxury_corporate.service.UsuarioService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    private final UsuarioService usuarioService;

    public DashboardController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // ── Página principal: listado de usuarios ──
    @GetMapping("/")
    public String dashboard(Model model) {
        model.addAttribute("usuarios", usuarioService.listarTodos());
        model.addAttribute("totalUsuarios", usuarioService.contarTotal());
        model.addAttribute("usuariosActivos", usuarioService.contarActivos());
        model.addAttribute("totalOperadores", usuarioService.contarOperadores());

        // Objeto vacío para vincular con el formulario (th:object)
        model.addAttribute("nuevoUsuario", new Usuario());

        return "usuarios";
    }
}
