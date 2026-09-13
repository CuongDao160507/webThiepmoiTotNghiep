const https = require('https');

https.get('https://www.youtube.com/watch?v=d3hXxAAuP2U', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const match = data.match(/<title>(.*?)<\/title>/);
        console.log('Title:', match ? match[1] : 'Not found');
    });
}).on('error', err => console.error(err));

