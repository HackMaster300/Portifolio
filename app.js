(function () {
  var list = document.getElementById("list");
  var detail = document.getElementById("detail");

  function el(tag, text, cls) {
    var e = document.createElement(tag);
    if (text) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  }

  function section(title, node) {
    detail.appendChild(el("h4", title));
    detail.appendChild(node);
  }

  function show(p, btn) {
    list.querySelectorAll("button").forEach(function (b) { b.removeAttribute("aria-current"); });
    btn.setAttribute("aria-current", "true");
    detail.textContent = "";
    detail.appendChild(el("h3", p.title));
    detail.appendChild(el("span", p.status, "badge"));
    section("Problema", el("p", p.problem));
    section("Solução", el("p", p.solution));
    var ul = el("ul");
    p.decisions.forEach(function (d) { ul.appendChild(el("li", d)); });
    section("Decisões e estado", ul);
    var tags = el("ul", "", "tags");
    p.stack.forEach(function (s) { tags.appendChild(el("li", s)); });
    section("Tecnologias", tags);
    if (p.link && /^https:\/\/github\.com\//.test(p.link)) {
      var a = el("a", "Ver no GitHub");
      a.href = p.link;
      var para = el("p");
      para.appendChild(a);
      section("Código", para);
    }
  }

  (function (items) {
    var group = null, first = null;
    items.forEach(function (p) {
      if (p.group !== group) {
        group = p.group;
        list.appendChild(el("li", group, "grp"));
      }
      var li = el("li");
      var b = el("button", p.title);
      b.type = "button";
      b.addEventListener("click", function () { show(p, b); });
      li.appendChild(b);
      list.appendChild(li);
      if (!first) first = { p: p, b: b };
    });
    if (first) show(first.p, first.b);
    else detail.textContent = "Não foi possível carregar os projectos.";
  })(window.PROJECTS || []);
})();
