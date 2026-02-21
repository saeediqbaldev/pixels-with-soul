import project1 from "@/assets/project-1.webp";
import project2 from "@/assets/project-2.webp";
import project3 from "@/assets/project-3.webp";
import project4 from "@/assets/project-4.webp";

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  image: string;
  url: string;
  info: string;
  problem: string;
  research: string;
  development: string;
  outcomes: string;
  stats: { label: string; value: string }[];
  tools: string[];
}

export const projects: ProjectData[] = [
  {
    id: "cameronpink-job-listing",
    title: "Cameronpink Job Listing",
    category: "Job Platform",
    image: project4,
    url: "https://cameronpink.com",
    info: "A modern job listing platform with advanced filtering, responsive design and seamless employer dashboards.",
    problem: "Cameronpink needed a modern job listing platform that could handle thousands of listings while providing employers with intuitive dashboards and job seekers with powerful search & filter capabilities. The existing system was slow, outdated, and had poor mobile experience resulting in a 65% bounce rate on mobile devices.",
    research: "We conducted extensive UX research including user interviews with both employers and job seekers, analyzed competitor platforms, and studied conversion funnels. Key findings revealed that users wanted faster search, better filtering, saved job alerts, and a streamlined application process. We also benchmarked performance metrics across industry leaders.",
    development: "Built with React and Tailwind CSS for a fast, responsive frontend. Implemented advanced filtering with real-time search, employer dashboard with analytics, and a candidate tracking system. Used lazy loading and code splitting to achieve sub-2-second load times. Integrated email notifications for job alerts and application status updates.",
    outcomes: "The new platform reduced bounce rate by 45%, increased employer sign-ups by 120%, and improved the average session duration by 3x. Job applications per listing increased by 80%, and the platform now handles 10,000+ daily active users with 99.9% uptime.",
    stats: [
      { label: "Bounce Rate Reduction", value: "45%" },
      { label: "Employer Sign-ups", value: "+120%" },
      { label: "Daily Active Users", value: "10K+" },
      { label: "Uptime", value: "99.9%" },
    ],
    tools: ["React", "Tailwind CSS", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    id: "dnb-music-academy",
    title: "DNB Music Academy",
    category: "Education",
    image: project2,
    url: "https://dnbacademy.net",
    info: "Full-featured music education platform with course enrollment, student portals, and integrated payment systems.",
    problem: "DNB Music Academy was running entirely offline with manual enrollment processes and paper-based tracking. They needed a digital platform that could handle course enrollment, payment processing, student progress tracking, and content delivery — all while maintaining the personal touch that made their academy special.",
    research: "We studied top education platforms like Coursera and Udemy, interviewed 30+ students and 8 instructors, and mapped the entire enrollment-to-graduation journey. Research showed that students wanted mobile-friendly lessons, progress visualization, and community features. Instructors needed easy content upload and student performance analytics.",
    development: "Developed a custom LMS with video streaming, progress tracking dashboards, and an integrated payment gateway. Built a student portal with course materials, practice schedules, and certificate generation. Implemented a real-time notification system and community discussion boards. Mobile-responsive design ensures learning on any device.",
    outcomes: "Online enrollment increased by 300% in the first quarter. Student completion rates improved from 40% to 78%. Revenue grew 250% due to the ability to offer courses globally. The platform now serves students from 15+ countries.",
    stats: [
      { label: "Enrollment Increase", value: "300%" },
      { label: "Completion Rate", value: "78%" },
      { label: "Revenue Growth", value: "250%" },
      { label: "Countries Served", value: "15+" },
    ],
    tools: ["React", "Next.js", "Stripe", "Supabase", "Cloudflare"],
  },
  {
    id: "mini-perfumesps-store",
    title: "Mini Perfumesps Store",
    category: "E-Commerce",
    image: project3,
    url: "https://miniperfumesps.com",
    info: "High-converting e-commerce store with product galleries, cart system, and secure checkout integration.",
    problem: "Mini Perfumesps was selling through social media DMs with no proper storefront. They were losing potential customers due to lack of product showcase, no payment gateway, and manual order tracking. They needed a professional e-commerce presence that could scale with their growing brand.",
    research: "Analyzed 20+ successful perfume e-commerce stores, studied buyer psychology in the fragrance market, and mapped the customer journey from discovery to purchase. Found that high-quality imagery, scent descriptions, customer reviews, and easy reordering were the most critical conversion factors.",
    development: "Built a visually stunning storefront with immersive product galleries, zoom features, and scent profile descriptions. Integrated a robust cart system with guest checkout, multiple payment methods, and real-time inventory management. Added customer reviews, wishlists, and a personalized recommendation engine based on purchase history.",
    outcomes: "Launched to 2x projected first-month sales. Cart abandonment dropped from 78% to 35%. Average order value increased by 40% through cross-selling and upselling features. The store now processes 500+ orders monthly with fully automated fulfillment.",
    stats: [
      { label: "First Month Sales", value: "2x Target" },
      { label: "Cart Abandonment", value: "-55%" },
      { label: "Avg Order Value", value: "+40%" },
      { label: "Monthly Orders", value: "500+" },
    ],
    tools: ["Shopify", "React", "Tailwind CSS", "Stripe", "Cloudinary"],
  },
  {
    id: "ecoliquidators",
    title: "EcoLiquidators",
    category: "Business",
    image: project1,
    url: "https://ecoliquidators.com",
    info: "Corporate business website with inventory management, quote request systems, and optimized SEO.",
    problem: "EcoLiquidators had an outdated WordPress site that ranked poorly in search, had no quote request system, and couldn't showcase their massive rotating inventory. They needed a professional site that would rank for competitive keywords and streamline their quote-to-sale pipeline.",
    research: "Performed comprehensive SEO audit revealing critical issues: slow load times (8s+), no structured data, poor mobile experience. Competitive analysis showed major opportunities in local SEO and long-tail keywords. Stakeholder interviews revealed the quote request system was the #1 priority for sales conversion.",
    development: "Rebuilt the site with modern React architecture for speed. Implemented a dynamic inventory showcase with real-time filtering, a multi-step quote request form with file uploads, and comprehensive SEO optimization including schema markup, optimized meta tags, and a blog for content marketing. Added an admin panel for inventory management.",
    outcomes: "Organic traffic increased 400% within 6 months. Quote requests went from 5/week to 30+/week. Page load time dropped from 8s to 1.5s. The site now ranks on page 1 for 25+ target keywords and generates 60% of all new business leads.",
    stats: [
      { label: "Organic Traffic", value: "+400%" },
      { label: "Weekly Quotes", value: "30+" },
      { label: "Load Time", value: "1.5s" },
      { label: "Page 1 Keywords", value: "25+" },
    ],
    tools: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Cloudflare"],
  },
  {
    id: "cameronpink-redesign",
    title: "Cameronpink Redesign",
    category: "Job Platform",
    image: project4,
    url: "https://cameronpink.com",
    info: "Complete UI/UX overhaul with improved accessibility, faster load times, and mobile-first approach.",
    problem: "After the initial launch success, Cameronpink needed a complete UI/UX refresh to address accessibility concerns, improve mobile performance, and modernize the visual design. User feedback indicated navigation confusion and difficulty with the application process on smaller screens.",
    research: "Conducted accessibility audits using WAVE and axe tools, ran usability testing sessions with 15 users across different devices, and analyzed heatmaps and session recordings. Identified 40+ accessibility violations and multiple UX friction points in the mobile application flow.",
    development: "Redesigned the entire interface with a mobile-first approach, achieving WCAG 2.1 AA compliance. Implemented a new design system with improved typography, color contrast, and component consistency. Rebuilt the navigation with predictive search and streamlined the application flow from 5 steps to 3.",
    outcomes: "Accessibility score improved from 62 to 98. Mobile conversions increased by 85%. Average task completion time decreased by 40%. The redesign won a regional web design award and set a new standard for job platform interfaces.",
    stats: [
      { label: "Accessibility Score", value: "98/100" },
      { label: "Mobile Conversions", value: "+85%" },
      { label: "Task Completion", value: "-40% time" },
      { label: "Design Award", value: "Winner" },
    ],
    tools: ["React", "Tailwind CSS", "Figma", "Storybook", "Lighthouse"],
  },
  {
    id: "dnb-academy-pro",
    title: "DNB Academy Pro",
    category: "Education",
    image: project2,
    url: "https://dnbacademy.net",
    info: "Premium tier with live streaming classes, progress tracking dashboards, and community features.",
    problem: "Building on the success of the initial platform, DNB Academy wanted to launch a premium tier with live classes, advanced analytics for instructors, and a thriving student community. The challenge was integrating real-time streaming without compromising the existing platform's stability.",
    research: "Benchmarked live streaming solutions (WebRTC, HLS, RTMP), studied community engagement patterns on Discord and Slack, and surveyed existing students about premium features they'd pay for. Found that live Q&A, peer collaboration, and instructor office hours were the top-requested features.",
    development: "Integrated low-latency live streaming with interactive features (polls, Q&A, screen sharing). Built comprehensive analytics dashboards for instructors showing student engagement, completion rates, and assessment scores. Created community spaces with discussion threads, peer reviews, and collaborative projects.",
    outcomes: "Premium tier achieved 35% conversion rate from free users. Live class attendance averaged 85%. Instructor satisfaction score reached 4.8/5. Monthly recurring revenue increased by 180%, making the academy financially self-sustaining.",
    stats: [
      { label: "Premium Conversion", value: "35%" },
      { label: "Class Attendance", value: "85%" },
      { label: "Instructor Rating", value: "4.8/5" },
      { label: "MRR Growth", value: "+180%" },
    ],
    tools: ["React", "WebRTC", "Socket.io", "AWS", "Stripe"],
  },
  {
    id: "mini-perfumes-global",
    title: "Mini Perfumes Global",
    category: "E-Commerce",
    image: project3,
    url: "https://miniperfumesps.com",
    info: "International expansion with multi-currency support, localized content, and global shipping integration.",
    problem: "Following domestic success, Mini Perfumesps wanted to expand internationally. The existing store couldn't handle multiple currencies, languages, or international shipping logistics. Tax compliance and regional payment preferences added further complexity.",
    research: "Analyzed international e-commerce best practices, studied regional payment preferences (credit cards vs. digital wallets vs. COD), and researched shipping partners for 20+ countries. Customer surveys revealed that localized pricing and familiar payment methods were the biggest drivers of international conversion.",
    development: "Implemented multi-currency support with real-time exchange rates, localized content for 5 languages, and integrated with international shipping carriers. Added region-specific payment gateways, automatic tax calculation, and customs documentation. Built a warehouse management module for multi-location fulfillment.",
    outcomes: "International sales now represent 45% of total revenue. Successfully launched in 12 countries with an average conversion rate of 3.2%. Customer satisfaction score for international orders is 4.6/5. Shipping times reduced by 30% through strategic warehouse placement.",
    stats: [
      { label: "International Revenue", value: "45%" },
      { label: "Countries Active", value: "12" },
      { label: "Conversion Rate", value: "3.2%" },
      { label: "Shipping Time", value: "-30%" },
    ],
    tools: ["React", "Shopify Plus", "Stripe", "i18next", "ShipStation"],
  },
  {
    id: "ecoliquidators-plus",
    title: "EcoLiquidators Plus",
    category: "Business",
    image: project1,
    url: "https://ecoliquidators.com",
    info: "Enhanced platform with real-time inventory sync, automated reporting, and CRM integration.",
    problem: "EcoLiquidators' growing business outpaced their manual processes. They needed real-time inventory synchronization across warehouses, automated financial reporting, and a CRM system to manage their expanding client base. Data silos were causing costly errors and missed opportunities.",
    research: "Mapped all business processes and identified automation opportunities. Evaluated CRM solutions (Salesforce, HubSpot, custom) and inventory management systems. Interviewed sales team and warehouse managers to understand pain points. Found that 20+ hours/week were spent on manual data entry across disconnected systems.",
    development: "Built a custom CRM integrated directly into the website with lead scoring, pipeline management, and automated follow-ups. Implemented real-time inventory sync using webhooks across 3 warehouse locations. Created automated reporting dashboards with financial summaries, inventory analytics, and sales forecasting.",
    outcomes: "Manual data entry reduced by 90%. Sales team productivity increased by 60%. Inventory accuracy improved from 85% to 99.2%. The integrated system now saves 30+ hours per week and has eliminated costly inventory discrepancies.",
    stats: [
      { label: "Manual Work Reduced", value: "90%" },
      { label: "Sales Productivity", value: "+60%" },
      { label: "Inventory Accuracy", value: "99.2%" },
      { label: "Hours Saved/Week", value: "30+" },
    ],
    tools: ["React", "Node.js", "MongoDB", "Redis", "Zapier"],
  },
];
