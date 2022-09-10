import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";

const Handle = () => {
    const mountRef = useRef(null);
    const controls = useRef(null);

    useEffect(() => {
        //Data from the canvas
        const currentRef = mountRef.current;
        const { clientWidth: width, clientHeight: height } = currentRef;

        //Scene, camera, renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100);
        scene.add(camera);
        camera.position.set(5, 10, 5);
        camera.lookAt(new THREE.Vector3());

        const renderer = new THREE.WebGLRenderer({ alpha : true });
        renderer.setSize(width, height);
        currentRef.appendChild(renderer.domElement);

        //OrbitControls
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.maxDistance = 30;
        orbitControls.minDistance = 15;
        orbitControls.maxPolarAngle = Math.PI * 0.5;
        orbitControls.minPolarAngle = Math.PI * 0.2;

        //Resize canvas
        const resize = () => {
            renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
            camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", resize);

        //env MAP
        // const cubeTextureLoader = new THREE.CubeTextureLoader();
        // const evp = cubeTextureLoader.load([
        //     "./envMap/nx.jpg",
        //     "./envMap/ny.jpg",
        //     "./envMap/nz.jpg",
        //     "./envMap/px.jpg",
        //     "./envMap/py.jpg",
        //     "./envMap/pz.jpg",
        // ]);

        //Groups
        const det = new THREE.Group();

        //Loaders
        // const gltfLoader = new GLTFLoader();
        // gltfLoader.load("./model/Handle/Handle.gltf",(gltf) => {
        //
        //     while (gltf.scene.children.length){
        //         gltf.scene.children[0].material.envMap = evp;
        //         det.add(gltf.scene.children[0]);
        //     }
        // });

        //Loaders 2
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath("./draco/")

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)
        gltfLoader.load("./../../../model/library/amongusDraco.gltf",(gltf) => {
            scene.add(gltf.scene)
        })

        //Animate the scene
        const animate = () => {
            orbitControls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Change details
        let currentDetailsScene = null;
        const changeDetails = (gemName) => {
            scene.remove(currentDetailsScene);
            currentDetailsScene = null;

            for (let i = 0; i < det.children.length; i++) {
                if (det.children[i].name.includes(gemName.name)) {
                    currentDetailsScene = det.children[i].clone();
                }
            }
            if (currentDetailsScene !== null) {
                scene.add(currentDetailsScene);
            }
        };

        // change textures
        const changeHandleTextures = (textures) => {
            // console.log(det.children[0].material.normalMap);
            if (det.children[2]) {
                det.children[2].material.map = textures.base;
                // det.children[2].material.normalMap = textures.normal;
                // det.children[2].material.roughnessMap = textures.roughness;
                // det.children[2].material.needsUpdate = true;
                console.log("hello");
                console.log(det.children[2].material);
            }
        };

        controls.current = { changeDetails , changeHandleTextures };

        // Light
        const ambientalLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientalLight);

        const pointlight = new THREE.PointLight(0xffffff, 2);
        pointlight.position.set(6, 6, 6);
        scene.add(pointlight);

        return () => {
            window.removeEventListener("resize", resize);
            currentRef.removeChild(renderer.domElement);
        };
    }, []);

    // useEffect(() => {
    //     controls.current.changeDetails(currentDetails);
    // }, [currentDetails]);

    // useEffect(() => {
    //     controls.current.changeHandleTextures(currentColor);
    // }, [currentColor]);

    return (
        <div
            className='Contenedor3D'
            ref={mountRef}
            style={{ width: "100%", height: "100vh" }}
        ></div>
    );
};

export default Handle;