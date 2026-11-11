/* ==========================================================================
   ARJUNAFIT · PANEL DE DIAGNÓSTICO
   Solo se carga si la dirección termina en ?diag (por ejemplo
   https://arjunafit.com/?diag). Muestra un panel con lo que pasa en ESE
   celular: si landing.js corrió, qué error dio, si el equipo pide menos
   movimiento y qué soporta el navegador. Para sacar una captura y mandarla.

   Está escrito en JavaScript antiguo (ES5) a propósito: tiene que funcionar
   justo en los navegadores donde landing.js no corre. No lo cargan los
   visitantes normales.
   ========================================================================== */
(function () {
  'use strict';

  var w = window;
  var d = document;
  var nav = navigator;
  var panel = null;

  // ---- pruebas pequeñas (nunca lanzan error)
  function ok(fn) { try { return !!fn(); } catch (e) { return false; } }
  function can(code) { try { new Function(code)(); return true; } catch (e) { return false; } }
  function media(q) { return ok(function () { return w.matchMedia(q).matches; }); }
  function css(a, b) { return ok(function () { return w.CSS.supports(a, b); }); }
  function sel(s) { return ok(function () { return w.CSS.supports('selector(' + s + ')'); }); }
  function yn(v) { return v ? 'sí' : 'NO'; }
  function yes(v) { return v ? 'SÍ' : 'no'; }

  function bgNow() {
    try { return w.getComputedStyle(d.documentElement).getPropertyValue('--bg').replace(/\s+/g, ''); } catch (e) { return '?'; }
  }

  // Cuenta píxeles pintados en el lienzo de las partículas (#pt): -1 no existe, -2 no se pudo leer
  function particlePixels() {
    try {
      var cv = d.getElementById('pt');
      if (!cv || !cv.getContext) return -1;
      var data = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
      var n = 0;
      for (var i = 3; i < data.length; i += 4) { if (data[i]) n++; }
      return n;
    } catch (e) { return -2; }
  }

  // ---- arma el texto del panel
  function report() {
    var started = !!w.__af;
    var errors = w.__afErr || [];
    var failed = w.__afFail || [];
    var reduced = media('(prefers-reduced-motion: reduce)');
    var modern2020 = can('return null ?? 1');
    var modern2019 = can('try {} catch {}');
    var hover = media('(hover: hover)');
    var conn = nav.connection || nav.mozConnection || nav.webkitConnection || null;
    var scrollMax = Math.max(1, d.documentElement.scrollHeight - w.innerHeight);
    var lines = [];

    // landing.js (versión con movimiento ajustable) publica aquí qué movimiento de fondo corre
    var motion = w.__afMotion || null;
    var pauseBtn = d.getElementById('pa');
    var parts = [];
    if (motion && motion.phone) parts.push('el teléfono de la app');
    if (motion && motion.particles) parts.push('las partículas');

    var verdict;
    if (!started) {
      verdict = 'RESULTADO: landing.js NO corrió en este celular. Sin él no hay efectos, ni cuestionario, ni formulario.';
      if (!modern2020 || !modern2019) verdict += ' Este navegador no entiende JavaScript moderno.';
    } else if (failed.length) {
      verdict = 'RESULTADO: landing.js corrió, pero fallaron estos módulos: ' + failed.join(' | ');
    } else if (!motion) {
      verdict = 'RESULTADO: landing.js corre, pero es una versión ANTERIOR (sin botón «Pausar animaciones»). Sube también la versión nueva de landing.js e index.html.';
    } else if (reduced) {
      verdict = 'RESULTADO: todo corre. Este celular pide MENOS MOVIMIENTO (Android: Ajustes > Accesibilidad > Quitar animaciones; en algunos modelos, el ahorro de energía): la página quita los desplazamientos, el flotado y las tarjetas que se inclinan, ' +
        (parts.length ? 'pero igual mueve ' + parts.join(' y ') + ' (más suave) y trae el botón «Pausar animaciones».' : 'y además apaga el teléfono y las partículas (motionWhenReduced está vacío en landing.js). Los fundidos y el amanecer sí deberían verse.');
    } else {
      verdict = 'RESULTADO: todo corre y el celular no pide menos movimiento: los efectos deberían verse. Baja por la página y toca «Actualizar»: --bg debe cambiar de color.';
    }
    if (started && motion && motion.paused) verdict += ' OJO: las animaciones están EN PAUSA (botón «Reanudar animaciones» bajo el teléfono de la app).';
    lines.push(verdict);
    lines.push('');

    lines.push('== landing.js');
    lines.push('Arrancó: ' + (started ? 'sí' + (w.__afAt ? ', a los ' + w.__afAt + ' ms' : '') : 'NO'));
    lines.push('Versión: ' + (motion ? 'nueva (movimiento ajustable + botón de pausa)' : (started ? 'ANTERIOR (sin botón de pausa)' : '?')));
    lines.push('Marca "js" en <html>: ' + (/(^|\s)js(\s|$)/.test(d.documentElement.className) ? 'sí' : 'NO'));
    lines.push('Módulos con error: ' + (failed.length ? failed.join(' | ') : 'ninguno'));
    lines.push('Errores capturados: ' + (errors.length ? errors.slice(0, 5).join(' | ') : 'ninguno'));
    lines.push('Objetivo: ' + (w.__afSeg ? w.__afSeg + ' (' + ((w.__afObj && w.__afObj.via) || '?') + ')' : 'ninguno (página general)') +
      ' · selector ' + (/(^|\s)os(\s|$)/.test(d.documentElement.className) ? 'activo' : 'NO activo'));
    lines.push('');

    lines.push('== Este celular');
    lines.push('Navegador: ' + nav.userAgent);
    lines.push('Pantalla: ' + (w.screen ? w.screen.width + 'x' + w.screen.height : '?') +
      ' · ventana ' + w.innerWidth + 'x' + w.innerHeight + ' · DPR ' + (w.devicePixelRatio || 1));
    lines.push('Memoria: ' + (nav.deviceMemory ? nav.deviceMemory + ' GB' : 'no la dice') +
      ' · Núcleos: ' + (nav.hardwareConcurrency || '?'));
    lines.push('Red: ' + (conn ? (conn.effectiveType || '?') + ' (bajada ' + (conn.downlink || '?') + ' Mb/s, ida y vuelta ' + (conn.rtt || '?') + ' ms)' : 'no la dice') +
      ' · Ahorro de datos: ' + (conn && conn.saveData ? 'SÍ' : 'no'));
    lines.push('');

    lines.push('== Preferencias del celular');
    lines.push('Movimiento reducido: ' + yes(reduced));
    lines.push('Transparencia reducida: ' + yes(media('(prefers-reduced-transparency: reduce)')));
    lines.push('Modo oscuro del sistema: ' + yes(media('(prefers-color-scheme: dark)')));
    lines.push('Puntero con hover (mouse): ' + yes(hover) + (hover ? '' : ' → la inclinación de tarjetas solo existe con mouse'));
    lines.push('');

    var phoneEl = d.getElementById('phone');
    var px = particlePixels();
    lines.push('== Movimiento de fondo (lo maneja landing.js)');
    if (motion) {
      lines.push('Teléfono de la app cambia solo: ' + yes(motion.phone) + (motion.phone && reduced ? ' (aunque el celular pide menos movimiento)' : ''));
      lines.push('Partículas: ' + yes(motion.particles) + (motion.particles && reduced ? ' (suaves, aunque el celular pide menos movimiento)' : ''));
      lines.push('En pausa (botón de la página): ' + yes(motion.paused));
    } else {
      lines.push('Sin datos: landing.js no corrió o es una versión anterior');
    }
    lines.push('Botón «Pausar animaciones»: ' + (pauseBtn ? (pauseBtn.hidden ? 'está pero oculto' : 'visible') : 'NO está en la página (index.html es de otra versión)'));
    lines.push('Partículas dibujadas ahora: ' + (px > 0 ? 'sí (' + px + ' píxeles pintados)' : (px === 0 ? 'NO (lienzo vacío)' : (px === -1 ? 'no hay lienzo #pt' : 'no se pudo leer'))));
    lines.push('Pantalla del teléfono ahora: ' + (phoneEl ? phoneEl.getAttribute('data-s') : '?') + ' (cambia sola cada ~4 s mientras el teléfono se ve en pantalla)');
    lines.push('');

    lines.push('== Lo que necesita la página');
    lines.push('JavaScript 2020 («??»): ' + yn(modern2020));
    lines.push('JavaScript 2019 («catch {»): ' + yn(modern2019));
    lines.push('IntersectionObserver: ' + yn(!!w.IntersectionObserver));
    lines.push('CSS @property: ' + yn(!!(w.CSS && w.CSS.registerProperty)));
    lines.push('CSS inset / aspect-ratio: ' + yn(css('inset', '0')) + ' / ' + yn(css('aspect-ratio', '1')));
    lines.push('CSS backdrop-filter: ' + yn(css('backdrop-filter', 'blur(1px)') || css('-webkit-backdrop-filter', 'blur(1px)')));
    lines.push('CSS :has(): ' + yn(sel(':has(a)')));
    lines.push('sessionStorage: ' + yn(ok(function () { w.sessionStorage.setItem('__d', '1'); w.sessionStorage.removeItem('__d'); return true; })));
    lines.push('Vibración: ' + yn(!!nav.vibrate));
    lines.push('');

    lines.push('== Amanecer (se pinta con landing.js)');
    lines.push('--bg ahora: ' + bgNow() + ' · cuerpo claro (lt): ' + yes(d.body && d.body.className.indexOf('lt') > -1));
    lines.push('Posición en la página: ' + Math.round((w.pageYOffset / scrollMax) * 100) + ' %');
    lines.push('Revelados (.in): ' + d.querySelectorAll('.rv.in, .rvd.in').length + ' de ' + d.querySelectorAll('.rv, .rvd').length);
    lines.push('Hora: ' + new Date().toISOString());
    return lines.join('\n');
  }

  // ---- panel
  function button(label, onclick) {
    var b = d.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.style.cssText = 'font:600 13px/1 system-ui,sans-serif;padding:10px 14px;margin:0 8px 8px 0;border:0;border-radius:8px;background:#ffc857;color:#241326;min-height:40px';
    b.onclick = onclick;
    return b;
  }

  function copy(text) {
    try {
      if (nav.clipboard && nav.clipboard.writeText) { nav.clipboard.writeText(text); return true; }
    } catch (e) { /* sigue con el respaldo */ }
    try {
      var area = d.createElement('textarea');
      area.value = text;
      area.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
      d.body.appendChild(area);
      area.select();
      var done = d.execCommand('copy');
      d.body.removeChild(area);
      return done;
    } catch (e) { return false; }
  }

  function show() {
    if (!d.body) return;
    if (panel && panel.parentNode) panel.parentNode.removeChild(panel);

    panel = d.createElement('div');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Diagnóstico de ArjunaFit');
    panel.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;max-height:72%;overflow:auto;z-index:2147483647;' +
      'background:#0b0b10;color:#f2f2f7;border:2px solid #ffc857;border-radius:14px;padding:12px;' +
      'box-shadow:0 8px 40px rgba(0,0,0,.6)';

    var title = d.createElement('div');
    title.textContent = 'Diagnóstico ArjunaFit';
    title.style.cssText = 'font:700 15px/1.2 system-ui,sans-serif;margin-bottom:10px;color:#ffc857';
    panel.appendChild(title);

    var text = report();
    var pre = d.createElement('pre');
    pre.textContent = text;
    pre.style.cssText = 'margin:0 0 12px;font:12px/1.5 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word;color:#f2f2f7';
    panel.appendChild(pre);

    var row = d.createElement('div');
    var note = d.createElement('span');
    note.style.cssText = 'font:12px system-ui,sans-serif;color:#9ca3af';
    row.appendChild(button('Actualizar', show));
    row.appendChild(button('Copiar', function () { note.textContent = copy(text) ? 'Copiado' : 'No se pudo copiar: saca una captura'; }));
    row.appendChild(button('Cerrar', function () { if (panel.parentNode) panel.parentNode.removeChild(panel); }));
    row.appendChild(note);
    panel.appendChild(row);

    d.body.appendChild(panel);
  }

  // Espera a que la página y landing.js hayan tenido tiempo de arrancar
  function start() { setTimeout(show, 900); }
  if (d.readyState === 'complete') start();
  else w.addEventListener('load', start);
})();
