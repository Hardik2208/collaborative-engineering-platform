# 🚀 Collaborative Engineering Platform

<p align="center">

**Multi-Tenant Collaboration • Sprint Management • Task Orchestration • Engineering Analytics • Secure Workspace Isolation**

</p>

---

# 🌐 Live Demo

**Application:** https://collaborative-engineering-platform.onrender.com

### Demo Account

```text
Email: demo@collabengineer.com
Password: Demo@1234
```

---

# 🔥 Core Philosophy

> Engineering teams do not fail because they have too many tasks.
>
> Teams fail because work becomes fragmented, ownership becomes unclear, and progress becomes invisible.

Collaborative Engineering Platform is a multi-tenant engineering execution system designed to help organizations manage:

- Team collaboration
- Workspace isolation
- Sprint planning
- Task execution
- Activity tracking
- Progress visibility
- Engineering workflows

The platform provides a structured hierarchy that mirrors how modern software organizations operate.

```text
Organization
     ↓
Workspace
     ↓
Sprint
     ↓
Task Group
     ↓
Task
```

---

# 🏗 System Architecture

![Architecture Diagram](./assets/Architecture%20Diagram.png)

The platform follows a layered architecture separating authentication, business logic, persistence, and access control.

```text
React Frontend
        │
        ▼
 REST API Layer
        │
        ▼
Node.js + Express
        │
 ┌──────┴────────┐
 ▼               ▼
JWT Auth      Business Modules
 ▼               ▼
Middleware    Prisma ORM
        │
        ▼
PostgreSQL
```

## Architectural Principles

- Stateless APIs
- Role-Based Authorization
- Multi-Tenant Isolation
- Modular Service Architecture
- Scalable Workspace Design
- Secure Session Management

---

# 🗄 Multi-Tenant Domain Architecture

The platform is built around strict tenant boundaries.

```text
User
 │
 ▼
Organization Membership
 │
 ▼
Organization
 │
 ├─────────────┐
 ▼             ▼
Workspace   Workspace
 │             │
 ▼             ▼
Sprint      Sprint
 │             │
 ▼             ▼
TaskGroup   TaskGroup
 │             │
 ▼             ▼
Task        Task
```

Each workspace maintains complete isolation from every other workspace while remaining part of the same organization.

This architecture enables:

- Team Separation
- Independent Sprint Execution
- Workspace-Level Analytics
- Controlled Collaboration
- Secure Resource Access

---

# 🔐 Authentication & Access Control

Authentication is implemented using JWT-based session management with refresh token rotation.

## Authentication Flow

```text
Login
   ↓
Access Token
   ↓
Protected APIs
   ↓
Expiration
   ↓
Refresh Token
   ↓
New Access Token
```

## Security Features

- JWT Authentication
- Refresh Token Rotation
- Session Persistence
- Protected Routes
- Organization Validation
- Workspace Validation
- Role-Based Authorization
- Access Middleware Enforcement

Access is enforced at every layer.

```text
Authentication
        ↓
Organization Access
        ↓
Workspace Access
        ↓
Resource Access
```

---

# 📋 Engineering Workflow Model

The platform follows a sprint-driven execution model.

```text
Organization
      ↓
Workspace
      ↓
Sprint
      ↓
Task Groups
      ↓
Tasks
```

Example Workflow:

```text
Frontend Platform
       ↓
Q3 Modernization Sprint
       ↓
UI Team
       ↓
Authentication Redesign
```

This structure enables:

- Sprint Planning
- Team Ownership
- Work Categorization
- Progress Tracking
- Clear Accountability

---

# 📊 Dashboard Intelligence

![Workspace Dashboard](./assets/Workspace%20Dashboard.png)

Every workspace maintains its own analytics dashboard.

## Tracked Metrics

```text
Total Tasks

Todo Tasks

In Progress Tasks

Completed Tasks

Active Sprint

Recent Activity
```

Dashboard aggregation is computed per workspace to ensure strict isolation and accurate reporting.

### Key Insight

```text
Workspace Metrics
       ≠
Organization Metrics
```

Every dashboard represents only the selected workspace.

---

# 📈 Task Lifecycle

Tasks progress through a controlled workflow.

```text
TODO
   ↓
IN_PROGRESS
   ↓
DONE
```

## Task Metadata

Each task contains:

- Title
- Description
- Priority
- Sprint
- Assignee
- Task Group
- Creator
- Creation Timestamp
- Update Timestamp

### Priorities

```text
LOW

MEDIUM

HIGH

CRITICAL
```

---

# 📂 Task Management

![Task Board](./assets/Task%20Board.png)

Task Groups act as organizational units.

Examples:

```text
Frontend Team

Backend Team

Infrastructure Team

Product Team
```

Benefits:

- Reduced Task Clutter
- Clear Ownership
- Structured Execution
- Better Team Coordination

---

# 🏃 Sprint Management

Sprints provide bounded execution windows.

## Sprint Lifecycle

```text
PLANNED
      ↓
ACTIVE
      ↓
COMPLETED
```

Capabilities:

- Sprint Creation
- Sprint Activation
- Sprint Completion
- Workspace Association
- Progress Tracking

