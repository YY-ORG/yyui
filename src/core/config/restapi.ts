import { RestApiModel } from '../model/rest';

export let RestApis: RestApiModel[] = [
    /*
     * Cloud-Host Order
     */
    // 数据字典
    {
        "desc": "全部数据字典信息",
        "id": "sysdic",
        "method": "GET",
        "url": "basis/authsec/sysdic"
    },
    {
        "desc": "数据字典信息（OWNER）",
        "id": "sysdic.owner",
        "method": "GET",
        "url": "basis/authsec/sysdic/{_owner}"
    },
    {
        "desc": "数据字典信息（OWNER/FIELD）",
        "id": "sysdic.owner.field",
        "method": "GET",
        "url": "basis/authsec/sysdic/{_owner}/{_field}"
    },
    {
        "desc": "数据字典信息（OWNER/FIELD/CODE）",
        "id": "sysdic.owner.field.code",
        "method": "GET",
        "url": "basis/authsec/sysdic/{_owner}/{_field}/{_code}"
    },
    {
        "desc": "登出",
        "id": "uaa.logout",
        "method": "GET",
        "url": "uaa/logout"
    },
    /*
     * Cloud-Host Instance List
     */
    {
        "desc": "用户中心-账户管理，创建账号",
        "method": "POST",
        "id": "creat.user.account",
        "url": "adminui/authsec/user/account"
    },
    {
        "desc": "获取当前用户信息",
        "method": "GET",
        "id": "user.currentuser",
        "url": "adminui/authsec/user/currentuser"
    },
    {
        "desc": "用户中心-获取部门",
        "method": "GET",
        "id": "user.organizations",
        "url": "adminui/authsec/organizations"
    },
]
