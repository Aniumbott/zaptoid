# What is Zaptoid?
**Zaptoid** is a simple and easy-to-use personal network manager which helps to remember THAT GUY from THAT PLACE or THAT TIME and helps to keep in touch with them.

## Tech Stack
- [Next.js](https://nextjs.org/): [React](https://reactjs.org/) Framework
- [TypeScript](https://www.typescriptlang.org/): JavaScript Superset
- [Next Auth](https://next-auth.js.org/): Authentication for Next.js
- [Mantine](https://mantine.dev/): React Components Library
- [Prisma](https://www.prisma.io/): Database Toolkit (ORM)
- [PostgreSQL](https://www.postgresql.org/): Relational Database
- [vercel](https://vercel.com/): Deployment Platform (Along with backend serverless functions)

## Getting Started
Install dependencies:
```bash
npm install
npm i -g vercel
```
Setup Vercel project:
```bash
vercel
```
Run the development server:
```bash
vercel dev
```
(optional) Run prisma studio:
```bash
npx prisma studio
```

## Commands
Update Prisma schema:
```bash
npx prisma generate
```
Update Prisma client:
```bash
npx prisma migrate dev --name <name>
```
Deploy to Vercel:
```bash
vercel --prod
```

