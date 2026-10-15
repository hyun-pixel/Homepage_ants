const trigger = document.querySelector('[data-image-zoom]');
const dialog = document.getElementById('product-lightbox');

if (trigger && dialog && typeof dialog.showModal === 'function') {
  const close = dialog.querySelector('[data-image-close]');
  const toggle = dialog.querySelector('[data-image-size]');
  const viewer = dialog.querySelector('.lightbox-viewer');
  const image = viewer.querySelector('img');
  const status = dialog.querySelector('[role="status"]');
  const error = dialog.querySelector('.lightbox-error');
  const setSize = original => {
    dialog.classList.toggle('is-original', original);
    toggle.setAttribute('aria-pressed', String(original));
    toggle.textContent = original ? '전체 보기' : '원본 크기';
    status.textContent = original ? '사진 영역을 스크롤해 자세히 살펴보세요.' : '사진 전체를 화면에 맞춰 보고 있어요.';
    viewer.scrollTo({top:0,left:0,behavior:'instant'});
  };
  const loading = () => {
    image.hidden = false; error.hidden = true; toggle.disabled = true;
    viewer.setAttribute('aria-busy','true');
    status.textContent = '사진을 준비하고 있어요.';
  };
  const loaded = () => {
    image.hidden = false; error.hidden = true; toggle.disabled = false;
    viewer.removeAttribute('aria-busy'); setSize(false);
  };
  const failed = () => {
    image.hidden = true; error.hidden = false; toggle.disabled = true;
    viewer.removeAttribute('aria-busy');
    status.textContent = '다시 불러오거나 닫은 뒤 상품을 계속 살펴보세요.';
  };
  image.addEventListener('load', loaded);
  image.addEventListener('error', failed);
  trigger.addEventListener('click', event => {
    if (event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    document.querySelectorAll('dialog[open]').forEach(open => open.close());
    setSize(false); loading(); dialog.showModal();
    document.body.classList.add('menu-open'); close.focus({preventScroll:true});
    if (image.complete) image.naturalWidth ? loaded() : failed();
  });
  toggle.addEventListener('click', () => setSize(!dialog.classList.contains('is-original')));
  dialog.querySelector('[data-image-retry]').addEventListener('click', () => {
    viewer.focus({preventScroll:true});
    loading(); image.src = trigger.href;
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const targets = [...dialog.querySelectorAll('button, [tabindex="0"]')]
      .filter(target => !target.disabled && target.getClientRects().length);
    const first = targets[0], last = targets[targets.length - 1];
    if ((event.shiftKey && document.activeElement === first) || (!event.shiftKey && document.activeElement === last)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus({preventScroll:true});
    }
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    setSize(false);
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('menu-open');
    trigger.focus({preventScroll:true});
  });
}
