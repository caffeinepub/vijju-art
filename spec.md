# Vijeyta yadav - Vijju Art

## Current State
Full portfolio website with 4 pages (Home, About, Gallery, Contact) and an Orders/Admin page. The contact form stores submissions in the backend. The Orders page requires Internet Identity login but currently allows ANY logged-in user to view and interact with all orders. The "Admin" link is visible in the public navigation.

## Requested Changes (Diff)

### Add
- Owner claim mechanism in backend: `claimOwner()` function that can only be called once to set the owner principal
- `getOwner()` query to read the current owner
- Owner-only guard on `getAllContactSubmissions()` -- only the owner principal can call it; any other caller gets an error
- Frontend: "Claim Ownership" button in Orders page shown only when no owner is set yet (first-time setup)
- Frontend: Clear "Access Denied" screen shown to non-owner logged-in users

### Modify
- `getAllContactSubmissions()` changes from `public query` to `public shared` with owner check
- Navigation: Remove the "Admin" link from both desktop and mobile nav (the /orders URL still works but is not advertised)
- Orders page: After login, check if the logged-in principal matches the owner; show access-denied if not

### Remove
- "Admin" / "Admin / Orders Inbox" links from navigation (desktop and mobile)

## Implementation Plan
1. Generate new backend with: owner state variable, claimOwner(), getOwner(), owner-restricted getAllContactSubmissions()
2. Update frontend Navigation to remove Admin links
3. Update Orders page to handle: owner check after login, "Claim Ownership" flow for first-time setup, "Access Denied" screen for non-owners
