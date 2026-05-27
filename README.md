# 🎬 MovieRadar

Aplicación web para explorar películas usando la API de TMDB. Permite buscar títulos, ver detalles completos, explorar tendencias y guardar películas favoritas con persistencia en Supabase.

---

## 🌐 Demo

![MovieRadar Demo](./public/Movie-App-demo.gif)

---

## 🚀 Live Demo

- **Frontend:** https://movie-radar-one.vercel.app

---

## ✨ Features

- 🔍 Búsqueda de películas en tiempo real  
- 🎥 Detalle completo de cada película (sinopsis, rating, géneros, etc.)  
- 🔥 Trending y populares al entrar a la app  
- 🏷️ Filtros por género  
- ❤️ Sistema de favoritos persistente (Supabase)  
- 📄 Paginación de resultados  
- ⚡ Data fetching optimizado con React Query  
- 🚦 Rutas protegidas y arquitectura modular  
- 📱 UI responsive con Tailwind CSS  

---

## 🧠 Arquitectura del proyecto

El proyecto está organizado por features, lo que permite escalabilidad y mantenimiento fácil.

src/
├── assets/              # Imágenes y recursos estáticos
├── components/          # Componentes reutilizables
│   ├── layout/          # Layout principal
│   └── ui/              # Componentes base (buttons, cards, etc.)
├── config/              # Configuraciones globales
├── constants/           # Constantes de la app
├── features/            # Módulos por dominio
│   ├── auth/            # Autenticación
│   ├── favorites/       # Favoritos (Supabase)
│   └── movies/          # Lógica de películas
├── hooks/               # Custom hooks
├── lib/                 # Integraciones (Supabase, API clients)
├── pages/               # Vistas principales
│   ├── AuthPage.tsx
│   ├── FavoritesPage.tsx
│   ├── GenrePage.tsx
│   ├── MovieDetailPage.tsx
│   ├── PopularPage.tsx
│   └── TrendingPage.tsx
├── router/              # Configuración de rutas
├── services/            # Llamadas a APIs (TMDB)
├── types/               # Tipos TypeScript
├── utils/               # Utilidades
├── App.tsx
└── main.tsx

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- React Router DOM
- Tailwind CSS
- Axios

### State & Data Fetching
- Zustand
- TanStack React Query
- Custom Hooks

### Backend & Services
- Supabase (Auth + favoritos)
- TMDB API (datos de películas)

---

## 🔐 Core Features

### ❤️ Favoritos con Supabase

- Guardar películas
- Eliminar favoritos
- Ver lista personalizada sincronizada en la nube

---

## ⚙️ Instalación

1. Clonar repositorio
  - git clone https://github.com/aldana212/MovieRadar.git
  - cd MovieRadar
2. Instalar dependencias
  - npm install
3. Variables de entorno
  - Crear archivo .env:
    - VITE_TMDB_API_KEY=
    - VITE_TMDB_BASE_URL=

    - VITE_SUPABASE_URL=
    - VITE_SUPABASE_ANON_KEY=

4. Ejecutar proyecto
 - npm run dev

 - Abrir: http://localhost:5173