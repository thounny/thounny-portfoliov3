# Portfolio V3 | Thounny

A **modern portfolio project** designed for developers and designers to showcase their work. This guide will help you set up and run the project on your local machine, as well as provide instructions for editing files.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (LTS version recommended)  
   [Download Node.js](https://nodejs.org/)
2. **Git**  
   [Download Git](https://git-scm.com/)

---

## 🚀 Getting Started

Follow these steps to set up the project:

1. **Clone the Repository**  
   Open your terminal and run:

   ```bash
   git clone https://github.com/thounny/thounny-portfoliov3
   ```

2. **Navigate to the Project Directory**  
   ```bash
   cd /thounny-portfoliov3
   ```

3. **Install Dependencies**  
   Run the following command to install all necessary packages:
   ```bash
   npm install
   ```

4. **Start the Development Server**  
   Start the server with:
   ```bash
   npm run dev
   ```
   The server will run at `http://localhost:5173/` by default.

---

## 🌐 Deploying the Project

Once you’re ready to deploy your project:

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy to platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 🛑 Troubleshooting

- **Issue: Dependencies not installing**  
  - Ensure Node.js and npm are installed. Run `node -v` and `npm -v` to verify.
  
- **Issue: Project doesn’t start**  
  - Double-check that all dependencies are installed:  
    ```bash
    npm install
    ```
  - Ensure the correct port isn’t blocked or in use. The default port is `5173`.

- **Issue: Styling or components don’t render correctly**  
  - Ensure your custom edits in JSX and CSS files don’t introduce errors.

---

## 💡 Tips

- Use **Visual Studio Code (VS Code)** for editing.  
  [Download VS Code](https://code.visualstudio.com/)
- Install **Prettier** or **ESLint** extensions in VS Code for clean, consistent code formatting.

---

&copy; 2025 thounny