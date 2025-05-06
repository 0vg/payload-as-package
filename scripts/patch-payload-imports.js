/**
 * Patcher script to replace @payload-config imports with @workspace/payload/payload/payload.config
 * This ensures stability when Payload regenerates route files
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const glob = require('glob');

async function patchPayloadImports() {
  console.log('Starting the patcher script...');
  
  // Find all files in the apps/cms directory with .ts or .tsx extensions
  const files = await glob.glob('apps/cms/app/**/*.{ts,tsx}');
  
  let patchedFilesCount = 0;
  
  for (const file of files) {
    try {
      // Read the file content
      const content = await readFile(file, 'utf8');
      
      // Check if the file contains the @payload-config import
      if (content.includes('@payload-config')) {
        // Replace all occurrences of @payload-config with @workspace/payload/payload/payload.config
        const updatedContent = content.replace(
          /from ['"]@payload-config['"]/g, 
          'from "@workspace/payload/payload/payload.config"'
        );
        
        // Write the updated content back to the file
        await writeFile(file, updatedContent, 'utf8');
        
        console.log(`Patched: ${file}`);
        patchedFilesCount++;
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }
  
  console.log(`Patching completed! ${patchedFilesCount} files were updated.`);
}

// Run the patcher
patchPayloadImports().catch(error => {
  console.error('Error running the patcher:', error);
  process.exit(1);
});
