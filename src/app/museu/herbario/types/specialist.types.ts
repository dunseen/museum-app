export type SpecialistType = "collector" | "determinator";
export type SpecialistApiResponse = {
  id: string;
  name: string;
  type: SpecialistType;
};
