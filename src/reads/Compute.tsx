import { useComputeCloseHour } from "./useComputeCloseHour";
import { useComputeTimeClash } from "./useComputeTimeClash";

export function Compute() {
  useComputeTimeClash();
  useComputeCloseHour();

  return <></>;
}
