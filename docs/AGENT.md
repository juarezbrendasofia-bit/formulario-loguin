# Guía de Directrices de Desarrollo (JavaScript)

Este documento establece las reglas estrictas de codificación, estilo y buenas prácticas que deben seguirse en el desarrollo de este proyecto de JavaScript.

## 1. Funciones y Sintaxis
* **Funciones Flecha (Arrow Functions):** Utiliza siempre funciones flecha (`() => {}`) para la declaración de funciones, tanto anónimas como nombradas (asignadas a constantes).
  ```javascript
  // Correcto
  const calcularTotal = (precio, impuesto) => precio * (1 + impuesto);
  ```

## 2. Paradigma de Programación
* **Programación Declarativa:** Prioriza el uso de métodos de orden superior de los arrays (`map`, `filter`, `reduce`, `find`, `some`, `every`) en lugar de bucles imperativos tradicionales (`for`, `while`).
  ```javascript
  // Correcto
  const nombresActivos = usuarios
    .filter((usuario) => usuario.activo)
    .map((usuario) => usuario.nombre);
  ```

## 3. Estructuras de Control (Condicionales)
* **Condicionales sin `else`:** Está terminantemente prohibido el uso de la cláusula `else`. Utiliza técnicas de **retornos tempranos (early returns)**, guard clauses o operadores ternarios para manejar los flujos alternativos.
  ```javascript
  // Correcto
  const verificarEdad = (edad) => {
    if (edad < 18) {
      console.warn("Acceso denegado: usuario menor de edad.");
      return false;
    }

    console.log("Acceso permitido.");
    return true;
  };
  ```

## 4. Persistencia de Datos
* **Almacenamiento Local:** Utiliza exclusivamente `localStorage` para guardar y recuperar cualquier dato necesario en el navegador. 
* **Restricción:** El uso de `sessionStorage` está **prohibido**.

## 5. Depuración y Logs
* **Mensajes en consola:** Agrega de manera estratégica sentencias `console.log`, `console.warn` o `console.error` dentro de los bloques condicionales o secciones críticas de código según corresponda:
  * `console.log`: Para flujos exitosos o información general de estado.
  * `console.warn`: Para advertencias, validaciones fallidas que no rompen la aplicación o casos límite.
  * `console.error`: Para manejo de errores, fallos en operaciones o excepciones.

## 6. Idioma y Nomenclatura
* **Idioma Español:** Absolutamente todo el código (nombres de variables, funciones, clases, parámetros, mensajes de error, textos en consola y comentarios) debe estar redactado **íntegramente en español**.
  ```javascript
  // Correcto
  const listaDeProductos = [];
  const obtenerPrecioFinal = (producto) => producto.precio;
  ```

## 7. Manipulación del DOM
* **Selección de Elementos:** Para interactuar con los elementos del HTML, utiliza **únicamente** el método `document.getElementById()`.
* **Restricción:** Está prohibido el uso de `querySelector` y `querySelectorAll`.
  ```javascript
  // Correcto
  const botonEnviar = document.getElementById("btn-enviar");
  ```