// src/utils/postureMath.js
export function toVec(l) {
    if (!l) return { x: 0, y: 0, z: 0, v: 0 };
    return { x: Number(l.x || 0), y: Number(l.y || 0), z: Number(l.z || 0) || 0, v: Number(l.visibility ?? l.score ?? 1) };
  }
  export function sub(a,b){ return { x: a.x-b.x, y: a.y-b.y, z: (a.z||0)-(b.z||0) }; }
  export function add(a,b){ return { x: a.x+b.x, y: a.y+b.y, z: (a.z||0)+(b.z||0) }; }
  export function mul(a,s){ return { x: a.x*s, y: a.y*s, z: (a.z||0)*s }; }
  export function dot(a,b){ return (a.x*b.x)+(a.y*b.y)+(a.z*b.z); }
  export function len(v){ return Math.sqrt((v.x*v.x)+(v.y*v.y)+(v.z*v.z)); }
  export function normalize(v){ const L=len(v)||1; return { x: v.x/L, y: v.y/L, z: v.z/L }; }
  
  // Angle at B formed by A-B-C (degrees)
  export function angleDeg(A,B,C){
    if(!A||!B||!C) return NaN;
    const BA = sub(A,B), BC = sub(C,B);
    const denom = (len(BA)*len(BC)) || 1e-6;
    let cos = dot(BA,BC)/denom;
    cos = Math.max(-1, Math.min(1, cos));
    return Math.acos(cos) * 180 / Math.PI;
  }
  
  // Horizontal (x) offset: A relative to B (positive means A is to the right)
  export function horizontalOffset(A,B){ return A.x - B.x; }
  // Vertical diff: A relative to B (positive means A is lower on screen with DOM coords where y grows downward)
  export function verticalDiff(A,B){ return A.y - B.y; }
  
  // midpoint
  export function midpoint(A,B){
    if(!A || !B) return null;
    return { x: (A.x+B.x)/2, y: (A.y+B.y)/2, z: ((A.z||0)+(B.z||0))/2, v: ((A.v||0)+(B.v||0))/2 };
  }
  
  // basic mean/std helpers
  export function mean(arr){
    if(!arr || arr.length===0) return NaN;
    return arr.reduce((s,v)=>s+v,0)/arr.length;
  }
  export function std(arr){
    if(!arr || arr.length<=1) return 0;
    const m = mean(arr);
    return Math.sqrt(arr.reduce((s,v)=>s+((v-m)*(v-m)),0)/(arr.length-1));
  }
  