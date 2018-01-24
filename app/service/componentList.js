'use strict';

const clone = require('git-clone');
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const Handlebars = require('handlebars');

class ComponentListService extends Service {
  async get(id) {
    const fileName = path.resolve(this.config.db.dir, `${id}.json`);
    const result = await readFile(fileName, 'utf8');
    return result;
  }

	/** 
	 * @desc 组装模板和数据，生成html文件
	 * 
	 */
  async create(req) {
		const id = uuidv1();
		// 将获取的数据存为json文件
		console.log('req-tyep:', typeof req)
    const fileName = path.resolve(this.config.db.dir, `${id}.json`);
    await writeFile(fileName, JSON.stringify(req), 'utf-8');

		let modFolder = fs.readdirSync('app/public/modules');
		console.log('modFolder:', modFolder);

		if (modFolder.includes(`${req.title}`)) {
			console.log('模板已存在');
		}else {
		
			// // 生成模板文件夹
			// let folder = fs.mkdirSync('app/public/modules/' + `${req.title}`);
			// console.log('folder:', folder);

			// // clone仓库链接
			// let repo = 'git@git.coding.net:liangbijie02/magic-build.git';

			// // clone代码存放的目标文件
			// let targetPath = path.resolve(this.config.baseDir, '', 'app/public/modules/' + `${req.title}` + '/');
			// console.log('targetPath', targetPath);
			
			// // 从coding clone模板代码
			// clone(repo, targetPath, res => { }); 
		}

			// 获取模板和默认数据路径
			let modFile = path.resolve(this.config.tplFile.dir, '', `${req.title}` + '/src/build/index.hbs')
			console.log('modFile:', modFile);
			let helperFile = path.resolve(this.config.tplFile.dir, '', `${req.title}` + '/src/build/helpers')

			// console.log('modFile:', modFile);
			// console.log('dataFile:', dataFile);
			// console.log('helperFile', helperFile)
			// console.log('----------------------')
			
			let banner = fs.readFileSync(modFile, 'utf-8');
			// let data = fs.readFileSync(dataFile, 'utf-8');
			// let helperName = fs.readdirSync(helperFile,'utf-8')


			// 同步读取模板代码和数据
			// let banner = fs.readFileSync('app/public/modules/' + ``, 'utf-8');
			let data = req;
			console.log('banner-type', typeof banner);
			console.log('----------------------')
			console.log('data-type:', typeof data)
			console.log('----------------------')
			// console.log('helperName:', helperName)
			// console.log('----------------------')			
			// Handlebars.registerHelper(helperName)
			// console.log('registerHelper(helperName)', Handlebars.registerHelper(helperName))

			// 将hbs解析，并填入数据
			let tpl = Handlebars.compile(banner);
			console.log('tpl:')
			console.log(tpl)
			console.log('data:', data)
			let template = tpl(data);
			console.log('---------------template------------------');
			console.log(template);
			console.log('template type:', typeof template);
			console.log('---------------template------------------');

			// 组装公共头部
			let header = `
			<!DOCTYPE html>
			<html>
				<head>
					<meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
					<title>${req.title}</title>
					
					<link rel="stylesheet" href="https://cdn.staticfile.org/minireset.css/0.0.2/minireset.css">
					<style>
						body {
								width: 7.5rem;
								background: #dddddd;
						}
						.serverHeaer {
								font-size: .30rem;
						}
						.serverFooter {
								font-size: .30rem;
						}
					</style>
					<script>
						(function () {
							window.resetRem = window.resetRem || function () {
								document.documentElement.style.fontSize = (100 * window.document.documentElement.getBoundingClientRect().width / 750) + 'px'
							}
							window.removeEventListener('resize', window.resetRem)
							window.addEventListener('resize', window.resetRem)
							window.resetRem()
						})()
					</script>
    			<script src="http://cdn.staticfile.org/zepto/1.2.0/zepto.min.js"></script>
				</head>
				<body>
						<h1 class="serverHeaer">这里是服务器环境头部</h1>
						<ul id="modsWrap">`;
			let bottom = `</ul>
						<h1 class="serverFooter">这里是服务器环境底部</h1>`
			let jsFile = `<script src="../modules/${req.title}/src/build/main.bundle.js"></script>`
			let footer = `	</body>
				</html>`;
			const page = header + template + bottom + jsFile + footer;
			// 生成完整的html页面
			writeFile('app/public/page/' + `${req.title}.html`, page, 'utf-8');
			
		let url = `${req.title}.html`;
		return { url, id };
		console.log('url:', url);
	}
 
}

module.exports = ComponentListService;
