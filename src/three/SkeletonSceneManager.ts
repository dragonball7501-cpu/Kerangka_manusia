import * as THREE from "three";
import { SkeletonGeometryBuilder } from "./SkeletonGeometryBuilder";
import { MaterialManager, DARK_THEME_COLORS, LIGHT_THEME_COLORS } from "./materials";
import { BONES_DATA } from "../data/bones";
import { BONE_GROUPS } from "../data/groups";
import { CameraPreset } from "../types/bone";

export interface SceneCallbacks {
  onHoverBone: (boneId: string | null) => void;
  onSelectBone: (boneId: string | null) => void;
  onCameraMove?: (positions: { [boneId: string]: { x: number; y: number; visible: boolean } }) => void;
}

export class SkeletonSceneManager {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private skeletonGroup: THREE.Group | null = null;
  private materialManager: MaterialManager;

  // Lighting
  private ambientLight!: THREE.HemisphereLight;
  private dirLight1!: THREE.DirectionalLight;
  private dirLight2!: THREE.DirectionalLight;
  private rimLight!: THREE.DirectionalLight;
  private gridHelper!: THREE.GridHelper;

  // Raycasting
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2(-999, -999);
  private callbacks: SceneCallbacks;

  // Interaction State
  private hoveredBoneId: string | null = null;
  private selectedBoneId: string | null = null;
  private activeGroupId: string | null = null;
  private isXRayMode: boolean = false;
  private isAutoRotate: boolean = false;
  private isDark: boolean = true;

  // Camera animation target
  private defaultCameraPos = new THREE.Vector3(0, 0.4, 6.8);
  private defaultTargetPos = new THREE.Vector3(0, 0.4, 0);
  private currentTarget = new THREE.Vector3(0, 0.4, 0);
  private targetCameraPos = new THREE.Vector3(0, 0.4, 6.8);
  private targetLookAt = new THREE.Vector3(0, 0.4, 0);
  private isAnimatingCamera = false;

  // Orbit control & Touch state
  private isDragging = false;
  private isPanning = false;
  private previousPosition = { x: 0, y: 0 };
  private spherical = new THREE.Spherical(6.8, Math.PI / 2, 0);
  private dragDistanceMoved = 0;
  private totalPointerMoved = 0;
  private wasMultiTouch = false;
  private velocityTheta = 0;
  private velocityPhi = 0;

  // Multi-touch tracking
  private lastTouchDist: number | null = null;
  private lastTouchMid = { x: 0, y: 0 };
  private touchStartTime = 0;
  private lastTouchEndTime = 0;
  private pointerDownPos = { x: 0, y: 0 };

  private animationFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(container: HTMLElement, isDark: boolean = true, callbacks: SceneCallbacks) {
    this.container = container;
    this.isDark = isDark;
    this.callbacks = callbacks;
    this.materialManager = new MaterialManager(isDark);

    // 1. Scene
    this.scene = new THREE.Scene();
    const colors = isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;
    this.scene.background = new THREE.Color(colors.background);
    this.scene.fog = new THREE.FogExp2(colors.background, 0.035);

    // 2. Camera
    const aspect = container.clientWidth / Math.max(container.clientHeight, 1);
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 50);
    this.camera.position.copy(this.defaultCameraPos);
    this.camera.lookAt(this.defaultTargetPos);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = isDark ? 1.15 : 1.0;

    // Prevent default scroll behavior on mobile touch
    this.renderer.domElement.style.touchAction = "none";
    this.renderer.domElement.style.userSelect = "none";
    this.renderer.domElement.style.outline = "none";
    container.appendChild(this.renderer.domElement);

    // 4. Lighting setup
    this.setupLighting();

    // 5. Environment Grid
    this.setupEnvironment();

    // 6. Build Skeleton Mesh
    this.buildSkeleton();

    // 7. Event listeners
    this.setupEvents();

