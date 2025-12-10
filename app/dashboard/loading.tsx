export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="text-center space-y-4">
        <div className="text-6xl animate-bounce">🍍</div>
        <h2 className="text-2xl font-bold font-serif">Loading Dashboard...</h2>
        <p className="text-muted-foreground">Preparing your 100-day journey</p>
      </div>
    </div>
  );
}
