var markdownRenderer = {
    _escapeHtml: function (text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    },

    _inline: function (text) {
        var self = this;
        text = self._escapeHtml(text);
        text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");          // bold
        text = text.replace(/`([^`]+)`/g, "<code>$1</code>");                  // inline code
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');// link
        return text;
    },

    _flushParagraph: function (lines) {
        if (lines.length === 0) return "";
        return "<p>" + this._inline(lines.join("\n")) + "</p>\n";
    },

    _flushTable: function (lines) {
        if (lines.length < 2) return "";
        var self = this;
        var headerCells = lines[0].split("|").filter(function (c) { return c.trim() !== ""; });
        var rows = lines.slice(2); // skip separator line

        var html = "<table>\n<thead>\n<tr>\n";
        headerCells.forEach(function (cell) {
            html += "<th>" + self._inline(cell.trim()) + "</th>\n";
        });
        html += "</tr>\n</thead>\n<tbody>\n";

        rows.forEach(function (row) {
            var cells = row.split("|").filter(function (c) { return c.trim() !== ""; });
            html += "<tr>\n";
            cells.forEach(function (cell) {
                html += "<td>" + self._inline(cell.trim()) + "</td>\n";
            });
            html += "</tr>\n";
        });

        html += "</tbody>\n</table>\n";
        return html;
    },

    _flushList: function (lines, ordered) {
        var self = this;
        var tag = ordered ? "ol" : "ul";
        var html = "<" + tag + ">\n";

        // Group lines by indentation to handle nesting
        var groups = [];
        var currentGroup = [];
        var currentIndent = -1;

        lines.forEach(function (line) {
            var match = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)/);
            if (!match) {
                // Continuation line for previous item
                if (currentGroup.length > 0) {
                    currentGroup[currentGroup.length - 1] += "\n" + line.trim();
                }
                return;
            }
            var indent = match[1].length;
            var content = match[3];
            if (currentIndent === -1) currentIndent = indent;
            if (indent !== currentIndent) {
                groups.push({ indent: currentIndent, items: currentGroup });
                currentGroup = [];
                currentIndent = indent;
            }
            currentGroup.push(content);
        });
        if (currentGroup.length > 0) {
            groups.push({ indent: currentIndent, items: currentGroup });
        }

        groups.forEach(function (group) {
            group.items.forEach(function (item) {
                html += "<li>" + self._inline(item) + "</li>\n";
            });
        });

        html += "</" + tag + ">\n";
        return html;
    },

    render: function (markdown) {
        var lines = markdown.split("\n");
        var output = "";
        var i = 0;

        // Buffers for multi-line constructs
        var paraLines = [];
        var tableLines = [];
        var listLines = [];
        var codeLines = [];
        var codeFence = "";

        var state = "NORMAL"; // NORMAL | PARAGRAPH | TABLE | ULIST | OLIST | CODEBLOCK

        function flushPara() {
            var html = markdownRenderer._flushParagraph(paraLines);
            paraLines = [];
            state = "NORMAL";
            return html;
        }

        function flushTable() {
            var html = markdownRenderer._flushTable(tableLines);
            tableLines = [];
            state = "NORMAL";
            return html;
        }

        function flushList() {
            var isOrdered = state === "OLIST";
            var html = markdownRenderer._flushList(listLines, isOrdered);
            listLines = [];
            state = "NORMAL";
            return html;
        }

        while (i < lines.length) {
            var line = lines[i];
            var trimmed = line.trim();

            // Code block toggle
            if (trimmed.startsWith("```")) {
                if (state === "CODEBLOCK") {
                    var lang = codeFence.replace("```", "").trim();
                    var codeContent = markdownRenderer._escapeHtml(codeLines.join("\n"));
                    output += "<pre><code" + (lang ? ' class="language-' + lang + '"' : "") + ">" + codeContent + "</code></pre>\n";
                    codeLines = [];
                    codeFence = "";
                    state = "NORMAL";
                } else {
                    if (state === "PARAGRAPH") output += flushPara();
                    if (state === "TABLE") output += flushTable();
                    if (state === "ULIST" || state === "OLIST") output += flushList();
                    codeFence = trimmed;
                    state = "CODEBLOCK";
                }
                i++;
                continue;
            }

            if (state === "CODEBLOCK") {
                codeLines.push(line);
                i++;
                continue;
            }

            // Table row
            if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
                if (state === "PARAGRAPH") output += flushPara();
                if (state === "ULIST" || state === "OLIST") output += flushList();
                if (state !== "TABLE") state = "TABLE";
                tableLines.push(trimmed);
                i++;
                continue;
            }

            if (state === "TABLE") {
                output += flushTable();
            }

            // Heading
            var headingMatch = trimmed.match(/^(#{1,6})\s+(.+)/);
            if (headingMatch) {
                if (state === "PARAGRAPH") output += flushPara();
                if (state === "ULIST" || state === "OLIST") output += flushList();
                var level = headingMatch[1].length;
                output += "<h" + level + ">" + markdownRenderer._inline(headingMatch[2]) + "</h" + level + ">\n";
                i++;
                continue;
            }

            // Unordered list item
            var ulistMatch = trimmed.match(/^[-*]\s+(.+)/);
            if (ulistMatch) {
                if (state === "PARAGRAPH") output += flushPara();
                if (state === "TABLE") output += flushTable();
                if (state !== "ULIST") state = "ULIST";
                listLines.push(trimmed);
                i++;
                continue;
            }

            // Ordered list item
            var olistMatch = trimmed.match(/^\d+\.\s+(.+)/);
            if (olistMatch) {
                if (state === "PARAGRAPH") output += flushPara();
                if (state === "TABLE") output += flushTable();
                if (state !== "OLIST") state = "OLIST";
                listLines.push(trimmed);
                i++;
                continue;
            }

            // Continuation of list (indented line, not a new list item)
            if ((state === "ULIST" || state === "OLIST") && trimmed !== "" && !trimmed.startsWith("-") && !trimmed.startsWith("*") && !trimmed.match(/^\d+\./)) {
                listLines.push(trimmed);
                i++;
                continue;
            }

            if (state === "ULIST" || state === "OLIST") {
                output += flushList();
            }

            // Empty line
            if (trimmed === "") {
                if (state === "PARAGRAPH") output += flushPara();
                i++;
                continue;
            }

            // Paragraph
            if (state !== "PARAGRAPH") state = "PARAGRAPH";
            paraLines.push(trimmed);
            i++;
        }

        // Flush remaining
        if (state === "PARAGRAPH") output += flushPara();
        if (state === "TABLE") output += flushTable();
        if (state === "ULIST" || state === "OLIST") output += flushList();
        if (state === "CODEBLOCK") {
            output += "<pre><code>" + markdownRenderer._escapeHtml(codeLines.join("\n")) + "</code></pre>\n";
        }

        return output;
    },

    load: async function (mdPath, container) {
        try {
            var resp = await fetch(mdPath);
            if (!resp.ok) {
                container.innerHTML = "<p>文档加载失败</p>";
                return;
            }
            var text = await resp.text();
            container.innerHTML = markdownRenderer.render(text);
        } catch (e) {
            container.innerHTML = "<p>文档加载失败</p>";
        }
    }
};
