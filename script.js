// Get the book card elements
const bookCards = document.querySelectorAll('.book-card');

bookCards.forEach(card => {
    card.addEventListener('click', () => {
        // Initialize 3D book viewer when clicked
        openBookViewer(card);
    });
});

function openBookViewer(card) {
    // Create the overlay
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.fontSize = '16px';
    closeButton.style.backgroundColor = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    overlay.appendChild(closeButton);
    document.body.appendChild(overlay);

    // Create a canvas for 3D book viewer
    const canvas = document.createElement('canvas');
    overlay.appendChild(canvas);

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add OrbitControls for camera manipulation
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Create book geometry (a simple cube for this example)
    const geometry = new THREE.BoxGeometry(1, 1.5, 0.1); // Spine of the book
    const material = new THREE.MeshBasicMaterial({ color: card.getAttribute('data-color') });
    const book = new THREE.Mesh(geometry, material);
    scene.add(book);

    // Position camera
    camera.position.z = 5;

    // Render the scene
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}
