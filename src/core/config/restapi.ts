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
        "desc": "获得所有菜单",
        "method": "GET",
        "id": "mpp.menu.tree",
        "url": "adminui/authsec/mpp/menu/tree"
    },
    {
        "desc": "根据一个角色获得菜单--view",
        "method": "GET",
        "id": "user.mpp.menu.tree",
        "url": "adminui/authsec/mpp/menu/tree/{role_id}"
    },
    {
        "desc": "角色管理--分配权限",
        "method": "POST",
        "id": "role.tree",
        "url": "adminui/authsec/adm/role/menu"
    },
    {
        "desc": "用户中心-账户管理，获得属于指定机构下所有用户",
        "method": "GET",
        "id": "users.organization",
        "url": "adminui/authsec/adm/users/organization/{organization_id}/page/{page}/size/{size}"
    },
    {
        "desc": "用户中心-账户管理，获取所有账户",
        "method": "GET",
        "id": "users.all",
        "url": "adminui/authsec/adm/users/page/{page}/size/{size}"
    },
    {
        "desc": "用户中心-账户管理，查询单个账户",
        "method": "GET",
        "id": "user",
        "url": "adminui/authsec/adm/user/{user_id}"
    },
    {
        "desc": "用户中心-账号管理，删除",
        "method": "DELETE",
        "id": "user.delete",
        "url": "adminui/authsec/adm/user/{user_id}"
    },
    {
        "desc": "用户中心-角色管理，获取所有角色",
        "method": "GET",
        "id": "user.all.roles",
        "url": "adminui/authsec/adm/roles/page/0/size/100"
    }, 
    {
        "desc": "用户中心-账户管理，通过用户名模糊查询账户",
        "method": "GET",
        "id": "query.users.all",
        "url": "adminui/authsec/adm/users/search/page/{page}/size/{size} "
    },
    {
        "desc": "角色管理--根据一个角色获得已经选择和未选择的菜单--edit",
        "method": "GET",
        "id": "menu.role",
        "url": "adminui/authsec/mpp/menu/{role_id}"
    },
    {
        "desc": "用户中心-账户管理，编辑账号，本地",
        "method": "PUT",
        "id": "edit.account",
        "url": "adminui/authsec/adm/user/{user_id}"
    },
    {
        "desc": "用户中心-角色管理，获取所有角色",
        "method": "GET",
        "id": "roles",
        "url": "adminui/authsec/adm/roles/page/{page}/size/{size}"
    },
    {
        "desc": "根据多个角色获得菜单",
        "method": "POST",
        "id": "menu.roles",
        "url": "adminui/authsec/mpp/tree/roles"
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
        "url": "assess/authsec/assesslist/orgnization"
    },
    {
        "desc": "依据考卷ID来检索该考卷下的试题列表",
        "method": "GET",
        "id": "assesspaper.assesslist",
        "url": "assess/authsec/assesspaper/{id}/assesslist"
    },
    {
        "desc": "依据登录用户所属部门/组织机构来检索该部门下的考卷",
        "method": "GET",
        "id": "assesspaperlist.orgnization",
        "url": "assess/authsec/assesspaperlist/orgnization"
    },
    {
        "desc": "考生提交某个卷子某个题的答案",
        "method": "POST",
        "id": "assess.assessanswer",
        "url": "assess/authsec/assesspaper/{assessPaperId}/assess/{assessId}/assessanswer "
    }
]
