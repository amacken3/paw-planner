# PawPlanner

PawPlanner is a full-stack pet care organization app built to help users manage their pets, care routines, medications, and care events in one place. The goal of the app is to make pet care feel less scattered by giving each user a private dashboard where they can track important care information for their own pets.

Users can create an account, log in, add pet profiles, and manage pet-specific records such as recurring routines, medications, and scheduled or completed care events.

## Live Links

Frontend: https://paw-planner-frontend.onrender.com

Backend API Base URL: https://paw-planner-api.onrender.com

> Note: The backend is an API service used by the frontend. Visiting the backend base URL directly in the browser may return a `404 Not Found` response because the backend is meant to be accessed through its `/api/...` routes.

## Features

* User signup, login, logout, and session persistence
* Protected routes for authenticated users
* User-specific pet data
* Create, view, edit, and delete pet profiles
* Add recurring care routines for each pet
* Add medications with dosage, unit, instructions, frequency, and dates
* Add scheduled or completed care events
* Connect care events to routines or medications when applicable
* Mark care events complete or incomplete
* Collapsible forms to keep the interface clean
* Styled landing page, auth pages, dashboard, pet details page, forms, and cards
* Deployed frontend and backend

## Tech Stack

### Frontend

* React
* Vite
* React Router
* JavaScript
* CSS Modules
* Fetch API

### Backend

* Python
* Flask
* Flask SQLAlchemy
* Flask Migrate
* Flask Bcrypt
* Flask CORS
* SQLAlchemy Serializer
* SQLite for local development
* Render for deployment

## Project Structure

```txt
paw-planner/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── seed.py
│   ├── migrations/
│   └── Pipfile
│
└── README.md
```

## App Overview

PawPlanner starts with a landing page that explains the purpose of the app. From there, users can sign up or log in.

Once authenticated, users are taken to their dashboard. The dashboard displays only the pets created by the current user. From the dashboard, users can add new pets, edit existing pets, delete pets, or open a pet details page.

The pet details page is organized into two main areas:

### Care Plan

The Care Plan section contains recurring care information for the pet.

This includes:

* Care routines
* Medications

Care routines are intended for repeatable tasks such as feeding, walking, grooming, or cleaning. Medications are used to track dosage, unit, frequency, instructions, start dates, end dates, and notes.

### Care Timeline

The Care Timeline section contains specific scheduled or completed care actions.

Care events can stand alone or be connected to a related care routine or medication. Events can also be marked complete or incomplete.

## Data Model Summary

### User

A user can sign up, log in, and manage their own pet care data.

A user has many pets.

### Pet

A pet belongs to a user and stores basic profile information.

A pet has many:

* Care routines
* Medications
* Care events

### CareRoutine

A care routine belongs to a pet and represents a recurring care task.

Examples:

* Feeding
* Walking
* Grooming
* Litter cleaning
* Daily health check

### Medication

A medication belongs to a pet and stores medication-specific care information.

Medication records can include:

* Name
* Dosage
* Unit
* Instructions
* Frequency
* Start date
* End date
* Notes

### CareEvent

A care event belongs to a pet and represents a specific scheduled or completed care action.

A care event can optionally be connected to:

* A care routine
* A medication

Care events include a status so they can be tracked as scheduled, completed, missed, or cancelled.

## Local Setup

### Backend Setup

From the project root:

```bash
cd server
pipenv install
pipenv shell
flask db upgrade head
python seed.py
python app.py
```

The backend should run locally at:

```txt
http://localhost:5555
```

### Frontend Setup

Open a second terminal from the project root:

```bash
cd client
npm install
npm run dev
```

The frontend should run locally at:

```txt
http://localhost:5173
```

## Environment Variables

The frontend uses an environment variable to know which backend API to call.

For local development, create a `.env` file inside the `client/` directory:

```bash
VITE_API_BASE_URL=http://localhost:5555
```

For deployment, the frontend uses the deployed backend API URL:

```bash
VITE_API_BASE_URL=https://paw-planner-api.onrender.com
```

## API Routes

### Auth Routes

| Method | Route                | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | `/api/signup`        | Create a new user account                |
| POST   | `/api/login`         | Log in an existing user                  |
| DELETE | `/api/logout`        | Log out the current user                 |
| GET    | `/api/check_session` | Check the current logged-in user session |

### Pet Routes

