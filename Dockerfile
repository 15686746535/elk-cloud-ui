FROM nginx
RUN npm install
RUN npm run build
RUN docker build -t elk-cloud-ui:latest .
VOLUME /tmp
ENV LANG en_US.UTF-8
# 移除nginx本来的配置
RUN rm -v /etc/nginx/nginx.conf
#RUN apt-get update
#RUN apt-get install -y vim-common
#RUN apt-get install vim-common
# 加入自定义配置
ADD nginx/nginx.conf /etc/nginx/
# 证书文件加进来
ADD cert /usr/share/nginx/html/
# node编译的前端文件 dist
ADD dist /usr/share/nginx/html/
EXPOSE 80
EXPOSE 443
