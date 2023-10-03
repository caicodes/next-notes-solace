# Solace Notes Applicaiton

> This is my custom-crafted solution for the Solace Assignment/Challenge to demostrate my coding practices, ability to follow directions, and ultimately my ability to deliver a full-stack solution to the presented challenge as described below. I hope you enjoy it and I truly appreciate your time and consideration for my canidacy for this role with Solace.
> 
> Sincerly,
> 
> Cai Toy

[Solace Notes Application Live Demo](https://solacenotes.vercel.app/)
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

The solution is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

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

This app is deployed to the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) on this url: 
https://solacenotes.vercel.app/

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details or use the Deploy Button below to Clone and Deploy this application to Vercel.

## Deploy Your Own Instance of this Application

Use the button below to clone this repository and deploy it to Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcaicodes%2Ftest-notes-solace&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Supabase%20Environment%20Variables%20for%20this%20Application&envLink=https%3A%2F%2Fapp.supabase.com%2Fproject%2F_%2Fsettings%2Fapi&demo-title=Solace%20Notes%20Application%20by%20Cai%20Toy&demo-description=Next.js%20and%20Supabase%20Notes%20Application%20per%20Solace%20Assignment&demo-url=https%3A%2F%2Fsolacenotes.vercel.app%2F)

> Note: You will be prompted to Configure Project in Vercel by entering the ENVIRONMENT VARIABLES required for the Supabase Integration. You can use the keys found here or enter your own if you have setup a Supabase project and seeded the database per the instructions above.

## Bonus Feature

As a bonus feature, Realtime Database updates are configured for this project and integrated so that updates on the server will instantly be pushed to the client via a subscription in this app.  You can view the code for that integration in `app/realtime/realtime-notes.tsx` 

Below is a Demo Video illustrating this feature as well as the source code for this implementation.

### Quicktime Video Demo

In this video, I will make inserts, updates, and deletes on the server within Supabase with a tab open showing the client realtime response via the deployed application on Vercel.

> video here...


realtime-notes.tsx source code below:
```javascript
"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import { DataTable } from "@/app/notes/data-table"
import { Note, columns } from "@/app/notes/columns"
import { toast } from "@/components/ui/use-toast"

export default function RealtimeNotes({
  serverNotes,
}: {
  serverNotes: Note[]
}) {
  const [notes, setNotes] = useState(serverNotes)

  const supabase = createClientComponentClient()

  useEffect(() => {
    const channel = supabase
      .channel("realtime notes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notes",
        },
        (payload) => {
          console.log({ payload })
          if (payload.eventType === "INSERT") {
            setNotes([...notes, payload.new as Note])
            toast({
              title: "New note added...",
            })
          }
          if (
            payload.eventType === "DELETE" ||
            payload.eventType === "UPDATE"
          ) {
            getNotes()
            toast({
              title: `Note ${
                payload.eventType === "DELETE" ? "deleted" : "updated"
              } on server...`,
            })
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

    async function getNotes() {
      const { data } = await supabase.from("notes").select()
      if (data) setNotes(data)
    }
  }, [notes, setNotes, serverNotes, supabase])

  return (
    <div className="m-4">
      <DataTable columns={columns} data={notes} />
    </div>
  )
}
```