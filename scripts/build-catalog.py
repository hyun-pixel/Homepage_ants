from pathlib import Path
import re,json,html
ROOT=Path(__file__).resolve().parents[1]
SITE=ROOT/'site'
source=(SITE/'index.html').read_text(encoding='utf-8-sig')
original_pdp=(SITE/'product/first-light/index.html').read_text(encoding='utf-8-sig')
data=(SITE/'catalog.mjs').read_text(encoding='utf-8-sig')
products=json.loads(re.search(r'export const PRODUCTS = ([\s\S]+?);\n',data).group(1))
families=json.loads(re.search(r'export const FAMILIES = ([\s\S]+?);\n',data).group(1))
esc=html.escape
money=lambda n:f'{n:,}원'
svg=lambda path:f'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="{path}"/></svg>'
arrow=svg('M5 12h14M13 6l6 6-6 6')
close=svg('m6 6 12 12M18 6 6 18')
familylinks=''.join(f'<a href="/shop/?family={f["id"]}">{f["name"]}</a>' for f in families[1:])
header=f'''<header class="site-header"><div class="header-inner">
<a class="wordmark" href="/#top" aria-label="ants 홈">ants</a>
<nav class="desktop-nav" aria-label="주요 메뉴"><a href="/shop/">전체 향수</a><div class="family-nav"><button type="button" class="family-button" aria-controls="family-panel" aria-expanded="false">향별로 찾기 {svg('m7 10 5 5 5-5')}</button><div class="family-panel" id="family-panel" hidden>{familylinks}</div></div><a href="/find-your-scent/">나의 향 찾기</a><a href="/#ritual">브랜드 이야기</a></nav>
<div class="header-actions"><button class="icon-button search-button" type="button" aria-label="향수 검색" aria-controls="search-dialog" aria-expanded="false">{svg('M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z')}</button><a class="icon-button cart-button" href="/cart/" aria-label="장바구니, 상품 0개">{svg('M5 7h14l1 14H4L5 7ZM8 8V5a4 4 0 0 1 8 0v3')}<span class="cart-count" aria-hidden="true">0</span></a><button class="icon-button menu-button" type="button" aria-label="메뉴 열기" aria-controls="mobile-menu" aria-expanded="false">{svg('M4 8h16M4 16h16')}</button></div></div></header>'''
footer='''<footer class="site-footer"><div class="footer-main"><div><a class="wordmark" href="/#top">ants</a><p>일상을 바꾸는 작은 향.</p></div><nav aria-label="하단 메뉴"><a href="/shop/">전체 향수</a><a href="/find-your-scent/">나의 향 찾기</a><a href="/#ritual">브랜드 이야기</a><a href="/cart/">장바구니</a></nav></div></footer>'''
overlays=f'''<dialog class="menu-drawer" id="mobile-menu" aria-labelledby="menu-title"><div class="drawer-top"><span class="wordmark" id="menu-title">ants</span><button class="icon-button close-menu" type="button" aria-label="메뉴 닫기">{close}</button></div><nav aria-label="모바일 메뉴"><a class="menu-all" href="/shop/">전체 향수</a><a href="/find-your-scent/">나의 향 찾기</a><div class="mobile-families">{familylinks}</div><a href="/#ritual">브랜드 이야기</a><a href="/cart/">장바구니</a></nav><p>일상을 바꾸는 작은 향.</p></dialog>
<dialog class="search-drawer" id="search-dialog" aria-labelledby="search-title"><div class="drawer-top"><h2 id="search-title">어떤 향을 찾으세요?</h2><button class="icon-button close-search" type="button" aria-label="검색 닫기">{close}</button></div><form class="search-form" action="/shop/" method="get"><label for="search-input">상품명이나 향의 느낌</label><div><input id="search-input" type="search" name="q" placeholder="비누, 린넨, 시트러스…" autocomplete="off"><button type="submit" class="button">검색</button></div></form><p class="search-count" id="search-count" role="status"></p><div id="search-results"></div><div class="search-empty" id="search-empty" hidden><p>일치하는 향수가 없어요.<br>‘비누’나 ‘우디’처럼 다른 말로 찾아보세요.</p><a class="text-link" href="/shop/">전체 향수 보기 {arrow}</a></div></dialog>
<aside class="cart-toast" id="cart-toast" aria-label="장바구니 알림" hidden><p role="status" aria-live="polite"></p><a href="/cart/">장바구니 보기</a><button class="icon-button" aria-label="알림 닫기" type="button">{close}</button></aside>'''
basehead=re.search(r'<head>([\s\S]*?)</head>',source).group(1)
basehead=re.sub(r'\s*<link rel="stylesheet" href="/store.css[^>]*>','',basehead)
basehead=re.sub(r'\s*<script[^>]+src="/main.js[^>]*></script>','',basehead)
basehead=re.sub(r'/assets/fonts/noto-sans-kr\.woff2[^\" ]*', '/assets/fonts/noto-sans-kr.woff2?v=20261015final',basehead)
basehead=re.sub(r'/commerce.css\?[^" ]+', '/commerce.css?v=20261015final',basehead)
basehead=re.sub(r'/styles.css\?[^" ]+', '/styles.css?v=20261015final',basehead)
basehead=re.sub(r'/shop.mjs\?[^" ]+', '/shop.mjs?v=20261015final',basehead)
basehead=basehead.replace('</title>','</title>\n  <link rel="stylesheet" href="/store.css?v=20261015final">')
basehead=re.sub(r'<meta name="description" content="[^"]*">','<meta name="description" content="ants. 깨끗한 일상을 위한 여섯 가지 향. 실제 결제 없는 가상 향수 스토어.">',basehead)
def page(title,body,pageid='',productid='',home=False):
    head=re.sub(r'<title>.*?</title>',f'<title>{title} · ants</title>',basehead)
    # Override comes after the established styles.
    store=re.search(r'\s*<link rel="stylesheet" href="/store.css[^>]*>',head).group(0)
    head=head.replace(store,'')+store
    if pageid=='finder':head+='\n<link rel="stylesheet" href="/finder.css?v=20261015final">\n<script type="module" src="/finder.mjs?v=20261015final"></script>\n'
    if pageid=='product':head+='\n<link rel="stylesheet" href="/product-detail.css?v=20261015final">\n<script type="module" src="/product-detail.mjs?v=20261015detail2"></script>\n'
    if home:head+='\n<script type="module" src="/main.js?v=20261015a"></script>\n'
    active_header=header.replace('href="/shop/">전체 향수</a>','href="/shop/" aria-current="page">전체 향수</a>',1) if pageid=='shop' else header
    if pageid=='finder':active_header=header.replace('href="/find-your-scent/">나의 향 찾기</a>','href="/find-your-scent/" aria-current="page">나의 향 찾기</a>',1)
    attrs=(f' data-page="{pageid}"' if pageid else '')+(f' data-product-id="{productid}"' if productid else '')
    skip='#scent' if home else '#main'
    return f'<!doctype html>\n<html lang="ko"><head>{head}</head><body{attrs}><a class="skip-link" href="{skip}">본문으로 건너뛰기</a>\n{active_header}\n<noscript><p class="script-notice">향 찾기·검색·분류·구매 체험에는 JavaScript가 필요합니다. 상품 정보는 계속 확인할 수 있어요.</p></noscript>\n{body}\n{footer}\n{overlays}\n</body></html>\n'
