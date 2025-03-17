# note-taking-api
Add Persistence and Categories with Type Safety

Extend the note-taking API with categories:

1.⁠ ⁠Create a Category interface and add it to the Note interface

2.⁠ ⁠Add a category field to each note with proper type validation

3.⁠ ⁠Create new endpoints with typed request and response objects:

  - GET ⁠ /api/notes/categories/:categoryId ⁠ - Get notes by category ID

  - PUT ⁠ /api/notes/:id ⁠ - Update a note

4.⁠ ⁠Add validation for the note format using a custom middleware with TypeScript generics

5.⁠ ⁠Create a typed logging middleware to track API requests