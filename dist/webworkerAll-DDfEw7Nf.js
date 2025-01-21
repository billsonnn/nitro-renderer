import { E as p, U as pt, T as pe, N as K, M as P, G as se, p as D, O as Ue, w as $, Q as B, f as A, P as gt, J as ie, V as Ge, W as xt, X as W, Y as w, Z as C, _ as O, B as M, $ as H, a0 as Z, a1 as mt, a2 as k, S as Y, a3 as j, a4 as b, a5 as _t, a6 as ne, g as ee, a7 as E, d as ae, c as bt, a8 as yt, a9 as Tt, aa as Fe, v as ke, ab as vt, ac as Ae, z as St, A as He, s as wt, ad as Ct, ae as Bt, x as Mt, y as Pt, F as Rt, af as Ut, ag as Gt, ah as te, ai as re, aj as De, D as ze, ak as V, R as ge, al as Ft, am as xe, an as me, e as y, ao as kt } from "./index-6BV7F4R3.js";
class We {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(e) {
    Object.defineProperty(
      this,
      "resizeTo",
      /**
       * The HTML element or window to automatically resize the
       * renderer's view element to match width and height.
       * @member {Window|HTMLElement}
       * @name resizeTo
       * @memberof app.Application#
       */
      {
        set(t) {
          globalThis.removeEventListener("resize", this.queueResize), this._resizeTo = t, t && (globalThis.addEventListener("resize", this.queueResize), this.resize());
        },
        get() {
          return this._resizeTo;
        }
      }
    ), this.queueResize = () => {
      this._resizeTo && (this._cancelResize(), this._resizeId = requestAnimationFrame(() => this.resize()));
    }, this._cancelResize = () => {
      this._resizeId && (cancelAnimationFrame(this._resizeId), this._resizeId = null);
    }, this.resize = () => {
      if (!this._resizeTo)
        return;
      this._cancelResize();
      let t, r;
      if (this._resizeTo === globalThis.window)
        t = globalThis.innerWidth, r = globalThis.innerHeight;
      else {
        const { clientWidth: s, clientHeight: n } = this._resizeTo;
        t = s, r = n;
      }
      this.renderer.resize(t, r), this.render();
    }, this._resizeId = null, this._resizeTo = null, this.resizeTo = e.resizeTo || null;
  }
  /**
   * Clean up the ticker, scoped to application
   * @static
   * @private
   */
  static destroy() {
    globalThis.removeEventListener("resize", this.queueResize), this._cancelResize(), this._cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
  }
}
We.extension = p.Application;
class Oe {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(e) {
    e = Object.assign({
      autoStart: !0,
      sharedTicker: !1
    }, e), Object.defineProperty(
      this,
      "ticker",
      {
        set(t) {
          this._ticker && this._ticker.remove(this.render, this), this._ticker = t, t && t.add(this.render, this, pt.LOW);
        },
        get() {
          return this._ticker;
        }
      }
    ), this.stop = () => {
      this._ticker.stop();
    }, this.start = () => {
      this._ticker.start();
    }, this._ticker = null, this.ticker = e.sharedTicker ? pe.shared : new pe(), e.autoStart && this.start();
  }
  /**
   * Clean up the ticker, scoped to application.
   * @static
   * @private
   */
  static destroy() {
    if (this._ticker) {
      const e = this._ticker;
      this.ticker = null, e.destroy();
    }
  }
}
Oe.extension = p.Application;
class Ve {
  constructor(e) {
    this._renderer = e;
  }
  push(e, t, r) {
    this._renderer.renderPipes.batch.break(r), r.add({
      renderPipeId: "filter",
      canBundle: !1,
      action: "pushFilter",
      container: t,
      filterEffect: e
    });
  }
  pop(e, t, r) {
    this._renderer.renderPipes.batch.break(r), r.add({
      renderPipeId: "filter",
      action: "popFilter",
      canBundle: !1
    });
  }
  execute(e) {
    e.action === "pushFilter" ? this._renderer.filter.push(e) : e.action === "popFilter" && this._renderer.filter.pop();
  }
  destroy() {
    this._renderer = null;
  }
}
Ve.extension = {
  type: [
    p.WebGLPipes,
    p.WebGPUPipes,
    p.CanvasPipes
  ],
  name: "filter"
};
const At = new P();
function Ht(i, e) {
  return e.clear(), Ee(i, e), e.isValid || e.set(0, 0, 0, 0), i.renderGroup ? e.applyMatrix(i.renderGroup.localTransform) : e.applyMatrix(i.parentRenderGroup.worldTransform), e;
}
function Ee(i, e) {
  if (i.localDisplayStatus !== 7 || !i.measurable)
    return;
  const t = !!i.effects.length;
  let r = e;
  if ((i.renderGroup || t) && (r = K.get().clear()), i.boundsArea)
    e.addRect(i.boundsArea, i.worldTransform);
  else {
    if (i.renderPipeId) {
      const n = i.bounds;
      r.addFrame(
        n.minX,
        n.minY,
        n.maxX,
        n.maxY,
        i.groupTransform
      );
    }
    const s = i.children;
    for (let n = 0; n < s.length; n++)
      Ee(s[n], r);
  }
  if (t) {
    let s = !1;
    for (let n = 0; n < i.effects.length; n++)
      i.effects[n].addBounds && (s || (s = !0, r.applyMatrix(i.parentRenderGroup.worldTransform)), i.effects[n].addBounds(r, !0));
    s && (r.applyMatrix(i.parentRenderGroup.worldTransform.copyTo(At).invert()), e.addBounds(r, i.relativeGroupTransform)), e.addBounds(r), K.return(r);
  } else i.renderGroup && (e.addBounds(r, i.relativeGroupTransform), K.return(r));
}
function Dt(i, e) {
  e.clear();
  const t = e.matrix;
  for (let r = 0; r < i.length; r++) {
    const s = i[r];
    s.globalDisplayStatus < 7 || (e.matrix = s.worldTransform, s.addBounds(e));
  }
  return e.matrix = t, e;
}
const zt = new se({
  attributes: {
    aPosition: {
      buffer: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      format: "float32x2",
      stride: 2 * 4,
      offset: 0
    }
  },
  indexBuffer: new Uint32Array([0, 1, 2, 0, 2, 3])
});
class Ie {
  constructor(e) {
    this._filterStackIndex = 0, this._filterStack = [], this._filterGlobalUniforms = new D({
      uInputSize: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputPixel: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputClamp: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uGlobalFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputTexture: { value: new Float32Array(4), type: "vec4<f32>" }
    }), this._globalFilterBindGroup = new Ue({}), this.renderer = e;
  }
  /**
   * The back texture of the currently active filter. Requires the filter to have `blendRequired` set to true.
   * @readonly
   */
  get activeBackTexture() {
    var e;
    return (e = this._activeFilterData) == null ? void 0 : e.backTexture;
  }
  push(e) {
    var g;
    const t = this.renderer, r = e.filterEffect.filters;
    this._filterStack[this._filterStackIndex] || (this._filterStack[this._filterStackIndex] = this._getFilterData());
    const s = this._filterStack[this._filterStackIndex];
    if (this._filterStackIndex++, r.length === 0) {
      s.skip = !0;
      return;
    }
    const n = s.bounds;
    e.renderables ? Dt(e.renderables, n) : e.filterEffect.filterArea ? (n.clear(), n.addRect(e.filterEffect.filterArea), n.applyMatrix(e.container.worldTransform)) : Ht(e.container, n);
    const a = t.renderTarget.renderTarget.colorTexture.source;
    let o = 1 / 0, l = 0, u = !0, c = !1, d = !1, h = !0;
    for (let x = 0; x < r.length; x++) {
      const f = r[x];
      if (o = Math.min(o, f.resolution === "inherit" ? a._resolution : f.resolution), l += f.padding, f.antialias === "off" ? u = !1 : f.antialias === "inherit" && u && (u = a.antialias), f.clipToViewport || (h = !1), !!!(f.compatibleRenderers & t.type)) {
        d = !1;
        break;
      }
      if (f.blendRequired && !(((g = t.backBuffer) == null ? void 0 : g.useBackBuffer) ?? !0)) {
        $("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."), d = !1;
        break;
      }
      d = f.enabled || d, c = c || f.blendRequired;
    }
    if (!d) {
      s.skip = !0;
      return;
    }
    if (n.scale(o), h) {
      const x = t.renderTarget.rootViewPort;
      n.fitBounds(0, x.width, 0, x.height);
    }
    if (n.ceil().scale(1 / o).pad(l | 0), !n.isPositive) {
      s.skip = !0;
      return;
    }
    s.skip = !1, s.bounds = n, s.blendRequired = c, s.container = e.container, s.filterEffect = e.filterEffect, s.previousRenderSurface = t.renderTarget.renderSurface, s.inputTexture = B.getOptimalTexture(
      n.width,
      n.height,
      o,
      u
    ), t.renderTarget.bind(s.inputTexture, !0), t.globalUniforms.push({
      offset: n
    });
  }
  pop() {
    const e = this.renderer;
    this._filterStackIndex--;
    const t = this._filterStack[this._filterStackIndex];
    if (t.skip)
      return;
    this._activeFilterData = t;
    const r = t.inputTexture, s = t.bounds;
    let n = A.EMPTY;
    if (e.renderTarget.finishRenderPass(), t.blendRequired) {
      const o = this._filterStackIndex > 0 ? this._filterStack[this._filterStackIndex - 1].bounds : null, l = e.renderTarget.getRenderTarget(t.previousRenderSurface);
      n = this.getBackTexture(l, s, o);
    }
    t.backTexture = n;
    const a = t.filterEffect.filters;
    if (this._globalFilterBindGroup.setResource(r.source.style, 2), this._globalFilterBindGroup.setResource(n.source, 3), e.globalUniforms.pop(), a.length === 1)
      a[0].apply(this, r, t.previousRenderSurface, !1), B.returnTexture(r);
    else {
      let o = t.inputTexture, l = B.getOptimalTexture(
        s.width,
        s.height,
        o.source._resolution,
        !1
      ), u = 0;
      for (u = 0; u < a.length - 1; ++u) {
        a[u].apply(this, o, l, !0);
        const d = o;
        o = l, l = d;
      }
      a[u].apply(this, o, t.previousRenderSurface, !1), B.returnTexture(o), B.returnTexture(l);
    }
    t.blendRequired && B.returnTexture(n);
  }
  getBackTexture(e, t, r) {
    const s = e.colorTexture.source._resolution, n = B.getOptimalTexture(
      t.width,
      t.height,
      s,
      !1
    );
    let a = t.minX, o = t.minY;
    r && (a -= r.minX, o -= r.minY), a = Math.floor(a * s), o = Math.floor(o * s);
    const l = Math.ceil(t.width * s), u = Math.ceil(t.height * s);
    return this.renderer.renderTarget.copyToTexture(
      e,
      n,
      { x: a, y: o },
      { width: l, height: u },
      { x: 0, y: 0 }
    ), n;
  }
  applyFilter(e, t, r, s) {
    const n = this.renderer, a = this._filterStack[this._filterStackIndex], o = a.bounds, l = gt.shared, c = a.previousRenderSurface === r;
    let d = this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution, h = this._filterStackIndex - 1;
    for (; h > 0 && this._filterStack[h].skip; )
      --h;
    h > 0 && (d = this._filterStack[h].inputTexture.source._resolution);
    const g = this._filterGlobalUniforms, x = g.uniforms, f = x.uOutputFrame, m = x.uInputSize, _ = x.uInputPixel, R = x.uInputClamp, T = x.uGlobalFrame, U = x.uOutputTexture;
    if (c) {
      let G = this._filterStackIndex;
      for (; G > 0; ) {
        G--;
        const F = this._filterStack[this._filterStackIndex - 1];
        if (!F.skip) {
          l.x = F.bounds.minX, l.y = F.bounds.minY;
          break;
        }
      }
      f[0] = o.minX - l.x, f[1] = o.minY - l.y;
    } else
      f[0] = 0, f[1] = 0;
    f[2] = t.frame.width, f[3] = t.frame.height, m[0] = t.source.width, m[1] = t.source.height, m[2] = 1 / m[0], m[3] = 1 / m[1], _[0] = t.source.pixelWidth, _[1] = t.source.pixelHeight, _[2] = 1 / _[0], _[3] = 1 / _[1], R[0] = 0.5 * _[2], R[1] = 0.5 * _[3], R[2] = t.frame.width * m[2] - 0.5 * _[2], R[3] = t.frame.height * m[3] - 0.5 * _[3];
    const z = this.renderer.renderTarget.rootRenderTarget.colorTexture;
    T[0] = l.x * d, T[1] = l.y * d, T[2] = z.source.width * d, T[3] = z.source.height * d;
    const S = this.renderer.renderTarget.getRenderTarget(r);
    if (n.renderTarget.bind(r, !!s), r instanceof A ? (U[0] = r.frame.width, U[1] = r.frame.height) : (U[0] = S.width, U[1] = S.height), U[2] = S.isRoot ? -1 : 1, g.update(), n.renderPipes.uniformBatch) {
      const G = n.renderPipes.uniformBatch.getUboResource(g);
      this._globalFilterBindGroup.setResource(G, 0);
    } else
      this._globalFilterBindGroup.setResource(g, 0);
    this._globalFilterBindGroup.setResource(t.source, 1), this._globalFilterBindGroup.setResource(t.source.style, 2), e.groups[0] = this._globalFilterBindGroup, n.encoder.draw({
      geometry: zt,
      shader: e,
      state: e._state,
      topology: "triangle-list"
    }), n.type === ie.WEBGL && n.renderTarget.finishRenderPass();
  }
  _getFilterData() {
    return {
      skip: !1,
      inputTexture: null,
      bounds: new Ge(),
      container: null,
      filterEffect: null,
      blendRequired: !1,
      previousRenderSurface: null
    };
  }
  /**
   * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
   *
   * Use `outputMatrix * vTextureCoord` in the shader.
   * @param outputMatrix - The matrix to output to.
   * @param {Sprite} sprite - The sprite to map to.
   * @returns The mapped matrix.
   */
  calculateSpriteMatrix(e, t) {
    const r = this._activeFilterData, s = e.set(
      r.inputTexture._source.width,
      0,
      0,
      r.inputTexture._source.height,
      r.bounds.minX,
      r.bounds.minY
    ), n = t.worldTransform.copyTo(P.shared);
    return n.invert(), s.prepend(n), s.scale(
      1 / t.texture.frame.width,
      1 / t.texture.frame.height
    ), s.translate(t.anchor.x, t.anchor.y), s;
  }
}
Ie.extension = {
  type: [
    p.WebGLSystem,
    p.WebGPUSystem
  ],
  name: "filter"
};
class X extends xt {
  /**
   * @param options - Options for the Graphics.
   */
  constructor(e) {
    e instanceof W && (e = { context: e });
    const { context: t, roundPixels: r, ...s } = e || {};
    super({
      label: "Graphics",
      ...s
    }), this.renderPipeId = "graphics", t ? this._context = t : this._context = this._ownedContext = new W(), this._context.on("update", this.onViewUpdate, this), this.allowChildren = !1, this.roundPixels = r ?? !1;
  }
  set context(e) {
    e !== this._context && (this._context.off("update", this.onViewUpdate, this), this._context = e, this._context.on("update", this.onViewUpdate, this), this.onViewUpdate());
  }
  get context() {
    return this._context;
  }
  /**
   * The local bounds of the graphic.
   * @type {rendering.Bounds}
   */
  get bounds() {
    return this._context.bounds;
  }
  /**
   * Adds the bounds of this object to the bounds object.
   * @param bounds - The output bounds object.
   */
  addBounds(e) {
    e.addBounds(this._context.bounds);
  }
  /**
   * Checks if the object contains the given point.
   * @param point - The point to check
   */
  containsPoint(e) {
    return this._context.containsPoint(e);
  }
  /**
   * Destroys this graphics renderable and optionally its context.
   * @param options - Options parameter. A boolean will act as if all options
   *
   * If the context was created by this graphics and `destroy(false)` or `destroy()` is called
   * then the context will still be destroyed.
   *
   * If you want to explicitly not destroy this context that this graphics created,
   * then you should pass destroy({ context: false })
   *
   * If the context was passed in as an argument to the constructor then it will not be destroyed
   * @param {boolean} [options.texture=false] - Should destroy the texture of the graphics context
   * @param {boolean} [options.textureSource=false] - Should destroy the texture source of the graphics context
   * @param {boolean} [options.context=false] - Should destroy the context
   */
  destroy(e) {
    this._ownedContext && !e ? this._ownedContext.destroy(e) : (e === !0 || (e == null ? void 0 : e.context) === !0) && this._context.destroy(e), this._ownedContext = null, this._context = null, super.destroy(e);
  }
  _callContextMethod(e, t) {
    return this.context[e](...t), this;
  }
  // --------------------------------------- GraphicsContext methods ---------------------------------------
  /**
   * Sets the current fill style of the graphics context. The fill style can be a color, gradient,
   * pattern, or a more complex style defined by a FillStyle object.
   * @param {FillInput} args - The fill style to apply. This can be a simple color, a gradient or
   * pattern object, or a FillStyle or ConvertedFillStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setFillStyle(...e) {
    return this._callContextMethod("setFillStyle", e);
  }
  /**
   * Sets the current stroke style of the graphics context. Similar to fill styles, stroke styles can
   * encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
   * @param {StrokeInput} args - The stroke style to apply. Can be defined as a color, a gradient or pattern,
   * or a StrokeStyle or ConvertedStrokeStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setStrokeStyle(...e) {
    return this._callContextMethod("setStrokeStyle", e);
  }
  fill(...e) {
    return this._callContextMethod("fill", e);
  }
  /**
   * Strokes the current path with the current stroke style. This method can take an optional
   * FillStyle parameter to define the stroke's appearance, including its color, width, and other properties.
   * @param {FillStyle} args - (Optional) The stroke style to apply. Can be defined as a simple color or a more
   * complex style object. If omitted, uses the current stroke style.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  stroke(...e) {
    return this._callContextMethod("stroke", e);
  }
  texture(...e) {
    return this._callContextMethod("texture", e);
  }
  /**
   * Resets the current path. Any previous path and its commands are discarded and a new path is
   * started. This is typically called before beginning a new shape or series of drawing commands.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  beginPath() {
    return this._callContextMethod("beginPath", []);
  }
  /**
   * Applies a cutout to the last drawn shape. This is used to create holes or complex shapes by
   * subtracting a path from the previously drawn path. If a hole is not completely in a shape, it will
   * fail to cut correctly!
   */
  cut() {
    return this._callContextMethod("cut", []);
  }
  arc(...e) {
    return this._callContextMethod("arc", e);
  }
  arcTo(...e) {
    return this._callContextMethod("arcTo", e);
  }
  arcToSvg(...e) {
    return this._callContextMethod("arcToSvg", e);
  }
  bezierCurveTo(...e) {
    return this._callContextMethod("bezierCurveTo", e);
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    return this._callContextMethod("closePath", []);
  }
  ellipse(...e) {
    return this._callContextMethod("ellipse", e);
  }
  circle(...e) {
    return this._callContextMethod("circle", e);
  }
  path(...e) {
    return this._callContextMethod("path", e);
  }
  lineTo(...e) {
    return this._callContextMethod("lineTo", e);
  }
  moveTo(...e) {
    return this._callContextMethod("moveTo", e);
  }
  quadraticCurveTo(...e) {
    return this._callContextMethod("quadraticCurveTo", e);
  }
  rect(...e) {
    return this._callContextMethod("rect", e);
  }
  roundRect(...e) {
    return this._callContextMethod("roundRect", e);
  }
  poly(...e) {
    return this._callContextMethod("poly", e);
  }
  regularPoly(...e) {
    return this._callContextMethod("regularPoly", e);
  }
  roundPoly(...e) {
    return this._callContextMethod("roundPoly", e);
  }
  roundShape(...e) {
    return this._callContextMethod("roundShape", e);
  }
  filletRect(...e) {
    return this._callContextMethod("filletRect", e);
  }
  chamferRect(...e) {
    return this._callContextMethod("chamferRect", e);
  }
  star(...e) {
    return this._callContextMethod("star", e);
  }
  svg(...e) {
    return this._callContextMethod("svg", e);
  }
  restore(...e) {
    return this._callContextMethod("restore", e);
  }
  /** Saves the current graphics state, including transformations, fill styles, and stroke styles, onto a stack. */
  save() {
    return this._callContextMethod("save", []);
  }
  /**
   * Returns the current transformation matrix of the graphics context.
   * @returns The current transformation matrix.
   */
  getTransform() {
    return this.context.getTransform();
  }
  /**
   * Resets the current transformation matrix to the identity matrix, effectively removing
   * any transformations (rotation, scaling, translation) previously applied.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  resetTransform() {
    return this._callContextMethod("resetTransform", []);
  }
  rotateTransform(...e) {
    return this._callContextMethod("rotate", e);
  }
  scaleTransform(...e) {
    return this._callContextMethod("scale", e);
  }
  setTransform(...e) {
    return this._callContextMethod("setTransform", e);
  }
  transform(...e) {
    return this._callContextMethod("transform", e);
  }
  translateTransform(...e) {
    return this._callContextMethod("translate", e);
  }
  /**
   * Clears all drawing commands from the graphics context, effectively resetting it. This includes clearing the path,
   * and optionally resetting transformations to the identity matrix.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  clear() {
    return this._callContextMethod("clear", []);
  }
  /**
   * The fill style to use.
   * @type {ConvertedFillStyle}
   */
  get fillStyle() {
    return this._context.fillStyle;
  }
  set fillStyle(e) {
    this._context.fillStyle = e;
  }
  /**
   * The stroke style to use.
   * @type {ConvertedStrokeStyle}
   */
  get strokeStyle() {
    return this._context.strokeStyle;
  }
  set strokeStyle(e) {
    this._context.strokeStyle = e;
  }
  /**
   * Creates a new Graphics object.
   * Note that only the context of the object is cloned, not its transform (position,scale,etc)
   * @param deep - Whether to create a deep clone of the graphics object. If false, the context
   * will be shared between the two objects (default false). If true, the context will be
   * cloned (recommended if you need to modify the context in any way).
   * @returns - A clone of the graphics object
   */
  clone(e = !1) {
    return e ? new X(this._context.clone()) : (this._ownedContext = null, new X(this._context));
  }
  // -------- v7 deprecations ---------
  /**
   * @param width
   * @param color
   * @param alpha
   * @deprecated since 8.0.0 Use {@link Graphics#setStrokeStyle} instead
   */
  lineStyle(e, t, r) {
    w(C, "Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");
    const s = {};
    return e && (s.width = e), t && (s.color = t), r && (s.alpha = r), this.context.strokeStyle = s, this;
  }
  /**
   * @param color
   * @param alpha
   * @deprecated since 8.0.0 Use {@link Graphics#fill} instead
   */
  beginFill(e, t) {
    w(C, "Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");
    const r = {};
    return e && (r.color = e), t && (r.alpha = t), this.context.fillStyle = r, this;
  }
  /**
   * @deprecated since 8.0.0 Use {@link Graphics#fill} instead
   */
  endFill() {
    w(C, "Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."), this.context.fill();
    const e = this.context.strokeStyle;
    return (e.width !== W.defaultStrokeStyle.width || e.color !== W.defaultStrokeStyle.color || e.alpha !== W.defaultStrokeStyle.alpha) && this.context.stroke(), this;
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#circle} instead
   */
  drawCircle(...e) {
    return w(C, "Graphics#drawCircle has been renamed to Graphics#circle"), this._callContextMethod("circle", e);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#ellipse} instead
   */
  drawEllipse(...e) {
    return w(C, "Graphics#drawEllipse has been renamed to Graphics#ellipse"), this._callContextMethod("ellipse", e);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#poly} instead
   */
  drawPolygon(...e) {
    return w(C, "Graphics#drawPolygon has been renamed to Graphics#poly"), this._callContextMethod("poly", e);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#rect} instead
   */
  drawRect(...e) {
    return w(C, "Graphics#drawRect has been renamed to Graphics#rect"), this._callContextMethod("rect", e);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#roundRect} instead
   */
  drawRoundedRect(...e) {
    return w(C, "Graphics#drawRoundedRect has been renamed to Graphics#roundRect"), this._callContextMethod("roundRect", e);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#star} instead
   */
  drawStar(...e) {
    return w(C, "Graphics#drawStar has been renamed to Graphics#star"), this._callContextMethod("star", e);
  }
}
const Le = class $e extends se {
  constructor(...e) {
    let t = e[0] ?? {};
    t instanceof Float32Array && (w(C, "use new MeshGeometry({ positions, uvs, indices }) instead"), t = {
      positions: t,
      uvs: e[1],
      indices: e[2]
    }), t = { ...$e.defaultOptions, ...t };
    const r = t.positions || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), s = t.uvs || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), n = t.indices || new Uint32Array([0, 1, 2, 0, 2, 3]), a = t.shrinkBuffersToFit, o = new O({
      data: r,
      label: "attribute-mesh-positions",
      shrinkToFit: a,
      usage: M.VERTEX | M.COPY_DST
    }), l = new O({
      data: s,
      label: "attribute-mesh-uvs",
      shrinkToFit: a,
      usage: M.VERTEX | M.COPY_DST
    }), u = new O({
      data: n,
      label: "index-mesh-buffer",
      shrinkToFit: a,
      usage: M.INDEX | M.COPY_DST
    });
    super({
      attributes: {
        aPosition: {
          buffer: o,
          format: "float32x2",
          stride: 2 * 4,
          offset: 0
        },
        aUV: {
          buffer: l,
          format: "float32x2",
          stride: 2 * 4,
          offset: 0
        }
      },
      indexBuffer: u,
      topology: t.topology
    }), this.batchMode = "auto";
  }
  /** The positions of the mesh. */
  get positions() {
    return this.attributes.aPosition.buffer.data;
  }
  set positions(e) {
    this.attributes.aPosition.buffer.data = e;
  }
  /** The UVs of the mesh. */
  get uvs() {
    return this.attributes.aUV.buffer.data;
  }
  set uvs(e) {
    this.attributes.aUV.buffer.data = e;
  }
  /** The indices of the mesh. */
  get indices() {
    return this.indexBuffer.data;
  }
  set indices(e) {
    this.indexBuffer.data = e;
  }
};
Le.defaultOptions = {
  topology: "triangle-list",
  shrinkBuffersToFit: !1
};
let oe = Le;
function Wt(i) {
  const e = i._stroke, t = i._fill, s = [`div { ${[
    `color: ${H.shared.setValue(t.color).toHex()}`,
    `font-size: ${i.fontSize}px`,
    `font-family: ${i.fontFamily}`,
    `font-weight: ${i.fontWeight}`,
    `font-style: ${i.fontStyle}`,
    `font-variant: ${i.fontVariant}`,
    `letter-spacing: ${i.letterSpacing}px`,
    `text-align: ${i.align}`,
    `padding: ${i.padding}px`,
    `white-space: ${i.whiteSpace === "pre" && i.wordWrap ? "pre-wrap" : i.whiteSpace}`,
    ...i.lineHeight ? [`line-height: ${i.lineHeight}px`] : [],
    ...i.wordWrap ? [
      `word-wrap: ${i.breakWords ? "break-all" : "break-word"}`,
      `max-width: ${i.wordWrapWidth}px`
    ] : [],
    ...e ? [Xe(e)] : [],
    ...i.dropShadow ? [Ye(i.dropShadow)] : [],
    ...i.cssOverrides
  ].join(";")} }`];
  return Ot(i.tagStyles, s), s.join(" ");
}
function Ye(i) {
  const e = H.shared.setValue(i.color).setAlpha(i.alpha).toHexa(), t = Math.round(Math.cos(i.angle) * i.distance), r = Math.round(Math.sin(i.angle) * i.distance), s = `${t}px ${r}px`;
  return i.blur > 0 ? `text-shadow: ${s} ${i.blur}px ${e}` : `text-shadow: ${s} ${e}`;
}
function Xe(i) {
  return [
    `-webkit-text-stroke-width: ${i.width}px`,
    `-webkit-text-stroke-color: ${H.shared.setValue(i.color).toHex()}`,
    `text-stroke-width: ${i.width}px`,
    `text-stroke-color: ${H.shared.setValue(i.color).toHex()}`,
    "paint-order: stroke"
  ].join(";");
}
const _e = {
  fontSize: "font-size: {{VALUE}}px",
  fontFamily: "font-family: {{VALUE}}",
  fontWeight: "font-weight: {{VALUE}}",
  fontStyle: "font-style: {{VALUE}}",
  fontVariant: "font-variant: {{VALUE}}",
  letterSpacing: "letter-spacing: {{VALUE}}px",
  align: "text-align: {{VALUE}}",
  padding: "padding: {{VALUE}}px",
  whiteSpace: "white-space: {{VALUE}}",
  lineHeight: "line-height: {{VALUE}}px",
  wordWrapWidth: "max-width: {{VALUE}}px"
}, be = {
  fill: (i) => `color: ${H.shared.setValue(i).toHex()}`,
  breakWords: (i) => `word-wrap: ${i ? "break-all" : "break-word"}`,
  stroke: Xe,
  dropShadow: Ye
};
function Ot(i, e) {
  for (const t in i) {
    const r = i[t], s = [];
    for (const n in r)
      be[n] ? s.push(be[n](r[n])) : _e[n] && s.push(_e[n].replace("{{VALUE}}", r[n]));
    e.push(`${t} { ${s.join(";")} }`);
  }
}
class le extends Z {
  constructor(e = {}) {
    super(e), this._cssOverrides = [], this.cssOverrides ?? (this.cssOverrides = e.cssOverrides), this.tagStyles = e.tagStyles ?? {};
  }
  /** List of style overrides that will be applied to the HTML text. */
  set cssOverrides(e) {
    this._cssOverrides = e instanceof Array ? e : [e], this.update();
  }
  get cssOverrides() {
    return this._cssOverrides;
  }
  _generateKey() {
    return this._styleKey = mt(this) + this._cssOverrides.join("-"), this._styleKey;
  }
  update() {
    this._cssStyle = null, super.update();
  }
  /**
   * Creates a new HTMLTextStyle object with the same values as this one.
   * @returns New cloned HTMLTextStyle object
   */
  clone() {
    return new le({
      align: this.align,
      breakWords: this.breakWords,
      dropShadow: this.dropShadow ? { ...this.dropShadow } : null,
      fill: this._fill,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontVariant: this.fontVariant,
      fontWeight: this.fontWeight,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      padding: this.padding,
      stroke: this._stroke,
      whiteSpace: this.whiteSpace,
      wordWrap: this.wordWrap,
      wordWrapWidth: this.wordWrapWidth,
      cssOverrides: this.cssOverrides
    });
  }
  get cssStyle() {
    return this._cssStyle || (this._cssStyle = Wt(this)), this._cssStyle;
  }
  /**
   * Add a style override, this can be any CSS property
   * it will override any built-in style. This is the
   * property and the value as a string (e.g., `color: red`).
   * This will override any other internal style.
   * @param {string} value - CSS style(s) to add.
   * @example
   * style.addOverride('background-color: red');
   */
  addOverride(...e) {
    const t = e.filter((r) => !this.cssOverrides.includes(r));
    t.length > 0 && (this.cssOverrides.push(...t), this.update());
  }
  /**
   * Remove any overrides that match the value.
   * @param {string} value - CSS style to remove.
   * @example
   * style.removeOverride('background-color: red');
   */
  removeOverride(...e) {
    const t = e.filter((r) => this.cssOverrides.includes(r));
    t.length > 0 && (this.cssOverrides = this.cssOverrides.filter((r) => !t.includes(r)), this.update());
  }
  set fill(e) {
    typeof e != "string" && typeof e != "number" && $("[HTMLTextStyle] only color fill is not supported by HTMLText"), super.fill = e;
  }
  set stroke(e) {
    e && typeof e != "string" && typeof e != "number" && $("[HTMLTextStyle] only color stroke is not supported by HTMLText"), super.stroke = e;
  }
}
const ye = "http://www.w3.org/2000/svg", Te = "http://www.w3.org/1999/xhtml";
class je {
  constructor() {
    this.svgRoot = document.createElementNS(ye, "svg"), this.foreignObject = document.createElementNS(ye, "foreignObject"), this.domElement = document.createElementNS(Te, "div"), this.styleElement = document.createElementNS(Te, "style"), this.image = new Image();
    const { foreignObject: e, svgRoot: t, styleElement: r, domElement: s } = this;
    e.setAttribute("width", "10000"), e.setAttribute("height", "10000"), e.style.overflow = "hidden", t.appendChild(e), e.appendChild(r), e.appendChild(s);
  }
}
let ve;
function Vt(i, e, t, r) {
  r = r || ve || (ve = new je());
  const { domElement: s, styleElement: n, svgRoot: a } = r;
  s.innerHTML = `<style>${e.cssStyle};</style><div style='padding:0'>${i}</div>`, s.setAttribute("style", "transform-origin: top left; display: inline-block"), t && (n.textContent = t), document.body.appendChild(a);
  const o = s.getBoundingClientRect();
  a.remove();
  const l = k.measureFont(e.fontStyle).descent, u = e.padding * 2;
  return {
    width: o.width - u,
    height: o.height + l - u
  };
}
class Ke {
  constructor(e, t) {
    this.state = Y.for2d(), this._graphicsBatchesHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this.renderer = e, this._adaptor = t, this._adaptor.init(), this.renderer.renderableGC.addManagedHash(this, "_graphicsBatchesHash");
  }
  validateRenderable(e) {
    const t = e.context, r = !!this._graphicsBatchesHash[e.uid], s = this.renderer.graphicsContext.updateGpuContext(t);
    return !!(s.isBatchable || r !== s.isBatchable);
  }
  addRenderable(e, t) {
    const r = this.renderer.graphicsContext.updateGpuContext(e.context);
    e.didViewUpdate && this._rebuild(e), r.isBatchable ? this._addToBatcher(e, t) : (this.renderer.renderPipes.batch.break(t), t.add(e));
  }
  updateRenderable(e) {
    const t = this._graphicsBatchesHash[e.uid];
    if (t)
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        s._batcher.updateElement(s);
      }
  }
  destroyRenderable(e) {
    this._graphicsBatchesHash[e.uid] && this._removeBatchForRenderable(e.uid), e.off("destroyed", this._destroyRenderableBound);
  }
  execute(e) {
    if (!e.isRenderable)
      return;
    const t = this.renderer, r = e.context;
    if (!t.graphicsContext.getGpuContext(r).batches.length)
      return;
    const n = r.customShader || this._adaptor.shader;
    this.state.blendMode = e.groupBlendMode;
    const a = n.resources.localUniforms.uniforms;
    a.uTransformMatrix = e.groupTransform, a.uRound = t._roundPixels | e._roundPixels, j(
      e.groupColorAlpha,
      a.uColor,
      0
    ), this._adaptor.execute(this, e);
  }
  _rebuild(e) {
    const t = !!this._graphicsBatchesHash[e.uid], r = this.renderer.graphicsContext.updateGpuContext(e.context);
    t && this._removeBatchForRenderable(e.uid), r.isBatchable && this._initBatchesForRenderable(e), e.batched = r.isBatchable;
  }
  _addToBatcher(e, t) {
    const r = this.renderer.renderPipes.batch, s = this._getBatchesForRenderable(e);
    for (let n = 0; n < s.length; n++) {
      const a = s[n];
      r.addToBatch(a, t);
    }
  }
  _getBatchesForRenderable(e) {
    return this._graphicsBatchesHash[e.uid] || this._initBatchesForRenderable(e);
  }
  _initBatchesForRenderable(e) {
    const t = e.context, r = this.renderer.graphicsContext.getGpuContext(t), s = this.renderer._roundPixels | e._roundPixels, n = r.batches.map((a) => {
      const o = b.get(_t);
      return a.copyTo(o), o.renderable = e, o.roundPixels = s, o;
    });
    return this._graphicsBatchesHash[e.uid] === void 0 && e.on("destroyed", this._destroyRenderableBound), this._graphicsBatchesHash[e.uid] = n, n;
  }
  _removeBatchForRenderable(e) {
    this._graphicsBatchesHash[e].forEach((t) => {
      b.return(t);
    }), this._graphicsBatchesHash[e] = null;
  }
  destroy() {
    this.renderer = null, this._adaptor.destroy(), this._adaptor = null, this.state = null;
    for (const e in this._graphicsBatchesHash)
      this._removeBatchForRenderable(e);
    this._graphicsBatchesHash = null;
  }
}
Ke.extension = {
  type: [
    p.WebGLPipes,
    p.WebGPUPipes,
    p.CanvasPipes
  ],
  name: "graphics"
};
const Ne = class qe extends oe {
  constructor(...e) {
    super({});
    let t = e[0] ?? {};
    typeof t == "number" && (w(C, "PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"), t = {
      width: t,
      height: e[1],
      verticesX: e[2],
      verticesY: e[3]
    }), this.build(t);
  }
  /**
   * Refreshes plane coordinates
   * @param options - Options to be applied to plane geometry
   */
  build(e) {
    e = { ...qe.defaultOptions, ...e }, this.verticesX = this.verticesX ?? e.verticesX, this.verticesY = this.verticesY ?? e.verticesY, this.width = this.width ?? e.width, this.height = this.height ?? e.height;
    const t = this.verticesX * this.verticesY, r = [], s = [], n = [], a = this.verticesX - 1, o = this.verticesY - 1, l = this.width / a, u = this.height / o;
    for (let d = 0; d < t; d++) {
      const h = d % this.verticesX, g = d / this.verticesX | 0;
      r.push(h * l, g * u), s.push(h / a, g / o);
    }
    const c = a * o;
    for (let d = 0; d < c; d++) {
      const h = d % a, g = d / a | 0, x = g * this.verticesX + h, f = g * this.verticesX + h + 1, m = (g + 1) * this.verticesX + h, _ = (g + 1) * this.verticesX + h + 1;
      n.push(
        x,
        f,
        m,
        f,
        _,
        m
      );
    }
    this.buffers[0].data = new Float32Array(r), this.buffers[1].data = new Float32Array(s), this.indexBuffer.data = new Uint32Array(n), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update();
  }
};
Ne.defaultOptions = {
  width: 100,
  height: 100,
  verticesX: 10,
  verticesY: 10
};
let Et = Ne;
class de {
  constructor() {
    this.batcherName = "default", this.packAsQuad = !1, this.indexOffset = 0, this.attributeOffset = 0, this.roundPixels = 0, this._batcher = null, this._batch = null, this._uvUpdateId = -1, this._textureMatrixUpdateId = -1;
  }
  get blendMode() {
    return this.renderable.groupBlendMode;
  }
  reset() {
    this.renderable = null, this.texture = null, this._batcher = null, this._batch = null, this.geometry = null, this._uvUpdateId = -1, this._textureMatrixUpdateId = -1;
  }
  get uvs() {
    const t = this.geometry.getBuffer("aUV"), r = t.data;
    let s = r;
    const n = this.texture.textureMatrix;
    return n.isSimple || (s = this._transformedUvs, (this._textureMatrixUpdateId !== n._updateID || this._uvUpdateId !== t._updateID) && ((!s || s.length < r.length) && (s = this._transformedUvs = new Float32Array(r.length)), this._textureMatrixUpdateId = n._updateID, this._uvUpdateId = t._updateID, n.multiplyUvs(r, s))), s;
  }
  get positions() {
    return this.geometry.positions;
  }
  get indices() {
    return this.geometry.indices;
  }
  get color() {
    return this.renderable.groupColorAlpha;
  }
  get groupTransform() {
    return this.renderable.groupTransform;
  }
  get attributeSize() {
    return this.geometry.positions.length / 2;
  }
  get indexSize() {
    return this.geometry.indices.length;
  }
}
class Qe {
  constructor(e, t) {
    this.localUniforms = new D({
      uTransformMatrix: { value: new P(), type: "mat3x3<f32>" },
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uRound: { value: 0, type: "f32" }
    }), this.localUniformsBindGroup = new Ue({
      0: this.localUniforms
    }), this._meshDataHash = /* @__PURE__ */ Object.create(null), this._gpuBatchableMeshHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this.renderer = e, this._adaptor = t, this._adaptor.init(), e.renderableGC.addManagedHash(this, "_gpuBatchableMeshHash"), e.renderableGC.addManagedHash(this, "_meshDataHash");
  }
  validateRenderable(e) {
    const t = this._getMeshData(e), r = t.batched, s = e.batched;
    if (t.batched = s, r !== s)
      return !0;
    if (s) {
      const n = e._geometry;
      if (n.indices.length !== t.indexSize || n.positions.length !== t.vertexSize)
        return t.indexSize = n.indices.length, t.vertexSize = n.positions.length, !0;
      const a = this._getBatchableMesh(e), o = e.texture;
      if (a.texture._source !== o._source && a.texture._source !== o._source)
        return !a._batcher.checkAndUpdateTexture(a, o);
    }
    return !1;
  }
  addRenderable(e, t) {
    const r = this.renderer.renderPipes.batch, { batched: s } = this._getMeshData(e);
    if (s) {
      const n = this._getBatchableMesh(e);
      n.texture = e._texture, n.geometry = e._geometry, r.addToBatch(n, t);
    } else
      r.break(t), t.add(e);
  }
  updateRenderable(e) {
    if (e.batched) {
      const t = this._gpuBatchableMeshHash[e.uid];
      t.texture = e._texture, t.geometry = e._geometry, t._batcher.updateElement(t);
    }
  }
  destroyRenderable(e) {
    this._meshDataHash[e.uid] = null;
    const t = this._gpuBatchableMeshHash[e.uid];
    t && (b.return(t), this._gpuBatchableMeshHash[e.uid] = null), e.off("destroyed", this._destroyRenderableBound);
  }
  execute(e) {
    if (!e.isRenderable)
      return;
    e.state.blendMode = ne(e.groupBlendMode, e.texture._source);
    const t = this.localUniforms;
    t.uniforms.uTransformMatrix = e.groupTransform, t.uniforms.uRound = this.renderer._roundPixels | e._roundPixels, t.update(), j(
      e.groupColorAlpha,
      t.uniforms.uColor,
      0
    ), this._adaptor.execute(this, e);
  }
  _getMeshData(e) {
    return this._meshDataHash[e.uid] || this._initMeshData(e);
  }
  _initMeshData(e) {
    var t, r;
    return this._meshDataHash[e.uid] = {
      batched: e.batched,
      indexSize: (t = e._geometry.indices) == null ? void 0 : t.length,
      vertexSize: (r = e._geometry.positions) == null ? void 0 : r.length
    }, e.on("destroyed", this._destroyRenderableBound), this._meshDataHash[e.uid];
  }
  _getBatchableMesh(e) {
    return this._gpuBatchableMeshHash[e.uid] || this._initBatchableMesh(e);
  }
  _initBatchableMesh(e) {
    const t = b.get(de);
    return t.renderable = e, t.texture = e._texture, t.transform = e.groupTransform, t.roundPixels = this.renderer._roundPixels | e._roundPixels, this._gpuBatchableMeshHash[e.uid] = t, t;
  }
  destroy() {
    for (const e in this._gpuBatchableMeshHash)
      this._gpuBatchableMeshHash[e] && b.return(this._gpuBatchableMeshHash[e]);
    this._gpuBatchableMeshHash = null, this._meshDataHash = null, this.localUniforms = null, this.localUniformsBindGroup = null, this._adaptor.destroy(), this._adaptor = null, this.renderer = null;
  }
}
Qe.extension = {
  type: [
    p.WebGLPipes,
    p.WebGPUPipes,
    p.CanvasPipes
  ],
  name: "mesh"
};
class It {
  execute(e, t) {
    const r = e.state, s = e.renderer, n = t.shader || e.defaultShader;
    n.resources.uTexture = t.texture._source, n.resources.uniforms = e.localUniforms;
    const a = s.gl, o = e.getBuffers(t);
    s.shader.bind(n), s.state.set(r), s.geometry.bind(o.geometry, n.glProgram);
    const u = o.geometry.indexBuffer.data.BYTES_PER_ELEMENT === 2 ? a.UNSIGNED_SHORT : a.UNSIGNED_INT;
    a.drawElements(a.TRIANGLES, t.particleChildren.length * 6, u, 0);
  }
}
class Lt {
  execute(e, t) {
    const r = e.renderer, s = t.shader || e.defaultShader;
    s.groups[0] = r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms, !0), s.groups[1] = r.texture.getTextureBindGroup(t.texture);
    const n = e.state, a = e.getBuffers(t);
    r.encoder.draw({
      geometry: a.geometry,
      shader: t.shader || e.defaultShader,
      state: n,
      size: t.particleChildren.length * 6
    });
  }
}
function Se(i, e = null) {
  const t = i * 6;
  if (t > 65535 ? e = e || new Uint32Array(t) : e = e || new Uint16Array(t), e.length !== t)
    throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);
  for (let r = 0, s = 0; r < t; r += 6, s += 4)
    e[r + 0] = s + 0, e[r + 1] = s + 1, e[r + 2] = s + 2, e[r + 3] = s + 0, e[r + 4] = s + 2, e[r + 5] = s + 3;
  return e;
}
function $t(i) {
  return {
    dynamicUpdate: we(i, !0),
    staticUpdate: we(i, !1)
  };
}
function we(i, e) {
  const t = [];
  t.push(`
      
        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);
  let r = 0;
  for (const n in i) {
    const a = i[n];
    if (e !== a.dynamic)
      continue;
    t.push(`offset = index + ${r}`), t.push(a.code);
    const o = ee(a.format);
    r += o.stride / 4;
  }
  t.push(`
            index += stride * 4;
        }
    `), t.unshift(`
        var stride = ${r};
    `);
  const s = t.join(`
`);
  return new Function("ps", "f32v", "u32v", s);
}
class Yt {
  constructor(e) {
    this._size = 0, this._generateParticleUpdateCache = {};
    const t = this._size = e.size ?? 1e3, r = e.properties;
    let s = 0, n = 0;
    for (const c in r) {
      const d = r[c], h = ee(d.format);
      d.dynamic ? n += h.stride : s += h.stride;
    }
    this._dynamicStride = n / 4, this._staticStride = s / 4, this.staticAttributeBuffer = new E(t * 4 * s), this.dynamicAttributeBuffer = new E(t * 4 * n), this.indexBuffer = Se(t);
    const a = new se();
    let o = 0, l = 0;
    this._staticBuffer = new O({
      data: new Float32Array(1),
      label: "static-particle-buffer",
      shrinkToFit: !1,
      usage: M.VERTEX | M.COPY_DST
    }), this._dynamicBuffer = new O({
      data: new Float32Array(1),
      label: "dynamic-particle-buffer",
      shrinkToFit: !1,
      usage: M.VERTEX | M.COPY_DST
    });
    for (const c in r) {
      const d = r[c], h = ee(d.format);
      d.dynamic ? (a.addAttribute(d.attributeName, {
        buffer: this._dynamicBuffer,
        stride: this._dynamicStride * 4,
        offset: o * 4,
        format: d.format
      }), o += h.size) : (a.addAttribute(d.attributeName, {
        buffer: this._staticBuffer,
        stride: this._staticStride * 4,
        offset: l * 4,
        format: d.format
      }), l += h.size);
    }
    a.addIndex(this.indexBuffer);
    const u = this.getParticleUpdate(r);
    this._dynamicUpload = u.dynamicUpdate, this._staticUpload = u.staticUpdate, this.geometry = a;
  }
  getParticleUpdate(e) {
    const t = Xt(e);
    return this._generateParticleUpdateCache[t] ? this._generateParticleUpdateCache[t] : (this._generateParticleUpdateCache[t] = this.generateParticleUpdate(e), this._generateParticleUpdateCache[t]);
  }
  generateParticleUpdate(e) {
    return $t(e);
  }
  update(e, t) {
    e.length > this._size && (t = !0, this._size = Math.max(e.length, this._size * 1.5 | 0), this.staticAttributeBuffer = new E(this._size * this._staticStride * 4 * 4), this.dynamicAttributeBuffer = new E(this._size * this._dynamicStride * 4 * 4), this.indexBuffer = Se(this._size), this.geometry.indexBuffer.setDataWithSize(
      this.indexBuffer,
      this.indexBuffer.byteLength,
      !0
    ));
    const r = this.dynamicAttributeBuffer;
    if (this._dynamicUpload(e, r.float32View, r.uint32View), this._dynamicBuffer.setDataWithSize(
      this.dynamicAttributeBuffer.float32View,
      e.length * this._dynamicStride * 4,
      !0
    ), t) {
      const s = this.staticAttributeBuffer;
      this._staticUpload(e, s.float32View, s.uint32View), this._staticBuffer.setDataWithSize(
        s.float32View,
        e.length * this._staticStride * 4,
        !0
      );
    }
  }
  destroy() {
    this._staticBuffer.destroy(), this._dynamicBuffer.destroy(), this.geometry.destroy();
  }
}
function Xt(i) {
  const e = [];
  for (const t in i) {
    const r = i[t];
    e.push(t, r.code, r.dynamic ? "d" : "s");
  }
  return e.join("_");
}
var jt = `varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`, Kt = `attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = aColor * uColor;
}
`, Ce = `
struct ParticleUniforms {
  uProjectionMatrix:mat3x3<f32>,
  uResolution:vec2<f32>,
  uRoundPixels:f32,
};

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   let position = vec4((uniforms.uProjectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

  return VSOutput(
   position,
   aUV,
   aColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`;
class Nt extends ae {
  constructor() {
    const e = bt.from({
      vertex: Kt,
      fragment: jt
    }), t = yt.from({
      fragment: {
        source: Ce,
        entryPoint: "mainFragment"
      },
      vertex: {
        source: Ce,
        entryPoint: "mainVertex"
      }
    });
    super({
      glProgram: e,
      gpuProgram: t,
      resources: {
        // this will be replaced with the texture from the particle container
        uTexture: A.WHITE.source,
        // this will be replaced with the texture style from the particle container
        uSampler: new Tt({}),
        // this will be replaced with the local uniforms from the particle container
        uniforms: {
          uTranslationMatrix: { value: new P(), type: "mat3x3<f32>" },
          uColor: { value: new H(16777215), type: "vec4<f32>" },
          uRound: { value: 1, type: "f32" },
          uResolution: { value: [0, 0], type: "vec2<f32>" }
        }
      }
    });
  }
}
class Je {
  /**
   * @param renderer - The renderer this sprite batch works for.
   * @param adaptor
   */
  constructor(e, t) {
    this.state = Y.for2d(), this._gpuBufferHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this.localUniforms = new D({
      uTranslationMatrix: { value: new P(), type: "mat3x3<f32>" },
      uColor: { value: new Float32Array(4), type: "vec4<f32>" },
      uRound: { value: 1, type: "f32" },
      uResolution: { value: [0, 0], type: "vec2<f32>" }
    }), this.renderer = e, this.adaptor = t, this.defaultShader = new Nt(), this.state = Y.for2d();
  }
  validateRenderable(e) {
    return !1;
  }
  addRenderable(e, t) {
    this.renderer.renderPipes.batch.break(t), t.add(e);
  }
  getBuffers(e) {
    return this._gpuBufferHash[e.uid] || this._initBuffer(e);
  }
  _initBuffer(e) {
    return this._gpuBufferHash[e.uid] = new Yt({
      size: e.particleChildren.length,
      properties: e._properties
    }), e.on("destroyed", this._destroyRenderableBound), this._gpuBufferHash[e.uid];
  }
  updateRenderable(e) {
  }
  destroyRenderable(e) {
    this._gpuBufferHash[e.uid].destroy(), this._gpuBufferHash[e.uid] = null, e.off("destroyed", this._destroyRenderableBound);
  }
  execute(e) {
    const t = e.particleChildren;
    if (t.length === 0)
      return;
    const r = this.renderer, s = this.getBuffers(e);
    e.texture || (e.texture = t[0].texture);
    const n = this.state;
    s.update(t, e._childrenDirty), e._childrenDirty = !1, n.blendMode = ne(e.blendMode, e.texture._source);
    const a = this.localUniforms.uniforms, o = a.uTranslationMatrix;
    e.worldTransform.copyTo(o), o.prepend(r.globalUniforms.globalUniformData.projectionMatrix), a.uResolution = r.globalUniforms.globalUniformData.resolution, a.uRound = r._roundPixels | e._roundPixels, j(
      e.groupColorAlpha,
      a.uColor,
      0
    ), this.adaptor.execute(this, e);
  }
  /** Destroys the ParticleRenderer. */
  destroy() {
    this.defaultShader && (this.defaultShader.destroy(), this.defaultShader = null);
  }
}
class Ze extends Je {
  constructor(e) {
    super(e, new It());
  }
}
Ze.extension = {
  type: [
    p.WebGLPipes
  ],
  name: "particle"
};
class et extends Je {
  constructor(e) {
    super(e, new Lt());
  }
}
et.extension = {
  type: [
    p.WebGPUPipes
  ],
  name: "particle"
};
const tt = class rt extends Et {
  constructor(e = {}) {
    e = { ...rt.defaultOptions, ...e }, super({
      width: e.width,
      height: e.height,
      verticesX: 4,
      verticesY: 4
    }), this.update(e);
  }
  /**
   * Updates the NineSliceGeometry with the options.
   * @param options - The options of the NineSliceGeometry.
   */
  update(e) {
    this.width = e.width ?? this.width, this.height = e.height ?? this.height, this._originalWidth = e.originalWidth ?? this._originalWidth, this._originalHeight = e.originalHeight ?? this._originalHeight, this._leftWidth = e.leftWidth ?? this._leftWidth, this._rightWidth = e.rightWidth ?? this._rightWidth, this._topHeight = e.topHeight ?? this._topHeight, this._bottomHeight = e.bottomHeight ?? this._bottomHeight, this.updateUvs(), this.updatePositions();
  }
  /** Updates the positions of the vertices. */
  updatePositions() {
    const e = this.positions, t = this._leftWidth + this._rightWidth, r = this.width > t ? 1 : this.width / t, s = this._topHeight + this._bottomHeight, n = this.height > s ? 1 : this.height / s, a = Math.min(r, n);
    e[9] = e[11] = e[13] = e[15] = this._topHeight * a, e[17] = e[19] = e[21] = e[23] = this.height - this._bottomHeight * a, e[25] = e[27] = e[29] = e[31] = this.height, e[2] = e[10] = e[18] = e[26] = this._leftWidth * a, e[4] = e[12] = e[20] = e[28] = this.width - this._rightWidth * a, e[6] = e[14] = e[22] = e[30] = this.width, this.getBuffer("aPosition").update();
  }
  /** Updates the UVs of the vertices. */
  updateUvs() {
    const e = this.uvs;
    e[0] = e[8] = e[16] = e[24] = 0, e[1] = e[3] = e[5] = e[7] = 0, e[6] = e[14] = e[22] = e[30] = 1, e[25] = e[27] = e[29] = e[31] = 1;
    const t = 1 / this._originalWidth, r = 1 / this._originalHeight;
    e[2] = e[10] = e[18] = e[26] = t * this._leftWidth, e[9] = e[11] = e[13] = e[15] = r * this._topHeight, e[4] = e[12] = e[20] = e[28] = 1 - t * this._rightWidth, e[17] = e[19] = e[21] = e[23] = 1 - r * this._bottomHeight, this.getBuffer("aUV").update();
  }
};
tt.defaultOptions = {
  /** The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  width: 100,
  /** The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  height: 100,
  /** The width of the left column. */
  leftWidth: 10,
  /** The height of the top row. */
  topHeight: 10,
  /** The width of the right column. */
  rightWidth: 10,
  /** The height of the bottom row. */
  bottomHeight: 10,
  /** The original width of the texture */
  originalWidth: 100,
  /** The original height of the texture */
  originalHeight: 100
};
let qt = tt;
class st {
  constructor(e) {
    this._gpuSpriteHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.renderableGC.addManagedHash(this, "_gpuSpriteHash");
  }
  addRenderable(e, t) {
    const r = this._getGpuSprite(e);
    e.didViewUpdate && this._updateBatchableSprite(e, r), this._renderer.renderPipes.batch.addToBatch(r, t);
  }
  updateRenderable(e) {
    const t = this._gpuSpriteHash[e.uid];
    e.didViewUpdate && this._updateBatchableSprite(e, t), t._batcher.updateElement(t);
  }
  validateRenderable(e) {
    const t = e._texture, r = this._getGpuSprite(e);
    return r.texture._source !== t._source ? !r._batcher.checkAndUpdateTexture(r, t) : !1;
  }
  destroyRenderable(e) {
    const t = this._gpuSpriteHash[e.uid];
    b.return(t.geometry), b.return(t), this._gpuSpriteHash[e.uid] = null, e.off("destroyed", this._destroyRenderableBound);
  }
  _updateBatchableSprite(e, t) {
    t.geometry.update(e), t.texture = e._texture;
  }
  _getGpuSprite(e) {
    return this._gpuSpriteHash[e.uid] || this._initGPUSprite(e);
  }
  _initGPUSprite(e) {
    const t = b.get(de);
    return t.geometry = b.get(qt), t.renderable = e, t.transform = e.groupTransform, t.texture = e._texture, t.roundPixels = this._renderer._roundPixels | e._roundPixels, this._gpuSpriteHash[e.uid] = t, e.on("destroyed", this._destroyRenderableBound), t;
  }
  destroy() {
    for (const e in this._gpuSpriteHash)
      this._gpuSpriteHash[e].geometry.destroy();
    this._gpuSpriteHash = null, this._renderer = null;
  }
}
st.extension = {
  type: [
    p.WebGLPipes,
    p.WebGPUPipes,
    p.CanvasPipes
  ],
  name: "nineSliceSprite"
};
const Qt = {
  name: "tiling-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
    ),
    main: (
      /* wgsl */
      `
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `
    )
  },
  fragment: {
    header: (
      /* wgsl */
      `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
    ),
    main: (
      /* wgsl */
      `

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            } 

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `
    )
  }
}, Jt = {
  name: "tiling-bit",
  vertex: {
    header: (
      /* glsl */
      `
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;
        
        `
    ),
    main: (
      /* glsl */
      `
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `
    )
  },
  fragment: {
    header: (
      /* glsl */
      `
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `
    ),
    main: (
      /* glsl */
      `

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);
        
        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0
    
        `
    )
  }
};
let N, q;
class Zt extends ae {
  constructor() {
    N ?? (N = Fe({
      name: "tiling-sprite-shader",
      bits: [
        vt,
        Qt,
        Ae
      ]
    })), q ?? (q = ke({
      name: "tiling-sprite-shader",
      bits: [
        St,
        Jt,
        He
      ]
    }));
    const e = new D({
      uMapCoord: { value: new P(), type: "mat3x3<f32>" },
      uClampFrame: { value: new Float32Array([0, 0, 1, 1]), type: "vec4<f32>" },
      uClampOffset: { value: new Float32Array([0, 0]), type: "vec2<f32>" },
      uTextureTransform: { value: new P(), type: "mat3x3<f32>" },
      uSizeAnchor: { value: new Float32Array([100, 100, 0.5, 0.5]), type: "vec4<f32>" }
    });
    super({
      glProgram: q,
      gpuProgram: N,
      resources: {
        localUniforms: new D({
          uTransformMatrix: { value: new P(), type: "mat3x3<f32>" },
          uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
          uRound: { value: 0, type: "f32" }
        }),
        tilingUniforms: e,
        uTexture: A.EMPTY.source,
        uSampler: A.EMPTY.source.style
      }
    });
  }
  updateUniforms(e, t, r, s, n, a) {
    const o = this.resources.tilingUniforms, l = a.width, u = a.height, c = a.textureMatrix, d = o.uniforms.uTextureTransform;
    d.set(
      r.a * l / e,
      r.b * l / t,
      r.c * u / e,
      r.d * u / t,
      r.tx / e,
      r.ty / t
    ), d.invert(), o.uniforms.uMapCoord = c.mapCoord, o.uniforms.uClampFrame = c.uClampFrame, o.uniforms.uClampOffset = c.uClampOffset, o.uniforms.uTextureTransform = d, o.uniforms.uSizeAnchor[0] = e, o.uniforms.uSizeAnchor[1] = t, o.uniforms.uSizeAnchor[2] = s, o.uniforms.uSizeAnchor[3] = n, a && (this.resources.uTexture = a.source, this.resources.uSampler = a.source.style);
  }
}
class er extends oe {
  constructor() {
    super({
      positions: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      indices: new Uint32Array([0, 1, 2, 0, 2, 3])
    });
  }
}
function tr(i, e) {
  const t = i.anchor.x, r = i.anchor.y;
  e[0] = -t * i.width, e[1] = -r * i.height, e[2] = (1 - t) * i.width, e[3] = -r * i.height, e[4] = (1 - t) * i.width, e[5] = (1 - r) * i.height, e[6] = -t * i.width, e[7] = (1 - r) * i.height;
}
function rr(i, e, t, r) {
  let s = 0;
  const n = i.length / e, a = r.a, o = r.b, l = r.c, u = r.d, c = r.tx, d = r.ty;
  for (t *= e; s < n; ) {
    const h = i[t], g = i[t + 1];
    i[t] = a * h + l * g + c, i[t + 1] = o * h + u * g + d, t += e, s++;
  }
}
function sr(i, e) {
  const t = i.texture, r = t.frame.width, s = t.frame.height;
  let n = 0, a = 0;
  i._applyAnchorToTexture && (n = i.anchor.x, a = i.anchor.y), e[0] = e[6] = -n, e[2] = e[4] = 1 - n, e[1] = e[3] = -a, e[5] = e[7] = 1 - a;
  const o = P.shared;
  o.copyFrom(i._tileTransform.matrix), o.tx /= i.width, o.ty /= i.height, o.invert(), o.scale(i.width / r, i.height / s), rr(e, 2, 0, o);
}
const I = new er();
class it {
  constructor(e) {
    this._state = Y.default2d, this._tilingSpriteDataHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.renderableGC.addManagedHash(this, "_tilingSpriteDataHash");
  }
  validateRenderable(e) {
    const t = this._getTilingSpriteData(e), r = t.canBatch;
    this._updateCanBatch(e);
    const s = t.canBatch;
    if (s && s === r) {
      const { batchableMesh: n } = t;
      if (n && n.texture._source !== e.texture._source)
        return !n._batcher.checkAndUpdateTexture(n, e.texture);
    }
    return r !== s;
  }
  addRenderable(e, t) {
    const r = this._renderer.renderPipes.batch;
    this._updateCanBatch(e);
    const s = this._getTilingSpriteData(e), { geometry: n, canBatch: a } = s;
    if (a) {
      s.batchableMesh || (s.batchableMesh = new de());
      const o = s.batchableMesh;
      e.didViewUpdate && (this._updateBatchableMesh(e), o.geometry = n, o.renderable = e, o.transform = e.groupTransform, o.texture = e._texture), o.roundPixels = this._renderer._roundPixels | e._roundPixels, r.addToBatch(o, t);
    } else
      r.break(t), s.shader || (s.shader = new Zt()), this.updateRenderable(e), t.add(e);
  }
  execute(e) {
    const { shader: t } = this._tilingSpriteDataHash[e.uid];
    t.groups[0] = this._renderer.globalUniforms.bindGroup;
    const r = t.resources.localUniforms.uniforms;
    r.uTransformMatrix = e.groupTransform, r.uRound = this._renderer._roundPixels | e._roundPixels, j(
      e.groupColorAlpha,
      r.uColor,
      0
    ), this._state.blendMode = ne(e.groupBlendMode, e.texture._source), this._renderer.encoder.draw({
      geometry: I,
      shader: t,
      state: this._state
    });
  }
  updateRenderable(e) {
    const t = this._getTilingSpriteData(e), { canBatch: r } = t;
    if (r) {
      const { batchableMesh: s } = t;
      e.didViewUpdate && this._updateBatchableMesh(e), s._batcher.updateElement(s);
    } else if (e.didViewUpdate) {
      const { shader: s } = t;
      s.updateUniforms(
        e.width,
        e.height,
        e._tileTransform.matrix,
        e.anchor.x,
        e.anchor.y,
        e.texture
      );
    }
  }
  destroyRenderable(e) {
    var r;
    const t = this._getTilingSpriteData(e);
    t.batchableMesh = null, (r = t.shader) == null || r.destroy(), this._tilingSpriteDataHash[e.uid] = null, e.off("destroyed", this._destroyRenderableBound);
  }
  _getTilingSpriteData(e) {
    return this._tilingSpriteDataHash[e.uid] || this._initTilingSpriteData(e);
  }
  _initTilingSpriteData(e) {
    const t = new oe({
      indices: I.indices,
      positions: I.positions.slice(),
      uvs: I.uvs.slice()
    });
    return this._tilingSpriteDataHash[e.uid] = {
      canBatch: !0,
      renderable: e,
      geometry: t
    }, e.on("destroyed", this._destroyRenderableBound), this._tilingSpriteDataHash[e.uid];
  }
  _updateBatchableMesh(e) {
    const t = this._getTilingSpriteData(e), { geometry: r } = t, s = e.texture.source.style;
    s.addressMode !== "repeat" && (s.addressMode = "repeat", s.update()), sr(e, r.uvs), tr(e, r.positions);
  }
  destroy() {
    for (const e in this._tilingSpriteDataHash)
      this.destroyRenderable(this._tilingSpriteDataHash[e].renderable);
    this._tilingSpriteDataHash = null, this._renderer = null;
  }
  _updateCanBatch(e) {
    const t = this._getTilingSpriteData(e), r = e.texture;
    let s = !0;
    return this._renderer.type === ie.WEBGL && (s = this._renderer.context.supports.nonPowOf2wrapping), t.canBatch = r.textureMatrix.isSimple && (s || r.source.isPowerOfTwo), t.canBatch;
  }
}
it.extension = {
  type: [
    p.WebGLPipes,
    p.WebGPUPipes,
    p.CanvasPipes
  ],
  name: "tilingSprite"
};
const ir = {
  name: "local-uniform-msdf-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `
    ),
    main: (
      /* wgsl */
      `
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `
    ),
    end: (
      /* wgsl */
      `
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `
    )
  },
  fragment: {
    header: (
      /* wgsl */
      `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `
    ),
    main: (
      /* wgsl */
      ` 
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `
    )
  }
}, nr = {
  name: "local-uniform-msdf-bit",
  vertex: {
    header: (
      /* glsl */
      `
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `
    ),
    main: (
      /* glsl */
      `
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `
    ),
    end: (
      /* glsl */
      `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `
    )
  },
  fragment: {
    header: (
      /* glsl */
      `
            uniform float uDistance;
         `
    ),
    main: (
      /* glsl */
      ` 
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `
    )
  }
}, ar = {
  name: "msdf-bit",
  fragment: {
    header: (
      /* wgsl */
      `
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {
                
                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));
            
                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;
             
            }
        `
    )
  }
}, or = {
  name: "msdf-bit",
  fragment: {
    header: (
      /* glsl */
      `
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {
                
                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));
               
                // SDF
                median = min(median, msdfColor.a);
            
                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
           
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);  
              
                return coverage;
            }
        `
    )
  }
};
let Q, J;
class lr extends ae {
  constructor() {
    const e = new D({
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uTransformMatrix: { value: new P(), type: "mat3x3<f32>" },
      uDistance: { value: 4, type: "f32" },
      uRound: { value: 0, type: "f32" }
    }), t = wt();
    Q ?? (Q = Fe({
      name: "sdf-shader",
      bits: [
        Ct,
        Bt(t),
        ir,
        ar,
        Ae
      ]
    })), J ?? (J = ke({
      name: "sdf-shader",
      bits: [
        Mt,
        Pt(t),
        nr,
        or,
        He
      ]
    })), super({
      glProgram: J,
      gpuProgram: Q,
      resources: {
        localUniforms: e,
        batchSamplers: Rt(t)
      }
    });
  }
}
class nt {
  constructor(e) {
    this._gpuBitmapText = {}, this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.renderableGC.addManagedHash(this, "_gpuBitmapText");
  }
  validateRenderable(e) {
    const t = this._getGpuBitmapText(e);
    return e._didTextUpdate && (e._didTextUpdate = !1, this._updateContext(e, t)), this._renderer.renderPipes.graphics.validateRenderable(t);
  }
  addRenderable(e, t) {
    const r = this._getGpuBitmapText(e);
    Be(e, r), e._didTextUpdate && (e._didTextUpdate = !1, this._updateContext(e, r)), this._renderer.renderPipes.graphics.addRenderable(r, t), r.context.customShader && this._updateDistanceField(e);
  }
  destroyRenderable(e) {
    e.off("destroyed", this._destroyRenderableBound), this._destroyRenderableByUid(e.uid);
  }
  _destroyRenderableByUid(e) {
    const t = this._gpuBitmapText[e].context;
    t.customShader && (b.return(t.customShader), t.customShader = null), b.return(this._gpuBitmapText[e]), this._gpuBitmapText[e] = null;
  }
  updateRenderable(e) {
    const t = this._getGpuBitmapText(e);
    Be(e, t), this._renderer.renderPipes.graphics.updateRenderable(t), t.context.customShader && this._updateDistanceField(e);
  }
  _updateContext(e, t) {
    const { context: r } = t, s = Ut.getFont(e.text, e._style);
    r.clear(), s.distanceField.type !== "none" && (r.customShader || (r.customShader = b.get(lr)));
    const n = Array.from(e.text), a = e._style;
    let o = s.baseLineOffset;
    const l = Gt(n, a, s, !0);
    let u = 0;
    const c = a.padding, d = l.scale;
    let h = l.width, g = l.height + l.offsetY;
    a._stroke && (h += a._stroke.width / d, g += a._stroke.width / d), r.translate(-e._anchor._x * h - c, -e._anchor._y * g - c).scale(d, d);
    const x = s.applyFillAsTint ? a._fill.color : 16777215;
    for (let f = 0; f < l.lines.length; f++) {
      const m = l.lines[f];
      for (let _ = 0; _ < m.charPositions.length; _++) {
        const R = n[u++], T = s.chars[R];
        T != null && T.texture && r.texture(
          T.texture,
          x || "black",
          Math.round(m.charPositions[_] + T.xOffset),
          Math.round(o + T.yOffset)
        );
      }
      o += s.lineHeight;
    }
  }
  _getGpuBitmapText(e) {
    return this._gpuBitmapText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = b.get(X);
    return this._gpuBitmapText[e.uid] = t, this._updateContext(e, t), e.on("destroyed", this._destroyRenderableBound), this._gpuBitmapText[e.uid];
  }
  _updateDistanceField(e) {
    const t = this._getGpuBitmapText(e).context, r = e._style.fontFamily, s = te.get(`${r}-bitmap`), { a: n, b: a, c: o, d: l } = e.groupTransform, u = Math.sqrt(n * n + a * a), c = Math.sqrt(o * o + l * l), d = (Math.abs(u) + Math.abs(c)) / 2, h = s.baseRenderedFontSize / e._style.fontSize, g = d * s.distanceField.range * (1 / h);
    t.customShader.resources.localUniforms.uniforms.uDistance = g;
  }
  destroy() {
    for (const e in this._gpuBitmapText)
      this._destroyRenderableByUid(e);
    this._gpuBitmapText = null, this._renderer = null;
  }
}
nt.extension = {
  type: [
    p.WebGLPipes,
    p.WebGPUPipes,
    p.CanvasPipes
  ],
  name: "bitmapText"
};
function Be(i, e) {
  e.groupTransform = i.groupTransform, e.groupColorAlpha = i.groupColorAlpha, e.groupColor = i.groupColor, e.groupBlendMode = i.groupBlendMode, e.globalDisplayStatus = i.globalDisplayStatus, e.groupTransform = i.groupTransform, e.localDisplayStatus = i.localDisplayStatus, e.groupAlpha = i.groupAlpha, e._roundPixels = i._roundPixels;
}
class at {
  constructor(e) {
    this._gpuText = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.runners.resolutionChange.add(this), this._renderer.renderableGC.addManagedHash(this, "_gpuText");
  }
  resolutionChange() {
    for (const e in this._gpuText) {
      const t = this._gpuText[e];
      if (!t)
        continue;
      const r = t.batchableSprite.renderable;
      r._autoResolution && (r._resolution = this._renderer.resolution, r.onViewUpdate());
    }
  }
  validateRenderable(e) {
    const t = this._getGpuText(e), r = e._getKey();
    return t.textureNeedsUploading ? (t.textureNeedsUploading = !1, !0) : t.currentKey !== r;
  }
  addRenderable(e, t) {
    const s = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), this._renderer.renderPipes.batch.addToBatch(s, t);
  }
  updateRenderable(e) {
    const r = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), r._batcher.updateElement(r);
  }
  destroyRenderable(e) {
    e.off("destroyed", this._destroyRenderableBound), this._destroyRenderableById(e.uid);
  }
  _destroyRenderableById(e) {
    const t = this._gpuText[e];
    this._renderer.htmlText.decreaseReferenceCount(t.currentKey), b.return(t.batchableSprite), this._gpuText[e] = null;
  }
  _updateText(e) {
    const t = e._getKey(), r = this._getGpuText(e), s = r.batchableSprite;
    r.currentKey !== t && this._updateGpuText(e).catch((a) => {
      console.error(a);
    }), e._didTextUpdate = !1;
    const n = e._style.padding;
    re(s.bounds, e._anchor, s.texture, n);
  }
  async _updateGpuText(e) {
    e._didTextUpdate = !1;
    const t = this._getGpuText(e);
    if (t.generatingTexture)
      return;
    const r = e._getKey();
    this._renderer.htmlText.decreaseReferenceCount(t.currentKey), t.generatingTexture = !0, t.currentKey = r;
    const s = e.resolution ?? this._renderer.resolution, n = await this._renderer.htmlText.getManagedTexture(
      e.text,
      s,
      e._style,
      e._getKey()
    ), a = t.batchableSprite;
    a.texture = t.texture = n, t.generatingTexture = !1, t.textureNeedsUploading = !0, e.onViewUpdate();
    const o = e._style.padding;
    re(a.bounds, e._anchor, a.texture, o);
  }
  _getGpuText(e) {
    return this._gpuText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = {
      texture: A.EMPTY,
      currentKey: "--",
      batchableSprite: b.get(De),
      textureNeedsUploading: !1,
      generatingTexture: !1
    }, r = t.batchableSprite;
    return r.renderable = e, r.transform = e.groupTransform, r.texture = A.EMPTY, r.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }, r.roundPixels = this._renderer._roundPixels | e._roundPixels, e._resolution = e._autoResolution ? this._renderer.resolution : e.resolution, this._gpuText[e.uid] = t, e.on("destroyed", this._destroyRenderableBound), t;
  }
  destroy() {
    for (const e in this._gpuText)
      this._destroyRenderableById(e);
    this._gpuText = null, this._renderer = null;
  }
}
at.extension = {
  type: [
    p.WebGLPipes,
    p.WebGPUPipes,
    p.CanvasPipes
  ],
  name: "htmlText"
};
function dr() {
  const { userAgent: i } = ze.get().getNavigator();
  return /^((?!chrome|android).)*safari/i.test(i);
}
const ur = new Ge();
function ot(i, e, t, r) {
  const s = ur;
  s.minX = 0, s.minY = 0, s.maxX = i.width / r | 0, s.maxY = i.height / r | 0;
  const n = B.getOptimalTexture(
    s.width,
    s.height,
    r,
    !1
  );
  return n.source.uploadMethodId = "image", n.source.resource = i, n.source.alphaMode = "premultiply-alpha-on-upload", n.frame.width = e / r, n.frame.height = t / r, n.source.emit("update", n.source), n.updateUvs(), n;
}
function cr(i, e) {
  const t = e.fontFamily, r = [], s = {}, n = /font-family:([^;"\s]+)/g, a = i.match(n);
  function o(l) {
    s[l] || (r.push(l), s[l] = !0);
  }
  if (Array.isArray(t))
    for (let l = 0; l < t.length; l++)
      o(t[l]);
  else
    o(t);
  a && a.forEach((l) => {
    const u = l.split(":")[1].trim();
    o(u);
  });
  for (const l in e.tagStyles) {
    const u = e.tagStyles[l].fontFamily;
    o(u);
  }
  return r;
}
async function hr(i) {
  const t = await (await ze.get().fetch(i)).blob(), r = new FileReader();
  return await new Promise((n, a) => {
    r.onloadend = () => n(r.result), r.onerror = a, r.readAsDataURL(t);
  });
}
async function Me(i, e) {
  const t = await hr(e);
  return `@font-face {
        font-family: "${i.fontFamily}";
        src: url('${t}');
        font-weight: ${i.fontWeight};
        font-style: ${i.fontStyle};
    }`;
}
const L = /* @__PURE__ */ new Map();
async function fr(i, e, t) {
  const r = i.filter((s) => te.has(`${s}-and-url`)).map((s, n) => {
    if (!L.has(s)) {
      const { url: a } = te.get(`${s}-and-url`);
      n === 0 ? L.set(s, Me({
        fontWeight: e.fontWeight,
        fontStyle: e.fontStyle,
        fontFamily: s
      }, a)) : L.set(s, Me({
        fontWeight: t.fontWeight,
        fontStyle: t.fontStyle,
        fontFamily: s
      }, a));
    }
    return L.get(s);
  });
  return (await Promise.all(r)).join(`
`);
}
function pr(i, e, t, r, s) {
  const { domElement: n, styleElement: a, svgRoot: o } = s;
  n.innerHTML = `<style>${e.cssStyle}</style><div style='padding:0;'>${i}</div>`, n.setAttribute("style", `transform: scale(${t});transform-origin: top left; display: inline-block`), a.textContent = r;
  const { width: l, height: u } = s.image;
  return o.setAttribute("width", l.toString()), o.setAttribute("height", u.toString()), new XMLSerializer().serializeToString(o);
}
function gr(i, e) {
  const t = V.getOptimalCanvasAndContext(
    i.width,
    i.height,
    e
  ), { context: r } = t;
  return r.clearRect(0, 0, i.width, i.height), r.drawImage(i, 0, 0), t;
}
function xr(i, e, t) {
  return new Promise(async (r) => {
    t && await new Promise((s) => setTimeout(s, 100)), i.onload = () => {
      r();
    }, i.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`, i.crossOrigin = "anonymous";
  });
}
class ue {
  constructor(e) {
    this._activeTextures = {}, this._renderer = e, this._createCanvas = e.type === ie.WEBGPU;
  }
  getTexture(e) {
    return this._buildTexturePromise(
      e.text,
      e.resolution,
      e.style
    );
  }
  getManagedTexture(e, t, r, s) {
    if (this._activeTextures[s])
      return this._increaseReferenceCount(s), this._activeTextures[s].promise;
    const n = this._buildTexturePromise(e, t, r).then((a) => (this._activeTextures[s].texture = a, a));
    return this._activeTextures[s] = {
      texture: null,
      promise: n,
      usageCount: 1
    }, n;
  }
  async _buildTexturePromise(e, t, r) {
    const s = b.get(je), n = cr(e, r), a = await fr(
      n,
      r,
      le.defaultTextStyle
    ), o = Vt(e, r, a, s), l = Math.ceil(Math.ceil(Math.max(1, o.width) + r.padding * 2) * t), u = Math.ceil(Math.ceil(Math.max(1, o.height) + r.padding * 2) * t), c = s.image, d = 2;
    c.width = (l | 0) + d, c.height = (u | 0) + d;
    const h = pr(e, r, t, a, s);
    await xr(c, h, dr() && n.length > 0);
    const g = c;
    let x;
    this._createCanvas && (x = gr(c, t));
    const f = ot(
      x ? x.canvas : g,
      c.width - d,
      c.height - d,
      t
    );
    return this._createCanvas && (this._renderer.texture.initSource(f.source), V.returnCanvasAndContext(x)), b.return(s), f;
  }
  _increaseReferenceCount(e) {
    this._activeTextures[e].usageCount++;
  }
  decreaseReferenceCount(e) {
    const t = this._activeTextures[e];
    t && (t.usageCount--, t.usageCount === 0 && (t.texture ? this._cleanUp(t) : t.promise.then((r) => {
      t.texture = r, this._cleanUp(t);
    }).catch(() => {
      $("HTMLTextSystem: Failed to clean texture");
    }), this._activeTextures[e] = null));
  }
  _cleanUp(e) {
    B.returnTexture(e.texture), e.texture.source.resource = null, e.texture.source.uploadMethodId = "unknown";
  }
  getReferenceCount(e) {
    return this._activeTextures[e].usageCount;
  }
  destroy() {
    this._activeTextures = null;
  }
}
ue.extension = {
  type: [
    p.WebGLSystem,
    p.WebGPUSystem,
    p.CanvasSystem
  ],
  name: "htmlText"
};
ue.defaultFontOptions = {
  fontFamily: "Arial",
  fontStyle: "normal",
  fontWeight: "normal"
};
class lt {
  constructor(e) {
    this._gpuText = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.runners.resolutionChange.add(this), this._renderer.renderableGC.addManagedHash(this, "_gpuText");
  }
  resolutionChange() {
    for (const e in this._gpuText) {
      const t = this._gpuText[e];
      if (!t)
        continue;
      const r = t.batchableSprite.renderable;
      r._autoResolution && (r._resolution = this._renderer.resolution, r.onViewUpdate());
    }
  }
  validateRenderable(e) {
    const t = this._getGpuText(e), r = e._getKey();
    return t.currentKey !== r;
  }
  addRenderable(e, t) {
    const s = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), this._renderer.renderPipes.batch.addToBatch(s, t);
  }
  updateRenderable(e) {
    const r = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), r._batcher.updateElement(r);
  }
  destroyRenderable(e) {
    e.off("destroyed", this._destroyRenderableBound), this._destroyRenderableById(e.uid);
  }
  _destroyRenderableById(e) {
    const t = this._gpuText[e];
    this._renderer.canvasText.decreaseReferenceCount(t.currentKey), b.return(t.batchableSprite), this._gpuText[e] = null;
  }
  _updateText(e) {
    const t = e._getKey(), r = this._getGpuText(e), s = r.batchableSprite;
    r.currentKey !== t && this._updateGpuText(e), e._didTextUpdate = !1;
    const n = e._style.padding;
    re(s.bounds, e._anchor, s.texture, n);
  }
  _updateGpuText(e) {
    const t = this._getGpuText(e), r = t.batchableSprite;
    t.texture && this._renderer.canvasText.decreaseReferenceCount(t.currentKey), t.texture = r.texture = this._renderer.canvasText.getManagedTexture(e), t.currentKey = e._getKey(), r.texture = t.texture;
  }
  _getGpuText(e) {
    return this._gpuText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = {
      texture: null,
      currentKey: "--",
      batchableSprite: b.get(De)
    };
    return t.batchableSprite.renderable = e, t.batchableSprite.transform = e.groupTransform, t.batchableSprite.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }, t.batchableSprite.roundPixels = this._renderer._roundPixels | e._roundPixels, this._gpuText[e.uid] = t, e._resolution = e._autoResolution ? this._renderer.resolution : e.resolution, this._updateText(e), e.on("destroyed", this._destroyRenderableBound), t;
  }
  destroy() {
    for (const e in this._gpuText)
      this._destroyRenderableById(e);
    this._gpuText = null, this._renderer = null;
  }
}
lt.extension = {
  type: [
    p.WebGLPipes,
    p.WebGPUPipes,
    p.CanvasPipes
  ],
  name: "text"
};
function Pe(i, e, t) {
  for (let r = 0, s = 4 * t * e; r < e; ++r, s += 4)
    if (i[s + 3] !== 0)
      return !1;
  return !0;
}
function Re(i, e, t, r, s) {
  const n = 4 * e;
  for (let a = r, o = r * n + 4 * t; a <= s; ++a, o += n)
    if (i[o + 3] !== 0)
      return !1;
  return !0;
}
function mr(i, e = 1) {
  const { width: t, height: r } = i, s = i.getContext("2d", {
    willReadFrequently: !0
  });
  if (s === null)
    throw new TypeError("Failed to get canvas 2D context");
  const a = s.getImageData(0, 0, t, r).data;
  let o = 0, l = 0, u = t - 1, c = r - 1;
  for (; l < r && Pe(a, t, l); )
    ++l;
  if (l === r)
    return ge.EMPTY;
  for (; Pe(a, t, c); )
    --c;
  for (; Re(a, t, o, l, c); )
    ++o;
  for (; Re(a, t, u, l, c); )
    --u;
  return ++u, ++c, new ge(o / e, l / e, (u - o) / e, (c - l) / e);
}
class dt {
  constructor(e) {
    this._activeTextures = {}, this._renderer = e;
  }
  getTextureSize(e, t, r) {
    const s = k.measureText(e || " ", r);
    let n = Math.ceil(Math.ceil(Math.max(1, s.width) + r.padding * 2) * t), a = Math.ceil(Math.ceil(Math.max(1, s.height) + r.padding * 2) * t);
    return n = Math.ceil(n - 1e-6), a = Math.ceil(a - 1e-6), n = me(n), a = me(a), { width: n, height: a };
  }
  getTexture(e, t, r, s) {
    typeof e == "string" && (w("8.0.0", "CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"), e = {
      text: e,
      style: r,
      resolution: t
    }), e.style instanceof Z || (e.style = new Z(e.style));
    const { texture: n, canvasAndContext: a } = this.createTextureAndCanvas(
      e
    );
    return this._renderer.texture.initSource(n._source), V.returnCanvasAndContext(a), n;
  }
  createTextureAndCanvas(e) {
    const { text: t, style: r } = e, s = e.resolution ?? this._renderer.resolution, n = k.measureText(t || " ", r), a = Math.ceil(Math.ceil(Math.max(1, n.width) + r.padding * 2) * s), o = Math.ceil(Math.ceil(Math.max(1, n.height) + r.padding * 2) * s), l = V.getOptimalCanvasAndContext(a, o), { canvas: u } = l;
    this.renderTextToCanvas(t, r, s, l);
    const c = ot(u, a, o, s);
    if (r.trim) {
      const d = mr(u, s);
      c.frame.copyFrom(d), c.updateUvs();
    }
    return { texture: c, canvasAndContext: l };
  }
  getManagedTexture(e) {
    e._resolution = e._autoResolution ? this._renderer.resolution : e.resolution;
    const t = e._getKey();
    if (this._activeTextures[t])
      return this._increaseReferenceCount(t), this._activeTextures[t].texture;
    const { texture: r, canvasAndContext: s } = this.createTextureAndCanvas(e);
    return this._activeTextures[t] = {
      canvasAndContext: s,
      texture: r,
      usageCount: 1
    }, r;
  }
  _increaseReferenceCount(e) {
    this._activeTextures[e].usageCount++;
  }
  decreaseReferenceCount(e) {
    const t = this._activeTextures[e];
    if (t.usageCount--, t.usageCount === 0) {
      V.returnCanvasAndContext(t.canvasAndContext), B.returnTexture(t.texture);
      const r = t.texture.source;
      r.resource = null, r.uploadMethodId = "unknown", r.alphaMode = "no-premultiply-alpha", this._activeTextures[e] = null;
    }
  }
  getReferenceCount(e) {
    return this._activeTextures[e].usageCount;
  }
  /**
   * Renders text to its canvas, and updates its texture.
   *
   * By default this is used internally to ensure the texture is correct before rendering,
   * but it can be used called externally, for example from this class to 'pre-generate' the texture from a piece of text,
   * and then shared across multiple Sprites.
   * @param text
   * @param style
   * @param resolution
   * @param canvasAndContext
   */
  renderTextToCanvas(e, t, r, s) {
    var R, T, U, z;
    const { canvas: n, context: a } = s, o = Ft(t), l = k.measureText(e || " ", t), u = l.lines, c = l.lineHeight, d = l.lineWidths, h = l.maxLineWidth, g = l.fontProperties, x = n.height;
    if (a.resetTransform(), a.scale(r, r), a.textBaseline = t.textBaseline, (R = t._stroke) != null && R.width) {
      const S = t._stroke;
      a.lineWidth = S.width, a.miterLimit = S.miterLimit, a.lineJoin = S.join, a.lineCap = S.cap;
    }
    a.font = o;
    let f, m;
    const _ = t.dropShadow ? 2 : 1;
    for (let S = 0; S < _; ++S) {
      const G = t.dropShadow && S === 0, F = G ? Math.ceil(Math.max(1, x) + t.padding * 2) : 0, ut = F * r;
      if (G) {
        a.fillStyle = "black", a.strokeStyle = "black";
        const v = t.dropShadow, ct = v.color, ht = v.alpha;
        a.shadowColor = H.shared.setValue(ct).setAlpha(ht).toRgbaString();
        const ft = v.blur * r, fe = v.distance * r;
        a.shadowBlur = ft, a.shadowOffsetX = Math.cos(v.angle) * fe, a.shadowOffsetY = Math.sin(v.angle) * fe + ut;
      } else
        a.fillStyle = t._fill ? xe(t._fill, a) : null, (T = t._stroke) != null && T.width && (a.strokeStyle = xe(t._stroke, a)), a.shadowColor = "black";
      let ce = (c - g.fontSize) / 2;
      c - g.fontSize < 0 && (ce = 0);
      const he = ((U = t._stroke) == null ? void 0 : U.width) ?? 0;
      for (let v = 0; v < u.length; v++)
        f = he / 2, m = he / 2 + v * c + g.ascent + ce, t.align === "right" ? f += h - d[v] : t.align === "center" && (f += (h - d[v]) / 2), (z = t._stroke) != null && z.width && this._drawLetterSpacing(
          u[v],
          t,
          s,
          f + t.padding,
          m + t.padding - F,
          !0
        ), t._fill !== void 0 && this._drawLetterSpacing(
          u[v],
          t,
          s,
          f + t.padding,
          m + t.padding - F
        );
    }
  }
  /**
   * Render the text with letter-spacing.
   * @param text - The text to draw
   * @param style
   * @param canvasAndContext
   * @param x - Horizontal position to draw the text
   * @param y - Vertical position to draw the text
   * @param isStroke - Is this drawing for the outside stroke of the
   *  text? If not, it's for the inside fill
   */
  _drawLetterSpacing(e, t, r, s, n, a = !1) {
    const { context: o } = r, l = t.letterSpacing;
    let u = !1;
    if (k.experimentalLetterSpacingSupported && (k.experimentalLetterSpacing ? (o.letterSpacing = `${l}px`, o.textLetterSpacing = `${l}px`, u = !0) : (o.letterSpacing = "0px", o.textLetterSpacing = "0px")), l === 0 || u) {
      a ? o.strokeText(e, s, n) : o.fillText(e, s, n);
      return;
    }
    let c = s;
    const d = k.graphemeSegmenter(e);
    let h = o.measureText(e).width, g = 0;
    for (let x = 0; x < d.length; ++x) {
      const f = d[x];
      a ? o.strokeText(f, c, n) : o.fillText(f, c, n);
      let m = "";
      for (let _ = x + 1; _ < d.length; ++_)
        m += d[_];
      g = o.measureText(m).width, c += h - g + l, h = g;
    }
  }
  destroy() {
    this._activeTextures = null;
  }
}
dt.extension = {
  type: [
    p.WebGLSystem,
    p.WebGPUSystem,
    p.CanvasSystem
  ],
  name: "canvasText"
};
y.add(We);
y.add(Oe);
y.add(Ke);
y.add(kt);
y.add(Qe);
y.add(Ze);
y.add(et);
y.add(dt);
y.add(lt);
y.add(nt);
y.add(ue);
y.add(at);
y.add(it);
y.add(st);
y.add(Ie);
y.add(Ve);
