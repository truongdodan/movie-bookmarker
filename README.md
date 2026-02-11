<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <div align="center">
    <h1><img src="public/popcorn.svg" alt="Popcorn" width="40" height="40"> Popcorn - Movie Bookmarker</h1>
</div>

  <p align="center">
    Discover, bookmark, and manage your favorite movies in one place.
    <br />
    <br />
    <a href="https://movie-bookmarker.vercel.app">View Demo</a>
    &middot;
    <a href="https://github.com/truongdodan/movie-bookmarker/issues/new?labels=bug">Report Bug</a>
    &middot;
    <a href="https://github.com/truongdodan/movie-bookmarker/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

A modern full-stack web application for discovering and bookmarking your favorite movies. Built with the T3 Stack, Popcorn provides a seamless experience to browse popular movies from The Movie Database (TMDB) API, view detailed information, and maintain a personalized watchlist.

### Key Features

- **Browse Popular Movies** — Discover trending movies with ratings and overviews
- **Movie Search** — Find movies by title across TMDB's extensive database
- **Detailed Movie Information** — View comprehensive details including release date, ratings, and plot
- **Personal Watchlist** — Bookmark movies to your personalized watchlist (requires authentication)
- **User Authentication** — Secure login and registration with encrypted passwords
- **Real-time Bookmarks** — Instantly see bookmark status across the app
- **Responsive Design** — Optimized for desktop and mobile devices

### Why Popcorn?

- **Type-Safe End-to-End** — Leverages tRPC for full type safety from frontend to backend
- **Modern Stack** — Built with Next.js 15, React 19, and TailwindCSS for optimal performance
- **Database Integrity** — Prisma ORM ensures reliable data management with PostgreSQL
- **Clean Architecture** — Organized codebase following T3 Stack best practices

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Prisma][Prisma]][Prisma-url]
- [![Tailwind][Tailwind-CSS]][TailwindCSS-url]
- [![tRPC][tRPC]][tRPC-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- TMDB API key (free from [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/truongdodan/movie-bookmarker.git
   cd movie-bookmarker
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Set up environment variables

   Create a `.env.local` file in the root directory:

   ```sh
    DATABASE_URL="postgresql://user:password@localhost:5432/movie_bookmarker"
    NEXTAUTH_SECRET="your-secret-key-here"
    NEXTAUTH_URL="http://localhost:3000"
    NEXT_PUBLIC_TMDB_API_KEY="your-tmdb-api-key"
   ```

4. Set up the database
   ```js
   npx prisma migrate dev
   ```
5. Run the development server
   ```sh
   npm run dev
   ```
6. Open http://localhost:3000 in your browser

## Usage

- **Browse Movies** — Visit the home page to see popular movies from TMDB
- **Search Movies** — Use the search bar to find movies by title
- **View Details** — Click on any movie to see full details including plot, ratings, and release date
- **Create Account** — Register to unlock bookmarking features
- **Bookmark Movies** — Save movies to your watchlist for later reference
- **Manage Watchlist** — Visit your watchlist page to view and manage all bookmarked movies

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [x] Browse popular movies from TMDB
- [x] User authentication (login/register)
- [x] Movie search functionality
- [x] Bookmark/watchlist feature
- [ ] Multiple content sections (Trending, Popular, New Releases)
- [ ] TV series support alongside movies
- [ ] Advanced filtering (by genre, year, rating, language)
- [ ] Movie ratings and user reviews
- [ ] Dark mode theme

See the [open issues](https://github.com/truongdodan/movie-bookmarker/issues) for a full list of proposed features.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

**Dan Truong** - [GitHub](https://github.com/truongdodan) - dodantruong333@gmail.com

Project Link: [https://github.com/truongdodan/movie-bookmarker](https://github.com/truongdodan/movie-bookmarker)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[NextAuth-url]: https://next-auth.js.org/
[Prisma-url]: https://www.prisma.io/
[Prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Tailwind-CSS]: https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[tRPC-url]: https://trpc.io/
[tRPC]: https://img.shields.io/badge/tRPC-398CCB?style=for-the-badge&logo=trpc&logoColor=white
