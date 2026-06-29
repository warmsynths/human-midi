//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: ee, getOwnPropertySymbols: te, getPrototypeOf: ne } = Object, f = globalThis, p = f.trustedTypes, re = p ? p.emptyScript : "", ie = f.reactiveElementPolyfillSupport, m = (e, t) => e, h = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? re : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, g = (e, t) => !l(e, t), _ = {
	attribute: !0,
	type: String,
	converter: h,
	reflect: !1,
	useDefault: !1,
	hasChanged: g
};
Symbol.metadata ??= Symbol("metadata"), f.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var v = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = _) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? _;
	}
	static _$Ei() {
		if (this.hasOwnProperty(m("elementProperties"))) return;
		let e = ne(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(m("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(m("properties"))) {
			let e = this.properties, t = [...ee(e), ...te(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? h : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? h : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? g)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[m("elementProperties")] = /* @__PURE__ */ new Map(), v[m("finalized")] = /* @__PURE__ */ new Map(), ie?.({ ReactiveElement: v }), (f.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var y = globalThis, b = (e) => e, x = y.trustedTypes, S = x ? x.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, C = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, T = "?" + w, ae = `<${T}>`, E = document, D = () => E.createComment(""), O = (e) => e === null || typeof e != "object" && typeof e != "function", k = Array.isArray, oe = (e) => k(e) || typeof e?.[Symbol.iterator] == "function", A = "[ 	\n\f\r]", j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, M = /-->/g, N = />/g, P = RegExp(`>|${A}(?:([^\\s"'>=/]+)(${A}*=${A}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), F = /'/g, I = /"/g, L = /^(?:script|style|textarea|title)$/i, R = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), z = Symbol.for("lit-noChange"), B = Symbol.for("lit-nothing"), V = /* @__PURE__ */ new WeakMap(), H = E.createTreeWalker(E, 129);
function U(e, t) {
	if (!k(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return S === void 0 ? t : S.createHTML(t);
}
var se = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = j;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === j ? c[1] === "!--" ? o = M : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = P) : (L.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = P) : o = N : o === P ? c[0] === ">" ? (o = i ?? j, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? P : c[3] === "\"" ? I : F) : o === I || o === F ? o = P : o === M || o === N ? o = j : (o = P, i = void 0);
		let d = o === P && e[t + 1].startsWith("/>") ? " " : "";
		a += o === j ? n + ae : l >= 0 ? (r.push(s), n.slice(0, l) + C + n.slice(l) + w + d) : n + w + (l === -2 ? t : d);
	}
	return [U(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, W = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = se(t, n);
		if (this.el = e.createElement(l, r), H.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = H.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(C)) {
					let t = u[o++], n = i.getAttribute(e).split(w), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? le : r[1] === "?" ? ue : r[1] === "@" ? de : q
					}), i.removeAttribute(e);
				} else e.startsWith(w) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (L.test(i.tagName)) {
					let e = i.textContent.split(w), t = e.length - 1;
					if (t > 0) {
						i.textContent = x ? x.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], D()), H.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], D());
					}
				}
			} else if (i.nodeType === 8) if (i.data === T) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(w, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += w.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = E.createElement("template");
		return n.innerHTML = e, n;
	}
};
function G(e, t, n = e, r) {
	if (t === z) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = O(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = G(e, i._$AS(e, t.values), i, r)), t;
}
var ce = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? E).importNode(t, !0);
		H.currentNode = r;
		let i = H.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new K(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new fe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = H.nextNode(), a++);
		}
		return H.currentNode = E, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, K = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = B, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = G(this, e, t), O(e) ? e === B || e == null || e === "" ? (this._$AH !== B && this._$AR(), this._$AH = B) : e !== this._$AH && e !== z && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? oe(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== B && O(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = W.createElement(U(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new ce(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = V.get(e.strings);
		return t === void 0 && V.set(e.strings, t = new W(e)), t;
	}
	k(t) {
		k(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(D()), this.O(D()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = b(e).nextSibling;
			b(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, q = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = B, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = B;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = G(this, e, t, 0), a = !O(e) || e !== this._$AH && e !== z, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = G(this, r[n + o], t, o), s === z && (s = this._$AH[o]), a ||= !O(s) || s !== this._$AH[o], s === B ? e = B : e !== B && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === B ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, le = class extends q {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === B ? void 0 : e;
	}
}, ue = class extends q {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== B);
	}
}, de = class extends q {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = G(this, e, t, 0) ?? B) === z) return;
		let n = this._$AH, r = e === B && n !== B || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== B && (n === B || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, fe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		G(this, e);
	}
}, J = y.litHtmlPolyfillSupport;
J?.(W, K), (y.litHtmlVersions ??= []).push("3.3.3");
var pe = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new K(t.insertBefore(D(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Y = globalThis, X = class extends v {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = pe(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return z;
	}
};
X._$litElement$ = !0, X.finalized = !0, Y.litElementHydrateSupport?.({ LitElement: X });
var me = Y.litElementPolyfillSupport;
me?.({ LitElement: X }), (Y.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var he = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, ge = {
	attribute: !0,
	type: String,
	converter: h,
	reflect: !1,
	hasChanged: g
}, _e = (e = ge, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function Z(e) {
	return (t, n) => typeof n == "object" ? _e(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/decorate.js
function Q(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region human-panel.ts
var $ = class extends X {
	constructor(...e) {
		super(...e), this.heading = "Human Engine", this.chordSequence = "Cmaj7 Dm7 G7 Cmaj", this.hideInput = !1, this.spread = .5, this.duration = 1, this.minVelocity = 64, this.maxVelocity = 100, this.humanVariance = .5, this.microTiming = .2, this.debugExpanded = !0, this.showInfo = !1;
	}
	static get styles() {
		return o`
    :host {
      /* Theme Tokens - Host applications can override these CSS custom properties */
      --hp-bg: var(--human-bg, #18181b);
      --hp-surface: var(--human-surface, #27272a);
      --hp-border: var(--human-border, #3f3f46);
      --hp-text-primary: var(--human-text-primary, #f4f4f5);
      --hp-text-secondary: var(--human-text-secondary, #a1a1aa);
      --hp-accent: var(--human-accent, #3b82f6);
      --hp-accent-hover: var(--human-accent-hover, #60a5fa);
      --hp-radius: var(--human-radius, 8px);
      --hp-font-family: var(--human-font, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);

      display: block;
      width: 100%;
      min-width: 360px;
      max-width: 400px;
      background: var(--hp-bg);
      color: var(--hp-text-primary);
      font-family: var(--hp-font-family);
      border-radius: var(--hp-radius);
      border: 1px solid var(--hp-border);
      box-sizing: border-box;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    * {
      box-sizing: border-box;
    }

    .panel-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--hp-border);
      background: var(--hp-surface);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .panel-header h2 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    .info-toggle-btn {
      background: transparent;
      border: 1px solid var(--hp-border);
      color: var(--hp-text-secondary);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.75rem;
      font-weight: 600;
      transition: all 0.2s;
      padding: 0;
      outline: none;
    }
    .info-toggle-btn:hover {
      color: var(--hp-accent);
      border-color: var(--hp-accent);
    }
    .info-toggle-btn.active {
      background: var(--hp-accent);
      color: #ffffff;
      border-color: var(--hp-accent);
    }

    .panel-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .group-header-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      border-bottom: 1px solid var(--hp-border);
      padding-bottom: 8px;
      gap: 12px;
    }

    .group-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--hp-text-secondary);
      font-weight: 700;
      margin: 0;
    }

    .group-explanation {
      font-size: 0.7rem;
      color: var(--hp-text-secondary);
      opacity: 0.75;
      font-style: italic;
      font-weight: normal;
    }

    .setting-explanation {
      font-size: 0.72rem;
      color: var(--hp-text-secondary);
      opacity: 0.85;
      line-height: 1.35;
      margin-top: 4px;
      padding-left: 2px;
    }

    .control-row {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .control-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 0.875rem;
    }

    .control-label {
      color: var(--hp-text-primary);
      font-weight: 500;
    }

    .control-value {
      color: var(--hp-accent);
      font-variant-numeric: tabular-nums;
      font-size: 0.75rem;
      font-weight: 600;
      background: rgba(59, 130, 246, 0.1); /* Subtle accent bg */
      padding: 2px 6px;
      border-radius: 4px;
    }

    /* Text Input Styling */
    input[type="text"] {
      width: 100%;
      background: var(--hp-surface);
      border: 1px solid var(--hp-border);
      color: var(--hp-text-primary);
      padding: 10px 12px;
      border-radius: 6px;
      font-family: inherit;
      font-size: 0.875rem;
      transition: all 0.2s ease-in-out;
    }

    input[type="text"]:focus {
      outline: none;
      border-color: var(--hp-accent);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }

    input[type="text"]::placeholder {
      color: var(--hp-text-secondary);
      opacity: 0.6;
    }

    /* Range Slider Styling */
    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
      padding: 8px 0; /* Increase touch target area */
      cursor: pointer;
    }

    input[type="range"]:focus {
      outline: none;
    }

    /* Webkit Slider Track */
    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      background: var(--hp-surface);
      border-radius: 2px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Webkit Slider Thumb */
    input[type="range"]::-webkit-slider-thumb {
      border: 2px solid var(--hp-bg);
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: var(--hp-accent);
      -webkit-appearance: none;
      margin-top: -7px;
      transition: transform 0.1s, background-color 0.2s;
    }

    input[type="range"]::-webkit-slider-thumb:hover {
      background: var(--hp-accent-hover);
      transform: scale(1.1);
    }

    input[type="range"]:active::-webkit-slider-thumb {
      transform: scale(0.95);
    }

    /* Firefox Slider Track */
    input[type="range"]::-moz-range-track {
      width: 100%;
      height: 4px;
      background: var(--hp-surface);
      border-radius: 2px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Firefox Slider Thumb */
    input[type="range"]::-moz-range-thumb {
      border: 2px solid var(--hp-bg);
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: var(--hp-accent);
      transition: transform 0.1s, background-color 0.2s;
    }

    input[type="range"]::-moz-range-thumb:hover {
      background: var(--hp-accent-hover);
      transform: scale(1.1);
    }

    input[type="range"]:active::-moz-range-thumb {
      transform: scale(0.95);
    }

    .preview-btn {
      width: 100%;
      background: var(--hp-accent);
      color: #ffffff;
      border: none;
      padding: 12px 16px;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

    .preview-btn:hover {
      background: var(--hp-accent-hover);
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
    }

    .preview-btn:active {
      transform: translateY(1px);
      box-shadow: 0 1px 5px rgba(59, 130, 246, 0.3);
    }

    .preview-btn svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
  `;
	}
	emitChange() {
		let e = {
			chordSequence: this.chordSequence,
			spread: this.spread,
			duration: this.duration,
			minVelocity: this.minVelocity,
			maxVelocity: this.maxVelocity,
			humanVariance: this.humanVariance,
			microTiming: this.microTiming
		};
		this.dispatchEvent(new CustomEvent("human-change", {
			detail: e,
			bubbles: !0,
			composed: !0
		}));
	}
	toggleInfo() {
		this.showInfo = !this.showInfo;
	}
	handleTextChange(e) {
		let t = e.target;
		this.chordSequence = t.value, this.emitChange();
	}
	handleNumberChange(e, t, n = !1) {
		let r = t.target, i = n ? parseInt(r.value, 10) : parseFloat(r.value);
		this[e] = i, e === "minVelocity" && this.minVelocity > this.maxVelocity ? this.maxVelocity = this.minVelocity : e === "maxVelocity" && this.maxVelocity < this.minVelocity && (this.minVelocity = this.maxVelocity), this.emitChange();
	}
	handlePreview() {
		let e = {
			chordSequence: this.chordSequence,
			spread: this.spread,
			duration: this.duration,
			minVelocity: this.minVelocity,
			maxVelocity: this.maxVelocity,
			humanVariance: this.humanVariance,
			microTiming: this.microTiming
		};
		this.dispatchEvent(new CustomEvent("human-preview", {
			detail: e,
			bubbles: !0,
			composed: !0
		}));
	}
	toggleDebug() {
		this.debugExpanded = !this.debugExpanded;
	}
	render() {
		return R`
      <div class="panel-header">
        <h2>${this.heading}</h2>
        <button 
          class="info-toggle-btn ${this.showInfo ? "active" : ""}" 
          @click=${this.toggleInfo} 
          title="Toggle explanations"
          aria-label="Toggle explanations"
        >
          ?
        </button>
      </div>
      <div class="panel-content">
        
        <!-- Section: Debug -->
        <div class="control-group">
          <div class="group-header-row" @click=${this.toggleDebug} style="cursor: pointer; user-select: none;">
            <h3 class="group-title" style="display: flex; align-items: center; gap: 8px;">
              <span>debug</span>
              ${this.showInfo ? R`
                <span class="group-explanation" style="text-transform: none; font-weight: normal;">(test tools)</span>
              ` : ""}
            </h3>
            <span style="font-size: 0.65rem; color: var(--hp-text-secondary);">${this.debugExpanded ? "▼" : "▶"}</span>
          </div>
          
          ${this.debugExpanded ? R`
            ${this.hideInput ? "" : R`
              <div class="control-row">
                <input 
                  type="text" 
                  .value=${this.chordSequence}
                  @input=${this.handleTextChange}
                  placeholder="e.g. Cmaj7 Dm7 G7 Cmaj"
                  aria-label="Chord Sequence"
                />
                ${this.showInfo ? R`
                  <div class="setting-explanation">Type a space-separated sequence of chords to play and preview.</div>
                ` : ""}
              </div>
            `}
            
            <div class="control-row">
              <button class="preview-btn" @click=${this.handlePreview} aria-label="Preview Configuration">
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Preview
              </button>
              ${this.showInfo ? R`
                <div class="setting-explanation">Triggers immediate chord playback using your humanized settings.</div>
              ` : ""}
            </div>
          ` : ""}
        </div>

        <!-- Section: Chord Gen Group -->
        <div class="control-group">
          <div class="group-header-row">
            <h3 class="group-title">Chord Gen Group</h3>
            ${this.showInfo ? R`
              <span class="group-explanation">(strum & note length)</span>
            ` : ""}
          </div>
          
          <!-- Spread -->
          <div class="control-row">
            <div class="control-header">
              <label class="control-label">Spread</label>
              <span class="control-value">${this.spread.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              .value=${this.spread.toString()}
              @input=${(e) => this.handleNumberChange("spread", e)}
              aria-label="Spread"
            />
            ${this.showInfo ? R`
              <div class="setting-explanation">Staggers the start times of notes in the chord for an arpeggiated or strummed feel.</div>
            ` : ""}
          </div>

          <!-- Duration -->
          <div class="control-row">
            <div class="control-header">
              <label class="control-label">Duration</label>
              <span class="control-value">${this.duration.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="0.1" max="2.0" step="0.01" 
              .value=${this.duration.toString()}
              @input=${(e) => this.handleNumberChange("duration", e)}
              aria-label="Duration"
            />
            ${this.showInfo ? R`
              <div class="setting-explanation">Controls the base length of the notes during playback.</div>
            ` : ""}
          </div>
        </div>

        <!-- Section: Dynamics Group -->
        <div class="control-group">
          <div class="group-header-row">
            <h3 class="group-title">Dynamics Group</h3>
            ${this.showInfo ? R`
              <span class="group-explanation">(velocity & randomness)</span>
            ` : ""}
          </div>
          
          <!-- Min Velocity -->
          <div class="control-row">
            <div class="control-header">
              <label class="control-label">Min Velocity</label>
              <span class="control-value">${this.minVelocity}</span>
            </div>
            <input 
              type="range" 
              min="0" max="127" step="1" 
              .value=${this.minVelocity.toString()}
              @input=${(e) => this.handleNumberChange("minVelocity", e, !0)}
              aria-label="Min Velocity"
            />
            ${this.showInfo ? R`
              <div class="setting-explanation">The minimum MIDI velocity (volume) for chord notes.</div>
            ` : ""}
          </div>

          <!-- Max Velocity -->
          <div class="control-row">
            <div class="control-header">
              <label class="control-label">Max Velocity</label>
              <span class="control-value">${this.maxVelocity}</span>
            </div>
            <input 
              type="range" 
              min="0" max="127" step="1" 
              .value=${this.maxVelocity.toString()}
              @input=${(e) => this.handleNumberChange("maxVelocity", e, !0)}
              aria-label="Max Velocity"
            />
            ${this.showInfo ? R`
              <div class="setting-explanation">The maximum MIDI velocity (volume) for chord notes.</div>
            ` : ""}
          </div>

          <!-- Human Variance -->
          <div class="control-row">
            <div class="control-header">
              <label class="control-label">Human Variance</label>
              <span class="control-value">${this.humanVariance.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              .value=${this.humanVariance.toString()}
              @input=${(e) => this.handleNumberChange("humanVariance", e)}
              aria-label="Human Variance"
            />
            ${this.showInfo ? R`
              <div class="setting-explanation">Adds subtle random velocity and duration deviations.</div>
            ` : ""}
          </div>
        </div>

        <!-- Section: Timing Grid Group -->
        <div class="control-group">
          <div class="group-header-row">
            <h3 class="group-title">Timing Grid Group</h3>
            ${this.showInfo ? R`
              <span class="group-explanation">(onset timing offsets)</span>
            ` : ""}
          </div>
          
          <!-- Micro-timing / Variation -->
          <div class="control-row">
            <div class="control-header">
              <label class="control-label">Micro-timing (Variation)</label>
              <span class="control-value">${this.microTiming.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              .value=${this.microTiming.toString()}
              @input=${(e) => this.handleNumberChange("microTiming", e)}
              aria-label="Micro-timing Variation"
            />
            ${this.showInfo ? R`
              <div class="setting-explanation">Shifts note onset times slightly early or late for human feel.</div>
            ` : ""}
          </div>
        </div>

      </div>
    `;
	}
};
Q([Z({ type: String })], $.prototype, "heading", void 0), Q([Z({
	type: String,
	attribute: "chord-sequence"
})], $.prototype, "chordSequence", void 0), Q([Z({ type: Boolean })], $.prototype, "hideInput", void 0), Q([Z({ type: Number })], $.prototype, "spread", void 0), Q([Z({ type: Number })], $.prototype, "duration", void 0), Q([Z({ type: Number })], $.prototype, "minVelocity", void 0), Q([Z({ type: Number })], $.prototype, "maxVelocity", void 0), Q([Z({ type: Number })], $.prototype, "humanVariance", void 0), Q([Z({ type: Number })], $.prototype, "microTiming", void 0), Q([Z({ type: Boolean })], $.prototype, "debugExpanded", void 0), Q([Z({ type: Boolean })], $.prototype, "showInfo", void 0), $ = Q([he("human-panel")], $);
//#endregion
export { $ as HumanPanel };
