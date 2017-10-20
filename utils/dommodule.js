const fs = require("fs");
const path = require("path");

const showTutorial = function () {
  console.log("Usage: ");
  console.log(`$ node dommodule.js <component> [path]`);
  console.log("\nExample: ");
  console.log("1. 当前目录中创建h2-dialog.html 和 demo/h2-dialog/index.html");
  console.log(`   $ node dommodule.js h2-dialog`);
  console.log("\n2. 上层目录中创建h2-dialog.html 和 demo/h2-dialog/index.html");
  console.log(`   $ node dommodule.js h2-dialog ..`);
  console.log("\n3. 目录中 /Users/wahsonleung/test 中创建h2-dialog.html 和 demo/h2-dialog/index.html");
  console.log(`   $ node dommodule.js h2-dialog /Users/wahsonleung/test`);
};

const args = process.argv.slice(2);

if (args.length < 1 || args[0] === '-h') {
  showTutorial();
  return;
}

const [component, targetPath = ""] = args;

const componentPattern = /\w+-\w+/g;

if (!componentPattern.test(component)) {
  console.error(`Component name must be like "some-elem"`);
  return;
}

const dash2Camel = function dash2Camel(dash) {
  return dash.replace(/-[a-z]/g, (m) => m[1].toUpperCase());
};

const upperFirst = function (str) {
  return str.replace(/\w/, (m) => m[0].toUpperCase());
};

const fixPath = function (p) {
  if (!p) return '';
  return p.endsWith(path.sep) ? p : `${p}${path.sep}`;
};

const fixDir = function (targetDir) {
  targetDir.split(path.sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(parentDir, childDir);
    if (!fs.existsSync(curDir)) {
      fs.mkdirSync(curDir);
    }
    return curDir;
  }, path.sep);
};

const absoluteTargetPath = path.resolve(targetPath, '.');
console.log(`Start creating component[${component}], path[${absoluteTargetPath}]`);

const template = fs.readFileSync('dom-tmpl.html', 'utf8');
const componentCode = template.replace(/\$\{1\}/g, component).replace(/\$\{2\}/g, dash2Camel(upperFirst(component)));

// console.log('============================================');
// console.log(componentCode);
// console.log('============================================');

const collectPath = fixPath(absoluteTargetPath);
const fileTo = `${collectPath}${component}.html`;

fs.writeFileSync(fileTo, componentCode, 'utf8');

console.log(`Done. => ${fileTo}`);

const demoIndexPath = `${collectPath}demo${path.sep}${component}`;

console.log(`Start creating demo`);

const demoTemplate = fs.readFileSync('demo-tmpl.html', 'utf8');
const demoCode = demoTemplate.replace(/\$\{1\}/g, component);

fixDir(demoIndexPath);
fs.writeFileSync(`${fixPath(demoIndexPath)}index.html`, demoCode, 'utf8');

console.log(`Done. => ${fixPath(demoIndexPath)}index.html`);
console.log(`You'd better manually append \`<link rel="import" href="${component}.html">\` to \`all-imports.html\`!`);
console.log(`Because I don't want to do that for you.`);