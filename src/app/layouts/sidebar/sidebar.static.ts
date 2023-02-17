
export const navigation: any[] = [
  {
    id: "analytics",
    title: "Analytics",
    type: "collapsable",
    icon: "dashboard",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "item",
        icon: 'dashboard',
        url: "/dashboard",
      },
      {
        id: "salesReport",
        title: "Sales Report",
        icon: "trending_up",
        type: "item",
        url: "/sales-report",
      },
    ],
  },
  {
    id: "event",
    title: "Event Management",
    type: "collapsable",
    icon: "event",
    children: [
      {
        id: "events",
        title: "Events",
        icon: 'event',
        type: "item",
        url: "/event",
      },
      {
        id: "discountCode",
        title: "Discount Codes",
        icon: "percent",
        type: "item",
        url: "/discount",
      },
      {
        id: "bookingHistory",
        title: "Booking History",
        icon: 'manage_history',
        type: "item",
        url: "/booking",
      },
    ],
  },
  {
    id: "user",
    title: "User Management",
    type: "collapsable",
    icon: "group",
    children: [
      {
        id: "staffs",
        title: "Staff",
        type: "item",
        icon: 'manage_accounts',
        url: "/staff-listing",
      },
      // {
      //   id: "member",
      //   title: "Member",
      //   type: "item",
      //   icon: "account_circle",
      //   url: "/members",
      // },
      {
        id: "customer",
        title: "Customers",
        type: "item",
        icon: 'supervisor_account',
        url: "/customer",
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    type: "collapsable",
    icon: "settings",
    children: [
      {
        id: "configurations",
        title: "Configurations",
        type: "item",
        icon: 'settings',
        url: "/configuration",
      },
      // {
      //   id: "tax",
      //   title: "Tax Management",
      //   type: "item",
      //   icon: "currency_rupee",
      //   url: "/tax",
      // },
      // {
      //   id: "notification",
      //   title: "Notification",
      //   type: "item",
      //   icon: "notifications_active",
      //   url: "/notification",
      // },
      // {
      //   id: "cms",
      //   title: "CMS",
      //   type: "item",
      //   icon: "description",
      //   url: "/cms",
      // },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    type: "collapsable",
    icon: "list_alt",
    children: [
      {
        id: " order",
        title: " Order History",
        icon: 'confirmation_number',
        type: "item",
        url: "/order",
      },
      // {
      //   id: "pay-out",
      //   title: "Pay Out",
      //   type: "item",
      //   url: "/pay-out",
      // },
    ],
  },
  // {
  //   id: "subscription",
  //   title: "Subscription",
  //   type: "collapsable",
  //   icon: "group",
  // }
];
