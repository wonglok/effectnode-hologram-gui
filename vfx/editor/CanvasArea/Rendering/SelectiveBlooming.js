import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  Clock,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  ShaderMaterial,
  sRGBEncoding,
  Vector2,
} from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

let getSig = (uuid) => {
  return "done" + uuid;
};

let Settings = {
  bloomStrength: 1.05,
  bloomThreshold: 0.6,
  bloomRadius: 1.0,
  bloomCompositeMix: 0.7,
  bloomSatuationPower: 2.3,
};

export function SelectiveBlooming({ gl, scene, camera }) {
  let proc = useRef({
    render() {},
  });

  let renderer = gl;

  useEffect(() => {
    let GlobalUniforms = {
      globalBloom: { value: 0 },
      time: { value: 0 },
    };

    const params = {
      exposure: 1.5,
      bloomStrength: 4,
      bloomThreshold: 0.1,
      bloomRadius: 0.7,
    };

    //https://jsfiddle.net/prisoner849/jm0vb71c/

    let clock = new Clock();
    // bloom /////////////////////////////////////////////////////////////////////////////////////////
    var renderScene = new RenderPass(scene, camera);
    var bloomPass = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      Settings.bloomStrength,
      Settings.bloomRadius,
      Settings.bloomThreshold
    );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    var bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    //

    var finalPass = new ShaderPass(
      new ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }
        `,
        fragmentShader: `
          uniform sampler2D baseTexture;
          uniform sampler2D bloomTexture;
          varying vec2 vUv;
          void main() {

            vec2 myUV = vec2(vUv.x, vUv.y);

            float bloomCompositeMix = ${Settings.bloomCompositeMix.toFixed(2)};
            float bloomSatuationPower = ${Settings.bloomSatuationPower.toFixed(
              2
            )};

            vec4 bloomColor = texture2D( bloomTexture, myUV );
            bloomColor.r = pow(bloomColor.r, bloomSatuationPower);
            bloomColor.g = pow(bloomColor.g, bloomSatuationPower);
            bloomColor.b = pow(bloomColor.b, bloomSatuationPower);

            gl_FragColor = ( texture2D( baseTexture, myUV ) * 1.0 + vec4( bloomCompositeMix, bloomCompositeMix, bloomCompositeMix, 1.0 ) * bloomColor );

            // gl_FragColor = mix( texture2D( baseTexture, vUv ), texture2D( bloomTexture, vUv ), 0.5 );
          }
        `,
        defines: {},
      }),
      "baseTexture"
    );
    finalPass.needsSwap = true;

    var finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(finalPass);
    //////////////////////////////////////////////////////////////////////////////////////////////////

    let fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = renderer.getPixelRatio();
    fxaaPass.material.uniforms["resolution"].value.x =
      1 / (innerWidth * pixelRatio);
    fxaaPass.material.uniforms["resolution"].value.y =
      1 / (innerHeight * pixelRatio);
    finalComposer.addPass(fxaaPass);

    //////////////////////////////////////////////////////////////////////////////////////////////////

    let r = function () {
      var width = renderer.domElement.clientWidth;
      var height = renderer.domElement.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      bloomComposer.setSize(width, height);
      finalComposer.setSize(width, height);
      fxaaPass.material.uniforms["resolution"].value.x =
        1 / (innerWidth * pixelRatio);
      fxaaPass.material.uniforms["resolution"].value.y =
        1 / (innerHeight * pixelRatio);
    };

    window.addEventListener("resize", r);
    r();

    bloomComposer.renderTarget2.texture.encoding = sRGBEncoding;
    bloomComposer.renderTarget1.texture.encoding = sRGBEncoding;

    finalComposer.renderTarget1.texture.encoding = sRGBEncoding;
    finalComposer.renderTarget2.texture.encoding = sRGBEncoding;

    /////////////////////////////////////////////////////////////////////////////////////////////////

    let count = 0;
    proc.current.render = () => {
      scene.traverse((it) => {
        if (
          it.material &&
          !it.userData.isSetupDone &&
          (it.material instanceof MeshStandardMaterial ||
            it.material instanceof MeshPhongMaterial ||
            it.material instanceof MeshBasicMaterial ||
            it.material instanceof MeshLambertMaterial ||
            it.material instanceof MeshMatcapMaterial ||
            it.material instanceof MeshPhysicalMaterial ||
            it.material instanceof MeshToonMaterial)
        ) {
          it.userData.isSetupDone = true;
          count++;
          makeMat({ GlobalUniforms, it });
        }
      });

      console.log(count);

      if (count == 0) {
        renderer.render(scene, camera);
      } else {
        let t = clock.getElapsedTime();
        GlobalUniforms.time.value = t;
        GlobalUniforms.globalBloom.value = 1;

        scene.traverse((it) => {
          if (it.isSprite) {
            it.visible = false;
          }
        });

        renderer.setClearColor(0x000000);
        bloomComposer.render();

        // global bloom = false
        GlobalUniforms.globalBloom.value = 0;
        scene.traverse((it) => {
          if (it.isSprite) {
            it.visible = true;
          }
        });
        renderer.setClearColor(0x000000);
        finalComposer.render();
      }
    };

    return () => {
      count = 0;
    };
  }, []);

  useFrame(() => {
    proc.current.render();
  }, 10000);

  return <group></group>;
}

function makeMat({ GlobalUniforms, it }) {
  let m = it.material;

  let atBegin = `
    uniform float globalBloom;
    uniform float useBloom;
  `;

  let atEnd = `
    if (globalBloom == 1.0) {
      if (useBloom == 1.0) {
        float satPower = ${Settings.bloomSatuationPower.toFixed(2)};
        gl_FragColor = vec4(
          pow(gl_FragColor.r, satPower) * 0.45,
          pow(gl_FragColor.g, satPower) * 0.45,
          pow(gl_FragColor.b, satPower) * 0.45,
          gl_FragColor.a
        );
      } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      }
    }
  `;

  m.onB;
  m.onBeforeCompile = (shader) => {
    shader.uniforms.globalBloom = GlobalUniforms.globalBloom;
    shader.uniforms.useBloom = {
      value: 0,
    };

    setInterval(() => {
      if (m.userData.enableBloom) {
        shader.uniforms.useBloom.value = 1.0;
      }
      if (it.userData.enableBloom) {
        shader.uniforms.useBloom.value = 1.0;
      }
      if (it.userData.enableDarken) {
        shader.uniforms.useBloom.value = 0.0;
      }
      if (it.userData.forceBloom) {
        shader.uniforms.useBloom.value = 1.0;
      }
    });

    shader.fragmentShader = `${atBegin.trim()}\n${shader.fragmentShader}`;
    shader.fragmentShader = shader.fragmentShader.replace(
      `#include <dithering_fragment>`,
      `#include <dithering_fragment>\n${atEnd.trim()}`
    );
  };

  it.userData.____lastSig = getSig(it.uuid);
  m.customProgramCacheKey = () => {
    return getSig(it.uuid) + atEnd + atBegin;
  };

  return m;
}
