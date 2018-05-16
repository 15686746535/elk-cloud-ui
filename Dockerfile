FROM nginx
VOLUME /tmp
ENV LANG en_US.UTF-8
# 移除nginx本来的配置
# RUN rm -v /etc/nginx/nginx.conf
# 加入自定义配置
COPY nginx/nginx.conf /etc/nginx/
# node编译的前端文件
ADD dist /usr/share/nginx/html/
# 使自定义配置生效
# RUN echo "daemon off;" >> /etc/nginx/nginx.conf
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
EXPOSE 443
