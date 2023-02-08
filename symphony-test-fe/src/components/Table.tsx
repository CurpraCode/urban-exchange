import React, { useState } from "react";
import moment from "moment";
import { PageHeader, Row, Col, Table, Statistic } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { ColumnType, ColumnGroupType } from "antd/lib/table";

interface TableCardProps {
  tableData: any[];
}
interface TableData {
  createdAt: string;
  currencyFrom: string;
  amount1: number;
  currencyTo: string;
  amount2: number;
  type: string;
}

const columns: (ColumnType<TableData> | ColumnGroupType<TableData>)[] = [
  {
    title: "Date & Time",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: (a: TableData, b: TableData) =>
      a.createdAt.localeCompare(b.createdAt),
    sortDirections: ["descend", "ascend"],
    responsive: ["sm"],
    render(_text: string, record: TableData) {
      return {
        props: {},
        children: (
          <span>{moment(record.createdAt).format("DD/MM/YYYY  hh:mm")}</span>
        ),
      };
    },
  },
  {
    title: "Currency From",
    dataIndex: "currencyFrom",
    key: "currencyFrom",
    sorter: (a: TableData, b: TableData) =>
      a.currencyFrom.localeCompare(b.currencyFrom),
    sortDirections: ["descend", "ascend"],
    responsive: ["sm"],
  },
  {
    title: "Amount 1",
    dataIndex: "amount1",
    key: "amount1",
    sorter: (a: TableData, b: TableData) => a.amount1 - b.amount1,
    sortDirections: ["descend", "ascend"],
    responsive: ["sm"],
  },
  {
    title: "Currency To",
    dataIndex: "currencyTo",
    key: "currencyTo",
    sorter: (a: TableData, b: TableData) =>
      a.currencyTo.localeCompare(b.currencyTo),
    sortDirections: ["descend", "ascend"],
    responsive: ["sm"],
  },
  {
    title: "Amount 2",
    dataIndex: "amount2",
    key: "amount2",
    sorter: (a: TableData, b: TableData) => a.amount2 - b.amount2,
    sortDirections: ["descend", "ascend"],
    responsive: ["sm"],
    render(text: number, _record: TableData) {
      return {
        props: {},
        children: (
          <Statistic
            precision={2}
            value={text}
            valueStyle={{
              fontFamily: "Red Hat Display",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "152.2%",
            }}
          />
        ),
      };
    },
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    sorter: (a: TableData, b: TableData) => a.type.localeCompare(b.type),
    sortDirections: ["descend", "ascend"],
    responsive: ["sm"],
    render(text: string, _record: TableData) {
      return {
        props: {
          style: { color: text === "Live Price" ? "#5dbe7e" : "#6368df" },
        },
        children: <div>{text}</div>,
      };
    },
  },
];
const TableCard: React.FC<TableCardProps> = ({ tableData }) => {
  const [current, setCurrent] = useState(1);

  const onChange = ({ pagination, filters, sorter, extra }: any) => {
    setCurrent(pagination.current);
  };
  return (
    <>
      <PageHeader ghost={false} className="table-header">
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={tableData}
              size="small"
              pagination={{
                current: current,
                pageSize: 4,
                position: ["bottomLeft"],
                total: tableData.length,
                itemRender(_current, type, originalElement) {
                  if (type === "prev") {
                    return <ArrowLeftOutlined />;
                  }
                  if (type === "next") {
                    return (
                      <span
                        style={{
                          lineHeight: "24px",
                          color: "#565D5F",
                          display: "flex",
                          alignItems: "center",
                          fontWeight: 400,
                          paddingRight: "8px",
                        }}
                      >
                        Next{" "}
                        <ArrowRightOutlined style={{ paddingLeft: "8px" }} />
                      </span>
                    );
                  }
                  return originalElement;
                },
              }}
              // defaultPageSize={4}
              sortDirections={["descend"]}
              rowClassName={(_record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              onChange={onChange}
              onRow={(_record) => {
                return {
                  onClick: (event) => {
                    console.log(event.target);
                    //event.target.classlist.add("table-row-click-style")
                  },
                };
              }}
            />
          </Col>
        </Row>
      </PageHeader>
    </>
  );
};

export default TableCard;
