const SidebarContent = [
  {
    role: ['master', 'manager', 'reg_manager', 'project', 'technician'],
    icon: 'dashboard',
    name: 'DashBoard',
    key: '1',
    children: [],
    route: 'dashboard'
  },
  {
    icon: 'environment-o',
    name: 'Location Mgmt.',
    key: '2',
    role: ['master', 'manager', 'reg_manager'],
    route: '',
    children: [
      {
        role: ['master', 'manager', 'reg_manager'],
        icon: '',
        name: 'Customer',
        key: '3',
        route: 'customer'
      },
      {
        role: ['master', 'manager', 'reg_manager'],
        icon: '',
        name: 'Zone',
        key: '4',
        route: 'zone'
      },
      {
        role: ['master', 'manager', 'reg_manager'],
        icon: '',
        name: 'City',
        key: '5',
        route: 'city'
      },
      {
        role: ['master', 'manager', 'reg_manager'],
        icon: '',
        name: 'Store Locations',
        key: '6',
        route: 'storeLocations'
      }
    ]
  },
  {
    icon: 'bulb',
    name: 'Equipments',
    key: '7',
    role: ['master', 'manager', 'reg_manager'],
    route: '',
    children: [
      {
        role: ['master', 'manager', 'reg_manager'],
        icon: '',
        name: 'Equipments',
        key: '8',
        route: 'equipments'
      },
      {
        role: ['master', 'manager', 'reg_manager'],
        icon: '',
        name: 'Brands',
        key: '9',
        route: 'brands'
      },
      {
        role: ['master', 'manager', 'reg_manager'],
        icon: '',
        name: 'Models',
        key: '10',
        route: 'models'
      },
      {
        role: ['master', 'manager', 'reg_manager'],
        icon: '',
        name: 'Serial No',
        key: '11',
        route: 'serialNo'
      }
    ]
  },
  {
    role: ['master', 'manager', 'reg_manager', 'project', 'technician'],
    icon: 'tool',
    name: 'Work Order',
    key: '12',
    children: [],
    route: 'workOrder'
  },
  {
    role: ['master', 'manager', 'reg_manager'],
    icon: 'setting',
    name: 'Escalation Flow',
    key: '13',
    children: [],
    route: 'escalationFlow'
  },
  {
    role: ['master', 'manager', 'reg_manager', 'project', 'technician'],
    icon: 'wechat',
    name: 'Chat',
    key: '14',
    children: [],
    route: 'chat'
  },
  {
    role: ['master', 'manager', 'reg_manager'],
    icon: 'usergroup-add',
    name: 'Staff Management',
    key: '15',
    children: [],
    route: 'staffManagement'
  },
  {
    role: ['master', 'manager'],
    icon: 'area-chart',
    name: 'Reports',
    key: '16',
    children: [],
    route: 'reports'
  },
  {
    role: ['master', 'manager'],
    icon: 'tablet',
    name: 'Tablet Status',
    key: '17',
    children: [],
    route: 'tabletStatus'
  },
  {
    icon: 'lock',
    name: 'Master Updates',
    key: '18',
    role: ['master'],
    route: '',
    children: [
      {
        role: ['master'],
        icon: 'android',
        name: 'App',
        key: '19',
        route: 'app'
      },
      {
        role: ['master'],
        icon: 'mobile',
        name: 'Release Apk',
        key: '20',
        route: 'releaseApk'
      },
      {
        role: ['master'],
        icon: 'book',
        name: 'Release Notes',
        key: '21',
        route: 'releaseNotes'
      }
    ]
  },
  {
    icon: 'plus',
    name: 'More',
    key: '22',
    role: ['master', 'manager', 'reg_manager', 'project', 'technician'],
    route: '',
    children: [
      {
        role: ['master', 'manager', 'reg_manager', 'project', 'technician'],
        icon: 'notification',
        name: 'Whats New',
        key: '23',
        route: 'whatsNew'
      },
      {
        role: ['master', 'manager', 'reg_manager', 'project', 'technician'],
        icon: 'file-text',
        name: 'Privacy Policy',
        key: '24',
        route: 'privacypolicy'
      },
      {
        role: ['master', 'manager', 'reg_manager', 'project', 'technician'],
        icon: 'exception',
        name: 'Terms & Condition',
        key: '25',
        route: 'termscondition'
      }
    ]
  }
]
export default SidebarContent
