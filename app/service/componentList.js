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
const Mod = require('../db/modSchema.js');
const Page = require('../db/pageSchema.js');
const cdn = require('cdn');

class ComponentListService extends Service {

	/** 
	 * @desc 组装模板和数据，生成html文件
	 * 
	 */
  async create(req) {
		
		const id = uuidv1();
		// 将获取的数据存为json文件
		console.log('req:',typeof req);
		// 获取req中的属性名
		let docId = req.globalData.documentId;
		console.log('pro', docId);
		// 判断请求是否存在页面id
		if (docId != '') {
			console.log('req.globalData.documentId:', docId);
			console.log('页面已存在');
			return 1;
			// let upData = new Page({

			// })
			// Page.findByIdAndUpdate(docId, upData)
			// .then((res) => {

			// 	return 1;
			// })
			// .catch((err) => {
			// 	console.log('err:', err);
			// 	return 0;
			// })
			
		}

		// 获取模板全部数据
		let tpl = req.componentList;
		console.log('tpl ', tpl);
		let tplName = [],  //模板名数组
				tplData = [];  //模板组装数据数组

		tpl.forEach((val, index) => {
			tplName.push(val.tplName);
			tplData.push(val);
		});
		console.log('tplName:', tplName);
		console.log('tplData:', tplData);
		// 插入
		let newPage = new Page({
			documentId: id,
			documentTitle: req.globalData.documentTitle,
			documentUrl: `${req.globalData.documentTitle}.html`,
			tplName: tplName,
			documentData: tpl
		});
		console.log('newPage: ', newPage);
		Page.create(newPage, (err, res) => {
			if (err) {
				console.log('page create err: ', err);
				return;
			}
			console.log('插入成功');
		})

		// 模板的文档片数组
		let doc = [],
			jsFile = [],
				docs = '',
			jsFiles = '';
		console.log('typeof tplName: ', typeof tplName);
		tplName.forEach((val, index) => {
			Mod.find({
				tplName: val
			}, (err, res) => {
				if (err) {
					console.log('查询模板mods集合失败：', err);
					return;
				}
				console.log('已找到模板', val);
				console.log('index :', index);
				// console.log('res', res)
				// 组装数据及模板
				console.log('res.tplAddress: ', res[0].tplAddress+'/index.hbs');
				console.log('tpl[index].data', tpl[index].data);
				let banner = fs.readFileSync(res[0].tplAddress + '/index.hbs', 'utf-8'),
					mainJs = `<script src="../repo/mods/src/components/modsList/${val}/src/build/main.bundle.js"></script>`,
					data = tpl[index].tplData,
					template = Handlebars.compile(banner),
					templateTpl = template(data);
					doc[index] =  templateTpl;
					jsFile[index] = mainJs;	
					console.log("----------------------")
					console.log('banner:', banner);
					console.log("----------------------")
					console.log('template: ', templateTpl);
					docs += doc[index];
					jsFiles += jsFile[index];
					console.log("----------------------")
					console.log('doc:', docs);
					console.log('js:', jsFiles);

					// 组装公共头部
					let header = `
						<!DOCTYPE html>
						<html>
							<head>
								<meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
								<title>${newPage.documentTitle}</title>
								
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
					let footer = `	</body>
							</html>`;
					const page = header + docs + bottom + jsFiles + footer;
					console.log(page)
					// 生成完整的html页面
					const pageUrl = this.config.baseDir + '/app/public/page/'
					console.log('pageUrl: ', pageUrl);
					fs.writeFile(pageUrl + newPage.documentId + '.html', page, 'utf-8', (err) => {
						if(err) {
							throw err;
							console.log('err')
							return;
						}
						console.log('123')
					});
				})
			
		})
		
		this.ctx.logger.info('some request data: %j', this.ctx.request.body);
		this.ctx.logger.error();
		let url = '139.199.90.238:7001/public/page/' + newPage.documentId + '.html';
		return { url, id };
	}
 
}

module.exports = ComponentListService;
