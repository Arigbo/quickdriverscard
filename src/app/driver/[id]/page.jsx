"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
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
        { doc: "Driver's License", expires: "2026-06-30" },
        { doc: "Vehicle Registration", expires: "2025-05-15" },
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
        { doc: "Driver's License", expires: "2027-02-28" },
        { doc: "Insurance Card", expires: "2026-11-20" },
        { doc: "Certificate of Roadworthiness", expires: "2025-08-10" },
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
        { doc: "Driver's License", expires: "2024-12-01" },
        { doc: "Vehicle Registration", expires: "2026-03-01" },
        { doc: "Insurance Card", expires: "2025-09-30" },
        { doc: "Vehicle License", expires: "2025-10-15" },
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
        { doc: "Driver's License", expires: "2028-05-10" },
        { doc: "Vehicle Registration", expires: "2026-08-25" },
        { doc: "Insurance Card", expires: "2027-01-05" },
        { doc: "Proof of Ownership", expires: "2025-01-01" },
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
        { doc: "Driver's License", expires: "2026-04-20" },
        { doc: "Insurance Card", expires: "2025-12-05" },
        { doc: "Certificate of Roadworthiness", expires: "2026-04-20" },
        { doc: "Vehicle License", expires: "2026-04-20" },
      ],
    },
  };
  const { id } = useParams();
  const driver = drivers[id];
  const isExpired = (expiryDate) => {
    const today = new Date(); // Using the current date
    const expiry = new Date(expiryDate);
    // Set both dates to start of day for accurate comparison
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);
    return expiry < today;
  };
  const [currentDoc, setCurrentDoc] = useState();
  return (
    <main className="driver">
      <div className="driver-top">
        <Link href="/">
          {" "}
          <i className="fas fa-home"></i>
          Home
        </Link>
      </div>
      <div className="owner">
        <div className="owner-top">
          <h1>{driver.plate_number}</h1>
          <div className="image">
            {" "}
            <img
              src={`https://placehold.co/100x100/3b82f6/FFFFFF?text=${driver.first_name.charAt(
                0
              )}${driver.last_name.charAt(0)}`}
              alt={`${driver.first_name} ${driver.last_name}`}
            />
          </div>
        </div>
        <div className="owner-body">
          <div className="detail">
            <h1 className="detail-left">Owner's Fullname</h1>
            <h2 className="detail-left">
              {driver.last_name} {driver.middle_name} {driver.first_name}
            </h2>
          </div>
          <div className="detail">
            <h1 className="detail-left">Chassis No</h1>
            <h2 className="detail-left">{driver.chassis_number}</h2>
          </div>
          <div className="detail">
            <h1 className="detail-left">Engine Number</h1>
            <h2 className="detail-left plate">{driver.engine_number}</h2>
          </div>
          <div className="detail">
            <h1 className="detail-left">Vehicle Model</h1>
            <h2 className="detail-left plate">{driver.vehicle_model_year}</h2>
          </div>
          <div className="detail">
            <h1 className="detail-left">Vehicle Make</h1>
            <h2 className="detail-left plate">{driver.car}</h2>
          </div>
          <div className="detail">
            <h1 className="detail-left">Last Service Date</h1>
            <h2 className="detail-left">{driver.last_service_date}</h2>
          </div>
          {driver.documents.map((doc) => {
            const expired = isExpired(doc.expires);
            const statusColor = expired ? "red" : "green";
            const statusText = expired ? "Expired" : "Valid";
            return (
              <div className="doc" key={doc.doc}>
                <div
                  className="doc-inner"
                  onClick={() =>
                    setCurrentDoc(currentDoc?.doc === doc.doc ? null : doc)
                  }
                >
                  <h1 className="doc-inner-left">{doc.doc} {currentDoc?<i className="fas fa-chevron-up"></i>:<i className="fas fa-chevron-down"></i>}</h1>
                  <div className="doc-inner-right">
                    <span className={`font-semibold ${statusColor}`}>
                      {statusText}
                    </span>
                    {expired ? (
                      <svg
                        className="w-4 h-4 red"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 green"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                {currentDoc && currentDoc.doc === doc.doc && (
                  <div className="doc-expires">
                    <h1> Expires:</h1>
                    <h2 className={`${statusColor}`}> {doc.expires}</h2>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
