// src/utils/computeMetrics.js
import * as PM from "./postureMath";

/**
 * Landmark indices mapping — adjust if your model uses different indices.
 * These indices match a common 33-landmark layout; verify and tweak.
 */
export const L = {
  NOSE: 0,
  LEFT_EYE_INNER: 1,
  LEFT_EYE: 2,
  LEFT_EYE_OUTER: 3,
  RIGHT_EYE_INNER: 4,
  RIGHT_EYE: 5,
  RIGHT_EYE_OUTER: 6,
  LEFT_EAR: 7,
  RIGHT_EAR: 8,
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,
  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
  // add more if model provides (e.g., mid-hip/spine)
};

/**
 * Parameters
 */
const MIN_VISIBILITY = 0.25; // drop frames where critical landmarks are low confidence
const SMOOTH_ALPHA = 0.25; // smoothing alpha for EMA on landmark coords (session-level optional)

/**
 * computeFrameMetrics(landmarks)
 * - Accepts landmarks array (model output). Returns a metrics object for this frame.
 */
export function computeFrameMetrics(landmarks) {
  if (!landmarks || !Array.isArray(landmarks)) return null;

  // helper to safely read landmarks with visibility
  const get = (idx) => {
    const raw = landmarks[idx];
    if (!raw) return { x:0,y:0,z:0,v:0 };
    // Some models place score/visibility differently
    return { x: raw.x ?? 0, y: raw.y ?? 0, z: raw.z ?? 0, visibility: (raw.visibility ?? raw.score ?? 1) };
  };

  // convert to internal vec with v property
  const v = (idx) => {
    const r = get(idx);
    return { x: r.x, y: r.y, z: r.z || 0, v: r.visibility ?? 1 };
  };

  const leftShoulder = v(L.LEFT_SHOULDER);
  const rightShoulder = v(L.RIGHT_SHOULDER);
  const leftEar = v(L.LEFT_EAR);
  const rightEar = v(L.RIGHT_EAR);
  const nose = v(L.NOSE);
  const leftHip = v(L.LEFT_HIP);
  const rightHip = v(L.RIGHT_HIP);
  const leftKnee = v(L.LEFT_KNEE);
  const rightKnee = v(L.RIGHT_KNEE);
  const leftAnkle = v(L.LEFT_ANKLE);
  const rightAnkle = v(L.RIGHT_ANKLE);
  const leftElbow = v(L.LEFT_ELBOW);
  const rightElbow = v(L.RIGHT_ELBOW);

  const midShoulders = PM.midpoint(leftShoulder, rightShoulder) || {x:0,y:0,z:0,v:0};
  const midHips = PM.midpoint(leftHip, rightHip) || {x:0,y:0,z:0,v:0};
  const visibilityScore = [
    leftShoulder.v, rightShoulder.v, leftHip.v, rightHip.v, leftKnee.v, rightKnee.v, leftAnkle.v, rightAnkle.v, leftEar.v, rightEar.v
  ].reduce((s,x)=>s+(x||0),0) / 10;

  // quick visibility gate
  if (visibilityScore < MIN_VISIBILITY) {
    return { ok: false, reason: "low_visibility", visibilityScore, timestamp: Date.now() };
  }

  // A. HEAD & NECK
  // 1. Neck angle (C7–Ear–Shoulder) approx: use midShoulders as C7 proxy, ear, and same-side shoulder
  const neckLeft = PM.angleDeg(leftEar, midShoulders, leftShoulder);
  const neckRight = PM.angleDeg(rightEar, midShoulders, rightShoulder);
  const neckAngle = (Number.isFinite(neckLeft) && Number.isFinite(neckRight)) ? (neckLeft + neckRight) / 2 : (Number.isFinite(neckLeft) ? neckLeft : neckRight);

  // 2. Forward head displacement: horizontal offset of ear/nose relative to midShoulders
  const forwardHead = ( (leftEar.x + rightEar.x)/2 || nose.x ) - midShoulders.x; // normalized units

  // 3. Cervical tilt left/right: compare head x vs sternum vertical line
  const cervicalTilt = (nose.x - midShoulders.x);

  // B. SHOULDERS
  // 4. Shoulder height difference (left - right)
  const shoulderHeightDiff = leftShoulder.y - rightShoulder.y;

  // 5. Shoulder rotation / rounded shoulders: use angle between shoulder-elbow vector and vertical (approx)
  const leftShoulderElbowAngle = PM.angleDeg(leftElbow, leftShoulder, midShoulders);
  const rightShoulderElbowAngle = PM.angleDeg(rightElbow, rightShoulder, midShoulders);
  const shoulderRotation = (leftShoulderElbowAngle + rightShoulderElbowAngle) / 2;

  // 6. Scapular winging indicator (depth diff) - approximate using z channel (model dependent)
  const scapularWinging = ((leftShoulder.z || 0) - (leftHip.z || 0)) - ((rightShoulder.z || 0) - (rightHip.z || 0));

  // C. SPINE & TRUNK
  // 7. Thoracic curve angle: angle between midShoulders -> midHips and vertical axis
  const verticalPoint = { x: midShoulders.x, y: midShoulders.y + 0.1, z: midShoulders.z };
  const thoracicAngle = PM.angleDeg(verticalPoint, midShoulders, midHips);

  // 8. Lumbar curve angle: use midHips and a lower reference (approx using knees)
  const midKnees = PM.midpoint(leftKnee, rightKnee) || {x:0,y:0,z:0};
  const lumbarAngle = PM.angleDeg(midHips, {x:midHips.x, y:midHips.y+0.01, z:midHips.z}, midKnees);

  // 9. Lateral trunk shift: horizontal of midShoulders relative to midHips
  const lateralTrunkShift = midShoulders.x - midHips.x;

  // D. PELVIS
  // 10. Pelvic tilt angle (approx): angle between hip line and horizontal
  const hipLineAngle = PM.angleDeg(leftHip, midHips, rightHip); // small angle indicates obliquity; this isn't classic ASIS-PSIS tilt but gives a signal
  const pelvicTiltApprox = hipLineAngle;

  // 11. Pelvic obliquity (left vs right hip height)
  const pelvicObliquity = leftHip.y - rightHip.y;

  // 12. Pelvic rotation: angle between shoulder line and hip line (cross-axis misalignment)
  const shoulderLine = PM.angleDeg(leftShoulder, midShoulders, rightShoulder);
  const hipLine = PM.angleDeg(leftHip, midHips, rightHip);
  const pelvicRotation = Math.abs(shoulderLine - hipLine);

  // E. HIPS / KNEES / ANKLES
  // 13. Hip-knee-ankle alignment (valgus/varus) per side -> angle at knee
  const kneeAngleLeft = PM.angleDeg(leftHip, leftKnee, leftAnkle);
  const kneeAngleRight = PM.angleDeg(rightHip, rightKnee, rightAnkle);

  // 14. Q-Angle approx using hip (proxy) - knee - ankle
  const qAngleLeft = PM.angleDeg(leftHip, leftKnee, leftAnkle);
  const qAngleRight = PM.angleDeg(rightHip, rightKnee, rightAnkle);

  // 15. Knee hyperextension / flexion angle -> compare to neutral range
  const kneeHyperLeft = kneeAngleLeft; // interpretation done later
  const kneeHyperRight = kneeAngleRight;

  // 16. Leg length difference (vertical distance hip->ankle)
  const leftLegLen = (leftHip.y - leftAnkle.y);
  const rightLegLen = (rightHip.y - rightAnkle.y);
  const legLengthDiff = leftLegLen - rightLegLen;

  // 17. Foot progression: needs toe/heel landmarks (approx using ankle->wrist?) - we skip precise here
  const footProgressionLeft = (leftAnkle.z || 0); // placeholder using z
  const footProgressionRight = (rightAnkle.z || 0);

  // F. WEIGHT SHIFT
  // 18. Lateral weight shift: COM proxy (midShoulders+midHips)/2 vs feet midline
  const feetMid = PM.midpoint(leftAnkle, rightAnkle) || {x:0,y:0,z:0};
  const com = { x: (midShoulders.x + midHips.x)/2, y: (midShoulders.y + midHips.y)/2, z: ((midShoulders.z||0)+(midHips.z||0))/2 };
  const lateralWeightShift = com.x - feetMid.x;

  // 19. Ant/posterior weight bias: compare COM.x/z relative to feet (approx using z)
  const antPostWeight = (com.z || 0) - (feetMid.z || 0);

  // G. RANGE OF MOTION info: placeholders (real ROM needs start/end frames from guided test)
  // 20-24: We'll collect angles dynamically during a test and aggregate externally.

  const metrics = {
    ok: true,
    timestamp: Date.now(),
    visibilityScore,
    // head/neck
    neckAngle, forwardHead, cervicalTilt,
    // shoulders
    shoulderHeightDiff, shoulderRotation, scapularWinging,
    // spine
    thoracicAngle, lumbarAngle, lateralTrunkShift,
    // pelvis
    pelvicTiltApprox, pelvicObliquity, pelvicRotation,
    // knees
    kneeAngleLeft, kneeAngleRight, qAngleLeft, qAngleRight, kneeHyperLeft, kneeHyperRight,
    // legs
    leftLegLen, rightLegLen, legLengthDiff,
    // feet / weight
    footProgressionLeft, footProgressionRight, lateralWeightShift, antPostWeight,
    // raw points we might want to log (normalized)
    midShoulders, midHips, feetMid, com,
    // small summary for quick display
    summary: {
      neckAngle, shoulderHeightDiff, pelvicObliquity, kneeAngleLeft, kneeAngleRight
    }
  };

  return metrics;
}

