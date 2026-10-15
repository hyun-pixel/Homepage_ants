# ants

깨끗한 일상 향을 주제로 만든 향수 브랜드 홈페이지 데모입니다. 홈의 스크롤 영상, 향수 6종, 검색·분류·정렬, 취향 질문, 제품 상세, 장바구니와 모의 주문을 제공합니다. 실제 결제·배송·주문 접수나 개인정보 입력은 없습니다.

## 로컬에서 보기

저장소 폴더에서 Python을 실행합니다.

```sh
python -m http.server 62517 --bind 127.0.0.1 --directory site
```

브라우저에서 [홈페이지](http://127.0.0.1:62517/)를 엽니다. 화면은 HTML·CSS·JavaScript 모듈로 구성되어 별도 패키지 설치나 API 키가 필요하지 않습니다. 포트가 이미 사용 중이면 실행 중인 미리보기를 이용하거나 다른 포트 번호를 선택합니다.

## 폴더

- `site/`: 홈페이지 실행 파일과 이미지·영상·글꼴. 호스팅 시 사용할 문서 루트입니다.
- `scripts/build-catalog.py`: 공통 헤더·푸터, 목록·상세·주문·향 찾기 화면의 정적 생성 원본입니다.
- `checks/`: Node.js 기본 기능으로 실행하는 검증과 브라우저 검수용 화면입니다.
- `PRODUCT.md`, `DESIGN.md`, `DECISIONS.md`: 기획, 디자인 명세와 결정·검수 기록입니다.
- `ASSETS.md`, 이미지·영상 옆 `.json`: 생성 자료의 출처와 실제 제출 문구·규격 기록입니다.
- `REVIEW.html`, `WIREFRAMES.html`, `.impeccable/`: 검토 문서, 설계도와 단계별 화면 근거입니다.

생성 이미지의 고해상도 원본과 과거 제작 도구 자료는 별도 로컬 작업 폴더에 보관돼 있습니다. 이 저장소에는 홈페이지에 사용하는 미디어와 출처 JSON이 포함됩니다. 문서의 상위 `work/` 및 절대 경로는 당시 로컬 제작 이력입니다.

## Vercel에 배포하기

저장소 최상위의 `vercel.json`이 공개할 폴더를 `site`로 지정합니다. 이미 만들어진 HTML·CSS·JavaScript를 그대로 제공하므로 별도 빌드 명령, 패키지 설치, 환경변수가 필요하지 않습니다.

Vercel 프로젝트의 **Settings → Build and Deployment**에서 다음 기준을 사용합니다.

| 항목 | 값 |
| --- | --- |
| Root Directory | 저장소 최상위 `./` (별도 하위 폴더 지정 없음) |
| Framework Preset | Other |
| Build Command | 비워 둠 |
| Output Directory | `site` |

Framework Preset·Build Command·Output Directory는 `vercel.json`에도 기록되어 있습니다. Root Directory를 `site`로 바꾸면 최상위 설정 파일을 읽지 못하므로, 위 기준에서는 저장소 최상위를 유지합니다. 해당 설정 파일이 포함된 커밋으로 새로 배포해야 적용됩니다. Git 연동의 배포 브랜치는 현재 코드가 올라간 `codex/ants-homepage`인지 확인합니다.

첫 화면은 `/`, 상품 상세는 `/product/first-light/`처럼 접속합니다. 주소에 `/site`를 붙이는 방식은 이미지·스타일·메뉴 경로가 맞지 않으므로 사용하지 않습니다. `site` 폴더만 공개하므로 기획 문서와 검수 화면은 배포 대상에 포함되지 않습니다.

이 설정은 유료 기능이나 개인정보 수집 기능을 추가하지 않습니다. 배포·전송량은 연결된 Vercel 계정의 기존 요금제 및 사용 한도를 따릅니다.

## 수정과 검증

상품 정보는 `site/catalog.mjs`에 있습니다. 공통 생성 원본을 수정한 뒤 다음 명령으로 화면을 갱신합니다.

```sh
python scripts/build-catalog.py
node checks/detail-check.mjs
node checks/finder-check.mjs
node checks/cart-check.mjs
node checks/motion-check.mjs
```

생성기는 기존 홈의 영상 구간과 FIRST LIGHT의 생활·재질 구간을 보존합니다. 한글 문구를 새로 추가하면 제공한 부분 글꼴에 해당 글자가 있는지 확인해야 합니다.

## 현재 검수 범위

12개 화면을 PC·모바일 크기에서 확인했고, 320·390·820·1440·2088px의 대표 화면 및 메뉴·검색·추천·사진 확대·수량/합계·모의 주문을 검수했습니다. 실제 휴대폰, Safari, 보조기기, 느린 회선/FPS와 운영 판매는 별도 검수가 필요합니다.

현재는 정적 데모이며 Vercel의 정적 파일 배포 설정을 포함합니다. 실제 결제·회원·운영 주문 서비스는 포함하지 않습니다. 이미지·영상은 가상 제품을 위한 제작물이고, 사실로 확인된 성분·효능·후기나 실제 판매 가격의 근거로 사용할 수 없습니다.