| Method | Route            | Description                       |
| ------ | ---------------- | --------------------------------- |
| GET    | `/api/pets`      | Get all pets for the current user |
| POST   | `/api/pets`      | Create a new pet                  |
| GET    | `/api/pets/<id>` | Get one pet                       |
| PATCH  | `/api/pets/<id>` | Update a pet                      |
| DELETE | `/api/pets/<id>` | Delete a pet                      |

### Care Routine Routes

| Method | Route                              | Description                |
| ------ | ---------------------------------- | -------------------------- |
| GET    | `/api/pets/<pet_id>/care-routines` | Get routines for a pet     |
| POST   | `/api/pets/<pet_id>/care-routines` | Create a routine for a pet |
| PATCH  | `/api/care-routines/<id>`          | Update a care routine      |
| DELETE | `/api/care-routines/<id>`          | Delete a care routine      |

### Medication Routes

| Method | Route                            | Description                   |
| ------ | -------------------------------- | ----------------------------- |
| GET    | `/api/pets/<pet_id>/medications` | Get medications for a pet     |
| POST   | `/api/pets/<pet_id>/medications` | Create a medication for a pet |
| PATCH  | `/api/medications/<id>`          | Update a medication           |
| DELETE | `/api/medications/<id>`          | Delete a medication           |

### Care Event Routes

| Method | Route                            | Description                   |
| ------ | -------------------------------- | ----------------------------- |
| GET    | `/api/pets/<pet_id>/care-events` | Get care events for a pet     |
| POST   | `/api/pets/<pet_id>/care-events` | Create a care event for a pet |
| PATCH  | `/api/care-events/<id>`          | Update a care event           |
| DELETE | `/api/care-events/<id>`          | Delete a care event           |

## Frontend Routes

| Route        | Page        | Description                                                                |
| ------------ | ----------- | -------------------------------------------------------------------------- |
| `/`          | Home        | Landing page with mission and feature overview                             |
| `/login`     | Login       | Log into an existing account                                               |
| `/signup`    | Signup      | Create a new account                                                       |
| `/dashboard` | Dashboard   | Protected page showing the current user's pets                             |
| `/pets/:id`  | Pet Details | Protected page for managing a pet's routines, medications, and care events |

## Styling

The frontend uses CSS Modules to keep styles scoped to specific pages and components.

Examples:

* `HomePage.module.css`
* `Dashboard.module.css`
* `PetDetails.module.css`
* `AuthPage.module.css`
* `PetForm.module.css`
* `PetCard.module.css`
* `CareRoutineForm.module.css`
* `MedicationForm.module.css`
* `CareEventForm.module.css`
* `CareRoutineList.module.css`
* `MedicationList.module.css`
* `CareEventList.module.css`

The app uses a consistent visual style with:

* Rounded white cards
* Orange accent colors
* Soft shadows
* Responsive layouts
* Collapsible forms
* Hover states on cards and buttons
* Consistent form fields and spacing

## Deployment Notes

The app is deployed with separate frontend and backend services.

The frontend is a React/Vite app deployed as a static site. The backend is a Flask API deployed separately.

Because the frontend and backend are deployed on separate domains, the app uses:

* CORS configuration on the backend
* `credentials: "include"` on frontend fetch requests
* Secure session cookie settings for deployed authentication

Important backend session settings include:

```python
SESSION_COOKIE_SAMESITE = "None"
SESSION_COOKIE_SECURE = True
```

The frontend also uses a rewrite rule so React Router routes work after page refresh.

```txt
/* -> /index.html
```

## Challenges

One of the main challenges was getting authentication to work correctly after deployment. The app worked locally, but the deployed frontend and backend were on separate Render domains. This required updating CORS, frontend fetch credentials, and session cookie settings so users could stay logged in after refreshing the deployed app.

Another challenge was organizing the pet details page in a way that made sense to users. Care routines and care events are related, but they serve different purposes. The final design separates them into:

* Care Plan: recurring routines and medications
* Care Timeline: scheduled or completed care actions

This made the page easier to understand and helped reduce repetition in the user interface.

## Future Improvements

Potential future improvements include:

* Pet photo uploads
* Calendar view for care events
* Reminder notifications
* Filtering care events by status
* Sorting events by upcoming or completed date
* More detailed medication history
* Shared household access for multiple users
* Accessibility improvements
* Additional automated testing
* Add recurring routine completion tracking, where routines can generate care event instances that users can mark complete for the day
* Add automatic creation of future care events based on a routine’s frequency
* Add reminders or notifications for upcoming recurring care tasks

## Author

Aengus MacKenzie
