// Turns the built aaoi.html into a page body for publishing as a claude.ai Artifact:
// no document skeleton, page tokens on :root, and the figure's theme follows the viewer.
import { readFileSync, writeFileSync } from "node:fs";
const src = readFileSync(new URL("./aaoi.html", import.meta.url), "utf8");
const head = src.slice(src.indexOf("<head>") + 6, src.indexOf("</head>"));
const styles = [...head.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join("\n")
  .replace(/html\{color-scheme:dark\}\n?/, "")
  .replace('body[data-theme="light"]{color-scheme:light}', "")
  .replace("body{margin:0;background:var(--anatomy-page);", ".iso{min-height:100%;background:var(--anatomy-page);");
const bodyStart = src.indexOf(">", src.indexOf("<body")) + 1;
const inner = src.slice(bodyStart, src.lastIndexOf("</body>"));
const page = `<title>AAOI Optical Module</title>
<style>
/* layout: one framed figure, centred, with its legend below */
:root{--page:#f2f2ef}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--page:#0b0b0b;color-scheme:dark}}
:root[data-theme="dark"]{--page:#0b0b0b;color-scheme:dark}
html,body{background:var(--page)}
${styles}
.iso-page{margin-block:32px 64px}
</style>
<div class="iso" id="iso-root" data-theme="light">${inner.replace(/<script type="module">/, `<script>
(() => {
  const root = document.getElementById("iso-root");
  const dark = matchMedia("(prefers-color-scheme: dark)");
  const apply = () => root.setAttribute("data-theme", document.documentElement.getAttribute("data-theme") || (dark.matches ? "dark" : "light"));
  apply();
  dark.addEventListener("change", apply);
  new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
})();
</script><script type="module">`)}</div>
`;
writeFileSync(new URL("./aaoi-artifact.html", import.meta.url), page);
console.log("wrote aaoi-artifact.html", page.length);
