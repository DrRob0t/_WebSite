#!/usr/bin/env node

/**
 * Security audit script for Hyve Dynamics website
 * Runs various security checks and generates a report
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔒 Starting Security Audit...\n')

const auditResults = {
  timestamp: new Date().toISOString(),
  checks: [],
  summary: {
    passed: 0,
    warnings: 0,
    failed: 0,
  },
}

/**
 * Add audit result
 */
function addResult(name, status, message, details = null) {
  const result = { name, status, message, details }
  auditResults.checks.push(result)
  auditResults.summary[status]++
  
  const emoji = status === 'passed' ? '✅' : status === 'warnings' ? '⚠️' : '❌'
  console.log(`${emoji} ${name}: ${message}`)
  
  if (details) {
    console.log(`   Details: ${details}`)
  }
}

/**
 * Run command and capture output
 */
function runCommand(command, options = {}) {
  try {
    return execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    })
  } catch (error) {
    if (!options.allowFailure) {
      throw error
    }
    return null
  }
}

/**
 * Check npm audit
 */
function checkNpmAudit() {
  console.log('\n📦 Checking npm audit...')
  
  try {
    const auditOutput = runCommand('npm audit --json', { silent: true, allowFailure: true })
    
    if (auditOutput) {
      const audit = JSON.parse(auditOutput)
      
      if (audit.metadata && audit.metadata.vulnerabilities) {
        const vulns = audit.metadata.vulnerabilities
        const total = vulns.total
        
        if (total === 0) {
          addResult('NPM Audit', 'passed', 'No known vulnerabilities found')
        } else {
          const critical = vulns.critical || 0
          const high = vulns.high || 0
          const moderate = vulns.moderate || 0
          const low = vulns.low || 0
          
          const message = `${total} vulnerabilities found (Critical: ${critical}, High: ${high}, Moderate: ${moderate}, Low: ${low})`
          
          if (critical > 0 || high > 0) {
            addResult('NPM Audit', 'failed', message, 'Run "npm audit fix" to resolve')
          } else {
            addResult('NPM Audit', 'warnings', message, 'Consider updating packages')
          }
        }
      } else {
        addResult('NPM Audit', 'passed', 'No vulnerabilities detected')
      }
    } else {
      addResult('NPM Audit', 'warnings', 'Could not run npm audit', 'Check npm installation')
    }
  } catch (error) {
    addResult('NPM Audit', 'failed', 'npm audit failed', error.message)
  }
}

/**
 * Check for security-sensitive files
 */
function checkSensitiveFiles() {
  console.log('\n🕵️ Checking for sensitive files...')
  
  const sensitivePatterns = [
    '.env',
    '.env.local',
    '.env.production',
    'id_rsa',
    'id_dsa',
    'id_ecdsa',
    'private.key',
    'server.key',
    '*.p12',
    '*.pem',
    'credentials.json',
    'service-account.json',
  ]
  
  const foundFiles = []
  
  sensitivePatterns.forEach(pattern => {
    try {
      const files = runCommand(`find . -name "${pattern}" -not -path "./node_modules/*" -not -path "./dist/*"`, { 
        silent: true, 
        allowFailure: true 
      })
      
      if (files && files.trim()) {
        foundFiles.push(...files.trim().split('\n').filter(f => f))
      }
    } catch (error) {
      // Ignore find errors
    }
  })
  
  // Check .gitignore for sensitive patterns
  const gitignorePath = path.join(process.cwd(), '.gitignore')
  let gitignoreContent = ''
  
  if (fs.existsSync(gitignorePath)) {
    gitignoreContent = fs.readFileSync(gitignorePath, 'utf8')
  }
  
  const missingFromGitignore = []
  const protectedFiles = ['.env', '.env.local', '.env.production', '*.key', '*.pem', '*.p12']
  
  protectedFiles.forEach(pattern => {
    if (!gitignoreContent.includes(pattern)) {
      missingFromGitignore.push(pattern)
    }
  })
  
  if (foundFiles.length === 0 && missingFromGitignore.length === 0) {
    addResult('Sensitive Files', 'passed', 'No sensitive files found and .gitignore is properly configured')
  } else {
    const details = []
    
    if (foundFiles.length > 0) {
      details.push(`Found files: ${foundFiles.join(', ')}`)
    }
    
    if (missingFromGitignore.length > 0) {
      details.push(`Missing from .gitignore: ${missingFromGitignore.join(', ')}`)
    }
    
    addResult('Sensitive Files', 'warnings', 'Potential sensitive files or missing .gitignore entries', details.join('; '))
  }
}

/**
 * Check security headers configuration
 */
function checkSecurityHeaders() {
  console.log('\n🛡️ Checking security headers configuration...')
  
  const viteConfigPath = path.join(process.cwd(), 'vite.config.ts')
  
  if (!fs.existsSync(viteConfigPath)) {
    addResult('Security Headers', 'failed', 'vite.config.ts not found')
    return
  }
  
  const viteConfig = fs.readFileSync(viteConfigPath, 'utf8')
  
  const requiredHeaders = [
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Content-Security-Policy',
    'Referrer-Policy',
  ]
  
  const missingHeaders = requiredHeaders.filter(header => !viteConfig.includes(header))
  
  if (missingHeaders.length === 0) {
    addResult('Security Headers', 'passed', 'All required security headers are configured')
  } else {
    addResult('Security Headers', 'warnings', `Missing headers: ${missingHeaders.join(', ')}`)
  }
}

/**
 * Check for hardcoded secrets or keys
 */
