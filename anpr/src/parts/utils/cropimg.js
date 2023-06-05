import Tesseract from 'tesseract.js';
function thresholdFilter(pixels, level) {
  if (level === undefined) {
    level = 0.5;
  }
  const thresh = Math.floor(level * 255);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    let val;
    if (gray >= thresh) {
      val = 255;
    } else {
      val = 0;
    }
    pixels[i] = pixels[i + 1] = pixels[i + 2] = val;
  }
};

function getARGB (data, i) {
  const offset = i * 4;
  return (
    ((data[offset + 3] << 24) & 0xff000000) |
    ((data[offset] << 16) & 0x00ff0000) |
    ((data[offset + 1] << 8) & 0x0000ff00) |
    (data[offset + 2] & 0x000000ff)
  );
};

function setPixels (pixels, data) {
  let offset = 0;
  for (let i = 0, al = pixels.length; i < al; i++) {
    offset = i * 4;
    pixels[offset + 0] = (data[i] & 0x00ff0000) >>> 16;
    pixels[offset + 1] = (data[i] & 0x0000ff00) >>> 8;
    pixels[offset + 2] = data[i] & 0x000000ff;
    pixels[offset + 3] = (data[i] & 0xff000000) >>> 24;
  }
};

let blurRadius;
let blurKernelSize;
let blurKernel;
let blurMult;

function buildBlurKernel(r) {
let radius = (r * 3.5) | 0;
radius = radius < 1 ? 1 : radius < 248 ? radius : 248;

if (blurRadius !== radius) {
  blurRadius = radius;
  blurKernelSize = (1 + blurRadius) << 1;
  blurKernel = new Int32Array(blurKernelSize);
  blurMult = new Array(blurKernelSize);
  for (let l = 0; l < blurKernelSize; l++) {
    blurMult[l] = new Int32Array(256);
  }

  let bk, bki;
  let bm, bmi;

  for (let i = 1, radiusi = radius - 1; i < radius; i++) {
    blurKernel[radius + i] = blurKernel[radiusi] = bki = radiusi * radiusi;
    bm = blurMult[radius + i];
    bmi = blurMult[radiusi--];
    for (let j = 0; j < 256; j++) {
      bm[j] = bmi[j] = bki * j;
    }
  }
  bk = blurKernel[radius] = radius * radius;
  bm = blurMult[radius];

  for (let k = 0; k < 256; k++) {
    bm[k] = bk * k;
  }
}
}

function blurARGB(pixels, canvas, radius) {
const width = canvas.width;
const height = canvas.height;
const numPackedPixels = width * height;
const argb = new Int32Array(numPackedPixels);
for (let j = 0; j < numPackedPixels; j++) {
  argb[j] = getARGB(pixels, j);
}
let sum, cr, cg, cb, ca;
let read, ri, ym, ymi, bk0;
const a2 = new Int32Array(numPackedPixels);
const r2 = new Int32Array(numPackedPixels);
const g2 = new Int32Array(numPackedPixels);
const b2 = new Int32Array(numPackedPixels);
let yi = 0;
buildBlurKernel(radius);
let x, y, i;
let bm;
for (y = 0; y < height; y++) {
  for (x = 0; x < width; x++) {
    cb = cg = cr = ca = sum = 0;
    read = x - blurRadius;
    if (read < 0) {
      bk0 = -read;
      read = 0;
    } else {
      if (read >= width) {
        break;
      }
      bk0 = 0;
    }
    for (i = bk0; i < blurKernelSize; i++) {
      if (read >= width) {
        break;
      }
      const c = argb[read + yi];
      bm = blurMult[i];
      ca += bm[(c & -16777216) >>> 24];
      cr += bm[(c & 16711680) >> 16];
      cg += bm[(c & 65280) >> 8];
      cb += bm[c & 255];
      sum += blurKernel[i];
      read++;
    }
    ri = yi + x;
    a2[ri] = ca / sum;
    r2[ri] = cr / sum;
    g2[ri] = cg / sum;
    b2[ri] = cb / sum;
  }
  yi += width;
}
yi = 0;
ym = -blurRadius;
ymi = ym * width;
for (y = 0; y < height; y++) {
  for (x = 0; x < width; x++) {
    cb = cg = cr = ca = sum = 0;
    if (ym < 0) {
      bk0 = ri = -ym;
      read = x;
    } else {
      if (ym >= height) {
        break;
      }
      bk0 = 0;
      ri = ym;
      read = x + ymi;
    }
    for (i = bk0; i < blurKernelSize; i++) {
      if (ri >= height) {
        break;
      }
      bm = blurMult[i];
      ca += bm[a2[read]];
      cr += bm[r2[read]];
      cg += bm[g2[read]];
      cb += bm[b2[read]];
      sum += blurKernel[i];
      ri++;
      read += width;
    }
    argb[x + yi] =
      ((ca / sum) << 24) |
      ((cr / sum) << 16) |
      ((cg / sum) << 8) |
      (cb / sum);
  }
  yi += width;
  ymi += width;
  ym++;
}
setPixels(pixels, argb);
}

