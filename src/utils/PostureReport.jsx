// src/components/PostureReport.jsx
import React, { useEffect, useState } from "react";
import { getPostureAnalysis, resetPostureAnalysis } from "../utils/poseLandmarker";

/**
 * Props:
 *  - isOpen: boolean
 *  - onClose: function
 *  - roomName: string (optional)
 */
export default function PostureReport({ isOpen, onClose, roomName }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  // Poll for generated report while modal open (gives time to collect samples)
  useEffect(() => {
    let mounted = true;
    let poll = null;

    async function refresh() {
      if (!mounted) return;
      setLoading(true);
      try {
        const analysis = getPostureAnalysis(); // returns PostureAnalysis instance
        if (!analysis) {
          setReport(null);
          setLoading(false);
          return;
        }
        const generated = analysis.generateReport();
        setReport(generated || null);
      } catch (e) {
        console.warn("PostureReport refresh error:", e);
        setReport(null);
      } finally {
        setLoading(false);
      }
    }

    if (isOpen) {
      // initial refresh
      refresh();
      // poll every 2s to show live updates while modal open
      poll = setInterval(refresh, 2000);
    }

    return () => {
      mounted = false;
      if (poll) clearInterval(poll);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExportJson = () => {
    const payload = {
      roomName: roomName || null,
      generatedAt: new Date().toISOString(),
      report,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `posture-report-${roomName || "room" }-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    resetPostureAnalysis();
    setReport(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full shadow-lg overflow-auto" style={{ maxHeight: "90vh" }}>
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div>
            <h3 className="text-lg font-semibold">Posture Analysis Report</h3>
            <div className="text-sm text-gray-600">Room: {roomName || "—"}</div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportJson}
              className="px-3 py-1 bg-blue-600 text-white rounded shadow-sm text-sm"
              title="Export JSON"
            >
              Export JSON
            </button>
            <button
              onClick={handleResetData}
              className="px-3 py-1 bg-yellow-500 text-white rounded shadow-sm text-sm"
              title="Clear collected posture data"
            >
              Reset Data
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-gray-200 rounded text-gray-700 text-sm"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-4">
          {loading && (
            <div className="text-sm text-gray-500 mb-2">Refreshing report…</div>
          )}

          {!report && !loading && (
            <>
              <div className="text-center text-gray-700 py-8">
                <div className="text-xl font-medium mb-2">No posture data yet</div>
                <div className="text-sm text-gray-500">
                  Make sure the video contains the patient's head/shoulders, AI Posture is enabled and giving frames. Keep the session running for a few seconds to collect samples.
                </div>
              </div>
            </>
          )}

          {report && (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Duration: {report.duration ? `${Math.round(report.duration)}s` : "—"} · Samples: {report.totalSamples || 0}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(report.summary || {}).length === 0 && (
                  <div className="text-gray-600">No numeric metrics available in summary.</div>
                )}

                {report.summary && Object.entries(report.summary).map(([key, stats]) => (
                  <div key={key} className="p-3 border rounded">
                    <div className="text-sm font-semibold">{key}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      avg: {Number(stats.average).toFixed(3)} · min: {Number(stats.min).toFixed(3)} · max: {Number(stats.max).toFixed(3)} · last: {Number(stats.latest).toFixed(3)}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">samples: {stats.sampleCount}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Raw data (latest {Math.min(50, report.rawData?.length || 0)} samples)</h4>
                <div className="text-xs font-mono text-gray-700 bg-gray-100 p-2 rounded overflow-auto" style={{ maxHeight: "240px" }}>
                  <pre style={{ margin: 0 }}>{JSON.stringify((report.rawData || []).slice(-50), null, 2)}</pre>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
