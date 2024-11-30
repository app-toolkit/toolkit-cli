import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { dirname } from 'path';
import chalk from "chalk";
import Mustache from "mustache";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = dirname(__dirname);

const check = async (name, options) => {
  const cwd = process.cwd();
  const targetDirectory = path.join(cwd, name);
  if (fs.existsSync(targetDirectory)) {
    // 判断是否使用 --force 参数
    if (options.force) {
      await fs.remove(targetDirectory);
    } else {
      let { isOverwrite } = await new inquirer.prompt([
        {
          name: "isOverwrite", // 与返回值对应
          type: "list", // list 类型
          message: "Target directory exists, Please choose an action",
          choices: [
            { name: `${chalk.red("overwrite")}`, value: true },
            { name: "cancel", value: false },
          ],
        },
      ]);
      // 选择 Cancel
      if (!isOverwrite) {
        console.log("Cancel");
        return false;
      } else {
        // 选择 Overwrite ，先删除掉原有重名目录
        console.log(`\nRemoving ${chalk.yellow(targetDirectory)} ...`);
        await fs.remove(targetDirectory);
        return true;
      }
    }
  }
  return true;
};

export default async function create(name, options) {
  const checked = await check(name, options);
  if (!checked) {
    return;
  }
  // 选取模板信息
  let { template } = await new inquirer.prompt([
    {
      name: "template",
      type: "list",
      message: "Please choose a template",
      choices: [
        { name: "website url template", value: "website" },
        { name: "web template", value: "web" },
        { name: "app template", value: "app" },
        { name: "service template", value: "service" },
      ],
    },
  ]);

  let entry = "/";
  if (template == "website") {
    entry = "https://toolkit.trumandu.top/";
  }

  console.log(template);
  // 1.创建文件夹
  fs.mkdirSync(name);
  // 2.copy文件
  const cwd = process.cwd();
  const pluginDirectory = path.join(cwd, name);
  const githubDirectory = path.join(rootDir, ".github");

  await fs.copy(githubDirectory, path.join(pluginDirectory, ".github"));

  const webTemplate = path.join(rootDir, "templates", "web");

  if (template == "website" || template == "web") {
    const pkgTemplate = path.join(webTemplate, "package.json");
    let content = fs.readFileSync(pkgTemplate, "utf-8");
    const rendered = Mustache.render(content, { pluginName: name });
    fs.writeFileSync(path.join(pluginDirectory, "package.json"), rendered);

    const pluginTemplate = path.join(webTemplate, "plugin.json");
    content = fs.readFileSync(pluginTemplate, "utf-8");
    const pluginRendered = Mustache.render(content, {
      pluginName: name,
      entry,
    });
    fs.writeFileSync(path.join(pluginDirectory, "plugin.json"), pluginRendered);
    console.log(`${chalk.green("Create success!")}`);
  }
}
