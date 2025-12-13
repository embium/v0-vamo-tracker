'use client';

import { useAppStore } from '@/lib/store';

export function EvidenceGrid() {
  const { evidence, startDate, lastCommitDate, streak } = useAppStore();

  // Calculate the start date of the current active streak
  const getStreakStartDate = () => {
    if (!lastCommitDate || streak === 0) return null; // No active streak

    // Work backwards from lastCommitDate by (streak - 1) days
    const lastCommit = new Date(lastCommitDate);
    lastCommit.setHours(0, 0, 0, 0);
    const streakStartMs =
      lastCommit.getTime() - (streak - 1) * 24 * 60 * 60 * 1000;
    return streakStartMs;
  };

  const streakStartDate = getStreakStartDate();

  // Check if a date is within the current active streak
  const isInCurrentStreak = (dateString: string) => {
    if (!streakStartDate) return false;
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      date.getTime() >= streakStartDate && date.getTime() <= today.getTime()
    );
  };

  // Generate grid for 100 days
  const days = Array.from({ length: 100 }, (_, i) => {
    const date = new Date((startDate || Date.now()) + i * 24 * 60 * 60 * 1000);
    const dateString = date.toDateString();
    const count = evidence.filter(
      (e) => new Date(e.date).toDateString() === dateString
    ).length;
    const inCurrentStreak = isInCurrentStreak(dateString);
    return { date: dateString, count, inCurrentStreak };
  });

  const getColor = (count: number, inCurrentStreak: boolean) => {
    if (!inCurrentStreak) {
      // Old evidence from before streak break - use gray colors
      if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
      return 'bg-gray-300 dark:bg-gray-700 opacity-60';
    }

    // Current streak - normal green colors
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count === 1) return 'bg-emerald-200 dark:bg-emerald-900';
    if (count === 2) return 'bg-emerald-400 dark:bg-emerald-700';
    if (count === 3) return 'bg-emerald-500 dark:bg-emerald-600';
    return 'bg-emerald-600 dark:bg-emerald-500';
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-grid grid-cols-20 gap-1.5 min-w-max">
        {days.map((day, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-sm ${getColor(
              day.count,
              day.inCurrentStreak
            )} transition-colors hover:ring-2 hover:ring-emerald-500`}
            title={`${day.date}: ${day.count} evidence${
              day.count !== 1 ? 's' : ''
            }${
              !day.inCurrentStreak && day.count > 0
                ? ' (before current streak)'
                : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
}
