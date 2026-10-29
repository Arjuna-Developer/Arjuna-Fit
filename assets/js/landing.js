/* ==========================================================================
   ARJUNAFIT · LANDING DE FIN DE AÑO
   Lógica de la página (sin librerías)

   ÍNDICE
   01 · Configuración (WhatsApp, video, tiempos, colores del amanecer, textos)
   02 · Utilidades (DOM, almacenamiento, analítica, WhatsApp)
   03 · Enlaces con data-wa y data-ev
   04 · Aparición al hacer scroll (.rv y .rvd)
   05 · Puntos del ciclo (#dots)
   06 · Motor del amanecer (fondo, progreso y modo claro)
   07 · Cuestionario "¿Te suena familiar?"
   08 · Indicador "Paso X de 3"
   09 · Formulario -> WhatsApp (revisa los datos y responde al instante)
   10 · Video "Conoce a Arju" (marco "Próximamente" hasta que haya ID)
   11 · Teléfono animado y pilares
   12 · Inclinación de tarjetas
   13 · Partículas
   14 · Claves escondidas y guía del éxito
   15 · Etapa de tu camino (header) y resumen final
   16 · Ciclo: volver a encender los días
   17 · Alumnas: fotos (si una no carga, queda la inicial) y carrusel con teclado
   18 · Barra de acción del celular (#dock)
   19 · Títulos con clave (nombre accesible)
   20 · Arranque

   Cada sección es una función init...() independiente: si una falla (por
   ejemplo, quitaste un bloque del HTML), las demás siguen funcionando.

   COMPATIBILIDAD: está escrito en JavaScript de 2017 (ES2017) a propósito.
   Si agregas código, NO uses "??", "?.", "catch {" sin variable, "...objeto"
   ni "replaceAll": un solo símbolo de esos y el archivo ENTERO deja de correr
   en los Android con WebView o navegador viejo (Chrome anterior a 80, Samsung
   Internet antiguo, navegadores de apps): la página queda sin efectos y sin
   formulario. Para comprobarlo antes de subir:
       npx acorn --ecma2017 --silent assets/js/landing.js
   (sin mensajes = bien).
   ========================================================================== */
