/*
 * RETO · Pruebas propias para ordenarRutas(lista, criterio).
 * Patrón de cada prueba: Preparar, Ejecutar, Verificar.
 */
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { rutas } = require('../js/datos.js');
const { ordenarRutas } = require('../js/app.js');

describe('RETO · ordenarRutas(lista, criterio)', () => {
  test('nombre: ordena de A a Z respetando las tildes', () => {
    // Preparar: lista con una tilde que un orden por código Unicode pondría mal
    const lista = [
      { nombre: 'Zoológico' }, { nombre: 'Árbol' }, { nombre: 'Bosque' }
    ];
    // Ejecutar
    const resultado = ordenarRutas(lista, 'nombre').map((r) => r.nombre);
    // Verificar: "Árbol" va primero (localeCompare 'es'), no al final
    assert.deepEqual(resultado, ['Árbol', 'Bosque', 'Zoológico']);
  });

  test('nombre: con las rutas reales, cada nombre es <= al siguiente', () => {
    const resultado = ordenarRutas(rutas, 'nombre');
    for (let i = 1; i < resultado.length; i++) {
      assert.ok(resultado[i - 1].nombre.localeCompare(resultado[i].nombre, 'es') <= 0);
    }
  });

  test('precio: de menor a mayor y las gratis van primero', () => {
    const resultado = ordenarRutas(rutas, 'precio');
    assert.equal(resultado[0].precio, 0);
    for (let i = 1; i < resultado.length; i++) {
      assert.ok(resultado[i - 1].precio <= resultado[i].precio);
    }
  });

  test('duracion: de menor a mayor duración', () => {
    const resultado = ordenarRutas(rutas, 'duracion');
    const horas = resultado.map((r) => r.duracionHoras);
    assert.deepEqual(horas, [...horas].sort((a, b) => a - b));
    assert.equal(horas[0], Math.min(...rutas.map((r) => r.duracionHoras)));
  });

  test('no modifica la lista original ni el orden de rutas', () => {
    // Preparar: guarda el orden original de los ids
    const antes = rutas.map((r) => r.id);
    // Ejecutar
    const resultado = ordenarRutas(rutas, 'precio');
    // Verificar: rutas conserva su orden y el resultado es otro arreglo
    assert.deepEqual(rutas.map((r) => r.id), antes);
    assert.notEqual(resultado, rutas);
  });

  test('conserva todos los elementos (no pierde ni duplica rutas)', () => {
    const resultado = ordenarRutas(rutas, 'duracion');
    assert.equal(resultado.length, rutas.length);
    assert.deepEqual(resultado.map((r) => r.id).sort((a, b) => a - b), rutas.map((r) => r.id).sort((a, b) => a - b));
  });

  test('borde: criterio desconocido o vacío devuelve una copia en el mismo orden', () => {
    for (const criterio of ['', 'color', undefined]) {
      const resultado = ordenarRutas(rutas, criterio);
      assert.deepEqual(resultado, rutas);
      assert.notEqual(resultado, rutas);
    }
  });

  test('borde: una lista vacía devuelve una lista vacía', () => {
    assert.deepEqual(ordenarRutas([], 'precio'), []);
  });
});
