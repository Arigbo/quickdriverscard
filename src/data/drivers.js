// Demo data for the portfolio build.
// Document expiry dates are stored as day offsets from "today" so the demo
// always shows a realistic mix of valid, expiring and expired documents.

const DAY = 24 * 60 * 60 * 1000;

function fromToday(days) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return new Date(d.getTime() + days * DAY).toISOString().slice(0, 10);
}

const raw = [
  {
    id: 1,
    first_name: "James",
    middle_name: "Akin",
    last_name: "Adeleke",
    date_of_birth: "1999-10-25",
    gender: "Male",
    phone_number: "0801 234 5678",
    emergency_phone_number: "0901 122 3344",
    emergency_contact_name: "Fatima Adeleke",
    relationship_to_driver: "Mother",
    state: "Lagos",
    lga: "Ikeja",
    house_address: "15 Bolanle Street, Ikeja, Lagos",
    car: "BMW X3",
    vendor_of_the_vehicle: "Elizade Motors",
    plate_number: "LAG 456 BB",
    vehicle_model_year: 2022,
    engine_number: "BMW-X12345678",
    chassis_number: "BMCHAS-ABCDE12345",
    last_service_date: "2026-08-20",
    occupation: "Software Engineer",
    driving_since: 2021,
    insurance_policy_number: "INS-LAG-0012345",
    documents: [
      { doc: "Driver's Licence", in: 590 },
      { doc: "Vehicle Registration", in: 212 },
      { doc: "Insurance Certificate", in: 41 },
    ],
  },
  {
    id: 2,
    first_name: "Maria",
    middle_name: "Chiamaka",
    last_name: "Okorie",
    date_of_birth: "1992-05-18",
    gender: "Female",
    phone_number: "0702 345 6789",
    emergency_phone_number: "0812 233 4455",
    emergency_contact_name: "Emeka Okorie",
    relationship_to_driver: "Brother",
    state: "Oyo",
    lga: "Ibadan South-West",
    house_address: "24 Femi-Johnson Street, Ring Road, Ibadan",
    car: "Toyota Camry",
    vendor_of_the_vehicle: "Kobo Motors",
    plate_number: "OYO 789 CD",
    vehicle_model_year: 2021,
    engine_number: "TOY-Y987654321",
    chassis_number: "TYCHAS-FGHIJ67890",
    last_service_date: "2026-09-10",
    occupation: "Accountant",
    driving_since: 2015,
    insurance_policy_number: "INS-OYO-0023456",
    documents: [
      { doc: "Driver's Licence", in: 830 },
      { doc: "Insurance Certificate", in: 365 },
      { doc: "Roadworthiness Certificate", in: 148 },
    ],
  },
  {
    id: 3,
    first_name: "Carlos",
    middle_name: "Idris",
    last_name: "Muhammed",
    date_of_birth: "1978-08-12",
    gender: "Male",
    phone_number: "0813 456 7890",
    emergency_phone_number: "0704 455 6677",
    emergency_contact_name: "Hafsat Muhammed",
    relationship_to_driver: "Wife",
    state: "FCT",
    lga: "Bwari",
    house_address: "9 Abagana Street, Area 11, Garki, Abuja",
    car: "Ford F-150",
    vendor_of_the_vehicle: "Coscharis Motors",
    plate_number: "FCT 123 AB",
    vehicle_model_year: 2020,
    engine_number: "FRD-F150-123456",
    chassis_number: "FDCHAS-KLMNO12345",
    last_service_date: "2026-03-25",
    occupation: "Civil Servant",
    driving_since: 1999,
    insurance_policy_number: "INS-FCT-0034567",
    documents: [
      { doc: "Driver's Licence", in: -18 },
      { doc: "Vehicle Registration", in: 104 },
      { doc: "Insurance Certificate", in: 270 },
      { doc: "Vehicle Licence", in: 22 },
    ],
  },
  {
    id: 4,
    first_name: "Sophie",
    middle_name: "Ijeoma",
    last_name: "Okafor",
    date_of_birth: "1995-12-05",
    gender: "Female",
    phone_number: "0915 678 9012",
    emergency_phone_number: "0806 677 8899",
    emergency_contact_name: "Chidi Okafor",
    relationship_to_driver: "Father",
    state: "Rivers",
    lga: "Port Harcourt",
    house_address: "3B Elelenwo Street, GRA Phase 2, Port Harcourt",
    car: "Tesla Model 3",
    vendor_of_the_vehicle: "Private Seller",
    plate_number: "RIV 321 EF",
    vehicle_model_year: 2023,
    engine_number: "TSLA-MD3-789012",
    chassis_number: "TSCHAS-PQRST89012",
    last_service_date: "2026-10-01",
    occupation: "Entrepreneur",
    driving_since: 2018,
    insurance_policy_number: "INS-RIV-0045678",
    documents: [
      { doc: "Driver's Licence", in: 1270 },
      { doc: "Vehicle Registration", in: 640 },
      { doc: "Insurance Certificate", in: 410 },
      { doc: "Proof of Ownership", in: 1800 },
    ],
  },
  {
    id: 5,
    first_name: "Ahmed",
    middle_name: "Tunde",
    last_name: "Bello",
    date_of_birth: "1968-07-02",
    gender: "Male",
    phone_number: "0807 890 1234",
    emergency_phone_number: "0708 899 0011",
    emergency_contact_name: "Adamu Bello",
    relationship_to_driver: "Son",
    state: "Enugu",
    lga: "Enugu East",
    house_address: "45 Udenu Avenue, Independence Layout, Enugu",
    car: "Honda Civic",
    vendor_of_the_vehicle: "Mandilas Motors",
    plate_number: "ENU 987 GH",
    vehicle_model_year: 2019,
    engine_number: "HND-CV-3456789",
    chassis_number: "HDCVCHAS-UVWXY90123",
    last_service_date: "2026-05-01",
    occupation: "Retired Teacher",
    driving_since: 1988,
    insurance_policy_number: "INS-ENU-0056789",
    documents: [
      { doc: "Driver's Licence", in: 154 },
      { doc: "Insurance Certificate", in: -63 },
      { doc: "Roadworthiness Certificate", in: 154 },
      { doc: "Vehicle Licence", in: 154 },
    ],
  },
  {
    id: 6,
    first_name: "Ngozi",
    middle_name: "Amara",
    last_name: "Eze",
    date_of_birth: "1988-03-14",
    gender: "Female",
    phone_number: "0703 112 9087",
    emergency_phone_number: "0811 765 4321",
    emergency_contact_name: "Obinna Eze",
    relationship_to_driver: "Husband",
    state: "Anambra",
    lga: "Awka South",
    house_address: "7 Zik Avenue, Awka, Anambra",
    car: "Kia Sportage",
    vendor_of_the_vehicle: "Kia Motors Nigeria",
    plate_number: "AWK 204 KA",
    vehicle_model_year: 2022,
    engine_number: "KIA-SP-55120934",
    chassis_number: "KACHAS-ZXCVB33421",
    last_service_date: "2026-07-14",
    occupation: "Pharmacist",
    driving_since: 2010,
    insurance_policy_number: "INS-ANA-0067890",
    documents: [
      { doc: "Driver's Licence", in: 702 },
      { doc: "Vehicle Registration", in: 333 },
      { doc: "Insurance Certificate", in: 189 },
    ],
  },
  {
    id: 7,
    first_name: "Tobi",
    middle_name: "Olumide",
    last_name: "Fashola",
    date_of_birth: "2001-01-30",
    gender: "Male",
    phone_number: "0909 334 2210",
    emergency_phone_number: "0802 556 1188",
    emergency_contact_name: "Bisi Fashola",
    relationship_to_driver: "Mother",
    state: "Ogun",
    lga: "Abeokuta South",
    house_address: "12 Kuto Road, Abeokuta, Ogun",
    car: "Hyundai Elantra",
    vendor_of_the_vehicle: "Stallion Motors",
    plate_number: "ABK 611 TF",
    vehicle_model_year: 2020,
    engine_number: "HYN-EL-77231045",
    chassis_number: "HYCHAS-LKJHG55678",
    last_service_date: "2026-06-02",
    occupation: "Logistics Rider",
    driving_since: 2020,
    insurance_policy_number: "INS-OGN-0078901",
    documents: [
      { doc: "Driver's Licence", in: 68 },
      { doc: "Vehicle Registration", in: 412 },
      { doc: "Insurance Certificate", in: 12 },
    ],
  },
  {
    id: 8,
    first_name: "Halima",
    middle_name: "Zainab",
    last_name: "Sani",
    date_of_birth: "1990-09-09",
    gender: "Female",
    phone_number: "0816 220 4433",
    emergency_phone_number: "0705 448 9910",
    emergency_contact_name: "Musa Sani",
    relationship_to_driver: "Father",
    state: "Kano",
    lga: "Nassarawa",
    house_address: "21 Bompai Road, Nassarawa GRA, Kano",
    car: "Toyota Hilux",
    vendor_of_the_vehicle: "Toyota Nigeria",
    plate_number: "KAN 870 HS",
    vehicle_model_year: 2024,
    engine_number: "TOY-HX-90812233",
    chassis_number: "THCHAS-MNBVC77812",
    last_service_date: "2026-10-28",
    occupation: "Architect",
    driving_since: 2012,
    insurance_policy_number: "INS-KAN-0089012",
    documents: [
      { doc: "Driver's Licence", in: 960 },
      { doc: "Vehicle Registration", in: 730 },
      { doc: "Insurance Certificate", in: 352 },
      { doc: "Roadworthiness Certificate", in: 290 },
    ],
  },
];

