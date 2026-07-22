import fs from 'fs';
import path from 'path';
import { registry } from '../packages/react/src/registry';

const REGISTRY_DIR = path.resolve(process.cwd(), 'registry');
const REGISTRY_DEFAULT_DIR = path.join(REGISTRY_DIR, 'default');
const REACT_COMPONENTS_DIR = path.resolve(process.cwd(), 'packages/react/src/components');

async function buildRegistry() {
  console.log('Building registry...');

  // Ensure registry directories exist
  if (!fs.existsSync(REGISTRY_DIR)) {
    fs.mkdirSync(REGISTRY_DIR, { recursive: true });
  }
  if (!fs.existsSync(REGISTRY_DEFAULT_DIR)) {
    fs.mkdirSync(REGISTRY_DEFAULT_DIR, { recursive: true });
  }

  const registryItems = Object.values(registry);

  for (const item of registryItems) {
    const componentDir = path.join(REGISTRY_DEFAULT_DIR, item.name);
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    // Read source component
    const sourcePath = path.join(REACT_COMPONENTS_DIR, item.name, 'index.tsx');
    if (!fs.existsSync(sourcePath)) {
      console.warn(`Source not found: ${sourcePath}`);
      continue;
    }

    const sourceContent = fs.readFileSync(sourcePath, 'utf8');

    // Write component to registry/default/[name]/index.tsx
    const targetPath = path.join(componentDir, 'index.tsx');
    fs.writeFileSync(targetPath, sourceContent, 'utf8');

    // Write registry-item.json
    const itemJsonPath = path.join(componentDir, 'registry-item.json');
    fs.writeFileSync(itemJsonPath, JSON.stringify(item, null, 2), 'utf8');

    console.log(`Generated registry item: ${item.name}`);
  }

  // Write root registry.json
  const rootRegistryPath = path.join(REGISTRY_DIR, 'registry.json');
  const rootRegistryData = {
    name: "arc-ui",
    homepage: "https://arc-ui.com",
    items: registryItems,
  };
  fs.writeFileSync(rootRegistryPath, JSON.stringify(rootRegistryData, null, 2), 'utf8');

  console.log('Registry build complete.');
}

buildRegistry().catch((err) => {
  console.error('Error building registry:', err);
  process.exit(1);
});
