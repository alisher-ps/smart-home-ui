export const roomDetailsData = {
  Kitchen: {
    devices: {
      lights: true,
      fan: false,
      door: false,
    },
    sensors: {
      temperature: 25,
      humidity: 50,
      water: false,
      gas: false,
    },
  },
  Bedroom: {
    devices: {
      lights: false,
      fan: true,
      door: false,
    },
    sensors: {
      temperature: 23,
      humidity: 46,
      motion: false,
    },
  },
  "Living Room": {
    devices: {
      lights: true,
      fan: true,
      door: false,
    },
    sensors: {
      temperature: 24,
      humidity: 48,
      motion: true,
      lightLevel: "Bright",
    },
  },
  "Big Living Room": {
    devices: {
      lights: true,
      fan: false,
      door: true,
    },
    sensors: {
      temperature: 24,
      humidity: 44,
      motion: false,
      lightLevel: "Bright",
    },
  },
  Garage: {
    devices: {
      lights: false,
      garageDoor: true,
    },
    sensors: {
      motion: false,
      lightLevel: "Dark",
    },
  },
  "Garden / Pool": {
    devices: {
      lights: true,
    },
    sensors: {
      water: false,
      lightLevel: "Bright",
      motion: false,
    },
  },
};