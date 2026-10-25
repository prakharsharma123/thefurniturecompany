const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const D = require("./data");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));          // lets forms send PATCH and DELETE
app.use(express.static(path.join(__dirname, "public")));

// helpers available inside every .ejs file
app.locals.art = D.art; app.locals.pic = D.pic; app.locals.imgTag = D.imgTag; app.locals.inr = D.inr;
app.locals.was = D.was; app.locals.IMG = D.IMG; app.locals.FIN = D.FIN; app.locals.products = D.P;
app.use((req, res, next) => { res.locals.path = req.path; next(); });

// ---------- sample data (replace with a database later) ----------
let posts = [
  { id: 1, title: "Choosing a kitchen layout for a small flat", username: "PN Design Team", date: "12 Sep 2026", content: "Blog content will be added here." },
  { id: 2, title: "Choosing a traditional mandir design for your home", username: "PN Design Team", date: "5 Sep 2026", content: "Blog content will be added here." },
  { id: 3, title: "Sliding or swing: which wardrobe suits you?", username: "PN Design Team", date: "28 Aug 2026", content: "Blog content will be added here." },
];
let nextPostId = 4;
const orders = [];
const enquiries = [];
const reviews = [
  ["Ritu S.", "Sliding Door Wardrobe", "Measured twice, fitted in one day. The doors glide smoothly."],
  ["Amit V.", "L-Shaped Modular Kitchen", "Delivered on the promised date. Soft-close drawers are excellent."],
  ["Neha K.", "Wooden Home Mandir", "Our home mandir was installed in nine days. Beautiful carving and finish."],
  ["Manoj T.", "Control Panel Board", "Neat wiring that matched our drawing exactly."],
];
const policies = require("./policies");

// ---------- main pages ----------
app.get("/", (req, res) => res.redirect("/home"));
app.get("/home", (req, res) => res.render("home", { title: "Home", tab: req.query.tab || "l", posts: posts.slice(-3).reverse(), reviews: reviews.slice(0, 2) }));
app.get("/about", (req, res) => res.render("about", { title: "About us" }));
app.get("/shop", (req, res) => res.render("shop", { title: "Shop", cat: req.query.cat || "All", cats: [...new Set(D.P.map(p => p.c))] }));
app.get("/product/:id", (req, res) => {
  const p = D.P[req.params.id];
  if (!p) return res.status(404).render("404", { title: "Not found" });
  res.render("product", { title: p.n, p, related: D.P.filter(q => q.c === p.c && q.id !== p.id).slice(0, 3), reviews: reviews.slice(0, 2) });
});
app.get("/projects", (req, res) => res.render("projects", { title: "Projects" }));
app.get("/reviews", (req, res) => res.render("reviews", { title: "Reviews", reviews }));
app.get("/contact", (req, res) => res.render("contact", { title: "Contact", sent: req.query.sent }));
app.post("/contact", (req, res) => { enquiries.push({ ...req.body, at: new Date() }); res.redirect("/contact?sent=1"); });
["privacy", "terms", "refund"].forEach(k => app.get("/" + k, (req, res) => res.render("policy", { title: policies[k][0], key: k, policy: policies[k] })));

// ---------- checkout and tracking ----------
app.post("/order", (req, res) => {
  let cart = []; try { cart = JSON.parse(req.body.cart || "[]"); } catch (e) {}
  const items = cart.filter(x => D.P[x.id] && D.P[x.id].s[x.k]).map(x => ({ name: D.P[x.id].n, size: D.P[x.id].s[x.k][0], q: Math.max(1, +x.q || 1), price: D.P[x.id].s[x.k][1] }));
  if (!items.length) return res.redirect("/shop");
  const o = { id: "PN-" + (26001 + orders.length), name: req.body.name, phone: req.body.phone, address: req.body.address, payment: req.body.payment, items, total: items.reduce((a, x) => a + x.price * x.q, 0), status: 1 };
  orders.push(o);
  res.render("order", { title: "Order placed", o });
});

// app.get("/track", (req, res) => res.render("track", { title: "Track order", o: null, tried: false }));
// app.post("/track", (req, res) => res.render("track", { title: "Track order", o: orders.find(x => x.id === (req.body.id || "").trim().toUpperCase()), tried: true }));

// ---------- blog (REST style: index, new, create, show, edit, update, delete) ----------
app.get("/posts", (req, res) => res.redirect("/blog"));
app.get("/blog", (req, res) => res.render("blog/index", { title: "Blog", posts }));
app.get("/blog/new", (req, res) => res.render("blog/new", { title: "New post" }));
app.post("/blog", (req, res) => {
  const { title, username, content } = req.body;
  posts.push({ id: nextPostId++, title, username, content, date: new Date().toDateString().slice(4) });
  res.redirect("/blog");
});
app.get("/blog/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).render("404", { title: "Not found" });
  res.render("blog/show", { title: post.title, post });
});
app.get("/blog/:id/edit", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).render("404", { title: "Not found" });
  res.render("blog/edit", { title: "Edit post", post });
});
app.patch("/blog/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) Object.assign(post, { title: req.body.title, username: req.body.username, content: req.body.content });
  res.redirect("/blog/" + req.params.id);
});
app.delete("/blog/:id", (req, res) => { posts = posts.filter(p => p.id != req.params.id); res.redirect("/blog"); });

app.use((req, res) => res.status(404).render("404", { title: "Not found" }));
app.listen(PORT, () => console.log("PN Modular running at http://localhost:" + PORT + "/home"));
