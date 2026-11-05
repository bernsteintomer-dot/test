import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const SKILL = join(homedir(), ".claude/skills/anatomy");
const k = await import(join(SKILL, "kit/iso-kit.mjs"));
const { kitScript } = await import(join(SKILL, "scripts/inline-kit.mjs"));

const HERE = dirname(fileURLToPath(import.meta.url));
const theme = process.argv.includes("--light") ? "light" : "dark";

// ---------- the model: what each transceiver generation is made of ----------
const GENS = [
  { name: "100G", lanes: 4, rate: 25 },
  { name: "400G", lanes: 4, rate: 100 },
  { name: "800G", lanes: 8, rate: 100 },
  { name: "1.6T", lanes: 8, rate: 200 },
];
const FULL_SCALE = 250; // Gb/s per lane for one needle turn
const START = 2;

// ---------- world ----------
const WIDTH = 640;
const HEIGHT = 420;
const PLATE = { x: -128, y: -80, w: 276, d: 165, r: 8 };
const PLATE_H = 12;
const FOOT_H = 5;

const SW = { x: -112, y: -66, w: 52, d: 110, r: 3 }; // switch chassis, front face at x = -60
const SW_H = 36;
const CAGES = [-45, -11, 23]; // cage centres along y; the middle one holds the module
const CAGE_X = SW.x + SW.w; // -60
const CAGE_W = 10;

const INST = { x: 20, y: -70, w: 112, d: 34, r: 3 }; // lane tester
const INST_H = 26;
const KNOB = [42, -53];
const KNOB_R = 7;
const DIAL = [100, -53];
const DIAL_R = 14;
const DIAL_Z = INST_H;
const DIAL_H = 8;
const DIAL_TOP = DIAL_Z + DIAL_H;
const KNOB_ANGLES = GENS.map((_, i) => ((-75 + i * 50) * Math.PI) / 180);

const CY = -11; // module centre line
const MOD = { x: -50, y: CY - 15, w: 118, d: 30, r: 1.4 }; // OSFP module, lid off
const MOD_Z = 7;
const SHELL_TOP = 12;
const PCB_TOP = 12.8;
const DIE_X = 20;
const DIE_Y = (i) => CY - 11.4 + i * 3;

const LID = { x: -20, y: 30, w: 104, d: 28, r: 1.4 };
const AMP = { x: -118, y: 52, w: 62, d: 24, r: 3 };
const AMP_H = 16;

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), ...k.boxCorners(SW, 0, SW_H), ...k.boxCorners(INST, 0, DIAL_TOP + 2), [-70, 64, 24]],
  WIDTH,
  HEIGHT,
  { pad: 28, azimuth: 40 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const poly = (points) => k.pathOf(points.map(at), true);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const halo = (plan, z, h, blur = 4) => `<path class="iso-halo" d="${k.haloOf(plan, z, h, P)}" style="filter:blur(${blur}px)"/>`;
const hole = (points) => `<path class="cavity" d="${poly(points)}"/>${L(poly(points), { tone: "lo" })}`;
// a rectangle in the plane x = const
const xRect = (x, y0, y1, z0, z1) => [[x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1]];
// a rectangle in the plane y = const
const yRect = (y, x0, x1, z0, z1) => [[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]];

function plate() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 22))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // ruler strip along the front edge
  const strip = { x: -55, y: PLATE.y + PLATE.d - 14, w: 195, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.6, [2, 3.6], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([strip.x + 2, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 2, strip.y + 3.5, 0.6])], { size: 0.45 }));
  // label plate
  const label = { x: 98, y: 38, w: 40, d: 18, r: 1.5 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 4), { tone: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.6), 0.8, P), { tone: "faint" }));
  [[26, 43], [20, 47.5], [14, 52]].forEach(([w, y]) => out.push(L(k.lineOnTop([label.x + 5, y], [label.x + 5 + w, y], 0.8, P), { tone: "lo", free: true })));
  out.push(D([at([label.x + 35, label.y + 4, 0.8]), at([label.x + 35, label.y + 14, 0.8])], { size: 0.45 }));
  return out.join("");
}

