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
  Select
} from "antd";
import { useEffect, useState } from "react";
import { ColumnType } from "antd/lib/table";

import { removeEmptyValues, renderTable } from "@/utils/index";
import styles from "./index.module.scss";
import locale from "@/assets/locale";
import { getStaffInfo, updateStaffInfo, getDepartment, getPositions, addStaffInfo, deleteStaffInfo } from "@/api/server";

interface Employee {
  staffId?: number;
  jobNumber?: string;
  staffName?: string;
  department?: string;
  departmentId?: number;
  position?: string;
  positionId?: number;
  workplace?: string;
  grossSalary?: number;
  editable?: boolean;
}
interface Deparment {
  departmentId?: number;
  departmentName?: string;
}

interface Positions {
  positionId?: number;
  positionName?: string;
}

export default function PersonnelManage() {
  const [tableData, setTableData] = useState<Employee[]>([]);
  const [search, setsearch] = useState({});
  const [rowData, setRowData] = useState<Employee>();
  const [editedRecord, setEditedRecord] = useState<boolean>(false);
  const [departmentSelect,setDepartmentSelect] = useState([]); // 部门信息
  const [positionsSelect,setPositionsSelect] = useState([]); // 职位信息
  const [addEditStatus,setAddEditStatus] = useState<boolean>(false)
  const [loadingStatus,setLoadingStatus] = useState<boolean>(true)
  const [form] = Form.useForm();

  useEffect(() => {
    setLoadingStatus(true);
    getPositions().then((res) => {
      const positionsList = res.data.map((item: Positions) => ({label: item.positionName, value: item.positionId}))
      setPositionsSelect(positionsList);
      setLoadingStatus(false);

    })
    getDepartment().then((res) => {
      const departmentList = res.data.map((item: Deparment) => ({label: item.departmentName, value: item.departmentId}))
      setDepartmentSelect(departmentList);
      setLoadingStatus(false);

    })
    getStaffInfo(search).then((res) => {
      setTableData(res.data);
      setLoadingStatus(false);
    });
  }, [search]);

  const onFinish = (v: Employee) => {
    const newSearchParams = removeEmptyValues(v);
    setsearch(newSearchParams);
  };

  const handleEdit = (v: Employee) => {
    setAddEditStatus(false);
    setRowData(v);
    form.setFieldsValue(v);
    setEditedRecord(true);
  };
  const handleAddStaff = () => {
    setAddEditStatus(true);
    const v: Employee = {
      staffId: undefined,
      staffName: undefined,
      jobNumber: undefined,
      departmentId: undefined,
      positionId: undefined,
      workplace: undefined
    }
    setRowData(v);
    form.setFieldsValue(v);
    setEditedRecord(true);
  }
  const addStaff = () => {
    form
      .validateFields()
      .then((values) => {
        addStaffInfo(values).then((res) => {
          console.log(res)
          setsearch({})
          setEditedRecord(false);
          message.success(locale.addSuccess)
        })
      })
      .catch((info) => {
        console.log(info);
      });
  }
  const editStaff = (staffId?: number) => {
    form
      .validateFields()
      .then((values) => {
        values.staffId = staffId
        updateStaffInfo(values).then((res) => {
        const newArray = tableData?.map((item: Employee) => (item.staffId === res.data.staffId ? res.data : item));
        setTableData(newArray)
        message.success(locale.editSuccess)
        setEditedRecord(false)
        })

      })
      .catch((info) => {
        console.log(info);
      });
  }

  const handleDelete = (v?: number) => {
    const params = {
      staffId: v
    }
    deleteStaffInfo(params).then((res) => {
      console.log(res);
      message.success(locale.deleteSuccess)
    })
    setTableData(tableData?.filter((item: Employee) => item.staffId !== v))
  }

  const cancel = () => {
    setEditedRecord(false);
  };

  /* const tablePrint = () => {
    const originalContents = document.body.innerHTML;
    const printableArea = document.getElementById('tablePrint')
    const printContents = printableArea.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  } */

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
      dataIndex: "departmentId",
      key: "departmentId",
      render:(_) => (
        <div>{renderTable(departmentSelect,_)}</div>
      )
    },
    {
      title: locale.position,
      width: 200,
      dataIndex: "positionId",
      key: "positionId",
      render:(_) => (
        <div>{renderTable(positionsSelect,_)}</div>
      )
    },
    {
      title: locale.workplace,
      width: 200,
      dataIndex: "workplace",
      key: "workplace",
    },
    {
      title: locale.grossSalary,
      dataIndex: "grossSalary",
      key: "grossSalary",
      render: (text: number) => `${locale.RMB} ${text.toFixed(2)}`, // 格式化工资显示
      sorter: (a, b) => {
        if(a.grossSalary && b.grossSalary){
          return a.grossSalary - b.grossSalary}
          else return 0
      }
    },
    {
      title: locale.operate,
      key: "operate",
      fixed: "right",
      width: 150,
      render: (_, v) => (
        <Space size="middle">
          <a onClick={() => handleEdit(v)}>{locale.revise}</a>
          <Popconfirm title={locale.areSureDelete} okText={locale.confirm} cancelText={locale.cancel} onConfirm={() => handleDelete(v.staffId)}>
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
            <Form.Item name="departmentName" label={locale.department}>
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-between" style={{ height: 35 }}>
          <Col span={2} >
          <Button
                type="primary"
                style={{ marginRight: 5 }}
                onClick={handleAddStaff}
              >
                {locale.add}
              </Button>
          </Col>
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
                style={{ marginRight: 5 }}
                onClick={() => setsearch({})}
              >
                {locale.reset}
              </Button>
              {/* <Button
                type="primary"
                htmlType="reset"
                onClick={() => tablePrint()}
              >
                {locale.print}
              </Button> */}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider />
      <Table
        id="tablePrint"
        columns={columns}
        dataSource={tableData}
        rowKey="staffId"
        scroll={{ x: 1600 }}
        bordered
        loading={loadingStatus}
      ></Table>

      <Modal
        forceRender={true}
        title={ addEditStatus ? locale.add : locale.revise }
        open={editedRecord}
        onCancel={cancel}
        onOk={addEditStatus ? () => addStaff() : () => editStaff(rowData?.staffId)}
      >
        <Form form={form} initialValues={rowData} labelCol={{ span: 4 }} style={{ marginTop: 30 }} >
          <Form.Item label={locale.staffName} name="staffName" rules={[{ required: true, message: locale.pleaseInput }]}>
            <Input />
          </Form.Item>
          <Form.Item label={locale.jobNumber} name="jobNumber" rules={[{ required: true, message: locale.pleaseInput }]}>
            <Input readOnly={!addEditStatus} />
          </Form.Item>
          <Form.Item label={locale.department} name="departmentId" rules={[{ required: true, message: locale.pleaseInput }]}>
            <Select options={departmentSelect} />
          </Form.Item>
          <Form.Item label={locale.position} name="positionId" rules={[{ required: true, message: locale.pleaseInput }]}>
            <Select options={positionsSelect} />
          </Form.Item>
          <Form.Item label={locale.workplace} name="workplace" rules={[{ required: true, message: locale.pleaseInput }]}>
            <Input />
          </Form.Item>
          {/* <Form.Item label={locale.salary} name="salary">
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
}
