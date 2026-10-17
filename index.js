const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
<title>Europify</title>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:       #050505;
  --bg2:      #0d0d0d;
  --bg3:      #141414;
  --bg4:      #0f0f0f;
  --border:   rgba(255,255,255,0.06);
  --border2:  rgba(255,255,255,0.13);
  --text:     #ffffff;
  --text2:    rgba(255,255,255,0.72);
  --text3:    rgba(255,255,255,0.48);
  --scroll:   rgba(255,255,255,0.06);
  --sidebar-w: 280px;
  --header-h:  62px;
  --player-h:  72px;
  --accent:   rgba(255,255,255,0.9);
}

body.light {
  --bg:       #fafafa;
  --bg2:      #ffffff;
  --bg3:      #f3f3f3;
  --bg4:      #f8f8f8;
  --border:   rgba(0,0,0,0.07);
  --border2:  rgba(0,0,0,0.14);
  --text:     #0a0a0a;
  --text2:    rgba(0,0,0,0.65);
  --text3:    rgba(0,0,0,0.35);
  --scroll:   rgba(0,0,0,0.08);
}

html, body { height: 100%; background: var(--bg); color: var(--text); font-family: 'Sora', sans-serif; font-size: 15px; line-height: 1.6; overflow: hidden; }

* { -webkit-user-select: none; user-select: none; -webkit-tap-highlight-color: transparent; }
input, textarea { -webkit-user-select: text; user-select: text; }

/* ── Loading ── */
#loading-screen {
  position: fixed; inset: 0; z-index: 9999;
  background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 18px;
  animation: loaderFadeOut 0.5s ease 1.8s forwards;
  pointer-events: none;
}
@keyframes loaderFadeOut { 0% { opacity:1; } 100% { opacity:0; visibility:hidden; display:none; } }
#loading-screen.hide { opacity: 0; visibility: hidden; pointer-events: none; }
.loading-logo { display: flex; align-items: center; gap: 10px; animation: fadeInUp 0.6s ease both; }
.loading-logo span { font-size: 26px; font-weight: 600; letter-spacing: -0.5px; }
.loading-bar { width: 120px; height: 2px; background: var(--bg3); border-radius: 2px; overflow: hidden; animation: fadeInUp 0.6s 0.15s ease both; }
.loading-bar-fill { height: 100%; width: 0%; background: linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.6), rgba(255,255,255,0.3)); animation: loadBar 1.4s ease forwards; border-radius: 2px; }
body.light .loading-bar-fill { background: linear-gradient(90deg, rgba(0,0,0,0.2), rgba(0,0,0,0.4), rgba(0,0,0,0.2)); }
@keyframes loadBar { to { width: 100%; } }
@keyframes fadeInUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
@keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.35;} }
@keyframes shimmer { to { background-position: -200% 0; } }
@keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
@keyframes slideUp { from { transform: translateY(100%); opacity:0; } to { transform:translateY(0); opacity:1; } }
@keyframes scaleIn { from { transform:scale(0.92); opacity:0; } to { transform:scale(1); opacity:1; } }

/* ── Shell ── */
.shell { display: flex; height: 100vh; height: 100dvh; overflow: hidden; }

/* ── Sidebar ── */
.sidebar {
  width: var(--sidebar-w); flex-shrink: 0;
  background: var(--bg2); border-right: 1px solid var(--border);
  display: flex; flex-direction: column;
  transform: translateX(-100%);
  transition: transform 0.28s cubic-bezier(.4,0,.2,1);
  position: fixed; left: 0; top: 0; bottom: 0; z-index: 50;
}
.sidebar.open { transform: translateX(0); }
.sidebar-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,0.55);
  z-index: 49; opacity: 0; pointer-events: none;
  transition: opacity 0.28s ease; backdrop-filter: blur(2px);
}
.sidebar-backdrop.show { opacity: 1; pointer-events: all; }

.sidebar-header { padding: 18px 16px 14px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
.sidebar-brand { display: flex; align-items: center; gap: 8px; }
.sidebar-brand-text { font-size: 14px; font-weight: 600; letter-spacing: -0.3px; }
.sidebar-brand-badge { font-size: 10px; font-weight: 500; color: var(--text2); background: var(--bg3); border: 1px solid var(--border); padding: 2px 7px; border-radius: 20px; letter-spacing: 0.5px; text-transform: uppercase; }

.sidebar-nav { flex: 1; overflow-y: auto; padding: 10px 8px; }
.sidebar-nav::-webkit-scrollbar { width: 3px; }
.sidebar-nav::-webkit-scrollbar-thumb { background: var(--scroll); border-radius: 3px; }

.nav-section { padding: 14px 10px 5px; font-size: 10px; font-weight: 600; color: var(--text3); letter-spacing: 1px; text-transform: uppercase; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 9px; cursor: pointer; transition: background 0.12s, color 0.12s; margin-bottom: 1px; font-size: 13px; color: var(--text2); font-weight: 400; }
.nav-item:hover { background: var(--bg3); color: var(--text); }
.nav-item.active { background: var(--bg3); color: var(--text); }
.nav-item svg { opacity: 0.5; flex-shrink: 0; transition: opacity 0.12s; }
.nav-item.active svg, .nav-item:hover svg { opacity: 1; }

.sidebar-footer { border-top: 1px solid var(--border); padding: 12px; flex-shrink: 0; }
.sidebar-action-link { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 11px; margin-bottom: 6px; border: 1px solid var(--border); border-radius: 9px; background: var(--bg3); color: var(--text); font: inherit; font-size: 12px; text-align: left; text-decoration: none; cursor: pointer; transition: background 0.15s, border-color 0.15s; box-sizing: border-box; }
.sidebar-action-link:hover { background: var(--bg); border-color: var(--border2); }
.sidebar-action-link svg { flex-shrink: 0; opacity: 0.8; }
.main-footer { padding: 18px 8px 12px; margin-top: 24px; border-top: 1px solid var(--border); color: var(--text3); text-align: center; font-size: 11px; letter-spacing: 0.2px; }
.sidebar-theme-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 4px; }
.sidebar-theme-label { font-size: 12px; color: var(--text3); }
.theme-toggle { width: 38px; height: 22px; border-radius: 11px; background: var(--bg3); border: 1px solid var(--border2); cursor: pointer; position: relative; transition: background 0.2s; }
.theme-toggle-knob { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: var(--text2); transition: transform 0.2s, background 0.2s; }
body.light .theme-toggle-knob { transform: translateX(16px); }

/* ── Main ── */
.main { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: hidden; }

/* ── Header ── */
.header { height: var(--header-h); display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-bottom: 1px solid var(--border); background: var(--bg); flex-shrink: 0; position: relative; z-index: 10; }
.header-left { display: flex; align-items: center; gap: 10px; }
.menu-btn { background: none; border: none; color: var(--text2); cursor: pointer; padding: 6px; border-radius: 8px; display: flex; align-items: center; transition: color 0.2s, background 0.2s; }
.menu-btn:hover { color: var(--text); background: var(--bg3); }
.logo { display: flex; align-items: center; gap: 8px; }
.logo svg { flex-shrink: 0; }
.logo-text { font-size: 16px; font-weight: 600; letter-spacing: -0.3px; }
.logo-badge { font-size: 10px; font-weight: 500; color: var(--text2); background: var(--bg3); border: 1px solid var(--border); padding: 2px 7px; border-radius: 20px; letter-spacing: 0.5px; text-transform: uppercase; }
.header-right { display: flex; align-items: center; gap: 6px; }
.icon-btn { background: none; border: none; color: var(--text2); cursor: pointer; padding: 6px; border-radius: 8px; display: flex; align-items: center; transition: color 0.2s, background 0.2s; }
.icon-btn:hover { color: var(--text); background: var(--bg3); }
.icon-btn.active { color: var(--text); }

/* Header search */
.header-search-wrap { position: relative; display: flex; align-items: center; }
.search-box { position: absolute; right: 36px; top: 50%; transform: translateY(-50%); width: 0; overflow: hidden; transition: width 0.3s cubic-bezier(.4,0,.2,1); background: var(--bg2); border: 1px solid var(--border); border-radius: 9px; }
.search-box.open { width: 200px; border-color: var(--border2); }
.search-input { width: 100%; background: none; border: none; outline: none; color: var(--text); font-family: 'Sora', sans-serif; font-size: 13px; padding: 7px 12px; }
.search-input::placeholder { color: var(--text3); }

/* ── Content Area ── */
.content-area { flex: 1; overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--scroll) transparent; }
.content-area::-webkit-scrollbar { width: 4px; }
.content-area::-webkit-scrollbar-thumb { background: var(--scroll); border-radius: 4px; }
.content-inner { max-width: 800px; margin: 0 auto; padding: 20px 16px calc(var(--player-h) + 20px); }

/* ── Views ── */
.view { display: none; }
.view.active { display: block; animation: fadeInUp 0.3s ease both; }

/* ── Section Headers ── */
.section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
.section-title { font-size: 13px; font-weight: 600; color: var(--text3); letter-spacing: 0.8px; text-transform: uppercase; }
.section-action { font-size: 12px; color: var(--text3); cursor: pointer; padding: 3px 8px; border-radius: 6px; transition: color 0.15s, background 0.15s; }
.section-action:hover { color: var(--text2); background: var(--bg3); }

/* ── Song Cards (List) ── */
.song-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: 10px;
  cursor: pointer; transition: background 0.15s;
  margin-bottom: 2px; position: relative;
}
.song-item:hover { background: var(--bg3); }
.song-item.playing { background: var(--bg3); }
.song-item.playing .song-item-title { color: var(--text); }
.song-num { width: 20px; text-align: center; font-size: 12px; color: var(--text3); font-family: 'JetBrains Mono', monospace; flex-shrink: 0; }
.song-item.playing .song-num { display: none; }
.song-playing-bars { display: none; width: 20px; flex-shrink: 0; align-items: flex-end; justify-content: center; gap: 2px; height: 16px; }
.song-item.playing .song-playing-bars { display: flex; }
.bar { width: 3px; border-radius: 2px; background: var(--text2); animation: barAnim 0.8s ease infinite; }
.bar:nth-child(1) { animation-delay: 0s; height: 8px; }
.bar:nth-child(2) { animation-delay: 0.15s; height: 14px; }
.bar:nth-child(3) { animation-delay: 0.3s; height: 6px; }
@keyframes barAnim { 0%,100%{transform:scaleY(0.4);} 50%{transform:scaleY(1);} }
.song-item.paused .bar { animation-play-state: paused; }

