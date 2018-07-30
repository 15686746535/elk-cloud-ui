pwd
sed -i "s/www.eluchn.com/test.eluchn.com/g" ./nginx/nginx.conf
sed -i "s/www.eluchn.com/test.eluchn.com/g" ./nginx/nginx_dev.conf
sed -i "s/www.eluchn.com/test.eluchn.com/g" ./config/index.js
sed -i "s/ADD nginx\/nginx.conf \/etc\/nginx\//ADD nginx\/nginx_dev.conf \/etc\/nginx\/nginx.conf/g" ./Dockerfile
npm install
npm run build
docker build -t elk-cloud-ui:latest .
docker stop elkui 2>/dev/null
docker rm elkui 2>/dev/null
docker run -itd -p 80:80 -p 443:443 --restart always --name=elkui elk-cloud-ui
