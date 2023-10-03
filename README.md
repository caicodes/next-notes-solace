# Solace Notes Applicaiton

> This is my custom crafted solution for the Solace Assignment/Challenge to demostrate my coding practices, ability to follow directions, and ultimately my ability to deliver a full stack solution to the presented challenge as described below. I hope you enjoy and I truly appreciate your time and consideration for my canidacy to this role with Solace.
> 
> Sincerly,
> 
> Cai Toy


## Goal: 
The deliverable out of this is a link to a Github repo, whatever documentation you might think would be helpful and a working web app hosted somewhere publicly accessible.

1. Please build a very simple “Notes” Web App. An app that will allow a user to Index, Create, Update and Delete notes.
2. Meet the following ***Acceptance Criteria***:
   1. Must be written with JavaScript or Typescript (preferred)
   2. Note Form must have the following validations
      1. Must not be shorter then 20 characters
      2. Must not be longer then 300 characters
   3. Main page must include all the notes and a way to create a new note
   4. Main page must include a search bar that will find based on a notes content. (Client or Server query is fine)
   5. Must include README with steps on how to run the application(s) locally.


## The Solution

The soluction is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

This project uses [Supabase](https://supabase.com/) as a serverless backend for data persistence to a Postgres database with Realtime data syncronization between client and server.
> See video below for realtime updates on the client from server updates...

### Additionally, the solution/application uses the following:
- Latest version of `Next.js` with using `src` and `app` directory setup, client and server components
- `Shadcn.ui` and `TailwindCSS` for component styling
- `next-themes` for colormode selection with a Theme Provider
- Fonts from Google and a custom local fonts using `next/fonts`
- `Postgres` Database
- Forms with `react-hook-form`
- Form validation and typed schema with `zod`
- Mobile Friendly and Responsive Design
- Above all, full type safety with `Typescript`. 

## Running this Project Locally

In order to run this application, you will need to either setup a project on Supabase and seed the database with the `seed_notes.sql` file located in the project root under the `supabase` directory.

### Install Dependencies
After cloning or downloading this repository, install dependencies with the package manager of your choice. This repo and deployed app uses `pnpm`.
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
Using a new project on Supabase will require the public Project URL and public API Key. If using this project, there are instructions below under ***Create a Local Environment Variables File*** with the location of the url and key in this repository. 🤫 _Also included is a hint to make it easy, see below..._

Using a new project on Supabase will require the notes table to be setup. The schema and seed file contains both the database schema and example notes insert statements. Copy and paste the contents of `supabase/seed_notes.sql` into the SQL editor on Supabase and hit `run query` OR use the existing application.

You can get these Supabase details from your [project settings > API](https://app.supabase.com/project/_/settings/api)
### Create a Local Environment Variables File

Either using a new project setup on Supabase or this project with the following settings from `env.local.example`, create a `env.local` file with the following:

```
NEXT_PUBLIC_SUPABASE_URL=Your_App_Url_Here
NEXT_PUBLIC_SUPABASE_ANON_KEY=Your_Anon_Key_Here
```
> Note: To use this project on Supabase and run it locally, see `supabase/settings.md` for the required public keys.

After installing dependencies, using or setting up Supabase with the notes database table and creating the `local.env` with the required environment variables, the application is ready to be run locally.

> Hint 🤫: _Just rename the example file by removing .example and you're good to go!_ 😎

### To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to run the application.


## Deploy the Application on Vercel

This app is deployed to the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

> Note: You will need to setup a Project in your Dashboard in Vercel, link to a repository, and enter the ENVIRONMENT VARIABLES within your Vercel Project Settings to setup build hooks and deploy successfully to the Vercel Platform.


