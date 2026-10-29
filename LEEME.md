# ArjunaFit · Landing de fin de año (código organizado)

Landing de ventas de arjunafit.com: asesoría 1:1 con Arju + App ArjunaFit (lanzamiento en enero de 2027; quien empieza hoy con Arju entra como Miembro Fundadora).
El diseño y la lógica están separados del contenido para que cada cosa se encuentre en un solo lugar.

**Versión:** auditoría final (octubre de 2026) + arreglo para Android (28 de octubre de 2026; ver «Si en Android no se ven los efectos»). El informe de esa auditoría está al final de este archivo.

**Qué se publica:** la carpeta tal cual (`index.html` + `assets/`), desde GitHub a Vercel. La carpeta `dist/` (un solo archivo) quedó obsoleta: arjunafit.com no la sirve.

---

## Qué hay en esta carpeta

```
index.html                       La página: solo textos y estructura
assets/css/styles.css            Todo el diseño, en 27 secciones numeradas (la 26b es el respaldo sin JavaScript)
assets/js/landing.js             Toda la lógica, en 20 secciones numeradas
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
- **5 claves escondidas (✦).** Son puntos que laten junto a algunos títulos. Al tocarlos (o con Enter en el teclado) aparece un aviso con una clave y el contador del header sube (0/5). Su texto está en la **guía del éxito** (`index.html`, bloque 2.7): ahí se editan, y el aviso las lee de ahí.
- **Guía del éxito (bloque 2.7).** Muestra las 5 claves. Las que no se encontraron salen difuminadas con el botón «Revelar», así nadie se queda sin verlas.
- **Etapa de tu camino (header).** Debajo de «Paso X de 3» cambia una frase al avanzar: Con dudas, Te reconoces, Conoces a Arju, Con claridad, Con confianza, Con decisión, Lista para empezar (o «Mente nueva ✦» si encontró las 5 claves). Cada frase sale de `data-evo` en la sección que corresponde.
- **Ciclo que se rompe.** Un botón vuelve a encender los 30 días que se apagan al bajar.
- **Resumen antes del formulario (`#rc`).** Cuenta cuántas claves encontró, y ese avance viaja en el mensaje de WhatsApp.
- **Botón fijo «Quiero empezar con Arju».** Solo aparece ya dentro de la oferta (paso 2), cuando no hay otro botón dorado a la vista y el formulario aún no se ve. En el celular es una barra abajo, al alcance del pulgar (`#dock`); en pantallas anchas (desde 760 px) y en celulares acostados es el mismo botón, dentro del header (`#hcta`).
- **Formulario.** Pide solo lo necesario arriba (nombre y WhatsApp); objetivo, lugar y horario son opcionales y vienen con una opción ya elegida. Revisa los datos antes de enviar, explica cada error junto al campo y, al enviar, cambia el botón a «Abriendo WhatsApp…» y abre el chat con el mensaje escrito. El teléfono acepta «300 123 4567», «300-123-4567», «+57 300…» y, con «+» delante, números de otros países.
- **Cristal (glassmorphism).** Las tarjetas, el marco del video, la barra de avance de la app, las fotos y las claves usan el mismo cristal. Los valores están en 01 · TOKENS (`--gl-*`) y las reglas en 20 · CRISTAL. Con «reducir transparencia» activado en el dispositivo, se vuelven sólidas.

---

## Principios de diseño aplicados (Krug · Norman · Laws of UX)

| Principio | Qué se hizo |
|---|---|
| **Krug · no me hagas pensar / se escanea, no se lee** | Se recortó texto en el ciclo, la oferta y la app (≈ 10 % menos palabras visibles en total). Los 3 beneficios de Miembro Fundadora son una lista con ✓, no un párrafo. El video tiene su propio título corto («Conoce a Arju»). |
| **Krug · quitar ruido** | Se eliminó la sección de excusas y el brillo y parpadeo del marco del video. Un solo botón dorado lleno por pantalla: el botón fijo se esconde cuando hay otro a la vista. |
| **Norman · señales claras** | Los botones se ven como botones (altura mínima 56 px, se hunden al tocarlos). El video «Próximamente» no parece tocable. Las preguntas frecuentes tienen «+» que pasa a «×». Las opciones del formulario se ven todas, con ✓ en la elegida. |
| **Norman · respuesta inmediata** | Cada toque cambia algo al instante: chulo en el cuestionario, contador del header, botón «Abriendo WhatsApp…», errores que desaparecen apenas el campo queda bien. |
| **Norman · prevenir y perdonar errores** | Las opciones del formulario ya vienen elegidas; el teléfono se entiende con espacios, guiones o «+57»; el mensaje de error dice qué hacer (no qué hizo mal); el botón se bloquea tras enviar (sin doble envío) y se reactiva si la persona vuelve de WhatsApp. |
| **Hick · menos opciones** | La oferta tiene una sola acción (empezar con Arju). En el formulario, lo obligatorio va primero y las opciones, ya elegidas, van separadas y después. |
| **Fitts · objetivos grandes y a mano** | Botones principales de ancho completo en el celular; zonas táctiles de 44 px o más; botón fijo abajo; el botón del hero se ve sin hacer scroll desde 320 × 568 hasta 430 × 932. |
| **Posición serial** | El botón aparece al inicio del paso 2 y al final de la guía, y entre ambos el botón fijo lo mantiene a mano. El formulario va con lo esencial primero y el botón al final. |
| **Von Restorff** | Solo lo que importa tiene el dorado lleno: el botón principal y la opción elegida. |
| **Doherty · respuesta en menos de 0,4 s** | Todas las respuestas visuales son inmediatas; la redirección a WhatsApp espera 1,4 s a propósito, para que se lea la confirmación. |

