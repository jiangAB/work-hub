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
} from "antd";
import { useEffect, useState } from "react";
import { ColumnType } from "antd/lib/table";

import { removeEmptyValues } from "@/utils/index";
import styles from "./index.module.scss";
import locale from "@/assets/locale";
import { getStaffInfo } from "@/api/server";

interface Employee {
  id: number;
  jobNumber: string;
  staffName: string;
  department: string;
  position: string;
  workplace: string;
  salary: number;
  editable: boolean;
}

export default function PersonnelManage() {
  const [tableData, setTableData] = useState<Employee[]>([]);
  const [search, setsearch] = useState({});
  const [rowData, setRowData] = useState<Employee>();
  const [editedRecord, setEditedRecord] = useState<boolean>(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getStaffInfo(search).then((res) => {
      setTableData(res.data);
    });
  }, [search]);

  const onFinish = (v: Employee) => {
    const newSearchParams = removeEmptyValues(v);
    setsearch(newSearchParams);
  };

  const handleEdit = (v: Employee) => {
    setRowData(v);
    form.setFieldsValue(v);
    setEditedRecord(true);
  };
  const editStaff = (id?: number) => {
    form
    .validateFields()
    .then((values) => {
      values.id = id
      const newArray = tableData?.map((item: Employee) => (item.id === values.id ? values : item));
      setTableData(newArray)
      message.success(locale.editSuccess)
      setEditedRecord(false)
    })
    .catch((info) => {
      console.log(info);
    });
  }

  const handleDelete = (v: number) => {
    console.log(v,'删除功能');
    setTableData(tableData.filter((item: Employee) => item.id !== v))
  }

  const cancel = () => {
    setEditedRecord(false);
  };

  const tablePrint = () => {
    /* const originalContents = document.body.innerHTML;
    const printableArea = document.getElementById('tablePrint')
    const printContents = printableArea.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents; */
  }

  const columns: ColumnType<Employee>[] = [
    {
      title: locale.staffName,
      width: 100,
      fixed: "left",
      dataIndex: "staffName",
      key: "staffName",
    },
    {
      title: locale.jobNumber,
      width: 200,
      dataIndex: "jobNumber",
      key: "jobNumber",
    },
    {
      title: locale.department,
      width: 200,
      dataIndex: "department",
      key: "department",
    },
    {
      title: locale.position,
      width: 200,
      dataIndex: "position",
      key: "position",
    },
    {
      title: locale.workplace,
      width: 200,
      dataIndex: "workplace",
      key: "workplace",
    },
    {
      title: locale.salary,
      dataIndex: "salary",
      key: "salary",
      render: (text: number) => `${locale.RMB} ${text.toFixed(2)}`, // 格式化工资显示
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: locale.operate,
      key: "operate",
      fixed: "right",
      width: 150,
      render: (_, v) => (
        <Space size="middle">
          <a  onClick={() => handleEdit(v)}>{locale.revise}</a>
          <Popconfirm title={locale.areSureDelete} okText={locale.confirm} cancelText={locale.cancel} onConfirm={() => handleDelete(v.id)}>
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
        rowKey="id"
        scroll={{ x: 1600 }}
        bordered
      ></Table>

      <Modal
        forceRender={true}
        title={locale.revise}
        open={editedRecord}
        onCancel={cancel}
        onOk={() => editStaff(rowData?.id)}
      >
        <Form form={form} initialValues={rowData} labelCol={{ span: 4 }} style={{ marginTop: 30 }} >
          <Form.Item label={locale.staffName} name="staffName">
            <Input />
          </Form.Item>
          <Form.Item label={locale.jobNumber} name="jobNumber">
            <Input readOnly />
          </Form.Item>
          <Form.Item label={locale.department} name="department">
            <Input />
          </Form.Item>
          <Form.Item label={locale.position} name="position">
            <Input />
          </Form.Item>
          <Form.Item label={locale.workplace} name="workplace">
            <Input />
          </Form.Item>
          <Form.Item label={locale.salary} name="salary">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