function chassis() {
  const out = [halo(SW, 0, 1)];
  out.push(S(k.slabOf(SW, 0, SW_H, P, 6, 1.2), { tone: "mid", inner: L(k.sideSeam(SW, 30, P, 6), { tone: "faint" }) }));
  // two fan guards on top
  for (const [cx, cy] of [[-86, -36], [-86, 14]]) {
    out.push(L([k.ring(cx, cy, 16, SW_H, P, 56), k.ring(cx, cy, 11, SW_H, P, 48), k.ring(cx, cy, 6, SW_H, P, 32)].join(""), { tone: "lo" }));
    out.push(S(k.cylinder(cx, cy, 3, SW_H, 0.8, P, 20), { tone: "mid" }));
    out.push(D([[-12, -12], [12, -12], [-12, 12], [12, 12]].map(([dx, dy]) => at([cx + dx, cy + dy, SW_H])), { size: 0.45 }));
  }
  out.push(D(k.corners(SW, 5).map(([x, y]) => at([x, y, SW_H])), { size: 0.5 }));
  // vent slots on the front (+y) face
  for (let i = 0; i < 4; i++) {
    const x0 = SW.x + 8 + i * 10;
    out.push(L(poly(yRect(SW.y + SW.d, x0, x0 + 5, 7, 25)), { tone: "lo" }));
  }
  // status LEDs on the port face
  out.push(D([12, 17, 22].map((z) => at([CAGE_X, 39, z])), { size: 0.55, tone: "hi" }));
  out.push(D([12, 17, 22].map((z) => at([CAGE_X, -59, z])), { size: 0.45, tone: "mid" }));
  return out.join("");
}

function cages() {
  const out = [];
  for (const cy of CAGES) {
    const plan = { x: CAGE_X, y: cy - 16, w: CAGE_W, d: 32, r: 0.6 };
    out.push(S(k.slabOf(plan, 5, 17, P, 2, 0.4), { tone: "mid" }));
    out.push(hole(xRect(CAGE_X + CAGE_W, cy - 15, cy + 15, 6, 21)));
    out.push(D([at([CAGE_X + 3, cy - 11, 22]), at([CAGE_X + 3, cy + 11, 22])], { size: 0.4 }));
  }
  return out.join("");
}

