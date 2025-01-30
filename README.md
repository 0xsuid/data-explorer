# Data Explorer Dashboard

Data Explorer Dashboard is a web application that allows users to explore and visualize datasets using interactive table. The application uses React for the frontend, Tailwind CSS for styling, Shadcn/ui for additional UI components, SQLAlchemy for database operations, Flask as the backend framework, and Strawberry for GraphQL.


## Technologies Used

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Next.js**: React framework for server-rendered applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn/ui**: Additional UI components for Tailwind CSS.
- **@tanstack/react-query**: Library for data fetching and caching.

### Backend
- **FastAPI**: FastAPI is a modern, fast (high-performance), Python web framework.
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM) library.
- **Alembic**: Database migration tool for SQLAlchemy.
- **Strawberry**: GraphQL library for Python.

## Installation

1. Clone the repository.
2. Install dependencies(Nodejs & Python):
   ```bash
   npm install -g pnpm@latest-10
   pipx install poetry
   pnpm install
   poetry install
   ```
3. Create a `.env` file for environment variables.
   ```bash
	DATABASE_URL=postgres://user:passs@host/database?sslmode=require
	NEXT_PUBLIC_API_URL=http://localhost:3000
   ```
4. Run migrations:
   ```bash
   alembic upgrade head
   ```

## Running the Application

To start the Next.js development server:

```bash
pnpm dev
```

Then start fastapi backend:
```bash
poetry run uvicorn api.index:app --reload
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Directory Structure

- `alembic/`: Migration scripts.
- `app/`: Nextjs App Router.
- `components/`: React components.
- `public/`: Static assets to be served.
- `api/`: FastApi backend.