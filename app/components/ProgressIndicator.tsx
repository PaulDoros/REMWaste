import React from 'react';
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

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps }) => {
  const getIconForStep = (step: Step, index: number) => {
    if (step.isCompleted) {
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }

    if (step.isActive) {
      return <span className="text-sm font-semibold">{index + 1}</span>;
    }

    return <span className="text-sm">{index + 1}</span>;
  };

  // Map step IDs to specific icons
  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'postcode':
        return (
          <svg
            className="w-5 h-5"
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
            className="w-5 h-5"
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
            className="w-5 h-5"
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
            className="w-5 h-5"
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
            className="w-5 h-5"
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
            className="w-5 h-5"
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
        return <span className="text-sm">{steps.findIndex(s => s.id === stepId) + 1}</span>;
    }
  };

  const getStepLinkForId = (stepId: string) => {
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

  return (
    <div
      className="bg-secondary py-5 px-3 md:py-6 md:px-4 shadow-md rounded-md relative overflow-hidden"
      data-author="Paul Doros"
    >
      <div className="container mx-auto relative z-10">
        <div className="flex justify-center relative">
          {/* Progress line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted dark:bg-muted-foreground -translate-y-1/2"></div>

          {/* Steps container with horizontal scroll on mobile */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6 px-2 md:px-0 overflow-x-auto no-scrollbar max-w-screen-lg mx-auto">
            {steps.map((step, index) => {
              const isClickable = step.isCompleted;
              const stepLink = getStepLinkForId(step.id);
              const isLast = index === steps.length - 1;

              const stepContent = (
                <motion.div
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
                  <div
                    className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 ${
                      step.isActive
                        ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                        : step.isCompleted
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted-foreground bg-secondary text-muted-foreground'
                    }`}
                  >
                    {getStepIcon(step.id)}
                  </div>
                  <span
                    className={`mt-2 text-[10px] sm:text-xs text-center whitespace-nowrap px-1 max-w-[80px] sm:max-w-none ${
                      step.isActive
                        ? 'text-foreground font-medium'
                        : step.isCompleted
                          ? 'text-foreground font-medium'
                          : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );

              const content =
                isClickable && stepLink ? (
                  <Link key={step.id} to={stepLink} className="block">
                    {stepContent}
                  </Link>
                ) : (
                  <div>{stepContent}</div>
                );

              return (
                <div key={step.id} className="flex items-center">
                  {content}
                  {!isLast && (
                    <div className="hidden sm:block w-4 md:w-6 lg:w-8 h-0.5 bg-transparent mx-1 md:mx-2">
                      {/* Spacer */}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sparkles and gradient effects */}
      <div className="absolute top-0 left-0 right-0 h-full w-full overflow-hidden pointer-events-none">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[3px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core sparkles component */}
        <SparklesCore
          id="progressSparkles"
          background="transparent"
          minSize={0.2}
          maxSize={0.6}
          particleDensity={15}
          className="w-full h-full opacity-40"
          particleColor="var(--primary)"
          speed={0.2}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