def card(p):
    return f'''<article class="catalog-card" data-product-card="{p['id']}"><a class="catalog-link" href="/product/{p['id']}/"><figure><img src="{p['image']}" alt="{p['name']} · {p['korean']} 향수병" width="1120" height="1400" loading="lazy" decoding="async"></figure><div class="catalog-card-copy"><div class="card-name"><h2 class="latin">{p['name']}</h2><span>{p['familyName']}</span></div><p class="card-scent">{p['scent']}</p><p class="card-price"><span>{p['volume']}</span><span>{money(p['price'])}</span></p></div></a></article>'''
cards=''.join(card(p) for p in products)
collection=f'''<section class="home-collection" aria-labelledby="collection-title"><div class="section-container"><div class="collection-heading"><div><h2 id="collection-title">일상에 스며드는,<br>여섯 가지 깨끗함.</h2><p>가벼운 비누향부터 차분한 나무결까지.<br>당신의 하루에 어울리는 향을 찾아보세요.</p></div><div class="collection-actions"><a class="text-link" href="/shop/">전체 향수 보기 {arrow}</a><a class="text-link" href="/find-your-scent/">나의 향 찾기 {arrow}</a></div></div><div class="catalog-grid home-grid">{cards}</div></div></section>'''
homemain=re.search(r'<main id="top">[\s\S]*?</main>',source).group(0)
if 'class="featured-section"' in homemain:homemain=re.sub(r'<section class="featured-section"[\s\S]*?</section>',collection,homemain)
else:homemain=re.sub(r'<section class="home-collection"[\s\S]*?</section>',collection,homemain)
(SITE/'index.html').write_text(page('일상을 바꾸는 작은 향',homemain,home=True),encoding='utf-8')
filters=''.join(f'<button class="filter-button" type="button" data-family="{f["id"]}" aria-pressed="{str(f["id"]=="all").lower()}">{f["name"]}</button>' for f in families)
shop=f'''<main class="shop-main" id="main"><section class="catalog-page section-container" aria-labelledby="catalog-title"><div class="catalog-intro"><h1 id="catalog-title">나의 하루에, <br>작은 향을.</h1><p>깨끗함을 닮은 여섯 가지 향.<br>좋아하는 기분으로 골라보세요.</p></div><div class="catalog-query" id="catalog-query" hidden><span></span><a href="/shop/">검색 지우기</a></div><div class="catalog-toolbar"><div class="catalog-filters" role="group" aria-label="향 계열">{filters}</div><div class="catalog-sort"><label for="catalog-sort">정렬</label><select id="catalog-sort"><option value="featured">추천순</option><option value="price-asc">낮은 가격순</option><option value="price-desc">높은 가격순</option></select></div></div><p class="catalog-count" id="catalog-count" role="status">6개의 향</p><div class="catalog-grid" id="catalog-grid">{cards}</div><div class="empty-state" id="catalog-empty" hidden><h2>이 조건에 맞는 향수가 없어요.</h2><p>다른 향 계열을 선택하거나 전체 상품에서 다시 찾아보세요.</p><a class="button" href="/shop/">전체 향수 보기 {arrow}</a></div></section></main>'''
(SITE/'shop').mkdir(exist_ok=True)
(SITE/'shop/index.html').write_text(page('전체 향수',shop,'shop'),encoding='utf-8')
firststory=re.search(r'<section class="detail-story[\s\S]*?(?=<section class="scent-profile)',original_pdp).group(0)
# On subsequent builds preserve the existing FIRST LIGHT editorial sections only.
firststory=re.split(r'<section class="(?:related-products|scent-profile)',firststory)[0]
firststory=firststory.replace(' id="scent-story"','')
firststory=firststory.replace('<section class="detail-story section-container"','<section class="detail-story section-container" id="scent-story"',1)
for p in products:
    price=money(p['price'])
    detail=p['detail']
    if p['id']=='first-light':story=firststory
    else:
        story=f'''<section class="scent-story section-container" id="scent-story" aria-labelledby="story-title"><figure><img src="{detail['image']}" alt="{detail['alt']}" width="1440" height="1080" loading="lazy" decoding="async"><figcaption>향의 분위기를 담은 장면</figcaption></figure><div class="scent-story-copy"><h2 id="story-title">{p['headline']}</h2><p>{p['story']}</p><p>{detail['paragraph']}</p></div></section>'''
    impressions=''.join(f'<div><dt>{label}</dt><dd><h3>{title}</h3><p>{copy}</p></dd></div>' for label,title,copy in detail['impressions'])
    story+=f'''<section class="scent-profile section-container" aria-labelledby="profile-title"><div class="scent-profile-intro"><h2 id="profile-title">{detail['title']}</h2><p>향을 떠올리는 세 가지 인상.</p></div><dl class="scent-impressions">{impressions}</dl><div class="scent-moment"><h3>이런 하루에 함께해요.</h3><p>{detail['moment']}</p></div></section>'''
    extended=detail['extended']
    paragraphs=''.join(f'<p>{copy}</p>' for copy in extended['paragraphs'])
    rituals=''.join(f'<div><dt>{title}</dt><dd>{copy}</dd></div>' for title,copy in extended['ritual'])
    companion=next(other for other in products if other['id']==extended['compareId'])
    pair=''.join(f'<div><img src="{other["image"]}" alt="{other["name"]} 향수병" width="1120" height="1400" loading="lazy" decoding="async"><div><h3 class="latin">{other["name"]}</h3><p>{other["korean"]} · {other["familyName"]}</p><p>{other["scent"]}</p></div></div>' for other in [p,companion])
    story+=f'''<section class="scent-campaign" id="scent-campaign" aria-labelledby="campaign-title"><figure class="campaign-photo"><img src="{extended['image']}" alt="{p['name']} 향수와 {p['scene']}에서 떠올린 장면" width="1536" height="864" style="object-position:{extended['crop']}" loading="lazy" decoding="async"></figure><div class="campaign-copy section-container"><h2 id="campaign-title">{extended['headline']}</h2><div>{paragraphs}</div></div></section>
<section class="scent-ritual section-container" id="scent-ritual" aria-labelledby="ritual-title"><div class="scent-ritual-copy"><h2 id="ritual-title">{extended['ritualTitle']}</h2><dl>{rituals}</dl></div><figure class="scent-design"><div class="scent-design-photo"><img src="{p['image']}" alt="{p['name']}의 투명한 몸체와 라벨을 가까이 본 모습" width="1120" height="1400" loading="lazy" decoding="async"></div><figcaption><h3>가까이에서 보는, 작은 형태.</h3><p>{extended['bottle']}</p></figcaption></figure></section>
<section class="scent-compare section-container" id="scent-compare" aria-labelledby="compare-title"><h2 id="compare-title">나에게 가까운 깨끗함은?</h2><div class="scent-pair">{pair}</div><div class="scent-compare-copy"><p>{extended['compareText']}</p><a class="text-link" href="/product/{companion['id']}/">{companion['korean']}도 살펴보기 {arrow}</a></div></section>'''
    related=''.join(card(other) for other in products if other['id']!=p['id'])
    # Three distinct alternatives keep the detail page focused; the full lineup is one link away.
    choices=[other for other in products if other['id']!=p['id']][:3]
    related=''.join(card(other) for other in choices)
    body=f'''<main class="shop-main" id="main"><section class="product-detail section-container" aria-labelledby="product-title"><div class="detail-media"><figure class="product-photo studio-photo"><a class="product-zoom" href="{p['image']}" aria-label="{p['name']} 사진 크게 보기" aria-haspopup="dialog" aria-controls="product-lightbox" data-image-zoom><img src="{p['image']}" alt="{p['name']} · {p['korean']}의 맑은 유리 향수병과 흰 뚜껑" width="1120" height="1400" fetchpriority="high"><span class="photo-enlarge">{svg('M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM10 6v8M6 10h8')}사진 크게 보기</span></a></figure></div><div class="detail-info"><a class="back-link" href="/shop/">전체 향수로 돌아가기</a><h1 class="latin caps" id="product-title">{p['name']}</h1><p class="product-korean">{p['korean']} · {p['familyName']}</p><p class="detail-description">{p['description']}</p><dl class="detail-impression" aria-label="향의 특징과 일상 장면"><div><dt>향의 인상</dt><dd>{p['tags'][0]} · {p['tags'][1]}</dd></div><div><dt>떠올린 순간</dt><dd>{p['scene']}</dd></div></dl><a class="text-link scent-story-link" href="#scent-story">향 이야기 보기 {svg("m6 9 6 6 6-6")}</a><dl class="product-spec"><div><dt>용량</dt><dd class="latin">{p['volume']}</dd></div><div><dt>가격</dt><dd class="price">{price}</dd></div></dl><div class="quantity-field" data-quantity="product"><label for="product-quantity">수량</label><div class="quantity-control"><button type="button" data-step="-1" aria-label="수량 줄이기">{svg('M6 12h12')}</button><input id="product-quantity" type="text" inputmode="numeric" pattern="[1-9]" value="1" autocomplete="off" aria-describedby="quantity-error"><button type="button" data-step="1" aria-label="수량 늘리기">{svg('M6 12h12M12 6v12')}</button></div><p class="field-error" id="quantity-error" aria-live="polite"></p></div><div class="selection-total"><span>선택 상품 금액</span><span data-selected-total>{price}</span></div><button class="button inline-add" type="button" data-add>장바구니 담기 {arrow}</button><p class="add-result" id="add-result" hidden>장바구니에 담았어요. <a href="/cart/">장바구니 보기</a></p><p class="storage-notice" role="status" hidden>브라우저 저장을 사용할 수 없어 현재 탭에서만 장바구니를 유지해요.</p></div></section>{story}<section class="related-products section-container" aria-labelledby="related-title"><div class="collection-heading"><h2 id="related-title">다른 깨끗함도 만나보세요.</h2><a class="text-link" href="/shop/">전체 향수 보기 {arrow}</a></div><div class="catalog-grid">{related}</div></section><div class="mobile-buy-bar" hidden><div><span>선택 상품 금액</span><strong data-selected-total>{price}</strong></div><button class="button" type="button" data-add>장바구니 담기</button></div></main>'''
    body+=f'''<dialog class="product-lightbox" id="product-lightbox" aria-labelledby="lightbox-title"><div class="lightbox-toolbar"><h2 class="latin" id="lightbox-title">{p['name']}</h2><button type="button" class="lightbox-size" data-image-size aria-pressed="false" disabled>원본 크기</button><button type="button" class="icon-button" data-image-close aria-label="사진 확대 닫기">{close}</button></div><div class="lightbox-viewer" tabindex="0" role="region" aria-label="확대한 제품 사진" aria-busy="true"><img src="{p['image']}" alt="{p['name']} · {p['korean']} 향수병 원본 사진" width="1120" height="1400" loading="lazy" decoding="async"><div class="lightbox-error" role="alert" hidden><p>사진을 불러오지 못했어요.</p><button class="button" type="button" data-image-retry>다시 불러오기</button></div></div><p class="lightbox-status" role="status" aria-live="polite">사진을 준비하고 있어요.</p></dialog>'''
    folder=SITE/'product'/p['id'];folder.mkdir(parents=True,exist_ok=True)
    (folder/'index.html').write_text(page(p['name'],body,'product',p['id']),encoding='utf-8')
