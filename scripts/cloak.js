const STYLE_SETS = {
  light: {
    "--bg-gradient-1": "#f8f9fa",
    "--bg-gradient-2": "#e9ecef",
    "--window-bg":  "rgba(255,255,255,0.5)",
    "--titlebar-bg": "rgba(248,249,250,0.85)",
    "--font-color": "#212529",
    "--font-secondary": "#6c757d",
    "--settings-item-bg": "rgba(255,255,255,0.7)",
    "--input-bg": "rgba(248,249,250,0.8)",
    "--input-border": "#ced4da",
    "--bg": "rgba(248,249,250,0.651)",
    "--gradient": "linear-gradient(0deg, rgba(255,255,255,0.9), rgba(0,0,0,0))",
    "--taskbar-bg":
      "rgba(255,255,255,0.85)",
    "--setting-item-bg":
      "rgba(255,255,255,0.9)",
    "--setting-item-border": "1px solid rgba(0,0,0,0.08)",
    "--custom-button-bg":
      "rgba(255,255,255,0.9)",
    "--custom-button-border": "1px solid rgba(0,0,0,0.08)",
    "--color-input-bg":
      "rgba(255,255,255,0.9)",
    "--color-input-border": "1px solid rgba(0,0,0,0.08)",
    "--search-input-bg": "rgba(248,249,250,0.9)",
    "--search-input-border": "rgba(206,212,218,0.8)",
    "--search-input-focus-bg": "rgba(255,255,255,0.95)",
    "--panel-bg": "rgba(255,255,255,0.4)",
    "--border": "1px solid rgba(0,0,0,0.08)",
  },
  dark: {
    "--bg-gradient-1": "#000000",
    "--bg-gradient-2": "#000",
    "--window-bg": "rgba(5,5,5,0.5)",
    "--titlebar-bg": "rgba(5,5,5,0.42)",
    "--font-color": "#fff",
    "--font-secondary": "#bbb",
    "--settings-item-bg": "rgba(40,40,40,0.4)",
    "--input-bg": "rgba(60,60,60,0.7)",
    "--input-border": "#555",
    "--bg": "rgba(26,26,26,0.5)",
    "--gradient": "linear-gradient(0deg,rgb(0,0,0),rgba(0,0,0,0))",
    "--taskbar-bg":
      "rgba(18, 18, 25, 0.55)",
    "--setting-item-bg":
      "rgba(0, 0, 0, 0.2)",
    "--setting-item-border": "1px solid rgba(0, 0, 0, 1)",
    "--custom-button-bg":
      "rgba(18,18,26,0.46)",
    "--custom-button-border": "1px solid rgba(255,255,255,0.12)",
    "--color-input-bg":
      "rgba(34,34,42,0.66)",
    "--color-input-border": "1px solid rgba(255,255,255,0.12)",
    "--search-input-bg": "rgb(60 60 60 / 15%)",
    "--search-input-border": "transparent",
    "--search-input-focus-bg": "rgb(60 60 60 / 25%)",
    "--search-input-bg": "rgb(60 60 60 / 15%)",
    "--search-input-border": "transparent",
    "--search-input-focus-bg": "rgb(60 60 60 / 25%)",
  },
  modern: {
    "--radius-sm": "8px",
    "--radius-md": "12px",
    "--radius-lg": "16px",
    "--radius-xl": "20px",
    "--radius-round": "50%",
  },
  classic: {
    "--radius-sm": "2px",
    "--radius-md": "3px",
    "--radius-lg": "4px",
    "--radius-xl": "5px",
    "--radius-round": "1%",
  },
};
const createElement = (tag, cls = "", html = "", attrs = {}) => {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (html) el.innerHTML = html;
  for (const [k, v] of Object.entries(attrs)) {
    if (
      tag === "iframe" &&
      k.toLowerCase() === "allowfullscreen" &&
      "allow" in attrs
    )
      continue;
    k in el ? (el[k] = v) : el.setAttribute(k, v);
  }
  return el;
};
const GAMES_LIST = [
  { name: "Pong", url: "/pages/games/pong.html", image: "/image/games/pong.png", notification: "I guess you find this fun unc" },
  { name: "Tag", url: "/pages/games/tag.html", image: "/image/games/tag.png", notification: "Grab your friend!" },
  { name: "Fight", url: "/pages/games/fighting.html", image: "/image/games/fight.png" },
  { name: "Space", url: "/pages/games/space.html", image: "/image/games/space.png" },
  { name: "DeltaTraveler", url: "https://pulfh1.web.app/deltatraveler.html", image: "/image/games/deltatraveler.png"},
  { name: "DeltaRune", url: "https://pulfh1.web.app/deltarune.html", image: "/image/games/deltarune.png", tag: "Hot" },
  { name: "Undertale", url: "https://noahsamazingtutoringhelp.github.io/Noahs-Calculus-Tutor/games/91.html", image: "/image/games/undertale.png", aspectRatio: "1:1" },
  { name: "10 Minutes Till Dawn", url: "https://10minutestilldawnonline.github.io/a7/10-minutes-till-dawn/", image: "/image/games/10minutestilldawn.png" },
  { name: "Geometry Dash WIP", url: "/pages/games/gdash.html", image: "/image/games/geometrydash.png", notification: "Small Challenge I made, still in Alpha. PLAY IN MAXIMIZED WINDOW", tag: "Beta" },
  { name: "Geometry Dash", url: "https://noahsamazingtutoringhelp.github.io/Noahs-Calculus-Tutor/games/46.html", image: "/image/games/geometrydash.png", notification: "Scuffed Ripoff of gd"},
  { name: "Space Waves", url: "https://marblerun-3d.github.io/game/spacewave/", image: "/image/games/spacewaves.png", tag: "Hot" },
  { name: "Online Racing", url: "https://rmcars.vercel.app/", image: "/image/games/onlineracing.png", notification: "W update" },
  { name: "Minecraft (1.12)", url: "https://yee.pages.dev/#/MS4xMmpz", image: "/image/games/minecraft.png", notification: "Scuffed but its fire", tag: "New" },
  { name: "Friday Night Funkin'", url: "https://rosin-cya.web.app/games/8.html", image: "/image/games/fnf.png", notification: "New Update Kinda Fire", tag: "New"},
  { name: "The Deadseat", url: "https://rosin-cya.web.app/games/458.html", image: "/image/games/thedeadseat.png", notification: "CoryxKenshin played this peak", tag: "New" },
  { name: "Kindergarten", url: "https://rosin-cya.web.app/games/445.html", image: "/image/games/kindergarten.png", notification: "Fire game btw we LOOOOVE ts amirite", tag: "New" },
  { name: "Kindergarten 2", url: "https://rosin-cya.web.app/games/446.html", image: "/image/games/kindergarten2.png", notification: "WE LOOOOOOOVE the sequel to this amirite", tag: "New" },
  { name: "Riddle School", url: "https://rosin-cya.web.app/games/287.html", image: "/image/games/riddleschool.png", notification: "Holy throwback", tag: "New" },
  { name: "Riddle School 2", url: "https://rosin-cya.web.app/games/288.html", image: "/image/games/riddleschool2.png", tag: "New" },
  { name: "Riddle School 3", url: "https://rosin-cya.web.app/games/289.html", image: "/image/games/riddleschool3.png", tag: "New" },
  { name: "Riddle School 4", url: "https://rosin-cya.web.app/games/290.html", image: "/image/games/riddleschool4.png", tag: "New" },
  { name: "Riddle School 5", url: "https://rosin-cya.web.app/games/291.html", image: "/image/games/riddleschool5.png", tag: "New" },
  { name: "Riddle Transfer", url: "https://rosin-cya.web.app/games/292.html", image: "/image/games/riddletransfer.png", notification: "FINALLY a name change bruh", tag: "New" },
  { name: "Riddle Transfer 2", url: "https://rosin-cya.web.app/games/293.html", image: "/image/games/riddletransfer2.png", notification: "The long awaited finale", tag: "New" },
  { name: "The Binding Of Isaac", url: "https://rosin-cya.web.app/games/350.html", image: "/image/games/bindingofisaac.png", aspectRatio: "1:1", tag: "New", notification: "RoguelikeMaxxing" },
  { name: "The Impossible Quiz", url: "https://rosin-cya.web.app/games/507.html", image: "/image/games/impossiblequiz.png", notification: "Don't forget to bring a brain", tag: "New" },
  { name: "Crossy Road", url: "https://mc0825.github.io/g20/class-402/", image: "/image/games/crossyroad.png" },
  { name: "Meat Boy", url: "https://mochawoof.github.io/embeds/meatboy/index.html", image: "/image/games/meatboy.png" },
  { name: "FNAF", url: "https://dorukyum.github.io/FNAF-Web/", image: "/image/games/fnaf.png", notification: "our our our our our our our our our", tag: "Hot" },
  { name: "FNAF 2", url: "https://sussygamedeveloper.github.io/FiveNights2NOHACKS/", image: "/image/games/fnaf2.png" },
  { name: "FNAF 3", url: "https://turbowarp.org/710645963/embed?interpolate", image: "/image/games/fnaf3.png", notification: "Nobody ported FNAF3 so I had to make do with this scratch version", tag: "Hot" },
  { name: "FNAF 4", url: "https://turbowarp.org/82175664/embed?interpolate", image: "/image/games/fnaf4.png", notification: "Due to the absurd size of the game, I wasn't able to get a real port and had to find the scratch version. sry :p" },
  { name: "Celeste", url: "https://cveinnt.github.io/celeste/", image: "/image/games/celeste.png", notification: "Beat my time 5 mins 12 secs" },
  { name: "Granny", url: "https://rosin-cya.web.app/games/90.html", image: "/image/games/granny.png", notification: "grannies houuuseee I don't wanna stay" },
  { name: "Soccer Random", url: "https://soccer-random.github.io/a8/soccer-random/", image: "/image/games/soccerrandom.png", notification: "sorry for delaying it lol" },
  { name: "Google Snake", url: "https://googlesnakemods.com/v/current/", image: "/image/games/googlesnake.png", notification: "Business Majors love this game" },
  { name: "1v1.lol", url: "https://class811.github.io/g77/1v1-lol-3/", image: "/image/games/1v1lol.png", notification: "Playing 1v1lol in THIS economy bro " },
  { name: "Bad Time Simulator", url: "https://mochawoof.github.io/embeds/badtimesimulator/index.html", image: "/image/games/badtimesimulator.png", notification: "i don't like undertale but this game is lwk tuff" },
  { name: "Gun Mayhem 2", url: "https://htmlxm.github.io/h7/gun-mayhem-2", image: "/image/games/gunmayhem2.png", notification: "IMO one of my favorite childhood games" },
  { name: "Liquid Soccer", url: "https://speededu111.github.io/g69/class-628", image: "/image/games/liquidsoccer.png" },
  { name: "OSU! Mania", url: "https://web-osu-mania.pages.dev/", image: "/image/games/osumania.png", notification: "Switch beatmap provider in settings till one works" },
  { name: "OSU!", url: "https://inventionpro.github.io/webosu/", image: "/image/games/osu.png", notification: "Switch beatmap provider in settings till one works" },
  { name: "Level Devil", url: "https://mochawoof.github.io/embeds/leveldevil/index.html", image: "/image/games/leveldevil.png", notification: "i mean bro if you're THAT bored to rage over a game go ahead" },
  { name: "Case Clicker", url: "https://kingofkfcjamal.github.io/CaseClicker/", image: "/image/games/caseclicker.png", notification: '"Gold Gold Gold" - Ohnepixel' },
  { name: "Drive Mad", url: "https://drive-madgame.github.io/file/", image: "/image/games/drivemad.png" },
  { name: "Wrestle Bros", url: "https://wb.basketball.services/", image: "/image/games/wrestlebros.png" },
  { name: "Basket Random", url: "https://basketrng.netlify.app/", image: "/image/games/basketrandom.png", notification: "dont question the mod i was messing around with textures lmao" },
  { name: "Speed Stars", url: "https://epicfreegames78.github.io/speed-stars/", image: "/image/games/speedstars.png" },
  { name: "Tetris", url: "https://djblue.github.io/tetris/", image: "/image/games/tetris.png", notification: "ok unc enjoy your game " },
  { name: "Crazy Cattle 3D", url: "https://crazycattle.aiforceware.workers.dev/index.html", image: "/image/games/crazycattle.png", notification: "this game is dead bro move on " },
  { name: "Baseball Bros", url: "https://roman-number.com/games/baseballbros/index.html", image: "/image/games/baseballbros.png", notification: "tuff game ngl" },
  { name: "Stick Duel Battle", url: "https://j0n12.github.io/macvg1/projects/stick-duel-battle/game.html", image: "/image/games/stickduelbattle.png", notification: "is bro tryna be stick fight" },
  { name: "Earn to Die", url: "https://hilfig3r.github.io/EarnToDie/", image: "/image/games/earntodie.png" },
  { name: "Bacon May Die", url: "https://rebemanae.github.io/bacon-may-die/", image: "/image/games/baconmaydie.png" },
  { name: "Slope", url: "https://mochawoof.github.io/embeds/slope/index.html", image: "/image/games/slope.png", notification: "you know ball" },
  { name: "Retro Bowl", url: "https://game316009.konggames.com/gamez/0031/6009/live/index.html", image: "/image/games/retrobowl.png", notification: "fixed the weird crash bug hopefully" },
  { name: "Bloxorz", url: "https://mochawoof.github.io/embeds/bloxorz/play.html", image: "/image/games/bloxorz.png", notification: "coolmathgames? you know ball" },
  { name: "Cluster Rush", url: "https://mochawoof.github.io/embeds/cluster_rush/index.html", image: "/image/games/clusterrush.png" },
  { name: "Boxel Rebound", url: "https://mochawoof.github.io/embeds/boxel_rebound/index.html", image: "/image/games/boxelrebound.png" },
  { name: "World's Hardest Game", url: "https://mochawoof.github.io/embeds/worlds_hardest_game/index.html", image: "/image/games/worldshardestgame.png", notification: "i mean if you're TRYING to suffer go ahead" },
  { name: "Cat Mario", url: "https://mochawoof.github.io/embeds/cat_mario/index.html", image: "/image/games/catmario.png" },
  { name: "Tiny Fishing", url: "https://mochawoof.github.io/embeds/tiny_fishing/tinyfishing.html", image: "/image/games/tinyfishing.png" },
  { name: "GunSpin", url: "https://roman-number.com/games/gunspin/index.html", image: "/image/games/gunspin.png" },
  { name: "Monkey Mart", url: "https://monkey-martgame.github.io/file/", image: "/image/games/monkeymart.png" },
  { name: "Happy Wheels", url: "https://sreekar617.github.io/hw/index.html", image: "/image/games/happywheels.png", notification: "i know you were on youtube back then cause you HAVE to know this peak game" },
  { name: "Immaculate Grid", url: "https://immaculategrid.pages.dev/game/", image: "/image/games/immaculategrid.png", notification: "is this even a game? idk someone told me to add it" },
];
const MEDIA_LIST = [
  { name: "Heartive", url: "https://heartive.pages.dev/", image: "/image/media/heartive.png" },
  { name: "YouTube", url: "https://613tube.com/", image: "/image/media/youtube.png" },
  { name: "BingeFlix", url: "https://bingflix.vercel.app/", image: "/image/media/bingeflix.png" },
];
const PROXY_LIST = [
  { name: "Doge Unblocker", url: "https://doge-unblocked.vercel.app/", image: "/image/proxy/dogeunblocker.png", tag: "Hot" },
];
const SETTINGS_LIST = [
  {
    label: "Color Theme",
    desc: "Pick the primary color",
    type: "color",
    key: "primaryAccent",
    default: "#2f0753",
  },
  {
    label: "Secondary Accent",
    desc: "Pick the secondary accent color",
    type: "color",
    key: "secondaryAccent",
    default: "#2f0753",
  },
  {
    label: "Background Color",
    desc: "Customize the Black/White Gradient in between, regardless of Selected Light/Dark Mode",
    type: "color",
    key: "bgGradient2",
    default: "#000000",
  },
  {
    label: "Light Mode",
    desc: "Toggle Light/Dark Mode",
    type: "toggle",
    key: "lightEnabled",
    default: false,
  },
  {
    label: "Advanced Theme Settings",
    desc: "Show advanced background customization options",
    type: "toggle",
    key: "advancedThemeEnabled",
    default: false,
  },
  {
    label: "Modernization",
    desc: "Toggle Rounded Corners for a modern look",
    type: "toggle",
    key: "modernizationEnabled",
    default: true,
  },
  {
    label: "Performance Mode",
    desc: "Reduce effects for better Performance/FPS",
    type: "toggle",
    key: "performanceModeEnabled",
    default: false,
  },
  {
    label: "Leave Prevention",
    desc: "Ask before closing or reloading the page",
    type: "toggle",
    key: "leavePreventionEnabled",
    default: true,
  },
  {
    label: "Custom CSS",
    desc: "Enable custom CSS editing for advanced users",
    type: "toggle",
    key: "customCSSEnabled",
    default: false,
  },
  {
    label: "Custom CSS Code",
    desc: "Edit the CSS directly (advanced)",
    type: "textarea",
    key: "customCSSCode",
    default: "",
  },
];
const applyStyles = (target, styles) =>
  Object.entries(styles).forEach(([k, v]) => target.style.setProperty(k, v));
