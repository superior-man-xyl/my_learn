console.clear(); 

class TombstoneGenerator {
  constructor() {
    this.initializeGlobals();
    this.initializeDOM();
    this.initialize();
  }
  
  initializeGlobals() {
    let ogw = 833;
    let ogh = 576;
    let ar = ogh / ogw;
    this.w = 600;
    this.h = this.w * ar;
  }
  
  initializeDOM() {
    this.$cvsBackground = document.querySelector('#background');
    this.$ctxBackground = this.$cvsBackground.getContext('2d');
    this.$cvsText = document.querySelector('#text');
    this.$ctxText = this.$cvsText.getContext('2d');
    this.$cvsRender = document.querySelector('#render');
    this.$ctxRender = this.$cvsRender.getContext('2d');
    
    this.$name = document.querySelector('#name');
    this.$name.addEventListener('input', () => { this.onChange() });
    this.$line1 = document.querySelector('#line1');
    this.$line1.addEventListener('input', () => { this.onChange() });
    this.$line2 = document.querySelector('#line2');
    this.$line2.addEventListener('input', () => { this.onChange() });
    this.$line3 = document.querySelector('#line3');
    this.$line3.addEventListener('input', () => { this.onChange() });
    this.$year = document.querySelector('#year');
    this.$year.addEventListener('input', () => { this.onChange() });
    this.$load = document.querySelector('#load');
    this.$load.addEventListener('click', () => { this.onRender() })

    this.$cvsBackground.height = this.h;
    this.$cvsBackground.width = this.w;
    this.$cvsText.height = this.h;
    this.$cvsText.width = this.w;
    this.$cvsRender.height = this.h;
    this.$cvsRender.width = this.w;
  }
  
  initialize() {
    let url = 'mb.png'
    this.$img = new Image();
    this.$img.src = url;
    this.$img.addEventListener('load', () => {  
      this.onLoad();
    });
  }
  
  onLoad() {
    this.$ctxBackground.drawImage(this.$img, 0, 0, this.w, this.h);
  }
  
  onChange() {
    this.drawText([
      this.$name.value,
      this.$line1.value,
      this.$line2.value,
      this.$line3.value,
      this.$year.value
    ]);
  }
  
  onRender() {
    this.$ctxRender.drawImage(this.$cvsBackground, 0, 0);
    this.$ctxRender.drawImage(this.$cvsText, 0, 0);
    this.$load.href = this.$cvsRender.toDataURL();
    this.$load.download = 'tombstone.png';
  }
  
  drawText(text) {
    this.$ctxText.shadowColor = 'rgba(255, 255, 255, 0.4)';
    this.$ctxText.shadowOffsetX = 1;
    this.$ctxText.shadowOffsetY = 1;
    this.$ctxText.shadowBlur = 0.5;
    this.$ctxText.clearRect(0, 0, this.w, this.h);
    let sizes = [24, 15, 15, 15, 12];
    let top = this.h * 0.35;
    text.forEach((line, i) => {
      line = line.toUpperCase();
      let fontSize = sizes[i];
      this.$ctxText.fillStyle = 'rgba(0, 0, 0, 0.55)';
      this.$ctxText.font = `${fontSize}px Times`;
      this.$ctxText.textAlign = 'center';
      this.$ctxText.textBaseline = 'top';
      this.$ctxText.fillText(line, this.w / 2, top);
      top += fontSize * 1.3;
      if (i === text.length - 2) top += 10;
    })
  }
}

let tg = new TombstoneGenerator();
