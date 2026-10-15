# ants motion refinement — fresh finish review

disposition: **fix**

Review date: 2026-10-14. Scope: the requested perfume/water motion and material refinement in the existing H-01/H-02/H-03 first prototype. This is a fresh full review of the current `20261014b` evidence; the user's rejection supersedes the previous ship at this scope. No browser was used and no source was edited by this reviewer.

## persistence

- Read PRODUCT.md, DESIGN.md, the 2026-10-14 direction contract in `work/ants-home-brief.md`, the craft floor, and the current HTML/CSS/scene/motion sources.
- Preserve the approved fictional FIRST LIGHT / 첫빛 fragrance, clean soap scent, 50mL, 69,000원, blue-white morning, transparent rounded rectangular bottle, white cylinder cap, ants lettering, Noto Sans KR / Instrument Sans, current navigation and explicit prototype/static states.
- Current source uses the requested replacement choreography. DESIGN.md's older motion description is pre-existing drift awaiting the documenter stage; it must describe the final choreography and distinguish 3D material parameters from interface palette tokens before completion.
- No new product claims, commerce, paid services, personal data, deployment, or Git operation belongs to this refinement.

## fidelity

All nine required current captures were opened and found usable: desktop initial/settle/reveal/product, mobile initial/settle/reveal/product, and the actual-user-width initial view. The final initial captures contain their headings and the loaded scene. Their stored content pixels are 1430×993, 380×822, and 2079×1401 respectively, preserving the requested viewport aspect ratios. There is no approved comp or QUALITY BAR image; the source contact sheets and written direction are the craft references.

The contact sheets show a connected environment, a product grounded in it, and viewpoint change. The new build translates those properties into the approved pale morning rather than importing the reference's pink shell/ocean identity. The bottle stays still, the bead settles into a shared reflective plane, the two ripples surround that plane, and the eventual product state remains legible. The previous separate upper-left departure and cropped shelf are gone.

Source corroborates a single cubic Bezier camera with a global smooth parameter, fixed bottle yaw, a droplet bottom held at water height −1.10, spread/fade at .16–.49, and ripple dissipation by .82. Ordinary portrait uses the same scene/progress with camera fit, not raster swaps. Time-based response and rendering that stops at rest/offscreen bound the effect. Screenshots support spatial continuity but do not themselves prove temporal smoothness or phone frame rate; the supplied unit/browser results support the former, and actual-device performance remains unmeasured.

One compositing failure remains material: the mobile water ends in a visible straight blue edge. That edge makes the otherwise coherent 3D world read as an inserted rectangular picture, directly undermining the user's request for natural integration. In the final mobile frame it also meets the FIRST LIGHT heading instead of handing the page back to the product copy cleanly.

## ceiling

The author completed the two bounded visual passes. Do not reopen a general polish hunt. Apply only M1/M2 in one batch, preserve the underlying choreography and product model, rebuild once, overwrite the same required captures, and send the listed fixes back to this reviewer for a verdict pass. No second detector is warranted.

The supplied detector's font and inset flags conflict with the approved world or actual CSS and do not justify a redesign. Its existing small-supporting-text advisories are outside this narrow correction. New glass/liquid/ripple colors should be documented as material settings; they do not require forcing physical materials into the interface action palette.

## material_fixes

| ID | Finding and evidence | Required correction | Acceptance for the verdict pass |
| --- | --- | --- | --- |
| M1 | Every current portrait phase shows the water/reflection terminating at the canvas bottom as a hard horizontal blue line (`mobile.png`, `mobile-settle.png`, `mobile-reveal.png`, `mobile-product.png`). This recreates a rectangular boundary after removal of the shelf. | Blend the lower reflection/water region into the same hero background with a restrained bottom feather or equivalent compositor treatment. Begin the blend below the product's real ground contact so the bottle silhouette and label stay crisp. Preserve the existing scene and reflection. | At the same four portrait progress values there is no visible straight canvas edge or clipped reflection boundary; the bottle stays grounded and its label/shape are preserved. Desktop and actual-user-width views remain intact. |
| M2 | In `mobile-product.png`, FIRST LIGHT starts against/across that canvas edge. Supplied layout measurements place scene bottom near 608px and title top near 600.5px, about 7.5px of rectangle overlap. The transition from object to information feels cramped. | Reserve a clear portrait inset between the rendered scene and the final product heading using the actual product-copy height. Aim for at least 20px of clear separation, while keeping the facts, action, demo caption, and bottom progress control fully visible. Coordinate this with M1; do not shrink the text or remove content. | In the final portrait capture, the scene area ends at least 20px before the heading begins, with an uninterrupted background between them and no clipping/overlap of product facts, action, or demo caption. The same scene phase and readable bottle framing remain. |

These are local compositor/layout fixes, not a rebuild. A mask that erases the bottle or a smaller font that merely hides the collision would not resolve them.

## keep

- Keep the continuous stationary-product camera arc, grounded settling bead, restrained shared-plane ripples, and reversal model.
- Keep the readable untone-mapped label and calmer glass/liquid materials. The rendered ants label now has useful contrast, and the full product name is carried by the page copy.
- Keep the airy desktop hierarchy, Korean heading, large final product identity, facts/action, working anchor/menu behavior, and explicit reduced-motion/WebGL alternatives.
- Keep the pale blue-white morning and existing fonts. The reference supplies coherence and motion discipline, not a replacement brand palette.
- Keep rendering bounds and report the actual-phone/frame-rate limitation without presenting browser portrait captures as physical-phone testing.

This **fix** disposition covers the current motion/material refinement only. It is not approval of later product/cart/order functionality. Documentation must follow the resolved verdict.
