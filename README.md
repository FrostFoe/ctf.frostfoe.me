# Hack The Box - Landing Page Clone

This project is a responsive clone of the Hack The Box landing page and its associated "Teams" pages (Red, Blue, and Purple), built with modern web technologies. It showcases a variety of UI components and sections designed to match the original site's aesthetic and functionality.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Fonts**: Google Fonts (Hind Siliguri)

## Project Structure

The project is organized into the following directories:

```
.
├── src
│   ├── app                     # Main application routes and layouts
│   │   ├── globals.css         # Global styles and Tailwind directives
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage entry point
│   │   ├── red-teams/          # Red Teams page route and components
│   │   ├── blue-teams/         # Blue Teams page route and components
│   │   └── purple-teams/       # Purple Teams page route and components
│   ├── components
│   │   ├── landing             # Specific sections of the landing page
│   │   ├── red-teams           # Components specific to the Red Teams page
│   │   ├── blue-teams          # Components specific to the Blue Teams page
│   │   ├── purple-teams        # Components specific to the Purple Teams page
│   │   ├── ui                  # Reusable UI components from shadcn/ui
│   │   ├── footer.tsx          # Site footer
│   │   └── nav.tsx             # Main navigation bar
│   ├── hooks                   # Custom React hooks
│   └── lib                     # Utility functions and data
└── ...
```

- **`src/app`**: Contains the core routing, global styles, and layouts for the application. It includes the homepage (`page.tsx`) and separate routes for `red-teams`, `blue-teams`, and `purple-teams`.
- **`src/components`**: Holds all React components.
  - **`landing`, `red-teams`, etc.**: These folders contain components specific to each page, promoting modularity and code organization.
  - **`ui`**: Contains the `shadcn/ui` components like `Button`, `Card`, and `DropdownMenu`.
- **`src/hooks`**: Includes custom hooks like `useToast` for notifications.
- **`src/lib`**: Provides utility functions (`utils.ts`) and a centralized module for managing placeholder image data (`placeholder-images.ts` and `placeholder-images.json`).

## Getting Started

To get the development server running, follow these steps:

1.  **Install Dependencies**:
    If you are using `pnpm`:

    ```bash
    pnpm install
    ```

    Or with `npm`:

    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    ```bash
    pnpm dev
    ```
    This will start the development server, typically on `http://localhost:9002`.

## Available Scripts

In the `package.json` file, you will find the following scripts:

- `pnpm dev`: Starts the Next.js application in development mode with Turbopack.
- `pnpm build`: Creates an optimized production build of the application.
- `pnpm start`: Starts the application in production mode.
- `pnpm lint`: Runs the Next.js linter to check for code quality issues.
- `pnpm typecheck`: Runs the TypeScript compiler to check for type errors.
