const { execSync } = require('child_process');

const runCommand = command => {
    try {
        execSync(`${command}`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed to run ${command}`, e);
        return false;
    }
    return true;
}

exports.runCommand = runCommand;