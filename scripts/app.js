import { checkoutPro, unlockPro } from './stripe.js';
import { showAds, hideAds, isRewardedActive, grantRewardedPremium } from './ads.js';

// DOM Elements
const marquee = document.getElementById('marquee');
const rsvpWord = document.getElementById('rsvpWord');
const textInput = document.getElementById('textInput');
const wpmInput = document.getElementById('wpmInput');
const wpmSlider = document.getElementById('wpmSlider');
const loadBtn = document.getElementById('loadBtn');
const pauseBtn = document.getElementById('pauseBtn');
const startOverBtn = document.getElementById('startOverBtn');
const flowScreen = document.getElementById('flowScreen');
const rsvpScreen = document.getElementById('rsvpScreen');
const modeSelect = document.getElementById('modeSelect');
const fontTypeSelect = document.getElementById('fontType');
const fontSizeSelect = document.getElementById('fontSize');
const fontColorSelect = document.getElementById('fontColor');
const bgColorSelect = document.getElementById('bgColor');
const buyProBtn = document.getElementById('buyProBtn');

// State
let words=[], pos=0, animationId=null, isPaused=false, speed=1;
let currentIndex=0;
let purchasedPro = localStorage.getItem('purchasedPro')==='true';

// Initialize
if(!purchasedPro && !isRewardedActive()) showAds();
else hideAds();

// Event Listeners
buyProBtn.addEventListener('click', checkoutPro);

document.getElementById('themeBtn').addEventListener('click', ()=>{ document.body.dataset.theme=document.body.dataset.theme==='light'?'dark':'light'; });

function applyStyles(){
  [marquee,rsvpWord].forEach(el=>{
    el.style.fontFamily = fontTypeSelect.value;
    el.style.fontSize = fontSizeSelect.value+'px';
    el.style.color = fontColorSelect.value;
  });
  flowScreen.style.background = bgColorSelect.value;
  rsvpScreen.style.background = bgColorSelect.value;
}

function renderWords(){
  words = textInput.value.trim().split(/\s+/);
  applyStyles();

  if(modeSelect.value==='rsvp'){
    if(!purchasedPro){ alert('RSVP mode is Pro only'); modeSelect.value='flow'; return; }
    flowScreen.style.display='none';
    rsvpScreen.style.display='flex';
    currentIndex=0;
    rsvpWord.textContent = words[0]||'';
  } else if(modeSelect.value==='flow-highlight'){
    if(!purchasedPro){ alert('Flow+Highlight is Pro only'); modeSelect.value='flow'; return; }
    flowScreen.style.display='flex';
    rsvpScreen.style.display='none';
    marquee.innerHTML='';
    words.forEach(word=>{
      const span=document.createElement('span');
      span.className='word';
      span.textContent = word+' ';
      marquee.appendChild(span);
    });
    pos=flowScreen.clientWidth;
  } else {
    flowScreen.style.display='flex';
    rsvpScreen.style.display='none';
    marquee.innerHTML='';
    words.forEach(word=>{
      const span=document.createElement('span');
      span.className='word';
      span.textContent = word+' ';
      marquee.appendChild(span);
    });
    pos=flowScreen.clientWidth;
  }
}

function updateSpeed(){ speed = wpmInput.value/60; }

function animateFlow(){
  if(isPaused){ animationId=requestAnimationFrame(animateFlow); return; }
  pos -= speed;
  marquee.style.transform=`translateX(${pos}px)`;
  if(modeSelect.value==='flow-highlight'){
    const rect = flowScreen.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const spans = marquee.querySelectorAll('.word');
    spans.forEach(s=>s.classList.remove('active'));
    for(let s of spans){
      const sRect = s.getBoundingClientRect();
      if(sRect.left <= centerX && sRect.right >= centerX){ s.classList.add('active'); break; }
    }
  }
  if(pos+marquee.offsetWidth>0) animationId=requestAnimationFrame(animateFlow);
}

function animateRSVP(){
  if(isPaused){ animationId=requestAnimationFrame(animateRSVP); return; }
  if(currentIndex<words.length){
    rsvpWord.textContent = words[currentIndex];
    currentIndex++;
    const interval = 60000/wpmInput.value;
    setTimeout(()=>{ animationId=requestAnimationFrame(animateRSVP); }, interval);
  }
}

function startAnimation(){
  cancelAnimationFrame(animationId);
  applyStyles();
  if(modeSelect.value==='rsvp'){ animateRSVP(); } else { animateFlow(); }
}

// Load button

