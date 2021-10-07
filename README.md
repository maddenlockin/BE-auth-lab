# Authentication

Build a user signup and login application using a layered architecture. It must contain a `User` model that includes an `email` and `passwordHash`.

## Requirements
You must check for authentication using `express` middleware. Your `/login` route should also store a cookie with the logged in user's id.

Use the red, green, refactor process. Work vertically, fully completing each route before moving to the next.

Each route requires the following:
* Test(s) (including for each subcondition)
* `express` route
* Model method
* Related SQL schema

## Rubric

- `POST` route to `/signup` that responds with a newly created `User`'s id (3 points)
  - If the email already exists, return `400` (1 point)
- `POST` route to `/login` that responds with the existing `User`'s id (3 points)
  - If credentials are incorrect, return `401` (1 point)
- `GET` route to `/me` that responds with the currently logged in `User`. (2 points)
  - **DO NOT RETURN THE USER'S `passwordHash`!** If you do... MINUS 5 POINTS!!!! (Seriously)