// src/utils/backgroundProcessor.js
export class BackgroundProcessor {
    constructor(videoElement, backgroundUrl) {
      this.videoElement = videoElement;
      this.backgroundUrl = backgroundUrl;
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.backgroundImage = new Image();
      this.isProcessing = false;
    }
  
    async init() {
      await new Promise((resolve, reject) => {
        this.backgroundImage.crossOrigin = 'anonymous';
        this.backgroundImage.src = this.backgroundUrl;
        this.backgroundImage.onload = resolve;
        this.backgroundImage.onerror = reject;
      });
    }
  
    startProcessing() {
      if (this.isProcessing) return;
      
      this.isProcessing = true;
      this.processFrame();
    }
  
    processFrame() {
      if (!this.isProcessing) return;
  
      const { videoWidth, videoHeight } = this.videoElement;
      
      if (videoWidth > 0 && videoHeight > 0) {
        this.canvas.width = videoWidth;
        this.canvas.height = videoHeight;
  
        // Draw background
        this.ctx.drawImage(
          this.backgroundImage,
          0, 0, videoWidth, videoHeight
        );
  
        // Draw video frame with transparency
        this.ctx.globalAlpha = 0.9;
        this.ctx.drawImage(
          this.videoElement,
          0, 0, videoWidth, videoHeight
        );
      }
  
      requestAnimationFrame(() => this.processFrame());
    }
  
    stopProcessing() {
      this.isProcessing = false;
    }
  
    getProcessedStream() {
      const stream = this.canvas.captureStream(30);
      return stream;
    }
  }