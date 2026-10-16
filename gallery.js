"use strict";
(()=>{const tiles=[...document.querySelectorAll('.photo-tile')],dlg=document.getElementById('photo-viewer');if(!dlg||typeof dlg.showModal!=='function'){tiles.forEach(a=>{a.target='_blank';a.rel='noopener'});return;}const img=dlg.querySelector('img');let index=0,previous;
function show(i){index=(i+tiles.length)%tiles.length;img.src=tiles[index].href;img.alt=tiles[index].querySelector('img').alt;}
tiles.forEach((a,i)=>a.addEventListener('click',e=>{e.preventDefault();previous=a;show(i);dlg.showModal();}));
dlg.querySelector('.photo-close').onclick=()=>dlg.close();dlg.querySelector('.photo-prev').onclick=()=>show(index-1);dlg.querySelector('.photo-next').onclick=()=>show(index+1);
dlg.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(index-1)}if(e.key==='ArrowRight'){e.preventDefault();show(index+1)}});dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});dlg.addEventListener('close',()=>previous?.focus());})();
