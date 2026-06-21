# Kubernetes Microservice Architecture

## Frontend

A React application built with Vite, TypeScript, and Tailwind CSS.
This application includes a file input and uses NGINX to serve the files.

### Tech Stack

* **React** & **Vite**
* **TypeScript**
* **Tailwind CSS**
* **shadcn**
* **TanStack React Query**
* **React Hook Form**
* **Zod**
* **React Router**

## Server (NodeJs API)

This service acts as the gateway for image uploads. It handles file ingestion, performs initial validation, authenticates with the downstream Go service, and prepares the data for processing.

### Tech Stack

* **Node.js (TypeScript)**
* **Express**
* **Multer**

### Security

* **JSONWebToken (JWT)**: Used for secure server-to-server authentication when forwarding requests to the Go API.
* **CORS**: Handles Cross-Origin Resource Sharing.

### Features

1. **File Ingestion**: Uses `multer` to receive images from the client.
2. **Validation**: Ensures files meet size and format requirements before processing.
3. **Orchestration**: Signs a JWT with service-level claims to authorize the subsequent request to the Go image-processing API.
4. **Data Preparation**: Forwards the file stream to the Go API.

## Backend (Go API)

A high-performance image processing API built with **Gin**. This service performs OCR tasks using concurrency through goroutines to handle multiple files simultaneously, then returns the extracted content to the Node.js API.

### Tech Stack

* **Go (Golang)**
* **Gin**
* **Tesseract OCR**

### Features

* **Concurrent Processing**: Utilizes Go's concurrency model (Goroutines) to process multiple image files in parallel, drastically reducing latency for batch uploads.
* **OCR Engine**: Uses Tesseract to convert images into readable text.
* **Service-to-Service Auth**: Validates incoming JWTs issued by the Node.js API to ensure only trusted services can trigger OCR tasks.

## CI/CD (Github Actions)

1. **Linting & Testing**: Runs to ensure code quality.
2. **Build**: Builds Docker images for the Frontend, Node API, and Go API.
3. **Push**: Pushes images to **Amazon ECR**.
4. **Deploy**: Updates Kubernetes manifests via `kubectl` to trigger rolling updates.

## AWS Infrastructure

Infrastructure is provisioned through Terraform as IaC.

### Architecture

* **VPC CIDR**: `10.0.0.0/24`
* **Availability Zones**: 3 (High Availability across AZs)
* **Public Subnet**: Contains NAT Gateways for outbound internet access.
* **Private Subnet**: Hosts the EKS Control Plane and Worker Nodes.
* **Internet Gateway (IGW)**: Provides ingress/egress for the ALB.
* **NAT Gateways**: Located in public subnets to allow private worker nodes to pull images from ECR/DockerHub securely.
* **ALB**: Provisioned via the AWS Load Balancer Controller.
* **AWS Certificate Manager (ACM)**: Manages TLS/SSL for the ALB.
* **S3 (Remote State)**: Centralized storage for Terraform state.

## AWS EKS in depth

* **Availability**: 3 Replicas per service, distributed across 3 AZs using `topologySpreadConstraints`.
* **Configuration**: Sensitive data is managed via **Kubernetes Secrets**; non-sensitive environment variables via **ConfigMaps**.
* **Networking**: Cluster visibility is handled through Kubernetes **Services**, with external exposure handled by the **Gateway API** on an **AWS ALB**
* **Network Policies**: to secure pod to pod communication.