function invertColors(pixels) {
  for (var i = 0; i < pixels.length; i+= 4) {
    pixels[i] = pixels[i] ^ 255; // Invert Red
    pixels[i+1] = pixels[i+1] ^ 255; // Invert Green
    pixels[i+2] = pixels[i+2] ^ 255; // Invert Blue
  }
}
function dilate(pixels, canvas) {
 let currIdx = 0;
 const maxIdx = pixels.length ? pixels.length / 4 : 0;
 const out = new Int32Array(maxIdx);
 let currRowIdx, maxRowIdx, colOrig, colOut, currLum;

 let idxRight, idxLeft, idxUp, idxDown;
 let colRight, colLeft, colUp, colDown;
 let lumRight, lumLeft, lumUp, lumDown;

 while (currIdx < maxIdx) {
   currRowIdx = currIdx;
   maxRowIdx = currIdx + canvas.width;
   while (currIdx < maxRowIdx) {
     colOrig = colOut = getARGB(pixels, currIdx);
     idxLeft = currIdx - 1;
     idxRight = currIdx + 1;
     idxUp = currIdx - canvas.width;
     idxDown = currIdx + canvas.width;

     if (idxLeft < currRowIdx) {
       idxLeft = currIdx;
     }
     if (idxRight >= maxRowIdx) {
       idxRight = currIdx;
     }
     if (idxUp < 0) {
       idxUp = 0;
     }
     if (idxDown >= maxIdx) {
       idxDown = currIdx;
     }
     colUp = getARGB(pixels, idxUp);
     colLeft = getARGB(pixels, idxLeft);
     colDown = getARGB(pixels, idxDown);
     colRight = getARGB(pixels, idxRight);

     //compute luminance
     currLum =
       77 * ((colOrig >> 16) & 0xff) +
       151 * ((colOrig >> 8) & 0xff) +
       28 * (colOrig & 0xff);
     lumLeft =
       77 * ((colLeft >> 16) & 0xff) +
       151 * ((colLeft >> 8) & 0xff) +
       28 * (colLeft & 0xff);
     lumRight =
       77 * ((colRight >> 16) & 0xff) +
       151 * ((colRight >> 8) & 0xff) +
       28 * (colRight & 0xff);
     lumUp =
       77 * ((colUp >> 16) & 0xff) +
       151 * ((colUp >> 8) & 0xff) +
       28 * (colUp & 0xff);
     lumDown =
       77 * ((colDown >> 16) & 0xff) +
       151 * ((colDown >> 8) & 0xff) +
       28 * (colDown & 0xff);

     if (lumLeft > currLum) {
       colOut = colLeft;
       currLum = lumLeft;
     }
     if (lumRight > currLum) {
       colOut = colRight;
       currLum = lumRight;
     }
     if (lumUp > currLum) {
       colOut = colUp;
       currLum = lumUp;
     }
     if (lumDown > currLum) {
       colOut = colDown;
       currLum = lumDown;
     }
     out[currIdx++] = colOut;
   }
 }
 setPixels(pixels, out);
};


function preprocessImage(canvas) {
  const processedImageData = canvas.getContext('2d').getImageData(0,0,canvas.width, canvas.height);
  blurARGB(processedImageData.data, canvas, 1);
  dilate(processedImageData.data, canvas);
  invertColors(processedImageData.data);
  thresholdFilter(processedImageData.data, 0.4);
  return processedImageData;
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function crop(image,boxes,ratio,fil){
  let base64Image;
  const canva =document.createElement("canvas");
  canva.width = ratio[0]*416;
  canva.height = ratio[1]*416;
  const ctx2 = canva.getContext("2d");
  ctx2.drawImage(image, 0, 0);
  const selected_detections = [];
  const font = "18px sans-serif";
  ctx2.font = font;
  ctx2.textBaseline = "top";
  ctx2.strokeStyle = "#B033FF";
  ctx2.lineWidth = 2;
  let i=0;
  for(i=0;i<boxes.length;++i){
    const canvas = document.createElement("canvas");
    const scaleX = 1;
    const scaleY = 1;
    let [x1, y1, x2, y2] = boxes[i];
    x1 *= ratio[0];
    x2 *= ratio[0];
    y1 *= ratio[1];
    y2 *= ratio[1];
    const width = x2 - x1;
    const height = y2 - y1;
    canvas.width = width;
    canvas.height = height;
    const immg = new Image(width,height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      x1 * scaleX,
      y1 * scaleY,
      width * scaleX,
      height * scaleY,
      0,
      0,
      width,
      height
    );
    if(fil===1){
      const res = preprocessImage(canvas);
      ctx.putImageData(res,0,0);
    }
    immg.onload = function() {
      ctx2.drawImage(immg, 0,0,width,height,x1 * scaleX,y1 * scaleY,width * scaleX,height * scaleY);
    };
    base64Image = canvas.toDataURL("image/jpg");
    immg.src = base64Image;
    await Tesseract.recognize(
      base64Image,'eng',
    )
    .catch (err => {
      console.error(err);
    })
    .then(result => {
      // Get Confidence score
      let confidence = result.data.confidence;
      // Get full output
      var text = []
      text[0] = result.data.text;
      text[1] = confidence;
      selected_detections.push(text);
      const klass = text[0];
      const score = text[1];
      ctx2.strokeRect(x1, y1, width, height);

      // Draw the label background.
      ctx2.fillStyle = "#B033FF";
      const textWidth = ctx2.measureText(klass + " - " + score + "%").width;
      const textHeight = parseInt(font, 10); // base 10
      ctx2.fillRect(x1 - 1, y1 - (textHeight + 2), textWidth + 2, textHeight + 2);

      // Draw labels
      ctx2.fillStyle = "#ffffff";
      ctx2.fillText(klass + " - " + score + "%", x1 - 1, y1 - (textHeight + 2));
    })
  }
  await delay(2000);
  const resutl=canva.toDataURL("image/jpg");
  return resutl;
};

