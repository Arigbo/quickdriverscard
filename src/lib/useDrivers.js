"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { assemble } from "@/data/drivers";
import { loadLocal, subscribe } from "./store";

// Merges server-provided seed data with drivers and document versions stored
// in this browser, and stays in sync across tabs.
export function useDrivers(seedRecords, seedVersions) {
  const [local, setLocal] = useState({ drivers: [], versions: [] });
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setLocal(await loadLocal());
    } catch (e) {
      console.error("Couldn't read local data", e);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    refresh();
    return subscribe(refresh);
  }, [refresh]);

  const drivers = useMemo(
    () => assemble([...seedRecords, ...local.drivers], [...seedVersions, ...local.versions]),
    [seedRecords, seedVersions, local]
  );

  return { drivers, ready };
}
