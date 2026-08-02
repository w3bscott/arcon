#!/usr/bin/env node
import{Command as l}from"commander";import a from"prompts";import e from"picocolors";import{execSync as c}from"child_process";import p from"path";var d="https://arcblocks.com/r",m=new l().name("create-arc-app").description("Scaffold a new Arc UI application").argument("[project-directory]","Directory to create the project in").action(async s=>{try{let t=s;t||(t=(await a({type:"text",name:"dir",message:"What is your project named?",initial:"my-arc-app"})).dir),t||(console.log(e.red("Please specify a project directory.")),process.exit(1));let o=(await a({type:"select",name:"template",message:"Which template would you like to start with?",choices:[{title:"Payments",value:"payments",description:"Send Money and Transaction Status"},{title:"Bridge",value:"bridge",description:"Cross-chain Bridge Widget"},{title:"Checkout",value:"checkout",description:"Balance Card and Swap Widget"},{title:"Blank",value:"blank",description:"Empty Next.js app with Arc setup"}]})).template;o||process.exit(1),console.log(`
Creating a new Arc UI app in ${e.green(t)}...
`),console.log(e.cyan("1. Initializing Next.js project...")),c(`npx create-next-app@latest ${t} --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`,{stdio:"inherit"});let i=p.resolve(process.cwd(),t);console.log(e.cyan(`
2. Installing Arc UI Core and App Kit...`)),c("npm install @arc-ui/core @circle-fin/app-kit",{cwd:i,stdio:"inherit"}),console.log(e.cyan(`
3. Initializing shadcn components...`)),c("npx shadcn@latest init -y",{cwd:i,stdio:"inherit"}),console.log(e.cyan(`
4. Installing ${o} template components via registry...`));let n=["wallet-connect-button"];o==="payments"?n.push("send-money-form","transaction-status"):o==="bridge"?n.push("bridge-widget"):o==="checkout"&&n.push("balance-card","swap-widget");for(let r of n){console.log(`Installing ${r}...`);try{c(`npx shadcn@latest add ${d}/${r}`,{cwd:i,stdio:"inherit"})}catch{console.warn(e.yellow(`Warning: Could not install ${r} from registry. Ensure you have network connectivity to arcblocks.com.`))}}console.log(e.green(`
Success! Your Arc UI project is ready.`)),console.log(`
Next steps:`),console.log(e.cyan(`  cd ${t}`)),console.log(e.cyan("  npm run dev")),console.log(`
Happy building!
`)}catch(t){console.error(e.red(`
An error occurred while scaffolding the app.`)),console.error(t),process.exit(1)}});m.parse();
