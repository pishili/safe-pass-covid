# safe-pass-covid

## Frontend Setup
```zsh
npx create-react-app client
cd client
npm start
```

## Backend Setup
```zsh
npx express-generator api
cd api
npm install
npm start
```

## Database Setup
- created docker-compose.yml
- in ports I changed the port of 5432 to 5672
- after running docker, ran the Postico to check the database
```zsh
docker-compose down && docker-compose up
```
