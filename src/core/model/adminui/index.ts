export namespace Adminui {
	export class MenuItem {
		children: MenuItem[] = []; //[MenuItem], optional),
		code: string = ""; //, optional),
		id: string = ""; //, optional),
		name: string = ""; //, optional),
		routing: string = ""; //, optional),
		status: string = ""; //, optional)
		selected: boolean = false;
	}
	export class UserItem {
		description: string; //, optional): 描述 ,
		email: string; //, optional): 邮件 ,
		id: string; //, optional): 角色ID ,
		loginName: string; //, optional): 账号 ,
		organizationName: string; //, optional): 部门名/机构名 ,
		phone: string; //, optional): 联系电话 ,
		roleName: string; //, optional): 角色名 ,
		status: string; //, optional): 用户状态 ,
		type: number; //, optional): 是否 AD 用户,0 不是，1 是，注意是数字，不是字符 ,
		userName: string; //, optional): 用户名
	}
	export class PageInfo {
		currentPage: number; //, optional),
		pageSize: number; //, optional),
		totalPage: number; //, optional),
		totalRecords: number; //, optional)
	}
	export class UserProfile {
		administrativePost : string = "";  //, optional): 行政职务 ,
		administrativeRank : string = "";  //, optional): 行政级别 ,
		birthday : string = "";  //, optional),
		description : string = "";  //, optional): 描述 ,
		email : string = "";  //, optional),
		gender : string = "";  //, optional),
		userId : string = "";  //, optional),
		loginName : string = "";  //, optional): 账号 ,
		occupationType : string = "";  //, optional): 岗位系列 ,
		orgId : string = "";  //, optional): 部门Id ,
		password : string = "";  //, optional),
		phone : string = "";  //, optional),
		professionalTitle : string = "";  //, optional): 职称 ,
		roles : RoleProfile[] = [];  //[RoleProfile], optional): 绑定角色 ,
		userName : string = "";  //, optional): 姓名
	}
	export class RoleProfile {
		description : string = "";  //, optional),
		id : string = "";  //, optional),
		name : string = "";  //, optional)
		selected : boolean = false
	}

	export class OrganizationItem {
		desc : string = "";  //, optional): 部门描述 ,
		description : string = "";  //, optional): 描述 ,
		id : string = "";  //, optional): 部门ID ,
		name : string = "";  //, optional): 机构名 ,
		organizitionName : string = "";  //, optional): 部门名称 ,
		status : string = "";  //, optional): 机构状态
		leaderId : string = "" // , optional): 部门leaderID
		leaderName : string = "" // , optional): 部门leader
		serial : string = "" // , optional): 部门serial
	}

	export class UserDetailsItem {
		description : string = "";  //, optional),
		email : string = "";  //, optional),
		enterpriseAuthMode : string = "";  //, optional): 企业认证类型 ,
		enterpriseId : string = "";  //, optional),
		enterpriseName : string = "";  //, optional),
		enterpriseType : string = "";  //, optional),
		isAD : boolean;  //, optional),
		ldapId : string = "";  //, optional),
		ldapName : string = "";  //, optional),
		leaderId : string = "";  //, optional),
		leaderName : string = "";  //, optional),
		loginName : string = "";  //, optional),
		organizationId : string = "";  //, optional),
		organizationName : string = "";  //, optional),
		organizations : OrganizationItem[] = [];  //[OrganizationItem], optional),
		password : string = "";  //, optional),
		phone : string = "";  //, optional),
		roles : RoleItem[] = [];  //[RoleItem], optional),
		status : string = "";  //, optional),
		userId : string = "";  //, optional),
		userName : string = "";  //, optional)
	}

	export class RoleItem {
		description : string = "";  //, optional): 描述 ,
		id : string = "";  //, optional): 角色ID ,
		name : string = "";  //, optional): 角色名 ,
		roleName : string = "";  //, optional): 角色权限名 ,
		status : string = "";  //, optional): 状态
		selected : boolean = false;
	}

	export class RoleDetailsItem {
		menus: MenuItem[] = []; // [MenuItem], optional),
		roleId: string = ""; // , optional),
		roleName: string = ""; // , optional)
	}

	export class OrganizationProfile {
		description: string = "" //, optional): 描述
		id: string = "" //, optional): 部门ID
		leaderId?: string = "" //, optional): 部门负责人ID
		name: string = "" //, optional): 部门名称
		serial?: string = "" //, optional): 部门系列
	} 
	export class PasswordProfile {
		id: string //, optional)
		newPassword: string //, optional): 新密码
		password: string //, optional): 当前密码
		 
	} 
}
