# survey-app-demo

This is a demo full-stack application that showcases how we can use SurveyJS to build an application for creating, managing, and responding to questionnaires. The application is built with the MERN stack (MongoDB, Express.js, React/Next.js, Node.js). It provides an interface for building custom questionnaires and managing responses. You may access the live demo from this link: https://survey-app-demo.onrender.com (you may need to wait for a minute or more until the page is fully loaded because the server is turned to sleep mode when there is no traffic).

## Disclaimer

This is a just a demo app created by the author as a mean to learn about Next.js, Tailwind CSS, and SurveyJS. Do not expect to find anything fancy.

## Features

- **Questionnaire Builder**: Create custom questionnaires using a visual builder interface
- **JSON Preview**: View and validate the underlying JSON structure of your questionnaires
- **Live Preview**: Test your questionnaires in real-time before deployment
- **Response Management**: View and analyze questionnaire responses
- **Modern UI**: Clean, responsive interface built with Tailwind CSS

## Technologies Used

### Frontend

- Next.js for React framework
- Tailwind CSS for styling
- SurveyJS for questionnaire creation and rendering
- React Hooks for state management

### Backend

- Express.js
- MongoDB for data storage
- Node.js

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone [your-repository-url]
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   npm run install-all
   ```

3. Configure environment variables:

   - Create `.env` in the root directory using `.env.example` as a template:
     ```
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```
   - Create `.env` in the `webclient` directory:
     ```
     NEXT_PUBLIC_REACT_APP_BACKEND_BASE_URL=http://localhost:5000
     ```

4. Set up MongoDB:
   - Create a MongoDB Atlas cluster (or use a local MongoDB instance)
   - Whitelist your server's IP address in MongoDB Atlas settings
   - Add your MongoDB connection string to the `.env` file

## Running the Application

### Production Mode

1. Build the application:

   ```bash
   npm run build-all
   ```

2. Start the server:

   ```bash
   yarn start
   ```

3. In a new terminal, start the frontend development server:

   ```bash
   cd webclient
   yarn start
   ```

4. Access the application at `http://localhost:3000` (or your configured port)

### Development Mode

1. Start the backend server from the root directory:

   ```bash
   yarn start
   ```

2. In a new terminal, start the frontend development server:

   ```bash
   cd webclient
   npm run dev
   ```

3. Access the application at `http://localhost:3000`

## Usage Guide

### Creating a Questionnaire

1. Navigate to the Questionnaire Builder page
2. Use the visual builder interface to add and configure questions
3. Preview your questionnaire using the "Preview" button
4. View the generated JSON structure in the JSON viewer
5. Save your questionnaire when ready

### Submitting Responses

1. View any created questionnaire
2. Answer and complete the questionnaire to submit a response

### Viewing Responses

1. Access the responses page
2. View individual response details in JSON format
3. Copy the presented JSON format as needed

## Project Structure

```
├── routers/               # API routes for Express.js server
├── db/                    # Building connection with database
├── controller/            # Backend logic for Express.js server
├── services/              # Backend logic for handling requests related to database
├── index.js               # Backend server entry point
├── webclient/             # Next.js frontend
│   ├── src/               # Webclient main implementation code
│   │   ├── app/           # Page implementation
│   │   ├── components/    # Page component implementation
│   │   ├── lib/           # Constants, utilities, and any required libraries
│   └── public/            # Static assets
│   └── package.json       # Webclient project dependencies and scripts
└── package.json           # Server project dependencies and scripts
```

## API Endpoints

- `GET /api/survey` - List all created questionnaires
- `GET /api/survey/:id` - Get specific questionnaire
- `POST /api/survey/:id` - Create a new questionnaire
- `GET /api/survey-response` - List all created questionnaires
- `GET /api/survey-response/:id` - Get specific questionnaire
- `POST /api/survey-response/:id` - Create a new questionnaire

## Future Improvements

- Add authentication and user roles
- Add draft mode
- Enable questionnaire build with external file such as CSV
- Implement questionnaire templates
- Enable questionnaire versioning
- Add export functionality for responses
- Add data visualization for responses
- Implement real-time collaboration features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
