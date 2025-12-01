import { useState } from 'react';

export function useStepper(totalSteps: number) {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const goToStep = (index: number) =>
    setStep(Math.max(0, Math.min(index, totalSteps - 1)));
  const reset = () => setStep(0);

  return { step, nextStep, prevStep, goToStep, reset };
}
