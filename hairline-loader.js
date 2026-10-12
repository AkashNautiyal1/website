const hairlineUrl = 'https://cdn.jsdelivr.net/npm/@lucasmarkes/hairline@0.5.0/+esm';
const introDuration = 4500;
const figureNames = [
    'basket',
    'branches',
    'cabinet',
    'dish',
    'drawer',
    'elevator',
    'exploded',
    'format',
    'hub',
    'keyboard',
    'laptop',
    'lockers',
    'loupe',
    'padlock',
    'patch',
    'phone',
    'phosphor',
    'plot',
    'plug',
    'query',
    'rail',
    'rebuild',
    'relay',
    'riffle',
    'router',
    'settle',
    'sieve',
    'slow',
    'stack',
    'terminal',
    'terrain',
    'turntable',
    'vault',
];

const root = document.documentElement;
const figureElement = document.querySelector('.hairline-loading-figure');
let figure;

document.addEventListener('hairline:intro:end', () => figure?.destroy(), { once: true });

function endIntro() {
    root.classList.remove('hairline-intro');
    document.dispatchEvent(new Event('hairline:intro:end'));
}

try {
    const hairline = await import(hairlineUrl);

    if (root.classList.contains('hairline-intro') && figureElement) {
        const name = figureNames[Math.floor(Math.random() * figureNames.length)];
        figure = hairline[name](figureElement, {
            intensity: 0.9,
            play: true,
            theme: 'auto',
        });
        window.setTimeout(endIntro, introDuration);
    }
} catch (error) {
    console.error('Unable to load the Hairline loading illustration.', error);
    endIntro();
}
