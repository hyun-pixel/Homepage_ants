# 2026-10-14 연속 영상 연결 검수

## 변경 파일

- site/index.html: 실제 영상 data-src, 로딩 접사 이미지, 현재 CSS/JS 버전.
- site/main.js: 로딩 중 레이아웃 유지, 전체 Blob 준비 후 native 영상 탐색, 실제 seek 완료 DOM 기록, 직접 제품 링크 초기 프레임 표시.
- site/styles.css: 가로 화면의 전체 비율/오른쪽 정렬로 뚜껑 보존.
- site/assets/video/first-light-camera.mp4 및 JSON: 8.041667s,1600×902,24fps,무음,3177846B. H264CRF22/6프레임 기준점/faststart.
- PRODUCT.md, DESIGN.md, .impeccable/design.json, ASSETS.md, DECISIONS.md, REVIEW.html: 현재 구현·미확인 범위·출처·검수 기록. checks의 reduced/fallback/cinematic/export도 현재 소스로 동기화.

## 실제 확인

- 원본은1916×1080/24fps/8.041667s/무음/12606474B. contact sheet의 실제 8개 프레임은 작은 부착 물방울→같은 병 전체의 카메라 이동을 보여준다. 두 정지 이미지를 단순 교차 전환하지 않았다.
- 정상 PC1440×1000와 모바일390×844의 시작·중간·제품·역방향. p.55에서실제seek완료5.133s, p.96에서8.008s, 이후p.25로되돌아가2.339s(PC)/2.333s(모바일). 영상시각화와글자상태를 함께확인.
- tablet768×1024/narrow320×740/landscape844×390 제품장면. 모두가로넘침없음. 가로cap잘림은 containright100%로고쳤으며최종landscape-product.png에서전체병확인.
- 실제메인62517모바일메뉴열기→FIRST LIGHT알아보기→메뉴닫힘→p.956/frame8.008/productCTA noninert; 향소개CTA #scent이동. 검수footer버튼이아닌실제메뉴결과는mobile-live-product.png/mobile-scent.png.
- 실제메인 직접상품URL #first-light 최초로딩: p.960/frame8.008, desktop-live-product.png. 로딩중macro/sticky 유지후목표frame탐색완료때영상표시.
- 강제reduced fixture PC/mobile: stillmode, video src=null, campaignposter, CTA유지,가로넘침없음. 강제영상실패404fixture PC/mobile: fallbackmode, 이미지와친절한상태문구/제품CTA유지.
- JS구문검사, checks/motion-check.mjs PASS. 시간범위·방향·readinghold·잘못된duration·문구비중첩을검사. 디자인detector1회3개 기존경고(fullbleedpadding/Noto파서 sans kr/확정InstrumentSans),전역디자인변경은요구하지않음. raster출처3개/누락0개, 영상JSON출처있음.
- 초기 실제메뉴이동후영상탐색stall을발견. LocalSimpleHTTP의Range응답없음을확인하고fetch→Blob준비로해결해실제메뉴재검수. 마지막코드film3.
- 현재Cua읽기전용미디어getter currentTime은0으로반환되는경우가있어native seeked이벤트의공개data-video-time과실제픽셀로검증했다. 진행률은CSS스크롤정수화로약±.001, 영상좌표마지막seek는1/60s이내차이허용.

## 비용과 요청

사용자가14크레딧영상제안뒤 “다음 진행해”로승인했다. Klingv3.0pro무음8초16:9한개, job d96438cb-5844-4916-9e61-50594d0b1abb. 요청문구누락을사용자에게알렸으며실제제출은빈prompt, start/end이미지는정상이다. 준비prompt를적용했다고주장하지않는다. 생성결과를검수해사용, 추가유료생성없음. 웹실행시외부서비스요청·추가크레딧·실제주문·결제·개인정보수집없음.

## 미확인

실제휴대폰·Safari·OS설정·저속회선·FPS와사용자최종미적수용은미확인. 새독립finishreview와문서최종판정은각보고서범위를따른다. 구매후속화면은이번완료범위가아니다. Gitmaster/커밋없음/기존untracked프로젝트존재; commit,push,PR,merge,공개배포안함.
