# Meal Order App

Web app for employees of a company to order meals for the week, give up and claim lunches.

The project was done with a team of 4 people, during 2024 Sourcery Academy For Frontend, organized by Devbridge (a Cognizant company). Desktop design was provided.

Personal contributions to the project:

- React component creation and integration
- React Router configuration
- Navigation
- Authorization (login and registration)

## Tech Stack

Project is setup using Vite (React / TypeScript), PostCSS, Jest, React Testing Library. JSON server for backend.

## Features

**User Authentication:**

- User login and registration functionality.
- Profile display with balance, logout option.

**Meal display:**

- Display weekly lunch menu categorized by days (Monday to Friday).
- Each dish card includes details like name, vendor, rating, price, and a brief description. Tooltip for descriptions that are too large.
- "More Info" button for detailed information about each dish (displayed in a modal).

**Search and Filter:**

- Search bar to find dishes by name.
- Filter dishes by vendor.
- Sort dishes by popularity, price, or rating.

**Add to Cart:**

- Cart summary display with the total price.
- "Press & Hold to Send" button for final order submission.

**User Notifications:**

- Notifications for successful order placement.
- Toasts for errors, successful actions and information.

**Responsive Design:**

- Mobile-friendly interface.
- Adjustable layout for different screen sizes.

## Future improvements

- Completion of two remaining pages (Your Orders and Ratings)
- More convenient navigation for user on mobile
- Functionality for the user to manage their profile (add/edit information).