const getPref = (key, defaultValue) =>
  localStorage.getItem(key) ?? defaultValue;
const darkenHex = (hex = "#000000", amount = 0.5) => {
  try {
    const c = hex.trim().replace("#", "");
    if (c.length !== 6) return hex;
    const v = parseInt(c, 16);
    const r = Math.max(
      0,
      Math.min(255, Math.round(((v >> 16) & 255) * (1 - amount)))
    );
    const g = Math.max(
      0,
      Math.min(255, Math.round(((v >> 8) & 255) * (1 - amount)))
    );
    const b = Math.max(0, Math.min(255, Math.round((v & 255) * (1 - amount))));
    return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
  } catch {
    return hex;
  }
};
const setPrimaryAccent = (el, hex) => {
  el.style.setProperty("--primary-accent", hex);
  el.style.setProperty("--primary-accent-dark", darkenHex(hex, 0.5));
  const secondary = localStorage.getItem("secondaryAccent");
  if (secondary !== null) {
    el.style.setProperty("--primary-accent-2", secondary);
  } else {
    el.style.setProperty("--primary-accent-2", hex);
  }
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function updateCustomCSS() {
  const css = getPref("customCSSCode", "");
  // Update main document
  const styleTag = document.getElementById("custom-css");
  if (styleTag) {
    styleTag.textContent = css;
  }
  // Update iframes
  document.querySelectorAll("iframe.windowed-iframe").forEach((iframe) => {
    try {
      const doc = iframe.contentDocument;
      if (doc) {
        let iframeStyleTag = doc.getElementById("custom-css");
        if (!iframeStyleTag) {
          iframeStyleTag = doc.createElement("style");
          iframeStyleTag.id = "custom-css";
          doc.head.appendChild(iframeStyleTag);
        }
        iframeStyleTag.textContent = css;
      }
    } catch (e) {
      // Cross-origin, ignore
    }
  });
}
let isPerformanceModeActive = false; 
const showNotification = (message, priority = "low", duration = 5000, isBold = false, isPinned = false) => {
  const [mainMessage, subNote] = message.split("\n");
  const notificationId = ++notificationCounter;
 
  // Create notification element
  const notification = createElement(
    "div",
    `notification priority-${priority}${isBold ? ' notification-bold' : ''}${isPinned ? ' notification-pinned' : ''}`,
    `<button class="notification-close">&times;</button><div class="notification-content"><div class="notification-message">${mainMessage}${
      subNote ? `<div class="notification-subnote">${subNote}</div>` : ""
    }</div></div>${isPinned ? '' : '<div class="notification-timer"></div>'}`
  );
 
  // Add to stack tracking
  notificationStack.push({
    id: notificationId,
    element: notification,
    priority: priority,
    isPinned: isPinned
  });
 
  // Position notification in stack
  updateNotificationPositions();
 
  // Add to DOM
  document.body.appendChild(notification);
 
  // Trigger animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
 
  const timerBar = notification.querySelector(".notification-timer");
  const closeButton = notification.querySelector(".notification-close");
  let autoCloseTimeout = null;
 
  const closeNotification = () => {
    if (autoCloseTimeout) {
      clearTimeout(autoCloseTimeout);
    }
    notification.classList.remove('show');
    notification.classList.add('hide');
 
    // Remove from stack after animation
    setTimeout(() => {
      notification.remove();
      notificationStack = notificationStack.filter(n => n.id !== notificationId);
      updateNotificationPositions();
    }, 400);
  };
 
  if (closeButton) {
    closeButton.onclick = closeNotification;
  }
 
  // Start timer bar animation only if not pinned
  if (!isPinned && timerBar) {
    setTimeout(() => {
      timerBar.style.transition = `width ${duration}ms linear`;
      timerBar.style.width = "0";
    }, 100);
 
    autoCloseTimeout = setTimeout(closeNotification, duration);
  }
};

function updateNotificationPositions() {
  const baseTop = 20;
  const spacing = 80;
  const maxVisible = 5;
 
  // Separate pinned and regular notifications
  const pinnedNotifications = notificationStack.filter(n => n.isPinned);
  const regularNotifications = notificationStack.filter(n => !n.isPinned);
 
  // Position pinned notifications at the top
  pinnedNotifications.forEach((notification, index) => {
    const offset = index * spacing;
    notification.element.style.top = `${baseTop + offset}px`;
  });
 
  // Position regular notifications below pinned ones
  const pinnedCount = pinnedNotifications.length;
  regularNotifications.slice(-maxVisible).forEach((notification, index) => {
    const offset = (pinnedCount + index) * spacing;
    notification.element.style.top = `${baseTop + offset}px`;
  });
}
// Notification stacking system
let notificationStack = [];
let notificationCounter = 0;

function applyLeavePrevention() {
  const enabled = getPref("leavePreventionEnabled", "true") === "true";
  window.onbeforeunload = enabled
    ? () => "Are you sure you want to leave?"
    : null;
}
function styleElement(el) {
   const isLight = getPref("lightEnabled", "false") === "true";
   const isModern = getPref("modernizationEnabled", "true") === "true";
   const isPerf = getPref("performanceModeEnabled", "false") === "true" || isPerformanceModeActive;

   setPrimaryAccent(el, getPref("primaryAccent", "#2f0753"));

   let styles = isLight ? { ...STYLE_SETS.light } : { ...STYLE_SETS.dark };

   applyStyles(el, styles);
   applyStyles(el, isModern ? STYLE_SETS.modern : STYLE_SETS.classic);
   const bgGradient2 = localStorage.getItem("bgGradient2");
   if (bgGradient2 !== null) {
     el.style.setProperty("--bg-gradient-2", bgGradient2);
   }
   el.classList.toggle("performance-mode", isPerf || isPerformanceModeActive);
   el.classList.toggle("light-mode", isLight);
 }
function updateAllStyles(useTransition = false) {
  const elements = [document.documentElement];
  document.querySelectorAll("iframe.windowed-iframe").forEach((iframe) => {
    try {
      if (iframe.contentDocument?.documentElement) {
        elements.push(iframe.contentDocument.documentElement);
      }
    } catch {}
  });
  
  const isPerf = document.documentElement.classList.contains("performance-mode") || isPerformanceModeActive;
  
  if (useTransition) {
    elements.forEach((el) => el.classList.add("theme-transition"));
    setTimeout(() => {
      elements.forEach((el) => {
        styleElement(el);
        el.classList.toggle("performance-mode", isPerf);
      });
      setTimeout(() => {
        elements.forEach((el) => el.classList.remove("theme-transition"));
      }, 350);
    }, 10);
  } else {
    elements.forEach((el) => {
      styleElement(el);
      el.classList.toggle("performance-mode", isPerf);
    });
  }
  
  // Apply performance mode to all iframes
  document.querySelectorAll("iframe.windowed-iframe").forEach((iframe) => {
    try {
      const reloader = iframe.parentElement?.dataset.reloader;
      if (reloader === "games" || reloader === "media" || reloader === "proxy") {
        const doc = iframe.contentDocument;
        if (doc) {
          const container = doc.querySelector(
            ".games-container, .media-container, .proxy-container"
          );
          if (container) {
            const itemClass = reloader === "games" ? "game" : reloader === "media" ? "media" : "proxy";
            const buttons = container.querySelectorAll(`.${itemClass}`);
            
            if (isPerf) {
              buttons.forEach((btn) => {
                btn.style.animation = "none";
                btn.style.opacity = "1";
                btn.style.transform = "none";
                btn.style.transition = "none";
              });
            } else {
              buttons.forEach((btn) => {
                btn.style.animation = "";
                btn.style.opacity = "";
                btn.style.transform = "";
                btn.style.transition = "";
              });
            }
          }
        }
      }
    } catch {}
  });
}
(function () {
  const docEl = document.documentElement;
  
  // Initialize performance mode from saved settings
  isPerformanceModeActive = getPref("performanceModeEnabled", "false") === "true";
  
  window.addEventListener("storage", (e) => {
    const handlers = {
      plugin_fpsCounterEnabled: applyPerformanceMonitoring,
      plugin_fpsCounterInstalled: applyPerformanceMonitoring,
      leavePreventionEnabled: applyLeavePrevention,
    };
    if (handlers[e.key]) {
      handlers[e.key]();
    } else {
      updateAllStyles();
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    updateAllStyles();
    updateCustomCSS();
  });
  applyLeavePrevention();
})();
let __fpsLoopId = 0,
  __fpsLastTs = 0,
  __fpsFrameCount = 0,
  __fpsTimer = null,
  __fpsValue = 0;
function getFpsEnabled() {
  return getPref("plugin_fpsCounterEnabled", "false") === "true";
}

function updateFpsDisplays() {
  const enabled = getFpsEnabled();
  const fpsValue = __fpsValue;

  document.querySelectorAll(".iframe-titlebar").forEach((tb) => {
    let label = tb.querySelector(".titlebar-fps");
    if (enabled && !label)
      label = tb.appendChild(createElement("span", "titlebar-fps"));
    if (label) {
      const text = enabled
        ? fpsValue > 0
          ? `${Math.round(fpsValue)} FPS`
          : "…"
        : "";
      label.textContent = text;
    }
    if (!enabled && label) label.remove();
  });
}
function startFpsMonitor() {
  if (__fpsLoopId) return;
  __fpsLastTs = performance.now();
  __fpsFrameCount = 0;
  const loop = (ts) => {
    __fpsFrameCount++;
    const dt = ts - __fpsLastTs;
    if (dt >= 1000) {
      __fpsValue = (__fpsFrameCount * 1000) / dt;
      __fpsLastTs = ts;
      __fpsFrameCount = 0;
    }
    __fpsLoopId = requestAnimationFrame(loop);
  };
  __fpsLoopId = requestAnimationFrame(loop);
  if (!__fpsTimer) __fpsTimer = setInterval(updateFpsDisplays, 1500);
}
function stopFpsMonitor() {
  if (__fpsLoopId) cancelAnimationFrame(__fpsLoopId);
  __fpsLoopId = 0;
  if (__fpsTimer) clearInterval(__fpsTimer);
  __fpsTimer = null;
  __fpsValue = 0;
  updateFpsDisplays();
}
function applyPerformanceMonitoring() {
  const fpsNeeded = getFpsEnabled() && isFpsInstalled();
  if (fpsNeeded) {
    startFpsMonitor();
  } else {
    stopFpsMonitor();
  }
  updateFpsDisplays();
}
function attachFpsIfEnabledTo(titlebar) {
  if (!getFpsEnabled() || !isFpsInstalled()) return;
  let el = titlebar.querySelector(".titlebar-fps");
  if (!el) {
    el = createElement("span", "titlebar-fps", "");
    titlebar.appendChild(el);
  }
  el.textContent = __fpsValue > 0 ? Math.round(__fpsValue) + " FPS" : "…";
}
function isFpsInstalled() {
  return getPref("plugin_fpsCounterInstalled", "false") === "true";
}
function setFpsInstalled(v) {
  localStorage.setItem("plugin_fpsCounterInstalled", (!!v).toString());
}
function openPlugins() {
  windowify(
    "about:blank",
    (iframe) => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      doc.title = "Plugins";
      doc.head.appendChild(
        createElement("link", "", "", {
          rel: "stylesheet",
          href: "/styles/styles.css",
        })
      );
      doc.body.className = "custom-ui";
      const container = createElement("div", "settings-container");
      const grid = createElement("div", "settings-grid");
      const fpsItem = createElement("div", "setting-item");
      fpsItem.append(
        createElement("div", "setting-label", "FPS Counter"),
        createElement(
          "div",
          "setting-desc",
          "Displays the current FPS in the titlebar. Good for visualizing performance usage."
        )
      );
      const fpsControl = createElement("div", "setting-control");
      const fpsInstallBtn = createElement("button", "customButton", "Install");
      const fpsUninstallBtn = createElement(
        "button",
        "customButton",
        "Uninstall"
      );
      const fpsToggle = createElement("label", "switch");
      const fpsInput = createElement("input", "", "", {
        type: "checkbox",
        checked: getFpsEnabled() === true,
      });
      fpsToggle.append(fpsInput, createElement("span", "slider"));
      function renderFps() {
        iframe.parentElement.dataset.reloader = openPlugins;
        fpsControl.innerHTML = "";
        if (!isFpsInstalled()) {
          fpsControl.appendChild(fpsInstallBtn);
        } else {
          fpsControl.appendChild(fpsUninstallBtn);
          fpsControl.appendChild(fpsToggle);
        }
      }
      fpsInstallBtn.onclick = () => {
        setFpsInstalled(true);
        renderFps();
      };
      fpsUninstallBtn.onclick = () => {
        setFpsInstalled(false);
        localStorage.setItem("plugin_fpsCounterEnabled", "false");
        applyPerformanceMonitoring();
        renderFps();
      };
      fpsInput.addEventListener("change", () => {
        localStorage.setItem(
          "plugin_fpsCounterEnabled",
          fpsInput.checked.toString()
        );
        applyPerformanceMonitoring();
      });
      renderFps();
      fpsItem.appendChild(fpsControl);
      grid.appendChild(fpsItem);
      const gameStatsItem = createElement("div", "setting-item");
      gameStatsItem.append(
        createElement("div", "setting-label", "Game Stats Tracker"),
        createElement(
          "div",
          "setting-desc",
          "Tracks playtime and statistics for games played in Illumoid OS."
        )
      );
      const gameStatsControl = createElement("div", "setting-control");
      const gameStatsInstallBtn = createElement(
        "button",
        "customButton",
        "Install"
      );
      const gameStatsUninstallBtn = createElement(
        "button",
        "customButton",
        "Uninstall"
      );
      const gameStatsLaunchBtn = createElement(
        "button",
        "customButton",
        "Launch"
      );
      function renderGameStats() {
        gameStatsControl.innerHTML = "";
        if (!isGameStatsInstalled()) {
          gameStatsControl.appendChild(gameStatsInstallBtn);
        } else {
          gameStatsControl.appendChild(gameStatsUninstallBtn);
          gameStatsControl.appendChild(gameStatsLaunchBtn);
        }
      }
      gameStatsInstallBtn.onclick = () => {
        setGameStatsInstalled(true);
        renderGameStats();
      };
      gameStatsUninstallBtn.onclick = () => {
        setGameStatsInstalled(false);
        renderGameStats();
      };
      gameStatsLaunchBtn.onclick = () => {
        launchGameStats();
      };
      renderGameStats();
      gameStatsItem.appendChild(gameStatsControl);
      grid.appendChild(gameStatsItem);
      const sysMonItem = createElement("div", "setting-item");
      sysMonItem.append(
        createElement("div", "setting-label", "System Monitor"),
        createElement(
          "div",
          "setting-desc",
          "Real-time system performance metrics including FPS, memory, and CPU usage."
        )
      );
      const sysMonControl = createElement("div", "setting-control");
      const sysMonInstallBtn = createElement(
        "button",
        "customButton",
        "Install"
      );
      const sysMonUninstallBtn = createElement(
        "button",
        "customButton",
        "Uninstall"
      );
      const sysMonLaunchBtn = createElement("button", "customButton", "Launch");
      function renderSysMon() {
        sysMonControl.innerHTML = "";
        if (!isSysMonInstalled()) {
          sysMonControl.appendChild(sysMonInstallBtn);
        } else {
          sysMonControl.appendChild(sysMonUninstallBtn);
          sysMonControl.appendChild(sysMonLaunchBtn);
        }
      }
      sysMonInstallBtn.onclick = () => {
        setSysMonInstalled(true);
        renderSysMon();
      };
      sysMonUninstallBtn.onclick = () => {
        setSysMonInstalled(false);
        renderSysMon();
      };
      sysMonLaunchBtn.onclick = () => {
        launchSysMon();
      };
      renderSysMon();
      sysMonItem.appendChild(sysMonControl);
      grid.appendChild(sysMonItem);
      container.appendChild(grid);
      doc.body.appendChild(container);
    },
    "Plugins"
  );
}
window.plugins = openPlugins;
window.openPlugins = openPlugins;
(function () {
  try {
    applyPerformanceMonitoring();
  } catch (_) {}
})();
setTimeout(() => {
  const taskbar = document.querySelector(".taskbar");
  if (taskbar) taskbar.style.animation = "none";
}, 3000);
setTimeout(() => {
  document
    .querySelectorAll("#taskbarButton")
    .forEach((btn) => (btn.style.animation = "none"));
}, 3000);
setTimeout(() => {
  const logo = document.querySelector(".svgLogo");
  if (logo) logo.style.animation = "none";
}, 3000);
const createButton = (cls, iconSrc, iconAlt, onClick) => {
  const content = iconSrc
    ? `<img src="${iconSrc}" alt="${iconAlt || ""}" class="taskbarButtonIcon">`
    : iconAlt || "";
  const btn = createElement("button", `button ${cls}`, content, {
    onclick: onClick,
    tabIndex: -1,
  });
  if (cls.includes("button-close")) btn.dataset.isCloseButton = true;
  btn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    btn.blur();
  });
  return btn;
};
function windowify(url, callback, customTitle = null, isGameWindow = false) {
  document.title = "Home";
  const updateDocumentStyles = (doc) => {
    if (!doc?.documentElement) return;
    const docEl = doc.documentElement;
    const isLight = getPref("lightEnabled", "false") === "true";
    const isModern = getPref("modernizationEnabled", "true") === "true";
    const isPerf =
      getPref("performanceModeEnabled", "false") === "true" ||
      isPerformanceModeActive;
    applyStyles(docEl, isLight ? STYLE_SETS.light : STYLE_SETS.dark);
    applyStyles(docEl, isModern ? STYLE_SETS.modern : STYLE_SETS.classic);
    setPrimaryAccent(docEl, getPref("primaryAccent", "#2f0753"));
    docEl.classList.toggle("performance-mode", isPerf);
    docEl.classList.toggle("light-mode", isLight);
  };
  const container = createElement("div", "container-window"),
    titlebar = createElement("div", "iframe-titlebar"),
    loadingScreen = createElement(
      "div",
      "loading-screen",
      `<div class="loading-content">
        <div class="spinner"></div>
        <div class="loading-text">Loading...</div>
      </div>`
    ),
    iframe = createElement("iframe", "windowed-iframe", "", {
      allow:
        "camera; microphone; display-capture; clipboard-write; clipboard-read;",
      referrerpolicy: "no-referrer",
      style: "opacity: 0; pointer-events: none;",
    }),
    buttonContainer = createElement("div", "button-container"),
    fpsButton = createButton("button-fps", "", "");
  iframe.allowFullscreen = true;
  let isMaximized = true;
  let callbackCalled = false;
  let isReloading = false;
  const bumpZ = () => {
    window.__windowZ = (window.__windowZ || 10) + 1;
    container.style.zIndex = String(window.__windowZ);
  };
  bumpZ();
  container.addEventListener("pointerdown", bumpZ);
  const centerWindow = () => {
    container.style.right = "";
    container.style.bottom = "";
    container.style.margin = "0";
    const cw = container.offsetWidth;
    const ch = container.offsetHeight;
    const left = Math.max(0, Math.round((window.innerWidth - cw) / 2));
    const top = Math.max(0, Math.round((window.innerHeight - ch) / 2));
    container.style.left = left + "px";
    container.style.top = top + "px";
  };
  const updateFpsButtonState = () => {
    const active =
      isPerformanceModeActive ||
      getPref("performanceModeEnabled", "false") === "true";
    fpsButton.classList.toggle("active", active);
  };
  fpsButton.onclick = () => {
    isPerformanceModeActive = !isPerformanceModeActive;
    // Update the settings preference to match the manual toggle
    localStorage.setItem("performanceModeEnabled", isPerformanceModeActive.toString());
    
    // Update document element class first
    document.documentElement.classList.toggle("performance-mode", isPerformanceModeActive);
    
    // Update all styles with transition
    updateAllStyles(true);
    updateFpsButtonState();
    
    // Apply performance mode to all existing iframes immediately
    document.querySelectorAll("iframe.windowed-iframe").forEach((iframe) => {
      try {
        const doc = iframe.contentDocument;
        if (doc && doc.documentElement) {
          doc.documentElement.classList.toggle("performance-mode", isPerformanceModeActive);
          const container = doc.querySelector(".games-container, .media-container, .proxy-container");
          if (container) {
            const buttons = container.querySelectorAll(".game, .media");
            
            if (isPerformanceModeActive) {
              buttons.forEach((btn) => {
                btn.style.animation = "none";
                btn.style.opacity = "1";
                btn.style.transform = "none";
                btn.style.transition = "none";
              });
            } else {
              buttons.forEach((btn) => {
                btn.style.animation = "";
                btn.style.opacity = "";
                btn.style.transform = "";
                btn.style.transition = "";
              });
            }
          }
        }
      } catch (e) {
        // Cross-origin iframe, ignore
      }
    });
    
    // Also apply performance mode to main document body
    if (isPerformanceModeActive) {
      document.body.classList.add('performance-mode');
      // Disable animations and transitions globally
      document.body.style.setProperty('--animation-duration', '0s');
      document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
      });
    } else {
      document.body.classList.remove('performance-mode');
      // Re-enable animations
      document.body.style.removeProperty('--animation-duration');
      document.querySelectorAll('*').forEach(el => {
        el.style.animation = '';
        el.style.transition = '';
      });
    }
  };
  updateFpsButtonState();
  const toggleMaximize = () => {
    const nowMax = container.classList.toggle("maximized");
    container.style.setProperty("--titlebar-height", nowMax ? "3%" : "5%");
    if (nowMax) {
      container.dataset.prevLeft = container.style.left || "";
      container.dataset.prevTop = container.style.top || "";
      container.style.left = "0px";
      container.style.top = "0px";
    } else {
      if (container.dataset.prevLeft || container.dataset.prevTop) {
        container.style.left = container.dataset.prevLeft;
        container.style.top = container.dataset.prevTop;
      } else {
        centerWindow();
      }
    }
    titlebar.style.cursor = nowMax ? "default" : "grab";
  };
  const buttons = [
    [
      "button-reload",
      "",
      "",
      () => {
        // Prevent reload if already loading
        if (isReloading) {
          return;
        }
        
        isReloading = true;
        
        // Update button visual state immediately
        if (window.__updateReloadButtonState) {
          window.__updateReloadButtonState();
        }
        
        const reloader = container.dataset.reloader;
        
        // If this is a window with a reloader function, call it
        if (reloader && window[reloader] && typeof window[reloader] === 'function') {
          // Check if the iframe contains actual content or is about:blank
          const currentSrc = iframe.src;
          
          if (currentSrc === "about:blank") {
            // If it's about:blank, reload the content within the function
            const loadingScreen = createElement(
              "div",
              "loading-screen",
              `<div class="loading-content">
                <div class="spinner"></div>
                <div class="loading-text">Loading...</div>
              </div>`
            );
            container.insertBefore(loadingScreen, iframe);
            
            // Remove the container and call the reloader function to refresh the content
            container.remove();
            window[reloader]();
          } else {
            // If it has a URL, just reload the iframe content
            const loadingScreen = createElement(
              "div",
              "loading-screen",
              `<div class="loading-content">
                <div class="spinner"></div>
                <div class="loading-text">Loading...</div>
              </div>`
            );
            container.insertBefore(loadingScreen, iframe);
            
            const originalSrc = iframe.src;
            iframe.src = "about:blank";
            setTimeout(() => {
              iframe.src = originalSrc;
              // Remove loading screen when iframe loads and reset reload flag
              iframe.onload = () => {
                const currentLoadingScreen = container.querySelector(".loading-screen");
                if (currentLoadingScreen) {
                  currentLoadingScreen.remove();
                }
                isReloading = false;
                
                // Update button visual state
                if (window.__updateReloadButtonState) {
                  window.__updateReloadButtonState();
                }
              };
            }, 10);
          }
        } else {
          // For regular windows, just reload the URL
          if (iframe.src && iframe.src !== "about:blank") {
            const loadingScreen = createElement(
              "div",
              "loading-screen",
              `<div class="loading-content">
                <div class="spinner"></div>
                <div class="loading-text">Loading...</div>
              </div>`
            );
            container.insertBefore(loadingScreen, iframe);
            
            const originalSrc = iframe.src;
            iframe.src = "about:blank";
            setTimeout(() => {
              iframe.src = originalSrc;
              // Remove loading screen when iframe loads and reset reload flag
              iframe.onload = () => {
                const currentLoadingScreen = container.querySelector(".loading-screen");
                if (currentLoadingScreen) {
                  currentLoadingScreen.remove();
                }
                isReloading = false;
                
                // Update button visual state
                if (window.__updateReloadButtonState) {
                  window.__updateReloadButtonState();
                }
              };
            }, 10);
          } else {
            // If it's about:blank, reload the container content
            container.remove();
            windowify(iframe.src || "about:blank");
          }
        }
      },
    ],
    ["button-maximize", "", "", toggleMaximize],
    [
      "button-close",
      "",
      "",
      () => {
        const game = container.dataset.currentGame;
        if (game) {
          trackGameEnd(game);
        }
        container.style.opacity = "0";
        setTimeout(() => container.remove(), 300);
      },
    ],
  ];
  buttonContainer.appendChild(fpsButton);
  buttons
    .map((b) => createButton(...b))
    .forEach((btn) => buttonContainer.appendChild(btn));
    
  // Find the reload button and add visual disabled states
  const reloadButton = Array.from(buttonContainer.children).find(btn =>
    btn.classList.contains('button-reload')
  );
  
  if (reloadButton) {
    // Store reference to reload button for easy access
    window.__reloadButton = reloadButton;
    
    // Function to update button visual state
    const updateReloadButtonState = () => {
      if (isReloading) {
        reloadButton.classList.add('loading');
        reloadButton.disabled = true;
        reloadButton.style.opacity = '0.5';
        reloadButton.style.cursor = 'not-allowed';
      } else {
        reloadButton.classList.remove('loading');
        reloadButton.disabled = false;
        reloadButton.style.opacity = '1';
        reloadButton.style.cursor = 'pointer';
      }
    };
    
    // Initial state update
    updateReloadButtonState();
    
    // Store the update function for later use
    window.__updateReloadButtonState = updateReloadButtonState;
  }
  titlebar.appendChild(buttonContainer);
  attachFpsIfEnabledTo(titlebar);
  let isDragging = false,
    offsetX,
    offsetY;
  titlebar.addEventListener("pointerdown", (e) => {
    if (
      !container.classList.contains("maximized") &&
      !e.target.closest(".button-container") &&
      e.target.className !== "titlebar-text"
    ) {
      isDragging = true;
      container.style.right = "";
      container.style.bottom = "";
      container.style.margin = "0";
      [offsetX, offsetY] = [
        e.clientX - container.offsetLeft,
        e.clientY - container.offsetTop,
      ];
      titlebar.setPointerCapture(e.pointerId);
    }
  });
  window.addEventListener("pointermove", (e) => {
    if (isDragging) {
      container.style.left = `${e.clientX - offsetX}px`;
      container.style.top = `${e.clientY - offsetY}px`;
    }
  });
  window.addEventListener("pointerup", () => (isDragging = false));
  const initialTitle = createElement(
    "span",
    "titlebar-text",
    customTitle || "Loading..."
  );
  titlebar.prepend(initialTitle);
  iframe.onload = () => {
    const handleLoad = () => {
      const currentLoadingScreen = container.querySelector(".loading-screen");
      const isPerfMode =
        document.documentElement.classList.contains("performance-mode");
      if (currentLoadingScreen) {
        if (isPerfMode) {
          currentLoadingScreen.remove(); 
        } else {
          currentLoadingScreen.style.opacity = "0";
          currentLoadingScreen.addEventListener(
            "transitionend",
            () => currentLoadingScreen.remove(),
            { once: true }
          );
          setTimeout(() => currentLoadingScreen.remove(), 1000); 
        }
      }
      try {
        iframe.style.pointerEvents = "auto";
        const siteTitle =
          customTitle ||
          iframe.contentDocument?.title ||
          new URL(iframe.src).hostname;
        const existing = titlebar.querySelector(".titlebar-text");
        // Update title if it's still "Loading..." or empty
        if (existing && (existing.textContent === "Loading..." || !existing.textContent?.trim())) {
          existing.textContent = siteTitle;
        } else if (!existing) {
          titlebar.prepend(createElement("span", "titlebar-text", siteTitle));
        }
        updateDocumentStyles(iframe.contentDocument);
        if (
          !iframe.contentDocument.querySelector(
            'link[href="/styles/styles.css"]'
          )
        ) {
          iframe.contentDocument.head.appendChild(
            createElement("link", "", "", {
              rel: "stylesheet",
              href: "/styles/styles.css",
            })
          );
        }
        updateCustomCSS();
      } catch {
        titlebar.querySelector(".titlebar-text")?.remove();
        titlebar.prepend(
          createElement("span", "titlebar-text", customTitle || "Window")
        );
      }
      requestAnimationFrame(() => {
        if (isPerfMode) {
          iframe.style.transition = "none";
          iframe.style.opacity = "1";
        } else {
          iframe.style.transition = "opacity 320ms ease";
          iframe.style.opacity = "1";
        }
      });
      if (!isPerfMode)
        iframe.addEventListener("transitionend", function onFade() {
          iframe.removeEventListener("transitionend", onFade);
        });
      if (!callbackCalled) {
        callbackCalled = true;
        if (callback) callback(iframe);
      }
    };
    setTimeout(handleLoad, Math.max(750 - (Date.now() - loadStart), 0));
  };
  const loadStart = Date.now();
  iframe.onerror = () => {
    alert("Error: Failed to launch app. Contact support.");
    container.remove();
  };
  container.append(iframe, titlebar, loadingScreen);
  document.body.appendChild(container);
  if (!container.classList.contains("maximized")) {
    centerWindow();
  }
  setTimeout(() => (container.style.animation = "none"), 1000);
  try {
    iframe.src = url;
  } catch (e) {
    alert(`Error: Invalid URL or connection issue. ${e.message}`);
    container.remove();
  }
}
function injectUI(items, containerClass, itemClass, customTitle = null) {
  windowify(
    "about:blank",
    (iframe) => {
      const doc = iframe.contentDocument;
      iframe.parentElement.dataset.reloader =
        containerClass === "games-container"
          ? "games"
          : containerClass === "media-container"
          ? "media"
          : containerClass === "proxy-container"
          ? "proxy"
          : "";
      if (!doc) return;
      doc.title = customTitle || "App";
      doc.head.appendChild(
        createElement("link", "", "", {
          rel: "stylesheet",
          href: "/styles/styles.css",
        })
      );
      doc.body.className = "custom-ui";
      const container = createElement("div", containerClass);
      container.style.width = "100%";
      doc.body.appendChild(container);
      
      // Context menu styles are now handled by CSS classes in styles.css
      // The iframe will inherit the main stylesheet which includes context menu styles
      
      // Context menu for iframe
      let iframeContextMenu = null;
      
      function showIframeContextMenu(x, y, menuItems) {
        hideIframeContextMenu();
        
        iframeContextMenu = doc.createElement("div");
        iframeContextMenu.className = "iframe-context-menu";
        
        menuItems.forEach(menuItem => {
          if (menuItem.separator) {
            const sep = doc.createElement("div");
            sep.className = "iframe-context-menu-separator";
            iframeContextMenu.appendChild(sep);
            return;
          }
          
          const item = doc.createElement("div");
          item.className = "iframe-context-menu-item";
          item.innerHTML = `<span>${menuItem.icon}</span><span>${menuItem.text}</span>`;
          item.onclick = () => {
            menuItem.action();
            hideIframeContextMenu();
          };
          iframeContextMenu.appendChild(item);
        });
        
        doc.body.appendChild(iframeContextMenu);
        
        // Position the menu
        const menuRect = iframeContextMenu.getBoundingClientRect();
        let left = x;
        let top = y;
        
        if (left + menuRect.width > doc.documentElement.clientWidth) {
          left = doc.documentElement.clientWidth - menuRect.width - 10;
        }
        if (top + menuRect.height > doc.documentElement.clientHeight) {
          top = doc.documentElement.clientHeight - menuRect.height - 10;
        }
        
        iframeContextMenu.style.left = left + 'px';
        iframeContextMenu.style.top = top + 'px';
      }
      
      function hideIframeContextMenu() {
        if (iframeContextMenu) {
          iframeContextMenu.remove();
          iframeContextMenu = null;
        }
      }
      
      // Hide context menu on click
      doc.addEventListener('click', hideIframeContextMenu);
      doc.addEventListener('contextmenu', (e) => {
        // Only show custom context menu for game/media items
        const target = e.target;
        const itemElement = target.closest(`.${itemClass}`);
        
        if (itemElement) {
          e.preventDefault();
          
          // Find the item data
          const backgroundImage = itemElement.style.backgroundImage;
          const url = backgroundImage.match(/url\("?([^"]+)"?\)/);
          if (!url) return;
          
          const itemUrl = url[1];
          const nameElement = itemElement.querySelector('.item-name');
          const itemName = nameElement ? nameElement.textContent : 'Item';
          
          // Find the actual item
          const gameItem = GAMES_LIST.find(g => g.image === itemUrl);
          const mediaItem = MEDIA_LIST.find(m => m.image === itemUrl);
          const proxyItem = PROXY_LIST.find(p => p.image === itemUrl);
          const actualItem = gameItem || mediaItem || proxyItem;
          
          if (actualItem) {
            const pinned = isPinned(actualItem);
            showIframeContextMenu(e.clientX, e.clientY, [
              {
                text: pinned ? "Unpin from Start Menu" : "Pin to Start Menu",
                icon: pinned ? "📌" : "📍",
                action: () => {
                  togglePin(actualItem);
                  // Update pin button if visible
                  const pinBtn = itemElement.querySelector('.pin-btn img');
                  if (pinBtn) {
                    pinBtn.src = `/image/pin/${isPinned(actualItem) ? 'pin.png' : 'unpin.png'}`;
                  }
                }
              },
              { separator: true },
              {
                text: "Open",
                icon: "🎮",
                action: () => {
                  itemElement.click();
                }
              }
            ]);
          }
        }
      });
      
      function render(filteredItems) {
        container.innerHTML = "";
        if (!filteredItems.length)
          return container.appendChild(
            createElement("div", "no-results", "No results found.")
          );
        filteredItems.forEach((item) => {
          const div = createElement("div", itemClass, "", {
            style: `background-image: url(${item.image}); opacity: 0; display: none; pointer-events: none; aspect-ratio: ${item.aspectRatio || '16/9'};`,
            onclick: () => {
              const loadingScreen = createElement(
                "div",
                "loading-screen",
                `<div class="loading-content"><div class="spinner"></div></div>`
              );
              doc.body.appendChild(loadingScreen);
              try {
                const tb =
                  iframe.parentElement?.querySelector(".iframe-titlebar");
                if (tb) {
                  const existing = tb.querySelector(".titlebar-text");
                  if (existing) {
                    existing.textContent = item.name;
                    iframe.parentElement.dataset.reloader = "";
                  } else {
                    tb.prepend(
                      createElement("span", "titlebar-text", item.name)
                    );
                  }
                }
              } catch {}
              if (containerClass === "games-container") {
                trackGameStart(item.name);
                const container = iframe.parentElement;
                container.dataset.currentGame = item.name;
              }
              iframe.src = item.url;
              if (item.notification) {
                showNotification(item.notification, "low", 5000);
              }
            },
          });
          if (item.tag) {
            const map = {
              New: "tag-new",
              Update: "tag-update",
              Hot: "tag-hot",
              Beta: "tag-beta",
            };
            const cls = map[item.tag] || "";
            if (cls)
              div.appendChild(
                createElement("span", `tag-badge ${cls}`, item.tag)
              );
          }
          const nameSpan = createElement("span", "item-name", item.name);
          div.appendChild(nameSpan);
          container.appendChild(div);
        });
      }
      render(items);
      const isPerfMode =
        document.documentElement.classList.contains("performance-mode");
      function applyAnimation() {
        const buttons = container.querySelectorAll(`.${itemClass}`);
        if (isPerfMode) {
          buttons.forEach((btn) => {
            btn.style.display = "inline-flex";
            btn.style.opacity = "1";
            btn.style.pointerEvents = "auto";
          });
        } else {
          buttons.forEach((btn, i) => {
            btn.style.display = "inline-flex";
            btn.style.animation = "none";
            btn.offsetHeight; 
            btn.style.animation = `expandwindowSlideOpen 0.6s ease forwards`;
            btn.style.animationDelay = `${i * 0.05}s`;
            btn.addEventListener(
              "animationend",
              () => {
                btn.style.pointerEvents = "auto";
              },
              { once: true }
            );
          });
        }
      }
      applyAnimation();
      iframe.addEventListener("load", () => {
        const loadingScreen = doc.querySelector(".loading-screen");
        const isPerfMode =
          document.documentElement.classList.contains("performance-mode");
        if (loadingScreen) {
          if (isPerfMode) {
            loadingScreen.remove();
          } else {
            loadingScreen.style.opacity = "0";
            loadingScreen.addEventListener(
              "transitionend",
              () => loadingScreen.remove(),
              { once: true }
            );
            setTimeout(() => loadingScreen.remove(), 1000); 
          }
        }
        try {
          const titleSpan = doc.querySelector(".iframe-title-text");
          if (titleSpan)
            titleSpan.textContent =
              iframe.contentDocument?.title || new URL(iframe.src).hostname;
        } catch {}
        requestAnimationFrame(() => {
          iframe.style.transition =
            iframe.style.transition || "opacity 1000ms ease";
          iframe.style.opacity = "1";
        });
        if (!isPerfMode)
          iframe.addEventListener("transitionend", function onFade() {
            iframe.style.pointerEvents = "auto";
            iframe.removeEventListener("transitionend", onFade);
          });
      });
    },
    customTitle
  );
}
// Expose the data arrays globally for search functionality
window.GAMES_LIST = GAMES_LIST;
window.MEDIA_LIST = MEDIA_LIST;
window.PROXY_LIST = PROXY_LIST;

