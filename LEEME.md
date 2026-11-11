# ArjunaFit · Landing de fin de año (código organizado)

Landing de ventas de arjunafit.com: asesoría 1:1 con Arju + App ArjunaFit (lanzamiento en enero de 2027; quien empieza hoy con Arju entra como Miembro Fundadora).
El diseño y la lógica están separados del contenido para que cada cosa se encuentre en un solo lugar.

**Versión:** v6 (noviembre de 2026): el hero pregunta «Mi objetivo es:» y toda la página se ajusta al objetivo elegido (ver «Mi objetivo (selector del hero)»), y se quitó la pantalla «Tu hora con Arju + la App ArjunaFit» (la 2.1). Parte de la auditoría final (octubre de 2026) y del arreglo para Android (28 de octubre de 2026; ver «Si en Android no se ven los efectos»). El informe de esa auditoría está al final de este archivo y es anterior a la v5 y a la v6 (ver «Qué se comprobó en la v6»).

**Qué se publica:** la carpeta tal cual (`index.html` + `assets/`), desde GitHub a Vercel. La carpeta `dist/` (un solo archivo) quedó obsoleta: arjunafit.com no la sirve.

---

## Qué hay en esta carpeta

```
index.html                       La página: solo textos y estructura
assets/css/styles.css            Todo el diseño, en 27 secciones numeradas (la 05b es el selector de objetivo y la 26b el respaldo sin JavaScript; la 21 y la 22 ya no se usan)
assets/js/landing.js             Toda la lógica, en 20 secciones numeradas (la 13b es el botón «Pausar animaciones» y la 19 conecta el objetivo con el resto)
assets/js/diag.js                Panel de diagnóstico: solo se carga con arjunafit.com/?diag
assets/img/logo-arjunafit.webp   Logo redondo (favicon, header y teléfono)
assets/img/og.jpg                Imagen que aparece al compartir el enlace (1200 x 630 px)
assets/img/apple-touch-icon.png  Ícono al guardar la página en el iPhone (180 x 180 px)
build.py                         Junta todo en un solo archivo
dist/                            OBSOLETO: versión de un solo archivo; arjunafit.com publica index.html + assets/
```

`styles.css` y `landing.js` empiezan con un índice. Cada sección tiene un título en mayúsculas; busca ese título para saltar a ella.

---

## Cómo subirla

> **Para subir la v6 (como siempre: GitHub y Vercel publica solo):** en el repositorio `Arjuna-Developer/Arjuna-Fit`, rama `main`, «Add file › Upload files». Arrastra `index.html`, `LEEME.md` y la carpeta `assets` (en el paquete de la v6 están dentro de la carpeta `subir`; arrastra lo que hay adentro, no esa carpeta en sí) y confirma con «Commit changes». Son 5 archivos: `index.html`, `LEEME.md`, `assets/css/styles.css`, `assets/js/landing.js` y `assets/js/diag.js`. Reemplazan a los del mismo nombre y no tocan ninguna imagen.

> **Actualización (28 de octubre de 2026):** arjunafit.com se publica con la **Opción B** (GitHub → Vercel, `index.html` + `assets/`). La Opción A ya no aplica.

**Opción A · Archivos sueltos (la forma que ya usas en Vercel)**
Arrastra juntos los **tres archivos de `dist/`**: `index.html`, `og.jpg` y `apple-touch-icon.png`.
`index.html` trae el CSS, el JS y el logo adentro. Las dos imágenes tienen que quedar en la raíz del sitio: la página las pide como `/og.jpg` y `/apple-touch-icon.png`.
Pruébala en una ventana de incógnito y en tu celular.

> Cuidado: si el proyecto de Vercel ya tiene otras páginas o archivos (por ejemplo `privacidad.html`, `terminos.html` o las fotos de las alumnas), copia estos tres archivos **dentro** del proyecto en vez de reemplazarlo todo.

**Opción B · Carpeta completa (por ejemplo, desde GitHub)**
Sube `index.html` y la carpeta `assets/`. Las rutas son relativas: si subes solo `index.html` sin `assets/`, la página se verá sin estilos. Copia además `og.jpg` y `apple-touch-icon.png` a la raíz del sitio (están en `dist/` y en `assets/img/`).

