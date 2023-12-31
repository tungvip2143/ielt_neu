import { TypeStepExamEnum } from "constants/enum";
import React, { Dispatch, useMemo, SetStateAction, useContext } from "react";
import { useState } from "react";

const StepExamContext = React.createContext<{
  step: TypeStepExamEnum;
  handler: { setStep?: Dispatch<SetStateAction<TypeStepExamEnum>> };
}>({
  step: TypeStepExamEnum.STEP1,
  handler: {
    setStep: undefined,
  },
});

interface StepExamProviderI {
  children: React.ReactNode;
}

const StepExamProvider = ({ children }: StepExamProviderI) => {
  //! State
  const [step, setStep] = useState(TypeStepExamEnum.STEP1);

  const handler = useMemo(() => {
    return {
      setStep,
    };
  }, [setStep]);

  //! Render
  return <StepExamContext.Provider value={{ step, handler }}>{children}</StepExamContext.Provider>;
};

export const useStepExam = () => useContext(StepExamContext);
export default StepExamProvider;
