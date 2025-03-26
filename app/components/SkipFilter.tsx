import React, { useState } from 'react';

const SkipFilter: React.FC<{
  onFilterChange: (filters: { heavyWaste: boolean; onRoad: boolean }) => void;
}> = ({ onFilterChange }) => {
  const [filterHeavyWaste, setFilterHeavyWaste] = useState(false);
  const [filterOnRoad, setFilterOnRoad] = useState(false);

  const handleHeavyWasteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setFilterHeavyWaste(newValue);
    onFilterChange({ heavyWaste: newValue, onRoad: filterOnRoad });
  };

  const handleOnRoadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setFilterOnRoad(newValue);
    onFilterChange({ heavyWaste: filterHeavyWaste, onRoad: newValue });
  };

  return (
    <div className="mb-4 md:mb-0" data-author="Paul Doros">
      <h3 className="text-lg font-semibold mb-2">Filter Skips</h3>
      <div className="space-y-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filterHeavyWaste}
            onChange={handleHeavyWasteChange}
            className="rounded text-primary focus:ring-primary"
          />
          <span>Heavy Waste Allowed</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filterOnRoad}
            onChange={handleOnRoadChange}
            className="rounded text-primary focus:ring-primary"
          />
          <span>On-Road Placement Allowed</span>
        </label>
      </div>
    </div>
  );
};

export default SkipFilter;
