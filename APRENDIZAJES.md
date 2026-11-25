# Mis aprendizajes · Rutas del Eje

> Las pruebas automáticas dicen si tu código **funciona**. Este archivo muestra si **entiendes por qué funciona**.
> Responde con tus palabras, en 2 a 5 líneas por pregunta. No copies la documentación: explícala.
> En cada issue anota también **qué consultaste** (enlace) y **qué encontraste ahí**.
>
> Este archivo forma parte de la calificación del reto (criterio *Comprensión*).

**Aprendiz:** Emmanuel Grajales Molina (Pokaty)

---

## Issue #1 · G1 Guía de estilo

**Consulté:** MDN, Using CSS custom properties → las variables se declaran en `:root` con `--nombre` y se leen con `var(--nombre)`. Bootstrap, Buttons (variables) → cada botón lee `--bs-btn-bg`, `--bs-btn-color`, etc. WebAIM Contrast Checker → el texto necesita ≥ 4.5:1.

1. **Explica:** ¿qué ventaja tiene escribir los colores como variables en `:root` en vez de escribir el hex directamente en cada regla?
   facilita muchisimo las cosas ya que al usar colores de forma global, no hay que memorizar el hexa de los colores, solo usarse la variable que se dio como referencia

2. **Experimenta y explica:** en DevTools selecciona el botón "Ver rutas", pestaña *Computed* (o *Calculado*) y busca `--bs-btn-bg`. ¿De dónde sale su valor? ¿Por qué cambiar `--bs-primary` no habría cambiado el color del botón?
   El valor de `--bs-btn-bg` sale de la regla `.btn-primary` de mi `estilos.css`, que lo pone en `var(--eje-primario)`. Cada componente de Bootstrap lee sus propias variables `--bs-btn-*`, así que cambiar solo `--bs-primary` no cambia el botón: hay que sobrescribir las variables del componente.

3. **¿Qué pasaría si…** enlazas `estilos.css` ANTES de `bootstrap.min.css` en el `<head>`? Pruébalo, describe lo que ves y vuelve a dejarlo como estaba.
   no se podria sobreescribir, yo lo cambie y lo que paso es que se cambio el color de un boton

---

## Issue #2 · G2 Componentes

**Consulté:** Bootstrap, Navbar (Responsive behaviors) → el toggler y el `div.collapse.navbar-collapse` se conectan por `data-bs-target` e `id`. MDN, aria-pressed → botones de alternar con `true`/`false`. MDN, data-* → atributos propios que JS lee con `dataset`.

1. **Explica:** ¿qué relación hay entre `data-bs-target="#menu"` en el botón y el `id="menu"` del div? ¿Quién lee ese atributo?
   El `data-bs-target="#menu"` es un selector CSS que apunta al elemento con `id="menu"`. Lo lee el JavaScript de Bootstrap (bootstrap.bundle) al hacer clic, para saber qué elemento mostrar u ocultar. Si el id no coincide, el botón no abre nada.

2. **Experimenta:** abre y cierra el menú en un ancho de celular y observa en DevTools el atributo `aria-expanded` del botón. ¿Qué pasa con su valor? ¿Para quién es útil esa información?
   Bootstrap cambia `aria-expanded` entre `false` (menú cerrado) y `true` (abierto) cada vez que se usa el botón. Sirve a quien usa lector de pantalla, porque le anuncia si el menú está abierto o cerrado sin verlo. (Nota: el cambio lo verifiqué leyendo la documentación; el atributo lo gestiona Bootstrap.)

3. **¿Qué pasaría si…** en un botón de filtro escribes `data-tipo="café"` (con tilde)? Piensa en lo que hay en `datos.js` antes de responder.
   El filtro no funcionaría: en `datos.js` el tipo es `'cafe'` sin tilde y `filtrarPorTipo` compara con `===`, así que `'café' !== 'cafe'` y no devolvería ninguna ruta (saldría "No encontramos rutas…").

---

## Issue #3 · G3 Datos → tarjetas

**Consulté:** MDN, Template literals → las comillas invertidas permiten varias líneas e insertar valores con `${ }`. MDN, map() → devuelve un arreglo NUEVO del mismo tamaño. MDN, join() → si no se da separador usa la coma. MDN, innerHTML → reemplaza todo el contenido anterior del elemento.

1. **Predice y comprueba:** antes de ejecutarlas en la consola del navegador, escribe qué crees que devuelve cada línea. Después ejecútalas y anota el resultado real.
   ```js
   [1, 2, 3].map((n) => n * 10)
   ['a', 'b', 'c'].join('')
   ['a', 'b', 'c'].join(' - ')
   rutas.map((r) => r.nombre).length
   ```
   | Línea | Mi predicción | Resultado real |
   |---|---|---|
   | 1 | `[10, 20, 30]` | `[10, 20, 30]` |
   | 2 | `'abc'` | `'abc'` |
   | 3 | `'a - b - c'` | `'a - b - c'` |
   | 4 | `11` | `11` |

