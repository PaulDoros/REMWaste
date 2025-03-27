import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { SparklesCore } from './ui/sparkles';

interface Step {
  id: string;
  label: string;
  isActive?: boolean;
  isCompleted?: boolean;
  link?: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
}

// Create a memoized pulse animation component to prevent re-rendering
const PulseAnimation = React.memo(({ isActive }: { isActive: boolean | undefined }) => {
  if (!isActive) return null;

  return (
    <>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/30"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.7, 0.4, 0.7],
        }}
        transition={{
          duration: 2.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/20"
        animate={{
          scale: [1, 1.7, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 3,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
          delay: 0.2,
        }}
      />
    </>
  );
});

PulseAnimation.displayName = 'PulseAnimation';

// Memoize the step icon component to prevent re-rendering
const StepIcon = React.memo(({ stepId }: { stepId: string }) => {
  const getStepIcon = (id: string) => {
    switch (id) {
      case 'postcode':
        return (
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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
        );
      case 'waste-type':
        return (
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        );
      case 'select-skip':
        return (
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
            />
          </svg>
        );
      case 'permit-check':
        return (
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );
      case 'choose-date':
        return (
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      case 'payment':
        return (
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        );

      default:
        return <span className="text-sm">{id}</span>;
    }
  };

  return getStepIcon(stepId);
});

StepIcon.displayName = 'StepIcon';

// Memoize the individual step to prevent re-rendering
const Step = React.memo(
  ({
    step,
    index,
    activeIndex,
    totalSteps,
  }: {
    step: Step;
    index: number;
    activeIndex: number;
    totalSteps: number;
  }) => {
    const isClickable = step.isCompleted;
    const stepPosition = `${(index / (totalSteps - 1)) * 100}%`;

    const getLinkForStep = (stepId: string) => {
      switch (stepId) {
        case 'postcode':
          return '/postcode';
        case 'waste-type':
          return '/waste-type';
        case 'select-skip':
          return '/skips';
        case 'permit-check':
          return '/confirm';
        case 'choose-date':
          return '/date';
        case 'payment':
          return '/payment';
        default:
          return '';
      }
    };

    const stepLink = getLinkForStep(step.id);

    const stepContent = (
      <motion.div
        className={`flex flex-col items-center absolute transform -translate-x-1/2`}
        style={{ left: stepPosition }}
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: step.isActive ? 1.1 : 1,
        }}
        transition={{
          duration: 0.4,
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
      >
        <motion.div
          className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
            step.isActive
              ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20'
              : step.isCompleted
                ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/10'
                : 'border-muted-foreground/30 bg-background text-muted-foreground'
          }`}
          initial={false}
          animate={{
            scale: step.isActive ? 1.1 : 1,
            borderWidth: step.isActive ? 3 : 2,
          }}
          whileHover={isClickable ? { scale: 1.1, y: -3 } : {}}
          whileTap={isClickable ? { scale: 0.95 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <StepIcon stepId={step.id} />
          <PulseAnimation isActive={step.isActive} />
        </motion.div>

        <motion.span
          className={`mt-2 text-xs text-center whitespace-nowrap font-medium ${
            step.isActive
              ? 'text-foreground font-semibold'
              : step.isCompleted
                ? 'text-foreground'
                : 'text-muted-foreground'
          }`}
          animate={{
            opacity: step.isActive ? 1 : 0.8,
            y: step.isActive ? 0 : 2,
            scale: step.isActive ? 1.05 : 1,
          }}
        >
          {step.label}
        </motion.span>
      </motion.div>
    );

    return (
      <React.Fragment>
        {isClickable && stepLink ? (
          <Link to={stepLink} className="block h-16 w-0">
            {stepContent}
          </Link>
        ) : (
          <div className="block h-16 w-0">{stepContent}</div>
        )}
      </React.Fragment>
    );
  }
);

Step.displayName = 'Step';

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps }) => {
  // Get current active step index
  const activeIndex = steps.findIndex(step => step.isActive);

  // Mobile-specific render - showing only relevant steps
  const renderMobileSteps = () => {
    // Show only the active step, previous step (if exists), and next step (if exists)
    const visibleSteps = [];

    // Add previous step if exists
    if (activeIndex > 0) {
      visibleSteps.push(steps[activeIndex - 1]);
    }

    // Add current step
    visibleSteps.push(steps[activeIndex]);

    // Add next step if exists
    if (activeIndex < steps.length - 1) {
      visibleSteps.push(steps[activeIndex + 1]);
    }

    return (
      <div className="flex items-center justify-center space-x-4 sm:space-x-6 relative">
        {/* Progress line */}
        <div className="absolute top-1/4 left-1/4 right-1/4 h-[2px] bg-primary/20 -translate-y-1/2"></div>

        {visibleSteps.map((step, idx) => {
          const isClickable = step.isCompleted;
          const stepLink = (() => {
            switch (step.id) {
              case 'postcode':
                return '/postcode';
              case 'waste-type':
                return '/waste-type';
              case 'select-skip':
                return '/skips';
              case 'permit-check':
                return '/confirm';
              case 'choose-date':
                return '/date';
              case 'payment':
                return '/payment';
              default:
                return '';
            }
          })();

          const stepContent = (
            <motion.div
              key={step.id}
              className={`flex flex-col items-center relative z-10 ${
                step.isActive
                  ? 'text-primary'
                  : step.isCompleted
                    ? 'text-primary cursor-pointer'
                    : 'text-muted-foreground'
              }`}
              whileHover={isClickable ? { scale: 1.05 } : {}}
              whileTap={isClickable ? { scale: 0.95 } : {}}
            >
              <motion.div
                className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300 ${
                  step.isActive
                    ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : step.isCompleted
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-primary/10 bg-secondary text-muted-foreground'
                }`}
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{
                  scale: step.isActive ? 1.05 : 1,
                  opacity: 1,
                }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
              >
                <StepIcon stepId={step.id} />
                <PulseAnimation isActive={step.isActive} />
              </motion.div>
              <span
                className={`mt-2 text-xs text-center font-medium ${
                  step.isActive
                    ? 'text-foreground'
                    : step.isCompleted
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>

              {/* Step indicator for context */}
              <span className="mt-1 text-[10px] text-muted-foreground">
                {steps.findIndex(s => s.id === step.id) + 1}/{steps.length}
              </span>
            </motion.div>
          );

          return isClickable && stepLink ? (
            <Link key={step.id} to={stepLink}>
              {stepContent}
            </Link>
          ) : (
            <div key={step.id}>{stepContent}</div>
          );
        })}

        {/* Current step indicator */}
        <div className="absolute -bottom-5 left-0 right-0 text-center">
          <div className="inline-flex gap-1">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full ${
                  idx === activeIndex
                    ? 'bg-primary'
                    : idx < activeIndex
                      ? 'bg-primary/40'
                      : 'bg-muted-foreground/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Desktop render - showing all steps
  const renderDesktopSteps = useMemo(() => {
    return (
      <div className="flex items-center justify-center relative">
        {/* Progress line - now with gradient and animation */}
        <div className="absolute top-1/3 left-0 right-0 h-[3px] bg-border/40 -translate-y-1/2"></div>

        {/* Animated progress line */}
        <motion.div
          className="absolute top-1/3 left-0 h-[3px] bg-primary -translate-y-1/2 origin-left"
          initial={{ width: '0%' }}
          animate={{
            width: `${(activeIndex / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Steps with proper spacing */}
        <div className="flex items-center justify-between space-x-1 md:space-x-1 lg:space-x-1 w-full mx-auto relative z-10">
          {steps.map((step, index) => (
            <Step
              key={step.id}
              step={step}
              index={index}
              activeIndex={activeIndex}
              totalSteps={steps.length}
            />
          ))}
        </div>
      </div>
    );
  }, [steps, activeIndex]); // Only re-render when steps or activeIndex change

  return (
    <div
      className="bg-background/80 backdrop-blur-sm py-6 px-3 md:py-0 md:px-4 rounded-md relative overflow-hidden border border-border/50 shadow-sm"
      data-author="Paul Doros"
    >
      <div className="container mx-auto relative z-10">
        {/* Mobile view (simplified) */}
        <div className="sm:hidden">{renderMobileSteps()}</div>

        {/* Desktop view (full) */}
        <div className="hidden sm:block relative pt-6 pb-4">{renderDesktopSteps}</div>
      </div>

      {/* Sparkles and gradient effects */}
      <div className="absolute top-0 left-0 right-0 h-full w-full overflow-hidden pointer-events-none">
        {/* Gradients */}
        <div className="absolute inset-x-0 left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-0 left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px w-3/4" />
        <div className="absolute inset-x-0 left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[3px] w-1/4 blur-sm" />
        <div className="absolute inset-x-0 left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core sparkles component */}
        <SparklesCore
          id="progressSparkles"
          background="transparent"
          minSize={0.2}
          maxSize={0.6}
          particleDensity={12}
          className="w-full h-full opacity-40"
          particleColor="var(--primary)"
          speed={0.2}
        />
      </div>
    </div>
  );
};

export default React.memo(ProgressIndicator);
