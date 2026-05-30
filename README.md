# 🏎️ Cinematic Automotive Showcase

A visually striking, highly interactive React and Vite web application designed to present high-end vehicles in a premium, cinematic environment. This project utilizes modern frontend technologies to deliver a sophisticated user experience reminiscent of flagship automotive brand landing pages.

## ✨ Key Features

*   **Immersive Cinematic UI:** Full-bleed background imagery with a smooth, automatic crossfade slideshow that cycles through featured vehicles.
*   **Adaptive Theme Overlays:** The application dynamically alters its ambient gradient overlays based on the selected vehicle (e.g., gold/amber tints for SUVs, deep teal for wagons) to match the car's aura.
*   **Laboratory Configurator:** An interactive specification panel that allows users to experiment with custom exterior paint colors, applying them dynamically to the UI in real-time.
*   **Fluid Transitions:** Custom routing logic allows "Pages" (Details, Gallery, Company) to seamlessly slide and fade over the primary showcase without rigid page reloads.
*   **Engineering Perfection Aesthetics:** High-contrast vignette masking, custom typography layouts ("Concorde Design"), and vertical status pillars make the application feel like a high-tech engineering terminal.

## 🛠️ Tech Stack

*   **Core:** React 19 + TypeScript
*   **Build Tool:** Vite for lightning-fast HMR and optimized builds
*   **Styling:** Tailwind CSS v4 for rapid, highly-customized utility styling
*   **Animations:** Framer Motion (`motion`) for fluid component entering, exiting, and complex layout transitions
*   **Iconography:** Lucide React for crisp, lightweight SVG icons

## 📂 Project Structure

```
src/
├── assets/         # High-resolution vehicle imagery
├── components/     # Specialized UI components
│   ├── Navbar.tsx         # Persistent, high z-index navigation
│   ├── DetailStation.tsx  # Interactive "Laboratory" for paint/specs
│   ├── GalleryPage.tsx    # Dedicated multi-image viewer and carousel
│   ├── DetailsPage.tsx    # Extended stats and model information
│   └── AudioRevStation.tsx # Experimental auditory feedback UI
├── App.tsx         # The core stage manager (Slideshow, Routing, Overlays)
├── data.ts         # Mock database defining vehicle attributes and paths
└── types.ts        # TypeScript schemas defining the `Vehicle` shape
```

## 🚀 Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    *The app will be available at `http://localhost:3000` (or the port specified by Vite).*

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## 🎨 Content & Data Management

To add or modify the available vehicles, edit `src/data.ts`. The schema heavily relies on the interfaces defined in `src/types.ts`. Each vehicle requires high-resolution imagery for the best visual impact to match the full-screen cinematic styling.
