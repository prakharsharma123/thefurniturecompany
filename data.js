// Products, image settings and drawing helpers.
// Put your photo paths in the IMG block below (photo files go in /public/images).
const inr=n=>'₹'+Math.round(n).toLocaleString('en-IN');
function art(t,c){c=c||'#C58F4D';const a='#16211A',s='stroke="#16211A" stroke-width="1.4"';
if(t==='k'){let r='';for(let i=0;i<4;i++)r+=`<rect x="${8+i*26}" y="6" width="24" height="28" fill="${c}" ${s}/><rect x="${8+i*26}" y="54" width="24" height="30" fill="${c}" ${s}/><rect x="${12+i*26}" y="60" width="16" height="2" fill="${a}"/>`;return `<svg viewBox="0 0 120 90">${r}<rect x="4" y="50" width="112" height="4" fill="${a}"/></svg>`}
if(t==='w'){let r='';for(let i=0;i<4;i++)r+=`<rect x="${10+i*25}" y="5" width="25" height="80" fill="${c}" ${s}/><rect x="${(i%2?14:31)+i*25}" y="40" width="2" height="14" fill="${a}"/>`;return `<svg viewBox="0 0 120 90">${r}</svg>`}
if(t==='m')return `<svg viewBox="0 0 120 90"><rect x="58" y="3" width="4" height="9" fill="${a}"/><path d="M60 10 C44 14 38 28 40 40 H80 C82 28 76 14 60 10Z" fill="${c}" ${s}/><rect x="36" y="40" width="48" height="6" fill="${a}"/><rect x="40" y="46" width="40" height="30" fill="${c}" ${s}/><path d="M50 76 V58 C50 50 70 50 70 58 V76Z" fill="${a}"/><rect x="30" y="46" width="8" height="30" fill="${c}" ${s}/><rect x="82" y="46" width="8" height="30" fill="${c}" ${s}/><rect x="22" y="76" width="76" height="8" fill="${a}"/></svg>`;
if(t==='p')return `<svg viewBox="0 0 120 90"><polygon points="10,40 60,12 110,40" fill="${a}"/><rect x="16" y="40" width="88" height="44" fill="${c}" ${s}/><rect x="26" y="52" width="16" height="32" fill="${a}"/><rect x="58" y="52" width="14" height="14" fill="#fff" ${s}/><rect x="80" y="52" width="14" height="14" fill="#fff" ${s}/></svg>`;
return `<svg viewBox="0 0 120 90"><rect x="24" y="8" width="72" height="76" fill="${c}" ${s}/><circle cx="46" cy="28" r="8" fill="#fff" ${s}/><circle cx="74" cy="28" r="8" fill="#fff" ${s}/><rect x="34" y="46" width="52" height="6" fill="${a}"/><rect x="34" y="58" width="52" height="6" fill="${a}"/></svg>`}
/* =====================================================================
   IMAGE SETTINGS: paste your image links here. Empty means the drawing shows.
   On the real website, upload files to an images folder and write the path,
   for example p0:'images/l-shaped-kitchen.jpg'.
   In this preview only pictures embedded as base64 (data:image/...) will show.
   To make a picture clickable, use the link form instead of a plain path:
   p0:{src:'images/kitchen.jpg', href:'https://example.com/page', alt:'L-shaped kitchen'}
   The picture is then rendered as <a href><img src></a>. Use href:'#product/0' to open a page inside the site.
   ===================================================================== */
const IMG={
 /* About page */ hero:'', pk:'', rk:'',
 /* Products, in the same order as the product list (p0 = L-Shaped Kitchen ... p8 = Interior Design) */
 p0:'/images/LshapedKitchen.jpg',p1:'/images/straightkitchen.png',p2:'/images/cabinetwallkit.png',p3:'/images/SlidingWardrobe.png',p4:'/images/Wardrobes.png',p5:'/images/woodmandir.png',p6:'/images/marblemandir.png',p7:'',p8:'',
 /* Home page slider */ slide0:'/images/LshapedKitchen.jpg',slide3:'/images/Wardrobes.png',slide5:'/images/whitemandir.png',
 /* Home page: three category tiles and the flash sale picture */ bento0:'/images/LshapedKitchen.jpg',bento1:'/images/Wardrobes.png',bento2:'/images/woodmandir.png',sale:'/images/sale.png',
 /* Projects: before and after photos */
 before0:'/images/bfkitchen.png',after0:'/images/afkitchen.png',before3:'/images/bflivingarea.png',after3:'/images/aflivingarea.png',before5:'/images/bfoffice.png',after5:'/images/afoffice.png',before7:'/images/bfliving.png',after7:'/images/afliving.png',
 /* Blog cards */ blog0:'/images/straightkitchen.png',blog1:'/images/whitemandir.png',blog2:'/images/SlidingWardrobe.png',blog3:'',blog4:'',blog5:'',
 /* Home page project strip */ g0:'/images/cabinetwallkit.png',g1:'/images/Wardrobes.png',g2:'/images/LshapedKitchen.jpg',g3:'/images/woodmandir.png',g4:'/images/afkitchen.png',g5:'/images/SlidingWardrobe.png'};