/**
 * aggregateSession(frames[])
 * - compute mean/min/max/std for numeric metrics captured frequently
 */
export function aggregateSession(frames = []) {
  if (!frames || frames.length === 0) return null;

  const numericKeys = [
    "neckAngle","forwardHead","cervicalTilt","shoulderHeightDiff","shoulderRotation","scapularWinging",
    "thoracicAngle","lumbarAngle","lateralTrunkShift","pelvicTiltApprox","pelvicObliquity","pelvicRotation",
    "kneeAngleLeft","kneeAngleRight","legLengthDiff","lateralWeightShift","antPostWeight"
  ];

  const out = { meta: { frames: frames.length, start: frames[0].timestamp, end: frames[frames.length-1].timestamp }, summary: {} };

  numericKeys.forEach((k) => {
    const vals = frames.map(f => (typeof f[k] === "number" && Number.isFinite(f[k])) ? f[k] : null).filter(x => x !== null);
    if (vals.length === 0) {
      out.summary[k] = { count: 0, mean: null, min: null, max: null, sd: null };
    } else {
      out.summary[k] = { count: vals.length, mean: PM.mean(vals), min: Math.min(...vals), max: Math.max(...vals), sd: PM.std(vals) };
    }
  });

  return out;
}

/**
 * convertSessionToCSV(frames) -> csv string
 */
export function convertSessionToCSV(frames = []) {
  if (!frames || frames.length === 0) return "";
  // choose columns
  const cols = ["timestamp","visibilityScore","neckAngle","forwardHead","shoulderHeightDiff","pelvicObliquity","kneeAngleLeft","kneeAngleRight","lateralWeightShift"];
  const header = cols.join(",");
  const rows = frames.map(f => cols.map(c => {
    const v = f[c];
    if (v === null || typeof v === "undefined") return "";
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  }).join(","));
  return [header, ...rows].join("\n");
}

/**
 * download helpers
 */
export function downloadJSON(obj, filename = "posture_report.json") {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

export function downloadText(text, filename = "posture_report.csv") {
  const blob = new Blob([text], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}