Si la copias al repositorio `Arjuna-Developer/Arjuna-Fit`, `styles.css` y `landing.js` reemplazan a los archivos del mismo nombre de la versión v10 (`assets/css/styles.css` y `assets/js/landing.js`). Ninguna página del repositorio los usa hoy, así que no se rompe nada.

---

## Cómo se vive la página (para que sepas qué hace cada cosa)

- **Un solo scroll, tres pasos.** Historia (paso 1), oferta con Arju y la app (paso 2) y valoración (paso 3).
- **Fondo de amanecer.** Al bajar, el fondo pasa de noche profunda (arriba) a amanecer dorado (abajo), con colores reales y sin ningún elemento «sol». Cuando el fondo se aclara, el texto cambia solo a tonos oscuros para que siga leyéndose.
- **El video «Conoce a Arju» cierra el paso 1** (bloque 1.4), justo después del cuestionario y antes de la oferta. Dice «Próximamente» y se ve quieto (sin botón de play que engañe) hasta que pegues el ID de YouTube.
- **Ya no existe «Reescribe tus excusas».** Se quitó la sección, su código y su estilo, y también el conteo de excusas en el resumen y en el mensaje de WhatsApp.
- **«Mi objetivo es:» (hero).** Es lo primero que se le pregunta a la persona. Elige Aumentar de peso, Bajar de peso, Crecer glúteos o Desinflamar abdomen y el hero, el ciclo, los beneficios, «Los 3 caminos», las tarjetas, una pregunta frecuente y el formulario se ajustan a ese objetivo. Todo el detalle está en «Mi objetivo (selector del hero)».
- **Ya no está la pantalla «Tu hora con Arju + la App ArjunaFit» (2.1).** Se quitó entera: la etiqueta «Para ti, que quieres…», el título, el texto y su botón. El paso 2 empieza ahora directo con «Entrenar directamente con Arju lo cambia todo» (2.2), que heredó la etapa «Con claridad» del header; desde ahí el botón fijo acompaña. La numeración de los bloques se conserva (no hay 2.1).
- **Cuestionario.** Como la etiqueta «Para ti, que…» ya no existe, la pista bajo las 4 situaciones dice ahora «Marca las que te suenen: así Arju sabe desde dónde empiezas.» (antes: «Lo que marques adapta el resto de la página.»). Lo marcado sigue viajando en el mensaje de WhatsApp.
- **Ya no hay claves escondidas ni «guía del éxito».** Se quitaron los 5 ✦, el contador del header, el aviso y la sección 2.7. Las preguntas frecuentes terminan ahora con el botón «Quiero empezar con Arju».
- **Etapa de tu camino (header).** Debajo de «Paso X de 3» cambia una frase al avanzar: Con dudas, Te reconoces, Conoces a Arju, Con claridad, Con confianza, Con decisión, Lista para empezar. Cada frase sale de `data-evo` en la sección que corresponde.
- **Ciclo que se rompe.** Un botón vuelve a encender los 30 días que se apagan al bajar.
- **Resumen antes del formulario (`#rc`).** Cierra el recorrido: «Llegaste con dudas. Ahora sabes cómo se rompe el ciclo.» Con un objetivo elegido, la frase lo nombra (clave `rc` de `SEG`).
- **Botón fijo «Quiero empezar con Arju».** Solo aparece ya dentro de la oferta (paso 2), cuando no hay otro botón dorado a la vista y el formulario aún no se ve. En el celular es una barra abajo, al alcance del pulgar (`#dock`); en pantallas anchas (desde 760 px) y en celulares acostados es el mismo botón, dentro del header (`#hcta`).
- **Formulario.** Pide solo lo necesario arriba (nombre y WhatsApp); objetivo, lugar y horario son opcionales y vienen con una opción ya elegida. Revisa los datos antes de enviar, explica cada error junto al campo y, al enviar, cambia el botón a «Abriendo WhatsApp…» y abre el chat con el mensaje escrito. El teléfono acepta «300 123 4567», «300-123-4567», «+57 300…» y, con «+» delante, números de otros países.
- **Cristal (glassmorphism).** Las tarjetas, el marco del video, la barra de avance de la app y las fotos usan el mismo cristal. Los valores están en 01 · TOKENS (`--gl-*`) y las reglas en 20 · CRISTAL. Con «reducir transparencia» activado en el dispositivo, se vuelven sólidas.

---

## Mi objetivo (selector del hero)

