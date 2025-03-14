# Getting Started with Rules

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Available Commands

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# Features
This application includes a rules management system with the following features:

1. A route at `/rules` that provides rule management functionality.
2. A view mode displaying a dropdown, two action buttons (`Edit Rules`, `Copy Ruleset`), and a table showing rule data.
3. An edit mode activated by clicking `Edit Rules`, which includes:
   - Input field for editing the ruleset name.
   - Action buttons: `Save Changes`, `Cancel`, `Add New Rule`, and `Delete Ruleset`.
   - A table containing:
     - Measurement Name field.
     - Comparator field with options (`is`, `>=`, `<`). If `is` is selected, `Compared Field` is disabled with "Not Present"; otherwise, a `Unit` input appears.
     - Compared Value field (numeric or "Not Present").
     - Finding Name text input field.
     - Action field with options (`Normal`, `Reflux`).
   - Edit and delete icons for modifying or removing rules.
   - A confirmation popup on clicking `Cancel`.
   - The ability to add new rules with automatic scrolling if needed.
   - Deleting a ruleset when `Delete Ruleset` is clicked.
4. The `Copy Ruleset` function duplicates all rules and adds a new entry to the dropdown with the format `{{name}}_(1)`.
5. A dropdown menu including `+Add New Ruleset`, which creates a new empty ruleset when selected.
