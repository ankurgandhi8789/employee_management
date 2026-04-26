const employees = [
  {
    "id": 1,
    "email": "employee1@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Prepare Report",
        "description": "Prepare monthly financial report",
        "date": "2025-10-01",
        "category": "Finance",
        "active": true,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Client Meeting",
        "description": "Discuss project scope with client",
        "date": "2025-10-03",
        "category": "Management",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Update Website",
        "description": "Update the landing page content",
        "date": "2025-10-02",
        "category": "IT",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ]
  },
  {
    "id": 2,
    "email": "employee2@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Code Review",
        "description": "Review pull requests in GitHub",
        "date": "2025-10-01",
        "category": "IT",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Team Meeting",
        "description": "Weekly team sync-up",
        "date": "2025-10-02",
        "category": "Management",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      }
    ]
  },
  {
    "id": 3,
    "email": "employee3@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Database Backup",
        "description": "Backup production database",
        "date": "2025-10-01",
        "category": "IT",
        "active": true,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Prepare Presentation",
        "description": "Prepare slides for project review",
        "date": "2025-10-03",
        "category": "Management",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Email Cleanup",
        "description": "Organize inbox and delete old emails",
        "date": "2025-10-02",
        "category": "Admin",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ]
  },
  {
    "id": 4,
    "email": "employee4@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Update Inventory",
        "description": "Update stock levels in ERP",
        "date": "2025-10-01",
        "category": "Operations",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Client Follow-up",
        "description": "Follow-up with client on pending invoices",
        "date": "2025-10-02",
        "category": "Finance",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      }
    ]
  },
  {
    "id": 5,
    "email": "employee5@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "System Maintenance",
        "description": "Perform routine system maintenance",
        "date": "2025-10-01",
        "category": "IT",
        "active": true,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Client Documentation",
        "description": "Prepare documentation for client project",
        "date": "2025-10-03",
        "category": "Management",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Training Session",
        "description": "Attend cybersecurity training",
        "date": "2025-10-02",
        "category": "HR",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ]
  }
];

const admin = [
  {
    "id": 1,
    "email": "admin@example.com",
    "password": "123",
  }
];

export const setLocalStorage =()=>{
    localStorage.setItem('employees',JSON.stringify(employees))
    localStorage.setItem('admin',JSON.stringify(admin))
}
export const getLocalStorage = ()=>{
    const employees = JSON.parse(localStorage.getItem('employees'))
    const admin = JSON.parse(localStorage.getItem('admin'))
    // console.log(employees, admin);
    return {employees,admin};
}