---

## Dónde cambiar lo que más vas a tocar

| Qué quieres cambiar | Archivo | Dónde |
|---|---|---|
| Número de WhatsApp | `landing.js` | 01 · CONFIGURACIÓN → `whatsapp` |
| Video de Arju (ID de YouTube) | `landing.js` | 01 · CONFIGURACIÓN → `youtubeId` (vacío = el marco dice «Próximamente») |
| Cuánto dura el aviso de clave | `landing.js` | 01 · CONFIGURACIÓN → `toastMs` |
| Cada cuánto cambia la pantalla del teléfono | `landing.js` | 01 · CONFIGURACIÓN → `phoneIntervalMs` |
| Colores del amanecer | `landing.js` | 01 · CONFIGURACIÓN → `sunrise` (si los cambias, revisa `lightAt`: es el punto donde el texto pasa a oscuro) |
| Frases que cambian según el cuestionario y las claves | `landing.js` | `COPY` |
| Mensajes que llegan a tu WhatsApp | `landing.js` | `MESSAGES` |
| Mensajes de error del formulario | `landing.js` | 09 · FORMULARIO → `rules` |
| Texto del botón fijo | `index.html` | `<aside class="dock" id="dock">`, al final de `<main>` (el del header está en `<header class="top">`) |
| Textos de las 5 claves | `index.html` | 2.7 Tu guía del éxito |
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
Las fotos se piden a `https://arjunafit.com/assets/img/recomendaciones/1.jpeg` hasta `4.jpeg`, las mismas de la página anterior.

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

1. Abre `arjunafit.com/?diag` en ese celular. A los 2 segundos aparece el panel «Diagnóstico ArjunaFit»; la primera línea dice si `landing.js` no corrió (navegador viejo o bloqueado), si algún módulo falló o si el celular pide menos movimiento.
2. Saca una captura del panel o toca «Copiar» y pega el texto.
3. Causas más comunes: **a)** Ajustes › Accesibilidad › «Quitar animaciones» (o el ahorro de energía) activa «movimiento reducido»; **b)** navegador o WebView anterior a 2020 que no entiende JavaScript moderno (`landing.js` usa sintaxis de 2015, ES2015; se revisa con `npx acorn --ecma2017 --silent assets/js/landing.js`); **c)** red lenta: las fuentes de Google ya no bloquean la carga.
4. La inclinación de las tarjetas solo existe con mouse (`hover: hover`): en un celular nunca se ve, es normal.
5. `diag.js` solo se descarga con `?diag`: los visitantes normales no lo cargan.

---

## Reglas para no romper nada

1. **El orden del CSS importa.** Dos reglas con el mismo peso se resuelven por orden de aparición. Cambia valores, pero no muevas bloques de lugar sin probar. La sección 20 (cristal) va después de las secciones 09 a 19 a propósito.
2. **Los `id` y las clases del HTML los usa `landing.js`.** Si cambias uno (`#f`, `#fn`, `#fw`, `#fsub`, `#ok`, `#sm`, `#gd`, `#dock`, `#hcta`, `#toast`, `#kn`, `#evo`, `.chs`, `.sit`, `.key`, `.rv`, `.rvd`, `.part`…), cámbialo también en el JS.
3. **El bloque `@media (prefers-reduced-motion)` va al final del CSS.** Quita el movimiento (partículas, teléfono que rota solo, desplazamientos al aparecer, tarjetas que se inclinan) para quien lo pide, pero deja los fundidos, el amanecer y los 30 días que se atenúan: la página sigue viva. En Android, «Quitar animaciones» activa esta preferencia. Sin JavaScript, la guía se lee completa y el botón fijo no aparece.
4. **Cada módulo del JS corre aislado.** Si uno falla, los demás siguen funcionando y el error aparece como aviso en la consola.
5. **Los colores del texto están calculados contra el amanecer.** Si cambias `sunrise` o los colores de texto, vuelve a comprobar el contraste al bajar toda la página (ver el informe al final).

---

## Analítica

La página solo registra eventos en `window.dataLayer`; todavía no hay pixel instalado.

- Pasos: `p1_view`, `p2_view`, `p3_view`
- Botones: `top_cta` (header), `p1_hero_cta`, `p1_quiz_cta`, `p1_quiz_wa`, `p2_hero_cta`, `p2_cta`, `p2_end_cta`, `dock_cta`, `p3_duda`
- Participación: `situacion_tap`, `clave_1` a `clave_5`, `claves_completas`, `ciclo_reencendido`, `video_play`
- Formulario: `form_start` (primer campo tocado), `form_error` (intento con datos por corregir), `form_submit`, `whatsapp_open`

Con `form_start`, `form_error` y `form_submit` puedes medir cuántas personas empiezan el formulario, cuántas se atascan y cuántas terminan.

---

## Antes de publicar, confirma

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

---

## Informe de la auditoría final

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
