var logo = null;
var maxTilt = 22,
  persp = 222,
  raf = null,
  curX = 0,
  curY = 0,
  logoClickSpin = 0;

// Initialize logo element
function initLogo() {
   logo = document.querySelector(".svgLogo");
   if (logo) {
     updateLogoInteraction();
     let spinDuration = 4.0;
     logo.addEventListener('click', () => {
       logoClickSpin += 360;
       logo.style.transition = `transform ${spinDuration}s cubic-bezier(0.25, 1, 0.5, 1)`;
       updateLogoTransform();
     });
   } else {
     // Use MutationObserver instead of polling
     const observer = new MutationObserver(() => {
       logo = document.querySelector(".svgLogo");
       if (logo) {
         observer.disconnect();
         updateLogoInteraction();
         let spinDuration = 4.0;
         logo.addEventListener('click', () => {
           logoClickSpin += 360;
           logo.style.transition = `transform ${spinDuration}s cubic-bezier(0.25, 1, 0.5, 1)`;
           updateLogoTransform();
         });
       }
     });
     observer.observe(document.body, { childList: true, subtree: true });
   }
}

function updateLogoTransform() {
    if (!logo) return;
    logo.style.transform = `perspective(${persp}px) rotateX(${curX.toFixed(2)}deg) rotateY(${curY.toFixed(2)}deg) rotateZ(${logoClickSpin}deg)`;
}

function onMove(e) {
  if (!logo) return;
  // Remove transition during mouse move for smooth tracking
  logo.style.transition = '';
  const r = logo.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  let dx = (e.clientX - cx) / (r.width / 2);
  let dy = (e.clientY - cy) / (r.height / 2);
  dx = Math.max(-1, Math.min(1, dx));
  dy = Math.max(-1, Math.min(1, dy));
  const tx = -dy * maxTilt;
  const ty = dx * maxTilt;
  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    curX += (tx - curX) * 0.18;
    curY += (ty - curY) * 0.18;
    updateLogoTransform();
  });
}
function resetLogoTransform() {
  if (!logo) return;
  if (raf) cancelAnimationFrame(raf);
  raf = null;
  curX = curY = 0;
  logo.style.transition = 'transform 0.3s ease-out';
  updateLogoTransform();
}
function updateLogoInteraction() {
  if (!logo) {
    // Try to find logo again
    logo = document.querySelector(".svgLogo");
    if (!logo) return;
  }
  
  const isPerformanceMode = localStorage.getItem("performanceModeEnabled") === "true";
  const hasFinePointer = window.matchMedia("(pointer:fine)").matches;
  window.removeEventListener("mousemove", onMove);
  window.removeEventListener("mouseleave", resetLogoTransform);
  if (!isPerformanceMode && hasFinePointer) {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", resetLogoTransform);
  } else {
    resetLogoTransform();
  }
}

