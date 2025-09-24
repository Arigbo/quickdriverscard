"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import QRious from "qrious";
export default function DriverPage() {
  const drivers = {
    1: {
      id: 1,
      first_name: "James",
      middle_name: "Akin",
      last_name: "Adeleke",
      age: 24,
      date_of_birth: "1999-10-25",
      gender: "Male",
      phone_number: "08012345678",
      emergency_phone_number: "09011223344",
      emergency_contact_name: "Fatima Adeleke",
      relationship_to_driver: "Mother",
      citizenship: "Nigerian",
      country: "Nigeria",
      state: "Lagos",
      lga: "Ikeja",
      house_address: "15 Bolanle Street, Ikeja, Lagos",
      car: "BMW",
      vendor_of_the_vehicle: "Elizade Motors",
      date_bought: "2023-01-15",
      plate_number: "LAG 456 BB",
      vehicle_model_year: 2022,
      engine_number: "BMW-X12345678",
      chassis_number: "BMCHAS-ABCDE12345",
      last_service_date: "2024-05-20",
      marital_status: "Single",
      occupation: "Software Engineer",
      driving_since: 2021,
      insurance_policy_number: "INS-LAG-0012345",
      documents: [
        {
          doc: "Driver's License",
          expires: "2026-06-30",
        },
        {
          doc: "Vehicle Registration",
          expires: "2025-05-15",
        },
      ],
    },
    2: {
      id: 2,
      first_name: "Maria",
      middle_name: "Chiamaka",
      last_name: "Okorie",
      age: 31,
      date_of_birth: "1992-05-18",
      gender: "Female",
      phone_number: "07023456789",
      emergency_phone_number: "08122334455",
      emergency_contact_name: "Emeka Okorie",
      relationship_to_driver: "Brother",
      citizenship: "Nigerian",
      country: "Nigeria",
      state: "Oyo",
      lga: "Ibadan South-West",
      house_address: "24 Femi-Johnson Street, Ring Road, Ibadan",
      car: "Toyota Camry",
      vendor_of_the_vehicle: "Kobo-Motors Nigeria",
      date_bought: "2022-09-20",
      plate_number: "OYO 789 CD",
      vehicle_model_year: 2021,
      engine_number: "TOY-Y987654321",
      chassis_number: "TYCHAS-FGHIJ67890",
      last_service_date: "2024-04-10",
      marital_status: "Married",
      number_of_children: 2,
      occupation: "Accountant",
      driving_since: 2015,
      insurance_policy_number: "INS-OYO-0023456",
      documents: [
        {
          doc: "Driver's License",
          expires: "2027-02-28",
        },
        {
          doc: "Insurance Card",
          expires: "2026-11-20",
        },
        {
          doc: "Certificate of Roadworthiness",
          expires: "2025-08-10",
        },
      ],
    },
    3: {
      id: 3,
      first_name: "Carlos",
      middle_name: "Idris",
      last_name: "Muhammed",
      age: 45,
      date_of_birth: "1978-08-12",
      gender: "Male",
      phone_number: "08134567890",
      emergency_phone_number: "07044556677",
      emergency_contact_name: "Hafsat Muhammed",
      relationship_to_driver: "Wife",
      citizenship: "Nigerian",
      country: "Nigeria",
      state: "FCT",
      lga: "Bwari",
      house_address: "9 Abagana Street, Area 11, Garki, Abuja",
      car: "Ford F-150",
      vendor_of_the_vehicle: "Coscharis Motors",
      date_bought: "2021-05-01",
      plate_number: "FCT 123 AB",
      vehicle_model_year: 2020,
      engine_number: "FRD-F150-123456",
      chassis_number: "FDCHAS-KLMNO12345",
      last_service_date: "2024-03-25",
      marital_status: "Married",
      number_of_children: 3,
      occupation: "Civil Servant",
      driving_since: 1999,
      insurance_policy_number: "INS-FCT-0034567",
      documents: [
        {
          doc: "Driver's License",
          expires: "2024-12-01",
        },
        {
          doc: "Vehicle Registration",
          expires: "2026-03-01",
        },
        {
          doc: "Insurance Card",
          expires: "2025-09-30",
        },
        {
          doc: "Vehicle License",
          expires: "2025-10-15",
        },
      ],
    },
    4: {
      id: 4,
      first_name: "Sophie",
      middle_name: "Ijeoma",
      last_name: "Okafor",
      age: 28,
      date_of_birth: "1995-12-05",
      gender: "Female",
      phone_number: "09156789012",
      emergency_phone_number: "08066778899",
      emergency_contact_name: "Chidi Okafor",
      relationship_to_driver: "Father",
      citizenship: "Nigerian",
      country: "Nigeria",
      state: "Rivers",
      lga: "Port Harcourt",
      house_address: "3B Elelenwo Street, GRA Phase 2, Port Harcourt",
      car: "Tesla Model 3",
      vendor_of_the_vehicle: "Private Seller",
      date_bought: "2024-02-28",
      plate_number: "RIV 321 EF",
      vehicle_model_year: 2023,
      engine_number: "TSLA-MD3-789012",
      chassis_number: "TSCHAS-PQRST89012",
      last_service_date: "2024-01-01",
      marital_status: "Single",
      occupation: "Entrepreneur",
      driving_since: 2018,
      insurance_policy_number: "INS-RIV-0045678",
      documents: [
        {
          doc: "Driver's License",
          expires: "2028-05-10",
        },
        {
          doc: "Vehicle Registration",
          expires: "2026-08-25",
        },
        {
          doc: "Insurance Card",
          expires: "2027-01-05",
        },
        {
          doc: "Proof of Ownership",
          expires: "2025-01-01",
        },
      ],
    },
    5: {
      id: 5,
      first_name: "Ahmed",
      middle_name: "Tunde",
      last_name: "Bello",
      age: 55,
      date_of_birth: "1968-07-02",
      gender: "Male",
      phone_number: "08078901234",
      emergency_phone_number: "07088990011",
      emergency_contact_name: "Adamu Bello",
      relationship_to_driver: "Son",
      citizenship: "Nigerian",
      country: "Nigeria",
      state: "Enugu",
      lga: "Enugu East",
      house_address: "45 Udenu Avenue, Independence Layout, Enugu",
      car: "Honda Civic",
      vendor_of_the_vehicle: "Mandilas Motors",
      date_bought: "2020-07-10",
      plate_number: "ENU 987 GH",
      vehicle_model_year: 2019,
      engine_number: "HND-CV-3456789",
      chassis_number: "HDCVCHAS-UVWXY90123",
      last_service_date: "2024-05-01",
      marital_status: "Married",
      number_of_children: 4,
      occupation: "Retired Teacher",
      driving_since: 1988,
      insurance_policy_number: "INS-ENU-0056789",
      documents: [
        {
          doc: "Driver's License",
          expires: "2026-04-20",
        },
        {
          doc: "Insurance Card",
          expires: "2025-12-05",
        },
        {
          doc: "Certificate of Roadworthiness",
          expires: "2026-04-20",
        },
        {
          doc: "Vehicle License",
          expires: "2026-04-20",
        },
      ],
    },
  };
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const { id } = useParams();
  const driver = drivers[id];
  const generateQrCode = () => {
    const url = window.location.href;
    const qr = new QRious({
      value: url,
      size: 256,
      background: "white",
      foreground: "black",
    });
    setQrCodeUrl(qr.toDataURL());
    setShowQrCode(true);
  };
  return (
    <>
      {showQrCode && (
        <div className="qr-modal-overlay" onClick={() => setShowQrCode(false)}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowQrCode(false)}>
              <i className="fas fa-x"></i>
            </button>
            <h2 className="text-xl font-bold mb-4">Scan to Share This Page</h2>
            <img src={qrCodeUrl} alt="QR Code" className="mb-4" />
            <p className="text-sm text-gray-600">URL: {window.location.href}</p>
          </div>
        </div>
      )}
      <div>Driver ID: {driver.id}</div>
      <button onClick={generateQrCode}>Generate Qr code</button>
    </>
  );
}
