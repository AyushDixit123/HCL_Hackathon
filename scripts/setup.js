#!/usr/bin/env node

/**
 * Setup Script
 * Checks and installs dependencies, then initializes the database
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkDependencies(dir, name) {
  const nodeModulesPath = path.join(dir, 'node_modules');
  const packageJsonPath = path.join(dir, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }
  
  if (!fs.existsSync(nodeModulesPath)) {
    return false;
  }
  
  // Check if node_modules is empty or has very few packages
  try {
    const files = fs.readdirSync(nodeModulesPath);
    return files.length > 0;
  } catch {
    return false;
  }
}

function installDependencies(dir, name) {
  log(`\n📦 Installing ${name} dependencies...`, 'cyan');
  try {
    process.chdir(dir);
    execSync('npm install', { stdio: 'inherit' });
    log(`✅ ${name} dependencies installed`, 'green');
    return true;
  } catch (error) {
    log(`❌ Failed to install ${name} dependencies`, 'red');
    return false;
  }
}

async function setup() {
  log('\n🚀 Starting setup process...', 'blue');
  
  const rootDir = path.resolve(__dirname, '..');
  const backendDir = path.join(rootDir, 'backend');
  const frontendDir = path.join(rootDir, 'FrontEnd');
  
  // Check root dependencies
  if (!checkDependencies(rootDir, 'root')) {
    log('\n📦 Installing root dependencies...', 'cyan');
    process.chdir(rootDir);
    try {
      execSync('npm install', { stdio: 'inherit' });
      log('✅ Root dependencies installed', 'green');
    } catch (error) {
      log('❌ Failed to install root dependencies', 'red');
      process.exit(1);
    }
  } else {
    log('✅ Root dependencies already installed', 'green');
  }
  
  // Check backend dependencies
  if (!checkDependencies(backendDir, 'backend')) {
    if (!installDependencies(backendDir, 'backend')) {
      process.exit(1);
    }
  } else {
    log('✅ Backend dependencies already installed', 'green');
  }
  
  // Check frontend dependencies
  if (fs.existsSync(frontendDir) && fs.existsSync(path.join(frontendDir, 'package.json'))) {
    if (!checkDependencies(frontendDir, 'frontend')) {
      if (!installDependencies(frontendDir, 'frontend')) {
        log('⚠️  Frontend dependencies installation failed, but continuing...', 'yellow');
      }
    } else {
      log('✅ Frontend dependencies already installed', 'green');
    }
  } else {
    log('⚠️  Frontend directory not found, skipping...', 'yellow');
  }
  
  // Return to root directory
  process.chdir(rootDir);
  
  log('\n✨ Setup completed successfully!', 'green');
  return true;
}

// Run if called directly
if (require.main === module) {
  setup()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      log(`\n❌ Setup failed: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = setup;

