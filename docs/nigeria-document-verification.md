# Nigerian driver documents and how to verify them

Researched November 2026 for Quick Drivers Card. Portals, fees and enforcement
change often, so confirm against official channels before relying on this in
production. The catalogue the app uses lives in `src/data/nigeria.js`.

## What a driver must carry

| Document | Issued by | Who needs it | Renewal |
| --- | --- | --- | --- |
| Driver's licence | Federal Road Safety Corps (FRSC) | Every driver | 3 or 5 years |
| Vehicle registration / plate number | State Motor Licensing Authority, recorded on FRSC's NVIS | Every vehicle | At registration or change of ownership |
| Vehicle licence | State licensing authority / Board of Internal Revenue | Every vehicle | Yearly |
| Proof of ownership certificate | State licensing authority | Every vehicle | With registration; many states renew it yearly |
| Motor insurance (third-party minimum) | Licensed insurer, uploaded to NIID | Every vehicle | Yearly |
| Roadworthiness certificate | State Vehicle Inspection Service (VIO/VIS) | Every vehicle | Yearly |
| Hackney permit | State licensing authority | Commercial vehicles (taxi, ride-hailing, logistics) | Yearly |
| Customs duty papers | Nigeria Customs Service | Imported vehicles | One-off |
| Police e-CMR certificate | Nigeria Police Force | Not currently enforced: the IGP suspended enforcement in July 2024, and the NBA is challenging it in court | — |

Lists in the Nigerian press vary between 6 and 12 items. Some add local
government permits, tinted-glass permits or heavy-duty permits, which apply
only in specific cases.

## How each one can be verified

| Document | Official check | Input | API |
| --- | --- | --- | --- |
| Driver's licence | FRSC NDL Verification portal (`ndlverification.frsc.gov.ng`) | Licence number | **Yes**, through licensed KYC providers that query FRSC: Dojah, Prembly (IdentityPass), Youverify, Seamfix and VerifyMe |
| Vehicle registration | FRSC NVIS plate check (`nvis.frsc.gov.ng/VehicleManagement/VerifyPlateNo`) | Plate number | **Yes**, Prembly plate number verification |
| Vehicle licence, proof of ownership, hackney permit | AutoReg (`verify.autoreg.ng`) in participating states, otherwise the state licensing office | Plate number | No public API |
| Motor insurance | NIID (`askniid.org`), or USSD `*565*11#` | Plate or chassis number | No public API. NIID is run by the Nigerian Insurers Association |
| Roadworthiness | Lagos: DVIS (`dvis.lg.gov.ng/verify`). Elsewhere: the state VIO | Inspection number or plate | No public API |
| Customs duty | Customs Verification Management System (CVMS), launched October 2025 | VIN · ₦15,000 per check | No public API |

## How the app uses this

- **Automatic checks:** for the driver's licence and plate number. The browser calls
  `POST /api/verify`, and the server calls the provider with keys that never reach
  the client. It then compares the authority's record with the record on file
  (number, name, date of birth, expiry; or plate, vehicle, chassis) and stores
  the result: `verified`, `mismatch`, `not_found` or `error`.
- **Guided manual checks:** for everything else. The dashboard opens the official
  portal, shows exactly what to type (with a copy button), and records the outcome
  and any reference number.
- **Required-documents checklist:** derived from the vehicle's use (private or
  commercial) and origin (imported or local).
- **Public page:** the verification page shows each document's validity *and*
  whether it has been confirmed with the issuing authority.

Without provider keys, automatic checks run in a **simulated** mode that is
labelled as such in the UI. Numbers containing `000` simulate "not found".

### Going live

1. Sign up with a provider. Dojah for licences and Prembly for plates are wired
   in (`src/lib/verification/providers.js`). Youverify, Seamfix and VerifyMe offer
   similar FRSC lookups and can be added as adapters.
2. Add the keys to the server environment (see `.env.example`).
3. Check the request and response fields against the provider's current API
   reference. The adapters read several likely field names, but providers change
   their schemas.
4. Each lookup is billed per call. The route has a small per-IP rate limit; add
   a shared limiter and audit logging before production.

Verifying someone's licence touches personal data covered by the Nigeria Data
Protection Act 2023. Get the driver's consent and keep only what you need.

## Sources

- FRSC NVIS plate verification — https://nvis.frsc.gov.ng/
- FRSC NDL verification FAQs — https://www.ndlverification.frsc.gov.ng/faqs
- NIID verification platform — https://askniid.org/
- nairaCompare: verifying car insurance on NIID — https://nairacompare.ng/blogs/how-to-verify-car-insurance-on-niid-askniid.org-guide
- Dojah: Nigeria driver's licence lookup — https://docs.dojah.io/docs/nigeria/lookup-drivers-license
- Prembly: basic driver's licence — https://docs.prembly.com/docs/basic-drivers-license-copy
- Prembly: plate number verification — https://docs.prembly.com/docs/plate-number-verification-copy
- Youverify: verify Nigerian driver's licence — https://doc.youverify.co/know-your-customer-services-kyc/id-data-matching-eidv/nigeria/verify-nigerian-drivers-license-drivers-license
- Seamfix FRSC service — https://docs-verify.seamfix.com/docs/seamfix-frsc-service
- VerifyMe plate verification API — https://www.biometricupdate.com/202205/verifyme-nigeria-launches-license-plate-verification-api-to-enable-car-insurance-services
- Legit.ng: plate number verification online — https://www.legit.ng/ask-legit/guides/1634888-plate-number-verification-online-how-confirm-vehicle-verification-nigeria
- Legit.ng: MVAA plate verification — https://www.legit.ng/ask-legit/guides/1652391-mvaa-plate-number-verification-different-ways-verify-vehicles-ownership
- Nigerian Finder: checking a roadworthiness certificate in Lagos — https://nigerianfinder.com/how-to-check-road-worthiness-certificate-in-lagos
- Guardian: Customs ₦15,000 vehicle verification — https://guardian.ng/business-services/nigerians-to-verify-imported-vehicles-status-digitally-with-n15000/
- AllAfrica: Customs vehicle verification scheme — https://allafrica.com/stories/202510210255.html
- Channels TV: IGP suspends e-CMR enforcement — https://www.channelstv.com/2024/07/15/egbetokun-suspends-enforcement-of-electronic-cmr/
- BusinessDay: police suspend e-CMR enforcement — https://businessday.ng/news/article/police-suspend-controversial-electronic-vehicle-registry-enforcement/
- BusinessDay: essential car documents — https://businessday.ng/news/article/7-must-have-car-documents-essentials-to-avoid-trouble-with-the-police-road-safety-officials/
- Legit.ng: what FRSC checks at a stop — https://www.legit.ng/1404764-12-major-documentsitems-frsc-check-stop-car.html
