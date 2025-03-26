# Skip Selection Page Redesign

A modern, responsive redesign of the skip selection page for WeWantWaste.co.uk.

## Project Overview

This project is a redesign of the skip selection page for a waste management company. The goal was to create a more modern, user-friendly interface while maintaining the core functionality. The application allows users to select different skip sizes and proceed to confirmation.

## Features

- **Dark Mode Design**: Modern dark theme with bright accents for better contrast and visibility
- **Light/Dark Mode Toggle**: Users can switch between light and dark themes based on preference
- **Responsive Layout**: Works well on both mobile and desktop devices
- **Progress Indicator**: Shows users where they are in the booking process
- **Interactive Skip Cards**: Attractive cards with hover effects and clear information
- **Accessibility Improvements**: Better contrast, clearer labels, and responsive design
- **Property Indicators**: Clear visual indicators for skips that require private property placement
- **Animated Transitions**: Smooth animations for better user experience
- **URL Parameter Filtering**: Save and share filter/sort preferences via URL parameters

## Technologies Used

- React + React Router 7
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- ShadCN UI components
- Context API for state management

## Development Approach

1. **Analysis**: Studied the original design and identified areas for improvement
2. **Design System**: Created a consistent design system with dark/light themes
3. **Component Architecture**: Built reusable components for maintainability
4. **Responsive Design**: Ensured mobile-first responsive design
5. **Animations**: Added subtle animations for improved UX
6. **Testing**: Tested across different screen sizes and devices

## Installation and Usage

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Format code using Prettier
npm run format

# Check code formatting
npm run format:check

# Format CSS files only
npm run format:css
```

## Code Formatting

This project uses Prettier for consistent code formatting. Configuration can be found in the `.prettierrc` file. VS Code is configured to format on save with the recommended Prettier extension.

To ensure your code is properly formatted:

1. Install the VS Code Prettier extension (recommended in `.vscode/extensions.json`)
2. Enable "Format on Save" in your editor (preconfigured in `.vscode/settings.json`)
3. Run `npm run format` to manually format all files

## Structure

- `app/routes/skips.tsx`: Main skip selection page
- `app/routes/confirm.tsx`: Confirmation page
- `app/components/SkipCard.tsx`: Reusable card component for displaying skips
- `app/components/ProgressIndicator.tsx`: Step indicator for booking process
- `app/components/ThemeToggle.tsx`: Light/dark mode toggle component
- `app/context/SkipContext.tsx`: State management for skip selection
- `app/context/ThemeContext.tsx`: State management for theme preferences

## Further Improvements

Given more time, the following improvements could be made:

1. Image optimization and loading states
2. More filter options for skip selection
3. Enhanced animations for transitions between pages
4. Additional accessibility features
5. Comprehensive test coverage
6. Server-side data validation

## Author

Designed and developed by [Paul Doros](https://pauldoros.site).

## License

This project is a protected demo for recruitment use only. Not to be used, modified, or deployed in commercial settings without written permission.
