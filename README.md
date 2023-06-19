# Food Explorer Backend

#### Technologies used
- NodeJS
- Knex
- Express
- Multer

#### Local setup
```
# Clone the repository with
git clone https://github.com/pedroosz/food-explorer-backend
```

Rename the `.env.example` to `.env` and update its fields
```
PORT=3000
JWT_AUTH_SECRET=""

# Set to false if you dont want to use a local instance of the frontend
DEVELOPMENT=true
DEVELOPMENT_FRONTEND_ENDPOINT=""

# Change this to your production front-end url
FRONTEND_ENDPOINT=""
```

Next steps
```
# Install dependencies
npm install

# Run the migrations
npm run migrate

# Run the project
npm run dev
```

#### Live project
https://food-explorer-frontend-alpha.vercel.app/

#### Front-end repository
https://github.com/pedroosz/food-explorer-frontend
