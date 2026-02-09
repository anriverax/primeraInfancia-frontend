export const MapLegend = (): React.JSX.Element => (
  <div className="absolute bottom-5 left-5 bg-white rounded-lg shadow-lg text-xs z-10 p-3 space-y-1">
    <div>
      <span className="text-[#3b82f6] mr-1">●</span>
      Urbana
    </div>
    <div>
      <span className="text-[#8b6c5c] mr-1">●</span>
      Rural
    </div>
    <div>
      <span className="text-[#ef4444] mr-1">●</span>Alta concentración
    </div>
  </div>
);