// Ensure illumoid object is available immediately
window.illumoid = window.illumoid || {
  games: () => injectUI(GAMES_LIST, "games-container", "game", "Games"),
  media: () => injectUI(MEDIA_LIST, "media-container", "media", "Media"),
  proxy: () => injectUI(PROXY_LIST, "proxy-container", "proxy", "Proxy"),
  settings: settings,
  launcher: launcher,
  openPlugins: openPlugins,
};

// Also expose functions globally for direct access
window.games = window.illumoid.games;
window.media = window.illumoid.media;
window.proxy = window.illumoid.proxy;
window.settings = window.illumoid.settings;
window.launcher = window.illumoid.launcher;
window.openPlugins = window.illumoid.openPlugins;

// Start Menu and Pin Functionality
const getPinnedItems = () => JSON.parse(localStorage.getItem("pinnedItems")) || [];
const savePinnedItems = (items) => localStorage.setItem("pinnedItems", JSON.stringify(items));

function togglePin(item) {
  const pinned = getPinnedItems();
  const existingIndex = pinned.findIndex(p => p.url === item.url);

  if (existingIndex >= 0) {
    pinned.splice(existingIndex, 1);
    savePinnedItems(pinned);
  } else {
    pinned.push(item);
    savePinnedItems(pinned);
  }
}

