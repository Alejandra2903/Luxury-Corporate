Módulo de Ingesta y Simulación (Backend): Servicio multihilo que genera la telemetría. Se mantiene en Java como el "motor" del sistema.

Módulo Financial Engine (API RESTful): Procesa conversiones de divisas consumiendo APIs externas. Ahora debe estar preparado para servir datos formateados a Angular.

Módulo de Seguridad e Identidad (IAM - Spring Security + JWT): Ajuste: Ahora Angular debe interceptar el token JWT y almacenarlo de forma segura (LocalStorage o HttpInterceptor) para cada petición.

Módulo de Motor de Reglas (Business Logic): Lógica transaccional con JPA e Hibernate para asegurar que si una regla cambia, se registre correctamente sin errores de integridad.

Módulo Dashboard Operativo (Angular + SASS): Cambio Crítico: Refactorizado totalmente. Uso de componentes, servicios, observables (RxJS) para tiempo real y un sistema de rutas protegido por Guards.

Módulo de Auditoría y Trazabilidad: Registro de acciones en el backend.

Módulo de Reportes Ejecutivos: Generación de PDFs desde el backend para ser descargados desde la interfaz de Angular.

Módulo de Monitoreo de Sesión y Eventos de Interfaz:
 Este módulo en Angular detectará eventos como mouseleave (salir del viewport) o pérdida de foco de la pestaña (visibilitychange) mientras se editan datos financieros.
