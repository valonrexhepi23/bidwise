# Step 1: Use an appropriate base image
FROM python:3.9

# Step 2: Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    mupdf-tools \
    libmupdf-dev \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Step 3: Set the library path
ENV LD_LIBRARY_PATH=/usr/local/lib

# Step 4: Set the working directory inside the container
WORKDIR /app

# Step 5: Copy the requirements.txt file into the container
COPY requirements.txt .

# Step 6: Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 7: Copy the rest of the application code into the container
COPY . .

# Step 8: Expose the port on which the app will run
EXPOSE 8000

# Step 9: Set environment variables (optional)
ENV APP_ENV=production

# Step 10: Specify the command to run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
