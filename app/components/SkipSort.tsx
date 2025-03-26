import React, { useState } from 'react';

type SortOption = 'size' | 'price';

const SkipSort: React.FC<{
  onSortChange: (sort: SortOption) => void;
}> = ({ onSortChange }) => {
  const [sortBy, setSortBy] = useState<SortOption>('size');

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    onSortChange(option);
  };

  return (
    <div data-author="Paul Doros">
      <h3 className="text-lg font-semibold mb-2">Sort By</h3>
      <div className="flex space-x-2">
        <button
          onClick={() => handleSortChange('size')}
          className={`px-4 py-2 rounded-lg ${
            sortBy === 'size' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Size
        </button>
        <button
          onClick={() => handleSortChange('price')}
          className={`px-4 py-2 rounded-lg ${
            sortBy === 'price' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Price
        </button>
      </div>
    </div>
  );
};

export default SkipSort;
