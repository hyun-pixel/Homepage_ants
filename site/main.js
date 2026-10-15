import { getStoryState, getFilmTime } from './motion.mjs?v=20261014quality1';

const root = document.documentElement;
const story = document.querySelector('.hero-story');
const stage = document.querySelector('.hero-stage');
const visual = document.querySelector('.scene-visual');
const film = document.querySelector('.scene-film');
const poster = document.querySelector('.scene-poster');
const status = document.getElementById('render-status');
const productPanel = document.querySelector('.product-copy');
const productJump = document.querySelector('.product-jump');
const chapter = document.querySelector('.chapter-name');
const scrollCue = document.querySelector('.scroll-cue');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let ready = false, failed = false, current = 0, target = 0, frame = 0, previousTime = 0;
let inView = true;
let filmLoading = false;

function isStatic() { return !film.dataset.src || failed || reducedMotion.matches; }
function getProgress() {
  const header = parseFloat(getComputedStyle(root).getPropertyValue('--header')) || 80;
  const start = story.getBoundingClientRect().top + scrollY - header;
  return Math.min(1, Math.max(0, (scrollY - start) / Math.max(1, story.offsetHeight - stage.offsetHeight)));
}
function syncProductAnchor() {
  const destination = isStatic() ? productPanel : productJump;
  (isStatic() ? productJump : productPanel).removeAttribute('id');
  destination.id = 'first-light';
  if (location.hash === '#first-light') destination.scrollIntoView({block:'start',behavior:'instant'});
}
function applyCopy(p) {
  const state = getStoryState(p);
  root.style.setProperty('--intro-opacity', state.intro.toFixed(4));
  root.style.setProperty('--middle-opacity', state.middle.toFixed(4));
  root.style.setProperty('--product-opacity', state.product.toFixed(4));
  root.style.setProperty('--intro-shift', (-18 * (1 - state.intro)).toFixed(2) + 'px');
  root.style.setProperty('--middle-shift', (16 * (1 - state.middle)).toFixed(2) + 'px');
  root.style.setProperty('--product-shift', (18 * (1 - state.product)).toFixed(2) + 'px');
  root.style.setProperty('--progress', state.progress.toFixed(4));
  document.querySelector('.intro-copy').style.visibility = state.intro > .001 || isStatic() ? 'visible' : 'hidden';
  document.querySelector('.middle-copy').style.visibility = state.middle > .001 && !isStatic() ? 'visible' : 'hidden';
  productPanel.classList.toggle('is-visible', state.product > .001 || isStatic());
  productPanel.inert = !(state.product > .95 || isStatic());
  scrollCue.inert = state.intro < .94 || isStatic();
  scrollCue.style.visibility = state.intro > .94 && !isStatic() ? 'visible' : 'hidden';
  chapter.textContent = state.phase;
  visual.dataset.progress = state.progress.toFixed(3);
}
function schedule() {
  if (!frame && ready && inView && !document.hidden && !isStatic()) frame = requestAnimationFrame(draw);
}
function draw(now) {
  frame = 0;
  if (!ready || isStatic() || !inView || document.hidden) return;
  const dt = Math.min(.05, previousTime ? (now-previousTime)/1000 : 1/60);
  previousTime = now;
  current = Math.abs(target-current) < .0003 ? target : current + (target-current)*(1-Math.exp(-14*dt));
  applyCopy(current);
  const seconds = getFilmTime(current,film.duration);
  // Latest scroll position wins; never queue multiple simultaneous video seeks.
  if (!film.seeking && Math.abs(film.currentTime-seconds) > 1/60) film.currentTime = seconds;
  if (Math.abs(target-current) > .0003) schedule();
}
function updateScroll() {
  target = isStatic() ? 1 : getProgress();
  if (isStatic() || !ready) applyCopy(target); else schedule();
}
function setMotionMode() {
  const still = isStatic();
  document.body.classList.toggle('static-scene',still);
  film.hidden = still || !ready;
  poster.hidden = !still && ready;
  film.pause();
  root.dataset.scene = failed ? 'fallback' : still ? 'still' : ready ? 'ready' : 'loading';
  syncProductAnchor();
  target = current = still ? 1 : getProgress();
  poster.src = still || target >= .86 ? 'assets/images/first-light-campaign.webp' : 'assets/images/first-light-macro.webp';
  previousTime = 0;
  updateScroll();
}
function fallback() {
  failed = true;
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  status.hidden = false;
  status.textContent = '움직이는 장면을 불러오지 못해 제품 이미지로 보여드려요.';
  setMotionMode();
}
async function loadFilm() {
  if (!film.dataset.src || ready || failed || reducedMotion.matches || film.src || filmLoading) return;
  filmLoading = true;
  try {
    // Keep backward seeking reliable even on a local server without byte ranges.
    const response = await fetch(film.dataset.src);
    if (!response.ok) throw new Error('Video could not be loaded');
    const bytes = await response.blob();
    if (reducedMotion.matches) return;
    film.preload = 'auto';
    film.src = URL.createObjectURL(bytes);
    film.load();
  } catch { fallback(); }
  finally { filmLoading = false; }
}
film.addEventListener('loadeddata', () => {
  if (!Number.isFinite(film.duration) || film.duration <= 0) return fallback();
  ready = true;
  status.hidden = true;
  const firstFrame = getFilmTime(getProgress(),film.duration);
  if (!isStatic() && firstFrame > 1/60) {
    film.addEventListener('seeked',setMotionMode,{once:true});
    film.currentTime = firstFrame;
  } else setMotionMode();
});
film.addEventListener('error', fallback);
film.addEventListener('seeked', () => {
  visual.dataset.videoTime = film.currentTime.toFixed(3);
  schedule();
});
reducedMotion.addEventListener('change', () => { setMotionMode(); loadFilm(); });
addEventListener('scroll',updateScroll,{passive:true});
addEventListener('resize',() => { previousTime = 0; updateScroll(); },{passive:true});
document.addEventListener('visibilitychange',() => { previousTime=0; if (!document.hidden) updateScroll(); });
new IntersectionObserver(entries => {
  inView = entries[0].isIntersecting;
  previousTime = 0;
  if (inView) updateScroll();
  else if (frame) { cancelAnimationFrame(frame); frame=0; }
},{rootMargin:'100px'}).observe(stage);
setMotionMode();
loadFilm();
