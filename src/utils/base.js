const base = {
    get() {
        return {
            url: "http://localhost:8080/springbootlvse/",
            name: "dyspringboot",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springbootlvse/front/dist/index.html'
        };
    },
    getProjectName() {
        return {
            projectName: "校园食堂订餐系统"
        }
    },
    getUsersTypes(){
        return [{ value: '0', label: '管理员' }, { value: '4', label: '食堂管理员' }, { value: '1', label: '商家' }, { value: '2', label: '用户' }, { value: '3', label: '配送员' }]
    }
}
export default base
