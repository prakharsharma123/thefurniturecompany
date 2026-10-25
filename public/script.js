// Browser code: cart drawer, product size selector, toast and countdown.
const $ = s => document.querySelector(s);
const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
let C = JSON.parse(localStorage.getItem('c') || '[]');
function save() { localStorage.setItem('c', JSON.stringify(C)); $('#cn').textContent = C.reduce((a, x) => a + x.q, 0); }
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('s'); clearTimeout(t.h); t.h = setTimeout(() => t.classList.remove('s'), 2200); }
function buy(go) {
  const i = $('#pinfo'), b = document.querySelector('#sz [aria-pressed=true]');
  const k = +b.dataset.k, f = C.find(x => x.id == i.dataset.id && x.k === k);
  f ? f.q++ : C.push({ id: +i.dataset.id, k, q: 1, name: i.dataset.name, size: b.dataset.l, price: +b.dataset.p });
  save(); go ? cart(1) : toast('Added to cart');
}
function chg(j, d) { C[j].q += d; if (C[j].q < 1) C.splice(j, 1); save(); cart(1); }
function cart(open) {
  const d = $('#drawer'); if (!open) { d.classList.remove('s'); return; } d.classList.add('s');
  const t = C.reduce((a, x) => a + x.price * x.q, 0);
  $('#dp').innerHTML = '<div style="display:flex;justify-content:space-between"><h2>Your cart</h2><button class="ic" aria-label="Close" onclick="cart(0)">✕</button></div>' +
    (C.length ? C.map((x, j) => `<div class="li"><div><b>${x.name}</b><br><small style="color:var(--mut)">${x.size}</small></div><div>${inr(x.price * x.q)}<br><button onclick="chg(${j},-1)">-</button> ${x.q} <button onclick="chg(${j},1)">+</button></div></div>`).join('') +
      `<div class="li"><b>Total (GST incl.)</b><b>${inr(t)}</b></div><h3 style="margin-top:18px">Checkout</h3>
      <form method="POST" action="/order"><input type="hidden" name="cart" value='${JSON.stringify(C.map(x => ({ id: x.id, k: x.k, q: x.q })))}'>
      <label for="a">Full name</label><input id="a" name="name" required><label for="b">Phone</label><input id="b" name="phone" type="tel" required><label for="c">Delivery address and pincode</label><textarea id="c" name="address" rows="3" required></textarea>
      <label for="pm">Payment</label><select id="pm" name="payment"><option>UPI</option><option>Card or net banking</option><option>EMI</option><option>Advance 30% now, rest on delivery</option></select>
      <p><button class="btn" style="width:100%">Place order</button></p></form>`
      : '<p style="color:var(--mut)">Your cart is empty.</p><a class="btn" href="/shop">Go to shop</a>');
}
document.addEventListener('click', e => {
  const b = e.target.closest('#sz button'); if (!b) return;
  document.querySelectorAll('#sz button').forEach(x => x.setAttribute('aria-pressed', x === b));
  $('#pp').textContent = inr(b.dataset.p); $('#pw').textContent = +b.dataset.w ? inr(b.dataset.w) : '';
});
const end = Date.now() + (4 * 864e5 + 14 * 36e5 + 48 * 6e4);
function cd() {
  const e = $('#cd'); if (!e) return; let s = Math.max(0, end - Date.now()) / 1e3;
  const v = [864e2, 3600, 60, 1].map(u => { const x = Math.floor(s / u); s -= x * u; return String(x).padStart(2, '0'); });
  e.innerHTML = ['Days', 'Hours', 'Minutes', 'Seconds'].map((l, i) => `<div><b>${v[i]}</b><small>${l}</small></div>`).join('');
}
setInterval(cd, 1000); cd(); save();
// Intro splash: logo pops in on a coloured screen, then flies into the header logo.
(function () {
  const root = document.documentElement, s = document.getElementById('splash');
  if (!s || !root.classList.contains('splash-on')) return;
  const box = document.getElementById('sl'), img = box.querySelector('img'), target = document.querySelector('.logo-wrap img');
  try { sessionStorage.setItem('pnSplash', '1'); } catch (e) {}
  const fly = () => {
    const a = box.getBoundingClientRect(), b = target.getBoundingClientRect();
    const dx = (b.left + b.width / 2) - (a.left + a.width / 2), dy = (b.top + b.height / 2) - (a.top + a.height / 2);
    s.classList.add('go');                                             // colour fades away
    box.style.transform = `translate(${dx}px,${dy}px) scale(${b.width / a.width})`; // logo flies to header
    setTimeout(() => root.classList.add('reveal'), 500);              // page content fades in
    setTimeout(() => { root.classList.remove('splash-on'); s.remove(); }, 950); // header logo takes over
  };
  const start = () => setTimeout(fly, 2200);                          // time the logo stays in the centre
  img.complete ? start() : (img.onload = img.onerror = start);
})();
