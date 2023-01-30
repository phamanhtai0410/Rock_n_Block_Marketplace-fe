export enum CardVariantText {
  category = 'Delete category',
  subcategory = 'Delete subcategory',
}

export type VariantProps = keyof typeof CardVariantText;
