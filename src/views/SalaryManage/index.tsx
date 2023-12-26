import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Divider,
  Table,
  Space,
  Modal,
  Popconfirm,
  message,
  InputNumber
} from "antd";
import { useEffect, useState } from "react";
import { ColumnType } from "antd/lib/table";

import { removeEmptyValues } from "@/utils/index";
import styles from "./index.module.scss";
import locale from "@/assets/locale";
import { getSalaryList } from "@/api/server";

interface salartType {
  salaryId: number;
  staffId: number;
  staffName: string;
  jobNumber: string;
  department: string;
  fiveInsuranceOneFund: number;
  basicSalary: number;
  mealSubsidy: number;
  bonus: number;
  commission: number;
  grossSalary: number;
  netSalary: number;
}

export default function SalaryManage() {
  const [tableData, setTableData] = useState<salartType[]>([]);
  const [search, setsearch] = useState({});
  const [rowData, setRowData] = useState<salartType>();
  const [editedRecord, setEditedRecord] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getSalaryList(search).then((res) => {
      setTableData(res.data);
    });
  }, [search]);

  const onFinish = (v: salartType) => {
    const newSearchParams = removeEmptyValues(v);
    setsearch(newSearchParams);
  };

  const handleEdit = (v: salartType) => {
    setRowData(v);
    form.setFieldsValue(v);
    setEditedRecord(true);
  };
  const editStaff = (salary: salartType | undefined) => {
    form
      .validateFields()
      .then((values) => {
        values.salaryId = salary?.salaryId;
        values.staffName = salary?.staffName;
        values.jobNumber = salary?.jobNumber;
        values.department = salary?.department;
        const newArray = tableData?.map((item: salartType) =>
          item.salaryId === values.salaryId ? values : item
        );
        setTableData(newArray);
        message.success(locale.editSuccess);
        setEditedRecord(false);
      })
      .catch((info) => {
        console.log(info);
      });
  };

  const handleDelete = (v: number) => {
    console.log(v, "删除功能");
    setTableData(tableData.filter((item: salartType) => item.staffId !== v));
  };

  const cancel = () => {
    setEditedRecord(false);
  };

  const tablePrint = () => {
    
  };

  const columns: ColumnType<salartType>[] = [
    {
      title: locale.staffName,
      width: 150,
      fixed: "left",
      dataIndex: "staffName",
      key: "staffName",
      render: (_, v) => (
        <div>{v.staffName + "-" + v.jobNumber + "-" + v.department} </div>
      ),
    },
    {
      title: locale.basicSalary,
      width: 200,
      dataIndex: "basicSalary",
      key: "basicSalary",
      render: (text: number) => `${locale.RMB} ${text.toFixed(2)}`, // 格式化工资显示
    },
    {
      title: locale.housingSubsidy,
      width: 200,
      dataIndex: "housingSubsidy",
      key: "housingSubsidy",
      render: (text: number) => `${locale.RMB} ${text.toFixed(2)}`, // 格式化工资显示
    },
    {
      title: locale.mealSubsidy,
      width: 200,
      dataIndex: "mealSubsidy",
      key: "positmealSubsidyion",
      render: (text: number) => `${locale.RMB} ${text.toFixed(2)}`, // 格式化工资显示
    },
    {
      title: locale.bonus,
      width: 200,
      dataIndex: "bonus",
      key: "bonus",
      render: (text: number) => `${locale.RMB} ${text.toFixed(2)}`, // 格式化工资显示
    },
    {
      title: locale.commission,
      width: 200,
      dataIndex: "commission",
      key: "commission",
      render: (text: number) => `${locale.RMB} ${text.toFixed(2)}`, // 格式化工资显示
    },
    {
      title: locale.grossSalary,
      width: 200,
      dataIndex: "grossSalary",
      key: "grossSalary",
      render: (text: number) => `${locale.RMB} ${text.toFixed(2)}`, // 格式化工资显示
    },
    {
      title: locale.netSalary,
      width: 200,
      dataIndex: "netSalary",
      key: "netSalary",
      render: (text: number) => `${locale.RMB} ${text.toFixed(2)}`, // 格式化工资显示
      sorter: (a, b) => a.netSalary - b.netSalary,
    },
    {
      title: locale.operate,
      key: "operate",
      fixed: "right",
      width: 150,
      render: (_, v) => (
        <Space size="middle">
          <a onClick={() => handleEdit(v)}>{locale.revise}</a>
          <Popconfirm
            title={locale.areSureDelete}
            okText={locale.confirm}
            cancelText={locale.cancel}
            onConfirm={() => handleDelete(v.staffId)}
          >
            <a>{locale.delete}</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.perContent}>
      <Form onFinish={onFinish} className={styles.formStyle}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="staffName" label={locale.staffName}>
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="jobNumber" label={locale.jobNumber}>
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="department" label={locale.department}>
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" style={{ height: 35 }}>
          <Col span={4}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 5 }}
              >
                {locale.search}
              </Button>
              <Button
                type="primary"
                htmlType="reset"
                onClick={() => setsearch({})}
              >
                {locale.reset}
              </Button>
              <Button
                type="primary"
                htmlType="reset"
                onClick={() => tablePrint()}
              >
                {locale.print}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider />
      <Table
        id="tablePrint"
        columns={columns}
        dataSource={tableData}
        rowKey="salaryId"
        scroll={{ x: 1600 }}
        bordered
      ></Table>

      <Modal
        forceRender={true}
        title={
          rowData?.staffName +
          "-" +
          rowData?.jobNumber +
          "-" +
          rowData?.department
        }
        open={editedRecord}
        onCancel={cancel}
        onOk={() => editStaff(rowData)}
      >
        <Form
          form={form}
          initialValues={rowData}
          labelCol={{ span: 4 }}
          style={{ marginTop: 30 }}
        >
          <Form.Item label={locale.basicSalary} name="basicSalary">
            <InputNumber />
          </Form.Item>
          <Form.Item label={locale.housingSubsidy} name="housingSubsidy">
            <InputNumber />
          </Form.Item>
          <Form.Item label={locale.mealSubsidy} name="mealSubsidy">
            <InputNumber />
          </Form.Item>
          <Form.Item label={locale.bonus} name="bonus">
            <InputNumber />
          </Form.Item>
          <Form.Item label={locale.commission} name="commission">
            <InputNumber />
          </Form.Item>
          <Form.Item label={locale.grossSalary} name="grossSalary">
            <InputNumber />
          </Form.Item>
          <Form.Item label={locale.netSalary} name="netSalary">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