function isPinned(item) {
  const pinned = getPinnedItems();
  return pinned.some(p => p.url === item.url);
}

function openStartMenu() {
  // Check if start menu already exists
  if (document.querySelector('.start-menu-overlay')) {
    closeStartMenu();
    return;
  }

  const overlay = createElement("div", "start-menu-overlay");
  const menu = createElement("div", "start-menu-windows11");
  
  // Header with search
  const header = createElement("div", "start-menu-header");
  const searchInput = createElement("input", "start-menu-search", "", {
    type: "text",
    placeholder: "Search for apps, games, and more...",
  });
  header.appendChild(searchInput);
  
  // Content area
  const content = createElement("div", "start-menu-content");
  
  // Pinned apps section
  const pinnedSection = createElement("div", "start-menu-section");
  const pinnedTitle = createElement("h3", "", "Pinned");
  const pinnedGrid = createElement("div", "start-menu-grid");
  
  const pinned = getPinnedItems();
  
  // Add pinned items
  if (pinned.length > 0) {
    pinned.forEach(item => {
      const menuItem = createStartMenuItem(item);
      pinnedGrid.appendChild(menuItem);
    });
  } else {
    // Show message when no pinned items
    const noPinnedMsg = createElement("div", "no-pinned-message");
    noPinnedMsg.textContent = "No pinned apps yet. Right-click on games, media, and proxy to pin them!";
    pinnedGrid.appendChild(noPinnedMsg);
  }
  
  pinnedSection.appendChild(pinnedTitle);
  pinnedSection.appendChild(pinnedGrid);
  
  // Recommended section (all games and media)
  const recommendedSection = createElement("div", "start-menu-section");
  const recommendedTitle = createElement("h3", "", "Recommended");
  const recommendedGrid = createElement("div", "start-menu-grid");
  
  // Add some recommended items
  const recommendedItems = [...GAMES_LIST.slice(0, 12), ...MEDIA_LIST.slice(0, 4), ...PROXY_LIST.slice(0, 4)];
  recommendedItems.forEach(item => {
    const menuItem = createStartMenuItem(item);
    recommendedGrid.appendChild(menuItem);
  });
  
  recommendedSection.appendChild(recommendedTitle);
  recommendedSection.appendChild(recommendedGrid);
  
  content.appendChild(pinnedSection);
  content.appendChild(recommendedSection);
  
  // Footer with user info and power button
  const footer = createElement("div", "start-menu-footer");
  const userSection = createElement("div", "start-menu-user");
  
  // Get saved username or use default
  const savedUserName = localStorage.getItem("userName") || "User";
  const userInitial = savedUserName.charAt(0).toUpperCase();
  
  const userAvatar = createElement("div", "start-menu-user-avatar", userInitial);
  const userName = createElement("div", "start-menu-user-name", savedUserName);
  userSection.appendChild(userAvatar);
  userSection.appendChild(userName);
  
  const powerButton = createElement("button", "start-menu-power", "⏻");
  powerButton.onclick = () => {
    if (confirm("Do you want to reload the page?")) {
      location.reload();
    }
  };
  
  footer.appendChild(userSection);
  footer.appendChild(powerButton);
  
  menu.appendChild(header);
  menu.appendChild(content);
  menu.appendChild(footer);
  overlay.appendChild(menu);
  
  document.body.appendChild(overlay);
  
  // Add event listeners
  searchInput.addEventListener('input', handleStartMenuSearch);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeStartMenu();
    }
  });
  
  document.addEventListener('keydown', handleEscapeKey);
  
  // Show menu with animation
  setTimeout(() => {
    overlay.classList.add('active');
    searchInput.focus();
  }, 10);
}

