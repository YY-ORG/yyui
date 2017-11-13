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
        "desc": "用户中心-组织管理，获取所有机构",
        "method": "GET",
        "id": "get.organization",
        "url": "adminui/authsec/organizations"
    },
    {
        "desc": "用户中心-组织管理，状态更新",
        "method": "PUT",
        "id": "update.organization",
        "url": "adminui/authsec/organization/{organization_id}/status"
    },
    {
        "desc": "用户中心-组织管理，修改",
        "method": "PUT",
        "id": "modify.organization",
        "url": "adminui/authsec/organization/{organization_id}"
    },
    {
        "desc": "用户中心-组织管理，删除",
        "method": "DELETE",
        "id": "delete.organization",
        "url": "adminui/authsec/organization/{organization_id}"
    },
    {
        "desc": "用户中心-组织管理，创建",
        "method": "POST",
        "id": "add.organization",
        "url": "adminui/authsec/organization  "
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
        "desc": "用户中心-账户管理，获得属于指定机构下所有用户 ",
        "method": "GET",
        "id": "organization.users.all",
        "url": "adminui/authsec/adm/users/organization/{organization_id}/page/{page}/size/{size}"
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
    },
    {
        "desc": "分页检索当前登录用户所在部门的考卷列表",
        "method": "GET",
        "id": "assesspaper.assesspaperlist",
        "url": "assess//authsec/assesspaper/assesspaperlist"
    },
    {
        "desc": "分页检索当前登录用户所在部门的考卷列表",
        "method": "GET",
        "id": "org.assesspaper.assesspaperlist",
        "url": "assess/authsec/org/assesspaper/assesspaperlist"
    },
    {
        "desc": "分页检索某个考卷的试题",
        "method": "GET",
        "id": "assesspaper.assesslistpage",
        "url": "assess/authsec/assesspaper/{id}/assesslistpage"
    },
    {
        "desc": "删除某个考卷",
        "method": "DELETE",
        "id": "delete.assesspaper",
        "url": "assess/authsec/assesspaper/{id}"
    },
    {
        "desc": "分页检索题库中的试题",
        "method": "GET",
        "id": "assesses.assesslist",
        "url": "assess/authsec/assesses/assesslist"
    },
    {
        "desc": "单独创建考题",
        "method": "POST",
        "id": "creat.assess",
        "url": "assess/authsec/assess"
    },
    {
        "desc": "更新创建考题",
        "method": "PUT",
        "id": "update.assess",
        "url": "assess/authsec/assess"
    },
    {
        "desc": "创建考题的模板",
        "method": "POST",
        "id": "assess.template",
        "url": "assess/authsec/assess/template"
    },
    {
        "desc": "删除某个考题的某个模板",
        "method": "DELETE",
        "id": "delete.template",
        "url": "assess/authsec/assess/template/{id}"
    },
    {
        "desc": "分页检索所有的某个类型的考题模板",
        "method": "GET",
        "id": "assess.templatelist",
        "url": "assess/authsec/template/templatelist"
    },
    {
        "desc": "创建考题的元素项",
        "method": "POST",
        "id": "template.templateitem",
        "url": "assess/authsec/assess/template/templateitem"
    },
    {
        "desc": "分页检索所有的考题模板元素",
        "method": "GET",
        "id": "templateitem.templateitemlist",
        "url": "assess/authsec/templateitem/templateitemlist"
    },
    {
        "desc": "获取某个模板的模板元素",
        "method": "GET",
        "id": "templateitem.id.templateitemlist",
        "url": "assess/authsec/template/{id}/templateitemlist"
    },
    {
        "desc": "更新考题的模板",
        "method": "PUT",
        "id": "update.template",
        "url": "assess/authsec/assess/template"
    },
    {
        "desc": "删除考题",
        "method": "DELETE",
        "id": "delete.assess",
        "url": "assess/authsec/assess/{id}"
    },
    {
        "desc": "获取某个考题的模板",
        "method": "GET",
        "id": "get.assess.template",
        "url": "assess/authsec/assess/{id}/template"
    },
    {
        "desc": "创建考卷",
        "method": "POST",
        "id": "creat.paper",
        "url": "assess/authsec/assesspaper "
    },
    {
        "desc": "更新考卷",
        "method": "PUT",
        "id": "update.paper",
        "url": "assess/authsec/assesspaper"
    },
    {
        "desc": "创建考题分组",
        "method": "POST",
        "id": "creat.category",
        "url": "assess/authsec/assess/category"
    },
    {
        "desc": "更新考题分组",
        "method": "PUT",
        "id": "update.category",
        "url": "assess/authsec/assess/category"
    },
    {
        "desc": "分页获取所有考题分组",
        "method": "GET",
        "id": "get.category",
        "url": "assess/authsec/assess/category/categorylist"
    },
    {
        "desc": "删除考题分组",
        "method": "DELETE",
        "id": "delete.category",
        "url": "assess/authsec/assess/category/{id}"
    },
    {
        "desc": "为考卷增加考题分组",
        "method": "POST",
        "id": "assesspaper.add.category",
        "url": "assess/authsec/assesspaper/{id}/category"
    },
    {
        "desc": "获取某个考卷的考题分组",
        "method": "GET",
        "id": "assesspaper.category",
        "url": "assess/authsec/assesspaper/{id}/category/categorylist"
    }
]
