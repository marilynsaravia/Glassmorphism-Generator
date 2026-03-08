// ---------- utils ----------
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((x) => x + x).join("");
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

// ---------- OUTPUT builders ----------
function buildCssOutput({ r, g, b, opacity, blur, hex }) {
  return `/* Glass Button (Full snippet) */

@property --angle-1 {
  syntax: "<angle>";
  inherits: false;
  initial-value: -75deg;
}

@property --angle-2 {
  syntax: "<angle>";
  inherits: false;
  initial-value: -45deg;
}

:root {
  --anim--hover-time: 400ms;
  --anim--hover-ease: cubic-bezier(0.25, 1, 0.5, 1);
  --border-width: 1.5px;
}

/* Wrapper (keeps the shadow layer) */
.button-wrap {
  position: relative;
  display: inline-block;
  border-radius: 999px;
  filter: drop-shadow(0 18px 30px rgba(0,0,0,0.12));
}

/* Optional shadow layer */
.button-shadow {
  --shadow-cuttoff-fix: 2em;
  position: absolute;
  width: calc(100% + var(--shadow-cuttoff-fix));
  height: calc(100% + var(--shadow-cuttoff-fix));
  top: calc(0% - var(--shadow-cuttoff-fix) / 2);
  left: calc(0% - var(--shadow-cuttoff-fix) / 2);
  filter: blur(${blur}px);
  pointer-events: none;
}

.button-shadow::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.06));

  width: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
  height: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
  top: calc(var(--shadow-cuttoff-fix) - 0.45em);
  left: calc(var(--shadow-cuttoff-fix) - 0.8em);

  padding: 0.125em;
  box-sizing: border-box;

  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
}

/* The button */
.glass-btn {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  padding: 0;
  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,0.42),
      rgba(255,255,255,0.18)
    ),
    linear-gradient(
      -75deg,
      rgba(255,255,255,0.05),
      rgba(255,255,255,0.24),
      rgba(255,255,255,0.05)
    );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow:
    inset 0 2px 3px rgba(255,255,255,0.75),
    inset 0 -2px 3px rgba(0,0,0,0.04),
    0 0.25em 0.125em -0.125em rgba(0,0,0,0.16),
    0 0 0.1em 0.22em inset rgba(255,255,255,0.22);

  transition:
    transform var(--anim--hover-time) var(--anim--hover-ease),
    box-shadow var(--anim--hover-time) var(--anim--hover-ease);
}

.glass-btn:hover {
  transform: scale(0.985);
  box-shadow:
    inset 0 2px 3px rgba(255,255,255,0.82),
    inset 0 -2px 3px rgba(0,0,0,0.04),
    0 0.35em 0.2em -0.15em rgba(0,0,0,0.20),
    0 0 0.08em 0.18em inset rgba(255,255,255,0.35);
}

/* Fixed reflection */
.glass-btn::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
  background:
    linear-gradient(
    180deg,
    rgba(255,255,255,0.82) 0%,
    rgba(255,255,255,0.36) 24%,
    rgba(255,255,255,0.12) 52%,
    rgba(255,255,255,0.03) 100%
  ),
  linear-gradient(
  135deg,
  rgba(${r}, ${g}, ${b}, ${opacity * 1.05}) 0%,
  rgba(${r}, ${g}, ${b}, ${opacity * 0.95}) 38%,
  rgba(${r}, ${g}, ${b}, ${opacity * 0.72}) 62%,
  rgba(${r}, ${g}, ${b}, ${opacity * 0.34}) 78%,
  rgba(255,255,255,0.12) 90%,
  rgba(255,255,255,0.55) 100%
)
}

/* Text */
.glass-btn > span {
  position: relative;
  z-index: 3;
  display: block;
  overflow: hidden;
  border-radius: inherit;
  padding: 14px 28px;
  font-weight: 600;
  color: rgba(68,68,68,0.95);
  text-shadow: 0 0.25em 0.05em rgba(0,0,0,0.10);
}

/* Moving shine inside text area */
.glass-btn > span::after {
  content: "";
  display: block;
  position: absolute;
  z-index: 3;

  width: calc(100% - var(--border-width));
  height: calc(100% - var(--border-width));
  top: calc(0% + var(--border-width) / 2);
  left: calc(0% + var(--border-width) / 2);
  
  
  box-sizing: border-box;
  border-radius: 999vw;

  background: linear-gradient(
    var(--angle-2),
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.5) 40% 50%,
    rgba(255,255,255,0) 55%
  );

  mix-blend-mode: screen;
  pointer-events: none;

  background-size: 200% 200%;
  background-position: 0% 50%;
  background-repeat: no-repeat;

  transition:
    background-position calc(var(--anim--hover-time) * 1.25) var(--anim--hover-ease),
    --angle-2 calc(var(--anim--hover-time) * 1.25) var(--anim--hover-ease);
}

.glass-btn:hover > span::after {
  background-position: 50% 15%;
}

.glass-btn:active > span::after {
  background-position: 50% 15%;
  --angle-2: -15deg;
}

/* Border + conic highlight */
.glass-btn::after {
  content: "";
  position: absolute;
  z-index: 4;
  inset: 0;
  border-radius: 999px;

  width: calc(100% + var(--border-width));
  height: calc(100% + var(--border-width));
  top: calc(0% - var(--border-width) / 2);
  left: calc(0% - var(--border-width) / 2);

  padding: var(--border-width);
  box-sizing: border-box;

  background:
    conic-gradient(
      from var(--angle-1) at 50% 50%,
      rgba(0,0,0,0.28),
      rgba(0,0,0,0) 8% 40%,
      rgba(255,255,255,0.55) 50%,
      rgba(0,0,0,0) 60% 92%,
      rgba(0,0,0,0.22)
    ),
    linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.34));

  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;

  box-shadow: inset 0 0 0 0.5px rgba(255,255,255,0.8);

  transition:
    --angle-1 500ms ease,
    opacity var(--anim--hover-time) var(--anim--hover-ease);
}

.glass-btn:hover::after {
  --angle-1: -125deg;
}

.glass-btn:active::after {
  --angle-1: -75deg;
}

/* Values:
Reflection Color: ${hex}
Reflection Opacity: ${opacity}
Shadow Blur: ${blur}px
*/`;
}

