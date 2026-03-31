# Fine Management System (Team 10)

An automated security solution for university campuses that tracks vehicle speed violations and manages fine collections using a dynamic UPI-based payment gateway.

## 🚀 The Core Logic: The "3-Strike" Rule
To balance campus safety with student discipline, our system follows a strict automated penalty threshold:
* **Violations 1, 2, & 3:** The system issues a **Warning**. No fine is charged (Amount: ₹0).
* **Violation 4+:** The system automatically triggers a **Penalty**. A fine of **₹500** is issued.
* **Payment:** Fines are cleared via a dynamic **UPI QR Code** generated specifically for each violation.

---

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Axios (API Handling)
* **Backend:** Node.js, Express.js
* **Database:** MySQL (Relational storage for Students, Vehicles, and Violations)
* **Payment:** UPI Deep-linking & `qrcode.react` for dynamic QR generation

---

## 📁 Project Structure
```text
OS-CBP-Fine-Management-System/
├── backend/           # Node.js + Express API
│   ├── config/        # Database Connection
│   ├── controllers/   # Business Logic (The 500 Rupee Rule)
│   ├── routes/        # API Endpoints
│   └── server.js      # Entry Point
├── frontend/          # React.js App
│   ├── src/
│   │   ├── components/# FineCard, FineList
│   │   └── services/  # API Configurations
└── database/          # SQL Scripts for Schema & Testing

---

⚙️ Setup Instructions

1. Clone the repo

Clone this repo into your local by running:
git clone https://github.com/Vinay8074240/OS-CBP-Fine-Management-System.git

1. Database Setup
Import the schema into MySQL Workbench and run the following to select the DB:
SQL
USE campus_security;

2. Backend Setup

cd backend
npm install
node server.js

3. Frontend Setup

cd frontend
npm install
npm run dev

📸 System Workflow

Detection: Team 8 (Speed Detection) sends a POST request to our /issue endpoint.

Calculation: Backend checks the offense_count in the vehicles table.

Generation: If count > 3, a row is created in the violations table with fine_amount = 500.

Presentation: The React Frontend fetches the violation list.

Transaction: Student scans the QR, pays, and enters the UTR/Transaction ID.

Verification: Admin verifies the UTR against the bank statement to mark as PAID.

Focus: Fine Logic, API Integration, & Payment Gateway

## 📸 App Preview
<p align="center">
  <img src="https://github.com/Vinay8074240/OS-CBP-Fine-Management-System/blob/main/uploads/dashboard-screenshot.png?raw=true" width="800" alt="Team 10 Dashboard">
  <br>
  <b>Figure 1:</b> Automated Fine Portal with Dynamic UPI QR Generation
</p>
