function getTemplateSources() {
    var sources = [];
    var seen = {};

    Object.keys(page_view_config).forEach(function (pageName) {
        var templateSrc = page_view_config[pageName].templateSrc;
        if (templateSrc && !seen[templateSrc]) {
            seen[templateSrc] = true;
            sources.push(templateSrc);
        }
    });

    return sources;
}

function injectTemplateMarkup(markup) {
    var container = document.createElement("div");
    container.innerHTML = markup;

    container.querySelectorAll("template").forEach(function (template) {
        document.body.appendChild(template);
    });
}

async function loadAppTemplates() {
    var sources = getTemplateSources();

    for (var i = 0; i < sources.length; i++) {
        var response = await fetch(sources[i]);
        if (!response.ok) {
            throw new Error("template load failed: " + sources[i]);
        }
        injectTemplateMarkup(await response.text());
    }
}

function loadTemplate(id) {
    var template = document.getElementById(id);
    if (!template) {
        throw new Error("template not found: " + id);
    }
    return template.content.cloneNode(true);
}

function mountPageTemplate(box, pageName) {
    var pageConfig = page_view_config[pageName];
    if (!pageConfig) {
        box.removeAttribute("id");
        box.innerHTML = "";
        return false;
    }

    box.innerHTML = "";
    box.id = pageConfig.boxId;
    box.appendChild(loadTemplate(pageConfig.templateId));
    return true;
}