// Manual performance mode toggle function
window.togglePerformanceMode = function() {
  const isCurrentlyEnabled = localStorage.getItem("performanceModeEnabled") === "true";
  const newState = !isCurrentlyEnabled;
  
  localStorage.setItem("performanceModeEnabled", newState.toString());
  updateLogoInteraction();
  
  if (typeof showNotification === 'function') {
    showNotification(`Performance mode ${newState ? 'enabled' : 'disabled'}`, 'medium', 2000);
  }
  
  // Apply or remove performance mode class to body and document element
  if (newState) {
    document.body.classList.add('performance-mode');
    document.documentElement.classList.add('performance-mode');
    document.body.classList.add('performance-mode-animations');
    document.documentElement.classList.add('performance-mode-animations');
    
    // Apply to all iframes
    document.querySelectorAll('iframe.windowed-iframe').forEach(iframe => {
      try {
        const doc = iframe.contentDocument;
        if (doc && doc.documentElement) {
          doc.documentElement.classList.add('performance-mode');
          doc.body.classList.add('performance-mode');
          doc.documentElement.classList.add('performance-mode-animations');
          doc.body.classList.add('performance-mode-animations');
        }
      } catch (e) {
        // Cross-origin iframe, ignore
      }
    });
  } else {
    document.body.classList.remove('performance-mode');
    document.documentElement.classList.remove('performance-mode');
    document.body.classList.remove('performance-mode-animations');
    document.documentElement.classList.remove('performance-mode-animations');
    
    // Remove from all iframes
    document.querySelectorAll('iframe.windowed-iframe').forEach(iframe => {
      try {
        const doc = iframe.contentDocument;
        if (doc && doc.documentElement) {
          doc.documentElement.classList.remove('performance-mode');
          doc.body.classList.remove('performance-mode');
          doc.documentElement.classList.remove('performance-mode-animations');
          doc.body.classList.remove('performance-mode-animations');
        }
      } catch (e) {
        // Cross-origin iframe, ignore
      }
    });
  }
  
  return newState;
}
function updateColors() {
  const root = document.documentElement;
  const cs = getComputedStyle(root);
  const hex = cs.getPropertyValue("--primary-accent").trim();
  if (!hex) return;
  const v = parseInt(hex.slice(1), 16);
  const r = (v >> 16) & 255;
  const g = (v >> 8) & 255;
  const b = v & 255;
  root.style.setProperty("--taskbar-bg", `rgba(${r},${g},${b},0.25)`);
}
// CSS moved to styles.css - keyframes and animations are now defined there
// Initialize onboarding system
function initOnboarding() {
  // Force show onboarding by removing the completion flag temporarily
  // localStorage.removeItem("onboardingDone"); // Uncomment to force show tutorial

  if (localStorage.getItem("onboardingCompleted")) return;

  const btns = Array.from(document.querySelectorAll(".taskbarButton"));
  if (btns.length < 8) {
    // Use MutationObserver instead of polling
    const observer = new MutationObserver(() => {
      const currentBtns = Array.from(document.querySelectorAll(".taskbarButton"));
      if (currentBtns.length >= 8) {
        observer.disconnect();
        initOnboarding();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return;
  }
  
  const steps = [
    { el: btns[0], title: "Start Menu", text: "This is the start menu, you can search and launch your favorited apps." },
    { el: btns[1], title: "Games", text: "Browse and launch games here." },
    { el: btns[2], title: "Media", text: "Find media and other streaming sites here." },
    { el: btns[3], title: "Unblocked Proxy", text: "Open the unblocked search engine (Doge Unblocker)." },
    { el: btns[4], title: "Chat", text: "Talk to other users of Illumoid OS here!" },
    { el: btns[5], title: "Settings", text: "Customize theme colors and other options." },
    { el: btns[6], title: "Launcher", text: "Quick access to custom apps and links." },
    { el: btns[7], title: "Plugins", text: "Addons to extend the functionality of Illumoid OS." },
    btns[8] ? { el: btns[8], title: "About", text: "About Illumoid OS." } : null,
  ].filter(Boolean);
  
  const overlay = document.createElement("div");
  overlay.className = "tour-overlay";
  // Tour overlay styling moved to CSS - .tour-overlay class
  
  const tip = document.createElement("div");
  tip.className = "tour-tip";
  
  const titleEl = document.createElement("h4");
  titleEl.className = "tour-title";
  
  const textEl = document.createElement("div");
  textEl.className = "tour-text";
  
  const inputContainer = document.createElement("div");
  
  const usernameInput = document.createElement("input");
  usernameInput.type = "text";
  usernameInput.placeholder = "Enter your name...";
  usernameInput.className = "tour-input";
  
  const actions = document.createElement("div");
  actions.className = "tour-actions";
  
  const skip = document.createElement("button");
  skip.className = "tour-btn tour-skip";
  skip.textContent = "Skip";
  
  const next = document.createElement("button");
  next.className = "tour-btn";
  next.textContent = "Next";
  
  actions.append(skip, next);
  inputContainer.appendChild(usernameInput);
  tip.append(titleEl, textEl, inputContainer, actions);
  overlay.appendChild(tip);
  document.body.appendChild(overlay);
  
  let i = 0;
  let inWelcome = true;
  let inThanks = false;
  let ranTitlebarTour = false;
  
  function triggerAnim() {
    // Reset animation state
    tip.style.animation = "none";
    tip.style.opacity = "0";
    tip.style.transform = "scale(0.9) translateY(20px)";
    
    setTimeout(() => {
      tip.style.animation = "tipIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards";
      tip.style.opacity = "1";
      tip.style.transform = "scale(1) translateY(0)";
    }, 50);
  }
  
  function place() {
    const s = steps[i];
    if (!s) return done();
    document.querySelectorAll(".tour-highlight").forEach(el => el.classList.remove("tour-highlight"));
    s.el.classList.add("tour-highlight");
    inputContainer.style.display = "none";
    
    // Remove centering for tutorial steps
    overlay.style.display = "block";
    overlay.style.alignItems = "";
    overlay.style.justifyContent = "";
    tip.classList.remove("tour-centered");
    tip.style.transform = "";
    
    // Wait for layout to settle before positioning
    setTimeout(() => {
      const anchor = s.el.closest(".container-window")?.querySelector(".button-reload") || s.el;
      const r = anchor.getBoundingClientRect();
      const pad = 15;
      const tooltipHeight = 200; // Estimated tooltip height
      
      // Position above the button first
      let top = r.top - tooltipHeight - pad;
      let left = r.left + (r.width - 300) / 2; // 300px is the fixed tooltip width
      
      // Ensure horizontal bounds
      left = Math.max(10, Math.min(window.innerWidth - 310, left));
      
      // If it goes off the top, position below
      if (top < 10) {
        top = r.bottom + pad;
      }
      
      tip.style.top = top + "px";
      tip.style.left = left + "px";
      
      // Update text content after positioning but before animation
      titleEl.textContent = s.title;
      textEl.textContent = s.text;
      
      triggerAnim();
    }, 100);
    
    next.textContent = i === steps.length - 1 ? "Done" : "Next";
    
    // Animation is now handled by CSS .tour-highlight class
  }
  
  function showWelcome() {
    btns.forEach(b => {
      b.classList.remove("tour-highlight");
    });
    titleEl.textContent = "Welcome User!";
    textEl.textContent = "Please enter your user name to get started:";
    inputContainer.style.display = "block";
    next.textContent = "Continue";
    
    // Center the welcome screen
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    
    tip.classList.add("tour-centered");
    
    triggerAnim();
    setTimeout(() => usernameInput.focus(), 300);
  }
  
  function showThanks() {
    inThanks = true;
    btns.forEach(b => {
      b.classList.remove("tour-highlight");
    });
    titleEl.textContent = "Thank You";
    const userName = usernameInput.value.trim() || "User";
    textEl.textContent = `That's all the current features for now, ${userName}. Thank you for using Illumoid OS!`;
    inputContainer.style.display = "none";
    next.textContent = "Finish";
    
    // Center the thanks screen
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    
    tip.classList.add("tour-centered");
    tip.style.top = "";
    tip.style.left = "";
    tip.style.transform = "";
    
    triggerAnim();
  }
  
  function nextStep() {
    if (inWelcome) {
      const userName = usernameInput.value.trim();
      if (userName) {
        localStorage.setItem("userName", userName);
      }
      inWelcome = false; 
      i = 0; 
      place(); 
      return; 
    }
    if (inThanks) { done(); return; }
    i++;
    if (i >= steps.length) { showThanks(); return; }
    if (steps[i - 1]?.title === "About" && !ranTitlebarTour) {
      ranTitlebarTour = true;
      try { games?.(); window.illumoid?.games?.(); } catch (e) {}
      const tryInsert = () => {
        const container = document.querySelector(".container-window");
        if (!container) return setTimeout(tryInsert, 50);
        const reload = container.querySelector(".button-reload");
        const maximize = container.querySelector(".button-maximize");
        const close = container.querySelector(".button-close");
        if (!reload || !maximize || !close) return setTimeout(tryInsert, 50);
        steps.splice(i, 0,
          { el: reload, title: "Reload", text: "Reload the content/webpage." },
          { el: maximize, title: "Maximize", text: "Toggle fullscreen." },
          { el: close, title: "Close", text: "Close the window." }
        );
        setTimeout(place, 300);
      };
      tryInsert();
      return;
    }
    place();
  }
  
  function done() {
    localStorage.setItem("onboardingCompleted", "1");
    document.querySelectorAll(".tour-highlight").forEach(el => {
      el.classList.remove("tour-highlight");
    });
    tip.style.opacity = "0";
    tip.style.transform = "scale(0.9)";
    overlay.style.opacity = "0";
    setTimeout(() => {
      tip.remove();
      overlay.remove();
    }, 300);
  }
  
  skip.onclick = done;
  next.onclick = nextStep;
  
  // Allow Enter key to proceed from username input
  usernameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      nextStep();
    }
  });
  
  window.addEventListener("resize", () => { if (!inWelcome && !inThanks) place(); if (inThanks) showThanks(); });
  showWelcome();
}

// Start onboarding when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initOnboarding();
    initLogo();
  });
} else {
  initOnboarding();
  initLogo();
}
document.querySelectorAll("button").forEach(b => {
  b.draggable = false;
  b.style.userSelect = "none";
  b.blur();
});
const gamesButton = document.querySelector("#taskbarButton");
if (gamesButton) {
  gamesButton.style.pointerEvents = "none";
  setTimeout(() => gamesButton.style.pointerEvents = "", 1000);
}
window.addEventListener("load", () => {
  // Initialize logo interaction
  initLogo();
  
  fetch(location.href, { method: "HEAD", cache: "no-cache" })
    .then(res => {
      const lastMod = res.headers.get("last-modified");
      if (!lastMod) return;
      const stored = localStorage.getItem("siteLastModified");
      if (stored && stored !== lastMod) {
        if (typeof showNotification === "function") showNotification("Site updated! Reloading...", "medium", 5000);
        localStorage.setItem("siteLastModified", lastMod);
        setTimeout(() => location.reload(true), 1200);
      } else if (!stored) {
        localStorage.setItem("siteLastModified", lastMod);
      }
    })
    .catch(console.error);
});
let typedCheatKeys = "";
let restartPending = false;
let restartTriggered = false;
// Expose restartPending globally for context menu access
window.restartPending = restartPending;
window.addEventListener("keydown", e => {
  if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
  typedCheatKeys += e.key.toLowerCase();
  if (typedCheatKeys.length > 20) typedCheatKeys = typedCheatKeys.slice(-20);
  if (typedCheatKeys.endsWith("goonpatch") && typeof windowify === "function") {
    windowify("/pages/dpgc.html", null, "Dispatch Goon Corner");
    typedCheatKeys = "";
  }
});
let lastMsgContent = localStorage.getItem('lastNotification') || "";
let lastImageContent = "";
let lastUrlContent = "";
let msgCheckInterval = null;
let activeEffects = new Set();
let activeIntervals = new Map();

// Expose activeEffects globally for other scripts to check
window.activeEffects = activeEffects;
let lastLiveStatus = localStorage.getItem('lastLiveStatus') || "";
let liveEventUserChoice = localStorage.getItem('liveEventUserChoice') || "";
let eventTriggered = false;
let initialCountdownDiff = 0;
let strikeShakeInterval = null;
let eventStarted = false;
function clearAllActiveEffects() {
  activeIntervals.forEach(fn => fn());
  activeIntervals.clear();
  activeEffects.clear();
}

