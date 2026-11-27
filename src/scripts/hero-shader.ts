/**
 * Hero background shader, rendered with the `shaders` core (three.js WebGPU,
 * WebGL fallback) and no UI framework. It makes the same calls, in the same
 * order, as the library's React <Shader> component did, so the output matches
 * the previous site. Telemetry to shaders.com is not started.
 *
 * Node ids must not contain "__": the library joins `${prop}_${id}` into GLSL
 * identifiers, where a double underscore is reserved.
 */
import { createUniformsMap, shaderRenderer } from "shaders/core";
import { componentDefinition as ChromaFlow } from "shaders/core/ChromaFlow";
import { componentDefinition as FilmGrain } from "shaders/core/FilmGrain";
import { componentDefinition as FlutedGlass } from "shaders/core/FlutedGlass";
import { componentDefinition as LinearGradient } from "shaders/core/LinearGradient";
import { componentDefinition as Stripes } from "shaders/core/Stripes";
import { componentDefinition as Swirl } from "shaders/core/Swirl";
import { vec4 } from "three/tsl";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Renderer = ReturnType<typeof shaderRenderer>;
type Definition = Parameters<typeof createUniformsMap>[0];
type Metadata = NonNullable<Parameters<Renderer["registerNode"]>[3]>;
type Layer = { instanceId: string; def: Definition; props: Record<string, any> };

const ROOT_ID = "shader-root-hero";

const LAYERS: Layer[] = [
  { instanceId: "swirl", def: Swirl, props: { colorA: "#F4F3EF", colorB: "#EEEDE9", detail: 1.7 } },
  {
    instanceId: "chromaflow",
    def: ChromaFlow,
    props: { baseColor: "#F4F3EF", downColor: "#EF4A2A", leftColor: "#EF4A2A", rightColor: "#EF4A2A", upColor: "#EF4A2A", momentum: 12, radius: 3.0 },
  },
  {
    instanceId: "right_mask",
    def: LinearGradient,
    props: { id: "right_mask", visible: false, colorA: "rgba(255, 255, 255, 0)", colorB: "rgba(255, 255, 255, 1)", start: { x: 0.35, y: 0.5 }, end: { x: 0.8, y: 0.5 } },
  },
  {
    instanceId: "stripes",
    def: Stripes,
    props: { maskSource: "right_mask", colorA: "#EF4A2A", colorB: "rgba(239, 74, 42, 0)", angle: -35, density: 5.5, balance: 0.25, softness: 0.75, speed: 0.1 },
  },
  {
    instanceId: "flutedglass",
    def: FlutedGlass,
    props: { aberration: 0.55, angle: 31, frequency: 8, highlight: 0.1, highlightSoftness: 0.1, lightAngle: -90, refraction: 3.8, shape: "rounded", softness: 1, speed: 0.12 },
  },
  { instanceId: "filmgrain", def: FilmGrain, props: { strength: 0.06 } },
];

const DEFAULT_TRANSFORM = { offsetX: 0, offsetY: 0, rotation: 0, scale: 1, anchorX: 0.5, anchorY: 0.5, edges: "transparent" as const };

function effectiveProps(def: Definition, props: Record<string, any>) {
  const result: Record<string, any> = { blendMode: "normal", visible: true };
  for (const [key, config] of Object.entries((def.props ?? {}) as Record<string, any>)) {
    if (config && typeof config === "object" && "default" in config) result[key] = config.default;
  }
  for (const [key, value] of Object.entries(props)) if (value !== undefined) result[key] = value;
  return result;
}

// The React component registers first without a render order, then sets it.
function metadata(props: Record<string, any>, renderOrder: number | undefined): Metadata {
  return {
    blendMode: props.blendMode || "normal",
    opacity: props.opacity,
    visible: props.visible === false ? false : true,
    id: props.id,
    mask: props.maskSource ? { source: props.maskSource, type: props.maskType || "alpha" } : undefined,
    maps: undefined,
    renderOrder,
    transform: DEFAULT_TRANSFORM,
  } as Metadata;
}

export function mountHeroShader(container: HTMLElement, canvas: HTMLCanvasElement) {
  const renderer = shaderRenderer();

  // Layer registration (child components registered before the root initialised).
  LAYERS.forEach(({ instanceId, def, props }, index) => {
    const values = effectiveProps(def, props);
    const uniforms = createUniformsMap(def, values, instanceId);
    try {
      renderer.registerNode(instanceId, def.fragmentNode, ROOT_ID, metadata(props, undefined), uniforms, def, undefined);
      renderer.updateNodeMetadata(instanceId, { renderOrder: index });
      for (const [name, data] of Object.entries(uniforms as Record<string, any>)) {
        if (data && typeof data === "object" && data.uniform?.value !== undefined && name in values) {
          renderer.updateUniformValue(instanceId, name, values[name]);
        }
      }
      renderer.updateNodeMetadata(instanceId, metadata(props, index));
    } catch (err) {
      console.error("[HeroShader] layer setup failed:", err);
    }
  });

  let initialized = false;
  let initializing = false;
  const init = async () => {
    if (initialized || initializing) return;
    initializing = true;
    try {
      await renderer.initialize({ canvas, colorSpace: "p3-linear", toneMapping: "linear" });
      renderer.registerNode(ROOT_ID, ({ childNode }: { childNode?: any }) => childNode || vec4(0, 0, 0, 0), null, null, {});
      initialized = true;
    } catch (err) {
      console.error("[HeroShader] initialization failed:", err);
    } finally {
      initializing = false;
    }
  };

  // Render only while the hero is on screen.
  const rect = container.getBoundingClientRect();
  let visible = rect.width > 0 && rect.height > 0;
  if (visible) void init();
  new IntersectionObserver(
    ([entry]) => {
      if (!entry) return;
      const r = container.getBoundingClientRect();
      const now = entry.isIntersecting && r.width > 0 && r.height > 0;
      if (now && !visible) {
        if (renderer.isInitialized()) renderer.startAnimation();
        else void init();
        visible = true;
      } else if (!now && visible) {
        renderer.stopAnimation();
        visible = false;
      }
    },
    { threshold: 0 },
  ).observe(container);
}
