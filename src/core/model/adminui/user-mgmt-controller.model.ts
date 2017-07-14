/****************** /noauth/user/account ******************/
//POST
class UserProfile {
	administrativePost : string = "";  //, optional): 行政职务 ,
	administrativeRank : string = "";  //, optional): 行政级别 ,
	birthday : string = "";  //, optional),
	description : string = "";  //, optional): 描述 ,
	email : string = "";  //, optional),
	gender : string = "";  //, optional),
	id : string = "";  //, optional),
	loginName : string = "";  //, optional): 账号 ,
	occupationType : string = "";  //, optional): 岗位系列 ,
	orgId : string = "";  //, optional): 部门Id ,
	password : string = "";  //, optional),
	phone : string = "";  //, optional),
	professionalTitle : string = "";  //, optional): 职称 ,
	roles : RoleProfile[] = [];  //[RoleProfile], optional): 绑定角色 ,
	userName : string = "";  //, optional): 姓名
}
class RoleProfile {
	description : string = "";  //, optional),
	id : string = "";  //, optional),
	name : string = "";  //, optional)
}

/****************** /noauth/organizations ******************/

//FETCH
class OrganizationItem {
	desc : string = "";  //, optional): 部门描述 ,
	description : string = "";  //, optional): 描述 ,
	id : string = "";  //, optional): 部门ID ,
	name : string = "";  //, optional): 机构名 ,
	organizitionName : string = "";  //, optional): 部门名称 ,
	status : string = "";  //, optional): 机构状态
}

/****************** /authsec/user/currentuser ******************/

//FETCH
class UserDetailsItem {
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

class RoleItem {
	description : string = "";  //, optional): 描述 ,
	id : string = "";  //, optional): 角色ID ,
	name : string = "";  //, optional): 角色名 ,
	roleName : string = "";  //, optional): 角色权限名 ,
	status : string = "";  //, optional): 状态
}


export {
	UserProfile,
	RoleProfile,
	OrganizationItem,
	UserDetailsItem,
	RoleItem
}