import * as THREE from "three";

/**
 * Procedurally constructs an anatomically realistic 3D Human Skeletal Model
 * with precise anatomical contours, processes, fossae, curvatures, and joints.
 */
export class SkeletonGeometryBuilder {
  public static buildSkeleton(
    boneMaterial: THREE.Material,
    cartilageMaterial?: THREE.Material
  ): THREE.Group {
    const rootGroup = new THREE.Group();
    rootGroup.name = "HumanSkeleton";
    const mat = boneMaterial;
    const cartMat = cartilageMaterial || boneMaterial;

    // Helper to register bone parts with metadata
    const addBone = (boneId: string, meshes: THREE.Object3D[]) => {
      const boneGroup = new THREE.Group();
      boneGroup.name = `Bone_${boneId}`;
      boneGroup.userData = { boneId };

      meshes.forEach((mesh) => {
        mesh.userData = { boneId };
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        boneGroup.add(mesh);
      });

      rootGroup.add(boneGroup);
    };

    // ==========================================
    // 1. CRANIUM / NEUROCRANIUM (y ~ 2.38)
    // ==========================================
    const craniumMeshes: THREE.Object3D[] = [];

    // Cranial Vault (Frontal, Parietal, Occipital dome)
    const cranialVaultGeom = new THREE.SphereGeometry(0.36, 32, 28);
    cranialVaultGeom.scale(0.86, 1.02, 0.98);
    const cranialVault = new THREE.Mesh(cranialVaultGeom, mat);
    cranialVault.position.set(0, 2.45, -0.03);
    craniumMeshes.push(cranialVault);

    // Frontal Bone brow ridge (Arcus Superciliaris & Glabella)
    const browGeom = new THREE.TorusGeometry(0.24, 0.032, 12, 24, Math.PI * 0.7);
    const brow = new THREE.Mesh(browGeom, mat);
    brow.position.set(0, 2.36, 0.16);
    brow.rotation.x = Math.PI * 0.18;
    brow.rotation.z = Math.PI;
    craniumMeshes.push(brow);

    // Occiput base & External Occipital Protuberance
    const occiputGeom = new THREE.SphereGeometry(0.28, 20, 20);
    occiputGeom.scale(0.82, 0.65, 0.9);
    const occiput = new THREE.Mesh(occiputGeom, mat);
    occiput.position.set(0, 2.31, -0.14);
    craniumMeshes.push(occiput);

    // Temporal bone plates & Mastoid processes
    [-0.28, 0.28].forEach((x, idx) => {
      // Squamous part of temporal bone
      const tempSquama = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.14, 0.04, 16),
        mat
      );
      tempSquama.rotation.z = Math.PI * 0.5;
      tempSquama.position.set(x, 2.38, -0.04);
      craniumMeshes.push(tempSquama);

      // Mastoid process (conical projection behind ear)
      const mastoidGeom = new THREE.ConeGeometry(0.035, 0.08, 12);
      const mastoid = new THREE.Mesh(mastoidGeom, mat);
      mastoid.position.set(x * 0.85, 2.22, -0.15);
      mastoid.rotation.x = Math.PI;
      craniumMeshes.push(mastoid);

      // Styloid process (slender needle-like projection)
      const styloidGeom = new THREE.CylinderGeometry(0.008, 0.012, 0.07, 8);
      const styloid = new THREE.Mesh(styloidGeom, mat);
      styloid.position.set(x * 0.7, 2.18, -0.06);
      styloid.rotation.z = idx === 0 ? 0.2 : -0.2;
      craniumMeshes.push(styloid);

      // External acoustic meatus (ear canal opening)
      const earCanal = new THREE.Mesh(
        new THREE.TorusGeometry(0.024, 0.008, 8, 16),
        mat
      );
      earCanal.position.set(x * 0.98, 2.29, -0.07);
      earCanal.rotation.y = Math.PI * 0.5;
      craniumMeshes.push(earCanal);
    });

    addBone("cranium", craniumMeshes);

    // ==========================================
    // 2. FACIAL BONES (Ossa Faciei / Viscerocranium)
    // ==========================================
    const facialMeshes: THREE.Object3D[] = [];

    // Maxilla (Upper jaw body & alveolar process)
    const maxillaBodyGeom = new THREE.BoxGeometry(0.28, 0.14, 0.22);
    const maxillaBody = new THREE.Mesh(maxillaBodyGeom, mat);
    maxillaBody.position.set(0, 2.19, 0.17);
    facialMeshes.push(maxillaBody);

    // Upper Dental Arcade (Teeth Row)
    const upperTeethCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.13, 2.12, 0.14),
      new THREE.Vector3(0, 2.11, 0.29),
      new THREE.Vector3(0.13, 2.12, 0.14)
    );
    const upperTeethTube = new THREE.Mesh(
      new THREE.TubeGeometry(upperTeethCurve, 16, 0.016, 10, false),
      mat
    );
    facialMeshes.push(upperTeethTube);

    // Individual Upper Teeth Dentition
    for (let t = -7; t <= 7; t++) {
      const angle = (t / 7) * 0.85;
      const tx = Math.sin(angle) * 0.13;
      const tz = 0.18 + Math.cos(angle) * 0.09;
      const toothGeom = new THREE.CylinderGeometry(0.008, 0.01, 0.025, 8);
      const tooth = new THREE.Mesh(toothGeom, mat);
      tooth.position.set(tx, 2.11, tz);
      facialMeshes.push(tooth);
    }

    // Nasal bridge & Piriform Aperture (Pear-shaped nasal cavity opening)
    const nasalBridgeGeom = new THREE.BoxGeometry(0.05, 0.12, 0.06);
    const nasalBridge = new THREE.Mesh(nasalBridgeGeom, mat);
    nasalBridge.position.set(0, 2.31, 0.29);
    nasalBridge.rotation.x = 0.35;
    facialMeshes.push(nasalBridge);

    // Nasal Septum (Vomer & Ethmoid perpendicular plate)
    const septumGeom = new THREE.BoxGeometry(0.012, 0.11, 0.08);
    const septum = new THREE.Mesh(septumGeom, mat);
    septum.position.set(0, 2.22, 0.25);
    facialMeshes.push(septum);

    // Zygomatic Bones (Cheekbones) & Zygomatic Arches
    [-0.23, 0.23].forEach((x, idx) => {
      const zygGeom = new THREE.BoxGeometry(0.1, 0.09, 0.15);
      const zyg = new THREE.Mesh(zygGeom, mat);
      zyg.position.set(x, 2.27, 0.19);
      zyg.rotation.y = idx === 0 ? 0.35 : -0.35;
      facialMeshes.push(zyg);

      // Zygomatic Arch Bridge connecting to temporal bone
      const archCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(x, 2.27, 0.19),
        new THREE.Vector3(x * 1.25, 2.28, 0.06),
        new THREE.Vector3(x * 1.05, 2.29, -0.06)
      );
      const archMesh = new THREE.Mesh(
        new THREE.TubeGeometry(archCurve, 12, 0.014, 8, false),
        mat
      );
      facialMeshes.push(archMesh);

      // Anatomical Orbital Rim (Eye Socket)
      const orbitRingGeom = new THREE.TorusGeometry(0.072, 0.02, 12, 24);
      const orbitRing = new THREE.Mesh(orbitRingGeom, mat);
      orbitRing.position.set(x * 0.65, 2.31, 0.27);
      orbitRing.rotation.y = idx === 0 ? 0.12 : -0.12;
      facialMeshes.push(orbitRing);
    });

    addBone("facial-bones", facialMeshes);

    // ==========================================
    // 3. MANDIBLE (Lower Jaw) (y ~ 2.10)
    // ==========================================
    const mandibleMeshes: THREE.Object3D[] = [];

    // Mandibular Body (Horseshoe arch)
    const mandibleCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.17, 2.1, 0.06),
      new THREE.Vector3(0, 2.05, 0.34),
      new THREE.Vector3(0.17, 2.1, 0.06)
    );
    const mandibleBody = new THREE.Mesh(
      new THREE.TubeGeometry(mandibleCurve, 24, 0.038, 12, false),
      mat
    );
    mandibleMeshes.push(mandibleBody);

    // Mental Protuberance (Chin) & Mental Tubercles
    const chinGeom = new THREE.SphereGeometry(0.052, 16, 16);
    chinGeom.scale(1.3, 0.85, 1.0);
    const chin = new THREE.Mesh(chinGeom, mat);
    chin.position.set(0, 2.04, 0.32);
    mandibleMeshes.push(chin);

    // Lower Dental Arcade & Teeth
    for (let t = -7; t <= 7; t++) {
      const angle = (t / 7) * 0.85;
      const tx = Math.sin(angle) * 0.125;
      const tz = 0.18 + Math.cos(angle) * 0.09;
      const toothGeom = new THREE.CylinderGeometry(0.008, 0.009, 0.022, 8);
      const tooth = new THREE.Mesh(toothGeom, mat);
      tooth.position.set(tx, 2.09, tz);
      mandibleMeshes.push(tooth);
    }

    // Ascending Ramus, Mandibular Angle (Gonion), Condyloid & Coronoid Processes
    [-0.17, 0.17].forEach((x, idx) => {
      // Mandibular Angle (Gonion)
      const gonion = new THREE.Mesh(
        new THREE.SphereGeometry(0.038, 12, 12),
        mat
      );
      gonion.position.set(x, 2.09, 0.04);
      mandibleMeshes.push(gonion);

      // Ascending Ramus Plate
      const ramusGeom = new THREE.BoxGeometry(0.024, 0.17, 0.08);
      const ramus = new THREE.Mesh(ramusGeom, mat);
      ramus.position.set(x, 2.18, 0.03);
      ramus.rotation.x = -0.15;
      mandibleMeshes.push(ramus);

      // Condylar Process (articulates with temporal glenoid fossa / TMJ)
      const condyleGeom = new THREE.SphereGeometry(0.032, 12, 12);
      condyleGeom.scale(1.4, 0.7, 0.9);
      const condyle = new THREE.Mesh(condyleGeom, mat);
      condyle.position.set(x, 2.27, -0.02);
      mandibleMeshes.push(condyle);

      // Coronoid Process (anterior sharp peak for temporalis muscle)
      const coronoidGeom = new THREE.ConeGeometry(0.025, 0.065, 10);
      const coronoid = new THREE.Mesh(coronoidGeom, mat);
      coronoid.position.set(x, 2.25, 0.06);
      coronoid.rotation.x = -0.3;
      mandibleMeshes.push(coronoid);
    });

    addBone("mandible", mandibleMeshes);

    // ==========================================
    // 4. CERVICAL VERTEBRAE (C1 - C7) (y: 1.84 to 2.06)
    // ==========================================
    const cervicalMeshes: THREE.Object3D[] = [];

    // C1: Atlas (Ring-like, no spinous process, wide transverse processes)
    const atlasRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.065, 0.02, 12, 20),
      mat
    );
    atlasRing.position.set(0, 2.06, -0.02);
    atlasRing.rotation.x = Math.PI * 0.5;
    cervicalMeshes.push(atlasRing);

    [-0.09, 0.09].forEach((x) => {
      const atlasTrans = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.018, 0.025),
        mat
      );
      atlasTrans.position.set(x, 2.06, -0.02);
      cervicalMeshes.push(atlasTrans);
    });

    // C2: Axis (with upward projecting Dens / Odontoid process)
    const axisBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.052, 0.056, 0.028, 14),
      mat
    );
    axisBody.position.set(0, 2.02, -0.025);
    cervicalMeshes.push(axisBody);

    const dens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.016, 0.02, 0.045, 10),
      mat
    );
    dens.position.set(0, 2.05, -0.02);
    cervicalMeshes.push(dens);

    // C3 - C7 Cervical Vertebrae
    for (let i = 2; i < 7; i++) {
      const t = (i - 2) / 4;
      const y = 1.98 - t * 0.14;
      const lordosisZ = -0.03 + Math.sin(t * Math.PI) * 0.015; // natural cervical lordosis

      // Vertebral Body
      const vertGeom = new THREE.CylinderGeometry(0.055, 0.06, 0.024, 14);
      const vert = new THREE.Mesh(vertGeom, mat);
      vert.position.set(0, y, lordosisZ);
      cervicalMeshes.push(vert);

      // Intervertebral Disc
      const discGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.008, 14);
      const disc = new THREE.Mesh(discGeom, cartMat);
      disc.position.set(0, y - 0.014, lordosisZ);
      cervicalMeshes.push(disc);

      // Transverse Processes with Transverse Foramina
      [-0.085, 0.085].forEach((x) => {
        const transGeom = new THREE.BoxGeometry(0.035, 0.018, 0.024);
        const trans = new THREE.Mesh(transGeom, mat);
        trans.position.set(x, y, lordosisZ - 0.01);
        cervicalMeshes.push(trans);
      });

      // Spinous Process (Bifid for C3-C6, long Vertebra Prominens for C7)
      if (i === 6) {
        // C7 Prominens
        const spineGeom = new THREE.CylinderGeometry(0.014, 0.022, 0.09, 8);
        const spine = new THREE.Mesh(spineGeom, mat);
        spine.position.set(0, y - 0.01, lordosisZ - 0.065);
        spine.rotation.x = Math.PI * 0.45;
        cervicalMeshes.push(spine);
      } else {
        // C3-C6 Bifid spine
        [-0.012, 0.012].forEach((bx) => {
          const spineGeom = new THREE.ConeGeometry(0.012, 0.045, 8);
          const spine = new THREE.Mesh(spineGeom, mat);
          spine.position.set(bx, y - 0.006, lordosisZ - 0.045);
          spine.rotation.x = Math.PI * 0.55;
          cervicalMeshes.push(spine);
        });
      }
    }

    addBone("cervical-vertebrae", cervicalMeshes);

    // ==========================================
    // 5. THORACIC VERTEBRAE (T1 - T12) (y: 1.20 to 1.84)
    // ==========================================
    const thoracicMeshes: THREE.Object3D[] = [];

    for (let i = 0; i < 12; i++) {
      const t = i / 11;
      const y = 1.82 - t * 0.6;
      const kyphosisZ = -0.055 - Math.sin(t * Math.PI) * 0.055; // anatomical kyphotic curve
      const radius = 0.062 + t * 0.025;

      // Heart-shaped Vertebral Body
      const vertGeom = new THREE.CylinderGeometry(radius, radius * 1.05, 0.038, 16);
      vertGeom.scale(1.05, 1.0, 1.1);
      const vert = new THREE.Mesh(vertGeom, mat);
      vert.position.set(0, y, kyphosisZ);
      thoracicMeshes.push(vert);

      // Cartilaginous Intervertebral Disc
      const discGeom = new THREE.CylinderGeometry(radius * 0.98, radius * 0.98, 0.01, 16);
      const disc = new THREE.Mesh(discGeom, cartMat);
      disc.position.set(0, y - 0.022, kyphosisZ);
      thoracicMeshes.push(disc);

      // Long downward slanting spinous process (overlapping)
      const spineGeom = new THREE.CylinderGeometry(0.012, 0.024, 0.09 + t * 0.02, 10);
      const spine = new THREE.Mesh(spineGeom, mat);
      spine.rotation.x = Math.PI * 0.38 + t * 0.1;
      spine.position.set(0, y - 0.025, kyphosisZ - 0.065);
      thoracicMeshes.push(spine);

      // Transverse Processes with Costal Facets
      [-1, 1].forEach((side) => {
        const transGeom = new THREE.BoxGeometry(0.065, 0.022, 0.032);
        const trans = new THREE.Mesh(transGeom, mat);
        trans.position.set(side * (radius + 0.04), y + 0.005, kyphosisZ - 0.03);
        trans.rotation.y = side * -0.3;
        thoracicMeshes.push(trans);
      });
    }

    addBone("thoracic-vertebrae", thoracicMeshes);

    // ==========================================
    // 6. LUMBAR VERTEBRAE (L1 - L5) (y: 0.80 to 1.18)
    // ==========================================
    const lumbarMeshes: THREE.Object3D[] = [];

    for (let i = 0; i < 5; i++) {
      const t = i / 4;
      const y = 1.16 - t * 0.34;
      const lordosisZ = -0.09 + Math.sin(t * Math.PI) * 0.045; // anatomical lumbar lordosis
      const scale = 0.095 + t * 0.03;

      // Massive Kidney-shaped Vertebral Body
      const vertGeom = new THREE.CylinderGeometry(scale, scale * 1.05, 0.052, 18);
      vertGeom.scale(1.22, 1.0, 1.05);
      const vert = new THREE.Mesh(vertGeom, mat);
      vert.position.set(0, y, lordosisZ);
      lumbarMeshes.push(vert);

      // Thick Lumbar Intervertebral Disc
      const discGeom = new THREE.CylinderGeometry(scale * 1.02, scale * 1.02, 0.016, 18);
      discGeom.scale(1.2, 1.0, 1.0);
      const disc = new THREE.Mesh(discGeom, cartMat);
      disc.position.set(0, y - 0.032, lordosisZ);
      lumbarMeshes.push(disc);

      // Massive Quadrangular Spinous Process
      const spinousGeom = new THREE.BoxGeometry(0.028, 0.048, 0.095);
      const spinous = new THREE.Mesh(spinousGeom, mat);
      spinous.position.set(0, y, lordosisZ - 0.095);
      lumbarMeshes.push(spinous);

      // Long Transverse Processes & Mammillary Tubercles
      [-1, 1].forEach((side) => {
        const transGeom = new THREE.BoxGeometry(0.095, 0.022, 0.03);
        const trans = new THREE.Mesh(transGeom, mat);
        trans.position.set(side * (scale + 0.06), y + 0.005, lordosisZ - 0.02);
        lumbarMeshes.push(trans);

        // Superior Articular Facet with Mammillary process
        const facet = new THREE.Mesh(
          new THREE.SphereGeometry(0.022, 8, 8),
          mat
        );
        facet.position.set(side * 0.06, y + 0.028, lordosisZ - 0.055);
        lumbarMeshes.push(facet);
      });
    }

    addBone("lumbar-vertebrae", lumbarMeshes);

    // ==========================================
    // 7. SACRUM (Ossa Sacrum) (y: 0.48 to 0.78)
    // ==========================================
    const sacrumMeshes: THREE.Object3D[] = [];

    // Triangular Concave Sacral Body
    const sacrumShape = new THREE.ConeGeometry(0.19, 0.3, 20);
    sacrumShape.scale(1.28, 1.0, 0.65);
    const sacrumMesh = new THREE.Mesh(sacrumShape, mat);
    sacrumMesh.rotation.x = Math.PI + 0.32;
    sacrumMesh.position.set(0, 0.64, -0.09);
    sacrumMeshes.push(sacrumMesh);

    // Median Sacral Crest (Fused spinous processes)
    const crestGeom = new THREE.BoxGeometry(0.024, 0.24, 0.04);
    const crest = new THREE.Mesh(crestGeom, mat);
    crest.rotation.x = 0.32;
    crest.position.set(0, 0.64, -0.16);
    sacrumMeshes.push(crest);

    // 4 Pairs of Anterior Sacral Foramina
    for (let f = 0; f < 4; f++) {
      const fy = 0.72 - f * 0.06;
      const fz = -0.04 - f * 0.02;
      const fSpread = 0.065 - f * 0.008;

      [-fSpread, fSpread].forEach((fx) => {
        const foramen = new THREE.Mesh(
          new THREE.TorusGeometry(0.015, 0.006, 8, 12),
          mat
        );
        foramen.position.set(fx, fy, fz);
        foramen.rotation.x = 0.3;
        sacrumMeshes.push(foramen);
      });
    }

    addBone("sacrum", sacrumMeshes);

    // ==========================================
    // 8. COCCYX (Tulang Ekor) (y: 0.38 to 0.48)
    // ==========================================
    const coccyxMeshes: THREE.Object3D[] = [];
    const coccyxShape = new THREE.ConeGeometry(0.048, 0.12, 12);
    coccyxShape.scale(1.0, 1.0, 0.5);
    const coccyxMesh = new THREE.Mesh(coccyxShape, mat);
    coccyxMesh.rotation.x = Math.PI - 0.28;
    coccyxMesh.position.set(0, 0.44, -0.035);
    coccyxMeshes.push(coccyxMesh);
    addBone("coccyx", coccyxMeshes);

    // ==========================================
    // 9. STERNUM (Tulang Dada) (y: 1.24 to 1.72)
    // ==========================================
    const sternumMeshes: THREE.Object3D[] = [];

    // Manubrium Sterni (with Jugular Suprasternal Notch & Clavicular Notches)
    const manubriumGeom = new THREE.BoxGeometry(0.19, 0.11, 0.038);
    const manubrium = new THREE.Mesh(manubriumGeom, mat);
    manubrium.position.set(0, 1.63, 0.165);
    sternumMeshes.push(manubrium);

    // Sternal Angle (Angle of Louis ridge)
    const angleLouisGeom = new THREE.BoxGeometry(0.16, 0.018, 0.042);
    const angleLouis = new THREE.Mesh(angleLouisGeom, mat);
    angleLouis.position.set(0, 1.575, 0.175);
    sternumMeshes.push(angleLouis);

    // Sternal Body / Gladiolus (Mesosternum with lateral costal facets)
    const bodyGeom = new THREE.BoxGeometry(0.125, 0.28, 0.032);
    const sternalBody = new THREE.Mesh(bodyGeom, mat);
    sternalBody.position.set(0, 1.43, 0.185);
    sternumMeshes.push(sternalBody);

    // Xiphoid Process (Processus Xiphoideus with cartilaginous apex)
    const xiphoidGeom = new THREE.ConeGeometry(0.026, 0.075, 8);
    const xiphoid = new THREE.Mesh(xiphoidGeom, mat);
    xiphoid.rotation.x = Math.PI;
    xiphoid.position.set(0, 1.25, 0.195);
    sternumMeshes.push(xiphoid);

    addBone("sternum", sternumMeshes);

    // ==========================================
    // 10. TRUE RIBS (Costae Verae I - VII)
    // ==========================================
    const trueRibsMeshes: THREE.Object3D[] = [];

    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      const yBack = 1.78 - t * 0.38;
      const yFront = 1.63 - t * 0.29;
      const rx = 0.22 + t * 0.13;
      const rz = 0.17 + t * 0.08;

      [-1, 1].forEach((side) => {
        // Osseous Rib Shaft (Bone)
        const bonyCurve = new THREE.CubicBezierCurve3(
          new THREE.Vector3(0, yBack, -0.075),
          new THREE.Vector3(side * rx * 1.22, yBack - 0.04, 0.02),
          new THREE.Vector3(side * rx, yFront + 0.02, rz),
          new THREE.Vector3(side * 0.14, yFront + 0.01, 0.18)
        );
        const ribTube = new THREE.Mesh(
          new THREE.TubeGeometry(bonyCurve, 26, 0.017 - t * 0.002, 10, false),
          mat
        );
        trueRibsMeshes.push(ribTube);

        // Costal Cartilage (connecting rib to sternum)
        const cartCurve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(side * 0.14, yFront + 0.01, 0.18),
          new THREE.Vector3(side * 0.09, yFront, 0.185),
          new THREE.Vector3(side * 0.06, yFront, 0.185)
        );
        const cartTube = new THREE.Mesh(
          new THREE.TubeGeometry(cartCurve, 10, 0.016, 8, false),
          cartMat
        );
        trueRibsMeshes.push(cartTube);
      });
    }

    addBone("true-ribs", trueRibsMeshes);

    // ==========================================
    // 11. FALSE RIBS (Costae Spuriae VIII - X)
    // ==========================================
    const falseRibsMeshes: THREE.Object3D[] = [];

    for (let i = 0; i < 3; i++) {
      const t = i / 2;
      const yBack = 1.36 - t * 0.12;
      const rx = 0.35 - t * 0.03;
      const rz = 0.22 - t * 0.02;
      const targetYFront = 1.32;

      [-1, 1].forEach((side) => {
        const bonyCurve = new THREE.CubicBezierCurve3(
          new THREE.Vector3(0, yBack, -0.08),
          new THREE.Vector3(side * rx * 1.18, yBack - 0.05, 0.02),
          new THREE.Vector3(side * rx * 0.92, targetYFront - 0.04 * (2 - i), rz),
          new THREE.Vector3(side * 0.16, targetYFront - 0.03 * (2 - i), 0.17)
        );
        const ribTube = new THREE.Mesh(
          new THREE.TubeGeometry(bonyCurve, 24, 0.015, 8, false),
          mat
        );
        falseRibsMeshes.push(ribTube);

        // Cartilage merging into 7th rib costal arch
        const cartCurve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(side * 0.16, targetYFront - 0.03 * (2 - i), 0.17),
          new THREE.Vector3(side * 0.12, targetYFront - 0.015 * (2 - i), 0.175),
          new THREE.Vector3(side * 0.07, targetYFront, 0.18)
        );
        const cartMesh = new THREE.Mesh(
          new THREE.TubeGeometry(cartCurve, 10, 0.014, 8, false),
          cartMat
        );
        falseRibsMeshes.push(cartMesh);
      });
    }

    addBone("false-ribs", falseRibsMeshes);

    // ==========================================
    // 12. FLOATING RIBS (Costae Fluctuantes XI - XII)
    // ==========================================
    const floatingRibsMeshes: THREE.Object3D[] = [];

    for (let i = 0; i < 2; i++) {
      const yBack = 1.19 - i * 0.08;
      const length = 0.19 - i * 0.04;

      [-1, 1].forEach((side) => {
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(0, yBack, -0.09),
          new THREE.Vector3(side * 0.29, yBack - 0.04, -0.03),
          new THREE.Vector3(side * (0.22 + length * 0.3), yBack - 0.08, 0.07)
        );
        const ribTube = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 18, 0.013, 8, false),
          mat
        );
        floatingRibsMeshes.push(ribTube);

        // Free cartilage tip
        const tip = new THREE.Mesh(
          new THREE.SphereGeometry(0.013, 8, 8),
          cartMat
        );
        tip.position.set(side * (0.22 + length * 0.3), yBack - 0.08, 0.07);
        floatingRibsMeshes.push(tip);
      });
    }

    addBone("floating-ribs", floatingRibsMeshes);

    // ==========================================
    // 13. CLAVICLE (Tulang Selangka)
    // ==========================================
    const clavicleMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      // Elegant S-shaped curvature
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(side * 0.09, 1.67, 0.16),
        new THREE.Vector3(side * 0.25, 1.70, 0.19),
        new THREE.Vector3(side * 0.39, 1.68, 0.09),
        new THREE.Vector3(side * 0.48, 1.69, -0.03)
      );
      const clavicle = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 22, 0.024, 12, false),
        mat
      );
      clavicleMeshes.push(clavicle);

      // Sternal Articular End (medial head)
      const sternalEnd = new THREE.Mesh(
        new THREE.SphereGeometry(0.032, 10, 10),
        mat
      );
      sternalEnd.position.set(side * 0.09, 1.67, 0.16);
      clavicleMeshes.push(sternalEnd);

      // Acromial Flattened End (lateral facet)
      const acromialEnd = new THREE.Mesh(
        new THREE.BoxGeometry(0.045, 0.02, 0.04),
        mat
      );
      acromialEnd.position.set(side * 0.48, 1.69, -0.03);
      clavicleMeshes.push(acromialEnd);
    });

    addBone("clavicle", clavicleMeshes);

    // ==========================================
    // 14. SCAPULA (Tulang Belikat)
    // ==========================================
    const scapulaMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      // Triangular Body of Scapula with Concave Subscapular Fossa
      const scapulaShape = new THREE.Shape();
      scapulaShape.moveTo(0, 0);
      scapulaShape.lineTo(side * 0.24, 0.03);
      scapulaShape.lineTo(side * 0.13, -0.34);
      scapulaShape.closePath();

      const extrudeSettings = {
        depth: 0.022,
        bevelEnabled: true,
        bevelThickness: 0.012,
        bevelSize: 0.012,
      };
      const scapulaBlade = new THREE.Mesh(
        new THREE.ExtrudeGeometry(scapulaShape, extrudeSettings),
        mat
      );
      scapulaBlade.position.set(side * 0.22, 1.66, -0.17);
      scapulaBlade.rotation.y = side * 0.26;
      scapulaMeshes.push(scapulaBlade);

      // Spine of Scapula (Spina Scapulae)
      const spineGeom = new THREE.BoxGeometry(0.2, 0.032, 0.065);
      const spine = new THREE.Mesh(spineGeom, mat);
      spine.position.set(side * 0.35, 1.68, -0.13);
      spine.rotation.z = side * 0.22;
      scapulaMeshes.push(spine);

      // Acromion Process (Articulates with clavicle)
      const acromionGeom = new THREE.BoxGeometry(0.065, 0.025, 0.075);
      const acromion = new THREE.Mesh(acromionGeom, mat);
      acromion.position.set(side * 0.47, 1.70, -0.05);
      scapulaMeshes.push(acromion);

      // Coracoid Process (Hook-like anterior beak)
      const coracoidCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(side * 0.44, 1.68, -0.06),
        new THREE.Vector3(side * 0.42, 1.71, 0.06),
        new THREE.Vector3(side * 0.39, 1.67, 0.09)
      );
      const coracoid = new THREE.Mesh(
        new THREE.TubeGeometry(coracoidCurve, 12, 0.016, 8, false),
        mat
      );
      scapulaMeshes.push(coracoid);

      // Glenoid Cavity Socket (Fossa Glenoidalis)
      const glenoidGeom = new THREE.TorusGeometry(0.045, 0.016, 10, 16);
      const glenoid = new THREE.Mesh(glenoidGeom, mat);
      glenoid.position.set(side * 0.47, 1.63, -0.06);
      glenoid.rotation.y = Math.PI * 0.5;
      scapulaMeshes.push(glenoid);
    });

    addBone("scapula", scapulaMeshes);

    // ==========================================
    // 15. HUMERUS (Tulang Lengan Atas)
    // ==========================================
    const humerusMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      // Hemispherical Smooth Articular Head
      const headGeom = new THREE.SphereGeometry(0.068, 18, 18);
      const head = new THREE.Mesh(headGeom, mat);
      head.position.set(side * 0.51, 1.63, -0.03);
      humerusMeshes.push(head);

      // Greater & Lesser Tubercles (Tuberculum Majus & Minus)
      const tuberGeom = new THREE.BoxGeometry(0.06, 0.055, 0.065);
      const tuber = new THREE.Mesh(tuberGeom, mat);
      tuber.position.set(side * 0.55, 1.61, 0.01);
      humerusMeshes.push(tuber);

      // Cylindrical Shaft with Deltoid Tuberosity
      const shaftGeom = new THREE.CylinderGeometry(0.034, 0.037, 0.56, 16);
      const shaft = new THREE.Mesh(shaftGeom, mat);
      shaft.position.set(side * 0.56, 1.33, 0);
      shaft.rotation.z = side * -0.08;
      humerusMeshes.push(shaft);

      // Distal Epicondyles, Trochlea & Capitulum
      const condyleGeom = new THREE.BoxGeometry(0.095, 0.05, 0.065);
      const condyle = new THREE.Mesh(condyleGeom, mat);
      condyle.position.set(side * 0.59, 1.04, 0);
      humerusMeshes.push(condyle);

      // Olecranon Fossa (Posterior deep depression)
      const fossa = new THREE.Mesh(
        new THREE.SphereGeometry(0.024, 10, 10),
        mat
      );
      fossa.position.set(side * 0.59, 1.05, -0.03);
      humerusMeshes.push(fossa);
    });

    addBone("humerus", humerusMeshes);

    // ==========================================
    // 16. RADIUS (Tulang Pengumpil - Lateral)
    // ==========================================
    const radiusMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      // Circular Radial Head (Caput Radii with Fovea)
      const headGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.026, 14);
      const head = new THREE.Mesh(headGeom, mat);
      head.position.set(side * 0.67, 1.01, 0.04);
      radiusMeshes.push(head);

      // Radial Tuberosity (Biceps tendon insertion)
      const tuberosity = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 8, 8),
        mat
      );
      tuberosity.position.set(side * 0.65, 0.97, 0.02);
      radiusMeshes.push(tuberosity);

      // Shaft expanding distally
      const shaftGeom = new THREE.CylinderGeometry(0.023, 0.034, 0.48, 14);
      const shaft = new THREE.Mesh(shaftGeom, mat);
      shaft.position.set(side * 0.69, 0.78, 0.04);
      shaft.rotation.z = side * -0.04;
      radiusMeshes.push(shaft);

      // Radial Styloid Process
      const styloid = new THREE.Mesh(
        new THREE.ConeGeometry(0.014, 0.035, 8),
        mat
      );
      styloid.position.set(side * 0.72, 0.54, 0.04);
      styloid.rotation.x = Math.PI;
      radiusMeshes.push(styloid);
    });

    addBone("radius", radiusMeshes);

    // ==========================================
    // 17. ULNA (Tulang Hasta - Medial)
    // ==========================================
    const ulnaMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      // Massive Hooked Olecranon Process & Trochlear Notch
      const olecranonGeom = new THREE.BoxGeometry(0.048, 0.065, 0.055);
      const olecranon = new THREE.Mesh(olecranonGeom, mat);
      olecranon.position.set(side * 0.59, 1.03, -0.04);
      ulnaMeshes.push(olecranon);

      // Coronoid Process (Anterior lip of notch)
      const coronoidGeom = new THREE.ConeGeometry(0.02, 0.035, 8);
      const coronoid = new THREE.Mesh(coronoidGeom, mat);
      coronoid.position.set(side * 0.59, 0.99, -0.01);
      coronoid.rotation.x = Math.PI * 0.5;
      ulnaMeshes.push(coronoid);

      // Tapering Shaft
      const shaftGeom = new THREE.CylinderGeometry(0.03, 0.021, 0.51, 14);
      const shaft = new THREE.Mesh(shaftGeom, mat);
      shaft.position.set(side * 0.60, 0.77, -0.02);
      shaft.rotation.z = side * -0.02;
      ulnaMeshes.push(shaft);

      // Distal Head of Ulna & Styloid Process
      const headGeom = new THREE.SphereGeometry(0.022, 10, 10);
      const distalHead = new THREE.Mesh(headGeom, mat);
      distalHead.position.set(side * 0.61, 0.52, -0.02);
      ulnaMeshes.push(distalHead);
    });

    addBone("ulna", ulnaMeshes);

    // ==========================================
    // 18. CARPALS (Tulang Pergelangan Tangan)
    // ==========================================
    const carpalMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      // 8 Individual Carpals in 2 Anatomical Rows
      const carpalPositions = [
        // Proximal row: Scaphoid, Lunate, Triquetrum, Pisiform
        { x: 0.03, y: 0.02, z: 0.02, r: 0.016 },
        { x: 0.01, y: 0.02, z: 0.0, r: 0.015 },
        { x: -0.015, y: 0.02, z: -0.015, r: 0.014 },
        { x: -0.02, y: 0.01, z: -0.025, r: 0.012 },
        // Distal row: Trapezium, Trapezoid, Capitate, Hamate
        { x: 0.035, y: -0.02, z: 0.025, r: 0.016 },
        { x: 0.015, y: -0.02, z: 0.01, r: 0.014 },
        { x: -0.005, y: -0.02, z: -0.005, r: 0.018 },
        { x: -0.025, y: -0.02, z: -0.02, r: 0.016 },
      ];

      carpalPositions.forEach((pos) => {
        const carpalMesh = new THREE.Mesh(
          new THREE.SphereGeometry(pos.r, 10, 10),
          mat
        );
        carpalMesh.position.set(
          side * (0.69 + pos.x),
          0.50 + pos.y,
          0.02 + pos.z
        );
        carpalMeshes.push(carpalMesh);
      });
    });

    addBone("carpals", carpalMeshes);

    // ==========================================
    // 19. METACARPALS (Tulang Telapak Tangan)
    // ==========================================
    const metacarpalMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      for (let i = 0; i < 5; i++) {
        const offset = (i - 2) * 0.023;
        const length = i === 0 ? 0.09 : 0.13 - Math.abs(i - 2) * 0.01;
        const metaGeom = new THREE.CylinderGeometry(0.009, 0.012, length, 8);
        const meta = new THREE.Mesh(metaGeom, mat);

        if (i === 0) {
          // Thumb Metacarpal I (Opposable angle)
          meta.rotation.z = side * -0.45;
          meta.rotation.y = side * 0.35;
          meta.position.set(side * 0.74, 0.44, 0.06);
        } else {
          meta.position.set(side * (0.68 + offset), 0.42, 0.02 + offset * 0.15);
        }
        metacarpalMeshes.push(meta);

        // Knuckle Head (Caput Metacarpalis)
        const knuckle = new THREE.Mesh(
          new THREE.SphereGeometry(0.014, 8, 8),
          mat
        );
        if (i === 0) {
          knuckle.position.set(side * 0.77, 0.40, 0.08);
        } else {
          knuckle.position.set(side * (0.68 + offset), 0.355, 0.02 + offset * 0.15);
        }
        metacarpalMeshes.push(knuckle);
      }
    });

    addBone("metacarpals", metacarpalMeshes);

    // ==========================================
    // 20. HAND PHALANGES (Tulang Jari Tangan)
    // ==========================================
    const handPhalangesMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      for (let i = 0; i < 5; i++) {
        const offset = (i - 2) * 0.023;
        const numJoints = i === 0 ? 2 : 3;

        for (let j = 0; j < numJoints; j++) {
          const phalLength = 0.04 - j * 0.008;
          const phalGeom = new THREE.CylinderGeometry(0.007, 0.0085, phalLength, 8);
          const phal = new THREE.Mesh(phalGeom, mat);

          if (i === 0) {
            phal.rotation.z = side * -0.45;
            phal.rotation.y = side * 0.35;
            phal.position.set(
              side * (0.78 + j * 0.018),
              0.37 - j * 0.032,
              0.09 + j * 0.015
            );
          } else {
            phal.position.set(
              side * (0.68 + offset),
              0.33 - j * 0.038,
              0.02 + offset * 0.15
            );
          }
          handPhalangesMeshes.push(phal);

          // Interphalangeal Joint Head
          const jointHead = new THREE.Mesh(
            new THREE.SphereGeometry(0.009, 6, 6),
            mat
          );
          if (i === 0) {
            jointHead.position.set(
              side * (0.78 + j * 0.018),
              0.37 - j * 0.032 - phalLength * 0.5,
              0.09 + j * 0.015
            );
          } else {
            jointHead.position.set(
              side * (0.68 + offset),
              0.33 - j * 0.038 - phalLength * 0.5,
              0.02 + offset * 0.15
            );
          }
          handPhalangesMeshes.push(jointHead);
        }
      }
    });

    addBone("hand-phalanges", handPhalangesMeshes);

    // ==========================================
    // 21. PELVIS (Gelang Panggul / Ossa Coxae)
    // ==========================================
    const pelvisMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      // Flared Iliac Wing (Ala Ossis Ilii) & S-curved Iliac Crest
      const iliumGeom = new THREE.TorusGeometry(0.25, 0.055, 16, 28, Math.PI * 0.75);
      const ilium = new THREE.Mesh(iliumGeom, mat);
      ilium.position.set(side * 0.18, 0.53, -0.02);
      ilium.rotation.y = side * 0.48;
      ilium.rotation.z = side * -0.38;
      pelvisMeshes.push(ilium);

      // Iliac Fossa concave plate
      const fossaShape = new THREE.Shape();
      fossaShape.moveTo(0, 0);
      fossaShape.lineTo(side * 0.18, 0.12);
      fossaShape.lineTo(side * 0.08, -0.16);
      fossaShape.closePath();
      const fossaMesh = new THREE.Mesh(
        new THREE.ExtrudeGeometry(fossaShape, { depth: 0.02, bevelEnabled: true }),
        mat
      );
      fossaMesh.position.set(side * 0.14, 0.54, -0.03);
      fossaMesh.rotation.y = side * 0.35;
      pelvisMeshes.push(fossaMesh);

      // Ischium & Massive Ischial Tuberosity (Sitting bone)
      const ischiumGeom = new THREE.BoxGeometry(0.12, 0.19, 0.15);
      const ischium = new THREE.Mesh(ischiumGeom, mat);
      ischium.position.set(side * 0.15, 0.33, 0.02);
      pelvisMeshes.push(ischium);

      // Obturator Foramen ring
      const obturator = new THREE.Mesh(
        new THREE.TorusGeometry(0.055, 0.018, 10, 16),
        mat
      );
      obturator.position.set(side * 0.12, 0.28, 0.06);
      obturator.rotation.y = side * 0.25;
      pelvisMeshes.push(obturator);

      // Deep Cup-shaped Acetabulum (Hip Joint Socket)
      const acetabulumGeom = new THREE.TorusGeometry(0.075, 0.026, 14, 20);
      const acetabulum = new THREE.Mesh(acetabulumGeom, mat);
      acetabulum.position.set(side * 0.24, 0.35, 0.04);
      acetabulum.rotation.y = side * Math.PI * 0.5;
      pelvisMeshes.push(acetabulum);
    });

    // Symphysis Pubis (Pubic joint cartilage & bridge)
    const symphysisGeom = new THREE.BoxGeometry(0.08, 0.065, 0.05);
    const symphysis = new THREE.Mesh(symphysisGeom, cartMat);
    symphysis.position.set(0, 0.25, 0.12);
    pelvisMeshes.push(symphysis);

    addBone("pelvis", pelvisMeshes);

    // ==========================================
    // 22. FEMUR (Tulang Paha)
    // ==========================================
    const femurMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      // Spherical Femoral Head with Fovea Capitis
      const headGeom = new THREE.SphereGeometry(0.068, 20, 20);
      const head = new THREE.Mesh(headGeom, mat);
      head.position.set(side * 0.21, 0.34, 0.04);
      femurMeshes.push(head);

      // Femoral Neck (Collum Femoris at ~125° angle)
      const neckGeom = new THREE.CylinderGeometry(0.034, 0.04, 0.13, 14);
      const neck = new THREE.Mesh(neckGeom, mat);
      neck.position.set(side * 0.25, 0.30, 0.03);
      neck.rotation.z = side * -0.68;
      femurMeshes.push(neck);

      // Greater Trochanter (Trochanter Major)
      const trochMajorGeom = new THREE.BoxGeometry(0.075, 0.09, 0.085);
      const trochMajor = new THREE.Mesh(trochMajorGeom, mat);
      trochMajor.position.set(side * 0.32, 0.27, 0.02);
      femurMeshes.push(trochMajor);

      // Lesser Trochanter (Trochanter Minor - posteromedial)
      const trochMinor = new THREE.Mesh(
        new THREE.SphereGeometry(0.024, 10, 10),
        mat
      );
      trochMinor.position.set(side * 0.27, 0.23, -0.03);
      femurMeshes.push(trochMinor);

      // Femur Shaft with subtle anterior bow & Linea Aspera ridge
      const shaftGeom = new THREE.CylinderGeometry(0.044, 0.05, 0.88, 18);
      const shaft = new THREE.Mesh(shaftGeom, mat);
      shaft.position.set(side * 0.26, -0.22, 0.025);
      shaft.rotation.z = side * 0.095; // Q-Angle
      shaft.rotation.x = -0.03; // Anterior convexity
      femurMeshes.push(shaft);

      // Distal Medial & Lateral Femoral Condyles and Patellar Groove
      const condyleGeom = new THREE.BoxGeometry(0.15, 0.09, 0.13);
      const condyle = new THREE.Mesh(condyleGeom, mat);
      condyle.position.set(side * 0.19, -0.66, 0.02);
      femurMeshes.push(condyle);

      // Intercondylar Fossa (posterior notch)
      const intercondylar = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 10, 10),
        mat
      );
      intercondylar.position.set(side * 0.19, -0.68, -0.04);
      femurMeshes.push(intercondylar);
    });

    addBone("femur", femurMeshes);

    // ==========================================
    // 23. PATELLA (Tempurung Lutut)
    // ==========================================
    const patellaMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      // Inverted Triangle / Heart-shaped Sesamoid bone
      const patellaGeom = new THREE.ConeGeometry(0.052, 0.085, 14);
      patellaGeom.scale(1.25, 1.0, 0.65);
      const patella = new THREE.Mesh(patellaGeom, mat);
      patella.rotation.x = Math.PI;
      patella.position.set(side * 0.19, -0.69, 0.10);
      patellaMeshes.push(patella);
    });

    addBone("patella", patellaMeshes);

    // ==========================================
    // 24. TIBIA (Tulang Kering - Medial)
    // ==========================================
    const tibiaMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      // Tibial Plateau (Medial and Lateral Condyles)
      const plateauGeom = new THREE.CylinderGeometry(0.08, 0.07, 0.08, 18);
      plateauGeom.scale(1.22, 1.0, 1.05);
      const plateau = new THREE.Mesh(plateauGeom, mat);
      plateau.position.set(side * 0.19, -0.74, 0.02);
      tibiaMeshes.push(plateau);

      // Intercondylar Eminence (Tibial Spine peaks)
      [-0.015, 0.015].forEach((sx) => {
        const spinePeak = new THREE.Mesh(
          new THREE.ConeGeometry(0.014, 0.025, 8),
          mat
        );
        spinePeak.position.set(side * 0.19 + sx, -0.695, 0.02);
        tibiaMeshes.push(spinePeak);
      });

      // Tibial Tuberosity (Patellar ligament insertion)
      const tuberosity = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 10, 10),
        mat
      );
      tuberosity.position.set(side * 0.19, -0.78, 0.08);
      tibiaMeshes.push(tuberosity);

      // Triangular Prism Shaft with Sharp Anterior Shin Border (Crista Anterior)
      const shaftGeom = new THREE.CylinderGeometry(0.04, 0.034, 0.82, 16);
      const shaft = new THREE.Mesh(shaftGeom, mat);
      shaft.position.set(side * 0.18, -1.16, 0.03);
      tibiaMeshes.push(shaft);

      // Medial Malleolus (Inner ankle prominence)
      const malleolusGeom = new THREE.BoxGeometry(0.06, 0.08, 0.07);
      const malleolus = new THREE.Mesh(malleolusGeom, mat);
      malleolus.position.set(side * 0.15, -1.58, 0.03);
      tibiaMeshes.push(malleolus);
    });

    addBone("tibia", tibiaMeshes);

    // ==========================================
    // 25. FIBULA (Tulang Betis - Lateral)
    // ==========================================
    const fibulaMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      // Proximal Head of Fibula with Styloid Apex
      const headGeom = new THREE.SphereGeometry(0.034, 12, 12);
      const head = new THREE.Mesh(headGeom, mat);
      head.position.set(side * 0.29, -0.78, 0.01);
      fibulaMeshes.push(head);

      // Slender Shaft
      const shaftGeom = new THREE.CylinderGeometry(0.018, 0.02, 0.78, 12);
      const shaft = new THREE.Mesh(shaftGeom, mat);
      shaft.position.set(side * 0.28, -1.17, 0.01);
      fibulaMeshes.push(shaft);

      // Lateral Malleolus (Outer ankle - extends lower than medial malleolus)
      const malleolusGeom = new THREE.BoxGeometry(0.05, 0.09, 0.065);
      const malleolus = new THREE.Mesh(malleolusGeom, mat);
      malleolus.position.set(side * 0.29, -1.60, 0.02);
      fibulaMeshes.push(malleolus);
    });

    addBone("fibula", fibulaMeshes);

    // ==========================================
    // 26. TARSALS (Tulang Pergelangan Kaki / Tumit)
    // ==========================================
    const tarsalMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      // Talus (Ankle bone with Trochlea Tali)
      const talusGeom = new THREE.BoxGeometry(0.08, 0.06, 0.095);
      const talus = new THREE.Mesh(talusGeom, mat);
      talus.position.set(side * 0.18, -1.62, 0.04);
      tarsalMeshes.push(talus);

      // Calcaneus (Heel bone with massive posterior tuberosity)
      const calcaneusGeom = new THREE.BoxGeometry(0.085, 0.08, 0.17);
      const calcaneus = new THREE.Mesh(calcaneusGeom, mat);
      calcaneus.position.set(side * 0.18, -1.67, -0.065);
      tarsalMeshes.push(calcaneus);

      // Navicular, Cuboid, and Cuneiforms (Midfoot tarsus)
      const midTarsalGeom = new THREE.BoxGeometry(0.11, 0.05, 0.09);
      const midTarsal = new THREE.Mesh(midTarsalGeom, mat);
      midTarsal.position.set(side * 0.18, -1.65, 0.13);
      tarsalMeshes.push(midTarsal);
    });

    addBone("tarsals", tarsalMeshes);

    // ==========================================
    // 27. METATARSALS (Tulang Telapak Kaki)
    // ==========================================
    const metatarsalMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      for (let i = 0; i < 5; i++) {
        const offset = (i - 2) * 0.024;
        const thickness = i === 0 ? 0.016 : 0.012; // Metatarsal I is robust
        const metaGeom = new THREE.CylinderGeometry(thickness * 0.9, thickness * 1.1, 0.16, 8);
        const meta = new THREE.Mesh(metaGeom, mat);
        meta.rotation.x = Math.PI * 0.45; // Longitudinal arch
        meta.position.set(side * (0.18 + offset), -1.68, 0.22);
        metatarsalMeshes.push(meta);

        // Metatarsal Ball Joint Head
        const ball = new THREE.Mesh(
          new THREE.SphereGeometry(thickness * 1.2, 8, 8),
          mat
        );
        ball.position.set(side * (0.18 + offset), -1.72, 0.29);
        metatarsalMeshes.push(ball);
      }
    });

    addBone("metatarsals", metatarsalMeshes);

    // ==========================================
    // 28. FOOT PHALANGES (Tulang Jari Kaki)
    // ==========================================
    const footPhalangesMeshes: THREE.Object3D[] = [];

    [-1, 1].forEach((side) => {
      for (let i = 0; i < 5; i++) {
        const offset = (i - 2) * 0.024;
        const numJoints = i === 0 ? 2 : 3; // Hallux has 2 phalanges

        for (let j = 0; j < numJoints; j++) {
          const phalLength = i === 0 ? 0.038 : 0.026 - j * 0.005;
          const radius = i === 0 ? 0.012 : 0.0085;
          const phalGeom = new THREE.CylinderGeometry(radius * 0.9, radius, phalLength, 8);
          const phal = new THREE.Mesh(phalGeom, mat);
          phal.rotation.x = Math.PI * 0.5;
          phal.position.set(
            side * (0.18 + offset),
            -1.73,
            0.32 + j * 0.032
          );
          footPhalangesMeshes.push(phal);
        }
      }
    });

    addBone("foot-phalanges", footPhalangesMeshes);

    return rootGroup;
  }
}
