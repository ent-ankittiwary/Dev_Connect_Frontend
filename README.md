# DEV_CONNECT
This is a web platform where different developers can interact with each other,send connection request and make developer friends.

# nginx config
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    location /api/ {
        proxy_pass http://localhost:9193/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
