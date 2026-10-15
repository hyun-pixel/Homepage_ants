import {PRODUCTS,FAMILIES,productById,productHref,formatMoney,visibleProducts} from './catalog.mjs';
import {RESULT_KEY,quantityValue,addItem,withQuantity,cartCount,cartTotal,createCartStore,decodeResult} from './cart.mjs';

const cart = createCartStore(() => localStorage,history.state?.antsCart);
const currentProduct = productById(document.body.dataset.productId);
const icon = path => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;

// Native dialogs keep keyboard focus in the open navigation or search panel.
for (const [id,triggerSelector,closeSelector] of [['mobile-menu','.menu-button','.close-menu'],['search-dialog','.search-button','.close-search']]) {
  const dialog = document.getElementById(id), trigger = document.querySelector(triggerSelector);
  if (!dialog || !trigger) continue;
  trigger.addEventListener('click',() => {
    document.querySelectorAll('dialog[open]').forEach(open => open.close());
    dialog.showModal(); trigger.setAttribute('aria-expanded','true'); document.body.classList.add('menu-open');
    if (id === 'search-dialog') dialog.querySelector('input').focus();
  });
  dialog.querySelector(closeSelector).addEventListener('click',() => dialog.close());
  dialog.addEventListener('keydown',event => {if (event.key === 'Escape') {event.preventDefault();dialog.close();}});
  dialog.addEventListener('click',event => {if (event.target === dialog) dialog.close();});
  dialog.querySelectorAll('a').forEach(link => link.addEventListener('click',() => dialog.close()));
  dialog.addEventListener('close',() => {
    trigger.setAttribute('aria-expanded','false');
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('menu-open');
    trigger.focus({preventScroll:true});
  });
}
const familyButton = document.querySelector('.family-button'), familyPanel = document.getElementById('family-panel');
function closeFamily(returnFocus = false) {
  if (!familyPanel) return;
  familyPanel.hidden = true; familyButton.setAttribute('aria-expanded','false');
  if (returnFocus) familyButton.focus();
}
familyButton?.addEventListener('click',() => {
  familyPanel.hidden = !familyPanel.hidden;
  familyButton.setAttribute('aria-expanded',String(!familyPanel.hidden));
});
document.addEventListener('click',event => {if (!event.target.closest('.family-nav')) closeFamily();});
document.addEventListener('keydown',event => {if (event.key === 'Escape' && !familyPanel?.hidden) closeFamily(true);});
document.addEventListener('focusin',event => {if (!event.target.closest('.family-nav')) closeFamily();});
familyPanel?.querySelectorAll('a').forEach(link => link.addEventListener('click',() => closeFamily()));

const searchInput = document.getElementById('search-input');
function updateSearch() {
  const results = visibleProducts({query:searchInput.value});
  document.getElementById('search-count').textContent = searchInput.value.trim() ? `검색 결과 ${results.length}개` : '전체 향수 6종';
  document.getElementById('search-results').innerHTML = results.map(p => `<a class="search-result" href="${productHref(p.id)}"><img src="${p.image}" width="80" height="100" alt=""><span><strong class="latin">${p.name}</strong><span>${p.korean} · ${p.familyName}</span></span><span>${formatMoney(p.price)}</span></a>`).join('');
  document.getElementById('search-empty').hidden = results.length !== 0;
}
searchInput?.addEventListener('input',updateSearch);
if (searchInput) updateSearch();

if (document.body.dataset.page === 'shop') {
  const params = new URLSearchParams(location.search);
  let family = FAMILIES.some(f => f.id === params.get('family')) ? params.get('family') : 'all';
  const query = (params.get('q') ?? '').trim();
  const sort = document.getElementById('catalog-sort');
  sort.value = ['price-asc','price-desc'].includes(params.get('sort')) ? params.get('sort') : 'featured';
  function filterCatalog(updateURL = true) {
    const results = visibleProducts({family,query,sort:sort.value});
    const ids = results.map(p => p.id);
    const grid = document.getElementById('catalog-grid');
    grid.querySelectorAll('[data-product-card]').forEach(card => card.hidden = !ids.includes(card.dataset.productCard));
    ids.forEach(id => grid.appendChild(grid.querySelector(`[data-product-card="${id}"]`)));
    document.querySelectorAll('[data-family]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.family === family)));
    document.getElementById('catalog-count').textContent = `${results.length}개의 향`;
    document.getElementById('catalog-empty').hidden = results.length !== 0;
    const context = document.getElementById('catalog-query');
    context.hidden = !query; context.querySelector('span').textContent = `“${query}” 검색 결과`;
    if (updateURL) {
      const next = new URLSearchParams();
      if (family !== 'all') next.set('family',family);
      if (query) next.set('q',query);
      if (sort.value !== 'featured') next.set('sort',sort.value);
      history.replaceState(history.state,'',`${location.pathname}${next.size ? '?'+next : ''}`);
    }
  }
  document.querySelectorAll('[data-family]').forEach(button => button.addEventListener('click',() => {family=button.dataset.family;filterCatalog();}));
  sort.addEventListener('change',() => filterCatalog());
  filterCatalog(false);
}

const toast = document.getElementById('cart-toast');
let toastTimer;
function announce(message, showCart = true) {
  if (!toast) return;
  toast.querySelector('[role="status"]').textContent = message;
  toast.querySelector('a').hidden = !showCart; toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {if (!toast.matches(':focus-within,:hover')) toast.hidden=true;},5000);
}
toast?.querySelector('button').addEventListener('click',() => {toast.hidden=true;});

