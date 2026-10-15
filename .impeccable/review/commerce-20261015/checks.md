# 전체 로컬 데모 검수 · 2026-10-15

범위: 사용자 ‘좋아. 다음’ → 승인 명세 H04~O02와 공통 메뉴·상품 이동·장바구니. 기존 연속 영상은 유지. 모의 주문만 구현, 실제 판매·개인정보·외부 주문·결제·공개 배포 없음.

## 수정·생성한 파일

- 기존 변경: site/index.html(홈 전체·공통 이동), site/main.js(메뉴만 공통 파일로 분리, 영상 유지).
- 신규 공통 구현: site/commerce.css, site/shop.mjs, site/cart.mjs.
- 신규 화면: site/product/first-light/index.html, site/cart/index.html, site/checkout/index.html, site/complete/index.html.
- 신규 자료: site/assets/images/first-light-ritual.webp와 인접 JSON. 원본·정확한 prompt는 상위 work/ants-dependencies에 보존.
- 문서: PRODUCT.md, DESIGN.md, .impeccable/design.json, DECISIONS.md, ASSETS.md, REVIEW.html. 기존 WIREFRAMES.html의 전체 구조는 유지한다.
- 검사: checks/cart-check.mjs, checks/storage-preview.py, 갱신된 reduced.html/fallback.html, 이 검수 폴더의 이미지·수치·독립 검토 기록. 상위 work의 제작·검수 보조 파일은 제품 런타임에서 실행하지 않는다.

## 실행한 검사

- Node 구문 main.js/shop.mjs PASS. checks/cart-check.mjs PASS: 1~9 정수/비정상 값, 단가·2개138,000원·9개621,000원, 누적상한, 삭제, 새로고침 저장, 손상/차단 저장, 결과 검증. 의도한 저장 예외의 console.warn 두 개는 검사 입력이다.
- checks/motion-check.mjs PASS: 기존 영상 범위·정역방향 시간·읽기 hold·문구 상태. 영상 본체와 시간 매핑은 변경하지 않았다.
- commerce-source-check.py PASS: 다섯 실제 HTML 주소, 로컬 링크·자원 존재, 중복ID 없음, 완료의 상호배타 h1 분기, 개인정보 입력 없음.
- 실제 브라우저: PC/모바일 상품→2개 담기→장바구니→주문 확인→완료138,000원·실제결제0원·장바구니0. 재방문·새로고침2개 유지. 잘못된 수량0/10 인접 오류와 행동 차단. 9개 담기 후 재담기는 차단. 삭제 후 빈 상태와 포커스 이동 확인.
- 키보드: 상품 담기 Enter, 모바일 메뉴 열기·Esc 닫기·메뉴 버튼 포커스 복귀 관찰. 전체 스크린리더 검수·모든 조작의 키보드 순회는 미확인.
- 브라우저 저장 둘 다 차단하는 별도 localhost QA 서버(checks/storage-preview.py): 직접 완료 빈 상태→상품1개→장바구니1개→확인→완료69,000원/실제0원. 현재 탭 이동 기록 fallback이 작동하고 저장 차단 안내를 표시한다. 완료 주소나 fragment만으로 결과를 만들지 않는다.
- viewport-matrix.json: 320·375·390·430·768·820·960·1024·1440×5개 화면 =45개 관찰, 의도하지 않은 가로 넘침 없음. 이 순회는 빈 장바구니/직전 완료 상태이며 모든 너비에서 모든 UI 상태를 시험했다는 뜻은 아니다. 320px에서는 담긴 장바구니도 별도로 캡처했다.
- landscape-matrix.json: 844×390×5개 화면, 가로 넘침 없음. 실제 사용자 2089×1408 상품 화면도 캡처했다. 캡처 픽셀 경계는 CSS viewport와 소폭 다를 수 있다.
- 재생/정적 경로: 정상 홈 첫 화면의 준비 완료·공통 상품 링크. 최신 소스로 만든 reduced/fallback fixture에서 초기 reduced의 영상 src 없음과 여전히 작동하는 상품 상세 CTA, 의도한404 실패 안내→상품 상세 이동 확인. 실제 OS preference를 변경하지 않았다.
- 신규 image_gen 생활 사진1장, WebP101,054B/원본 보존/정확한 prompt와참조 기록. 출처 검사4개/누락0개. 추가 유료 영상·Higgsfield 크레딧 사용 없음.
- 단색 UI 소스 색 조합 계산 contrast.json PASS: 본문11.13, 보조5.69/5.45, 오류5.83, 성공6.65, 포커스6.24, 버튼7.90, 토스트11.70, 조작 경계3.62:1. 일반 글자4.5와 조작 경계3 기준이며 영상 매 프레임 측정으로 확대하지 않는다.
- 캡처 유효성 확인 중 모바일 완료의 이전 스크롤 위치와 고정 버튼의 갱신 전 픽셀이 섞인 파일은 실제 표시를 다시 확인해 교체했다. narrow-cart는 실제 첫 viewport 310×717 영역만 보존한다. 전체 페이지 캡처의 viewport 밖 미도색 영역을 검수 근거로 쓰지 않는다.

