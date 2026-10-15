# Plan de integración de `script.js`

## ¿Para qué sirve este documento?

Este documento explica cómo se conecta el archivo `script.js` con las páginas HTML del flujo principal de registro. También deja por escrito qué alternativas podrían evaluarse más adelante.

El alcance acordado es limitado: usar el formulario principal y la página de bienvenida, manteniendo `rediseño-pantalla.html` como una página independiente. No se aplican mejoras ni correcciones en esta tarea. La revisión confirmó que los puntos de conexión principales ya están escritos en el HTML, así que no hace falta duplicarlos ni cambiar el comportamiento actual para documentarlos.

## Archivos que participan

### `script.js`: las acciones y reglas del formulario

Este archivo contiene las funciones que realizan las acciones del flujo:

- `capturarDatos(event)` procesa el envío del formulario de registro. Primero llama a `event.preventDefault()` para detener el envío tradicional del navegador. Luego lee los campos, comprueba la edad y que las contraseñas coincidan, guarda el correo en `localStorage` y, si las validaciones pasan, dirige a la persona a `bienvenida.html`.
- `validarLogin()` consulta en `localStorage` si ya existe un correo registrado y puede dirigir a la página de bienvenida.
- `logout()` borra datos guardados en `localStorage` y devuelve a `index.html`.

La guía del proyecto para el JavaScript está en `docs/AGENT.md`. Si en otra tarea se modifica o amplía la lógica, habrá que revisar esa guía y aplicar sus directivas.

### `index.html`: el formulario de registro

El formulario ya está conectado de las dos maneras necesarias:

1. En la etiqueta `<form>` está `onsubmit="capturarDatos(event)"`.
2. Al final del documento está `<script src="script.js"></script>`, que carga el archivo donde se define esa función.

El atributo `onsubmit` indica qué función ejecutar cuando la persona intenta enviar el formulario. El navegador pasa el evento de envío a la función mediante `event`. Así, `capturarDatos` puede validar los datos y decidir qué hacer antes de navegar a otra página.

Por ejemplo, el patrón que ya usa el proyecto es:

```html
<form onsubmit="capturarDatos(event)">
    <!-- Campos del formulario -->
</form>
```

No se debe agregar un segundo controlador de envío al mismo formulario: eso duplicaría responsabilidades. Para esta forma de conexión, el nombre escrito en el atributo (`capturarDatos`) debe coincidir exactamente con el nombre de la función de `script.js`.

### `bienvenida.html`: confirmación y cierre de sesión

La página de bienvenida también carga `script.js`. Su botón «Cerrar sesión» invoca `logout()` mediante `onclick="logout()"`.

Este botón no envía un formulario: ejecuta una acción directa. Por ese motivo, `onsubmit` no corresponde a ese botón; el atributo `onsubmit` se utiliza en el formulario de registro, y se conserva `onclick` para cerrar la sesión.

### `rediseño-pantalla.html`: página independiente

Esta página contiene otro formulario, con identificadores diferentes, y una implementación de JavaScript propia dentro del HTML. Por decisión de alcance, se mantiene independiente: no se le añade una conexión a `script.js`, no se sustituyen sus funciones y no se cambian sus controles.

## Recorrido del registro, paso a paso

1. La persona completa los campos del formulario de `index.html`.
2. Al pulsar el botón para crear el usuario, el formulario dispara el evento `submit`.
3. `onsubmit="capturarDatos(event)"` llama a la función del mismo nombre en `script.js`.
4. `event.preventDefault()` detiene el envío tradicional. Esto permite que la función valide y gestione la navegación.
5. El script compara los datos: rechaza una edad menor que 18 y comprueba que las dos contraseñas sean iguales. Si una validación falla, muestra un aviso y termina esa ejecución.
6. Si las validaciones pasan, guarda el correo en `localStorage` y navega a `bienvenida.html`.
7. En la página de bienvenida, el botón «Cerrar sesión» ejecuta `logout()` y vuelve a `index.html`.

## Estado de la integración

| Página | Estado comprobado | Acción de esta tarea |
|---|---|---|
| `index.html` | Carga `script.js` y el formulario llama a `capturarDatos(event)` con `onsubmit`. | Documentar la conexión; no duplicarla ni cambiarla. |
| `bienvenida.html` | Carga `script.js` y el botón ejecuta `logout()` con `onclick`. | Documentar la conexión; conservarla porque el botón no envía un formulario. |
| `rediseño-pantalla.html` | Tiene una estructura y una lógica propias, distintas de las del formulario principal. | Mantenerla independiente y sin cambios. |

## Opciones para un trabajo futuro

Las opciones siguientes son ideas para conversar o planificar en otro momento. **No se implementan como parte de este trabajo.**

1. **Mantener las páginas separadas.** Conservar el flujo principal conectado a `script.js` y dejar el rediseño con su código propio. Esta es la opción aplicada al alcance actual.
2. **Integrar el rediseño con el JavaScript común.** Antes de hacerlo habría que comparar sus identificadores, validaciones y comportamiento con los del formulario principal. No basta con agregar la etiqueta `<script>`: el JavaScript actual busca IDs como `email`, `edad` y `contrasenia`, mientras que el rediseño usa otros, como `userEmail`, `birthDate` y `userPassword`.
3. **Aclarar la regla de edad.** El código acepta 18 años (solo rechaza valores menores de 18), mientras que el aviso dice «Debes ser mayor a 18 años». En otro trabajo se podría decidir si el requisito es tener 18 años o más, o ser mayor de 18, y hacer coincidir el texto con la regla elegida.
4. **Revisar qué datos borra el cierre de sesión.** `localStorage.clear()` elimina todos los datos de almacenamiento local del sitio, no solo el correo de registro. Se podría decidir si el cierre debe borrar únicamente el dato que utiliza esta aplicación.
5. **Revisar los mensajes de depuración.** Hay un `console.log` que incluye el correo y las dos contraseñas. Se podría evaluar si conviene retirar las contraseñas de los registros de consola.
6. **Revisar la detección de la página de bienvenida.** `script.js` compara la ruta con `/bienvenida.html`. Si el sitio se sirve bajo una ruta adicional, convendría comprobar si esa comparación sigue identificando correctamente la página.
7. **Revisar el cumplimiento completo de `docs/AGENT.md`.** Si se decide modificar el JavaScript, se puede comprobar en una tarea separada que los nombres, los mensajes y las técnicas usadas respeten todas las directivas del proyecto.

## Verificación sencilla en el navegador

Para comprobar manualmente las conexiones, sin cambiar el código:

1. Abrir `index.html`, completar el formulario con datos de prueba y enviarlo.
2. Confirmar que una edad menor que 18 o dos contraseñas distintas detienen el registro y muestran el aviso correspondiente.
3. Confirmar que, con datos que pasan las validaciones, se abre `bienvenida.html`.
4. Pulsar «Cerrar sesión» y confirmar que se regresa a `index.html`.
5. Abrir `rediseño-pantalla.html` por separado y comprobar que sigue usando su flujo propio.

Estas comprobaciones describen el comportamiento esperado; no autorizan a cambiar las reglas ni a corregir diferencias detectadas.
