disposition: fix
범위: 사용자 거절 뒤 교체한 H-02 제품 미디어의 새 FULL 검토. 정적 제품 재질·구성은 검토 가능하며, 전체 연속 카메라 목표의 완료 판정은 보류한다.
입력 경계: 승인 comp·QUALITY BAR 카드·실제 영상은 없다. 이 작업은 기존 정체성을 보존하는 사용자 선택 code-led 한정 교체이므로 새 comp·concept seed·comp-diff를 요구하지 않는다. H-03 하단·푸터·열린 메뉴의 새 전체 캡처는 없으며 해당 영역은 소스와 mobile-product의 보이는 범위만 검토했다.

## persistence

- PASS — PRODUCT.md가 있고 제품 사실과 원래 FR-01/FR-07 요구를 보존한다. DESIGN.md는 새 raster 미디어, 현재 still 모드, 비용 승인 대기와 실제 영상 검증의 경계를 기록한다. ASSETS.md와 두 WebP JSON에 원본·정확한 생성 문구가 있다. 부모의 자산 검사 결과는 3 rasters / 0 missing이며 별도 detector는 실행하지 않았다.
- PASS — 필수 현재 캡처 desktop-still, mobile-still, tablet-still, narrow-still, landscape-still, user-current, fallback-desktop/mobile, reduced-desktop/mobile, mobile-product를 모두 열었다. 첫 화면 캡처는 헤더와 문서 상단이 보이고 검은/빈 영역이 없다. mobile-product는 주장한 제품 앵커 상태를 보여준다. CSS·JS·전경 변경 시각보다 캡처가 뒤이며 이전 rejected-user/mobile과 구분된다.
- PASS — 검토 도중 보였던 PRODUCT.md §10의 ‘전체 스크롤 히어로’ 완료 문장과 DESIGN.md의 desktop/tablet 재촬영 임시 문장은 부모·documenter가 갱신했다. 다시 읽은 PRODUCT는 새 정지 컷·14크레딧 별도 승인·실제 영상 검증 대기를 명시하고, DESIGN은 유효한 최신 캡처의 viewport와 실제 콘텐츠 크기를 기록한다. 현재 소스의 영상 src/data-src 없음과 일치한다.
- 확인 경계 — main.js/index.html에는 현재 Three.js·유료 실행 경로가 없고 영상은 preload=none이다. 부모가 제공한 구문·motion-check PASS, 가로 overflow 0, 메뉴/앵커/CTA 검증 결과를 근거로 사용했으며 이 검토에서는 추가 실행하지 않았다.

## fidelity

