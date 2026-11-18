"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { assemble } from "@/data/drivers";
import { loadLocal, subscribe } from "./store";

const EMPTY = [];

// Merges server-provided seed data with drivers and document versions stored
// in this browser, and stays in sync across tabs.
export function useDrivers(seedRecords, seedVersions, seedVerifications = EMPTY) {
  const [local, setLocal] = useState({ drivers: [], versions: [], verifications: [] });
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
    () =>
      assemble(
        [...seedRecords, ...local.drivers],
        [...seedVersions, ...local.versions],
        [...seedVerifications, ...(local.verifications ?? [])]
      ),
    [seedRecords, seedVersions, seedVerifications, local]
  );

  return { drivers, ready };
}