.song-item-thumb { width: 44px; height: 44px; border-radius: 8px; overflow: hidden; flex-shrink: 0; background: var(--bg3); border: 1px solid var(--border); }
.song-item-thumb img { width: 100%; height: 100%; object-fit: cover; }
.song-item-info { flex: 1; min-width: 0; }
.song-item-title { font-size: 13.5px; font-weight: 500; color: var(--text2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color 0.15s; }
.song-item:hover .song-item-title { color: var(--text); }
.song-item-artist { font-size: 12px; color: var(--text3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.song-item-duration { font-size: 11.5px; color: var(--text3); font-family: 'JetBrains Mono', monospace; flex-shrink: 0; }
.song-item-actions { display: flex; align-items: center; gap: 4px; opacity: 0; transition: opacity 0.15s; flex-shrink: 0; }
.song-item:hover .song-item-actions { opacity: 1; }
.song-action-btn { background: none; border: none; color: var(--text3); cursor: pointer; padding: 4px; border-radius: 6px; display: flex; align-items: center; transition: color 0.15s; }
.song-action-btn:hover { color: var(--text2); }
.song-action-btn.liked { color: #f87171; }

/* ── Skeleton ── */
.skeleton { background: linear-gradient(90deg, var(--bg3) 25%, var(--bg4) 50%, var(--bg3) 75%); background-size: 200% 100%; animation: shimmer 1.6s infinite; border-radius: 8px; }
.skeleton-song { display: flex; align-items: center; gap: 12px; padding: 10px 12px; margin-bottom: 2px; }
.skeleton-thumb { width: 44px; height: 44px; border-radius: 8px; flex-shrink: 0; }
.skeleton-info { flex: 1; }
.skeleton-line { height: 12px; border-radius: 6px; margin-bottom: 6px; }
.skeleton-line.w60 { width: 60%; }
.skeleton-line.w80 { width: 80%; }
.skeleton-line.w40 { width: 40%; }

/* ── Empty State ── */
.empty-state { padding: 60px 20px; text-align: center; }
.empty-icon { font-size: 48px; margin-bottom: 12px; opacity: 0.3; }
.empty-title { font-size: 15px; font-weight: 500; color: var(--text2); margin-bottom: 6px; }
.empty-desc { font-size: 13px; color: var(--text3); }

/* ── HOME VIEW ── */
.home-hero { margin-bottom: 28px; }
.home-greeting { font-size: 11px; font-weight: 600; color: var(--text3); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
.home-title { font-size: 22px; font-weight: 600; letter-spacing: -0.5px; }
.home-subtitle { font-size: 13px; color: var(--text3); margin-top: 4px; }

.quick-picks { display: flex; gap: 10px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; margin-bottom: 28px; }
.quick-picks::-webkit-scrollbar { display: none; }
.quick-pick-btn { display: flex; align-items: center; gap: 8px; padding: 8px 14px 8px 8px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; cursor: pointer; white-space: nowrap; transition: all 0.18s; flex-shrink: 0; }
.quick-pick-btn:hover { border-color: var(--border2); background: var(--bg3); }
.quick-pick-btn img { width: 32px; height: 32px; border-radius: 6px; object-fit: cover; background: var(--bg3); }
.quick-pick-btn span { font-size: 12.5px; font-weight: 500; color: var(--text2); }

.mood-chips { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; margin-bottom: 28px; }
.mood-chips::-webkit-scrollbar { display: none; }
.mood-chip { padding: 6px 14px; border-radius: 20px; background: var(--bg2); border: 1px solid var(--border); font-size: 12px; color: var(--text2); cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: all 0.18s; }
.mood-chip:hover { background: var(--bg3); border-color: var(--border2); color: var(--text); }
.mood-chip.active { background: var(--text); color: var(--bg); border-color: var(--text); }

/* ── SEARCH VIEW ── */
.search-view-input-wrap { position: relative; margin-bottom: 20px; }
.search-view-input { width: 100%; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; color: var(--text); font-family: 'Sora', sans-serif; font-size: 14px; padding: 12px 16px 12px 44px; outline: none; transition: border-color 0.2s; -webkit-user-select: text; user-select: text; }
.search-view-input:focus { border-color: var(--border2); }
.search-view-input::placeholder { color: var(--text3); }
.search-view-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text3); pointer-events: none; }
.search-clear-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text3); cursor: pointer; padding: 4px; border-radius: 6px; display: none; align-items: center; transition: color 0.15s; }
.search-clear-btn.show { display: flex; }
.search-clear-btn:hover { color: var(--text2); }

.search-genres { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.genre-chip { padding: 7px 16px; border-radius: 9px; background: var(--bg2); border: 1px solid var(--border); font-size: 12.5px; color: var(--text2); cursor: pointer; transition: all 0.18s; }
.genre-chip:hover { background: var(--bg3); border-color: var(--border2); color: var(--text); }

.search-results-count { font-size: 12px; color: var(--text3); margin-bottom: 12px; font-family: 'JetBrains Mono', monospace; }

/* ── LIBRARY VIEW ── */
.library-tabs { display: flex; gap: 0; border-bottom: 1px solid var(--border); margin-bottom: 20px; }
.lib-tab { padding: 10px 16px; font-size: 13px; font-weight: 500; color: var(--text3); cursor: pointer; border-bottom: 2px solid transparent; transition: color 0.18s, border-color 0.18s; }
.lib-tab:hover { color: var(--text2); }
.lib-tab.active { color: var(--text); border-bottom-color: var(--text); }

.playlist-card { display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; margin-bottom: 8px; cursor: pointer; transition: border-color 0.18s; }
.playlist-card:hover { border-color: var(--border2); }
.playlist-art { width: 52px; height: 52px; border-radius: 8px; background: var(--bg3); flex-shrink: 0; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; gap: 1px; }
.playlist-art img { width: 100%; height: 100%; object-fit: cover; }
.playlist-art-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.playlist-info { flex: 1; min-width: 0; }
.playlist-name { font-size: 14px; font-weight: 500; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.playlist-count { font-size: 12px; color: var(--text3); margin-top: 2px; }
.playlist-actions { display: flex; gap: 4px; }

.create-playlist-btn { display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: var(--bg2); border: 1px dashed var(--border2); border-radius: 12px; cursor: pointer; font-size: 13px; color: var(--text3); transition: all 0.18s; width: 100%; margin-bottom: 16px; }
.create-playlist-btn:hover { border-color: var(--text3); color: var(--text2); background: var(--bg3); }

/* ── PLAYER SCREEN (Full) ── */
#player-screen {
  position: fixed; inset: 0; z-index: 200;
  background: var(--bg);
  display: none; flex-direction: column;
  overflow: hidden;
}
#player-screen.open { display: flex; animation: slideUp 0.35s cubic-bezier(.4,0,.2,1); }

.player-screen-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; flex-shrink: 0; }
.player-screen-close { background: none; border: none; color: var(--text2); cursor: pointer; padding: 6px; border-radius: 8px; display: flex; align-items: center; transition: color 0.2s; }
.player-screen-close:hover { color: var(--text); }
.player-screen-title { font-size: 13px; font-weight: 600; color: var(--text3); letter-spacing: 0.5px; text-transform: uppercase; }
.player-screen-options { background: none; border: none; color: var(--text2); cursor: pointer; padding: 6px; border-radius: 8px; display: flex; align-items: center; transition: color 0.2s; }
.player-screen-options:hover { color: var(--text); }

.player-artwork-wrap { flex: 1; display: flex; align-items: center; justify-content: center; padding: 20px 40px; min-height: 0; }
.player-artwork { width: 100%; max-width: 300px; aspect-ratio: 1; border-radius: 18px; overflow: hidden; background: var(--bg3); box-shadow: 0 20px 60px rgba(0,0,0,0.5); border: 1px solid var(--border); transition: transform 0.3s; }
.player-artwork.playing { transform: scale(1.02); }
.player-artwork img { width: 100%; height: 100%; object-fit: cover; }

.player-info-wrap { padding: 0 28px 10px; flex-shrink: 0; }
.player-song-title { font-size: 18px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; letter-spacing: -0.3px; }
.player-song-artist { font-size: 14px; color: var(--text3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.player-like-btn { background: none; border: none; color: var(--text3); cursor: pointer; padding: 4px; display: flex; align-items: center; transition: color 0.2s, transform 0.15s; flex-shrink: 0; }
.player-like-btn:hover { color: var(--text2); }
.player-like-btn.liked { color: #f87171; transform: scale(1.1); }
.player-info-row { display: flex; align-items: center; justify-content: space-between; }

/* Progress */
.player-progress-wrap { padding: 16px 28px 4px; flex-shrink: 0; }
.progress-bar-container { width: 100%; height: 4px; background: var(--border); border-radius: 2px; cursor: pointer; position: relative; margin-bottom: 8px; touch-action: none; }
.progress-bar-fill { height: 100%; background: var(--text2); border-radius: 2px; position: relative; transition: width 0.1s linear; pointer-events: none; }
.progress-bar-fill::after { content: ''; position: absolute; right: -5px; top: -4px; width: 12px; height: 12px; border-radius: 50%; background: var(--text); opacity: 0; transition: opacity 0.15s; }
.progress-bar-container:hover .progress-bar-fill::after { opacity: 1; }
.progress-times { display: flex; justify-content: space-between; font-size: 11px; color: var(--text3); font-family: 'JetBrains Mono', monospace; }

/* Controls */
.player-controls { display: flex; align-items: center; justify-content: center; gap: 20px; padding: 12px 28px; flex-shrink: 0; }
.ctrl-btn { background: none; border: none; color: var(--text2); cursor: pointer; padding: 8px; border-radius: 50%; display: flex; align-items: center; transition: color 0.2s, transform 0.15s; }
.ctrl-btn:hover { color: var(--text); transform: scale(1.1); }
.ctrl-btn.active { color: var(--text); }
.ctrl-btn-main { width: 56px; height: 56px; border-radius: 50%; background: var(--text); color: var(--bg); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.15s, background 0.2s; }
.ctrl-btn-main:hover { transform: scale(1.06); }
.ctrl-btn-main:active { transform: scale(0.96); }

/* Volume */
.player-volume-wrap { display: flex; align-items: center; gap: 10px; padding: 4px 28px 16px; flex-shrink: 0; }
.volume-icon { color: var(--text3); flex-shrink: 0; }
.volume-slider { flex: 1; -webkit-appearance: none; appearance: none; height: 3px; border-radius: 2px; background: var(--border); outline: none; cursor: pointer; }
.volume-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: var(--text); cursor: pointer; }
.volume-slider::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: var(--text); border: none; cursor: pointer; }

/* Queue toggle */
.player-queue-toggle { display: flex; justify-content: center; padding: 0 28px 12px; }
.queue-toggle-btn { font-size: 12px; color: var(--text3); background: none; border: 1px solid var(--border); padding: 6px 16px; border-radius: 20px; cursor: pointer; transition: all 0.18s; }
.queue-toggle-btn:hover { border-color: var(--border2); color: var(--text2); }
.queue-toggle-btn.active { border-color: var(--border2); color: var(--text); background: var(--bg3); }

/* Queue panel */
.player-queue { display: none; flex: 1; overflow-y: auto; padding: 0 16px 12px; border-top: 1px solid var(--border); }
.player-queue.show { display: block; }
.queue-header { font-size: 11px; font-weight: 600; color: var(--text3); letter-spacing: 1px; text-transform: uppercase; padding: 12px 0 8px; }

/* ── Mini Player Bar ── */
#mini-player {
  height: var(--player-h);
  background: var(--bg2); border-top: 1px solid var(--border);
  display: none; align-items: center; gap: 10px;
  padding: 0 16px; flex-shrink: 0; z-index: 30;
  cursor: pointer; position: relative;
}
#mini-player.show { display: flex; }
.mini-thumb { width: 46px; height: 46px; border-radius: 8px; overflow: hidden; background: var(--bg3); flex-shrink: 0; border: 1px solid var(--border); }
.mini-thumb img { width: 100%; height: 100%; object-fit: cover; }
.mini-info { flex: 1; min-width: 0; }
.mini-title { font-size: 13px; font-weight: 500; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mini-artist { font-size: 11.5px; color: var(--text3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mini-controls { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.mini-btn { background: none; border: none; color: var(--text2); cursor: pointer; padding: 6px; border-radius: 50%; display: flex; align-items: center; transition: color 0.2s; }
.mini-btn:hover { color: var(--text); }
.mini-play-btn { width: 36px; height: 36px; border-radius: 50%; background: var(--text); color: var(--bg); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.15s; }
.mini-play-btn:hover { transform: scale(1.08); }
.mini-progress { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--border); }
.mini-progress-fill { height: 100%; background: var(--text3); transition: width 0.1s linear; }

/* ── Toast ── */
#toast { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%) translateY(8px); background: var(--bg3); border: 1px solid var(--border2); border-radius: 9px; padding: 9px 18px; font-size: 12.5px; color: var(--text2); z-index: 500; opacity: 0; transition: all 0.25s cubic-bezier(.4,0,.2,1); white-space: nowrap; box-shadow: 0 8px 30px rgba(0,0,0,0.4); pointer-events: none; }
#toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

/* ── Modal ── */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 300; display: none; align-items: flex-end; justify-content: center; backdrop-filter: blur(4px); }
.modal-backdrop.open { display: flex; }
.modal-sheet { background: var(--bg2); border: 1px solid var(--border2); border-radius: 18px 18px 0 0; width: 100%; max-width: 480px; padding: 20px 20px 32px; animation: slideUp 0.3s cubic-bezier(.4,0,.2,1); }
.modal-handle { width: 36px; height: 4px; border-radius: 2px; background: var(--border2); margin: 0 auto 20px; }
.modal-title { font-size: 15px; font-weight: 600; margin-bottom: 16px; }
.modal-input { width: 100%; background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; color: var(--text); font-family: 'Sora', sans-serif; font-size: 14px; padding: 11px 14px; outline: none; margin-bottom: 12px; transition: border-color 0.2s; -webkit-user-select: text; user-select: text; }
.modal-input:focus { border-color: var(--border2); }
.modal-btn { width: 100%; padding: 11px; border-radius: 10px; font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; border: none; transition: all 0.18s; }
.modal-btn.primary { background: var(--text); color: var(--bg); margin-bottom: 8px; }
.modal-btn.primary:hover { opacity: 0.88; }
.modal-btn.secondary { background: var(--bg3); color: var(--text2); border: 1px solid var(--border); }
.modal-btn.secondary:hover { border-color: var(--border2); color: var(--text); }

.add-to-playlist-list { max-height: 240px; overflow-y: auto; margin-bottom: 12px; }
.add-playlist-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 9px; cursor: pointer; transition: background 0.15s; }
.add-playlist-item:hover { background: var(--bg3); }
.add-playlist-item-art { width: 38px; height: 38px; border-radius: 6px; background: var(--bg3); border: 1px solid var(--border); flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.add-playlist-item-art img { width: 100%; height: 100%; object-fit: cover; }
.add-playlist-item-name { font-size: 13px; font-weight: 500; color: var(--text2); }
.add-playlist-item-count { font-size: 11.5px; color: var(--text3); }

/* ── Bottom Nav (Mobile) ── */
.bottom-nav { display: none; }
@media (max-width: 600px) {
  .bottom-nav {
    display: flex; align-items: center; justify-content: space-around;
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 40;
    background: var(--bg2); border-top: 1px solid var(--border);
    height: 56px; padding-bottom: env(safe-area-inset-bottom);
    flex-shrink: 0;
  }
  #mini-player.show { bottom: 56px; position: fixed; left: 0; right: 0; }
  #mini-player { position: fixed; left: 0; right: 0; bottom: 56px; }
  .main { padding-bottom: 56px; }
  #toast { bottom: calc(56px + 12px); }
  .content-inner { padding-bottom: 24px; }
}
.bottom-nav-btn { display: flex; flex-direction: column; align-items: center; gap: 3px; background: none; border: none; color: var(--text3); cursor: pointer; padding: 6px 16px; border-radius: 10px; transition: color 0.15s; flex: 1; }
.bottom-nav-btn.active { color: var(--text); }
.bottom-nav-btn span { font-size: 10px; font-weight: 500; }
.bottom-nav-btn svg { transition: transform 0.15s; }
.bottom-nav-btn.active svg { transform: scale(1.1); }

/* ── Offline banner ── */
#offline-banner { display: none; background: rgba(248,113,113,0.08); border-bottom: 1px solid rgba(248,113,113,0.15); padding: 8px 16px; font-size: 12px; color: #f87171; text-align: center; flex-shrink: 0; }
#offline-banner.show { display: block; }

/* ── Misc ── */
.spinner { width: 20px; height: 20px; border: 2px solid var(--border2); border-top-color: var(--text2); border-radius: 50%; animation: spin 0.7s linear infinite; }
.loader-wrap { display: flex; justify-content: center; align-items: center; padding: 48px 0; }

/* Playlist detail */
.playlist-detail-header { display: flex; gap: 16px; align-items: flex-end; padding: 20px 0 24px; border-bottom: 1px solid var(--border); margin-bottom: 16px; }
.playlist-detail-art { width: 90px; height: 90px; border-radius: 12px; background: var(--bg3); border: 1px solid var(--border); flex-shrink: 0; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; gap: 1px; }
.playlist-detail-art img { width: 100%; height: 100%; object-fit: cover; }
.playlist-detail-art.empty { display: flex; align-items: center; justify-content: center; }
.playlist-detail-name { font-size: 18px; font-weight: 600; letter-spacing: -0.3px; margin-bottom: 4px; }
.playlist-detail-count { font-size: 13px; color: var(--text3); margin-bottom: 12px; }
.playlist-detail-controls { display: flex; gap: 8px; }
.playlist-play-btn { display: flex; align-items: center; gap: 6px; padding: 8px 18px; border-radius: 9px; background: var(--text); color: var(--bg); border: none; font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: opacity 0.18s; }
.playlist-play-btn:hover { opacity: 0.85; }

.back-btn { display: inline-flex; align-items: center; gap: 6px; background: var(--bg3); border: 1px solid var(--border2); color: var(--text2); padding: 7px 14px; border-radius: 9px; font-size: 13px; font-family: 'Sora', sans-serif; cursor: pointer; margin-bottom: 16px; transition: all 0.18s; }
.back-btn:hover { color: var(--text); border-color: var(--border2); }
/* ── Sleep timer ── */
.player-queue-toggle { gap: 8px; }
.sleep-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px; }
.sleep-opt { padding: 12px 0; border-radius: 10px; border: 1px solid var(--border); background: var(--bg3); color: var(--text); font-family: 'Sora', sans-serif; font-size: 13.5px; cursor: pointer; transition: border-color .18s; }
.sleep-opt:hover { border-color: var(--border2); }
.sleep-opt.wide { grid-column: 1 / -1; }
.sleep-status { text-align: center; font-size: 13px; color: var(--text2); margin-bottom: 12px; }

/* ── Light polish ── */
.brand-mini { width: 22px; height: 22px; border-radius: 6px; display: block; }
.ctrl-btn-main { box-shadow: 0 6px 22px var(--glow); }
.player-artwork { box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 70px var(--glow); }
.nav-item.active { box-shadow: inset 2px 0 0 var(--text); }
.quick-pick-btn:hover { border-color: var(--border2); transform: translateY(-1px); }
.song-item:active { transform: scale(0.99); }

</style>
</head>
<body>

<!-- Loading Screen -->
<div id="loading-screen">
  <div class="loading-logo">
    <span>Europify</span>
  </div>
  <div class="loading-bar"><div class="loading-bar-fill"></div></div>
</div>

<!-- Sidebar backdrop -->
<div class="sidebar-backdrop" id="sidebar-backdrop" onclick="closeSidebar()"></div>

<!-- Sidebar -->
<div class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <div class="sidebar-brand">
      <span class="sidebar-brand-text">Europify</span>
    </div>
    <button class="icon-btn" onclick="closeSidebar()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-section">Navigation</div>
    <div class="nav-item active" id="nav-home" onclick="showView('home');closeSidebar()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      Home
    </div>
    <div class="nav-item" id="nav-search" onclick="showView('search');closeSidebar()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      Search
    </div>
    <div class="nav-item" id="nav-library" onclick="showView('library');closeSidebar()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
      Library
    </div>
    <div class="nav-section">Discover</div>
    <div class="nav-item" onclick="searchByGenre('bollywood 2025');closeSidebar()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
      Bollywood
    </div>
    <div class="nav-item" onclick="searchByGenre('punjabi hits');closeSidebar()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      Punjabi Hits
    </div>
    <div class="nav-item" onclick="searchByGenre('arijit singh');closeSidebar()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
      Arijit Singh
    </div>
    <div class="nav-item" onclick="searchByGenre('lofi chill');closeSidebar()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"/><path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>
      Lofi / Chill
    </div>
  </nav>
  <div class="sidebar-footer">
    <a class="sidebar-action-link" href="https://app.europacrest.workers.dev/" target="_blank" rel="noopener noreferrer" onclick="closeSidebar()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.2 4.5L19 9l-3.5 3.4.8 4.8L12 15l-4.3 2.2.8-4.8L5 9l4.8-1.5L12 3z"/><path d="M5 19h14"/></svg>
      <span>Open Europa Crest</span>
      <svg style="margin-left:auto" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5"/></svg>
    </a>
    <a class="sidebar-action-link" href="https://mail.google.com/mail/?view=cm&fs=1&to=europacrest%40gmail.com" target="_blank" rel="noopener noreferrer" onclick="closeSidebar()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
      <span>Support</span>
      <svg style="margin-left:auto" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5"/></svg>
    </a>
    <div class="sidebar-theme-row">
      <span class="sidebar-theme-label">Light Mode</span>
      <div class="theme-toggle" onclick="toggleTheme()"><div class="theme-toggle-knob"></div></div>
    </div>
    <div id="sidebar-logout" style="display:none;margin-top:10px;">
      <button onclick="doLogout()" style="width:100%;padding:9px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--text3);font-size:13px;cursor:pointer;">Sign Out</button>
    </div>
    <div style="margin-top:10px;font-size:10px;color:var(--text3);text-align:center;">Powered by Europa &nbsp;·&nbsp; Made by Ayush Raj Sinha</div>
  </div>
</div>

<!-- Shell -->
<div class="shell">
  <div class="main">

    <!-- Header -->
    <div class="header">
      <div class="header-left">
        <button class="menu-btn" onclick="openSidebar()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div class="logo">
          <span class="logo-text">Europify</span>
        </div>
      </div>
      <div class="header-right">
        <div class="header-search-wrap">
          <div class="search-box" id="header-search-box">
            <input class="search-input" id="header-search-input" type="text" placeholder="Search songs..." autocomplete="off"/>
          </div>
          <button class="icon-btn" id="header-search-btn" onclick="toggleHeaderSearch()">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </div>
        <button class="icon-btn" onclick="toggleTheme()" title="Toggle theme">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        </button>
      </div>
    </div>

    <!-- Offline banner -->
    <div id="offline-banner">You're offline — music may not load</div>

    <!-- Content -->
    <div class="content-area" id="content-area">
      <div class="content-inner">

        <!-- HOME VIEW -->
        <div class="view active" id="view-home">
          <div class="home-hero">
            <div class="home-greeting" id="home-greeting">Good evening</div>
            <div class="home-title">What do you want to<br>listen to?</div>
          </div>

          <!-- Quick picks -->
          <div class="section-header"><span class="section-title">Quick Picks</span></div>
          <div class="quick-picks" id="quick-picks">
            <div class="quick-pick-btn" onclick="searchByGenre('arijit singh')">
              <img src="https://c.saavncdn.com/artists/Arijit_Singh_004_20241118063717_500x500.jpg" alt="Arijit" onerror="this.style.display='none'"/>
              <span>Arijit Singh</span>
            </div>
            <div class="quick-pick-btn" onclick="searchByGenre('bollywood 2025')">
              <img src="" alt="" style="background:var(--bg3)" onerror="this.style.display='none'"/>
              <span>Bollywood 2025</span>
            </div>
            <div class="quick-pick-btn" onclick="searchByGenre('punjabi hits')">
              <img src="" alt="" style="background:var(--bg3)" onerror="this.style.display='none'"/>
              <span>Punjabi Hits</span>
            </div>
            <div class="quick-pick-btn" onclick="searchByGenre('lofi chill music')">
              <img src="" alt="" style="background:var(--bg3)" onerror="this.style.display='none'"/>
              <span>Lofi Chill</span>
            </div>
            <div class="quick-pick-btn" onclick="searchByGenre('shreya ghoshal')">
              <img src="" alt="" style="background:var(--bg3)" onerror="this.style.display='none'"/>
              <span>Shreya Ghoshal</span>
            </div>
          </div>

          <!-- Mood -->
          <div class="section-header"><span class="section-title">Mood</span></div>
          <div class="mood-chips">
            <div class="mood-chip active" onclick="setMood(this,'trending hindi')">Trending</div>
            <div class="mood-chip" onclick="setMood(this,'romantic hindi songs')">Romantic</div>
            <div class="mood-chip" onclick="setMood(this,'sad songs hindi')">Sad</div>
            <div class="mood-chip" onclick="setMood(this,'party songs 2025')">Party</div>
            <div class="mood-chip" onclick="setMood(this,'motivation songs')">Motivation</div>
            <div class="mood-chip" onclick="setMood(this,'devotional songs')">Devotional</div>
            <div class="mood-chip" onclick="setMood(this,'90s hindi songs')">90s</div>
          </div>

          <!-- Trending -->
          <div class="section-header">
            <span class="section-title">Trending Now</span>
            <span class="section-action" onclick="searchByGenre('trending hindi 2025')">See all</span>
          </div>
          <div id="home-trending-list">
            <div class="skeleton-song"><div class="skeleton skeleton-thumb"></div><div class="skeleton-info"><div class="skeleton skeleton-line w80"></div><div class="skeleton skeleton-line w60" style="margin-top:6px"></div></div></div>
            <div class="skeleton-song"><div class="skeleton skeleton-thumb"></div><div class="skeleton-info"><div class="skeleton skeleton-line w80"></div><div class="skeleton skeleton-line w60" style="margin-top:6px"></div></div></div>
            <div class="skeleton-song"><div class="skeleton skeleton-thumb"></div><div class="skeleton-info"><div class="skeleton skeleton-line w80"></div><div class="skeleton skeleton-line w60" style="margin-top:6px"></div></div></div>
            <div class="skeleton-song"><div class="skeleton skeleton-thumb"></div><div class="skeleton-info"><div class="skeleton skeleton-line w80"></div><div class="skeleton skeleton-line w60" style="margin-top:6px"></div></div></div>
            <div class="skeleton-song"><div class="skeleton skeleton-thumb"></div><div class="skeleton-info"><div class="skeleton skeleton-line w80"></div><div class="skeleton skeleton-line w60" style="margin-top:6px"></div></div></div>
            <div class="skeleton-song"><div class="skeleton skeleton-thumb"></div><div class="skeleton-info"><div class="skeleton skeleton-line w80"></div><div class="skeleton skeleton-line w60" style="margin-top:6px"></div></div></div>
          </div>

          <!-- Recent -->
          <div class="section-header" id="recent-section-header" style="display:none">
            <span class="section-title">Recently Played</span>
            <span class="section-action" onclick="clearRecent()">Clear</span>
          </div>
          <div id="home-recent-list"></div>
        </div>

        <!-- SEARCH VIEW -->
        <div class="view" id="view-search">
          <div class="search-view-input-wrap">
            <svg class="search-view-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input class="search-view-input" id="search-view-input" type="text" placeholder="Artists, songs, albums..." autocomplete="off" oninput="onSearchInput(this.value)" autocorrect="off" autocapitalize="off"/>
            <button class="search-clear-btn" id="search-clear-btn" onclick="clearSearch()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div id="search-browse">
            <div class="section-header"><span class="section-title">Browse</span></div>
            <div class="search-genres">
              <div class="genre-chip" onclick="searchByGenre('bollywood 2025')">Bollywood</div>
              <div class="genre-chip" onclick="searchByGenre('punjabi 2025')">Punjabi</div>
              <div class="genre-chip" onclick="searchByGenre('arijit singh hits')">Arijit Singh</div>
              <div class="genre-chip" onclick="searchByGenre('kumar sanu')">Kumar Sanu</div>
              <div class="genre-chip" onclick="searchByGenre('lofi hindi')">Lofi Hindi</div>
              <div class="genre-chip" onclick="searchByGenre('romantic hindi')">Romantic</div>
              <div class="genre-chip" onclick="searchByGenre('sad hindi songs')">Sad Songs</div>
              <div class="genre-chip" onclick="searchByGenre('english pop 2025')">English Pop</div>
              <div class="genre-chip" onclick="searchByGenre('rap hip hop hindi')">Hip-Hop</div>
              <div class="genre-chip" onclick="searchByGenre('classical indian music')">Classical</div>
            </div>
          </div>

          <div id="search-results-wrap" style="display:none">
            <div class="search-results-count" id="search-results-count"></div>
            <div id="search-results-list"></div>
          </div>
          <div id="search-loader" class="loader-wrap" style="display:none"><div class="spinner"></div></div>
        </div>

        <!-- LIBRARY VIEW -->
        <div class="view" id="view-library">
          <div class="library-tabs">
            <div class="lib-tab active" id="lib-tab-playlists" onclick="switchLibTab('playlists')">Playlists</div>
            <div class="lib-tab" id="lib-tab-liked" onclick="switchLibTab('liked')">Liked Songs</div>
          </div>

          <div id="lib-playlists">
            <button class="create-playlist-btn" onclick="openCreatePlaylist()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create new playlist
            </button>
            <div id="playlists-list"></div>
          </div>

          <div id="lib-liked" style="display:none">
            <div id="liked-songs-list"></div>
          </div>
        </div>

        <!-- PLAYLIST DETAIL VIEW -->
        <div class="view" id="view-playlist-detail">
          <button class="back-btn" onclick="showView('library')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            Library
          </button>
          <div class="playlist-detail-header">
            <div class="playlist-detail-art" id="pd-art">
              <div class="playlist-art-placeholder" style="display:flex;align-items:center;justify-content:center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.3"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              </div>
            </div>
            <div style="flex:1;min-width:0">
              <div class="playlist-detail-name" id="pd-name">Playlist</div>
              <div class="playlist-detail-count" id="pd-count">0 songs</div>
              <div class="playlist-detail-controls">
                <button class="playlist-play-btn" onclick="playPlaylist()">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/></svg>
                  Play all
                </button>
                <button class="icon-btn" onclick="shufflePlaylist()" title="Shuffle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
                </button>
              </div>
            </div>
          </div>
          <div id="pd-songs-list"></div>
        </div>

        <footer class="main-footer">Europify By Europa Crest</footer>
      </div><!-- content-inner -->
    </div><!-- content-area -->

    <!-- Mini Player -->
    <div id="mini-player" onclick="openPlayerScreen()">
      <div class="mini-thumb"><img id="mini-thumb-img" src="" alt=""/></div>
      <div class="mini-info">
        <div class="mini-title" id="mini-title">—</div>
        <div class="mini-artist" id="mini-artist">—</div>
      </div>
      <div class="mini-controls" onclick="event.stopPropagation()">
        <button class="mini-btn" onclick="prevSong()" title="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="19 20 9 12 19 4 19 20" fill="currentColor"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
        </button>
        <button class="mini-play-btn" id="mini-play-btn" onclick="togglePlay()">
          <svg id="mini-play-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/></svg>
        </button>
        <button class="mini-btn" onclick="nextSong()" title="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="5 4 15 12 5 20 5 4" fill="currentColor"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
        </button>
      </div>
      <div class="mini-progress"><div class="mini-progress-fill" id="mini-progress-fill" style="width:0%"></div></div>
    </div>

    <!-- Bottom Nav (Mobile) -->
    <div class="bottom-nav">
      <button class="bottom-nav-btn active" id="bnav-home" onclick="showView('home')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Home</span>
      </button>
      <button class="bottom-nav-btn" id="bnav-search" onclick="showView('search')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span>Search</span>
      </button>
      <button class="bottom-nav-btn" id="bnav-library" onclick="showView('library')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
        <span>Library</span>
      </button>
    </div>

  </div><!-- main -->
</div><!-- shell -->

<!-- Full Player Screen -->
<div id="player-screen">
  <div class="player-screen-header">
    <button class="player-screen-close" onclick="closePlayerScreen()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <span class="player-screen-title" id="ps-context-label">Now Playing</span>
    <button class="player-screen-options" onclick="openAddToPlaylist()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>
    </button>
  </div>

  <div class="player-artwork-wrap">
    <div class="player-artwork" id="ps-artwork">
      <img id="ps-artwork-img" src="" alt=""/>
    </div>
  </div>

  <div class="player-info-wrap">
    <div class="player-info-row">
      <div style="min-width:0;flex:1">
        <div class="player-song-title" id="ps-title">—</div>
        <div class="player-song-artist" id="ps-artist">—</div>
      </div>
      <button class="player-like-btn" id="ps-like-btn" onclick="toggleLikeCurrent()">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
      </button>
    </div>
  </div>

  <div class="player-progress-wrap">
    <div class="progress-bar-container" id="progress-bar" onmousedown="startSeek(event)" ontouchstart="startSeekTouch(event)">
      <div class="progress-bar-fill" id="progress-bar-fill" style="width:0%"></div>
    </div>
    <div class="progress-times">
      <span id="ps-current-time">0:00</span>
      <span id="ps-duration">0:00</span>
    </div>
  </div>

  <div class="player-controls">
    <button class="ctrl-btn" id="shuffle-btn" onclick="toggleShuffle()" title="Shuffle">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
    </button>
    <button class="ctrl-btn" onclick="prevSong()" title="Previous">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="19 20 9 12 19 4 19 20" fill="currentColor"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
    </button>
    <button class="ctrl-btn-main" id="main-play-btn" onclick="togglePlay()">
      <svg id="main-play-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/></svg>
    </button>
    <button class="ctrl-btn" onclick="nextSong()" title="Next">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="5 4 15 12 5 20 5 4" fill="currentColor"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
    </button>
    <button class="ctrl-btn" id="repeat-btn" onclick="cycleRepeat()" title="Repeat">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
    </button>
  </div>

  <div class="player-volume-wrap">
    <svg class="volume-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
    <input class="volume-slider" id="volume-slider" type="range" min="0" max="100" value="100" oninput="setVolume(this.value)"/>
  </div>

  <div class="player-queue-toggle">
    <button class="queue-toggle-btn" id="sleep-btn" onclick="openSleepTimer()">Sleep</button>
    <button class="queue-toggle-btn" id="queue-toggle-btn" onclick="toggleQueue()">Queue</button>
  </div>
  <div class="player-queue" id="player-queue">
    <div class="queue-header">Up next</div>
    <div id="queue-list"></div>
  </div>
</div>

<!-- Create Playlist Modal -->
<div class="modal-backdrop" id="create-playlist-modal">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <div class="modal-title">New Playlist</div>
    <input class="modal-input" id="playlist-name-input" type="text" placeholder="Playlist name..." maxlength="60" autocomplete="off"/>
    <button class="modal-btn primary" onclick="createPlaylist()">Create</button>
    <button class="modal-btn secondary" onclick="closeModal('create-playlist-modal')">Cancel</button>
  </div>
</div>

<!-- Add to Playlist Modal -->
<div class="modal-backdrop" id="add-to-playlist-modal">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <div class="modal-title">Add to Playlist</div>
    <div class="add-to-playlist-list" id="add-to-playlist-list"></div>
    <button class="modal-btn secondary" onclick="closeModal('add-to-playlist-modal')">Cancel</button>
  </div>
</div>

<!-- Toast -->
<div id="toast"></div>

<audio id="audio-player" preload="none"></audio>

<!-- Login Screen — hidden by default, shown only if not logged in -->
<!-- Sleep Timer Modal -->
<div class="modal-backdrop" id="sleep-timer-modal">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <div class="modal-title">Sleep Timer</div>
    <div class="sleep-grid">
      <button class="sleep-opt" onclick="setSleepTimer(5)">5 min</button>
      <button class="sleep-opt" onclick="setSleepTimer(10)">10 min</button>
      <button class="sleep-opt" onclick="setSleepTimer(15)">15 min</button>
      <button class="sleep-opt" onclick="setSleepTimer(30)">30 min</button>
      <button class="sleep-opt" onclick="setSleepTimer(45)">45 min</button>
      <button class="sleep-opt" onclick="setSleepTimer(60)">60 min</button>
      <button class="sleep-opt wide" onclick="setSleepEndOfSong()">End of this song</button>
    </div>
    <div class="sleep-status" id="sleep-status" style="display:none;"></div>
    <button class="modal-btn primary" id="sleep-off-btn" style="display:none;" onclick="clearSleepTimer()">Turn off timer</button>
    <button class="modal-btn secondary" onclick="closeModal('sleep-timer-modal')">Close</button>
  </div>
</div>

<div id="login-screen" style="position:fixed;inset:0;z-index:10000;background:#0a0a0a;display:none;align-items:center;justify-content:center;padding:20px;">
  <div style="width:100%;max-width:380px;background:#111;border-radius:20px;padding:32px 28px;border:1px solid rgba(255,255,255,0.08);">
    <div style="margin-bottom:28px;">
      <span style="font-size:22px;font-weight:700;color:white;">Europify</span>
    </div>
    <!-- Tabs -->
    <div style="display:flex;background:#1a1a1a;border-radius:10px;padding:4px;margin-bottom:24px;">
      <button id="tab-signin" onclick="switchAuthTab('signin')" style="flex:1;padding:8px;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;background:transparent;color:rgba(255,255,255,0.4);transition:all 0.2s;">Sign In</button>
      <button id="tab-signup" onclick="switchAuthTab('signup')" style="flex:1;padding:8px;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;background:white;color:#000;transition:all 0.2s;">Create Account</button>
    </div>
    <!-- Sign In Form -->
    <div id="form-signin" style="display:none;">
      <div style="margin-bottom:14px;">
        <label style="font-size:13px;color:rgba(255,255,255,0.5);display:block;margin-bottom:6px;">Email</label>
        <input id="signin-email" type="email" placeholder="you@example.com" style="width:100%;padding:12px 14px;background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:14px;outline:none;box-sizing:border-box;"/>
      </div>
      <div style="margin-bottom:20px;">
        <label style="font-size:13px;color:rgba(255,255,255,0.5);display:block;margin-bottom:6px;">Password</label>
        <input id="signin-password" type="password" placeholder="Your password" style="width:100%;padding:12px 14px;background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:14px;outline:none;box-sizing:border-box;"/>
      </div>
      <button onclick="doSignIn()" style="width:100%;padding:14px;background:white;color:#000;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;margin-bottom:16px;">Sign In</button>
    </div>
    <!-- Sign Up Form -->
    <div id="form-signup" style="display:block;">
      <div style="margin-bottom:14px;">
        <label style="font-size:13px;color:rgba(255,255,255,0.5);display:block;margin-bottom:6px;">Full Name</label>
        <input id="signup-name" type="text" placeholder="Your name" style="width:100%;padding:12px 14px;background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:14px;outline:none;box-sizing:border-box;"/>
      </div>
      <div style="margin-bottom:14px;">
        <label style="font-size:13px;color:rgba(255,255,255,0.5);display:block;margin-bottom:6px;">Email</label>
        <input id="signup-email" type="email" placeholder="you@example.com" style="width:100%;padding:12px 14px;background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:14px;outline:none;box-sizing:border-box;"/>
      </div>
      <div style="margin-bottom:20px;">
        <label style="font-size:13px;color:rgba(255,255,255,0.5);display:block;margin-bottom:6px;">Password</label>
        <input id="signup-password" type="password" placeholder="Min 6 characters" style="width:100%;padding:12px 14px;background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:14px;outline:none;box-sizing:border-box;"/>
      </div>
      <button onclick="doSignUp()" style="width:100%;padding:14px;background:white;color:#000;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;margin-bottom:16px;">Create Account</button>
    </div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
      <div style="flex:1;height:1px;background:rgba(255,255,255,0.1);"></div>
      <span style="font-size:12px;color:rgba(255,255,255,0.3);">or</span>
      <div style="flex:1;height:1px;background:rgba(255,255,255,0.1);"></div>
    </div>
    <button onclick="doGoogleSignIn()" style="width:100%;padding:13px;background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);border-radius:12px;font-size:14px;font-weight:500;cursor:pointer;color:white;display:flex;align-items:center;justify-content:center;gap:10px;box-sizing:border-box;">
      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
      Continue with Google
    </button>
    <div id="auth-error" style="margin-top:14px;font-size:12px;color:#ff5555;text-align:center;display:none;"></div>
  </div>
</div>

<script>
// ERROR OVERLAY
var _errCount = 0;
window.onerror = function(msg, src, line, col, err) {
  _errCount++;
  if (_errCount > 3) return;
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;top:' + ((_errCount-1)*70) + 'px;left:0;right:0;background:#ff4444;color:#fff;padding:10px;font-size:11px;z-index:99999;word-break:break-all;font-family:monospace';
  d.textContent = '#' + _errCount + ' JS ERROR L' + line + ': ' + msg;
  document.body.appendChild(d);
};
window.addEventListener('unhandledrejection', function(e) {
  _errCount++;
  if (_errCount > 3) return;
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;top:' + ((_errCount-1)*70) + 'px;left:0;right:0;background:#ff8800;color:#fff;padding:10px;font-size:11px;z-index:99999;word-break:break-all;font-family:monospace';
  d.textContent = '#' + _errCount + ' PROMISE: ' + (e.reason ? e.reason.toString() : 'unknown');
  document.body.appendChild(d);
});
</script>

<script>
// ═══════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════
const API_BASE = 'https://europify.ayushonlyyy.workers.dev/api';
const SEARCH_LIMIT = 20;

// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
let queue = [];
let queueIndex = -1;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0=off, 1=all, 2=one
let seekDragging = false;
let currentView = 'home';
let likedSongs = [];
let playlists = [];
let recentlyPlayed = [];
let addToPlaylistSong = null;
let currentPlaylistId = null;

// ─── Safe localStorage reads ───────────────────
try { likedSongs = JSON.parse(localStorage.getItem('ep_liked') || '[]'); } catch(e) { likedSongs = []; }
try { playlists = JSON.parse(localStorage.getItem('ep_playlists') || '[]'); } catch(e) { playlists = []; }
try { recentlyPlayed = JSON.parse(localStorage.getItem('ep_recent') || '[]'); } catch(e) { recentlyPlayed = []; }

// ─── Song context store (replaces passing JSON in onclick attrs) ───
// Key: context string → songs array
const songCtx = {};

const audio = document.getElementById('audio-player');

// ═══════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════
function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escAttr(str) {
  if (!str) return '';
  return String(str).replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2400);
}
function fmtTime(s) {
  s = Math.floor(s || 0);
  return Math.floor(s/60) + ':' + String(s%60).padStart(2,'0');
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
// Hide loader — CSS animation handles it automatically at 1.8s
// JS is just a backup
function hideLoader() {
  const ls = document.getElementById('loading-screen');
  if (!ls) return;
  ls.classList.add('hide');
}
setTimeout(hideLoader, 2000);

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(hideLoader, 2500);

  // Greeting
  const h = new Date().getHours();
  const greet = h < 12 ? 'GOOD MORNING' : h < 17 ? 'GOOD AFTERNOON' : 'GOOD EVENING';
  const el = document.getElementById('home-greeting');
  if (el) el.textContent = greet;

  // Theme
  try {
    if (localStorage.getItem('ep_theme') === 'light') document.body.classList.add('light');
  } catch(e) {}

  // Load trending
  fetchAndRenderSongs('trending hindi 2025', 'home-trending-list', 8);

  // Recent / playlists / liked
  renderRecent();
  renderPlaylists();
  renderLiked();

  // Header search enter key
  const hsi = document.getElementById('header-search-input');
  if (hsi) hsi.addEventListener('keydown', e => { if (e.key === 'Enter') doHeaderSearch(); });

  // Network
  window.addEventListener('offline', () => {
    const b = document.getElementById('offline-banner');
    if (b) b.classList.add('show');
    showToast("You're offline");
  });
  window.addEventListener('online', () => {
    const b = document.getElementById('offline-banner');
    if (b) b.classList.remove('show');
    showToast('Back online');
  });

  // Media session
  setupMediaSession();

  // Audio events
  audio.addEventListener('timeupdate', onTimeUpdate);
  audio.addEventListener('ended', onEnded);
  audio.addEventListener('canplay', () => { if (isPlaying) audio.play().catch(() => {}); });
  audio.addEventListener('error', () => { showToast('Failed to load song'); nextSong(); });

  // Close modal on backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(bd => {
    bd.addEventListener('click', e => { if (e.target === bd) bd.classList.remove('open'); });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    if (e.code === 'ArrowRight') nextSong();
    if (e.code === 'ArrowLeft') prevSong();
  });
});

