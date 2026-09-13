const fs = require('fs');

console.log('Artifacts:');
const brainDir = 'C:/Users/admin/.gemini/antigravity/brain/5f01f887-6930-4bc5-b36c-6a3ca925c970';
const files = fs.readdirSync(brainDir);
files.filter(f => f.includes('torn')).forEach(f => {
    const stats = fs.statSync(brainDir + '/' + f);
    console.log(f, stats.size);
});

