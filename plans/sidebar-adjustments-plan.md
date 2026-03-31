# Sidebar Adjustments Plan

## Overview
Adjust the existing sidebar to improve usability with wider expanded state, larger navigation items, and a new social links section. When collapsed, the sidebar should display only icons in a minimal view.

## Current State Analysis

### Current Implementation
- **Location**: `dev/web/src/components/ui/sidebar.tsx` and `dev/web/src/layouts/MainLayout.tsx`
- **Sidebar Width**: 16rem (expanded), 3rem (collapsed icon mode)
- **Navigation Items**: 5 links with icons (Home, About, Resume, Blog, Music)
- **Collapsible Mode**: `offcanvas` (slides off screen when collapsed)
- **Social Links**: Available in `profile.ts` (LinkedIn, GitHub, Email)

### Key Files to Modify
1. `dev/web/src/components/ui/sidebar.tsx` - Width constants
2. `dev/web/src/layouts/MainLayout.tsx` - Navigation items and social section

## Implementation Plan

### Phase 1: Adjust Sidebar Width

**File**: `dev/web/src/components/ui/sidebar.tsx`

1. **Update width constants** (lines 30-32):
   ```typescript
   // Current
   const SIDEBAR_WIDTH = "16rem";
   const SIDEBAR_WIDTH_MOBILE = "18rem";
   const SIDEBAR_WIDTH_ICON = "3rem";

   // New
   const SIDEBAR_WIDTH = "32rem";  // Double the width (16rem * 2)
   const SIDEBAR_WIDTH_MOBILE = "36rem";  // Slightly wider on mobile
   const SIDEBAR_WIDTH_ICON = "3rem";  // Keep icon width the same
   ```

2. **Update collapsible mode** (line 185):
   ```typescript
   // Current
   collapsible = "offcanvas"

   // New
   collapsible = "icon"  // This will show only icons when collapsed
   ```

### Phase 2: Increase Navigation Item Size

**File**: `dev/web/src/layouts/MainLayout.tsx`

1. **Update icon size** (line 72):
   ```tsx
   // Current
   <link.icon className="h-4 w-4" />

   // New
   <link.icon className="h-5 w-5" />  // Slightly larger icons
   ```

2. **Update SidebarMenuButton styling** (lines 68-74):
   ```tsx
   // Current
   <SidebarMenuButton
     isActive={isActive}
     className="transition-colors duration-300"
   >
     <link.icon className="h-4 w-4" />
     <span>{link.label}</span>
   </SidebarMenuButton>

   // New
   <SidebarMenuButton
     isActive={isActive}
     className="transition-colors duration-300 h-12 text-base"  // Taller buttons, larger text
   >
     <link.icon className="h-5 w-5" />
     <span>{link.label}</span>
   </SidebarMenuButton>
   ```

### Phase 3: Add Social Links Section

**File**: `dev/web/src/layouts/MainLayout.tsx`

1. **Import social icons** (add to line 21):
   ```typescript
   import { Home, User, FileText, BookOpen, Music, Linkedin, Github, Mail } from "lucide-react";
   ```

2. **Add social links data** (after line 29):
   ```typescript
   const socialLinks = [
     {
       href: profile.linkedin,
       label: "LinkedIn",
       icon: Linkedin,
       ariaLabel: "LinkedIn Profile"
     },
     {
       href: profile.github,
       label: "GitHub",
       icon: Github,
       ariaLabel: "GitHub Profile"
     },
     {
       href: `mailto:${profile.email}`,
       label: "Email",
       icon: Mail,
       ariaLabel: "Send Email"
     },
   ];
   ```

3. **Add social section to sidebar** (after line 81, before SidebarFooter):
   ```tsx
   <SidebarSeparator />
   <SidebarGroup>
     <SidebarGroupLabel className="text-stone-500 dark:text-stone-400">
       Connect
     </SidebarGroupLabel>
     <SidebarGroupContent>
       <SidebarMenu>
         {socialLinks.map((link) => (
           <SidebarMenuItem key={link.href}>
             <a
               href={link.href}
               target="_blank"
               rel="noopener noreferrer"
               aria-label={link.ariaLabel}
               className="text-stone-600 hover:bg-stone-200/30 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-dark-800/30 dark:hover:text-stone-100 transition-colors duration-300"
             >
               <SidebarMenuButton className="h-12 text-base">
                 <link.icon className="h-5 w-5" />
                 <span>{link.label}</span>
               </SidebarMenuButton>
             </a>
           </SidebarMenuItem>
         ))}
       </SidebarMenu>
     </SidebarGroupContent>
   </SidebarGroup>
   ```

