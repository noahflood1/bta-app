export function formatTime(seconds) {
   const m = String(Math.floor(seconds / 60)).padStart(2, '0');
   const s = String(seconds % 60).padStart(2, '0');
   return `${m}:${s}`;
 }
 
 export function formatPercent(value) {
   return value != null ? `${parseFloat(value).toFixed(1)}%` : 'N/A';
 }
 