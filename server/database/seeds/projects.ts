import { db } from '../index'
import { projects, type InsertProject } from '../schema/project'

export const projectData: InsertProject[] = [
  {
    projectCode: 'sample-project',
    category: 'Web Development',
    title: 'Auto E-Shop',
    subtitle: 'Full-Stack Shopping Application',
    contents: [
      `![Screenshot](/images/projects/sample-project/sample-project_main.jpg|top)

## {primary|w600:Project Overview:} {accent|w600:Building} {primary|w600:a Modern} {accent|w600:Shopping Experience}

This comprehensive e-commerce platform was built to provide a seamless shopping experience for both customers and administrators. The application features a modern, responsive design with advanced functionality including real-time inventory management, secure payment processing, and detailed analytics.`,

      `## {accent|w600:Key Features} {primary|w600:and Functionality}

![Screenshot](/images/projects/sample-project/sample-project_home.jpg|right)

- User authentication and authorization system with role-based access control
- Product catalog with advanced search, filtering, and sorting capabilities
- Shopping cart with persistent storage and checkout flow
- Secure payment integration with Stripe for credit card processing
- Order management system with real-time status updates
- Admin dashboard for inventory management and sales analytics
- Responsive design optimized for desktop, tablet, and mobile devices`,

      `## {primary|w600:Technical Implementation}

![Screenshot](/images/projects/sample-project/sample-project_product.jpg|left)

The platform was built using a modern tech stack with **React.js** for the frontend, **Node.js** with **Express** for the backend API, and **MongoDB** for data storage. The application implements RESTful API design principles and includes comprehensive error handling and validation.`,
    ],
    isActive: true,
    displayTheme: 'theatre--dark',
    photos: {
      background: '/images/projects/sample-project/sample-project_bg.jpg',
      titlecard: '/images/projects/sample-project/sample-project_main.jpg',
    },
    skills: {
      icons: ['react', 'nodejs', 'mongodb', 'stripe'],
    },
    links: [
      {
        type: 'link',
        label: 'Live Demo',
        path: 'https://ecommerce-demo.alexjohnson.dev',
        icon: 'external-link',
      },
      {
        type: 'link',
        label: 'GitHub',
        path: 'https://github.com/alexjohnsondev/ecommerce-platform',
        icon: 'github',
      },
    ],
  },
]

export async function seedProjects() {
  console.log('🌱 Seeding projects...')
  await db.insert(projects).values(projectData)
  console.log('✅ Projects seeded successfully')
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  await seedProjects()
  process.exit(0)
}
