# Bidwise

## Frontend

We built the frontend using **React**.

### Why React?

We chose React because we had basic knowledge of the framework.

### Styling

For styling, we used **Tailwind CSS**.

### How to Start the Frontend

1. Navigate to the frontend directory:
    ```bash
    cd angebotsfindung-frontend
    ```
2. Install the necessary dependencies:
    ```bash
    npm install
    ```
3. Start the frontend:
    ```bash
    npm start
    ```

## Backend

The backend is built with **Python**.

### Why Python?

We selected Python due to its vast array of frameworks, libraries, and overall ease of use.

### How to Start the Backend Script

To run the backend you need an OpenAI API key. You can get one [here](https://beta.openai.com/signup/).

1. First, navigate to the backend directory:
   ```bash
   cd angebotsfindung-backend
   ```

2. Create a .env file to store the API key:
   ```bash
   touch .env
   ```

3. Add the following line to the .env file:
   ```bash
   OPENAI_API_KEY=YOUR_API_KEY
   ```

4. Install the necessary dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Start the backend:
   ```bash
   uvicorn main:app --reload
   ```



## AI Model

We choose the OpenAI GPT-4-Turbo model for our AI model.

### Why GPT-4-Turbo?

We chose GPT-4-Turbo because it was the most recent model available to us.
