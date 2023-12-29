import { Table, Space, Popconfirm, Button, Form, Input, Modal, message } from "antd"
import { useEffect, useState } from 'react'
import { ColumnType } from "antd/lib/table";

import { getDepartment, getPositions, updatePosition, updateDepartment, addPositions, addDeparts, deleteDepart, deletePosition } from '@/api/server'
import locale from "@/assets/locale";
import styles from './index.module.scss'

interface departType {
  departmentId?: number,
  departmentName?: string,
}

interface positionType {
  positionId?: number,
  positionName?: string,
}






/* const positioncolumns: ColumnType<positionType>[] = [
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
]; */

export default function DepartManage() {
  const [departData, setDepartData] = useState<departType[]>([])
  const [rowData, setRowData] = useState<departType>();
  const [addEditStatus,setAddEditStatus] = useState<boolean>(false)
  const [editedRecord, setEditedRecord] = useState<boolean>(false);

  const [positionData, setPositionData] = useState<positionType[]>([])
  const [rowPositionData, setRowPositionData] = useState<positionType>();
  const [addPositionEditStatus,setAddPositionEditStatus] = useState<boolean>(false)
  const [editedPositionRecord, setEditedPositionRecord] = useState<boolean>(false);
  
  const [form] = Form.useForm();
  const [positionform] = Form.useForm();
  useEffect(() => {
    getDepartment().then((res) => {
      setDepartData(res.data)
    })
    getPositions().then((res) => {
      setPositionData(res.data)
    })
  }, [editedRecord,editedPositionRecord]);

  const cancel = () => {
    setEditedRecord(false);
  };

  const handleDelete = (v?: number) => {
    const params = {
      departmentId: v
    }
    console.log(params)
    deleteDepart(params).then((res) => {
      console.log(res);
      message.success(locale.deleteSuccess)
      setDepartData(departData?.filter((item: departType) => item.departmentId !== v))
    })
  }
  const handleEdit = (v: departType) => {
    setAddEditStatus(false);
    setRowData(v);
    form.setFieldsValue(v);
    setEditedRecord(true);
  }
  const handleAddDepart = () => {
    setAddEditStatus(true);
    const v: departType = {
      departmentId: undefined,
      departmentName: undefined,
    }
    setRowData(v);
    form.setFieldsValue(v);
    setEditedRecord(true);
  }
  const addDepart = () => {
    form
      .validateFields()
      .then((values) => {
        addDeparts(values).then((res) => {
          console.log(res)
          setEditedRecord(false);
          message.success(locale.addSuccess)
        })
        console.log(values)
      })
      .catch((info) => {
        console.log(info);
      });
  }
  const editDepart = (departmentId?: number) => {
    form
      .validateFields()
      .then((values) => {
        values.departmentId = departmentId
        updateDepartment(values).then((res) => {
          console.log(res);
        })
        console.log(values)
        const newArray = departData?.map((item: departType) => (item.departmentId === values.departmentId ? values : item));
        setDepartData(newArray)
        message.success(locale.editSuccess)
        setEditedRecord(false)
      })
      .catch((info) => {
        console.log(info);
      });
  }

  const positioncancel = () => {
    setEditedPositionRecord(false);
  };
  const handlePositionEdit = (v:positionType) => {
    setAddPositionEditStatus(false);
    setRowPositionData(v);
    positionform.setFieldsValue(v);
    setEditedPositionRecord(true);
  }
  const handleAddPosition = () => {
    setAddPositionEditStatus(true);
    const v: positionType = {
      positionId: undefined,
      positionName: undefined,
    }
    setRowPositionData(v);
    positionform.setFieldsValue(v);
    setEditedPositionRecord(true);
  }
  const handlePositionDelete = (v?: number) => {
    const params = {
      positionId: v
    }
    console.log(params)
    deletePosition(params).then((res) => {
      console.log(res);
      message.success(locale.deleteSuccess)
      setPositionData(positionData?.filter((item: positionType) => item.positionId !== v))
    }).catch((error) => {
      console.log(error)
    })
  }
  const addPosition = () => {
    positionform
      .validateFields()
      .then((values) => {
        addPositions(values).then((res) => {
          console.log(res)
          setEditedPositionRecord(false);
          message.success(locale.addSuccess)
        })
        console.log(values)
      })
      .catch((info) => {
        console.log(info);
      });
  }
  const editPositon = (positionId?: number) => {
    positionform
      .validateFields()
      .then((values) => {
        values.positionId = positionId
        updatePosition(values).then((res) => {
          console.log(res);
        })
        console.log(values)
        const newArray = positionData?.map((item: positionType) => (item.positionId === values.positionId ? values : item));
        setPositionData(newArray)
        message.success(locale.editSuccess)
        setEditedPositionRecord(false)
      })
      .catch((info) => {
        console.log(info);
      });
  }


  const departcolumns: ColumnType<departType>[] = [
    {
      title: locale.departmentName,
      width: 200,
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: locale.operate,
      key: "operate",
      fixed: "right",
      width: 150,
      render: (_,v) => (
        <Space size="middle">
          <a onClick={() => handleEdit(v)} >{locale.revise}</a>
          <Popconfirm title={locale.areSureDelete} okText={locale.confirm} cancelText={locale.cancel} onConfirm={() => handleDelete(v.departmentId)}>
            <a>{locale.delete}</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const poitioncolumns: ColumnType<positionType>[] = [
    {
      title: locale.departmentName,
      width: 200,
      dataIndex: "positionName",
      key: "positionName",
    },
    {
      title: locale.operate,
      key: "operate",
      fixed: "right",
      width: 150,
      render: (_,v) => (
        <Space size="middle">
          <a onClick={() => handlePositionEdit(v)} >{locale.revise}</a>
          <Popconfirm title={locale.areSureDelete} okText={locale.confirm} cancelText={locale.cancel} onConfirm={() => handlePositionDelete(v.positionId)}>
            <a>{locale.delete}</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className={styles.tables}>
      <div className={styles.departTable}>
        <Button onClick={handleAddDepart} >{locale.add}</Button>
        <Table
          columns={departcolumns}
          dataSource={departData}
          rowKey="departmentId"
        ></Table>
      </div>
      <div className={styles.positionTable}>
      <Button onClick={handleAddPosition} >{locale.add}</Button>
        <Table
          rowKey="positionId"
          columns={poitioncolumns}
          dataSource={positionData}
        ></Table>
      </div>
      <Modal
        forceRender={true}
        title={ addEditStatus ? locale.add : locale.revise }
        open={editedRecord}
        onCancel={cancel}
        onOk={addEditStatus ? () => addDepart() : () => editDepart(rowData?.departmentId)}
      >
        <Form form={form} initialValues={rowData} labelCol={{ span: 4 }} style={{ marginTop: 30 }} >
          <Form.Item label={locale.departmentName} name="departmentName" rules={[{ required: true, message: locale.pleaseInput }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        forceRender={true}
        title={ addPositionEditStatus ? locale.add : locale.revise }
        open={editedPositionRecord}
        onCancel={positioncancel}
        onOk={addPositionEditStatus ? () => addPosition() : () => editPositon(rowPositionData?.positionId)}
      >
        <Form form={positionform} initialValues={rowPositionData} labelCol={{ span: 4 }} style={{ marginTop: 30 }} >
          <Form.Item label={locale.positionName} name="positionName" rules={[{ required: true, message: locale.pleaseInput }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
