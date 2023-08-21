# What is Zaptoid?
**Zaptoid** is a simple and easy-to-use personal network manager which helps to remember THAT GUY from THAT PLACE or THAT TIME and helps to keep in touch with them with the help of relation-based Contacts management.

## Tech Stack
- [Next.js](https://nextjs.org/): [React](https://reactjs.org/) Framework
- [TypeScript](https://www.typescriptlang.org/): JavaScript Superset
- [Next Auth](https://next-auth.js.org/): Authentication for Next.js
- [Mantine](https://mantine.dev/): React Components Library
- [Tabler icons](https://tabler.io/docs/icons/react): Icons Library
- [Prisma](https://www.prisma.io/): Database Toolkit (ORM)
- [PostgreSQL](https://www.postgresql.org/): Relational Database
- [vercel](https://vercel.com/): Deployment Platform (Along with backend serverless functions)

## Getting Started
1. Install dependencies:
    ```bash
    npm install
    npm i -g vercel
    ```
2. Setup Vercel project:
    ```bash
    vercel
    ```
3. Setup Prisma:
    ```bash
    npx prisma init
    ```
4. Setup .env file:
    ```bash
    cp .env.example .env
    ```
5. Go to your vercel dashboard and create a PostgreSQL database. Then add the connection string to the .env file.
6. Now go to your GCC portal credentials and create an OAuth API key and secret. Then add them to the .env file.
7. Run the development server:
    ```bash
    vercel dev
    ```
8. (optional) Run prisma studio:
    ```bash
    npx prisma studio
    ```
## Useful Commands
* Update Prisma schema:
    ```bash
    npx prisma generate
    ```
* Update Prisma client:
    ```bash
    npx prisma migrate dev --name <name>
    ```
* Deploy to Vercel:
    ```bash
    vercel --prod
    ```
