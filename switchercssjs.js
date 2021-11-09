const containerBulles = document.getElementById("container-bulles");
const mainTitle = document.querySelector("h1");
const colorBox = document.getElementById("color-box");
const colorRange = document.getElementById("color-range");
const header = document.querySelector("header");
const wrapper = document.querySelector(".wrapper");
const imgEl = document.getElementById("color-box");
const infoTheme = document.querySelector("#title");
const title = document.querySelector(".text>h3");
const para = document.querySelector(".text>p");
const img = document.querySelector("img");
const underline = document.getElementById("box-underline");
const containerPalette = document.querySelector(".container-palette");
const playMess = document.querySelector("#mess-play");
const switchBtns = document.getElementsByClassName("switch");
const cssLink = document.getElementById("switcher-id");
const colorHex = document.querySelectorAll("#colorHex span");
let interval01, interval02, interval03;
Array.from(switchBtns).forEach((switchBtn) => {
  let headerColor;
  let bodyColor;
  switchBtn.addEventListener("click", () => {
    clearInterval(interval02);
    document.body.removeAttribute("style");
    header.removeAttribute("style");
    title.removeAttribute("style");
    para.removeAttribute("style");
    img.removeAttribute("style");
    wrapper.removeAttribute("style");
    underline.removeAttribute("style");
    let dataTheme = switchBtn.getAttribute("data-theme");
    cssLink.setAttribute("href", `./theme/${dataTheme}.css`);
    infoTheme.innerText = "Theme : " + dataTheme;
    containerPalette.style.display = "none";
  });
});
colorRange.addEventListener("change", () => {
  clearInterval(interval02);
  containerPalette.style.display = "block";
  infoTheme.innerText = "Custom mode";
  infoTheme.style.color = "white";
  updateBackground(colorRange.value);
});
img.classList.add("anim");
playMess.addEventListener("mouseover", () => {
  clearInterval(interval02);
  h = colorRange.value;
  img.style.opacity = "1";
  playMess.style.opacity = "0";
  // img.classList.remove("play");
  bodyHeight = window
    .getComputedStyle(document.body, null)
    .getPropertyValue("height");
  containerBulles.style.height = document.body.scrollHeight + "px";
  img.classList.add("anim");
  infoTheme.innerText = "Loop mode";
  infoTheme.style.color = "white";
  interval02 = setInterval(() => {
    h = parseInt(h);
    colorRange.value = updateBackground(h);
    h = h < 360 ? h + 20 : h % 360;
    displayBubulles(h);
    containerPalette.style.display = "block";
  }, 1500);
});
playMess.addEventListener("click", () => {
  img.classList.add("trouble");
  interval01 = setTimeout(() => {
    img.classList.remove("trouble");
    clearInterval(interval01);
  }, 3000);
});
playMess.addEventListener("mouseleave", () => {
  clearInterval(interval02);
  clearInterval(interval03);
  playMess.style.opacity = "1";
  img.classList.remove("anim");
  img.classList.remove("trouble");
  infoTheme.innerText = "Custom mode";
  infoTheme.style.color = "white";
});
const updateBackground = (h) => {
  const s = 85;
  const l = 60;
  let h1, h2;
  h = parseInt(h);
  colorRange.value = h;
  h1 = h + 120;
  h1 <= 360 ? h1 : (h1 = h1 % 360);
  h2 = h1 + 120;
  h2 <= 360 ? h2 : (h2 = h2 % 360);
  let colorHsl = `hsl(${Math.floor(h)},${s}%,${l}%)`;
  let colorHsl1 = `hsl(${Math.floor(h1)},${s}%,${l}%)`;
  let colorHsl2 = `hsl(${Math.floor(h2)},${s}%,${l}%)`;
  let colorHex = hslToHex(h, s, l);
  let colorHex1 = hslToHex(h1, s, l);
  let colorHex2 = hslToHex(h2, s, l);
  displayColorHex([colorHex, colorHex1, colorHex2]);
  header.style.backgroundColor = colorHsl.toString();
  document.body.style.backgroundColor = colorHsl1;
  wrapper.style.borderColor = colorHsl.toString();
  wrapper.style.backgroundImage = `linear-gradient(${colorHsl1} 65%, ${colorHsl} 99%)`;
  title.style.color = colorHsl.toString();
  underline.style.backgroundImage = `linear-gradient(${colorHsl2} 65%, ${colorHsl1} 99%)`;
  para.style.color = "white";
  mainTitle.style.color = "white";
  title.style.color = "white";
  return h;
};
const createBubulle = (h) => {
  let size = Math.random() * 96;
  let bulleEl = document.createElement("div");
  let nb = Math.random();
  nb > 0.6
    ? bulleEl.classList.add("bulle")
    : nb < 0.3
    ? bulleEl.classList.add("bulle-02")
    : bulleEl.classList.add("bulle-03");
  bulleEl.style.left = Math.random() * 85 + 5 + "%";
  bulleEl.style.height = `${size + 39}px`;
  bulleEl.style.width = `${size + 39}px`;
  // h = parseInt(h);
  bulleEl.style.backgroundColor = `hsl(${h},85%,50%,.5)`;
  containerBulles.appendChild(bulleEl);
  setTimeout(() => {
    containerBulles.removeChild(bulleEl);
  }, 8500);
};
const displayBubulles = (h) => {
  clearInterval(interval03);
  interval03 = setInterval(() => {
    createBubulle(h);
  }, 700);
};
function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
function displayColorHex(arr) {
  console.log(colorHex);
  colorHex.forEach((el, i) => {
    el.innerHTML = `<strong>${arr[i]}</strong>`;
    el.style.backgroundColor = arr[i];
  });
}
