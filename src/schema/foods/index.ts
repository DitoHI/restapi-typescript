class Food {
  public name: string;
  public price: number;
  public size: string;
  public unit: string;
  public quantity: number;
  public description: string;

  constructor(
    name?: string,
    price?: number,
    size?: string,
    unit?: string,
    quartity?: number,
    description?: string
  ) {
    this.name = name;
    this.price = price;
    this.size = size;
    this.unit = unit;
    this.quantity = quartity;
    this.description = description;
  }
}

export { Food };