El hero empieza preguntando **«Mi objetivo es:»**, con cuatro botones. Al elegir uno, toda la página se ajusta a ese objetivo. Se mantienen el teléfono de la app, el video «Conoce a Arju», las tarjetas de las alumnas, las preguntas frecuentes y el resto. Se quitó la mecánica de las claves (✦).

| Botón | Frase de arriba | Título del hero |
|---|---|---|
| Aumentar de peso | Para aumentar de peso | Aumentar de peso con fuerza y forma, no solo comiendo más |
| Bajar de peso | Para bajar de peso | Bajar de peso sin empezar de cero cada lunes |
| Crecer glúteos | Para crecer tus glúteos | Crecer tus glúteos sin adivinar si lo haces bien |
| Desinflamar abdomen | Para desinflamar tu abdomen | Desinflamar tu abdomen sin tés, fajas ni dietas extremas |

Sin elegir nada (o con JavaScript apagado) se ve la página general de siempre: «Llega al próximo mes con el cuerpo que hoy te estás prometiendo».

- **Qué se ajusta.** Hero: frase de arriba, título y bajada. Ciclo (1.2): el texto de «Así termina casi siempre…». Beneficios (2.2): el 1 y el 3. «Los 3 caminos» (2.5): el tercero. Preguntas frecuentes (2.6): la pregunta 3 (en «Bajar de peso» queda la de siempre). Formulario: la bajada y el resumen `#rc`; además el objetivo llega elegido en el formulario y el mensaje de WhatsApp del cuestionario dice «Mi objetivo: …». En `index.html` cada elemento lleva `data-o="nombre"` y los textos están en `SEG`.
- **Tarjetas de alumnas (2.3).** En «Crecer glúteos» pasa primero la de Dayana G. y en «Desinflamar abdomen» la de Nancy R. (`order` en `SEG`). Para aumentar y bajar de peso todavía no hay testimonio propio: se ve el orden de siempre.
- **Antes y después de elegir.** Antes de elegir, lo primero a la vista es la pregunta con sus 4 botones; el botón «Quiero empezar con Arju» queda debajo (en varios celulares, unos 40 a 110 px más abajo). Al elegir, el hero muestra solo el botón elegido (con ✓) y «Cambiar», y el botón principal vuelve a quedar a la vista.
- **Se recuerda** mientras dure la visita (`sessionStorage`, clave `obj`): al recargar o volver arriba, la página sigue en su objetivo. «Cambiar» reabre los 4 botones.
- **Atajo `?m=` para anuncios.** `arjunafit.com/?m=subir`, `?m=bajar`, `?m=gluteos` y `?m=abdomen` abren la página ya en ese objetivo, sin preguntar. Manda `?m=` sobre lo recordado, y lo recordado sobre la pregunta. Una palabra que no esté en la lista se ignora y no borra lo recordado.
- **Sin parpadeo.** El `<head>` esconde el hero un instante (clase `mw` en `<html>`) hasta que el bloque 1.1b lo ajusta; si algo fallara, se muestra solo a los 1,5 s.
- **Si algo falla.** Sin JavaScript no se ve el selector (no serían más que botones muertos) y queda la página general. Si `landing.js` se cae o tarda, el selector sigue funcionando porque vive en el propio HTML (bloque 1.1b).
- **Eventos del `dataLayer`.** `objetivo_elegido` (tocó un botón), `hero_segmento` (llegó con `?m=`) y `segmento` en los eventos que vienen después. Nada de esto va al Pixel (ver «Analítica»).
- **Dónde se editan los textos.** `index.html`, bloque «1.1b Mi objetivo» (justo debajo del hero), dentro de `SEG`. Ese bloque está en JavaScript antiguo (ES5): no uses `const`, `let`, flechas ni comillas invertidas. Los textos `pn` y `rc` los pone `landing.js`, leyendo el mismo `SEG`.
- **Otro objetivo.** Un bloque nuevo en `SEG`, sus palabras en `ALIAS`, un botón `.ob` con `data-g` en el hero y una opción en el formulario cuyo `value` sea igual a su `goal`.
- **Palabras que acepta `?m=`** (con o sin tildes, mayúsculas o minúsculas): subir, aumentar, masa, musculo, subirdepeso, aumentardepeso → subir; bajar, perder, grasa, bajardepeso, perderpeso → bajar; gluteos, gluteo, glute, glutes → gluteos; abdomen, abdominal, abdominales, pancita, panza, barriga, vientre, desinflamar → abdomen.
- **Diagnóstico.** `arjunafit.com/?diag` (o `?m=gluteos&diag`): el panel dice qué objetivo leyó, de dónde (selector, enlace o memoria) y si el selector está activo.
- **Opciones del formulario.** Bajar de peso, Aumentar de peso, Crecer glúteos, Desinflamar abdomen y Salud y energía (antes: Perder grasa, Ganar músculo y Salud y energía).
- **Mensaje de WhatsApp del cuestionario.** Sale en una línea y sin punto doble (antes llevaba saltos de línea y sangría del HTML).

