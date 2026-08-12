// src/utils/backgroundReplacer.js
import * as bodySegmentation from '@tensorflow-models/body-segmentation';

let segmenter = null;
let backgroundImage = null;
let animationFrame = null;
let isActive = false;

// Initialize the body segmenter
export async function initBackgroundReplacer() {
  if (!segmenter) {
    try {
      // Load the body segmentation model
      const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
      segmenter = await bodySegmentation.createSegmenter(model, {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation',
        modelType: 'general'
      });
      console.log('✅ Background replacer initialized');
    } catch (error) {
      console.error('Failed to initialize background replacer:', error);
      throw error;
    }
  }
  return segmenter;
}

// Load background image from local directory
export async function loadBackgroundImage(imagePath) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      backgroundImage = img;
      console.log(`✅ Background image loaded: ${imagePath}`);
      resolve(img);
    };
    img.onerror = (err) => {
      console.error(`Failed to load background image: ${imagePath}`, err);
      reject(err);
    };
    img.src = imagePath;
  });
}

// Process video frame and apply background
async function processFrame(videoElement, canvasElement, bgImage) {
  if (!segmenter || !videoElement || !canvasElement || !bgImage || !isActive) return;

  try {
    // Ensure video is ready
    if (videoElement.readyState < 2) return;

    // Segment the person
    const segmentation = await segmenter.segmentPeople(videoElement, {
      flipHorizontal: false,
      multiSegmentation: false,
      segmentBody: true,
    });

    if (!segmentation || segmentation.length === 0) return;

    const ctx = canvasElement.getContext('2d');
    const { width, height } = videoElement;
    
    // Set canvas dimensions to match video
    canvasElement.width = width;
    canvasElement.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background image scaled to canvas
    ctx.drawImage(bgImage, 0, 0, width, height);

    // Apply segmentation mask
    const mask = await segmentation[0].mask.toCanvasImageSource();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(videoElement, 0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
    
    // Draw the person using the mask
    ctx.drawImage(mask, 0, 0, width, height);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(videoElement, 0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
  } catch (error) {
    console.error('Error processing frame:', error);
  }
}

// Start background replacement
export function startBackgroundReplacement(videoElement, canvasElement, bgImage) {
  if (!videoElement || !canvasElement || !bgImage) return;
  
  isActive = true;
  
  const processFrameLoop = () => {
    if (!isActive) return;
    processFrame(videoElement, canvasElement, bgImage);
    animationFrame = requestAnimationFrame(processFrameLoop);
  };
  
  processFrameLoop();
}

// Stop background replacement
export function stopBackgroundReplacement() {
  isActive = false;
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

// Toggle background replacement
export async function toggleBackgroundReplacement(videoElement, canvasElement, imagePath) {
  if (!isActive) {
    try {
      await initBackgroundReplacer();
      const bgImage = await loadBackgroundImage(imagePath);
      startBackgroundReplacement(videoElement, canvasElement, bgImage);
      return true;
    } catch (error) {
      console.error('Failed to start background replacement:', error);
      return false;
    }
  } else {
    stopBackgroundReplacement();
    return false;
  }
}