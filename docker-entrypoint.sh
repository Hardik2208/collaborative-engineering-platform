#!/bin/sh

echo "Waiting for database..."

sleep 10

echo "Applying Prisma migrations..."

npx prisma migrate deploy

echo "Starting server..."

npm run dev