---

## Principios de diseño aplicados (Krug · Norman · Laws of UX)

| Principio | Qué se hizo |
|---|---|
| **Krug · no me hagas pensar / se escanea, no se lee** | Se recortó texto en el ciclo, la oferta y la app (≈ 10 % menos palabras visibles en total). Los 3 beneficios de Miembro Fundadora son una lista con ✓, no un párrafo. El video tiene su propio título corto («Conoce a Arju»). |
| **Krug · quitar ruido** | Se eliminó la sección de excusas, la mecánica de las claves (✦, contador, aviso y guía) y el brillo y parpadeo del marco del video. Un solo botón dorado lleno por pantalla: el botón fijo se esconde cuando hay otro a la vista. |
| **Norman · señales claras** | Los botones se ven como botones (altura mínima 56 px, se hunden al tocarlos). El video «Próximamente» no parece tocable. Las preguntas frecuentes tienen «+» que pasa a «×». Las opciones del formulario se ven todas, con ✓ en la elegida. |
| **Norman · respuesta inmediata** | Cada toque cambia algo al instante: el hero que se ajusta al elegir objetivo, chulo en el cuestionario, botón «Abriendo WhatsApp…», errores que desaparecen apenas el campo queda bien. |
| **Norman · prevenir y perdonar errores** | Las opciones del formulario ya vienen elegidas; el teléfono se entiende con espacios, guiones o «+57»; el mensaje de error dice qué hacer (no qué hizo mal); el botón se bloquea tras enviar (sin doble envío) y se reactiva si la persona vuelve de WhatsApp. |
| **Hick · menos opciones** | La oferta tiene una sola acción (empezar con Arju). En el formulario, lo obligatorio va primero y las opciones, ya elegidas, van separadas y después. |
| **Hick · una pregunta, cuatro respuestas** | El hero hace una sola pregunta («Mi objetivo es:») con las cuatro respuestas que ya dicen los anuncios. Al elegir, quedan solo el botón elegido y «Cambiar», para que el botón principal siga a la vista. |
| **Fitts · objetivos grandes y a mano** | Botones principales de ancho completo en el celular; zonas táctiles de 44 px o más; botón fijo abajo; con el objetivo elegido, el botón del hero se ve sin hacer scroll en los celulares probados (de 320 × 568 a 412 × 732, y 390 × 844); antes de elegir, lo primero a la vista son los 4 botones del objetivo. |
| **Posición serial** | El botón fijo acompaña desde que empieza el paso 2; además hay botón al final del bloque «La app» (2.4) y al final de las preguntas frecuentes. El formulario va con lo esencial primero y el botón al final. |
| **Von Restorff** | Solo lo que importa tiene el dorado lleno: el botón principal y la opción elegida. |
| **Doherty · respuesta en menos de 0,4 s** | Todas las respuestas visuales son inmediatas; la redirección a WhatsApp espera 1,4 s a propósito, para que se lea la confirmación. |

---

## Dónde cambiar lo que más vas a tocar

