import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/ui/container";
import { ApiEndpointList, type EndpointGroup } from "@/components/developers/api-endpoint-list";
import { ApiReferencePanel, type EndpointDetail } from "@/components/developers/api-reference-panel";

export const Route = createFileRoute("/_marketing/developers/api-reference")({
  head: () => ({
    meta: [
      { title: "API Reference — DOVIXORA" },
      { name: "description", content: "Complete endpoint documentation for the DOVIXORA verification API." },
    ],
  }),
  component: ApiReferencePage,
});

const endpoints: readonly EndpointDetail[] = [
  {
    id: "verify-pan",
    method: "POST",
    path: "/v1/verify/pan",
    description: "Verify a PAN number against official identity registries.",
    parameters: [
      { name: "Authorization", detail: "Bearer API token" },
      { name: "Content-Type", detail: "application/json" },
    ],
    body: [
      { name: "pan_number", type: "string", required: true },
      { name: "consent", type: "boolean", required: true },
    ],
    request: [
      ["plain", "{\n  "],
      ["keyword", '"pan_number"'],
      ["plain", ": "],
      ["string", '"ABCPX1234K"'],
      ["plain", ",\n  "],
      ["keyword", '"consent"'],
      ["plain", ": "],
      ["success", "true"],
      ["plain", "\n}"],
    ],
    response: [
      ["plain", "{\n  "],
      ["keyword", '"id"'],
      ["plain", ": "],
      ["string", '"ver_7Hd82k"'],
      ["plain", ",\n  "],
      ["keyword", '"status"'],
      ["plain", ": "],
      ["success", '"verified"'],
      ["plain", ",\n  "],
      ["keyword", '"name_match"'],
      ["plain", ": "],
      ["success", "true"],
      ["plain", "\n}"],
    ],
  },
  {
    id: "verify-aadhaar",
    method: "POST",
    path: "/v1/verify/aadhaar",
    description: "Verify Aadhaar via secure QR, offline XML or eAadhaar without exposing the raw number.",
    parameters: [
      { name: "Authorization", detail: "Bearer API token" },
      { name: "Content-Type", detail: "application/json" },
    ],
    body: [
      { name: "aadhaar_input", type: "string", required: true },
      { name: "consent", type: "boolean", required: true },
    ],
    request: [
      ["plain", "{\n  "],
      ["keyword", '"aadhaar_input"'],
      ["plain", ": "],
      ["string", '"<secure_qr_payload>"'],
      ["plain", ",\n  "],
      ["keyword", '"consent"'],
      ["plain", ": "],
      ["success", "true"],
      ["plain", "\n}"],
    ],
    response: [
      ["plain", "{\n  "],
      ["keyword", '"id"'],
      ["plain", ": "],
      ["string", '"ver_Aad82Hd"'],
      ["plain", ",\n  "],
      ["keyword", '"status"'],
      ["plain", ": "],
      ["success", '"verified"'],
      ["plain", ",\n  "],
      ["keyword", '"masked_aadhaar"'],
      ["plain", ": "],
      ["string", '"XXXX XXXX 1234"'],
      ["plain", "\n}"],
    ],
  },
  {
    id: "verify-driving-licence",
    method: "POST",
    path: "/v1/verify/dl",
    description: "Confirm driving licence validity and authorized vehicle classes from RTO records.",
    parameters: [
      { name: "Authorization", detail: "Bearer API token" },
      { name: "Content-Type", detail: "application/json" },
    ],
    body: [
      { name: "dl_number", type: "string", required: true },
      { name: "date_of_birth", type: "string", required: true },
    ],
    request: [
      ["plain", "{\n  "],
      ["keyword", '"dl_number"'],
      ["plain", ": "],
      ["string", '"KA012021001234"'],
      ["plain", ",\n  "],
      ["keyword", '"date_of_birth"'],
      ["plain", ": "],
      ["string", '"1990-03-14"'],
      ["plain", "\n}"],
    ],
    response: [
      ["plain", "{\n  "],
      ["keyword", '"id"'],
      ["plain", ": "],
      ["string", '"ver_Dl91Qk"'],
      ["plain", ",\n  "],
      ["keyword", '"status"'],
      ["plain", ": "],
      ["success", '"verified"'],
      ["plain", ",\n  "],
      ["keyword", '"vehicle_classes"'],
      ["plain", ": ["],
      ["string", '"LMV"'],
      ["plain", ", "],
      ["string", '"MCWG"'],
      ["plain", "]\n}"],
    ],
  },
  {
    id: "verify-uan",
    method: "POST",
    path: "/v1/verify/uan",
    description: "Resolve a UAN from PAN, Aadhaar or mobile and pull verified EPFO employment history.",
    parameters: [
      { name: "Authorization", detail: "Bearer API token" },
      { name: "Content-Type", detail: "application/json" },
    ],
    body: [
      { name: "pan_number", type: "string", required: false },
      { name: "mobile_number", type: "string", required: false },
    ],
    request: [
      ["plain", "{\n  "],
      ["keyword", '"pan_number"'],
      ["plain", ": "],
      ["string", '"ABCPX1234K"'],
      ["plain", "\n}"],
    ],
    response: [
      ["plain", "{\n  "],
      ["keyword", '"uan"'],
      ["plain", ": "],
      ["string", '"101234567890"'],
      ["plain", ",\n  "],
      ["keyword", '"employer"'],
      ["plain", ": "],
      ["string", '"Acme Tech Pvt Ltd"'],
      ["plain", ",\n  "],
      ["keyword", '"status"'],
      ["plain", ": "],
      ["success", '"verified"'],
      ["plain", "\n}"],
    ],
  },
  {
    id: "verify-full-kyc",
    method: "POST",
    path: "/v1/verify/kyc",
    description: "Run identity, address and biometric checks in a single orchestrated KYC flow.",
    parameters: [
      { name: "Authorization", detail: "Bearer API token" },
      { name: "Content-Type", detail: "application/json" },
    ],
    body: [
      { name: "pan_number", type: "string", required: true },
      { name: "aadhaar_input", type: "string", required: true },
      { name: "selfie", type: "file", required: true },
    ],
    request: [
      ["plain", "{\n  "],
      ["keyword", '"pan_number"'],
      ["plain", ": "],
      ["string", '"ABCPX1234K"'],
      ["plain", ",\n  "],
      ["keyword", '"aadhaar_input"'],
      ["plain", ": "],
      ["string", '"<secure_qr_payload>"'],
      ["plain", "\n}"],
    ],
    response: [
      ["plain", "{\n  "],
      ["keyword", '"id"'],
      ["plain", ": "],
      ["string", '"ver_Kyc7Fp"'],
      ["plain", ",\n  "],
      ["keyword", '"status"'],
      ["plain", ": "],
      ["success", '"verified"'],
      ["plain", ",\n  "],
      ["keyword", '"checks"'],
      ["plain", ": ["],
      ["string", '"identity"'],
      ["plain", ", "],
      ["string", '"address"'],
      ["plain", ", "],
      ["string", '"liveness"'],
      ["plain", "]\n}"],
    ],
  },
  {
    id: "digilocker-pull",
    method: "POST",
    path: "/v1/digilocker/pull",
    description: "Consent-based pull of issued documents from a user's DigiLocker.",
    parameters: [
      { name: "Authorization", detail: "Bearer API token" },
      { name: "Content-Type", detail: "application/json" },
    ],
    body: [
      { name: "consent_token", type: "string", required: true },
      { name: "document_type", type: "string", required: true },
    ],
    request: [
      ["plain", "{\n  "],
      ["keyword", '"consent_token"'],
      ["plain", ": "],
      ["string", '"dl_consent_9F3kd2"'],
      ["plain", ",\n  "],
      ["keyword", '"document_type"'],
      ["plain", ": "],
      ["string", '"AADHAAR"'],
      ["plain", "\n}"],
    ],
    response: [
      ["plain", "{\n  "],
      ["keyword", '"document_type"'],
      ["plain", ": "],
      ["string", '"AADHAAR"'],
      ["plain", ",\n  "],
      ["keyword", '"issuer"'],
      ["plain", ": "],
      ["string", '"UIDAI"'],
      ["plain", ",\n  "],
      ["keyword", '"status"'],
      ["plain", ": "],
      ["success", '"downloaded"'],
      ["plain", "\n}"],
    ],
  },
];

const endpointGroups: readonly EndpointGroup[] = [
  { name: "Aadhaar Verification", endpoints: [endpoints[1]!] },
  { name: "PAN Verification", endpoints: [endpoints[0]!] },
  { name: "Driving Licence", endpoints: [endpoints[2]!] },
  { name: "UAN Verification", endpoints: [endpoints[3]!] },
  { name: "Full KYC", endpoints: [endpoints[4]!] },
  { name: "DigiLocker", endpoints: [endpoints[5]!] },
];

function ApiReferencePage() {
  const [activeId, setActiveId] = useState(endpoints[0]!.id);
  const activeEndpoint = endpoints.find((endpoint) => endpoint.id === activeId) ?? endpoints[0]!;

  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-2xl">
        <span className="section-kicker">API Reference</span>
        <h1 className="section-title mt-3">
          Complete <span className="gradient-text">endpoint documentation.</span>
        </h1>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
        <ApiEndpointList groups={endpointGroups} activeId={activeId} onSelect={setActiveId} />
        <ApiReferencePanel endpoint={activeEndpoint} />
      </div>
    </Container>
  );
}
