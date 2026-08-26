import { useState, useCallback } from "react";

export type FlowStep = "input" | "review" | "pending" | "success" | "error";

export interface UseFlowStateOptions {
  initialStep?: FlowStep;
}

export function useFlowState(options?: UseFlowStateOptions) {
  const [currentStep, setCurrentStep] = useState<FlowStep>(
    options?.initialStep || "input"
  );
  
  // Generic data payload to carry between steps (e.g., recipient, amount, network)
  const [flowData, setFlowData] = useState<Record<string, any>>({});

  const goToStep = useCallback((step: FlowStep) => {
    setCurrentStep(step);
  }, []);

  const updateData = useCallback((data: Record<string, any>) => {
    setFlowData((prev) => ({ ...prev, ...data }));
  }, []);

  const resetFlow = useCallback(() => {
    setCurrentStep("input");
    setFlowData({});
  }, []);

  return {
    currentStep,
    flowData,
    goToStep,
    updateData,
    resetFlow,
  };
}
