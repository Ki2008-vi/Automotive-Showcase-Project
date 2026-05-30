import { Vehicle } from "./types";

import r8Img from "./assets/images/AUDAS.jpg";
import r81Img from "./assets/images/AudiR81.jpeg";
import r82Img from "./assets/images/AUDAS.jpg";
import r83Img from "./assets/images/AUDAS.jpg";
import rs7avantImg from "./assets/images/audisrsq8.jpg";
import rs71avantImg from "./assets/images/Audirsq.jpeg";
import rs72avantImg from "./assets/images/Audirsq (1).jpeg";
import rs73avantImg from "./assets/images/audisrsq8.jpg";
import rs6Img from "./assets/images/AUDIRS62.jpeg";
import rs61Img from "./assets/images/AUDIRS62.jpeg";
import rs62Img from "./assets/images/AUDIRS62.jpeg";
import rs63Img from "./assets/images/AUDIRS62.jpeg";


export const VEHICLES: Vehicle[] = [
  {
    id: "r8",
    brand: "Audi",
    modelName: "R8 V10 AWD",
    verticalModel: "R8",
    series: "V10 Performance Quattro",
    description: "The Audi R8 V10 AWD is a high-performance sports car that combines the practicality of a sports car with the performance of a supercar. It is equipped with a 5.2-liter V10 engine that produces 620 horsepower and 580 Nm of torque. It can accelerate from 0 to 60 mph in 3.2 seconds and has a top speed of 329 km/h.",
    topSpeed: "329 km/h",
    acceleration: "3.2 s",
    power: "620 HP",
    specs: [
      { label: "Engine", value: "5.2L V10 FSI" },
      { label: "Acceleration", value: "0-100 km/h in 3.2s" },
      { label: "Transmission", value: "7-Speed S Tronic" },
      { label: "Drivetrain", value: "Quattro All-Wheel" }
    ],
    image: r8Img,
    image2: r81Img,
    image3: r82Img,
    image4: r83Img,
    accentColor: "red",
    accentHex: "#ffffffff"
  },
  {
    id: "etron",
    brand: "Audi",
    modelName: "RSQ8",
    verticalModel: "RSQ8",
    series: "4.0-liter Twin-Turbocharged V8",
    description: "The Audi RSQ8 is a high-performance SUV that combines the practicality of an SUV with the performance of a sports car. It is equipped with a 4.0-liter twin-turbocharged V8 engine that produces 592 horsepower and 590 lb-ft of torque. It can accelerate from 0 to 60 mph in 3.8 seconds and has a top speed of 305 km/h.",
    topSpeed: "305 km/h",
    acceleration: "3.8 s",
    power: "630 HP",
    specs: [
      { label: "Powertrain", value: "4.0L Twin-Turbocharged V8" },
      { label: "Acceleration", value: "0-100 km/h in 3.8s" },
      { label: "Torque", value: "850 Nm" },
      { label: "Drivetrain", value: "Quattro All-Wheel" }
    ],
    image: rs7avantImg,
    image5: rs71avantImg,
    image6: rs72avantImg,
    image7: rs73avantImg,
    accentColor: "amber",
    accentHex: "#ffffffff"
  },
  {
    id: "rs6",
    brand: "Audi",
    modelName: "RS 6 AVANT",
    verticalModel: "RS6",
    series: "4.0-liter Twin-Turbocharged V8 TFSI",
    description: "The Audi RS 6 Avant is a high-performance station wagon that combines the practicality of a station wagon with the performance of a sports car. It is equipped with a 4.0-liter twin-turbocharged V8 engine that produces 592 horsepower and 590 lb-ft of torque. It can accelerate from 0 to 60 mph in 3.8 seconds and has a top speed of 305 km/h.",
    topSpeed: "305 km/h",
    acceleration: "3.4 s",
    power: "621 HP",
    specs: [
      { label: "Engine", value: "4.0-liter Twin-Turbocharged V8 TFSI" },
      { label: "Acceleration", value: "0-100 km/h in 3.4s" },
      { label: "Transmission", value: "8-speed ZF Tiptronic automatic" },
      { label: "Cargo Volume", value: "Up to 1,680 Liters" }
    ],
    image: rs6Img,
    image8: rs61Img,
    image9: rs62Img,
    image10: rs63Img,
    accentColor: "cyan",
    accentHex: "#ffffffff"
  }
];
