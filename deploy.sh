#!/bin/bash

# Build the project
pnpm run build

# Copy the dist folder to the EC2 instance
scp -r dist/ ubuntu@pwa:/home/ubuntu/

# Move the files from the dist folder to /var/www/html/
ssh pwa 'sudo mv /home/ubuntu/dist/* /var/www/html/'