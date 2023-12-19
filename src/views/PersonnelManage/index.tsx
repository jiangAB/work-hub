import { Button, Form, Input, Col, Row, Divider, Table, Space } from "antd";
import { useEffect, useState } from "react";
import { ColumnType } from 'antd/lib/table';

import styles from "./index.module.scss";
import locale from '@/assets/locale'
import { getStaffInfo } from "@/api/server"

interface Employee {
  id: number;
  jobNumber: string;
  staffName: string;
  department: string;
  position: string;
  workplace: string;
  salary: number;
}

const columns: ColumnType<Employee>[] = [
  {
    title: locale.staffName,
    width: 200,
    fixed: 'left',
    dataIndex: 'staffName',
    key: 'staffName',
  },
  {
    title: locale.jobNumber,
    width: 200,
    dataIndex: 'jobNumber',
    key: 'jobNumber',
  },
  {
    title: locale.department,
    width: 200,
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: locale.position,
    width: 200,
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: locale.workplace,
    width: 200,
    dataIndex: 'workplace',
    key: 'workplace',
  },
  {
    title: locale.salary,
    width: 200,
    dataIndex: 'salary',
    key: 'salary',
    render: (text: number) => `${locale.RMB} ${text.toFixed(2)}`, // 格式化工资显示
  },
  {
    title: locale.operate,
    key: 'operate',
    fixed: 'right',
    render: () => (
      <Space size="middle">
        <a>{locale.viewing}</a>
        <a>{locale.revise}</a>
        <a>{locale.delete}</a>
      </Space>
    ),
  },
];


export default function PersonnelManage() {
  const [ tableData, setTableData ] = useState([])
  const [ search, setsearch ] = useState({})
  useEffect(() => {
    getStaffInfo().then((res) => {
      setTableData(res.data)
    })
  },[search])

  const onFinish = (v: Employee) => {
    const params = {
      staffName: v.staffName,
      jobNumber: v.jobNumber,
      department: v.department
    }
    getStaffInfo(params).then((res) => {
      setTableData(res.data)
    })
  };
  return (
    <div className={styles.perContent}>
      <Form onFinish={onFinish}  className={styles.formStyle} >
        <Row gutter={24} >
          <Col span={6}>
            <Form.Item name="staffName" label={locale.staffName}>
              <Input></Input>
            </Form.Item>
          </Col>
          <Col  span={6} >
            <Form.Item name="jobNumber" label={locale.jobNumber}>
              <Input></Input>
            </Form.Item>
          </Col>
          <Col  span={6} >
            <Form.Item name="department" label={locale.department}>
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row justify='end' style={{ height: 35 }} >
          <Col span={4}>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: 5 }} >
                {locale.search}
              </Button>
              <Button type="primary" htmlType="reset" onClick={() => setsearch({})} >
                {locale.reset}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider />
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        scroll={{ x: 1600 }}
      >

      </Table>
    </div>
  );
}