// ═══════════════════════════════════════════════
// API
// ═══════════════════════════════════════════════
async function searchSongs(query, limit = SEARCH_LIMIT) {
  const url = API_BASE + '/search/songs?query=' + encodeURIComponent(query) + '&limit=' + limit;
  const res = await fetch(url);
  if (!res.ok) throw new Error('API error ' + res.status);
  const data = await res.json();
  // Handle both response formats:
  // { success: true, data: { results: [...] } }  — saavn.dev v1
  // { success: true, data: [...] }               — saavn.dev v2
  if (!data.success) throw new Error('Search failed');
  const results = data.data?.results || data.data || [];
  return Array.isArray(results) ? results : [];
}

function getImageUrl(song) {
  const imgs = song.image;
  if (!imgs || !imgs.length) return '';
  const high = imgs.find(i => i.quality === '500x500') || imgs[imgs.length - 1];
  return high?.url || '';
}

function getDownloadUrl(song) {
  const urls = song.downloadUrl;
  if (!urls || !urls.length) return '';
  const hq = urls.find(u => u.quality === '320kbps') || urls[urls.length - 1];
  return hq?.url || '';
}

function getDuration(song) {
  const d = parseInt(song.duration || 0);
  if (!d) return '—';
  return Math.floor(d/60) + ':' + String(d%60).padStart(2,'0');
}