storage='<p class="storage-notice" role="status" hidden>브라우저 저장을 사용할 수 없어 현재 탭에서만 장바구니를 유지해요.</p>'
def empty(title,paragraph,extra=''):
    return f'<section class="empty-state" {extra}><h2 tabindex="-1">{title}</h2><p>{paragraph}</p><a class="button" href="/shop/">전체 향수 보기 {arrow}</a></section>'
def summary(action):
    return f'''<aside class="order-summary"><h2>선택한 향</h2><dl><div><dt>향수 종류</dt><dd data-cart-kinds>0종</dd></div><div><dt>총 수량</dt><dd data-cart-quantity>0개</dd></div><div class="total-row"><dt>총 상품 금액</dt><dd data-cart-total>0원</dd></div></dl><p>실제 결제와 배송이 없는 모의 주문입니다.</p>{action}</aside>'''
cartbody=f'''<main class="shop-main" id="main"><div class="section-container task-page"><div class="page-heading"><h1>장바구니</h1><a class="text-link" href="/shop/">향수 계속 보기 {arrow}</a></div>{storage}<div class="order-layout" data-cart-filled hidden><section class="cart-items" id="cart-items" aria-label="선택한 상품"></section>{summary(f'<a class="button" href="/checkout/" data-checkout-link>모의 주문하기 {arrow}</a>')}</div>{empty('아직 담은 향수가 없어요.','좋아하는 향을 골라 장바구니에 담아보세요.','data-cart-empty')}</div></main>'''
(SITE/'cart/index.html').write_text(page('장바구니',cartbody,'cart'),encoding='utf-8')
checkoutbody=f'''<main class="shop-main" id="main"><div class="section-container task-page"><div class="page-heading"><h1>주문 내용 확인</h1><a class="text-link" href="/cart/">장바구니 수정하기 {arrow}</a></div>{storage}<div class="order-layout" data-cart-filled hidden><section aria-label="주문할 상품"><div id="checkout-items"></div><div class="order-explanation"><h2>선택한 향을 확인해 주세요.</h2><p>‘모의 주문 완료하기’를 선택하면 체험이 완료됩니다.<br>개인정보 입력이나 실제 주문 접수는 없습니다.</p></div></section>{summary(f'<button class="button" type="button" data-complete>모의 주문 완료하기 {arrow}</button>')}</div>{empty('확인할 상품이 없어요.','먼저 좋아하는 향수를 장바구니에 담아주세요.','data-cart-empty')}</div></main>'''
(SITE/'checkout/index.html').write_text(page('주문 내용 확인',checkoutbody,'checkout'),encoding='utf-8')
completebody=f'''<main class="shop-main" id="main"><div class="section-container complete-page"><div data-result-filled hidden><div class="complete-heading">{svg('m5 12 4 4L19 6')}<h1>모의 주문을<br>완료했어요.</h1><p>선택한 향과 수량을 확인해 보세요.<br>실제 결제와 배송은 진행되지 않습니다.</p></div><div id="result-items"></div><dl class="result-totals"><div><dt>체험한 상품</dt><dd data-result-quantity></dd></div><div><dt>총 상품 금액</dt><dd data-result-total></dd></div></dl><div class="complete-actions"><a class="button" href="/shop/">다른 향수 둘러보기 {arrow}</a><a class="text-link" href="/#top">홈으로 돌아가기 {arrow}</a></div></div>{empty('완료한 모의 주문이 없어요.','좋아하는 향수를 고르고 모의 주문을 진행해 보세요.','data-result-empty')}</div></main>'''
(SITE/'complete/index.html').write_text(page('모의 주문 완료',completebody,'complete'),encoding='utf-8')
print('Built store routes from six catalog records; original home film and FIRST LIGHT editorial retained.')

