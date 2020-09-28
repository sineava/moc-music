## 项目说明
> 因为使用的网上api的原因,对ip每分钟请求次数有限制,所以就不将项目发布上线了

### nginx配置
> 本人对nginx不是很熟悉,所以这只是本地环境的配置(生产环境在setupProxy.js配置)
```
server {
	listen 120;
	server_name localhost;

	location / {
		proxy_pass http://localhost:5000/;
	}

	location /qq {
		rewrite /qq/(.*) /$1  break;
		proxy_pass https://api.qq.jsososo.com/;
	}
}
```

### 后端api文档
[api地址](https://jsososo.github.io/QQMusicApi/#/?id=start)