| Qué quieres cambiar | Archivo | Dónde |
|---|---|---|
| Número de WhatsApp | `landing.js` | 01 · CONFIGURACIÓN → `whatsapp` |
| Video de Arju (ID de YouTube) | `landing.js` | 01 · CONFIGURACIÓN → `youtubeId` (vacío = el marco dice «Próximamente») |
| Cada cuánto cambia la pantalla del teléfono | `landing.js` | 01 · CONFIGURACIÓN → `phoneIntervalMs` |
| Colores del amanecer | `landing.js` | 01 · CONFIGURACIÓN → `sunrise` (si los cambias, revisa `lightAt`: es el punto donde el texto pasa a oscuro) |
| Frases que cambian según el cuestionario | `landing.js` | `COPY` |
| Mensajes que llegan a tu WhatsApp | `landing.js` | `MESSAGES` |
| Mensajes de error del formulario | `landing.js` | 09 · FORMULARIO → `rules` |
| Texto del botón fijo | `index.html` | `<aside class="dock" id="dock">`, al final de `<main>` (el del header está en `<header class="top">`) |
| Textos de la página para cada objetivo (hero, ciclo, beneficios, tercer camino, pregunta 3, formulario, resumen) | `index.html` | 1.1b Mi objetivo → `SEG` |
| Qué tarjeta de alumna sale primero en cada objetivo | `index.html` | 1.1b Mi objetivo → `SEG` → `order` |
| Título y subtítulo del video | `index.html` | 1.4 Conoce a Arju |
| Los 3 beneficios de Miembro Fundadora | `index.html` | 2.4, la lista `class="perks"` |
| Frases de la etapa en el header | `index.html` | atributo `data-evo` de cada sección |
| Título, descripción y texto al compartir el enlace | `index.html` | `<head>` (`<title>`, `description`, `og:*`) |
| Imagen al compartir el enlace | `assets/img/og.jpg` | 1200 x 630 px; luego `python3 build.py` |
| Colores, tipografía y cristal | `styles.css` | 01 · TOKENS |
| Textos, títulos, preguntas | `index.html` | Cada bloque tiene un comentario con su número (1.1, 2.3, 3.1…) |

---

## Fotos de las alumnas (bloque 2.3)

Cada alumna tiene una foto y una sola frase corta (la primera frase de su testimonio original).
Las fotos se piden a `https://arjunafit.com/assets/img/recomendaciones/1.png` hasta `4.png`, las mismas de la página anterior.

- **Si una foto no carga**, la tarjeta muestra la inicial de la alumna sobre un fondo morado: nunca queda un hueco roto.
- **Para usar fotos de cambios (antes y después):** guarda las imágenes (vertical, 4:5, mejor en `.webp` o `.jpg` y de menos de 150 KB), súbelas junto a la página y cambia el `src` de cada `<img>`. Si usas `dist/index.html` de un solo archivo, usa la dirección completa de la imagen en tu sitio.
- Antes de publicar fotos de cambios, confirma que cada alumna dio su permiso.

---

## Después de editar

- Si subes **la carpeta**: no hay nada más que hacer.
- Si subes **archivos sueltos**: regenera `dist/` con

  ```
  python3 build.py
  ```

  (o pídeme que lo regenere). Genera los tres archivos: `index.html`, `og.jpg` y `apple-touch-icon.png`.

---

## Si en Android no se ven los efectos

1. Abre `arjunafit.com/?diag` en ese celular. A los 2 segundos aparece el panel «Diagnóstico ArjunaFit»; la primera línea dice si `landing.js` no corrió (navegador viejo o bloqueado), si algún módulo falló, si el celular pide menos movimiento y si las animaciones están en pausa.
2. Saca una captura del panel o toca «Copiar» y pega el texto.
3. Causas más comunes: **a)** Ajustes › Accesibilidad › «Quitar animaciones» (en Samsung: Accesibilidad › Mejoras de visibilidad; en algunos modelos también lo activa el ahorro de energía) = «movimiento reducido». Con eso, la página quita el movimiento grande pero **mantiene el teléfono de la app y las partículas suaves** (ver regla 3 y `motionWhenReduced`); **b)** navegador o WebView anterior a 2020 que no entiende JavaScript moderno (`landing.js` usa sintaxis de 2017, ES2017; se revisa con `npx acorn --ecma2017 --silent assets/js/landing.js`); **c)** red lenta: las fuentes de Google ya no bloquean la carga.
4. La inclinación de las tarjetas solo existe con mouse (`hover: hover`): en un celular nunca se ve, es normal.
5. Bajo el teléfono de la app hay un botón «Pausar animaciones» (para todos): detiene el teléfono que cambia solo, las partículas y los brillos y flechas que se repiten, y se recuerda mientras dure la visita. Registra los eventos `motion_pause` y `motion_resume` en el `dataLayer`.
6. `diag.js` solo se descarga con `?diag`: los visitantes normales no lo cargan.

---

## Reglas para no romper nada

