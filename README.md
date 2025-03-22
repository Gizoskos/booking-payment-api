### **Booking-Payment-API Project**
This project is built to demonstrate the use of Kubernetes and Docker for deploying and managing a microservices architecture. The system includes a booking service and a payment service, both backed by a PostgreSQL database. The project is designed to showcase how Kubernetes can handle service orchestration, scaling, and database persistence in a containerized environment.

## **Prerequisites**
Before running the project, ensure you have the following tools installed:

Docker (for containerization)

Kubernetes (for orchestration)

Minikube (for Kubernetes on your local machine)

kubectl (Kubernetes CLI)

pgAdmin (for managing PostgreSQL databases)

## **Project Setup**
Step 1: Clone the Repository
Clone this repository to your local machine using:

bash
Copy
git clone https://github.com/yourusername/booking-payment-api.git
cd booking-payment-api

Step 2: Install Dependencies
Each microservice has its own set of dependencies. You can install them by running the following commands for each service.

For Booking Service:
Navigate to the booking-service folder:

bash
Copy
cd booking-service
##**Install dependencies:**

bash
Copy
npm install
For Payment Service:
Navigate to the payment-service folder:

bash
Copy
cd ../payment-service
Install dependencies:

bash
Copy
npm install
## **For Database Initialization:**
Navigate to the database folder and ensure the necessary init.sql file exists for database initialization.

Step 3: Start the Services with Docker Compose
In the root of the project directory, run the following command to build and start all services using Docker Compose.

bash
Copy
docker-compose up --build
This command will start the postgres database container along with the booking-service and payment-service containers.

Step 4: Deploy the Application to Kubernetes
Once everything is set up, deploy the application on your Kubernetes cluster.

Start Minikube (if using Minikube):

bash
Copy
minikube start
Deploy Kubernetes resources: Apply the Kubernetes deployment files to create your pods, services, and persistent volumes:

bash
Copy
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
kubectl apply -f kubernetes/ingress.yaml
Check the status of your pods:

bash
Copy
kubectl get pods
Port-forward to access the services: To access the services locally:

bash
Copy
kubectl port-forward service/postgres-service 5431:5432
kubectl port-forward service/booking-service 3001:3001
kubectl port-forward service/payment-service 3002:3002
Step 5: Verify and Monitor the Application
Use the following commands to check the status of your Kubernetes pods and services:

Check pod status:

bash
Copy
kubectl get pods
Check service status:

bash
Copy
kubectl get svc
Check node metrics (if metrics-server is enabled):

bash
Copy
kubectl top nodes
kubectl top pods
Step 6: Test the Application
You can test the booking and payment services by sending HTTP requests using a tool like Postman or curl.

Booking service:

POST to http://localhost:3001/api/bookings with the JSON body:

json
Copy
{
  "user_id": 1,
  "payment_id": 1
}
Payment service:

POST to http://localhost:3002/api/payments with the JSON body:

json
Copy
{
  "user_id": 1,
  "amount": 100.00
}
Step 7: Project Structure (File Tree)
Here is the project file structure:

pgsql
Copy
booking-payment-api/
├── booking-service/
│   ├── controllers/
│   ├── models/
│   ├── node_modules/
│   ├── package.json
│   ├── routes/
│   ├── server.js
├── payment-service/
│   ├── controllers/
│   ├── models/
│   ├── node_modules/
│   ├── package.json
│   ├── routes/
│   ├── server.js
├── database/
│   ├── init.sql
├── kubernetes/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
├── docker-compose.yaml
└── README.md
Step 8: Clean Up
To stop the application and remove the containers, use:

bash
Copy
docker-compose down
To clean up Kubernetes resources:

bash
Copy
kubectl delete -f kubernetes/deployment.yaml
kubectl delete -f kubernetes/service.yaml
kubectl delete -f kubernetes/ingress.yaml
Technologies Used
Kubernetes: For orchestration and scaling of services.

Docker: For containerizing services and database.

PostgreSQL: For database management.

Node.js & Express: Backend framework for building RESTful APIs.

Docker Compose: For managing multi-container Docker applications.

### **Conclusion**
This project serves as a demonstration of how to deploy microservices in a Kubernetes environment, using Docker containers for packaging the services and a PostgreSQL database. The project emphasizes database persistence, scaling, and inter-service communication.

Feel free to fork and modify the project according to your needs!
