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
        "url": "adminui/noauth/sysdic"
    },
    {
        "desc": "数据字典信息（OWNER）",
        "id": "sysdic.owner",
        "method": "GET",
        "url": "adminui/noauth/sysdic/{_owner}"
    },
    {
        "desc": "数据字典信息（OWNER/FIELD）",
        "id": "sysdic.owner.field",
        "method": "GET",
        "url": "adminui/noauth/sysdic/{_owner}/{_field}"
    },
    {
        "desc": "数据字典信息（OWNER/FIELD/CODE）",
        "id": "sysdic.owner.field.code",
        "method": "GET",
        "url": "adminui/noauth/sysdic/{_owner}/{_field}/{_code}"
    },
    {
        "desc": "登出",
        "id": "uaa.logout",
        "method": "GET",
        "url": "uaa/logout"
    },
    {
        "desc": "登录",
        "id": "uaa.login",
        "method": "POST",
        "url": "uaa/oauth/token?grant_type=password&username={username}&password={password}&client_id=ui&client_secret=secret&login_type=backend"
    },
    /*
     * Cloud-Host Instance List
     */
    {
        "desc": "用户中心-账户管理，创建账号",
        "method": "POST",
        "id": "creat.user.account",
        "url": "adminui/noauth/user/account"
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
        "url": "adminui/noauth/organizations"
    },
    {
        "desc": "依据考题ID，获取考题",
        "method": "GET",
        "id": "authsec.assess",
        "url": "/assess/authsec/assess/{id}"
    },
    {
        "desc": "依据登录用户所属部门/组织机构来检索该部门下的考题",
        "method": "GET",
        "id": "assesslist.orgnization",
        "url": "/assess/authsec/assesslist/orgnization"
    },
    {
        "desc": "依据考卷ID来检索该考卷下的试题列表",
        "method": "GET",
        "id": "assesspaper.assesslist",
        "url": "/assess/authsec/assesspaper/{id}/assesslist"
    },
    {
        "desc": "依据登录用户所属部门/组织机构来检索该部门下的考卷",
        "method": "GET",
        "id": "assesspaperlist.orgnization",
        "url": "/assess/authsec/assesspaperlist/orgnization"
    }
]