const pic=(k,fb)=>{const v=IMG[k];if(!v)return fb();const o=typeof v==='string'?{src:v}:v,m=`<img class="pi" src="${o.src}" alt="${o.alt||''}" loading="lazy">`;return o.href?`<a class="pl" href="${o.href}" ${o.href[0]==='#'?'':'target="_blank" rel="noopener"'} onclick="event.stopPropagation()">${m}</a>`:m};

/* <img> tag helper used by the Home and Shop pages.
   k = key from the IMG block above, t = drawing type (k,w,m,c), col = colour, alt = alt text.
   If IMG[k] is empty a ready-made placeholder file from /public/images/placeholders is used,
   so every picture on Home and Shop is a real <img src="..."> you can swap. */
const imgTag=(k,t,col,alt)=>{const v=IMG[k],o=!v?null:typeof v==='string'?{src:v}:v;
 const fix=u=>/^(https?:|data:|\/)/.test(u)?u:'/'+u.replace(/^\.?\//,'');
 const src=o?fix(o.src):`/images/placeholders/${t}-${String(col||'#C58F4D').replace('#','')}.svg`;
 const m=`<img class="pi${o?'':' pd'}" src="${src}" alt="${(o&&o.alt)||alt||''}" loading="lazy">`;
 return o&&o.href?`<a class="pl" href="${o.href}" ${o.href[0]==='#'?'':'target="_blank" rel="noopener"'} onclick="event.stopPropagation()">${m}</a>`:m};
const P=[
{n:'L-Shaped Modular Kitchen',t:'k',c:'Kitchens',m:'q',o:15,r:4.9,g:'lf',col:'#C58F4D',d:'BWP plywood carcass, soft-close hardware, 5-year warranty.',s:[['8 x 8 ft',145000],['10 x 8 ft',182000],['12 x 10 ft',248000]]},
{n:'Straight Modular Kitchen',t:'k',c:'Kitchens',m:'q',o:10,r:4.8,g:'b',col:'#7FA394',d:'Laminate or acrylic shutters with stainless steel baskets.',s:[['8 ft run',96000],['10 ft run',121000],['12 ft run',149000]]},
{n:'Kitchen Wall Cabinet Set',t:'k',c:'Kitchens',m:'b',o:20,r:4.7,g:'lb',col:'#F1EDE6',d:'Ready stock. Three units with hinges and handles.',s:[['Set of 3',14500],['Set of 4',18900]]},
{n:'Sliding Door Wardrobe',t:'w',c:'Wardrobes',m:'b',o:30,r:5,g:'lbf',col:'#5B7185',d:'Aluminium track, 18 mm board, mirror or laminate front.',s:[['4 x 7 ft',24500],['5 x 7 ft',29800],['6 x 7 ft',34900]]},
{n:'Swing Door Wardrobe',t:'w',c:'Wardrobes',m:'b',o:10,r:4.6,g:'f',col:'#C58F4D',d:'Loft included, three shelves and a hanging rail.',s:[['4 x 7 ft',21500],['6 x 7 ft',31200]]},
{n:'Wooden Home Mandir',t:'m',c:'Mandir',m:'q',o:0,r:4.9,g:'bf',col:'#E8E2D6',d:'Hand-carved teak mandir with dome, pillars and LED lighting.',s:[['2 x 3 ft',45000],['3 x 4 ft',78000],['4 x 5 ft',120000]]},
{n:'Marble Mandir Design',t:'m',c:'Mandir',m:'q',o:5,r:4.7,g:'l',col:'#9CB8AA',d:'Traditional marble mandir with carved pillars and arch.',s:[['3 x 3 ft',65000],['4 x 4 ft',98000]]},
{n:'Control Panel Board',t:'c',c:'Control Panels',m:'b',o:12,r:4.8,g:'lb',col:'#B9C2CB',d:'Powder-coated IP54 enclosure, wired to your drawing.',s:[['600 x 400',18500],['800 x 600',27500]]},
{n:'Full Home Interior Design',t:'k',c:'Interiors',m:'q',o:0,r:4.9,g:'f',col:'#D9C7A8',d:'Space planning, 3D views, false ceiling, furniture and turnkey execution.',s:[['1 BHK',350000],['2 BHK',550000],['3 BHK',800000]]}];
const FIN=['#C58F4D','#7FA394','#5B7185','#F1EDE6'];
P.forEach((p,i)=>p.id=i);
const was=(p,k)=>p.o?p.s[k][1]/(1-p.o/100):0;
module.exports={art,pic,imgTag,inr,was,FIN,P,IMG};
