# Authorization

Let's add role based authorization to our user signup and login application. You must create a `Roles` table with at least 2 roles (eg. `ADMIN` and `CUSTOMER`) and link it to your `Users` using a `role_id`.

Add one new public route and two new protected routes. For your protected routes, make one that's available to all signed in users, and one that's only available to admin users.

## Requirements
- All Users have a role. 
- Update your session cookie to use JWTs.
- Your JWT should store the `User` role.
- Your JWT should be checked to access your protected routes.

Use the red, green, refactor process. Work vertically, fully completing each route before moving to the next.

Each route requires the following:
* Test(s) (including for each subcondition)
* `express` route
* Model method
* Service method
* Related SQL schema

## Rubric
- A route that does not require a JWT (1 point)
- A route only accessible to signed in users (3 points)
  - If the request doesn't have a valid JWT, then return `401` (1 point)
- A route to set a `User`'s role that's only accessible for admin users (3 points)
  - If the request doesn't have a valid JWT, then return `401` (1 point)
  - If the requesting user isn't an admin, then return `403` (1 point)

  
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