1. **El orden del CSS importa.** Dos reglas con el mismo peso se resuelven por orden de aparición. Cambia valores, pero no muevas bloques de lugar sin probar. La sección 20 (cristal) va después de las secciones 09 a 19 a propósito.
2. **Los `id` y las clases del HTML los usa `landing.js`.** Si cambias uno (`#f`, `#fn`, `#fw`, `#fsub`, `#ok`, `#sm`, `#gd`, `#dock`, `#hcta`, `#evo`, `#rc`, `.chs`, `.sit`, `.rv`, `.rvd`, `.part`…; y, para el selector, `.ob`, `#oc`, `#ol`, `#h-hero`, `data-g` y `data-o`), cámbialo también en el JS.
3. **El bloque `@media (prefers-reduced-motion)` va al final del CSS.** Quita el movimiento grande (desplazamientos al aparecer, flotado del teléfono, tarjetas que se inclinan) para quien lo pide, pero deja los fundidos, el amanecer y los 30 días que se atenúan: la página sigue viva. Por decisión de diseño, el teléfono de la app (cambia de pantalla solo) y las partículas suaves **siguen** aunque el celular pida menos movimiento, porque en Android «Quitar animaciones» lo activa mucha gente solo para que el celular vaya más rápido y se quedaba sin ver la app en acción. Siempre hay un botón «Pausar animaciones» bajo el teléfono (secciones 26c del CSS y 13b del JS). Para respetar ese ajuste al 100 %, en `landing.js` (sección 01) pon `motionWhenReduced: []`. Sin JavaScript, la página se lee completa (en su versión general, sin el selector de objetivo) y el botón fijo no aparece.
4. **Cada módulo del JS corre aislado.** Si uno falla, los demás siguen funcionando y el error aparece como aviso en la consola.
5. **Los colores del texto están calculados contra el amanecer.** Si cambias `sunrise` o los colores de texto, vuelve a comprobar el contraste al bajar toda la página (ver el informe al final).

---

## Analítica

La página registra sus eventos en `window.dataLayer`. El `<head>` trae el Pixel de Meta, que **solo envía `PageView`**: ninguno de los eventos de abajo sale hacia Meta (no hay más llamadas a `fbq`).

- Pasos: `p1_view`, `p2_view`, `p3_view`
- Botones: `top_cta` (header), `p1_hero_cta`, `p1_quiz_cta`, `p1_quiz_wa`, `p2_cta`, `p2_end_cta`, `dock_cta`, `p3_duda`
- Participación: `objetivo_elegido` (tocó un botón de «Mi objetivo es:»), `hero_segmento` (llegó con `?m=`), `situacion_tap`, `ciclo_reencendido`, `video_play`
- Formulario: `form_start` (primer campo tocado), `form_error` (intento con datos por corregir), `form_submit`, `whatsapp_open`

Con `form_start`, `form_error` y `form_submit` puedes medir cuántas personas empiezan el formulario, cuántas se atascan y cuántas terminan.

Los eventos que vienen después de elegir objetivo llevan `segmento` (`subir`, `bajar`, `gluteos` o `abdomen`), así puedes ver qué objetivo convierte más. `p1_view` sale antes de que la persona elija, por eso no lo lleva.

---

## Antes de publicar, confirma

