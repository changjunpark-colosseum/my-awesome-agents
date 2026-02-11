/**
 * WMS PACKING PROCESS EXAMPLE
 *
 * This demonstrates "Pipeline Oriented Programming" or "Railway Oriented Programming".
 * The types enforce the sequence: Cart -> Container -> Inspection -> Packaging -> Invoice.
 */

// ==========================================
// 0. Utilities (Result/Either Pattern)
// ==========================================
export type Result<E, A> =
  | { ok: true; value: A }
  | { ok: false; error: E };

// ==========================================
// 1. Data Models (The "States")
// Each type represents a valid snapshot in time.
// ==========================================

export type UnstartedPacking = {
  orderId: string;
  packStationId: string;
};

export type CartScanned = UnstartedPacking & {
  cartBarcode: string;
};

export type ContainerScanned = CartScanned & {
  containerBarcode: string;
};

export type Inspected = ContainerScanned & {
  inspectionPassed: true;
  scannedItems: Array<{ sku: string; qty: number }>;
};

export type PackagingSelected = Inspected & {
  packagingCode: string; // e.g., 'BOX-01', 'POLY-02'
};

export type InvoiceIssued = PackagingSelected & {
  invoiceNo: string;
  trackingNumber: string;
};

// ==========================================
// 2. Domain Errors (Discriminated Unions)
// Explicit error types make handling robust.
// ==========================================

export type CartScanError =
  | { type: "CART_NOT_FOUND"; cartBarcode: string }
  | { type: "CART_NOT_AT_STATION"; cartBarcode: string; packStationId: string }
  | { type: "CART_LOCKED"; cartBarcode: string };

export type ContainerScanError =
  | { type: "CONTAINER_NOT_FOUND"; containerBarcode: string }
  | { type: "CONTAINER_NOT_ON_CART"; containerBarcode: string; cartBarcode: string }
  | { type: "CONTAINER_ALREADY_PACKED"; containerBarcode: string };

export type InspectionError =
  | { type: "SKU_MISMATCH"; expectedSku: string; scannedSku: string }
  | { type: "QTY_MISMATCH"; expectedQty: number; scannedQty: number }
  | { type: "DAMAGED_ITEM"; sku: string };

export type PackagingError =
  | { type: "NO_PACKAGING_RULE"; orderId: string }
  | { type: "PACKAGING_OUT_OF_STOCK"; packagingCode: string };

export type InvoiceError =
  | { type: "CARRIER_API_FAILED"; message: string }
  | { type: "ADDRESS_INVALID"; orderId: string }
  | { type: "RATE_NOT_FOUND"; orderId: string };

// ==========================================
// 3. Transformations (The "Signatures")
// These function types define the business rules.
// You cannot call 'inspectItems' unless you have a 'ContainerScanned' object.
// ==========================================

export type ScanCart = (
  initialState: UnstartedPacking,
  cartBarcode: string
) => Promise<Result<CartScanError, CartScanned>>;

export type ScanContainer = (
  prev: CartScanned,
  containerBarcode: string
) => Promise<Result<ContainerScanError, ContainerScanned>>;

export type InspectItems = (
  prev: ContainerScanned,
  scannedLines: Array<{ sku: string; qty: number }>
) => Result<InspectionError, Inspected>; 
// Note: Inspection might differ from ScanContainer (maybe sync or async depending on implementation)

export type SelectPackaging = (
  prev: Inspected,
  packagingCode: string
) => Result<PackagingError, PackagingSelected>;

export type IssueInvoice = (
  prev: PackagingSelected
) => Promise<Result<InvoiceError, InvoiceIssued>>;

// ==========================================
// 4. Usage Example (Hypothetical)
// ==========================================
/*
async function executePackingFlow(api: PackingAPI) {
  // 1. Start
  const start: UnstartedPacking = { orderId: "ORD-123", packStationId: "ST-1" };
  
  // 2. Scan Cart
  const step1 = await api.scanCart(start, "CART-999");
  if (!step1.ok) return handleError(step1.error);
  
  // 3. Scan Container (Step1 is structurally typed as CartScanned)
  const step2 = await api.scanContainer(step1.value, "CONT-ABC");
  // ... and so on.
}
*/
