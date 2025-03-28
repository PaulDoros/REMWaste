import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useSkipContext } from '../context/SkipContext';
import ProgressIndicator from '../components/ProgressIndicator';
import ThemeToggle from '../components/ThemeToggle';
import ChatAssistant from '../components/ChatAssistant';
import { GradientButton } from '../components/ui/gradient-button';
import SparklesHeader from '../components/SparklesHeader';

// This type mimics what would normally be generated by Route types
type ComponentProps = {
  params: {};
};

// Define steps for the progress indicator
const STEPS = [
  { id: 'postcode', label: 'Postcode', isCompleted: true },
  { id: 'waste-type', label: 'Waste Type', isCompleted: true },
  { id: 'select-skip', label: 'Select Skip', isCompleted: true },
  { id: 'permit-check', label: 'Permit Check', isActive: true },
  { id: 'choose-date', label: 'Choose Date' },
  { id: 'payment', label: 'Payment' },
];

export default function Component({ params }: ComponentProps) {
  const navigate = useNavigate();
  const { selectedSkip, setSelectedSkip } = useSkipContext();

  // If no skip is selected, redirect back to selection page
  React.useEffect(() => {
    if (!selectedSkip) {
      navigate('/skips');
    }
  }, [selectedSkip, navigate]);

  const handleGoBack = () => {
    navigate('/skips');
  };

  const handleConfirm = () => {
    alert('This is a demo only. Your skip booking would be confirmed in a production app.');
  };

  if (!selectedSkip) return null;

  // Calculate total price including VAT
  const vatAmount = selectedSkip.price_before_vat * (selectedSkip.vat / 100);
  const totalPrice = selectedSkip.price_before_vat + vatAmount;

  return (
    <div className="min-h-screen bg-background text-foreground relative" data-author="Paul Doros">
      {/* Subtle sparkles effect at the top */}
      <SparklesHeader particleColor="var(--green-500)" height="h-[180px]" particleDensity={25} />

      {/* Progress indicator with adjusted position to not overlap with theme toggle */}
      <div className="pt-10">
        <ProgressIndicator steps={STEPS} />
      </div>

      {/* Page content */}
      <div className="container mx-auto px-4 py-6 pb-20">
        <motion.h1
          className="text-3xl font-bold mb-3 text-center mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Confirm Your Selection
        </motion.h1>

        <p className="text-muted-foreground text-center mb-5">
          Review your skip selection and continue to checkout.
        </p>

        <motion.div
          className="max-w-2xl mx-auto bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Skip image header */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={selectedSkip.imageUrl || `/images/${selectedSkip.size}.JPG`}
              alt={`${selectedSkip.size} Yard Skip`}
              className="w-full h-full object-cover"
              onError={e => {
                // Fallback for missing images
                const target = e.target as HTMLImageElement;
                target.src = '/images/skip-default.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-full p-4">
              <h2 className="text-3xl font-bold text-white">
                {selectedSkip.name || `${selectedSkip.size} Yard Skip`}
              </h2>
              <p className="text-white text-opacity-90">
                {selectedSkip.description || `${selectedSkip.size} cubic yard capacity skip.`}
              </p>
            </div>
          </div>

          {/* Skip details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-muted-foreground text-sm mb-2">Skip Details</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                    <span>
                      <strong>Size:</strong> {selectedSkip.size} cubic yards
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      <strong>Hire Period:</strong> {selectedSkip.hire_period_days} days
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>
                      <strong>Delivery Area:</strong> {selectedSkip.postcode}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 mr-2 ${selectedSkip.allows_heavy_waste ? 'text-green-400' : 'text-red-400'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {selectedSkip.allows_heavy_waste ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      )}
                    </svg>
                    <span>
                      <strong>Heavy Waste:</strong>{' '}
                      {selectedSkip.allows_heavy_waste ? 'Allowed' : 'Not allowed'}
                      {!selectedSkip.allows_heavy_waste && (
                        <span className="block text-xs text-red-400 mt-1">
                          No concrete, soil, bricks or rubble
                        </span>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 mr-2 ${selectedSkip.allowed_on_road ? 'text-green-400' : 'text-amber-400'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {selectedSkip.allowed_on_road ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      )}
                    </svg>
                    <span>
                      <strong>Placement:</strong>{' '}
                      {selectedSkip.allowed_on_road
                        ? 'Road or private property'
                        : 'Private property only'}
                      {!selectedSkip.allowed_on_road && (
                        <span className="block text-xs text-amber-400 mt-1">
                          This skip size requires private property placement
                        </span>
                      )}
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-muted-foreground text-sm mb-2">Pricing</h3>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span>Skip Hire:</span>
                    <span>£{selectedSkip.price_before_vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <span>VAT ({selectedSkip.vat}%):</span>
                    <span>£{vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl border-t border-border pt-3">
                    <span>Total:</span>
                    <span className="text-primary">£{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-muted-foreground text-sm mb-2">Next Steps</h3>
                  <p className="text-muted-foreground text-sm">
                    Proceeding will take you to permit verification and then select a delivery date.
                    You will be able to make payment on the final step.
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <button
                onClick={handleGoBack}
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
              >
                ← Back to Selection
              </button>

              <GradientButton
                onClick={handleConfirm}
                variant="proceed"
                className="w-full sm:w-auto min-w-[220px]"
              >
                Proceed to Permit Check →
              </GradientButton>
            </div>
          </div>
        </motion.div>

        {/* Footer - Portfolio Link */}
        <div className="py-4 text-center text-muted-foreground text-sm mt-6">
          <p>
            Design by{' '}
            <a
              href="https://pauldoros.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              Paul Doros
            </a>
          </p>
        </div>
      </div>

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Chat assistant */}
      <ChatAssistant />
    </div>
  );
}
