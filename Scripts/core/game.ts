/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;

//Custom Game Objects
import gameObject = objects.gameObject;

// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    // declare game objects
    var scene: Scene = new Scene();
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    var axis:AxisHelper;
    
    var ground:gameObject;
    var tower:Object3D;
    var rotations:number[];
    
    var cube:objects.gameObject[];

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
        ground = new gameObject(new THREE.PlaneGeometry(500, 500), new THREE.MeshLambertMaterial({color:0x00802b}), 0, 0, 0);
        ground.rotateX(-90 * (Math.PI / 180));
        ground.receiveShadow = true;
        scene.add(ground);
        
        cube = [];
        tower = new THREE.Object3D();
        tower.name = "parent";
        //add tower       
        cube.push(new objects.gameObject(new CubeGeometry(10, 10, 10), new THREE.MeshLambertMaterial({color:Math.floor(Math.random()*16777215)}), 0, 10, 0));
        tower.add(cube[cube.length-1]);
        cube.push(new objects.gameObject(new CubeGeometry(9, 9, 9), new THREE.MeshLambertMaterial({color:Math.floor(Math.random()*16777215)}), 0, 19, 0));
        tower.add(cube[cube.length-1]);
        cube.push(new objects.gameObject(new CubeGeometry(8, 8, 8), new THREE.MeshLambertMaterial({color:Math.floor(Math.random()*16777215)}), 0, 27, 0));
        tower.add(cube[cube.length-1]);
        cube.push( new objects.gameObject(new CubeGeometry(7, 7, 7), new THREE.MeshLambertMaterial({color:Math.floor(Math.random()*16777215)}), 0, 34, 0));
        tower.add(cube[cube.length-1]);
        cube.push(new objects.gameObject(new CubeGeometry(6, 6, 6), new THREE.MeshLambertMaterial({color:Math.floor(Math.random()*16777215)}), 0, 40, 0));
        tower.add(cube[cube.length-1]);
        cube.push(new objects.gameObject(new CubeGeometry(2, 20, 2), new THREE.MeshLambertMaterial({color:Math.floor(Math.random()*16777215)}), 0, 50, 0));
        tower.add(cube[cube.length-1]);
        cube.push(new objects.gameObject(new THREE.CylinderGeometry(10, 10, 5, 24), new THREE.MeshLambertMaterial({color:Math.floor(Math.random()*16777215)}), 0, 46, 0));
        tower.add(cube[cube.length-1]);
        
        scene.add(tower);
        
        rotations = [7];
 
        //add ambientlight
        var ambientLight = new THREE.AmbientLight(0x555555);
        scene.add(ambientLight);/* ENTER CODE HERE */
        
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

    function addControl(controlObject: Control): void {
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
    function gameLoop(): void {
        stats.update();
        
        
        scene.traverse(function(threeObject:THREE.Object3D) {
        if (threeObject.name == "parent") {
            threeObject.scale.y = control.scaleY;
            threeObject.children[0].rotateY(control.cube * control.rotateY * control.rotate);
            threeObject.children[1].rotateY(control.cube1 * control.rotateY * control.rotate);
            threeObject.children[2].rotateY(control.cube2 * control.rotateY * control.rotate);
            threeObject.children[3].rotateY(control.cube3 * control.rotateY * control.rotate);
            threeObject.children[4].rotateY(control.cube4 * control.rotateY * control.rotate);
        }
        
        if (threeObject.name == "parent" && control.tower)
        {
            for (var j = 0; j < cube.length; j++)
            {
                cube[j].material.setValues({color: Math.floor(Math.random()*16777215)});
            }
            control.tower = false;
        }
    });
        
        //tower.scale.y = control.scaleY;
        //tower.children[0].rotateY(control.cube * control.rotateY * control.rotate);
        //tower.children[1].rotateY(control.cube1 * control.rotateY * control.rotate);
        //tower.children[2].rotateY(control.cube2 * control.rotateY * control.rotate);
        //tower.children[3].rotateY(control.cube3 * control.rotateY * control.rotate);
       // tower.children[4].rotateY(control.cube4 * control.rotateY * control.rotate);
        
        if (control.build)
        {   
            var test = tower.clone();
            test.name = "parent";
            test.position.set(control.towerX, 0, control.towerZ);
            scene.add(test);
            
            control.build = false;
        }
        
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
	
        // render the scene
        renderer.render(scene, camera);
    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
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
    }

})();

