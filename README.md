# Status Page Application

## Overview
A simplified status page application for managing service statuses, incidents, and real-time updates.

## Features
- Multi-tenant organization setup with subdomains
- Service management (CRUD operations for services)
- Real-time status updates (WebSocket support)
- Incident and maintenance management
- Public-facing status page

## Tech Stack
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Websocket (for real-time updates)
- Authentication: Clerk.js (for user and team management)
- Deployment: Netlify (https://amit-status-page.netlify.app/)

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`
4. Run the development server: `npm start`
