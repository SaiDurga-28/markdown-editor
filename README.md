# Markdown Editor (React + TypeScript)

A feature-rich client-side Markdown Editor built using React and TypeScript.  
The application supports live markdown preview, file management, toolbar formatting, theme switching, auto-save using Local Storage, and Docker deployment.

---

## Features

- React Router based navigation
- Zustand for global state management with persistence
- Markdown editor with real-time preview
- Bold and Italic toolbar actions
- File browser (welcome.md + new files)
- Word count display
- Light / Dark theme toggle (persistent)
- Debounced auto-save using Local Storage
- Fully Dockerized using Dockerfile and docker-compose

---

## Tech Stack

- React + TypeScript
- Zustand
- React Router
- React Markdown
- Vite
- Docker / Docker Compose

---

## Project Setup (Docker)

### Prerequisites

- Docker
- Docker Compose

---

### Run Application

From the project root:

```bash
docker-compose up --build
```

Open in browser:

```
http://localhost:4001
```

Editor:

```
http://localhost:4001/editor/welcome.md
```

---

## Run Without Docker (Development)

```bash
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## Environment Variables

See `.env.example`

Example:

```
PORT=4001
```

---

## Testing Helpers

For automated verification, the following functions are exposed:

```js
window.zustandStore.getState()
window.getLocalStorageState()
```

---

## Project Structure

```
src/
  pages/
    Home.tsx
    Editor.tsx
  store.ts
```

---

## Implemented Requirements

* Home route and editor route
* File browser with new file creation
* Markdown editor + preview
* Toolbar formatting
* Word count
* Theme persistence
* Debounced auto-save
* Zustand store exposed on window
* Docker + docker-compose support

---