// exerciseData.ts
// MET values and calorie calculation for exercises

export const MET_VALUES: Record<string, number> = {
  running: 9.8,
  cycling: 7.5,
  walking: 3.8,
  pushups: 8.0,
  skipping: 12.3,
};

export function getExerciseMET(exercise: string): number {
  return MET_VALUES[exercise] || 1;
}

// elapsed: seconds
export function calculateCalories(met: number, weight: number, elapsed: number): number {
  return ((met * weight * 3.5) / 200) * (elapsed / 60);
} 