- **Testimonios por objetivo:** hoy solo hay tarjetas para glúteos (Dayana G.) y abdomen (Nancy R.). Para aumentar y bajar de peso no hay testimonio propio: esas visitas ven las tarjetas en el orden de siempre. Cuando tengas uno de cada uno, se agrega la tarjeta y su `order` en `SEG`. Los textos de los testimonios no se tocaron; revisa su ortografía (por ejemplo «adbomen»).
- **Anuncios:** no hace falta cambiar los que ya corren: sin `?m=` la página pregunta el objetivo. Si les agregas `?m=` (así se salta la pregunta), cambiar el enlace de un anuncio activo puede mandarlo otra vez a revisión de Meta; si prefieres, duplica el anuncio con el enlace nuevo.
- **Prueba en celular real:** abre arjunafit.com en tu celular (y, si puedes, desde un enlace dentro de Instagram): elige cada objetivo, mira que «Quiero empezar con Arju» siga a la vista y llena el formulario con tu número.
- **Fotos:** revisa en el sitio real que las 4 fotos carguen (desde mi entorno no pude abrir arjunafit.com) y que las alumnas aprueben que se muestren.
- **Video:** pega el ID de YouTube en `youtubeId`. Mientras esté vacío, el marco dice «Próximamente». Si prefieres otra posición para el video, se mueve en `index.html` (bloque 1.4).
- **«Cupos 1:1 limitados»:** hoy es una frase general. Si hay un número real de cupos, es mejor decirlo.
- **«Más del 80 % lista» (app):** confirma que la cifra sigue siendo cierta.
- **«Técnica en video» (pilar Rutinas Guiadas):** confirma que los videos de ejercicios ya existen.
- **Precio y garantía:** la página no los menciona a propósito (no hay cifras inventadas). Se hablan por WhatsApp.
- **Páginas legales:** la página enlaza `https://arjunafit.com/privacidad.html` y `https://arjunafit.com/terminos.html`. Confirma que existen en el sitio.
- **Imagen al compartir el enlace:** `og.jpg` y `apple-touch-icon.png` ya vienen en `dist/`. Súbelos junto a `index.html`; si no están en la raíz del sitio, al compartir por WhatsApp o Instagram no aparecerá imagen. Para ver la vista previa nueva, WhatsApp e Instagram pueden tardar en refrescar lo que ya tenían guardado.
- **Tipografías:** Fraunces e Inter Tight vienen de Google Fonts; revísalas en un celular real.
- **Prueba final (5 minutos):** abre la página en tu celular, deja marcada una situación en el cuestionario, llena el formulario con tu propio número y confirma que WhatsApp se abre con el mensaje escrito.

---

## Accesibilidad (lo que la página cumple)

- Contraste de texto de 4,5:1 o más a lo largo de todo el amanecer (con la excepción puntual que se explica en «Límites conocidos»).
- Foco visible con teclado en todo lo que se puede tocar, enlace «Saltar al contenido», orden de Tab lógico y zonas táctiles de 44 px o más.
- Texto agrandado hasta 200 % sin que el diseño se rompa ni aparezca scroll horizontal.
- Se adapta a «reducir movimiento», «reducir transparencia», contraste alto y colores forzados de Windows.
- Sin JavaScript todo el contenido se lee. Si `landing.js` falla o no se puede descargar, el `<head>` lo detecta al instante (si solo va lento, a los 4 segundos), muestra la página completa, esconde el formulario y deja un botón de WhatsApp. Si el script llega tarde, la página se «despierta» sola.
- Formulario con etiquetas, teclado numérico para el teléfono, autocompletado de nombre y teléfono, errores junto a cada campo (con aviso a lectores de pantalla) y el foco va al primer campo por corregir.
- Selector «Mi objetivo es:»: grupo con nombre, botones con `aria-pressed` y de 44 px o más, que se manejan con Tab, Enter y Espacio; al elegir, el foco pasa al título y un aviso `aria-live` anuncia el cambio. Sin JavaScript no se muestra (queda la página general).

---

## Qué se comprobó en la v6 (noviembre de 2026)

Todo sobre los archivos finales, con Chromium emulando celulares, tabletas y PC:

| Área | Cómo se comprobó | Resultado |
|---|---|---|
| Sintaxis | Los bloques en línea de `index.html` en JavaScript antiguo (ES5); `landing.js` y `diag.js` en ES2017 (acorn); ESLint sobre los dos `.js` | Sin errores ni avisos |
| Funcionamiento | 275 comprobaciones: lo que entiende `?m=`; elegir cada objetivo (textos, orden de las tarjetas, formulario y mensajes de WhatsApp); que se recuerde la elección; que no quede nada de las claves ni de la pantalla quitada (2.1), y que la etapa «Con claridad» del header y el botón fijo sigan bien; `landing.js` lento, caído o sin JavaScript; teclado; «menos movimiento»; panel `?diag` | 275 bien, 0 fallas |
| Diseño | 346 comprobaciones en 14 tamaños (de 320 × 568 a 1440 × 900, y celulares acostados), sin objetivo y con cada uno: sin desborde horizontal, botones de 44 px o más, los 4 botones a la vista sin hacer scroll, «Cambiar» en la misma línea y el botón principal a la vista con el objetivo elegido | 346 bien, 0 fallas |
| Meta | Búsqueda en el código: las únicas llamadas a `fbq` son `init` y `PageView` | Sin eventos nuevos hacia Meta |