function instrument() {
  const out = [halo(INST, 0, 1)];
  out.push(S(k.slabOf(INST, 0, INST_H, P, 6, 1), { tone: "mid", inner: L(k.sideSeam(INST, 4, P, 6), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(INST, 4), INST_H, P), { tone: "faint" }));
  out.push(D(k.corners(INST, 7).map(([x, y]) => at([x, y, INST_H])), { size: 0.5 }));
  // display window on the front face
  const FY = INST.y + INST.d;
  out.push(S(k.slabOf({ x: 30, y: FY, w: 34, d: 0.8, r: 0.3 }, 7, 13, P, 2), { tone: "lo" }));
  out.push(hole(yRect(FY + 0.8, 32, 62, 9, 18)));
  out.push(`<g data-part="display">${k.faceTextSvg(k.sideMatrix([47, FY + 0.8], 11, P, "left"), GENS[START].name, { size: 6, tone: "hi", anchor: "middle" })}</g>`);
  // LEDs and vents on the front
  out.push(D([at([72, FY, 15]), at([78, FY, 15])], { size: 0.6, tone: "hi" }));
  for (let i = 0; i < 5; i++) out.push(L(poly(yRect(FY, 88 + i * 7, 92 + i * 7, 6, 20)), { tone: "lo" }));
  // knob with four index marks
  const [kx, ky] = KNOB;
  out.push(S(k.cylinder(kx, ky, KNOB_R + 2.4, INST_H, 1, P, 36), { tone: "lo" }));
  out.push(S(k.cylinder(kx, ky, KNOB_R, INST_H + 1, 5, P, 36), { tone: "mid" }));
  out.push(L(k.knurl(kx, ky, KNOB_R, INST_H + 1, INST_H + 6, 40, P), { tone: "lo" }));
  out.push(L(k.ring(kx, ky, KNOB_R - 1.6, INST_H + 6, P, 36), { tone: "faint" }));
  out.push(D(KNOB_ANGLES.map((a) => at([kx + Math.sin(a) * (KNOB_R + 4.6), ky - Math.cos(a) * (KNOB_R + 4.6), INST_H])), { size: 0.6, tone: "mid" }));
  // dial gauge: per-lane rate
  const [x, y] = DIAL;
  out.push(S(k.cylinder(x, y, DIAL_R + 2, DIAL_Z, 1.2, P, 56), { tone: "lo" }));
  out.push(S(k.cylinder(x, y, DIAL_R, DIAL_Z + 1.2, DIAL_H - 1.2, P, 64, 0.8), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(x, y, DIAL_R, DIAL_TOP - 3, DIAL_TOP, 72, P, 0.3), { tone: "lo" }));
  out.push(L(k.sideArc(x, y, DIAL_R, DIAL_TOP - 3, P, 40), { tone: "faint" }));
  out.push(L(k.ring(x, y, DIAL_R - 2, DIAL_TOP, P, 64), { tone: "lo" }));
  const ticks = k.radialTicks(x, y, DIAL_R - 2.6, 50, 5, DIAL_TOP, [1.1, 2.4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(L(k.ring(x, y, 1.4, DIAL_TOP, P, 16), { tone: "mid" }));
  return out.join("");
}

const pointerAt = (angle) =>
  lineOnTopFn([KNOB[0], KNOB[1]], [KNOB[0] + Math.sin(angle) * (KNOB_R - 1), KNOB[1] - Math.cos(angle) * (KNOB_R - 1)], INST_H + 6);
const needleAt = (turn) => {
  const a = turn * Math.PI * 2;
  return lineOnTopFn([DIAL[0] - Math.sin(a) * 3, DIAL[1] + Math.cos(a) * 3], [DIAL[0] + Math.sin(a) * (DIAL_R - 3.4), DIAL[1] - Math.cos(a) * (DIAL_R - 3.4)], DIAL_TOP + 0.2);
};
const lineOnTopFn = (a, b, z) => k.lineOnTop(a, b, z, P);

function amplifier() {
  const out = [halo(AMP, 0, 1)];
  out.push(S(k.slabOf(AMP, 0, AMP_H, P, 6, 1), { tone: "mid", inner: L(k.sideSeam(AMP, 9, P, 6), { tone: "faint" }) }));
  out.push(D(k.corners(AMP, 4).map(([x, y]) => at([x, y, AMP_H])), { size: 0.5 }));
  // cooling fins on the left half
  for (let i = 0; i < 6; i++) {
    out.push(S(k.slabOf({ x: AMP.x + 5, y: AMP.y + 3 + i * 3.4, w: 28, d: 1.4, r: 0.4 }, AMP_H, 5, P, 2), { tone: "mid", crease: "none" }));
  }
  // two hardline ports and a test point on the right half
  for (const [px, py] of byDepth([[-80, 64], [-66, 64]])) {
    out.push(S(k.cylinder(px, py, 3.6, AMP_H, 2.4, P, 6), { tone: "mid" }));
    out.push(S(k.cylinder(px, py, 2.3, AMP_H + 2.4, 5, P, 24), { tone: "hi" }));
    out.push(L(k.knurl(px, py, 2.3, AMP_H + 2.6, AMP_H + 7.2, 16, P, 0.2), { tone: "lo" }));
    out.push(L(k.ring(px, py, 1, AMP_H + 7.4, P, 12), { tone: "mid" }));
    out.push(D([at([px, py, AMP_H + 7.4])], { size: 0.45, tone: "hi" }));
  }
  out.push(L(k.ring(-73, 56, 1.6, AMP_H, P, 14), { tone: "lo" }), D([at([-73, 56, AMP_H])], { size: 0.45 }));
  out.push(k.faceTextSvg(k.sideMatrix([-98, AMP.y + AMP.d], 6, P, "left"), "1.8 GHz", { size: 3.2, tone: "lo", anchor: "middle" }));
  return out.join("");
}

function moduleArt() {
  const out = [halo(k.insetPlan(MOD, 2), MOD_Z, 0.1, 5)];
  const WALL_W = 104;
  const FAR_WALL = { x: MOD.x, y: MOD.y, w: WALL_W, d: 2, r: 0.4 };
  const NEAR_WALL = { x: MOD.x, y: MOD.y + MOD.d - 2, w: WALL_W, d: 2, r: 0.4 };
  out.push(S(k.slabOf(MOD, MOD_Z, SHELL_TOP - MOD_Z, P, 3, 0.5), { tone: "mid" }));
  out.push(S(k.slabOf(FAR_WALL, SHELL_TOP, 4, P, 2), { tone: "mid" }));
  out.push(S(k.slabOf({ x: MOD.x + 1, y: CY - 12.8, w: WALL_W - 2, d: 25.6, r: 0.5 }, SHELL_TOP, PCB_TOP - SHELL_TOP, P, 2), { tone: "lo", crease: "none" }));
  // DSP, driver, passives
  const dsp = { x: -14, y: CY - 8, w: 16, d: 14, r: 0.8 };
  out.push(S(k.slabOf(dsp, PCB_TOP, 2, P, 2, 0.4), { tone: "hi", crease: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(dsp, 2), PCB_TOP + 2, P, 2), { tone: "faint" }));
  out.push(S(k.slabOf({ x: 7, y: CY - 9, w: 7, d: 18, r: 0.5 }, PCB_TOP, 1.4, P, 2), { tone: "mid" }));
  const caps = [];
  for (const x of [-38, -33, -28]) for (const dy of [-9, -4, 3, 8]) caps.push([x, CY + dy]);
  for (const [cx, cy] of byDepth(caps)) {
    out.push(S(k.slabOf({ x: cx, y: cy, w: 2.8, d: 1.6, r: 0.25 }, PCB_TOP, 1.1, P, 1), { tone: "mid", crease: "none" }));
  }
  out.push(D(k.dotGrid(-46, CY - 9, 2, 5, 4.4, PCB_TOP, P), { size: 0.4, tone: "lo" }));
  // laser submount, dies, beams, lens array
  out.push(S(k.slabOf({ x: DIE_X - 1.5, y: CY - 12.4, w: 6.5, d: 24.8, r: 0.4 }, PCB_TOP, 1.2, P, 1), { tone: "mid" }));
  for (let i = 0; i < 8; i++) {
    const plan = { x: DIE_X, y: DIE_Y(i), w: 3.6, d: 1.8, r: 0.25 };
    const paths = k.slabOf(plan, PCB_TOP + 1.2, 1.4, P, 1);
    const yc = DIE_Y(i) + 0.9;
    const beam = k.lineOnTop([DIE_X + 3.6, yc], [27, yc], PCB_TOP + 1.9, P);
    out.push(`<g class="lane" data-lane="${i}"><g class="lane-off">${S(paths, { tone: "lo" })}</g><g class="lane-on">${S(paths, { tone: "hi", lit: true })}${L(beam, { tone: "lit" })}</g></g>`);
  }
  // fibres from the lens array to the MPO receptacle
  for (let i = 0; i < 8; i++) {
    const y = DIE_Y(i) + 0.9;
    out.push(`<path class="iso-line fibre" data-fibre="${i}" data-tone="faint" d="${k.lineOnTop([28.5, y], [54, y], PCB_TOP + 1.2, P)}"/>`);
  }
  out.push(S(k.slabOf({ x: 27, y: CY - 12.4, w: 3.6, d: 24.8, r: 0.8 }, PCB_TOP, 2.8, P, 2, 0.4), { tone: "hi", crease: "lo" }));
  out.push(D(Array.from({ length: 8 }, (_, i) => at([28.8, DIE_Y(i) + 0.9, PCB_TOP + 2.8])), { size: 0.45, tone: "lo" }));
  out.push(S(k.slabOf(NEAR_WALL, SHELL_TOP, 4, P, 2), { tone: "mid" }));
  out.push(D([-40, -10, 20].map((x) => at([x, NEAR_WALL.y + 1, SHELL_TOP + 4])), { size: 0.45 }));
  // MPO receptacle
  const mpo = { x: 52, y: CY - 11, w: 16, d: 22, r: 1.4 };
  out.push(S(k.slabOf(mpo, SHELL_TOP, 9, P, 3, 0.5), { tone: "mid" }));
  out.push(hole(xRect(68, CY - 8, CY + 8, 14.5, 19)));
  out.push(D([at([68, CY - 6, 16.8]), at([68, CY + 6, 16.8])], { size: 0.55, tone: "hi" }));
  // pull latch
  out.push(S(k.slabOf({ x: 68, y: MOD.y + 0.4, w: 8, d: 2.4, r: 0.6 }, 8, 2.4, P, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.slabOf({ x: 68, y: MOD.y + MOD.d - 2.8, w: 8, d: 2.4, r: 0.6 }, 8, 2.4, P, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.slabOf({ x: 75, y: MOD.y + 0.4, w: 3, d: MOD.d - 0.8, r: 1.2 }, 8, 2.4, P, 2), { tone: "mid" }));
  return out.join("");
}

function lid() {
  const out = [halo(LID, 0, 1)];
  out.push(S(k.slabOf(LID, 0, 4, P, 3, 0.5), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(LID, 2), 4, P, 3), { tone: "faint" }));
  out.push(S(k.slabOf({ x: LID.x + 34, y: LID.y + 7, w: 16, d: 14, r: 0.6 }, 4, 0.6, P, 2), { tone: "lo", crease: "none" }));
  out.push(S(k.slabOf({ x: LID.x + 67, y: LID.y + 2, w: 8, d: 24, r: 0.6 }, 4, 0.6, P, 2), { tone: "lo", crease: "none" }));
  const holes = k.corners(LID, 4);
  out.push(L(holes.map(([x, y]) => k.ring(x, y, 1.1, 4, P, 12)).join(""), { tone: "lo" }));
  return out.join("");
}

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A test bench. On the left, a switch with three transceiver cages; an optical module with its lid off is plugged into the middle cage. Inside it, eight laser chips sit in a row behind a lens array, and fibres run to the connector at the front. Behind it, a lane tester has a four-position knob and a dial that reads the data rate of one lane. The module's lid lies on the bench, and a cable-TV amplifier with cooling fins sits at the front left.",
  body: [
    plate(),
    chassis(),
    cages(),
    amplifier(),
    instrument(),
    `<path data-part="pointer" class="iso-line" data-tone="hi" data-free="end" d="${pointerAt(KNOB_ANGLES[START])}" style="stroke-width:1.1"/>`,
    `<path data-part="needle" class="iso-line" data-tone="hi" data-free="both" d="${needleAt(GENS[START].rate / FULL_SCALE)}" style="stroke-width:1.1"/>`,
    moduleArt(),
    lid(),
  ],
});

const readoutOf = (g) => `${g.name} · ${g.lanes} lasers × ${g.rate}G`;

const live = `
const P = ${JSON.stringify(P)};
const GENS = ${JSON.stringify(GENS)};
const KNOB = ${JSON.stringify(KNOB)}, KNOB_R = ${KNOB_R}, INST_H = ${INST_H}, KNOB_ANGLES = ${JSON.stringify(KNOB_ANGLES)};
const DIAL = ${JSON.stringify(DIAL)}, DIAL_R = ${DIAL_R}, DIAL_TOP = ${DIAL_TOP}, FULL_SCALE = ${FULL_SCALE};
const lineOnTopFn = (a, b, z) => lineOnTop(a, b, z, P);
const pointerAt = ${pointerAt.toString()};
const needleAt = ${needleAt.toString()};
const readoutOf = ${readoutOf.toString()};
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const pointer = svg.querySelector('[data-part="pointer"]');
const needle = svg.querySelector('[data-part="needle"]');
const display = svg.querySelector('[data-part="display"] text');
const lanes = [...svg.querySelectorAll(".lane")];
const fibres = [...svg.querySelectorAll(".fibre")];
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");
let gen = ${START}, turn = GENS[gen].rate / FULL_SCALE, angle = KNOB_ANGLES[gen];
let frame = 0, last = 0, clock = 0, touring = !still.matches, visible = false, idleTimer = 0;
function select(next) {
  gen = next;
  const g = GENS[gen];
  lanes.forEach((el, i) => el.toggleAttribute("data-on", i < g.lanes));
  fibres.forEach((el, i) => el.setAttribute("data-tone", i < g.lanes ? "hi" : "faint"));
  if (display) display.textContent = g.name;
  const text = readoutOf(g);
  readout.textContent = text;
  stage.setAttribute("aria-valuenow", String(gen));
  stage.setAttribute("aria-valuetext", text + " = " + (g.lanes * g.rate) + " Gb/s");
  run();
}
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  if (touring) { clock += dt; const want = (${START} + Math.floor(clock / 2.6)) % GENS.length; if (want !== gen) select(want); }
  const g = GENS[gen];
  const t1 = g.rate / FULL_SCALE, a1 = KNOB_ANGLES[gen];
  const ease = still.matches ? 1 : 1 - Math.exp(-dt / 0.32);
  turn += (t1 - turn) * ease; angle += (a1 - angle) * ease;
  if (Math.abs(t1 - turn) < 1e-4) turn = t1;
  if (Math.abs(a1 - angle) < 1e-4) angle = a1;
  needle.setAttribute("d", needleAt(turn));
  pointer.setAttribute("d", pointerAt(angle));
  const settled = !touring && turn === t1 && angle === a1;
  frame = visible && !settled ? requestAnimationFrame(tick) : 0;
}
function run() { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } }
function steer(next) {
  touring = false;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 4200);
  if (next !== gen) select(next); else run();
}
new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
stage.addEventListener("pointermove", (event) => {
  const box = svg.getBoundingClientRect();
  const share = Math.min(0.999, Math.max(0, (event.clientX - box.left) / box.width));
  steer(Math.floor(share * GENS.length));
});
stage.addEventListener("keydown", (event) => {
  let to = null;
  if (event.key === "ArrowRight" || event.key === "ArrowUp") to = Math.min(GENS.length - 1, gen + 1);
  if (event.key === "ArrowLeft" || event.key === "ArrowDown") to = Math.max(0, gen - 1);
  if (event.key === "Home") to = 0;
  if (event.key === "End") to = GENS.length - 1;
  if (to === null) return;
  event.preventDefault();
  steer(to);
});
select(gen);
`;

const EXTRA_CSS = `<style>
.iso .cavity{fill:#c4c4bf}.iso[data-theme="dark"] .cavity{fill:#060606}\n.lane .lane-on{opacity:0;transition:opacity .45s var(--anatomy-ease)}
.lane .lane-off{transition:opacity .45s var(--anatomy-ease)}
.lane[data-on] .lane-on{opacity:1}
.lane[data-on] .lane-off{opacity:0}
.fibre{transition:stroke .45s var(--anatomy-ease)}
@media (prefers-reduced-motion: reduce){.lane .lane-on,.lane .lane-off,.fibre{transition:none}}
.iso-legend [lang="he"]{direction:rtl;text-align:right;display:block}
</style>`;

const g0 = GENS[START];
const body = k.plateHtml({
  fig: "Fig 1",
  title: "AAOI · optical module",
  hint: "Hover to change generation",
  readout: readoutOf(g0),
  keys: [
    { mark: "lit", label: "@@K1@@" },
    { mark: "raised", label: "@@K2@@" },
  ],
  caption: "@@CAP@@",
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Transceiver generation: arrow keys step from 100G to 1.6T" aria-valuemin="0" aria-valuemax="3" aria-valuenow="${START}">${svg}</div>`,
});

const he = (s) => `<span lang="he" dir="rtl">${s}</span>`;
const K1 = "שבבי לייזר ש-AAOI מייצרת בעצמה. מודול 800G דולק ב-8 לייזרים × 100G, ו-1.6T ב-8 × 200G";
const K2 = "מגבר CATV ‏1.8GHz לחברות כבלים: העסק השני";
const CAP =
  "AAOI מייצרת את שבבי הלייזר בעצמה (Sugar Land בטקסס, טייוואן ונינגבו בסין) ואורזת אותם במודולים אופטיים שמחברים בין שרתי AI במרכזי נתונים. ברבעון השני של 2026 זה היה 107.7 מיליון $ מתוך 191.9 (56%), צמיחה של 140% לעומת השנה הקודמת. " +
  "העסק השני הוא מגברי CATV לרשתות כבלים: 80.6 מיליון $ (42%). ההכנסות כולן קפצו ב-86% לעומת השנה הקודמת, אבל ההפסד הנקי לפי GAAP היה 22.8 מיליון $ והרווח הגולמי 27.7% בלבד. " +
  "התחזית לרבעון השלישי היא 255–290 מיליון $. הסיפור כולו תלוי במעבר ל-800G ול-1.6T ובמספר לקוחות קטן מאוד: עשרת הגדולים הם 99% מההכנסות.";

let html = k.pageHtml({ title: "AAOI optical module", theme, body, script: kitScript() + live, width: 700 });
html = html
  .replace("@@K1@@", he(K1))
  .replace("@@K2@@", he(K2))
  .replace("@@CAP@@", he(CAP))
  .replace("</head>", `${EXTRA_CSS}</head>`);
const file = theme === "light" ? "aaoi-light.html" : "aaoi.html";
writeFileSync(join(HERE, file), html);
console.log("wrote", file);