function getArtistNames(song) {
  const artists = song.artists?.primary || [];
  if (!artists.length) return song.primaryArtists || '—';
  return artists.map(a => a.name).join(', ');
}

// ═══════════════════════════════════════════════
// VIEWS
// ═══════════════════════════════════════════════
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + name);
  if (el) { el.classList.add('active'); currentView = name; }

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const nav = document.getElementById('nav-' + name);
  if (nav) nav.classList.add('active');

  document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
  const bnav = document.getElementById('bnav-' + name);
  if (bnav) bnav.classList.add('active');

  if (name === 'library') { renderPlaylists(); renderLiked(); }
  if (name === 'search') { setTimeout(() => { const si = document.getElementById('search-view-input'); if (si) si.focus(); }, 100); }
}

// ═══════════════════════════════════════════════
// RENDER SONG ITEM
// — Uses data-* attributes, no inline onclick —
// ═══════════════════════════════════════════════
function renderSongItem(song, index, songsArr, context) {
  songCtx[context] = songsArr;

  const img = getImageUrl(song);
  const artist = getArtistNames(song);
  const dur = getDuration(song);
  const isLiked = likedSongs.some(l => l.id === song.id);
  const likedFill = isLiked ? 'currentColor' : 'none';
  const likedClass = isLiked ? ' liked' : '';

  const div = document.createElement('div');
  div.className = 'song-item';
  div.id = 'sitem-' + song.id;
  div.dataset.songId = song.id;
  div.dataset.index = index;
  div.dataset.context = context;

  const thumbImg = document.createElement('img');
  thumbImg.src = img;
  thumbImg.alt = '';
  thumbImg.loading = 'lazy';
  thumbImg.onerror = function() { this.style.display = 'none'; };

  const thumb = document.createElement('div');
  thumb.className = 'song-item-thumb';
  thumb.appendChild(thumbImg);

  div.innerHTML =
    '<span class="song-num">' + (index + 1) + '</span>' +
    '<div class="song-playing-bars"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>' +
    '<div class="song-item-info">' +
      '<div class="song-item-title">' + escHtml(song.name) + '</div>' +
      '<div class="song-item-artist">' + escHtml(artist) + '</div>' +
    '</div>' +
    '<span class="song-item-duration">' + dur + '</span>' +
    '<div class="song-item-actions">' +
      '<button class="song-action-btn' + likedClass + '" data-action="like" data-song-id="' + escAttr(song.id) + '" data-context="' + escAttr(context) + '" title="Like">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="' + likedFill + '" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>' +
      '</button>' +
      '<button class="song-action-btn" data-action="addplaylist" data-song-id="' + escAttr(song.id) + '" data-context="' + escAttr(context) + '" title="Add to playlist">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
      '</button>' +
    '</div>';

  // Insert thumb after first child (song-num span)
  div.insertBefore(thumb, div.children[2]);

  div.addEventListener('click', function(e) {
    const btn = e.target.closest('[data-action]');
    if (btn) {
      e.stopPropagation();
      const action = btn.dataset.action;
      const sid = btn.dataset.songId;
      const ctx = btn.dataset.context;
      if (action === 'like') toggleLikeByCtx(sid, ctx);
      if (action === 'addplaylist') addToPlaylistByCtx(sid, ctx);
      return;
    }
    playFromCtx(song.id, index, context);
  });

  return div;
}