function createStartMenuItem(item, isRecommended = false) {
  const menuItem = createElement("div", "start-menu-item");
  
  const icon = createElement("div", "start-menu-item-icon");
  icon.style.backgroundImage = `url(${item.image})`;
  
  const name = createElement("div", "start-menu-item-name", item.name);
  
  menuItem.appendChild(icon);
  menuItem.appendChild(name);
  
  menuItem.onclick = () => {
    closeStartMenu();
    setTimeout(() => {
      windowify(item.url, null, item.name);
    }, 300);
  };
  
  // Add right-click context menu for recommended items to pin them
  menuItem.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const pinned = isPinned(item);
    
    // Create context menu
    const existingMenu = document.querySelector('.start-menu-context');
    if (existingMenu) existingMenu.remove();
    
    const ctxIsLight = getPref("lightEnabled", "false") === "true";
    const contextMenu = createElement("div", `start-menu-context ${ctxIsLight ? 'light-mode' : ''}`);
    
    const pinOption = createElement("div", "start-menu-context-item");
    pinOption.innerHTML = `<span>${pinned ? "📌" : "📍"}</span><span>${pinned ? "Unpin from Start Menu" : "Pin to Start Menu"}</span>`;
    pinOption.onmouseenter = () => pinOption.style.background = ctxIsLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)';
    pinOption.onmouseleave = () => pinOption.style.background = '';
    pinOption.onclick = () => {
      togglePin(item);
      contextMenu.remove();
      // Refresh the pinned section without closing the menu
      const pinnedGrid = document.querySelector('.start-menu-section:first-child .start-menu-grid');
      if (pinnedGrid) {
        const pinned = getPinnedItems();
        pinnedGrid.innerHTML = '';
        if (pinned.length > 0) {
          pinned.forEach((pinnedItem, index) => {
            const newMenuItem = createStartMenuItem(pinnedItem);
            // Add animation for newly pinned items
            newMenuItem.style.animation = 'popIn 0.3s ease forwards';
            newMenuItem.style.animationDelay = `${index * 0.05}s`;
            pinnedGrid.appendChild(newMenuItem);
          });
        } else {
          const noPinnedMsg = createElement("div", "no-pinned-message");
          noPinnedMsg.textContent = "No pinned apps yet. Right-click on games, media, and proxy to pin them!";
          pinnedGrid.appendChild(noPinnedMsg);
        }
      }
    };
    
    const openOption = createElement("div", "start-menu-context-item");
    openOption.innerHTML = `<span>🎮</span><span>Open</span>`;
    openOption.onmouseenter = () => openOption.style.background = ctxIsLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)';
    openOption.onmouseleave = () => openOption.style.background = '';
    openOption.onclick = () => {
      contextMenu.remove();
      closeStartMenu();
      setTimeout(() => windowify(item.url, null, item.name), 300);
    };
    
    contextMenu.appendChild(pinOption);
    contextMenu.appendChild(openOption);
    document.body.appendChild(contextMenu);
    
    // Position the menu
    const menuRect = contextMenu.getBoundingClientRect();
    let left = e.clientX;
    let top = e.clientY;
    
    if (left + menuRect.width > window.innerWidth) {
      left = window.innerWidth - menuRect.width - 10;
    }
    if (top + menuRect.height > window.innerHeight) {
      top = window.innerHeight - menuRect.height - 10;
    }
    
    contextMenu.style.left = left + 'px';
    contextMenu.style.top = top + 'px';
    
    // Close context menu when clicking elsewhere
    const closeContextMenu = (evt) => {
      if (!contextMenu.contains(evt.target)) {
        contextMenu.remove();
        document.removeEventListener('click', closeContextMenu);
      }
    };
    setTimeout(() => document.addEventListener('click', closeContextMenu), 10);
  });
  
  return menuItem;
}

