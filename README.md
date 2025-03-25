# Formula Input App

This is a React-based formula input application that allows users to enter and calculate formulas dynamically. The app features an interactive input field with real-time validation, autocomplete suggestions, and dropdown value adjustments.

## 🚀 Features
- **Formula Parsing & Calculation**: Supports arithmetic operations (+, -, *, /, ^, ())
- **Tag-based Input**: Each element in the formula (numbers, operators, variables) is treated as a separate tag
- **Autocomplete Suggestions**: Dynamically fetches and suggests variables
- **Dropdown for Variable Values**: Allows modifying variable values inside a dropdown
- **Formula Validation**: Displays an error message if the formula is invalid
- **State Management**: Uses Zustand for local state and React Query for API requests

## 🛠️ Setup & Installation
### 1. Clone the Repository
```bash
git clone git@github.com:MyroslavTiuk/formula-app.git
cd formula-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```
The application will run on `http://localhost:3000`

## 📦 Build & Deployment
To create a production build, run:
```bash
npm run build
```

For deployment, the project is hosted on **Vercel**.

🔗 **Live Demo:** _[https://formula-app-alpha.vercel.app/]_  

## 📜 What’s Implemented
- **Fully functional formula input UI** similar to Causal’s formula editor
- **Dropdowns for variable values** with real-time updates
- **React Query integration** for fetching suggestions
- **Validations to prevent incorrect calculations**
- **Beautiful UI with TailwindCSS**

## 📨 Submission Details
- **GitHub Repo:** _[https://github.com/MyroslavTiuk/formula-app]_  
- **Live Version:** _[https://formula-app-alpha.vercel.app/]_  

---

### 🤔 Need help?
Feel free to reach out if you have any questions!
