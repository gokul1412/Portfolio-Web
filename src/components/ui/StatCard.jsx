import { useCountUp } from "../../hooks/useCountUp";

export function StatCard({ target, suffix, label }) {
  const [count, ref] = useCountUp(target);
  return (
    <div className="stat" ref={ref}>
      <div className="stat-num">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
