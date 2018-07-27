sed -i "s/www.eluchn.com/www.eluchn.com/g" ./nginx/nginx.conf
sed -i "s/www.eluchn.com/www.eluchn.com/g" ./config/index.js
npm install
npm run build
docker build -t elk-cloud-ui:latest .
docker stop elkui&&docker rm elkui&&docker run -itd -p 80:80 -p 443:443 --restart always --name=elkui elk-cloud-ui
