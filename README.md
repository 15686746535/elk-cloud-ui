# 安装项目
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 本地打包启动（WebStorm）会报错Module build failed: Error: No parser and no file path given, couldn't infer a parser.
# 因为是更新成1.13.0崩的  解决办法  降版本
npm install prettier@~1.12.0

# 启动  访问 [http://localhost:9528](http://localhost:9528)
npm run dev

# 构建项目
npm run build

# 构建项目分析日志
npm run build --report

### 构建docker镜像（注意命令最后的小点 ） 
docker build -t elk-cloud-ui:1.0 .

### 启动的docker镜像
docker run -itd -p 7777:80 -v /mnt/:/mnt/ --name elk-cloud-ui --restart unless-stopped  elk-cloud-ui:1.0
```

