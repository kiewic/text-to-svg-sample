const TextToSVG = require('text-to-svg');
const fs = require('fs');

const keyValuePairs = {
    'Continue': '100',
    'OK': '200',
    'Created': '201',
    'Accepted': '202',
    'No Content': '204',
    'Partial Content': '206',
    'Moved Permanently': '301',
    'Moved Temporarily Found': '302',
    'Not Modified': '304',
    'Bad Request': '400',
    'Unauthorized': '401',
    'Forbidden': '403',
    'Not Found': '404',
    'Internal Server Error': '500',
    'h2': 'h2',
    // 'HTTP Version 1': 'HTTP/1',
    // 'HTTP Version 1.1': 'HTTP/1.1',
    // 'HTTP Version 2': 'HTTP/2',
}

for (const name of Object.keys(keyValuePairs)) {
    createSvg(name, keyValuePairs[name]);
}

function createSvg(fileName, text) {
    // Converted /Library/Fonts/PTMono.ttc to OTF with onlinefontconverter.com
    const textToSVG = TextToSVG.loadSync('./PTMono-Bold.otf');

    const attributes = { /*fill: '#333'*/ };
    const options = { x: 0, y: 0, fontSize: 42, anchor: 'top', attributes: attributes, letterSpacing: -0.025 };

    const metrics = textToSVG.getMetrics(text, options);
    options.x = (100 - metrics.width) / 2;
    options.y = 24 + ((100 - 24 - 5 - metrics.height) / 2);

    const svg = textToSVG.getPath(text, options);

    let svg2 = fs.readFileSync('./input.svg', 'utf8');
    svg2 = svg2.replace(/<!-- paste here -->/g, svg);

    const path = `/Users/gilberto/repos/svg-to-text/${fileName}.svg`;
    fs.writeFileSync(path, svg2, undefined, { encoding: 'utf8' });

    var command = `open -a "Google Chrome"`;
    require('child_process').exec(command);
}