// ─── Context-safe play ─────────────────────────
function playFromCtx(songId, index, context) {
  const songs = songCtx[context];
  if (!songs || !songs[index]) { showToast('Could not play song'); return; }
  queue = songs;
  queueIndex = index;
  loadAndPlay(songs[index]);
  updateQueueUI();
}

// ─── Context-safe like ─────────────────────────
function toggleLikeByCtx(songId, context) {
  const songs = songCtx[context] || [];
  const song = songs.find(s => s.id === songId) || likedSongs.find(s => s.id === songId);
  if (song) toggleLike(song);
}

// ─── Context-safe add to playlist ─────────────
function addToPlaylistByCtx(songId, context) {
  const songs = songCtx[context] || [];
  const song = songs.find(s => s.id === songId) || likedSongs.find(s => s.id === songId);
  if (song) { addToPlaylistSong = song; openAddToPlaylist(); }
}

// ═══════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════
async function fetchAndRenderSongs(query, containerId, limit) {
  limit = limit || 10;
  const container = document.getElementById(containerId);
  if (!container) return;
  // Show skeletons
  let skels = '';
  for (let i = 0; i < Math.min(limit, 5); i++) {
    skels += '<div class="skeleton-song"><div class="skeleton skeleton-thumb"></div><div class="skeleton-info"><div class="skeleton skeleton-line w80"></div><div class="skeleton skeleton-line w60" style="margin-top:6px"></div></div></div>';
  }
  container.innerHTML = skels;
  try {
    const songs = await searchSongs(query, limit);
    if (!songs.length) {
      container.innerHTML = '<div class="empty-state"><div class="empty-title">No songs found</div></div>';
      return;
    }
    container.innerHTML = '';
    songs.forEach((s, i) => container.appendChild(renderSongItem(s, i, songs, containerId)));
  } catch(e) {
    container.innerHTML = '<div class="empty-state"><div class="empty-title">Failed to load</div><div class="empty-desc">Check your connection</div></div>';
  }
}

