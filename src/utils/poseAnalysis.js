// src/utils/poseAnalysis.js
export class PostureAnalysis {
    constructor() {
      this.metrics = {};
      this.history = [];
      this.sampleInterval = 1000; // Collect data every second
      this.lastSampleTime = 0;
    }
  
    // Calculate all mandatory metrics from pose landmarks
    calculateAllMetrics(landmarks, timestamp) {
      if (!landmarks || landmarks.length === 0) return null;
      
      const pose = landmarks[0];
      const metrics = {
        timestamp,
        // A. HEAD & NECK
        neckAngle: this.calculateNeckAngle(pose),
        forwardHeadDisplacement: this.calculateForwardHead(pose),
        cervicalTilt: this.calculateCervicalTilt(pose),
        
        // B. SHOULDERS
        shoulderHeightDiff: this.calculateShoulderHeightDiff(pose),
        shoulderRotation: this.calculateShoulderRotation(pose),
        scapularWinging: this.calculateScapularWinging(pose),
        
        // C. SPINE & TRUNK
        thoracicCurve: this.calculateThoracicCurve(pose),
        lumbarCurve: this.calculateLumbarCurve(pose),
        lateralTrunkShift: this.calculateLateralTrunkShift(pose),
        
        // D. PELVIS
        pelvicTilt: this.calculatePelvicTilt(pose),
        pelvicObliquity: this.calculatePelvicObliquity(pose),
        pelvicRotation: this.calculatePelvicRotation(pose),
        
        // E. HIPS / KNEES / ANKLES
        hipKneeAnkleAlignment: this.calculateHipKneeAnkleAlignment(pose),
        qAngle: this.calculateQAngle(pose),
        kneeAngle: this.calculateKneeAngle(pose),
        legLengthDiff: this.calculateLegLengthDiff(pose),
        footProgression: this.calculateFootProgression(pose),
        
        // F. WEIGHT SHIFT
        lateralWeightShift: this.calculateLateralWeightShift(pose),
        anteriorPosteriorBias: this.calculateAnteriorPosteriorBias(pose)
      };
      
      return metrics;
    }
  
    // A. HEAD & NECK calculations
    calculateNeckAngle(pose) {
      try {
        const c7 = pose[0];       // Landmark 0 - NOSE (using as C7 approximation)
        const leftEar = pose[7];  // Landmark 7 - LEFT_EAR
        const leftShoulder = pose[11]; // Landmark 11 - LEFT_SHOULDER
        
        if (!c7 || !leftEar || !leftShoulder) return null;
        return this.calculateAngle(c7, leftEar, leftShoulder);
      } catch (error) {
        console.warn("Neck angle calculation error:", error);
        return null;
      }
    }
  
    calculateForwardHead(pose) {
      try {
        const shoulder = pose[11]; // LEFT_SHOULDER
        const ear = pose[7];       // LEFT_EAR
        if (!shoulder || !ear) return null;
        return ear.x - shoulder.x; // Horizontal offset
      } catch (error) {
        console.warn("Forward head calculation error:", error);
        return null;
      }
    }
  
    calculateCervicalTilt(pose) {
      try {
        const leftEar = pose[7];
        const rightEar = pose[8];
        const sternum = this.midpoint(pose[11], pose[12]); // Shoulders midpoint
        
        if (!leftEar || !rightEar || !sternum) return null;
        
        const earMidpoint = this.midpoint(leftEar, rightEar);
        return earMidpoint.x - sternum.x;
      } catch (error) {
        console.warn("Cervical tilt calculation error:", error);
        return null;
      }
    }
  
    // B. SHOULDERS calculations
    calculateShoulderHeightDiff(pose) {
      try {
        const leftShoulder = pose[11];
        const rightShoulder = pose[12];
        if (!leftShoulder || !rightShoulder) return null;
        return Math.abs(leftShoulder.y - rightShoulder.y);
      } catch (error) {
        console.warn("Shoulder height calculation error:", error);
        return null;
      }
    }
  
