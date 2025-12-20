# 📦 Notlify

**Notlify — Event-Driven Orchestration Platform with BullMQ**

Notlify is a developer-centric backend framework demonstrating advanced asynchronous job orchestration, event-driven architecture, and workflow automation using Node.js, TypeScript, Redis, BullMQ, and Prisma.

It showcases a scalable pattern for handling background jobs, chained workflows, distributed event routing, and integration with external services such as email delivery — making it ideal for learning, interview portfolios, and real-world backend automation. :contentReference[oaicite:1]{index=1}

---

## 🎯 Overview

Notlify solves the common problem of orchestrating complex asynchronous work in modern backends:

✔ Event routing and dispatching  
✔ Workflow sequencing (flows) with dependencies  
✔ Robust retry/backoff strategies  
✔ Queue-based email delivery  
✔ Separation of concerns between API, events, workers, and business logic

Unlike a simple task queue example, Notlify implements **full workflows with ordered job execution**, **domain event abstraction**, and right-sized state hydration in workers.

---

## 🚀 Key Features

### ⚙️ Core Architecture

- **Event-Driven Controllers**  
  Controllers emit domain events instead of immediately executing side effects.

- **Event Router**  
  Central dispatcher that routes events into independent queues and workflows.

- **BullMQ Flows**  
  Defines parent → child job dependencies for orchestrated executions.

- **Worker Consumers**  
  Workers perform ordered actions like sending emails or generating tickets.

- **Prisma + PostgreSQL**  
  Reliable schema + database layer for stateful job hydration.

- **Redis + BullMQ**  
  Distributed job queueing with retries, backoff, and observability hooks.

---

## 🧪 Example Workflow

A booking confirmation workflow in Notlify:

1. User books an event
2. Event router emits `BOOKING_CONFIRMED`
3. A **flow** is created:
   - send booking confirmation email
   - then generate tickets
4. Workers consume steps and execute them reliably

Each step is isolated, retryable, and order-guaranteed.

---

## 📦 Tech Stack

| Component | Technology |
|-----------|------------|
| Language | TypeScript |
| Server | Node.js + Express |
| Database | PostgreSQL (Prisma ORM) |
| Queue | Redis + BullMQ |
| Workflow | BullMQ FlowProducer |
| Email | Resend API |
| Env Management | Dotenv |

---

## 🧰 Prerequisites

Make sure you have the following installed:

- Node.js >= 18.x
- npm or yarn
- Redis Server running locally or remote
- PostgreSQL database (Neon/Supabase/RDS)
- Resend API Key for email

---

