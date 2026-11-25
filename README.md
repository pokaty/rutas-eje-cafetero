# Rutas del Eje

Catálogo de rutas turísticas del Eje Cafetero (Caldas, Risaralda y Quindío).
Las tarjetas **no están escritas a mano**: JavaScript las construye a partir de los datos en `js/datos.js`,
y se pueden filtrar por tipo y buscar por nombre o municipio.

- **Aprendiz:** Emmanuel Grajales Molina (Pokaty)
- **Ficha:** 3349882 · Tecnólogo en Análisis y Desarrollo de Software · SENA CDITI
- **Sitio publicado (GitHub Pages):** https://pokaty.github.io/rutas-eje-cafetero/

- **Lo que aprendí:** ver [APRENDIZAJES.md](APRENDIZAJES.md)

## Tecnologías
- HTML semántico + Bootstrap 5.3 (CDN): navbar con collapse, btn-group, cards y grilla
- CSS propio con variables (`css/estilos.css`) como guía de estilo
- JavaScript: arreglos de objetos, `map()`, `filter()`, template literals y eventos

## Guía de estilo
| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `--eje-primario` | `#1f5f3a` | Botones y acentos | Blanco encima: 7.62:1 |
| `--eje-secundario` | `#3e2c1c` | Navbar y pie | Blanco encima: 13.28:1 |
| `--eje-fondo` | `#faf6ee` | Fondo de la página | - |
| `--eje-texto` | `#640a85` | Texto general | Sobre el fondo: 10.13:1 |
| `--eje-fuente` | `system-ui, sans-serif` | Toda la página | - |

## Cómo verificar
```bash
node --test
```

## Estructura
```
index.html        página principal
css/estilos.css   guía de estilo (variables) + personalización de Bootstrap
js/datos.js       los datos: arreglo de rutas
js/app.js         la lógica: datos → tarjetas, filtros y eventos
tests/            pruebas automáticas (no modificar las 1-4)
APRENDIZAJES.md   mis explicaciones de cómo funciona cada parte
img/              ilustraciones
```
