# Local Run Instructions

## Backend (Django)

1.  Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2.  Create a virtual environment:

    ```bash
    python3 -m venv venv
    ```

3.  Activate the virtual environment:

    ```bash
    source venv/bin/activate  # On Linux/macOS
    venv\Scripts\activate  # On Windows
    ```

4.  Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5.  Apply migrations:

    ```bash
    python manage.py migrate
    ```

6.  Create a superuser (admin account):

    ```bash
    python manage.py createsuperuser
    ```

7.  Run the Django development server:

    ```bash
    python manage.py runserver
    ```

    The backend will be available at `http://localhost:8000`.

## Frontend (React)

1.  Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the React development server:

    ```bash
    npm start
    ```

    The frontend will be available at `http://localhost:3000`.

## Configuration

*   The backend API URL is configured in `frontend/src/App.jsx`.
*   Update the `BACKEND_URL` variable to match your Django development server address.
