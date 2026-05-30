export interface VehicleSpec {
  label: string;
  value: string;
}

export interface Vehicle {
  id: string;
  brand: string;
  modelName: string;
  verticalModel: string;
  series: string;
  description: string;
  specs: VehicleSpec[];
  image: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image7?: string;
  image8?: string;
  image9?: string;
  image10?: string;
  accentColor: string; // Tailwind color class like 'text-red-500' or 'bg-red-500'
  accentHex: string;  // Hex color for animations or custom styling
  topSpeed: string;
  acceleration: string;
  power: string;
}
