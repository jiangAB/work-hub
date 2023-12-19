import { Button, Form, Input, Col, Row, Divider, Table } from "antd";
import { useEffect, useState } from "react";
import { ColumnType } from 'antd/lib/table';

import styles from "./index.module.scss";
import locale from '@/assets/locale'
import { getStaffInfo } from "@/api/server"

interface Data {
  id?: number,
  name?: string,
  username?: string,
  password?: string,
  staffName?: number,
}

interface Employee {
  id: number;
  工号: string;
  名称: string;
  部门: string;
  职位: string;
  工作地: string;
  工资: number;
}

const columns: ColumnType<Employee>[] = [
  {
    title: 'ID',
    width: 100,
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '工号',
    width: 100,
    dataIndex: '工号',
    key: '工号',
  },
  {
    title: '名称',
    width: 100,
    dataIndex: '名称',
    key: '名称',
  },
  {
    title: '部门',
    width: 100,
    dataIndex: '部门',
    key: '部门',
  },
  {
    title: '职位',
    width: 100,
    dataIndex: '职位',
    key: '职位',
  },
  {
    title: '工作地',
    width: 100,
    dataIndex: '工作地',
    key: '工作地',
  },
  {
    title: '工资(月)',
    width: 100,
    dataIndex: '工资',
    key: '工资',
    render: (text: number) => `¥ ${text.toFixed(2)}`, // 格式化工资显示
  },
];


export default function PersonnelManage() {
  const [ tableData, setTableData ] = useState<unknown>([])
  useEffect(() => {
    getStaffInfo().then((res) => {
      setTableData(res.data)
    })
  },[])

  const onFinish = (v: Data) => {
    const params = {
      id: v.staffName,
    }
    getStaffInfo(params).then((res) => {
      const $res = [res.data]
      setTableData($res)
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
        </Row>
        <Row justify='end' style={{ height: 35 }} >
          <Col span={4}>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: 5 }} >
                {locale.search}
              </Button>
              <Button type="primary" htmlType="reset">
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
      >

      </Table>
    </div>
  );
}
