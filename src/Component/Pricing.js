import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const SubscriptionPage = () => {
  const { t } = useTranslation();
  const { setUserType } = useContext(UserContext);
  const [selectedPackageId, setSelectedPackageId] = useState(1);

  return (
    <div className="rounded-div" id="paket" style={{ height: '100%', width: '90%', marginTop: '100px', marginLeft: '5%' }}>
      <section className="intro">
        <h1>TaxiScout24 – {t("reg3_text")} (CHF)</h1>
        <p>{t("reg4_text")}</p>
        <p><strong>TaxiScout24</strong> – {t("reg5_text")}</p>
        <p>{t("reg6_text")}</p>
        <p><strong>{t("reg7_text")}</strong></p>
      </section>

      <section className="pricing">
        {/* Paket 1: Starter */}
        <div className="plan">
          <h2>Starter 🟢</h2>
          <p className="price">
            CHF 1.<span className="spanclass">– / {t("month")}</span><br />
            <span>CHF 1.– / {t("plan_price_line2")} <br/> {t("plan_price_line3")} (CHF 12.– / {t("year")})</span>
          </p>
          <ul>
            <li>✅ 1 {t("pricing_text4")}</li>
            <li>✅ 1 {t("plan_feature_vehicle")}</li>
            <li>✅ {t("plan_feature_app_access")}</li>
            <li>❌ {t("plan_feature_no_reports")}</li>
            <li>❌ {t("plan_feature_no_support")}</li>
            <li>❌ {t("plan_feature_no_setup")}</li>
            <li>❌ {t("plan_feature_no_api")}</li>
          </ul>
          <div className="buttons">
            <Link
              to="/signup"
              className="btn-monthly"
              onClick={() => {
                setSelectedPackageId(1);
                setUserType(t('company'));
              }}
            >
              💳  {t(`pricing_text6`)}
            </Link>
          </div>
        </div>

        {/* Paket 2: Basic */}
        <div className="plan">
          <h2>Basic 🔵</h2>
          <p className="price">
            CHF 89.<span className="spanclass">– / {t("month")}</span><br />
            <span>CHF 69.– / {t("plan_price_line2")} <br /> {t("plan_price_line3")} (CHF 828.– / {t("year")})</span>
          </p>
          <ul>
            <li>✅ 5 {t("pricing_text4")}</li>
            <li>✅ 5 {t("plan_feature_vehicle")}</li>
            <li>✅ {t("plan_feature_app_access")}</li>
            <li>✅ {t("plan_feature_no_reports")}</li>
            <li>✅ {t("plan_feature_no_support")}</li>
            <li>❌ {t("plan_feature_no_setup")}</li>
            <li>❌ {t("plan_feature_no_api")}</li>
          </ul>
          <div className="buttons">
            <Link
              to="/signup"
              className="btn-monthly"
              onClick={() => {
                setSelectedPackageId(3);
                setUserType(t('company'));
              }}
            >
              💳  {t(`pricing_text6`)}
            </Link>
          </div>
        </div>

        {/* Paket 3: Pro */}
        <div className="plan">
          <h2>Pro 🟠</h2>
          <p className="price">
            CHF 199.<span className="spanclass">– / {t("month")}</span><br />
            <span>CHF 149.– / {t("plan_price_line2")} <br /> {t("plan_price_line3")} (CHF 1'788.– / {t("year")})</span>
          </p>
          <ul>
            <li>✅ 20 {t("pricing_text4")}</li>
            <li>✅ 20 {t("plan_feature_vehicle")}</li>
            <li>✅ {t("plan_feature_app_access")}</li>
            <li>✅ {t("plan_feature_no_reports")}</li>
            <li>✅ {t("plan_feature_no_support")}</li>
            <li>✅ {t("plan_feature_no_setup")}</li>
            <li>✅ {t("plan_feature_no_api")}</li>
          </ul>
          <div className="buttons">
            <Link
              to="/signup"
              className="btn-monthly"
              onClick={() => {
                setSelectedPackageId(5);
                setUserType(t('company'));
              }}
            >
              💳  {t(`pricing_text6`)}
            </Link>
          </div>
        </div>

        {/* Paket 4: Enterprise */}
        <div className="plan">
          <h2>Enterprise 🔴</h2>
          <p className="price">
            CHF 289.<span className="spanclass">– / {t("month")}</span><br />
            <span>CHF 229.– / {t("plan_price_line2")} <br /> {t("plan_price_line3")} (CHF 2'748.– / {t("year")})</span>
          </p>
          <ul>
            <li>✅ 99 {t("pricing_text4")}</li>
            <li>✅ {t("unlimited_vehicles")}</li>
            <li>✅ {t("plan_feature_app_access")}</li>
            <li>✅ {t("plan_feature_no_reports")}</li>
            <li>✅ {t("plan_feature_no_support")}</li>
            <li>✅ {t("plan_feature_no_setup")}</li>
            <li>✅ {t("plan_feature_no_api")}</li>
          </ul>
          <div className="buttons">
            <Link
              to="/signup"
              className="btn-monthly"
              onClick={() => {
                setSelectedPackageId(7);
                setUserType(t('company'));
              }}
            >
              💳  {t(`pricing_text6`)}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPage;
