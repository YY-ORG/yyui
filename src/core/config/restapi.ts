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
        "desc": "获取数据字典的Owner列表",
        "id": "sysdic.owner",
        "method": "GET",
        "url": "sysbase/authsec/sysdic/owner"
    },
    {
        "desc": "获取数据字典某个Owner的Field列表",
        "id": "sysdic.owner.field",
        "method": "GET",
        "url": "sysbase/authsec/sysdic/owner/{owner}/field"
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
        "desc": "用户中心-账户管理，修改当前密码",
        "method": "PUT",
        "id": "password.modify",
        "url": "adminui//authsec/user/password/modify"
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
        "desc": "考生删除某个卷子某个多答案题的多个答案",
        "method": "DELETE",
        "id": "delete.assessanswers",
        "url": "assess/authsec/assesspaper/{assessPaperId}/assess/assessanswers"
    },
    {
        "desc": "考生删除某个卷子某个多答案题的某个答案",
        "method": "DELETE",
        "id": "delete.answerItemId",
        "url": "assess/authsec/assesspaper/{assessPaperId}/assess/assessanswer/{answerItemId}"
    },
    {
        "desc": "考生删除某个卷子某个题的子元素项的多个答案",
        "method": "DELETE",
        "id": "delete.subanswer",
        "url": "assess/authsec/assesspaper/{assessPaperId}/assess/assessanswer/subanswers"
    },
    {
        "desc": "考生删除某个卷子某个题的子元素项的某个答案",
        "method": "DELETE",
        "id": "delete.subanswer.subAnswerId",
        "url": "assess/authsec/assesspaper/{assessPaperId}/assess/assessanswer/subanswer/{subAnswerId}"
    },
    {
        "desc": "获取某个用户某个题的答案",
        "method": "GET",
        "id": "get.assessanswer",
        "url": "assess/authsec/assesspaper/{assessPaperId}/assess/{assessId}/assessanswer"
    },
    {
        "desc": "考生提交某个卷子某个题(单答案题)的答案",
        "method": "POST",
        "id": "assess.single.assessanswer",
        "url": "assess/authsec/assesspaper/{assessPaperId}/group/{groupId}/assess/{assessId}/assessanswer"
    },
    {
        "desc": "考生提交某个多答案题（提交的时候无须再提交内容）",
        "method": "PUT",
        "id": "put.single.assessanswer",
        "url": "assess/authsec/assesspaper/{assessPaperId}/group/{groupId}/assess/{assessId}/assessanswer"
    },
    {
        "desc": "考生提交考卷",
        "method": "PUT",
        "id": "put.assessanswer",
        "url": "assess/authsec/assesspaper/{assessPaperId}/paperanswer"
    },
    {
        "desc": "考生增加某个卷子某个多答案题的答案",
        "method": "POST",
        "id": "assessanswer.answeritem",
        "url": "assess/authsec/assesspaper/{assessPaperId}/group/{groupId}/assess/{assessId}/assessanswer/answeritem"
    },
    {
        "desc": "考生增加某个卷子某个题的元素项答案",
        "method": "POST",
        "id": "assessanswer.subanswer",
        "url": "assess/authsec/assesspaper/{assessPaperId}/group/{groupId}/assess/{assessId}/assessanswer/subanswer"
    },
    {
        "desc": "考生更新某个卷子某个多答案题的答案",
        "method": "PUT",
        "id": "update.assessanswer.answer",
        "url": "assess/authsec/assesspaper/{assessPaperId}/group/{groupId}/assess/{assessId}/assessanswer/answeritem/{answerItemId}"
    },
    {
        "desc": "考生更新某个卷子某个题的元素项的某个答案",
        "method": "PUT",
        "id": "update.assessanswer.subanswer",
        "url": "assess/authsec/assesspaper/{assessPaperId}/group/{groupId}/assess/{assessId}/assessanswer/subanswer/{subAnswerId}"
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
    },
    {
        "desc": "创建考题的元素项",
        "method": "POST",
        "id": "template.templateitem",
        "url": "assess/authsec/assess/template/templateitem"
    },
    {
        "desc": "更新考题的元素项",
        "method": "PUT",
        "id": "update.templateitem",
        "url": "assess/authsec/assess/template/templateitem"
    },
    {
        "desc": "分页检索所有的考题模板元素",
        "method": "GET",
        "id": "templateitem.templateitemlist",
        "url": "assess/authsec/templateitem/templateitemlist"
    },
    {
        "desc": "删除某个模板元素",
        "method": "DELETE",
        "id": "delete.templateitem",
        "url": "assess/authsec/assess/template/templateitem/{id}"
    },
    {
        "desc": "检索所有的某个类型的考题模板",
        "method": "GET",
        "id": "all.templates",
        "url": "assess/authsec/templates"
    },
    {
        "desc": "获取某个试题模板的元素列表",
        "method": "GET",
        "id": "id.get.templateitemlist",
        "url": "assess/authsec/template/{id}/templateitemlist"
    },
    {
        "desc": "获取某个用户某个试卷的分组答案的答题详情",
        "method": "GET",
        "id": "get.assessanswerlist",
        "url": "assess/authsec/assesspaper/{id}/assessanswerlist"
    },
    {
        "desc": "获取当前用户所在部门的未复核的试卷列表",
        "method": "GET",
        "id": "get.unauditlist",
        "url": "assess/authsec/assesspaper/assessanswer/unauditlist"
    },
    {
        "desc": "获取某个用户某个题的答案及答案的评分详情",
        "method": "GET",
        "id": "get.markassessanswer",
        "url": "assess/authsec/assesspaper/{id}/assess/{assessId}/markassessanswer"
    },
    {
        "desc": "给某个用户某个题的答案初评分",
        "method": "POST",
        "id": "post.markassessanswer",
        "url": "assess/authsec/assesspaper/{assessPaperId}/assess/{assessId}/markassessanswer "
    },
    {
        "desc": "给某个用户某个题的答案复核评分",
        "method": "POST",
        "id": "post.auditassessanswer",
        "url": "assess/authsec/assesspaper/{assessPaperId}/assess/{assessId}/auditassessanswer"
    },
    {
        "desc": "获取当前用户所在部门的未评分的试卷列表",
        "method": "GET",
        "id": "get.unmarklist",
        "url": "assess/authsec/assesspaper/assessanswer/unmarklist"
    },
    {
        "desc": "获取某个卷子的分组评分设置列表",
        "method": "GET",
        "id": "get.paper.scoring",
        "url": "assess/authsec/assesspaper/{id}/category/scoring"
    },
    {
        "desc": "提交某个卷子的分组评分设置详情",
        "method": "POST",
        "id": "post.paper.scoring",
        "url": "assess/authsec/assesspaper/{id}/category/scoring"
    },
    {
        "desc": "分页获取某个卷子的某个分组下试题的评分设置列表",
        "method": "GET",
        "id": "get.category.scoring",
        "url": "assess/authsec/assesspaper/{id}/category/{categoryId}/scoring"
    },
    {
        "desc": "提交某个卷子某个分组的试题评分设置详情",
        "method": "POST",
        "id": "post.category.scoring",
        "url": "assess/authsec/assesspaper/{id}/category/{categoryId}/scoring"
    },
    {
        "desc": "提交某个用户某个卷子的答案初评总分",
        "method": "POST",
        "id": "post.paper.markassessanswer",
        "url": "assess/authsec/assesspaper/{assessPaperId}/markassessanswer"
    },
    {
        "desc": "提交某个用户某个卷子的答案复核总分",
        "method": "POST",
        "id": "post.paper.auditassessanswer",
        "url": "assess/authsec/assesspaper/{assessPaperId}/auditassessanswer"
    },
    {
        "desc": "上传文件",
        "method": "POST",
        "id": "upload.file",
        "url": "zuul/filesys/authsec/file"
    },
    {
        "desc": "删除文件",
        "method": "DELETE",
        "id": "delete.file",
        "url": "filesys/authsec/file/{id}"
    },
    {
        "desc": "获取文件片信息",
        "method": "GET",
        "id": "file.info",
        "url": "zuul/filesys/authsec/file/{id}"
    },
    {
        "desc": "批量获取文件的信息",
        "method": "POST",
        "id": "get.file.info",
        "url": "zuul/filesys/authsec/file/simpleinfo"
    },
    {
        "desc": "在线显示文件",
        "method": "GET",
        "id": "file.view",
        "url": "zuul/filesys/authsec/file/{id}/view"
    },
    {
        "desc": "分页查询文件",
        "method": "GET",
        "id": "get.files",
        "url": "zuul/filesys/authsec/files"
    }
]
