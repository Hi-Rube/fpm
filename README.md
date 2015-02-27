#fpm -- fibjs package manager#
---
fpm 是[fibjs](http://fibjs.org)的包管理工具
![fpm](https://raw.githubusercontent.com/Hi-Rube/fpm/master/storage/fpm.png)

##安装之前##
你需要安装fibjs， 详细安装步骤请访问http://fibjs.org

##系统支持##
现只支持Unix和Linux系统

##愉快地安装##
so easy
`curl -L storage.fpmjs.org/fpm-install.sh | sh`

##操作简介##
1. 设置
	fpm config set username 和 fpm config set password 设置fpmjs.org的帐号和密码
	设置了之后才能上传自己的包。
	fpm config show -all 查看所有的设置信息

2. 打包
	如果你有一个包想上传比如叫fpm-server你需要进入fpm-server文件夹使用fpm packaging命令生成package.json 文件在里面进行包的详细信息设置

3. 上传
	上传一个包需要进入到文件夹然后使用fpm publish ./  命令将其打包上传

4. 搜索
	使用fpm search 命令搜索包信息 比如fpm search fpm-server 如果 后面加上 -all 参数，将显示详细的信息

5. 下载
	使用fpm download 命令下载你想要的包，包下载后不会自动安装，包会下载到当前目录的.modules文件夹下   如果你想要下载不同的版本使用fpm download <包名> <版本号>

6. 安装
	fpm install 可以安装一个包, 有三种安装方式

	- 第一种:fpm install <包名> <版本名> 比如 fpm install fpm-server 或 fpm install fpm-server 1.0

	- 第二种:全局安装 fpm install -g <包名> 全局安装会分析package.json 中的bin选项，比如bin选项是这样 {"fpm":"/usr/local/lib/fib_modules/.modules/fpm/bin/index.js"} 那就会在/usr/local/bin 下建立软连接 fpm 到 /usr/local/lib/fib_modules/.modules/fpm/bin/index.js
fpm全局包的默认安装目录是/usr/local/lib/fib_modules/.modules 因为现在fibjs 存在这方面的bugs还未修复，所以bin 选项的路径最好是写绝对路径

	- 第三种:直接安装，如果你要安装包的依赖等, 你可以进入包目录然后使用 fpm install 命令, fpm将会自动分析和下载安装依赖,在本目录的.modules文件夹下

	- other:如果包与包之间存在相互依赖，这可能性几乎没，但是如果碰到，在安装时使用fpm install ... -pure 命令， 就是在命令后面加 -pure 参数这样会消除环形依赖

7. 帮助手册
	使用fpm <command> -h 命令 查看该command的详细使用方式

8. fpmjs.org
	所有的包信息都存在fpmjs.org上，你可登录[fpmjs.org](http://fpmjs.org)查看信息和注册账户

9. Bugs
	- web:https://github.com/Hi-Rube/fpm/issues
	- email:353371737@qq.com





