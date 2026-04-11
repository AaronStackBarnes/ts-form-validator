const fs = require('fs');
const os = require('os');
const { execSync } = require('child_process');

function getReport() {
  const report = [];
  report.push('=== Environment Diagnostic Report ===');
  report.push(`Timestamp: ${new Date().toISOString()}`);
  report.push(`Node.js Version: ${process.version}`);
  report.push(`Platform: ${os.platform()}`);
  report.push(`Architecture: ${os.arch()}`);
  report.push(`Memory: ${Math.round(os.totalmem() / 1024 / 1024 / 1024)} GB`);
  report.push(`CPUs: ${os.cpus().length}`);
  report.push('');

  report.push('=== Project Dependencies ===');
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    report.push('Dependencies:');
    if (pkg.dependencies) {
      Object.keys(pkg.dependencies).forEach(dep => {
        report.push(`  - ${dep}: ${pkg.dependencies[dep]}`);
      });
    } else {
      report.push('  (none)');
    }
    report.push('Dev Dependencies:');
    if (pkg.devDependencies) {
      Object.keys(pkg.devDependencies).forEach(dep => {
        report.push(`  - ${dep}: ${pkg.devDependencies[dep]}`);
      });
    } else {
      report.push('  (none)');
    }
  } catch (err) {
    report.push(`Error reading package.json: ${err.message}`);
  }
  report.push('');

  report.push('=== NPM Audit Summary ===');
  try {
    const audit = execSync('npm audit --json', { encoding: 'utf8' });
    const auditData = JSON.parse(audit);
    const vulnerabilities = auditData.metadata.vulnerabilities;
    report.push(`Total Vulnerabilities: ${auditData.metadata.vulnerabilities.total}`);
    report.push(`  - Critical: ${vulnerabilities.critical}`);
    report.push(`  - High: ${vulnerabilities.high}`);
    report.push(`  - Moderate: ${vulnerabilities.moderate}`);
    report.push(`  - Low: ${vulnerabilities.low}`);
  } catch (err) {
    // npm audit returns non-zero exit code if vulnerabilities are found
    try {
        const auditData = JSON.parse(err.stdout);
        const vulnerabilities = auditData.metadata.vulnerabilities;
        report.push(`Total Vulnerabilities: ${auditData.metadata.vulnerabilities.total}`);
        report.push(`  - Critical: ${vulnerabilities.critical}`);
        report.push(`  - High: ${vulnerabilities.high}`);
        report.push(`  - Moderate: ${vulnerabilities.moderate}`);
        report.push(`  - Low: ${vulnerabilities.low}`);
    } catch (parseErr) {
        report.push(`Error running npm audit: ${err.message}`);
    }
  }
  report.push('');

  return report.join('\n');
}

const reportContent = getReport();
fs.writeFileSync('environment-check-report.txt', reportContent);
console.log('Environment diagnostic report generated: environment-check-report.txt');
