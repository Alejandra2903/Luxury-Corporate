package com.corporate.luxury.luxury_corporate.controller;

import com.corporate.luxury.luxury_corporate.model.Consumo;
import com.corporate.luxury.luxury_corporate.service.SimulacionService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class SimulacionController {

    private final SimulacionService simulacionService;

    // ── Inyección por Constructor (Requisito Senior) ──
    public SimulacionController(SimulacionService simulacionService) {
        this.simulacionService = simulacionService;
    }

    @GetMapping("/simulacion")
    public String verSimulacion(Model model) {
        model.addAttribute("consumos", simulacionService.listarTodos());
        model.addAttribute("nuevoConsumo", new Consumo());
        return "consumo";
    }

    @PostMapping("/simulacion/registrar")
    public String registrarConsumo(Consumo consumo, RedirectAttributes redirectAttributes) {
        try {
            simulacionService.agregarConsumo(consumo);
            redirectAttributes.addFlashAttribute("mensaje", "Consumo registrado manualmente con éxito.");
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/simulacion";
    }

    @PostMapping("/simulacion/simular")
    public String ejecutarSimulacion(RedirectAttributes redirectAttributes) {
        simulacionService.generarSimulacion();
        redirectAttributes.addFlashAttribute("mensaje", "Se han generado 5 registros de consumo simulados.");
        return "redirect:/simulacion";
    }

    @PostMapping("/simulacion/limpiar")
    public String limpiarDatos() {
        simulacionService.limpiarConsumos();
        return "redirect:/simulacion";
    }
}
