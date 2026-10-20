#!/usr/bin/env python3
"""
ArjunaFit · Landing de fin de año
Genera dist/index.html: UN solo archivo con el CSS, el JS y el logo adentro.

Uso (desde esta carpeta):
    python3 build.py

Lee index.html + assets/css/styles.css + assets/js/landing.js +
assets/img/logo-arjunafit.webp y escribe dist/index.html.
También copia a dist/ las dos imágenes que van en la raíz del sitio:
og.jpg (vista previa al compartir el enlace) y apple-touch-icon.png (ícono en iPhone).
Para subir a Vercel: arrastra los tres archivos de dist/ juntos.
"""
import base64
import pathlib
import shutil

ROOT = pathlib.Path(__file__).resolve().parent

LINK_CSS = '<link rel="stylesheet" href="assets/css/styles.css">'
LINK_JS = '<script src="assets/js/landing.js" defer></script>'
LOGO_PATH = "assets/img/logo-arjunafit.webp"
# Imágenes que se publican tal cual en la raíz del sitio (el <head> las pide como /og.jpg y /apple-touch-icon.png)
ARCHIVOS_RAIZ = ["og.jpg", "apple-touch-icon.png"]


def leer(ruta):
    return (ROOT / ruta).read_text(encoding="utf-8")


def reemplazar(html, viejo, nuevo, minimo=1):
    veces = html.count(viejo)
    if veces < minimo:
        raise SystemExit(f"No encontré en index.html: {viejo}")
    return html.replace(viejo, nuevo)


def main():
    html = leer("index.html")
    css = leer("assets/css/styles.css")
    js = leer("assets/js/landing.js")
    logo = base64.b64encode((ROOT / LOGO_PATH).read_bytes()).decode("ascii")

    html = reemplazar(html, LOGO_PATH, "data:image/webp;base64," + logo)
    html = reemplazar(html, LINK_CSS, "<style>\n" + css + "</style>")
    # El script va inline en el mismo lugar (final del body), así que no necesita defer
    html = reemplazar(html, LINK_JS, "<script>\n" + js + "</script>")

    destino = ROOT / "dist"
    destino.mkdir(exist_ok=True)
    (destino / "index.html").write_text(html, encoding="utf-8")
    print(f"Listo: dist/index.html ({len(html.encode('utf-8')) / 1024:.1f} KB)")

    for nombre in ARCHIVOS_RAIZ:
        origen = ROOT / "assets" / "img" / nombre
        if not origen.exists():
            raise SystemExit(f"Falta assets/img/{nombre}")
        shutil.copyfile(origen, destino / nombre)
        print(f"Listo: dist/{nombre} ({origen.stat().st_size / 1024:.1f} KB)")


if __name__ == "__main__":
    main()
