"use client";
import React, { useEffect, useRef, useState } from "react";
import QRious from "qrious";
const App = () => {
  // State to track if the PDF libraries are loaded
  const [isPdfLibsLoaded, setIsPdfLibsLoaded] = useState(false);
  // State to display a loading message
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const qrCodeRef = useRef(null);

  // State for error messages
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // The drivers database object
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

  // Use a ref to store a map of card elements, so we can access them for PDF generation
  const cardRefs = useRef({});

  // This effect dynamically loads the external libraries and sets the state when they are ready
  useEffect(() => {
    const loadScript = (url, callback) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = callback;
      script.onerror = () => {
        console.error(`Failed to load script: ${url}`);
        setLoadingMessage(
          `Failed to load a required library. Please check your network connection.`
        );
      };
      document.head.appendChild(script);
    };

    const loadNextScript = () => {
      if (typeof window.html2canvas === "undefined") {
        loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
          loadNextScript
        );
      } else if (typeof window.jsPDF === "undefined") {
        loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
          loadNextScript
        );
      } else if (typeof window.QRCode === "undefined") {
        loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js",
          () => setIsPdfLibsLoaded(true)
        );
      } else {
        setIsPdfLibsLoaded(true);
      }
    };
    loadNextScript();
  }, []);

  // Function to handle the PDF download for a specific driver's card
  const handleDownloadPdf = (driverId, driverName) => {
    if (!window.html2canvas || !window.jspdf) {
      setErrorMessage(
        "The required PDF libraries are still loading. Please try again in a moment."
      );
      setShowErrorModal(true);
      return;
    }

    const cardElement = cardRefs.current[driverId];
    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4");
      const scale = 3;

      window
        .html2canvas(cardElement, {
          scale: scale,
          backgroundColor: "#0f172a",
        })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = (cardElement.offsetWidth / scale) * 0.264583; // Convert pixels to mm
          const imgHeight = (cardElement.offsetHeight / scale) * 0.264583; // Convert pixels to mm
          const xPosition = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
          const yPosition = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;

          pdf.addImage(
            imgData,
            "PNG",
            xPosition,
            yPosition,
            imgWidth,
            imgHeight
          );
          pdf.save(`DriverCard_${driverName.replace(/\s/g, "")}.pdf`);
        })
        .catch((error) => {
          console.error("Error generating PDF from card element:", error);
          setErrorMessage(
            "An error occurred while generating the PDF. Please check the console for details."
          );
          setShowErrorModal(true);
        });
    } catch (error) {
      console.error(
        "Failed to generate PDF. Is jspdf or html2canvas missing from the window object?",
        error
      );
      setErrorMessage(
        "Failed to generate the PDF. Please ensure all libraries have loaded and try again."
      );
      setShowErrorModal(true);
    }
  };
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  // Function to handle QR code generation and modal display
  const handleGenerateQrCode = ({driverId}) => {
    const url = `/driver/${driverId}`;
    const qr = new QRious({
      value: url,
      size: 256,
      background: "white",
      foreground: "black",
    });
    setQrCodeUrl(qr.toDataURL(driverId));
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
            {/* <p className="text-sm text-gray-600">URL: {window.location.href}</p> */}
          </div>
        </div>
      )}
      <style>
        {`
            .main-container {
                min-height: 100vh;
                padding: 2rem;
                color: #f3f4f6;
                background-color: #0f172a;
            }
            .header-container {
                max-width: 1024px;
                margin: 0 auto;
            }
            .title {
                font-size: 2.25rem;
                font-weight: 700;
                text-align: center;
                color: #fff;
                margin-bottom: 2rem;
            }
            .loading-message {
                text-align: center;
                font-size: 1.125rem;
                color: #9ca3af;
                margin: 2rem 0;
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            .cards-grid {
                max-width: 1024px;
                margin: 0 auto;
                display: grid;
                grid-template-columns: repeat(1, minmax(0, 1fr));
                gap: 2rem;
            }
            @media (min-width: 768px) {
                .cards-grid {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                }
            }
            @media (min-width: 1024px) {
                .cards-grid {
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                }
            }
            .driver-card {
                background-color: #1f2937;
                padding: 1.5rem;
                border-radius: 0.75rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .profile-section {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 1rem;
            }
            .profile-image {
                width: 6rem;
                height: 6rem;
                border-radius: 9999px;
                border-width: 4px;
                border-color: #3b82f6;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            }
            .name-container {
                text-align: center;
            }
            .driver-name {
                font-size: 1.5rem;
                font-weight: 700;
                color: #60a5fa;
            }
            .driver-id {
                color: #9ca3af;
            }
            .details-section {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                color: #d1d5db;
                font-size: 0.875rem;
                width: 100%;
                margin-top: 1rem;
            }
            .plate-number {
                font-size: 1.125rem;
                font-family: monospace;
                color: #fff;
            }
            .emergency-contact {
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid #4b5563;
                font-size: 0.875rem;
                width: 100%;
            }
            .contact-info {
                color: #9ca3af;
            }
            .button-container {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-top: 1.5rem;
            }
            @media (min-width: 768px) {
                .button-container {
                    flex-direction: row;
                }
            }
            .action-button {
                font-weight: 700;
                padding: 0.75rem 2rem;
                border-radius: 9999px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                transition-property: all;
                transition-duration: 300ms;
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                transform: scale(1);
            }
            .action-button:hover {
                transform: scale(1.05);
            }
            .pdf-button {
                background-color: #16a34a;
            }
            .pdf-button:hover {
                background-color: #15803d;
            }
            .qr-button {
                background-color: #2563eb;
            }
            .qr-button:hover {
                background-color: #1d4ed8;
            }
            .disabled-button {
                background-color: #6b7280;
                cursor: not-allowed;
            }

            .modal-overlay {
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background-color: rgba(15, 23, 42, 0.75);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }
            .modal-content {
                background-color: #1f2937;
                padding: 2rem;
                border-radius: 0.75rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                display: flex;
                flex-direction: column;
                align-items: center;
                max-width: 24rem;
                width: 100%;
            }
            .modal-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: #60a5fa;
                margin-bottom: 1rem;
            }
            .qrcode-container {
                border-radius: 0.5rem;
                background-color: #fff;
                padding: 0.5rem;
            }
            .modal-text {
                color: #9ca3af;
                font-size: 0.875rem;
                margin-top: 1rem;
                text-align: center;
            }
            .close-button {
                margin-top: 1.5rem;
                font-weight: 700;
                padding: 0.75rem 2rem;
                border-radius: 9999px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                transition-property: all;
                transition-duration: 300ms;
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                transform: scale(1);
                background-color: #dc2626;
            }
            .close-button:hover {
                background-color: #b91c1c;
                transform: scale(1.05);
            }
            
            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.5;
                }
            }
            `}
      </style>

      <div className="main-container">
        {/* Page Header */}
        <div className="header-container">
          <h1 className="title">Driver Card Generator</h1>
        </div>

        {isPdfLibsLoaded && (
          <div className="loading-message">{loadingMessage}</div>
        )}

        {/* Grid of driver cards */}
        <div className="cards-grid">
          {Object.values(drivers).map((driver) => (
            <div
              key={driver.id}
              ref={(el) => (cardRefs.current[driver.id] = el)}
              id={`driver-card-${driver.id}`}
              className="driver-card"
            >
              {/* Profile Image & Name */}
              <div className="profile-section">
                <img
                  className="profile-image"
                  src={`https://placehold.co/100x100/3b82f6/FFFFFF?text=${driver.first_name.charAt(
                    0
                  )}${driver.last_name.charAt(0)}`}
                  alt={`${driver.first_name} ${driver.last_name}`}
                />
                <div className="name-container">
                  <h2 className="driver-name">{`${driver.first_name} ${driver.middle_name} ${driver.last_name}`}</h2>
                  <p className="driver-id">ID: {driver.id}</p>
                </div>
              </div>

              {/* Driver details */}
              <div className="details-section">
                <p>
                  <strong>Age:</strong> {driver.age} years
                </p>
                <p>
                  <strong>Phone:</strong> {driver.phone_number}
                </p>
                <p>
                  <strong>Car:</strong> {driver.car} (
                  {driver.vehicle_model_year})
                </p>
                <p>
                  <strong>Plate No:</strong>{" "}
                  <span className="plate-number">{driver.plate_number}</span>
                </p>
                <p>
                  <strong>Occupation:</strong> {driver.occupation}
                </p>
                <p>
                  <strong>Address:</strong> {driver.house_address}
                </p>
              </div>

              {/* Emergency contact section */}
              <div className="emergency-contact">
                <p className="contact-info">
                  <strong>Emergency Contact:</strong>{" "}
                  {driver.emergency_contact_name} (
                  {driver.relationship_to_driver})
                </p>
                <p className="contact-info">
                  <strong>Phone:</strong> {driver.emergency_phone_number}
                </p>
              </div>

              {/* Buttons */}
              <div className="button-container">
                <button
                  onClick={() =>
                    handleDownloadPdf(
                      driver.id,
                      `${driver.first_name} ${driver.last_name}`
                    )
                  }
                  className="action-button pdf-button"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => {handleGenerateQrCode(driver.id), setShowQrCode(true)}}
                  className="action-button qr-button"
                >
                  Generate QR Code
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Error Modal */}
        {showErrorModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="modal-title" style={{ color: "#dc2626" }}>
                Error
              </h2>
              <p className="modal-text">{errorMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="close-button"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
