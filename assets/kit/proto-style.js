/* prototype-tredence kit styles: Fluent 2 product shells + Tredence 2026 frame.
   Shipped as JS because Copilot Cowork skills can't contain .css files.  Load it in <head>:
   <script src="kit/proto-style.js"></script>.  Don't edit per prototype; use a <style> block in prototype.html. */
(function () {
  var s = document.createElement("style"); s.id = "proto-style";
  s.textContent = String.raw`/* prototype-tredence kit: Fluent 2 product shells + Tredence 2026 frame.
   Stage is 1920 x 1080 CSS px, scaled to fit the window by proto.js.  Don't edit this file per prototype;
   put prototype-specific styles in a <style> block in prototype.html. */

@font-face{font-family:"Segoe Sans Display";src:local("Segoe Sans Display");font-weight:400}
@font-face{font-family:"Segoe Sans Display Semibold";src:local("Segoe Sans Display Semibold");font-weight:400}

/* Poppins, the only Tredence typeface, ships in kit/fonts (SIL OFL) and is inlined by pack_prototype.py */
@font-face{font-family:"Poppins";src:local("Poppins Regular"),local("Poppins-Regular"),url(kit/fonts/Poppins-Regular.ttf) format("truetype");font-weight:400;font-display:block}
@font-face{font-family:"Poppins";src:local("Poppins Medium"),local("Poppins-Medium"),url(kit/fonts/Poppins-Medium.ttf) format("truetype");font-weight:500;font-display:block}
@font-face{font-family:"Poppins";src:local("Poppins SemiBold"),local("Poppins-SemiBold"),url(kit/fonts/Poppins-SemiBold.ttf) format("truetype");font-weight:600;font-display:block}
@font-face{font-family:"Poppins";src:local("Poppins Bold"),local("Poppins-Bold"),url(kit/fonts/Poppins-Bold.ttf) format("truetype");font-weight:700;font-display:block}
@font-face{font-family:"Poppins";src:local("Poppins ExtraBold"),local("Poppins-ExtraBold"),url(kit/fonts/Poppins-ExtraBold.ttf) format("truetype");font-weight:800;font-display:block}

:root{
  /* Fluent 2 web light tokens */
  --font:"Segoe UI Variable Text","Segoe UI","Segoe UI Web (West European)",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif;
  --font-mono:Consolas,"Cascadia Mono","Courier New",monospace;
  --bg1:#ffffff;--bg2:#fafafa;--bg3:#f5f5f5;--bg4:#f0f0f0;--bg5:#ebebeb;--bg6:#e6e6e6;
  --fg1:#242424;--fg2:#424242;--fg3:#616161;--fg4:#707070;--fg-disabled:#bdbdbd;
  --stroke1:#d1d1d1;--stroke2:#e0e0e0;--stroke3:#f0f0f0;
  --brand:#0f6cbd;--brand-hover:#115ea3;--brand-pressed:#0c3b5e;--brand-bg2:#ebf3fc;--brand-fg2:#115ea3;--brand-stroke2:#b4d6fa;
  --success:#107c10;--success-fg:#0e700e;--success-bg:#f1faf1;--success-stroke:#9fd89f;
  --warning:#f7630c;--warning-fg:#bc4b09;--warning-bg:#fff9f5;--warning-stroke:#fdcfb4;
  --danger:#c50f1f;--danger-fg:#b10e1c;--danger-bg:#fdf3f4;--danger-stroke:#eeacb2;
  --r-sm:2px;--r-md:4px;--r-lg:6px;--r-xl:8px;--r-2xl:12px;
  --sh2:0 0 2px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.14);
  --sh4:0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.14);
  --sh8:0 0 2px rgba(0,0,0,.12),0 4px 8px rgba(0,0,0,.14);
  --sh16:0 0 2px rgba(0,0,0,.12),0 8px 16px rgba(0,0,0,.14);
  --sh28:0 0 8px rgba(0,0,0,.12),0 14px 28px rgba(0,0,0,.14);
  --sh64:0 0 8px rgba(0,0,0,.12),0 32px 64px rgba(0,0,0,.14);
  /* App accents: use only inside the matching shell */
  --outlook:#0f6cbd;--teams:#5b5fc7;--teams-bg:#ebebeb;--teams-hover:#e8ebfa;--d365:#0f6cbd;
  /* Data colours for figures outside Power BI: the Office theme's accents (Word, Excel, PowerPoint), a muted grey
     for comparison values and a dark grey for limit lines (references/look-and-feel.md, "Data colours"). */
  --office-1:#156082;--office-2:#e97132;--office-3:#196b24;--office-4:#0f9ed5;--office-5:#a02b93;--office-6:#4ea72e;
  --data-muted:#d9d9d9;--data-ref:#595959;
  /* Copilot's agent gradient: product scenes only. The Tredence frame is flat colour. */
  --cp-grad:linear-gradient(135deg,#38b9b6 0%,#1d90b2 45%,#8661c5 100%);
  --f-teal:#38b9b6;--f-deep:#28647c;--f-purple:#8661c5;--f-blue:#1d90b2;
  --f-display:"Segoe Sans Display","Segoe UI Variable Display","Segoe UI",system-ui,sans-serif;
  --f-semi:"Segoe Sans Display Semibold","Segoe UI Variable Display Semibold","Segoe UI Variable Display","Segoe UI",system-ui,sans-serif;
  /* Tredence 2026 palette (closed: nine colours plus two background tints) and type */
  --td-font:"Poppins",sans-serif;
  --td-orange:#fe5000;--td-teal:#6dcdb8;--td-green:#004e42;--td-deep-orange:#8a1f04;--td-hi-orange:#f48120;
  --td-charcoal:#404041;--td-grey:#929497;--td-off-white:#e6e7e8;--td-orange-tint:#ffede5;--td-teal-tint:#e2f5f1;
  /* Motion.  --ease-out (Fluent decelerate) for things appearing; --ease-glide (soft start, long settle) for things
     moving across the screen, so a long move never lurches.  proto.js reads these too; a prototype can retune them
     in its own :root. */
  --ease-out:cubic-bezier(.1,.9,.2,1);--ease-glide:cubic-bezier(.25,.1,.1,1);
  --t-enter:340ms;--t-glide:520ms;--t-exit:180ms;--t-scene:400ms;--t-late:100ms;--t-word:260ms;
}

/* ---------- Stage and engine ---------- */
*{box-sizing:border-box}
html,body{margin:0;height:100%;background:#141414;overflow:hidden}
body{font-family:var(--font);font-size:14px;line-height:20px;color:var(--fg1);-webkit-font-smoothing:antialiased}
.stage{position:absolute;left:50%;top:50%;width:1920px;height:1080px;transform-origin:0 0;background:var(--bg3);overflow:hidden}
.scene{position:absolute;inset:0;display:none;overflow:hidden}
.scene.on{display:block;z-index:2}
.scene.leaving{display:block;z-index:1;pointer-events:none}
/* Warm-up pass (proto.js): painted once, invisibly, so the first real visit doesn't hitch */
.scene.warming{display:block;z-index:3;opacity:.004;pointer-events:none}
.scene.warming *,.scene.warming *::before,.scene.warming *::after{animation:none!important;transition:none!important}
/* 125% zoom: product UI at the size a laptop shows it, readable from the back of a meeting room.  Default for product scenes. */
.scene.zoom{right:auto;bottom:auto;width:1536px;height:864px;transform:scale(1.25);transform-origin:0 0}
.notes{display:none}
button{font:inherit;color:inherit;border:0;background:none;padding:0;cursor:pointer}
[data-go]{cursor:pointer}

/* Beats: hidden until revealed by proto.js */
/* Pending beats take no space, like content a real app inserts. Add .keep to reserve the space instead. */
[data-beat]:not(.in):not(.keep){display:none!important}
[data-beat].in{animation:beat-up var(--t-enter) var(--ease-out) both}
[data-beat].fade.in{animation-name:beat-fade}
[data-beat].slide-r.in{animation-name:beat-right}
[data-beat].pop.in{animation-name:beat-pop}
/* Set by proto.js: .m-late waits for neighbours to start gliding; .m-hold keeps a data-morph target visible */
[data-beat].in.m-late{animation-delay:var(--t-late)}
[data-beat].in.m-hold{animation:none!important}
@keyframes beat-up{from{opacity:0;transform:translateY(8px)}}
@keyframes beat-fade{from{opacity:0}}
@keyframes beat-right{from{opacity:0;transform:translateX(24px)}}
@keyframes beat-pop{from{opacity:0;transform:scale(.96)}}
[data-beat].keep{opacity:0;pointer-events:none}
[data-beat].keep.in{opacity:1;pointer-events:auto}
.gone{display:none!important}
.proto-ghost{pointer-events:none}
.instant *,.instant *::before,.instant *::after{transition:none!important;animation-duration:0s!important;animation-delay:0s!important}

/* Streaming text: proto.js wraps each word (data-type="words") or character (data-type) in .tw, so the finished
   layout is reserved, then fades the units in.  A thin caret follows typed characters. */
.tw,.tw-box{opacity:0}
.tw.shown,.tw-box.shown{opacity:1;transition:opacity var(--t-word) linear}
[data-type]:not([data-type="words"]) .tw.shown{transition-duration:60ms}
.tw.cur{position:relative}
.typing:not([data-type="words"]) .tw.cur::after{content:"";position:absolute;right:-2px;top:.12em;bottom:.08em;width:2px;border-radius:1px;background:currentColor}
[data-count]{font-variant-numeric:tabular-nums}

/* Click cue: a calm Fluent focus-style ring on the next thing the presenter should click */
.cues [data-go].cue{position:relative}
.cues [data-go].cue::after{content:"";position:absolute;inset:-4px;border-radius:inherit;border:2px solid var(--brand);opacity:0;animation:cue 1.8s ease-in-out infinite;pointer-events:none}
@keyframes cue{0%,100%{opacity:0;transform:scale(1)}50%{opacity:.9;transform:scale(1.02)}}

/* Concept label: always on, added by proto.js */
.concept{position:absolute;left:12px;bottom:12px;z-index:900;display:flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;
  background:rgba(36,36,36,.78);color:#fff;font-size:12px;line-height:16px;font-weight:600;letter-spacing:.2px;pointer-events:none}
.concept svg{width:14px;height:14px;fill:#fff}
/* On Tredence frame scenes the label sits in the footer, between the copyright line and the scene number */
.scene-frame-on .concept{left:500px;bottom:13px;background:rgba(64,64,65,.92);font-family:var(--td-font);font-weight:500}
/* "Next" pill: added by proto.js when the demo waits for the presenter and nothing is cued.  Big enough to find at a
   glance from across a room; the arrow nudges gently so the eye goes to it. */
.proto-next{position:absolute;right:154px;bottom:20px;z-index:900;display:flex;align-items:center;gap:14px;max-width:680px;padding:10px 10px 10px 26px;border:0;border-radius:999px;
  background:rgba(36,36,36,.9);color:#fff;font:600 20px/28px var(--font);letter-spacing:.2px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.22),0 14px 32px rgba(0,0,0,.2);
  opacity:0;visibility:hidden;transform:translateX(12px);transition:opacity var(--t-enter) var(--ease-out),transform var(--t-enter) var(--ease-out),visibility 0s linear var(--t-enter)}
.proto-next span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.proto-next svg{width:22px;height:22px;padding:9px;box-sizing:content-box;border-radius:50%;background:#fff;fill:#242424;flex:none;animation:next-nudge 1.8s var(--ease-out) infinite}
@keyframes next-nudge{0%,55%,100%{transform:none}25%{transform:translateX(4px)}}
.proto-next:hover{background:rgba(20,20,20,.96)}
.cues .proto-next.show{opacity:1;visibility:visible;transform:none;transition-delay:0s}
.scene-frame-on .proto-next{bottom:52px}
/* Play / pause: the pill offers Play on the first scene and says when the demo is paused (shown even with cues off);
   the button sits at the left of the scene dots.  A cued control the demo presses by itself shows the press. */
.proto-next .pi-play{display:none}
.proto-next.play .pi-play{display:block;animation:none}
.proto-next.play .pi-next{display:none}
.proto-paused .proto-next.show{opacity:1;visibility:visible;transform:none;transition-delay:0s}
[data-go].pf-press{transform:scale(.96);filter:brightness(.92);transition:transform 120ms var(--ease-out),filter 120ms var(--ease-out)}

/* Back and next buttons: added by proto.js, always on, so nobody needs the keys.  Quiet until the pointer is near. */
.proto-nav{position:absolute;right:24px;bottom:20px;z-index:900;display:flex;gap:6px;padding:4px;border-radius:999px;
  background:rgba(36,36,36,.9);box-shadow:0 4px 12px rgba(0,0,0,.22),0 14px 32px rgba(0,0,0,.2);opacity:.72;transition:opacity var(--t-enter) var(--ease-out)}
.proto-nav:hover{opacity:1}
.proto-nav button{width:52px;height:52px;display:flex;align-items:center;justify-content:center;border-radius:50%;cursor:pointer}
.proto-nav button:hover{background:rgba(255,255,255,.16)}
.proto-nav button:last-child{background:#fff}
.proto-nav button:last-child:hover{background:#e6e6e6}
.proto-nav svg{width:24px;height:24px;fill:#fff}
.proto-nav button:last-child svg{fill:#242424}
.proto-nav button:disabled{opacity:.3;cursor:default;background:none}
.proto-nav button:last-child:disabled svg{fill:#fff}
.scene-frame-on .proto-nav{bottom:52px}

/* Presenter overlays (outside the stage) */
.proto-dots{position:fixed;left:50%;bottom:10px;transform:translateX(-50%);display:flex;gap:6px;padding:6px 10px;border-radius:999px;background:rgba(20,20,20,.7);opacity:0;transition:opacity .3s;z-index:1000}
.proto-dots.show{opacity:1}
.proto-paused .proto-dots{opacity:1}
.proto-pp{display:flex;align-items:center;justify-content:center;width:22px;height:22px;margin:-7px 6px -7px -6px;padding:0;border:0;border-radius:50%;background:rgba(255,255,255,.16);cursor:pointer}
.proto-pp svg{width:14px;height:14px;fill:#fff}
.proto-pp .pp-pause,.proto-playing .proto-pp .pp-play{display:none}
.proto-playing .proto-pp .pp-pause{display:block}
.proto-dots i{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.35);cursor:pointer}
.proto-dots i.on{background:#fff}
.proto-notes{position:fixed;left:24px;right:24px;bottom:40px;max-height:30vh;overflow:auto;z-index:1001;display:none;padding:16px 20px;border-radius:8px;background:rgba(20,20,20,.92);color:#fff;font:15px/22px var(--font);box-shadow:var(--sh28)}
.proto-notes.show{display:block}
.proto-notes .bn{margin:8px 0 0;color:#cfe9e8}
/* Driven by another tool (?driven): no presenter controls on screen.  The concept label stays. */
.proto-driven .proto-nav,.proto-driven .proto-next,.proto-driven .proto-dots,.proto-driven .proto-help,.proto-driven .proto-notes{display:none!important}
.proto-notes b{display:block;font-size:12px;letter-spacing:.6px;text-transform:uppercase;color:#9ad8d6;margin-bottom:4px}
.proto-help{position:fixed;top:16px;right:16px;z-index:1001;display:none;padding:14px 18px;border-radius:8px;background:rgba(20,20,20,.92);color:#fff;font:13px/22px var(--font)}
.proto-help.show{display:block}
.proto-help kbd{display:inline-block;min-width:22px;padding:0 6px;margin-right:6px;border-radius:4px;background:#3a3a3a;text-align:center;font:12px/20px var(--font)}

/* ---------- Primitives ---------- */
.ic{width:20px;height:20px;flex:none;fill:currentColor;vertical-align:middle}
.ic.s16{width:16px;height:16px}.ic.s24{width:24px;height:24px}.ic.s28{width:28px;height:28px}.ic.s32{width:32px;height:32px}.ic.s48{width:48px;height:48px}
.ic.grad path{fill:url(#proto-grad)}
.row{display:flex;align-items:center;gap:8px}.col{display:flex;flex-direction:column;gap:8px}
.grow{flex:1;min-width:0}.wrap{flex-wrap:wrap}.between{justify-content:space-between}
.muted{color:var(--fg3)}.subtle{color:var(--fg4)}.strong{font-weight:600}.mono{font-family:var(--font-mono)}
.ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.t-cap{font-size:12px;line-height:16px}.t-body{font-size:14px;line-height:20px}.t-body2{font-size:16px;line-height:22px}
.t-sub{font-size:20px;line-height:28px;font-weight:600}.t-title3{font-size:24px;line-height:32px;font-weight:600}
.t-title2{font-size:28px;line-height:36px;font-weight:600}.t-title1{font-size:32px;line-height:40px;font-weight:600}
.t-large{font-size:40px;line-height:52px;font-weight:600}
.divider{height:1px;background:var(--stroke2);flex:none}
.vdivider{width:1px;align-self:stretch;background:var(--stroke2)}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;padding:0 12px;border-radius:var(--r-md);font-size:14px;font-weight:600;
  background:var(--bg1);border:1px solid var(--stroke1);color:var(--fg1);white-space:nowrap}
.btn.primary{background:var(--brand);border-color:transparent;color:#fff}
.btn.subtle{background:transparent;border-color:transparent;font-weight:400}
.btn.icon{width:32px;padding:0}
.btn.sm{height:24px;padding:0 8px;font-size:12px}.btn.lg{height:40px;padding:0 16px;font-size:16px}
.btn.teams{background:var(--teams)}
.input{display:flex;align-items:center;gap:8px;height:32px;padding:0 10px;border-radius:var(--r-md);background:var(--bg1);border:1px solid var(--stroke1);border-bottom-color:#616161;color:var(--fg3)}
.search{display:flex;align-items:center;gap:8px;height:32px;padding:0 10px;border-radius:var(--r-md);background:var(--bg1);color:var(--fg3)}

.avatar{display:inline-flex;align-items:center;justify-content:center;flex:none;width:32px;height:32px;border-radius:50%;font-size:12px;font-weight:600;background:#cfe4fa;color:#0a3e6f;position:relative;user-select:none}
.avatar.xs{width:20px;height:20px;font-size:8px}.avatar.sm{width:24px;height:24px;font-size:10px}.avatar.md{width:40px;height:40px;font-size:15px}
.avatar.lg{width:56px;height:56px;font-size:20px}.avatar.xl{width:72px;height:72px;font-size:26px}
.avatar.org{border-radius:var(--r-lg)}
.avatar .pres{position:absolute;right:-1px;bottom:-1px;width:10px;height:10px;border-radius:50%;background:#6bb700;border:2px solid #fff}
.avatar .pres.away{background:#ffaa44}.avatar .pres.busy{background:#c50f1f}
.av-0{background:#cfe4fa;color:#0a3e6f}.av-1{background:#c2e8e6;color:#00666d}.av-2{background:#e6d9f6;color:#3b2470}
.av-3{background:#fdcfb4;color:#7a2e04}.av-4{background:#c9e4b4;color:#294903}.av-5{background:#f6d1d5;color:#6e0811}
.av-6{background:#d4dfef;color:#203f6b}.av-7{background:#fef0c3;color:#6d5700}.av-8{background:#f7d5ee;color:#6b0f5a}.av-9{background:#dcd6cf;color:#433d36}

.badge{display:inline-flex;align-items:center;gap:4px;height:20px;padding:0 8px;border-radius:999px;font-size:12px;font-weight:600;line-height:16px;white-space:nowrap;background:var(--bg4);color:var(--fg2)}
.badge.brand{background:var(--brand-bg2);color:var(--brand-fg2)}.badge.success{background:var(--success-bg);color:var(--success-fg);box-shadow:inset 0 0 0 1px var(--success-stroke)}
.badge.warning{background:var(--warning-bg);color:var(--warning-fg);box-shadow:inset 0 0 0 1px var(--warning-stroke)}.badge.danger{background:var(--danger-bg);color:var(--danger-fg);box-shadow:inset 0 0 0 1px var(--danger-stroke)}
.badge.solid{background:var(--brand);color:#fff}.badge.count{min-width:20px;justify-content:center;padding:0 6px;background:#c50f1f;color:#fff}
.tag{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 8px;border-radius:var(--r-md);background:var(--bg3);border:1px solid var(--stroke2);font-size:12px;color:var(--fg2);white-space:nowrap}

.card{background:var(--bg1);border-radius:var(--r-xl);box-shadow:var(--sh4);padding:16px}
.card.flat{box-shadow:none;border:1px solid var(--stroke2)}
.card.raised{box-shadow:var(--sh16)}
.card-head{display:flex;align-items:center;gap:12px;margin-bottom:12px}

.tabs{display:flex;gap:4px;height:44px;align-items:stretch}
.tabs > *{display:flex;align-items:center;gap:6px;padding:0 10px;color:var(--fg2);position:relative;font-size:14px}
.tabs > .on{color:var(--fg1);font-weight:600}
.tabs > .on::after{content:"";position:absolute;left:10px;right:10px;bottom:6px;height:3px;border-radius:2px;background:var(--brand)}

.field{display:flex;flex-direction:column;gap:2px;min-width:0}
.field > label{font-size:12px;line-height:16px;color:var(--fg3)}
.field > div{font-size:14px;line-height:20px;color:var(--fg1)}

table.grid{width:100%;border-collapse:collapse;font-size:14px}
table.grid th{text-align:left;font-weight:600;font-size:12px;color:var(--fg2);height:36px;padding:0 12px;border-bottom:1px solid var(--stroke2);white-space:nowrap}
table.grid td{height:44px;padding:0 12px;border-bottom:1px solid var(--stroke3);white-space:nowrap}
table.grid tr.sel td{background:var(--brand-bg2)}
.num{text-align:right;font-variant-numeric:tabular-nums}

table.grid.compact th{height:30px;padding:0 8px}
table.grid.compact td{height:36px;padding:0 8px;font-size:13px}
/* Toggle-button group: confirm / reassign / decline choices on a card item */
.seg{display:inline-flex;border:1px solid var(--stroke1);border-radius:var(--r-md);overflow:hidden;flex:none}
.seg > *{height:28px;padding:0 10px;display:inline-flex;align-items:center;gap:6px;font-size:13px;background:var(--bg1);color:var(--fg2)}
.seg > * + *{border-left:1px solid var(--stroke1)}
.seg > .on{background:var(--brand-bg2);color:var(--brand-fg2);font-weight:600}
/* Before -> after value (what the agent proposes or changed) */
.diff{display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.diff .old{color:var(--fg3);text-decoration:line-through}
.diff .new{font-weight:600;color:var(--fg1)}
.diff .ic{width:16px;height:16px;color:var(--fg3)}
.progress{height:4px;border-radius:2px;background:var(--bg5);overflow:hidden}
.progress > i{display:block;height:100%;background:var(--brand);border-radius:2px}

.spinner{width:16px;height:16px;flex:none;border-radius:50%;border:2px solid var(--brand-stroke2);border-top-color:var(--brand);animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

/* Windows-style notification */
.toast{position:absolute;right:24px;bottom:56px;width:380px;z-index:800;background:var(--bg1);border-radius:var(--r-xl);box-shadow:var(--sh28);padding:14px 16px;display:flex;gap:12px}
.toast .t-app{font-size:12px;color:var(--fg3);display:flex;align-items:center;gap:6px;margin-bottom:6px}

/* ---------- M365 header (shared by Outlook, D365) ---------- */
.m365{position:absolute;inset:0;display:flex;flex-direction:column;background:var(--bg3)}
.m365-bar{height:48px;flex:none;display:flex;align-items:center;gap:12px;padding:0 12px 0 0;background:var(--app,var(--brand));color:#fff}
.m365-bar .waffle{width:48px;height:48px;display:flex;align-items:center;justify-content:center}
.m365-bar .app-name{font-size:16px;font-weight:600;white-space:nowrap}
.m365-bar .app-name small{font-weight:400;opacity:.85;margin-left:8px;font-size:14px}
.m365-bar .search{flex:0 1 560px;margin:0 auto;height:32px;background:rgba(255,255,255,.88);color:var(--fg3)}
.m365-bar .tools{display:flex;align-items:center;gap:4px}
.m365-bar .tools .btn.icon{color:#fff;border:0;background:transparent}
.m365-bar.light{background:var(--bg1);color:var(--fg1);border-bottom:1px solid var(--stroke2)}
.m365-bar.light .search{background:var(--bg3)}
.m365-bar.light .tools .btn.icon{color:var(--fg2)}
.m365-body{flex:1;display:flex;min-height:0}
.app-rail{width:48px;flex:none;display:flex;flex-direction:column;align-items:center;gap:4px;padding-top:8px;background:var(--bg3)}
.app-rail > *{width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:var(--r-lg);color:var(--fg3)}
.app-rail > .on{background:var(--bg1);color:var(--app,var(--brand));box-shadow:var(--sh2)}

/* ---------- Outlook ---------- */
.ol{--app:var(--outlook)}
.ol-ribbon{height:48px;flex:none;display:flex;align-items:center;gap:6px;padding:0 12px;background:var(--bg1);border-bottom:1px solid var(--stroke2)}
.ol-ribbon .btn.primary{background:var(--outlook)}
.ol-main{flex:1;display:flex;min-height:0;gap:0;padding:8px 8px 8px 0}
.ol-folders{width:236px;flex:none;padding:8px 8px 8px 4px;display:flex;flex-direction:column;gap:2px}
.ol-folders > *{display:flex;align-items:center;gap:10px;height:32px;padding:0 10px;border-radius:var(--r-md);color:var(--fg1)}
.ol-folders > .on{background:var(--brand-bg2);font-weight:600}
.ol-folders > .hdr{font-weight:600;color:var(--fg1);margin-top:8px}
.ol-folders .badge{margin-left:auto;background:transparent;color:var(--brand);padding:0}
.ol-list{width:440px;flex:none;background:var(--bg1);border-radius:var(--r-xl) 0 0 var(--r-xl);border-right:1px solid var(--stroke2);display:flex;flex-direction:column;overflow:hidden}
.ol-list-head{display:flex;align-items:center;gap:12px;height:48px;padding:0 16px;border-bottom:1px solid var(--stroke2)}
.ol-list-head .on{font-weight:600;position:relative}
.ol-list-head .on::after{content:"";position:absolute;left:0;right:0;bottom:-15px;height:3px;border-radius:2px;background:var(--outlook)}
.ol-group{padding:12px 16px 4px;font-size:12px;font-weight:600;color:var(--fg2)}
.ol-mail{display:flex;gap:12px;padding:10px 16px 10px 13px;border-left:3px solid transparent;border-bottom:1px solid var(--stroke3);position:relative}
.ol-mail.unread{border-left-color:var(--outlook)}
.ol-mail.unread .from,.ol-mail.unread .subj{font-weight:600}
.ol-mail.unread .subj{color:var(--outlook)}
.ol-mail.sel{background:var(--brand-bg2)}
.ol-mail .from{font-size:14px;line-height:20px}
.ol-mail .subj{font-size:14px;line-height:20px}
.ol-mail .prev{font-size:12px;line-height:16px;color:var(--fg3)}
.ol-mail .when{font-size:12px;color:var(--fg3);margin-left:auto;white-space:nowrap}
.ol-read{flex:1;min-width:0;background:var(--bg1);border-radius:0 var(--r-xl) var(--r-xl) 0;display:flex;flex-direction:column;overflow:hidden}
.ol-read-subj{padding:20px 28px 12px;font-size:20px;line-height:28px;font-weight:600}
.ol-read-head{display:flex;gap:12px;padding:0 28px 16px;align-items:flex-start}
.ol-read-body{flex:1;overflow:hidden;padding:4px 28px 28px 80px;font-size:15px;line-height:22px;color:var(--fg1)}
.ol-read-body p{margin:0 0 12px}

/* Outlook calendar, work week.  Inside .m365.ol: .cal-main > .cal-side + .cal (.cal-bar, .cal-days, .cal-grid).
   In .cal-grid, column 1 is the hour gutter and columns 2-6 are Mon-Fri; rows are half hours from 8:00 AM
   (row = (hour - 8) * 2 + 1).  An event: <div class="ev" style="grid-column:4;grid-row:13/15"><b>Title</b>Place</div> */
.cal-main{flex:1;display:flex;min-height:0;padding:8px 8px 8px 0}
.cal-side{width:236px;flex:none;padding:8px 12px 8px 4px;display:flex;flex-direction:column;gap:2px}
.cal-side > *{display:flex;align-items:center;gap:10px;height:32px;padding:0 10px;border-radius:var(--r-md);font-size:14px}
.cal-side > .hdr{font-weight:600;margin-top:8px}
.cal-side .sw{width:12px;height:12px;border-radius:3px;flex:none;background:var(--outlook)}
.cal{flex:1;min-width:0;background:var(--bg1);border-radius:var(--r-xl);display:flex;flex-direction:column;overflow:hidden}
.cal-bar{height:48px;flex:none;display:flex;align-items:center;gap:8px;padding:0 16px;border-bottom:1px solid var(--stroke2)}
.cal-bar .t{font-size:16px;font-weight:600;margin-left:4px}
.cal-days{display:grid;grid-template-columns:56px repeat(5,1fr);flex:none;border-bottom:1px solid var(--stroke2)}
.cal-days > *{padding:6px 10px;font-size:12px;line-height:16px;color:var(--fg2);border-left:1px solid var(--stroke3)}
.cal-days > :first-child{border-left:0}
.cal-days b{display:block;font-size:20px;line-height:26px;font-weight:600;color:var(--fg1)}
.cal-days .today{color:var(--outlook)}.cal-days .today b{color:var(--outlook)}
.cal-grid{flex:1;min-height:0;display:grid;grid-template-columns:56px repeat(5,minmax(0,1fr));grid-template-rows:repeat(20,minmax(0,1fr));
  background-image:linear-gradient(var(--stroke3) 1px,transparent 1px),linear-gradient(90deg,var(--stroke3) 1px,transparent 1px);
  background-size:100% 10%,calc((100% - 56px) / 5) 100%;background-position:0 0,56px 0}
.cal-h{grid-column:1;padding:2px 8px 0 0;text-align:right;font-size:11px;line-height:14px;color:var(--fg3);background:var(--bg1)}
.ev{margin:1px 6px 1px 2px;min-width:0;border-radius:var(--r-md);padding:3px 8px;font-size:12px;line-height:16px;color:var(--fg1);background:#dcebfa;border-left:3px solid var(--outlook);overflow:hidden}
.ev b{display:block;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ev.c2{background:#e3f2e3;border-left-color:#107c10}.ev.c3{background:#efe7f8;border-left-color:#8764b8}.ev.c4{background:#fdecdf;border-left-color:#ca5010}.ev.c5{background:var(--bg4);border-left-color:var(--fg4)}
.ev.ai{box-shadow:0 0 0 2px var(--bg1),0 0 0 4px #8661c5}

/* ---------- Line-of-business app: the customer's own system, deliberately unbranded ----------
   .lob > .lob-bar (.glyph + .name, .search, avatar) + .lob-body > .lob-nav + .lob-page (.lob-head, .section, table.grid) */
.lob{position:absolute;inset:0;display:flex;flex-direction:column;background:#f3f4f6;--lob:#1e293b}
.lob-bar{height:48px;flex:none;display:flex;align-items:center;gap:14px;padding:0 16px;background:var(--lob);color:#fff}
.lob-bar .name{display:flex;align-items:center;gap:10px;font-size:15px;font-weight:600;white-space:nowrap}
.lob-bar .glyph{width:28px;height:28px;border-radius:6px;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center}
.lob-bar .search{flex:0 1 480px;margin:0 auto;background:rgba(255,255,255,.1);color:rgba(255,255,255,.75)}
.lob-body{flex:1;display:flex;min-height:0}
.lob-nav{width:208px;flex:none;background:#fff;border-right:1px solid #e5e7eb;padding:12px 8px;display:flex;flex-direction:column;gap:2px}
.lob-nav > *{display:flex;align-items:center;gap:10px;height:34px;padding:0 10px;border-radius:6px;font-size:14px;color:#374151}
.lob-nav > .on{background:#e8eef7;color:#111827;font-weight:600}
.lob-nav > .hdr{height:28px;margin-top:8px;font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;color:#6b7280}
.lob-page{flex:1;min-width:0;padding:20px 24px;display:flex;flex-direction:column;gap:16px;overflow:hidden}
.lob-head{display:flex;align-items:center;gap:12px}
.lob-head h1{margin:0;font-size:22px;line-height:28px;font-weight:600;color:#111827}
.lob .btn.primary{background:var(--lob)}
.lob .section{border-radius:8px;box-shadow:none;border:1px solid #e5e7eb}
.lob table.grid tr.new td{background:#f4f0fb}

/* Adaptive Card (actionable message / Teams card / Copilot card) */
.acard{background:var(--bg1);border:1px solid var(--stroke2);border-radius:var(--r-xl);box-shadow:var(--sh4);overflow:hidden;max-width:720px}
.acard-head{display:flex;align-items:center;gap:10px;padding:14px 16px 10px}
.acard-body{padding:0 16px 14px}
.acard-foot{display:flex;gap:8px;padding:12px 16px;border-top:1px solid var(--stroke3);background:var(--bg2)}
.acard .item{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-top:1px solid var(--stroke3)}
.acard .item:first-child{border-top:0}
.check{width:18px;height:18px;flex:none;border-radius:var(--r-sm);border:1px solid var(--fg3);background:var(--bg1);display:inline-flex;align-items:center;justify-content:center;margin-top:1px}
.check.on{background:var(--brand);border-color:var(--brand)}
.check.on::after{content:"";width:9px;height:5px;border:2px solid #fff;border-top:0;border-right:0;transform:rotate(-45deg) translate(1px,-1px)}
.radio{width:18px;height:18px;flex:none;border-radius:50%;border:1px solid var(--fg3);display:inline-flex;align-items:center;justify-content:center}
.radio.on{border-color:var(--brand)}.radio.on::after{content:"";width:10px;height:10px;border-radius:50%;background:var(--brand)}

/* ---------- Agent conversation parts (used inside the custom agent app, .cpa) ---------- */
.cp-mark{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;flex:none}
.cp-mark .ic{width:100%;height:100%}
.cp-user{align-self:flex-end;max-width:84%;padding:10px 14px;border-radius:var(--r-2xl);background:var(--brand-bg2);font-size:14px;line-height:20px}
.cp-turn{display:flex;flex-direction:column;gap:10px;font-size:14px;line-height:21px}
.cp-turn p{margin:0}
.cp-turn ul{margin:0;padding-left:20px}.cp-turn li{margin:2px 0}
.cp-who{flex:none;display:flex;align-items:center;gap:8px;font-size:14px;line-height:20px;font-weight:600;color:var(--fg1)}
.cp-who > .oi,.cp-who > .cp-mark{width:24px;height:24px}
.cp-who .t-cap{font-size:12px;font-weight:400;color:var(--fg3)}
.cp-resp{background:var(--bg1);border-radius:var(--r-2xl);padding:14px 16px;box-shadow:var(--sh2)}
.cite{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 5px;margin:0 2px;border-radius:var(--r-md);background:var(--bg4);font-size:11px;font-weight:600;color:var(--fg2);vertical-align:1px}
.refs{display:flex;flex-wrap:wrap;gap:6px}
.ref{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 10px;border-radius:var(--r-lg);border:1px solid var(--stroke2);background:var(--bg1);font-size:12px;color:var(--fg2);max-width:260px}
.ref .ic{width:16px;height:16px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:var(--r-xl);border:1px solid var(--stroke2);background:var(--bg1);font-size:13px;color:var(--fg1)}

/* Copilot's work in the conversation, as a Fluent 2 agent-activity card (look-and-feel.md §Copilot's work).
   .work-box is a card: .sum is its header ("Working on it" with a brand spinner and an indeterminate progress bar
   across the top edge; then a filled check and "9 items complete"), .work > li are the steps (a brand spinner,
   then a filled brand check, joined by a hairline), li.think is the reasoning (a lightbulb; .lbl holds .on-run
   "Thinking…" and .on-done "Thought process" + chevron; .thought is a quoted panel shown while the li has .open;
   clicking .lbl toggles it), then .more ("Show more") as the card's footer.  .clip keeps only the latest items in
   view, faded at the top.  .cp-status (Copilot mark + .t) is the latency pill under the card.
   proto.js sets .run then .done on each li[data-beat]; a thinking li stays .run until its text has streamed.
   When every item is done proto.js adds .done to the .work-box and fills .on-done's .n.  li.skill: Copilot loads
   the customer's own skill; its icon (.plug) takes the place of the check. */
.work-box{flex:none;position:relative;display:flex;flex-direction:column;align-items:stretch;background:var(--bg1);border:1px solid var(--stroke2);border-radius:var(--r-xl);box-shadow:var(--sh2);overflow:hidden}
.work-box::after{content:"";position:absolute;left:0;top:0;width:34%;height:2px;border-radius:1px;background:linear-gradient(90deg,transparent,var(--brand) 30%,var(--brand) 70%,transparent);animation:fluent-indet 1.6s var(--ease-glide) infinite}
.work-box.done::after{content:none}
@keyframes fluent-indet{from{transform:translateX(-100%)}to{transform:translateX(300%)}}
.work-box > summary,.work-box > .sum{display:flex;align-items:center;gap:10px;height:40px;padding:0 12px 0 14px;font-size:14px;font-weight:600;color:var(--fg1);list-style:none;border-bottom:1px solid var(--stroke3)}
.work-box > .sum::before{content:"";width:16px;height:16px;flex:none;box-sizing:border-box;border-radius:50%;border:2px solid var(--brand-stroke2);border-top-color:var(--brand);animation:spin .9s linear infinite}
.work-box.done > .sum::before{border:0;animation:tick-pop .36s var(--ease-out);background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='8' fill='%230f6cbd'/%3E%3Cpath d='M4.6 8.3l2.3 2.3 4.6-4.9' fill='none' stroke='%23fff' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/16px no-repeat}
.work-box > .sum .ic{width:16px;height:16px;margin-left:auto;color:var(--fg3)}
.work-box > .sum .on-done,.work-box.done > .sum .on-run{display:none}
.work-box.done > .sum .on-done{display:inline}
.work{list-style:none;margin:0;padding:6px 14px 8px;display:flex;flex-direction:column;align-self:stretch;font-size:14px;line-height:20px;color:var(--fg1)}
.work li{position:relative;padding:7px 0 7px 28px}
.work li::before{content:"";position:absolute;left:0;top:9px;width:16px;height:16px;box-sizing:border-box;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='8' fill='%230f6cbd'/%3E%3Cpath d='M4.6 8.3l2.3 2.3 4.6-4.9' fill='none' stroke='%23fff' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/16px no-repeat}
.work li:not(:last-child)::after{content:"";position:absolute;left:7.5px;top:29px;bottom:-5px;width:1px;background:var(--stroke2)}
.work li.run{color:var(--fg2)}
.work li.run::before{left:1px;top:10px;width:14px;height:14px;border-radius:50%;border:2px solid var(--brand-stroke2);border-top-color:var(--brand);background:none;animation:spin .9s linear infinite}
.work li.done[data-beat]:not(.think)::before{animation:tick-pop .36s var(--ease-out)}
@keyframes tick-pop{from{transform:scale(.4);opacity:0}}
.work li .det{color:var(--fg3)}
.work li b{font-weight:600}
.work li.skill:not(.run)::before{content:none}
.work li.skill > .plug{position:absolute;left:-1px;top:8px}
.work li.skill.run > .plug{visibility:hidden}
.work li.skill.done[data-beat] > .plug{animation:tick-pop .36s var(--ease-out)}
.work li.think{font-size:13px;color:var(--fg2)}
.work li.think::before,.work li.think.run::before{left:0;top:9px;width:16px;height:16px;border:0;border-radius:0;animation:none;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23616161' d='M10 2a6 6 0 0 1 3.5 10.87V14.5a1.5 1.5 0 0 1-1.5 1.5H8a1.5 1.5 0 0 1-1.5-1.5v-1.63A6 6 0 0 1 10 2Zm0 1a5 5 0 0 0-2.8 9.14.5.5 0 0 1 .3.46v1.9c0 .28.22.5.5.5h4a.5.5 0 0 0 .5-.5v-1.9a.5.5 0 0 1 .3-.46A5 5 0 0 0 10 3ZM8 17.5c0-.28.22-.5.5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z'/%3E%3C/svg%3E") center/16px no-repeat}
.work li.think > .lbl{display:inline-flex;align-items:center;gap:4px;font-weight:600;cursor:pointer}
.work li.think > .lbl .ic{width:14px;height:14px;transition:transform .2s var(--ease-out)}
.work li.think.open > .lbl .ic{transform:rotate(90deg)}
.work li.think > .thought{display:none;margin:6px 0 2px;padding:8px 12px;border-left:2px solid var(--brand-stroke2);border-radius:0 var(--r-md) var(--r-md) 0;background:var(--bg2);font-size:14px;line-height:22px;color:var(--fg2)}
.work li.think.open > .thought{display:block}
.work .thought p{margin:0}
.work .thought p + p{margin-top:10px}
.work .on-run,.work li.run .on-done{display:none}
.work li.run .on-run{display:inline}
.work-box.clip > .work{max-height:var(--clip,136px);overflow:hidden;justify-content:flex-end}
/* While a thought streams in a clipped trace, proto.js sets --lag to its unstreamed tail, so the window ends at the
   latest words; the list eases down by it and back as the text arrives. */
.work-box.clip > .work > li{translate:0 var(--lag,0px);transition:translate .24s var(--ease-out)}
.work-box.clip.all > .work > li{translate:none}
.work-box.clip > .work.lag-snap > li{transition:none}
.work-box.clip.over > .work{-webkit-mask-image:linear-gradient(to bottom,transparent,#000 44px);mask-image:linear-gradient(to bottom,transparent,#000 44px)}
.work-box.clip.all > .work{max-height:none;-webkit-mask-image:none;mask-image:none}
.work-box.clip:not(.over,.all) > .more{display:none}
.work-box > .more{height:34px;display:flex;align-items:center;padding:0 14px;border:0;border-top:1px solid var(--stroke3);background:none;font:inherit;font-size:13px;font-weight:600;color:var(--brand-fg2);cursor:pointer}
.cp-status{flex:none;align-self:flex-start;display:flex;align-items:center;gap:8px;height:32px;padding:0 14px 0 8px;border:1px solid var(--stroke2);border-radius:999px;background:var(--bg1);box-shadow:var(--sh2);font-size:13px;line-height:20px;color:var(--fg2)}
.cp-status > .oi,.cp-status > .cp-mark{width:20px;height:20px}
.cp-status > .t,.work li.think.run .on-run{background:linear-gradient(100deg,var(--fg2) 42%,#c8c8c8 50%,var(--fg2) 58%) 100% 0/300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shimmer 2.2s linear infinite}
@keyframes shimmer{to{background-position:0 0}}
/* Fluent CopilotMessage footer: feedback actions and the AI-content disclaimer, under Copilot's answer */
.cp-acts{display:flex;align-items:center;gap:2px;color:var(--fg3);font-size:12px;line-height:16px}
.cp-acts .btn.icon{width:28px;height:28px;min-width:0;padding:0;border:0;background:transparent;color:var(--fg3)}
.cp-acts .btn.icon .ic{width:16px;height:16px}
.cp-acts .cp-ai{margin-left:auto;white-space:nowrap}
/* Conversation furniture: a time divider ("1 min ago") and a file the person attached, above their message */
.cp-time{flex:none;display:flex;align-items:center;gap:12px;font-size:12px;line-height:16px;color:var(--fg3)}
.cp-time::before,.cp-time::after{content:"";flex:1;height:1px;background:var(--stroke2)}
.cp-file{align-self:flex-end;flex:none;display:flex;align-items:center;gap:10px;max-width:320px;padding:8px 14px 8px 10px;border:1px solid var(--stroke2);border-radius:var(--r-xl);background:var(--bg1);box-shadow:var(--sh2);font-size:14px;line-height:18px}
.cp-file > .oi,.cp-file > .ic{width:24px;height:24px}
.cp-file > div{min-width:0}
.cp-file .nm{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cp-file .t-cap{display:block;font-size:12px;line-height:16px;color:var(--fg3)}

/* Process steps: the agent runs a playbook.  Visible (queued) from the start; proto.js sets .run / .wait / .done
   from data-run-at / data-wait-at / data-done-at.  .on-queued .on-run .on-wait .on-done show text for one state. */
.steps{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}
.step{display:flex;gap:12px;align-items:flex-start;padding:10px 12px;border-radius:var(--r-lg);position:relative;transition:background .3s,box-shadow .3s}
.step::before{content:"";width:20px;height:20px;flex:none;box-sizing:border-box;border-radius:50%;border:2px solid var(--stroke1);background:var(--bg1);margin-top:1px;position:relative;z-index:1}
.step:not(:last-child)::after{content:"";position:absolute;left:21px;top:34px;bottom:-10px;width:2px;background:var(--stroke2)}
.step .st{flex:1;min-width:0}
.step .st-t{font-size:14px;line-height:21px;font-weight:600;color:var(--fg3)}
.step .st-d{font-size:12px;line-height:16px;color:var(--fg3);margin-top:2px}
.step.run .st-t,.step.wait .st-t,.step.done .st-t{color:var(--fg1)}
.step.run::before{border-color:var(--brand-stroke2);border-top-color:var(--brand);animation:spin 1s linear infinite}
.step.done::before{border:0;background:var(--success) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5.5 10.2l3 3L14.5 7' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/20px no-repeat}
.step.done:not(:last-child)::after{background:var(--success-stroke)}
.step.wait{background:var(--brand-bg2);box-shadow:inset 3px 0 0 var(--brand)}
.step.wait::before{border-color:var(--brand);background:radial-gradient(circle,var(--brand) 0 4px,var(--bg1) 4.5px)}
.step .on-run,.step .on-wait,.step .on-done{display:none}
.step.run .on-run,.step.wait .on-wait,.step.done .on-done{display:revert}
.step.run .on-queued,.step.wait .on-queued,.step.done .on-queued{display:none}
/* Engine-driven state changes: the check pops in and the new status line fades in */
.step.done:is([data-run-at],[data-done-at])::before{animation:tick-pop .36s var(--ease-out)}
.step:is([data-run-at],[data-wait-at],[data-done-at]) :is(.on-run,.on-wait,.on-done){animation:label-in .3s var(--ease-out)}
@keyframes label-in{from{opacity:0}}
/* Who acts on a step.  Write the label: Done for you / Needs your input / Needs your approval */
.mode{display:inline-flex;align-items:center;gap:4px;height:22px;padding:0 8px;border-radius:999px;font-size:12px;font-weight:600;line-height:16px;white-space:nowrap;flex:none}
.mode .ic{width:14px;height:14px}
.mode.auto{background:var(--bg4);color:var(--fg2)}
.mode.input{background:var(--brand-bg2);color:var(--brand-fg2)}
.mode.approval{background:var(--warning-bg);color:var(--warning-fg);box-shadow:inset 0 0 0 1px var(--warning-stroke)}
/* Why the agent may or may not act alone */
.policy{display:flex;align-items:flex-start;gap:6px;font-size:12px;line-height:16px;color:var(--fg3)}
.policy .ic{width:14px;height:14px;margin-top:1px}
/* Pre-checks on an approval (passed, or .warn) */
.checks{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px;font-size:13px;line-height:18px;color:var(--fg1)}
.checks li{display:flex;gap:8px;align-items:flex-start}
.checks li::before{content:"";width:16px;height:16px;flex:none;margin-top:1px;border-radius:50%;background:var(--success) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 8.2l2.6 2.6L12 5.4' fill='none' stroke='%23fff' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/16px no-repeat}
.checks li.warn::before{background:var(--warning) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 4.5v4.2M8 11.3v.2' fill='none' stroke='%23fff' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E") center/16px no-repeat}
/* Activity log: what the agent did alone and what a named person approved */
.log{display:flex;flex-direction:column;font-size:13px;line-height:18px}
.log > *{display:grid;grid-template-columns:64px 24px 1fr auto;gap:10px;align-items:center;padding:8px 0;border-top:1px solid var(--stroke3)}
.log > :first-child{border-top:0}
.log .t{color:var(--fg3);font-variant-numeric:tabular-nums;white-space:nowrap}
.log .by{display:block;font-size:12px;color:var(--fg3)}
/* Process view layout: steps on the left, whatever needs the user (input, approval, log) on the right.  Not on list
   items: proto.js also sets .run on a running step or work item, which must keep its own layout. */
.run:not(li){display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:20px;align-items:start}
/* Selectable option for a "needs your input" step */
.opt{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border:1px solid var(--stroke2);border-radius:var(--r-lg);background:var(--bg1);font-size:13px;line-height:18px;color:var(--fg2)}
.opt .t{display:block;font-size:14px;line-height:20px;font-weight:600;color:var(--fg1)}
.opt.on{border-color:var(--brand);background:var(--brand-bg2)}

/* ---------- The agent app: the customer's own custom-built app, drawn in Fluent 2 ----------
   Not a copy of Cowork's look: a Fluent 2 layered window.  The frame (title bar and NavDrawer) sits on a neutral
   grey; the content surface is a lighter layer with a rounded top-left corner; Copilot speaks in Fluent cards with
   its avatar header; the side pane is a Fluent drawer with accordion sections.
   .cpa > .cpa-title (back/forward, window controls) + .cpa-body > .cpa-side (wordmark, mode TabList, nav, user)
   and .cpa-main > .cpa-top + one of: .cpa-home (greeting, prompt starters, prompt), .cpa-work > .cpa-conv
   (.cpa-chat, .cpa-prompt) with an optional .cpa-pane on the right (Workspace, in-app browser, Office document), or
   .cpa-over (the agent's activity overview).  Add .nav-off to .cpa to collapse the left panel when the pane needs room. */
.cpa{position:absolute;inset:0;display:flex;flex-direction:column;background:var(--bg4);color:var(--fg1)}
.cpa .btn.icon{border:0;background:transparent;color:var(--fg2)}
.cpa-title{height:34px;flex:none;display:flex;align-items:center;gap:2px;padding-left:10px;color:var(--fg3)}
.cpa-title > .ic{width:16px;height:16px;margin:0 7px}
.cpa-title > .off{color:var(--fg-disabled)}
.cpa-win{margin-left:auto;display:flex;align-self:stretch}
.cpa-win > i{width:46px;display:flex;align-items:center;justify-content:center;position:relative}
.cpa-win > .min::before{content:"";width:10px;height:1px;background:var(--fg2)}
.cpa-win > .max::before{content:"";width:9px;height:9px;border:1px solid var(--fg2);border-radius:2px}
.cpa-win > .x::before,.cpa-win > .x::after{content:"";position:absolute;width:13px;height:1px;background:var(--fg2);transform:rotate(45deg)}
.cpa-win > .x::after{transform:rotate(-45deg)}
.cpa-body{flex:1;min-height:0;display:flex}
/* NavDrawer: app title, a TabList for the modes, nav items with a brand selection bar, the signed-in person */
.cpa-side{width:252px;flex:none;display:flex;flex-direction:column;gap:2px;padding:0 10px 44px}
.cpa.nav-off .cpa-side{display:none}
.cpa-brand{height:44px;flex:none;display:flex;align-items:center;gap:2px;padding-left:8px}
.cpa-brand .wm{font-size:18px;line-height:24px;font-weight:600;margin-right:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cpa-modes{display:flex;flex:none;gap:4px;margin:4px 0 10px;padding:0 2px;border-bottom:1px solid var(--stroke2)}
.cpa-modes > *{position:relative;height:36px;padding:0 10px;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--fg2)}
.cpa-modes > .on{color:var(--fg1);font-weight:600}
.cpa-modes > .on::after{content:"";position:absolute;left:10px;right:10px;bottom:-1px;height:3px;border-radius:2px;background:var(--brand)}
.cpa-nav{display:flex;flex-direction:column;gap:2px;min-height:0;overflow:hidden}
.cpa-nav > *{position:relative;display:flex;align-items:center;gap:10px;height:36px;flex:none;padding:0 10px;border-radius:var(--r-md);font-size:14px;color:var(--fg1);white-space:nowrap}
.cpa-nav > * > .ic{color:var(--fg2)}
.cpa-nav > .on{background:var(--bg6);font-weight:600}
.cpa-nav > .on::before{content:"";position:absolute;left:0;top:9px;bottom:9px;width:3px;border-radius:2px;background:var(--brand)}
.cpa-nav > .hdr{height:30px;margin-top:12px;font-size:12px;font-weight:600;color:var(--fg3)}
.cpa-nav > .sub{padding-left:40px;color:var(--fg2)}
.cpa-nav .lbl{min-width:0;overflow:hidden;text-overflow:ellipsis}
.cpa-nav .plus{width:20px;height:20px;border-radius:var(--r-md);flex:none;display:flex;align-items:center;justify-content:center;background:var(--brand);color:#fff}
.cpa-nav .plus .ic{width:14px;height:14px}
.cpa-me{margin-top:auto;flex:none;display:flex;align-items:center;gap:10px;padding:8px;border-radius:var(--r-md);font-size:14px;line-height:18px}
.cpa-me .t-cap{color:var(--fg3)}
/* Content layer: lighter than the frame, rounded top-left corner, hairline edge */
.cpa-main{flex:1;min-width:0;display:flex;flex-direction:column;background:var(--bg2);border-top:1px solid var(--stroke2);border-left:1px solid var(--stroke2);border-top-left-radius:var(--r-xl)}
.cpa.nav-off .cpa-main{border-left:0;border-top-left-radius:0}
.cpa-top{height:48px;flex:none;display:flex;align-items:center;gap:6px;padding:0 12px 0 16px;border-bottom:1px solid var(--stroke3)}
.cpa-top .pick{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 10px;border:1px solid var(--stroke1);border-radius:var(--r-md);background:var(--bg1);font-size:14px;white-space:nowrap}
.cpa-top .pick .ic{width:16px;height:16px;color:var(--fg2)}
.cpa-top .ttl{font-size:16px;line-height:22px;font-weight:600;padding:0 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cpa-top .end{margin-left:auto;display:flex;align-items:center;gap:2px}
.cpa .shield{color:#0e7a0d}
/* Home: Copilot's mark, a Fluent title, prompt-starter cards, the prompt */
.cpa-home{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:0 48px 72px}
.cpa-home > *{width:100%;max-width:780px}
.cpa-home .cpa-logo{width:48px;height:48px;margin-bottom:-8px}
.cpa-home > .cpa-hello,.cpa-home > .cpa-sub{text-align:center}
.cpa-hello{margin:0;font-family:var(--font);font-size:28px;line-height:36px;font-weight:600;letter-spacing:0;color:var(--fg1)}
.cpa-hello + .cpa-sub{margin-top:-16px}
.cpa-sub{margin:0;font-size:16px;line-height:22px;color:var(--fg3)}
/* Prompt input: a Fluent card with the brand focus line along its bottom edge on Home */
.cpa-prompt{flex:none;display:flex;flex-direction:column;gap:12px;padding:14px 12px 10px 16px;background:var(--bg1);border:1px solid var(--stroke1);border-radius:var(--r-xl);box-shadow:var(--sh4)}
.cpa-home .cpa-prompt{box-shadow:var(--sh4),inset 0 -2px 0 var(--brand)}
.cpa-prompt .ph{font-size:15px;line-height:22px;color:var(--fg4)}
.cpa-prompt .txt{font-size:15px;line-height:22px;color:var(--fg1)}
.cpa-prompt .tools{display:flex;align-items:center;gap:6px;margin-left:-6px;color:var(--fg2)}
/* Mode toggle buttons (Chat, Agent): the selected one in brand tint */
.cpa-switch{display:inline-flex;gap:4px}
.cpa-switch > *{height:28px;padding:0 10px;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--stroke1);border-radius:var(--r-md);background:var(--bg1);font-size:13px;color:var(--fg2)}
.cpa-switch > .on{border-color:var(--brand-stroke2);background:var(--brand-bg2);color:var(--brand-fg2);font-weight:600}
.cpa-switch .ic{width:16px;height:16px}
.cpa-send{width:32px;height:32px;flex:none;border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;background:var(--brand);color:#fff}
.cpa-send .ic{width:18px;height:18px}
.cpa-send.off{background:transparent;color:var(--fg-disabled)}
/* Prompt starters: Fluent cards (an icon, a short title, the prompt) */
.cpa-chips{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.cpa-chips > *{display:flex;flex-direction:column;align-items:flex-start;gap:4px;min-width:0;padding:12px 14px;border:1px solid var(--stroke2);border-radius:var(--r-xl);background:var(--bg1);box-shadow:var(--sh2);font-size:13px;line-height:18px;color:var(--fg2)}
.cpa-chips > * > .ic{width:20px;height:20px;margin-bottom:4px;color:var(--brand)}
.cpa-chips > * > b{font-size:14px;line-height:20px;font-weight:600;color:var(--fg1)}
/* Conversation, with an optional side pane */
.cpa-work{flex:1;min-height:0;display:flex;gap:12px;padding:0 12px 12px 0}
.cpa-conv{flex:1;min-width:0;display:flex;flex-direction:column;padding-left:12px}
.cpa-chat{flex:1;min-height:0;width:100%;max-width:820px;margin:0 auto;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;gap:14px;padding:8px 24px 12px;
  -webkit-mask-image:linear-gradient(to bottom,transparent,#000 18px);mask-image:linear-gradient(to bottom,transparent,#000 18px)}
/* Like a real chat, a long conversation scrolls its oldest messages up under the fade; nothing gets squashed */
.cpa-chat > *{flex-shrink:0}
.cpa-conv .cpa-prompt{width:calc(100% - 48px);max-width:772px;margin:6px auto 0;padding:12px 12px 10px 16px;gap:10px}
/* Fluent UserMessage (brand-tinted, right) and CopilotMessage (white card under Copilot's avatar header) */
.cpa .cp-user{background:var(--brand-bg2);border-radius:var(--r-2xl) var(--r-2xl) var(--r-md) var(--r-2xl);padding:10px 14px;font-size:15px;line-height:22px;color:var(--fg1)}
.cpa .cp-turn{font-size:15px;line-height:23px;gap:8px}
.cpa .cp-resp{background:var(--bg1);border:1px solid var(--stroke2);border-radius:var(--r-xl);box-shadow:var(--sh2);padding:12px 16px}
.cpa .cite{background:var(--brand-bg2);color:var(--brand-fg2);border-radius:var(--r-md)}
.cpa .ref{border-radius:var(--r-md);border-color:var(--stroke2)}
.cpa .chips > .chip{height:32px;padding:0 14px;border-radius:999px;border-color:var(--brand-stroke2);color:var(--brand-fg2);font-size:14px;font-weight:600}
.cpa .chips > .chip .ic{width:16px;height:16px}
.cpa .acard{max-width:none}
.cpa-pane{width:var(--pane,560px);flex:none;min-height:0;display:flex;flex-direction:column;background:var(--bg1);border:1px solid var(--stroke2);border-radius:var(--r-xl);box-shadow:var(--sh4);overflow:hidden}
/* A pane revealed on a beat slides in from the right while the conversation glides over to make room (the engine
   moves the conversation; the pane takes the same path, so it reads as one push).  Nothing resizes mid-motion,
   so text never rewraps while it moves. */
.cpa-pane[data-beat].in{animation:pane-in var(--t-glide) var(--ease-glide) both}
/* A browser or document pane is a full-height split beside the conversation: it starts at the conversation's
   header row and runs to the window's bottom and right edges, set off by a divider, not a floating card; the
   conversation's header stays above the conversation.  (The Workspace drawer, .ws, is laid out separately.) */
.cpa-main:has(> .cpa-work > .cpa-pane:not(.ws)){display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto minmax(0,1fr)}
.cpa-main:has(> .cpa-work > .cpa-pane:not(.ws)) > .cpa-top{grid-area:1/1}
.cpa-main:has(> .cpa-work > .cpa-pane:not(.ws)) > .cpa-work{display:contents}
.cpa-main:has(> .cpa-work > .cpa-pane:not(.ws)) > .cpa-work > .cpa-conv{grid-area:2/1;min-height:0;padding-bottom:12px}
.cpa-main:has(> .cpa-work > .cpa-pane:not(.ws)) > .cpa-work > .cpa-pane:not(.ws){grid-area:1/2/3/3;border:0;border-left:1px solid var(--stroke2);border-radius:0;box-shadow:none}
@keyframes pane-in{from{opacity:0;transform:translateX(48px)}}
.cpa-pane-head{height:48px;flex:none;display:flex;align-items:center;gap:8px;padding:0 6px 0 16px;border-bottom:1px solid var(--stroke2);font-size:15px;font-weight:600}
.cpa-pane-head .end,.cpa-tabs .end{margin-left:auto;display:flex;align-items:center;gap:2px}
.cpa-pane-body{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column;gap:16px;padding:14px 16px}
/* Workspace, as a Fluent 2 inline drawer: a white panel at the right edge, a drawer title and close button, then
   accordion sections divided by hairlines: Steps (.ws-count, a brand badge with "done / total", filled in by
   proto.js), Output, References and Plugins.  Each .ws-sec > h4 holds the title and .end (count, buttons, chevron).
   Steps carry Fluent status icons: an outline circle while queued, a brand spinner while running, a brand ring and
   tinted row while waiting for the person, a filled brand check when done. */
.cpa-pane.ws{background:var(--bg1);border:0;border-left:1px solid var(--stroke2);border-radius:0;box-shadow:none;margin:0 -12px -12px 0}
.ws .cpa-pane-head{height:56px;border-bottom:1px solid var(--stroke2);padding:0 10px 0 20px;font-size:20px;line-height:28px;font-weight:600}
.ws .cpa-pane-body{gap:0;padding:0 20px 20px}
.ws-sec{flex:none;display:flex;flex-direction:column;gap:6px;padding:12px 0 14px}
.ws-sec + .ws-sec{border-top:1px solid var(--stroke2)}
.ws-sec > h4{margin:0;height:30px;display:flex;align-items:center;gap:8px;font-size:14px;font-weight:600;color:var(--fg1)}
.ws-sec > h4 .ic{width:16px;height:16px;color:var(--fg2)}
.ws-sec > h4 .end{margin-left:auto;display:flex;align-items:center;gap:6px}
.ws-sec > h4 .n{margin-left:auto;font-weight:400;color:var(--fg3)}
.ws-count{display:inline-flex;align-items:center;height:20px;padding:0 8px;border-radius:999px;background:var(--brand-bg2);font-size:12px;font-weight:600;color:var(--brand-fg2);white-space:nowrap}
.ws-sec .steps{gap:2px}
.ws-sec .step{padding:6px 8px;margin:0 -8px;gap:12px;border-radius:var(--r-md)}
.ws-sec .step::before{width:18px;height:18px;border:1.5px solid var(--stroke1);margin-top:1px;background:none}
.ws-sec .step.run::before{border:2px solid var(--brand-stroke2);border-top-color:var(--brand);background:none;animation:spin .9s linear infinite}
.ws-sec .step.wait{background:var(--brand-bg2);box-shadow:none}
.ws-sec .step.wait::before{border:1.5px solid var(--brand);background:radial-gradient(circle,var(--brand) 0 3.5px,transparent 4px)}
.ws-sec .step.done::before{border:0;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='8' fill='%230f6cbd'/%3E%3Cpath d='M4.6 8.3l2.3 2.3 4.6-4.9' fill='none' stroke='%23fff' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/18px no-repeat}
.ws-sec .step:not(:last-child)::after,.ws-sec .step.done:not(:last-child)::after{left:16.5px;top:27px;bottom:-7px;width:1px;background:var(--stroke2)}
.ws-sec .step .st-t{font-size:14px;line-height:20px;font-weight:400;color:var(--fg2)}
.ws-sec .step.run .st-t,.ws-sec .step.done .st-t{color:var(--fg1)}
.ws-sec .step.wait .st-t{color:var(--brand-fg2);font-weight:600}
.ws-item{display:flex;align-items:center;gap:12px;flex:none;padding:6px 8px;margin:0 -8px;border-radius:var(--r-md);font-size:14px;line-height:20px;color:var(--fg1)}
.ws-item > .ic,.ws-item > .oi{width:20px;height:20px;flex:none;color:var(--fg2)}
.ws-item > div{min-width:0;flex:1}
.ws-item .nm{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ws-item .t-cap{display:block;font-size:12px;line-height:16px;color:var(--fg3)}
.ws-plugs{display:flex;flex-wrap:wrap;gap:8px}
.ws-plug{display:inline-flex;align-items:center;gap:8px;height:28px;padding:0 10px 0 6px;border:1px solid var(--stroke2);border-radius:var(--r-md);background:var(--bg3);font-size:13px;color:var(--fg1);white-space:nowrap}
.ws-plug > .oi,.ws-plug > .ic{width:18px;height:18px}
/* A customer's own skill or plugin: its icon is a tile in its own colour (--plug, default brand) with a white kit
   glyph.  18 px in the trace and the Workspace; .l is 40 px for the Customize page. */
.plug{--s:18px;flex:none;display:inline-flex;align-items:center;justify-content:center;width:var(--s);height:var(--s);border-radius:calc(var(--s) * .22);background:var(--plug,var(--brand));color:#fff;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
.plug > .ic{width:calc(var(--s) * .68);height:calc(var(--s) * .68)}
.plug.l{--s:40px}
/* Customize, where people add, create and share skills and plugins, drawn with Fluent parts: a title, a TabList
   (Preferences, Plugins, Skills; .on), a search box and an "Add" split button (.cz-bar: .cz-search, .cz-add), then
   .cz-sec > h3 (+ .end), p, .cz-row cards (.plug.l or .cz-ic > .oi, a <div> with .nm and .t-cap, an optional
   Fluent switch .tgl (.on) for plugins, a chevron), .cz-more ("Show more"). */
.cz{flex:1;min-height:0;overflow:hidden;width:100%;max-width:840px;margin:0 auto;padding:20px 32px 32px;display:flex;flex-direction:column;gap:10px}
.cz > h1{margin:0 0 6px;font-family:var(--font);font-size:28px;line-height:36px;font-weight:600;color:var(--fg1)}
.cz-tabs{flex:none;display:flex;gap:4px;border-bottom:1px solid var(--stroke2)}
.cz-tabs > *{position:relative;height:40px;padding:0 12px;display:inline-flex;align-items:center;font-size:14px;color:var(--fg2)}
.cz-tabs > .on{color:var(--fg1);font-weight:600}
.cz-tabs > .on::after{content:"";position:absolute;left:12px;right:12px;bottom:-1px;height:3px;border-radius:2px;background:var(--brand)}
.cz-bar{flex:none;display:flex;align-items:center;gap:8px;margin-top:8px}
.cz-search{flex:1;height:32px;display:flex;align-items:center;gap:8px;padding:0 10px;border:1px solid var(--stroke1);border-bottom-color:var(--fg3);border-radius:var(--r-md);background:var(--bg1);font-size:14px;color:var(--fg4)}
.cz-search .ic{width:16px;height:16px;color:var(--fg3)}
.cz-add{flex:none;display:inline-flex;align-items:stretch;height:32px;border-radius:var(--r-md);background:var(--brand);font-size:14px;font-weight:600;color:#fff;overflow:hidden}
.cz-add > *{display:inline-flex;align-items:center;gap:6px;padding:0 12px}
.cz-add > * + *{padding:0 8px;border-left:1px solid rgba(255,255,255,.4)}
.cz-add .ic{width:16px;height:16px}
.cz-sec{flex:none;display:flex;flex-direction:column;gap:8px;margin-top:12px}
.cz-sec > h3{margin:0;display:flex;align-items:center;gap:8px;font-size:16px;line-height:22px;font-weight:600}
.cz-sec > h3 .end{margin-left:auto;display:flex;align-items:center;gap:4px;color:var(--fg2)}
.cz-sec > p{margin:0 0 4px;font-size:14px;line-height:20px;color:var(--fg2)}
.cz-row{display:flex;align-items:center;gap:14px;min-height:64px;padding:10px 16px;border:1px solid var(--stroke2);border-radius:var(--r-xl);background:var(--bg1);box-shadow:var(--sh2);font-size:15px;line-height:20px;color:var(--fg1)}
.cz-row > div{flex:1;min-width:0}
.cz-row .nm{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cz-row .t-cap{display:block;font-size:13px;line-height:18px;color:var(--fg3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cz-row > .ic{width:18px;height:18px;flex:none;color:var(--fg2)}
.cz-ic{width:40px;height:40px;flex:none;display:inline-flex;align-items:center;justify-content:center;border-radius:var(--r-md);background:var(--bg4)}
.cz-ic > .oi{width:24px;height:24px}
.tgl{width:40px;height:20px;flex:none;position:relative;box-sizing:border-box;border:1px solid var(--fg2);border-radius:10px}
.tgl::after{content:"";position:absolute;top:3px;left:3px;width:12px;height:12px;border-radius:50%;background:var(--fg2)}
.tgl.on{border-color:var(--brand);background:var(--brand)}
.tgl.on::after{background:#fff;transform:translateX(20px)}
.cz-more{align-self:flex-end;display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--brand-fg2)}
.cz-more .ic{width:14px;height:14px}
.ws-perm{display:flex;align-items:center;gap:10px;padding:3px 0;font-size:13px;line-height:18px}
.ws-perm > .ic{width:16px;height:16px;color:var(--fg3)}
.ws-perm .badge{margin-left:auto}
/* File type marks for outputs and documents */
.oi{width:20px;height:20px;flex:none;border-radius:4px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;line-height:1;color:#fff;background:var(--fg3)}
.oi.w{background:#185abd}.oi.x{background:#107c41}.oi.p{background:#c43e1c}
/* In-app browser pane: one toolbar (.cpa-url: back, refresh, a compact address pill
   with the site and a clear ✕, then .end with expand and close) over the page (.cpa-page; put a .lob, .m365.d3 or
   .pbi-app inside).  While the agent drives it, add .cp-browsing in the page (a blue-violet frame with an "[agent] is
   browsing" tab) and a .cp-cursor ("[agent] is working" pointer); hide both when it's done.  .cpa-tabs is older
   markup, kept so existing prototypes still render; new scenes don't draw tabs. */
.cpa-tabs{height:44px;flex:none;display:flex;align-items:flex-end;gap:2px;padding:0 6px 0 8px;background:var(--bg3);border-bottom:1px solid var(--stroke2)}
.cpa-tabs > .tab{display:flex;align-items:center;gap:8px;height:34px;min-width:0;max-width:260px;padding:0 10px;margin-bottom:-1px;border-radius:8px 8px 0 0;border:1px solid transparent;font-size:12px;color:var(--fg2)}
.cpa-tabs > .tab.on{background:var(--bg1);color:var(--fg1);border-color:var(--stroke2);border-bottom-color:var(--bg1)}
.cpa-tabs .tab .lbl{min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.cpa-tabs .tab > .ic{width:14px;height:14px;color:var(--fg3)}
.cpa-tabs .end{align-self:center}
.fav{width:16px;height:16px;flex:none;border-radius:4px;display:inline-flex;align-items:center;justify-content:center;background:var(--fg3);color:#fff}
.fav .ic{width:12px;height:12px}
.cpa-url{height:48px;flex:none;display:flex;align-items:center;gap:4px;padding:0 8px 0 10px;border-bottom:1px solid var(--stroke2);color:var(--fg2)}
.cpa-url .btn.icon .ic{width:18px;height:18px}
.cpa-url .addr{flex:0 1 260px;min-width:0;height:30px;margin-left:8px;display:flex;align-items:center;gap:7px;padding:0 6px 0 10px;border-radius:var(--r-xl);background:var(--bg3);font-size:13px;color:var(--fg1);white-space:nowrap;overflow:hidden}
.cpa-url .addr > .ic{width:15px;height:15px;color:var(--fg2);flex:none}
.cpa-url .addr > .ic:last-child{margin-left:auto;width:13px;height:13px;color:var(--fg3)}
.cpa-url .end{margin-left:auto;display:flex;align-items:center;gap:2px}
.cpa-page{flex:1;min-height:0;position:relative;overflow:hidden}
.cp-browsing{position:absolute;inset:2px 6px 6px 2px;z-index:6;pointer-events:none;border:3px solid var(--browse,#6466e9);border-radius:10px}
.cp-browsing > .lbl{position:absolute;left:50%;top:-3px;transform:translateX(-50%);display:flex;align-items:center;gap:6px;height:24px;padding:0 12px 0 10px;border-radius:0 0 8px 8px;background:var(--browse,#6466e9);color:#fff;font-size:12px;font-weight:600;white-space:nowrap}
.cp-browsing > .lbl .ic{width:14px;height:14px}
/* While the agent is browsing, the frame is the page's edge: the site sits inside it, with corners
   that follow the frame's.  (Shells inside .cpa-page are absolutely placed; other content gets the padding.) */
.cpa-page:has(> .cp-browsing:not(.gone):not([data-beat]:not(.in))){padding:5px 9px 9px 5px}
.cpa-page:has(> .cp-browsing:not(.gone):not([data-beat]:not(.in))) > :not(.cp-browsing,.cp-cursor){inset:5px 9px 9px 5px;border-radius:7px;overflow:hidden}
.cp-cursor{position:absolute;z-index:7;width:22px;height:22px;pointer-events:none;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 22'%3E%3Cpath d='M3 1.5v17.2l4.3-4.1 2.9 6.6 2.9-1.3-2.8-6.5h6z' fill='%23fff' stroke='%23242424' stroke-width='1.3' stroke-linejoin='round'/%3E%3C/svg%3E") 0 0/22px no-repeat;
  filter:drop-shadow(0 1px 2px rgba(0,0,0,.25))}
.cp-cursor > span{position:absolute;left:20px;top:22px;padding:4px 10px;border-radius:6px;background:#242424;border:1px solid #fff;color:#fff;font-size:12px;font-weight:600;line-height:16px;white-space:nowrap;box-shadow:var(--sh4)}
/* The prompt while Copilot works: "Working on it. What's next?" and a stop button in place of send. */
.cpa-send.stop{background:var(--bg1);color:var(--fg1);border:1px solid var(--stroke1)}
.cpa-send.stop .ic{width:16px;height:16px}
/* Office document side by side with the chat */
/* Document pane: Word (or Excel, PowerPoint) open next to the chat.  .cpa-pane-head
   holds the file mark and name, then .doc-acts (round comment / edit / share buttons), "Open in Word" (primary), more,
   close; .doc-tabs is the ribbon's tab row; the page uses Word's default styles (Title, Heading 1, Heading 2). */
.cpa-pane-head .doc-name{font-weight:400;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.doc-acts{display:flex;align-items:center;gap:6px;margin-right:4px}
.doc-acts .btn.icon{width:30px;height:30px;border-radius:50%;border:1px solid var(--stroke1);background:var(--bg1)}
.doc-acts .btn.icon .ic{width:16px;height:16px}
.doc-tabs{height:36px;flex:none;display:flex;align-items:center;gap:20px;padding:0 18px;border-bottom:1px solid var(--stroke2);font-size:13px;color:var(--fg2)}
.doc-tabs > .on{color:var(--fg1);font-weight:600}
.cpa-doc{flex:1;min-height:0;overflow:hidden;background:#f0f0f0;padding:20px 24px}
.cpa-doc .page{max-width:640px;margin:0 auto;padding:44px 52px;background:var(--bg1);border:1px solid #e0e0e0;box-shadow:0 1px 2px rgba(0,0,0,.06);font-family:Aptos,"Segoe UI",Calibri,var(--font);font-size:13px;line-height:20px;color:#000}
.cpa-doc .page h1{margin:0 0 14px;font-family:"Aptos Display",Aptos,"Segoe UI",var(--font);font-size:28px;line-height:34px;font-weight:400;color:#000}
.cpa-doc .page h2{margin:18px 0 8px;font-family:"Aptos Display",Aptos,"Segoe UI",var(--font);font-size:20px;line-height:26px;font-weight:400;color:#0f4761}
.cpa-doc .page h3{margin:14px 0 6px;font-size:15px;line-height:20px;font-weight:400;color:#0f4761}
.cpa-doc .page .sub{color:#595959;font-size:14px}
.cpa-doc .page p{margin:0 0 8px}
.cpa-doc .page :is(ol,ul){margin:0 0 8px;padding-left:28px}
.cpa-doc .page li{margin:0 0 2px}
.cpa-doc .page ol ol{list-style:lower-alpha;margin:2px 0 4px}
/* Autopilot overview: the agent's own identity, what it has been doing, what needs you */
.cpa-over{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column;align-items:center;gap:24px;padding:36px 48px 0}
.cpa-over > *{width:100%;max-width:820px}
.ap-av{width:52px;height:52px;flex:none;border-radius:var(--r-xl);display:inline-flex;align-items:center;justify-content:center;background:var(--cp-grad)}
.ap-av .ic{width:60%;height:60%;fill:#fff}
.ap-av.sm{width:22px;height:22px;border-radius:var(--r-md)}
.ap-hello{display:flex;align-items:center;gap:18px}
.ap-hello .cpa-hello{padding-left:0}
.feed{display:flex;flex-direction:column}
.feed-head{display:flex;align-items:center;justify-content:space-between;padding-bottom:4px;font-size:14px;font-weight:600}
.feed-head span{font-weight:400;color:var(--fg2)}
.feed-day{margin:10px 0 2px;font-size:13px;font-weight:600;color:var(--fg3)}
.feed-item{display:grid;grid-template-columns:52px 28px minmax(0,1fr) auto;gap:12px;align-items:start;padding:8px 0;position:relative}
.feed-item:not(:last-child)::before{content:"";position:absolute;left:78px;top:40px;bottom:-4px;width:1px;background:var(--stroke1)}
.feed-item .t{font-size:13px;line-height:28px;color:var(--fg3);font-variant-numeric:tabular-nums;white-space:nowrap}
.feed-item .dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--bg1);border:1px solid var(--stroke1);color:var(--fg2)}
.feed-item .dot .ic{width:16px;height:16px}
.feed-item b{display:block;font-size:15px;line-height:22px;font-weight:600}
.feed-item .det{display:flex;align-items:center;gap:6px;font-size:13px;line-height:18px;color:var(--fg2)}
.feed-item.need .dot{background:var(--warning-bg);border-color:var(--warning-stroke);color:var(--warning-fg)}

/* ---------- Teams (new Teams, light, as of late 2026) ----------
   Grey frame and icon-only app rail; a compact chat list (filter pills, sections, 20 px avatars); a white chat canvas
   with a centred conversation column: your own messages right-aligned in lavender, others' in light grey with their
   avatar, date separators centred; a compose box with its icon row.  Older markup (rail labels) still works. */
.tm{position:absolute;inset:0;display:flex;flex-direction:column;background:var(--teams-bg);--app:var(--teams)}
.tm-bar{height:40px;flex:none;display:flex;align-items:center;gap:6px;padding:0 0 0 10px;font-size:12px}
.tm-bar > .ic{width:16px;height:16px;color:var(--fg2)}
.tm-bar .search{flex:0 1 640px;margin:0 auto;height:28px;border:1px solid var(--stroke2);border-radius:var(--r-md);font-size:13px;color:var(--fg3)}
.tm-bar .search .ic{width:16px;height:16px}
.tm-org{display:flex;align-items:center;gap:8px;color:var(--fg2);padding-right:4px}
.tm-bar .cpa-win > i{width:44px}
.tm-body{flex:1;display:flex;min-height:0}
.tm-rail{width:52px;flex:none;display:flex;flex-direction:column;align-items:center;gap:6px;padding-top:6px}
.tm-rail > *{width:40px;height:36px;display:flex;align-items:center;justify-content:center;font-size:0;color:var(--fg2);border-radius:var(--r-md);position:relative}
.tm-rail > * .ic{width:20px;height:20px}
.tm-rail > .on{color:var(--teams);background:rgba(255,255,255,.6)}
.tm-rail .badge{position:absolute;top:3px;right:5px;min-width:15px;height:15px;padding:0 4px;box-sizing:border-box;border-radius:8px;background:#c4314b;color:#fff;font-size:11px;line-height:15px;font-weight:600;text-align:center}
.tm-list{width:330px;flex:none;background:#f5f5f5;border-radius:var(--r-xl) 0 0 0;display:flex;flex-direction:column;border-right:1px solid var(--stroke2);overflow:hidden}
.tm-list-head{height:52px;flex:none;display:flex;align-items:center;gap:14px;padding:0 14px 0 26px;font-size:18px;font-weight:700}
.tm-list-head .ic{width:18px;height:18px;color:var(--fg2)}
.tm-pills{display:flex;gap:4px;padding:0 14px 8px 26px;flex:none}
.tm-pills > span{height:22px;display:flex;align-items:center;padding:0 8px;border:1px solid var(--stroke1);border-radius:999px;font-size:11px;color:var(--fg2);background:var(--bg1)}
.tm-pills > .on{border-color:var(--teams);color:var(--teams);background:#e8ebfa}
.tm-sec{display:flex;align-items:center;gap:4px;height:26px;padding:0 14px;margin-top:4px;font-size:12px;color:var(--fg2)}
.tm-sec .ic{width:12px;height:12px}
.tm-item{display:flex;gap:10px;align-items:center;min-height:28px;margin:0 12px;padding:3px 14px;border-radius:var(--r-md);font-size:13px;color:var(--fg1)}
.tm-item .avatar{width:20px;height:20px;font-size:9px;flex:none}
.tm-item .avatar .pres{width:7px;height:7px}
.tm-item.sel{background:var(--bg1);box-shadow:0 0 0 1px var(--stroke2)}
.tm-item.unread{font-weight:600}
.tm-item .n{margin-left:auto;min-width:16px;height:16px;padding:0 4px;box-sizing:border-box;border-radius:8px;background:var(--teams);color:#fff;font-size:11px;line-height:16px;font-weight:600;text-align:center}
.tm-item .prev{display:none}
.tm-main{flex:1;min-width:0;display:flex;flex-direction:column;background:var(--bg1)}
.tm-head{height:52px;flex:none;display:flex;align-items:center;gap:10px;padding:0 16px 0 20px;border-bottom:1px solid var(--stroke2);font-weight:700;font-size:16px}
.tm-head .avatar{width:28px;height:28px;font-size:11px}
.tm-head .tabs{height:52px;margin-left:8px;font-weight:400;gap:0}
.tm-head .tabs > *{font-size:14px;color:var(--fg2);padding:0 9px}
.tm-head .tabs > .on{color:var(--fg1);font-weight:600}
.tm-head .tabs > .on::after{background:var(--teams);bottom:0;left:9px;right:9px}
.tm-head .end{margin-left:auto;display:flex;gap:14px;color:var(--fg2)}
.tm-head .end .ic{width:18px;height:18px}
.tm-chat{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;gap:14px;padding:16px max(24px,calc((100% - 760px) / 2)) 14px;background:var(--bg1);
  -webkit-mask-image:linear-gradient(to bottom,transparent,#000 20px);mask-image:linear-gradient(to bottom,transparent,#000 20px)}
.tm-date{align-self:center;font-size:12px;color:var(--fg3);margin:4px 0}
.tm-msg{display:flex;gap:10px;align-items:flex-start;max-width:640px}
.tm-msg .bubble{background:#f5f5f5;border-radius:var(--r-lg);padding:8px 12px 9px;font-size:14px;line-height:20px;color:var(--fg1)}
.tm-msg .meta{font-size:12px;color:var(--fg3);margin-bottom:3px}
.tm-msg .meta b{color:var(--fg2);font-weight:600;margin-right:8px}
.tm-msg .avatar{width:32px;height:32px;font-size:12px;flex:none}
.tm-msg.me{align-self:flex-end;flex-direction:row-reverse}
.tm-msg.me .meta{text-align:right}
.tm-msg.me .bubble{background:#e8ebfa}
.tm-msg .bubble .acard{background:var(--bg1);box-shadow:none;border:1px solid var(--stroke2)}
.tm-compose{flex:none;margin:0 max(24px,calc((100% - 760px) / 2)) 14px;border-radius:var(--r-lg);background:var(--bg1);border:1px solid var(--stroke1);height:40px;display:flex;align-items:center;gap:14px;padding:0 12px;color:var(--fg3);font-size:13px}
.tm-compose .tools{margin-left:auto;display:flex;align-items:center;gap:14px;color:var(--fg2)}
.tm-compose .ic{width:18px;height:18px}

/* ---------- Dynamics 365 (model-driven app, new look) ----------
   White top bar: waffle, "Dynamics 365" | app, a bordered search, then .tools (new, settings, help, notifications),
   the .d3-copilot button and the avatar.  A site map on the page background (.d3-nav: menu, Home / Recent / Pinned
   with chevrons, bold group headers, compact rows, the .area switcher at the bottom).  Content on a floating white
   panel (.d3-page; .home for a dashboard of .d3-card).  Copilot's side pane (.d3-cp) and the side rail (.d3-rail) on
   the right, only when the story's work happens in Dynamics 365 (the Copilot app stays the default home). */
.m365.d3{background:#fafafa}
.d3{--app:#0f6cbd}
.d3-bar{height:48px;flex:none;display:flex;align-items:center;gap:10px;padding:0 10px 0 0;background:var(--bg1);border-bottom:1px solid var(--stroke2)}
.d3-bar .waffle{width:48px;height:48px;display:flex;align-items:center;justify-content:center;color:var(--fg2)}
.d3-bar .app-name{font-size:14px;font-weight:600;white-space:nowrap}
.d3-bar .app-name span{font-weight:400;color:var(--fg2);padding-left:10px;margin-left:10px;border-left:1px solid var(--stroke1)}
.d3-bar .search{flex:0 1 360px;margin:0 auto;height:30px;background:var(--bg1);border:1px solid var(--stroke1);border-radius:var(--r-md);font-size:13px}
.d3-bar .search .ic{width:16px;height:16px}
.d3-bar .tools{display:flex;align-items:center;gap:16px;color:var(--fg2);margin-right:4px}
.d3-bar .tools .ic{width:18px;height:18px}
.d3-copilot{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px 0 8px;border:1px solid var(--stroke1);border-radius:999px;background:var(--bg1);font-size:13px;color:var(--fg1);white-space:nowrap}
.d3-copilot.on{border-color:#b9a9ef;background:#f6f3fd}
.d3-copilot .oi{width:18px;height:18px}
.d3-nav{width:200px;flex:none;background:transparent;padding:2px 6px 34px;display:flex;flex-direction:column;gap:1px;overflow:hidden}
.d3-nav > *{display:flex;align-items:center;gap:10px;height:30px;flex:none;padding:0 10px;border-radius:var(--r-md);font-size:13px;color:var(--fg1)}
.d3-nav > * > .ic{width:18px;height:18px;color:var(--fg2)}
.d3-nav > * > .ic.chev{margin-left:auto;width:14px;height:14px}
.d3-nav > .menu{height:36px}
.d3-nav > .hdr{font-size:13px;font-weight:600;color:var(--fg1);margin-top:8px;height:28px}
.d3-nav > .on{background:var(--bg1);font-weight:600;box-shadow:var(--sh2);position:relative}
.d3-nav > .on::before{content:"";position:absolute;left:0;top:7px;bottom:7px;width:3px;border-radius:2px;background:var(--brand)}
.d3-nav > .area{margin-top:auto;height:40px;border-top:1px solid var(--stroke2);border-radius:0}
.d3-nav > .area .sq{width:20px;height:20px;flex:none;border-radius:4px;background:var(--bg4);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:var(--fg2)}
.d3-page{flex:1;min-width:0;display:flex;flex-direction:column;background:var(--bg3);overflow:hidden;margin:6px 8px 10px 4px;border-radius:var(--r-xl);box-shadow:var(--sh4)}
.d3-page.home{background:var(--bg1)}
.d3-home-head{height:56px;flex:none;display:flex;align-items:center;padding:0 24px}
.d3-home-head .tabs{height:56px}
.d3-home-head .tabs > *{font-size:13px}
.d3-home-head .end{margin-left:auto;display:flex;align-items:center;gap:6px;font-size:13px;color:var(--fg1)}
.d3-dash{flex:1;min-height:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;padding:4px 24px 24px;align-content:start;overflow:hidden}
.d3-card{background:var(--bg1);border:1px solid var(--stroke2);border-radius:var(--r-md);box-shadow:0 1px 3px rgba(0,0,0,.08);display:flex;flex-direction:column;min-height:200px;min-width:0}
.d3-card > .hd{height:40px;flex:none;display:flex;align-items:center;gap:6px;padding:0 12px;border-bottom:1px solid var(--stroke2);font-size:13px;font-weight:600}
.d3-card > .hd .ic{width:14px;height:14px;color:var(--fg2)}
.d3-card > .hd .all{margin-left:auto;display:flex;align-items:center;gap:2px;font-size:12px;font-weight:400;color:var(--brand)}
.d3-card > .hd .all .ic{color:var(--brand)}
.d3-card > .bd{flex:1;min-height:0;padding:10px 12px;font-size:13px;line-height:18px;display:flex;flex-direction:column;gap:8px}
.d3-card .empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--fg2);font-size:12px;text-align:center}
.d3-card .empty .ic{width:32px;height:32px;padding:7px;box-sizing:border-box;border-radius:50%;background:var(--bg3)}
.d3-kpis{display:grid;grid-template-columns:repeat(3,1fr);margin:4px 0}
.d3-kpis > div{display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 6px;border-right:1px solid var(--stroke2);border-bottom:1px solid var(--stroke2);font-size:12px;font-weight:600}
.d3-kpis > div:nth-child(3n){border-right:0}
.d3-kpis > div:nth-last-child(-n+3){border-bottom:0}
.d3-kpis b{font-size:24px;line-height:32px}
.d3-cp{width:var(--cp-w,340px);flex:none;margin:6px 2px 10px 0;background:var(--bg1);border-radius:var(--r-xl);box-shadow:var(--sh4);display:flex;flex-direction:column;overflow:hidden}
.d3-cp-head{height:44px;flex:none;display:flex;align-items:center;gap:8px;padding:0 8px 0 12px;font-size:16px;font-weight:600}
.d3-cp-head .oi{width:20px;height:20px}
.d3-cp-head .btn.icon,.d3-cp-sub .btn.icon{margin-left:auto;border:0;background:transparent;color:var(--fg2)}
.d3-cp-sub{height:34px;flex:none;display:flex;align-items:center;gap:6px;padding:0 8px 0 12px;color:var(--fg2)}
.d3-cp-sub .ic{width:16px;height:16px}
.d3-cp-sub .end{margin-left:auto;display:flex;align-items:center;gap:10px}
.d3-cp-body{flex:1;min-height:0;overflow:hidden;padding:14px 16px;display:flex;flex-direction:column;gap:10px;font-size:13px;line-height:19px}
.d3-cp-body > h2{margin:10px 0 4px;font-size:22px;line-height:28px;font-weight:400}
.d3-cp-body > .sug{align-self:flex-start;padding:6px 10px;border-radius:var(--r-lg);background:var(--bg3);color:var(--fg1)}
.d3-cp .cp-user{font-size:13px;line-height:19px;padding:8px 12px;background:#efefef;border-radius:14px}
.d3-cp .cp-turn{font-size:13px;line-height:19px}
.d3-cp .cp-resp{background:transparent;box-shadow:none;padding:0;border-radius:0}
.d3-cp-prompt{flex:none;margin:8px 12px 12px;height:42px;border:1px solid var(--stroke1);border-radius:21px;display:flex;align-items:center;gap:10px;padding:0 8px 0 12px;color:var(--fg3);font-size:13px}
.d3-cp-prompt .end{margin-left:auto;display:flex;align-items:center;gap:10px;color:var(--fg2)}
.d3-cp-prompt .ic{width:18px;height:18px}
.d3-rail{width:36px;flex:none;display:flex;flex-direction:column;align-items:center;gap:16px;padding-top:12px;color:var(--fg2)}
.d3-rail .ic{width:18px;height:18px}
.d3-rail .on{color:var(--brand)}
.d3-cmd{height:44px;flex:none;display:flex;align-items:center;gap:2px;padding:0 12px;background:var(--bg1);border-bottom:1px solid var(--stroke2)}
.d3-cmd .btn{font-weight:400;border:0;background:transparent}
.d3-cmd .btn .ic{color:var(--brand)}
.d3-head{padding:16px 24px 0;background:var(--bg1);display:flex;flex-direction:column;gap:12px}
.d3-title{display:flex;align-items:center;gap:14px}
.d3-title .name{font-size:24px;line-height:32px;font-weight:600}
.d3-title .type{font-size:14px;color:var(--fg3)}
.d3-headfields{margin-left:auto;display:flex;gap:28px}
.d3-headfields .field > div{font-weight:600}
.d3-head .tabs{margin:0 -10px}
.bpf{display:flex;align-items:center;gap:0;height:56px;margin:12px 24px 0;padding:0 8px;background:var(--bg1);border-radius:var(--r-xl);box-shadow:var(--sh2)}
.bpf .stage-step{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;height:36px;font-size:13px;color:var(--fg3);position:relative}
.bpf .stage-step::before{content:"";width:12px;height:12px;border-radius:50%;border:2px solid var(--stroke1);background:var(--bg1)}
.bpf .stage-step.done::before{border-color:var(--brand);background:var(--brand)}
.bpf .stage-step.on{color:var(--fg1);font-weight:600}
.bpf .stage-step.on::before{border-color:var(--brand);box-shadow:0 0 0 3px var(--brand-bg2)}
.bpf .stage-step + .stage-step::after{content:"";position:absolute;left:-30%;width:40%;top:50%;height:2px;background:var(--stroke2)}
.d3-content{flex:1;min-height:0;display:grid;gap:12px;padding:12px 24px 24px;grid-template-columns:1fr 1fr 1fr;align-content:start;overflow:hidden}
.section{background:var(--bg1);border-radius:var(--r-xl);box-shadow:var(--sh2);padding:16px 20px;display:flex;flex-direction:column;gap:14px;min-width:0}
.section > h3{margin:0;font-size:16px;line-height:22px;font-weight:600;display:flex;align-items:center;gap:8px}
.kv{display:grid;grid-template-columns:150px 1fr;gap:10px 12px;font-size:14px;line-height:20px}
.kv > :nth-child(odd){color:var(--fg3)}
.kv > :nth-child(even){color:var(--fg1);min-width:0}
.timeline{display:flex;flex-direction:column}
.tl-item{display:flex;gap:12px;padding:10px 0;border-top:1px solid var(--stroke3)}
.tl-item:first-child{border-top:0}
.tl-ico{width:32px;height:32px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;background:var(--bg4);color:var(--fg2)}
.tl-item .when{font-size:12px;color:var(--fg3)}
.kpi{display:flex;flex-direction:column;gap:4px}
.kpi .v{font-size:28px;line-height:36px;font-weight:600;font-variant-numeric:tabular-nums}
.kpi .l{font-size:12px;color:var(--fg3)}
.kpi .d{font-size:12px;font-weight:600;color:var(--success-fg)}

/* Highlight what the agent changed or added (use sparingly, one place per scene) */
.ai-touched{position:relative;border-radius:var(--r-lg);box-shadow:0 0 0 2px #fff,0 0 0 4px transparent;background-image:linear-gradient(var(--bg1),var(--bg1)),var(--cp-grad);background-origin:border-box;background-clip:padding-box,border-box;border:2px solid transparent!important}
/* List rows have no side padding and drop the first row's top rule; a highlighted row needs both sides and all four edges */
:is(.tl-item,.acard .item,.log > *).ai-touched{padding-left:12px;padding-right:12px}
:is(.tl-item,.acard .item,.log > *).ai-touched + *{border-top-color:transparent}
.ai-flag{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:600;color:#5b4a9e}
.ai-flag .ic{width:14px;height:14px}

/* ---------- Power BI: visuals and report (Fluent 2 base theme) ----------
   Values from Power BI's Fluent 2 base theme (Fluent2-CY26SU08, the default for new reports): white visual, 1px
   #E6E6E6 border, 8px corners, padding 14/16/16/16, no shadow, title and subtitle on, axis titles off, #616161
   labels, #F0F0F0 gridlines, 3px smooth lines, legend at the bottom, page #FAFAFA on #E6E6E6.  proto.js draws
   <figure class="pbi" data-chart> (references/engine.md); cards, tables and slicers are plain markup. */
.pbi{position:relative;display:flex;flex-direction:column;min-width:0;margin:0;padding:14px 16px 16px;background:#fff;border:1px solid #e6e6e6;border-radius:8px;color:#242424;font-family:var(--font);font-size:12px;line-height:16px}
.pbi-head{display:flex;flex-direction:column;gap:2px;margin:0;padding-right:84px}
.pbi-head > b{font-size:16px;line-height:22px;font-weight:600}
.pbi-head > span{font-size:13px;line-height:18px;color:#616161}
.pbi-icons{position:absolute;top:8px;right:8px;display:flex;color:#616161;opacity:0;transition:opacity var(--t-enter) var(--ease-out)}
.pbi-icons .ic{width:16px;height:16px;margin:4px}
.pbi:hover > .pbi-icons,.pbi.hover > .pbi-icons,.pbi:has(.pbi-tip.in) > .pbi-icons{opacity:1}
.pbi-plot{position:relative;margin-top:16px}
.pbi-plot svg{display:block;overflow:visible}
.pbi svg text{font-family:var(--font);font-size:12px;fill:#616161}
.pbi svg .dl text,.pbi svg text.dl{fill:#242424}
.pbi svg .gl{stroke:#f0f0f0;stroke-width:1}
.pbi svg .ln{fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.pbi svg .ln.dash{stroke-dasharray:7 5;stroke-linecap:butt}
.pbi svg .ar{opacity:.18}
.pbi svg .cn{stroke:#bdbdbd;stroke-width:1}
.pbi svg .grow{transform-box:fill-box;transform-origin:50% 100%}
.pbi svg .grow.dn{transform-origin:50% 0}
.pbi svg .grow.hz{transform-origin:0 50%}
.pbi svg .grow.hz.dn{transform-origin:100% 50%}
.pbi-legend{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 16px;margin-top:10px;color:#616161}
.pbi-legend > span{display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.pbi-legend i{width:8px;height:8px;border-radius:50%;background:var(--c)}
/* Tooltip: <div class="pbi-tip" data-at="Oct" data-beat="n"> in the figure; proto.js fills it and puts it on the point */
.pbi-tip{position:absolute;inset:0;z-index:2;pointer-events:none}
.pbi-tip[data-beat].in{animation-name:beat-fade}
.pbi-tip .box{position:absolute;display:grid;grid-template-columns:auto auto;gap:4px 16px;padding:8px 12px;border-radius:4px;background:#fff;box-shadow:var(--sh8);color:#616161;white-space:nowrap}
.pbi-tip .box b{font-weight:600;color:#242424;text-align:right}
.pbi-tip .box .hd{grid-column:1 / -1;font-weight:600;color:#242424}
.pbi-tip .dot{position:absolute;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:var(--c);box-shadow:0 0 0 2px #fff}
.pbi-tip.hov{display:none}
.pbi-plot.hov > .pbi-tip.hov{display:block}
.pbi-plot.hov > .pbi-tip:not(.hov){visibility:hidden}
/* Card visual: label above the value, reference labels under a divider.  Put several in .pbi-cards. */
.pbi-cards{display:grid;grid-auto-columns:minmax(0,1fr);grid-auto-flow:column;gap:12px}
.pbi.card{gap:2px}
.pbi.card .l{font-size:13px;line-height:18px;color:#616161}
.pbi.card .v{font-size:28px;line-height:36px;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}
.pbi.card .r{display:flex;justify-content:space-between;gap:12px;margin-top:8px;padding-top:8px;border-top:1px solid #e0e0e0;color:#616161;white-space:nowrap}
.pbi.card .r b{font-weight:600;color:#242424}
.pbi .up{color:var(--success-fg)!important}.pbi .down{color:var(--danger-fg)!important}
/* Table visual: no horizontal gridlines, dark rule under the header and over the total */
.pbi table{width:100%;margin-top:12px;border-collapse:collapse;font-variant-numeric:tabular-nums}
.pbi th{padding:5px 8px;border-bottom:1px solid #242424;text-align:left;font-weight:600;white-space:nowrap}
.pbi td{padding:5px 8px;white-space:nowrap}
.pbi :is(th,td).n{text-align:right}
.pbi tr.tot td{border-top:1px solid #242424;font-weight:600}
/* Slicer: title and a dropdown, on the canvas without a box */
.pbi-slicer{display:flex;flex-direction:column;gap:4px;min-width:0;font-size:12px;line-height:16px;color:#242424}
.pbi-slicer > b{font-weight:600}
.pbi-slicer > span{display:flex;align-items:center;justify-content:space-between;height:30px;padding:0 8px 0 10px;border:1px solid #d1d1d1;border-radius:4px;background:#fff;font-size:13px}
.pbi-slicer .ic{width:14px;height:14px;color:#616161}
/* Report in the Power BI service, for Copilot's browser pane (.cpa-page) or a full screen */
.pbi-app{position:absolute;inset:0;display:flex;flex-direction:column;background:#fff;color:#242424;font-family:var(--font)}
.pbi-bar{height:40px;flex:none;display:flex;align-items:center;gap:8px;padding:0 6px 0 10px;border-bottom:1px solid #e0e0e0;font-size:13px;white-space:nowrap}
.pbi-bar .crumb{min-width:0;overflow:hidden;text-overflow:ellipsis;color:#616161}
.pbi-bar .crumb b{font-weight:600;color:#242424}
.pbi-bar .end{margin-left:auto;display:flex;align-items:center;gap:2px}
.pbi-act{height:40px;flex:none;display:flex;align-items:center;gap:2px;padding:0 6px;border-bottom:1px solid #e0e0e0;font-size:13px}
.pbi-act > span{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 8px;border-radius:4px;white-space:nowrap}
.pbi-act .ic{width:16px;height:16px;color:#616161}
.pbi-main{flex:1;min-height:0;display:flex}
.pbi-canvas{flex:1;min-width:0;overflow:hidden;padding:12px;background:#e6e6e6}
.pbi-page{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));align-items:start;gap:12px;padding:12px;background:#fafafa}
.pbi-filters{width:32px;flex:none;display:flex;flex-direction:column;align-items:center;gap:8px;padding-top:10px;border-left:1px solid #e0e0e0;background:#fff;font-size:12px}
.pbi-filters > span{writing-mode:vertical-rl}
.pbi-filters .ic{width:16px;height:16px;color:#616161}
.pbi-tabs{height:34px;flex:none;display:flex;align-items:stretch;padding:0 8px;border-top:1px solid #e0e0e0;background:#f5f5f5;font-size:12px}
.pbi-tabs > span{display:flex;align-items:center;padding:0 14px;color:#616161;white-space:nowrap}
.pbi-tabs > .on{background:#fff;color:#242424;font-weight:600}
/* Pages pane: how the service lists a report's pages full screen (bottom tabs suit the smaller browser pane) */
.pbi-pages{width:208px;flex:none;display:flex;flex-direction:column;gap:2px;padding:12px 8px;border-right:1px solid #e0e0e0;background:#fff;font-size:13px;line-height:18px}
.pbi-pages > b{padding:0 8px 8px;font-weight:600}
.pbi-pages > span{padding:7px 8px;border-radius:4px;color:#424242;white-space:nowrap}
.pbi-pages > .on{background:#f0f0f0;color:#242424;font-weight:600}
.oi .ic{width:14px;height:14px}
.chip .oi,.ref .oi{width:18px;height:18px}

/* ---------- Tredence frame (cover, content, section, divider, ask, closing) ----------
   The Tredence 2026 PowerPoint template at half size: 1920 x 1080 here = 3840 x 2160 in pptx-tredence, so every
   template coordinate is divided by 2.  The chrome (top rule, brand squares, footer, T, cover band, wordmark, client
   tag, section banner, closing photo) is drawn by ::before and by the script at the end of this file.  Never draw it
   yourself and never put content over it.  Position frame content absolutely (.td-abs or inline left/top/width). */
.frame{background:#fff;color:#000;font-family:var(--td-font);font-weight:400}
.frame::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background-repeat:no-repeat}
.frame > *{z-index:2}
.frame > .td-photo,.frame > .td-shade{z-index:0}
.frame.td-content::before{
  background-image:url(kit/brand/t-orange.svg),url(kit/brand/chrome/top-rule.svg),linear-gradient(#fe5000,#fe5000),linear-gradient(#6dcdb8,#6dcdb8),linear-gradient(#004e42,#004e42),linear-gradient(#fe5000,#fe5000),linear-gradient(#fe5000,#fe5000),linear-gradient(#d9d9d9,#d9d9d9);
  background-position:1848px 1037px,-67px 0,1814px 20px,1848px 20px,1882px 20px,930px 1046.5px,979.5px 1046.5px,0 1022.5px;
  background-size:28.5px 30px,1852px 9px,22px 22px,22px 22px,22px 22px,11px 4.5px,11px 4.5px,1920px 1px}
.frame.td-cover::before{
  background-image:url(kit/brand/wordmark-white.svg),url(kit/brand/chrome/cover-tag-arrow.svg),url(kit/brand/chrome/cover-tag.svg),url(kit/brand/chrome/cover-band.svg),url(kit/brand/t-orange.svg),linear-gradient(#fe5000,#fe5000),linear-gradient(#fe5000,#fe5000),linear-gradient(#d9d9d9,#d9d9d9);
  background-position:64.5px 82px,350px 208.5px,64.5px 213px,0 775px,1848px 1037px,930px 1046.5px,979.5px 1046.5px,0 1022.5px;
  background-size:263.5px 29px,49px 49px,363px 38.5px,1920px 248px,28.5px 30px,11px 4.5px,11px 4.5px,1920px 1px}
.frame.td-section::before{
  background-image:url(kit/brand/t-orange.svg),url(kit/brand/chrome/section-banner.svg),linear-gradient(#fe5000,#fe5000),linear-gradient(#fe5000,#fe5000),linear-gradient(#d9d9d9,#d9d9d9);
  background-position:1848px 1037px,0 0,930px 1046.5px,979.5px 1046.5px,0 1022.5px;
  background-size:28.5px 30px,1466.5px 1023px,11px 4.5px,11px 4.5px,1920px 1px}
.frame.td-divider{background:#fe5000;color:#fff}
.frame.td-ask{background:#404041;color:#fff}
.frame.td-closing::before{
  background-image:url(kit/brand/chrome/cover-band.svg),url(kit/brand/chrome/closing-photo.jpg);
  background-position:0 832px,0 0;background-size:1920px 248px,1920px 1080px}
/* Chrome text, added to frame scenes by the script at the end of this file (aria-hidden, not part of the story) */
.td-ch{position:absolute;z-index:1;margin:0;white-space:nowrap;pointer-events:none;line-height:1.2;font-family:var(--td-font)}
.td-ch-copy{left:0;top:1042.5px;width:475.5px;text-align:right;font-size:18px;color:#7f7f7f}
.td-ch-num{left:930px;top:1040px;width:60px;text-align:center;font-size:20px;color:#898989}
.td-ch-tag{left:1536.5px;top:791.5px;width:325.5px;text-align:center;font-size:32px;font-weight:800;color:#fff}
.td-ch-hash{left:32.5px;top:81.5px;font-size:48px;font-weight:700;line-height:1.26;color:#fff}
.td-ch-close{left:112.5px;top:474.5px;width:1695.5px;text-align:center;font-size:108px;font-weight:700;line-height:1.4;color:#fff}
/* Photos: cover = above the band; ask = full bleed.  .td-shade is the Charcoal fade that keeps white text readable
   (--a0 left alpha, --a1 right alpha).  The only gradient the frame allows. */
.td-photo,.td-shade{position:absolute;left:0;top:0;width:1920px;height:1080px}
.td-cover > .td-photo,.td-cover > .td-shade{height:774.5px}
.td-photo{background:#404041 center/cover no-repeat}
.td-shade{background:linear-gradient(90deg,rgba(64,64,65,var(--a0,0)),rgba(64,64,65,var(--a1,var(--a0,0))))}
/* Type (Poppins only; 1920-stage px = template px / 2) */
.td-abs{position:absolute;margin:0}
.td-reg{font-weight:400}.td-med{font-weight:500}.td-semi{font-weight:600}.td-bold{font-weight:700}.td-xbold{font-weight:800}
.td-kicker{font-size:24px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--td-orange);white-space:nowrap;line-height:1.2}
.td-title{font-size:64px;font-weight:700;line-height:1.15;color:#000}
.td-hl{color:var(--td-orange)}
.td-lead{font-size:32px;line-height:1.35;color:var(--td-charcoal)}
.td-cover-tag{font-size:20px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#fff;white-space:nowrap;line-height:34.5px}
.td-cover-title{font-size:64px;font-weight:700;line-height:1.12;text-transform:uppercase;color:#fff}
.td-cover-sub{font-size:36px;font-weight:600;line-height:1.3;color:#fff}
.td-cname{font-size:36px;font-weight:700;line-height:1.15;color:#000}
.td-cdesc{font-size:27px;line-height:1.4;color:var(--td-charcoal)}
.td-callout{font-size:29px;font-weight:500;line-height:1.3;color:var(--td-charcoal)}
.td-small{font-size:20px;line-height:1.35;color:var(--td-charcoal)}
.td-label{font-size:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--td-deep-orange);white-space:nowrap;line-height:1.2}
/* Surfaces: flat colour on white.  No gradients, glows, glass or shadows. */
.td-card{position:absolute;box-sizing:border-box;background:#fff;border:1.5px solid var(--td-off-white);border-radius:12px}
.td-panel{position:absolute;background:var(--td-off-white);border-radius:12px}
.td-tint{position:absolute;background:var(--td-orange-tint)}
.td-tint-teal{position:absolute;background:var(--td-teal-tint)}
.td-accent{position:absolute;width:8px;background:var(--td-orange)}
.td-num{position:absolute;display:grid;place-items:center;background:var(--td-orange);color:#fff;font-weight:700}
.td-badge{position:absolute;display:grid;place-items:center;border-radius:50%;background:var(--td-orange);color:#fff;font-weight:700}
.td-bar{position:absolute;display:flex;align-items:center;padding:0 20px;box-sizing:border-box;background:var(--td-orange);color:#fff;font-size:26px;font-weight:700;white-space:nowrap}
.td-pillh{position:absolute;display:flex;align-items:center;justify-content:center;border-radius:50px;background:var(--td-orange);color:#fff;font-size:24px;font-weight:700;white-space:nowrap}
.td-band{position:absolute;display:flex;align-items:center;padding:0 32px;box-sizing:border-box;background:var(--td-charcoal);border-radius:8px;color:#fff;font-size:24px;line-height:1.35}
.td-rule{position:absolute;height:1.5px;background:var(--td-off-white)}
.td-stat{font-weight:700;line-height:1.15;color:var(--td-orange);white-space:nowrap}
.td-stat-label{font-size:22px;font-weight:700;line-height:1.3;color:#000}
.td-cta{display:inline-flex;align-items:center;gap:16px;height:72px;padding:0 30px;box-sizing:border-box;border-radius:50px;background:var(--td-orange);color:#fff;font-size:30px;font-weight:600;white-space:nowrap}
.td-cta .ic{fill:#fff;width:32px;height:32px}
.td-bul{list-style:none;padding:0;margin:0}
.td-bul li{position:relative;padding-left:20px}
.td-bul li+li{margin-top:8px}
.td-bul li::before{content:"\2022";position:absolute;left:0;color:var(--td-orange)}
.frame .ic{fill:currentColor}
/* Fluent icon on a frame scene: size and place the wrapper (<div class="td-ico" style="left;top;width;height">);
   the <i class="ic"> inside is swapped for an SVG and keeps only its class */
.td-ico{position:absolute;color:var(--td-orange)}
.td-ico .ic{width:100%;height:100%}

@media (prefers-reduced-motion:reduce){
  [data-beat].in,.cpa-pane[data-beat].in{animation:none}
  .spinner,.work li.run::before,.step.run::before,.cues [data-go].cue::after,.work li.done::before,.step.done::before,
  .work li.skill > .plug,.step :is(.on-run,.on-wait,.on-done){animation:none}
  .cp-status > .t,.work li.think.run .on-run,.work li.think > .lbl .ic{animation:none;transition:none}
  .tw.shown,.tw-box.shown{transition:none}
  .work-box.clip > .work > li{transition:none}
  .proto-next{transform:none;transition:none}
  .proto-next svg{animation:none}
  .pbi-tip[data-beat].in{animation:none}
  .pbi-icons{transition:none}
}

/* Microsoft product icons on .oi (app or file mark) and .fav (browser-tab favicon): class="oi teams", "fav d365", ...
   Keys: copilot cstudio automate dataverse d365 sales ado fabric powerbi onelake lakehouse teams outlook word excel
   powerpoint sharepoint onedrive loop (w x p bi still work).  Customer and third-party systems keep a plain tile. */
/* ---------- product icons (generated) ---------- */
/* Official Microsoft product icons, generated by tools/product_logos/build.py from the Power Platform, Dynamics 365 and Azure icon packs, @fabric-msft/svg-icons (MIT) and the Fluent brand-icon CDN. Show each only for its own product, unaltered, with the product name nearby. */
:is(.oi.copilot,.fav.copilot,.oi.cstudio,.fav.cstudio,.oi.automate,.fav.automate,.oi.dataverse,.fav.dataverse,.oi.d365,.fav.d365,.oi.sales,.fav.sales,.oi.ado,.fav.ado,.oi.fabric,.fav.fabric,.oi.powerbi,.fav.powerbi,.oi.bi,.fav.bi,.oi.onelake,.fav.onelake,.oi.lakehouse,.fav.lakehouse,.oi.teams,.fav.teams,.oi.outlook,.fav.outlook,.oi.word,.fav.word,.oi.w,.fav.w,.oi.excel,.fav.excel,.oi.x,.fav.x,.oi.powerpoint,.fav.powerpoint,.oi.p,.fav.p,.oi.ppt,.fav.ppt,.oi.sharepoint,.fav.sharepoint,.oi.onedrive,.fav.onedrive,.oi.loop,.fav.loop){background:transparent center/contain no-repeat;border-radius:0;color:transparent;font-size:0}
:is(.oi.copilot,.fav.copilot,.oi.cstudio,.fav.cstudio,.oi.automate,.fav.automate,.oi.dataverse,.fav.dataverse,.oi.d365,.fav.d365,.oi.sales,.fav.sales,.oi.ado,.fav.ado,.oi.fabric,.fav.fabric,.oi.powerbi,.fav.powerbi,.oi.bi,.fav.bi,.oi.onelake,.fav.onelake,.oi.lakehouse,.fav.lakehouse,.oi.teams,.fav.teams,.oi.outlook,.fav.outlook,.oi.word,.fav.word,.oi.w,.fav.w,.oi.excel,.fav.excel,.oi.x,.fav.x,.oi.powerpoint,.fav.powerpoint,.oi.p,.fav.p,.oi.ppt,.fav.ppt,.oi.sharepoint,.fav.sharepoint,.oi.onedrive,.fav.onedrive,.oi.loop,.fav.loop) > *{display:none}
.oi.copilot,.fav.copilot{background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3E%3Cpath fill='url%28%23ied10f1-paint0_radial_42584_82286%29' d='M14.144 3.35a1.875 1.875 0 0 0-1.8-1.35h-.6c-.897 0-1.668.634-1.84 1.513L8.853 8.85l.297-.959c.244-.785.97-1.32 1.791-1.32h3.294l1.4 1.172 1.246-1.172h-.391c-.833 0-1.566-.55-1.8-1.349z'/%3E%3Cpath fill='url%28%23ied10f1-paint1_radial_42584_82286%29' d='M6.05 16.643A1.875 1.875 0 0 0 7.85 18h1.224c1.01 0 1.838-.8 1.874-1.808l.18-5.05-.287.953a1.875 1.875 0 0 1-1.795 1.333H5.734l-1.384-.885-1.022.886h.385c.836 0 1.571.553 1.802 1.357z'/%3E%3Cpath fill='url%28%23ied10f1-paint2_linear_42584_82286%29' d='M12.25 2H5.688c-1.875 0-3 2.397-3.75 4.795-.889 2.84-2.051 6.64 1.312 6.64h2.861c.833 0 1.564-.547 1.8-1.345.494-1.67 1.354-4.568 2.03-6.776.345-1.126.632-2.092 1.072-2.694.247-.337.66-.62 1.237-.62'/%3E%3Cpath fill='url%28%23ied10f1-paint3_linear_42584_82286%29' d='M12.25 2H5.688c-1.875 0-3 2.397-3.75 4.795-.889 2.84-2.051 6.64 1.312 6.64h2.861c.833 0 1.564-.547 1.8-1.345.494-1.67 1.354-4.568 2.03-6.776.345-1.126.632-2.092 1.072-2.694.247-.337.66-.62 1.237-.62'/%3E%3Cpath fill='url%28%23ied10f1-paint4_radial_42584_82286%29' d='M7.749 18h6.562c1.875 0 3-2.397 3.75-4.793.889-2.84 2.051-6.637-1.312-6.637h-2.862c-.832 0-1.564.546-1.8 1.344a799 799 0 0 1-2.03 6.773c-.344 1.125-.631 2.092-1.072 2.693-.247.338-.658.62-1.236.62'/%3E%3Cpath fill='url%28%23ied10f1-paint5_linear_42584_82286%29' d='M7.749 18h6.562c1.875 0 3-2.397 3.75-4.793.889-2.84 2.051-6.637-1.312-6.637h-2.862c-.832 0-1.564.546-1.8 1.344a799 799 0 0 1-2.03 6.773c-.344 1.125-.631 2.092-1.072 2.693-.247.338-.658.62-1.236.62'/%3E%3Cdefs%3E%3CradialGradient id='ied10f1-paint0_radial_42584_82286' cx='0' cy='0' r='1' gradientTransform='rotate%28-129.141 9.971 .712%29scale%287.20751 6.76953%29' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.096' stop-color='%2300AEFF'/%3E%3Cstop offset='.773' stop-color='%232253CE'/%3E%3Cstop offset='1' stop-color='%230736C4'/%3E%3C/radialGradient%3E%3CradialGradient id='ied10f1-paint1_radial_42584_82286' cx='0' cy='0' r='1' gradientTransform='matrix%284.0792 5.17124 -5.02078 3.9605 4.743 13.4%29' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFB657'/%3E%3Cstop offset='.634' stop-color='%23FF5F3D'/%3E%3Cstop offset='.923' stop-color='%23C02B3C'/%3E%3C/radialGradient%3E%3ClinearGradient id='ied10f1-paint2_linear_42584_82286' x1='5.295' x2='6.172' y1='3.385' y2='13.87' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.156' stop-color='%230D91E1'/%3E%3Cstop offset='.487' stop-color='%2352B471'/%3E%3Cstop offset='.652' stop-color='%2398BD42'/%3E%3Cstop offset='.937' stop-color='%23FFC800'/%3E%3C/linearGradient%3E%3ClinearGradient id='ied10f1-paint3_linear_42584_82286' x1='6.113' x2='6.592' y1='2' y2='13.435' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%233DCBFF'/%3E%3Cstop offset='.247' stop-color='%230588F7' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='ied10f1-paint4_radial_42584_82286' cx='0' cy='0' r='1' gradientTransform='matrix%28-5.18437 14.3365 -17.62744 -6.37443 17.086 5.45%29' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.066' stop-color='%238C48FF'/%3E%3Cstop offset='.5' stop-color='%23F2598A'/%3E%3Cstop offset='.896' stop-color='%23FFB152'/%3E%3C/radialGradient%3E%3ClinearGradient id='ied10f1-paint5_linear_42584_82286' x1='17.604' x2='17.598' y1='5.872' y2='8.985' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.058' stop-color='%23F8ADFA'/%3E%3Cstop offset='.708' stop-color='%23A86EDD' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")}
.oi.cstudio,.fav.cstudio{background-image:url("data:image/svg+xml,%3Csvg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M64.3242 4.77449C52.3121 0.77044 46.3052 -1.23042 42.1523 1.76277C38.0001 4.75619 38 11.0874 38 23.7491V33.9991L28.3242 30.7745C16.3121 26.7705 10.3052 24.7696 6.15234 27.7628C1.99998 30.7562 2 37.0874 2 49.7491V67.585C2 74.5417 1.9996 78.0209 3.88672 80.6397C5.7743 83.2586 9.07559 84.3596 15.6758 86.5596L20.002 87.9991L20 88.0011L33.8906 92.63C41.0527 95.0173 44.634 96.2117 48.2168 95.6612C51.7998 95.1105 54.8577 92.8959 60.9727 88.4678L79.5957 74.9835C84.6242 71.3421 87.5709 69.2032 89.3691 66.7569C89.551 66.5194 89.7213 66.2697 89.8789 66.005C90.0501 65.7303 90.212 65.4518 90.3594 65.1632C91.9996 61.9502 92 58.1948 92 50.6846V28.4151C92 21.4583 92.0007 17.9792 90.1133 15.3604C88.2257 12.7416 84.9244 11.6425 78.3242 9.44246L64.3242 4.77449Z' fill='url%28%23paint0_linear_4303_1230%29'/%3E%3Cpath d='M64.3242 4.77449C52.3121 0.77044 46.3052 -1.23042 42.1523 1.76277C38.0001 4.75619 38 11.0874 38 23.7491V33.9991L28.3242 30.7745C16.3121 26.7705 10.3052 24.7696 6.15234 27.7628C1.99998 30.7562 2 37.0874 2 49.7491V67.585C2 74.5417 1.9996 78.0209 3.88672 80.6397C5.7743 83.2586 9.07559 84.3596 15.6758 86.5596L20.002 87.9991L20 88.0011L33.8906 92.63C41.0527 95.0173 44.634 96.2117 48.2168 95.6612C51.7998 95.1105 54.8577 92.8959 60.9727 88.4678L79.5957 74.9835C84.6242 71.3421 87.5709 69.2032 89.3691 66.7569C89.551 66.5194 89.7213 66.2697 89.8789 66.005C90.0501 65.7303 90.212 65.4518 90.3594 65.1632C91.9996 61.9502 92 58.1948 92 50.6846V28.4151C92 21.4583 92.0007 17.9792 90.1133 15.3604C88.2257 12.7416 84.9244 11.6425 78.3242 9.44246L64.3242 4.77449Z' fill='url%28%23paint1_radial_4303_1230%29'/%3E%3Cpath d='M64.3242 4.77449C52.3121 0.77044 46.3052 -1.23042 42.1523 1.76277C38.0001 4.75619 38 11.0874 38 23.7491V33.9991L28.3242 30.7745C16.3121 26.7705 10.3052 24.7696 6.15234 27.7628C1.99998 30.7562 2 37.0874 2 49.7491V67.585C2 74.5417 1.9996 78.0209 3.88672 80.6397C5.7743 83.2586 9.07559 84.3596 15.6758 86.5596L20.002 87.9991L20 88.0011L33.8906 92.63C41.0527 95.0173 44.634 96.2117 48.2168 95.6612C51.7998 95.1105 54.8577 92.8959 60.9727 88.4678L79.5957 74.9835C84.6242 71.3421 87.5709 69.2032 89.3691 66.7569C89.551 66.5194 89.7213 66.2697 89.8789 66.005C90.0501 65.7303 90.212 65.4518 90.3594 65.1632C91.9996 61.9502 92 58.1948 92 50.6846V28.4151C92 21.4583 92.0007 17.9792 90.1133 15.3604C88.2257 12.7416 84.9244 11.6425 78.3242 9.44246L64.3242 4.77449Z' fill='url%28%23paint2_radial_4303_1230%29'/%3E%3Cpath d='M56 54.4151C56 47.4579 56 43.9793 54.1124 41.3604C52.2248 38.7415 48.9247 37.6415 42.3246 35.4414L28.3246 30.7748C16.312 26.7706 10.3058 24.7685 6.1529 27.7617C2 30.755 2 37.0861 2 49.7484V67.5847C2 74.5419 2 78.0206 3.88758 80.6394C5.77516 83.2583 9.07525 84.3583 15.6754 86.5584L29.6754 91.2251C41.688 95.2292 47.6942 97.2313 51.8471 94.2381C56 91.2448 56 84.9137 56 72.2514V54.4151Z' fill='url%28%23paint3_radial_4303_1230%29'/%3E%3Cpath d='M56 54.4151C56 47.4579 56 43.9793 54.1124 41.3604C52.2248 38.7415 48.9247 37.6415 42.3246 35.4414L28.3246 30.7748C16.312 26.7706 10.3058 24.7685 6.1529 27.7617C2 30.755 2 37.0861 2 49.7484V67.5847C2 74.5419 2 78.0206 3.88758 80.6394C5.77516 83.2583 9.07525 84.3583 15.6754 86.5584L29.6754 91.2251C41.688 95.2292 47.6942 97.2313 51.8471 94.2381C56 91.2448 56 84.9137 56 72.2514V54.4151Z' fill='url%28%23paint4_linear_4303_1230%29'/%3E%3Cpath d='M92 50.6846C92 58.1947 91.9996 61.9501 90.3594 65.1631C90.212 65.4517 90.0501 65.7302 89.8789 66.0049C89.7213 66.2696 89.551 66.5193 89.3691 66.7568C87.5709 69.2031 84.6242 71.3421 79.5957 74.9834L60.9727 88.4678C54.8577 92.8959 51.7998 95.1105 48.2168 95.6611C44.634 96.2116 41.0527 95.0172 33.8906 92.6299L25.2158 89.7393L20 88L20.002 87.999L16.7822 86.9277L15.2217 86.4072C8.92337 84.3067 5.73047 83.1977 3.88672 80.6396C1.99964 78.0208 2 74.5416 2 67.585V49.749C2 48.4323 2.00119 47.1841 2.00586 46.001L56 61.501L92 35.001V50.6846Z' fill='url%28%23paint5_radial_4303_1230%29'/%3E%3Cpath d='M38.0742 15.1036C31.3033 13.0668 27.2217 12.5497 24.1523 14.7618C21.0793 16.9767 20.281 21.0195 20.0732 28.1026C22.4635 28.8216 25.1889 29.7306 28.3232 30.7754L37.999 34V23.7491C37.999 20.4569 38.0012 17.5925 38.0742 15.1036Z' fill='url%28%23paint6_linear_4303_1230%29'/%3E%3Cpath d='M38.0742 15.1036C31.3033 13.0668 27.2217 12.5497 24.1523 14.7618C21.0793 16.9767 20.281 21.0195 20.0732 28.1026C22.4635 28.8216 25.1889 29.7306 28.3232 30.7754L37.999 34V23.7491C37.999 20.4569 38.0012 17.5925 38.0742 15.1036Z' fill='url%28%23paint7_linear_4303_1230%29' fill-opacity='0.7'/%3E%3Cpath d='M38.0742 15.1035C38.0012 17.5922 38 20.4561 38 23.748V41.585C38 48.5419 38.0002 52.0208 39.8877 54.6396C41.7753 57.2583 45.0758 58.3586 51.6758 60.5586L56 62C64.0027 64.6676 68.0041 66.0014 70.84 64.1408C71.0112 64.0284 71.1774 63.9086 71.3381 63.7817C74 61.6798 74 57.462 74 49.0263V41.415C74 34.4579 73.9999 30.9792 72.1123 28.3604C70.2247 25.7416 66.9243 24.6414 60.3242 22.4414L46.3242 17.7744C43.1901 16.7297 40.4644 15.8225 38.0742 15.1035Z' fill='url%28%23paint8_linear_4303_1230%29'/%3E%3Cpath d='M38.0742 15.1035C38.0012 17.5922 38 20.4561 38 23.748V41.585C38 48.5419 38.0002 52.0208 39.8877 54.6396C41.7753 57.2583 45.0758 58.3586 51.6758 60.5586L56 62C64.0027 64.6676 68.0041 66.0014 70.84 64.1408C71.0112 64.0284 71.1774 63.9086 71.3381 63.7817C74 61.6798 74 57.462 74 49.0263V41.415C74 34.4579 73.9999 30.9792 72.1123 28.3604C70.2247 25.7416 66.9243 24.6414 60.3242 22.4414L46.3242 17.7744C43.1901 16.7297 40.4644 15.8225 38.0742 15.1035Z' fill='url%28%23paint9_radial_4303_1230%29'/%3E%3Cpath d='M20.0742 28.1035C20.0012 30.5922 20 33.4561 20 36.748V54.585C20 61.5421 20.0001 65.0208 21.8877 67.6396C23.7753 70.2584 27.0757 71.3586 33.6758 73.5586L37.975 74.9917C46.0014 77.6671 50.0146 79.0049 52.855 77.1309C53.0159 77.0247 53.1724 76.9119 53.324 76.7928C56 74.6909 56 70.4606 56 62V54.415C56 47.4579 55.9999 43.9792 54.1123 41.3604C52.2247 38.7416 48.9243 37.6414 42.3242 35.4414L28.3242 30.7744C25.1901 29.7297 22.4644 28.8225 20.0742 28.1035Z' fill='url%28%23paint10_linear_4303_1230%29'/%3E%3Cpath d='M38 41.585C38 48.5422 38.0001 52.0208 39.8877 54.6397C41.7753 57.2585 45.0756 58.3585 51.6758 60.5586L56 62V54.415C56 47.4581 55.9998 43.9792 54.1123 41.3604C52.2247 38.7417 48.9242 37.6414 42.3242 35.4414L38 34V41.585Z' fill='url%28%23paint11_linear_4303_1230%29'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_4303_1230' x1='53.5' y1='77' x2='80.9999' y2='9.99998' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%232764E7'/%3E%3Cstop offset='0.307475' stop-color='%238B52F4'/%3E%3Cstop offset='0.544627' stop-color='%23BB45EA'/%3E%3Cstop offset='0.803866' stop-color='%23DB56C6'/%3E%3Cstop offset='1' stop-color='%23F462AB'/%3E%3C/linearGradient%3E%3CradialGradient id='paint1_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2852.5 45%29 rotate%2843.8065%29 scale%2833.9485 21.4653%29'%3E%3Cstop offset='0.549399' stop-color='%235B2AB5'/%3E%3Cstop offset='1' stop-color='%23A931D8' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2844 34%29 rotate%2817.7004%29 scale%2849.3356 24.5964%29'%3E%3Cstop offset='0.527929' stop-color='%239529C2'/%3E%3Cstop offset='1' stop-color='%23DD3CE2' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint3_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2861.3922 89.3373%29 rotate%28-124.89%29 scale%2882.0935 82.0935%29'%3E%3Cstop stop-color='%232764E7'/%3E%3Cstop offset='0.225228' stop-color='%230094F0'/%3E%3Cstop offset='0.443437' stop-color='%2319B2CE'/%3E%3Cstop offset='0.6999' stop-color='%2352D17C'/%3E%3Cstop offset='1' stop-color='%23FFD638'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint4_linear_4303_1230' x1='19.5444' y1='82.7096' x2='53.8452' y2='82.7096' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2316BBDA' stop-opacity='0'/%3E%3Cstop offset='0.535279' stop-color='%230094F0'/%3E%3Cstop offset='1' stop-color='%232764E7'/%3E%3C/linearGradient%3E%3CradialGradient id='paint5_radial_4303_1230' cx='0' cy='0' r='1' gradientTransform='matrix%2823 12.9998 8.90874 -13.0499 43 67.9995%29' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%231B44B1'/%3E%3Cstop offset='1' stop-color='%23367AF2' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint6_linear_4303_1230' x1='33.5' y1='32.5' x2='34' y2='13' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FF9C70'/%3E%3Cstop offset='1' stop-color='%23FFD394'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint7_linear_4303_1230' x1='28.5' y1='24.5' x2='26.5' y2='33' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFB357' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23F24A9D'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint8_linear_4303_1230' x1='58' y1='20' x2='58.5' y2='64.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFB357'/%3E%3Cstop offset='0.380259' stop-color='%23FB6F7B'/%3E%3Cstop offset='0.659779' stop-color='%23F24A9D'/%3E%3Cstop offset='1' stop-color='%23DD3CE2'/%3E%3C/linearGradient%3E%3CradialGradient id='paint9_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2840 54%29 rotate%2812.702%29 scale%2824.0895 24.0895%29'%3E%3Cstop offset='0.567938' stop-color='%23D7257D'/%3E%3Cstop offset='1' stop-color='%23F462AB' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint10_linear_4303_1230' x1='50.03' y1='77.3707' x2='20' y2='25.6869' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%230FAFFF'/%3E%3Cstop offset='0.54828' stop-color='%232BDABE'/%3E%3Cstop offset='0.765945' stop-color='%2388E06C'/%3E%3Cstop offset='1' stop-color='%23FFD638'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint11_linear_4303_1230' x1='36' y1='44.5' x2='53' y2='50.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2376EB95'/%3E%3Cstop offset='1' stop-color='%233BD5FF' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")}
.oi.automate,.fav.automate{background-image:url("data:image/svg+xml,%3Csvg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url%28%23clip0_4303_1230%29'%3E%3Cg clip-path='url%28%23clip1_4303_1230%29'%3E%3Cpath d='M52.5093 3C55.3657 3 58.0858 4.22148 59.9834 6.35636L82.6577 31.8649C88.9106 38.8995 85.0005 50.0661 75.7251 51.6632L21.5 61L28.2997 53.3134C30.9819 50.2813 30.9765 45.7235 28.287 42.6979L7.79435 19.6436C2.06189 13.1946 6.63995 3 15.2684 3H52.5093Z' fill='url%28%23paint0_linear_4303_1230%29'/%3E%3Cpath d='M15.2684 93C6.63995 93 2.0619 82.8054 7.79436 76.3563L59.0945 18.6436C62.4624 14.8548 62.4624 9.14522 59.0945 5.35636L57 3L91.0945 41.3564C94.4624 45.1453 94.4624 50.8548 91.0945 54.6437L59.9834 89.6436C58.0858 91.7785 55.3657 93 52.5093 93H15.2684Z' fill='url%28%23paint1_linear_4303_1230%29'/%3E%3Cpath d='M15.2684 93C6.63995 93 2.0619 82.8054 7.79436 76.3563L59.0945 18.6436C62.4624 14.8548 62.4624 9.14522 59.0945 5.35636L57 3L91.0945 41.3564C94.4624 45.1453 94.4624 50.8548 91.0945 54.6437L59.9834 89.6436C58.0858 91.7785 55.3657 93 52.5093 93H15.2684Z' fill='url%28%23paint2_linear_4303_1230%29'/%3E%3Cpath d='M38.3611 93C33.184 93 30.4371 86.8833 33.8766 83.0139L75.0945 36.6436C78.4624 32.8548 78.4624 27.1452 75.0945 23.3563L71 18.75L91.0945 41.3563C94.4624 45.1452 94.4624 50.8547 91.0946 54.6436L59.9834 89.6437C58.0858 91.7785 55.3657 93 52.5093 93H38.3611Z' fill='url%28%23paint3_linear_4303_1230%29'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_4303_1230' x1='48' y1='31.5' x2='14' y2='-2.50001' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23102784'/%3E%3Cstop offset='0.274053' stop-color='%231B44B1'/%3E%3Cstop offset='1' stop-color='%232764E7'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_4303_1230' x1='76.5' y1='25' x2='11.5' y2='91.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%230FAFFF'/%3E%3Cstop offset='0.177827' stop-color='%234894FE'/%3E%3Cstop offset='1' stop-color='%232764E7'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear_4303_1230' x1='28.5' y1='72' x2='38.5' y2='83.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%232764E7' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%232052CB'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint3_linear_4303_1230' x1='89' y1='38.5' x2='43' y2='90.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%236CE0FF'/%3E%3Cstop offset='0.211723' stop-color='%2366C0FF'/%3E%3Cstop offset='1' stop-color='%2358AAFE'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_4303_1230'%3E%3Crect width='96' height='96' fill='white'/%3E%3C/clipPath%3E%3CclipPath id='clip1_4303_1230'%3E%3Crect width='96' height='96' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")}
.oi.dataverse,.fav.dataverse{background-image:url("data:image/svg+xml,%3Csvg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url%28%23clip0_4303_1230%29'%3E%3Cg clip-path='url%28%23clip1_4303_1230%29'%3E%3Cg clip-path='url%28%23clip2_4303_1230%29'%3E%3Cpath d='M13.8776 21.8242C29.1033 8.13791 49.7501 8.1861 62.955 18.9134C74.9816 28.6836 77.4697 44.3159 70.851 55.7801C64.2321 67.2443 52.5277 70.1455 39.5011 62.6247L31.7286 76.087L31.7234 76.0862C27.4181 83.5324 17.8937 86.0828 10.4437 81.7817C7.45394 80.0556 5.25322 77.4879 3.96665 74.551L3.96096 74.5511C-4.07832 55.7804 0.200745 34.1184 13.8776 21.8242Z' fill='url%28%23paint0_radial_4303_1230%29'/%3E%3Cpath d='M13.8776 21.8242C29.1033 8.13791 49.7501 8.1861 62.955 18.9134C74.9816 28.6836 77.4697 44.3159 70.851 55.7801C64.2321 67.2443 52.5277 70.1455 39.5011 62.6247L31.7286 76.087L31.7234 76.0862C27.4181 83.5324 17.8937 86.0828 10.4437 81.7817C7.45394 80.0556 5.25322 77.4879 3.96665 74.551L3.96096 74.5511C-4.07832 55.7804 0.200745 34.1184 13.8776 21.8242Z' fill='url%28%23paint1_radial_4303_1230%29' fill-opacity='0.8'/%3E%3Cpath d='M85.4327 14.2231C88.4528 15.9668 90.6686 18.569 91.9494 21.5433L91.9533 21.5444C99.9406 40.2943 95.6533 61.9068 81.9983 74.1814C66.7726 87.8677 46.1257 87.8196 32.9209 77.0923C20.8945 67.3221 18.4062 51.6897 25.0249 40.2256C31.6438 28.7614 43.3482 25.8601 56.3748 33.381L64.1434 19.9255L64.1482 19.9249C68.4516 12.4736 77.9805 9.92084 85.4327 14.2231Z' fill='url%28%23paint2_radial_4303_1230%29'/%3E%3Cpath d='M85.4327 14.2231C88.4528 15.9668 90.6686 18.569 91.9494 21.5433L91.9533 21.5444C99.9406 40.2943 95.6533 61.9068 81.9983 74.1814C66.7726 87.8677 46.1257 87.8196 32.9209 77.0923C20.8945 67.3221 18.4062 51.6897 25.0249 40.2256C31.6438 28.7614 43.3482 25.8601 56.3748 33.381L64.1434 19.9255L64.1482 19.9249C68.4516 12.4736 77.9805 9.92084 85.4327 14.2231Z' fill='url%28%23paint3_radial_4303_1230%29' fill-opacity='0.9'/%3E%3Cpath d='M39.5041 62.6261C52.5307 70.1469 64.2352 67.2456 70.8541 55.7814C77.2488 44.7055 75.1426 29.7389 64.147 19.9271L56.3791 33.3814L39.5041 62.6261Z' fill='url%28%23paint4_radial_4303_1230%29'/%3E%3Cpath d='M56.3794 33.3815C43.3528 25.8607 31.6482 28.762 25.0294 40.2262C18.6347 51.3021 20.7409 66.2687 31.7364 76.0806L39.5043 62.6262L56.3794 33.3815Z' fill='url%28%23paint5_radial_4303_1230%29'/%3E%3Cpath d='M33.3215 56.4453C37.9837 64.5204 48.3094 67.2872 56.3846 62.625C64.4598 57.9628 67.2266 47.6371 62.5643 39.5619C57.9021 31.4867 47.5764 28.72 39.5013 33.3822C31.4261 38.0444 28.6593 48.3701 33.3215 56.4453Z' fill='url%28%23paint6_radial_4303_1230%29'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint0_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2846.0001 49.4996%29 rotate%28-148.717%29 scale%2846.2195 47.5359%29'%3E%3Cstop offset='0.465088' stop-color='%2309442A'/%3E%3Cstop offset='0.70088' stop-color='%23136C6C'/%3E%3Cstop offset='1' stop-color='%2322918B'/%3E%3C/radialGradient%3E%3CradialGradient id='paint1_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2850.0001 32.4996%29 rotate%28123.57%29 scale%2866.0095 46.5498%29'%3E%3Cstop offset='0.718705' stop-color='%231A7F7C' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%2316BBDA'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2850.4999 44.5001%29 rotate%2830.75%29 scale%2845.9618 44.5095%29'%3E%3Cstop offset='0.358097' stop-color='%23136C6C'/%3E%3Cstop offset='0.789474' stop-color='%2342B870'/%3E%3Cstop offset='1' stop-color='%2376D45E'/%3E%3C/radialGradient%3E%3CradialGradient id='paint3_radial_4303_1230' cx='0' cy='0' r='1' gradientTransform='matrix%2842.5 -36.0002 31.1824 36.8127 49.4998 55.5001%29' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.583166' stop-color='%2376D45E' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23C8F5B7'/%3E%3C/radialGradient%3E%3CradialGradient id='paint4_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2847.5 48%29 rotate%28-58.9042%29 scale%2832.6898%29'%3E%3Cstop offset='0.486266' stop-color='%2322918B'/%3E%3Cstop offset='0.729599' stop-color='%2342B870'/%3E%3Cstop offset='1' stop-color='%2343E5CA'/%3E%3C/radialGradient%3E%3CradialGradient id='paint5_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2847.3833 49.0077%29 rotate%28119.859%29 scale%2831.1328 29.4032%29'%3E%3Cstop offset='0.459553' stop-color='%2308494E'/%3E%3Cstop offset='0.742242' stop-color='%231A7F7C'/%3E%3Cstop offset='1' stop-color='%23309C61'/%3E%3C/radialGradient%3E%3CradialGradient id='paint6_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2852.5 40%29 rotate%28120.784%29 scale%2827.3542%29'%3E%3Cstop stop-color='%23C8F5B7'/%3E%3Cstop offset='0.24583' stop-color='%2398F0B0'/%3E%3Cstop offset='0.643961' stop-color='%2352D17C'/%3E%3Cstop offset='1' stop-color='%23119FC5'/%3E%3C/radialGradient%3E%3CclipPath id='clip0_4303_1230'%3E%3Crect width='96' height='96' fill='white'/%3E%3C/clipPath%3E%3CclipPath id='clip1_4303_1230'%3E%3Crect width='96' height='96' fill='white'/%3E%3C/clipPath%3E%3CclipPath id='clip2_4303_1230'%3E%3Crect width='95.9998' height='96' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")}
.oi.d365,.fav.d365{background-image:url("data:image/svg+xml,%3Csvg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url%28%23clip0_4303_1230%29'%3E%3Cg clip-path='url%28%23clip1_4303_1230%29'%3E%3Cpath d='M8 8.64804C8 1.48532 12.793 -0.307119 18.0014 0.0408311C54.9592 2.50996 88 13.4612 88 27.5274V70.8626C88 64.136 81.2063 58.5112 70.6791 54.1048C69.0821 53.4363 68.0037 51.8953 68.0037 50.164V36.0118C68.0037 27.913 64.6065 24.5176 58.0039 22.6303C51.4013 20.743 47.9957 22.8343 47.9957 30.273V37.3692C47.9957 42.3552 44.744 45.6372 39.0108 46.5734C33.2776 47.5096 28.4108 48.0653 21.0075 48.7346C13.6041 49.4039 8 44.6457 8 36.59V8.64804Z' fill='url%28%23paint0_linear_4303_1230%29'/%3E%3Cpath d='M8 8.64804C8 1.48532 12.793 -0.307119 18.0014 0.0408311C54.9592 2.50996 88 13.4612 88 27.5274V70.8626C88 64.136 81.2063 58.5112 70.6791 54.1048C69.0821 53.4363 68.0037 51.8953 68.0037 50.164V36.0118C68.0037 27.913 64.6065 24.5176 58.0039 22.6303C51.4013 20.743 47.9957 22.8343 47.9957 30.273V37.3692C47.9957 42.3552 44.744 45.6372 39.0108 46.5734C33.2776 47.5096 28.4108 48.0653 21.0075 48.7346C13.6041 49.4039 8 44.6457 8 36.59V8.64804Z' fill='url%28%23paint1_radial_4303_1230%29'/%3E%3Cpath d='M8 8.64804C8 1.48532 12.793 -0.307119 18.0014 0.0408311C54.9592 2.50996 88 13.4612 88 27.5274V70.8626C88 64.136 81.2063 58.5112 70.6791 54.1048C69.0821 53.4363 68.0037 51.8953 68.0037 50.164V36.0118C68.0037 27.913 64.6065 24.5176 58.0039 22.6303C51.4013 20.743 47.9957 22.8343 47.9957 30.273V37.3692C47.9957 42.3552 44.744 45.6372 39.0108 46.5734C33.2776 47.5096 28.4108 48.0653 21.0075 48.7346C13.6041 49.4039 8 44.6457 8 36.59V8.64804Z' fill='url%28%23paint2_radial_4303_1230%29'/%3E%3Cpath d='M88.0001 27.5273C88.0001 39.0611 66.8268 48.0295 40.0001 52.4565C33.2484 53.5707 28.0001 56.7291 28.0001 63.7778V85.3022C28.0001 95.5107 34.1437 96.8549 41.998 95.5107C70.1946 90.6848 88.0001 80.7717 88.0001 70.8265V27.5273Z' fill='url%28%23paint3_linear_4303_1230%29'/%3E%3Cpath d='M88.0001 27.5273C88.0001 39.0611 66.8268 48.0295 40.0001 52.4565C33.2484 53.5707 28.0001 56.7291 28.0001 63.7778V85.3022C28.0001 95.5107 34.1437 96.8549 41.998 95.5107C70.1946 90.6848 88.0001 80.7717 88.0001 70.8265V27.5273Z' fill='url%28%23paint4_linear_4303_1230%29' fill-opacity='0.5'/%3E%3Cpath opacity='0.5' d='M68.0001 62.3574C68 70.7401 65.071 73.7092 58.004 75.7236C51.8306 77.4834 48.0001 76.807 48.0001 68.0771V50.9639C55.4017 49.4174 62.1948 47.5071 68.0001 45.2783V62.3574Z' fill='url%28%23paint5_linear_4303_1230%29'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_4303_1230' x1='18.1333' y1='2.1153' x2='47.1826' y2='60.9552' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23367AF2'/%3E%3Cstop offset='0.28721' stop-color='%232764E7'/%3E%3Cstop offset='0.660233' stop-color='%234A43CB'/%3E%3Cstop offset='1' stop-color='%236D37CD'/%3E%3C/linearGradient%3E%3CradialGradient id='paint1_radial_4303_1230' cx='0' cy='0' r='1' gradientTransform='matrix%2817.6607 52.344 -119.087 40.8452 39.9393 1.5962%29' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.619721' stop-color='%235750E2' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%234B20A0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2830.5 50.6874%29 rotate%28-90%29 scale%2853.3687 95.7281%29'%3E%3Cstop offset='0.55' stop-color='%232764E7' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23AC80FF'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint3_linear_4303_1230' x1='67.4738' y1='92.9706' x2='67.4738' y2='36.9473' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%232052CB'/%3E%3Cstop offset='0.40599' stop-color='%232764E7'/%3E%3Cstop offset='1' stop-color='%23BD96FF'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint4_linear_4303_1230' x1='73.2633' y1='49.8376' x2='88.0001' y2='49.8376' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23367AF2' stop-opacity='0'/%3E%3Cstop offset='0.488848' stop-color='%234BA3F3' stop-opacity='0.3769'/%3E%3Cstop offset='1' stop-color='%236FE8F5'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint5_linear_4303_1230' x1='57.6792' y1='45.4777' x2='57.6792' y2='74.1402' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23CEB0FF'/%3E%3Cstop offset='1' stop-color='%234894FE'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_4303_1230'%3E%3Crect width='96' height='96' fill='white'/%3E%3C/clipPath%3E%3CclipPath id='clip1_4303_1230'%3E%3Crect width='96' height='96' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")}
.oi.sales,.fav.sales{background-image:url("data:image/svg+xml,%3Csvg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url%28%23clip0_4303_1230%29'%3E%3Cg clip-path='url%28%23clip1_4303_1230%29'%3E%3Cpath d='M0 48C0 41.3726 5.37258 36 12 36H16V60H12C5.37258 60 0 54.6274 0 48Z' fill='url%28%23paint0_linear_4303_1230%29'/%3E%3Cpath d='M0 48C0 41.3726 5.37258 36 12 36H16V60H12C5.37258 60 0 54.6274 0 48Z' fill='url%28%23paint1_radial_4303_1230%29'/%3E%3Cpath d='M16 30C16 23.3726 21.3726 18 28 18H32V60H16V30Z' fill='url%28%23paint2_linear_4303_1230%29'/%3E%3Cpath d='M16 30C16 23.3726 21.3726 18 28 18H32V60H16V30Z' fill='url%28%23paint3_linear_4303_1230%29' fill-opacity='0.6'/%3E%3Cpath d='M32 12C32 5.37258 37.3726 0 44 0H48C55 0 60 1.54995 60 1.54995V54C60 57.3137 57.3137 60 54 60H32V12Z' fill='url%28%23paint4_linear_4303_1230%29'/%3E%3Cpath d='M32 12C32 5.37258 37.3726 0 44 0H48C55 0 60 1.54995 60 1.54995V54C60 57.3137 57.3137 60 54 60H32V12Z' fill='url%28%23paint5_linear_4303_1230%29' fill-opacity='0.5'/%3E%3Cpath d='M48 6.00024C48 2.68659 50.6966 -0.038762 53.9844 0.374268C61.3571 1.30072 68.4432 3.93058 74.667 8.08911C82.5606 13.3634 88.7137 20.8602 92.3467 29.6311C95.9796 38.4019 96.9302 48.0535 95.0781 57.3645C93.226 66.6754 88.6541 75.2278 81.9414 81.9407C75.2285 88.6536 66.6753 93.2253 57.3643 95.0774C48.0532 96.9295 38.4017 95.979 29.6309 92.3459C20.8602 88.7129 13.3641 82.5606 8.08984 74.6672C2.81563 66.7738 7.16976e-05 57.4936 0 48.0002C0.000195854 54.6275 5.3727 60.0002 12 60.0002H42C45.3136 60.0002 47.9998 57.3138 48 54.0002V6.00024Z' fill='url%28%23paint6_radial_4303_1230%29'/%3E%3Cpath d='M48 6.00024C48 2.68659 50.6966 -0.038762 53.9844 0.374268C61.3571 1.30072 68.4432 3.93058 74.667 8.08911C82.5606 13.3634 88.7137 20.8602 92.3467 29.6311C95.9796 38.4019 96.9302 48.0535 95.0781 57.3645C93.226 66.6754 88.6541 75.2278 81.9414 81.9407C75.2285 88.6536 66.6753 93.2253 57.3643 95.0774C48.0532 96.9295 38.4017 95.979 29.6309 92.3459C20.8602 88.7129 13.3641 82.5606 8.08984 74.6672C2.81563 66.7738 7.16976e-05 57.4936 0 48.0002C0.000195854 54.6275 5.3727 60.0002 12 60.0002H42C45.3136 60.0002 47.9998 57.3138 48 54.0002V6.00024Z' fill='url%28%23paint7_radial_4303_1230%29'/%3E%3Cpath opacity='0.6' d='M96 48C96 41.3726 90.6274 36 84 36H48V54C48 57.3137 45.3137 60 42 60H40H84C90.6274 60 96 54.6274 96 48Z' fill='url%28%23paint8_radial_4303_1230%29'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_4303_1230' x1='0.228189' y1='52.4858' x2='15.9261' y2='53.8502' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%231B44B1'/%3E%3Cstop offset='1' stop-color='%23102784'/%3E%3C/linearGradient%3E%3CradialGradient id='paint1_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%285.5 36%29 rotate%2890%29 scale%2824 17.6815%29'%3E%3Cstop offset='0.57876' stop-color='%23102784' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23102784'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint2_linear_4303_1230' x1='24' y1='18' x2='24' y2='60' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%230094F0'/%3E%3Cstop offset='0.775536' stop-color='%232052CB'/%3E%3Cstop offset='1' stop-color='%23163697'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint3_linear_4303_1230' x1='24' y1='45' x2='32.0052' y2='44.6047' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%230078D4' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%232052CB'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint4_linear_4303_1230' x1='40' y1='0' x2='40' y2='60' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2326CFE8'/%3E%3Cstop offset='0.409431' stop-color='%230FAFFF'/%3E%3Cstop offset='0.809746' stop-color='%23367AF2'/%3E%3Cstop offset='1' stop-color='%232052CB'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint5_linear_4303_1230' x1='40.8889' y1='34.5' x2='48.8889' y2='34.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%230094F0' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%232764E7'/%3E%3C/linearGradient%3E%3CradialGradient id='paint6_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2863.3122 13.9524%29 rotate%2890%29 scale%2889.1508 89.1508%29'%3E%3Cstop offset='0.062127' stop-color='%236FE8F5'/%3E%3Cstop offset='0.288121' stop-color='%233BD5FF'/%3E%3Cstop offset='0.68128' stop-color='%230094F0'/%3E%3Cstop offset='1' stop-color='%232052CB'/%3E%3C/radialGradient%3E%3CradialGradient id='paint7_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2841 63.9998%29 rotate%28-90%29 scale%2868%29'%3E%3Cstop offset='0.542484' stop-color='%2329C3FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%2373EDD8'/%3E%3C/radialGradient%3E%3CradialGradient id='paint8_radial_4303_1230' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%2846 60%29 scale%2862 62%29'%3E%3Cstop offset='0.459307' stop-color='%233BD5FF'/%3E%3Cstop offset='1' stop-color='%233BD5FF' stop-opacity='0'/%3E%3C/radialGradient%3E%3CclipPath id='clip0_4303_1230'%3E%3Crect width='96' height='96' fill='white'/%3E%3C/clipPath%3E%3CclipPath id='clip1_4303_1230'%3E%3Crect width='96' height='96' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")}
.oi.ado,.fav.ado{background-image:url("data:image/svg+xml,%3Csvg id='f4337506-5d95-4e80-b7ca-68498c6e008e' xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E%3Cdefs%3E%3ClinearGradient id='ba420277-700e-42cc-9de9-5388a5c16e54' x1='9' y1='16.97' x2='9' y2='1.03' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230078d4' /%3E%3Cstop offset='0.16' stop-color='%231380da' /%3E%3Cstop offset='0.53' stop-color='%233c91e5' /%3E%3Cstop offset='0.82' stop-color='%23559cec' /%3E%3Cstop offset='1' stop-color='%235ea0ef' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath id='a91f0ca4-8fb7-4019-9c09-0a52e2c05754' d='M17,4v9.74l-4,3.28-6.2-2.26V17L3.29,12.41l10.23.8V4.44Zm-3.41.49L7.85,1V3.29L2.58,4.84,1,6.87v4.61l2.26,1V6.57Z' fill='url%28%23ba420277-700e-42cc-9de9-5388a5c16e54%29' /%3E%3C/svg%3E")}
.oi.fabric,.fav.fabric{background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor'%3E%3Cpath fill='url%28%23i535419-a%29' fill-rule='evenodd' d='m2.656 13.042-.234.858c-.088.274-.21.677-.276 1.036a2.252 2.252 0 0 0 1.856 3.036c.316.045.675.043 1.076-.016l1.846-.255a1.17 1.17 0 0 0 .968-.85l1.27-4.666z' clip-rule='evenodd'/%3E%3Cpath fill='url%28%23i535419-b%29' d='M4.456 13.263c-1.945.301-2.344 1.77-2.344 1.77l1.863-6.846 9.734-1.317-1.327 4.822a.68.68 0 0 1-.556.497l-.054.01-7.37 1.073z'/%3E%3Cpath fill='url%28%23i535419-c%29' fill-opacity='.8' d='M4.456 13.263c-1.945.301-2.344 1.77-2.344 1.77l1.863-6.846 9.734-1.317-1.327 4.822a.68.68 0 0 1-.556.497l-.054.01-7.37 1.073z'/%3E%3Cpath fill='url%28%23i535419-d%29' d='m5.56 8.895 10.777-1.592a.64.64 0 0 0 .53-.468l1.111-4.025a.637.637 0 0 0-.614-.81 1 1 0 0 0-.081.005L7 3.525a2.87 2.87 0 0 0-2.312 2.077l-1.483 5.375c.298-1.087.481-1.743 2.355-2.082'/%3E%3Cpath fill='url%28%23i535419-e%29' fill-opacity='.4' d='m5.56 8.895 10.777-1.592a.64.64 0 0 0 .53-.468l1.111-4.025a.637.637 0 0 0-.614-.81 1 1 0 0 0-.081.005L7 3.525a2.87 2.87 0 0 0-2.312 2.077l-1.483 5.375c.298-1.087.481-1.743 2.355-2.082'/%3E%3Cpath fill='url%28%23i535419-f%29' d='M5.56 8.896c-1.56.282-1.948.785-2.206 1.573l-1.242 4.564s.397-1.453 2.318-1.764l7.343-1.07.054-.008a.68.68 0 0 0 .555-.498l1.092-3.966z'/%3E%3Cpath fill='url%28%23i535419-g%29' fill-opacity='.2' d='M5.56 8.896c-1.56.282-1.948.785-2.206 1.573l-1.242 4.564s.397-1.453 2.318-1.764l7.343-1.07.054-.008a.68.68 0 0 0 .555-.498l1.092-3.966z'/%3E%3Cpath fill='url%28%23i535419-h%29' fill-rule='evenodd' d='M4.43 13.27c-1.624.262-2.157 1.338-2.284 1.665A2.254 2.254 0 0 0 4 17.972q.476.07 1.077-.016l1.846-.254c.464-.064.845-.4.968-.852l1.158-4.253-4.62.673Z' clip-rule='evenodd'/%3E%3Cdefs%3E%3ClinearGradient id='i535419-a' x1='5.581' x2='5.581' y1='18.003' y2='12.185' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.056' stop-color='%232AAC94'/%3E%3Cstop offset='.155' stop-color='%23239C87'/%3E%3Cstop offset='.372' stop-color='%23177E71'/%3E%3Cstop offset='.588' stop-color='%230E6961'/%3E%3Cstop offset='.799' stop-color='%23095D57'/%3E%3Cstop offset='1' stop-color='%23085954'/%3E%3C/linearGradient%3E%3ClinearGradient id='i535419-b' x1='12.934' x2='7.315' y1='13.781' y2='7.67' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.042' stop-color='%23ABE88E'/%3E%3Cstop offset='.549' stop-color='%232AAA92'/%3E%3Cstop offset='.906' stop-color='%23117865'/%3E%3C/linearGradient%3E%3ClinearGradient id='i535419-c' x1='-.873' x2='4.474' y1='13.484' y2='11.661' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%236AD6F9'/%3E%3Cstop offset='1' stop-color='%236AD6F9' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='i535419-d' x1='3.205' x2='16.026' y1='4.499' y2='10.453' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%236AD6F9'/%3E%3Cstop offset='.23' stop-color='%2360E9D0'/%3E%3Cstop offset='.651' stop-color='%236DE9BB'/%3E%3Cstop offset='.994' stop-color='%23ABE88E'/%3E%3C/linearGradient%3E%3ClinearGradient id='i535419-e' x1='4.391' x2='11.363' y1='5.613' y2='7.155' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='.459' stop-color='%23fff'/%3E%3Cstop offset='1' stop-color='%23fff' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='i535419-f' x1='6.703' x2='6.868' y1='11.586' y2='6.697' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.205' stop-color='%23063D3B' stop-opacity='0'/%3E%3Cstop offset='.586' stop-color='%23063D3B' stop-opacity='.237'/%3E%3Cstop offset='.872' stop-color='%23063D3B' stop-opacity='.75'/%3E%3C/linearGradient%3E%3ClinearGradient id='i535419-g' x1='1.524' x2='7.481' y1='11.1' y2='12.22' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='.459' stop-color='%23fff'/%3E%3Cstop offset='1' stop-color='%23fff' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='i535419-h' x1='5.827' x2='4.665' y1='16.391' y2='10.708' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.064' stop-color='%23063D3B' stop-opacity='0'/%3E%3Cstop offset='.17' stop-color='%23063D3B' stop-opacity='.135'/%3E%3Cstop offset='.562' stop-color='%23063D3B' stop-opacity='.599'/%3E%3Cstop offset='.85' stop-color='%23063D3B' stop-opacity='.9'/%3E%3Cstop offset='1' stop-color='%23063D3B'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")}
.oi.powerbi,.fav.powerbi,.oi.bi,.fav.bi{background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor'%3E%3Cpath fill='url%28%23ic17573-a%29' d='M11.667 2a.667.667 0 0 0-.667.667V18h5.333a.667.667 0 0 0 .667-.667V2.667A.667.667 0 0 0 16.333 2z'/%3E%3Cpath fill='%23000' fill-opacity='.5' d='M7.667 6A.667.667 0 0 0 7 6.667V10h-.5v8h1V7h4.833c.092 0 .167.075.167.167V18h1V7.167C13.5 6.522 12.978 6 12.333 6z' opacity='.25'/%3E%3Cpath fill='url%28%23ic17573-b%29' d='M7.667 6A.667.667 0 0 0 7 6.667V18h6V6.667A.667.667 0 0 0 12.333 6z'/%3E%3Cpath fill='url%28%23ic17573-c%29' d='M3.667 10a.667.667 0 0 0-.667.667v6.666c0 .369.298.667.667.667H9v-7.333A.667.667 0 0 0 8.333 10z'/%3E%3Cdefs%3E%3ClinearGradient id='ic17573-a' x1='10' x2='16.5' y1='2' y2='17.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23E6AD10'/%3E%3Cstop offset='1' stop-color='%23C87E0E'/%3E%3C/linearGradient%3E%3ClinearGradient id='ic17573-b' x1='7' x2='12.499' y1='6' y2='18' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F6D751'/%3E%3Cstop offset='1' stop-color='%23E6AD10'/%3E%3C/linearGradient%3E%3ClinearGradient id='ic17573-c' x1='3' x2='6' y1='10' y2='18' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F9E589'/%3E%3Cstop offset='1' stop-color='%23F6D751'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")}
.oi.onelake,.fav.onelake{background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor'%3E%3Cpath fill='url%28%23i678abc-a%29' d='M9.284 13.42c2.195-1.268 2.918-4.127 1.614-6.386S6.756 3.972 4.56 5.24s-2.919 4.126-1.614 6.385 4.14 3.063 6.337 1.795Z'/%3E%3Cpath fill='url%28%23i678abc-b%29' d='M12.15 7.087c1.14-1.14 1.112-3.015-.061-4.189s-3.05-1.2-4.189-.059c-1.14 1.14-1.113 3.016.06 4.189s3.05 1.2 4.19.06Z'/%3E%3Cpath fill='url%28%23i678abc-c%29' d='M10.92 17.693a6.874 6.874 0 1 0 0-13.748 6.874 6.874 0 0 0 0 13.748'/%3E%3Cpath fill='url%28%23i678abc-d%29' fill-rule='evenodd' d='M8.227 2.555a8.955 8.955 0 0 0-2.618 12.758l.18.028 3.988 1.331 3.789-2.538c-.634.02-3.273-1.478-4.998-4.75-2.16-4.101-1.27-5.996-.338-6.83z' clip-rule='evenodd'/%3E%3Cpath fill='url%28%23i678abc-e%29' fill-opacity='.2' fill-rule='evenodd' d='M8.227 2.555a8.955 8.955 0 0 0-2.618 12.758l.18.028 3.988 1.331 3.789-2.538c-.634.02-3.273-1.478-4.998-4.75-2.16-4.101-1.27-5.996-.338-6.83z' clip-rule='evenodd'/%3E%3Cpath fill='url%28%23i678abc-f%29' fill-rule='evenodd' d='M16.148 15.283a6.9 6.9 0 0 0 1.456-2.845c-.684-1.951-3.434-2.5-4.939-.974-1.155 1.172-2.356 2.155-3.259 2.331-5.22 1.025-7.436-3.304-7.06-5.258a7.9 7.9 0 0 0 .02 3.093 7.955 7.955 0 0 0 12.879 4.532l.022-.018q.475-.398.88-.863v.002Z' clip-rule='evenodd'/%3E%3Cdefs%3E%3CradialGradient id='i678abc-c' cx='0' cy='0' r='1' gradientTransform='rotate%28134.83 7.405 3.5%29scale%2810.3609 13.3663%29' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.39' stop-color='%23028FDC'/%3E%3Cstop offset='.59' stop-color='%230078D4'/%3E%3Cstop offset='1' stop-color='%231A508B'/%3E%3C/radialGradient%3E%3CradialGradient id='i678abc-d' cx='0' cy='0' r='1' gradientTransform='rotate%28139.44 5.179 5.833%29scale%289.32369 11.5041%29' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.46' stop-color='%2340D9FA'/%3E%3Cstop offset='.9' stop-color='%230095E6'/%3E%3C/radialGradient%3E%3CradialGradient id='i678abc-e' cx='0' cy='0' r='1' gradientTransform='matrix%28-1.06162 9.83638 -6.9859 -.75398 7.762 4.906%29' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.77' stop-opacity='0'/%3E%3Cstop offset='1'/%3E%3C/radialGradient%3E%3CradialGradient id='i678abc-f' cx='0' cy='0' r='1' gradientTransform='matrix%281.082 15.35763 -28.00409 1.97297 12.477 12.213%29' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23BDF5FF'/%3E%3Cstop offset='.47' stop-color='%2340D9FA'/%3E%3C/radialGradient%3E%3ClinearGradient id='i678abc-a' x1='16.206' x2='2.176' y1='7.19' y2='10.425' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.2' stop-color='%23028FDC'/%3E%3Cstop offset='.51' stop-color='%230078D4'/%3E%3Cstop offset='1' stop-color='%230B315B'/%3E%3C/linearGradient%3E%3ClinearGradient id='i678abc-b' x1='17.201' x2='7.932' y1='11.539' y2='3.044' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.04' stop-color='%23028FDC'/%3E%3Cstop offset='.46' stop-color='%230078D4'/%3E%3Cstop offset='1' stop-color='%230B315B'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")}
.oi.lakehouse,.fav.lakehouse{background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor'%3E%3Cpath fill='url%28%23i21c904-a%29' d='M2 3.5A2.5 2.5 0 0 1 4.5 1h11A2.5 2.5 0 0 1 18 3.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 16.5z'/%3E%3Cpath fill='url%28%23i21c904-b%29' fill-opacity='.2' d='M2 3.5A2.5 2.5 0 0 1 4.5 1h11A2.5 2.5 0 0 1 18 3.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 16.5z'/%3E%3Cpath fill='url%28%23i21c904-c%29' fill-rule='evenodd' d='M15.5 2h-11A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 15.5 2m-11-1A2.5 2.5 0 0 0 2 3.5v13A2.5 2.5 0 0 0 4.5 19h11a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 15.5 1z' clip-rule='evenodd'/%3E%3Cpath fill='url%28%23i21c904-d%29' d='M8.99 14.69a1.5 1.5 0 0 0-.153.31H6.5A1.5 1.5 0 0 1 5 13.5V9.668c0-.425.18-.83.497-1.115l3.5-3.15a1.5 1.5 0 0 1 2.007 0l3.5 3.15A1.5 1.5 0 0 1 15 9.668v.34L14.98 10a1.5 1.5 0 0 0-.94-.01l-.12.05c-.37.15-.66.44-.81.81-.01.02-.05.07-.11.13-.06-.05-.11-.11-.11-.13a1.49 1.49 0 0 0-1.39-.93h-.14c-.57.05-1.05.42-1.26.95-.04.08-.06.13-.06.13a.3.3 0 0 1-.09.031l-.03.009a1.5 1.5 0 0 0-1.13 1.79 1.46 1.46 0 0 0 1.264 1.15l-.004.01a.3.3 0 0 1-.09.031l-.03.009c-.39.09-.73.32-.94.66'/%3E%3Cpath fill='url%28%23i21c904-e%29' d='M14.347 10.935a.5.5 0 0 0-.31.287c-.071.176-.22.379-.422.536-.2.157-.418.242-.622.242s-.417-.085-.613-.24a1.4 1.4 0 0 1-.417-.537.5.5 0 0 0-.929.007c-.103.265-.218.426-.343.533s-.294.191-.55.25a.5.5 0 1 0 .219.975c.369-.083.7-.224.982-.466q.1-.087.188-.185.107.111.23.207c.325.258.751.456 1.233.456.48 0 .909-.197 1.238-.453a3 3 0 0 0 .238-.213q.087.1.19.188c.28.242.613.383.982.466a.5.5 0 1 0 .22-.976c-.257-.058-.426-.141-.551-.249-.126-.107-.24-.268-.344-.533a.5.5 0 0 0-.277-.282h-.002a.5.5 0 0 0-.34-.013'/%3E%3Cpath fill='url%28%23i21c904-f%29' d='M11.342 15.522q.1-.087.188-.185.107.111.23.207c.325.258.751.456 1.233.456.48 0 .909-.197 1.238-.453q.126-.1.238-.212.087.1.19.187c.28.242.613.383.982.466a.5.5 0 1 0 .22-.976c-.257-.058-.426-.141-.551-.249-.126-.107-.24-.268-.344-.533a.498.498 0 0 0-.812-.18.5.5 0 0 0-.117.173c-.071.175-.22.378-.422.535-.2.157-.418.242-.622.242s-.417-.085-.613-.24a1.4 1.4 0 0 1-.417-.537.5.5 0 0 0-.929.007c-.103.265-.218.426-.343.533s-.294.191-.55.25a.5.5 0 1 0 .219.975c.369-.083.7-.224.982-.466'/%3E%3Cdefs%3E%3ClinearGradient id='i21c904-a' x1='6.444' x2='8.996' y1='1' y2='19.141' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23fff'/%3E%3Cstop offset='1' stop-color='%23EBEBEB'/%3E%3C/linearGradient%3E%3ClinearGradient id='i21c904-c' x1='7.167' x2='9.881' y1='1' y2='19.093' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23BBB'/%3E%3Cstop offset='1' stop-color='%23888'/%3E%3C/linearGradient%3E%3ClinearGradient id='i21c904-d' x1='5' x2='15.979' y1='5.018' y2='16.265' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%233477EA'/%3E%3Cstop offset='1' stop-color='%231D53A4'/%3E%3C/linearGradient%3E%3ClinearGradient id='i21c904-e' x1='5' x2='15.979' y1='5.018' y2='16.265' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%233477EA'/%3E%3Cstop offset='1' stop-color='%231D53A4'/%3E%3C/linearGradient%3E%3ClinearGradient id='i21c904-f' x1='5' x2='15.979' y1='5.018' y2='16.265' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%233477EA'/%3E%3Cstop offset='1' stop-color='%231D53A4'/%3E%3C/linearGradient%3E%3CradialGradient id='i21c904-b' cx='0' cy='0' r='1' gradientTransform='matrix%288.44455 14.25 -11.71825 6.94424 7.111 5.687%29' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.177' stop-color='%23fff'/%3E%3Cstop offset='1' stop-color='%23B8B8B8'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E")}
.oi.teams,.fav.teams{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M18.012,8,13.99,8l-1.2.863v4.268A2.977,2.977,0,0,0,15.86,16a2.977,2.977,0,0,0,3.074-2.869V8.863A.893.893,0,0,0,18.012,8Z' fill='%235059c9'/%3E%3Ccircle cx='17' cy='5' r='2' fill='%235059c9'/%3E%3Cpath d='M6.82,8h7.36a.82.82,0,0,1,.82.82V14.5A4.5,4.5,0,0,1,10.5,19h0A4.5,4.5,0,0,1,6,14.5V8.82A.82.82,0,0,1,6.82,8Z' fill='%237b83eb'/%3E%3Cpath d='M13.99,4A3,3,0,1,1,11,1,2.991,2.991,0,0,1,13.99,4Z' fill='%237b83eb'/%3E%3Cpath d='M6,8.82V14.5A4.435,4.435,0,0,0,6.259,16H9.991A2.006,2.006,0,0,0,12,14V8H6.82A.82.82,0,0,0,6,8.82Z' opacity='0.5'/%3E%3Cpath d='M8.779,6a2.906,2.906,0,0,0,3.165.833A1.065,1.065,0,0,0,10.932,6Z' opacity='0.5'/%3E%3Cpath d='M6,8.82V14.5A4.43,4.43,0,0,0,6.25,16H9.991A2.006,2.006,0,0,0,12,14V8H6.82A.82.82,0,0,0,6,8.82Z' opacity='0.1'/%3E%3Cpath d='M8.779,6a2.906,2.906,0,0,0,3.165.833A1.065,1.065,0,0,0,10.932,6Z' opacity='0.1'/%3E%3Crect x='1' y='5' width='10' height='10' rx='1' fill='%234b53bc'/%3E%3Cpath d='M8.625,8h-2v5h-1V8h-2V7h5Z' fill='%23fff'/%3E%3C/svg%3E")}
.oi.outlook,.fav.outlook{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M18.806,9.522h0L18.8,9.517h0l-6.3-3.591a.8.8,0,0,0-.085-.048.869.869,0,0,0-.388-.091h-.04a.869.869,0,0,0-.388.091.8.8,0,0,0-.085.048L6.2,9.516h0l-.008.005h0a.387.387,0,0,0-.009.665v0L12,15l6.815-4.81v0a.387.387,0,0,0-.009-.665Z' fill='%230a2767'/%3E%3Cpath d='M17,2H8A1,1,0,0,0,7,3H7l5,2,6-2h0A1,1,0,0,0,17,2Z' fill='%230364b8'/%3E%3Cpolygon points='12 3 7 3 7 9 11.992 15.008 17.992 15.008 17.992 8.992 12 3' fill='%2328a8ea'/%3E%3Crect x='12' y='3' width='6' height='6' fill='%2350d9ff'/%3E%3Cpolygon points='11.992 15.008 7 15 7 9 12 9 11.992 15.008' fill='%230078d4'/%3E%3Cpath d='M12,15,6.218,10.174l.5-.885s5.191,3.518,5.3,3.577c.061-.032,6.3-3.582,6.3-3.582l.49.908Z' fill='%230a2767' opacity='0.5'/%3E%3Cpath d='M18.815,10.187v0l-6.314,3.6a.868.868,0,0,1-.472.139h-.058a.85.85,0,0,1-.243-.035L14,17l4.643.83a.873.873,0,0,0,.357-.7V9.857A.386.386,0,0,1,18.815,10.187Z' fill='%231490df'/%3E%3Cpath d='M13.039,13.48l-.538.307a.868.868,0,0,1-.472.139h-.058a.85.85,0,0,1-.243-.035L14,17l4.643.83a.873.873,0,0,0,.357-.7v-.274Z' opacity='0.1'/%3E%3Cpath d='M6.185,10.19v0A.386.386,0,0,1,6,9.857v7.27A.877.877,0,0,0,6.875,18h11.25a.877.877,0,0,0,.506-.161l.012-.008h0l.024-.018Z' fill='%2328a8ea'/%3E%3Cpath d='M12,14V7a1,1,0,0,0-1-1H6v4.651l-.815-.461v0C5.074,10.119,6,10,6,9.857V16h4A2,2,0,0,0,12,14Z' opacity='0.5'/%3E%3Crect x='1' y='5' width='10' height='10' rx='1' fill='%230078d4'/%3E%3Cpath d='M3.2,8.366A2.749,2.749,0,0,1,4.316,7.2a3.515,3.515,0,0,1,1.772-.421,3.274,3.274,0,0,1,1.64.4A2.72,2.72,0,0,1,8.813,8.292a3.448,3.448,0,0,1,.38,1.64A3.63,3.63,0,0,1,8.8,11.647,2.786,2.786,0,0,1,7.684,12.8a3.405,3.405,0,0,1-1.7.41,3.351,3.351,0,0,1-1.676-.4,2.773,2.773,0,0,1-1.1-1.117,3.361,3.361,0,0,1-.385-1.62A3.719,3.719,0,0,1,3.2,8.366ZM4.39,11.105a1.755,1.755,0,0,0,.627.767,1.7,1.7,0,0,0,.98.28,1.79,1.79,0,0,0,1.046-.288,1.693,1.693,0,0,0,.609-.77,2.829,2.829,0,0,0,.2-1.071,3.1,3.1,0,0,0-.183-1.084,1.717,1.717,0,0,0-.589-.8,1.679,1.679,0,0,0-1.037-.3,1.761,1.761,0,0,0-1,.282,1.784,1.784,0,0,0-.641.774,2.915,2.915,0,0,0,0,2.212Z' fill='%23fff'/%3E%3C/svg%3E")}
.oi.word,.fav.word,.oi.w,.fav.w{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M6,6l6.5,1.316L19,6V2.9a.9.9,0,0,0-.9-.9H6.9a.9.9,0,0,0-.9.9V6Z' fill='%2341a5ee'/%3E%3Cpolygon points='6 10 12.5 11.625 19 10 19 8 19 6 12.5 6 6 6 6 8 6 10' fill='%232b7cd3'/%3E%3Cpolygon points='6 14 12.5 15.667 19 14 19 12 19 10 12.5 10 6 10 6 12 6 14' fill='%23185abd'/%3E%3Cpath d='M6.9,18H18.1a.9.9,0,0,0,.9-.9V14H6v3.1a.9.9,0,0,0,.9.9Z' fill='%23103f91'/%3E%3Cpath d='M11.1,6H6V16h4.8A1.2,1.2,0,0,0,12,14.8V6.9A.9.9,0,0,0,11.1,6Z' opacity='0.5'/%3E%3Crect x='1' y='5' width='10' height='10' rx='0.9' fill='%23185abd'/%3E%3Cpath d='M4.352,11.54c.017.142.029.266.034.372h.019c.008-.1.023-.222.046-.364s.044-.262.065-.36L5.429,7H6.61l.945,4.126a6.267,6.267,0,0,1,.118.778h.016a6.348,6.348,0,0,1,.1-.753L8.543,7H9.618L8.3,13H7.039l-.9-3.975c-.026-.114-.056-.264-.089-.448s-.053-.318-.061-.4H5.972c-.01.1-.03.242-.061.435s-.054.335-.072.427L4.992,13H3.716L2.382,7H3.476L4.3,11.2C4.318,11.283,4.335,11.4,4.352,11.54Z' fill='%23fff'/%3E%3C/svg%3E")}
.oi.excel,.fav.excel,.oi.x,.fav.x{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M13,10,9.5,8.705,6,10v7.1a.9.9,0,0,0,.9.9H18.1a.9.9,0,0,0,.9-.9V14Z' fill='%23185c37'/%3E%3Cpath d='M13,2H6.9a.9.9,0,0,0-.9.9V5.6L13,10l3,2.132L19,10.1V5.6Z' fill='%2321a366'/%3E%3Crect x='6' y='6' width='7' height='4' fill='%23107c41'/%3E%3Crect x='13' y='10' width='6' height='4' fill='%23107c41'/%3E%3Cpath d='M11.1,6H6V16h4.8A1.2,1.2,0,0,0,12,14.8V6.9A.9.9,0,0,0,11.1,6Z' opacity='0.5'/%3E%3Crect x='1' y='5' width='10' height='10' rx='0.9' fill='%23107c41'/%3E%3Cpath d='M3.3,13.021,5.256,9.992,3.466,6.979H4.907L5.884,8.9q.135.273.186.408h.012q.1-.219.2-.425L7.329,6.979H8.652l-1.837,3L8.7,13.021H7.291L6.162,10.906a1.862,1.862,0,0,1-.135-.282H6.011a1.384,1.384,0,0,1-.131.273L4.717,13.021Z' fill='%23fff'/%3E%3Cpath d='M13,2h5.1a.9.9,0,0,1,.9.9V6a0,0,0,0,1,0,0H13a0,0,0,0,1,0,0V2A0,0,0,0,1,13,2Z' fill='%2333c481'/%3E%3C/svg%3E")}
.oi.powerpoint,.fav.powerpoint,.oi.p,.fav.p,.oi.ppt,.fav.ppt{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M10,1a9.026,9.026,0,0,0-9,9l11.249,2.659Z' fill='%23ed6c47'/%3E%3Cpath d='M10,1v9l4.5,2.913L19,10A9.026,9.026,0,0,0,10,1Z' fill='%23ff8f6b'/%3E%3Cpath d='M19,10A9,9,0,0,1,1,10Z' fill='%23d35230'/%3E%3Cpath d='M10.909,6H2.518a7.637,7.637,0,0,0-1.5,4.339A8.949,8.949,0,0,0,3.305,16H9.818A2.1,2.1,0,0,0,12,14V7A1.048,1.048,0,0,0,10.909,6Z' opacity='0.5'/%3E%3Cpath d='M10.982,6.021,2.514,6.006a7.642,7.642,0,0,0-1.5,4.333A8.949,8.949,0,0,0,3.305,16H9.963A2.017,2.017,0,0,0,12,14V7.019A1.008,1.008,0,0,0,10.982,6.021Z' opacity='0.1'/%3E%3Crect x='1' y='5' width='10' height='10' rx='1' fill='%23c43e1c'/%3E%3Cpath d='M6.283,7a2.274,2.274,0,0,1,1.56.481,1.766,1.766,0,0,1,.542,1.393,2.023,2.023,0,0,1-.268,1.042,1.828,1.828,0,0,1-.761.71,2.489,2.489,0,0,1-1.145.253H5.129V13H4.018V7ZM5.129,9.962h.955A1.2,1.2,0,0,0,6.929,9.7a1.009,1.009,0,0,0,.286-.777q0-.991-1.095-.991H5.129Z' fill='%23fff'/%3E%3C/svg%3E")}
.oi.sharepoint,.fav.sharepoint{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Ccircle cx='10' cy='6' r='5' fill='%23036c70'/%3E%3Ccircle cx='14.5' cy='10.5' r='4.5' transform='translate%28-0.75 19.878%29 rotate%28-67.5%29' fill='%231a9ba1'/%3E%3Ccircle cx='10' cy='15.344' r='3.656' fill='%2337c6d0'/%3E%3Cpath d='M11,6H5.825a4.716,4.716,0,0,0-.075.747A4.73,4.73,0,0,0,7.1,10.063,4.97,4.97,0,0,0,10,11c.017,0,.033-.005.05-.005a4.717,4.717,0,0,0,.088.468c.122.01.238.037.362.037a4.657,4.657,0,0,0,.545-.055c0,.02,0,.04.006.06-.018,0-.034-.005-.051-.005a4.886,4.886,0,0,0-.839.085c.01.04.012.082.023.121-.062,0-.121-.018-.184-.018a3.638,3.638,0,0,0-.515.051,8.782,8.782,0,0,0-1.568.6A3.59,3.59,0,0,0,6.41,16H10a2,2,0,0,0,2-2V7A1,1,0,0,0,11,6Z' opacity='0.5'/%3E%3Crect x='1' y='5' width='10' height='10' rx='1' fill='%23038387'/%3E%3Cpath d='M4.6,9.887a1.671,1.671,0,0,1-.512-.558,1.555,1.555,0,0,1-.179-.764,1.5,1.5,0,0,1,.332-.989,1.945,1.945,0,0,1,.881-.593,3.6,3.6,0,0,1,1.2-.193,4.467,4.467,0,0,1,1.586.229V8.175a2.475,2.475,0,0,0-.717-.3,3.4,3.4,0,0,0-.839-.1,1.77,1.77,0,0,0-.863.189.584.584,0,0,0-.342.534.548.548,0,0,0,.145.379,1.332,1.332,0,0,0,.39.288q.246.126.732.333a.769.769,0,0,1,.1.044A5.911,5.911,0,0,1,7.444,10a1.56,1.56,0,0,1,.743,1.422,1.629,1.629,0,0,1-.31,1.031,1.743,1.743,0,0,1-.831.576,3.664,3.664,0,0,1-1.183.177,6.013,6.013,0,0,1-1.072-.091,3.577,3.577,0,0,1-.871-.26v-1.22a2.766,2.766,0,0,0,.881.432,3.334,3.334,0,0,0,.969.161,1.628,1.628,0,0,0,.879-.193.611.611,0,0,0,.3-.543.589.589,0,0,0-.166-.416,1.683,1.683,0,0,0-.457-.329q-.291-.151-.862-.4A4.776,4.776,0,0,1,4.6,9.887Z' fill='%23fff'/%3E%3C/svg%3E")}
.oi.onedrive,.fav.onedrive{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M11.549,11.093l4.023-2.424A5.626,5.626,0,0,0,5.314,7.147Z' fill='%230364b8'/%3E%3Cpath d='M7.864,7.667h0A4.48,4.48,0,0,0,5.5,7H5.442a4.5,4.5,0,0,0-3.634,7.071l5.805-.93,4.03-3.209Z' fill='%230078d4'/%3E%3Cpath d='M15.584,8.687c-.082-.006-.164-.009-.247-.009a3.625,3.625,0,0,0-1.449.3h0l-2.252.948,2.485,3.158,4.435.987a3.657,3.657,0,0,0-2.972-5.382Z' fill='%231490df'/%3E%3Cpath d='M11.643,9.934,1.808,14.072A4.5,4.5,0,0,0,5.5,16h9.844a3.656,3.656,0,0,0,3.219-1.921Z' fill='%2328a8ea'/%3E%3C/svg%3E")}
.oi.loop,.fav.loop{background-image:url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url%28%23clip0_202_143553%29'%3E%3Cpath d='M10 0C4.47715 0 0 4.47715 0 10V20H10C15.5229 20 20 15.5229 20 10C20 4.47715 15.5229 0 10 0ZM10 6.5C11.933 6.5 13.5 8.06701 13.5 10C13.5 11.933 11.933 13.5 10 13.5H6.5V10C6.5 8.06701 8.06701 6.5 10 6.5Z' fill='url%28%23paint0_linear_202_143553%29'/%3E%3Cpath d='M20 10C20 15.5228 15.5229 20 10 20H0C4.28085e-08 16.4102 2.91015 13.5 6.5 13.5H10C11.933 13.5 13.5 11.933 13.5 10L20 10Z' fill='url%28%23paint1_linear_202_143553%29'/%3E%3Cpath d='M20 10C20 15.5228 15.5229 20 10 20H0C4.28085e-08 16.4102 2.91015 13.5 6.5 13.5H10C11.933 13.5 13.5 11.933 13.5 10L20 10Z' fill='url%28%23paint2_radial_202_143553%29' fill-opacity='0.56'/%3E%3Cpath d='M20 10C20 15.5228 15.5229 20 10 20H0C4.28085e-08 16.4102 2.91015 13.5 6.5 13.5H10C11.933 13.5 13.5 11.933 13.5 10L20 10Z' fill='url%28%23paint3_radial_202_143553%29' fill-opacity='0.1'/%3E%3Cpath d='M10 0C4.47715 0 0 4.47715 0 10V20C0.000915909 20 0.00183105 20 0.00274677 20C3.58414 19.9985 6.48833 17.1006 6.49996 13.5216L6.52161 13.5H6.5V10C6.5 8.067 8.067 6.5 10 6.5C10.9764 6.5 11.8594 6.89981 12.4942 7.54465L17.0971 2.95509C15.2855 1.13008 12.7747 0 10 0Z' fill='url%28%23paint4_linear_202_143553%29'/%3E%3Cpath d='M10 0C4.47715 0 0 4.47715 0 10V20C0.000915909 20 0.00183105 20 0.00274677 20C3.58414 19.9985 6.48833 17.1006 6.49996 13.5216L6.52161 13.5H6.5V10C6.5 8.067 8.067 6.5 10 6.5C10.9764 6.5 11.8594 6.89981 12.4942 7.54465L17.0971 2.95509C15.2855 1.13008 12.7747 0 10 0Z' fill='url%28%23paint5_radial_202_143553%29'/%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_202_143553' x1='12.2' y1='7.1' x2='8.9' y2='20.6' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%239237E3'/%3E%3Cstop offset='1' stop-color='%2348E6F3'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_202_143553' x1='6.5' y1='18.5' x2='15.3' y2='16.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2351E6FF'/%3E%3Cstop offset='1' stop-color='%2371D4FF' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='paint2_radial_202_143553' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%283.5 15.75%29 rotate%2834.5085%29 scale%284.85412 8.53123%29'%3E%3Cstop/%3E%3Cstop offset='0.699824' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint3_radial_202_143553' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%282.3 15%29 rotate%2831.866%29 scale%288.71321 15.3137%29'%3E%3Cstop offset='0.328125'/%3E%3Cstop offset='0.604167' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint4_linear_202_143553' x1='4.1' y1='10.7' x2='9.2' y2='3.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%236D05E8'/%3E%3Cstop offset='1' stop-color='%23AB5ADD' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='paint5_radial_202_143553' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate%28-1.7 6.2%29 rotate%28-9.73945%29 scale%2813.596 35.7456%29'%3E%3Cstop stop-color='%236D05E8'/%3E%3Cstop offset='1' stop-color='%236D05E8' stop-opacity='0'/%3E%3C/radialGradient%3E%3CclipPath id='clip0_202_143553'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")}
/* ---------- end product icons ---------- */
`;
  document.head.appendChild(s);

  // Tredence frame chrome text (the PPTX template's layouts carry the same text).  aria-hidden: not part of the story.
  function chrome() {
    var year = new Date().getFullYear();
    document.querySelectorAll(".scene").forEach(function (el, k) {
      var cls = el.classList;
      if (!cls.contains("frame") || el.querySelector(":scope > .td-ch")) return;
      var add = function (c, txt) { var p = document.createElement("p"); p.className = "td-ch " + c; p.textContent = txt; p.setAttribute("aria-hidden", "true"); el.insertBefore(p, el.firstChild); };
      if (cls.contains("td-closing")) { add("td-ch-close", "#beyondpossible"); return; }
      if (!cls.contains("td-content") && !cls.contains("td-cover") && !cls.contains("td-section")) return;
      add("td-ch-copy", "\u00a9 COPYRIGHT " + year + ", TREDENCE. ALL RIGHTS RESERVED");
      add("td-ch-num", String(k + 1));
      if (cls.contains("td-cover")) add("td-ch-tag", "#BeyondPossible");
      if (cls.contains("td-section")) add("td-ch-hash", "#BeyondPossible");
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", chrome); else chrome();
})();
