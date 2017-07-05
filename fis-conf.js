fis.set('project.ignore', ['*/node_modules/**','node_modules/**','fis-conf.js', '**/README.md', '*/e2e/**', '*/src/module/**', '*/src/architecture/components/**', '*/src/architecture/assets/**', '*/src/architecture/core/**', '*/src/architecture/pipe/**', '*/src/architecture/environments/**', '*/foxcloud-dist/**']);

const RegDefault = /(?:dist\/(.*)\.*)/i;

const releaseToLocal = (name, path, reg) =>    //发布到本地
	fis.media(name).match(reg, {
		release: '/$1',
		deploy: fis.plugin('local-deliver', {
			to: path
		})
	});

const releaseServer = (name, path, reg, ip, fileName = "receiver") =>    //发布到服务器
	fis.media(name).match(reg, {
		release: '/$1',
		deploy: fis.plugin('http-push', {
			receiver: 'http://'+ ip +'/' + fileName,
			to: path
		})
	});

//发布到开发环境
releaseServer("backendDev", "/root/yyui", RegDefault, "61.178.80.85:8999");