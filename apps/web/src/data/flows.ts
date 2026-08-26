export type FlowStatus = "Stable" | "Preview" | "Planned";

export interface FlowMetadata {
  name: string;
  slug: string;
  description: string;
  status: FlowStatus;
}

export const flows: FlowMetadata[] = [
  {
    name: "Send USDC",
    slug: "send-usdc",
    description: "Complete flow for sending USDC across supported networks.",
    status: "Preview",
  },
];

export function getFlowBySlug(slug: string) {
  return flows.find((flow) => flow.slug === slug);
}
