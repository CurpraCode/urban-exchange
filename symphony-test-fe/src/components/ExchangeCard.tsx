import React from "react";
import { PageHeader, Row, Col, Button, Select, Input, Avatar } from "antd";
import USDICON from "../assets/USD_PNG.png";
import EURICON from "../assets/EUR_PNG.png";
import BTCICON from "../assets/BTC_PNG.png";
import ETHICON from "../assets/ETH_PNG.png";
import XRPICON from "../assets/XRP_PNG.png";


const { Option } = Select;

interface ExchangeCardProps {
  amount1: number;
  amount2: number;
  handleAmount1Change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAmount2Change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCurrencyFromChange: (value: string) => void;
  handleCurrencyToChange: (value: string) => void;
  postExchange: () => void;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  amount1,
  amount2,
  handleAmount1Change,
  handleAmount2Change,
  handleCurrencyFromChange,
  handleCurrencyToChange,
  postExchange,
}) => {
  return (
    <>
      <PageHeader ghost={false} className="site-page-header">
        <Row className="page-header-title">
          <Col span={24}>Exchange</Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 8, md: 16, lg: 16 }}>
          <Col span={24} className="form-container">
            <Row gutter={{ xs: 8, sm: 8, md: 16, lg: 16 }}>
              <Col
                span={8}
                className="crypto-section"
                style={{ width: "100%" }}
              >
                <Row
                  gutter={{ xs: 8, sm: 8, md: 16, lg: 16 }}
                  className="crypto-column"
                >
                  <Col span={14}>
                    <span className="input-label">Currency from</span>
                    <div className="my-select-container">
                      <Select
                        className="coin-selector"
                        size="large"
                        onChange={handleCurrencyFromChange}
                        bordered={true}
                      >
                        <Option value="BTC">
                          <Avatar
                            src={BTCICON}
                            size="small"
                            className="coin-icon"
                          />
                          <span className="currency-name">Bitcoin</span>
                        </Option>
                        <Option value="ETH">
                          <Avatar
                            src={ETHICON}
                            size="small"
                            className="coin-icon"
                          />
                          <span className="currency-name">Etherum</span>
                        </Option>
                        <Option value="XRP">
                          <Avatar
                            src={XRPICON}
                            size="small"
                            className="coin-icon"
                          />
                          <span className="currency-name">Ripple</span>
                        </Option>
                      </Select>
                    </div>
                  </Col>
                  <Col span={10} style={{ width: "100%" }}>
                    <span className="input-label">Amount</span>
                    <Input
                      className="crypto-input"
                      placeholder="1"
                      type="number"
                      value={amount1}
                      onChange={(e) => handleAmount1Change(e)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col className="equals-section">
                <br />=
              </Col>
              <Col span={15} className="fiat-section" style={{ width: "100%" }}>
                <Row gutter={{ xs: 8, sm: 8, md: 16, lg: 16 }}>
                  <Col span={9}>
                    <span className="input-label">Currency to</span>
                    <div className="my-select-container">
                      <Select
                        className="fiat-selector"
                        size="large"
                        onChange={handleCurrencyToChange}
                        bordered={true}
                      >
                        <Option value="USD">
                          <Avatar
                            src={USDICON}
                            size="small"
                            className="coin-icon"
                          ></Avatar>{" "}
                          <span className="currency-name">USD</span>
                        </Option>
                        <Option value="EUR">
                          <Avatar
                            src={EURICON}
                            size="small"
                            className="coin-icon"
                          ></Avatar>{" "}
                          <span className="currency-name">EUR</span>
                        </Option>
                      </Select>
                    </div>
                  </Col>
                  <Col span={9}>
                    <span className="input-label">Amount</span>
                    <Input
                      className="fiat-input"
                      placeholder="1"
                      type="number"
                      prefix={"$"}
                      value={amount2}
                      onChange={(e) => handleAmount2Change(e)}
                    />
                  </Col>
                  <Col span={6}>
                    <br />
                    <Button
                      className="save-button"
                      size="middle"
                      onClick={() => postExchange()}
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </PageHeader>
    </>
  );
};

export default ExchangeCard;
