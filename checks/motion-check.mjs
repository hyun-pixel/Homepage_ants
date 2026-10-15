import assert from 'node:assert/strict';
import {getStoryState,getFilmTime} from '../site/motion.mjs';
for (let i=0;i<=1000;i++){
  const p=i/1000, state=getStoryState(p);
  assert.equal(state.progress,p);
  for(const key of ['intro','middle','product']) assert.ok(state[key]>=0&&state[key]<=1);
  if(i) assert.ok(getFilmTime(p,8)>=getFilmTime(p-.001,8));
  assert.ok(state.intro*state.product===0,'Product and opening copy must never overlap');
}
assert.equal(getStoryState(0).intro,1);
assert.equal(getStoryState(1).product,1);
assert.equal(getFilmTime(1,NaN),0);
assert.equal(getFilmTime(1,0),0);
assert.equal(getFilmTime(-1,8),0);
assert.ok(getFilmTime(.96,8)<8);
assert.equal(getFilmTime(.96,8),getFilmTime(1,8));
const back=[1,.75,.5,.25,0].map(p=>getFilmTime(p,8));
assert.ok(back.every((time,index)=>!index||time<=back[index-1]),'Reverse scrolling must rewind');
console.log('PASS: frame range, monotonic seeking, reading hold, safe invalid duration and copy states');
