export function calculateGlobalStats(segments) {
   let totalMakes = 0;
   let totalMisses = 0;
   let totalTime = 0;
 
   for (const seg of segments) {
     totalMakes += seg.makes || 0;
     totalMisses += seg.misses || 0;
     totalTime += seg.duration || 0;
   }
 
   return {
     totalMakes,
     totalMisses,
     totalShots: totalMakes + totalMisses,
     shootingPercentage:
       totalMakes + totalMisses > 0
         ? ((totalMakes / (totalMakes + totalMisses)) * 100).toFixed(1)
         : 'N/A',
     totalTime,
   };
 }
 