function quantityMarkup(id,name,quantity) {
  return `<div class="quantity-field" data-quantity="cart" data-item-id="${id}"><label for="quantity-${id}">${name} 수량</label><div class="quantity-control"><button type="button" data-step="-1" aria-label="${name} 수량 줄이기">${icon('M6 12h12')}</button><input id="quantity-${id}" type="text" inputmode="numeric" value="${quantity}" pattern="[1-9]" aria-describedby="error-${id}"><button type="button" data-step="1" aria-label="${name} 수량 늘리기">${icon('M6 12h12M12 6v12')}</button></div><p class="field-error" id="error-${id}" aria-live="polite"></p></div>`;
}
function checkoutAvailability() {
  const invalid = Boolean(document.querySelector('[data-quantity="cart"] input[aria-invalid="true"]'));
  document.querySelectorAll('[data-checkout-link]').forEach(link => {link.inert=invalid;link.setAttribute('aria-disabled',String(invalid));});
}
function bindQuantity(group) {
  const input = group.querySelector('input'), error = document.getElementById(input.getAttribute('aria-describedby'));
  const inCart = group.dataset.quantity === 'cart';
  function validate(commit = true) {
    const value = quantityValue(input.value), invalid = value === null;
    input.setAttribute('aria-invalid',String(invalid));
    error.textContent = invalid ? '수량은 1~9 사이의 정수로 입력해 주세요.' : '';
    group.querySelector('[data-step="-1"]').disabled = invalid || value === 1;
    group.querySelector('[data-step="1"]').disabled = invalid || value === 9;
    if (inCart && !invalid && commit) {cart.write(withQuantity(cart.read(),group.dataset.itemId,value));sync();}
    if (!inCart) {
      document.querySelectorAll('[data-add]').forEach(button => button.disabled=invalid);
      document.querySelectorAll('[data-selected-total]').forEach(el => el.textContent = invalid ? '수량 확인 필요' : formatMoney(currentProduct.price*value));
    }
    checkoutAvailability();
  }
  input.addEventListener('input',() => validate());
  group.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click',() => {
    const value = quantityValue(input.value);
    if (value !== null) input.value = value+Number(button.dataset.step);
    validate();
  }));
  validate(false);
}
let cartSignature = '';
function renderCart(items) {
  const container = document.getElementById('cart-items');
  if (!container) return;
  const signature = items.map(item => item.id).join(',');
  if (signature !== cartSignature) {
    container.innerHTML = items.map(({id,quantity}) => {
      const p = productById(id);
      return `<article class="cart-row" data-cart-row="${id}"><a class="cart-image" href="${productHref(id)}" aria-label="${p.name} 상품 보기"><img src="${p.image}" width="220" height="275" alt="${p.name} 향수병"></a><div class="cart-item-info"><a class="cart-name latin" href="${productHref(id)}">${p.name}</a><p>${p.korean} · ${p.volume} · ${p.familyName}</p><p>개당 ${formatMoney(p.price)}</p>${quantityMarkup(id,p.name,quantity)}<p class="line-total">상품 금액 <span data-line-total="${id}">${formatMoney(p.price*quantity)}</span></p><button type="button" class="remove-button" data-remove="${id}" aria-label="${p.name} 삭제">삭제</button></div></article>`;
    }).join('');
    cartSignature = signature;
    container.querySelectorAll('[data-quantity]').forEach(bindQuantity);
  }
  for (const item of items) {
    const group = container.querySelector(`[data-item-id="${item.id}"]`), input = group.querySelector('input');
    if (!input.matches(':focus') && input.getAttribute('aria-invalid') !== 'true') {
      input.value=item.quantity;
      group.querySelector('[data-step="-1"]').disabled=item.quantity===1;
      group.querySelector('[data-step="1"]').disabled=item.quantity===9;
    }
    container.querySelector(`[data-line-total="${item.id}"]`).textContent = formatMoney(productById(item.id).price*item.quantity);
  }
}
function receiptRows(items) {
  return items.map(({id,quantity}) => {const p=productById(id);return `<article class="review-item"><a href="${productHref(id)}" aria-label="${p.name} 상품 보기"><img src="${p.image}" width="160" height="200" alt="${p.name} 향수병"></a><div><h2 class="latin">${p.name}</h2><p>${p.korean} · ${p.volume} · 수량 ${quantity}개</p><p>${formatMoney(p.price*quantity)}</p></div></article>`;}).join('');
}
function sync() {
  const items=cart.read(), count=cartCount(items);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent=count);
  document.querySelectorAll('.cart-button').forEach(el => el.setAttribute('aria-label',`장바구니, 상품 ${count}개`));
  document.querySelectorAll('[data-cart-total]').forEach(el => el.textContent=formatMoney(cartTotal(items)));
  document.querySelectorAll('[data-cart-quantity]').forEach(el => el.textContent=`${count}개`);
  document.querySelectorAll('[data-cart-kinds]').forEach(el => el.textContent=`${items.length}종`);
  document.querySelectorAll('[data-cart-filled]').forEach(el => el.hidden=!count);
  document.querySelectorAll('[data-cart-empty]').forEach(el => el.hidden=Boolean(count));
  document.querySelectorAll('.storage-notice').forEach(el => el.hidden=cart.persistent);
  document.documentElement.dataset.cartStorage=cart.persistent?'local':'memory';
  if (!cart.persistent) history.replaceState({...history.state,antsCart:items},'');
  renderCart(items); checkoutAvailability();
  const review = document.getElementById('checkout-items');
  if (review) review.innerHTML=receiptRows(items);
  const complete=document.querySelector('[data-complete]');
  if (complete) complete.disabled=!count;
}
document.querySelector('[data-quantity="product"]') && bindQuantity(document.querySelector('[data-quantity="product"]'));
document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click',() => {
  const added=quantityValue(document.querySelector('[data-quantity="product"] input').value);
  const next=addItem(cart.read(),currentProduct.id,added), error=document.getElementById('quantity-error');
  if (!next) {error.textContent='한 향수는 최대 9개까지 담을 수 있어요. 장바구니에서 수량을 확인해 주세요.';announce(error.textContent);return;}
  error.textContent='';cart.write(next);sync();document.getElementById('add-result').hidden=false;
  announce(`${currentProduct.name} ${added}개를 담았어요.`);
}));
document.getElementById('cart-items')?.addEventListener('click',event => {
  const button=event.target.closest('[data-remove]'); if (!button) return;
  const id=button.dataset.remove, p=productById(id);
  const row=button.closest('article'), nextRow=row.nextElementSibling ?? row.previousElementSibling;
  const nextId=nextRow?.dataset.cartRow;
  cart.write(withQuantity(cart.read(),id,0));sync();announce(`${p.name}를 장바구니에서 삭제했어요.`,false);
  if (nextId) document.querySelector(`[data-cart-row="${nextId}"] a`).focus();
  else document.querySelector('[data-cart-empty] h2').focus();
});
document.querySelector('[data-complete]')?.addEventListener('click',event => {
  const items=cart.read();if (!items.length) {sync();return;}
  event.currentTarget.disabled=true;
  const result={version:2,items};
  try {sessionStorage.setItem(RESULT_KEY,JSON.stringify(result));} catch (error) {console.warn('Demo result uses navigation memory.',error.name);}
  cart.write([]);history.pushState({antsCart:[],antsResult:result},'','/complete/');
  scrollTo({top:0,behavior:'instant'});location.reload();
});
if (document.body.dataset.page === 'complete') {
  let result;
  try {result=decodeResult(sessionStorage.getItem(RESULT_KEY));} catch {}
  if (!result) result=decodeResult(JSON.stringify(history.state?.antsResult));
  document.querySelector('[data-result-filled]').hidden=!result;
  document.querySelector('[data-result-empty]').hidden=Boolean(result);
  if (result) {
    document.getElementById('result-items').innerHTML=receiptRows(result.items);
    document.querySelector('[data-result-total]').textContent=formatMoney(cartTotal(result.items));
    document.querySelector('[data-result-quantity]').textContent=`${cartCount(result.items)}개 · ${result.items.length}종`;
  }
}
const inlineAdd=document.querySelector('.inline-add');
if (inlineAdd) new IntersectionObserver(entries => {document.querySelector('.mobile-buy-bar').hidden=entries[0].isIntersecting;},{threshold:0}).observe(inlineAdd);
addEventListener('storage',sync);addEventListener('pageshow',sync);
document.addEventListener('click',event => {
  const link=event.target.closest('a[href]');
  if (cart.persistent || !link || event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
  const destination=new URL(link.href);
  if (destination.origin!==location.origin || (destination.pathname===location.pathname && destination.search===location.search)) return;
  event.preventDefault();history.pushState({antsCart:cart.read()},'',destination.href);location.reload();
});
document.querySelector('.search-form')?.addEventListener('submit',event => {
  if (cart.persistent) return;
  event.preventDefault();
  const destination=new URL('/shop/',location.origin);
  const query=searchInput.value.trim();if (query) destination.searchParams.set('q',query);
  history.pushState({antsCart:cart.read()},'',destination.href);location.reload();
});
sync();
