# 🚀 VibeCode Editor

An AI-Powered Cloud IDE built with Next.js, Monaco Editor, WebContainers, and PostgreSQL.

VibeCode Editor provides a complete browser-based development environment where users can create projects, write code, execute applications, manage workspaces, and interact with an AI coding assistant — all from a single platform.

---

## ✨ Features

### 📝 Advanced Code Editor
- Monaco Editor integration
- Syntax highlighting
- Multi-file project support
- VS Code-like editing experience

### ⚡ Browser-Based Execution
- WebContainers integration
- Run applications directly in the browser
- Integrated terminal support
- No local setup required

### 🤖 AI Coding Assistant
- Code explanations
- Bug fixing assistance
- Code reviews
- Optimization suggestions
- Multiple AI interaction modes

### 📁 Project Management
- Create and manage projects
- Template-based project generation
- Dashboard interface
- Favorite projects support

### 🔐 Authentication
- Secure user authentication
- GitHub login support
- User-specific workspaces

### 🎨 Modern UI
- Responsive design
- Dark/Light mode support
- Clean developer-focused interface

---

## 🏗️ System Architecture

```text
User
 │
 ▼
Authentication
 │
 ▼
Dashboard
 │
 ▼
Project Creation
 │
 ▼
Monaco Editor
 │
 ▼
WebContainers
 │
 ▼
Code Execution

AI Assistant
 │
 ▼
Qwen / Gemini

Database
 │
 ▼
PostgreSQL + Prisma


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
