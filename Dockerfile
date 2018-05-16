FROM nginx
VOLUME /tmp
ENV LANG en_US.UTF-8
# 移除nginx本来的配置
RUN rm -v /etc/nginx/nginx.conf
# 加入自定义配置
ADD nginx/nginx.conf /etc/nginx/
# node编译的前端文件
ADD dist /usr/share/nginx/html/
EXPOSE 80
EXPOSE 443
