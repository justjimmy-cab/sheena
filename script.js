// ---------- Edit these! Make them true and specific to her. ----------
const NOTES = [
  "You're the first person I want to tell everything to.",
  "Your laugh is my favorite sound.",
  "I never get tired of looking at you.",
  "You make ordinary days feel like a gift.",
  "I'm a better person when I'm with you.",
  "Thank you for being exactly who you are.",
  "Every flower here is a reason. There are so many more."
];
const LETTER = (shen, jme) => [
  `Dear ${shen},`,
  "hi shen hahaha gi try nako kung kaya bajd nako mag buhat og website nga code manu manu pero nagpatabang kos ai ani hahahah. wala lang gusto lang nako ni buhaton para saimo, bcn mag overthink nasad ka nga daghan kog gibuhatan ani nga wala aya jd 1st time pani nako gibuhat. sorry kung no sweet words ha dle palang kaayu nako ma express ako feelings kay kabalo nabaya ka nga getting to know each other pata og don't worry dle pani mao ako buhaton nga bisag unsa ma hunahunaan nako hahahaha.",
  "I don't have perfect words. I just know that you matter to me more than I know how to say.",
  `Yours, always,<br> jme`
];
// ---------------------------------------------------------------------

const $ = id => document.getElementById(id);
const params = new URLSearchParams(location.search);
if (params.get("to")) $("to").value = params.get("to");
if (params.get("from")) $("from").value = params.get("from");

// flower specs: x, y, radius, petal count, petal color, center color
const FLOWERS = [
  [300,130,62,9,"#a8d7f7","#9ad7ff"],
  [175,215,52,8,"#ffb59a","#fff4ea"],
  [425,215,52,8,"#fff0f3","#ffcf6b"],
  [95,330,46,7,"#59f547","#9affe6"],
  [505,330,46,7,"#c3f375","#f3d24f"],
  [235,310,50,10,"#79fcde","#ffe9b0"],
  [365,310,50,10,"#fbd0dc","#e58aa5"]
];
const NS = "http://www.w3.org/2000/svg";
let opened = new Set();

function flowerSVG(i, [x,y,r,n,pc,cc]){
  let p = "";
  for (let k=0;k<n;k++){
    p += `<ellipse class="pt" cx="0" cy="${-r*.55}" rx="${r*.3}" ry="${r*.55}" fill="${pc}" transform="rotate(${k*360/n})"/>`;
  }
  for (let k=0;k<n;k++){
    p += `<ellipse class="pt" cx="0" cy="${-r*.32}" rx="${r*.2}" ry="${r*.34}" fill="#fff" opacity=".35" transform="rotate(${k*360/n+180/n})"/>`;
  }
  return `<g class="fl" tabindex="0" role="button" aria-label="Flower ${i+1}" data-i="${i}" style="animation-delay:${1.2+i*.28}s">
    <g transform="translate(${x} ${y})">${p}<circle class="ctr" r="${r*.2}" fill="${cc}"/></g></g>`;
}

function build(){
  const svg = $("bq");
  let stems = "", fl = "";
  FLOWERS.forEach((f,i)=>{
    const [x,y]=f;
    stems += `<path class="stem" d="M${x} ${y+10} C ${x} ${y+180}, 300 ${y+220}, 300 560" style="animation-delay:${i*.15}s"/>`;
    fl += flowerSVG(i,f);
  });
  // leaves
  const leaves = [[210,420,-30],[390,420,30],[150,470,-55],[450,470,55]].map(([x,y,a])=>
    `<path d="M0 0 C 20 -30, 60 -30, 80 0 C 60 30, 20 30, 0 0Z" fill="#6fa987" transform="translate(${x} ${y}) rotate(${a})"/>`).join("");
  svg.innerHTML = `
    <g class="sway">${stems}${leaves}${fl}</g>
    <path d="M110 470 L300 690 L490 470 L300 545Z" fill="#f4dcc8"/>
    <path d="M130 450 L300 680 L470 450 L300 530Z" fill="#fff4ea"/>
    <path d="M300 530 L300 680" stroke="#e8c8b0" stroke-width="2"/>
    <g transform="translate(300 545)"><ellipse rx="34" ry="17" cx="-30" fill="#e76f92" transform="rotate(-12)"/><ellipse rx="34" ry="17" cx="30" fill="#e76f92" transform="rotate(12)"/><circle r="12" fill="#c94b73"/></g>`;
  svg.querySelectorAll(".fl").forEach(el=>{
    el.addEventListener("click",()=>show(+el.dataset.i,el));
    el.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){e.preventDefault();show(+el.dataset.i,el);} });
  });
}

function show(i, el){
  $("noteText").textContent = NOTES[i];
  $("note").classList.add("on");
  $("close").focus();
  el.classList.add("done");
  opened.add(i);
  const left = FLOWERS.length - opened.size;
  $("hint").textContent = left ? `${left} more to go.` : "That's all seven. There's one more thing.";
  if (!left) $("readLetter").classList.remove("hidden");
}
function closeNote(){ $("note").classList.remove("on"); }
$("close").onclick = closeNote;
$("note").onclick = e => { if(e.target.id==="note") closeNote(); };
addEventListener("keydown",e=>{ if(e.key==="Escape") closeNote(); });