export const EXPIRING_WINDOW_DAYS = 60;

export function daysUntil(isoDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(isoDate + "T00:00:00");
  return Math.round((target - today) / DAY);
}

export function docStatus(isoDate) {
  const days = daysUntil(isoDate);
  if (days < 0) return "expired";
  if (days <= EXPIRING_WINDOW_DAYS) return "expiring";
  return "valid";
}

export function driverStatus(driver) {
  const statuses = driver.documents.map((d) => docStatus(d.expires));
  if (statuses.includes("expired")) return "expired";
  if (statuses.includes("expiring")) return "expiring";
  return "valid";
}

export const STATUS_LABEL = {
  valid: "Valid",
  expiring: "Expiring soon",
  expired: "Expired",
};

export const fullName = (d) => `${d.first_name} ${d.middle_name} ${d.last_name}`;
export const shortName = (d) => `${d.first_name} ${d.last_name}`;
export const initials = (d) => `${d.first_name[0]}${d.last_name[0]}`;
export const cardNumber = (d) => `QDC-${String(d.id).padStart(4, "0")}`;

export function formatDate(isoDate) {
  return new Date(isoDate + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function relativeDays(isoDate) {
  const days = daysUntil(isoDate);
  if (days === 0) return "today";
  if (days > 0) return days === 1 ? "in 1 day" : `in ${days} days`;
  const ago = Math.abs(days);
  return ago === 1 ? "1 day ago" : `${ago} days ago`;
}

export function getDrivers() {
  return raw.map((d) => ({
    ...d,
    documents: d.documents.map(({ doc, in: days }) => ({
      doc,
      expires: fromToday(days),
    })),
  }));
}

export function getDriver(id) {
  return getDrivers().find((d) => String(d.id) === String(id)) ?? null;
}