    // 8. Start Loop
    this.animate = this.animate.bind(this);
    this.animate();
  }

  private setupLighting() {
    const skyColor = this.isDark ? 0xb9d5fd : 0xffffff;
    const groundColor = this.isDark ? 0x090d16 : 0xe2e8f0;
    this.ambientLight = new THREE.HemisphereLight(skyColor, groundColor, this.isDark ? 1.0 : 0.85);
    this.scene.add(this.ambientLight);

    // Key front light
    this.dirLight1 = new THREE.DirectionalLight(0xfffdfa, this.isDark ? 1.5 : 1.25);
    this.dirLight1.position.set(3, 4.5, 4);
    this.dirLight1.castShadow = true;
    this.dirLight1.shadow.mapSize.width = 1024;
    this.dirLight1.shadow.mapSize.height = 1024;
    this.dirLight1.shadow.camera.near = 0.5;
    this.dirLight1.shadow.camera.far = 15;
    this.dirLight1.shadow.camera.left = -2.2;
    this.dirLight1.shadow.camera.right = 2.2;
    this.dirLight1.shadow.camera.top = 3.2;
    this.dirLight1.shadow.camera.bottom = -3.2;
    this.dirLight1.shadow.bias = -0.0005;
    this.scene.add(this.dirLight1);

    // Fill soft cyan light
    this.dirLight2 = new THREE.DirectionalLight(this.isDark ? 0x38bdf8 : 0xbae6fd, this.isDark ? 0.85 : 0.55);
    this.dirLight2.position.set(-3, 2, 2.5);
    this.scene.add(this.dirLight2);

    // Rim backlight for anatomical edge definition
    this.rimLight = new THREE.DirectionalLight(this.isDark ? 0x818cf8 : 0x94a3b8, this.isDark ? 1.3 : 0.7);
    this.rimLight.position.set(0, 3.5, -4);
    this.scene.add(this.rimLight);
  }

  private setupEnvironment() {
    const colors = this.isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;
    this.gridHelper = new THREE.GridHelper(10, 20, colors.gridColor, colors.gridColor);
    this.gridHelper.position.y = -1.8;
    this.gridHelper.material.opacity = this.isDark ? 0.25 : 0.4;
    this.gridHelper.material.transparent = true;
    this.scene.add(this.gridHelper);

    // Shadow receiver plane
    const planeGeo = new THREE.PlaneGeometry(10, 10);
    const planeMat = new THREE.ShadowMaterial({ opacity: this.isDark ? 0.35 : 0.15 });
    const ground = new THREE.Mesh(planeGeo, planeMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.801;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  private buildSkeleton() {
    if (this.skeletonGroup) {
      this.scene.remove(this.skeletonGroup);
    }
    this.skeletonGroup = SkeletonGeometryBuilder.buildSkeleton(
      this.materialManager.getDefaultMaterial(),
      this.materialManager.getCartilageMaterial()
    );
    this.scene.add(this.skeletonGroup);
    this.updateMaterials();
  }

  public setTheme(isDark: boolean) {
    this.isDark = isDark;
    this.materialManager.setDarkTheme(isDark);
    const colors = isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

    this.scene.background = new THREE.Color(colors.background);
    this.scene.fog = new THREE.FogExp2(colors.background, 0.035);
    this.ambientLight.color.setHex(isDark ? 0xb9d5fd : 0xffffff);
    this.ambientLight.groundColor.setHex(isDark ? 0x090d16 : 0xe2e8f0);
    this.ambientLight.intensity = isDark ? 1.0 : 0.85;
    this.dirLight1.intensity = isDark ? 1.5 : 1.25;
    this.dirLight2.color.setHex(isDark ? 0x38bdf8 : 0xbae6fd);
    this.rimLight.color.setHex(isDark ? 0x818cf8 : 0x94a3b8);
    this.gridHelper.material.color.setHex(colors.gridColor);

    this.updateMaterials();
  }

  public setHoveredBone(boneId: string | null) {
    if (this.hoveredBoneId === boneId) return;
    this.hoveredBoneId = boneId;
    this.updateMaterials();
    this.callbacks.onHoverBone(boneId);
  }

  public setSelectedBone(boneId: string | null, shouldAnimate: boolean = true) {
    this.selectedBoneId = boneId;
    this.updateMaterials();

    if (boneId && shouldAnimate) {
      const bone = BONES_DATA.find((b) => b.id === boneId);
      if (bone) {
        this.focusOnBone(
          bone.model.focusPoint,
          bone.model.preferredDistance,
          bone.model.cameraAngle
        );
      }
    }
  }

  public focusBone(boneId: string | null) {
    this.setSelectedBone(boneId, true);
  }

  public setActiveGroup(groupId: string | null) {
    this.activeGroupId = groupId;
    this.updateMaterials();

    if (groupId) {
      const group = BONE_GROUPS.find((g) => g.id === groupId);
      if (group) {
        this.focusOnBone(group.defaultFocusPoint, group.defaultDistance);
      }
    }
  }

  public setXRayMode(enabled: boolean) {
    this.isXRayMode = enabled;
    this.updateMaterials();
  }

  public setAutoRotate(enabled: boolean) {
    this.isAutoRotate = enabled;
  }

  public applyCameraPreset(preset: CameraPreset) {
    this.isAnimatingCamera = true;
    const target = this.selectedBoneId
      ? BONES_DATA.find((b) => b.id === this.selectedBoneId)?.model.focusPoint || this.defaultTargetPos
      : this.defaultTargetPos;

    const targetV = new THREE.Vector3(...target);
    const dist = this.selectedBoneId
      ? BONES_DATA.find((b) => b.id === this.selectedBoneId)?.model.preferredDistance || 6.8
      : 6.8;

    this.targetLookAt.copy(targetV);

    switch (preset) {
      case "anterior": // Front
        this.targetCameraPos.set(targetV.x, targetV.y + 0.05, targetV.z + dist);
        break;
      case "posterior": // Back
        this.targetCameraPos.set(targetV.x, targetV.y + 0.05, targetV.z - dist);
        break;
      case "lateral-left": // Left side
        this.targetCameraPos.set(targetV.x - dist, targetV.y + 0.05, targetV.z);
        break;
      case "lateral-right": // Right side
        this.targetCameraPos.set(targetV.x + dist, targetV.y + 0.05, targetV.z);
        break;
      case "superior": // Top view
        this.targetCameraPos.set(targetV.x, targetV.y + dist * 0.9, targetV.z + 0.2);
        break;
      case "reset":
        this.selectedBoneId = null;
        this.activeGroupId = null;
        this.targetLookAt.copy(this.defaultTargetPos);
        this.targetCameraPos.copy(this.defaultCameraPos);
        this.updateMaterials();
        this.callbacks.onSelectBone(null);
        break;
    }
  }

  public zoom(delta: number) {
    this.isAnimatingCamera = false;
    const offset = new THREE.Vector3().subVectors(this.camera.position, this.currentTarget);
    this.spherical.setFromVector3(offset);

    // Adjust distance clamped cleanly so skeleton stays perfectly centered
    const currentDist = this.spherical.radius;
    const newDist = THREE.MathUtils.clamp(currentDist + delta * 0.45, 0.6, 6.2);
    this.spherical.radius = newDist;
    this.spherical.phi = THREE.MathUtils.clamp(this.spherical.phi, 0.08, Math.PI - 0.08);

    offset.setFromSpherical(this.spherical);
    this.camera.position.copy(this.currentTarget).add(offset);
    this.camera.lookAt(this.currentTarget);
  }

  public panVertical(deltaY: number) {
    this.isAnimatingCamera = false;
    const step = deltaY * 0.35;
    this.currentTarget.y = THREE.MathUtils.clamp(this.currentTarget.y + step, -1.65, 2.45);
    this.camera.position.y = THREE.MathUtils.clamp(this.camera.position.y + step, -1.65, 3.8);
    this.camera.lookAt(this.currentTarget);
  }

  public focusOnAnatomicalRegion(region: "head" | "torso" | "pelvis" | "legs" | "feet" | "full") {
    this.isAnimatingCamera = true;
    this.selectedBoneId = null;
    this.activeGroupId = null;
    this.updateMaterials();
    this.callbacks.onSelectBone(null);

    switch (region) {
      case "head":
        this.targetLookAt.set(0, 2.35, 0);
        this.targetCameraPos.set(0, 2.35, 1.6);
        break;
      case "torso":
        this.targetLookAt.set(0, 1.4, 0);
        this.targetCameraPos.set(0, 1.4, 2.2);
        break;
      case "pelvis":
        this.targetLookAt.set(0, 0.45, 0);
        this.targetCameraPos.set(0, 0.45, 1.9);
        break;
      case "legs":
        this.targetLookAt.set(0, -0.65, 0);
        this.targetCameraPos.set(0, -0.65, 2.4);
        break;
      case "feet":
        this.targetLookAt.set(0, -1.45, 0);
        this.targetCameraPos.set(0, -1.35, 1.7);
        break;
      case "full":
        this.targetLookAt.copy(this.defaultTargetPos);
        this.targetCameraPos.copy(this.defaultCameraPos);
        break;
    }
  }

  private focusOnBone(
    focusPoint: [number, number, number],
    distance: number,
    angleOffset?: [number, number, number]
  ) {
    this.isAnimatingCamera = true;
    this.targetLookAt.set(focusPoint[0], focusPoint[1], focusPoint[2]);

    const offset = angleOffset
      ? new THREE.Vector3(angleOffset[0], angleOffset[1], angleOffset[2]).normalize().multiplyScalar(distance)
      : new THREE.Vector3(0, 0.05, distance);

    this.targetCameraPos.copy(this.targetLookAt).add(offset);
  }

  public updateMaterials() {
    if (!this.skeletonGroup) return;

    const groupMap = new Map<string, string>();
    BONES_DATA.forEach((bone) => {
      const g = BONE_GROUPS.find((grp) => grp.id === bone.group);
      if (g) groupMap.set(bone.id, g.colorHex);
    });

    this.skeletonGroup.children.forEach((boneGroup) => {
      const boneId = boneGroup.userData.boneId;
      const isSelected = this.selectedBoneId === boneId;
      const isHovered = this.hoveredBoneId === boneId;
      const isInActiveGroup = this.activeGroupId
        ? BONES_DATA.find((b) => b.id === boneId)?.group === this.activeGroupId
        : false;

      let state: "default" | "hover" | "selected" | "ghost" = "default";

      if (isSelected) {
        state = "selected";
      } else if (isHovered) {
        state = "hover";
      } else if (this.isXRayMode && this.selectedBoneId && this.selectedBoneId !== boneId) {
        state = "ghost";
      } else if (this.activeGroupId && !isInActiveGroup) {
        state = "ghost";
      }

      const groupColor = this.activeGroupId && isInActiveGroup ? groupMap.get(boneId) : undefined;
      const mat = this.materialManager.getMaterial(state, groupColor);

      boneGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = mat;
        }
      });
    });
  }

  private setupEvents() {
    const el = this.renderer.domElement;

    // Mouse & Touch Pointer Move
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      // Ignore synthetic mouse events right after touch
      if (!("touches" in e) && performance.now() - this.lastTouchEndTime < 600) {
        return;
      }

      const rect = el.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length >= 2) {
          // Multi-touch: Gesture zoom is disabled; calculate midpoint to allow smooth rotation with 2 fingers
          this.wasMultiTouch = true;
          this.totalPointerMoved += 5;
          this.isAnimatingCamera = false;

          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          const midX = (touch1.clientX + touch2.clientX) * 0.5;
          const midY = (touch1.clientY + touch2.clientY) * 0.5;

          if (this.lastTouchMid.x !== 0 && this.lastTouchMid.y !== 0) {
            const deltaX = midX - this.lastTouchMid.x;
            const deltaY = midY - this.lastTouchMid.y;
            const rotateSpeed = 0.0048;
            this.velocityTheta = -deltaX * rotateSpeed;
            this.velocityPhi = -deltaY * rotateSpeed;

            const offset = new THREE.Vector3().subVectors(this.camera.position, this.currentTarget);
            this.spherical.setFromVector3(offset);
            this.spherical.theta += this.velocityTheta;
            this.spherical.phi = THREE.MathUtils.clamp(
              this.spherical.phi + this.velocityPhi,
              0.08,
              Math.PI - 0.08
            );
            offset.setFromSpherical(this.spherical);
            this.camera.position.copy(this.currentTarget).add(offset);
            this.camera.lookAt(this.currentTarget);
          }
          this.lastTouchMid = { x: midX, y: midY };
          return;
        } else if (e.touches.length === 1) {
          if (this.wasMultiTouch) {
            // Releasing from 2 fingers to 1 finger: seamlessly continue
            this.previousPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            this.velocityTheta = 0;
            this.velocityPhi = 0;
            this.wasMultiTouch = false;
            return;
          }
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      this.mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      // Orbit Dragging (single pointer)
      if (this.isDragging && !this.wasMultiTouch) {
        this.isAnimatingCamera = false;
        const rawDeltaX = clientX - this.previousPosition.x;
        const rawDeltaY = clientY - this.previousPosition.y;

        // Clamp step deltas to prevent sudden jumps
        const deltaX = THREE.MathUtils.clamp(rawDeltaX, -25, 25);
        const deltaY = THREE.MathUtils.clamp(rawDeltaY, -25, 25);

        const stepDist = Math.hypot(deltaX, deltaY);
        this.dragDistanceMoved += stepDist;
        this.totalPointerMoved += stepDist;

        if (this.isPanning) {
          this.panCamera(deltaX, deltaY);
        } else {
          // Rotate around currentTarget
          const rotateSpeed = 0.0048;
          this.velocityTheta = -deltaX * rotateSpeed;
          this.velocityPhi = -deltaY * rotateSpeed;

          const offset = new THREE.Vector3().subVectors(this.camera.position, this.currentTarget);
          this.spherical.setFromVector3(offset);

          this.spherical.theta += this.velocityTheta;
          this.spherical.phi = THREE.MathUtils.clamp(
            this.spherical.phi + this.velocityPhi,
            0.08,
            Math.PI - 0.08
          );

          offset.setFromSpherical(this.spherical);
          this.camera.position.copy(this.currentTarget).add(offset);
          this.camera.lookAt(this.currentTarget);
        }

        this.previousPosition = { x: clientX, y: clientY };
      } else {
        // Hover Raycast (desktop only)
        if (!("touches" in e)) {
          this.checkHover();
        }
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      // Ignore simulated mouse events right after touch
      if (!("touches" in e) && performance.now() - this.lastTouchEndTime < 600) {
        return;
      }

      this.dragDistanceMoved = 0;
      this.touchStartTime = performance.now();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length >= 2) {
          this.wasMultiTouch = true;
          this.isDragging = false;
          this.totalPointerMoved = 999;
          this.velocityTheta = 0;
          this.velocityPhi = 0;
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          this.lastTouchDist = Math.hypot(dx, dy);
          this.lastTouchMid = {
            x: (e.touches[0].clientX + e.touches[1].clientX) * 0.5,
            y: (e.touches[0].clientY + e.touches[1].clientY) * 0.5,
          };
          return;
        }

        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
        this.isDragging = true;
        this.wasMultiTouch = false;
        this.totalPointerMoved = 0;
        this.pointerDownPos = { x: clientX, y: clientY };
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
        this.isDragging = true;
        this.totalPointerMoved = 0;
        this.pointerDownPos = { x: clientX, y: clientY };
        this.isPanning = e.button === 2 || e.shiftKey;
      }

      this.previousPosition = { x: clientX, y: clientY };
    };

    const onPointerUp = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e || "changedTouches" in e) {
        this.lastTouchEndTime = performance.now();
        const touchEvent = e as TouchEvent;
        if (touchEvent.touches && touchEvent.touches.length > 0) {
          this.wasMultiTouch = true;
          this.velocityTheta = 0;
          this.velocityPhi = 0;
          this.isDragging = false;
          this.lastTouchDist = null;
          return;
        }

        if (this.wasMultiTouch) {
          this.wasMultiTouch = false;
          this.isDragging = false;
          this.velocityTheta = 0;
          this.velocityPhi = 0;
          this.lastTouchDist = null;
          return;
        }

        const duration = performance.now() - this.touchStartTime;
        if (this.totalPointerMoved < 10 && duration < 400) {
          if (touchEvent.changedTouches && touchEvent.changedTouches.length > 0) {
            const rect = el.getBoundingClientRect();
            const touch = touchEvent.changedTouches[0];
            this.mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
          }
          this.handleClick();
        }

        this.isDragging = false;
        this.isPanning = false;
        this.wasMultiTouch = false;
        this.lastTouchDist = null;
        return;
      }

      // Mouse Up
      if (performance.now() - this.lastTouchEndTime < 600) {
        return;
      }

      const duration = performance.now() - this.touchStartTime;
      const mouseEvent = e as MouseEvent;
      if (mouseEvent.button === 0 && this.totalPointerMoved < 8 && duration < 350) {
        this.handleClick();
      }

      this.isDragging = false;
      this.isPanning = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Manual gesture zooming is disabled; rotation only
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    el.addEventListener("mousemove", onPointerMove);
    el.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mouseup", onPointerUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("contextmenu", onContextMenu);

    el.addEventListener("touchmove", onPointerMove, { passive: false });
    el.addEventListener("touchstart", onPointerDown, { passive: false });
    window.addEventListener("touchend", onPointerUp);

    // Resize observer
    this.resizeObserver = new ResizeObserver(() => {
      if (!this.container) return;
      const width = this.container.clientWidth;
      const height = Math.max(this.container.clientHeight, 1);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
    this.resizeObserver.observe(this.container);
  }

  public panCamera(deltaX: number, deltaY: number) {
    this.isAnimatingCamera = false;
    const panSpeed = 0.0035;
    const offsetRight = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion).normalize();
    const offsetUp = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion).normalize();

    this.currentTarget.addScaledVector(offsetRight, -deltaX * panSpeed);
    this.currentTarget.addScaledVector(offsetUp, deltaY * panSpeed);
    this.currentTarget.y = THREE.MathUtils.clamp(this.currentTarget.y, -1.65, 2.45);
    this.currentTarget.x = THREE.MathUtils.clamp(this.currentTarget.x, -1.8, 1.8);

    this.camera.position.addScaledVector(offsetRight, -deltaX * panSpeed);
    this.camera.position.addScaledVector(offsetUp, deltaY * panSpeed);
    this.camera.position.y = THREE.MathUtils.clamp(this.camera.position.y, -1.65, 3.8);
    this.camera.lookAt(this.currentTarget);
  }

  private checkHover() {
    if (!this.skeletonGroup) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.skeletonGroup.children, true);

    if (intersects.length > 0) {
      const hitObj = intersects[0].object;
      const boneId = hitObj.userData.boneId;
      if (boneId) {
        this.setHoveredBone(boneId);
        this.renderer.domElement.style.cursor = "pointer";
        return;
      }
    }

    if (this.hoveredBoneId !== null) {
      this.setHoveredBone(null);
      this.renderer.domElement.style.cursor = "grab";
    }
  }

  private handleClick() {
    if (!this.skeletonGroup) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.skeletonGroup.children, true);

    if (intersects.length > 0) {
      const hitObj = intersects[0].object;
      const boneId = hitObj.userData.boneId;
      if (boneId) {
        // Keep the bone firmly selected (prevents definition HUD/panel from disappearing on double-click or re-click)
        this.setSelectedBone(boneId, true);
        this.callbacks.onSelectBone(boneId);
        return;
      }
    }
  }

  public getScreenPositions(): { [boneId: string]: { x: number; y: number; visible: boolean } } {
    const result: { [boneId: string]: { x: number; y: number; visible: boolean } } = {};
    if (!this.container) return result;

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    const tempV = new THREE.Vector3();

    BONES_DATA.forEach((bone) => {
      tempV.set(...bone.model.labelPosition);
      tempV.project(this.camera);

      const isVisible = tempV.z < 1.0 && tempV.x >= -1.1 && tempV.x <= 1.1 && tempV.y >= -1.1 && tempV.y <= 1.1;

      const screenX = (tempV.x * 0.5 + 0.5) * width;
      const screenY = (-(tempV.y * 0.5) + 0.5) * height;

      result[bone.id] = {
        x: screenX,
        y: screenY,
        visible: isVisible,
      };
    });

    return result;
  }

  private animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Auto-Rotate Turntable
    if (this.isAutoRotate && !this.isDragging) {
      const offset = new THREE.Vector3().subVectors(this.camera.position, this.currentTarget);
      this.spherical.setFromVector3(offset);
      this.spherical.theta += 0.004;
      offset.setFromSpherical(this.spherical);
      this.camera.position.copy(this.currentTarget).add(offset);
      this.camera.lookAt(this.currentTarget);
    }

    // Inertia rotation damping when released after fast drag
    if (!this.isDragging && !this.isAutoRotate && (Math.abs(this.velocityTheta) > 0.0002 || Math.abs(this.velocityPhi) > 0.0002)) {
      const offset = new THREE.Vector3().subVectors(this.camera.position, this.currentTarget);
      this.spherical.setFromVector3(offset);

      this.spherical.theta += this.velocityTheta;
      this.spherical.phi = THREE.MathUtils.clamp(
        this.spherical.phi + this.velocityPhi,
        0.08,
        Math.PI - 0.08
      );

      this.velocityTheta *= 0.88;
      this.velocityPhi *= 0.88;

      if (Math.abs(this.velocityTheta) <= 0.0002) this.velocityTheta = 0;
      if (Math.abs(this.velocityPhi) <= 0.0002) this.velocityPhi = 0;

      offset.setFromSpherical(this.spherical);
      this.camera.position.copy(this.currentTarget).add(offset);
      this.camera.lookAt(this.currentTarget);
    }

    // Camera animation damping
    if (this.isAnimatingCamera) {
      this.camera.position.lerp(this.targetCameraPos, 0.085);
      this.currentTarget.lerp(this.targetLookAt, 0.085);
      this.camera.lookAt(this.currentTarget);

      if (
        this.camera.position.distanceTo(this.targetCameraPos) < 0.008 &&
        this.currentTarget.distanceTo(this.targetLookAt) < 0.008
      ) {
        this.isAnimatingCamera = false;
      }
    }

    // Render
    this.renderer.render(this.scene, this.camera);

    // Report 2D label projections
    if (this.callbacks.onCameraMove) {
      this.callbacks.onCameraMove(this.getScreenPositions());
    }
  }

  public setCallbacks(callbacks: SceneCallbacks) {
    this.callbacks = callbacks;
  }

  public dispose() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
