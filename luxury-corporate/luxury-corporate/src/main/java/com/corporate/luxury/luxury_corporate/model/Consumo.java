package com.corporate.luxury.luxury_corporate.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Consumo {
    private String sede;
    private String tipoRecurso; // Ejemplo: Electricidad, Agua, Gas
    private double monto;
}