function buildHtmlOutput() {
  return `<!-- Glass Button HTML -->
<div class="button-wrap">
  <button class="glass-btn" type="button">
    <span>Button</span>
  </button>
  <div class="button-shadow"></div>
</div>`;
}

// ---------- DOM helpers ----------
function setActiveTab(tab) {
  const cssBtn = document.getElementById("cssBtn");
  const htmlBtn = document.getElementById("htmlBtn");
  const copyBtn = document.getElementById("copyBtn");

  const cssOutput = document.getElementById("cssOutput");
  const htmlOutput = document.getElementById("htmlOutput");

  const isCss = tab === "css";

  cssBtn.classList.toggle("active", isCss);
  htmlBtn.classList.toggle("active", !isCss);

  cssOutput.classList.toggle("active", isCss);
  htmlOutput.classList.toggle("active", !isCss);

  copyBtn.textContent = isCss ? "Copy CSS" : "Copy HTML";
  copyBtn.dataset.copy = isCss ? "css" : "html";
}

// ---------- main update ----------
function updateAll() {
  const colorHex = document.getElementById("reflectionColor").value;
  const opacity = document.getElementById("reflectionOpacity").value;
  const blur = document.getElementById("shadowBlur").value;

  document.getElementById("reflectionColorValue").innerText = colorHex;
  document.getElementById("reflectionOpacityValue").innerText = opacity;
  document.getElementById("shadowBlurValue").innerText = blur + "px";

  const { r, g, b } = hexToRgb(colorHex);

  // live preview reflection ONLY
  document.getElementById("dynamicStyles").innerHTML = `
    .glass-btn::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: linear-gradient(
        135deg,
        rgba(${r}, ${g}, ${b}, ${opacity}),
        transparent
      );
      pointer-events: none;
      mix-blend-mode: overlay;
    }
  `;

  const shadowEl = document.querySelector(".button-shadow");
  if (shadowEl) shadowEl.style.filter = `blur(${blur}px)`;

  // outputs
  document.getElementById("cssOutput").textContent = buildCssOutput({
    r, g, b, opacity, blur, hex: colorHex,
  });

  document.getElementById("htmlOutput").textContent = buildHtmlOutput();
}

// ---------- listeners ----------
document.getElementById("reflectionColor").addEventListener("input", updateAll);
document.getElementById("reflectionOpacity").addEventListener("input", updateAll);
document.getElementById("shadowBlur").addEventListener("input", updateAll);

// tabs
document.getElementById("cssBtn").addEventListener("click", () => setActiveTab("css"));
document.getElementById("htmlBtn").addEventListener("click", () => setActiveTab("html"));

// copy (single button)
document.getElementById("copyBtn").addEventListener("click", async () => {
  const copyBtn = document.getElementById("copyBtn");
  const mode = copyBtn.dataset.copy || "css";

  const text =
    mode === "css"
      ? document.getElementById("cssOutput").textContent
      : document.getElementById("htmlOutput").textContent;

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied!";
    copyBtn.classList.add("copied");
    setTimeout(() => {
      copyBtn.textContent = mode === "css" ? "Copy CSS" : "Copy HTML";
      copyBtn.classList.remove("copied");
    }, 1400);
  } catch (e) {
    copyBtn.textContent = "Copy failed";
    setTimeout(() => {
      copyBtn.textContent = mode === "css" ? "Copy CSS" : "Copy HTML";
    }, 1400);
  }
});

// init
setActiveTab("css");
updateAll();