function showLiveEventPopup() {
  // Check if popup already exists
  if (document.getElementById('live-event-popup')) return;
  
  const popup = document.createElement('div');
  popup.id = 'live-event-popup';
  popup.className = 'live-event-popup';
  
  const content = document.createElement('div');
  content.className = 'live-event-content';
  
  const title = document.createElement('h3');
  title.className = 'live-event-title';
  title.textContent = 'Live Event!';
  
  const message = document.createElement('p');
  message.className = 'live-event-message';
  message.textContent = 'A live event is currently happening right now! You can choose to participate or disable these notifications. If you choose to participate, expect to have your windows closed and other screen elements griefed.';
  
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'live-event-button-container';
  
  const acceptBtn = document.createElement('button');
  acceptBtn.className = 'live-event-btn accept';
  acceptBtn.textContent = 'Accept';
  
  const disableBtn = document.createElement('button');
  disableBtn.className = 'live-event-btn disable';
  disableBtn.textContent = 'Disable';
  
  acceptBtn.onclick = () => {
    localStorage.setItem('liveEventUserChoice', 'accepted');
    localStorage.setItem('lastLiveStatus', 'live');
    document.body.removeChild(popup);
  };
  
  disableBtn.onclick = () => {
    localStorage.setItem('liveEventUserChoice', 'disabled');
    localStorage.setItem('lastLiveStatus', 'live');
    document.body.removeChild(popup);
  };
  
  buttonContainer.appendChild(acceptBtn);
  buttonContainer.appendChild(disableBtn);
  
  content.appendChild(title);
  content.appendChild(message);
  content.appendChild(buttonContainer);
  popup.appendChild(content);
  
  document.body.appendChild(popup);
  
  // Add animation
  setTimeout(() => {
    content.classList.add('show');
  }, 10);
}
function showImageModal(url) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'image-modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'image-modal-content';
    
    const img = document.createElement('img');
    img.src = url;
    img.className = 'image-modal-img';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'image-modal-close';
    closeButton.textContent = '×';
    
    modalContent.appendChild(img);
    modalContent.appendChild(closeButton);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    const closeModal = () => {
        document.body.removeChild(modalOverlay);
    };
    
    closeButton.onclick = closeModal;
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}
async function checkMsgFile() {
  try {
    const res = await fetch("/msg.txt?t=" + Date.now(), { cache: "no-cache" });
    if (!res.ok) return;
    const text = (await res.text()).trim();
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    const notifLine = lines[0] || "";
    const eventLine = lines[1] || "";
    const imageLine = lines[2] || "";
    const urlLine = lines[3] || "";
    const liveLine = lines[4] || "";
    
    if (notifLine && !notifLine.includes("-") && notifLine !== lastMsgContent) {
      let msg = notifLine;
      let pri = "low";
      let isPinned = false;
      const m = notifLine.match(/^\[(high|medium|low|pin)\]\s*(.+)/i);
      if (m) {
        pri = m[1].toLowerCase();
        msg = m[2];
        if (pri === "pin") {
          isPinned = true;
          pri = "low";
        }
      }
      if (typeof showNotification === "function") showNotification(msg, pri, 8000, true, isPinned);
      lastMsgContent = notifLine;
      localStorage.setItem('lastNotification', notifLine);
    }
    // Check if user has disabled live events
    const userLiveChoice = localStorage.getItem('liveEventUserChoice');
    const isLiveEventDisabled = userLiveChoice === 'disabled';
    
    // Check if popup is currently showing (waiting for user choice)
    const isPopupShowing = document.getElementById('live-event-popup') !== null;
    
    // Skip events processing if user disabled live events, popup is showing, OR if event line contains "-"
    if (eventLine && !eventLine.includes("-") && !isLiveEventDisabled && !isPopupShowing) {
      processSystemEvents(eventLine);
    }

    // Check for event in the 6th line
    if (lines[5] && lines[5].toLowerCase() === "event" && !eventTriggered && !isLiveEventDisabled && !isPopupShowing) {
      processSystemEvents("event");
    }
    
    // Skip image processing if user disabled live events, popup is showing, OR if image line contains "-"
    if (imageLine && imageLine !== lastImageContent && !isLiveEventDisabled && !isPopupShowing && !imageLine.includes("-")) {
        const isImage = /\.(jpg|jpeg|png|gif|webp|ico)$/i.test(imageLine);
        if (isImage) {
            showImageModal(imageLine);
        }
        lastImageContent = imageLine;
    } else if (imageLine && imageLine !== lastImageContent) {
        // Update lastImageContent even if we don't show the image
        lastImageContent = imageLine;
    }
    
    // Skip URL processing if user disabled live events, popup is showing, OR if URL line contains "-"
    if (urlLine && urlLine !== lastUrlContent && !isLiveEventDisabled && !isPopupShowing && !urlLine.includes("-")) {
        if (typeof windowify === "function") {
            windowify(urlLine);
        }
        lastUrlContent = urlLine;
    } else if (urlLine && urlLine !== lastUrlContent) {
        // Update lastUrlContent even if we don't open the link
        lastUrlContent = urlLine;
    }
    
    // Handle live event popup logic
    const currentLiveStatus = liveLine.toLowerCase();
    
    if (currentLiveStatus === "live") {
      // Live event is active
      if (lastLiveStatus !== "live") {
        // Live event just started or returned
        const userChoice = localStorage.getItem('liveEventUserChoice');
        
        if (userChoice !== 'accepted' && userChoice !== 'disabled') {
          // User hasn't made a choice yet, show popup
          showLiveEventPopup();
        }
        // If user already made a choice, respect it (don't show popup again)
      }
      localStorage.setItem('lastLiveStatus', 'live');
      lastLiveStatus = 'live';
    } else {
      // No live event or live event ended
      if (lastLiveStatus === "live" && currentLiveStatus !== "live") {
        // Live event just ended, reset user choice so popup can appear again when live comes back
        localStorage.removeItem('liveEventUserChoice');
        localStorage.setItem('lastLiveStatus', currentLiveStatus);
        lastLiveStatus = currentLiveStatus;
      } else if (lastLiveStatus !== "live") {
        // Still no live event, update status
        localStorage.setItem('lastLiveStatus', currentLiveStatus);
        lastLiveStatus = currentLiveStatus;
      }
    }
  } catch (e) {
    console.error("msg.txt check failed:", e);
  }
}
function processSystemEvents(line) {
  if (!line || line.toLowerCase() === "none" || line.includes("-")) {
    clearAllActiveEffects();
    return;
  }
  const incoming = line.toLowerCase().split(",").map(s => s.trim()).filter(Boolean);
  const incomingSet = new Set(incoming);
  for (const effect of [...activeEffects]) {
    if (!incomingSet.has(effect)) {
      const cleanup = activeIntervals.get(effect);
      if (cleanup) cleanup();
      activeIntervals.delete(effect);
      activeEffects.delete(effect);
      
      // Reset restartPending and restartTriggered when restart effect is removed
      if (effect === "restart") {
        restartPending = false;
        restartTriggered = false;
        window.restartPending = false;
      }
    }
  }
  const newOnes = incoming.filter(e => !activeEffects.has(e));
  activeEffects = new Set([...activeEffects, ...incoming]);
  const handlers = {
    "performance-mode"() {
      localStorage.setItem("performanceModeEnabled", "true");
      updateLogoInteraction();
      showNotification?.("Performance mode activated by admin", "medium", 3000);
    },
    restart() { 
      if (!restartPending) {
        restartPending = true;
        window.restartPending = true;
        if (!restartTriggered) {
          restartTriggered = true;
          showNotification?.("Restarting...", "high", 2000); 
          setTimeout(() => location.reload(), 2000);
        }
      }
    },
    maintenance() { showNotification?.("Maintenance mode", "medium"); },
    emergency() {
      showNotification?.("EMERGENCY", "high", 10000);
      document.body.classList.add('background-red');
      setTimeout(() => document.body.classList.remove('background-red'), 10000);
    },
    lockdown() {
      document.querySelectorAll("button, a, input").forEach(el => {
        el.classList.add('pointer-events-none', 'opacity-half');
      });
    },
    unlock() {
      document.querySelectorAll("button, a, input").forEach(el => {
        el.classList.remove('pointer-events-none', 'opacity-half');
      });
    },
    "theme-dark"() {
      document.documentElement.style.setProperty("--bg-gradient-1", "#1a1a1a");
      document.documentElement.style.setProperty("--bg-gradient-2", "#2d2d2d");
      document.documentElement.style.setProperty("--primary-accent", "#4a9eff");
    },
    "theme-light"() {
      document.documentElement.style.setProperty("--bg-gradient-1", "#ffffff");
      document.documentElement.style.setProperty("--bg-gradient-2", "#f0f0f0");
      document.documentElement.style.setProperty("--primary-accent", "#007bff");
    },
    "clear-cache"() {
      localStorage.clear();
      sessionStorage.clear();
      showNotification?.("Cache cleared", "medium", 3000);
    },
    alert() {
      const div = document.createElement("div");
      Object.assign(div.style, {
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        background: "red", color: "white", padding: "20px", borderRadius: "10px",
        fontSize: "24px", fontWeight: "bold", zIndex: 10000
      });
      div.textContent = "SYSTEM ALERT";
      document.body.appendChild(div);
      setTimeout(() => div.remove(), 5000);
    },
    party() {
      document.body.classList.add("party-effect");
      activeIntervals.set("party", () => {
        document.body.classList.remove("party-effect");
      });
    },
    confetti() {
      let burstCount = 0;
      const maxBurst = 50;
      const spawnConfetti = () => {
        const c = document.createElement("div");
        c.className = "confetti-piece";
        c.style.setProperty("--confetti-left", `${Math.random()*100}%`);
        c.style.setProperty("--confetti-color", ["#ff0000","#00ff00","#0000ff","#ffff00","#ff00ff","#00ffff"][~~(Math.random()*6)]);
        c.style.setProperty("--confetti-duration", `${2+Math.random()*3}s`);
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 5000);
      };

      // Use a single interval for burst
      const burstInterval = setInterval(() => {
        if (burstCount < maxBurst) {
          spawnConfetti();
          burstCount++;
        } else {
          clearInterval(burstInterval);
        }
      }, 100);

      // Continue spawning confetti periodically
      const confettiInterval = setInterval(spawnConfetti, 300);

      activeIntervals.set("confetti", () => {
        clearInterval(burstInterval);
        clearInterval(confettiInterval);
        document.querySelectorAll(".confetti-piece").forEach(c => c.remove());
      });
    },

    disco() {
      let overlay = document.getElementById("disco-overlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "disco-overlay";
        overlay.className = "disco-overlay";
        document.body.appendChild(overlay);
      }
      const colors = ["rgba(255,0,0,0.3)","rgba(0,255,0,0.3)","rgba(0,0,255,0.3)","rgba(255,255,0,0.3)","rgba(255,0,255,0.3)","rgba(0,255,255,0.3)"];
      let idx = 0;
      const int = setInterval(() => overlay.style.backgroundColor = colors[idx = (idx+1)%colors.length], 500);
      activeIntervals.set("disco", () => {
        clearInterval(int);
        if (document.getElementById("disco-overlay")) {
          document.getElementById("disco-overlay").remove();
        }
      });
    },
    matrix() {
      const old = document.getElementById("matrix-overlay");
      if (old) old.remove();
      const overlay = document.createElement("div");
      overlay.id = "matrix-overlay";
      overlay.className = "matrix-overlay";
      const canvas = document.createElement("canvas");
      overlay.appendChild(canvas);
      document.body.appendChild(overlay);
      const ctx = canvas.getContext("2d");
      let w, h, cols, ypos = [];
      const resize = () => {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;
        cols = Math.floor(w / 20) + 1;
        ypos = Array(cols).fill(0);
      };
      window.addEventListener("resize", resize);
      resize();
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()";
      let frameId;
      const draw = () => {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle = "#0f0";
        ctx.font = "15px monospace";
        ypos.forEach((y, i) => {
          const text = chars[~~(Math.random() * chars.length)];
          ctx.fillText(text, i*20, y);
          if (y > 100 + Math.random()*10000) ypos[i] = 0;
          else ypos[i] = y + 20;
        });
        frameId = requestAnimationFrame(draw);
      };
      draw();
      activeIntervals.set("matrix", () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", resize);
        overlay.remove();
      });
    },
    "upside-down"() { 
      document.body.classList.add("upside-down-effect"); 
      activeIntervals.set("upside-down", () => {
        document.body.classList.remove("upside-down-effect");
      });
    },
    blur() { 
      document.body.classList.add("blur-effect"); 
      activeIntervals.set("blur", () => {
        document.body.classList.remove("blur-effect");
      });
    },
    spin() { 
      document.body.classList.add("spin-effect"); 
      activeIntervals.set("spin", () => {
        document.body.classList.remove("spin-effect");
      });
    },

    cursorparty() {
      if (document.getElementById("cursorparty-overlay")) return;
      const overlay = document.createElement("div");
      overlay.id = "cursorparty-overlay";
      overlay.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9206;overflow:hidden;";
      document.body.appendChild(overlay);
      const spawn = () => {
        const c = document.createElement("div");
        c.style.cssText = `
          position:absolute;
          width:32px;height:32px;
          background:url('/image/cursor/cursor.png') center/contain no-repeat;
          pointer-events:none;opacity:1;
          left:50%;top:50%;
          transform:translate(-50%,-50%);
        `;
        const side = Math.floor(Math.random() * 4);
        let startX = 0, startY = 0;
        if (side === 0) startY = -innerHeight;
        else if (side === 1) startX = innerWidth;
        else if (side === 2) startY = innerHeight;
        else startX = -innerWidth;
        c.style.transform = `translate(${startX}px,${startY}px)`;
        overlay.appendChild(c);
        let t = 0;
        const vx = (Math.random() - 0.5) * 8;
        const vy = (Math.random() - 0.5) * 8;
        const curve = 1.2 + Math.random() * 1.8;
        const wobble = 0.02 + Math.random() * 0.04;
        const move = () => {
          t += 0.06;
          const wave = Math.sin(t * 4.7) * curve;
          const wobbleX = Math.sin(t * wobble * 100) * 6;
          const newX = startX + vx * t * 20 + wobbleX * 30;
          const newY = startY + vy * t * 20 + wave * 50;
          c.style.transform = `translate(${newX}px,${newY}px)`;
          if (newX < -innerWidth - 200 || newX > innerWidth + 200 ||
              newY < -innerHeight - 200 || newY > innerHeight + 200) {
            c.remove();
          } else {
            requestAnimationFrame(move);
          }
        };
        requestAnimationFrame(move);
      };
      let burstCount = 0;
      const maxBurst = 30;
      const burstInterval = setInterval(() => {
        if (burstCount < maxBurst) {
          spawn();
          burstCount++;
        } else {
          clearInterval(burstInterval);
        }
      }, 70);
      const spawnInt = setInterval(spawn, 3);
      activeIntervals.set("cursorparty", () => {
        clearInterval(burstInterval);
        clearInterval(spawnInt);
        overlay.remove();
      });
    },
    close() {
      if (document.getElementById("fake-cursor")) return;
      document.body.style.pointerEvents = "none";
      document.body.style.userSelect = "none";
      document.body.style.cursor = "none";
      const fake = document.createElement("div");
      fake.id = "fake-cursor";
      fake.style.cssText = `
        position:fixed;pointer-events:none;z-index:10000;
        width:38px;height:38px;
        background:url('/image/cursor/cursor.png') center/contain no-repeat;
        transform:translate(-6px,-6px);
        transition:background-image .15s;
      `;
      document.body.appendChild(fake);
      let x = innerWidth + 100;
      let y = innerHeight + 100;
      fake.style.transform = `translate(${x}px, ${y}px)`;
      const moveTo = (tx, ty, duration = 1800, callback) => {
        const start = performance.now();
        const sx = x, sy = y;
        const dx = tx - sx, dy = ty - sy;
        const step = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          x = sx + dx * ease;
          y = sy + dy * ease;
          fake.style.transform = `translate(${x}px, ${y}px)`;
          if (t < 1) requestAnimationFrame(step);
          else if (callback) callback();
        };
        requestAnimationFrame(step);
      };
      const jitterCircle = (cx, cy, onComplete) => {
        const points = 24;
        const radius = 26;
        const duration = 580;
        let i = 0;
        const jitter = () => {
          if (i >= points) {
            fake.style.transform = `translate(${cx}px, ${cy}px)`;
            return onComplete();
          }
          const angle = (i / points) * Math.PI * 2;
          const jitterX = Math.cos(angle) * radius + (Math.random() - 0.5) * 18;
          const jitterY = Math.sin(angle) * radius + (Math.random() - 0.5) * 18;
          fake.style.transform = `translate(${cx + jitterX}px, ${cy + jitterY}px)`;
          i++;
          setTimeout(jitter, duration / points + (Math.random() * 12));
        };
        jitter();
      };
      const closeNearestWindow = () => {
        const wins = [...document.querySelectorAll(".container-window")]
          .filter(w => w.offsetWidth > 0 && w.offsetHeight > 0)
          .filter(w => {
            const iframe = w.querySelector("iframe");
            if (iframe) {
              try {
                const src = iframe.src || iframe.getAttribute("src");
                if (src && (src.includes("doge-unblocked.vercel.app") || src === "https://doge-unblocked.vercel.app")) return false;
              } catch (e) {}
            }
            return true;
          });
        if (wins.length === 0) {
          moveTo(innerWidth + 100, innerHeight + 100, 1400, () => {
            document.body.style.pointerEvents = "";
            document.body.style.userSelect = "";
            document.body.style.cursor = "";
            fake.remove();
          });
          return;
        }
        const getCenter = el => {
          const r = el.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        };
        const targets = wins
          .map(w => ({ win: w, center: getCenter(w) }))
          .sort((a, b) => {
            const da = Math.hypot(a.center.x - x, a.center.y - y);
            const db = Math.hypot(b.center.x - x, b.center.y - y);
            return da - db;
          });
        const target = targets[0];
        const closeBtn = target.win.querySelector(".button-close");
        if (!closeBtn) return setTimeout(closeNearestWindow, 500);
        const r = closeBtn.getBoundingClientRect();
        const tx = r.left + r.width / 2;
        const ty = r.top + r.height / 2;
        moveTo(tx, ty, 2100, () => {
          fake.style.backgroundImage = "url('/image/cursor/cursor_hover.png')";
          jitterCircle(tx, ty, () => {
            setTimeout(() => {
              closeBtn.click();
              fake.style.backgroundImage = "url('/image/cursor/cursor.png')";
              setTimeout(closeNearestWindow, 900);
            }, 80);
          });
        });
      };
      setTimeout(() => {
        x = innerWidth + 100;
        y = innerHeight + 100;
        fake.style.transform = `translate(${x}px, ${y}px)`;
        closeNearestWindow();
      }, 600);
      const observer = new MutationObserver(() => {
        if (document.querySelector(".container-window") && !document.getElementById("fake-cursor")) {
          document.body.appendChild(fake);
          document.body.style.cursor = "none";
          x = innerWidth + 100;
          y = innerHeight + 100;
          fake.style.left = x + "px";
          fake.style.top = y + "px";
          setTimeout(closeNearestWindow, 800);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      activeIntervals.set("close", () => {
        document.body.style.pointerEvents = "";
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        fake.remove();
        observer.disconnect();
      });
    },
    none() {
    },
    rainbow() {
      let hue = 0;
      const interval = setInterval(() => {
        hue = (hue + 2) % 360;
        document.documentElement.style.setProperty("--primary-accent", `hsl(${hue}, 70%, 60%)`);
        updateColors();
      }, 50);
      activeIntervals.set("rainbow", () => {
        clearInterval(interval);
        updateColors();
      });
    },
    shake() {
      document.body.classList.add("shake-effect");
      activeIntervals.set("shake", () => {
        document.body.classList.remove("shake-effect");
      });
    },
    mirror() {
      document.body.classList.add("mirror-effect");
      activeIntervals.set("mirror", () => {
        document.body.classList.remove("mirror-effect");
      });
    },


    fakeerrors() {
      const messages = [
        "Critical Error: Your computer is too awesome",
        "Warning: Excessive coolness detected",
        "Fatal Error: Brain.exe has stopped working",
        "Error 404: Sense of humor not found",
        "System Alert: You are now 10% cooler"
      ];
      
      let count = 0;
      const interval = setInterval(() => {
        if (count >= 10) {
          clearInterval(interval);
          return;
        }
        
        const msg = messages[Math.floor(Math.random() * messages.length)];
        if (typeof showNotification === 'function') {
          showNotification(msg, 'high', 3000);
        }
        count++;
      }, 800);
      
      activeIntervals.set("fakeerrors", () => {
        clearInterval(interval);
      });
    },
    randomcolors() {
      const interval = setInterval(() => {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        document.documentElement.style.setProperty("--primary-accent", randomColor);
        updateColors();
      }, 1000);
      
      activeIntervals.set("randomcolors", () => {
        clearInterval(interval);
        updateColors();
      });
    },
    reversescroll() {
      document.body.classList.add("reverse-scroll-effect");
      
      activeIntervals.set("reversescroll", () => {
        document.body.classList.remove("reverse-scroll-effect");
      });
    },



    invert() {
      document.body.classList.add("invert-all-effect");
      activeIntervals.set("invert", () => {
        document.body.classList.remove("invert-all-effect");
      });
    },
    geometry() {
      const cube = document.createElement("div");
      cube.style.cssText = `
        position: fixed;
        width: 48px;
        height: 48px;
        background: url('/image/gd/player_cube.png') center/contain no-repeat;
        pointer-events: none;
        z-index: 9205;
        bottom: 0;
        left: 0;
        transform: translateX(0px) translateY(0px);
      `;
      document.body.appendChild(cube);

      let x = window.innerWidth / 2 - 24; // start in center
      let y = 0;
      let vx = 0; // horizontal speed (will be set randomly)
      let vy = 0; // vertical speed
      let rotation = 0;
      const gravity = 0.5;
      const jumpStrength = -12;
      const groundY = 0; // since bottom: 0, ground is at y=0

      let isJumping = false;
      let jumpTimer = 0;
      let jumpInterval = Math.random() * 180 + 60; // random jump interval 60-240 frames

      let moveTimer = 0;
      let moveDuration = Math.random() * 120 + 30; // random move duration 30-150 frames
      let isMoving = false;


      const animate = () => {
        // Apply gravity
        vy += gravity;
        y += vy;

        // Ground collision
        if (y >= groundY) {
          y = groundY;
          vy = 0;
          isJumping = false;
          rotation = 0; // reset rotation on ground
        }

        // Random horizontal movement
        moveTimer++;
        if (moveTimer >= moveDuration) {
          // Change movement state
          isMoving = Math.random() > 0.3; // 70% chance to move
          if (isMoving) {
            vx = (Math.random() - 0.5) * 6; // random speed -3 to 3
            moveDuration = Math.random() * 120 + 30; // new random duration
          } else {
            vx = 0;
            moveDuration = Math.random() * 60 + 20; // shorter pause duration
          }
          moveTimer = 0;
        }

        // Apply horizontal movement
        if (isMoving) {
          x += vx;

          // Bounce off screen edges with new random direction
          if (x <= 0 || x >= window.innerWidth - 48) {
            x = Math.max(0, Math.min(window.innerWidth - 48, x));
            vx = (Math.random() - 0.5) * 6; // new random direction and speed
            moveDuration = Math.random() * 120 + 30; // reset duration
            moveTimer = 0;
          }
        }

        // Random jump logic
        jumpTimer++;
        if (jumpTimer >= jumpInterval && !isJumping) {
          vy = jumpStrength;
          isJumping = true;
          jumpTimer = 0;
          jumpInterval = Math.random() * 180 + 60; // new random interval
        }

        // Spin when jumping
        if (isJumping) {
          rotation += 5; // spin speed
        }

        cube.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        requestAnimationFrame(animate);
      };
      animate();

      activeIntervals.set("geometry", () => {
        cube.remove();
      });
    },
    chaos() {
      // List all available event names (excluding chaos itself to avoid infinite recursion)
      const allEvents = [
        "confetti", "disco", "matrix",
        "upside-down","cursorparty",
        "shake", "mirror", "fakeerrors", "reversescroll",
        "invert", "geometry"
      ];

      // Activate all events sequentially with a single interval
      let eventIndex = 0;
      const chaosInterval = setInterval(() => {
        if (eventIndex < allEvents.length) {
          const eventName = allEvents[eventIndex];
          if (handlers[eventName]) {
            handlers[eventName]();
            activeEffects.add(eventName); // Add to active effects so they persist
          }
          eventIndex++;
        } else {
          clearInterval(chaosInterval);
        }
      }, 100); // Activate one every 100ms

      activeIntervals.set("chaos", () => {
        clearInterval(chaosInterval);
        // Individual effects will be cleaned up when removed from activeEffects
      });
    },

    // DRUGS EFFECT (formerly Time Warp)
    drugs() {
      document.body.classList.add('drugs');

      activeIntervals.set("drugs", () => {
        document.body.classList.remove('drugs');
      });
    },
    event() {
      if (eventTriggered) return;
      eventTriggered = true;

      // Disable logo tilt animation
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", resetLogoTransform);
      resetLogoTransform();

      // Set body background to solid black
      document.body.style.backgroundColor = 'black';

      // Destroy everything except the svg logo and countdown
      const allElements = document.querySelectorAll('body > *');
      allElements.forEach(el => {
        if (el.tagName.toLowerCase() !== 'svg' && !el.classList.contains('svgLogo') && el.id !== 'countdown-container') {
          el.remove();
        }
      });

      // Intense orbital strike explosion
      const svg = document.querySelector('.svgLogo');
      if (svg) {
        // Keep the logo in its current position
        const rect = svg.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        svg.style.position = 'fixed';
        svg.style.zIndex = '10000';

        // Shake the logo violently with transform
        let shakeCount = 0;
        const shakeInterval = setInterval(() => {
          const offsetX = (Math.random() - 0.5) * 60;
          const offsetY = (Math.random() - 0.5) * 60;
          svg.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
          shakeCount++;
          if (shakeCount === 3) {
            // Multiple bright flashes
            for (let f = 0; f < 3; f++) {
              setTimeout(() => {
                const flash = document.createElement('div');
                flash.style.position = 'fixed';
                flash.style.left = '0';
                flash.style.top = '0';
                flash.style.width = '100%';
                flash.style.height = '100%';
                flash.style.background = 'white';
                flash.style.opacity = '1';
                flash.style.zIndex = '10002';
                document.body.appendChild(flash);
                flash.style.transition = 'opacity 0.1s ease-out';
                setTimeout(() => {
                  flash.style.opacity = '0';
                  setTimeout(() => flash.remove(), 100);
                }, 10);
              }, f * 100);
            }
            // Screen shake
            document.body.style.transition = 'transform 0.1s ease-out';
            for (let s = 0; s < 10; s++) {
              setTimeout(() => {
                const shakeX = (Math.random() - 0.5) * 20;
                const shakeY = (Math.random() - 0.5) * 20;
                document.body.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
              }, s * 50);
            }
            setTimeout(() => {
              document.body.style.transform = '';
            }, 500);
          }
          if (shakeCount === 8) {
            // Make logo disappear in the explosion
            svg.style.opacity = '0';
            svg.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => svg.remove(), 500);

            // Cinematic buildup: slow initial flash
            const buildupFlash = document.createElement('div');
            buildupFlash.style.position = 'fixed';
            buildupFlash.style.left = '0';
            buildupFlash.style.top = '0';
            buildupFlash.style.width = '100%';
            buildupFlash.style.height = '100%';
            buildupFlash.style.background = 'rgba(255,255,255,0.3)';
            buildupFlash.style.opacity = '0';
            buildupFlash.style.zIndex = '10002';
            document.body.appendChild(buildupFlash);
            buildupFlash.style.transition = 'opacity 1s ease-in';
            buildupFlash.style.opacity = '1';
            setTimeout(() => {
              buildupFlash.style.opacity = '0';
              setTimeout(() => buildupFlash.remove(), 1000);
            }, 500);

            // Central explosion core with cinematic pulsing
            const core = document.createElement('div');
            core.style.position = 'fixed';
            core.style.width = '30px';
            core.style.height = '30px';
            core.style.borderRadius = '50%';
            core.style.background = 'radial-gradient(circle, #ffffff 0%, #ffff00 30%, #ff6600 60%, #ff0000 100%)';
            core.style.left = (centerX - 15) + 'px';
            core.style.top = (centerY - 15) + 'px';
            core.style.zIndex = '10001';
            core.style.boxShadow = '0 0 50px #ff0000';
            document.body.appendChild(core);
            // Dramatic pulsing
            let pulseCount = 0;
            const pulseInterval = setInterval(() => {
              const scale = 1 + pulseCount * 0.3;
              core.style.transform = `scale(${scale})`;
              core.style.opacity = 1 - pulseCount * 0.05;
              pulseCount++;
              if (pulseCount > 15) {
                clearInterval(pulseInterval);
                core.remove();
              }
            }, 150);

            // Cinematic shockwaves with staggered timing
            for (let i = 0; i < 8; i++) {
              setTimeout(() => {
                const circle = document.createElement('div');
                circle.style.position = 'fixed';
                circle.style.width = '0px';
                circle.style.height = '0px';
                circle.style.borderRadius = '50%';
                circle.style.border = '5px solid rgba(255,255,255,0.9)';
                circle.style.left = centerX + 'px';
                circle.style.top = centerY + 'px';
                circle.style.zIndex = '10001';
                document.body.appendChild(circle);
                circle.style.transition = 'width 3s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 3s ease-out, left 3s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                const size = 250 + i * 120;
                circle.style.width = size + 'px';
                circle.style.height = size + 'px';
                circle.style.left = (centerX - size / 2) + 'px';
                circle.style.top = (centerY - size / 2) + 'px';
                circle.style.opacity = '0';
                setTimeout(() => circle.remove(), 3000);
              }, i * 200);
            }
            // Enhanced debris particles with gravity effect
            for (let i = 0; i < 100; i++) {
              const particle = document.createElement('div');
              particle.style.position = 'fixed';
              particle.style.width = '5px';
              particle.style.height = '5px';
              particle.style.background = 'white';
              particle.style.borderRadius = '50%';
              particle.style.left = centerX + 'px';
              particle.style.top = centerY + 'px';
              particle.style.zIndex = '10001';
              document.body.appendChild(particle);
              const angle = (i / 100) * Math.PI * 2;
              const distance = 200 + Math.random() * 400;
              const tx = Math.cos(angle) * distance;
              const ty = Math.sin(angle) * distance + Math.random() * 100; // Add gravity
              setTimeout(() => {
                particle.style.transition = 'left 3s ease-out, top 3s ease-out, opacity 3s ease-out';
                particle.style.left = (centerX + tx) + 'px';
                particle.style.top = (centerY + ty) + 'px';
                particle.style.opacity = '0';
                setTimeout(() => particle.remove(), 3000);
              }, Math.random() * 300);
            }
            // Cinematic fire sparks with trails
            for (let i = 0; i < 40; i++) {
              const spark = document.createElement('div');
              spark.style.position = 'fixed';
              spark.style.width = '4px';
              spark.style.height = '4px';
              spark.style.background = '#ff4500';
              spark.style.borderRadius = '50%';
              spark.style.left = centerX + 'px';
              spark.style.top = centerY + 'px';
              spark.style.zIndex = '10001';
              spark.style.boxShadow = '0 0 10px #ff4500';
              document.body.appendChild(spark);
              const angle = Math.random() * Math.PI - Math.PI / 2; // More upward
              const distance = 100 + Math.random() * 300;
              const tx = Math.cos(angle) * distance;
              const ty = Math.sin(angle) * distance;
              setTimeout(() => {
                spark.style.transition = 'left 2s ease-out, top 2s ease-out, opacity 2s ease-out, background 2s ease-out, box-shadow 2s ease-out';
                spark.style.left = (centerX + tx) + 'px';
                spark.style.top = (centerY + ty) + 'px';
                spark.style.opacity = '0';
                spark.style.background = '#ffff00';
                spark.style.boxShadow = '0 0 5px #ffff00';
                setTimeout(() => spark.remove(), 2000);
              }, Math.random() * 200);
            }
            // Epic final sequence
            setTimeout(() => {
              // Massive final ring
              const finalRing = document.createElement('div');
              finalRing.style.position = 'fixed';
              finalRing.style.width = '0px';
              finalRing.style.height = '0px';
              finalRing.style.borderRadius = '50%';
              finalRing.style.border = '8px solid rgba(255,255,255,0.7)';
              finalRing.style.left = centerX + 'px';
              finalRing.style.top = centerY + 'px';
              finalRing.style.zIndex = '10001';
              document.body.appendChild(finalRing);
              finalRing.style.transition = 'width 4s ease-out, height 4s ease-out, opacity 4s ease-out, left 4s ease-out, top 4s ease-out';
              const finalSize = 1000;
              finalRing.style.width = finalSize + 'px';
              finalRing.style.height = finalSize + 'px';
              finalRing.style.left = (centerX - finalSize / 2) + 'px';
              finalRing.style.top = (centerY - finalSize / 2) + 'px';
              finalRing.style.opacity = '0';
              setTimeout(() => finalRing.remove(), 4000);

              // Screen fade for cinematic effect
              setTimeout(() => {
                const fade = document.createElement('div');
                fade.style.position = 'fixed';
                fade.style.left = '0';
                fade.style.top = '0';
                fade.style.width = '100%';
                fade.style.height = '100%';
                fade.style.background = 'black';
                fade.style.opacity = '0';
                fade.style.zIndex = '10003';
                document.body.appendChild(fade);
                fade.style.transition = 'opacity 2s ease-in';
                fade.style.opacity = '1';
                setTimeout(() => {
                  fade.style.opacity = '0';
                  setTimeout(() => fade.remove(), 2000);
                }, 1000);
              }, 1500);
            }, 1000);
          }
          if (shakeCount > 150) {
            clearInterval(shakeInterval);
            svg.style.transform = '';
            setTimeout(() => svg.remove(), 500);
          }
        }, 20);
      }


      // Fade in big white text
      setTimeout(() => {
        const bigText = document.createElement('div');
        bigText.id = 'event-text';
        bigText.textContent = 'Illumoid is taking a break';
        bigText.style.cssText = `
          position: fixed;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 48px;
          font-weight: bold;
          opacity: 0;
          transition: opacity 2s;
          z-index: 10000;
          text-align: center;
        `;
        document.body.appendChild(bigText);
        setTimeout(() => bigText.style.opacity = '1', 100);

        // Smaller text below with typewriter effect
        setTimeout(() => {
          const smallText = document.createElement('div');
          smallText.style.cssText = `
            position: fixed;
            top: 60%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #d3d3d3ff;
            font-size: 22px;
            line-height: 24px;
            opacity: 1;
            z-index: 10000;
            text-align: left;
          `;
          document.body.appendChild(smallText);
          const fullText = "Sorry for the confusion, It's not gone forever. It'll be back with a LOT more cool stuff. It's been pretty hard to keep up with new updates especially with all the side projects I got going on so please be patient. This small break is necessary to keep up with all the requested updates, games, and other features. Due to all the stress piling up I'll be pausing use on it for now during the break so that I can catch up with new stuff. In the meantime, enjoy your break! - ilmrx";
          let index = 0;
          const typewriter = setInterval(() => {
            smallText.textContent = fullText.slice(0, index + 1);
            index++;
            if (index >= fullText.length) {
              clearInterval(typewriter);
            }
          }, 60); // fast typewriter
        }, 2000);
      }, 3000);

      activeIntervals.set("event", () => {
        // Remove the text
        const textEl = document.getElementById('event-text');
        if (textEl) textEl.remove();
        // Reset background
        document.body.style.backgroundColor = '';
        // Re-enable logo tilt if not in performance mode
        const isPerformanceMode = localStorage.getItem("performanceModeEnabled") === "true";
        if (!isPerformanceMode) {
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseleave", resetLogoTransform);
        }
      });
    }

  };
  newOnes.forEach(effect => {
    if (handlers[effect]) handlers[effect]();
  });
}
window.addEventListener("load", () => {
   updateColors();
   updateLogoInteraction();

   // Initialize performance mode state
   const isPerformanceMode = localStorage.getItem("performanceModeEnabled") === "true";
   console.log('Performance mode on load:', isPerformanceMode);
   if (isPerformanceMode) {
     document.body.classList.add('performance-mode', 'performance-mode-animations');
     document.documentElement.classList.add('performance-mode', 'performance-mode-animations');
     console.log('Performance mode styles applied');
   }

   new MutationObserver(ms => {
     if (ms.some(m => m.attributeName === "style")) updateColors();
   }).observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
   window.addEventListener("storage", e => {
     if (e.key === "performanceModeEnabled") updateLogoInteraction();
   });
   checkMsgFile();
   msgCheckInterval = setInterval(checkMsgFile, 2000);

   // Initialize countdown
   const targetDate = new Date('2025-12-23T16:00:00-05:00');
   initialCountdownDiff = targetDate - Date.now();
   updateCountdown();
   setInterval(updateCountdown, 1000);

 });
