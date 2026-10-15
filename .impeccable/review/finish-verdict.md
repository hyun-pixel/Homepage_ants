## verdict

1. 기존 수정 1 — resolved. main.js의 syncProductAnchor가 정적 상태에서 first-light ID를 실제 product-copy로 옮기고, 일반 3D 상태에서는 기존 스크롤 대상으로 복원한다. reduced-mobile-product.png와 fallback-mobile-product.png 모두 헤더 아래에서 FIRST LIGHT·50mL·69,000원·CTA·데모 안내를 읽을 수 있다. 소스는 정적 제품 패널의 inert를 해제하며, 제공된 완료 위치 측정은 productTop83.94px/buttonBottom263.13px이다. 두 캡처는 각각 모션 감소 강제 상태의 헤더 클릭과 WebGL 실패 강제 상태의 직접 해시 접근을 보여준다. 실제 OS 설정·지원하지 않는 하드웨어 검증으로 확대해 해석하지 않는다.

수정 배치가 도입한 회귀: 확인된 항목 없음. 기존 수정 2·3은 앞선 검토에서 해결됐으며 재검토하지 않았다.

## remaining

clear — 이번 판정은 남아 있던 기존 수정 1의 해결 여부에만 해당한다.

disposition: ship
