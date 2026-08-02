#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import pc from "picocolors";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const REGISTRY_URL = "https://arcblocks.com/r";

const program = new Command()
  .name("create-arc-app")
  .description("Scaffold a new Arc UI application")
  .argument("[project-directory]", "Directory to create the project in")
  .action(async (projectDirectory) => {
    try {
      let targetDir = projectDirectory;

      if (!targetDir) {
        const res = await prompts({
          type: "text",
          name: "dir",
          message: "What is your project named?",
          initial: "my-arc-app",
        });
        targetDir = res.dir;
      }

      if (!targetDir) {
        console.log(pc.red("Please specify a project directory."));
        process.exit(1);
      }

      const res = await prompts({
        type: "select",
        name: "template",
        message: "Which template would you like to start with?",
        choices: [
          { title: "Payments", value: "payments", description: "Send Money and Transaction Status" },
          { title: "Bridge", value: "bridge", description: "Cross-chain Bridge Widget" },
          { title: "Checkout", value: "checkout", description: "Balance Card and Swap Widget" },
          { title: "Blank", value: "blank", description: "Empty Next.js app with Arc setup" },
        ],
      });

      const template = res.template;
      if (!template) {
        process.exit(1);
      }

      console.log(`\nCreating a new Arc UI app in ${pc.green(targetDir)}...\n`);

      // 1. Create Next.js app
      console.log(pc.cyan("1. Initializing Next.js project..."));
      execSync(`npx create-next-app@latest ${targetDir} --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`, { stdio: "inherit" });

      const projectPath = path.resolve(process.cwd(), targetDir);

      // 2. Install Arc UI core
      console.log(pc.cyan("\n2. Installing Arc UI Core and App Kit..."));
      execSync(`npm install @arc-ui/core @circle-fin/app-kit`, { cwd: projectPath, stdio: "inherit" });

      // 3. Initialize shadcn
      console.log(pc.cyan("\n3. Initializing shadcn components..."));
      execSync(`npx shadcn@latest init -y`, { cwd: projectPath, stdio: "inherit" });

      // 4. Install template components via registry
      console.log(pc.cyan(`\n4. Installing ${template} template components via registry...`));
      
      const componentsToInstall = ["wallet-connect-button"];
      
      if (template === "payments") {
        componentsToInstall.push("send-money-form", "transaction-status");
      } else if (template === "bridge") {
        componentsToInstall.push("bridge-widget");
      } else if (template === "checkout") {
        componentsToInstall.push("balance-card", "swap-widget");
      }

      for (const comp of componentsToInstall) {
        console.log(`Installing ${comp}...`);
        try {
          execSync(`npx shadcn@latest add ${REGISTRY_URL}/${comp}`, { cwd: projectPath, stdio: "inherit" });
        } catch (e) {
          console.warn(pc.yellow(`Warning: Could not install ${comp} from registry. Ensure you have network connectivity to arcblocks.com.`));
        }
      }

      // 5. Success
      console.log(pc.green("\nSuccess! Your Arc UI project is ready."));
      console.log("\nNext steps:");
      console.log(pc.cyan(`  cd ${targetDir}`));
      console.log(pc.cyan("  npm run dev"));
      console.log("\nHappy building!\n");

    } catch (err) {
      console.error(pc.red("\nAn error occurred while scaffolding the app."));
      console.error(err);
      process.exit(1);
    }
  });

program.parse();
