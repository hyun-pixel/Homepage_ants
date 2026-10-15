const clamp = value => Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
const smooth = (a,b,p) => { const t=clamp((p-a)/(b-a)); return t*t*(3-2*t); };
export function getStoryState(progress) {
  const p=clamp(progress);
  return {
    progress:p,
    intro:1-smooth(.23,.34,p),
    middle:smooth(.36,.46,p)*(1-smooth(.65,.75,p)),
    product:smooth(.78,.9,p),
    phase:p<.24?'물방울 가까이':p<.6?'첫빛의 순간':p<.8?'맑은 아침':'FIRST LIGHT'
  };
}
export function getFilmTime(progress,duration) {
  if (!Number.isFinite(duration) || duration<=0) return 0;
  return clamp(clamp(progress)/.86)*Math.max(0,duration-1/30);
}
