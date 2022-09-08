import "antd/dist/antd.css";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id:1,
      fixture: "UB",
      rdno: "2",
      date: "10/10/2021"
    }
  ]);
  const columns = [
    {
      key: "1",
      title: "Fixture",
      dataIndex: "fixture",
    },
    {
      key: "2",
      title: "Rd No.",
      dataIndex: "rdno",
    },
    {
      key: "3",
      title: "Date",
      dataIndex: "date",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random()*10)+1;
    const newStudent = {
      id: parseInt(Math.random() * 10000),
      fixture: "UB",
      rdno: randomNumber,
      date: randomNumber + "/" + (randomNumber+1) + "/2021",
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddStudent}>Add a new Student</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingStudent?.rdno}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, rdno: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.date}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, date: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default App;
