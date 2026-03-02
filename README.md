<!DOCTYPE html>

<html lang="kk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>QAZAQSTAN QUIZ TOURNAMENT</title>
<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;800;900&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0d1b2e;--bg2:#0a1525;--bg3:#081120;
  --panel:#0f2035;--panel2:#132640;
  --border:rgba(255,255,255,0.08);--border2:rgba(255,255,255,0.15);
  --gold:#f0b429;--gold2:#ffd060;
  --cyan:#00d4ff;
  --text:#e8f4ff;--text2:#8ba8c4;--text3:#4a6a8a;
  --red:#e63b3b;--green:#1db954;--blue:#1e6ef5;--orange:#f07020;
  --r:10px;--r2:14px;
  --shadow:0 4px 20px rgba(0,0,0,0.5);
  --glow-gold:0 0 20px rgba(240,180,41,0.35);
  --c0:#1e6ef5;--c0r:30,110,245;
  --c1:#e63b3b;--c1r:230,59,59;
  --c2:#1db954;--c2r:29,185,84;
}
html,body{height:100%;overflow:hidden}
body{font-family:'Exo 2',sans-serif;background:var(--bg3);color:var(--text);display:flex;flex-direction:column;
  background-image:radial-gradient(ellipse 80% 40% at 50% 100%,rgba(13,27,46,0.97) 0%,transparent 100%),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='280'%3E%3Cdefs%3E%3ClinearGradient id='s' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%230a1525'/%3E%3Cstop offset='1' stop-color='%23193a5c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='280' fill='url(%23s)'/%3E%3Cpath d='M0 200 L60 140 L130 170 L200 100 L280 150 L360 70 L440 130 L530 90 L620 140 L700 110 L800 130 L800 280 L0 280Z' fill='%230f2035' opacity='0.8'/%3E%3Cpath d='M0 240 L100 190 L200 215 L310 180 L410 210 L510 175 L620 205 L720 185 L800 200 L800 280 L0 280Z' fill='%230a1828' opacity='0.9'/%3E%3Cellipse cx='650' cy='238' rx='50' ry='16' fill='%23132640'/%3E%3Cpath d='M604 238 Q610 208 650 198 Q690 208 696 238Z' fill='%230f2035'/%3E%3Crect x='644' y='198' width='12' height='18' rx='6' fill='%231a3a5c'/%3E%3Ccircle cx='80' cy='45' r='1.5' fill='white' opacity='0.7'/%3E%3Ccircle cx='200' cy='25' r='1' fill='white' opacity='0.5'/%3E%3Ccircle cx='340' cy='55' r='1.5' fill='white' opacity='0.8'/%3E%3Ccircle cx='500' cy='20' r='1' fill='white' opacity='0.6'/%3E%3Ccircle cx='660' cy='40' r='1.5' fill='white' opacity='0.7'/%3E%3Ccircle cx='760' cy='30' r='1' fill='white' opacity='0.4'/%3E%3C/svg%3E");
  background-size:cover;background-position:bottom;background-repeat:no-repeat}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:var(--bg2)}
::-webkit-scrollbar-thumb{background:var(--panel2);border-radius:2px}

/* HEADER */
#hdr{display:flex;align-items:center;gap:10px;padding:9px 14px;background:rgba(8,17,32,0.97);border-bottom:1px solid var(–border2);flex-shrink:0;z-index:50}
.hdr-logo{display:flex;flex-direction:column;line-height:1;font-family:‘Oswald’,sans-serif}
.hdr-logo-m{font-size:15px;font-weight:700;color:var(–text);letter-spacing:1px}
.hdr-logo-s{font-size:8px;color:var(–text2);letter-spacing:3px;text-transform:uppercase}
.hdr-sep{width:1px;height:30px;background:var(–border2);margin:0 4px;flex-shrink:0}
.hdr-round{flex:1;font-size:11px;font-weight:700;color:var(–text2);letter-spacing:1px;text-transform:uppercase}
.hdr-round span{color:var(–text)}
.hdr-cat{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,0.06);border:1px solid var(–border2);border-radius:6px;padding:5px 10px;font-size:11px;font-weight:700;color:var(–gold);cursor:pointer}
.hdr-btns{display:flex;gap:5px}
.hbtn{background:rgba(255,255,255,0.06);border:1px solid var(–border);color:var(–text2);padding:5px 8px;border-radius:7px;cursor:pointer;font-size:12px;transition:all 0.2s}
.hbtn:hover{border-color:var(–border2);color:var(–text)}

/* LAYOUT */
#main{display:flex;flex:1;overflow:hidden;padding:10px;gap:10px}