window.addEventListener("beforeunload", () => {
  if (msgCheckInterval) clearInterval(msgCheckInterval);
  clearAllActiveEffects();
});

// Enhanced search functionality for games and media
window.handleSearch = function(event) {
  if (event.key === 'Enter') {
    window.performSearch();
  }
};

window.performSearch = function() {
  const searchInput = document.getElementById('taskbarSearchInput');
  if (!searchInput) {
    console.warn('Search input not found');
    return;
  }
  
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;
  
  console.log('Searching for:', query);
  
  // Wait for global variables to be available
  const waitForData = () => {
    return new Promise((resolve) => {
      const checkData = () => {
        if (window.GAMES_LIST && window.MEDIA_LIST && window.PROXY_LIST) {
          resolve();
        } else {
          setTimeout(checkData, 100);
        }
      };
      checkData();
    });
  };
  
  waitForData().then(() => {
    // Get games, media, and proxy data from global variables (defined in cloak.js)
    const games = window.GAMES_LIST || [];
    const media = window.MEDIA_LIST || [];
    const proxy = window.PROXY_LIST || [];
    
    console.log('Available items:', { games: games.length, media: media.length, proxy: proxy.length });
    
    // Search for matches
    const allItems = [
      ...games.map(item => ({...item, type: 'game'})),
      ...media.map(item => ({...item, type: 'media'})),
      ...proxy.map(item => ({...item, type: 'proxy'}))
    ];
    
    const matches = allItems.filter(item => 
      item.name.toLowerCase().includes(query)
    );
    
    console.log('Search results:', matches.length);
    
    if (matches.length === 0) {
      if (typeof showNotification === 'function') {
        showNotification('No games, media, or proxy found matching your search', 'medium', 3000);
      }
      return;
    }
    
    // If only one match, open it directly
    if (matches.length === 1) {
      if (typeof windowify === 'function') {
        windowify(matches[0].url, null, matches[0].name);
      } else {
        window.open(matches[0].url, '_blank');
      }
      searchInput.value = '';
      return;
    }
    
    // If multiple matches, create a search results window
    createSearchResultsWindow(matches, query);
    searchInput.value = '';
  });
}

