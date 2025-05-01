export default function StatsDashboard({ stats }) {
   return (
     <div className="text-white space-y-2">
       <p>Total Makes: {stats.totalMakes}</p>
       <p>Total Misses: {stats.totalMisses}</p>
       <p>Total Shots: {stats.totalShots}</p>
       <p>Shooting %: {stats.shootingPercentage}</p>
       <p>Total Time (min): {(stats.totalTime / 60).toFixed(1)}</p>
     </div>
   );
 }
 