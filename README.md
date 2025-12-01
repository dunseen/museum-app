# 🌿 Herbário Virtual Felisberto Camargo (Museum App)

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=flat-square&logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) [![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?style=flat-square&logo=pwa)](https://web.dev/progressive-web-apps/) [![CSP](https://img.shields.io/badge/CSP-Strict-success?style=flat-square&logo=security)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) [![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/) [![Monitoring](https://img.shields.io/badge/Grafana-Faro-F46800?style=flat-square&logo=grafana&logoColor=white)](https://grafana.com/oss/faro/)

---

## 📘 About

A modern web platform for the **Felisberto Camargo Herbarium** at the Federal Rural University of the Amazon (UFRA). This application serves as a digital catalog for plant species management, enabling researchers, students, and the public worldwide to explore and study the herbarium's collection.

Built as an undergraduate thesis (TCC) in Information Systems, the platform combines scientific rigor with modern web technologies to make botanical research more accessible and collaborative.

---

## ✨ Key Features

### 🔍 **Public Herbarium Interface**

- Browse and search plant species with advanced filtering
- View detailed taxonomic hierarchies and botanical characteristics
- Interactive maps showing collection locations (Leaflet integration)
- High-resolution specimen images with zoom capabilities
- QR code generation for specimen labels
- Responsive design optimized for mobile and desktop
- **Progressive Web App (PWA)**: Install on any device for offline-capable, app-like experience

### 🛠️ **Administrative Dashboard**

- **Species Management**: CRUD operations with image upload (MinIO integration)
- **Taxonomy System**: Hierarchical taxonomy management with parent-child relationships
- **Characteristics**: Define and assign botanical characteristics to species
- **User Management**: Role-based access control (Admin, Editor, Operator, User)
- **Change Request System**: Review and approve/reject modifications with diff visualization
- **Activity Logs**: Track all changes with detailed audit trails
- **Data Export**: Export species data to PDF with QR codes

### 🔐 **Security & Performance**

- **Content Security Policy (CSP)**: Strict CSP headers with configurable sources
- **NextAuth.js**: Secure authentication with JWT and refresh token rotation
- **CASL**: Fine-grained permission-based access control
- **Server Components**: Optimized performance with React Server Components
- **Token Management**: Automatic token refresh with request queuing
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, CSP, and more

### 📊 **Monitoring & Observability**

- **Grafana Faro**: Real-time frontend monitoring and error tracking
- **Performance Tracking**: Web Vitals and custom metrics
- **Error Boundaries**: Graceful error handling with detailed logging

### 📱 **Progressive Web App (PWA)**

- **Installable**: Add to home screen on mobile and desktop devices
- **Offline Support**: Service worker for basic offline functionality
- **App-like Experience**: Standalone display mode without browser UI
- **Fast Loading**: Optimized assets and caching strategies
- **Responsive Icons**: Adaptive icons for different platforms (192x192, 512x512)
- **Manifest Configuration**: Custom theme colors, orientation, and categories

---

## 🏗️ Architecture

### Tech Stack

**Frontend Framework**

- **Next.js 15** - App Router with Turbopack
- **React 19** - Server & Client Components
- **TypeScript 5.9** - Type safety

**State & Data Management**

- **TanStack Query v5** - Server state management with caching
- **React Hook Form** - Form management with Zod validation
- **Axios** - HTTP client with interceptors

**UI & Styling**

- **Tailwind CSS 3.4** - Utility-first CSS
- **shadcn/ui** - Radix UI components
- **Lucide React** - Icon library
- **next-themes** - Dark mode support

**Maps & Visualization**

- **React Leaflet** - Interactive maps
- **Recharts** - Data visualization
- **html2canvas + jsPDF** - PDF generation

**Authentication & Authorization**

- **NextAuth.js 4.24** - Authentication
- **CASL** - Permission management

**Monitoring**

- **Grafana Faro** - Frontend observability

### Architecture Patterns

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes (login, password reset)
│   ├── museu/herbario/      # Public herbarium interface
│   └── dashboard/           # Protected admin dashboard
│       ├── collection/      # Species, taxonomy, characteristics
│       ├── system/          # Change requests & activity logs
│       └── users/           # User management
├── components/              # Reusable UI components
│   └── ui/                 # shadcn/ui components
├── lib/                     # Utilities & configurations
│   ├── casl.ts             # Permission definitions
│   └── react-query.ts      # Query client setup
├── server/                  # Server utilities
│   ├── api.ts              # Axios instance with interceptors
│   └── auth.ts             # NextAuth configuration
└── types/                   # TypeScript type definitions
```

**Key Principles:**

- **Server-first**: Pages use React Server Components for optimal performance
- **Progressive Enhancement**: Client components only where needed
- **Type Safety**: End-to-end TypeScript with Zod schemas
- **Separation of Concerns**: API hooks, formatters, and sections in dedicated files

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **Yarn** 1.22.x
- **Docker** (optional, for containerized deployment)

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3333/api/v1

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Grafana Faro (optional)
NEXT_PUBLIC_FARO_URL=https://faro-collector-prod-sa-east-1.grafana.net/collect/...
```

### Local Development

```bash
# Install dependencies
yarn install

# Run development server with Turbopack
yarn dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Run linter
yarn lint

# Build optimized production bundle
yarn build

# Start production server
yarn start
```

---

## 🐳 Docker Deployment

### Build Image

```bash
docker build -t museum-app \
  --build-arg NEXTAUTH_SECRET=your-secret \
  --build-arg NEXTAUTH_URL=https://your-domain.com \
  --build-arg NEXT_PUBLIC_API_URL=https://api.your-domain.com/api/v1 \
  --build-arg NEXT_PUBLIC_APP_URL=https://your-domain.com .
```

### Run Container

```bash
docker run -p 3000:3000 \
  -e NEXTAUTH_SECRET=your-secret \
  -e NEXTAUTH_URL=https://your-domain.com \
  -e NEXT_PUBLIC_API_URL=https://api.your-domain.com/api/v1 \
  -e NEXT_PUBLIC_APP_URL=https://your-domain.com \
  museum-app
```

The Dockerfile uses Next.js **standalone** output for minimal image size and runs as a non-root user for enhanced security.

---

## 🔒 Security Features

### Content Security Policy (CSP)

The application implements a strict CSP with configurable sources in `next.config.js`:

```javascript
const CSP_SOURCES = {
  default: ["'self'"],
  script: [
    "'self'",
    "'unsafe-eval'",
    "'unsafe-inline'",
    'https://static.cloudflareinsights.com',
  ],
  style: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  img: [
    "'self'",
    'data:',
    'blob:',
    'https://herb-storage-api.dlima-consulting.com',
  ],
  // ... more directives
};
```

### Security Headers

- **Content-Security-Policy**: Prevents XSS and data injection
- **X-Frame-Options**: DENY (prevents clickjacking)
- **X-Content-Type-Options**: nosniff
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Permissions-Policy**: Restricts browser features

### Authentication

- JWT-based authentication with refresh tokens
- Automatic token rotation on expiry
- Request queue during token refresh to prevent race conditions
- Secure session storage with HttpOnly cookies

---

## 📦 Key Dependencies

| Package               | Version | Purpose                 |
| --------------------- | ------- | ----------------------- |
| next                  | 15.4.7  | React framework         |
| react                 | 19.2.0  | UI library              |
| @tanstack/react-query | 5.90.11 | Server state management |
| next-auth             | 4.24.13 | Authentication          |
| axios                 | 1.13.2  | HTTP client             |
| react-hook-form       | 7.67.0  | Form management         |
| zod                   | 3.25.76 | Schema validation       |
| @casl/ability         | 6.7.3   | Authorization           |
| tailwindcss           | 3.4.18  | CSS framework           |
| leaflet               | 1.9.4   | Maps                    |
| @grafana/faro-web-sdk | 1.19.0  | Monitoring              |

---

## 🎨 Recent Updates

### Version 1.0.0 (November 2025)

**New Features:**

- ✅ Change Request System with diff visualization
- ✅ Activity logs with detailed audit trails
- ✅ Advanced filtering (characteristics + taxonomy)
- ✅ QR code generation for specimens
- ✅ PDF export functionality
- ✅ Dark mode support
- ✅ Grafana Faro integration for monitoring
- ✅ Interactive maps with geolocation

**Improvements:**

- ✅ Refactored components for better maintainability (formatters, sections)
- ✅ Enhanced CSP configuration with structured sources
- ✅ Improved type safety across all modules
- ✅ Optimized formatters to prevent object stringification
- ✅ Better error handling and validation

**Performance:**

- ✅ Server Components for faster initial loads
- ✅ Turbopack for faster development builds
- ✅ Image optimization with Next.js Image
- ✅ React Query caching strategies

---

## 🤝 Contributing

This is an academic project developed as part of a TCC. Contributions are welcome for:

- Bug fixes
- Documentation improvements
- Feature enhancements
- Security improvements

Please open an issue first to discuss proposed changes.

---

## 👥 Contributors

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/dunseen">
          <img src="https://github.com/dunseen.png" width="100px;" alt="Davys Lima"/>
          <br />
          <sub><b>Davys Lima</b></sub>
        </a>
        <br />
        <a href="mailto:davysjunior08@hotmail.com">📧</a>
        <a href="https://github.com/dunseen">💻</a>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/denis-junior">
          <img src="https://github.com/denis-junior.png" width="100px;" alt="Denis Charles"/>
          <br />
          <sub><b>Denis Charles</b></sub>
        </a>
        <br />
        <a href="mailto:denis_jr2001@hotmail.com">📧</a>
        <a href="https://github.com/denis-junior">💻</a>
      </td>
    </tr>
  </tbody>
</table>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Related Projects

- **[museum-api](../museum-api)** - NestJS backend API

---

## 📞 Contact

For questions, suggestions, or collaboration opportunities:

- Open an issue on GitHub
- Contact the maintainers via email

---

<div align="center">

**Made with ❤️ for UFRA's Felisberto Camargo Herbarium**

</div>
