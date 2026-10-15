# 2026-10-14 제품 미디어 교체 검수

- 실제 현재 route 62517/#top은 data-scene=still. 추가 힉스필드 영상 비용 선택 대기, 아직 영상 없음. 정지 이미지 개선과 모션 전체 완료를 구분한다.
- 내장 생성 제품 전경 1672×941, 132684B; 작은 물방울 확대 1672×941, 111290B. 실제 페이지는 전경, 별도 비교 page는 두 이미지. 출처와 exact prompts 보존.
- 기존 procedural bottle/giant droplet 실행 코드는 교체. 이전 main/motion 원본과 사용 종료한 first-light.webp/morning-water.webp 및 sidecars는 상위 work/ants-dependencies에서 보존. 파일 이름 retired- 접두사 사용. 폰트와 라이선스 유지.
- JS 구문 검사와 checks/motion-check.mjs PASS. 검증: 진행 범위, 영상 탐색 시간 단조성, 읽기 홀드, 역방향 감소, 안전한 잘못된 duration, intro와 product 문구의 비중첩. 실제 영상 품질/스크롤 디코딩 성능은 아직 미검증.
- 최종 캡처는 PC 1440×1000, 모바일 390×844, 태블릿 768×1024, 좁은 화면 320×740, 가로 844×390, 사용자 기본 화면 1280×720에서 scrollY=0 확인 후 저장했다. 앞서 잘못된 scroll 위치의 임시 캡처는 올바른 화면으로 덮어썼다. 모두 가로 넘침 없음. 실제 PNG 크기는 스크롤바·표시영역 차이 때문에 각각1430×993,380×822,758×1011,310×717,834×385,1270×714이다.
- 모바일 메뉴 열기/제품 링크 선택/닫기: 확인. #first-light 이동 후 product top=84.19px로 64px 고정 헤더 아래에 표시. CTA 향 소개 이동 확인.
- 디자인 검사 1회 실행. 남은 경고: fullbleed hero padding 정적 탐지(실제 copy padding 별도), 기존 Noto Sans KR parser의 sans kr 이름 오탐, 사용자 확정 Instrument Sans 선호에 대한 overused-font, 기존 작은 글자22/12/11/23px·radius8/12·mask용 black 등의 문서 범위 advisory. 전역 시스템 변경을 요구하지 않는다. 검사 다시 실행하지 않음.
- 새 1280×720 정지 화면의 DOM 글자 위치를 이미지 cover 원근 없이 원본 픽셀에 대응시킨 실제 배경 최소 대비: 큰 제목9.77:1, 본문10.46:1, 제품 제목7.49:1, 설명7.11:1, 용량9.41:1, 가격8.86:1. 보조 문구는 글자가 없는 paragraph 전체 폭이 아니라 실제 Range 영역으로6.80:1, 기본 CTA 흰 글자7.90:1. 영상 매 프레임의 대비까지 확인했다고 주장하지 않는다.
- 새 FULL 독립 검토 전체 판정 fix. 현재 정적 재질·구도·가독성·대체 상태의 ceiling reached, 추가 시각 수정 요구 없음. 미완료 항목은 별도 비용 승인 후 실제 연속 영상 제작과 스크롤/역방향/PC·모바일 대응 검수. 보고서 finish-review.md에 저장.
- 테스트 fixture reduced는 강제 reduce 설정, fallback은 의도적인 로컬 mp4 없음. PC·모바일 모두 정지 이미지와 제품 CTA를 유지했다. reduced의 video src=null, 오류 상태 fallback에서는 이미지+안내 문구 표시를 확인했다. 실제 OS 설정이나 실제 장치 검사는 아니다.
- 실제 폰/Safari, 저속 회선, FPS, 영상의 실재/연속 카메라 움직임 미검증. 외부 업로드·유료 생성·commit/push/PR/merge/공개 배포 없음. master, 커밋 없음, 이전부터 여러 untracked 프로젝트 존재.