4. **Import SidebarSeparator** (add to line 20):
   ```typescript
   import {
     Sidebar,
     SidebarContent,
     SidebarFooter,
     SidebarGroup,
     SidebarGroupContent,
     SidebarGroupLabel,
     SidebarHeader,
     SidebarInset,
     SidebarMenu,
     SidebarMenuButton,
     SidebarMenuItem,
     SidebarProvider,
     SidebarSeparator,  // Add this
     SidebarTrigger,
   } from "@/components/ui/sidebar";
   ```

### Phase 4: Ensure Collapsed State Shows Only Icons

The shadcn/ui sidebar component with `collapsible="icon"` automatically handles showing only icons when collapsed. The key changes needed:

1. **Verify SidebarGroupLabel behavior** - Labels should hide when collapsed (already handled by line 461 in sidebar.tsx):
   ```typescript
   "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0"
   ```

2. **Verify SidebarMenuButton behavior** - Text should hide when collapsed (already handled by the component)

3. **Test icon-only view** - Ensure icons are centered and properly sized in collapsed state

### Phase 5: Styling Refinements

1. **Adjust padding for wider sidebar**:
   - The existing padding should work well with the wider width
   - No changes needed to SidebarHeader, SidebarContent, SidebarFooter padding

2. **Ensure proper spacing**:
   - Social section should have consistent spacing with navigation section
   - Separator provides visual distinction

3. **Verify responsive behavior**:
   - Mobile: Sheet overlay should use wider mobile width
   - Desktop: Expanded and collapsed states should work correctly

## File Changes Summary

### Files to Modify
1. **`dev/web/src/components/ui/sidebar.tsx`**
   - Lines 30-32: Update width constants
   - Line 185: Change collapsible default to "icon"

2. **`dev/web/src/layouts/MainLayout.tsx`**
   - Line 21: Add social icons import
   - Line 20: Add SidebarSeparator import
   - After line 29: Add socialLinks data structure
   - Lines 68-74: Update SidebarMenuButton styling
   - Line 72: Update icon size
   - After line 81: Add social links section

## Testing Checklist

1. **Expanded State**
   - [ ] Sidebar is approximately 32rem wide
   - [ ] Navigation items are larger and more readable
   - [ ] Social links section appears below navigation
   - [ ] All links are functional

2. **Collapsed State**
   - [ ] Sidebar shows only icons (3rem wide)
   - [ ] Navigation icons are visible and centered
   - [ ] Social icons are visible and centered
   - [ ] Labels are hidden

3. **Mobile Behavior**
   - [ ] Sidebar opens as overlay with wider width
   - [ ] All items are touch-friendly
   - [ ] Social links work correctly

4. **Theme Support**
   - [ ] Light mode styling is correct
   - [ ] Dark mode styling is correct
   - [ ] Hover states work properly

5. **Accessibility**
   - [ ] Keyboard navigation works
   - [ ] Screen reader labels are present
   - [ ] Focus states are visible

## Success Criteria

1. ✅ Sidebar width is doubled when expanded (32rem)
2. ✅ Navigation items are larger and more readable
3. ✅ Social links section appears below navigation
4. ✅ Collapsed state shows only icons (minimal view)
5. ✅ All existing functionality is preserved
6. ✅ Styling matches existing design system
7. ✅ Dark mode support works correctly
8. ✅ Mobile responsiveness is maintained

## Notes

- The `collapsible="icon"` mode is the key to showing only icons when collapsed
- Social links open in new tabs for external URLs
- Email link uses mailto: protocol
- All social icons are from lucide-react for consistency
- The wider sidebar provides better readability for navigation labels
- Consider adding tooltips for icon-only view (optional enhancement)
