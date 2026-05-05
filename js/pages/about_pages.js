hori_btn_func["帮助文档"] = async function (user, box) {
    markdownRenderer.load("./docs/help.md", box.querySelector("#md-help"));
};

hori_btn_func["项目介绍"] = async function (user, box) {
    markdownRenderer.load("./docs/project_info.md", box.querySelector("#md-project-info"));
};
