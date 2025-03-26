import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import type { Skip } from '../constants/skips';
import { Button, MovingBorder } from './ui/moving-border';
import { cn } from '../lib/utils';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: () => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  // Calculate total price including VAT
  const vatAmount = skip.price_before_vat * (skip.vat / 100);
  const totalPrice = skip.price_before_vat + vatAmount;

  // Check if the skip is only for private property
  const isPrivateOnly = !skip.allowed_on_road;

  // Handle card click
  const handleCardClick = () => {
    onSelect();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('skip-card-hover skip-card', isSelected && 'skip-card-selected')}
      onClick={handleCardClick}
      data-author="Paul Doros"
    >
      <div className="relative p-[1px] rounded-lg overflow-hidden">
        {/* Moving border effect when selected */}
        {isSelected && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <MovingBorder duration={4000} rx="12px" ry="12px">
              <div className="h-28 w-28 opacity-[0.7] bg-[radial-gradient(var(--sky-500)_20%,var(--blue-500)_30%,var(--indigo-500)_45%,transparent_65%)]" />
            </MovingBorder>
          </div>
        )}

        <div
          className={cn(
            'relative border-2 rounded-lg shadow-lg transition-all duration-300 bg-card text-card-foreground h-full flex flex-col z-10',
            isSelected
              ? 'border-primary/70 shadow-lg shadow-primary/20'
              : 'border-border hover:border-input'
          )}
        >
          {/* Skip size badge */}
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-sm px-2 py-1 rounded-full font-semibold z-10">
            {skip.size} Yards
          </div>

          {/* Skip image */}
          <div className="relative rounded-t-md h-48 overflow-hidden">
            <img
              src={skip.imageUrl || `/images/${skip.size}.JPG`}
              alt={`${skip.size} Yard Skip`}
              className="w-full h-full object-cover"
              onError={e => {
                // Fallback for missing images
                const target = e.target as HTMLImageElement;
                target.src = '/images/skip-default.jpg';
              }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>

            {/* Private property only badge */}
            {isPrivateOnly && (
              <div className="absolute bottom-3 left-3 bg-amber-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Private Property Only</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div
            className={cn(
              'p-4 flex flex-col flex-grow',
              isSelected && 'bg-gradient-to-b from-transparent to-primary/5'
            )}
          >
            <h3 className="text-xl font-bold mb-1">{skip.name || `${skip.size} Yard Skip`}</h3>
            <p className="text-muted-foreground text-sm mb-3 flex-grow">
              {skip.description || `${skip.size} cubic yard capacity skip.`}
            </p>

            {/* Additional details */}
            <div className="flex justify-between text-sm text-muted-foreground mb-3">
              <span>{skip.hire_period_days} day hire</span>
              {skip.allows_heavy_waste ? (
                <span className="text-green-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Heavy waste
                </span>
              ) : (
                <span className="text-red-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  No heavy waste
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
              <span
                className={cn('text-2xl font-bold', isSelected ? 'text-primary' : 'text-primary')}
              >
                £{Math.round(totalPrice)}
              </span>
              <span className="text-muted-foreground text-sm ml-1">inc. VAT</span>
            </div>

            {/* Select button */}
            <button
              onClick={e => {
                e.stopPropagation(); // Prevent triggering card click
                onSelect();
              }}
              className={cn(
                'w-full py-2 rounded-md text-center transition-colors font-semibold',
                isSelected
                  ? 'bg-green-600 hover:bg-green-700 text-white ring-2 ring-green-600/30'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              )}
            >
              {isSelected ? 'Selected' : 'Select This Skip'}
              {isSelected ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span className="ml-1">→</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkipCard;
