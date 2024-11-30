# **Status Page Application**

## **Overview**
A simplified status page application designed to manage service statuses, incidents, and real-time updates. This application provides a seamless experience for administrators to manage services and their statuses, while offering a public-facing page for users to view service updates.

---

## **Features**

### **Core Features**
- Multi-tenant organization setup with subdomains.
- **User Authentication**:
  - Manual email/password login.
  - Google Sign-In/Sign-Up integration.
- **Service Management**:
  - CRUD operations for services (e.g., "Website", "API").
  - Manage service statuses: *Operational*, *Degraded Performance*, *Partial Outage*, *Major Outage*.
- **Incident and Maintenance Management**:
  - Log, update, and resolve incidents or scheduled maintenance.
  - Associate incidents with specific services.
  - Add real-time updates to ongoing incidents.
- **Real-Time Updates**:
  - WebSocket integration for instant status updates.
- **Authorization Levels**:
  - **Owner, Member, Admin**: Full CRUD permissions.
  - **Viewer**: Read-only access to public pages.

### **Public-Facing Features**
- Dedicated pages for Sign-In, Sign-Up, and Onboarding.
- Public status page to view the real-time status of services.
- Access to the demo of public pages displaying all joined organizations.
- Timeline of incidents and status changes.

### **Enhancements**
- Backend validation for all fields.
- UI built with **ShadcnUI** for a clean, consistent design.
- Role-based access control ensuring secure operations.
  
---

## **Tech Stack**

### **Frontend**
- **React.js**: Component-based frontend development.
- **Tailwind CSS**: Responsive and utility-first styling.
- **ShadcnUI**: Clean and minimalistic UI components.

### **Backend**
- **Node.js**: Backend logic and API handling.
- **WebSocket**: Real-time data updates to connected clients.
- **Clerk.js**: User and team authentication and management.

### **Deployment**
- **Netlify**: Deployed at [Status Page Application](https://amit-status-page.netlify.app/).

---

## **Database Schema**

### **Sample Tables**
1. **Users**:
   - Email, password (hashed), roles (Admin, Member, Viewer).
2. **Organizations**:
   - Multi-tenant setup with organization details.
3. **Services**:
   - Name, description, status (*Operational*, *Degraded*, etc.).
4. **Incidents**:
   - Details of incidents linked to services.
5. **Incident Updates**:
   - Timelines of updates for ongoing incidents.

---

## **Setup Instructions**

### **Prerequisites**
- Node.js installed (v14 or above).
- A Clerk.js account for authentication setup.

### **Steps**
1. **Clone the Repository**  
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```
2. **Install Dependencies**  
   ```bash
   npm install
   ```
3. **Environment Variables**  
   Create a `.env` file in the root directory with the following keys:
   ```env
   DATABASE_URL=<your_database_url>
   CLERK_API_KEY=<your_clerk_api_key>
   JWT_SECRET=<your_jwt_secret>
   ```
4. **Run Development Server**  
   ```bash
   npm start
   ```

5. **Access the Application**  
   - Admin Panel: `http://localhost:3000/admin`
   - Public Status Page: `http://localhost:3000`

---

## **Demo and Deployment**
- Live URL: [https://amit-status-page.netlify.app/](https://amit-status-page.netlify.app/)
- Demo Credentials:  
  - Email: `demo@example.com`  
  - Password: `password123`

---

## **Optional Stretch Features**
- Email notifications for status changes.
- Metric graphs for uptime analysis.
- External status check API.

--- 