// Clear search when input is cleared
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('taskbarSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      if (!e.target.value.trim()) {
        // Optional: Show all items again when search is cleared
        const allItems = [
          ...document.querySelectorAll('.game'),
          ...document.querySelectorAll('.media')
        ];
        allItems.forEach(item => {
          item.style.display = '';
        });
      }
    });
  }
});

function updateCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  const targetDate = new Date('2025-12-23T16:00:00-05:00'); // December 23, 2025, 4:00 PM EST
  const now = new Date();
  const diff = targetDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  // Change color based on time left
  if (diff <= 10 * 60 * 1000) { // 10 minutes
    countdownEl.style.color = 'red';
  } else if (diff <= 60 * 60 * 1000) { // 1 hour
    countdownEl.style.color = 'orange';
  } else if (diff <= 4 * 60 * 60 * 1000) { // 4 hours
    countdownEl.style.color = 'yellow';
  } else {
    countdownEl.style.color = ''; // default
  }

  // Update strike rectangle based on 24 hours left
  const twentyFourHours = 24 * 60 * 60 * 1000;
  if (diff <= twentyFourHours && diff > 0) {
    const progress = 1 - (diff / twentyFourHours);
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    let strikeRect = document.getElementById('strike-rect');
    if (!strikeRect) {
      strikeRect = document.createElement('img');
      strikeRect.id = 'strike-rect';
      strikeRect.src = '/image/events/rocket.gif';
      strikeRect.style.position = 'fixed';
      strikeRect.style.width = '50px';
      strikeRect.style.height = '100px';
      strikeRect.style.left = (centerX - 25) + 'px';
      strikeRect.style.zIndex = '10000';
      document.body.appendChild(strikeRect);
      // Start independent shake animation
      strikeShakeInterval = setInterval(() => {
        if (strikeRect && strikeRect.parentNode) {
          strikeRect.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        } else {
          clearInterval(strikeShakeInterval);
          strikeShakeInterval = null;
        }
      }, 50);
    }
    const startTop = 0;
    const endTop = (centerY - 100) - 50; // bottom reaches centerY - 100
    strikeRect.style.top = (startTop + progress * (endTop - startTop)) + 'px';
  } else {
    const strikeRect = document.getElementById('strike-rect');
    if (strikeRect) strikeRect.remove();
    if (strikeShakeInterval) {
      clearInterval(strikeShakeInterval);
      strikeShakeInterval = null;
    }
  }
}