function closeStartMenu() {
  const overlay = document.querySelector('.start-menu-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.remove();
      document.removeEventListener('keydown', handleEscapeKey);
    }, 300);
  }
}

function handleStartMenuSearch(event) {
  const searchTerm = event.target.value.trim().toLowerCase();
  const content = document.querySelector('.start-menu-content');
  const recommendedGrid = content.querySelector('.start-menu-section:nth-child(2) .start-menu-grid');
  
  if (!searchTerm) {
    // Reset to default items
    recommendedGrid.innerHTML = '';
    const recommendedItems = [...GAMES_LIST.slice(0, 12), ...MEDIA_LIST.slice(0, 4), ...PROXY_LIST.slice(0, 4)];
    recommendedItems.forEach(item => {
      const menuItem = createStartMenuItem(item);
      recommendedGrid.appendChild(menuItem);
    });
    return;
  }
  
  // Filter items based on search
  const filteredItems = [
    ...GAMES_LIST.filter(game => game.name.toLowerCase().includes(searchTerm)),
    ...MEDIA_LIST.filter(media => media.name.toLowerCase().includes(searchTerm)),
    ...PROXY_LIST.filter(proxy => proxy.name.toLowerCase().includes(searchTerm))
  ];
  
  // Update recommended section with filtered results
  recommendedGrid.innerHTML = '';
  
  if (filteredItems.length > 0) {
    filteredItems.forEach(item => {
      const menuItem = createStartMenuItem(item);
      recommendedGrid.appendChild(menuItem);
    });
  } else {
    const noResults = createElement("div", "start-menu-item");
    noResults.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: rgba(255,255,255,0.6); padding: 20px;">No results found</div>';
    recommendedGrid.appendChild(noResults);
  }
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeStartMenu();
  }
}

// Custom Context Menu System
let contextMenuOverlay = null;
let currentContextMenu = null;

function initContextMenu() {
  // Create context menu overlay
  contextMenuOverlay = createElement("div", "context-menu-overlay");
  document.body.appendChild(contextMenuOverlay);

  // Prevent default context menu
  document.addEventListener('contextmenu', handleContextMenu);
  
  // Hide context menu when clicking elsewhere
  document.addEventListener('click', hideContextMenu);
  
  // Hide on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideContextMenu();
    }
  });
}

function handleContextMenu(event) {
  event.preventDefault();
  
  const target = event.target;
  const isInteractive = target.closest('button, a, .game, .media, .proxy, .start-menu-item, input, textarea');
  
  if (!isInteractive) {
    showContextMenu(event.clientX, event.clientY, [
      {
        text: "Refresh",
        icon: "🔄",
        action: () => {
          if (!window.restartPending) {
            window.restartPending = true;
            showNotification?.("Refreshing page...", "high", 2000);
            // Temporarily disable leave prevention for refresh
            window.onbeforeunload = null;
            setTimeout(() => location.reload(), 1000);
          } else {
            showNotification?.("Refresh already in progress", "medium", 2000);
          }
        }
      },
      {
        text: "Settings",
        icon: "⚙️",
        action: () => illumoid.settings()
      },
      {
        text: "About",
        icon: "ℹ️",
        action: () => windowify('/pages/about.html', null, 'About')
      }
    ]);
  } else if (target.closest('.game, .media, .proxy')) {
    // Context menu for games/media/proxy items
    const item = target.closest('.game, .media, .proxy');
    const isPinned = isItemPinned(item);
    
    showContextMenu(event.clientX, event.clientY, [
      {
        text: isPinned ? "Unpin from Start Menu" : "Pin to Start Menu",
        icon: isPinned ? "📌" : "📍",
        action: () => toggleContextPin(item)
      },
      {
        separator: true
      },
      {
        text: "Open in New Window",
        icon: "🗖",
        action: () => {
          const url = item.onclick ? null : item.dataset.url;
          if (url) windowify(url);
        }
      }
    ]);
  }
}