2. **Experimenta y explica:** quita temporalmente `.join('')` de `pintarRutas`. ¿Qué aparece entre las tarjetas y por qué? (Pista: ¿qué hace `innerHTML` cuando le asignas un arreglo?). Vuelve a ponerlo.
   Sin `.join('')`, `innerHTML` recibe un arreglo y lo convierte a texto con `toString()`, que separa los elementos con comas; por eso aparecerían comas entre las tarjetas. `join('')` las une sin separador.

3. **Explica:** ¿por qué la tarjeta se escribe con comillas invertidas `` ` `` y no con comillas simples `' '`? ¿Qué hace `${ }`?
   Las comillas invertidas crean un template literal: permite escribir el HTML en varias líneas y `${ }` inserta el valor de una expresión (por ejemplo `${ruta.nombre}`). Con comillas simples `${ruta.nombre}` se mostraría tal cual, como texto.

---

## Issue #4 · G4 Filtros y eventos

**Consulté:** MDN, filter() → devuelve un arreglo nuevo y no modifica el original. MDN, addEventListener() → registra la función que se ejecuta cuando ocurre el evento. MDN, evento input → se dispara en cada cambio del valor, a diferencia de `change`. MDN, aria-live → `polite` anuncia los cambios sin interrumpir.

1. **Predice y comprueba:** después de ejecutar `filtrarPorTipo(rutas, 'cafe')` en la consola, ¿cuánto vale `rutas.length`? ¿Por qué?
   `rutas.length` sigue valiendo 11 (comprobado en Node: el filtro devuelve 2 rutas de café). `filter()` no modifica el arreglo original: crea uno nuevo con los elementos que cumplen la condición.

2. **Explica el recorrido:** describe paso a paso qué pasa desde que la persona hace clic en el botón "Cultura" hasta que aparecen las tarjetas nuevas. Menciona: el evento, `estado`, `aplicarFiltros()`, `filtrarPorTipo()` y `pintarRutas()`.
   1) Clic en "Cultura" dispara el evento `click`. 2) El listener guarda `boton.dataset.tipo` ("cultura") en `estado.tipo` y actualiza `active` y `aria-pressed` de los botones. 3) Llama a `aplicarFiltros()`, que parte de `rutas` y usa `filtrarPorTipo()`, `buscarPorTexto()` y `ordenarRutas()`. 4) `pintarRutas()` genera las tarjetas con `crearCard()` y las pone en `#lista-rutas` con `innerHTML`, y actualiza el texto de `#resultado`.

3. **¿Qué pasaría si…** usas el evento `'change'` en lugar de `'input'` en el buscador? Pruébalo y describe la diferencia.
   `input` se dispara con cada letra que se escribe, así que la lista se actualiza mientras escribo. `change` en un campo de texto solo se dispara al terminar de editar (al salir del campo o pulsar Enter), por lo que la lista se actualizaría tarde.

---

## Reto · Ordenar rutas

**Consulté:** MDN, sort() → ordena el arreglo SOBRE EL QUE SE LLAMA (lo modifica) y devuelve esa misma referencia. MDN, localeCompare() → compara textos según el idioma (con `'es'` respeta tildes). MDN, spread → `[...lista]` crea una copia superficial. MDN, evento change → se dispara en un `<select>` al elegir otra opción.

1. **Explica:** ¿por qué `ordenarRutas` hace `const copia = [...lista]` antes de `sort()`? ¿Qué le pasaría a `rutas` si no se copia? ¿Qué prueba tuya lo demuestra?
   Porque `sort()` modifica el arreglo original. Sin la copia, `ordenarRutas(rutas, 'precio')` dejaría `rutas` desordenado para siempre y los demás filtros partirían de un orden alterado. Lo demuestra mi prueba "no modifica la lista original ni el orden de rutas".

2. **Explica:** en `copia.sort((a, b) => a.precio - b.precio)`, ¿qué significa que la función devuelva un número negativo, cero o positivo?
   La función de comparación recibe dos elementos `a` y `b`: si devuelve un número negativo, `a` va antes que `b`; si devuelve 0, se consideran iguales; si devuelve positivo, `a` va después. Con `a.precio - b.precio` el menor precio queda primero.

3. **Tus pruebas:** elige una de tus pruebas y explica qué error de programación detectaría si alguien dañara la función.
   La prueba "no modifica la lista original" detectaría si alguien quita `const copia = [...lista]` y ordena `lista` directamente: el orden de los ids de `rutas` cambiaría y la prueba fallaría. La de "criterio desconocido" detectaría que se devuelva `undefined` o se ordene cuando no debe.
