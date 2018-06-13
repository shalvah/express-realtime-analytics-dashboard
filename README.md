# express-realtime-analytics-dashboard
Express app that tracks all requests and displays analytics in realtime in a dashboard

[View tutorial](https://pusher.com/tutorials/realtime-analytics-dashboard-express)

## Prerequisites
- Node.js 8.10.0 or higher
- MongoDB 3.4 or greater
- A [Pusher account](https://pusher.com/signup) and [Pusher app credentials](http://dashboard.pusher.com/)

## Getting started
Clone the project and install dependencies:

```bash
git clone https://github.com/shalvah/express-realtime-analytics-dashboard
cd express-realtime-analytics-dashboard && npm install
```

Copy the `.env.example` file to a `.env` file. Add your Pusher app credentials to this file:
```
PUSHER_APP_ID=your-app-id
PUSHER_APP_KEY=your-app-key
PUSHER_APP_SECRET=your-app-secret
PUSHER_APP_CLUSTER=your-app-cluster
```

Start the app:

```bash
npm start
```

## Built With

* [Pusher](https://pusher.com/) - APIs to enable devs building realtime features
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [Vue](https://vuejs.org) - The progressive web framework