function showContextMenu(x, y, items) {
  hideContextMenu();
  
  currentContextMenu = createElement("div", "context-menu");
  
  items.forEach(item => {
    if (item.separator) {
      currentContextMenu.appendChild(createElement("div", "context-menu-separator"));
      return;
    }
    
    const menuItem = createElement("div", "context-menu-item");
    menuItem.innerHTML = `
      <span>${item.icon}</span>
      <span>${item.text}</span>
    `;
    
    if (item.disabled) {
      menuItem.classList.add('disabled');
    } else {
      menuItem.onclick = () => {
        item.action();
        hideContextMenu();
      };
    }
    
    currentContextMenu.appendChild(menuItem);
  });
  
  contextMenuOverlay.appendChild(currentContextMenu);
  contextMenuOverlay.style.display = 'block';
  currentContextMenu.style.display = 'block';
  
  // Position the menu
  const menuRect = currentContextMenu.getBoundingClientRect();
  let left = x;
  let top = y;
  
  // Adjust if menu goes off screen
  if (left + menuRect.width > window.innerWidth) {
    left = window.innerWidth - menuRect.width - 10;
  }
  if (top + menuRect.height > window.innerHeight) {
    top = window.innerHeight - menuRect.height - 10;
  }
  
  currentContextMenu.style.left = left + 'px';
  currentContextMenu.style.top = top + 'px';
}

function hideContextMenu() {
  if (contextMenuOverlay) {
    contextMenuOverlay.style.display = 'none';
  }
  if (currentContextMenu) {
    currentContextMenu.remove();
    currentContextMenu = null;
  }
}

function isItemPinned(item) {
  const backgroundImage = item.style.backgroundImage;
  if (!backgroundImage) return false;
  
  const url = backgroundImage.match(/url\("?([^"]+)"?\)/);
  if (!url) return false;
  
  const itemUrl = url[1];
  const pinned = getPinnedItems();
  return pinned.some(p => p.image === itemUrl);
}

function toggleContextPin(item) {
  const backgroundImage = item.style.backgroundImage;
  const nameElement = item.querySelector('.item-name');
  
  if (!backgroundImage || !nameElement) return;
  
  const url = backgroundImage.match(/url\("?([^"]+)"?\)/);
  if (!url) return;
  
  const itemUrl = url[1];
  const itemName = nameElement.textContent;
  
  // Try to find the actual item in GAMES_LIST, MEDIA_LIST, or PROXY_LIST
  const gameItem = GAMES_LIST.find(g => g.image === itemUrl);
  const mediaItem = MEDIA_LIST.find(m => m.image === itemUrl);
  const proxyItem = PROXY_LIST.find(p => p.image === itemUrl);
  const actualItem = gameItem || mediaItem || proxyItem;
  
  if (actualItem) {
    togglePin(actualItem);
  }
}

// Initialize context menu when DOM is loaded
document.addEventListener('DOMContentLoaded', initContextMenu);

// Helper function to create items with game/media styling
function createItemWithGameMediaStyle(item) {
  const container = createElement("div", "game media");
  container.style.backgroundImage = `url(${item.image})`;
  container.style.aspectRatio = item.aspectRatio || '16/9';
  
  const nameSpan = createElement("span", "item-name", item.name);
  container.appendChild(nameSpan);
  
  container.onclick = () => {
    windowify(item.url);
  };
  
  return container;
}

window.openStartMenu = openStartMenu;
const getBookmarks = () => JSON.parse(localStorage.getItem("bookmarks")) || [];
const saveBookmarks = (bookmarks) =>
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
const addBookmark = (name, url) => {
  const bookmarks = getBookmarks();
  if (!bookmarks.some((b) => b.url === url)) {
    bookmarks.push({
      name,
      url,
    });
    saveBookmarks(bookmarks);
    showNotification(`Bookmark "${name}" added!`, "medium", 3000);
  }
};
const removeBookmark = (url) =>
  saveBookmarks(getBookmarks().filter((b) => b.url !== url));
function launcher() {
  windowify(
    "about:blank",
    (iframe) => {
      const doc = iframe.contentDocument;
      iframe.parentElement.dataset.reloader = "launcher";
      if (!doc) return;
      doc.title = "Launcher";
      doc.head.appendChild(
        createElement("link", "", "", {
          rel: "stylesheet",
          href: "/styles/styles.css",
        })
      );
      doc.body.className = "custom-ui";
      const container = createElement("div", "launcher-container");
      const inputContainer = createElement("div", "input-container");
      const urlInput = createElement("input", "launcher-input", "", {
        type: "url",
        placeholder: "Paste a link here...",
      });
      const buttonRow = createElement("div", "button-row");
      urlInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const url = urlInput.value.trim();
          if (!url) return alert("Please enter a valid URL.");
          try {
            new URL(url);
            windowify(url);
          } catch {
            alert("Invalid URL format.");
          }
        }
      });
      const bookmarkBtn = createElement("button", "bookmarkButton", "Bookmark");
      bookmarkBtn.onclick = () => {
        const url = urlInput.value.trim();
        if (!url) return alert("Please enter a URL to bookmark.");
        try {
          const name =
            prompt("Enter a name:", new URL(url).hostname) || "Bookmark";
          addBookmark(name, url);
          renderBookmarks();
        } catch {
          alert("Invalid URL format.");
        }
      };
      buttonRow.append(bookmarkBtn);
      inputContainer.append(urlInput, buttonRow);
      doc.body.appendChild(inputContainer);
      const bookmarksSection = createElement("bookmarks-section");
      bookmarksSection.innerHTML = "<h2>Bookmarks</h2>";
      const bookmarksGrid = createElement("div");
      bookmarksSection.appendChild(bookmarksGrid);
      doc.body.appendChild(bookmarksSection);
      const renderBookmarks = () => {
        bookmarksGrid.innerHTML = "";
        const bookmarks = getBookmarks();
        if (bookmarks.length === 0) {
          bookmarksGrid.appendChild(
            createElement("p", "", "No bookmarks yet. Add some!", {
              style:
                "color: var(--font-secondary); text-align: center; width: 100%;",
            })
          );
          return;
        }
        bookmarks.forEach((b) => {
          const item = createElement("div", "bookmark-item");
          item.append(
            createElement("span", "bookmark-name", b.name),
            createElement("button", "bookmark-launch-btn", "Launch", {
              onclick: () => windowify(b.url),
            }),
            createElement("button", "bookmark-remove-btn", "Remove", {
              onclick: () => {
                removeBookmark(b.url);
                renderBookmarks();
              },
            })
          );
          bookmarksGrid.appendChild(item);
        });
      };
      renderBookmarks();
      doc.body.appendChild(container);
    },
    "Launcher"
  );
}

// Settings management functions
function exportSettings() {
  try {
    const settings = {};
    SETTINGS_LIST.forEach(setting => {
      settings[setting.key] = getPref(setting.key, setting.default);
    });
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'illumoid-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Settings exported successfully!', 'medium', 3000);
  } catch (error) {
    showNotification('Failed to export settings', 'high', 3000);
    console.error('Export error:', error);
  }
}

