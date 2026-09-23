# Trámites Notariales · Conper Honorario de Tampa

Presentación interactiva del Manual Operativo de trámites de DNI, para que el **Consulado General del Perú en Miami** la exponga a la **Oficina Regional de Tampa**.

Incluye: códigos de trámite (con buscador), tipos de trámite y requisitos (acordeón filtrable), los flujos operativos de envío y recepción paso a paso, y los recordatorios clave. Navegación tipo diapositivas con teclado, botones, puntos y gestos táctiles; modo claro/oscuro.

## Stack

| Capa      | Tecnologías                                                        |
| --------- | ----------------------------------------------------------------- |
| Frontend  | React 18, Vite, TypeScript, HTML5, Tailwind CSS, **Zustand** (store + stats) |
| Backend   | Node.js, TypeScript, Express (API que sirve el contenido del manual) |

El frontend consume la API (`GET /api/manual`). Si el backend no está disponible, usa una **copia local** de los datos como respaldo, de modo que la presentación siempre funciona.

## Estructura

```
manual-dni-tampa/
├── package.json            # workspaces + scripts (dev/build/start)
├── backend/
│   ├── src/
│   │   ├── index.ts        # servidor Express (/api/manual, /api/health, ...)
│   │   ├── types.ts        # tipos de dominio
│   │   └── data/manual.ts  # CONTENIDO DEL MANUAL (fuente de verdad)
│   └── tsconfig.json
└── frontend/
    ├── index.html
    ├── vite.config.ts      # proxy /api → :4000 en desarrollo
    ├── tailwind.config.js  # tokens de color y tipografías
    └── src/
        ├── App.tsx                 # orquesta diapositivas, teclado, swipe, tema
        ├── api.ts                  # fetch del manual (con respaldo local)
        ├── store/useManualStore.ts # Zustand: navegación, filtros, tema, stats
        ├── slides.ts               # etiquetas e índice
        ├── data/manual.ts          # respaldo local (igual al backend)
        └── components/             # TopBar, Controls, Rich, icons, slides/*
```

## Requisitos

- **Node.js 18.18+** (recomendado 20+)
- npm 9+

## Puesta en marcha

```bash
# 1. Instalar dependencias de todo el monorepo (una sola vez)
npm install

# 2. Levantar backend (:4000) y frontend (:5173) a la vez
npm run dev
```

Abre **http://localhost:5173**.

> ¿Solo quieres ver la presentación sin backend? `npm run dev --workspace frontend`
> Funciona igual: usa los datos locales de respaldo.

## Scripts

| Comando                 | Qué hace                                              |
| ----------------------- | ---------------------------------------------------- |
| `npm run dev`           | Backend + frontend en modo desarrollo                |
| `npm run dev:web`       | Solo frontend                                        |
| `npm run dev:api`       | Solo backend                                         |
| `npm run build`         | Compila el frontend a `frontend/dist`                |
| `npm start`             | Sirve la API; si existe `frontend/dist`, también la web |
| `npm run typecheck`     | Verificación de tipos en backend y frontend          |

## Publicar gratis en GitHub Pages (recomendado)

La web se publica sola. GitHub Pages sirve archivos estáticos, así que se despliega
**solo el frontend**; funciona por sí mismo gracias a los datos locales de respaldo
(no necesita que el backend esté encendido).

El repo ya trae el flujo automático en `.github/workflows/deploy.yml`. Pasos:

1. Sube el proyecto a un repositorio de GitHub (rama `main`).
2. En el repo: **Settings → Pages → Source: "GitHub Actions"**.
3. Cada vez que hagas *push* a `main`, se compila y publica automáticamente.
   (También puedes lanzarlo a mano en la pestaña **Actions → Deploy a GitHub Pages → Run workflow**.)
4. Tu web queda en `https://<tu-usuario>.github.io/<nombre-del-repo>/`.

> No hace falta configurar la ruta base: Vite usa rutas relativas (`base: './'`),
> así que funciona bajo cualquier nombre de repositorio.

## Despliegue con backend (una sola URL, opcional)

Si algún día quieres servir la API y la web juntas desde un servidor Node
(Render, Railway, un VPS, etc.):

```bash
npm run build          # genera frontend/dist
npm start              # Express sirve la API y el frontend juntos en :4000
```

## Editar el contenido del manual

Todo el contenido vive en **`backend/src/data/manual.ts`** (códigos, trámites, requisitos, pasos y recordatorios). Para que la copia de respaldo del frontend no se desincronice, replica el cambio en `frontend/src/data/manual.ts` (son archivos idénticos).

El texto admite dos marcadores ligeros:

- `**negrita**`
- `` `código` `` (se muestra resaltado)

## Notas

- La presentación es 100% estática en cuanto a datos; no requiere base de datos.
- El backend existe para centralizar el contenido y facilitar futuras integraciones (por eso expone también `/api/tarifas`, `/api/tramites` y `/api/recordatorios`).

---

Consulado General del Perú en Miami — Oficina Regional de Tampa · Actualizado 21/09/2026