function setMood(el, query) {
  document.querySelectorAll('.mood-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  fetchAndRenderSongs(query, 'home-trending-list', 10);
}

// ═══════════════════════════════════════════════
// PLAYBACK
// ═══════════════════════════════════════════════
function loadAndPlay(song) {
  if (!song) return;
  const url = getDownloadUrl(song);
  if (!url) { showToast('No stream available'); return; }

  audio.src = url;
  audio.load();
  isPlaying = true;
  audio.play().then(() => {
    updatePlayUI();
    updatePlayerInfo(song);
    updateMiniPlayer(song);
    addToRecent(song);
    highlightPlayingSong();
    updateMediaSession(song);
  }).catch(() => {
    isPlaying = false;
    updatePlayUI();
    showToast('Playback error — try again');
  });
}

function togglePlay() {
  if (!queue.length) return;
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play().catch(() => {});
    isPlaying = true;
  }
  updatePlayUI();
  highlightPlayingSong();
}

function nextSong() {
  if (!queue.length) return;
  if (repeatMode === 2) { audio.currentTime = 0; audio.play(); return; }
  let next;
  if (isShuffle) {
    next = Math.floor(Math.random() * queue.length);
  } else {
    next = queueIndex + 1;
    if (next >= queue.length) {
      if (repeatMode === 1) next = 0;
      else { audio.pause(); isPlaying = false; updatePlayUI(); return; }
    }
  }
  queueIndex = next;
  loadAndPlay(queue[queueIndex]);
}

function prevSong() {
  if (!queue.length) return;
  if (audio.currentTime > 3) { audio.currentTime = 0; return; }
  let prev = queueIndex - 1;
  if (prev < 0) prev = repeatMode === 1 ? queue.length - 1 : 0;
  queueIndex = prev;
  loadAndPlay(queue[queueIndex]);
}

function onEnded() {
  if (sleepEndOfSong) { resetSleepState(); audio.pause(); isPlaying = false; updatePlayUI(); updateSleepUI(); showToast('Sleep timer: music stopped'); return; }
  nextSong();
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  document.getElementById('shuffle-btn').classList.toggle('active', isShuffle);
  showToast(isShuffle ? 'Shuffle on' : 'Shuffle off');
}

function cycleRepeat() {
  repeatMode = (repeatMode + 1) % 3;
  const btn = document.getElementById('repeat-btn');
  btn.classList.toggle('active', repeatMode > 0);
  const labels = ['Repeat off', 'Repeat all', 'Repeat one'];
  showToast(labels[repeatMode]);
}

function setVolume(v) { audio.volume = v / 100; }

// ═══════════════════════════════════════════════
// PROGRESS / SEEK
// ═══════════════════════════════════════════════
function onTimeUpdate() {
  if (seekDragging) return;
  const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  const pbf = document.getElementById('progress-bar-fill');
  const mpf = document.getElementById('mini-progress-fill');
  const ct = document.getElementById('ps-current-time');
  const dt = document.getElementById('ps-duration');
  if (pbf) pbf.style.width = pct + '%';
  if (mpf) mpf.style.width = pct + '%';
  if (ct) ct.textContent = fmtTime(audio.currentTime);
  if (dt) dt.textContent = fmtTime(audio.duration || 0);
}

function startSeek(e) {
  seekDragging = true;
  doSeek(e);
  const mm = ev => doSeek(ev);
  const mu = () => { seekDragging = false; document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); };
  document.addEventListener('mousemove', mm);
  document.addEventListener('mouseup', mu);
}

function startSeekTouch(e) {
  seekDragging = true;
  doSeekTouch(e.touches[0]);
  const tm = ev => { if (ev.touches[0]) doSeekTouch(ev.touches[0]); };
  const te = () => { seekDragging = false; document.removeEventListener('touchmove', tm); document.removeEventListener('touchend', te); };
  document.addEventListener('touchmove', tm, { passive: true });
  document.addEventListener('touchend', te);
}

function doSeek(e) {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  const rect = bar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const pbf = document.getElementById('progress-bar-fill');
  if (pbf) pbf.style.width = (pct * 100) + '%';
  if (audio.duration) audio.currentTime = pct * audio.duration;
}

function doSeekTouch(touch) {
  const bar = document.getElementById('progress-bar');
  if (!bar || !touch) return;
  const rect = bar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
  const pbf = document.getElementById('progress-bar-fill');
  if (pbf) pbf.style.width = (pct * 100) + '%';
  if (audio.duration) audio.currentTime = pct * audio.duration;
}

// ═══════════════════════════════════════════════
// UI UPDATES
// ═══════════════════════════════════════════════
function updatePlayUI() {
  const playIcon = '<polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>';
  const pauseIcon = '<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>';
  const icon = isPlaying ? pauseIcon : playIcon;

  const mainIcon = document.getElementById('main-play-icon');
  if (mainIcon) mainIcon.innerHTML = icon;

  const miniIcon = document.getElementById('mini-play-icon');
  if (miniIcon) miniIcon.innerHTML = icon;

  const artwork = document.getElementById('ps-artwork');
  if (artwork) artwork.classList.toggle('playing', isPlaying);
}

function updatePlayerInfo(song) {
  const img = getImageUrl(song);
  const artist = getArtistNames(song);
  const title = document.getElementById('ps-title');
  const art = document.getElementById('ps-artist');
  const artImg = document.getElementById('ps-artwork-img');
  if (title) title.textContent = song.name || '—';
  if (art) art.textContent = artist;
  if (artImg) artImg.src = img;
  updateLikeBtn(likedSongs.some(l => l.id === song.id));
}

function updateMiniPlayer(song) {
  const img = getImageUrl(song);
  const artist = getArtistNames(song);
  const ti = document.getElementById('mini-thumb-img');
  const mt = document.getElementById('mini-title');
  const ma = document.getElementById('mini-artist');
  const mp = document.getElementById('mini-player');
  if (ti) ti.src = img;
  if (mt) mt.textContent = song.name || '—';
  if (ma) ma.textContent = artist;
  if (mp) mp.classList.add('show');
}

function updateLikeBtn(liked) {
  const btn = document.getElementById('ps-like-btn');
  if (!btn) return;
  btn.classList.toggle('liked', liked);
  const svg = btn.querySelector('svg');
  if (svg) svg.setAttribute('fill', liked ? 'currentColor' : 'none');
}

function highlightPlayingSong() {
  document.querySelectorAll('.song-item').forEach(el => el.classList.remove('playing', 'paused'));
  if (queueIndex < 0 || !queue[queueIndex]) return;
  const el = document.getElementById('sitem-' + queue[queueIndex].id);
  if (el) el.classList.add(isPlaying ? 'playing' : 'paused');
}

