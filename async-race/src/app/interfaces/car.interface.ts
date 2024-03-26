export interface CarInterface {
  name: string;
  color: string;
  id: number;
}

export type GarageInterface = CarInterface[];

// Example garage data
const garage: GarageInterface = [
  {
    name: 'Tesla',
    color: '#e6e6fa',
    id: 1,
  },
  {
    name: 'BMW',
    color: '#fede00',
    id: 2,
  },
  {
    name: 'Mercedes',
    color: '#6c779f',
    id: 3,
  },
  {
    name: 'Ford',
    color: '#ef3c40',
    id: 4,
  },
];

// Example usage
garage.forEach(car => {
  console.log(`Car: ${car.name}, Color: ${car.color}, ID: ${car.id}`);
});
