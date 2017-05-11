import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SiteService {
	constructor(private http: Http,
		private restApiCfg: RestApiCfg,
		private restApi: RestApi) {
	}

	// userInfo = this.restApi.getLoginInfo().userInfo;

	getMenuList(): Promise<any> {

		return new Promise(resolve => {
			resolve([
				{
					"label": "权限管理",
					"isOpen": true,
					"isShow": true,
					"icon": "icon-quanxian",
					"top2_menu": [
						{
							"label": "系统人员管理",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "系统账号管理",
							"isOpen": true,
							"isShow": true,
							"routing": "/index"
						},
						{
							"label": "系统模块管理",
							"isOpen": true,
							"isShow": true,
							"routing": "image-mng/image-mng"
						},
						{
							"label": "考核内容管理",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "考核角色管理",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "考核权限管理",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "考核时限管理",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						}
					]
				},
				{
					"label": "内容管理",
					"isOpen": false,
					"isShow": true,
					"icon": "icon-neirong",
					"top2_menu": [
						{
							"label": "考核表项管理",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "考核表目管理",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						}
					]
				},
				{
					"label": "名录管理",
					"isOpen": false,
					"isShow": true,
					"icon": "icon-mulu",
					"top2_menu": [
						{
							"label": "来源期刊名录",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "核心期刊名录",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "期刊名录检索",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "科研类名录",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "编辑类名录",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "图资类名录",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						}
					]
				},
				{
					"label": "类目管理",
					"isOpen": false,
					"isShow": true,
					"icon": "icon-ziyuan",
					"top2_menu": [
						{
							"label": "编辑项类目",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "科研项类目",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "图资类项目",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "公共项类目",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						}
					]
				},
				{
					"label": "类目管理",
					"isOpen": false,
					"isShow": true,
					"icon": "icon-shengchengmulu",
					"top2_menu": [
						{
							"label": "编辑项类目",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "科研项类目",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "图资类项目",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "公共项类目",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						}
					]
				},
				{
					"label": "类级管理",
					"isOpen": false,
					"isShow": true,
					"icon": "icon-mulu2",
					"top2_menu": [
						{
							"label": "科研项类级",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "编辑项类级",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "图资项类级",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						}
					]
				},
				{
					"label": "计分管理",
					"isOpen": false,
					"isShow": true,
					"icon": "icon-tongjifenxi",
					"top2_menu": [
						{
							"label": "总体考核项",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "附加考核项",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "绩项",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "计分规则",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						},
						{
							"label": "统分规则",
							"isOpen": true,
							"isShow": true,
							"routing": "/test"
						}
					]
				},
			])
		})
	}

}
