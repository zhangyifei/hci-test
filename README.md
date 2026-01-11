# Super-App Prototype: 2×2 Experiment

A Next.js prototype for studying the effects of **Feature Heterogeneity** and **Feature Interrelatedness** in super-app environments.

## Overview

This prototype implements a controlled 2×2 experiment with four conditions:

- **c1**: Low Heterogeneity + Low Interrelatedness
- **c2**: Low Heterogeneity + High Interrelatedness
- **c3**: High Heterogeneity + Low Interrelatedness
- **c4**: High Heterogeneity + High Interrelatedness

## Experimental Design

### Task Flow

The prototype demonstrates a cross-service task episode:

1. Start **Task A** in Service 1 (Ride)
2. Switch to Service 2 (Package/Grocery) to complete **Task B**
3. Return to Service 1 to resume and finish **Task A**

### Manipulations

#### Heterogeneity (Task-Model Dissimilarity)

- **Low**: Service 2 uses "Package" with a review-confirm task model
- **High**: Service 2 uses "Grocery" with a compose-confirm task model (chip-based item selection)

#### Interrelatedness (Cross-Service Continuity)

- **Low**: No explicit continuity cues
- **High**: Multiple continuity cues:
  - Shared navigation chip in header
  - "Progress saved" resumption card
  - "Your progress is preserved" state message
  - Cross-service hint: "Labels and navigation are consistent across services"

### Controlled Variables

- Screen count: Identical across all conditions
- Number of taps: Same for intended path
- Button placement: Consistent
- Visual layout: Uniform phone frame and structure
- No reliance on browser back button

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Icons**: lucide-react
- **Styling**: Plain CSS (no Tailwind)
- **State Management**: useReducer with custom flow reducer
- **Logging**: localStorage-based with JSON export

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page with 4 condition links
│   └── [cond]/
│       ├── page.tsx            # Dynamic condition page
│       └── not-found.tsx       # 404 handler
├── components/
│   ├── PhoneFrame.tsx          # Mobile app shell
│   ├── ScreenRenderer.tsx      # Interactive flow renderer
│   └── ui.tsx                  # Reusable UI components
├── lib/
│   ├── types.ts                # TypeScript definitions
│   ├── conditions.ts           # Condition loader
│   ├── flow.ts                 # State machine reducer
│   └── log.ts                  # Event logging utilities
├── conditions/
│   ├── c1.json                 # Condition 1 config
│   ├── c2.json                 # Condition 2 config
│   ├── c3.json                 # Condition 3 config
│   └── c4.json                 # Condition 4 config
├── styles/
│   └── globals.css             # Global styles
├── scripts/
│   └── fetch-images.sh         # Image download script
└── public/
    └── img/                    # Placeholder images
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

This will automatically run the image download script via the `postinstall` hook.

### Download Images Manually (Optional)

If the automatic download fails, you can run:

```bash
npm run fetch:images
```

Or manually execute:

```bash
bash scripts/fetch-images.sh
```

**Note**: The app will still work if images fail to download; it will show gradient fallbacks.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. Follow the prompts to complete deployment.

### Option 2: Deploy via GitHub

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and deploy

### Condition URLs

After deployment, access each condition at:

- `https://your-domain.vercel.app/c1`
- `https://your-domain.vercel.app/c2`
- `https://your-domain.vercel.app/c3`
- `https://your-domain.vercel.app/c4`

## Usage

### Navigating the Prototype

1. Visit the landing page to see all 4 conditions
2. Click a condition card to enter that experimental condition
3. Follow the task flow as a participant would
4. Complete the cross-service episode
5. Export logs from the finish screen (optional)

### Logging

All user interactions are logged to `localStorage` under the key `proto_log`.

**Export logs**:
- Click "Export Log" on the finish screen
- A JSON file will download with all events

**Clear logs**:
- Use browser DevTools: `localStorage.removeItem('proto_log')`

### Log Structure

Each log entry includes:
- `timestamp`: Event time (ms)
- `conditionId`: Which condition (c1-c4)
- `eventName`: Event type (e.g., TASKA_CONTINUE)
- `screen`: Current screen ID
- `payload`: Additional event data

## What's Manipulated vs. Held Constant

### Manipulated

1. **Heterogeneity**:
   - Service 2 label (Package vs Grocery)
   - Task B interaction model (review vs compose)

2. **Interrelatedness**:
   - Presence/absence of shared navigation chip
   - Presence/absence of resume cues
   - Presence/absence of state continuity messages
   - Presence/absence of cross-service hint text

### Held Constant

- Number of screens in intended path
- Number of taps/clicks required
- Button placement and visual hierarchy
- Phone frame dimensions (390×844)
- Header/tab bar structure
- Service 1 (Ride) task model
- Color scheme and typography
- Image usage (decorative only)

## Assets and Copyright

This prototype uses:
- Royalty-free placeholder images from [Picsum Photos](https://picsum.photos)
- Open-source Lucide React icons
- No Uber branding or copyrighted assets

**Important**: Do not use copyrighted logos, trademarks, or brand assets in this prototype.

## Browser Compatibility

Tested on:
- Chrome 120+
- Safari 17+
- Firefox 120+
- Edge 120+

## Troubleshooting

### Images not loading

Run the image download script:

```bash
npm run fetch:images
```

If downloads fail, the app will show gradient fallbacks. The prototype remains fully functional.

### Build errors

Ensure you're using Node.js 18 or higher:

```bash
node --version
```

Clear cache and reinstall:

```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### State not persisting

Logs are stored in `localStorage`. Ensure:
- You're not in incognito/private mode
- Browser allows localStorage
- You haven't cleared browser data

## Research Notes

This prototype is designed for online controlled experiments. When using for research:

1. **Randomize condition assignment** to participants
2. **Collect logs** via the export function or implement server-side logging
3. **Counterbalance** condition order if using within-subjects design
4. **Ensure informed consent** before data collection
5. **Validate** that all manipulations are working as intended

## License

This prototype is provided for research and educational purposes.

## Contact

For questions about this prototype, refer to the research team or maintainer.

---

**Version**: 1.0.0  
**Last Updated**: January 2026