    calculateShoulderRotation(pose) {
      try {
        const leftShoulder = pose[11];
        const rightShoulder = pose[12];
        const leftHip = pose[23];
        const rightHip = pose[24];
        
        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) return null;
        
        const shoulderAngle = Math.atan2(
          rightShoulder.y - leftShoulder.y,
          rightShoulder.x - leftShoulder.x
        );
        const hipAngle = Math.atan2(
          rightHip.y - leftHip.y,
          rightHip.x - leftHip.x
        );
        
        return shoulderAngle - hipAngle;
      } catch (error) {
        console.warn("Shoulder rotation calculation error:", error);
        return null;
      }
    }
  
    calculateScapularWinging(pose) {
      try {
        const shoulder = pose[11];
        const hip = pose[23];
        if (!shoulder || !hip) return null;
        return Math.abs(shoulder.z - hip.z);
      } catch (error) {
        console.warn("Scapular winging calculation error:", error);
        return null;
      }
    }
  
    // C. SPINE & TRUNK calculations
    calculateThoracicCurve(pose) {
      try {
        const shoulderMid = this.midpoint(pose[11], pose[12]);
        const midHip = this.midpoint(pose[23], pose[24]);
        const midSpine = this.midpoint(shoulderMid, midHip);
        
        if (!shoulderMid || !midHip || !midSpine) return null;
        return this.calculateAngle(shoulderMid, midSpine, midHip);
      } catch (error) {
        console.warn("Thoracic curve calculation error:", error);
        return null;
      }
    }
  
    calculateLumbarCurve(pose) {
      try {
        const midHip = this.midpoint(pose[23], pose[24]);
        const pelvis = this.midpoint(pose[23], pose[24]);
        const knee = this.midpoint(pose[25], pose[26]);
        
        if (!midHip || !pelvis || !knee) return null;
        return this.calculateAngle(midHip, pelvis, knee);
      } catch (error) {
        console.warn("Lumbar curve calculation error:", error);
        return null;
      }
    }
  
    calculateLateralTrunkShift(pose) {
      try {
        const shoulderMid = this.midpoint(pose[11], pose[12]);
        const hipMid = this.midpoint(pose[23], pose[24]);
        if (!shoulderMid || !hipMid) return null;
        return shoulderMid.x - hipMid.x;
      } catch (error) {
        console.warn("Lateral trunk shift calculation error:", error);
        return null;
      }
    }
  
    // D. PELVIS calculations
    calculatePelvicTilt(pose) {
      try {
        const shoulder = pose[11];
        const hip = pose[23];
        const knee = pose[25];
        
        if (!shoulder || !hip || !knee) return null;
        return this.calculateAngle(shoulder, hip, knee);
      } catch (error) {
        console.warn("Pelvic tilt calculation error:", error);
        return null;
      }
    }
  
    calculatePelvicObliquity(pose) {
      try {
        const leftHip = pose[23];
        const rightHip = pose[24];
        if (!leftHip || !rightHip) return null;
        return leftHip.y - rightHip.y;
      } catch (error) {
        console.warn("Pelvic obliquity calculation error:", error);
        return null;
      }
    }
  
    calculatePelvicRotation(pose) {
      try {
        const leftShoulder = pose[11];
        const rightShoulder = pose[12];
        const leftHip = pose[23];
        const rightHip = pose[24];
        
        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) return null;
        
        const shoulderAngle = Math.atan2(
          rightShoulder.y - leftShoulder.y,
          rightShoulder.x - leftShoulder.x
        );
        const hipAngle = Math.atan2(
          rightHip.y - leftHip.y,
          rightHip.x - leftHip.x
        );
        
        return shoulderAngle - hipAngle;
      } catch (error) {
        console.warn("Pelvic rotation calculation error:", error);
        return null;
      }
    }
  
    // E. HIPS/KNEES/ANKLES calculations
    calculateHipKneeAnkleAlignment(pose) {
      try {
        const hip = pose[23];
        const knee = pose[25];
        const ankle = pose[27];
        
        if (!hip || !knee || !ankle) return null;
        return this.calculateAngle(hip, knee, ankle);
      } catch (error) {
        console.warn("Hip-knee-ankle alignment calculation error:", error);
        return null;
      }
    }
  
    calculateQAngle(pose) {
      try {
        const asis = pose[23]; // Approximated with hip
        const knee = pose[25];
        const ankle = pose[27];
        
        if (!asis || !knee || !ankle) return null;
        return this.calculateAngle(asis, knee, ankle);
      } catch (error) {
        console.warn("Q-angle calculation error:", error);
        return null;
      }
    }
  
    calculateKneeAngle(pose) {
      try {
        const hip = pose[23];
        const knee = pose[25];
        const ankle = pose[27];
        
        if (!hip || !knee || !ankle) return null;
        return this.calculateAngle(hip, knee, ankle);
      } catch (error) {
        console.warn("Knee angle calculation error:", error);
        return null;
      }
    }
  
    calculateLegLengthDiff(pose) {
      try {
        const leftHipToAnkle = this.distance(pose[23], pose[27]);
        const rightHipToAnkle = this.distance(pose[24], pose[28]);
        
        if (!leftHipToAnkle || !rightHipToAnkle) return null;
        return Math.abs(leftHipToAnkle - rightHipToAnkle);
      } catch (error) {
        console.warn("Leg length difference calculation error:", error);
        return null;
      }
    }
  
    calculateFootProgression(pose) {
      try {
        const ankle = pose[27];
        const footIndex = pose[31];
        const heel = pose[29];
        
        if (!ankle || !footIndex || !heel) return null;
        
        const footVector = { x: footIndex.x - heel.x, y: footIndex.y - heel.y };
        return Math.atan2(footVector.y, footVector.x);
      } catch (error) {
        console.warn("Foot progression calculation error:", error);
        return null;
      }
    }
  
    // F. WEIGHT SHIFT calculations
    calculateLateralWeightShift(pose) {
      try {
        const shoulderMid = this.midpoint(pose[11], pose[12]);
        const hipMid = this.midpoint(pose[23], pose[24]);
        const ankleMid = this.midpoint(pose[27], pose[28]);
        
        if (!shoulderMid || !hipMid || !ankleMid) return null;
        return (shoulderMid.x + hipMid.x + ankleMid.x) / 3;
      } catch (error) {
        console.warn("Lateral weight shift calculation error:", error);
        return null;
      }
    }
  
    calculateAnteriorPosteriorBias(pose) {
      try {
        const shoulder = pose[11];
        const hip = pose[23];
        const ankle = pose[27];
        
        if (!shoulder || !hip || !ankle) return null;
        return (shoulder.y + hip.y + ankle.y) / 3;
      } catch (error) {
        console.warn("Anterior-posterior bias calculation error:", error);
        return null;
      }
    }
  
    // Utility functions
    calculateAngle(a, b, c) {
      try {
        const ab = { x: b.x - a.x, y: b.y - a.y };
        const cb = { x: b.x - c.x, y: b.y - c.y };
        
        const dot = (ab.x * cb.x + ab.y * cb.y);
        const cross = (ab.x * cb.y - ab.y * cb.x);
        
        const angle = Math.atan2(cross, dot) * (180 / Math.PI);
        return Math.abs(angle); // Return absolute value for consistency
      } catch (error) {
        console.warn("Angle calculation error:", error);
        return null;
      }
    }
  
    distance(a, b) {
      try {
        if (!a || !b) return null;
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
      } catch (error) {
        console.warn("Distance calculation error:", error);
        return null;
      }
    }
  
    midpoint(a, b) {
      try {
        if (!a || !b) return null;
        return {
          x: (a.x + b.x) / 2,
          y: (a.y + b.y) / 2,
          z: (a.z + b.z) / 2
        };
      } catch (error) {
        console.warn("Midpoint calculation error:", error);
        return null;
      }
    }
  
    // Sample metrics at intervals
    sampleMetrics(landmarks, timestamp) {
      if (timestamp - this.lastSampleTime >= this.sampleInterval) {
        const metrics = this.calculateAllMetrics(landmarks, timestamp);
        if (metrics) {
          // Filter out null values
          const cleanMetrics = Object.fromEntries(
            Object.entries(metrics).filter(([_, value]) => value !== null)
          );
          
          if (Object.keys(cleanMetrics).length > 1) { // Ensure we have more than just timestamp
            this.history.push(cleanMetrics);
            // Keep last 5 minutes of data (300 samples at 1-second intervals)
            if (this.history.length > 300) {
              this.history.shift();
            }
          }
        }
        this.lastSampleTime = timestamp;
      }
    }
  
    // Generate summary report
    generateReport() {
      if (this.history.length === 0) return null;
      
      const summary = {};
      const metricKeys = Object.keys(this.history[0]).filter(key => key !== 'timestamp');
      
      metricKeys.forEach(key => {
        const values = this.history.map(entry => entry[key]).filter(val => val !== null && !isNaN(val));
        if (values.length > 0) {
          const average = values.reduce((a, b) => a + b, 0) / values.length;
          const variance = values.reduce((acc, val) => acc + Math.pow(val - average, 2), 0) / values.length;
          
          summary[key] = {
            average: average,
            min: Math.min(...values),
            max: Math.max(...values),
            latest: values[values.length - 1],
            stdDev: Math.sqrt(variance),
            sampleCount: values.length
          };
        }
      });
      
      return {
        summary,
        rawData: this.history,
        duration: this.history.length * (this.sampleInterval / 1000), // Convert to seconds
        startTime: this.history[0]?.timestamp,
        endTime: this.history[this.history.length - 1]?.timestamp,
        totalSamples: this.history.length
      };
    }
  
    clear() {
      this.history = [];
      this.metrics = {};
      this.lastSampleTime = 0;
    }
  }