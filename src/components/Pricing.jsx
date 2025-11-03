import React, { useContext, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { container } from "./NavBar";
import "../styles/Pricing.css";

const EXCHANGE_RATE_USD_TO_NGN = 1461.79;

const plans = [
  {
    id: "basic",
    name: "Basic",
    monthlyUSD: 9.99,
    features: ["HD streaming", "Watch on 1 device", "Limited downloads"],
  },
  {
    id: "standard",
    name: "Standard",
    monthlyUSD: 13.99,
    features: [
      "Full HD streaming",
      "Watch on 2 devices",
      "Offline downloads",
      "No ads",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    monthlyUSD: 17.99,
    features: [
      "Ultra HD streaming",
      "Watch on 4 devices",
      "Priority support",
      "Offline downloads",
    ],
  },
];

const formatUSD = (n) =>
  typeof n === "number" ? `$${n.toFixed(2)}` : n;

const formatNGN = (n) =>
  typeof n === "number"
    ? `₦${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : n;

export default function Pricing() {
  const { toggle } = useContext(container);
  const [yearly, setYearly] = useState(false);

  return (
    <div className={toggle ? "pricing-page dark" : "pricing-page light"}>
      <div className="pricing-wrapper">
        <header className="pricing-header">
          <div>
            <h2>Choose a plan that fits you</h2>
            <p className="sub">
              Monthly and yearly billing available — yearly gives you 2 months free.
            </p>
          </div>

          <div className="billing-toggle">
            <span className={`label ${!yearly ? "active" : ""}`}>Monthly</span>
            <button
              aria-label="Toggle billing period"
              className={`switch ${yearly ? "yearly" : "monthly"}`}
              onClick={() => setYearly(!yearly)}
            >
              <div className="switch-knob" />
            </button>
            <span className={`label ${yearly ? "active" : ""}`}>Yearly</span>
          </div>
        </header>

        <div className="plans-grid">
          {plans.map((p) => {
            const monthlyUSD = p.monthlyUSD;
            const yearlyUSD = +(monthlyUSD * 10).toFixed(2);
            const displayUSD = yearly ? yearlyUSD : monthlyUSD;

            const displayNGN = Math.round(displayUSD * EXCHANGE_RATE_USD_TO_NGN);

            return (
              <article key={p.id} className="plan-card">
                <div className="plan-top">
                  <h3>{p.name}</h3>
                  <div className="price">
                    <span className="usd">{formatUSD(displayUSD)}</span>
                    <span className="ngn"> / {formatNGN(displayNGN)}</span>
                  </div>
                  <div className="period">
                    {yearly ? "billed yearly" : "billed monthly"}
                  </div>
                </div>

                <ul className="features">
                  {p.features.map((f, i) => (
                    <li key={i}>
                      <AiOutlineCheck className="check" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="plan-action">
                  <button className="subscribe-btn">
                    Subscribe
                    <span className="btn-subtext">
                      {yearly ? "Save 16.6%" : "Start free trial"}
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <p className="disclaimer">
          Prices shown in USD and NGN (converted at 1 USD ≈ {EXCHANGE_RATE_USD_TO_NGN} NGN). Rates fluctuate — amounts are approximate.
        </p>
      </div>
    </div>
  );
}
