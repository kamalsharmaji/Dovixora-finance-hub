import { useSyncExternalStore } from "react";

export type RequestStatus = "Pending" | "Rejected" | "Payment Pending" | "Active" | "Suspended";

export interface ServiceRequest {
  id: string;
  orgId: string;
  orgName: string;
  productId: string;
  productName: string;
  status: RequestStatus;
  requestedAt: string;
  decidedAt?: string;
  rejectionReason?: string;
}

const STORAGE_KEY = "dovixora-service-requests";

/** Every org's own request record is created on first read so the demo doesn't start empty —
 * these 6 mirror the products the mock dashboards already treat as active. */
const seedRequests: ServiceRequest[] = [
  { id: "req-seed-1", orgId: "atlas-studio", orgName: "Atlas Studio", productId: "aadhaar", productName: "Aadhaar Verification", status: "Active", requestedAt: "Jan 14, 2026", decidedAt: "Jan 15, 2026" },
  { id: "req-seed-2", orgId: "atlas-studio", orgName: "Atlas Studio", productId: "pan", productName: "PAN Verification", status: "Active", requestedAt: "Jan 14, 2026", decidedAt: "Jan 15, 2026" },
  { id: "req-seed-3", orgId: "atlas-studio", orgName: "Atlas Studio", productId: "driving-licence", productName: "Driving Licence Verification", status: "Active", requestedAt: "Feb 02, 2026", decidedAt: "Feb 03, 2026" },
  { id: "req-seed-4", orgId: "atlas-studio", orgName: "Atlas Studio", productId: "uan", productName: "UAN Verification", status: "Active", requestedAt: "Feb 02, 2026", decidedAt: "Feb 03, 2026" },
  { id: "req-seed-5", orgId: "atlas-studio", orgName: "Atlas Studio", productId: "full-kyc", productName: "Full KYC", status: "Active", requestedAt: "Feb 02, 2026", decidedAt: "Feb 03, 2026" },
  { id: "req-seed-6", orgId: "atlas-studio", orgName: "Atlas Studio", productId: "digilocker", productName: "DigiLocker", status: "Active", requestedAt: "Feb 02, 2026", decidedAt: "Feb 03, 2026" },
  // Other orgs' pending work, so the Admin queue isn't empty on first load.
  { id: "req-seed-7", orgId: "kite-markets", orgName: "Kite Markets", productId: "business", productName: "Business Verification", status: "Pending", requestedAt: "Aug 30, 2026" },
  { id: "req-seed-8", orgId: "meridian-pay", orgName: "Meridian Pay", productId: "bank-upi", productName: "Bank / UPI Verification", status: "Payment Pending", requestedAt: "Aug 25, 2026", decidedAt: "Aug 27, 2026" },
];

function load(): ServiceRequest[] {
  if (typeof window === "undefined") return seedRequests;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedRequests;
    return JSON.parse(raw) as ServiceRequest[];
  } catch {
    return seedRequests;
  }
}

let state: ServiceRequest[] = load();
const listeners = new Set<() => void>();

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // best-effort only — this is a local demo store, not a real backend
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      state = load();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  return state;
}

function today() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export function requestAccess(orgId: string, orgName: string, productId: string, productName: string) {
  state = [
    ...state,
    { id: crypto.randomUUID(), orgId, orgName, productId, productName, status: "Pending", requestedAt: today() },
  ];
  persist();
}

export function approveRequest(id: string) {
  state = state.map((r) => (r.id === id ? { ...r, status: "Payment Pending", decidedAt: today() } : r));
  persist();
}

export function rejectRequest(id: string, reason: string) {
  state = state.map((r) => (r.id === id ? { ...r, status: "Rejected", decidedAt: today(), rejectionReason: reason } : r));
  persist();
}

export function completePayment(id: string) {
  state = state.map((r) => (r.id === id ? { ...r, status: "Active" } : r));
  persist();
}

export function suspend(id: string) {
  state = state.map((r) => (r.id === id ? { ...r, status: "Suspended" } : r));
  persist();
}

export function useServiceRequests() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function requestsForOrg(requests: readonly ServiceRequest[], orgId: string) {
  return requests.filter((r) => r.orgId === orgId);
}
