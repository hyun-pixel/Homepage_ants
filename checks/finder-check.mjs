import assert from 'node:assert/strict';
import {QUESTIONS,recommendScent} from '../site/finder.mjs';
import {PRODUCTS} from '../site/catalog.mjs';
assert.equal(QUESTIONS.length,3);assert(QUESTIONS.every(q=>q.options.length===3));
const outcomes=new Set();let combinations=0;
for(const first of QUESTIONS[0].options) for(const second of QUESTIONS[1].options) for(const third of QUESTIONS[2].options){
 const answers=[first.value,second.value,third.value],result=recommendScent(answers);
 assert(PRODUCTS.includes(result));assert(first.products.includes(result.id));assert.equal(recommendScent(answers).id,result.id);
 outcomes.add(result.id);combinations++;
}
assert.equal(combinations,27);assert.equal(outcomes.size,6);
for(const [answers,id] of [
 [['clean','morning','airy'],'first-light'],[['clean','rest','cozy'],'soft-linen'],
 [['fresh','morning','airy'],'citrus-air'],[['fresh','rest','grounded'],'green-hour'],
 [['gentle','refresh','airy'],'petal-mist'],[['gentle','rest','grounded'],'quiet-wood']
])assert.equal(recommendScent(answers).id,id);
for(const invalid of [null,[],['clean'],['clean','rest'],['unknown','rest','airy'],['clean','x','airy'],['clean','rest','x'],['clean','rest','airy','extra']])assert.throws(()=>recommendScent(invalid));
console.log('PASS: all27 preference paths valid and deterministic, all6 fragrances reachable, six anchor examples, incomplete/unknown preferences rejected.');
