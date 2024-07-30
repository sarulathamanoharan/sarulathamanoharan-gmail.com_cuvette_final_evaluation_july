# Project Title

Form Bot

## Table of Contents

- [Project Title](#project-title)
- [Table of Contents](#table-of-contents)
- [Requirements Gathering](#requirements-gathering)
- [Backend Setup](#backend-setup)
  - [Database Connection](#database-connection)
  - [Installed NPM Packages](#installed-npm-packages)
- [Development Planning](#development-planning)
  - [Backend Models](#backend-models)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
  - [Register User](#api-register-user)
  - [Login User](#api-login-user)
  - [Form APIs](#form-apis)
  - [Form Field APIs](#form-field-apis)
  - [User Response APIs](#user-response-apis)
  - [Folder APIs](#folder-apis)

## Requirements Gathering

Gathered all necessary requirements to ensure a comprehensive understanding of the project scope and objectives. This phase involved:

- Identifying key features and functionalities.
- Understanding user needs and business objectives.
- Documenting technical and non-technical requirements.

## Backend Setup

Started setting up the backend to create a robust foundation for the application.

### Database Connection

Set up the database connection using Mongoose to interact with MongoDB. This handles:

- Establishing a connection to the MongoDB database.
- Handling connection errors and retry logic.

### Installed NPM Packages

Installed the following npm packages to facilitate backend development:

- `nodemon`: For automatically restarting the server during development.
- `express`: To create the server and handle routing.
- `jsonwebtoken`: For handling JSON Web Tokens (JWT) for authentication.
- `bcrypt`: For hashing passwords.
- `mongoose`: To interact with MongoDB.
- `dotenv`: For managing environment variables.
- `cors`: For enabling Cross-Origin Resource Sharing.

## Development Planning

Planned the entire backend model structure using Excalidraw to get better insights into the development plan.

Excalidraw File URL: https://excalidraw.com/#json=bKgQkUqj_OjWh93wsx65m,-V4faDbMSqV-Pp5AuLKjTw

### Backend Models

Outlined and designed the backend models to streamline the development process and ensure data consistency. Models include:

- User Model: Defines user attributes and schema.
- Other Models: Include additional entities required for the project.

## Environment Variables

Created an `.env` file to manage environment-specific variables. Ensure this file is included in the `.gitignore` to avoid exposing sensitive information. Variables include:

- `DB_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT.
- `PORT`: Port number for the server.

## Getting Started

To get a local copy of this project up and running, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository.git
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repository
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables in a `.env` file.

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### API: Register User

`POST /api/v1/user/register`

#### Request Example

##### Request Body

```json
{
  "username": "[username]",
  "email": "[email]",
  "password": "[password]"
}
```

##### Request Headers

```
{
  "Content-Type": "application/json"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "User created successfully.",
  "data": {
    "username": "[username]",
    "email": "[email]",
    "password": "[encrypted password]",
    "_id": "[userId]",
    "createdAt": "[timestamp]",
    "updatedAt": "[timestamp]",
    "__v": 0
  }
}
```

### API: Login User

`POST /api/v1/user/login`

#### Request Example

##### Request Body

```json
{
  "email": "[email]",
  "password": "[password]"
}
```

##### Request Headers

```
{
  "Content-Type": "application/json"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "User logged in successfully.",
  "token": "[AUTH_TOKEN]",
  "userDetails": {
    "_id": "[userId]",
    "username": "[username]",
    "email": "[email]",
    "password": "[encrypted password]",
    "createdAt": "[timestamp]",
    "updatedAt": "[timestamp]",
    "__v": 0
  }
}
```

### Form APIs

#### Get All Forms

`GET /api/v1/forms/all/:folderId?`

##### Request Headers

```
{
  "Content-Type": "application/json",
  "Authorization": "[TOKEN]"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Forms fetched successfully.",
  "forms": [...]
}
```

#### Get Form by ID

`GET /api/v1/forms/single/:formId`

##### Request Headers

```
{
  "Content-Type": "application/json",
  "Authorization": "[TOKEN]"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Form fetched successfully.",
  "form": { ... }
}
```

#### Create Form

`POST /api/v1/forms/:folderId?`

##### Request Body

```json
{
  "userId": "[userId]",
  "name": "[formName]",
  "theme": "[formTheme]"
}
```

##### Request Headers

```
{
  "Content-Type": "application/json",
  "Authorization": "[TOKEN]"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Form created successfully.",
  "data": { ... }
}
```

#### Update Form Details

`PUT /api/v1/forms/:formId`

##### Request Body

```json
{
  "name": "[newFormName]",
  "theme": "[newFormTheme]"
}
```

##### Request Headers

```
{
  "Content-Type": "application/json",
  "Authorization": "[TOKEN]"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Form name updated successfully.",
  "form": { ... }
}
```

#### Delete Form

`DELETE /api/v1/forms/:formId`

##### Request Headers

```
{
  "Content-Type": "application/json",
  "Authorization": "[TOKEN]"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Form deleted successfully."
}
```

#### Increase Form View

`PUT /api/v1/forms/:formId/view`

##### Request Headers

```
{
  "Content-Type": "application/json"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Form viewed count increased successfully.",
  "form": { ... }
}
```

#### Increase Start Count

`PUT /api/v1/forms/:formId/start`

##### Request Headers

```
{
  "Content-Type": "application/json"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Form started count increased successfully.",
  "form": { ... }
}
```

#### Increase Completed Count

`PUT /api/v1/forms/:formId/complete`

##### Request Headers

```
{
  "Content-Type": "application/json"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Form completed count increased successfully.",
  "form": { ... }
}
```

### Form Field APIs

#### Get All Form Fields

`GET /api/v1/forms/:formId/formfields`

##### Request Headers

```
{
  "Content-Type": "application/json",
  "Authorization": "[TOKEN]"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Form fields fetched successfully.",
  "formFields": [...]
}
```

#### Create Form Fields

`POST /api/v1/forms/:formId/formfields`

##### Request Body

```json
{
  "userId": "[userId]",
  "formFields": [...]
}
```

##### Request Headers

```
{
  "Content-Type": "application/json",
  "Authorization": "[TOKEN]"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Form field created/updated successfully.",
  "data": { ... }
}
```

### User Response APIs

#### Create User Response

`POST /api/v1/forms/:formId/user-response`

##### Request Body

```json
{
  "response": "[response]",
  "seq": "[sequence]",
  "uniqueKey": "[uniqueKey]"
}
```

##### Request Headers

```
{
  "Content-Type": "application/json"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "User response created successfully.",
  "userResponse": { ... }
}
```

#### Get All User Responses

`GET /api/v1/forms/:formId/user-responses`

##### Request Headers

```
{
  "Content-Type": "application/json",
  "Authorization": "[TOKEN]"
}
```

##### Success Response

```json


{
  "success": true,
  "message": "User responses fetched successfully.",
  "userResponses": [...]
}
```

### Folder APIs

#### Get All Folders

`GET /api/v1/folders`

##### Request Headers

```
{
  "Content-Type": "application/json",
  "Authorization": "[TOKEN]"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Folders fetched successfully.",
  "folders": [
    {
      "_id": "[folderId]",
      "name": "[folderName]"
    },
    ...
  ]
}
```

#### Create Folder

`POST /api/v1/folders`

##### Request Body

```json
{
  "userId": "[userId]",
  "name": "[folderName]"
}
```

##### Request Headers

```
{
  "Content-Type": "application/json",
  "Authorization": "[TOKEN]"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Folder created successfully.",
  "data": {
    "_id": "[folderId]",
    "createdBy": "[userId]",
    "name": "[folderName]"
  }
}
```

#### Update Folder Name

`PUT /api/v1/folders/:folderId`

##### Request Body

```json
{
  "name": "[newFolderName]"
}
```

##### Request Headers

```
{
  "Content-Type": "application/json",
  "Authorization": "[TOKEN]"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Folder name updated successfully.",
  "folder": {
    "_id": "[folderId]",
    "name": "[newFolderName]"
  }
}
```

#### Delete Folder

`DELETE /api/v1/folders/:folderId`

##### Request Headers

```
{
  "Content-Type": "application/json",
  "Authorization": "[TOKEN]"
}
```

##### Success Response

```json
{
  "success": true,
  "message": "Folder deleted successfully."
}
```
