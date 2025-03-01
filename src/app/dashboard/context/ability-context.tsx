import * as React from "react";
import { createContextualCan, useAbility as useCaslAbility } from "@casl/react";
import { type AppAbility } from "~/lib/casl";

export const AbilityContext = React.createContext({} as AppAbility);

type AbilityProviderProps = {
  ability: AppAbility;
  children: React.ReactNode;
};

export function AbilityProvider({ ability, children }: AbilityProviderProps) {
  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

export const Can = createContextualCan<AppAbility>(AbilityContext.Consumer);

export function useAbility() {
  return useCaslAbility(AbilityContext);
}