/* TEAMS SIDEBAR */
#sidebar{width:128px;flex-shrink:0;display:flex;flex-direction:column;gap:7px}
.tcard{border-radius:var(–r2);padding:10px 12px;border:2px solid transparent;transition:all 0.3s;position:relative;overflow:hidden}
.tcard::before{content:’’;position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.06),transparent);pointer-events:none}
.tcard.active{border-color:var(–tc,#fff);box-shadow:0 0 0 3px rgba(var(–tc-r),0.2),0 4px 20px rgba(var(–tc-r),0.25);transform:scale(1.03)}
.tcard.active::after{content:‘▶’;position:absolute;right:-2px;top:50%;transform:translateY(-50%);color:var(–tc);font-size:13px}
.tc-name{font-size:9px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:2px}
.tc-score{font-family:‘Oswald’,sans-serif;font-size:32px;font-weight:700;line-height:1;color:#fff;transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1)}
.tc-score.bump{transform:scale(1.25)}
.tc-lbl{font-size:8px;color:rgba(255,255,255,0.35);letter-spacing:1px;text-transform:uppercase;margin-top:2px}

/* CENTER */
#center{flex:1;display:flex;flex-direction:column;gap:8px;overflow:hidden;min-width:0}
.info-bar{display:flex;align-items:center;justify-content:space-between;padding:6px 12px;background:rgba(15,32,53,0.8);border:1px solid var(–border);border-radius:8px;font-size:11px;flex-shrink:0}
.ib-turn{color:var(–text2);font-weight:700;letter-spacing:1px;text-transform:uppercase}
.ib-turn span{color:var(–text)}
.ib-cat{color:var(–gold);font-weight:700}
.final-banner{display:none;text-align:center;padding:8px;background:rgba(240,180,41,0.1);border:1px solid rgba(240,180,41,0.4);border-radius:8px;font-family:‘Oswald’,sans-serif;font-size:13px;color:var(–gold);letter-spacing:3px;font-weight:700;animation:gpulse 2s ease infinite;flex-shrink:0}
.final-banner.show{display:block}
@keyframes gpulse{0%,100%{box-shadow:0 0 8px rgba(240,180,41,0.1)}50%{box-shadow:0 0 20px rgba(240,180,41,0.3)}}
.grid-wrap{flex:1;background:rgba(10,21,37,0.6);border:1px solid var(–border);border-radius:var(–r2);padding:10px;overflow:auto;min-height:0}
.gcols{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:4px}
.gcol-h{text-align:center;font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(–text3);padding:3px}
#qgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}

/* CELLS */
.qcell{aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:var(–r);cursor:pointer;border:1.5px solid transparent;transition:all 0.2s;position:relative;overflow:hidden;user-select:none}
.qcell::before{content:’’;position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.07),transparent);pointer-events:none}
.cell-n{font-family:‘Oswald’,sans-serif;font-size:clamp(16px,3vw,24px);font-weight:700;line-height:1;color:#fff}
.cell-s{font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-top:1px;opacity:0.65}
.cell-btag{position:absolute;bottom:3px;left:50%;transform:translateX(-50%);font-size:6px;font-weight:900;background:rgba(240,180,41,0.2);border:1px solid rgba(240,180,41,0.5);border-radius:3px;padding:1px 3px;color:var(–gold);white-space:nowrap}
.qcell[data-p=“10”]{background:linear-gradient(145deg,#1a3a6e,#142d58)}
.qcell[data-p=“10”] .cell-n{color:#7ec8ff}
.qcell[data-p=“10”] .cell-s{color:#5aa0d0}
.qcell[data-p=“10”]:hover:not(.used){background:linear-gradient(145deg,#1e4880,#183568);border-color:#4a9eff;transform:scale(1.06);box-shadow:0 4px 14px rgba(74,158,255,0.4)}
.qcell[data-p=“20”]{background:linear-gradient(145deg,#5a2d00,#472200)}
.qcell[data-p=“20”] .cell-n{color:#ffb84a}
.qcell[data-p=“20”] .cell-s{color:#c88020}
.qcell[data-p=“20”]:hover:not(.used){background:linear-gradient(145deg,#6e3800,#582a00);border-color:var(–gold);transform:scale(1.06);box-shadow:0 4px 14px rgba(240,180,41,0.4)}
.qcell[data-p=“30”]{background:linear-gradient(145deg,#5a1010,#451010)}
.qcell[data-p=“30”] .cell-n{color:#ff8080}
.qcell[data-p=“30”] .cell-s{color:#c04040}
.qcell[data-p=“30”]:hover:not(.used){background:linear-gradient(145deg,#6e1515,#581212);border-color:#ff5555;transform:scale(1.06);box-shadow:0 4px 14px rgba(255,85,85,0.4)}
.qcell.bonus{border-color:rgba(240,180,41,0.55)!important}
.qcell.used{background:rgba(255,255,255,0.03)!important;border-color:transparent!important;opacity:0.28;cursor:not-allowed;transform:none!important;box-shadow:none!important}
.qcell.used::before{display:none}
.qcell.ac{background:linear-gradient(145deg,#0d4a1e,#0a3a16)!important;border-color:#1db954!important;opacity:0.4}
.qcell.aw{background:linear-gradient(145deg,#4a0d0d,#3a0a0a)!important;border-color:#e63b3b!important;opacity:0.4}

/* COLLAPSE PANELS */
.cpanel{background:rgba(10,21,37,0.85);border:1px solid var(–border);border-radius:var(–r);overflow:hidden;flex-shrink:0}
.cph{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;cursor:pointer;transition:background 0.2s}
.cph:hover{background:rgba(255,255,255,0.04)}
.cph-title{font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(–text2)}
.cph-arrow{color:var(–text3);font-size:11px;transition:transform 0.2s}
.cph-arrow.open{transform:rotate(180deg)}
.cpb{display:none;padding:0 12px 10px}
.cpb.open{display:block}

/* QUESTION MODAL */
.overlay{position:fixed;inset:0;z-index:500;background:rgba(5,12,22,0.85);backdrop-filter:blur(10px);display:flex;align-items:flex-start;justify-content:flex-end;padding:58px 10px 10px 10px;opacity:0;pointer-events:none;transition:opacity 0.25s}
.overlay.show{opacity:1;pointer-events:all}
.qmod{width:min(400px,calc(100vw - 20px));background:linear-gradient(160deg,#0f2035,#0a1828);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:18px;box-shadow:0 20px 60px rgba(0,0,0,0.7);transform:translateY(-6px) scale(0.97);transition:transform 0.25s;max-height:calc(100vh - 76px);overflow-y:auto;position:relative}
.overlay.show .qmod{transform:translateY(0) scale(1)}

/* Circular timer */
.timer-wrap{display:flex;justify-content:center;margin-bottom:12px}
.tring{position:relative;width:76px;height:76px}
.tring svg{position:absolute;inset:0;transform:rotate(-90deg)}
.tring svg circle{fill:none;stroke-width:5}
.t-bg{stroke:rgba(255,255,255,0.08)}
.t-arc{stroke:var(–gold);stroke-linecap:round;transition:stroke-dashoffset 1s linear,stroke 0.5s}
.t-arc.low{stroke:#e63b3b}
.t-inner{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.t-num{font-family:‘Oswald’,sans-serif;font-size:22px;font-weight:700;color:#fff;line-height:1}
.t-num.low{color:#e63b3b;animation:tp 0.5s ease infinite}
.t-sec{font-size:8px;font-weight:700;letter-spacing:2px;color:var(–text2);text-transform:uppercase}
@keyframes tp{0%,100%{opacity:1}50%{opacity:0.5}}

/* Q content */
.q-badge{display:inline-flex;align-items:center;justify-content:center;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:0.5px;margin-bottom:10px;width:100%;text-align:center}
.q-text{font-family:‘Oswald’,sans-serif;font-size:clamp(15px,3vw,19px);font-weight:600;text-align:center;line-height:1.4;color:#fff;margin-bottom:14px;text-transform:uppercase;letter-spacing:0.3px}

/* Options */
.opts{display:flex;flex-direction:column;gap:7px;margin-bottom:12px}
.opt{display:flex;align-items:center;gap:9px;padding:10px 12px;background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);border-radius:9px;cursor:pointer;transition:all 0.15s;position:relative}
.opt:hover:not(.locked){background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);transform:translateX(2px)}
.opt.sel{border-color:rgba(255,255,255,0.25);background:rgba(255,255,255,0.07)}
.opt-l{width:27px;height:27px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.2);font-family:‘Oswald’,sans-serif;font-size:12px;font-weight:700;color:var(–text);transition:all 0.15s}
.opt.sel .opt-l{background:rgba(255,255,255,0.18);border-color:rgba(255,255,255,0.5);color:#fff}
.opt-t{font-size:12px;font-weight:600;color:var(–text);flex:1;line-height:1.3}
.opt.rc{background:rgba(29,185,84,0.14)!important;border-color:#1db954!important}
.opt.rc .opt-l{background:rgba(29,185,84,0.3);border-color:#1db954;color:#1db954}
.opt.rc .opt-t{color:#2ecc71}
.opt.rw{background:rgba(230,59,59,0.12)!important;border-color:#e63b3b!important}
.opt.rw .opt-l{background:rgba(230,59,59,0.25);border-color:#e63b3b;color:#e63b3b}
.opt.rw .opt-t{color:#ff6666}
.opt.rn{opacity:0.3}
.opt.locked{cursor:not-allowed}

.sbtn{width:100%;padding:12px;border-radius:9px;font-family:‘Oswald’,sans-serif;font-size:15px;font-weight:600;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border:none;transition:all 0.2s}
.sbtn.primary{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:var(–text)}
.sbtn.primary:hover:not(:disabled){background:rgba(255,255,255,0.14)}
.sbtn.primary:disabled{opacity:0.3;cursor:not-allowed}
.sbtn.cont{background:linear-gradient(135deg,var(–gold),#c08010);color:#1a0f00;font-weight:800;box-shadow:0 4px 14px rgba(240,180,41,0.35)}
.sbtn.cont:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(240,180,41,0.5)}

.res-row{display:none;flex-direction:column;align-items:center;gap:3px;padding:12px 0 4px;text-align:center}
.res-row.show{display:flex}
.res-icon{font-size:38px}
.res-pts{font-family:‘Oswald’,sans-serif;font-size:22px;font-weight:700}
.res-pts.p{color:#2ecc71}.res-pts.n{color:#ff6666}
.res-ans{font-size:11px;color:var(–text2);margin-top:2px}
.res-ans strong{color:var(–gold)}

/* SETUP */
#scr-setup{flex:1;overflow-y:auto;display:none;padding:14px}
.setup-inner{max-width:580px;margin:0 auto}
.setup-title{text-align:center;font-family:‘Oswald’,sans-serif;font-size:clamp(20px,5vw,34px);font-weight:700;letter-spacing:2px;color:var(–gold);text-shadow:var(–glow-gold);margin:12px 0 4px}
.setup-sub{text-align:center;color:var(–text2);font-size:12px;margin-bottom:20px}
.sc{background:rgba(15,32,53,0.88);border:1px solid var(–border2);border-radius:var(–r2);padding:16px;margin-bottom:12px}
.sc-t{font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:var(–text2);margin-bottom:10px}
.tc-row{display:flex;gap:8px}
.tc-btn{flex:1;padding:12px;border-radius:var(–r);background:rgba(255,255,255,0.04);border:2px solid var(–border);color:var(–text2);font-family:‘Oswald’,sans-serif;font-size:26px;font-weight:700;cursor:pointer;transition:all 0.2s;text-align:center}
.tc-btn.active{border-color:var(–gold);color:var(–gold);background:rgba(240,180,41,0.1);box-shadow:var(–glow-gold)}
.cat-grid{display:grid;grid-template-columns:1fr;gap:7px}
.cat-btn{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:var(–r);background:rgba(255,255,255,0.04);border:2px solid var(–border);color:var(–text2);cursor:pointer;transition:all 0.2s;font-size:13px;font-weight:700}
.cat-btn:hover{border-color:var(–border2);color:var(–text)}
.cat-btn.active{border-color:var(–gold);color:var(–gold);background:rgba(240,180,41,0.08)}
.tog-list{display:flex;flex-direction:column;gap:7px}
.tog-row{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:rgba(255,255,255,0.03);border:1px solid var(–border);border-radius:8px}
.tog-lbl{font-size:12px;font-weight:700;color:var(–text2)}
.tog{width:38px;height:21px;border-radius:10px;background:var(–text3);border:none;cursor:pointer;position:relative;transition:background 0.2s;flex-shrink:0}
.tog::after{content:’’;position:absolute;top:3px;left:3px;width:15px;height:15px;background:#fff;border-radius:50%;transition:left 0.2s}
.tog.on{background:var(–gold)}.tog.on::after{left:20px}
.rng-row{display:flex;align-items:center;gap:8px;margin-top:4px}
.rng{flex:1;-webkit-appearance:none;appearance:none;height:5px;border-radius:3px;background:rgba(255,255,255,0.1);outline:none}
.rng::-webkit-slider-thumb{-webkit-appearance:none;width:17px;height:17px;border-radius:50%;background:var(–gold);cursor:pointer;border:2px solid #a07010}
.rng-v{min-width:46px;text-align:center;font-family:‘Oswald’,sans-serif;font-size:13px;font-weight:600;color:var(–gold);background:rgba(240,180,41,0.1);border:1px solid rgba(240,180,41,0.25);padding:3px 6px;border-radius:6px}
.tinput{flex:1;padding:8px 11px;background:rgba(255,255,255,0.05);border:1.5px solid var(–border2);border-radius:8px;color:var(–text);font-family:‘Exo 2’,sans-serif;font-size:13px;outline:none;transition:border-color 0.2s}
.tinput:focus{border-color:var(–gold)}
.start-btn{width:100%;padding:14px;background:linear-gradient(135deg,var(–gold),#b07010);border:none;border-radius:var(–r);font-family:‘Oswald’,sans-serif;font-size:17px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1a0f00;cursor:pointer;box-shadow:0 6px 22px rgba(240,180,41,0.4);transition:all 0.2s;margin-top:4px}
.start-btn:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(240,180,41,0.55)}

/* WINNER */
#scr-win{flex:1;display:none;flex-direction:column;align-items:center;justify-content:center;padding:20px;text-align:center;overflow-y:auto}
#scr-win.show{display:flex}
.w-crown{font-size:68px;animation:flt 3s ease infinite;margin-bottom:10px}
@keyframes flt{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.w-title{font-family:‘Oswald’,sans-serif;font-size:clamp(26px,7vw,50px);font-weight:700;color:var(–gold);text-shadow:var(–glow-gold);margin-bottom:5px}
.w-sub{color:var(–text2);font-size:12px;margin-bottom:24px}
.podium{display:flex;align-items:flex-end;justify-content:center;margin-bottom:24px}
.pp{display:flex;flex-direction:column;align-items:center;padding:12px 16px;border-radius:9px 9px 0 0;min-width:100px}
.pp1{background:rgba(240,180,41,0.15);border:2px solid var(–gold);height:140px;order:2}
.pp2{background:rgba(192,192,192,0.1);border:2px solid rgba(192,192,192,0.4);height:105px;order:1;border-right:none}
.pp3{background:rgba(205,127,50,0.1);border:2px solid rgba(205,127,50,0.4);height:75px;order:3;border-left:none}
.pp-med{font-size:24px;margin-bottom:3px}
.pp-nm{font-family:‘Oswald’,sans-serif;font-size:11px;font-weight:600;color:var(–text)}
.pp-sc{font-family:‘Oswald’,sans-serif;font-size:20px;font-weight:700}
.pp1 .pp-sc{color:var(–gold)}.pp2 .pp-sc{color:#c0c0c0}.pp3 .pp-sc{color:#cd7f32}
.w-acts{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.wbtn{padding:11px 24px;border-radius:8px;font-family:‘Oswald’,sans-serif;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border:none;transition:all 0.2s}
.wbtn.p{background:linear-gradient(135deg,var(–gold),#b07010);color:#1a0f00;box-shadow:0 4px 14px rgba(240,180,41,0.4)}
.wbtn.s{background:rgba(255,255,255,0.06);border:1.5px solid var(–border2);color:var(–text)}

/* BOTTOM NAV */
#bnav{display:flex;align-items:center;justify-content:space-between;padding:7px 14px;background:rgba(6,14,26,0.98);border-top:1px solid var(–border);flex-shrink:0;gap:6px}
.bnav-g{display:flex;gap:4px}
.nbtn{display:flex;align-items:center;justify-content:center;padding:6px 9px;border-radius:7px;border:none;background:transparent;color:var(–text3);cursor:pointer;font-size:16px;transition:all 0.2s}
.nbtn:hover{color:var(–text2);background:rgba(255,255,255,0.05)}
.nbtn.a{color:var(–gold)}
.bnav-mid{display:flex;gap:7px;align-items:center;flex:1;justify-content:center}
.nact{display:flex;align-items:center;gap:4px;padding:5px 12px;border-radius:7px;background:rgba(255,255,255,0.05);border:1px solid var(–border2);color:var(–text2);font-size:11px;font-weight:700;cursor:pointer;transition:all 0.2s;text-transform:uppercase;letter-spacing:0.5px}
.nact:hover{background:rgba(255,255,255,0.09);color:var(–text)}
.bnav-r{display:flex;gap:4px}
.tbtn{padding:5px 8px;font-size:12px;border:none;background:rgba(255,255,255,0.07);cursor:pointer;color:var(–text3);transition:all 0.2s;border-radius:6px}
.tbtn:hover,.tbtn.a{background:rgba(255,255,255,0.12);color:var(–gold)}

/* ADMIN MODAL */
.aov{position:fixed;inset:0;z-index:800;background:rgba(3,8,16,0.88);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;pointer-events:none;transition:opacity 0.25s}
.aov.show{opacity:1;pointer-events:all}
.amod{background:linear-gradient(160deg,#0f2035,#0a1828);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:22px;width:min(560px,100%);max-height:88vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.7)}
.amh{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(–border)}
.am-title{font-family:‘Oswald’,sans-serif;font-size:17px;color:var(–gold)}
.am-cl{background:rgba(255,255,255,0.07);border:none;color:var(–text2);font-size:15px;cursor:pointer;width:27px;height:27px;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:all 0.2s}
.am-cl:hover{background:rgba(255,255,255,0.14);color:#fff}
.atabs{display:flex;gap:4px;margin-bottom:14px;flex-wrap:wrap}
.atab{padding:6px 13px;border-radius:7px;background:rgba(255,255,255,0.05);border:1px solid var(–border);color:var(–text2);cursor:pointer;font-size:11px;font-weight:700;transition:all 0.2s}
.atab.active{background:rgba(240,180,41,0.12);border-color:rgba(240,180,41,0.4);color:var(–gold)}
.atc{display:none}.atc.active{display:block}
.qlist{display:flex;flex-direction:column;gap:5px;max-height:300px;overflow-y:auto}
.qli{display:flex;align-items:center;gap:7px;padding:7px 9px;background:rgba(255,255,255,0.04);border:1px solid var(–border);border-radius:6px}
.qli-p{font-family:‘Oswald’,sans-serif;font-size:13px;font-weight:700;color:var(–gold);min-width:30px}
.qli-t{flex:1;font-size:11px;color:var(–text2)}
.adel{padding:3px 7px;background:rgba(230,59,59,0.14);border:1px solid rgba(230,59,59,0.3);color:#ff7070;border-radius:5px;cursor:pointer;font-size:10px}
.adel:hover{background:rgba(230,59,59,0.25)}
.albl{display:block;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(–text2);margin-bottom:4px}
.ainp{width:100%;padding:8px 11px;background:rgba(255,255,255,0.05);border:1.5px solid var(–border2);border-radius:7px;color:var(–text);font-family:‘Exo 2’,sans-serif;font-size:12px;outline:none;transition:border-color 0.2s;margin-bottom:9px}
.ainp:focus{border-color:var(–gold)}
textarea.ainp{resize:vertical;min-height:56px}
.asel{appearance:none;cursor:pointer}
.abtn{padding:8px 16px;border-radius:7px;font-family:‘Exo 2’,sans-serif;font-size:12px;font-weight:700;cursor:pointer;border:none;transition:all 0.2s}
.abg{background:linear-gradient(135deg,var(–gold),#a07010);color:#1a0f00}
.abo{background:transparent;border:1.5px solid var(–border2);color:var(–text2)}
.abo:hover{border-color:var(–gold);color:var(–gold)}
.abd{background:rgba(230,59,59,0.14);border:1px solid rgba(230,59,59,0.3);color:#ff7070}
.abd:hover{background:rgba(230,59,59,0.24)}
.aflex{display:flex;gap:7px;flex-wrap:wrap}

/* HISTORY */
.hlist{display:flex;flex-direction:column;gap:7px;max-height:360px;overflow-y:auto}
.hitem{padding:9px 11px;background:rgba(255,255,255,0.04);border:1px solid var(–border);border-radius:7px}
.hdate{font-size:9px;color:var(–text3);margin-bottom:2px}
.hwinner{font-weight:700;color:var(–gold);font-size:12px}
.hscores{font-size:10px;color:var(–text2);margin-top:2px}

/* TOURN TABLE */
.tt{width:100%;border-collapse:collapse;font-size:11px}
.tt th{padding:5px 7px;text-align:left;color:var(–text3);font-weight:700;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid var(–border)}
.tt td{padding:6px 7px;border-bottom:1px solid rgba(255,255,255,0.04);color:var(–text)}
.tt tr.lead td{color:var(–gold)}

/* SCORE POPUP */
.spop{position:fixed;pointer-events:none;font-family:‘Oswald’,sans-serif;font-size:28px;font-weight:700;z-index:900;animation:spop 1.2s ease forwards;text-shadow:0 2px 8px rgba(0,0,0,0.5)}
@keyframes spop{0%{transform:translateY(0) scale(1);opacity:1}100%{transform:translateY(-65px) scale(1.1);opacity:0}}

/* TOAST */
#toastwrap{position:fixed;bottom:65px;right:14px;z-index:999;display:flex;flex-direction:column;gap:5px}
.toast{padding:9px 14px;border-radius:8px;background:var(–panel);border:1px solid var(–border2);color:var(–text);font-size:11px;font-weight:700;box-shadow:var(–shadow);animation:tsl 0.3s ease;max-width:260px}
.toast.s{border-color:var(–green);color:#2ecc71}
.toast.e{border-color:var(–red);color:#ff6666}
.toast.i{border-color:rgba(240,180,41,0.5);color:var(–gold)}
@keyframes tsl{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}

#cvs{position:fixed;inset:0;pointer-events:none;z-index:9999}

[data-theme=“light”]{
–bg:#dce8f5;–bg2:#cdd8e8;–bg3:#c4d0e0;
–panel:#cdd8ea;–panel2:#b8c8dc;
–border:rgba(0,40,80,0.1);–border2:rgba(0,40,80,0.2);
–text:#0a1828;–text2:#3a5a78;–text3:#6080a0;
}
[data-theme=“light”] body{background-image:radial-gradient(ellipse 80% 40% at 50% 100%,rgba(190,215,240,0.95) 0%,transparent 100%)}
[data-theme=“light”] #hdr,[data-theme=“light”] #bnav{background:rgba(210,228,248,0.97)!important}
[data-theme=“light”] .qmod,[data-theme=“light”] .sc,[data-theme=“light”] .amod{background:linear-gradient(160deg,#cdd8ea,#bccade)}
[data-theme=“light”] .overlay{background:rgba(120,160,200,0.7)}
[data-theme=“light”] .tinput,[data-theme=“light”] .ainp{background:rgba(255,255,255,0.55);color:#0a1828;border-color:rgba(0,40,80,0.2)}

body.proj .cell-n{font-size:clamp(20px,3.5vw,30px)!important}

/* ══ AI CHATBOT ══ */
#chatbot-btn{position:fixed;bottom:70px;right:16px;z-index:200;width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,var(–gold),#c08010);border:none;cursor:pointer;font-size:22px;box-shadow:0 4px 18px rgba(240,180,41,0.5);transition:all 0.25s;display:flex;align-items:center;justify-content:center}
#chatbot-btn:hover{transform:scale(1.12);box-shadow:0 6px 24px rgba(240,180,41,0.7)}
#chatbot-btn .cbadge{position:absolute;top:-3px;right:-3px;width:14px;height:14px;background:var(–red);border-radius:50%;font-size:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;display:none}
#chat-panel{position:fixed;bottom:130px;right:16px;z-index:201;width:min(360px,calc(100vw - 32px));height:min(480px,calc(100vh - 160px));background:linear-gradient(160deg,var(–panel),var(–bg2));border:1px solid var(–border2);border-radius:18px;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.7);transform:scale(0.85) translateY(20px);opacity:0;pointer-events:none;transition:all 0.28s cubic-bezier(0.34,1.56,0.64,1)}
#chat-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
.chat-head{padding:13px 16px;border-bottom:1px solid var(–border);display:flex;align-items:center;gap:10px;flex-shrink:0}
.chat-head-icon{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(–gold),#c08010);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.chat-head-info{flex:1}
.chat-head-title{font-family:‘Oswald’,sans-serif;font-size:14px;font-weight:700;color:var(–text);letter-spacing:0.5px}
.chat-head-sub{font-size:10px;color:var(–text2);margin-top:1px}
.chat-head-dot{width:8px;height:8px;border-radius:50%;background:var(–green);box-shadow:0 0 6px var(–green);display:inline-block;margin-right:5px}
.chat-close{background:none;border:none;color:var(–text2);font-size:16px;cursor:pointer;padding:4px;border-radius:6px;transition:color 0.2s}
.chat-close:hover{color:var(–text)}
.chat-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}
.chat-msgs::-webkit-scrollbar{width:3px}
.chat-msgs::-webkit-scrollbar-thumb{background:var(–panel2);border-radius:2px}
.cmsg{max-width:85%;padding:9px 12px;border-radius:12px;font-size:12px;line-height:1.5;animation:msgIn 0.2s ease}
@keyframes msgIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.cmsg.bot{background:var(–panel2);border:1px solid var(–border);color:var(–text);border-bottom-left-radius:4px;align-self:flex-start}
.cmsg.user{background:linear-gradient(135deg,var(–gold),#c08010);color:#1a0f00;font-weight:600;border-bottom-right-radius:4px;align-self:flex-end}
.cmsg.sys{background:rgba(29,185,84,0.1);border:1px solid rgba(29,185,84,0.3);color:var(–green);font-size:11px;align-self:center;border-radius:8px;text-align:center;font-weight:600}
.cmsg.err{background:rgba(230,59,59,0.1);border:1px solid rgba(230,59,59,0.3);color:var(–red);font-size:11px;align-self:center;border-radius:8px;text-align:center}
.chat-typing{display:flex;gap:4px;padding:9px 12px;background:var(–panel2);border-radius:12px;border-bottom-left-radius:4px;width:fit-content;display:none}
.chat-typing span{width:7px;height:7px;border-radius:50%;background:var(–text2);animation:tdot 1.2s ease infinite}
.chat-typing span:nth-child(2){animation-delay:0.2s}
.chat-typing span:nth-child(3){animation-delay:0.4s}
@keyframes tdot{0%,60%,100%{transform:translateY(0);opacity:0.4}30%{transform:translateY(-5px);opacity:1}}
.chat-input-area{padding:10px 12px;border-top:1px solid var(–border);display:flex;gap:7px;flex-shrink:0}
.chat-inp{flex:1;background:rgba(255,255,255,0.06);border:1px solid var(–border2);border-radius:10px;padding:9px 12px;color:var(–text);font-family:‘Exo 2’,sans-serif;font-size:12px;outline:none;transition:border-color 0.2s;resize:none}
.chat-inp:focus{border-color:var(–gold)}
.chat-inp::placeholder{color:var(–text3)}
.chat-send{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(–gold),#c08010);border:none;color:#1a0f00;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0}
.chat-send:hover{transform:scale(1.08)}
.chat-send:disabled{opacity:0.4;cursor:not-allowed;transform:none}
.chat-api-row{padding:0 12px 10px;flex-shrink:0}
.chat-api-inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid var(–border);border-radius:8px;padding:7px 10px;color:var(–text2);font-family:‘Exo 2’,sans-serif;font-size:10px;outline:none;transition:border-color 0.2s}
.chat-api-inp:focus{border-color:var(–gold);color:var(–text)}
.chat-api-inp::placeholder{color:var(–text3)}
.chat-hint{display:flex;flex-wrap:wrap;gap:5px;padding:0 12px 8px;flex-shrink:0}
.chint{background:rgba(255,255,255,0.05);border:1px solid var(–border2);border-radius:16px;padding:4px 10px;font-size:10px;color:var(–text2);cursor:pointer;transition:all 0.15s;white-space:nowrap}
.chint:hover{background:rgba(240,180,41,0.1);border-color:var(–gold);color:var(–gold)}
.cat-added-card{background:rgba(240,180,41,0.08);border:1px solid rgba(240,180,41,0.3);border-radius:10px;padding:10px 12px;margin-top:4px;font-size:11px}
.cat-added-title{font-weight:700;color:var(–gold);margin-bottom:4px;font-size:12px}
.cat-added-info{color:var(–text2);font-size:10px}
.cat-play-btn{margin-top:8px;width:100%;padding:8px;background:linear-gradient(135deg,var(–gold),#c08010);border:none;border-radius:8px;color:#1a0f00;font-family:‘Oswald’,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;cursor:pointer;transition:all 0.2s}
.cat-play-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(240,180,41,0.4)}
body.proj .q-text{font-size:clamp(18px,3.5vw,26px)!important}
body.proj .t-num{font-size:28px!important}
body.proj .opt-t{font-size:15px!important}
body.proj .tc-score{font-size:40px!important}

/* ══════════════════════════════════════
RESPONSIVE — TABLET (768px+)
══════════════════════════════════════ */
@media(min-width:768px){
#main{padding:14px;gap:14px}
#sidebar{width:150px;gap:10px}
.tcard{padding:12px 16px}
.tc-name{font-size:10px;letter-spacing:2px}
.tc-score{font-size:38px}
.tc-lbl{font-size:9px}
#qgrid{gap:10px}
.gcols{gap:8px}
.cell-n{font-size:clamp(20px,2.8vw,28px)!important}
.cell-s{font-size:9px}
.cell-btag{font-size:7px}
.info-bar{padding:8px 16px;font-size:12px}
.cpanel{border-radius:12px}
.cph{padding:10px 16px}
.cph-title{font-size:11px}
/* Setup wider */
.setup-inner{max-width:640px}
.cat-grid{grid-template-columns:1fr 1fr}
.sc{padding:20px}
/* Q modal: place on right side, not full overlay */
.overlay{padding:58px 16px 16px 16px}
.qmod{width:min(440px,50vw)}
.q-text{font-size:clamp(16px,2.2vw,20px)!important}
.opt-t{font-size:13px}
.tring{width:84px;height:84px}
.t-num{font-size:26px!important}
/* Header */
#hdr{padding:10px 20px}
.hdr-logo-m{font-size:17px}
.hdr-logo-s{font-size:9px}
.hdr-round{font-size:12px}
/* Bottom nav */
#bnav{padding:9px 20px}
}

/* ══════════════════════════════════════
RESPONSIVE — LAPTOP (1024px+)
Full landscape layout
══════════════════════════════════════ */
@media(min-width:1024px){
body{overflow:hidden}
#main{padding:16px 20px;gap:16px}
/* Sidebar wider on laptop */
#sidebar{width:170px;gap:12px}
.tcard{padding:14px 18px;border-radius:16px}
.tc-name{font-size:11px;letter-spacing:2px}
.tc-score{font-size:44px}
.tc-lbl{font-size:9px}
/* Grid larger */
#qgrid{gap:12px}
.gcols{gap:10px;margin-bottom:8px}
.gcol-h{font-size:10px;letter-spacing:3px;padding:5px}
.cell-n{font-size:clamp(22px,2.2vw,32px)!important}
.cell-s{font-size:10px;letter-spacing:2px}
.cell-btag{font-size:8px;padding:2px 5px}
/* Grid has more rows on laptop — expand */
.grid-wrap{padding:14px}
/* Info bar */
.info-bar{padding:10px 18px;font-size:13px;border-radius:10px}
.ib-turn{font-size:12px;letter-spacing:2px}
.ib-cat{font-size:13px}
/* Final banner */
.final-banner{font-size:15px;letter-spacing:4px;padding:10px}
/* Collapse panels */
.cph{padding:12px 18px}
.cph-title{font-size:11px;letter-spacing:3px}
.cpb{padding:0 18px 14px}
/* Q modal: floats on right, vertically centered */
.overlay{
padding:56px 20px 20px;
align-items:center;
}
.qmod{
width:min(460px,38vw);
max-height:calc(100vh - 90px);
border-radius:20px;
padding:24px;
}
.tring{width:92px;height:92px}
.tring svg{width:92px;height:92px}
.tring svg circle{stroke-width:5.5}
#tarc{stroke-dasharray:233.8}
.t-num{font-size:28px!important}
.q-badge{font-size:12px;padding:5px 18px}
.q-text{font-size:clamp(17px,1.7vw,22px)!important;margin-bottom:18px}
.opt{padding:12px 16px;gap:12px;border-radius:11px}
.opt-l{width:32px;height:32px;font-size:14px}
.opt-t{font-size:14px}
.opts{gap:9px;margin-bottom:16px}
.sbtn{padding:13px;font-size:16px}
.res-icon{font-size:46px}
.res-pts{font-size:26px}
/* Header */
#hdr{padding:11px 24px;gap:14px}
.hdr-logo-m{font-size:18px}
.hdr-logo-s{font-size:9px;letter-spacing:4px}
.hdr-sep{height:34px}
.hdr-round{font-size:12px}
.hdr-cat{padding:6px 14px;font-size:12px}
.hbtn{padding:6px 10px;font-size:14px}
/* Bottom nav */
#bnav{padding:10px 24px}
.nact{padding:7px 16px;font-size:12px}
.tbtn{padding:6px 10px;font-size:13px}
/* Setup */
.setup-inner{max-width:720px}
.cat-grid{grid-template-columns:1fr 1fr}
.sc{padding:22px;border-radius:16px}
.setup-title{font-size:clamp(24px,3.5vw,40px)}
/* Winner screen */
.pp{min-width:130px;padding:16px 22px}
.pp1{height:170px}
.pp2{height:130px}
.pp3{height:95px}
.pp-med{font-size:32px}
.pp-nm{font-size:13px}
.pp-sc{font-size:26px}
.w-crown{font-size:80px}
}

/* ══════════════════════════════════════
RESPONSIVE — WIDE DESKTOP (1280px+)
3-column layout with more space
══════════════════════════════════════ */
@media(min-width:1280px){
#main{padding:18px 28px;gap:20px;max-width:1400px;margin:0 auto}
#sidebar{width:190px;gap:14px}
.tcard{padding:16px 20px}
.tc-score{font-size:52px}
/* Grid: show 6 or 9 cols based on team count */
#qgrid{gap:14px}
.gcols{gap:12px}
.cell-n{font-size:clamp(24px,2vw,36px)!important}
/* Q modal center-right */
.overlay{padding:60px 28px 28px}
.qmod{width:min(500px,36vw)}
.q-text{font-size:clamp(18px,1.5vw,24px)!important}
.opt-t{font-size:15px}
.tring{width:100px;height:100px}
.tring svg{width:100px;height:100px}
#tarc{stroke-dasharray:251.3}
.t-num{font-size:32px!important}
/* Larger header */
#hdr{padding:12px 32px}
.hdr-logo-m{font-size:20px}
.hdr-round{font-size:13px}
}

/* ══════════════════════════════════════
RESPONSIVE — SMALL PHONE (< 480px)
══════════════════════════════════════ */
@media(max-width:480px){
#main{padding:7px;gap:7px}
#sidebar{width:100px}
.tcard{padding:8px 10px}
.tc-score{font-size:26px}
.tc-name{font-size:8px}
.cell-n{font-size:clamp(14px,4vw,20px)!important}
.info-bar{padding:5px 10px;font-size:10px}
.ib-turn{font-size:9px}
.qmod{padding:14px}
.tring{width:68px;height:68px}
.t-num{font-size:18px!important}
.q-text{font-size:14px!important}
.opt-t{font-size:11px}
.opt{padding:9px 10px}
#hdr{padding:7px 10px;gap:6px}
.hdr-logo-m{font-size:13px}
.hdr-logo-s{display:none}
.hdr-sep{display:none}
#bnav{padding:6px 10px}
.nact{padding:4px 8px;font-size:10px}
}

/* ══════════════════════════════════════
GAME LAYOUT — LANDSCAPE on laptop
Key: center area fills all available
space nicely without overflow
══════════════════════════════════════ */
@media(min-width:1024px) and (max-height:700px){
/* Short screens (landscape tablet/laptop) */
.tring{width:72px;height:72px}
.t-num{font-size:22px!important}
.timer-wrap{margin-bottom:8px}
.q-badge{margin-bottom:6px}
.q-text{margin-bottom:10px;font-size:15px!important}
.opts{gap:6px;margin-bottom:9px}
.opt{padding:9px 12px}
.sbtn{padding:10px}
.res-icon{font-size:32px}
.res-pts{font-size:20px}
}
</style>

</head>
<body>

<div id="hdr">
  <div class="hdr-logo"><div class="hdr-logo-m">QAZAQSTAN</div><div class="hdr-logo-s">Quiz Tournament</div></div>
  <div class="hdr-sep"></div>
  <div class="hdr-round">РАУНД <span id="hrd-n">1</span>: СЫНИ СҰРАҚТАР</div>
  <div class="hdr-cat" onclick="openAdmin()"><span id="hrd-cat">—</span> ▾</div>
  <div class="hdr-btns">
    <button class="hbtn" onclick="toggleProj()">🖥️</button>
    <button class="hbtn" onclick="openAdmin()">🔐</button>
  </div>
</div>

<!-- SETUP -->

<div id="scr-setup">
  <div class="setup-inner">
    <div class="setup-title">🏛️ ҚАЗАҚСТАН ТАРИХЫ<br>ТУРНИР ВИКТОРИНАСЫ</div>
    <div class="setup-sub">Оқушылар үшін тарихи турнир ойыны</div>
    <div class="sc"><div class="sc-t">Команда саны</div>
      <div class="tc-row">
        <button class="tc-btn active" data-c="2" onclick="selTC(2)">2</button>
        <button class="tc-btn" data-c="3" onclick="selTC(3)">3</button>
      </div>
    </div>
    <div class="sc"><div class="sc-t">Ойын параметрлері</div>
      <div class="tog-list">
        <div class="tog-row"><span class="tog-lbl">➖ Қате жауап = минус балл</span><button class="tog" id="tg-minus" onclick="togOpt('minus')"></button></div>
        <div class="tog-row"><span class="tog-lbl">🏆 Турнир режимі (5 тур)</span><button class="tog" id="tg-tourn" onclick="togOpt('tournament')"></button></div>
        <div class="tog-row"><span class="tog-lbl">⚡ Финал туры (50 балл)</span><button class="tog" id="tg-final" onclick="togOpt('final')"></button></div>
      </div>
    </div>
    <div class="sc"><div class="sc-t">⏱ Таймер және бонус реттеу</div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div><div class="albl" style="margin-bottom:5px">Таймер уақыты</div>
          <div class="rng-row">
            <span style="font-size:10px;color:var(--text3)">5с</span>
            <input type="range" class="rng" id="r-timer" min="5" max="60" step="5" value="15" oninput="syncR('timer',this.value)">
            <span style="font-size:10px;color:var(--text3)">60с</span>
            <span class="rng-v" id="rv-timer">15 с</span>
          </div>
        </div>
        <div><div class="albl" style="margin-bottom:5px">Бонус ұяшықтар (%)</div>
          <div class="rng-row">
            <span style="font-size:10px;color:var(--text3)">0%</span>
            <input type="range" class="rng" id="r-bonus" min="0" max="50" step="5" value="20" oninput="syncR('bonus',this.value)">
            <span style="font-size:10px;color:var(--text3)">50%</span>
            <span class="rng-v" id="rv-bonus">20%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="sc"><div class="sc-t">Категория таңдаңыз</div><div class="cat-grid" id="cat-grid"></div></div>
    <div class="sc"><div class="sc-t">Команда атаулары</div><div id="team-inps" style="display:flex;flex-direction:column;gap:7px"></div></div>
    <button class="start-btn" onclick="startGame()">⚔️ ОЙЫНДЫ БАСТАУ</button>
  </div>
</div>

<!-- GAME -->

<div id="game-layout" style="display:none;flex:1;overflow:hidden">
  <div id="main">
    <div id="sidebar"></div>
    <div id="center">
      <div class="info-bar">
        <div class="ib-turn">Кезек: <span id="ib-turn">—</span></div>
        <div class="ib-cat" id="ib-cat">—</div>
      </div>
      <div id="fbanner" class="final-banner">⚡ ФИНАЛ ТУРЫ — 50 БАЛЛ ⚡</div>
      <div class="grid-wrap">
        <div class="gcols">
          <div class="gcol-h">10 үпай</div>
          <div class="gcol-h">20 үпай</div>
          <div class="gcol-h">30 үпай</div>
        </div>
        <div id="qgrid"></div>
      </div>
      <!-- collapse panels -->
      <div class="cpanel" id="cp-tourn" style="display:none">
        <div class="cph" onclick="toggleCP('tourn')">
          <div class="cph-title">ТУРНИР КЕСТЕСІ</div>
          <div class="cph-arrow" id="cpa-tourn">▼</div>
        </div>
        <div class="cpb" id="cpb-tourn">
          <table class="tt"><thead><tr><th>#</th><th>Команда</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>Барлық</th></tr></thead><tbody id="tt-body"></tbody></table>
          <div style="display:flex;gap:7px;margin-top:8px">
            <button class="abtn abg" id="btn-nxt" onclick="nextRound()">Келесі тур ▶</button>
            <button class="abtn abd" id="btn-endt" style="display:none" onclick="endTournament()">Аяқтау</button>
          </div>
        </div>
      </div>
      <div class="cpanel" id="cp-winner">
        <div class="cph" onclick="toggleCP('winner')">
          <div class="cph-title">СОҢҒЫ ЖЕҢІМПАЗ:</div>
          <div id="last-win-disp" style="flex:1;padding:0 8px;font-size:11px;color:var(--gold);font-weight:700"></div>
          <div class="cph-arrow" id="cpa-winner">▼</div>
        </div>
        <div class="cpb" id="cpb-winner">
          <div class="hlist" id="hist-preview" style="max-height:140px"></div>
        </div>
      </div>
      <div class="cpanel">
        <div class="cph" onclick="toggleCP('settings')">
          <div class="cph-title">ҒАЛН НАСТРОЙК</div>
          <div class="cph-arrow" id="cpa-settings">▼</div>
        </div>
        <div class="cpb" id="cpb-settings">
          <div class="aflex">
            <button class="abtn abo" onclick="goSetup()">↩ Артқа</button>
            <button class="abtn abo" onclick="openAdmin()">🔐 Мұғалім панелі</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- WINNER -->

<div id="scr-win">
  <div class="w-crown">🏆</div>
  <div class="w-title" id="wname">Жеңімпаз</div>
  <div class="w-sub" id="wsub">Ойын аяқталды!</div>
  <div class="podium" id="wpodium"></div>
  <div class="w-acts">
    <button class="wbtn p" onclick="goSetup()">🔄 Жаңа ойын</button>
    <button class="wbtn s" onclick="openHistory()">📜 Тарих</button>
  </div>
</div>

<!-- QUESTION MODAL -->

<div class="overlay" id="qoverlay">
  <div class="qmod">
    <div class="timer-wrap">
      <div class="tring">
        <svg width="76" height="76" viewBox="0 0 76 76">
          <circle class="t-bg" cx="38" cy="38" r="33"/>
          <circle class="t-arc" id="tarc" cx="38" cy="38" r="33" stroke-dasharray="207.3" stroke-dashoffset="0"/>
        </svg>
        <div class="t-inner">
          <div class="t-num" id="tnum">15</div>
          <div class="t-sec">СЕК</div>
        </div>
      </div>
    </div>
    <div style="text-align:center;margin-bottom:9px">
      <span class="q-badge" id="qbadge">20 ҮПАЙЛЫҚ СҰРАҚ</span>
    </div>
    <div class="q-text" id="qtxt">—</div>
    <div class="opts" id="opts"></div>
    <button class="sbtn primary" id="sbtn" onclick="doSubmit()" disabled>ЖАУАП БЕРУ</button>
    <div class="res-row" id="resrow">
      <div class="res-icon" id="resicon">✅</div>
      <div class="res-pts" id="respts">+20 балл!</div>
      <div class="res-ans" id="resans"></div>
      <button class="sbtn cont" style="margin-top:10px" onclick="closeQModal()">ЖАЛҒАСТЫРУ ▶</button>
    </div>
  </div>
</div>

<!-- ADMIN MODAL -->

<div class="aov" id="adm-ov">
  <div class="amod">
    <div class="amh"><div class="am-title">🔐 МҰҒАЛІМ ПАНЕЛІ</div><button class="am-cl" onclick="closeModal('adm-ov')">✕</button></div>
    <div id="adm-login">
      <div style="margin-bottom:10px"><label class="albl">Құпия сөз</label><input class="ainp" type="password" id="adm-pw" placeholder="Енгізіңіз..." onkeydown="if(event.key==='Enter')checkPw()"></div>
      <button class="abtn abg" style="width:100%" onclick="checkPw()">Кіру</button>
      <div style="font-size:10px;color:var(--text3);text-align:center;margin-top:7px">Әдепкі: <strong>teacher123</strong></div>
    </div>
    <div id="adm-panel" style="display:none">
      <div class="atabs">
        <button class="atab active" onclick="aTab('q')">❓ Сұрақтар</button>
        <button class="atab" onclick="aTab('add')">➕ Қосу</button>
        <button class="atab" onclick="aTab('io')">📦 Import/Export</button>
        <button class="atab" onclick="aTab('data')">🗑️ Деректер</button>
      </div>
      <div class="atc active" id="atc-q">
        <label class="albl">Категория</label>
        <select class="ainp asel" id="acat-sel" onchange="renderAQ()">
          <option value="0">Қазақ хандығы</option><option value="1">Жібек жолы</option>
          <option value="2">Қазақ батырлары</option><option value="3">Қазақстан тәуелсіздігі</option>
          <option value="4">Ортағасырлық Қазақстан</option>
        </select>
        <div class="qlist" id="aqlist"></div>
      </div>
      <div class="atc" id="atc-add">
        <label class="albl">Категория</label>
        <select class="ainp asel" id="a-cat"><option value="0">Қазақ хандығы</option><option value="1">Жібек жолы</option><option value="2">Қазақ батырлары</option><option value="3">Қазақстан тәуелсіздігі</option><option value="4">Ортағасырлық Қазақстан</option></select>
        <label class="albl">Сұрақ мәтіні</label><textarea class="ainp" id="a-q" rows="3" placeholder="Сұрақты жазыңыз..."></textarea>
        <label class="albl">A нұсқасы (дұрыс жауап)</label><input class="ainp" id="a-o0" placeholder="Дұрыс жауап">
        <label class="albl">B нұсқасы</label><input class="ainp" id="a-o1" placeholder="Қате нұсқа">
        <label class="albl">C нұсқасы</label><input class="ainp" id="a-o2" placeholder="Қате нұсқа">
        <label class="albl">D нұсқасы</label><input class="ainp" id="a-o3" placeholder="Қате нұсқа">
        <label class="albl">Балл</label>
        <select class="ainp asel" id="a-pts"><option value="10">10</option><option value="20">20</option><option value="30">30</option></select>
        <button class="abtn abg" style="width:100%" onclick="admAddQ()">➕ Сұрақ қосу</button>
      </div>
      <div class="atc" id="atc-io">
        <div class="aflex" style="margin-bottom:9px">
          <button class="abtn abo" onclick="admExp()">⬇️ JSON экспорт</button>
          <button class="abtn abo" onclick="document.getElementById('imp-f').click()">⬆️ JSON импорт</button>
          <input type="file" id="imp-f" accept=".json" style="display:none" onchange="admImp(event)">
        </div>
        <div style="font-size:10px;color:var(--text3)">Сұрақтарды JSON файл ретінде сақтауға болады.</div>
      </div>
      <div class="atc" id="atc-data">
        <div class="aflex" style="flex-direction:column;gap:7px">
          <button class="abtn abd" style="width:100%" onclick="admClrHist()">🗑️ Тарихты тазалау</button>
          <button class="abtn abd" style="width:100%" onclick="admRstQ()">⚠️ Сұрақтарды қалпына келтіру</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- HISTORY MODAL -->

<div class="aov" id="hist-ov">
  <div class="amod" style="max-width:460px">
    <div class="amh"><div class="am-title">📜 ОЙЫН ТАРИХЫ</div><button class="am-cl" onclick="closeModal('hist-ov')">✕</button></div>
    <div class="hlist" id="hlist"></div>
  </div>
</div>

<!-- BOTTOM NAV -->

<div id="bnav">
  <div class="bnav-g">
    <button class="nbtn a" onclick="openHistory()">📊</button>
    <button class="nbtn" onclick="goSetup()">↩</button>
  </div>
  <div class="bnav-mid">
    <button class="nact" onclick="admExp()">⬆️ Экспорт</button>
    <button class="nact" onclick="document.getElementById('imp-f').click()">⬇️ Импорт</button>
  </div>
  <div class="bnav-r">
    <button class="tbtn" onclick="setTheme('dark')">🌙</button>
    <button class="tbtn" onclick="setTheme('light')">☀️</button>
  </div>
</div>

<canvas id="cvs"></canvas>

<div id="toastwrap"></div>

<!-- AI CHATBOT -->

<button id="chatbot-btn" onclick="toggleChat()" title="AI Категория генератор">🤖<div class="cbadge" id="cbadge">!</div></button>

<div id="chat-panel">
  <div class="chat-head">
    <div class="chat-head-icon">🤖</div>
    <div class="chat-head-info">
      <div class="chat-head-title">AI КАТЕГОРИЯ ГЕНЕРАТОР</div>
      <div class="chat-head-sub"><span class="chat-head-dot"></span>Gemini арқылы жұмыс істейді</div>
    </div>
    <button class="chat-close" onclick="toggleChat()">✕</button>
  </div>
  <div class="chat-api-row">
    <input class="chat-api-inp" id="api-key-inp" type="password" placeholder="🔑 Gemini API кілтін енгізіңіз (AIza...)">
  </div>
  <div class="chat-hint">
    <div class="chint" onclick="sendHint(this)">🧮 Математика</div>
    <div class="chint" onclick="sendHint(this)">🌍 Дүниежүзі тарихы</div>
    <div class="chint" onclick="sendHint(this)">🔬 Биология</div>
    <div class="chint" onclick="sendHint(this)">🌐 География</div>
    <div class="chint" onclick="sendHint(this)">🎨 Өнер</div>
    <div class="chint" onclick="sendHint(this)">⚽ Спорт</div>
  </div>
  <div class="chat-msgs" id="chat-msgs">
    <div class="cmsg bot">Сәлем! 👋 Мен категория генераторымын.<br><br>Кез-келген тақырып жазыңыз — мен 18 сұрақ дайындап, ойынға автоматты қосамын!<br><br>Мысалы: <strong>«Физика»</strong>, <strong>«Қазақстан табиғаты»</strong>, <strong>«Ғарыш»</strong>...</div>
  </div>
  <div class="chat-typing" id="chat-typing">
    <span></span><span></span><span></span>
  </div>
  <div class="chat-input-area">
    <input class="chat-inp" id="chat-inp" placeholder="Тақырып жазыңыз..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendChat()}">
    <button class="chat-send" id="chat-send-btn" onclick="sendChat()">➤</button>
  </div>
</div>

<script>
const CATS=[
  {id:0,name:'Қазақ хандығы',icon:'👑'},
  {id:1,name:'Жібек жолы',icon:'🛤️'},
  {id:2,name:'Қазақ батырлары',icon:'⚔️'},
  {id:3,name:'Қазақстан тәуелсіздігі',icon:'🇰🇿'},
  {id:4,name:'Ортағасырлық Қазақстан',icon:'🏰'},
];
const TC=['#1e6ef5','#e63b3b','#1db954'];
const TCR=['30,110,245','230,59,59','29,185,84'];
const TDEF=['TEAM BLUE','TEAM RED','TEAM GREEN'];
const LTRS=['A','B','C','D'];

const DQ=[
{cat:0,pts:10,q:"Қазақ хандығы қай жылы құрылды?",opts:["1465 жыл","1380 жыл","1521 жыл","1600 жыл"],correct:0},
{cat:0,pts:10,q:"Қазақ хандығының алғашқы хандары кімдер болды?",opts:["Керей мен Жәнібек","Абылай мен Тәуке","Қасым мен Бұрындық","Хакназар мен Тауекел"],correct:0},
{cat:0,pts:10,q:"Қазақ хандығы бастапқыда қай аймақта орналасты?",opts:["Шу және Талас өзендері бойында","Сырдария бойында","Ертіс бойында","Жайық бойында"],correct:0},
{cat:0,pts:10,q:"Қай хан тұсында қазақ руларының бірігуі аяқталды?",opts:["Қасым хан","Тәуке хан","Абылай хан","Жәнібек хан"],correct:0},
{cat:0,pts:10,q:"Қазақ хандығының астанасы болған қала?",opts:["Түркістан","Отырар","Сайрам","Тараз"],correct:0},
{cat:0,pts:10,q:"Қазақ хандығы неше жүзден тұрды?",opts:["Үш жүз","Екі жүз","Төрт жүз","Бес жүз"],correct:0},
{cat:0,pts:20,q:"'Қасым ханның қасқа жолы' заң жинағы нені қамтыды?",opts:["Мүлік, қылмыс, неке, елші, жерлеу заңдары","Тек мүлік заңдары","Соғыс ережелері","Салық жүйесі"],correct:0},
{cat:0,pts:20,q:"Тәуке хан қабылдаған заңдар жинағы қалай аталды?",opts:["'Жеті Жарғы'","'Қасқа Жол'","'Дала Жарлығы'","'Ханның Ережесі'"],correct:0},
{cat:0,pts:20,q:"Хакназар хан кімдермен одақтасып шайбанилерге қарсы күресті?",opts:["Ноғай мырзалары және Сібір хандығы","Моғол хандығы","Ресей патшалығы","Қырым хандығы"],correct:0},
{cat:0,pts:20,q:"Қазақ хандығы мен Ресей империясының алғашқы дипломатиялық байланысы?",opts:["XVI ғасырда","XIV ғасырда","XVIII ғасырда","XVII ғасырда"],correct:0},
{cat:0,pts:20,q:"Дешті Қыпшақ территориясы қайда орналасты?",opts:["Орталық Азия даласында","Тибет таулауларында","Кавказ жоталарында","Парсы шөлінде"],correct:0},
{cat:0,pts:20,q:"Кіші жүздің Ресей протекторатын қабылдаған жылы?",opts:["1731 жыл","1695 жыл","1756 жыл","1800 жыл"],correct:0},
{cat:0,pts:30,q:"Жоңғар шапқыншылығы 'Ақтабан шұбырынды' қай жылдарда болды?",opts:["1723–1727 жж.","1680–1690 жж.","1750–1755 жж.","1700–1710 жж."],correct:0},
{cat:0,pts:30,q:"Абылай хан қандай саясат ұстанды?",opts:["Ресей мен Қытай арасындағы теңгерімді саясат","Тек Ресеймен одақтасу","Жоңғарлармен бітімгершілік","Қытайға қосылу"],correct:0},
{cat:0,pts:30,q:"Қазақ хандығының ыдырауына алып келген негізгі сыртқы себеп?",opts:["Ресей экспансиясы","Жоңғар шапқыншылығы ғана","Ішкі жанжалдар ғана","Жұт апаты"],correct:0},
{cat:0,pts:30,q:"Қазақ хандығындағы билер институтының негізгі міндеті?",opts:["Дауларды шешу және заң нормаларын сақтау","Тек соғысты басқару","Сауданы реттеу","Дін таратуды бақылау"],correct:0},
{cat:0,pts:30,q:"Хандықтың үш жүзге бөлінуінің саяси маңызы?",opts:["Ру одақтарының территориялық бөлінісі мен басқару жүйесі","Тек географиялық бөліну","Діни ерекшеліктерге байланысты","Тіл айырмашылығынан"],correct:0},
{cat:0,pts:30,q:"'Жеті Жарғы' жасаған үш атақты би?",opts:["Төле би, Қазыбек би, Айтеке би","Абай, Шоқан, Ыбырай","Кенесары, Наурызбай, Бөгенбай","Абылай, Тәуке, Барақ"],correct:0},
{cat:1,pts:10,q:"Жібек жолы қай мемлекеттен басталды?",opts:["Қытайдан","Үндістаннан","Парсыдан","Рим империясынан"],correct:0},
{cat:1,pts:10,q:"Жібек жолы арқылы тасымалданған негізгі тауар?",opts:["Жібек мата","Алтын","Дәрілер","Қару-жарақ"],correct:0},
{cat:1,pts:10,q:"Жібек жолы бойындағы ежелгі қазақ жерінің ірі қаласы?",opts:["Отырар (Фараб)","Алматы","Семей","Өскемен"],correct:0},
{cat:1,pts:10,q:"Жібек жолының жалпы ұзындығы шамамен қанша шақырым?",opts:["12 000 км","3 000 км","25 000 км","6 000 км"],correct:0},
{cat:1,pts:10,q:"Жібек жолы бойымен ең кеңінен таралған дін?",opts:["Ислам","Буддизм","Христиан","Зороастризм"],correct:0},
{cat:1,pts:10,q:"Жібек жолының маңызды Қазақстандық торабы болған тағы бір қала?",opts:["Тараз","Сарай","Мерв","Самарқанд"],correct:0},
{cat:1,pts:20,q:"Отырар апаты (1218) немен байланысты?",opts:["Монғол елшілерін өлтіру — Шыңғыс ханның жорығына себеп болды","Жер сілкінісі","Су тасқыны","Індет ауруы"],correct:0},
{cat:1,pts:20,q:"Жібек жолы арқылы Еуропаға жеткен ауру індеті?",opts:["Бубондық оба (Қара өлім)","Шешек","Малярия","Тырысқақ"],correct:0},
{cat:1,pts:20,q:"Керуен-сарайлардың негізгі қызметі?",opts:["Саудагерлерді қабылдау, тауарды сақтау, ақпарат алмасу","Тек діни рәсімдер","Әскери бекініс","Салық жинау"],correct:0},
{cat:1,pts:20,q:"Жібек жолы арқылы Еуропаға жеткен ғылыми жетістіктер?",opts:["Математика, астрономия, қағаз жасау технологиясы","Тек музыка","Тек сурет өнері","Кеме жасау"],correct:0},
{cat:1,pts:20,q:"Марко Поло кімнің уақытында Жібек жолымен саяхат жасады?",opts:["Хубилай хан (Монғол империясы)","Александр Македонский","Тимур Ленк","Ескендір Зұлқарнайын"],correct:0},
{cat:1,pts:20,q:"Жібек жолының ыдырауының басты себебі?",opts:["Теңіз жолдарының ашылуы және Осман тосқауылы","Тек соғыс","Жер сілкінісі","Сұраныс азайды"],correct:0},
{cat:1,pts:30,q:"Жібек жолы цивилизацияға тигізген ең маңызды үш ықпалы?",opts:["Мәдени диффузия, технология трансфері, діни таралу","Тек сауда","Тек әскери одақтасу","Тек тіл байланысы"],correct:0},
{cat:1,pts:30,q:"'Бір белдеу — бір жол' бастамасы Жібек жолымен байланысы?",opts:["Тарихи маршруттарды заманауи инфрақұрылыммен қайта тірілту","Ешқандай байланыс жоқ","Тек туризм мақсаты","Ескі жолды музейлеу"],correct:0},
{cat:1,pts:30,q:"Жібек жолындағы Сырдария бойының маңызды қалалары?",opts:["Отырар, Сауран, Ясы (Түркістан)","Алматы, Тараз, Шымкент","Семей, Өскемен, Павлодар","Ақтөбе, Орал, Атырау"],correct:0},
{cat:1,pts:30,q:"Жібек жолы тек сауда жолы ма, әлде өркениет жолы ма?",opts:["Өркениет жолы — дін, өнер, ғылым, тіл таратты","Тек экономикалық жол","Тек діни жол","Тек саяси жол"],correct:0},
{cat:1,pts:30,q:"Жібек жолы бойындағы керуен-сарайдың ерекшелігі?",opts:["Ортасында аула, жан-жағында бөлмелер, мешіт, монша","Тек бір үлкен зал","Биік мұнара","Жер асты қойма"],correct:0},
{cat:1,pts:30,q:"XIV ғасырда Жібек жолы бойымен саудаланған тауарлар?",opts:["Жібек, дәмдеуіштер, шыны, алтын, күміс","Тек жібек ғана","Тек дәрі-дәрмек","Тек қару-жарақ"],correct:0},
{cat:2,pts:10,q:"Қобыланды батыр кімдермен күресті?",opts:["Қазан ханы Қараманмен","Ресей патшасымен","Қытай императорымен","Жоңғар ханымен"],correct:0},
{cat:2,pts:10,q:"Жоңғарларға қарсы күрестегі ең атақты қазақ батыры?",opts:["Бөгенбай батыр","Ер Тарғын","Алпамыс","Қамбар батыр"],correct:0},
{cat:2,pts:10,q:"Қаракерей Қабанбай батыр қай жүздің өкілі?",opts:["Орта жүз","Кіші жүз","Ұлы жүз","Жоңғар тайпасы"],correct:0},
{cat:2,pts:10,q:"Айтеке би кім болды?",opts:["Кіші жүздің биі, 'Жеті Жарғы' авторларының бірі","Орта жүздің ханы","Ұлы жүздің батыры","Жоңғар елшісі"],correct:0},
{cat:2,pts:10,q:"'Ер Тарғын' — бұл не?",opts:["Қазақ батырлық жыры","Тарихи шежіре","Дастан-роман","Дін кітабы"],correct:0},
{cat:2,pts:10,q:"Алдар Көсе қазақ ауыз әдебиетінде кімді бейнелейді?",opts:["Халықтың ақылды, тапқыр өкілін","Батыр жауынгерді","Залым ханды","Дін ғалымын"],correct:0},
{cat:2,pts:20,q:"Бөгенбай батырдың Аңырақай шайқасындағы (1730) рөлі?",opts:["Жоңғарларға қарсы негізгі қолды бастады","Елші болды","Тек кеңесші болды","Соғысқа қатыспады"],correct:0},
{cat:2,pts:20,q:"Наурызбай батыр кімнің ең жақын серіктесі болды?",opts:["Абылай ханның","Тәуке ханның","Хакназар ханның","Кенесарының"],correct:0},
{cat:2,pts:20,q:"Батыр эпостарының тарихи мәні неде?",opts:["Тарихи оқиғаларды сақтады, ұлттық рухты нығайтты","Тек ойын-сауық үшін","Тек дін таратты","Тек тіл үйретті"],correct:0},
{cat:2,pts:20,q:"Сырым Датов кімге қарсы күресті?",opts:["Хан өкіметіне және Ресей экспансиясына қарсы","Тек жоңғарларға қарсы","Қытайға қарсы","Бір-бірімен шайқасты"],correct:0},
{cat:2,pts:20,q:"Жоңғарларға қарсы күресте атақты үш батыр?",opts:["Бөгенбай, Қабанбай, Наурызбай","Кенесары, Исатай, Махамбет","Ер Тарғын, Қобыланды, Алпамыс","Абылай, Тәуке, Хакназар"],correct:0},
{cat:2,pts:20,q:"Ер Көкше батырының тарихи контексті?",opts:["Алтын Орда кезіндегі жауынгер, XV–XVI ғасыр эпосы","XVII ғасыр батыры","XIX ғасыр батыры","Жоңғарға қарсы"],correct:0},
{cat:2,pts:30,q:"Хан Кене (Кенесары Қасымов) тарихи маңызы?",opts:["1837–1847 жж. ұлт-азаттық көтерілісі, соңғы хан","Жоңғармен соғысты","Ресеймен одақтасты","Тек рушылдықпен айналысты"],correct:0},
{cat:2,pts:30,q:"Қазақ батырларының соғыс тактикасының ерекшелігі?",opts:["Жылдам атты жасақтар, маневр тактикасы, жер бедерін пайдалану","Тек қорғаныс","Тек шабуыл","Теңіз шайқасы"],correct:0},
{cat:2,pts:30,q:"Батырлық ұғымы қазақ мәдениетінде қандай қасиеттермен байланысты?",opts:["Намыс, жігерлік, халыққа қызмет, достыққа адалдық","Тек күш","Тек байлық","Тек дін"],correct:0},
{cat:2,pts:30,q:"Исатай-Махамбет 1836–1838 жылғы көтерілісі?",opts:["Бөкей ордасындағы шаруалар көтерілісі, хан мен орыс зорлығына қарсы","Жоңғарға қарсы соғыс","Тәуелсіздік алу","Ислам революциясы"],correct:0},
{cat:2,pts:30,q:"Бұхар жырау батырлар тарихын сақтаудағы рөлі?",opts:["Ауызша тарих, ел идеологиясын қалыптастыру, ханды мадақтау","Тек өлең шығарды","Тек аңшылыққа үйретті","Дін ғалымы болды"],correct:0},
{cat:2,pts:30,q:"Батырлар жырындағы 'тұлпар' атының символдық мәні?",opts:["Жылдамдық, еркіндік, батырмен бірлік, рухани күш","Тек көлік құралы","Тек байлық белгісі","Тек ер белгісі"],correct:0},
{cat:3,pts:10,q:"Қазақстан тәуелсіздігін қашан жариялады?",opts:["1991 жылы 16 желтоқсанда","1990 жылы 25 қазанда","1992 жылы 1 қаңтарда","1989 жылы 15 наурызда"],correct:0},
{cat:3,pts:10,q:"Тәуелсіз Қазақстанның тұңғыш Президенті?",opts:["Нұрсұлтан Назарбаев","Дінмұхамед Қонаев","Олжас Сүлейменов","Серікболсын Әбділдин"],correct:0},
{cat:3,pts:10,q:"Желтоқсан оқиғасы қай жылы болды?",opts:["1986 жылы","1991 жылы","1980 жылы","1989 жылы"],correct:0},
{cat:3,pts:10,q:"Қазақстанның ұлттық валютасы теңге қашан енгізілді?",opts:["1993 жылы 15 қарашада","1991 жылы 16 желтоқсанда","1995 жылы 1 қаңтарда","1992 жылы 30 желтоқсанда"],correct:0},
{cat:3,pts:10,q:"Тәуелсіз Қазақстанның астанасы 1997 жылы қай қалаға көшті?",opts:["Астана (бұрынғы Ақмола)","Алматы","Шымкент","Қарағанды"],correct:0},
{cat:3,pts:10,q:"Семей ядролық полигонын жабу қозғалысын кім ұйымдастырды?",opts:["Олжас Сүлейменов, 'Невада-Семей' қозғалысы","Нұрсұлтан Назарбаев жалғыз","БҰҰ бастамасы","АҚШ қысымы бойынша"],correct:0},
{cat:3,pts:20,q:"1986 жылғы Желтоқсан оқиғасының тарихи маңызы?",opts:["КСРО-ға қарсы ұлттық наразылықтың алғашқысы","Тек жастар бүлігі","Экономикалық наразылық","Дін бостандығы үшін"],correct:0},
{cat:3,pts:20,q:"Тәуелсіздіктің алғашқы жылдарында Қазақстан экономикасы?",opts:["Ауыр дағдарыс, гиперинфляция, нарықтық реформалар","Тұрақты өсім","Гүлдену кезеңі","Ешқандай өзгеріс жоқ"],correct:0},
{cat:3,pts:20,q:"Қазақстан мүше болған халықаралық ұйымдар?",opts:["БҰҰ, ШЫҰ, ТМД, ҰҚШҰ","Тек БҰҰ","Тек НАТО","Тек ТМД"],correct:0},
{cat:3,pts:20,q:"'Қазақстан-2030' стратегиясының негізгі мақсаты?",opts:["Экономикалық өсу, демократия, қауіпсіздік","Тек мұнай өндірісін арттыру","Тек астана салу","Тек тіл реформасы"],correct:0},
{cat:3,pts:20,q:"Тәуелсіздіктен кейінгі демографиялық негізгі өзгеріс?",opts:["Оралмандардың оралуы, орыс тілді халықтың кетуі","Халық саны тез өсті","Ешқандай өзгеріс жоқ","Тек урбанизация"],correct:0},
{cat:3,pts:20,q:"Қазақстан ядролық арсеналдан қашан бас тартты?",opts:["1991–1994 жылдар аралығында","1995 жылы","2000 жылы","Бас тартқан жоқ"],correct:0},
{cat:3,pts:30,q:"Қазақстанның ядролық қарусыздануы неге халықаралық үлгі?",opts:["Ерікті бас тарту, Будапешт кепілдіктері, ядролық қауіпсіздікке үлес","Мәжбүрлеп алынды","Экономикалық себептер ғана","Ешкім үлгі деп қарамайды"],correct:0},
{cat:3,pts:30,q:"'Мәңгілік Ел' ұлттық идеясының тарихи тамыры?",opts:["Абылай хан дәуіріне сілтеме, ел бірлігі, ұлттық идентификация","Тек КСРО кезеңінен","Тек 1991 жылдан","Жоқ — жаңа ойлап табылған"],correct:0},
{cat:3,pts:30,q:"Орталық Азия елдерінің тәуелсіздік жолының Қазақстаннан айырмашылығы?",opts:["Ресурс деңгейі, демократия, этникалық жағдай, экономика ерекшеленеді","Барлығы бірдей","Тек соғыс бар жерде айырмашылық","Ешқандай айырмашылық жоқ"],correct:0},
{cat:3,pts:30,q:"Тәуелсіздік алғаннан бері Қазақстандағы ұлттық бірегейлікті қалыптастырудың қиындығы?",opts:["Тіл мәселесі, этникааралық үйлесім, жаңа тарих жазу","Ешқандай қиындық жоқ","Тек экономика","Тек сыртқы саясат"],correct:0},
{cat:3,pts:30,q:"Нұрсұлтан Назарбаев Президент болып сайланған жыл?",opts:["1991 жылы 1 желтоқсанда","1990 жылы","1993 жылы","1995 жылы"],correct:0},
{cat:3,pts:30,q:"Қазақстан Конституциясы алғаш қашан қабылданды?",opts:["1995 жылы 30 тамызда","1991 жылы 16 желтоқсанда","1992 жылы","1993 жылы"],correct:0},
{cat:4,pts:10,q:"Ортағасырлық Қазақстан жерін билеген алғашқы түркі қағанаты?",opts:["Түрік қағанаты (VI ғасыр)","Монғол империясы","Алтын Орда","Қарахан мемлекеті"],correct:0},
{cat:4,pts:10,q:"Қарахан мемлекеті қай дінді мемлекеттік дін деп жариялады?",opts:["Ислам","Буддизм","Христиандық","Шаманизм"],correct:0},
{cat:4,pts:10,q:"Ахмет Иүгінекидің атақты туындысы?",opts:["'Ақиқат сыйы' (Хибат ул-хақайық)","'Диуани луғат ат-түрк'","'Кутадгу билик'","'Рисалат аш-шамсийа'"],correct:0},
{cat:4,pts:10,q:"Монғол шапқыншылығы Орта Азияға қай ғасырда жетті?",opts:["XIII ғасырда (1219–1221)","XI ғасырда","XV ғасырда","X ғасырда"],correct:0},
{cat:4,pts:10,q:"Алтын Орда мемлекеті қашан құрылды?",opts:["1243 жылы","1206 жылы","1300 жылы","1150 жылы"],correct:0},
{cat:4,pts:10,q:"Қожа Ахмет Ясауи кімнің шәкірті болды?",opts:["Арыстан бабтың","Әл-Фарабидің","Имам Ғазалидің","Хорезмидің"],correct:0},
{cat:4,pts:20,q:"Қарахан мемлекетінің мәдени жетістіктері?",opts:["Жазба әдебиет, ислам ғылымы, Баласағұн мен Тараз қалалары","Тек соғыс","Тек ауыл шаруашылығы","Ешқандай мәдени жетістік жоқ"],correct:0},
{cat:4,pts:20,q:"Алтын Орданың саяси жүйесі?",opts:["Хан билігі, нояндар, оң және сол қанат бөлінісі","Республикалық","Теократиялық","Федеративтік"],correct:0},
{cat:4,pts:20,q:"Жошы ханның Қазақстан тарихындағы рөлі?",opts:["Алтын Орданың негізін қалады, Дешті-Қыпшақты иеленді","Ислам таратты","Қазақ хандығын құрды","Жоңғарларды жеңді"],correct:0},
{cat:4,pts:20,q:"Тимур (Ленк) Орта Азияға тигізген әсері?",opts:["Отырар қиратылды, Самарқанд гүлденді","Тек оң әсер тигізді","Ешқандай әсер тигізбеді","Ислам жойылды"],correct:0},
{cat:4,pts:20,q:"Ортағасырлық Қазақстандағы дала мемлекеттерінің экономикасы?",opts:["Мал шаруашылығы, сауда, алым-салық жинау","Тек ауыл шаруашылығы","Тек балық аулау","Тек кен өндіру"],correct:0},
{cat:4,pts:20,q:"Қожа Ахмет Ясауидің ілімінің мәні?",opts:["Сопылық ілім, халыққа жақын дін, түркі тілінде уағыз","Тек арабша ілім","Тек жауынгерлік","Тек саяси ілім"],correct:0},
{cat:4,pts:30,q:"Алтын Орданың ыдырауы Қазақ хандығының пайда болуына жол ашты. Негізгі себеп?",opts:["Хандар арасындағы қырқыс, тайпалардың жаңа топтасуы","Дін айырмашылығы","Тек сыртқы жау","Жер сілкінісі"],correct:0},
{cat:4,pts:30,q:"Ортағасырлық Қазақстандағы ислам мен дала мәдениетінің синтезі?",opts:["Ясауи тариқаты, аралас рәсімдер, мешіт сәулеті мен ауызша мәдениет","Ислам толық жойды","Ислам ешқандай ықпал етпеді","Тек сауда байланысы"],correct:0},
{cat:4,pts:30,q:"Монғол шапқыншылығының игілік жағы болды ма?",opts:["Pax Mongolica — сауда жолдарын ашты, дипломатия дамыды","Жоқ — тек зиян","Тек Қытайға пайда берді","Тек дін таралды"],correct:0},
{cat:4,pts:30,q:"Оғыз, Қыпшақ, Қарлұқ тайпаларының ортақ белгісі?",opts:["Түркі тілдес, дала мәдениеті, ислам қабылдаушылар","Тек тіл ортақ","Тек дін ортақ","Ешқандай ортақтық жоқ"],correct:0},
{cat:4,pts:30,q:"Ортағасырлық Отырар қаласының маңызы?",opts:["Жібек жолы торабы, ғылым орталығы, Әл-Фараби туған жер","Тек әскери бекініс","Тек діни орталық","Тек сауда орны"],correct:0},
{cat:4,pts:30,q:"Алтын Орданың Еуразия тарихындағы орны?",opts:["150 жыл үстемдік, Ресей мен Орта Азияны байланыстырды, ислам орталығы","Тек 10 жыл","Тек Азия ішінде","Ешқандай маңызы жоқ"],correct:0},
];

/* ─── STATE ─── */
let G={
  tc:2, tnames:['','',''], cat:0,
  opts:{minus:false,tournament:false,final:false},
  timer:15, bonusPct:20,
  scores:[], curTeam:0, qs:[], cellSt:[], bonus:new Set(),
  shuffled:[], frActive:false, frDone:false,
  tInterval:null, tTotal:15, tLeft:15,
  curIdx:null, curQ:null, locked:false,
  tournActive:false, tournRound:0, tournScores:[], usedCats:[],
  audioCtx:null
};

/* ─── STORAGE ─── */
function loadSt(){try{const q=localStorage.getItem('qq');if(q){const p=JSON.parse(q);if(Array.isArray(p)&&p.length)return p;}}catch(e){}return null;}
function saveSt(qs){localStorage.setItem('qq',JSON.stringify(qs));}
function loadHist(){try{const h=localStorage.getItem('qh');return h?JSON.parse(h):[];}catch(e){return[];}}
function saveHist(e){const h=loadHist();h.unshift(e);if(h.length>50)h.pop();localStorage.setItem('qh',JSON.stringify(h));}
let QS=loadSt()||JSON.parse(JSON.stringify(DQ));

/* ─── AUDIO ─── */
function initAudio(){if(!G.audioCtx)G.audioCtx=new(window.AudioContext||window.webkitAudioContext)();}
function tone(f,t,d,v=0.3){try{initAudio();const o=G.audioCtx.createOscillator(),g=G.audioCtx.createGain();o.connect(g);g.connect(G.audioCtx.destination);o.type=t;o.frequency.value=f;g.gain.setValueAtTime(v,G.audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,G.audioCtx.currentTime+d);o.start();o.stop(G.audioCtx.currentTime+d);}catch(e){}}
function sfxOK(){tone(523,'sine',0.15);setTimeout(()=>tone(659,'sine',0.15),120);setTimeout(()=>tone(784,'sine',0.25),240);}
function sfxErr(){tone(220,'sawtooth',0.2,0.2);setTimeout(()=>tone(180,'sawtooth',0.3,0.15),180);}
function sfxTick(){tone(880,'square',0.05,0.1);}
function sfxWin(){[523,659,784,1047,1319].forEach((f,i)=>setTimeout(()=>tone(f,'sine',0.3),i*100));}
function sfxSel(){tone(440,'sine',0.08,0.15);}

/* ─── SETUP RENDER ─── */
function renderSetup(){
  document.querySelectorAll('.tc-btn').forEach(b=>b.classList.toggle('active',+b.dataset.c===G.tc));
  const cg=document.getElementById('cat-grid');
  cg.innerHTML=CATS.map((c,i)=>`
    <button class="cat-btn ${i===G.cat?'active':''}" onclick="selCat(${i})">
      <span>${c.icon}</span>${c.name}
      ${c.aiGenerated?'<span style="font-size:9px;background:rgba(240,180,41,0.2);border:1px solid rgba(240,180,41,0.4);border-radius:4px;padding:1px 5px;color:var(--gold);margin-left:auto">AI</span>':''}
    </button>`).join('');
  const ti=document.getElementById('team-inps');
  ti.innerHTML='';
  for(let i=0;i<G.tc;i++){
    ti.innerHTML+=`<div style="display:flex;align-items:center;gap:8px"><div style="width:11px;height:11px;border-radius:50%;background:${TC[i]};flex-shrink:0"></div><input class="tinput" style="border-left-color:${TC[i]}" placeholder="${TDEF[i]}" value="${G.tnames[i]||''}" oninput="G.tnames[${i}]=this.value"></div>`;
  }
  ['minus','tournament','final'].forEach(o=>document.getElementById('tg-'+o.replace('tournament','tourn')).classList.toggle('on',G.opts[o]));
  document.getElementById('rv-timer').textContent=G.timer+' с';
  document.getElementById('rv-bonus').textContent=G.bonusPct+'%';
  document.getElementById('r-timer').value=G.timer;
  document.getElementById('r-bonus').value=G.bonusPct;
}
function selTC(n){G.tc=n;renderSetup();}
function selCat(i){G.cat=i;renderSetup();}
function togOpt(o){const k=o==='tournament'?'tournament':o;G.opts[k]=!G.opts[k];renderSetup();}
function syncR(t,v){if(t==='timer'){G.timer=+v;document.getElementById('rv-timer').textContent=v+' с';}else{G.bonusPct=+v;document.getElementById('rv-bonus').textContent=v+'%';}}

/* ─── SHOW SCREEN ─── */
function showSetup(){document.getElementById('scr-setup').style.display='block';document.getElementById('game-layout').style.display='none';document.getElementById('scr-win').style.display='none';}
function showGame(){document.getElementById('scr-setup').style.display='none';document.getElementById('game-layout').style.display='flex';document.getElementById('scr-win').style.display='none';}
function showWinner(){document.getElementById('scr-setup').style.display='none';document.getElementById('game-layout').style.display='none';document.getElementById('scr-win').style.display='flex';}

/* ─── START GAME ─── */
function startGame(){
  initAudio();
  for(let i=0;i<G.tc;i++)if(!G.tnames[i]||!G.tnames[i].trim())G.tnames[i]=TDEF[i];
  G.scores=new Array(G.tc).fill(0);
  G.curTeam=0;G.frActive=false;G.frDone=false;G.locked=false;
  const catQ=QS.filter(q=>q.cat===G.cat);
  const q10=shuf(catQ.filter(q=>q.pts===10));
  const q20=shuf(catQ.filter(q=>q.pts===20));
  const q30=shuf(catQ.filter(q=>q.pts===30));
  const take=G.tc===2?4:6;
  const pool=[];
  for(let r=0;r<take;r++){pool.push(q10[r]||null);pool.push(q20[r]||null);pool.push(q30[r]||null);}
  G.qs=pool;G.cellSt=pool.map(()=>'open');
  G.shuffled=pool.map(q=>q?shuffOpts(q):null);
  G.bonus=new Set();
  if(G.bonusPct>0){const bn=Math.max(0,Math.round(pool.length*G.bonusPct/100));shuf(Array.from({length:pool.length},(_,i)=>i)).slice(0,bn).forEach(i=>G.bonus.add(i));}
  if(G.opts.tournament){G.tournActive=true;if(!G.usedCats.includes(G.cat))G.usedCats.push(G.cat);if(G.tournRound===0)G.tournScores=Array.from({length:G.tc},()=>new Array(5).fill(null));}
  document.getElementById('hrd-cat').textContent=CATS[G.cat].name;
  document.getElementById('hrd-n').textContent=G.tournRound+1;
  document.getElementById('cp-tourn').style.display=G.opts.tournament?'':'none';
  renderGame();showGame();
}
function shuffOpts(q){const ct=q.opts[q.correct];const s=shuf([...q.opts]);return{opts:s,ci:s.indexOf(ct)};}

/* ─── RENDER GAME ─── */
function renderGame(){
  renderSidebar();renderTurnInfo();renderGrid();renderTournTable();
  document.getElementById('ib-cat').textContent=CATS[G.cat].name;
  document.getElementById('fbanner').classList.toggle('show',G.frActive&&!G.frDone);
  updateLastWinner();
}
function renderSidebar(){
  const sb=document.getElementById('sidebar');
  sb.innerHTML=G.tnames.slice(0,G.tc).map((n,i)=>{
    const c=TC[i],r=TCR[i],act=G.curTeam===i;
    return`<div class="tcard ${act?'active':''}" id="tc-${i}" style="background:linear-gradient(145deg,rgba(${r},0.25),rgba(${r},0.12));--tc:${c};--tc-r:${r}">
      <div class="tc-name">${n||TDEF[i]}</div>
      <div class="tc-score" id="sc-${i}">${G.scores[i]}</div>
      <div class="tc-lbl">${act?'▶ КЕЗЕК':'БАЛЛ'}</div>
    </div>`;
  }).join('');
}
function renderTurnInfo(){
  document.getElementById('ib-turn').textContent=G.tnames[G.curTeam]||TDEF[G.curTeam];
}
function renderGrid(){
  const grid=document.getElementById('qgrid');
  grid.innerHTML='';
  for(let i=0;i<G.qs.length;i++){
    const q=G.qs[i];if(!q){grid.innerHTML+='<div></div>';continue;}
    const st=G.cellSt[i],isB=G.bonus.has(i),used=st!=='open';
    const cls=['qcell',`qcell[data-p="${q.pts}"]`.replace(/\[.*?\]/,''),
      isB&&!used?'bonus':'',used?'used':'',
      used&&st==='correct'?'ac':'',used&&st==='wrong'?'aw':''
    ].filter(Boolean).join(' ');
    grid.innerHTML+=`<div class="${cls}" data-p="${q.pts}" onclick="${used?'':('openQ('+i+')')}" >
      <div class="cell-n">${used?(st==='correct'?'✓':'✗'):(isB?q.pts+'★':q.pts)}</div>
      <div class="cell-s">үпай</div>
      ${isB&&!used?`<div class="cell-btag">BONUS 2x</div>`:''}
    </div>`;
  }
}
function renderTournTable(){
  if(!G.opts.tournament)return;
  const totals=G.tournScores.map(r=>r.reduce((a,b)=>a+(b||0),0));
  const sorted=Array.from({length:G.tc},(_,i)=>({i,n:G.tnames[i]||TDEF[i],r:G.tournScores[i],t:totals[i]})).sort((a,b)=>b.t-a.t);
  document.getElementById('tt-body').innerHTML=sorted.map((t,rank)=>`<tr class="${rank===0?'lead':''}"><td>${rank===0?'🥇':rank+1}</td><td>${t.n}</td>${t.r.map(v=>`<td>${v===null?'—':v}</td>`).join('')}<td><strong>${t.t}</strong></td></tr>`).join('');
  document.getElementById('btn-nxt').style.display=G.tournRound>=5?'none':'';
  document.getElementById('btn-endt').style.display=G.tournRound>=5?'inline-block':'none';
}
function updateLastWinner(){
  const h=loadHist();if(!h.length)return;
  const lw=h[0];document.getElementById('last-win-disp').innerHTML=`🏆 ${lw.winner}`;
  const prev=document.getElementById('hist-preview');
  prev.innerHTML=h.slice(0,3).map(hh=>`<div class="hitem"><div class="hdate">${hh.date} · ${hh.type}</div><div class="hwinner">🏆 ${hh.winner}</div><div class="hscores">${hh.scores.map(s=>s.name+': '+s.score).join(' | ')}</div></div>`).join('');
}

/* ─── OPEN QUESTION ─── */
function openQ(idx){
  if(G.cellSt[idx]!=='open')return;
  sfxSel();G.curIdx=idx;G.curQ=G.qs[idx];G.locked=false;
  const q=G.curQ,isB=G.bonus.has(idx);
  const pts=G.frActive?50:(isB?q.pts*2:q.pts);
  const c=TC[G.curTeam],r=TCR[G.curTeam];
  // Badge
  const badge=document.getElementById('qbadge');
  badge.textContent=`${pts} ҮПАЙЛЫҚ СҰРАҚ`;
  badge.style.background=`rgba(${r},0.2)`;badge.style.color=c;badge.style.border=`1px solid ${c}50`;
  if(isB){badge.textContent=`★ БОНУС ${pts} ҮПАЙ`;}
  // Question
  document.getElementById('qtxt').textContent=q.q;
  // Options
  const so=G.shuffled[idx];
  const optEl=document.getElementById('opts');
  optEl.innerHTML=so.opts.map((o,oi)=>`<div class="opt" id="opt-${oi}" onclick="pickOpt(${oi})">
    <div class="opt-l">${LTRS[oi]}</div>
    <div class="opt-t">${o}</div>
  </div>`).join('');
  // Reset state
  document.getElementById('sbtn').disabled=true;
  document.getElementById('sbtn').style.display='block';
  document.getElementById('resrow').classList.remove('show');
  document.querySelectorAll('.opt').forEach(o=>{o.classList.remove('sel','locked','rc','rw','rn');});
  openModal('qoverlay');
  startTimer(G.frActive?Math.max(G.timer,20):G.timer);
}

let selectedOpt=-1;
function pickOpt(oi){
  if(G.locked)return;
  selectedOpt=oi;
  document.querySelectorAll('.opt').forEach((o,i)=>o.classList.toggle('sel',i===oi));
  document.getElementById('sbtn').disabled=false;
}

function doSubmit(){
  if(G.locked||selectedOpt<0)return;
  G.locked=true;
  clearInterval(G.tInterval);
  document.querySelectorAll('.opt').forEach(o=>o.classList.add('locked'));
  document.getElementById('sbtn').style.display='none';
  const so=G.shuffled[G.curIdx];
  const correct=selectedOpt===so.ci;
  setTimeout(()=>{revealOpts(selectedOpt,so.ci);setTimeout(()=>finalize(correct,so),700);},150);
}

function timeUp(){
  G.locked=true;
  document.getElementById('sbtn').style.display='none';
  const so=G.shuffled[G.curIdx];
  revealOpts(-1,so.ci);
  setTimeout(()=>finalize(false,so),700);
}

function revealOpts(sel,ci){
  document.querySelectorAll('.opt').forEach((o,i)=>{
    o.classList.add('locked');
    if(i===ci)o.classList.add('rc');
    else if(i===sel)o.classList.add('rw');
    else o.classList.add('rn');
  });
}

function finalize(correct,so){
  const idx=G.curIdx,q=G.curQ,isB=G.bonus.has(idx);
  let pts=G.frActive?50:(isB?q.pts*2:q.pts);
  const c=TC[G.curTeam];
  if(correct){sfxOK();G.scores[G.curTeam]+=pts;G.cellSt[idx]='correct';spawnPop('+'+pts,c);}
  else{sfxErr();if(G.opts.minus){G.scores[G.curTeam]=Math.max(0,G.scores[G.curTeam]-pts);spawnPop('-'+pts,'#e63b3b');}G.cellSt[idx]='wrong';}
  const sc=document.getElementById('sc-'+G.curTeam);
  if(sc){sc.textContent=G.scores[G.curTeam];sc.classList.add('bump');setTimeout(()=>sc.classList.remove('bump'),400);}
  // result panel
  document.getElementById('opts').style.display='none';
  const rr=document.getElementById('resrow');
  document.getElementById('resicon').textContent=correct?'✅':'❌';
  const rp=document.getElementById('respts');
  rp.textContent=correct?`+${pts} балл!`:(G.opts.minus?`-${pts} балл`:'0 балл');
  rp.className='res-pts '+(correct?'p':'n');
  document.getElementById('resans').innerHTML=correct?'':`Дұрыс жауап: <strong>${so.opts[so.ci]}</strong>`;
  rr.classList.add('show');
}

function closeQModal(){
  closeModal('qoverlay');
  document.getElementById('opts').style.display='flex';
  selectedOpt=-1;
  const allUsed=G.cellSt.every(s=>s!=='open');
  G.curTeam=(G.curTeam+1)%G.tc;
  if(allUsed){
    if(G.opts.final&&!G.frDone){startFR();return;}
    endGame();return;
  }
  renderGame();
}

/* ─── TIMER ─── */
function startTimer(sec){
  clearInterval(G.tInterval);
  G.tTotal=sec;G.tLeft=sec;
  const arc=document.getElementById('tarc'),num=document.getElementById('tnum');
  const circ=207.3;
  arc.style.strokeDashoffset='0';arc.classList.remove('low');
  num.textContent=sec;num.classList.remove('low');
  G.tInterval=setInterval(()=>{
    G.tLeft--;
    const pct=G.tLeft/G.tTotal;
    arc.style.strokeDashoffset=circ*(1-pct);
    num.textContent=G.tLeft;
    const thresh=Math.min(5,Math.floor(G.tTotal*0.25));
    if(G.tLeft<=thresh){arc.classList.add('low');num.classList.add('low');sfxTick();}
    if(G.tLeft<=0){clearInterval(G.tInterval);if(!G.locked)timeUp();}
  },1000);
}

/* ─── FINAL ROUND ─── */
function startFR(){
  G.frActive=true;G.frDone=false;
  const fi=G.qs.length;
  const fqs=['ФИНАЛ: Қазақстанның тарихи дамуындағы ең маңызды кезеңді атаңыз.','ФИНАЛ: Қазақ халқының ұлттық бірлігіне ең үлкен қатер не болды?','ФИНАЛ: Қазақ хандығы неліктен маңызды тарихи мемлекет болды?','ФИНАЛ: Жібек жолының Қазақстан тарихындағы рөлі неде?'];
  const fq={cat:G.cat,pts:50,q:fqs[Math.floor(Math.random()*fqs.length)],opts:['А жауабын жаз','Б жауабын жаз','В жауабын жаз','Г жауабын жаз'],correct:0};
  G.qs.push(fq);G.cellSt.push('open');G.shuffled.push({opts:fq.opts,ci:0});
  renderGame();setTimeout(()=>openQ(fi),400);
}

/* ─── END GAME ─── */
function endGame(){
  sfxWin();clearInterval(G.tInterval);
  if(G.tournActive){
    for(let i=0;i<G.tc;i++)G.tournScores[i][G.tournRound]=G.scores[i];
    G.tournRound++;
    saveHist({date:new Date().toLocaleString('kk-KZ'),type:'Турнир туры '+G.tournRound,scores:G.scores.map((s,i)=>({name:G.tnames[i],score:s})),winner:getWinner().name});
    renderTournTable();renderGame();
    toast('Тур аяқталды! Келесіні бастаңыз.','i');
    return;
  }
  const w=getWinner();
  saveHist({date:new Date().toLocaleString('kk-KZ'),type:'Жай ойын',category:CATS[G.cat].name,scores:G.scores.map((s,i)=>({name:G.tnames[i]||TDEF[i],score:s})),winner:w.name});
  renderWin();showWinner();launchConfetti();
}
function getWinner(){let b={i:0,s:-1,name:''};for(let i=0;i<G.tc;i++)if(G.scores[i]>b.s)b={i,s:G.scores[i],name:G.tnames[i]||TDEF[i]};return b;}
function renderWin(){
  const sorted=Array.from({length:G.tc},(_,i)=>({i,name:G.tnames[i]||TDEF[i],score:G.scores[i]})).sort((a,b)=>b.score-a.score);
  document.getElementById('wname').textContent=sorted[0].name;
  document.getElementById('wsub').textContent=`🏅 ${sorted[0].score} балл · ${CATS[G.cat].name}`;
  const med=['🥇','🥈','🥉'],pcl=['pp1','pp2','pp3'];
  const ord=G.tc===2?[sorted[0],sorted[1]]:[sorted[0],sorted[1],sorted[2]];
  document.getElementById('wpodium').innerHTML=ord.map((t,r)=>`<div class="pp ${pcl[r]}"><div class="pp-med">${med[r]}</div><div class="pp-nm">${t.name}</div><div class="pp-sc">${t.score}</div></div>`).join('');
}

/* ─── TOURNAMENT ─── */
function nextRound(){
  if(G.tournRound>=5)return;
  const avail=CATS.filter(c=>!G.usedCats.includes(c.id));
  if(!avail.length){endTournament();return;}
  G.cat=avail[0].id;G.scores=new Array(G.tc).fill(0);
  goSetup();toast('Келесі категорияны таңдаңыз: '+avail[0].name,'i');
}
function endTournament(){
  const tots=G.tournScores.map(r=>r.reduce((a,b)=>a+(b||0),0));
  G.scores=tots;renderWin();showWinner();launchConfetti();
}

/* ─── COLLAPSE PANELS ─── */
function toggleCP(id){
  const body=document.getElementById('cpb-'+id),arrow=document.getElementById('cpa-'+id);
  const open=body.classList.toggle('open');
  arrow.classList.toggle('open',open);
}

/* ─── MODALS ─── */
function openModal(id){document.getElementById(id).classList.add('show');}
function closeModal(id){document.getElementById(id).classList.remove('show');}

/* ─── ADMIN ─── */
function openAdmin(){
  document.getElementById('adm-login').style.display='block';
  document.getElementById('adm-panel').style.display='none';
  document.getElementById('adm-pw').value='';
  openModal('adm-ov');
}
function checkPw(){
  if(document.getElementById('adm-pw').value==='teacher123'){
    document.getElementById('adm-login').style.display='none';
    document.getElementById('adm-panel').style.display='block';
    renderAQ();
  }else{toast('Қате құпия сөз!','e');document.getElementById('adm-pw').value='';}
}
function aTab(t){
  const ts=['q','add','io','data'];
  document.querySelectorAll('.atab').forEach((b,i)=>b.classList.toggle('active',ts[i]===t));
  document.querySelectorAll('.atc').forEach(c=>c.classList.remove('active'));
  document.getElementById('atc-'+t).classList.add('active');
  if(t==='q')renderAQ();
}
function renderAQ(){
  const cat=parseInt(document.getElementById('acat-sel').value);
  const ql=QS.filter(q=>q.cat===cat);
  const list=document.getElementById('aqlist');
  if(!ql.length){list.innerHTML='<div style="font-size:11px;color:var(--text3)">Сұрақтар жоқ</div>';return;}
  list.innerHTML=ql.map((q,li)=>{const gi=QS.indexOf(q);return`<div class="qli"><span class="qli-p">${q.pts}</span><span class="qli-t">${q.q.slice(0,65)}${q.q.length>65?'...':''}</span><button class="adel" onclick="admDel(${gi})">🗑️</button></div>`;}).join('');
}
function admAddQ(){
  const cat=+document.getElementById('a-cat').value;
  const q=document.getElementById('a-q').value.trim();
  const o0=document.getElementById('a-o0').value.trim();
  const o1=document.getElementById('a-o1').value.trim();
  const o2=document.getElementById('a-o2').value.trim();
  const o3=document.getElementById('a-o3').value.trim();
  const pts=+document.getElementById('a-pts').value;
  if(!q||!o0||!o1||!o2||!o3){toast('Барлық өрістерді толтырыңыз!','e');return;}
  QS.push({cat,pts,q,opts:[o0,o1,o2,o3],correct:0});saveSt(QS);
  ['a-q','a-o0','a-o1','a-o2','a-o3'].forEach(id=>document.getElementById(id).value='');
  toast('Сұрақ қосылды!','s');renderAQ();
}
function admDel(idx){if(!confirm('Жою керек пе?'))return;QS.splice(idx,1);saveSt(QS);renderAQ();toast('Жойылды','i');}
function admExp(){const b=new Blob([JSON.stringify(QS,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='quiz-questions.json';a.click();toast('Экспорт жасалды!','s');}
function admImp(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=ev=>{
    try{
      const p=JSON.parse(ev.target.result);
      // Жаңа формат: [{categoryName, categoryIcon, questions:[...]}]
      if(Array.isArray(p)&&p[0]&&p[0].categoryName){
        let added=0,cats=0;
        p.forEach(cat=>{
          const newId=CATS.length;
          CATS.push({id:newId,name:cat.categoryName,icon:cat.categoryIcon||'📚',aiGenerated:false});
          cat.questions.forEach(q=>{
            QS.push({cat:newId,pts:Number(q.pts)||10,q:q.q,opts:q.opts,correct:q.correct||0});
            added++;
          });
          cats++;
        });
        saveSt(QS);renderSetup();renderAQ();
        toast(`✅ ${cats} категория, ${added} сұрақ қосылды!`,'s');
        // Setup экранына өтіп категорияны көрсет
        setTimeout(()=>{
          const cg=document.getElementById('cat-grid');
          if(cg)cg.scrollIntoView({behavior:'smooth',block:'center'});
        },300);
      }
      // Ескі формат: [{cat, pts, q, opts, correct}]
      else if(Array.isArray(p)&&p[0]&&p[0].q){
        QS=p;saveSt(QS);
        toast(`${p.length} сұрақ импортталды!`,'s');renderAQ();
      }else throw'format';
    }catch{toast('❌ Қате файл форматы!','e');}
  };
  r.readAsText(f);e.target.value='';
}
function admClrHist(){if(!confirm('Барлық тарихты өшіру?'))return;localStorage.removeItem('qh');toast('Тарих тазаланды','i');}
function admRstQ(){if(!confirm('Барлық сұрақтарды қалпына келтіру?'))return;QS=JSON.parse(JSON.stringify(DQ));localStorage.removeItem('qq');toast('Қалпына келтірілді','s');renderAQ();}

/* ─── HISTORY ─── */
function openHistory(){
  const h=loadHist();
  document.getElementById('hlist').innerHTML=!h.length?'<div style="font-size:11px;color:var(--text3);text-align:center">Тарих жоқ</div>':h.map(e=>`<div class="hitem"><div class="hdate">${e.date} · ${e.type}${e.category?' · '+e.category:''}</div><div class="hwinner">🏆 ${e.winner}</div><div class="hscores">${e.scores.map(s=>s.name+': '+s.score+' балл').join(' | ')}</div></div>`).join('');
  openModal('hist-ov');
}

/* ─── THEME / PROJECTOR ─── */
function setTheme(t){document.documentElement.setAttribute('data-theme',t);localStorage.setItem('qt',t);}
function toggleProj(){document.body.classList.toggle('proj');toast(document.body.classList.contains('proj')?'Проектор режимі қосылды':'Өшірілді','i');}
function goSetup(){clearInterval(G.tInterval);closeModal('qoverlay');showSetup();renderSetup();}

/* ─── CONFETTI ─── */
function launchConfetti(){
  const cvs=document.getElementById('cvs'),ctx=cvs.getContext('2d');
  cvs.width=window.innerWidth;cvs.height=window.innerHeight;
  const ps=Array.from({length:160},()=>({x:Math.random()*cvs.width,y:Math.random()*cvs.height-cvs.height,w:Math.random()*10+5,h:Math.random()*6+3,color:['#f0b429','#ffd060','#e63b3b','#1e6ef5','#1db954','#fff','#ff69b4'][Math.floor(Math.random()*7)],rot:Math.random()*360,vx:(Math.random()-0.5)*3,vy:Math.random()*4+2,vr:(Math.random()-0.5)*6,op:1}));
  let fr=0;
  (function draw(){ctx.clearRect(0,0,cvs.width,cvs.height);ps.forEach(p=>{ctx.save();ctx.globalAlpha=p.op;ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.fillStyle=p.color;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;if(fr>100)p.op-=0.015;});fr++;if(ps.some(p=>p.op>0))requestAnimationFrame(draw);else ctx.clearRect(0,0,cvs.width,cvs.height);})();
}

/* ─── SCORE POPUP ─── */
function spawnPop(txt,c){const p=document.createElement('div');p.className='spop';p.style.color=c;p.style.left=(Math.random()*60+20)+'%';p.style.top='35%';p.textContent=txt;document.body.appendChild(p);setTimeout(()=>p.remove(),1300);}

/* ─── TOAST ─── */
function toast(msg,type='i'){const c=document.getElementById('toastwrap');const t=document.createElement('div');t.className=`toast ${type}`;t.textContent=msg;c.appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(100%)';t.style.transition='all 0.3s';},2200);setTimeout(()=>t.remove(),2600);}

/* ─── UTILITY ─── */
function shuf(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;}

/* ─── INIT ─── */
window.addEventListener('load',()=>{
  const th=localStorage.getItem('qt');if(th)document.documentElement.setAttribute('data-theme',th);
  showSetup();renderSetup();
  document.querySelectorAll('.aov,.overlay').forEach(ov=>{
    ov.addEventListener('click',e=>{if(e.target===ov&&ov.id!=='qoverlay')closeModal(ov.id);});
  });
  // Load saved API key
  const savedKey=localStorage.getItem('gemini_key');
  if(savedKey)document.getElementById('api-key-inp').value=savedKey;
});

/* ════════════════════════════════════════
   AI CHATBOT — GEMINI CATEGORY GENERATOR
════════════════════════════════════════ */
let chatOpen=false;
let aiGenerating=false;

function toggleChat(){
  chatOpen=!chatOpen;
  document.getElementById('chat-panel').classList.toggle('open',chatOpen);
  document.getElementById('cbadge').style.display='none';
  if(chatOpen)setTimeout(()=>document.getElementById('chat-inp').focus(),300);
}

function sendHint(el){
  const txt=el.textContent.replace(/^[^\w]+/,'').trim();
  document.getElementById('chat-inp').value=txt;
  document.getElementById('chat-inp').focus();
}

function addMsg(text,type='bot'){
  const msgs=document.getElementById('chat-msgs');
  const div=document.createElement('div');
  div.className=`cmsg ${type}`;
  div.innerHTML=text;
  msgs.appendChild(div);
  msgs.scrollTop=msgs.scrollHeight;
  return div;
}

function setTyping(show){
  const t=document.getElementById('chat-typing');
  t.style.display=show?'flex':'none';
  if(show){
    const msgs=document.getElementById('chat-msgs');
    msgs.scrollTop=msgs.scrollHeight;
  }
}

async function sendChat(){
  if(aiGenerating)return;
  const inp=document.getElementById('chat-inp');
  const topic=inp.value.trim();
  if(!topic)return;

  // Get API key
  const apiKeyInp=document.getElementById('api-key-inp');
  const apiKey=apiKeyInp.value.trim();
  if(!apiKey){
    addMsg('⚠️ Алдымен Gemini API кілтін енгізіңіз!','err');
    apiKeyInp.focus();
    return;
  }
  localStorage.setItem('gemini_key',apiKey);

  // Show user message
  addMsg(topic,'user');
  inp.value='';
  aiGenerating=true;
  document.getElementById('chat-send-btn').disabled=true;

  addMsg(`🔍 <strong>"${topic}"</strong> тақырыбы бойынша 18 сұрақ дайындалуда...`,'bot');
  setTyping(true);

  try{
    const questions=await generateWithGemini(topic,apiKey);
    setTyping(false);

    if(!questions||questions.length===0){
      addMsg('❌ Сұрақтар жасалмады. Тақырыпты өзгертіп көріңіз.','err');
    }else{
      // Add new category to CATS and QS
      const newCatId=CATS.length;
      const icon=getCatIcon(topic);
      CATS.push({id:newCatId,name:topic,icon,aiGenerated:true});
      questions.forEach(q=>QS.push({...q,cat:newCatId}));

      // Success message with card
      const card=addMsg('','bot');
      card.innerHTML=`
        ✅ Категория дайын!
        <div class="cat-added-card">
          <div class="cat-added-title">${icon} ${topic}</div>
          <div class="cat-added-info">📝 ${questions.length} сұрақ қосылды<br>10 балл: ${questions.filter(q=>q.pts===10).length} | 20 балл: ${questions.filter(q=>q.pts===20).length} | 30 балл: ${questions.filter(q=>q.pts===30).length}</div>
          <button class="cat-play-btn" onclick="selectNewCat(${newCatId});toggleChat()">⚔️ ОСЫМЕН ОЙНАУ</button>
        </div>`;

      // Update setup screen
      renderSetup();
      // Show badge if chat is closed
      if(!chatOpen)document.getElementById('cbadge').style.display='flex';
      toast(`✨ "${topic}" категориясы қосылды!`,'s');
    }
  }catch(e){
    setTyping(false);
    console.error('Gemini error:',e);
    if(e.message&&e.message.includes('API_KEY')){
      addMsg('🔑 API кілті қате. Gemini API кілтіңізді тексеріңіз.','err');
    }else if(e.message&&e.message.includes('quota')){
      addMsg('⏳ Лимит таусылды. Біраз уақыттан кейін қайталаңыз.','err');
    }else{
      addMsg(`❌ Қате: ${e.message||'Белгісіз қате'}. Интернет байланысын тексеріңіз.`,'err');
    }
  }

  aiGenerating=false;
  document.getElementById('chat-send-btn').disabled=false;
}

async function generateWithGemini(topic,apiKey){
  const prompt=`Сен қазақ мектебінің викторина ойыны үшін сұрақтар жасаушысың.

Тақырып: "${topic}"

Міндет: Дәл 18 сұрақ жаса:
- 6 сұрақ 10 балл (оңай)
- 6 сұрақ 20 балл (орташа)
- 6 сұрақ 30 балл (қиын)

Әрбір сұрақта 4 нұсқа болсын. Бірінші нұсқа (A) МІНДЕТТІ ТҮРДЕ дұрыс жауап болуы керек.

Тек JSON форматында жауап бер, басқа ешнәрсе жазба, тіпті \`\`\`json да жазба:
[{"pts":10,"q":"Сұрақ?","opts":["Дұрыс","Қате1","Қате2","Қате3"]},...]

Ережелер:
- Барлық мәтін қазақ тілінде
- Сұрақтар нақты, анық
- Тақырыпқа сай`;

  // gemini-1.5-flash — тегін, жылдам, CORS қолдайды
  const url=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response=await fetch(url,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      contents:[{role:'user',parts:[{text:prompt}]}],
      generationConfig:{
        temperature:0.7,
        maxOutputTokens:4096,
        responseMimeType:'application/json'
      }
    })
  });

  if(!response.ok){
    let errMsg=`HTTP қатесі: ${response.status}`;
    try{const err=await response.json();errMsg=err.error?.message||errMsg;}catch(e){}
    throw new Error(errMsg);
  }

  const data=await response.json();
  const text=data.candidates?.[0]?.content?.parts?.[0]?.text||'';
  if(!text)throw new Error('Бос жауап келді');

  // JSON тазалау
  let jsonStr=text.trim();
  // Remove markdown code blocks if present
  jsonStr=jsonStr.replace(/^```json\s*/,'').replace(/^```\s*/,'').replace(/\s*```$/,'').trim();
  // Find JSON array
  const start=jsonStr.indexOf('[');
  const end=jsonStr.lastIndexOf(']');
  if(start===-1||end===-1)throw new Error('JSON табылмады');
  jsonStr=jsonStr.slice(start,end+1);

  const parsed=JSON.parse(jsonStr);

  return parsed.filter(q=>q&&q.q&&Array.isArray(q.opts)&&q.opts.length>=4).map(q=>({
    cat:-1,
    pts:Number(q.pts)||10,
    q:String(q.q).trim(),
    opts:[String(q.opts[0]),String(q.opts[1]),String(q.opts[2]),String(q.opts[3])],
    correct:0
  }));
}

function getCatIcon(topic){
  const t=topic.toLowerCase();
  if(t.includes('математ')||t.includes('алгебр')||t.includes('геометр'))return '🧮';
  if(t.includes('биолог')||t.includes('жануар')||t.includes('өсімдік'))return '🌿';
  if(t.includes('тарих')||t.includes('history'))return '📜';
  if(t.includes('географ')||t.includes('елдер')||t.includes('материк'))return '🌍';
  if(t.includes('физик')||t.includes('химия'))return '⚗️';
  if(t.includes('әдебиет')||t.includes('өнер'))return '🎨';
  if(t.includes('спорт')||t.includes('футбол'))return '⚽';
  if(t.includes('ғарыш')||t.includes('астроном'))return '🚀';
  if(t.includes('музык'))return '🎵';
  if(t.includes('дін'))return '☪️';
  if(t.includes('қазақ'))return '🇰🇿';
  return '📚';
}

function selectNewCat(catId){
  G.cat=catId;
  renderSetup();
  showSetup();
  // Scroll to category section
  setTimeout(()=>{
    const el=document.getElementById('cat-grid');
    if(el)el.scrollIntoView({behavior:'smooth',block:'center'});
  },300);
}
</script>

</body>
</html>
