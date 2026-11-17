// The logo mark as plain elements (share images can't use the SVG component's CSS vars).
export default function OgMark({ size = 40, fg = "#f7f7f4", bg = "#111110" }) {
  const c = size / 20;
  const sq = (x, y, w) => (
    <div
      style={{
        position: "absolute",
        left: x * c,
        top: y * c,
        width: w * c,
        height: w * c,
        borderRadius: 1.2 * c,
        background: fg,
      }}
    />
  );
  return (
    <div style={{ position: "relative", display: "flex", width: size, height: size, borderRadius: 5 * c, background: bg }}>
      {sq(4, 4, 5)}
      {sq(11, 4, 5)}
      {sq(4, 11, 5)}
      {sq(12.5, 12.5, 2)}
    </div>
  );
}
