import * as FiIcons from 'react-icons/fi';

const { 
  FiClock, FiShield, FiPackage, FiUsers, FiAlertTriangle, FiSettings, 
  FiTruck, FiDollarSign, FiSun, FiMoon, FiCoffee, FiShoppingCart 
} = FiIcons;

export const sopTemplates = [
  {
    id: 'store-opening',
    title: 'Store Opening Procedures',
    category: 'Daily Operations',
    description: 'Complete checklist for opening the store each day, including safety checks, equipment startup, and preparation procedures.',
    estimatedTime: 30,
    difficulty: 'Beginner',
    icon: FiSun,
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    steps: [
      {
        id: 'step-1',
        title: 'Disarm Security System',
        description: 'Enter the store through the designated entrance and disarm the security system using the provided code. Check for any overnight alerts.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-2',
        title: 'Turn On Lights and Equipment',
        description: 'Turn on all interior and exterior lights. Start up refrigeration units, coffee machines, hot food equipment, and POS systems.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-3',
        title: 'Check Temperature Logs',
        description: 'Verify that all refrigeration units maintained proper temperatures overnight. Record temperatures and note any discrepancies.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-4',
        title: 'Inspect Store Condition',
        description: 'Walk through the store to check for any damage, spills, or security issues. Verify that all products are properly displayed.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-5',
        title: 'Prepare Cash Register',
        description: 'Count and verify opening cash drawer amounts. Ensure receipt paper is loaded and credit card terminals are functioning.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-6',
        title: 'Check Delivery Area',
        description: 'Inspect the delivery area for any overnight deliveries. Verify delivery contents against invoices and store appropriately.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      }
    ],
    safetyConsiderations: [
      'Always enter through the designated entrance',
      'Check for any signs of break-in or tampering',
      'Ensure all equipment is functioning properly before opening',
      'Verify emergency exits are clear and accessible'
    ],
    requiredMaterials: [
      'Store keys and security codes',
      'Temperature log sheets',
      'Opening cash amounts',
      'Delivery invoices and clipboards'
    ],
    qualityCheckpoints: [
      'All lights and equipment operational',
      'Temperature logs completed accurately',
      'Cash register balanced and ready',
      'Store clean and properly merchandised'
    ],
    notes: 'Complete all steps before unlocking doors for customers. Report any issues immediately to management.'
  },
  {
    id: 'store-closing',
    title: 'Store Closing Procedures',
    category: 'Daily Operations',
    description: 'End-of-day procedures to secure the store, complete financial reconciliation, and prepare for the next business day.',
    estimatedTime: 45,
    difficulty: 'Beginner',
    icon: FiMoon,
    color: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    steps: [
      {
        id: 'step-1',
        title: 'Complete Final Sales',
        description: 'Serve all remaining customers and complete any pending transactions. Turn off promotional displays and "Open" signs.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-2',
        title: 'Secure Cash Register',
        description: 'Count cash drawer contents, complete daily sales reports, and prepare bank deposits. Lock cash in safe according to procedures.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-3',
        title: 'Clean and Restock',
        description: 'Clean all surfaces, restock shelves, and prepare hot food areas for the next day. Empty trash and replace liners.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-4',
        title: 'Equipment Shutdown',
        description: 'Turn off non-essential equipment following proper shutdown procedures. Leave refrigeration units running.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-5',
        title: 'Final Security Check',
        description: 'Check all doors and windows are locked. Verify that all areas are secure and no one remains in the building.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-6',
        title: 'Arm Security System',
        description: 'Set the security system and exit through the designated door. Verify the system is properly armed.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      }
    ],
    safetyConsiderations: [
      'Never leave cash registers unattended during closing',
      'Ensure all customers have left before locking doors',
      'Check that all equipment is properly shut down',
      'Verify security system is armed before leaving'
    ],
    requiredMaterials: [
      'Cash counting sheets',
      'Deposit bags and bank slips',
      'Cleaning supplies',
      'Security system codes'
    ],
    qualityCheckpoints: [
      'All cash properly counted and secured',
      'Store clean and organized',
      'All equipment properly shut down',
      'Security system armed and functional'
    ],
    notes: 'Follow all steps in order. Report any discrepancies or issues to management immediately.'
  },
  {
    id: 'cash-register-operation',
    title: 'Cash Register Operations',
    category: 'Daily Operations',
    description: 'Complete guide for operating the point-of-sale system, handling transactions, and managing cash drawer.',
    estimatedTime: 20,
    difficulty: 'Beginner',
    icon: FiDollarSign,
    color: 'bg-green-100',
    iconColor: 'text-green-600',
    steps: [
      {
        id: 'step-1',
        title: 'System Login',
        description: 'Log into the POS system using your assigned user ID and password. Verify that the system is functioning properly.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-2',
        title: 'Verify Opening Balance',
        description: 'Count cash drawer contents and verify against the opening balance report. Report any discrepancies immediately.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-3',
        title: 'Process Sales Transactions',
        description: 'Scan or manually enter product codes. Apply discounts if applicable. Process payment method (cash, card, etc.).',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-4',
        title: 'Handle Returns and Exchanges',
        description: 'Verify receipt for returns. Check product condition. Process refund or exchange according to store policy.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-5',
        title: 'Manage Cash Drawer',
        description: 'Keep cash organized by denomination. Perform cash drops when drawer exceeds maximum amount.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      }
    ],
    safetyConsiderations: [
      'Never leave cash drawer open and unattended',
      'Verify large bills for authenticity',
      'Keep cash drawer organized and secure',
      'Report any suspicious transactions immediately'
    ],
    requiredMaterials: [
      'POS system login credentials',
      'Cash counting sheets',
      'Counterfeit detection pen',
      'Receipt paper and bags'
    ],
    qualityCheckpoints: [
      'All transactions processed accurately',
      'Cash drawer balanced throughout shift',
      'Customer receipts provided',
      'System properly logged out at end of shift'
    ],
    notes: 'Always provide excellent customer service while maintaining security procedures.'
  },
  {
    id: 'inventory-management',
    title: 'Inventory Management',
    category: 'Inventory Management',
    description: 'Procedures for receiving, tracking, and managing store inventory including stock rotation and ordering.',
    estimatedTime: 60,
    difficulty: 'Intermediate',
    icon: FiPackage,
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
    steps: [
      {
        id: 'step-1',
        title: 'Receive Deliveries',
        description: 'Check delivery contents against invoice. Verify product condition and expiration dates. Sign for accepted deliveries.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-2',
        title: 'Update Inventory System',
        description: 'Enter received products into inventory management system. Update quantities and note any discrepancies.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-3',
        title: 'Stock Rotation (FIFO)',
        description: 'Rotate products using First In, First Out method. Place new stock behind existing products with earlier expiration dates.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-4',
        title: 'Check Expiration Dates',
        description: 'Regularly inspect products for expiration dates. Remove expired items immediately and document waste.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-5',
        title: 'Monitor Stock Levels',
        description: 'Check inventory levels against minimum stock requirements. Create reorder lists for low-stock items.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      }
    ],
    safetyConsiderations: [
      'Use proper lifting techniques for heavy items',
      'Check for damaged packaging that could cause injury',
      'Dispose of expired products according to regulations',
      'Keep aisles clear during restocking'
    ],
    requiredMaterials: [
      'Inventory management system access',
      'Delivery invoices and clipboards',
      'Date labels and markers',
      'Waste log sheets'
    ],
    qualityCheckpoints: [
      'All deliveries properly received and documented',
      'Inventory system accurately updated',
      'Proper stock rotation maintained',
      'Expired products removed and documented'
    ],
    notes: 'Maintain accurate records for all inventory transactions. Report any unusual discrepancies to management.'
  },
  {
    id: 'customer-service',
    title: 'Customer Service Standards',
    category: 'Customer Service',
    description: 'Guidelines for providing exceptional customer service, handling complaints, and creating positive customer experiences.',
    estimatedTime: 15,
    difficulty: 'Beginner',
    icon: FiUsers,
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
    steps: [
      {
        id: 'step-1',
        title: 'Greet Customers',
        description: 'Acknowledge customers within 10 seconds of entry. Make eye contact and offer a friendly greeting.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-2',
        title: 'Provide Assistance',
        description: 'Offer help finding products or answering questions. Be knowledgeable about store layout and product information.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-3',
        title: 'Handle Complaints',
        description: 'Listen actively to customer concerns. Apologize for any inconvenience and work to find a solution.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-4',
        title: 'Process Transactions Efficiently',
        description: 'Handle checkout quickly and accurately. Offer bags and receipt. Thank customer for their business.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-5',
        title: 'Follow Up',
        description: 'Ensure customer satisfaction before they leave. Invite them to return and ask if they need anything else.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      }
    ],
    safetyConsiderations: [
      'Maintain awareness of surroundings during customer interactions',
      'Follow company policies for handling difficult situations',
      'Know when to involve management or security',
      'Keep personal information confidential'
    ],
    requiredMaterials: [
      'Product knowledge reference guides',
      'Customer complaint forms',
      'Store policy handbook',
      'Manager contact information'
    ],
    qualityCheckpoints: [
      'All customers greeted promptly',
      'Complaints handled professionally',
      'Transactions processed efficiently',
      'Customer satisfaction maintained'
    ],
    notes: 'Remember that every customer interaction reflects on the store. Always strive to exceed expectations.'
  },
  {
    id: 'emergency-procedures',
    title: 'Emergency Response Procedures',
    category: 'Emergency Procedures',
    description: 'Critical procedures for handling various emergency situations including medical emergencies, fires, and security threats.',
    estimatedTime: 10,
    difficulty: 'Advanced',
    icon: FiAlertTriangle,
    color: 'bg-red-100',
    iconColor: 'text-red-600',
    steps: [
      {
        id: 'step-1',
        title: 'Assess the Situation',
        description: 'Quickly evaluate the type and severity of emergency. Ensure your own safety first before helping others.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-2',
        title: 'Call Emergency Services',
        description: 'Dial 911 for medical emergencies, fires, or security threats. Provide clear location and situation details.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-3',
        title: 'Secure the Area',
        description: 'Clear customers and staff from immediate danger. Block access to hazardous areas if safe to do so.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-4',
        title: 'Notify Management',
        description: 'Contact store manager or district manager immediately. Provide situation update and follow their instructions.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-5',
        title: 'Document the Incident',
        description: 'Complete incident report forms with all relevant details. Include witness information and photos if safe to take.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      }
    ],
    safetyConsiderations: [
      'Personal safety is the top priority',
      'Never attempt to handle situations beyond your training',
      'Know the location of all emergency equipment',
      'Follow company emergency protocols exactly'
    ],
    requiredMaterials: [
      'Emergency contact phone numbers',
      'First aid kit and fire extinguisher locations',
      'Incident report forms',
      'Emergency evacuation plan'
    ],
    qualityCheckpoints: [
      'Emergency services contacted promptly',
      'Area secured and people evacuated safely',
      'Management notified immediately',
      'Complete incident documentation'
    ],
    notes: 'Regular emergency drills help ensure proper response. Report any safety hazards immediately.'
  },
  {
    id: 'coffee-station-maintenance',
    title: 'Coffee Station Maintenance',
    category: 'Equipment Operation',
    description: 'Daily maintenance procedures for coffee machines, grinders, and related equipment to ensure quality and safety.',
    estimatedTime: 25,
    difficulty: 'Intermediate',
    icon: FiCoffee,
    color: 'bg-orange-100',
    iconColor: 'text-orange-600',
    steps: [
      {
        id: 'step-1',
        title: 'Clean Coffee Machines',
        description: 'Clean external surfaces and drip trays. Replace water filters and descale according to schedule.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-2',
        title: 'Check Coffee Quality',
        description: 'Test brew temperature and taste. Adjust grind settings if necessary. Replace coffee if quality is poor.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-3',
        title: 'Restock Supplies',
        description: 'Refill coffee beans, cups, lids, and stirrers. Check expiration dates on creamers and sweeteners.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-4',
        title: 'Sanitize Work Area',
        description: 'Clean and sanitize all surfaces, dispensers, and utensils. Replace cleaning cloths regularly.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      }
    ],
    safetyConsiderations: [
      'Be careful of hot surfaces and liquids',
      'Use proper cleaning chemicals only',
      'Ensure electrical safety during cleaning',
      'Follow food safety guidelines'
    ],
    requiredMaterials: [
      'Food-safe cleaning supplies',
      'Coffee beans and filters',
      'Cups, lids, and accessories',
      'Maintenance log sheets'
    ],
    qualityCheckpoints: [
      'Coffee machines clean and functioning',
      'Coffee quality meets standards',
      'All supplies adequately stocked',
      'Work area sanitized'
    ],
    notes: 'Regular maintenance ensures consistent coffee quality and customer satisfaction.'
  },
  {
    id: 'delivery-receiving',
    title: 'Delivery Receiving Process',
    category: 'Inventory Management',
    description: 'Step-by-step process for receiving and processing vendor deliveries, including verification and documentation.',
    estimatedTime: 40,
    difficulty: 'Intermediate',
    icon: FiTruck,
    color: 'bg-teal-100',
    iconColor: 'text-teal-600',
    steps: [
      {
        id: 'step-1',
        title: 'Prepare Receiving Area',
        description: 'Clear receiving area of obstacles. Have invoices, clipboard, and pen ready. Ensure adequate lighting.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-2',
        title: 'Verify Delivery Details',
        description: 'Check delivery truck and driver credentials. Verify delivery address and expected delivery time.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-3',
        title: 'Inspect Products',
        description: 'Check each item against invoice. Verify quantities, product codes, and condition. Note any damage or discrepancies.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-4',
        title: 'Temperature Check',
        description: 'Verify temperature of refrigerated and frozen items. Reject products that are outside safe temperature ranges.',
        isWarning: true,
        hasImage: false,
        imageUrl: ''
      },
      {
        id: 'step-5',
        title: 'Complete Documentation',
        description: 'Sign delivery receipt only after verification. Note any issues or rejected items. File copies appropriately.',
        isWarning: false,
        hasImage: false,
        imageUrl: ''
      }
    ],
    safetyConsiderations: [
      'Use proper lifting techniques',
      'Check for damaged packaging',
      'Verify driver identification',
      'Maintain cold chain for perishables'
    ],
    requiredMaterials: [
      'Delivery invoices and clipboards',
      'Thermometer for temperature checks',
      'Dolly or cart for heavy items',
      'Receiving log sheets'
    ],
    qualityCheckpoints: [
      'All items verified against invoice',
      'Temperature requirements met',
      'Damaged items documented',
      'Delivery receipt properly completed'
    ],
    notes: 'Never accept damaged or improperly stored products. Document all issues immediately.'
  }
];