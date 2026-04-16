# co-ordinates-logger-api

**Archived.** The co-ordinates / position-logging backend for the **Hot Air Balloon Tracker** project. A RESTful Express API for registering devices, logging positions, and authenticating users.

Package name: `rest-coords-api`.

## About the balloon project

A university-era project for launching weather balloons and recovering them after burst. The system integrates live telemetry from HAB Hub (the amateur high-altitude-ballooning telemetry network), a landing-prediction model, and a chase-team navigation UI so ground teams can drive to the right field before the payload hits the grass.

## What this repo is

An Express + MongoDB API that owns the user + device + position data for the balloon tracking system.

## Endpoints (from `app.js`)

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/login` | Authenticate a user, issue a JWT |
| POST | `/api/create/...` | Create resources (devices, positions) |
| GET  | `/api/find/devices` | List registered devices |
| GET  | `/api/find/positions` | List logged positions |
| POST | `/api/delete` | Delete resources |

Also runs a **cron job** (`actions/Cron.js`) that emails users when their most recent log is getting stale (via `nodemailer`).

## Tech stack

- **Node.js** + **Express**
- **Mongoose** (MongoDB)
- **bcryptjs** + **jwt-simple** + **passport-jwt** for auth
- **nodemailer** for email notifications
- **node-cron** for scheduled jobs (stale-log alerts)
- **Pug** for any server-rendered emails/views
- **moment** for time handling
- **body-parser**, **compression**, **cors**

## Structure

```
app.js              # Express entry
authentication/     # JWT / passport config
Routes/
  Login.js
  Create.js
  Find/Devices.js
  Find/Positions.js
  Delete.js
actions/
  Cron.js           # Stale-log email cron
models/             # Mongoose schemas (User, Device, Position)
config/
```

## Running

```bash
npm install
node app.js
```

Needs MongoDB running.

## Related projects

The hot air balloon ecosystem in this org:

- [`balloon-tracker`](https://github.com/gitpancake/balloon-tracker) — main server — HAB Hub ingestion + landing prediction + navigation
- [`balloon-tracker-ui`](https://github.com/gitpancake/balloon-tracker-ui) — React frontend for visualizing the tracker
- [`co-ordinates-tracker-dashboard`](https://github.com/gitpancake/co-ordinates-tracker-dashboard) — admin dashboard for managing users of the co-ordinates system
