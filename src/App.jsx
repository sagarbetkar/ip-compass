import { useEffect, useState } from "react";
import { getIPDetails } from "./utils/getIP";

export default function Home() {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    async function fetchIP() {
      const data = await getIPDetails();
      setIpData(data);
      setLoading(false);
    }
    fetchIP();
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <div className={`container-fluid d-flex flex-column align-items-center justify-content-center ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>      
      <h1 className="mb-3 text-primary">📍 IP Compass</h1>

      {loading ? (
        <div className={`vh-100 text-center`} style={{ maxWidth: "500px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : ipData ? (
        <>
          <div className={`card shadow p-2 text-center ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`} style={{ maxWidth: "500px" }}>
            <div className="card-title">
                <h5>Your IP Information</h5>
                <div className="d-flex justify-content-evenly w-100 px-3">
                  <button className="btn btn-primary btn-sm" onClick={toggleDarkMode}>
                    {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => window.location.reload()}> Refresh 🔄</button>
                </div>
            </div>
            <div className="card-body pt-0">
              <table className="table table-bordered mt-3">
                <tbody>
                  <tr><td><strong>IP Address</strong></td><td>{ipData.ip}</td></tr>
                  <tr><td colSpan="2" className="table-secondary text-center"><strong>ISP Details</strong></td></tr>
                  <tr><td><strong>ISP</strong></td><td>{ipData.isp.isp}</td></tr>
                  <tr><td><strong>ASN</strong></td><td>{ipData.isp.asn}</td></tr>
                  <tr><td><strong>Organization</strong></td><td>{ipData.isp.org}</td></tr>
                  <tr><td colSpan="2" className="table-secondary text-center"><strong>Location</strong></td></tr>
                  <tr><td><strong>Country</strong></td><td>{ipData.location.country} ({ipData.location.country_code})</td></tr>
                  <tr><td><strong>City</strong></td><td>{ipData.location.city}</td></tr>
                  <tr><td><strong>State</strong></td><td>{ipData.location.state}</td></tr>
                  <tr><td><strong>Zipcode</strong></td><td>{ipData.location.zipcode}</td></tr>
                  <tr><td><strong>Latitude</strong></td><td>{ipData.location.latitude.toFixed(3)}</td></tr>
                  <tr><td><strong>Longitude</strong></td><td>{ipData.location.longitude.toFixed(3)}</td></tr>
                  <tr><td><strong>Timezone</strong></td><td>{ipData.location.timezone}</td></tr>
                  <tr><td><strong>Local Time</strong></td><td>{new Date(ipData.location.localtime).toLocaleString()}</td></tr>
                  <tr><td colSpan="2" className="table-secondary text-center"><strong>Risk Analysis</strong></td></tr>
                  <tr><td><strong>VPN</strong></td><td>{ipData.risk.is_vpn ? "Yes ✅" : "No ❌"}</td></tr>
                  <tr><td><strong>TOR</strong></td><td>{ipData.risk.is_tor ? "Yes ✅" : "No ❌"}</td></tr>
                  <tr><td><strong>Proxy</strong></td><td>{ipData.risk.is_proxy ? "Yes ✅" : "No ❌"}</td></tr>
                  <tr><td><strong>Datacenter</strong></td><td>{ipData.risk.is_datacenter ? "Yes ✅" : "No ❌"}</td></tr>
                  <tr><td><strong>Mobile Network</strong></td><td>{ipData.risk.is_mobile ? "Yes ✅" : "No ❌"}</td></tr>
                  <tr><td><strong>Risk Score</strong></td><td>{ipData.risk.risk_score}/100</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-3 text-center">
            <p className="mb-1">Powered by</p>
            <a href="https://ipquery.io" target="_blank" rel="noopener noreferrer">
              <img src="https://ipquery.io/favicon.ico" alt="IPQuery Logo" width="50" height="50" className="rounded" />
            </a>
          </div>
        </>
      ) : (
        <div className="alert alert-danger mt-3">Error fetching data</div>
      )}
    </div>
  );
}