function checkHardcodedSecrets() {
  console.log('\n🔍 Checking for hardcoded secrets...')
  
  const secretPatterns = [
    'AKIA[0-9A-Z]{16}', // AWS Access Key ID
    'sk_live_[0-9a-zA-Z]{24}', // Stripe Live Secret Key
    'pk_live_[0-9a-zA-Z]{24}', // Stripe Live Publishable Key
    'AIza[0-9A-Za-z\\-_]{35}', // Google API Key
    'ya29\\.[0-9A-Za-z\\-_]+', // Google OAuth Access Token
    'ghp_[0-9a-zA-Z]{36}', // GitHub Personal Access Token
    'github_pat_[0-9a-zA-Z_]{82}', // GitHub PAT
    'sk_[a-z0-9]{32}', // Stripe Secret Key
    'eyJ[0-9a-zA-Z_=-]{10,}\\.[0-9a-zA-Z_=-]{10,}\\.[0-9a-zA-Z_=-]{10,}', // JWT Token
  ]
  
  let foundSecrets = []
  
  try {
    secretPatterns.forEach(pattern => {
      const result = runCommand(
        `grep -r -E "${pattern}" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null || true`,
        { silent: true, allowFailure: true }
      )
      
      if (result && result.trim()) {
        foundSecrets.push(`Pattern: ${pattern}`)
      }
    })
    
    if (foundSecrets.length === 0) {
      addResult('Hardcoded Secrets', 'passed', 'No hardcoded secrets detected')
    } else {
      addResult('Hardcoded Secrets', 'failed', 'Potential hardcoded secrets found', foundSecrets.join('; '))
    }
  } catch (error) {
    addResult('Hardcoded Secrets', 'warnings', 'Could not scan for secrets', error.message)
  }
}

/**
 * Check TypeScript strict mode
 */
function checkTypeScriptConfig() {
  console.log('\n📝 Checking TypeScript configuration...')
  
  // Check both tsconfig.json and tsconfig.app.json
  const configPaths = [
    path.join(process.cwd(), 'tsconfig.app.json'),
    path.join(process.cwd(), 'tsconfig.json'),
  ]
  
  let configFound = false
  
  for (const configPath of configPaths) {
    if (!fs.existsSync(configPath)) continue
    
    configFound = true
    
    try {
      // Read and strip comments from TypeScript config files
      let configContent = fs.readFileSync(configPath, 'utf8')
      // Remove single-line comments
      configContent = configContent.replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove line comments that start with //
      configContent = configContent.replace(/\/\/.*$/gm, '')
      
      const tsconfig = JSON.parse(configContent)
      const compilerOptions = tsconfig.compilerOptions || {}
      
      const securityOptions = {
        strict: true,
        noFallthroughCasesInSwitch: true,
      }
      
      const missingOptions = []
      
      Object.entries(securityOptions).forEach(([option, expected]) => {
        if (compilerOptions[option] !== expected) {
          missingOptions.push(option)
        }
      })
      
      if (missingOptions.length === 0) {
        addResult('TypeScript Config', 'passed', 'Strict TypeScript configuration enabled')
        return
      } else {
        addResult('TypeScript Config', 'warnings', `Consider enabling: ${missingOptions.join(', ')}`)
        return
      }
    } catch (error) {
      addResult('TypeScript Config', 'warnings', `Could not parse ${path.basename(configPath)}`, error.message)
      return
    }
  }
  
  if (!configFound) {
    addResult('TypeScript Config', 'warnings', 'No TypeScript configuration found')
  }
}

/**
 * Check ESLint security rules
 */
function checkESLintSecurity() {
  console.log('\n🔧 Checking ESLint security configuration...')
  
  const eslintConfigPath = path.join(process.cwd(), 'eslint.config.js')
  
  if (!fs.existsSync(eslintConfigPath)) {
    addResult('ESLint Security', 'warnings', 'eslint.config.js not found')
    return
  }
  
  const eslintConfig = fs.readFileSync(eslintConfigPath, 'utf8')
  
  if (eslintConfig.includes('eslint-plugin-security')) {
    addResult('ESLint Security', 'passed', 'ESLint security plugin is configured')
  } else {
    addResult('ESLint Security', 'warnings', 'ESLint security plugin not found')
  }
}

/**
 * Generate report
 */
function generateReport() {
  console.log('\n📊 Security Audit Summary:')
  console.log(`✅ Passed: ${auditResults.summary.passed}`)
  console.log(`⚠️ Warnings: ${auditResults.summary.warnings}`)
  console.log(`❌ Failed: ${auditResults.summary.failed}`)
  
  const reportPath = path.join(process.cwd(), 'security-audit-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(auditResults, null, 2))
  
  console.log(`\n📄 Detailed report saved to: ${reportPath}`)
  
  // Exit with error code if any checks failed
  if (auditResults.summary.failed > 0) {
    console.log('\n🚨 Security audit failed! Please address the issues above.')
    process.exit(1)
  } else if (auditResults.summary.warnings > 0) {
    console.log('\n⚠️ Security audit completed with warnings. Consider addressing them.')
    process.exit(0)
  } else {
    console.log('\n🎉 Security audit passed! All checks completed successfully.')
    process.exit(0)
  }
}

// Run all checks
async function runAudit() {
  try {
    checkNpmAudit()
    checkSensitiveFiles()
    checkSecurityHeaders()
    checkHardcodedSecrets()
    checkTypeScriptConfig()
    checkESLintSecurity()
    
    generateReport()
  } catch (error) {
    console.error('\n❌ Security audit failed:', error.message)
    process.exit(1)
  }
}

// Run the audit
runAudit()