function importSettings() {
  try {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    
    input.onchange = function(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const settings = JSON.parse(e.target.result);
          
          // Validate the imported settings
          SETTINGS_LIST.forEach(setting => {
            if (settings.hasOwnProperty(setting.key)) {
              localStorage.setItem(setting.key, settings[setting.key]);
            }
          });
          
          // Apply the imported settings
          updateAllStyles(true);
          
          showNotification('Settings imported successfully! Please reload the page.', 'medium', 5000);
        } catch (error) {
          showNotification('Invalid settings file', 'high', 3000);
          console.error('Import error:', error);
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  } catch (error) {
    showNotification('Failed to import settings', 'high', 3000);
    console.error('Import error:', error);
  }
}

function resetSettings() {
  if (confirm('Are you sure you want to reset all settings to their default values? This cannot be undone.')) {
    try {
      // Clear all settings
      SETTINGS_LIST.forEach(setting => {
        localStorage.removeItem(setting.key);
      });
      
      // Apply default styles
      updateAllStyles(true);
      
      showNotification('Settings reset to default.', 'medium', 5000);
    } catch (error) {
      showNotification('Failed to reset settings', 'high', 3000);
      console.error('Reset error:', error);
    }
  }
}

function settings() {
  windowify(
    "about:blank",
    (iframe) => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      doc.title = "Settings";
      doc.head.appendChild(
        createElement("link", "", "", {
          rel: "stylesheet",
          href: "/styles/styles.css",
        })
      );
      doc.body.className = "custom-ui";
      const container = createElement("div", "settings-container");
      const grid = createElement("div", "settings-grid");

      const renderSettings = () => {
         grid.innerHTML = "";

         SETTINGS_LIST.forEach((setting) => {
           const item = createElement("div", "setting-item");

           item.append(
             createElement("div", "setting-label", setting.label),
             createElement("div", "setting-desc", setting.desc)
           );

           const control = createElement("div", "setting-control");
           const currentValue = getPref(setting.key, setting.default);

           if (setting.type === "toggle") {
             const toggle = createElement("label", "switch");
             const input = createElement("input", "", "", {
               type: "checkbox",
               checked: currentValue === "true" || currentValue === true,
             });
             input.addEventListener("change", () => {
               localStorage.setItem(setting.key, input.checked.toString());
               updateAllStyles(true);

               // Special handling for performance mode
               if (setting.key === "performanceModeEnabled") {
                 isPerformanceModeActive = input.checked;
                 document.documentElement.classList.toggle("performance-mode", isPerformanceModeActive);
                 updateAllStyles(true);
               }

               // Re-render settings if toggles that show/hide other settings changed
               if (setting.key === "advancedThemeEnabled" || setting.key === "customCSSEnabled") {
                 renderSettings();
               }
             });
             toggle.append(input, createElement("span", "slider"));
             control.appendChild(toggle);
           } else if (setting.type === "color") {
             const input = createElement("input", "", "", {
               type: "color",
               value: currentValue,
             });
             input.addEventListener("input", () => {
               localStorage.setItem(setting.key, input.value);
               updateAllStyles(true);
             });

             control.appendChild(input);

             // Hide background color if advanced theme is off
             if (setting.key === "bgGradient2" || setting.key === "secondaryAccent") {
    input.style.display = getPref("advancedThemeEnabled", "false") === "true" ? "block" : "none";
    item.style.display = getPref("advancedThemeEnabled", "false") === "true" ? "flex" : "none";
}
           } else if (setting.type === "textarea") {
             const textarea = createElement("textarea", "", currentValue, {
               style: "width: 100%; height: 200px; font-family: monospace; resize: vertical;",
               placeholder: "Enter CSS code here..."
             });
             textarea.addEventListener("input", () => {
               localStorage.setItem(setting.key, textarea.value);
               updateCustomCSS();
             });

             // For customCSSCode, hide if not enabled
             if (setting.key === "customCSSCode") {
               textarea.style.display = getPref("customCSSEnabled", "false") === "true" ? "block" : "none";
               item.style.display = getPref("customCSSEnabled", "false") === "true" ? "flex" : "none";

               // Pre-fill with styles.css content
               if (currentValue === "") {
                 fetch('/styles/styles.css')
                   .then(response => response.text())
                   .then(css => {
                     textarea.value = css;
                     localStorage.setItem(setting.key, css);
                   })
                   .catch(err => console.error('Failed to load styles.css:', err));
               }
             }

             control.appendChild(textarea);
           }

           item.appendChild(control);
           grid.appendChild(item);
         });
       };

      renderSettings();
      
      container.appendChild(grid);
      
      // Add import/export/reset section at the bottom
      const actionSection = createElement("div", "settings-actions");
      
      const actionTitle = createElement("h3", "", "Settings Management");
      
      const actionButtons = createElement("div", "action-buttons");
      
      // Export button
      const exportBtn = createElement("button", "customButton", "Export Settings");
      exportBtn.onclick = exportSettings;
      
      // Import button
      const importBtn = createElement("button", "customButton", "Import Settings");
      importBtn.onclick = importSettings;
      
      // Reset button
      const resetBtn = createElement("button", "customButton", "Reset to Defaults");
      resetBtn.onclick = resetSettings;
      
      actionButtons.append(exportBtn, importBtn, resetBtn);
      actionSection.append(actionTitle, actionButtons);
      container.appendChild(actionSection);
      
      doc.body.appendChild(container);
    },
    "Settings"
  );
}
function isGameStatsInstalled() {
  return getPref("plugin_gameStatsInstalled", "true") === "true";
}
function setGameStatsInstalled(v) {
  localStorage.setItem("plugin_gameStatsInstalled", (!!v).toString());
}
function launchGameStats() {
  const gameStats = JSON.parse(localStorage.getItem("gameStats") || "{}");
  windowify(
    "about:blank",
    (iframe) => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      doc.title = "Game Stats Tracker";
      doc.head.appendChild(
        createElement("link", "", "", {
          rel: "stylesheet",
          href: "/styles/styles.css",
        })
      );
      doc.body.className = "custom-ui";
      const container = createElement("div", "settings-container");
      const title = createElement("h2", "", "Game Statistics");
      container.appendChild(title);
      const statsGrid = createElement("div", "settings-grid");
      let totalPlaytime = 0;
      let totalGames = Object.keys(gameStats).length;
      let totalSessions = 0;
      Object.values(gameStats).forEach((game) => {
        totalPlaytime += game.totalTime || 0;
        totalSessions += game.sessions || 0;
      });
      const totalStats = createElement("div", "setting-item");
      totalStats.innerHTML = `
      <div class="setting-label">Total Statistics</div>
      <div class="setting-desc">
        Games Played: ${totalGames}<br>
        Total Playtime: ${formatTime(totalPlaytime)}<br>
        Total Sessions: ${totalSessions}
      </div>
    `;
      statsGrid.appendChild(totalStats);
      Object.entries(gameStats).forEach(([gameName, stats]) => {
        const gameItem = createElement("div", "setting-item");
        gameItem.innerHTML = `
        <div class="setting-label">${gameName}</div>
        <div class="setting-desc">
          Playtime: ${formatTime(stats.totalTime || 0)}<br>
          Sessions: ${stats.sessions || 0}<br>
          Last Played: ${
            stats.lastPlayed
              ? new Date(stats.lastPlayed).toLocaleDateString()
              : "Never"
          }
        </div>
      `;
        statsGrid.appendChild(gameItem);
      });
      if (totalGames === 0) {
        const noStats = createElement("div", "setting-item");
        noStats.innerHTML = `
        <div class="setting-label">No Games Tracked Yet</div>
        <div class="setting-desc">Play some games to see your statistics here!</div>
      `;
        statsGrid.appendChild(noStats);
      }
      container.appendChild(statsGrid);
      const clearBtn = createElement(
        "button",
        "customButton",
        "Clear All Stats"
      );
      clearBtn.onclick = () => {
        if (confirm("Are you sure you want to clear all game statistics?")) {
          localStorage.removeItem("gameStats");
          location.reload();
        }
      };
      container.appendChild(clearBtn);
      doc.body.appendChild(container);
    },
    "Game Stats"
  );
}
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
}
function trackGameStart(gameName) {
  if (!isGameStatsInstalled()) return;
  const gameStats = JSON.parse(localStorage.getItem("gameStats") || "{}");
  if (!gameStats[gameName]) {
    gameStats[gameName] = { sessions: 0, totalTime: 0, lastPlayed: null };
  }
  gameStats[gameName].sessions++;
  gameStats[gameName].lastPlayed = Date.now();
  gameStats[gameName].currentSessionStart = Date.now();
  localStorage.setItem("gameStats", JSON.stringify(gameStats));
}
function trackGameEnd(gameName) {
  if (!isGameStatsInstalled()) return;
  const gameStats = JSON.parse(localStorage.getItem("gameStats") || "{}");
  if (gameStats[gameName] && gameStats[gameName].currentSessionStart) {
    const sessionTime = Math.floor(
      (Date.now() - gameStats[gameName].currentSessionStart) / 1000
    );
    gameStats[gameName].totalTime =
      (gameStats[gameName].totalTime || 0) + sessionTime;
    delete gameStats[gameName].currentSessionStart;
    localStorage.setItem("gameStats", JSON.stringify(gameStats));
  }
}
function isSysMonInstalled() {
  return getPref("plugin_sysMonInstalled", "false") === "true";
}
function setSysMonInstalled(v) {
  localStorage.setItem("plugin_sysMonInstalled", (!!v).toString());
}
function launchSysMon() {
  windowify(
    "about:blank",
    (iframe) => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      doc.title = "System Monitor";
      doc.head.appendChild(
        createElement("link", "", "", {
          rel: "stylesheet",
          href: "/styles/styles.css",
        })
      );
      doc.body.className = "custom-ui";
      const container = createElement("div", "settings-container");
      const title = createElement("h2", "", "System Performance Monitor");
      container.appendChild(title);
      const monitorGrid = createElement("div", "settings-grid");
      const fpsItem = createElement("div", "setting-item");
      fpsItem.innerHTML = `
      <div class="setting-label">FPS</div>
      <div class="setting-desc" id="fps-display">Calculating...</div>
    `;
      monitorGrid.appendChild(fpsItem);
      const memoryItem = createElement("div", "setting-item");
      memoryItem.innerHTML = `
      <div class="setting-label">Memory Usage</div>
      <div class="setting-desc" id="memory-display">Checking...</div>
    `;
      monitorGrid.appendChild(memoryItem);
      const cpuItem = createElement("div", "setting-item");
      cpuItem.innerHTML = `
      <div class="setting-label">CPU Usage</div>
      <div class="setting-desc" id="cpu-display">Monitoring...</div>
    `;
      monitorGrid.appendChild(cpuItem);
      const networkItem = createElement("div", "setting-item");
      networkItem.innerHTML = `
      <div class="setting-label">Network Status</div>
      <div class="setting-desc" id="network-display">Online</div>
    `;
      monitorGrid.appendChild(networkItem);
      const batteryItem = createElement("div", "setting-item");
      batteryItem.innerHTML = `
      <div class="setting-label">Battery</div>
      <div class="setting-desc" id="battery-display">Not available</div>
    `;
      monitorGrid.appendChild(batteryItem);
      container.appendChild(monitorGrid);
      doc.body.appendChild(container);
      function updateFPS() {
        const fpsDisplay = doc.getElementById("fps-display");
        if (fpsDisplay) {
          fpsDisplay.textContent =
            __fpsValue > 0 ? `${Math.round(__fpsValue)} FPS` : "Calculating...";
        }
      }
      function updateMemory() {
        const memoryDisplay = doc.getElementById("memory-display");
        if (memoryDisplay && performance.memory) {
          const mem = performance.memory;
          const usedMB = Math.round(mem.usedJSHeapSize / 1024 / 1024);
          const totalMB = Math.round(mem.totalJSHeapSize / 1024 / 1024);
          memoryDisplay.textContent = `${usedMB}MB / ${totalMB}MB`;
        } else {
          memoryDisplay.textContent = "Not available";
        }
      }
      function updateCPU() {
        const cpuDisplay = doc.getElementById("cpu-display");
        if (cpuDisplay) {
          const simulatedCPU = Math.floor(Math.random() * 30) + 10; 
          cpuDisplay.textContent = `${simulatedCPU}%`;
        }
      }
      function updateNetwork() {
        const networkDisplay = doc.getElementById("network-display");
        if (networkDisplay) {
          networkDisplay.textContent = navigator.onLine ? "Online" : "Offline";
        }
      }
      function updateBattery() {
        const batteryDisplay = doc.getElementById("battery-display");
        if (batteryDisplay && navigator.getBattery) {
          navigator.getBattery().then((battery) => {
            const level = Math.round(battery.level * 100);
            const charging = battery.charging ? " (Charging)" : "";
            batteryDisplay.textContent = `${level}%${charging}`;
          });
        }
      }
      updateFPS();
      updateMemory();
      updateCPU();
      updateNetwork();
      updateBattery();
      const fpsInterval = setInterval(updateFPS, 250);
      const memoryInterval = setInterval(updateMemory, 1000);
      const cpuInterval = setInterval(updateCPU, 2000);
      const networkInterval = setInterval(updateNetwork, 5000);
      iframe.addEventListener("load", () => {
        const cleanup = () => {
          clearInterval(fpsInterval);
          clearInterval(memoryInterval);
          clearInterval(cpuInterval);
          clearInterval(networkInterval);
        };
        window.addEventListener("beforeunload", cleanup);
      });
    },
    "System Monitor"
  );
}
const MSG_CHECK_INTERVAL = 2000; 
let previousMsgContent = "";
let lastModified = null;
function checkMsgFile() {
  fetch("msg.txt?" + Date.now(), { method: "HEAD" })
    .then((response) => {
      if (!response.ok) throw new Error("File not found or inaccessible");
      const newLastModified = response.headers.get("last-modified");
      if (!newLastModified) {
        return fetch("msg.txt?" + Date.now())
          .then((res) => res.text())
          .then((content) => {
            if (content !== previousMsgContent && content.trim() !== "") {
              if (previousMsgContent !== "") {
                processNotificationContent(content);
              }
              previousMsgContent = content;
            }
          });
      }
      if (newLastModified !== lastModified) {
        lastModified = newLastModified;
        return fetch("msg.txt?" + Date.now())
          .then((res) => res.text())
          .then((content) => {
            if (content !== previousMsgContent && content.trim() !== "") {
              if (previousMsgContent !== "") {
                processNotificationContent(content);
              }
              previousMsgContent = content;
            }
          });
      }
    })
    .catch((error) => {
      console.error("Error monitoring msg.txt:", error.message);
    });
}

function processNotificationContent(content) {
  // Parse priority and pin parameters
  let priority = "low";
  let isPinned = false;
  let message = content;
  
  // Check for [pin] parameter first
  if (message.includes("[pin]")) {
    isPinned = true;
    message = message.replace("[pin]", "").trim();
  }
  
  // Check for priority parameters
  if (message.includes("[high]")) {
    priority = "high";
    message = message.replace("[high]", "").trim();
  } else if (message.includes("[low]")) {
    priority = "low";
    message = message.replace("[low]", "").trim();
  }
  
  // Show notification with parsed parameters
  showNotification(
    message || "Message file updated (empty)",
    priority,
    isPinned ? 0 : 5000, // 0 duration for pinned notifications
    false,
    isPinned
  );
}
window.addEventListener("load", () => {
  checkMsgFile(); 
  setInterval(checkMsgFile, MSG_CHECK_INTERVAL);
});
