/* Auto generated, hash = 2xnr98u0iux66h5q9lkxquv5q */
(function (c) {
    c.LIRenderAll = function () {
        function t(a) {
            return Array.prototype.slice.call(a.attributes).filter(function (a) {
                return -1 !== a.name.lastIndexOf("data-key-", 0)
            }).map(function (a) {
                return encodeURIComponent(a.name.replace("data-", "").toLowerCase()) + "\x3d" + encodeURIComponent(a.value)
            })
        }

        function u(a) {
            var d = a.getAttribute("data-size"),
                b = a.getAttribute("data-locale"),
                e = a.getAttribute("data-type"),
                v = a.getAttribute("data-theme"),
                c = a.getAttribute("data-vanity"),
                g = a.getAttribute("data-version"),
                h = a.getAttribute("data-ei"),
                k = a.getAttribute("data-entity"),
                l = a.getAttribute("data-iscreate"),
                f = Math.round(1E6 * Math.random()),
                h = h ? "https://badges.linkedin-ei.com/" : "https://badges.linkedin.com/",
                b = ["locale\x3d" + encodeURIComponent(b), "badgetype\x3d" + encodeURIComponent(e), "badgetheme\x3d" + encodeURIComponent(v), "uid\x3d" + encodeURIComponent(f), "version\x3d" + encodeURIComponent(g)];
            "v2" === g ? (h += "view", b.push("badgesize\x3d" + encodeURIComponent(d)), b.push("entity\x3d" + encodeURIComponent(k)), b = b.concat(t(a))) : (h += "profile", b.push("maxsize\x3d" +
                encodeURIComponent(d)), b.push("trk\x3d" + encodeURIComponent("profile-badge")), b.push("vanityname\x3d" + encodeURIComponent(c)));
            l && b.push("fromCreate\x3dtrue");
            d = h + "?" + b.join("\x26");
            a.setAttribute("data-uid", f);
            a = document.createElement("script");
            a.src = d;
            p.push(a);
            document.body.appendChild(a)
        }

        function q(a, d) {
            if ("SCRIPT" !== a.tagName || r[a.src] || d && (!d || a.getAttribute("data-isartdeco")))
                for (var b = 0, e = a.childNodes; b < e.length;) q(e[b++], d);
            else a.parentNode.replaceChild(w(a), a), r[a.src] = !0;
            return a
        }

        function w(a) {
            for (var d =
                    document.createElement("script"), b = a.attributes.length - 1; 0 <= b; b--) d.setAttribute(a.attributes[b].name, a.attributes[b].value);
            return d
        }

        function x() {
            if (m >= n && 0 < n || m >= g.length) delete c.LIBadgeCallback, p.map(function (a) {
                document.body.removeChild(a)
            })
        }
        var m = 0,
            n = 0,
            p = [],
            r = {},
            g = Array.prototype.slice.call(document.querySelectorAll(".LI-profile-badge, .LI-entity-badge")),
            k, l, f, s;
        k = 0;
        for (l = g.length; k < l; k++) f = g[k], s = f.getAttribute("data-rendered"), s || (n++, f.setAttribute("data-rendered", !0), u(f));
        c.LIBadgeCallback =
            function (a, d) {
                m++;
                var b, e, c, f;
                b = 0;
                for (l = g.length; b < l; b++) e = g[b], f = e.getAttribute("data-iscreate"), c = parseInt(e.getAttribute("data-uid"), 10), c === d && (c = document.createElement("div"), c.innerHTML = a, e.appendChild(c), q(e, f));
                x()
            }
    };
    "complete" === document.readyState ? c.LIRenderAll() : c.addEventListener("load", c.LIRenderAll, !1)
})(window);
