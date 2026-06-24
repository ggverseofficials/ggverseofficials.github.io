const fs = require("fs");
const path = require("path");

const inputPath =
  "C:\\Users\\user\\.codex\\attachments\\30d7d4a6-9f35-464c-88bb-303629a541b5\\pasted-text.txt";
const outputPath = path.join(__dirname, "..", "outputs", "ggverse-fixed.html");

const lines = fs.readFileSync(inputPath, "utf8").split(/\r?\n/);

function replaceRange(startLine, endLine, replacementLines) {
  lines.splice(startLine - 1, endLine - startLine + 1, ...replacementLines);
}

// Add the missing document transition from head to body.
lines[1556] = "  </style>";
lines.splice(1557, 0, "</head>", "<body>");

// Remove the CSS accidentally pasted into the body and close Journey correctly.
replaceRange(1737, 2048, [
  "        </div>",
  "    </div>",
  "  </section>",
]);

// Replace the broken black/gold quote and feature bar with safe inline HTML.
replaceRange(1850, 1898, [
  '        <div style="max-width:1200px; margin:45px auto 0; padding:35px 45px; background:rgba(0,0,0,0.88); border:1px solid rgba(212,175,55,0.55); border-radius:18px; display:grid; grid-template-columns:70px 1fr 300px; gap:25px; align-items:center;">',
  "",
  '            <div style="color:#d4af37; font-size:80px; font-family:Georgia, serif; border-right:2px solid rgba(212,175,55,0.55); line-height:1;">',
  "                &ldquo;",
  "            </div>",
  "",
  "            <div>",
  '                <p style="color:white; font-family:Georgia, serif; font-size:24px; font-style:italic; line-height:1.5; margin:0;">',
  "                    GG Verse is more than a resort project. It is a lifelong vision to create a destination that reflects excellence, hospitality, culture, and unforgettable experiences.",
  "                </p>",
  '                <h4 style="color:#d4af37; font-size:20px; margin-top:18px;">',
  "                    &mdash; Ganesh Gupta",
  "                </h4>",
  "            </div>",
  "",
  '            <div style="color:#d4af37; font-size:60px; text-align:right;">',
  "                &#9651;&#9651;&#9651;",
  "            </div>",
  "",
  "        </div>",
  "",
  '        <div style="max-width:1200px; margin:30px auto 0; display:grid; grid-template-columns:repeat(5,1fr); text-align:center;">',
  "",
  '            <div style="color:white; border-right:1px solid rgba(212,175,55,0.45);">',
  '                <span style="color:#d4af37; font-size:34px;">&#9671;</span><br>',
  "                Luxury<br>Experiences",
  "            </div>",
  "",
  '            <div style="color:white; border-right:1px solid rgba(212,175,55,0.45);">',
  '                <span style="color:#d4af37; font-size:34px;">&#9882;</span><br>',
  "                Wellness<br>Focused",
  "            </div>",
  "",
  '            <div style="color:white; border-right:1px solid rgba(212,175,55,0.45);">',
  '                <span style="color:#d4af37; font-size:34px;">&#9832;</span><br>',
  "                Culinary<br>Excellence",
  "            </div>",
  "",
  '            <div style="color:white; border-right:1px solid rgba(212,175,55,0.45);">',
  '                <span style="color:#d4af37; font-size:34px;">&#9678;</span><br>',
  "                Cultural<br>Connection",
  "            </div>",
  "",
  '            <div style="color:white;">',
  '                <span style="color:#d4af37; font-size:34px;">&#9825;</span><br>',
  "                Guest<br>Satisfaction",
  "            </div>",
  "",
  "        </div>",
]);

let html = lines.join("\n");
html = html.replace(
  /<footer class="footer">\s*<footer class="footer">/,
  '<footer class="footer">'
);
html = html.replace(/<span>[^<]*\/span>/, "<span>&#128104;&#8205;&#127859;</span>");
html = html.replace(/<\/section><section/g, "</section>\n<section");
html = html.replace(/鈥\?/g, "&mdash;");
html = html.replace(/鈥檚/g, "'s");
html = html.replace(/漏 2026/g, "&copy; 2026");
html = html.replace(/caf茅s/g, "cafes");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html, "utf8");
console.log(outputPath);
