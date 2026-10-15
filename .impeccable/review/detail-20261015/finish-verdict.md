## verdict

- M1 — resolved. The seven correction captures at their original paths are valid. `user-fit.jpg`, `desktop-fit.jpg`, `desktop-original.jpg` and `mobile-fit.jpg` visibly retain the teal viewer focus outline; `image-error.jpg` visibly focuses retry. `focus-corrections.json` records visible, focus-visible first/last targets for both directions in desktop fit/original/error, plus mobile forward cycling. Current `product-detail.mjs` derives visible enabled targets on every Tab and explicitly wraps both boundaries. No body landing remains in the supplied correction observations.
- M2 — resolved. `image-recovered.jpg` now visibly focuses the persistent viewer while showing the recovered photograph and enabled size control. Source moves focus to that viewer before loading hides retry; the correction records confirm it remains visible and focus-visible immediately after Enter and after actual 404→1120px success. The same persistent element remains through another failure in source; repeated network failure was not separately exercised, as the documentation states.
- M3 — resolved. Current DESIGN.md D-01 records the native photo link, always-visible hint and reused two-row summary; D-04 records fit/original/error/retry, focus cycling/return, fallback and responsive rules. Its local layout/type additions and `.impeccable/design.json` `extensions.productDetail` persist the same contract and bounded evidence. Font coverage now records 89,048 bytes and all HTML/all MJS coverage. The original fix review, prior asset/cost history and unverified real-device/browser/assistive-technology limits remain explicit; no prior approval is promoted to this feature's approval.

## remaining

clear. No regression from this correction batch is visible in the seven recaptures or the inspected changes. ship covers the scored fixes, not the whole surface.

disposition: ship
