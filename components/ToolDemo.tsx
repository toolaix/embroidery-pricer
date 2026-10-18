"use client";

import { useMemo, useState } from "react";

type Method = "embroidery" | "dtf";

/** Free embroidery / DTF job pricer — replace defaults with shop profile later (Premium). */
export function ToolDemo() {
  const [method, setMethod] = useState<Method>("embroidery");
  const [qty, setQty] = useState(12);
  const [stitchesK, setStitchesK] = useState(8); // thousand stitches per piece
  const [blankCost, setBlankCost] = useState(4.5);
  const [digitizing, setDigitizing] = useState(25);
  const [wage, setWage] = useState(18);
  const [overheadHr, setOverheadHr] = useState(12);
  const [margin, setMargin] = useState(40);
  // DTF
  const [filmCost, setFilmCost] = useState(1.2);
  const [pressMin, setPressMin] = useState(1.5);

  const result = useMemo(() => {
    if (method === "embroidery") {
      const minutesPerPiece = Math.max(2, stitchesK * 1.1); // rough machine time
      const laborPer = (minutesPerPiece / 60) * wage;
      const overheadPer = (minutesPerPiece / 60) * overheadHr;
      const stitchMaterials = stitchesK * 0.15; // thread/backing ballpark
      const digitizingPer = digitizing / Math.max(qty, 1);
      const unitCost =
        blankCost + stitchMaterials + laborPer + overheadPer + digitizingPer;
      const unitPrice = unitCost / (1 - margin / 100);
      return {
        unitCost,
        unitPrice,
        jobTotal: unitPrice * qty,
        notes: `${stitchesK}k stitches · ~${minutesPerPiece.toFixed(0)} min/pc`,
      };
    }
    const laborPer = (pressMin / 60) * wage;
    const overheadPer = (pressMin / 60) * overheadHr;
    const unitCost = blankCost + filmCost + laborPer + overheadPer;
    const unitPrice = unitCost / (1 - margin / 100);
    return {
      unitCost,
      unitPrice,
      jobTotal: unitPrice * qty,
      notes: `DTF film $${filmCost} · press ${pressMin} min`,
    };
  }, [
    method,
    qty,
    stitchesK,
    blankCost,
    digitizing,
    wage,
    overheadHr,
    margin,
    filmCost,
    pressMin,
  ]);

  const field = {
    display: "block",
    width: "100%",
    marginTop: 4,
    marginBottom: 10,
    padding: "8px 10px",
    fontSize: 16,
  } as const;

  return (
    <section
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: 12,
        padding: "1rem",
        margin: "1.25rem 0",
      }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          type="button"
          onClick={() => setMethod("embroidery")}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border:
              method === "embroidery" ? "2px solid #111" : "1px solid #ddd",
            background: method === "embroidery" ? "#111" : "#fff",
            color: method === "embroidery" ? "#fff" : "#111",
            cursor: "pointer",
          }}
        >
          Embroidery
        </button>
        <button
          type="button"
          onClick={() => setMethod("dtf")}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: method === "dtf" ? "2px solid #111" : "1px solid #ddd",
            background: method === "dtf" ? "#111" : "#fff",
            color: method === "dtf" ? "#fff" : "#111",
            cursor: "pointer",
          }}
        >
          DTF
        </button>
      </div>

      <label>
        Quantity
        <input
          style={field}
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
      </label>
      <label>
        Blank / garment cost ($)
        <input
          style={field}
          type="number"
          step="0.01"
          value={blankCost}
          onChange={(e) => setBlankCost(Number(e.target.value))}
        />
      </label>

      {method === "embroidery" ? (
        <>
          <label>
            Stitches (thousands per piece)
            <input
              style={field}
              type="number"
              step="0.1"
              value={stitchesK}
              onChange={(e) => setStitchesK(Number(e.target.value))}
            />
          </label>
          <label>
            Digitizing fee for this design ($)
            <input
              style={field}
              type="number"
              step="0.01"
              value={digitizing}
              onChange={(e) => setDigitizing(Number(e.target.value))}
            />
          </label>
        </>
      ) : (
        <>
          <label>
            Film / transfer cost per piece ($)
            <input
              style={field}
              type="number"
              step="0.01"
              value={filmCost}
              onChange={(e) => setFilmCost(Number(e.target.value))}
            />
          </label>
          <label>
            Press time (minutes per piece)
            <input
              style={field}
              type="number"
              step="0.1"
              value={pressMin}
              onChange={(e) => setPressMin(Number(e.target.value))}
            />
          </label>
        </>
      )}

      <label>
        Production wage ($/hr)
        <input
          style={field}
          type="number"
          value={wage}
          onChange={(e) => setWage(Number(e.target.value))}
        />
      </label>
      <label>
        Shop overhead ($/productive hr)
        <input
          style={field}
          type="number"
          value={overheadHr}
          onChange={(e) => setOverheadHr(Number(e.target.value))}
        />
      </label>
      <label>
        Target margin (%)
        <input
          style={field}
          type="number"
          value={margin}
          onChange={(e) => setMargin(Number(e.target.value))}
        />
      </label>

      <div
        style={{
          background: "#f7f7f7",
          borderRadius: 8,
          padding: "12px 14px",
          marginTop: 8,
        }}
      >
        <p style={{ margin: "0 0 6px", fontSize: 13, color: "#666" }}>
          {result.notes}
        </p>
        <p style={{ margin: "4px 0" }}>
          Cost / piece: <strong>${result.unitCost.toFixed(2)}</strong>
        </p>
        <p style={{ margin: "4px 0" }}>
          Charge / piece: <strong>${result.unitPrice.toFixed(2)}</strong>
        </p>
        <p style={{ margin: "4px 0" }}>
          Job total ({qty} pcs):{" "}
          <strong>${result.jobTotal.toFixed(2)}</strong>
        </p>
      </div>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 0 }}>
        Estimates only. Replace wage/overhead with your shop numbers for better
        quotes.
      </p>
    </section>
  );
}
