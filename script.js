import * as THREE from 'three';

let xmove = 0
let ymove = 0
let mousex = 0
let mousey = 0
let lastx = 0
let lasty = 0
let sin = 0
let introy = 40
let targetCube = false

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;
scene.fog = new THREE.Fog(0x00C7FF, 20, 40);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio * 0.5);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const watergeometry = new THREE.BoxGeometry(16, 10, 14);
const basewatergeometry = new THREE.BoxGeometry(120, 7, 120);
const winggeometry = new THREE.BoxGeometry(2.5, 0.2, 0.5);
const greenmaterial = new THREE.MeshBasicMaterial({ color: 0x00ff30 });
const basebluematerial = new THREE.MeshBasicMaterial({ color: 0x3030ff });
const bluematerial = new THREE.MeshPhongMaterial({
    color: 0x3030ff,
    specular: 0x5050ff,
    shininess: 1500
})

const cube = new THREE.Mesh(geometry, greenmaterial);
const wings = new THREE.Mesh(winggeometry, greenmaterial);
const basewater = new THREE.Mesh(basewatergeometry, basebluematerial);
scene.add(cube);
scene.add(wings);
scene.add(basewater);
basewater.position.y = -20
basewater.position.z = 20
basewater.position.x = 0

setInterval(spawnWater, 800)

for (let i = 0; i < 9; i++) {
    const water = new THREE.Mesh(watergeometry, bluematerial);

    water.position.y = -16
    water.position.z = -36
    water.position.x = -40 + i * 9
    water.rotation.z = Math.floor(60 + Math.random() * 30);
    water.rotation.x = Math.floor(60 + Math.random() * 30);
    water.rotation.y = Math.floor(10 + Math.random() * 20);
    water.name = "water"

    scene.add(water);
}

for (let i = 0; i < 9; i++) {
    const water = new THREE.Mesh(watergeometry, bluematerial);

    water.position.y = -16
    water.position.z = -42
    water.position.x = -40 + i * 9
    water.rotation.z = Math.floor(60 + Math.random() * 30);
    water.rotation.x = Math.floor(60 + Math.random() * 30);
    water.rotation.y = Math.floor(10 + Math.random() * 20);
    water.name = "water"

    scene.add(water);
}

function spawnWater() {
    for (let i = 0; i < 9; i++) {
        const water = new THREE.Mesh(watergeometry, bluematerial);

        water.position.y = -16
        water.position.z = -48
        water.position.x = -40 + i * 9
        water.rotation.z = Math.floor(60 + Math.random() * 30);
        water.rotation.x = Math.floor(60 + Math.random() * 30);
        water.rotation.y = Math.floor(10 + Math.random() * 20);
        water.name = "water"

        scene.add(water);
    }
}

const light = new THREE.PointLight(0xffffff, 150, 0);
light.position.set(0, 5, -30);
scene.add(light);

const light2 = new THREE.AmbientLight(0xffffff, 2, 0);
light.position.set(0, 5, -2);
scene.add(light2);

renderer.setClearColor(0xffffff, 0);

const edges = new THREE.EdgesGeometry(geometry);
const wingedges = new THREE.EdgesGeometry(winggeometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x101020 }));
const wingline = new THREE.LineSegments(wingedges, new THREE.LineBasicMaterial({ color: 0x101020 }));
scene.add(line);
scene.add(wingline);


function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

document.body.addEventListener('keydown', keyPressed);
document.body.addEventListener('keyup', keyReleased);
document.body.addEventListener('mousemove', mouseMove);
document.addEventListener("click", changeCamera);

function keyPressed(e) {
    if (e.key == "ArrowRight") {
        xmove = 1
    }
    if (e.key == "ArrowLeft") {
        xmove = -1
    }
    if (e.key == "ArrowUp") {
        ymove = 1
    }
    if (e.key == "ArrowDown") {
        ymove = -1
    }
}

function keyReleased(e) {
    if (e.key == "ArrowRight" || e.key == "ArrowLeft") {
        xmove = 0
    }
    if (e.key == "ArrowUp" || e.key == "ArrowDown") {
        ymove = 0
    }
}

function mouseMove(e) {
    mousex = e.offsetX
    mousey = e.offsetY
}

function changeCamera() {
    if (introy < 2) {
        targetCube = !targetCube
        let text = document.querySelector(".info")
        if (text) {
            text.remove()
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    if (xmove) {
        cube.position.x += 0.1 * xmove
    }
    if (ymove) {
        cube.position.y += 0.1 * ymove
    }
    if (mousex) {
        cube.position.x = lerp(cube.position.x, scale(mousex, 12, document.body.clientWidth - 6, -9, 9), 0.05)
        cube.position.y = lerp(cube.position.y, scale(mousey, 12, document.body.clientHeight - 6, 5, -5), 0.05)
    }

    cube.rotation.z = (0 + cube.position.x - lastx) / 3 * -1
    cube.rotation.x = (0 + cube.position.y - lasty) / 2
    cube.rotation.y = (0 + cube.position.x - lastx) / 5 * -1
    line.position.x = cube.position.x
    line.position.y = cube.position.y
    line.rotation.z = cube.rotation.z
    line.rotation.x = cube.rotation.x
    line.rotation.y = cube.rotation.y
    wings.position.x = cube.position.x
    wings.position.y = cube.position.y
    wings.rotation.z = cube.rotation.z
    wings.rotation.x = cube.rotation.x
    wings.rotation.y = cube.rotation.y
    wingline.position.x = cube.position.x
    wingline.position.y = cube.position.y
    wingline.rotation.z = cube.rotation.z
    wingline.rotation.x = cube.rotation.x
    wingline.rotation.y = cube.rotation.y

    sin += 0.02

    let objs = scene.getObjectsByProperty('material', bluematerial)
    objs.forEach(child => {
        child.position.y = -16 + Math.sin(sin)
        child.position.z += 0.1
        if (child.position.z > 24) {
            scene.remove(child)
            child.geometry.dispose();
            child.material.dispose();
            child = undefined;
        }
    })

    lastx = lerp(lastx, cube.position.x, 0.1)
    lasty = lerp(lasty, cube.position.y, 0.1)

    if (targetCube) {
        camera.lookAt(cube.position.x, cube.position.y, cube.position.z);
    } else {
        camera.lookAt(0, introy, 0);
    }

    if (introy > 0) {
        introy = lerp(introy, 0, 0.01)
    }

    renderer.render(scene, camera);
}

animate();