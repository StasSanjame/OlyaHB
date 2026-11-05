const $=s=>document.querySelector(s),app=$('#app'),nav=$('#nav'),ov=$('#ov'),cv=$('#fx'),cx=cv.getContext('2d');
const C=['#ff3d81','#ffd23f','#3ddc97','#4cc9f0','#ff8a3d','#b57bff'];
const ic=d=>`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
const H=t=>`<h1>${t}</h1>`,Q=t=>`<p class="q">${t}</p>`;
const grid=(a,l,c='')=>`<div class="grid ${c}">${a.map((s,i)=>`<div><img src="img/${s}" alt=""><button class="btn" data-i="${i}">${l}</button></div>`).join('')}</div>`;
const car=a=>`<div class="car"><div class="trk">${a.map(s=>`<img src="img/${s}" alt="" decoding="async">`).join('')}</div><button class="ar l" aria-label="Предыдущее фото">‹</button><button class="ar r" aria-label="Следующее фото">›</button></div><p class="cnt">Фото <b>1</b> из ${a.length}</p><button class="btn" data-i="0">Это фото №1</button>`;
const sp=(s,mh='62vh')=>`<div class="sp" style="--mh:${mh}"><img src="img/${s}" alt=""><canvas></canvas><i>👆 нажми, чтобы открыть</i></div>`;

/* ---------- конфетти / салюты / шарики ---------- */
let cur=0,lock=0,T,rain=0,k=0,ps=[],ft=0;
function add(o){ps.push(o);if(!ft)loop()}
function burst(x,y,n,s,col){for(let i=0;i<n;i++){const a=Math.random()*6.283,v=2+Math.random()*(s?6:9);add({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-(s?0:5),g:s?.05:.25,c:s?col:C[i%6],s:s?2.6:6+Math.random()*5,r:0,vr:Math.random()*.4-.2,l:s?75:150,sp:s})}}
function fw(){burst(innerWidth*(.15+.7*Math.random()),innerHeight*(.1+.4*Math.random()),70,1,C[Math.random()*6|0])}
function loop(){ft=1;const W=innerWidth,Hh=innerHeight;if(cv.width!=W||cv.height!=Hh){cv.width=W;cv.height=Hh}cx.clearRect(0,0,W,Hh);
 ps=ps.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.r+=p.vr;p.l--;
  if(p.sp){p.vx*=.98;p.vy*=.98}else{p.vx*=.992;if(p.vy>4)p.vy=4}
  cx.globalAlpha=p.sp?Math.min(1,p.l/30):1;cx.fillStyle=p.c;
  if(p.sp){cx.beginPath();cx.arc(p.x,p.y,p.s,0,6.283);cx.fill()}
  else{cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);cx.restore()}
  return p.l>0&&p.y<Hh+20});
 ps.length||rain?requestAnimationFrame(loop):ft=0}
function party(on){clearInterval(rain);rain=0;const b=$('#bl');b.innerHTML='';if(!on)return;
 rain=setInterval(()=>{for(let i=0;i<2;i++)add({x:Math.random()*innerWidth,y:-12,vx:Math.random()*2-1,vy:1+Math.random()*2,g:.02,c:C[Math.random()*6|0],s:6+Math.random()*5,r:0,vr:Math.random()*.3-.15,l:900});if(++k%25==0)fw()},100);
 for(let i=0;i<12;i++)b.insertAdjacentHTML('beforeend',`<i class="bn" style="left:${Math.random()*95}%;--c:${C[i%6]};--d:${9+Math.random()*8}s;--l:-${Math.random()*14}s;--s:${Math.random()*80-40}px"></i>`)}

/* ---------- спойлер как в Telegram ---------- */
const spInit=()=>app.querySelectorAll('.sp').forEach(el=>{
 const c=el.querySelector('canvas'),g=c.getContext('2d');let on=1;
 (function f(){if(!on||!el.isConnected)return;const w=c.width=el.clientWidth,h=c.height=el.clientHeight;g.fillStyle='#fff';
  for(let i=w*h/40|0;i--;){g.globalAlpha=Math.random();g.fillRect(Math.random()*w,Math.random()*h,1.6,1.6)}setTimeout(f,70)})();
 el.onclick=()=>{if(el.classList.contains('open'))return;el.classList.add('open');setTimeout(()=>on=0,900);
  const r=el.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,90)}});

/* ---------- карусель: одна кнопка выбирает фото, которое сейчас на экране ---------- */
const carInit=()=>{const t=app.querySelector('.trk'),c=app.querySelector('.cnt b'),b=app.querySelector('.btn[data-i]'),s=d=>t.scrollBy({left:d*t.clientWidth,behavior:'smooth'});
 t.onscroll=()=>{if(lock)return;const i=Math.round(t.scrollLeft/t.clientWidth);c.textContent=i+1;b.dataset.i=i;b.textContent='Это фото №'+(i+1)};
 app.querySelector('.l').onclick=()=>s(-1);app.querySelector('.r').onclick=()=>s(1)};

/* ---------- страницы ---------- */
// [файл, x%, y%, ширина vw, поворот, (мобильные) x%, y%, ширина vw]
const SC=[['mainPage1.png',1,4,24,-7,0,1,46],['mainPage2.png',76,4,21,7,56,1,40],['mainPage3.png',1,70,18,5,30,11,36],['mainPage4.png',3,30,14,5,2,79,25],
['mainPage5.png',14,50,15,-4,24,80,26],['mainPage6.png',87,36,11,-6,47,79,20],['mainPage7.png',72,40,13,4,69,76,14],['mainPage8.png',83,62,14,-5,82,80,17]];
const sc=SC.map(([s,x,y,w,r,a,b,c],i)=>`<img src="img/${s}" alt="" style="--x:${x}%;--y:${y}%;--w:${w}vw;--r:${r}deg;--mx:${a}%;--my:${b}%;--mw:${c}vw;--d:-${i*.7}s">`).join('');
const P=[
{party:1,h:`<div class="sc">${sc}</div><div class="hero"><h1>С Днём Рождения, Оля!</h1><ul class="wish"><li>🎂 Пусть этот год будет ярким, смешным и немного безумным — как и мы!</li><li>✨ Желаем море счастья, крутых эмоций и исполнения всех планов.</li><li>💛 Пусть рядом всегда будут те, с кем можно смеяться до слёз.</li><li>🎮 А в дискорде пусть всегда будет весело и никогда не будет скучно!</li></ul><button class="btn big" onclick="go(1)">🎁 Получить подарок</button></div>`},
{h:`<img class="pic" src="img/questMain.jpg" alt=""><h2>Сейчас Оля будет проходить викторину!</h2>${Q('Внимательно и полностью читай вопросы, много смейся и обсуждай всё с нами в дискорде.')}<button class="btn big" onclick="go(2)">Начать</button>`},
{ok:[0],h:H('1 вопрос')+`<img class="pic" src="img/quest1.png" alt="">`+Q('Играл ли Слава в наших видео женские роли?')+`<div class="opts"><button class="btn" data-i="0">Да</button><button class="btn" data-i="1">Нет</button></div>`},
{h:`<div class="vids">${[['1','Розочка, это просто самокат'],['2','Дашенька, иди писи V1.0'],['3','Дашенька, иди писи 🥺']].map(([n,t])=>`<figure><video src="vid/${n}.mp4" controls playsinline preload="metadata"></video><figcaption>${t}</figcaption></figure>`).join('')}</div><button class="btn big" onclick="go(4)">Продолжить</button>`},
{ok:[0],h:H('2 вопрос')+Q('Только одна из этих трёх аватарок была у Славы в инсте. Какая?')+grid(['quest2_1.png','quest2_2.jpg','quest2_3.jpg'],'Эта','c')},
{ok:[2],h:H('3 вопрос')+Q('Какой из этих пабликов, Славин паблик с постиронией, достигнувший отметки 1000+ подписчиков?')+grid(['quest3_1.png','quest3_2.png','quest3_3.png'],'Этот')},
{ok:[0],h:H('4 вопрос')+Q('Только на двух из этих фотографий изображен Слава. Кто же из них импостер?')+grid(['quest4_1.jpg','quest4_2.jpg','quest4_3.jpg'],'Он')},
{h:H('67')+Q('67')+grid(['quest5_1.jpg','quest5_2.jpg','quest5_3.jpg'],'67')},
{ok:[1],init:carInit,h:H('6 вопрос')+Q('На всех этих фотографиях мы <b>трезвые</b>, и лишь на одной из них <b>бухие</b>. На какой?')+car(['quest6_1.jpeg','quest6_2.png','quest6_3.jpeg','quest6_4.jpg','quest6_5.jpeg','quest6_6.jpeg','quest6_7.jpeg'])},
{ok:[3],init:carInit,h:H('7 вопрос')+Q('А теперь наоборот - на всех этих фотографиях мы <b>бухие</b>, и лишь на одной из них <b>трезвые</b>. На какой?')+car(['quest7_1.jpeg','quest7_2.jpg','quest7_3.jpg','quest7_4.jpeg','quest7_5.jpeg','quest7_6.jpg','quest7_7.jpg'])},
{party:1,init:spInit,h:`<h1 class="xl">Победа!</h1>${Q('Твой заслуженный приз:')}${sp('prize1.JPG')}${Q('Нажми после получения подарка:')}<button class="btn big" onclick="go(11)">сиксевен</button>`},
{h:`${H('Ой, а это не всё')}<img class="pic" src="img/prizeHint.png" alt="" style="max-height:34vh">${Q('Нажми после победы:')}<button class="btn big" onclick="go(12)">Респект!</button>`},
{init:spInit,h:sp('prize2.JPG','80vh')}
];

/* ---------- навигация и ответы ---------- */
function go(n){clearTimeout(T);lock=0;ov.className='';cur=n;const p=P[n];
 app.innerHTML=`<section class="page">${p.h}</section>`;scrollTo(0,0);
 nav.innerHTML=(n?`<button class="b0" aria-label="Назад" onclick="go(${n-1})">${ic('M15 5l-7 7 7 7')}</button>`:'')+(n==12?`<button class="f" aria-label="В начало" onclick="go(0)">${ic('M9 5l7 7-7 7')}</button>`:'');
 party(p.party);if(p.party)setTimeout(()=>burst(innerWidth/2,innerHeight*.55,120),250);
 p.init&&p.init()}
function ans(b){lock=1;const p=P[cur],g=!p.ok||p.ok.includes(+b.dataset.i);b.classList.add(g?'ok':'bad');
 if(g){const r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,50)}
 T=setTimeout(()=>{ov.firstElementChild.textContent=g?'Правильно!':'Неправильно!';ov.className='show '+(g?'ok':'bad');T=setTimeout(()=>go(cur+1),1500)},700)}
app.onclick=e=>{const b=e.target.closest('.btn[data-i]');if(b&&!lock)ans(b)};
go(0);
