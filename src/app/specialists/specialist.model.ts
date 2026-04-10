export interface Slot {
  date: string;
  hour: string;
}

export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  medicalCenter: string;
  imageUrl: string;
  availableSlots: Slot[];
}