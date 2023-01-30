export interface getCategoryFormIdProps {
  categoryIndex: number;
  subcategoryIndex?: number;
  addressIndex?: number;
}

export type categoryPathType =
  | `categories.${number}.name`
  | `categories.${number}.subcategories.${number}.name`
  | `categories.${number}.subcategories.${number}.addresses.${number}.address`;

export const getCategoryFormId = ({
  categoryIndex,
  subcategoryIndex,
  addressIndex,
}: getCategoryFormIdProps): categoryPathType => {
  if (subcategoryIndex !== undefined) {
    return addressIndex !== undefined
      ? `categories.${categoryIndex}.subcategories.${subcategoryIndex}.addresses.${addressIndex}.address`
      : `categories.${categoryIndex}.subcategories.${subcategoryIndex}.name`;
  }
  return `categories.${categoryIndex}.name`;
};
