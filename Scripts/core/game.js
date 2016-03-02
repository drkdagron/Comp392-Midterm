/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    // declare game objects
    var scene = new Scene();
    var renderer;
    var camera;
    var control;
    var gui;
    var stats;
    var axis;
    var ground;
    var tower;
    var rotations;
    var cube;
    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera
        // add an axis helper to the scene
        axis = new AxisHelper(75);
        scene.add(axis);
        console.log("Added Helper to scene...");
        //add ground
        ground = new gameObject(new THREE.PlaneGeometry(500, 500), new THREE.MeshLambertMaterial({ color: 0x00802b }), 0, 0, 0);
        ground.rotateX(-90 * (Math.PI / 180));
        ground.receiveShadow = true;
        scene.add(ground);
        cube = [];
        tower = new THREE.Object3D();
        //add tower       
        cube.push(new objects.gameObject(new CubeGeometry(10, 10, 10), new THREE.MeshLambertMaterial({ color: Math.floor(Math.random() * 16777215) }), 0, 10, 0));
        tower.add(cube[cube.length - 1]);
        cube.push(new objects.gameObject(new CubeGeometry(9, 9, 9), new THREE.MeshLambertMaterial({ color: Math.floor(Math.random() * 16777215) }), 0, 19, 0));
        tower.add(cube[cube.length - 1]);
        cube.push(new objects.gameObject(new CubeGeometry(8, 8, 8), new THREE.MeshLambertMaterial({ color: Math.floor(Math.random() * 16777215) }), 0, 27, 0));
        tower.add(cube[cube.length - 1]);
        cube.push(new objects.gameObject(new CubeGeometry(7, 7, 7), new THREE.MeshLambertMaterial({ color: Math.floor(Math.random() * 16777215) }), 0, 34, 0));
        tower.add(cube[cube.length - 1]);
        cube.push(new objects.gameObject(new CubeGeometry(6, 6, 6), new THREE.MeshLambertMaterial({ color: Math.floor(Math.random() * 16777215) }), 0, 40, 0));
        tower.add(cube[cube.length - 1]);
        cube.push(new objects.gameObject(new CubeGeometry(2, 20, 2), new THREE.MeshLambertMaterial({ color: Math.floor(Math.random() * 16777215) }), 0, 50, 0));
        tower.add(cube[cube.length - 1]);
        cube.push(new objects.gameObject(new THREE.CylinderGeometry(10, 10, 5, 24), new THREE.MeshLambertMaterial({ color: Math.floor(Math.random() * 16777215) }), 0, 46, 0));
        tower.add(cube[cube.length - 1]);
        scene.add(tower);
        rotations = [7];
        //add ambientlight
        var ambientLight = new THREE.AmbientLight(0x555555);
        scene.add(ambientLight); /* ENTER CODE HERE */
        var spotLight = new SpotLight(0xeeeeee, 50, 2000);
        spotLight.castShadow = true;
        spotLight.position.set(-100, 50, 0);
        scene.add(spotLight);
        // add controls
        gui = new GUI();
        control = new Control(0.02, 0.2, 1, 0, 0, 0, 0, 0, 0, 0);
        addControl(control);
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
    }
    function addControl(controlObject) {
        gui.add(controlObject, 'rotate', -1, 1);
        gui.add(controlObject, 'rotateY', -1, 1);
        gui.add(controlObject, 'scaleY', 0.5, 3);
        gui.add(controlObject, 'cube', 0, 1);
        gui.add(controlObject, 'cube1', 0, 1);
        gui.add(controlObject, 'cube2', 0, 1);
        gui.add(controlObject, 'cube3', 0, 1);
        gui.add(controlObject, 'cube4', 0, 1);
        gui.add(controlObject, 'changeColors');
        gui.add(controlObject, 'towerX', -100, 100);
        gui.add(controlObject, 'towerZ', -100, 100);
        gui.add(controlObject, 'buildTower');
    }
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // Setup main game loop
    function gameLoop() {
        stats.update();
        tower.scale.y = control.scaleY;
        tower.children[0].rotateY(control.cube * control.rotateY * control.rotate);
        tower.children[1].rotateY(control.cube1 * control.rotateY * control.rotate);
        tower.children[2].rotateY(control.cube2 * control.rotateY * control.rotate);
        tower.children[3].rotateY(control.cube3 * control.rotateY * control.rotate);
        tower.children[4].rotateY(control.cube4 * control.rotateY * control.rotate);
        if (control.tower) {
            for (var j = 0; j < cube.length; j++) {
                cube[j].material.setValues({ color: Math.floor(Math.random() * 16777215) });
            }
            control.tower = false;
        }
        if (control.build) {
            var tmp = new THREE.Object3D();
            for (var l = 0; l < cube.length; l++) {
                tmp.add(cube[l]);
            }
            tmp.position.set(control.towerX, 0, control.towerZ);
            scene.add(tmp);
            control.build = false;
        }
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer();
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        camera.position.x = -150;
        camera.position.y = 200;
        camera.position.z = 150;
        camera.lookAt(scene.position);
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();
//# sourceMappingURL=game.js.map