function petals(count){
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cols=["#f7c6d0","#ffb59a","#ffe29a","#fff4ea"];
  for(let i=0;i<count;i++){
    setTimeout(()=>{
      const p=document.createElement("div");
      p.className="petal";
      p.style.left=Math.random()*100+"vw";
      p.style.background=cols[i%4];
      p.style.setProperty("--dx",(Math.random()*160-80)+"px");
      p.style.animationDuration=(6+Math.random()*5)+"s";
      document.body.appendChild(p);
      setTimeout(()=>p.remove(),12000);
    }, i*260);
  }
}


// ---------- Gallery: replace src with your photo path or data URL; keep captions short ----------
const PHOTOS = [
  {src:"", cap:"The day we met"},
  {src:"", cap:"That trip"},
  {src:"", cap:"You laughing"},
  {src:"", cap:"Our favorite place"},
  {src:"", cap:"Just us"},
  {src:"", cap:"My favorite picture of you"}
];
const tilts = [-3,2,-1.5,3,-2,1.5];
function renderGallery(){
  const g=$("grid"); g.innerHTML="";
  PHOTOS.forEach((p,i)=>{
    const b=document.createElement("button");
    b.className="pol"; b.style.setProperty("--r",tilts[i%6]+"deg");
    b.setAttribute("aria-label","Open photo: "+p.cap);
    const im=document.createElement("div"); im.className="img";
    if(p.src) im.style.backgroundImage=`url("${p.src}")`; else im.textContent="\u{1F338}";
    const c=document.createElement("span"); c.textContent=p.cap;
    b.append(im,c); b.onclick=()=>openLb(p); g.appendChild(b);
  });
}

// Try to auto-load images from a simple manifest `gallery.json` or from `image/` filenames.
async function autoLoadGallery(){
  // attempt to fetch gallery.json first
  try{
    const res = await fetch('gallery.json', {cache: 'no-store'});
    if(res.ok){
      const data = await res.json();
      if(Array.isArray(data)){
        // normalize into PHOTOS
        while(PHOTOS.length < data.length) PHOTOS.push({src:'',cap:''});
        data.forEach((it,i)=>{ if(it && it.src) PHOTOS[i] = {src: it.src, cap: it.cap || guessCaption(it.src)}; });
        renderGallery();
        return;
      }
    }
  }catch(e){ /* ignore */ }

  // fallback: try to load files from `image/` by probing common names (1..20)
  try{
    const found = [];
    const exts = ['png','jpg','jpeg','webp','gif'];
    for(let i=1;i<=20;i++){
      for(const ext of exts){
        const path = `image/${i}.${ext}`;
        // use fetch HEAD to check existence
        try{
          const r = await fetch(path, {method:'HEAD'});
          if(r.ok){ found.push(path); break; }
        }catch(e){ }
      }
    }
    if(found.length){
      PHOTOS.length = 0;
      found.forEach(p=>PHOTOS.push({src:p,cap:guessCaption(p)}));
      renderGallery();
    }
  }catch(e){ /* ignore */ }
}

function guessCaption(src){
  try{
    const s = src.split('/').pop().replace(/%20/g,' ');
    return s.replace(/\.[^.]+$/, '').replace(/[-_]/g,' ');
  }catch(e){ return '' }
}

// run auto-load on script load so gallery is ready when opened
autoLoadGallery();
function openLb(p){
  const big=$("lbImg");
  big.style.backgroundImage=p.src?`url("${p.src}")`:"";
  big.textContent=p.src?"":"\u{1F338}";
  $("lbCap").textContent=p.cap; $("lb").classList.add("on"); $("lbClose").focus();
}
$("lbClose").onclick=()=>$("lb").classList.remove("on");
$("lb").onclick=e=>{ if(e.target.id==="lb") $("lb").classList.remove("on"); };
addEventListener("keydown",e=>{ if(e.key==="Escape") $("lb").classList.remove("on"); });
$("addPhotos").onclick=()=>$("files").click();
$("files").onchange=e=>{
  [...e.target.files].forEach(f=>{
    const url=URL.createObjectURL(f);
    const slot=PHOTOS.find(p=>!p.src);
    if(slot) slot.src=url; else PHOTOS.push({src:url,cap:"Us"});
  });
  renderGallery();
};
$("toGallery").onclick=()=>{ renderGallery(); $("letter").classList.add("hidden"); $("gallery").classList.remove("hidden"); scrollTo(0,0); };
$("backLetter").onclick=()=>{ $("gallery").classList.add("hidden"); $("letter").classList.remove("hidden"); scrollTo(0,0); };

$("open").onclick = () => {
  const to = $("to").value.trim() || "you";
  const from = $("from").value.trim() || "Me";
  $("intro").classList.add("hidden");
  $("stage").classList.remove("hidden");
  $("title").textContent = to === "you" ? "For you" : `For ${to}`;
  build();
  petals(18);
  $("readLetter").onclick = () => {
    $("paper").innerHTML = LETTER(to,from).map(t=>`<p>${t}</p>`).join("");
    $("stage").classList.add("hidden");
    $("letter").classList.remove("hidden");
    scrollTo(0,0);
    petals(30);
  };
  $("again").onclick = () => { $("letter").classList.add("hidden"); $("stage").classList.remove("hidden"); };
};
