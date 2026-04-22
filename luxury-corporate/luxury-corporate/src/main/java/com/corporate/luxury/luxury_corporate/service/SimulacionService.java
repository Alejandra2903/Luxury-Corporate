package com.corporate.luxury.luxury_corporate.service;

import com.corporate.luxury.luxury_corporate.model.Consumo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class SimulacionService {

    private final List<Consumo> consumos = new ArrayList<>();

    // ── Obtener todos los consumos ──
    public List<Consumo> listarTodos() {
        return consumos;
    }

    // ── Agregar consumo manual con validación (Requisito IF) ──
    public void agregarConsumo(Consumo consumo) {
        if (consumo.getMonto() <= 0) {
            throw new IllegalArgumentException("El monto debe ser mayor a 0");
        }
        if (consumo.getSede() == null || consumo.getSede().isEmpty()) {
            throw new IllegalArgumentException("La sede es obligatoria");
        }
        consumos.add(consumo);
    }

    // ── Generar datos simulados (Requisito FOR) ──
    public void generarSimulacion() {
        String[] sedes = {"Lima Norte", "Sede Arequipa", "Sede Cusco", "Lima Centro", "Trujillo Norte"};
        String[] recursos = {"Electricidad", "Agua", "Gas Natural", "Conectividad"};
        Random random = new Random();

        // Generamos al menos 5 registros usando un bucle FOR (Requisito Crítico)
        for (int i = 0; i < 5; i++) {
            String sedeAleatoria = sedes[random.nextInt(sedes.length)];
            String recursoAleatorio = recursos[random.nextInt(recursos.length)];
            double montoAleatorio = 100 + (1500 * random.nextDouble()); // Monto entre 100 y 1600
            
            consumos.add(new Consumo(sedeAleatoria, recursoAleatorio, Math.round(montoAleatorio * 100.0) / 100.0));
        }
    }

    public void limpiarConsumos() {
        consumos.clear();
    }
}