# Three native-radio steps use the same authored source in the browser and HTML.
finder_source=(SITE/'finder.mjs').read_text(encoding='utf-8-sig')
questions=json.loads(re.search(r'export const QUESTIONS = ([\s\S]+?);\n',finder_source).group(1))
fields=''
for i,q in enumerate(questions):
    choices=''.join(f'<label class="finder-option"><input type="radio" name="{q["id"]}" value="{o["value"]}" required><span><strong>{o["label"]}</strong><span>{o["description"]}</span></span></label>' for o in q['options'])
    fields+=f'<fieldset aria-describedby="finder-error" {"hidden disabled" if i else ""}><legend class="finder-question" tabindex="-1">{q["title"]}</legend><div class="finder-options">{choices}</div></fieldset>'
answers=''.join(f'<div><dt>{q["summary"]}</dt><dd data-finder-answer="{i}"></dd></div>' for i,q in enumerate(questions))
finder=f'''<main id="main" class="shop-main"><div class="finder-page section-container"><div class="finder-layout"><figure class="finder-scene"><img id="finder-image" src="/assets/images/soap.webp" alt="아침빛 아래 흰 비누와 부드러운 수건" width="1200" height="1200" fetchpriority="high"></figure><div class="finder-content"><h1 id="finder-title" tabindex="-1">좋아하는 기분으로,<br>나의 향 찾기.</h1><p class="finder-intro" id="finder-intro">세 가지 취향을 고르면, 당신의 일상과 닮은 향을 안내해드릴게요.</p><div class="finder-progress" id="finder-progress"><p role="status" aria-live="polite">질문 1 / 3</p><ol aria-hidden="true"><li aria-current="step"></li><li></li><li></li></ol></div><form id="scent-finder" novalidate>{fields}<p class="field-error" role="alert" id="finder-error"></p><div class="finder-controls"><button class="finder-back" type="button" data-finder-back hidden>이전 질문</button><button class="button" type="submit"><span>다음 질문</span>{arrow}</button></div></form><section id="finder-result" class="finder-result" aria-labelledby="finder-result-title" hidden><h2 class="latin caps" id="finder-result-title"></h2><p class="finder-result-korean" id="finder-result-korean"></p><p class="finder-result-scent" id="finder-result-scent"></p><p class="finder-result-why" id="finder-result-why"></p><dl class="finder-answers">{answers}</dl><div class="finder-price"><span>50mL · 가격</span><strong id="finder-result-price"></strong></div><a class="button" id="finder-result-link" href="/shop/">향수 자세히 보기 {arrow}</a><div class="finder-result-actions"><button type="button" class="finder-back" data-finder-restart>다시 찾기</button><a href="/shop/">전체 향수 보기</a></div><p class="demo-caption">선택한 취향을 바탕으로 여섯 가지 향 중 하나를 제안해요.</p></section><p class="finder-note">선택한 취향은 저장하거나 외부로 보내지 않아요.</p><noscript><style>#scent-finder,#finder-progress{{display:none}}</style><p>향 찾기를 이용하려면 JavaScript가 필요해요. <a href="/shop/">전체 향수에서 직접 골라보세요.</a></p></noscript></div></div></div></main>'''
(SITE/'find-your-scent').mkdir(exist_ok=True)
(SITE/'find-your-scent/index.html').write_text(page('나의 향 찾기',finder,'finder'),encoding='utf-8')
print('Built scent finder; shared header notice removed across all 12 pages.')
