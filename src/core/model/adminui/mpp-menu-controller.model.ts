class MenuItem {
  children: MenuItem[]; //[MenuItem], optional),
  code: string; //, optional),
  id: string; //, optional),
  name: string; //, optional),
  routing: string; //, optional),
  status: string; //, optional)
}
class UserItem {
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
class PageInfo {
  currentPage: number; //, optional),
  pageSize: number; //, optional),
  totalPage: number; //, optional),
  totalRecords: number; //, optional)
}
class UserProfile {
  address: string; //, optional),
  administrativePost: string; //, optional): 行政职务 ,
  administrativeRank: string; //, optional): 行政级别 ,
  birthday: string; //, optional),
  description: string; //, optional): 描述 ,
  email: string; //, optional),
  gender: string; //, optional),
  id: string; //, optional),
  loginName: string; //, optional): 账号 ,
  occupationType: string; //, optional): 岗位系列 ,
  orgId: string; //, optional): 部门Id ,
  password: string; //, optional),
  phone: string; //, optional),
  professionalTitle: string; //, optional): 职称 ,
  roles: RoleProfile[]; //[RoleProfile], optional): 绑定角色 ,
  userName: string; //, optional): 姓名
}
class RoleProfile {
  description: string; //, optional),
  id: string; //, optional),
  name: string; //, optional)
  roleDetailsItem: string;
  roleName: string;
}

export {
  MenuItem,
  UserItem,
  PageInfo,
  UserProfile,
  RoleProfile
}