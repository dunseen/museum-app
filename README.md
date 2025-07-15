# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

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

The workflow in `.github/workflows/docker.yml` runs `yarn lint` and `yarn build` on pull
requests targeting `main` to catch issues before merge. When changes land on `main`,
it builds and pushes a Docker image to **Docker Hub** while passing these variables
as secrets. The container runs as a non-root user for improved security.