**Lo que no se repitió en la v5 ni en la v6:** axe-core, el barrido de contraste, Lighthouse ni el recorrido completo con Tab de toda la página; tampoco hubo una revisión independiente de otra persona. **Y no se probó en un Android, un iPhone ni el navegador interno de Instagram reales**, solo en Chromium emulándolos.

---

## Informe de la auditoría final (octubre de 2026)

> Es anterior al selector de objetivo: habla de las claves, de la guía y de la pantalla 2.1, que la v5 y la v6 ya no tienen.

Qué se revisó, cómo y con qué resultado (todo sobre el archivo final `dist/index.html`):

| Área | Cómo se comprobó | Resultado |
|---|---|---|
| Código | html-validate, ESLint y Stylelint | 0 errores. Stylelint marca 3 avisos por `env(..., 0px)`: son falsos positivos (ese `0px` es obligatorio). |
| Accesibilidad automática | axe-core en 320 × 568, 390 × 844, 667 × 375 (celular acostado), 768 × 1024, 1280 × 720, 1440 × 900 y 1920 × 1080, con el cuestionario marcado, una clave y la FAQ abierta, el formulario con errores y la confirmación; además colores forzados y movimiento reducido | 0 violaciones |
| Comportamiento | 91 pruebas automáticas: formulario y validación del teléfono, apertura de WhatsApp con el mensaje correcto (y una sola vez con tres toques rápidos), cuestionario, claves, botón fijo, fotos que fallan, sin JS, movimiento reducido, SEO y estructura | 91 bien, 0 fallas |
| Teclado | Recorrido completo con Tab en celular y escritorio | Orden lógico, foco siempre visible, sin trampas |
| Contraste | Barrido de 88 posiciones de scroll en 5 tamaños (1.300 a 2.400 textos medidos en cada posición, sobre píxeles reales) | 0 fallas en 390 y 768 px; el resto, solo el punto del cambio oscuro → claro (ver abajo) |
| Texto grande | 100 %, 150 % y 200 % en 320, 390, 768 y 1440 px | Sin desbordes (salvo el caso de abajo) |
| Desbordes | Todos los anchos de 320 a 2560 px | Ninguno |
| Visual | 28 estados (cuestionario, claves, pantallas del teléfono, FAQ, formulario vacío / con errores / lleno / confirmación) en celular, tableta y PC | En orden |
| Marca y copy | Sin frases de culpa, vergüenza, urgencia falsa ni garantías no confirmadas; sin emojis en títulos; CTA único «Quiero empezar con Arju»; solo el WhatsApp del negocio; sin rastreadores | En orden |
| Modo de alto contraste de Windows | Revisión de cada indicador | Corregidos los puntitos de progreso del header, el anillo del cuestionario y la barra de avance; header, botón fijo y avisos van opacos en ese modo |

### Límites conocidos (dicho con franqueza)

1. **Solo pude probar con Chromium emulando celulares, tabletas y PC.** No pude probar en un iPhone/Safari ni en Firefox reales, ni en un Android real, ni con un lector de pantalla real (VoiceOver, TalkBack, NVDA). Tampoco pude comprobar el enlace real a WhatsApp desde un teléfono: se verifica que la página lo abra con el número y el mensaje correctos.
2. **Las fotos de las alumnas** no las pude cargar desde mi entorno; se probaron con imágenes de prueba y con el caso «no cargan» (queda la inicial).
3. **Lighthouse no se corrió.** Medí a mano los saltos de diseño y la carga en Chromium (sin saltos relevantes).
4. **Contraste en el cambio de fondo.** Cuando el fondo pasa de oscuro a claro (un tramo de scroll muy corto, a mitad de la página) ningún color de texto llega a 4,5:1 sobre ese tono intermedio: en 1 o 2 textos puede quedar entre 4,4 y 4,5:1 un instante (y hasta ≈ 3,5:1 mientras el color del texto cambia en 0,2 s). Se aceptó porque no se puede evitar sin cambiar la idea del amanecer.
5. **320 px con texto al 200 %:** un titular («Mientras tú entrenas… trabajando ✦») se sale un poco por la derecha. Es un caso extremo (pantalla muy angosta + texto al doble).
6. Los enlaces dentro de párrafos miden menos de 44 px de alto (es lo normal en texto corrido); los botones y enlaces sueltos sí cumplen.
