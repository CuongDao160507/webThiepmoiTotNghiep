const fs = require('fs');
const zlib = require('zlib');

function getContourBottom(filepath) {
    const buf = fs.readFileSync(filepath);
    let pos = 8;
    const idatChunks = [];
    let width = 0, height = 0;
    while (pos < buf.length) {
        const length = buf.readUInt32BE(pos);
        const type = buf.toString('ascii', pos + 4, pos + 8);
        if (type === 'IHDR') {
            width = buf.readUInt32BE(pos + 8);
            height = buf.readUInt32BE(pos + 12);
        } else if (type === 'IDAT') {
            idatChunks.push(buf.subarray(pos + 8, pos + 8 + length));
        }
        pos += 12 + length;
    }
    const compressed = Buffer.concat(idatChunks);
    const uncompressed = zlib.inflateSync(compressed);
    const stride = 1 + width * 4;

    console.log('Image:', filepath, width, 'x', height);
    const cols = [0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95].map(p => Math.floor(p * width));
    for (const x of cols) {
        // Find first y where alpha >= 128 (where paper starts)
        let paperY = height;
        for (let y = 0; y < height; y++) {
            const a = uncompressed[y * stride + 1 + x * 4 + 3];
            if (a >= 128) {
                paperY = y;
                break;
            }
        }
        console.log(`x=${x} (${(x / width * 100).toFixed(0)}%): paper starts at y=${paperY} (${(paperY / height * 100).toFixed(0)}%)`);
    }
}

getContourBottom('d:/thiepGemini/assets/torn_paper_bottom.png');

