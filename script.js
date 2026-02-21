
/* 3D hero small scene (floating geometry + icon particles) */
(function () {
    const root = document.getElementById('scene-root');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    root.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 4;

    // geometry
    const geom = new THREE.TorusKnotGeometry(0.8, 0.28, 150, 20);
    const mat = new THREE.MeshStandardMaterial({ metalness: 0.8, roughness: 0.2, color: 0xffffff });
    const knot = new THREE.Mesh(geom, mat);
    scene.add(knot);

    // little icon particles (spheres)
    const particles = new THREE.Group();
    for (let i = 0; i < 10; i++) {
        const s = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), new THREE.MeshStandardMaterial({ color: i % 2 ? 0xec4899 : 0x6366f1, emissive: i % 2 ? 0xec4899 : 0x6366f1, emissiveIntensity: 0.4 }));
        s.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6);
        particles.add(s);
    }
    scene.add(particles);

    // lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.18));
    const p1 = new THREE.PointLight(0x6366f1, 1.1); p1.position.set(3, 3, 3); scene.add(p1);
    const p2 = new THREE.PointLight(0xec4899, 0.9); p2.position.set(-3, -2, 3); scene.add(p2);

    function resize() { const w = root.clientWidth, h = root.clientHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); }
    window.addEventListener('resize', resize); resize();

    let mx = 0, my = 0;
    root.addEventListener('mousemove', (e) => {
        const r = root.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    });

    function animate() {
        requestAnimationFrame(animate);
        knot.rotation.x += 0.007 + my * 0.002;
        knot.rotation.y += 0.01 + mx * 0.003;
        particles.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();
})();

/* small id-card parallax using canvas (subtle) */
(function () {
    const canvas = document.getElementById('idCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function draw(glowX, glowY) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // simple glossy highlight
        const g = ctx.createRadialGradient(glowX * canvas.width, glowY * canvas.height, 20, glowX * canvas.width, glowY * canvas.height, 360);
        g.addColorStop(0, 'rgba(255,255,255,0.06)');
        g.addColorStop(1, 'rgba(255,255,255,0.0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    let gx = 0.2, gy = 0.2;
    canvas.parentElement.addEventListener('mousemove', (e) => {
        const r = canvas.parentElement.getBoundingClientRect();
        gx = (e.clientX - r.left) / r.width;
        gy = (e.clientY - r.top) / r.height;
        draw(gx, gy);
        const card = document.getElementById('idCard');
        const dx = (gx - 0.5) * 20;
        const dy = (gy - 0.5) * -14;
        card.style.transform = `rotateY(${dx}deg) rotateX(${dy}deg) translateZ(0)`;
    });
    // initial
    draw(0.3, 0.2);
})();

document.getElementById('year').textContent = new Date().getFullYear();

const goTopBtn = document.getElementById("goTopBtn");

if (goTopBtn) {
    goTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}