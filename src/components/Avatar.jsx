import { initials } from "@/data/drivers";

export default function Avatar({ driver, size = "md" }) {
  return (
    <span className={`avatar avatar--${size}`} aria-hidden="true">
      {driver.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={driver.photo} alt="" />
      ) : (
        initials(driver)
      )}
    </span>
  );
}
