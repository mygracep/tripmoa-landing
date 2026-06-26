"use client";

import { useState, useCallback, useMemo } from "react";
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";

const MAP_CONTAINER_STYLE = {
  width: "100%",
  height: "100%",
};

const DEFAULT_OPTIONS = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

/**
 * 범용 지도 컴포넌트
 * @param {Array} locations - [{ name, lat, lng, image?, day?, ... }]
 * @param {number} activeDay - 필터링할 day (없으면 전체 표시)
 * @param {Function} onMarkerClick - 마커 클릭 시 콜백
 */
export default function MapView({ locations = [], activeDay = null, onMarkerClick }) {
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (activeDay == null) return locations;
    return locations.filter((loc) => loc.day === activeDay);
  }, [locations, activeDay]);

  const center = useMemo(() => {
    if (filtered.length === 0) {
      return { lat: 34.6937, lng: 135.5023 }; // 오사카 기본값
    }
    const avgLat = filtered.reduce((sum, l) => sum + l.lat, 0) / filtered.length;
    const avgLng = filtered.reduce((sum, l) => sum + l.lng, 0) / filtered.length;
    return { lat: avgLat, lng: avgLng };
  }, [filtered]);

  const handleMarkerClick = useCallback(
    (loc, idx) => {
      setSelected(idx);
      onMarkerClick?.(loc);
    },
    [onMarkerClick]
  );

  if (locations.length === 0) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#888" }}>
        표시할 장소가 없어요
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={MAP_CONTAINER_STYLE}
      center={center}
      zoom={12}
      options={DEFAULT_OPTIONS}
    >
      {filtered.map((loc, idx) => (
        <MarkerF
          key={`${loc.name}-${idx}`}
          position={{ lat: loc.lat, lng: loc.lng }}
          // 기본 흰 배경 핀 대신 작은 검은 원 SVG로 — 숫자만 깔끔하게 보이도록
          icon={{
            url:
              'data:image/svg+xml;charset=UTF-8,' +
              encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                  <circle cx="13" cy="13" r="12" fill="#1f2329" stroke="#ffffff" stroke-width="2"/>
                </svg>
              `),
            scaledSize: new window.google.maps.Size(26, 26),
            anchor: new window.google.maps.Point(13, 13),
          }}
          label={{
            text: String(idx + 1),
            color: "#fff",
            fontSize: "12px",
            fontWeight: "bold",
          }}
          onClick={() => handleMarkerClick(loc, idx)}
        />
      ))}

      {selected !== null && filtered[selected] && (
        <InfoWindowF
          position={{ lat: filtered[selected].lat, lng: filtered[selected].lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div style={{ maxWidth: "180px" }}>
            {filtered[selected].image && (
              <img
                src={filtered[selected].image}
                alt={filtered[selected].name}
                style={{ width: "100%", borderRadius: "4px", marginBottom: "4px" }}
              />
            )}
            <strong>{filtered[selected].name}</strong>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}