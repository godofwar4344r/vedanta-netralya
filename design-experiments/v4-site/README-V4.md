# Vedanta Netralya — V4 Redesign (White + Dark Blue)

This is a **full copy** of the website with the V4 design applied. Your original
site (in the project root) is untouched.

## Run it

```bash
cd "design-experiments/v4-site"
npm install      # fresh install — pulls the correct binaries for your machine
npm run dev      # open the localhost URL it prints
```

> If `npm install` complains, delete the `node_modules` folder inside `v4-site`
> first, then run `npm install` again. (A partial copy may be left over.)

## What changed vs the original

1. **3-pill floating nav** (`src/components/Layout.tsx`)
   - Three **separate** 3D-pop pills, not one connected bar:
     **logo** · **menu** (Home · About · Eye Services · Digital Eye Test · Centres · Gallery · Contact) · **Book Now**.

2. **Synced sticky-scroll specialties** (`src/components/StickySpecialties.tsx`)
   - Cards scroll on the left; the text pins on the right and switches **exactly**
     when a card crosses screen-centre (viewport-centre detection, no lag).

3. **White + dark-blue theme** (`tailwind.config.js`, `src/index.css`)
   - The site's existing colour tokens were remapped, so **every page** re-themes:
     `cream → white/mist`, `brand-teal → blue accent`, `brand-navy → kept`.

4. **Section rhythm** on the homepage — alternating dark and light sections.

## Notes
- Everything else (all pages, the visual editor, chatbot, vision simulator,
  routing, content) is carried over unchanged from your original.
- TypeScript typecheck passes clean (`npx tsc --noEmit`).
