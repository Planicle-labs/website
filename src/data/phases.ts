// Process phases and the 3D card-stack motion, shared by the markup and the client script.

export interface Phase {
  id: string;
  label: string;
  title: string;
  overline: string;
  copy: string;
}

export interface LayerMotion {
  depth: number;
  offsetX: number;
  offsetY: number;
  opacity: number;
}
export const PHASES: Phase[] = [
  {
    id: 'plan',
    label: 'PLAN',
    overline: 'PHASE 01 — SCOPING & ARCHITECTURE',
    title: 'Build your idea',
    copy: 'We scope your project with precision — market insights, user flows, and a technical architecture built to scale. No vague timelines, no scope creep. You\'ll know exactly what you\'re getting before we write a single line of code.'
  },
  {
    id: 'design',
    label: 'DESIGN',
    overline: 'PHASE 02 — BESPOKE IDENTITY & SYSTEMS',
    title: 'Define the identity',
    copy: 'We reject generic SaaS templates and cartoon illustrations. Every pixel we lay down is bespoke, structured, and expensive — built to wow your investors, captivate your users, and establish elite authority in your category.'
  },
  {
    id: 'develop',
    label: 'DEVELOP',
    overline: 'PHASE 03 — PRODUCTION-GRADE ENGINEERING',
    title: 'Ship with precision',
    copy: 'Pixel-perfect frontend execution combined with clean, high-performance backend architecture. We build production-ready products with zero technical debt, designed to scale seamlessly as your user base explodes.'
  },
  {
    id: 'test',
    label: 'TEST',
    overline: 'PHASE 04 — RIGOROUS CRAFT VERIFICATION',
    title: 'Verify the craft',
    copy: 'Our engineering goes through rigorous QC passes: WCAG 2.1 AA contrast compliance, responsive fluidity across all breakpoints, and speed benchmarks. We don\'t ship until the code behaves flawlessly.'
  },
  {
    id: 'deploy',
    label: 'DEPLOY',
    overline: 'PHASE 05 — SECURE RELEASE & LIFTOFF',
    title: 'Scale without limits',
    copy: 'Smooth infrastructure setup, cloud deployments, and SEO optimizations. We put your product live on a stack designed for absolute reliability, lightning-fast loads, and total scalability from day one.'
  }
];

export const getLayerMotion = (layerIdx: number, activeIdx: number): LayerMotion => {
  const baseDepth = 80 - layerIdx * 40;
  const isActive = layerIdx === activeIdx;
  const isPast = layerIdx < activeIdx;

  let opacity = 0.35;
  if (isActive) opacity = 1;
  if (isPast) opacity = 0;

  return {
    depth: isActive ? baseDepth + 24 : baseDepth,
    offsetX: isActive ? -8 : 0,
    offsetY: isActive ? -12 : 0,
    opacity,
  };
};

export const getLayerTransform = (
  motion: LayerMotion,
) => {
  return `translateX(${motion.offsetX}px) translateY(${motion.offsetY}px) translateZ(${motion.depth}px)`;
};
