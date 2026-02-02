// event.js
function startAnimation() {
    const iframe = document.querySelector('iframe');
    if (!iframe) return;

    // Fade out the iframe
    iframe.style.transition = 'opacity 1s ease';
    iframe.style.opacity = '0';

    // Create and center the SVG
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '7vw');
    svg.setAttribute('class', 'svgLogo');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('style', 'user-select: none; position: absolute; color: #7e22ce; filter: drop-shadow(0 0 10px #7e22ce);');
    svg.innerHTML = '<path fill="currentColor" fill-rule="evenodd" d="M82 27c-40 11-63 52-51 92q10 27 33 40c11 7 19 9 33 10q19 1 33-6 28-13 39-44c3-9 4-25 2-35-6-27-25-46-51-56-12-3-27-4-38-1m9 13c-40 7-61 52-40 87 7 12 27 26 40 26l18-41 13 4s-18 35-16 37c2 1 13-1 21-5 19-10 30-30 30-51 0-28-19-54-47-57zm34 38-12 12 12 12 12-12z"/></svg>';
    svg.style.width = '7vw';
    svg.style.height = 'auto';
    svg.style.zIndex = '1000';
    svg.style.left = '50vw';
    svg.style.top = '50vh';
    document.body.appendChild(svg);

    // Add the message (centered without translate)
    const message = document.createElement('div');
    message.className = 'message';
    message.innerHTML = `
        <div class="title">Illumoid is taking a break</div>
        <div class="subtitle">It'll be back after break</div>
    `;
    document.body.appendChild(message);

    // Add styles (center text using absolute positioning and fixed dimensions)
    const style = document.createElement('style');
    style.textContent = `
        .message {
            position: fixed;
            width: 100vw;
            text-align: center;
            top: 60vh;
            color: white;
            font-family: 'Segoe UI', 'Roboto', sans-serif;
            z-index: 1001;
            opacity: 0;
            transition: opacity 1s ease;
        }
        .message .title {
            font-size: 48px;
            font-weight: bold;
            margin: 0;
        }
        .message .subtitle {
            font-size: 24px;
            margin: 10px 0 0;
        }
    `;
    document.head.appendChild(style);

    // Fade in the message after a short delay
    setTimeout(() => {
        message.style.opacity = '1';
    }, 500);

    // Dynamic bouncing logic
    let posX = 50, posY = 50;
    let speedX = (Math.random() - 0.5) * 2;
    let speedY = (Math.random() - 0.5) * 2;
    const svgSize = 7; // vw

    function updatePosition() {
        const svgElement = document.querySelector('.svgLogo');
        if (!svgElement) return;

        posX += speedX * 0.1;
        posY += speedY * 0.1;

        // Bounce off edges (with buffer for SVG size)
        if (posX <= svgSize/2 || posX >= 100 - svgSize/2) speedX *= -1;
        if (posY <= svgSize/2 || posY >= 100 - svgSize/2) speedY *= -1;

        svgElement.style.left = `${posX}vw`;
        svgElement.style.top = `${posY}vh`;

        requestAnimationFrame(updatePosition);
    }

    // Start the animation after a short delay
    setTimeout(() => {
        updatePosition();
    }, 100);
}

// Run after 2 seconds
setTimeout(startAnimation, 2000);
