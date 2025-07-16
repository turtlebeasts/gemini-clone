import { useEffect, useState } from "react";

export default function CountrySelect() {
  const [countryCode, setCountryCode] = useState("+91");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,idd")
      .then((res) => res.json())
      .then((data) => {
        const codes = data
          .map((c) => ({
            name: c.name.common,
            code:
              c.idd?.root && c.idd?.suffixes
                ? c.idd.root + c.idd.suffixes[0]
                : null,
            flag: c.flags?.png || "",
            alt: c.flags?.alt || "",
          }))
          .filter((c) => c.code)
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(codes);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      });
  }, []);

  return (
    <select
      value={countryCode}
      onChange={(e) => setCountryCode(e.target.value)}
      className="w-1/3 px-2 py-2 border border-gray-400 rounded-l-md bg-white text-black focus:outline-none"
    >
      <option value="">{loading && "Loading"}</option>
      {!loading &&
        countries.map((c, i) => (
          <option key={i} value={c.code}>
            {c.name} ({c.code})
          </option>
        ))}
    </select>
  );
}
