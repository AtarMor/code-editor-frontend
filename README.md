#  Online Coding Collaboration App

## Overview
This project is an online coding web application designed to facilitate remote mentoring sessions. The app allows a mentor to share a code block with a student, observe their coding process, and see changes in real-time.

## Deployed Version
The app is also available online at https://coditor.onrender.com/.

## Key Features
### Lobby Page
- **Choose Code Block:** The lobby page displays a list of at least code blocks. Clicking on a code block item takes the user to the Code Block Page for editing.

### Code Block Page
- **Mentor View:** The first user to open the code block page is designated as the mentor. The mentor sees the code block in read-only mode.
- **Student View:** Any additional users entering the page are counted as students. Students can edit the code block.
- **Real-Time Updates:** Code changes are displayed in real-time using WebSockets.
- **Code Running:** Users can execute code blocks directly within the app to visualize outputs and test solutions.
- **Solution Matching:** Submit and check code blocks for solution accuracy, ensuring a comprehensive learning experience.

## Technologies Used
- **Frontend:** React.js, Monaco-editor/react
- **Backend:** Node.js, Express.js, Socket.io
- **Database:** MongoDB

## Getting Started
### Prerequisites
- Ensure Node.js and MongoDB are installed on your system.

### Installation
#### Backend
1. Clone the repository: `git clone https://github.com/AtarMor/code-editor-backend.git`
2. Navigate to the project directory: `cd code-editor-backend`
3. Install dependencies: `npm install`
4. Start the server: `npm start`

#### Frontend
1. Clone the repository: `git clone https://github.com/AtarMor/code-editor-frontend.git`
2. Navigate to the project directory: `cd code-editor-frontend`
3. Install dependencies: `npm install`
4. Start the server: `npm run dev`
5. Open your browser and go to `http://localhost:5173` to access the application.

## API Endpoints
- **Base URL:** http://127.0.0.1:3030/api
- **GET /code:** Retrieve all code blocks.
- **GET /code/:id:** Retrieve a specific code block by ID.
- **PUT /code/:id:** Update an existing code block.
- **DELETE /code/execute:** Execute a code block.