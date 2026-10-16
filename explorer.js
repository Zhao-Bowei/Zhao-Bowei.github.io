"use strict";
(() => {
  const canvas = document.getElementById("cloud");
  const slider = document.getElementById("threshold");
  const output = document.getElementById("threshold-value");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width, h = canvas.height, grid = 110;
  // Deterministic synthetic field. No observational measurements are used.
  const field = [], peaks = [];
  let seed = 321;
  function rand() { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; }
  for (let i=0; i<39; i++) {
    const t=i/38, a=t*6.9;
    peaks.push({x:.15+.68*t+.075*Math.sin(a*1.8), y:.53+.21*Math.sin(a), s:.028+rand()*.055, a:.35+rand()*.7});
  }
  let max=0;
  for (let y=0;y<grid;y++) for (let x=0;x<grid;x++) {
    const u=x/grid,v=y/grid;
    let d=0;
    for (const p of peaks) d+=p.a*Math.exp(-((u-p.x)**2+(v-p.y)**2)/(2*p.s*p.s));
    d*=.85+.1*Math.sin(u*84+v*27)+.05*Math.cos(v*110-u*39);
    field.push(d); max=Math.max(max,d);
  }
  for(let i=0;i<field.length;i++) field[i]/=max;
  function draw() {
    const threshold=Number(slider.value)/100;
    output.value=slider.value+"%";
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle="#cad5d2";ctx.lineWidth=1;
    for(let i=1;i<6;i++) {ctx.beginPath();ctx.moveTo(26+i*91,25);ctx.lineTo(26+i*91,h-25);ctx.stroke();ctx.beginPath();ctx.moveTo(26,25+i*81);ctx.lineTo(w-26,25+i*81);ctx.stroke();}
    const size=(w-52)/grid, sy=(h-50)/grid;
    field.forEach((d,i)=>{
      if(d<.035)return;
      const active=d>=threshold;
      ctx.fillStyle=active ? `rgba(${Math.round(44+110*d)},${Math.round(83+44*d)},${Math.round(102-13*d)},${.32+.68*d})` : `rgba(89,118,124,${.05+.12*d})`;
      ctx.fillRect(26+(i%grid)*size,25+Math.floor(i/grid)*sy,size+.4,sy+.4);
    });
    // Outline the selected excursion set; no fitted dimensions are implied.
    ctx.strokeStyle="#a2764d";ctx.lineWidth=1.1;ctx.beginPath();
    for(let y=1;y<grid-1;y++)for(let x=1;x<grid-1;x++){
      const i=y*grid+x;if(field[i]<threshold)continue;
      const px=26+x*size,py=25+y*sy;
      if(field[i-1]<threshold){ctx.moveTo(px,py);ctx.lineTo(px,py+sy);}
      if(field[i+1]<threshold){ctx.moveTo(px+size,py);ctx.lineTo(px+size,py+sy);}
      if(field[i-grid]<threshold){ctx.moveTo(px,py);ctx.lineTo(px+size,py);}
      if(field[i+grid]<threshold){ctx.moveTo(px,py+sy);ctx.lineTo(px+size,py+sy);}
    }ctx.stroke();
  }
  slider.addEventListener("input",draw);draw();
})();
