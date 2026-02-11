/**
 * MIGRATION PATTERN EXAMPLE
 *
 * This file demonstrates how to migrate a legacy JS function to TS
 * iteratively, without fixing everything at once.
 */

// ==========================================
// 1. ORIGINAL JAVASCRIPT (Legacy)
// ==========================================
/*
function processUser(user) {
  if (user.isActive) {
    return "User " + user.name + " is active";
  }
  return "Inactive";
}
*/

// ==========================================
// 2. FIRST PASS (Loose Typing)
// Goal: Get it to compile. Use 'any' if unsure.
// ==========================================

// Explicitly defining the interface is better than inline types
interface UserPartial {
  name: string;
  isActive: boolean;
  [key: string]: any; // Allow other properties we haven't typed yet
}

export function processUserFirstPass(user: any): string {
  // Using 'any' allows compilation but loses safety
  if (user.isActive) {
    return `User ${user.name} is active`;
  }
  return "Inactive";
}

// ==========================================
// 3. FINAL PASS (Strict Typing)
// Goal: Remove 'any', complete the interface.
// ==========================================

interface User {
  id: number;
  name: string;
  isActive: boolean;
  role?: 'admin' | 'user'; // Optional precise type
}

export function processUserFinal(user: User): string {
  if (user.isActive) {
    return `User ${user.name} is active`;
  }
  return "Inactive";
}