function createSearchResultsWindow(matches, query) {
  // Create search results HTML
  const resultsHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="/styles/styles.css">
      <style>
        body { 
          padding: 20px; 
          color: white; 
          font-family: 'Space Grotesk', sans-serif; 
          background: var(--window-bg);
        }
        .search-results-grid {
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
          gap: 15px; 
          max-height: 60vh; 
          overflow-y: auto;
        }
        .search-result-item {
          cursor: pointer; 
          background: rgba(255,255,255,0.1); 
          border-radius: 10px; 
          padding: 15px; 
          text-align: center; 
          transition: all 0.3s ease; 
          border: 1px solid rgba(255,255,255,0.2);
        }
        .search-result-item:hover {
          background: rgba(47,7,83,0.5); 
          transform: scale(1.05);
        }
        .search-result-item img {
          width: 100%; 
          height: 120px; 
          object-fit: cover; 
          border-radius: 8px; 
          margin-bottom: 10px;
        }
        .search-result-item .name {
          font-weight: bold; 
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <h2 style="margin-bottom: 20px; text-align: center;">Search Results for "${query}"</h2>
      <div class="search-results-grid">
        ${matches.map(item => `
          <div class="search-result-item" onclick="window.parent.windowify('${item.url}', null, '${item.name}')">
            <img src="${item.image}" alt="${item.name}">
            <div class="name">${item.name}</div>
          </div>
        `).join('')}
      </div>
    </body>
    </html>
  `;
  
  // Create the search results window
  if (typeof windowify === 'function') {
    const blob = new Blob([resultsHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    windowify(url, null, `Search Results: ${query}`);
    
    // Clean up the blob URL after the window loads
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

// CSS !important Enforcer - Automatically adds !important to all CSS properties
(function() {
  'use strict';
  
  const cssFiles = ['styles/test.css'];
  
  function addImportantToCSS(css) {
    // Remove existing !important declarations to avoid duplicates
    css = css.replace(/!important/gi, '');
    
    // Add !important to all CSS property declarations
    const importantRegex = /([a-zA-Z\-]+)\s*:\s*([^;]+);/g;
    
    const modifiedCSS = css.replace(importantRegex, (match, property, value) => {
      if (value.trim().endsWith('!important')) {
        return match;
      }
      return `${property}: ${value.trim()} !important;`;
    });

    return modifiedCSS;
  }

  function processCSSFile(filePath) {
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then(cssContent => {
        const modifiedCSS = addImportantToCSS(cssContent);
        injectModifiedCSS(modifiedCSS, filePath);
      })
      .catch(error => console.warn(`Failed to process ${filePath}:`, error));
  }

  function injectModifiedCSS(cssContent, originalFile) {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.id = `important-${originalFile.replace(/[\/\.]/g, '-')}`;
    styleElement.textContent = cssContent;
    
    const head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(styleElement);
  }

  // Process CSS files on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      cssFiles.forEach(processCSSFile);
    });
  } else {
    cssFiles.forEach(processCSSFile);
  }
})();