## 수정과 증거 해석

첫 PC/모바일 점검에서 완료 축소 사진이 세로로 잘림을 발견했다. 정사각형·자동 높이로 수정하고 같은 완료 화면을 다시 캡처했다. 자동 detector는 변경 대상을 한 번만 검사했다. 도구 출력은 전송 상한으로 일부 잘렸으므로 완전한 원시 finding 목록을 저장했다고 주장하지 않는다. 관찰한 신규 비정규17/21/23/27px·7px모서리·새상태색·유색 toast 그림자는 기존 글자단계/8px/기존 제안상태색/중립 그림자로 정리했다. detector를 반복 실행하지 않았다.

기존 전면 히어로의 inset 경고와 Noto Sans KR 파서가 ‘sans kr’로 보고한 경고, 확정 Instrument Sans 경고는 기존 의도다. toast의 떠 있는 상태에 쓴 아래 방향의 중립 그림자는 장식 광채가 아니다. 남은 수치는 실제 기존 시스템·일상/구매 역할에 연결해 documenter가 기록한다.

홈 full-page는 sticky 영상의 전체 스크롤 길이를 한 정지 시각으로 펼친 구조 증거다. 긴 영상 scroll spacer가 빈 바탕으로 보이는 것은 full-page 캡처의 특징이며 실제 첫 화면은 별도 opening 캡처를 따른다. 모바일 상품 full-page의 중간에 남은 고정 바는 캡처 시점 viewport의 위치이며, inline 버튼이 보이는 실제 viewport에서는 observer가 고정 바를 숨긴다. 별도 선택 영역 캡처와 source를 함께 본다.

## 한계와 운영

독립 검토 첫 결과는 구현 판정 전에 **recapture**였다. mobile-cart의 native fullPage가 버튼 중간 이후를 미도색한 것이 원인이다. 현재 mobile-cart.png는 실제 390×844 viewport 상단/하단 두 장을 관찰된 스크롤 0/494와 일치하는 겹침으로 연결한 전체 화면 증거다. 원본 두 장과 mobile-cart-capture.json을 함께 보존한다. 가상의 픽셀·글자·구성은 만들지 않았으며 단일 native fullPage라고 표시하지 않는다. 수정된 증거로 전체 독립 검토를 다시 요청했다.

전체 재검토 결과는 **ship**다. 필수29개와 장바구니 원본2개, 지정된 현행 소스·기록을 대조했으며 이번 H04~O02·공통 구매 UI 범위에 남은 필수 수정은 없다. 세부 제한은 finish-review.md를 따른다. 최초 recapture는 finish-review-recapture.md에 이력으로 보존한다. 임시 저장 차단 QA 서버는 검수 후 종료했고 기본 미리보기 서버는 유지한다.

실제 휴대폰·Safari·OS 움직임 설정·저속 회선·FPS·정량 CLS·모든 프레임 대비·스크린리더·200% 글자 확대는 확인하지 않았다. 저장 fallback은 같은 탭의 연결된 내부 이동에서만 보존하며 새 탭·전체 기록 삭제까지 보장하지 않는다. 새 완료 세션은 빈 상태, 같은 세션의 완료 결과는 새로고침으로 유지한다. 데모가 아닌 실제 운영 결제의 보안/원장/동시성은 이번 요구가 아니다.

Git: 상위 master/no commits. 기존 전체 프로젝트가 untracked인 상태를 유지. commit/push/PR/merge/public deploy 없음. 다른 프로젝트 변경 없음. 독립 시각 검토 결과는 finish-review.md를 따른다.
