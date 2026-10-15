import {productById,productHref,formatMoney} from './catalog.mjs';

export const QUESTIONS = [
  {"id":"feeling","title":"어떤 향의 느낌에 가장 끌리나요?","summary":"향의 느낌","options":[{"value":"clean","label":"맑고 단정한 향","description":"갓 씻은 비누와 햇볕에 말린 린넨","products":["first-light","soft-linen"]},{"value":"fresh","label":"밝고 싱그러운 향","description":"산뜻한 시트러스와 비 갠 잎사귀","products":["citrus-air","green-hour"]},{"value":"gentle","label":"은은하고 차분한 향","description":"여린 꽃잎과 부드러운 나무결","products":["petal-mist","quiet-wood"]}]},
  {"id":"moment","title":"어떤 순간에 함께하고 싶나요?","summary":"함께할 순간","options":[{"value":"morning","label":"아침을 시작할 때","description":"외출 전, 하루를 준비하는 작은 습관"},{"value":"refresh","label":"기분 전환이 필요할 때","description":"일상 사이에 가벼운 활기를 더하는 순간"},{"value":"rest","label":"편안하게 쉬고 싶을 때","description":"나의 속도로 천천히 머무르는 시간"}]},
  {"id":"mood","title":"향에서 어떤 기분이 남았으면 좋겠나요?","summary":"남기고 싶은 기분","options":[{"value":"airy","label":"밝고 가벼운 산뜻함","description":"맑은 공기처럼 기분 좋게"},{"value":"cozy","label":"포근하고 부드러운 여운","description":"편안한 옷자락처럼 다정하게"},{"value":"grounded","label":"싱그럽고 차분한 여백","description":"느린 산책을 하듯 고요하게"}]}
];
// Authored preference rules for the six concept fragrances; no external model.
const momentScores = {
  morning:{'first-light':3,'soft-linen':0,'citrus-air':2,'green-hour':1,'petal-mist':2,'quiet-wood':0},
  refresh:{'first-light':1,'soft-linen':0,'citrus-air':3,'green-hour':1,'petal-mist':3,'quiet-wood':0},
  rest:{'first-light':0,'soft-linen':3,'citrus-air':0,'green-hour':3,'petal-mist':0,'quiet-wood':3}
};
const moodScores = {
  airy:{'first-light':3,'soft-linen':0,'citrus-air':3,'green-hour':0,'petal-mist':3,'quiet-wood':0},
  cozy:{'first-light':0,'soft-linen':3,'citrus-air':0,'green-hour':1,'petal-mist':2,'quiet-wood':2},
  grounded:{'first-light':1,'soft-linen':1,'citrus-air':0,'green-hour':3,'petal-mist':0,'quiet-wood':3}
};
const preference = {
  airy:['citrus-air','first-light','petal-mist','green-hour','soft-linen','quiet-wood'],
  cozy:['soft-linen','petal-mist','quiet-wood','green-hour','first-light','citrus-air'],
  grounded:['quiet-wood','green-hour','soft-linen','first-light','petal-mist','citrus-air']
};
export function recommendScent(answers) {
  if (!Array.isArray(answers) || answers.length !== 3) throw new Error('Choose three preferences');
  const chosen = QUESTIONS.map((question,index) => question.options.find(option => option.value === answers[index]));
  if (chosen.some(option => !option)) throw new Error('Unknown preference');
  const ids = [...chosen[0].products];
  const score = id => momentScores[answers[1]][id] + moodScores[answers[2]][id];
  ids.sort((a,b) => score(b)-score(a) || preference[answers[2]].indexOf(a)-preference[answers[2]].indexOf(b));
  return productById(ids[0]);
}

function setupFinder(form) {
  let step=0;
  const fields=[...form.querySelectorAll('fieldset')];
  const layout=document.querySelector('.finder-layout');
  const heading=document.getElementById('finder-title');
  const intro=document.getElementById('finder-intro');
  const progress=document.getElementById('finder-progress');
  const result=document.getElementById('finder-result');
  const image=document.getElementById('finder-image');
  const back=form.querySelector('[data-finder-back]');
  const next=form.querySelector('[type="submit"]');
  const error=document.getElementById('finder-error');
  const clearError=() => {error.textContent='';fields.forEach(field => field.removeAttribute('aria-invalid'));};
  function showStep(index,focus=false) {
    step=index;clearError();
    fields.forEach((field,i) => {field.hidden=i!==step;field.disabled=i!==step;});
    back.hidden=step===0;next.querySelector('span').textContent=step===2?'나의 향 확인하기':'다음 질문';
    progress.querySelector('p').textContent=`질문 ${step+1} / 3`;
    progress.querySelectorAll('li').forEach((item,i) => item.setAttribute('aria-current',i===step?'step':'false'));
    if (focus) {
      const legend=fields[step].querySelector('legend');
      legend.focus({preventScroll:true});legend.scrollIntoView({block:'nearest',behavior:'instant'});
    }
  }
  form.addEventListener('change',clearError);
  back.addEventListener('click',() => showStep(step-1,true));
  form.addEventListener('submit',event => {
    event.preventDefault();
    if (!fields[step].querySelector('input:checked')) {
      error.textContent='마음에 드는 항목을 하나 골라주세요.';
      fields[step].setAttribute('aria-invalid','true');
      fields[step].querySelector('input').focus();return;
    }
    if (step<2) {showStep(step+1,true);return;}
    const answers=fields.map(field => field.querySelector('input:checked').value);
    const product=recommendScent(answers);
    heading.innerHTML='당신의 일상과<br>닮은 향을 찾았어요.';
    intro.textContent='좋아하는 기분에서 출발한, 당신을 위한 작은 제안.';
    document.getElementById('finder-result-title').textContent=product.name;
    document.getElementById('finder-result-korean').textContent=`${product.korean} · ${product.familyName}`;
    document.getElementById('finder-result-scent').textContent=product.scent;
    document.getElementById('finder-result-price').textContent=formatMoney(product.price);
    document.getElementById('finder-result-link').href=productHref(product.id);
    document.getElementById('finder-result-why').textContent=`${QUESTIONS[0].options.find(o=>o.value===answers[0]).label}을 바탕으로, ${QUESTIONS[2].options.find(o=>o.value===answers[2]).label}을 떠올렸습니다.`;
    fields.forEach((field,i) => {
      document.querySelector(`[data-finder-answer="${i}"]`).textContent=QUESTIONS[i].options.find(o=>o.value===answers[i]).label;
    });
    image.src=product.image;image.alt=`${product.name} · ${product.korean} 향수병`;image.width=1120;image.height=1400;
    layout.classList.add('is-result');form.hidden=true;progress.hidden=true;result.hidden=false;
    document.title=`${product.name} · 나의 향 찾기 · ants`;
    heading.focus({preventScroll:true});scrollTo({top:0,behavior:'instant'});
  });
  document.querySelector('[data-finder-restart]').addEventListener('click',() => {
    form.reset();layout.classList.remove('is-result');result.hidden=true;form.hidden=false;progress.hidden=false;
    heading.innerHTML='좋아하는 기분으로,<br>나의 향 찾기.';
    intro.textContent='세 가지 취향을 고르면, 당신의 일상과 닮은 향을 안내해드릴게요.';
    image.src='/assets/images/soap.webp';image.alt='아침빛 아래 흰 비누와 부드러운 수건';image.width=1200;image.height=1200;
    document.title='나의 향 찾기 · ants';showStep(0,true);
  });
  showStep(0);
}
if (typeof document !== 'undefined') {
  const form=document.getElementById('scent-finder');if (form) setupFinder(form);
}