| 요소 | 판정 | 근거 |
| --- | --- | --- |
| TYPE | match | Noto Sans KR의 한글 제목과 Instrument Sans의 로고·제품명, 깊은 청록과 두 줄 제목을 유지한다. 제목→제품명→설명→가격→행동의 단계가 구별된다. 사용자 확정 글꼴을 detector의 overused-font 경고로 교체할 근거는 없다. |
| MATERIAL | match, 정적 범위 | 새 전경에서 두꺼운 유리 테두리·내부 공동과 액체 경계·흰 원통 뚜껑·종이 라벨·수면 접촉과 반사가 분리돼 읽힌다. 이전의 희미한 플라스틱 병과 큰 독립 물방울은 사라졌다. 붙어 있는 작은 물방울이 병의 크기에 맞으며 광학 반사와 같은 조명에 놓인다. CSS로 물리 재질을 흉내 낸 요소가 없다. |
| GROUND | match | 흰색과 옅은 하늘빛 수면, 밝은 아침의 명암을 유지한다. 따뜻한 크림 UI나 과한 청록 수면으로 이동하지 않는다. 제품 라벨의 따뜻한 종이색은 제품 재질 안의 절제된 차이이며 UI 바탕 교체가 아니다. |
| PC 첫 구도 | match | desktop-still에서 왼쪽 메시지와 제품 사실, 오른쪽 큰 제품이 분리돼 읽힌다. 제품 글자와 CTA가 유리병·뚜껑을 가리지 않으며 이미지가 배경의 실제 주재료로 보인다. |
| 세로 모바일·태블릿 | acceptable adaptation | 최신 brief의 승인 대기 still 일반 흐름: 제목→같은 전경 크롭→제품 정보 순서. 390/320에서 병·뚜껑·기본 접촉부가 읽히고 헤더 행동이 유지된다. 768은 같은 마스터의 더 넓은 수면을 보여주며 제품이 오른쪽으로 남지만 형태와 읽기 순서를 잃지 않는다. |
| 작은 가로 화면·현재 사용자 크기 | acceptable adaptation | 844×390과 1280×720의 제품/CTA 일부가 첫 viewport 아래에 이어지나 static-scene은 의도된 일반 문서 흐름이다. 캡처 아래 경계만으로 잘림 결함이나 재촬영 실패로 판정하지 않는다. |
| 제품 정보·행동·데모 진실 | match | FIRST LIGHT / 첫빛 / 비누향 / 50mL / 69,000원과 가상 제품 안내가 유지된다. HTML 글자와 실제 #scent 링크다. mobile-product에서 제품 패널이 64px 헤더 아래 약 84px부터 읽히고 CTA 뒤 향 소개가 이어진다. 성분·효능·후기·실제 판매 주장을 더하지 않았다. |
| 대체 상태 | match, fixture 범위 | fallback-desktop은 이미지·정보·CTA와 실패 안내를 함께 유지한다. 모바일 안내는 정보 뒤 일반 흐름에 놓인다. reduced 캡처는 정적 흐름을 유지하고 소스는 초기 reduced 상태에서 영상 요청을 막는다. 강제 fixture 결과를 실제 OS·장치 검증으로 확대하지 않는다. |
| 매크로 기준 컷 | match, 제작 자료 범위 | campaign과 같은 유리·흰 뚜껑·아침빛의 작은 표면 물방울을 확대한다. 현재 사이트는 이 컷을 요청하지 않으므로 두 장의 전환이나 공간 연출 완료의 증거가 아니다. |
| signature motion / STORY / FORM | missing | src/data-src 없는 현재 still 화면에는 작은 물방울 접사→같은 병 전체 공개→제품 안내의 8초 연속 카메라와 스크롤 정·역방향 탐색 결과가 없다. 준비된 시간 계산과 단위 검사로 실재하는 영상·움직임을 대신할 수 없다. |
| H-03·메뉴·임시 푸터 | match, 근거 제한 | 실제 소스는 기존 짧은 향 설명·비누 이미지·복귀 링크·가상 시안 안내·44px 조작면·native dialog를 보존한다. mobile-product의 보이는 H-03 부분은 그 읽기 순서와 맞는다. 새 전체 하단/열린 메뉴의 시각 합격을 별도로 선언하지 않는다. |

부모의 한 번 실행한 detector에 남은 폰트 parser·fullbleed padding·기존 작은 type/radius·mask #000 advisories는 렌더에서 새로운 전역 시스템 결함으로 확인되지 않았다. 제공 화면에 kicker·가짜 유기적 벡터·glyph 아이콘·gradient text·hard offset shadow·중첩 카드가 없다.

## ceiling

정적 제품 미디어의 craft ceiling은 이번 범위에서 reached. 같은 장면 안의 광학 유리·매트 뚜껑·종이·물방울·수면 반사와 넓은 밝은 여백이 재질 깊이를 만든다. 기존 구조·확정 서체를 바꾸거나 장식 밀도를 높이는 추가 수정은 요구하지 않는다. 전체 signature ceiling은 미도달: 연속 카메라의 실재·공간 연결·라벨 안정성·모바일 대응·정/역방향 탐색과 디코딩 성능이 남는다. 별도 QUALITY BAR 카드가 없으므로 카드 수준의 비교 합격은 주장하지 않는다.

## material_fixes

1. FR-01/FR-07·STORY·FORM의 missing signature를 해결할 때는 별도 비용 결정 뒤 produce: 동일 병의 작은 물방울 매크로에서 전체 제품까지 이어지는 무음 8초 연속 카메라 영상; Kling v3.0 pro·16:9·1개·14크레딧 승인은 현재 없으므로 유료 실행을 보류하고, 결과의 PC/모바일 같은 진행률·연속성·역탐색을 실제 파일로 검토한다. 두 사진 전환은 완료로 인정하지 않는다.

현재 정적 이미지·레이아웃에 대해 요구하는 시각 수정은 없다. 비용 승인이 없는 영상은 실행할 수 없는 별도 미완료 요구이며, 이 항목 때문에 전체 disposition은 fix다.

## keep

새 전경의 실제 제품처럼 읽히는 유리·작은 부착 물방울·수면 접촉, 흰색/옅은 하늘빛과 청록, 확정 두 서체·문구·50mL/69,000원, 정적 읽기/복구 경로와 별도 비용 승인 경계를 유지한다.