Only one sprint can actively drive execution within a workspace at a time.

---

# 📜 Activity Tracking

![Activity Feed](./assets/Activity%20Feed.png)

Every significant workspace action generates an activity event.

Examples:

```text
Task Created

Task Updated

Task Completed

Sprint Started

Sprint Completed

Task Group Created
```

This creates a complete audit trail of engineering activity.

Benefits:

- Accountability
- Traceability
- Team Visibility
- Historical Tracking

---

# 🗄 Database Design

![ER Diagram](./assets/ER%20Diagram.png)

## Core Entities

```text
User

RefreshToken

Organization

OrganizationMembership

Workspace

Sprint

TaskGroup

Task

ActivityEvent
```

## Relationship Structure

```text
User
 ├── RefreshToken
 ├── OrganizationMembership
 │
 ▼
Organization
 │
 ▼
Workspace
 ├── Sprint
 ├── TaskGroup
 ├── Task
 └── ActivityEvent
```

The schema is designed to maintain tenant isolation while supporting collaboration across multiple teams.

---

# 📸 Application Screenshots

## Authentication

![Login](./assets/Login%20Page.png)

---

## Organization Overview

![Organization Overview](./assets/Organization%20Overview.png)

---

## Workspace Dashboard

![Dashboard](./assets/Workspace%20Dashboard.png)

---

## Task Management Board

![Task Board](./assets/Task%20Board.png)

---

## Activity Feed

![Activity Feed](./assets/Activity%20Feed.png)

---

# ⚙ Technology Stack

## Frontend

```text
React
TypeScript
Vite
Tailwind CSS
TanStack Query
React Router
```

## Backend

```text
Node.js
Express.js
TypeScript
```

## Database

```text
PostgreSQL
Prisma ORM
```

## Authentication

```text
JWT
Refresh Tokens
RBAC
```

## Infrastructure

```text
Docker
Docker Compose
Nginx
HTTPS
```

## Deployment

```text
Render
AWS EC2
```

---

# 📂 Project Structure

```text
src
│
├── modules
│   ├── auth
│   ├── organizations
│   ├── workspaces
│   ├── sprints
│   ├── task-groups
│   ├── tasks
│   ├── dashboard
│   └── activity
│
├── core
│   ├── middleware
│   ├── utils
│   ├── responses
│   └── errors
│
├── shared
│   └── prisma
│
└── server.ts
```

---

# 🔗 API Design

The platform follows a hierarchical REST architecture.

```text
/api/auth

/api/organizations

/api/organizations/:orgSlug

/api/organizations/:orgSlug/workspaces

/api/organizations/:orgSlug/workspaces/:workspaceSlug

/api/organizations/:orgSlug/workspaces/:workspaceSlug/dashboard

/api/organizations/:orgSlug/workspaces/:workspaceSlug/sprints

/api/organizations/:orgSlug/workspaces/:workspaceSlug/task-groups

/api/organizations/:orgSlug/workspaces/:workspaceSlug/tasks

/api/organizations/:orgSlug/workspaces/:workspaceSlug/activity
```

---

# ☁ Deployment Architecture

```text
Frontend
      ↓
Render
      ↓
HTTPS
      ↓
Backend APIs
      ↓
Node.js + Express
      ↓
Prisma ORM
      ↓
PostgreSQL
```

Production deployment includes:

- HTTPS Encryption
- Dockerized Infrastructure
- Environment Isolation
- Persistent Database Storage
- Refresh Token Authentication

---

# 🚀 Local Development

## Clone Repository

```bash
git clone <repository-url>
cd collaborative-engineering-platform
```

## Install Dependencies

```bash
npm install
```

## Configure Environment

Create a `.env` file:

```env
PORT=3000

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/collab_engineering

JWT_SECRET=your_secret

JWT_EXPIRES_IN=15m
```

## Start Infrastructure

```bash
docker compose up -d
```

## Run Backend

```bash
npm run dev
```

---

# 🧪 Testing

Run unit and integration tests:

```bash
npm run test
```

---

# 🎯 Future Roadmap

Planned enhancements include:

```text
Real-Time Collaboration

WebSocket Notifications

File Attachments

Advanced Analytics

Sprint Burndown Charts

Team Velocity Metrics

CI/CD Integration

Kubernetes Deployment

AI-Assisted Sprint Planning
```

---

# 👨‍💻 Author

**Hardik Raghuvanshi**

B.Tech Undergraduate | Full Stack Developer

---

# ⚔ Engineering Insight

Collaborative Engineering Platform is not simply a task manager.

It is a study of:

```text
Organization
        ↓
Ownership
        ↓
Execution
        ↓
Visibility
        ↓
Delivery
```

The platform models how modern engineering teams structure work, coordinate execution, and measure progress across multiple teams and workspaces.

---

# ⭐ Highlights

- Multi-Tenant Architecture
- Workspace Isolation
- JWT Authentication
- Refresh Token Rotation
- Sprint-Based Workflow Management
- Activity Tracking System
- Dashboard Analytics
- Dockerized Deployment
- PostgreSQL + Prisma ORM
- Type-Safe Backend Development
- Production Hosting
- Secure Access Control