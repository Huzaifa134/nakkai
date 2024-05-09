"use client";
import React, { useState, useEffect, createRef, useRef } from "react";
import dynamic from "next/dynamic";
import { useSelectedCountry } from "../Context/selectCountry";
import * as THREE from "three";

const GlobeTmpl = dynamic(() => import("./GlobeTmpl.js"), {
  ssr: false,
});

const GlobeFowareded = React.forwardRef((props, ref) => (
  <GlobeTmpl {...props} forwardRef={ref} />
));

const Globe = ({ sheetHandler = undefined }) => {
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();

  const globeRef = createRef(null);
  const globeContainerRef = useRef(null);
  const timuOutRef = useRef(null);

  const [screenWidth, setScreenWidth] = useState(0);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });

  const startTimeout = () => {
    if (globeRef.current.controls()) {
      const cloneRef = globeRef.current;
      timuOutRef.current = setTimeout(() => {
        cloneRef.controls().autoRotate = true;
        cloneRef.controls().autoRotateSpeed = 1.5;
      }, 4000);
    }
  };

  useEffect(() => {
    if (globeRef.current) {
      if (selectedCountry === "uk" || selectedCountry === "us") {
        globeRef.current.controls().autoRotate = false;
        globeRef.current.controls().autoRotate = 0;
      }
      if (selectedCountry === "uk") {
        if (globeRef.current) {
          globeRef.current.pointOfView(
            {
              lat: 51.5281798,
              lng: -2.7383707,
            },
            1000 // Animation Duration
          );
        }
        clearTimeout(timuOutRef.current);
        startTimeout();
        // setSelectedCountry("none");
      } else if (selectedCountry === "us") {
        if (globeRef.current) {
          globeRef.current.pointOfView(
            { lat: 40.7128, lng: -85.006 },
            1000 // Animation Duration
          );
        }
        clearTimeout(timuOutRef.current);
        startTimeout();
        // setSelectedCountry("none");
      }
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (isGlobeReady && globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 2;

      // Add clouds sphere
      const CLOUDS_IMG_URL =
        "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/clouds/clouds.png"; // from https://github.com/turban/webgl-earth
      const CLOUDS_ALT = 0.004;
      const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

      new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
        const clouds = new THREE.Mesh(
          new THREE.SphereGeometry(
            globeRef.current.getGlobeRadius() * (1 + CLOUDS_ALT),
            75,
            75
          ),
          new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
        );
        globeRef.current.scene().add(clouds);

        (function rotateClouds() {
          clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
          requestAnimationFrame(rotateClouds);
        })();

        let cameraAltitude;

        if (screenWidth < 320) {
          cameraAltitude = 400;
        } else if (screenWidth < 450) {
          cameraAltitude = 375;
        } else if (screenWidth < 600) {
          cameraAltitude = 350;
        } else {
          cameraAltitude = 275;
        }

        const currentPosition = globeRef.current.camera().position;
        const currentDirection = currentPosition.clone().normalize();
        const newPosition = currentDirection.multiplyScalar(cameraAltitude);
        globeRef.current.camera().position.copy(newPosition);
        globeRef.current.controls().update();
      });
    }
  }, [isGlobeReady]);

  useEffect(() => {
    if (globeRef.current) {
      let cameraAltitude;

      if (screenWidth < 320) {
        cameraAltitude = 400;
      } else if (screenWidth < 450) {
        cameraAltitude = 375;
      } else if (screenWidth < 600) {
        cameraAltitude = 350;
      } else {
        cameraAltitude = 275;
      }

      const currentPosition = globeRef.current.camera().position;
      const currentDirection = currentPosition.clone().normalize();
      const newPosition = currentDirection.multiplyScalar(cameraAltitude);
      globeRef.current.camera().position.copy(newPosition);
      globeRef.current.controls().update();
    }
  }, [screenWidth]);

  useEffect(() => {
    const handleResize = () => {
      if (globeContainerRef.current) {
        const { width, height } =
          globeContainerRef.current.getBoundingClientRect();
        setContainerDimensions({ width, height });
      }
      setScreenWidth(window.innerWidth);
    };

    handleResize(); // Call once to set initial dimensions
    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

  const markerSvg = `<svg viewBox="0 0 24 24" fill="currentcolor">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3333 22C15 22 19.6667 13.3834 19.6667 9.33333C19.6667 5.28325 16.3834 2 12.3333 2C8.28325 2 5 5.28325 5 9.33333C5 13.3834 9.66667 22 12.3333 22ZM12.3333 13.3333C14.9107 13.3333 17 11.244 17 8.66667C17 6.08934 14.9107 4 12.3333 4C9.756 4 7.66667 6.08934 7.66667 8.66667C7.66667 11.244 9.756 13.3333 12.3333 13.3333Z"/>
  </svg>`;

  return (
    <div
      ref={globeContainerRef}
      className="globeContainerStyle md:aspect-square"
      style={{ background: "#fbfbfb", borderRadius: "9999px" }}
    >
      <GlobeFowareded
        ref={globeRef}
        waitForGlobeReady={true}
        backgroundColor="rgba(100,100,100,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        onGlobeReady={() => {
          setIsGlobeReady((prev) => true);
        }}
        width={containerDimensions.width}
        height={containerDimensions.height}
        htmlElementsData={[
          {
            lat: 40.7128,
            lng: -74.006,
            size: 32,
            country: "us",
            label: `New York`,
            color: "red",
          }, // USA (New York City)
          {
            lat: 51.5074,
            lng: 0.1278,
            size: 32,
            label: "London",
            country: "uk",
            color: "red",
          }, // UK (London)
        ]}
        htmlElement={(d) => {
          const el = document.createElement("div");
          el.innerHTML =
            markerSvg +
            `<p style="color:white;font-weight:bold;fontsize:14px;width:fit-content;text-align:center;">${d.label}</p>`;
          el.style.color = d.color;
          el.style.width = `${d.size}px`;
          el.style["pointer-events"] = "auto";
          el.style.cursor = "pointer";
          el.onclick = () => {
            sheetHandler(d.country);
          };
          return el;
        }}
      />
    </div>
  );
};

export default Globe;