// ═══════════════════════════════════════════════
// PLAYER SCREEN
// ═══════════════════════════════════════════════
function openPlayerScreen() {
  if (!queue.length) return;
  document.getElementById('player-screen').classList.add('open');
  updateQueueUI();
}
function closePlayerScreen() {
  document.getElementById('player-screen').classList.remove('open');
}
function toggleQueue() {
  const q = document.getElementById('player-queue');
  const btn = document.getElementById('queue-toggle-btn');
  const show = !q.classList.contains('show');
  q.classList.toggle('show', show);
  btn.classList.toggle('active', show);
}
function updateQueueUI() {
  const list = document.getElementById('queue-list');
  if (!list) return;
  const upcoming = queue.slice(queueIndex + 1, queueIndex + 11);
  list.innerHTML = '';
  if (!upcoming.length) {
    list.innerHTML = '<div style="padding:12px 0;font-size:13px;color:var(--text3)">Nothing up next</div>';
    return;
  }
  upcoming.forEach((s, i) => {
    const img = getImageUrl(s);
    const artist = getArtistNames(s);
    const qi = queueIndex + 1 + i;

    const div = document.createElement('div');
    div.className = 'song-item';
    div.addEventListener('click', function() { jumpQueue(qi); });

    const thumbImg = document.createElement('img');
    thumbImg.src = img;
    thumbImg.alt = '';
    thumbImg.loading = 'lazy';
    thumbImg.onerror = function() { this.style.display = 'none'; };
    const thumb = document.createElement('div');
    thumb.className = 'song-item-thumb';
    thumb.appendChild(thumbImg);

    div.innerHTML =
      '<span class="song-num">' + (i + 1) + '</span>' +
      '<div class="song-playing-bars"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>' +
      '<div class="song-item-info">' +
        '<div class="song-item-title">' + escHtml(s.name) + '</div>' +
        '<div class="song-item-artist">' + escHtml(artist) + '</div>' +
      '</div>';
    div.insertBefore(thumb, div.children[2]);
    list.appendChild(div);
  });
}
function jumpQueue(idx) {
  queueIndex = idx;
  loadAndPlay(queue[queueIndex]);
  updateQueueUI();
}

// ═══════════════════════════════════════════════
// SEARCH
// ═══════════════════════════════════════════════
let searchTimeout = null;

function onSearchInput(val) {
  const clearBtn = document.getElementById('search-clear-btn');
  if (clearBtn) clearBtn.classList.toggle('show', val.length > 0);
  clearTimeout(searchTimeout);
  if (!val.trim()) {
    document.getElementById('search-browse').style.display = '';
    document.getElementById('search-results-wrap').style.display = 'none';
    document.getElementById('search-loader').style.display = 'none';
    return;
  }
  document.getElementById('search-browse').style.display = 'none';
  document.getElementById('search-loader').style.display = 'flex';
  document.getElementById('search-results-wrap').style.display = 'none';
  searchTimeout = setTimeout(() => doSearch(val.trim()), 400);
}

async function doSearch(query) {
  try {
    const songs = await searchSongs(query);
    document.getElementById('search-loader').style.display = 'none';
    document.getElementById('search-results-wrap').style.display = '';
    document.getElementById('search-results-count').textContent = songs.length + ' results for "' + query + '"';
    if (!songs.length) {
      document.getElementById('search-results-list').innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-title">No results</div><div class="empty-desc">Try a different search</div></div>';
      return;
    }
    const sl = document.getElementById('search-results-list');
    sl.innerHTML = '';
    songs.forEach((s, i) => sl.appendChild(renderSongItem(s, i, songs, 'search')));
  } catch(e) {
    document.getElementById('search-loader').style.display = 'none';
    document.getElementById('search-results-wrap').style.display = '';
    document.getElementById('search-results-list').innerHTML = '<div class="empty-state"><div class="empty-title">Search failed</div><div class="empty-desc">Check connection</div></div>';
  }
}

function clearSearch() {
  const si = document.getElementById('search-view-input');
  const cb = document.getElementById('search-clear-btn');
  if (si) si.value = '';
  if (cb) cb.classList.remove('show');
  document.getElementById('search-browse').style.display = '';
  document.getElementById('search-results-wrap').style.display = 'none';
  document.getElementById('search-loader').style.display = 'none';
}

function searchByGenre(query) {
  showView('search');
  const si = document.getElementById('search-view-input');
  const cb = document.getElementById('search-clear-btn');
  if (si) si.value = query;
  if (cb) cb.classList.add('show');
  document.getElementById('search-browse').style.display = 'none';
  document.getElementById('search-loader').style.display = 'flex';
  document.getElementById('search-results-wrap').style.display = 'none';
  clearTimeout(searchTimeout);
  doSearch(query);
}

function toggleHeaderSearch() {
  const box = document.getElementById('header-search-box');
  const input = document.getElementById('header-search-input');
  const open = !box.classList.contains('open');
  box.classList.toggle('open', open);
  if (open) { setTimeout(() => { if (input) input.focus(); }, 100); }
  else { if (input) input.value = ''; }
}

function doHeaderSearch() {
  const input = document.getElementById('header-search-input');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;
  document.getElementById('header-search-box').classList.remove('open');
  searchByGenre(val);
}

// ═══════════════════════════════════════════════
// LIKED SONGS
// ═══════════════════════════════════════════════
function toggleLike(song) {
  if (!song || !song.id) return;
  const idx = likedSongs.findIndex(l => l.id === song.id);
  if (idx === -1) {
    likedSongs.unshift(song);
    showToast('Added to Liked Songs');
  } else {
    likedSongs.splice(idx, 1);
    showToast('Removed from Liked Songs');
  }
  saveLiked();
  // Keep liked context up to date
  songCtx['liked'] = likedSongs;
  // Update all visible like buttons for this song
  document.querySelectorAll('#sitem-' + song.id + ' .song-action-btn').forEach(btn => {
    const isLiked = likedSongs.some(l => l.id === song.id);
    btn.classList.toggle('liked', isLiked);
    const svg = btn.querySelector('svg');
    if (svg && svg.querySelector('path')) svg.setAttribute('fill', isLiked ? 'currentColor' : 'none');
  });
  if (queue[queueIndex]?.id === song.id) updateLikeBtn(likedSongs.some(l => l.id === song.id));
  if (currentView === 'library') renderLiked();
}

function toggleLikeCurrent() {
  if (!queue[queueIndex]) return;
  toggleLike(queue[queueIndex]);
}

function saveLiked() {
  try { localStorage.setItem('ep_liked', JSON.stringify(likedSongs)); } catch(e) {}
}

function renderLiked() {
  const list = document.getElementById('liked-songs-list');
  if (!list) return;
  songCtx['liked'] = likedSongs;
  if (!likedSongs.length) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">♡</div><div class="empty-title">No liked songs yet</div><div class="empty-desc">Like songs to save them here</div></div>';
    return;
  }
  list.innerHTML = '';
  likedSongs.forEach((s, i) => list.appendChild(renderSongItem(s, i, likedSongs, 'liked')));
}

// ═══════════════════════════════════════════════
// PLAYLISTS
// ═══════════════════════════════════════════════
function openCreatePlaylist() {
  const inp = document.getElementById('playlist-name-input');
  if (inp) inp.value = '';
  openModal('create-playlist-modal');
  setTimeout(() => { const inp = document.getElementById('playlist-name-input'); if (inp) inp.focus(); }, 100);
}

function createPlaylist() {
  const inp = document.getElementById('playlist-name-input');
  const name = inp ? inp.value.trim() : '';
  if (!name) { showToast('Enter a playlist name'); return; }
  const pl = { id: Date.now().toString(), name, songs: [], createdAt: Date.now() };
  playlists.unshift(pl);
  savePlaylists();
  renderPlaylists();
  closeModal('create-playlist-modal');
  showToast('"' + name + '" created');
}

function savePlaylists() {
  try { localStorage.setItem('ep_playlists', JSON.stringify(playlists)); } catch(e) {}
}

function renderPlaylists() {
  const list = document.getElementById('playlists-list');
  if (!list) return;
  list.innerHTML = '';
  if (!playlists.length) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">🎵</div><div class="empty-title">No playlists yet</div><div class="empty-desc">Create one above</div></div>';
    return;
  }
  playlists.forEach(pl => {
    const card = document.createElement('div');
    card.className = 'playlist-card';
    card.addEventListener('click', function() { openPlaylistDetail(pl.id); });

    const imgs = pl.songs.slice(0, 4).map(s => getImageUrl(s)).filter(Boolean);
    const artDiv = document.createElement('div');
    artDiv.className = 'playlist-art';
    if (imgs.length) {
      imgs.forEach(u => {
        const img = document.createElement('img');
        img.src = u; img.alt = ''; img.loading = 'lazy';
        img.onerror = function() { this.style.display = 'none'; };
        artDiv.appendChild(img);
      });
    } else {
      artDiv.innerHTML = '<div class="playlist-art-placeholder"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.3"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>';
    }

    const delBtn = document.createElement('button');
    delBtn.className = 'song-action-btn';
    delBtn.title = 'Delete';
    delBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>';
    delBtn.addEventListener('click', function(e) { e.stopPropagation(); deletePlaylist(pl.id); });

    card.appendChild(artDiv);
    card.innerHTML += '<div class="playlist-info"><div class="playlist-name">' + escHtml(pl.name) + '</div><div class="playlist-count">' + pl.songs.length + ' song' + (pl.songs.length !== 1 ? 's' : '') + '</div></div><div class="playlist-actions"></div>';
    card.querySelector('.playlist-actions').appendChild(delBtn);
    list.appendChild(card);
  });
}

function openPlaylistDetail(id) {
  const pl = playlists.find(p => p.id === id);
  if (!pl) return;
  currentPlaylistId = id;
  const pdName = document.getElementById('pd-name');
  const pdCount = document.getElementById('pd-count');
  if (pdName) pdName.textContent = pl.name;
  if (pdCount) pdCount.textContent = pl.songs.length + ' song' + (pl.songs.length !== 1 ? 's' : '');

  const art = document.getElementById('pd-art');
  const imgs = pl.songs.slice(0, 4).map(s => getImageUrl(s)).filter(Boolean);
  if (art) {
    art.innerHTML = '';
    if (imgs.length) {
      art.className = 'playlist-detail-art';
      imgs.forEach(u => {
        const img = document.createElement('img');
        img.src = u; img.alt = ''; img.loading = 'lazy';
        img.onerror = function() { this.style.display = 'none'; };
        art.appendChild(img);
      });
    } else {
      art.className = 'playlist-detail-art empty';
      art.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.3"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
    }
  }

  const ctxKey = 'playlist-' + id;
  songCtx[ctxKey] = pl.songs;
  const songsList = document.getElementById('pd-songs-list');
  if (songsList) {
    if (!pl.songs.length) {
      songsList.innerHTML = '<div class="empty-state"><div class="empty-icon">🎵</div><div class="empty-title">No songs</div><div class="empty-desc">Search and add songs to this playlist</div></div>';
    } else {
      songsList.innerHTML = '';
      pl.songs.forEach((s, i) => songsList.appendChild(renderSongItem(s, i, pl.songs, ctxKey)));
    }
  }
  showView('playlist-detail');
}

function playPlaylist() {
  const pl = playlists.find(p => p.id === currentPlaylistId);
  if (!pl || !pl.songs.length) { showToast('Playlist is empty'); return; }
  queue = [...pl.songs];
  queueIndex = 0;
  loadAndPlay(queue[0]);
  updateQueueUI();
}