(function () {
  'use strict';

  window.__af = 1; // avisa al <head> que este script arrancó (ver la marca "js" del <head>)
  // ms desde que empezó a cargar la página: lo lee el panel ?diag
  window.__afAt = window.performance && performance.now ? Math.round(performance.now()) : 0;


  /* ========================================================================
     01 · CONFIGURACIÓN
     Lo que normalmente se edita está aquí arriba.
     ======================================================================== */
  const CONFIG = {
    // WhatsApp del negocio (código de país + número, sin "+")
    whatsapp: '573209497919',

    // ID del video de YouTube de Arju (por ejemplo "dQw4w9WgXcQ").
    // Vacío = el marco del video muestra "Próximamente".
    youtubeId: 'cV_EG0BBTrI',

    // Luminancia del fondo (0 a 1) desde la que el texto pasa a tonos oscuros.
    // El texto casi blanco (#f8f8f8) cumple 4,5:1 hasta ≈ .17 y el casi negro
    // (#0e0716) desde ≈ .19: el mejor punto para cambiar está en medio.
    lightAt: .18,

    // Cada cuántos milisegundos cambia la pantalla del teléfono
    phoneIntervalMs: 3800,

    // Puntos del ciclo: total y cuántos quedan siempre encendidos
    dots: { total: 30, fixed: 10 },

    // Situaciones del cuestionario
    quizTotal: 4,

    // Claves escondidas por la página y cuánto dura el aviso de clave (ms)
    keysTotal: 5,
    toastMs: 5000,

    // Amanecer: [posición del scroll de 0 a 1, [R, G, B]]
    // De noche profunda (arriba) a amanecer dorado (abajo).
    sunrise: [
      [0,    [4, 5, 11]],
      [.16,  [11, 16, 48]],
      [.34,  [42, 27, 82]],
      [.5,   [90, 42, 120]],
      [.6,   [138, 58, 134]],
      [.62,  [232, 96, 122]],
      [.645, [245, 140, 76]],
      [.84,  [251, 189, 80]],
      [1,    [254, 224, 138]]
    ]
  };

  // Textos que cambian según lo que marque la visitante.
  // Grupo A = está postergando · Grupo B = ya lo intentó y lo dejó.
  const COPY = {
    tag: { // etiqueta sobre el título de la sección de oferta (#pn)
      '':  'Para ti, que quieres empezar.',
      A:   'Para ti, que lo estás pensando.',
      B:   'Para ti, que quieres volver a empezar.',
      AB:  'Para ti, que quieres volver a empezar.'
    },
    quiz: { // mensaje bajo el cuestionario (#sm)
      none: 'Lo que marques adapta el resto de la página.',
      both: 'Llevas tiempo queriendo empezar y las mismas cosas te frenaron. Esta vez no empiezas sola.',
      a:    'Estás postergando, y postergar también cansa. Hoy puedes empezar con Arju, sin compromiso.',
      b:    'Ya lo intentaste y lo dejaste: no fue falta de voluntad, te faltó compañía y un sistema.'
    },
    guide: { // mensaje bajo la guía del éxito (#gdm)
      none: 'Busca los ✦ por la página o toca «Revelar».',
      some: (n, total) => n + ' de ' + total + ' reveladas. Te faltan ' + (total - n) + '.',
      all:  'Las 5 son tuyas. Tu mente ya cambió; ahora toca el cuerpo, de la mano de Arju.'
    },
    toastAll: { // aviso al encontrar la quinta clave
      title: 'Las 5 claves son tuyas',
      text:  'Tu guía del éxito está más abajo. Tu mente ya cambió: ahora toca el cuerpo.'
    },
    recap: { // resumen sobre el formulario (#rc)
      none: 'Llegaste con dudas. Ahora sabes cómo se rompe el ciclo.',
      some: (k, kt) => 'Encontraste ' + k + ' de ' + kt + ' claves. Tu mente ya va cambiando.',
      all:  'Encontraste las 5 claves. Esa mente ya está lista.'
    }
  };

  // Mensajes que se envían a WhatsApp
  const MESSAGES = {
    quiz: (items) =>
      `Hola Arju 👋 Marqué ${items.length} de ${CONFIG.quizTotal} situaciones en tu página: ${items.join(' | ')}. Quiero empezar contigo.`,
    form: (d) =>
      `Hola Arju 👋 Soy ${d.name}. Quiero empezar con la asesoría 1:1 y la App ArjunaFit.` +
      ` Objetivo: ${d.goal}. Lugar: ${d.place}. Horario: ${d.schedule}.` +
      ` Situaciones que me suenan (${d.items.length} de ${CONFIG.quizTotal}): ${d.items.join(' | ') || 'ninguna'}.` +
      (d.keys ? ` En tu página encontré ${d.keys} de ${CONFIG.keysTotal} claves.` : '') +
      ` Mi WhatsApp: ${d.phone}` // d.phone ya trae su prefijo (+57 300 123 4567)
  };


  /* ========================================================================
     02 · UTILIDADES
     ======================================================================== */
  const root = document.documentElement;
  const body = document.body;
  const LIGHT_AT = CONFIG.lightAt;

  // Estado compartido entre módulos: amanecer (06), partículas (13) y
  // claves (14, state.keys con 0 o 1 por clave)
  const state = { progress: 0, light: false, keys: [] };

  const qsa = (selector) => Array.from(document.querySelectorAll(selector));
  const byId = (id) => document.getElementById(id);
  const clamp = (x, min = 0, max = 1) => Math.min(max, Math.max(min, x));

  // Quien pide menos movimiento (en Android: Ajustes > Accesibilidad > «Quitar
  // animaciones», a veces activado sin saberlo; en iPhone: «Reducir movimiento»)
  // ve la página con MENOS movimiento, no sin vida: siguen los fundidos, el
  // cambio de color del amanecer y el apagado de los 30 días; se apagan las
  // partículas, el teléfono que rota solo, la inclinación de tarjetas y los
  // desplazamientos y giros.
  const reducedMotion = !!(window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches);

  // Enlace de WhatsApp con mensaje prellenado
  function whatsappUrl(message) {
    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
  }

  // sessionStorage con respaldo en memoria (modo privado o almacenamiento bloqueado)
  const memory = {};
  const remembered = (key) => (memory[key] === undefined ? null : memory[key]);
  const store = {
    get(key) {
      try {
        const value = sessionStorage.getItem(key);
        return value === null ? remembered(key) : value;
      } catch (e) {
        return remembered(key);
      }
    },
    set(key, value) {
      memory[key] = value;
      try { sessionStorage.setItem(key, value); } catch (e) { /* sin almacenamiento */ }
    }
  };

  // Vibración corta al tocar (solo Android). Algunos navegadores internos la
  // bloquean o fallan: nunca debe frenar lo que sigue.
  function buzz(ms) {
    try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* sin vibración */ }
  }

  // Analítica: solo empuja eventos al dataLayer (aún no hay pixel instalado)
  function track(name) {
    (window.dataLayer = window.dataLayer || []).push({ event: name });
  }

  // Módulos que no arrancaron (los lee el panel ?diag)
  const failed = [];
  window.__afFail = failed;

  // Ejecuta un módulo sin que un error tumbe a los demás
  function safe(name, fn) {
    try {
      return fn();
    } catch (error) {
      failed.push(name + ': ' + (error && error.message ? error.message : error));
      if (window.console) console.warn('[ArjunaFit] módulo "' + name + '" no arrancó:', error);
      return null;
    }
  }

  // Avisos entre módulos: notify() dice que algo cambió (hoy, las claves) y
  // cada módulo que lo necesita se suscribe con onChange(fn)
  const listeners = [];
  const onChange = (fn) => listeners.push(fn);
  const notify = () => listeners.forEach((fn) => safe('aviso', fn));

  // Funciones que corren en cada cuadro de scroll (las llama el amanecer, 06)
  const frameHooks = [];

  // Reinicia una animación CSS quitando y volviendo a poner la clase
  function replay(el, className) {
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
  }


  /* ========================================================================
     03 · ENLACES CON data-wa Y data-ev
     data-wa="mensaje"  -> el enlace abre WhatsApp con ese mensaje
     data-ev="nombre"   -> al hacer clic se registra ese evento
     ======================================================================== */
  function initLinks() {
    qsa('[data-wa]').forEach((a) => {
      a.href = whatsappUrl(a.dataset.wa);
      a.target = '_blank';
      a.rel = 'noopener';
    });
    qsa('[data-ev]').forEach((a) => {
      a.addEventListener('click', () => track(a.dataset.ev));
    });
  }


  /* ========================================================================
     04 · APARICIÓN AL HACER SCROLL
     Agrega .in a los elementos .rv y .rvd cuando se ven (20 % en pantalla).
     El movimiento lo define el CSS (sección 08).
     ======================================================================== */

  // Si el <head> ya había quitado la marca "js" (el script llegó tarde por una
  // red lenta), se vuelve a poner sin parpadeos: lo que ya se ve en pantalla
  // queda visible (.in, sin repetir la entrada) antes de reactivar los efectos
  // del resto de la página.
  function wakeEffects() {
    if (root.classList.contains('js')) return;
    qsa('.rv,.rvd').forEach((el) => {
      const box = el.getBoundingClientRect();
      if (box.bottom > 0 && box.top < innerHeight) {
        el.classList.add('in');
        if (el.classList.contains('rvd')) el.style.animation = 'none';
      }
    });
    root.classList.add('js');
  }

  function initReveal() {
    if (!('IntersectionObserver' in window)) { // navegadores muy viejos: todo se ve de una vez
      qsa('.rv,.rvd').forEach((el) => el.classList.add('in'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .2 });
    qsa('.rv,.rvd').forEach((el) => observer.observe(el));
  }


  /* ========================================================================
     05 · PUNTOS DEL CICLO
     Dibuja los 30 puntos de #dots. Los de la semana 1 (10) quedan
     encendidos; el resto se apaga al avanzar (lo hace el amanecer, 06).
     ======================================================================== */
  function initDots() {
    byId('dots').innerHTML = '<i></i>'.repeat(CONFIG.dots.total);
  }


  /* ========================================================================
     06 · MOTOR DEL AMANECER
     El progreso del scroll (0 a 1) elige un color de CONFIG.sunrise y pinta
     #gl. Cuando el fondo ya es claro (luminancia > .18) agrega .lt al body
     y el texto pasa a tonos oscuros. También mueve la barra #pg y apaga
     los puntos del ciclo según avanza la sección #s2.
     El mismo color se guarda en --bg (fondo de html y body): casi no se ve
     (#gl lo tapa), pero es el color que ven los revisores de contraste
     (axe, Lighthouse) y el que aparece al "rebotar" el scroll en el celular.
     Devuelve { update } para poder pintar una vez al arrancar.
     ======================================================================== */
  function initSunrise() {
    const glow = byId('gl');
    const bar = byId('pg');
    const cycle = byId('s2');
    const dots = qsa('.dots i');
    let scheduled = 0;

    // Color [R, G, B] interpolado entre dos paradas del amanecer
    const colorAt = (t) => {
      t = clamp(t);
      const stops = CONFIG.sunrise;
      let i = stops.findIndex((stop) => stop[0] >= t);
      if (i < 1) i = 1;
      const a = stops[i - 1];
      const b = stops[i];
      const k = (t - a[0]) / (b[0] - a[0]);
      return a[1].map((c, j) => Math.round(c + (b[1][j] - c) * k));
    };

    // Luminancia relativa (WCAG) de un color [R, G, B]
    const luminance = (rgb) => {
      const f = (v) => {
        v /= 255;
        return v <= .04045 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4);
      };
      return .2126 * f(rgb[0]) + .7152 * f(rgb[1]) + .0722 * f(rgb[2]);
    };

    // Apaga los puntos del ciclo (del 11 al 30) a medida que se avanza por #s2
    const fadeDots = (box) => {
      const k = clamp((innerHeight * .8 - box.top) / (box.height + innerHeight * .2));
      const { total, fixed } = CONFIG.dots;
      const lit = fixed + k * (total - fixed);
      dots.forEach((dot, i) => dot.classList.toggle('off', i >= fixed && i < lit));
    };

    const update = () => {
      scheduled = 0;

      // 1) Medir (lecturas de diseño) antes de escribir estilos: así el
      //    navegador no recalcula el diseño dos veces en cada cuadro.
      const max = root.scrollHeight - innerHeight;
      const p = max > 0 ? clamp(scrollY / max) : 0;
      const box = cycle.getBoundingClientRect();
      frameHooks.forEach((fn) => safe('cuadro', fn));

      // 2) Pintar

      // Cerca de p = .625 el color pasa de morado a naranja: la ventana del
      // degradado se estrecha ahí para que el texto conserve contraste.
      const spread = .004 + .026 * clamp((Math.abs(p - .625) - .03) / .05);
      const now = colorAt(p);
      state.light = luminance(now) > LIGHT_AT;

      glow.style.background =
        'radial-gradient(130% 55% at 50% 108%,rgba(255,196,96,' + (state.light ? .35 : .1) + '),transparent 65%),' +
        'linear-gradient(180deg,rgb(' + colorAt(p - spread).join(',') + '),rgb(' + colorAt(p + spread).join(',') + '))';
      root.style.setProperty('--bg', 'rgb(' + now.join(',') + ')');
      body.classList.toggle('lt', state.light);

      state.progress = p;
      bar.style.transform = 'scaleX(' + p.toFixed(3) + ')';

      if (box) fadeDots(box);
    };

    // Un solo cálculo por cuadro de animación mientras se hace scroll
    addEventListener('scroll', () => {
      if (!scheduled) scheduled = requestAnimationFrame(update);
    }, { passive: true });
    addEventListener('resize', update);

    return { update };
  }


  /* ========================================================================
     07 · CUESTIONARIO "¿TE SUENA FAMILIAR?"
     4 situaciones tocables (.sit, aria-pressed). Grupo A = postergando,
     grupo B = ya lo intentó. Guarda la selección en sessionStorage
     (claves n, sel, gr), adapta el mensaje y la etiqueta #pn, y arma el
     enlace para enviar las respuestas por WhatsApp.
     Devuelve { selected } para que el formulario (09) incluya lo marcado.
     ======================================================================== */
  function initQuiz() {
    const sits = qsa('.sit');
    const ring = byId('qa');
    const count = byId('qn');
    const msg = byId('sm');
    const cta = byId('qcta');
    const send = byId('qsend');
    const tag = byId('pn');
    let lastCount = -1;

    const isOn = (btn) => btn.getAttribute('aria-pressed') === 'true';
    const labelOf = (btn) => btn.textContent.replace(/\.$/, ''); // texto sin el punto final
    const selected = () => sits.filter(isOn).map(labelOf);

    // Onda que nace donde se toca (o en el centro si fue con teclado)
    const ripple = (btn, e) => {
      const box = btn.getBoundingClientRect();
      const dot = document.createElement('span');
      dot.className = 'rp';
      dot.style.left = (e.clientX ? e.clientX - box.left : box.width / 2) + 'px';
      dot.style.top = (e.clientY ? e.clientY - box.top : box.height / 2) + 'px';
      btn.appendChild(dot);
      dot.addEventListener('animationend', () => dot.remove());
    };

    // Anillo, número, mensaje, botón y enlace de WhatsApp para n marcadas
    const paint = (n) => {
      ring.style.strokeDasharray = (n * 100 / CONFIG.quizTotal) + ' 100';
      count.textContent = n;
      if (n !== lastCount) {
        replay(count, 'pop');
        replay(msg, 'chg');
      }
      msg.classList.toggle('on', n > 0);

      send.hidden = !n;
      send.href = whatsappUrl(MESSAGES.quiz(selected()));

      if (n > 0 && cta.hidden) {
        cta.hidden = false;
        cta.classList.add('show');
      } else if (n === 0) {
        cta.hidden = true;
        cta.classList.remove('show');
      }
      lastCount = n;
    };

    // Guarda la selección y actualiza textos y estado visual
    const render = () => {
      const on = sits.filter(isOn);
      const n = on.length;
      const a = on.filter((btn) => btn.dataset.g === 'A').length;
      const b = n - a;

      store.set('n', n);
      store.set('sel', sits.map((btn) => (isOn(btn) ? 1 : 0)).join(''));
      store.set('gr', n ? (a && b ? 'AB' : a ? 'A' : 'B') : '');
      tag.textContent = COPY.tag[store.get('gr') || ''];

      msg.textContent = !n
        ? COPY.quiz.none
        : 'Marcaste ' + n + ' de ' + CONFIG.quizTotal + '. ' +
          (a && b ? COPY.quiz.both : a ? COPY.quiz.a : COPY.quiz.b);

      paint(n);
    };

    sits.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        btn.parentElement.classList.add('touched'); // deja de latir la invitación
        btn.setAttribute('aria-pressed', !isOn(btn));
        if (!reducedMotion) ripple(btn, e);
        buzz(10);
        render();
        track('situacion_tap');
      });
    });

    // Si ya había marcado algo en esta sesión, se restaura
    const saved = store.get('sel');
    if (saved) sits.forEach((btn, i) => btn.setAttribute('aria-pressed', saved[i] === '1'));
    render();

    return { selected };
  }


  /* ========================================================================
     08 · INDICADOR "PASO X DE 3"
     Cada bloque .part (data-n = 1, 2, 3) es un paso. El que cruza el centro
     de la pantalla actualiza el texto #stp y los puntos .dts, y registra
     el evento p1_view, p2_view o p3_view una sola vez.
     ======================================================================== */
  function initStepIndicator() {
    const label = byId('stp');
    const steps = qsa('.dts i');
    const parts = qsa('.part');
    const seen = {};

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const n = Number(entry.target.dataset.n);
        label.textContent = 'Paso ' + n + ' de ' + parts.length;
        steps.forEach((dot, i) => dot.classList.toggle('on', i < n));
        if (!seen[n]) {
          seen[n] = true;
          track('p' + n + '_view');
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    parts.forEach((part) => observer.observe(part));
  }


  /* ========================================================================
     09 · FORMULARIO -> WHATSAPP
     Antes de enviar revisa el nombre y el WhatsApp. El número se acepta como
     lo escriba la persona ("300 123 4567", "300-123-4567", "+57 300...") y,
     si empieza con + o 00, también de otro país. Si algo falla: el mensaje
     sale junto al campo (con ícono, no solo color), el foco va ahí y el error
     se quita apenas se corrige. Si todo está bien: el botón pasa a "Abriendo
     WhatsApp..." y se bloquea (evita el doble envío), aparece "¡Excelente,
     nombre!" y, 1,4 s después, se abre WhatsApp con el mensaje armado
     (incluye lo marcado en el cuestionario). Usa location.href y no
     window.open para que el navegador del celular no lo bloquee. Si la
     persona vuelve desde WhatsApp y el navegador restaura la página (pageshow),
     el formulario se reactiva.
     Eventos: form_start, form_error, form_submit, whatsapp_open.
     ======================================================================== */
  function initForm(quiz) {
    const form = byId('f');
    const confirmation = byId('ok');
    const submit = byId('fsub');
    const idleLabel = submit.textContent; // para devolver el botón a su estado normal
    const fields = {
      name:  { input: byId('fn'), error: byId('en') },
      phone: { input: byId('fw'), error: byId('ew') }
    };
    let sending = false;
    let started = false;
    let timer = 0;

    const savedName = store.get('nm');
    if (savedName) fields.name.input.value = savedName;

    // "300 123 4567", "300-123-4567", "57 300 123 4567" y "+57 300 123 4567"
    // dan "+57 300 123 4567". Con + o 00 delante se acepta otro país
    // ("+34 612 345 678" da "+34612345678"). Si no se entiende devuelve ''.
    const readPhone = (raw) => {
      const text = raw.trim();
      const abroad = /^(\+|00)/.test(text);
      let digits = text.replace(/\D/g, '');
      if (text.startsWith('00')) digits = digits.slice(2);
      if (digits.length === 12 && digits.startsWith('57')) {
        digits = digits.slice(2);
      } else if (abroad) {
        return digits.length >= 8 && digits.length <= 15 ? '+' + digits : '';
      }
      return digits.length === 10 && digits[0] === '3'
        ? '+57 ' + digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6)
        : '';
    };

    // Cada regla devuelve el mensaje de error ('' si el campo está bien).
    // Dicen qué hacer, no qué hizo mal la persona.
    const rules = {
      name: (value) =>
        value.trim().length >= 2 ? '' : 'Escribe tu nombre para que Arju sepa cómo llamarte.',
      phone: (value) => {
        if (!value.trim()) return 'Escribe tu WhatsApp para que Arju te pueda escribir.';
        return readPhone(value)
          ? ''
          : 'Revisa tu número: son 10 dígitos y empieza por 3, por ejemplo 300 123 4567. ' +
            'Si vives fuera de Colombia, escríbelo con + y tu código de país.';
      }
    };

    const setError = (key, message) => {
      const field = fields[key];
      field.error.textContent = message;
      field.error.hidden = !message;
      if (message) field.input.setAttribute('aria-invalid', 'true');
      else field.input.removeAttribute('aria-invalid');
    };

    const check = (key) => {
      const message = rules[key](fields[key].input.value);
      setError(key, message);
      return !message;
    };

    // Un campo con error se vuelve a revisar mientras se escribe: el aviso
    // desaparece en cuanto queda bien. No se revisa al salir del campo: el
    // mensaje correría el botón justo cuando la persona va a tocarlo.
    Object.keys(fields).forEach((key) => {
      fields[key].input.addEventListener('input', () => {
        if (fields[key].input.getAttribute('aria-invalid') === 'true') check(key);
      });
    });

    form.addEventListener('focusin', () => {
      if (started) return;
      started = true;
      track('form_start');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (sending) return;

      const nameOk = check('name');
      const phoneOk = check('phone');
      if (!nameOk || !phoneOk) {
        track('form_error');
        const first = fields[nameOk ? 'phone' : 'name'].input;
        first.focus({ preventScroll: true });
        first.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
        return;
      }

      const data = new FormData(form);
      const person = fields.name.input.value.trim();

      sending = true;
      submit.disabled = true;
      submit.textContent = 'Abriendo WhatsApp…';
      store.set('nm', person);
      track('form_submit');

      const url = whatsappUrl(MESSAGES.form({
        name: person,
        goal: String(data.get('o')).toLowerCase(),
        place: String(data.get('l')).toLowerCase(),
        schedule: String(data.get('h')).toLowerCase(),
        items: quiz ? quiz.selected() : [],
        keys: state.keys.filter(Boolean).length,
        phone: readPhone(fields.phone.input.value)
      }));

      byId('nm').textContent = person;
      byId('wl').href = url; // enlace de respaldo si no se abre solo
      confirmation.hidden = false;
      confirmation.querySelector('h2').focus({ preventScroll: true }); // el botón se deshabilitó: el foco no puede quedarse ahí
      confirmation.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
      track('whatsapp_open');

      timer = setTimeout(() => { window.location.href = url; }, 1400);
    });

    // Si vuelve desde WhatsApp y el navegador restaura la página tal cual
    // (bfcache), el botón no puede quedarse en "Abriendo WhatsApp..."
    addEventListener('pageshow', (e) => {
      if (!e.persisted || !sending) return;
      clearTimeout(timer);
      sending = false;
      submit.disabled = false;
      submit.textContent = idleLabel;
      confirmation.hidden = true;
    });
  }


  /* ========================================================================
     10 · VIDEO "CONOCE A ARJU" (bloque 1.4, al final del paso 1)
     Sin ID en CONFIG.youtubeId el marco #vid queda en "Próximamente"
     (clase .soon, botón desactivado y sin señales de que se pueda tocar).
     Con ID, se quita .soon y el clic en el botón carga el video
     (youtube-nocookie) y lo reproduce.
     ======================================================================== */
  function initVideo() {
    const box = byId('vid');
    const button = byId('vbtn');
    const id = CONFIG.youtubeId;

    if (!id) {
      box.classList.add('soon');
      button.disabled = true;
      return;
    }

    box.classList.remove('soon');
    button.disabled = false;
    button.setAttribute('aria-label', 'Ver el video de Arju');
    button.addEventListener('click', () => {
      box.innerHTML =
        '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1"' +
        ' title="Video de Arju" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
      track('video_play');
    });
  }


  /* ========================================================================
     11 · TELÉFONO ANIMADO Y PILARES
     Cada 3,8 s el teléfono pasa a la siguiente pantalla (data-s = 0 a 3) y
     se marca el pilar que corresponde (.on). Solo corre mientras el
     teléfono se ve. Tocar un pilar salta a su pantalla y reinicia el
     reloj. Las animaciones de cada pantalla están en el CSS (sección 13).
     ======================================================================== */
  function initPhone() {
    const SCREENS = 4; // pantallas .s0 a .s3
    const phone = byId('phone');
    const pillars = qsa('.pil .card');
    let current = 0;
    let timer = 0;

    const show = (i) => {
      current = i;
      phone.dataset.s = i;
      pillars.forEach((card, j) => card.classList.toggle('on', j === i));
    };

    const run = () => {
      timer = setInterval(() => show((current + 1) % SCREENS), CONFIG.phoneIntervalMs);
    };

    const jump = (i) => {
      clearInterval(timer);
      show(i);
      if (!reducedMotion) run();
    };

    new IntersectionObserver((entries) => {
      clearInterval(timer);
      if (entries[0].isIntersecting && !reducedMotion) run();
    }, { threshold: .3 }).observe(phone);

    show(0);

    pillars.forEach((card, i) => {
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.addEventListener('click', () => jump(i));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          jump(i);
        }
      });
    });
  }


  /* ========================================================================
     12 · INCLINACIÓN DE TARJETAS
     Solo en pantallas con mouse (hover) y sin movimiento reducido: la
     tarjeta se inclina hacia el cursor (--rx, --ry) y un brillo la sigue
     (--mx, --my). El CSS (secciones 09 y 14) usa esas variables.
     ======================================================================== */
  function initTilt() {
    if (reducedMotion || !matchMedia('(hover:hover)').matches) return;

    qsa('.card,.story,.vs>div').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const box = card.getBoundingClientRect();
        const x = (e.clientX - box.left) / box.width;
        const y = (e.clientY - box.top) / box.height;
        card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        card.style.setProperty('--rx', ((.5 - y) * 8).toFixed(2) + 'deg');
        card.style.setProperty('--ry', ((x - .5) * 8).toFixed(2) + 'deg');
      });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }


  /* ========================================================================
     13 · PARTÍCULAS
     Motas suaves que suben por el fondo (canvas #pt). Pocas y lentas:
     lavanda de noche, doradas al amanecer, moradas en modo claro. Siguen
     el estado del amanecer (state.progress y state.light). Se apagan con
     movimiento reducido y se limitan a ~30 cuadros por segundo.
     ======================================================================== */
  function initParticles() {
    if (reducedMotion) return;

    const canvas = byId('pt');
    const ctx = canvas.getContext && canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const particles = [];
    let W;
    let H;
    let last = 0;

    // Una mota nueva: en cualquier punto (al arrancar) o naciendo abajo
    const make = (anywhere) => ({
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : H + 10,
      r: .6 + Math.random() * 1.2,   // radio
      a: .15 + Math.random() * .3,   // opacidad base
      v: .08 + Math.random() * .22,  // velocidad de subida
      d: (Math.random() - .5) * .12, // deriva lateral
      t: Math.random() * 6.28,       // fase
      s: .4 + Math.random() * 1.2    // velocidad del destello
    });

    // Ajusta el canvas a la pantalla y la cantidad de motas (menos en equipos lentos).
    // En el celular, la barra del navegador sube y baja al hacer scroll y cambia
    // innerHeight unos 60-100 px: eso no justifica rehacer el canvas.
    const resize = () => {
      if (W && Math.abs(innerWidth - W) < 2 && Math.abs(innerHeight - H) < 160) return;
      W = innerWidth;
      H = innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round(
        Math.min(70, Math.max(26, W * H / 20000)) * (navigator.hardwareConcurrency <= 4 ? .7 : 1)
      );
      while (particles.length < target) particles.push(make(true));
      particles.length = target;
    };

    const frame = (ts) => {
      requestAnimationFrame(frame);
      if (ts - last < 33) return;
      last = ts;
      ctx.clearRect(0, 0, W, H);

      const k = clamp(state.progress * 1.4);
      const color = state.light
        ? '107,29,82'
        : Math.round(220 + 35 * k) + ',' + Math.round(210 + 4 * k) + ',' + Math.round(255 - 115 * k);

      for (const p of particles) {
        p.y -= p.v * (1 + state.progress * .8);
        p.x += p.d + Math.sin(p.t + ts / 2500) * .08;
        p.t += .01;
        if (p.y < -8) {
          Object.assign(p, make(false));
          p.x = Math.random() * W;
        }
        const twinkle = .55 + .45 * Math.sin(ts / 900 * p.s + p.t);
        ctx.fillStyle = 'rgba(' + color + ',' + (p.a * twinkle * (state.light ? .5 : 1)).toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fill();
      }
    };

    resize();
    addEventListener('resize', resize);
    requestAnimationFrame(frame);
  }


  /* ========================================================================
     14 · CLAVES ESCONDIDAS Y GUÍA DEL ÉXITO
     Hay 5 ✦ (.key, data-k = 1 a 5) escondidos junto a los títulos. Al tocar
     uno se descubre la clave: pasa a estrella (.found), se abre el aviso
     #toast con su texto, sube el contador del header (#kn) y la clave queda
     lista en la guía (#gd) del final. En la guía, "Revelar" (.gr) descubre
     las que falten. Los textos salen de la guía (una sola fuente).
     Se guarda en sessionStorage (clave "keys", por ejemplo "10110").
     ======================================================================== */
  function initKeys() {
    const total = CONFIG.keysTotal;
    const stars = qsa('.key');
    const rows = qsa('.gk');
    const guide = byId('gd');
    const chip = byId('kc');
    const counter = byId('kn');
    const message = byId('gdm');
    const toast = byId('toast');
    const toastTitle = byId('tt');
    const toastText = byId('tx');
    let hideTimer = 0;
    let closeTimer = 0;

    // Lo que ya había descubierto en esta sesión
    const saved = store.get('keys') || '';
    state.keys = Array.from({ length: total }, (_, i) => (saved[i] === '1' ? 1 : 0));

    const count = () => state.keys.filter(Boolean).length;

    // Título y texto de la clave k, tomados de la guía
    const info = (k) => {
      const row = rows.find((r) => Number(r.dataset.k) === k);
      return row
        ? { title: row.querySelector('b').textContent, text: row.querySelector('p').textContent }
        : { title: 'Clave ' + k, text: '' };
    };

    // Pinta ✦, filas de la guía, contador y mensaje según state.keys
    const paint = () => {
      const n = count();
      stars.forEach((star) => {
        const k = Number(star.dataset.k);
        const on = !!state.keys[k - 1];
        star.classList.toggle('found', on);
        star.setAttribute('aria-label', on
          ? 'Clave ' + k + ' descubierta: ' + info(k).title
          : 'Clave escondida ' + k + ': tócala para descubrirla');
      });
      rows.forEach((row) => row.classList.toggle('found', !!state.keys[Number(row.dataset.k) - 1]));
      counter.textContent = n;
      chip.classList.toggle('full', n === total);
      chip.setAttribute('aria-label', 'Claves encontradas: ' + n + ' de ' + total);
      guide.classList.toggle('done', n === total);
      message.textContent = n === 0 ? COPY.guide.none : n === total ? COPY.guide.all : COPY.guide.some(n, total);
      message.classList.toggle('on', n > 0);
    };

    const hideToast = () => {
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
      toast.classList.remove('on');
      closeTimer = setTimeout(() => { toast.hidden = true; }, reducedMotion ? 0 : 450);
    };

    const showToast = (title, text) => {
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
      toastTitle.textContent = title;
      toastText.textContent = text;
      toast.hidden = false;
      void toast.offsetWidth; // para que la transición arranque
      toast.classList.add('on');
      hideTimer = setTimeout(hideToast, CONFIG.toastMs);
    };

    // Descubre la clave k. fromGuide = vino del botón "Revelar" (sin aviso, salvo la última)
    const reveal = (k, fromGuide) => {
      const isNew = !state.keys[k - 1];
      state.keys[k - 1] = 1;
      store.set('keys', state.keys.join(''));
      paint();

      if (isNew) {
        const star = stars.find((s) => Number(s.dataset.k) === k);
        if (star && !reducedMotion) replay(star, 'pop');
        if (!reducedMotion) replay(chip, 'pop');
        buzz(12);
        track('clave_' + k);
      }

      const n = count();
      if (n === total && isNew) {
        showToast(COPY.toastAll.title, COPY.toastAll.text);
        track('claves_completas');
      } else if (!fromGuide) {
        const data = info(k);
        showToast('Clave ' + k + ' · ' + data.title, data.text); // sin "de 5": el contador del header ya dice cuántas llevas
      }
      notify();
    };

    stars.forEach((star) => {
      star.addEventListener('click', () => reveal(Number(star.dataset.k), false));
    });

    rows.forEach((row) => {
      const button = row.querySelector('.gr');
      if (button) button.addEventListener('click', () => reveal(Number(row.dataset.k), true));
    });

    byId('tcl').addEventListener('click', hideToast);
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !toast.hidden) hideToast();
    });

    paint();
  }


  /* ========================================================================
     15 · ETAPA DE TU CAMINO (HEADER) Y RESUMEN FINAL
     Cada sección con data-evo="Palabra" marca una etapa: Con dudas, Te
     reconoces, Conoces a Arju, Con claridad, Con confianza, Con decisión,
     Lista para empezar. #evo muestra la de la última sección que ya pasó el
     55 % de la pantalla. Con data-evo-done, si ya encontró las 5 claves, la
     última etapa dice otra cosa ("Mente nueva"). #rc resume cuántas
     encontró, sobre el formulario.
     ======================================================================== */
  function initEvolution() {
    const label = byId('evo');
    const stages = qsa('[data-evo]');
    const recap = byId('rc');
    let current = '';

    const allDone = () => state.keys.length > 0 && state.keys.every(Boolean);

    const update = () => {
      if (!stages.length) return;
      const line = innerHeight * .55;
      let stage = stages[0];
      stages.forEach((el) => {
        if (el.getBoundingClientRect().top <= line) stage = el;
      });
      const word = stage.dataset.evoDone && allDone() ? stage.dataset.evoDone : stage.dataset.evo;
      if (word !== current) {
        current = word;
        label.textContent = word;
        if (!reducedMotion) replay(label, 'chg');
      }
    };

    const summary = () => {
      if (!recap) return;
      const k = state.keys.filter(Boolean).length;
      recap.textContent = k === CONFIG.keysTotal
        ? COPY.recap.all
        : k
          ? COPY.recap.some(k, CONFIG.keysTotal)
          : COPY.recap.none;
    };

    frameHooks.push(update);
    onChange(update);
    onChange(summary);
    summary();
    update();
  }


  /* ========================================================================
     16 · CICLO: VOLVER A ENCENDER LOS DÍAS
     El botón #rl enciende los 30 puntos de #dots en cascada (clase .relit;
     el retraso de cada punto es --k). Con movimiento reducido también
     funciona: los puntos solo cambian de opacidad, no de tamaño.
     ======================================================================== */
  function initRelight() {
    const button = byId('rl');
    const grid = byId('dots');
    if (!button || !grid) return;

    Array.from(grid.children).forEach((dot, i) => dot.style.setProperty('--k', i));

    button.addEventListener('click', () => {
      grid.classList.add('relit');
      button.disabled = true;
      button.textContent = button.dataset.after;
      buzz(12);
      track('ciclo_reencendido');
    });
  }


  /* ========================================================================
     17 · FOTOS DE LAS ALUMNAS (y carrusel con teclado)
     Cada .pho img se oculta si no carga: la tarjeta deja ver entonces la
     inicial sobre el degradado morado (ver .pho::before en el CSS), nunca
     un ícono de imagen rota. Se revisa de dos maneras porque el error puede
     haber ocurrido antes de que este script corriera:
       · la imagen ya falló  -> complete y sin ancho natural
       · aún está cargando   -> se escucha el evento error
     (El atributo onerror del HTML hace lo mismo; esto es el respaldo.)
     ======================================================================== */
  function initPhotos() {
    qsa('.pho img').forEach((img) => {
      const hide = () => {
        img.hidden = true;
        if (window.console) console.warn('[ArjunaFit] no cargó la foto:', img.getAttribute('src'));
      };
      if (img.complete && img.naturalWidth === 0) hide();
      else img.addEventListener('error', hide, { once: true });
    });
  }

  // En el celular las tarjetas de alumnas se deslizan de lado (.chs). Quien usa
  // teclado necesita poder enfocar esa franja para moverla con las flechas, pero
  // solo mientras de verdad se desliza: en pantallas anchas va en 4 columnas y
  // un foco ahí no serviría para nada.
  function initCarousel() {
    const strip = document.querySelector('.chs');
    if (!strip) return;
    const sync = () => {
      if (strip.scrollWidth > strip.clientWidth + 1) strip.setAttribute('tabindex', '0');
      else strip.removeAttribute('tabindex');
    };
    sync();
    if ('ResizeObserver' in window) new ResizeObserver(sync).observe(strip);
    else addEventListener('resize', sync);
  }


  /* ========================================================================
     18 · BARRA DE ACCIÓN DEL CELULAR (#dock)
     Botón fijo abajo que lleva al formulario: el siguiente paso siempre al
     alcance del pulgar (Fitts). Solo existe en pantallas angostas (lo decide
     el CSS, sección 24). Se abre cuando se cumplen las tres cosas:
       · la persona ya llegó a la oferta (paso 2)
       · no hay otro botón dorado a la vista (un solo botón lleno por pantalla)
       · el formulario todavía no está en pantalla
     Con esa misma condición se pone body.dk: sube el aviso de claves para que
     no se tape con la barra y, desde 760 px de ancho y en celular horizontal
     (donde no hay barra), muestra el botón "Quiero empezar con Arju" del
     header (#hcta).
     Si el navegador no tiene IntersectionObserver, no sale ninguno de los dos.
     ======================================================================== */
  function initDock() {
    const dock = byId('dock');
    const offer = byId('asesoria');
    const form = byId('valoracion');
    if (!dock || !offer || !form) return;

    const visible = new Set(); // botones de la página que se ven ahora
    let inOffer = false;
    let formShown = false;

    const paint = () => {
      const on = inOffer && !formShown && visible.size === 0;
      dock.classList.toggle('on', on);
      body.classList.toggle('dk', on);
    };

    // Botones dorados de la página (el de la barra está fuera de <main>)
    const buttons = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      paint();
    });
    qsa('main .btn').forEach((button) => buttons.observe(button));

    // Ya llegó a la oferta: el paso 2 ocupa la mitad alta de la pantalla
    new IntersectionObserver((entries) => {
      inOffer = entries[0].isIntersecting;
      paint();
    }, { rootMargin: '0px 0px -50% 0px' }).observe(offer);

    // El formulario ya se ve: ahí está su propio botón
    new IntersectionObserver((entries) => {
      formShown = entries[0].isIntersecting;
      paint();
    }).observe(form);
  }


  /* ========================================================================
     19 · TÍTULOS CON CLAVE
     Cinco títulos llevan un botón ✦ (.key) pegado a la última palabra. Sin
     esto, el lector de pantalla leería "El ciclo que se rompe, Clave
     escondida 1: tócala para descubrirla" como título. Aquí cada título
     recibe como nombre su propio texto, sin el botón, y se actualiza solo
     si cambias el título en el HTML.
     ======================================================================== */
  function initHeadings() {
    qsa('h2').forEach((heading) => {
      if (!heading.querySelector('.key')) return;
      const copy = heading.cloneNode(true);
      copy.querySelectorAll('.key').forEach((key) => key.remove());
      heading.setAttribute('aria-label', copy.textContent.replace(/\s+/g, ' ').trim());
    });
  }


  /* ========================================================================
     20 · ARRANQUE
     Cada módulo corre aislado con safe(): si uno falla, los demás siguen.
     El amanecer se pinta al final, cuando todo lo demás ya existe.
     ======================================================================== */
  function boot() {
    safe('efectos', wakeEffects);
    safe('enlaces', initLinks);
    safe('títulos', initHeadings);
    safe('aparición', initReveal);
    safe('fotos', initPhotos);
    safe('carrusel', initCarousel);
    safe('puntos', initDots);
    const quiz = safe('cuestionario', initQuiz);
    safe('pasos', initStepIndicator);
    const sunrise = safe('amanecer', initSunrise);
    safe('claves', initKeys);
    safe('ciclo', initRelight);
    safe('etapa', initEvolution);
    safe('formulario', () => initForm(quiz));
    safe('barra', initDock);
    safe('video', initVideo);
    safe('teléfono', initPhone);
    safe('tarjetas', initTilt);
    safe('partículas', initParticles);
    if (sunrise) sunrise.update();
  }

  boot();
})();
