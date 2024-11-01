import React, { FC } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {GLView, ExpoWebGLRenderingContext} from 'expo-gl'
import {THREE, Renderer} from 'expo-three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {Asset} from 'expo-asset'

interface MovementGraphicsProps { }

const MovementGraphics: FC<MovementGraphicsProps> = () =>
(
  <GLView
    style={{ flex: 1 }}
    onContextCreate={(gl: ExpoWebGLRenderingContext) => {
      // Create a WebGLRenderer without a DOM element
      const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
      const renderer = new Renderer({
        gl
      });
      renderer.shadowMap.enabled = true;
      renderer.setSize(width, height);
      renderer.setClearColor(0x668096)
      const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000,
      );
      const scene = new THREE.Scene();
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);
      camera.position.set(-10, 30, 30);
      camera.lookAt(0, 0, 0)

      const boxGeometry = new THREE.BoxGeometry();
      const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      scene.add(box);

      const planeGeometry = new THREE.PlaneGeometry(30, 30);
      const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      scene.add(plane);
      plane.rotation.x = -0.5 * Math.PI;
      plane.receiveShadow = true;

      const gridHelper = new THREE.GridHelper(30);
      scene.add(gridHelper);

      const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x0000FF,
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(sphere);
      sphere.position.set(-10, 10, 0);
      sphere.castShadow = true;

      const ambientLight = new THREE.AmbientLight(0x333333);
      scene.add(ambientLight);
      //
      //        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
      //        scene.add(directionalLight);
      //        directionalLight.position.set(-30, 50, 0);
      //        directionalLight.castShadow = true;
      //        directionalLight.shadow.camera.bottom = -12;
      //
      //        const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
      //        scene.add(dLightHelper);
      //
      //        const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
      //        scene.add(dLightShadowHelper);
      //           
      const spotLight = new THREE.SpotLight(0xFFFFFF, 1, 0, undefined, undefined, 0);
      scene.add(spotLight);
      spotLight.position.set(-100, 100, 0);
      spotLight.castShadow = true;

      const sLightHelper = new THREE.SpotLightHelper(spotLight);
      scene.add(sLightHelper);

      renderer.render(scene, camera);

      let step = 0
      let speed = 0.01

      function animate(time: DOMHighResTimeStamp) {
        box.rotation.x = time / 1000;
        box.rotation.y = time / 1000;

        step += speed;
        sphere.position.y = 10 * Math.abs(Math.sin(step));

        renderer.render(scene, camera);
        gl.endFrameEXP();
      }
      renderer.setAnimationLoop(animate)
    }}
  />
);

export default MovementGraphics;