function shufflePlaylist() {
  const pl = playlists.find(p => p.id === currentPlaylistId);
  if (!pl || !pl.songs.length) { showToast('Playlist is empty'); return; }
  queue = [...pl.songs].sort(() => Math.random() - 0.5);
  queueIndex = 0;
  loadAndPlay(queue[0]);
  updateQueueUI();
  showToast('Shuffled');
}

function deletePlaylist(id) {
  if (!confirm('Delete this playlist?')) return;
  playlists = playlists.filter(p => p.id !== id);
  savePlaylists();
  renderPlaylists();
  showToast('Playlist deleted');
}

function openAddToPlaylist() {
  if (!addToPlaylistSong && queue[queueIndex]) addToPlaylistSong = queue[queueIndex];
  const list = document.getElementById('add-to-playlist-list');
  if (!list) return;
  list.innerHTML = '';
  if (!playlists.length) {
    list.innerHTML = '<div style="padding:12px;font-size:13px;color:var(--text3)">No playlists yet. Create one first.</div>';
  } else {
    playlists.forEach(pl => {
      const item = document.createElement('div');
      item.className = 'add-playlist-item';
      item.addEventListener('click', function() { addSongToPlaylist(pl.id); });

      const artDiv = document.createElement('div');
      artDiv.className = 'add-playlist-item-art';
      const firstImg = pl.songs.slice(0, 1).map(s => getImageUrl(s)).filter(Boolean)[0];
      if (firstImg) {
        const img = document.createElement('img');
        img.src = firstImg; img.alt = '';
        img.onerror = function() { this.style.display = 'none'; };
        artDiv.appendChild(img);
      } else {
        artDiv.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
      }

      item.appendChild(artDiv);
      item.innerHTML += '<div><div class="add-playlist-item-name">' + escHtml(pl.name) + '</div><div class="add-playlist-item-count">' + pl.songs.length + ' songs</div></div>';
      list.appendChild(item);
    });
  }
  openModal('add-to-playlist-modal');
}

function addSongToPlaylist(plId) {
  if (!addToPlaylistSong) return;
  const pl = playlists.find(p => p.id === plId);
  if (!pl) return;
  if (pl.songs.some(s => s.id === addToPlaylistSong.id)) {
    showToast('Already in playlist');
    closeModal('add-to-playlist-modal');
    return;
  }
  pl.songs.push(addToPlaylistSong);
  savePlaylists();
  closeModal('add-to-playlist-modal');
  showToast('Added to ' + pl.name);
  addToPlaylistSong = null;
  if (currentView === 'library') renderPlaylists();
}

function switchLibTab(tab) {
  document.querySelectorAll('.lib-tab').forEach(t => t.classList.remove('active'));
  const tabEl = document.getElementById('lib-tab-' + tab);
  if (tabEl) tabEl.classList.add('active');
  const pls = document.getElementById('lib-playlists');
  const lkd = document.getElementById('lib-liked');
  if (pls) pls.style.display = tab === 'playlists' ? '' : 'none';
  if (lkd) lkd.style.display = tab === 'liked' ? '' : 'none';
  if (tab === 'liked') renderLiked();
}

// ═══════════════════════════════════════════════
// RECENTLY PLAYED
// ═══════════════════════════════════════════════
function addToRecent(song) {
  recentlyPlayed = recentlyPlayed.filter(s => s.id !== song.id);
  recentlyPlayed.unshift(song);
  if (recentlyPlayed.length > 20) recentlyPlayed = recentlyPlayed.slice(0, 20);
  try { localStorage.setItem('ep_recent', JSON.stringify(recentlyPlayed)); } catch(e) {}
  renderRecent();
}

function renderRecent() {
  const header = document.getElementById('recent-section-header');
  const list = document.getElementById('home-recent-list');
  if (!header || !list) return;
  if (!recentlyPlayed.length) { header.style.display = 'none'; list.innerHTML = ''; return; }
  header.style.display = '';
  songCtx['recent'] = recentlyPlayed;
  list.innerHTML = '';
  recentlyPlayed.slice(0, 6).forEach((s, i) => list.appendChild(renderSongItem(s, i, recentlyPlayed, 'recent')));
}

function clearRecent() {
  recentlyPlayed = [];
  try { localStorage.removeItem('ep_recent'); } catch(e) {}
  renderRecent();
  showToast('Cleared');
}

// ═══════════════════════════════════════════════
// SIDEBAR / THEME / MODALS
// ═══════════════════════════════════════════════
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-backdrop').classList.add('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-backdrop').classList.remove('show');
}
function toggleTheme() {
  document.body.classList.toggle('light');
  try { localStorage.setItem('ep_theme', document.body.classList.contains('light') ? 'light' : 'dark'); } catch(e) {}
}
// ═══════════════════════════════════════════════
// SLEEP TIMER
let sleepTimeout = null, sleepTick = null, sleepEndAt = 0, sleepEndOfSong = false;
function sleepActive() { return !!sleepTimeout || sleepEndOfSong; }
function sleepFmt(ms) { const t = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0'); }
function resetSleepState() {
  if (sleepTimeout) clearTimeout(sleepTimeout);
  if (sleepTick) clearInterval(sleepTick);
  sleepTimeout = null; sleepTick = null; sleepEndAt = 0; sleepEndOfSong = false;
}
function openSleepTimer() { updateSleepUI(); openModal('sleep-timer-modal'); }
function setSleepTimer(min) {
  resetSleepState();
  sleepEndAt = Date.now() + min * 60000;
  sleepTimeout = setTimeout(sleepFire, min * 60000);
  sleepTick = setInterval(updateSleepUI, 1000);
  updateSleepUI(); closeModal('sleep-timer-modal');
  showToast('Sleep timer set: ' + min + ' min');
}
function setSleepEndOfSong() {
  resetSleepState();
  sleepEndOfSong = true;
  updateSleepUI(); closeModal('sleep-timer-modal');
  showToast('Music will stop after this song');
}
function clearSleepTimer() {
  resetSleepState(); updateSleepUI(); closeModal('sleep-timer-modal');
  showToast('Sleep timer off');
}
function sleepFire() {
  resetSleepState();
  audio.pause(); isPlaying = false; updatePlayUI(); updateSleepUI();
  showToast('Sleep timer: music stopped');
}
function updateSleepUI() {
  const btn = document.getElementById('sleep-btn');
  const st = document.getElementById('sleep-status');
  const off = document.getElementById('sleep-off-btn');
  let label = 'Sleep', status = '';
  if (sleepTimeout) { const left = sleepFmt(sleepEndAt - Date.now()); label = 'Sleep \u00b7 ' + left; status = 'Music stops in ' + left; }
  else if (sleepEndOfSong) { label = 'Sleep \u00b7 end of song'; status = 'Music stops after this song'; }
  if (btn) { btn.textContent = label; btn.classList.toggle('active', sleepActive()); }
  if (st) { st.textContent = status; st.style.display = status ? 'block' : 'none'; }
  if (off) off.style.display = sleepActive() ? 'block' : 'none';
}
// Backup checks: background tabs can delay setTimeout, but audio keeps firing timeupdate
audio.addEventListener('timeupdate', () => { if (sleepTimeout && Date.now() >= sleepEndAt) sleepFire(); });
document.addEventListener('visibilitychange', () => { if (sleepTimeout && Date.now() >= sleepEndAt) sleepFire(); });


function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

// ═══════════════════════════════════════════════
// MEDIA SESSION API
// ═══════════════════════════════════════════════
function setupMediaSession() {
  if (!('mediaSession' in navigator)) return;
  navigator.mediaSession.setActionHandler('play', () => { audio.play(); isPlaying = true; updatePlayUI(); });
  navigator.mediaSession.setActionHandler('pause', () => { audio.pause(); isPlaying = false; updatePlayUI(); });
  navigator.mediaSession.setActionHandler('nexttrack', () => nextSong());
  navigator.mediaSession.setActionHandler('previoustrack', () => prevSong());
  navigator.mediaSession.setActionHandler('seekto', details => { if (audio.duration) audio.currentTime = details.seekTime; });
}

function updateMediaSession(song) {
  if (!('mediaSession' in navigator)) return;
  const img = getImageUrl(song);
  navigator.mediaSession.metadata = new MediaMetadata({
    title: song.name || 'Unknown',
    artist: getArtistNames(song),
    album: song.album?.name || '',
    artwork: img ? [{ src: img, sizes: '500x500', type: 'image/jpeg' }] : []
  });
}
</script>

<script type="module">
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile, signOut } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyDiKeV3dQihnVX3BvG9CbvGPnomZAtan50",
  authDomain: "europify-d7c61.firebaseapp.com",
  projectId: "europify-d7c61",
  storageBucket: "europify-d7c61.firebasestorage.app",
  messagingSenderId: "579040172233",
  appId: "1:579040172233:web:4b52e9e781c98b935a5518"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function showAuthError(msg) {
  const el = document.getElementById('auth-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

// Auth state — show/hide login screen without flicker
onAuthStateChanged(auth, user => {
  const ls = document.getElementById('login-screen');
  const lo = document.getElementById('sidebar-logout');
  if (user) {
    if (ls) ls.style.display = 'none';
    if (lo) lo.style.display = 'block';
  } else {
    if (ls) { ls.style.display = 'flex'; }
    if (lo) lo.style.display = 'none';
  }
});

window.switchAuthTab = function(tab) {
  const isSignin = tab === 'signin';
  document.getElementById('form-signin').style.display = isSignin ? 'block' : 'none';
  document.getElementById('form-signup').style.display = isSignin ? 'none' : 'block';
  document.getElementById('tab-signin').style.cssText += ';background:' + (isSignin ? 'white' : 'transparent') + ';color:' + (isSignin ? '#000' : 'rgba(255,255,255,0.4)');
  document.getElementById('tab-signup').style.cssText += ';background:' + (isSignin ? 'transparent' : 'white') + ';color:' + (isSignin ? 'rgba(255,255,255,0.4)' : '#000');
  document.getElementById('auth-error').style.display = 'none';
};

window.doSignIn = async function() {
  const email = document.getElementById('signin-email').value.trim();
  const pass = document.getElementById('signin-password').value;
  if (!email || !pass) { showAuthError('Fill in all fields'); return; }
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch(e) {
    showAuthError(e.code === 'auth/invalid-credential' ? 'Wrong email or password' : e.message);
  }
};

window.doSignUp = async function() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const pass = document.getElementById('signup-password').value;
  if (!name || !email || !pass) { showAuthError('Fill in all fields'); return; }
  if (pass.length < 6) { showAuthError('Password must be at least 6 characters'); return; }
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(cred.user, { displayName: name });
  } catch(e) {
    showAuthError(e.code === 'auth/email-already-in-use' ? 'Email already in use' : e.message);
  }
};

window.doGoogleSignIn = async function() {
  try {
    await signInWithPopup(auth, provider);
  } catch(e) {
    if (e.code !== 'auth/popup-closed-by-user') showAuthError(e.message);
  }
};

window.doLogout = async function() {
  try {
    await signOut(auth);
  } catch(e) {}
};
</script>

</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (path === '/debug') {
      return new Response(JSON.stringify({
        status: 'ok',
        worker: 'europify-frontend',
        timestamp: new Date().toISOString(),
        api_base: env.API_BASE || 'https://europify.ayushonlyyy.workers.dev/api',
        vars: {
          API_BASE: env.API_BASE || '(not set)',
          FIREBASE_PROJECT_ID: env.FIREBASE_PROJECT_ID || '(not set)',
        },
        routes: ['/', '/debug'],
      }, null, 2), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response(INDEX_HTML, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'Cache-Control': 'no-cache',
        ...corsHeaders,
      },
    });
  },
};
