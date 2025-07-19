# 🌿 Herbário Virtual Felisberto Camargo (Museum App)

This project is a web platform for the management, sharing, and cataloging of plant species, based on scientific and taxonomic data. It is part of the undergraduate thesis (TCC) in Information Systems at UFRA and aims to make the herbarium's collection accessible to researchers, students, and the general public worldwide.

The application allows users to browse, search, and view detailed information about plant specimens, including taxonomic hierarchy, botanical characteristics, and images. Administrators can manage the collection, control user access, and ensure the integrity and authenticity of the data.

## 📘 Description

The Felisberto Camargo Herbarium at the Federal Rural University of the Amazon (UFRA) is a scientific collection of preserved plants, serving as a reference for botanical, ecological, and conservation studies. This platform increases the visibility and accessibility of the herbarium's collection, enabling global access to its data and supporting research and education.

## 🌱 Features

- Registration and consultation of species with taxonomic hierarchy
- Management of botanical characteristics per species
- Authentication and access control with role-based permissions
- Combined filtering by characteristic and taxonomy
- Responsive and modern user interface

## 🖥️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Authentication:** NextAuth.js
- **API:** Integrates with a NestJS + TypeORM backend
- **Deployment:** VPS (Oracle Cloud), GitHub Actions, Cloudflare, Nginx

## 🚀 Deployment

The application can be deployed using Docker. See below for instructions.

## Docker

Use the provided `Dockerfile` to containerize the application. The image uses Next.js' **standalone** output for a smaller runtime. Build-time variables for the client are passed via `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_APP_URL` and can be supplied through GitHub Actions secrets. Server-side variables like `NEXTAUTH_SECRET` and `NEXTAUTH_URL` should also be set as secrets for deployment.

### Build locally

```bash
docker build -t museum-app \
  --build-arg NEXTAUTH_SECRET=changeme \
  --build-arg NEXTAUTH_URL=http://localhost:3000 \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:3333/api/v1 \
  --build-arg NEXT_PUBLIC_APP_URL=http://localhost:3000 .
```

### Run locally

```bash
docker run -p 3000:3000 \
  -e NEXTAUTH_SECRET=changeme \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:3333/api/v1 \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  museum-app
```

The workflow in `.github/workflows/docker.yml` runs `yarn lint` and `yarn build` on pull requests targeting `master` to catch issues before merge. When changes land on `master`, it builds and pushes a Docker image to **Docker Hub** while passing these variables as secrets. The container runs as a non-root user for improved security.

---

## 👥 Contributors

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <img src="https://github.com/dunseen.png" width="100px;" alt="Davys Lima"/>
        <br />
        <sub><b>Davys Lima</b></sub>
        <br />
        <a href="mailto:davysjunior08@hotmail.com">📧</a> <a href="https://github.com/dunseen">💻</a>
      </td>
      <td align="center" valign="top" width="14.28%">
        <img src="https://github.com/denis-junior.png" width="100px;" alt="Denis Charles"/>
        <br />
        <sub><b>Denis Charles</b></sub>
        <br />
        <a href="mailto:denis_jr2001@hotmail.com">📧</a> <a href="https://github.com/denis-junior">💻</a>
      </td>
    </tr>
  </tbody>
</table>

---

For questions or suggestions, open an issue or contact the maintainers.
