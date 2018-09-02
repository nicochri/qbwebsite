var line = document.getElementById('line');
var marker1 = document.getElementById('marker-1');
var marker2 = document.getElementById('marker-2');
var angle = document.getElementById('angle');
var radius = document.getElementById('radius');
var steps = new Array(32).fill(0);
var tl = new TimelineMax({
repeat: -1,
yoyo: true,
repeatDelay: 1 });
steps.forEach(function (_, idx) {
var t = -3 * Math.PI * (idx + 1) / (1.5 * steps.length);
var l = getLoc(40, t);
var tm = 3 / steps.length;
var step = 360 / (steps.length - 1);
tl.to(line, tm, {
attr: { d: 'M50,50 L' + l.join(',') } },
idx * tm).
to(marker2, tm, {
attr: { cx: l[0], cy: l[1] },
onUpdate: function onUpdate() {
angle.textContent = '\u03B8 = ' + (step * idx).toFixed(2) + '\xB0';
} },
idx * tm);
});
steps.forEach(function (_, idx) {
var r = 40 - 30 * idx / steps.length;
var l = getLoc(r, 0);
var tm = 1 / steps.length;
tl.to(line, tm, {
attr: { d: 'M50,50 L' + l.join(',') } },
3.5 + idx * tm).
to(circle, tm, {
attr: { r: r } },
3.5 + idx * tm).
to(marker2, tm, {
attr: { cx: l[0], cy: l[1] },
onUpdate: function onUpdate() {
radius.textContent = 'r = ' + Math.round(r);
} },
3.5 + idx * tm);
});
function getLoc(r, t) {
return [50 + r * Math.cos(t), 50 + r * Math.sin(t)];
}
//# sourceURL=pen.js