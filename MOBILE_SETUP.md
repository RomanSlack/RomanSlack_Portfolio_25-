# Mobile/Desktop Component Setup

## Overview
This portfolio now supports completely different mobile and desktop experiences using component switching based on screen size detection. The setup allows for independent mobile and desktop development without affecting each other.

## Architecture

### Mobile Detection Hook
- **File**: `hooks/useIsMobile.ts`
- **Purpose**: Detects screen size (default breakpoint: 768px)
- **Returns**: Boolean indicating if current viewport is mobile
- **Features**: 
  - Responsive to window resize events
  - Configurable breakpoint
  - SSR-safe implementation

### Component Structure

#### Original Desktop Components (Unchanged)
- `components/OrbitCarousel.tsx`
- `components/Modal.tsx` 
- `components/ContactModal.tsx`
- `components/NavCard.tsx`
- `components/ContactButton.tsx`

#### New Mobile Components (Identical for now)
- `components/OrbitCarouselMobile.tsx`
- `components/ModalMobile.tsx`
- `components/ContactModalMobile.tsx` 
- `components/NavCardMobile.tsx`
- `components/ContactButtonMobile.tsx`
- `components/PageMobile.tsx`

### Main Page Logic
- **File**: `app/page.tsx`
- **Logic**: 
  ```tsx
  const isMobile = useIsMobile();
  return isMobile ? <PageMobile /> : <DesktopPage />;
  ```

## Current State
- ✅ Mobile detection hook implemented
- ✅ All mobile component duplicates created
- ✅ Main page switching logic implemented  
- ✅ Mobile components are exact copies of desktop versions
- ⏳ Ready for mobile-specific customization

## Next Steps
1. **Customize Mobile Components**: Edit the `*Mobile.tsx` files to create mobile-optimized layouts
2. **Mobile-Specific Features**: Add touch interactions, smaller layouts, mobile navigation patterns
3. **Testing**: Test responsive switching and mobile user experience

## Benefits
- **Complete Independence**: Mobile and desktop experiences don't interfere with each other
- **Single Deployment**: One codebase, one build, automatic device detection
- **Development Freedom**: Can completely redesign mobile without touching desktop code
- **Performance**: Only loads components needed for current device type
- **Maintainability**: Clear separation of concerns between mobile and desktop

## File Structure
```
/
├── hooks/
│   └── useIsMobile.ts          # Mobile detection hook
├── app/
│   └── page.tsx                # Main page with switching logic
└── components/
    ├── PageMobile.tsx          # Mobile homepage
    ├── OrbitCarousel.tsx       # Desktop carousel
    ├── OrbitCarouselMobile.tsx # Mobile carousel  
    ├── Modal.tsx               # Desktop modal
    ├── ModalMobile.tsx         # Mobile modal
    ├── ContactModal.tsx        # Desktop contact modal
    ├── ContactModalMobile.tsx  # Mobile contact modal
    ├── NavCard.tsx             # Desktop nav card
    ├── NavCardMobile.tsx       # Mobile nav card
    ├── ContactButton.tsx       # Desktop contact button
    └── ContactButtonMobile.tsx # Mobile contact button
```

## Usage Notes
- Desktop components remain completely untouched
- Mobile components are ready for customization
- Switching happens automatically based on screen size
- No media queries needed for layout switching
- TypeScript support maintained throughout