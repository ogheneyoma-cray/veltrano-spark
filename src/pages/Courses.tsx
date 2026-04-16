import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionLabel from "@/components/SectionLabel";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, ChevronDown, ChevronUp, ShoppingCart, Check } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const courses = [
  {
    id: 1, title: "Full-Stack Web Development Bootcamp", price: 299, category: "Web Development", level: "Beginner",
    short: "From zero to full-stack developer. A comprehensive programme covering frontend and backend technologies with three real deployable projects.",
    full: "The Veltrano Full-Stack Web Development Bootcamp is a structured, project-based journey from the fundamentals of HTML and CSS through to building and deploying production-ready applications using a modern full-stack architecture. You will learn to build responsive frontends with React, build server-side applications with Node.js and Express, work with PostgreSQL and MongoDB, and deploy to the cloud. Every module builds toward a portfolio project.",
    learns: ["HTML5, CSS3, and responsive web design", "JavaScript — fundamentals through ES6+ and async programming", "React — components, hooks, state management, and routing", "Node.js and Express — building RESTful APIs", "Database design with PostgreSQL and MongoDB", "Authentication, security, and cloud deployment", "Version control with Git and GitHub"],
    duration: "Self-paced — estimated 120 hours | Lifetime Access | Certificate on Completion",
  },
  {
    id: 2, title: "React & Modern JavaScript", price: 149, category: "Web Development", level: "Intermediate",
    short: "An intermediate-level course mastering React and modern JavaScript for developers ready to level up their frontend skills.",
    full: "React is the dominant frontend framework in professional web development. This focused course takes you beyond the basics — covering advanced React patterns, custom hooks, Redux Toolkit, performance optimisation, and TypeScript fundamentals. Build three substantial React applications and gain the confidence to contribute to professional codebases from day one.",
    learns: ["Advanced React patterns and custom hooks", "State management with Redux Toolkit and Context API", "React Router for multi-page architectures", "Testing with Jest and React Testing Library", "TypeScript fundamentals for React developers", "Performance optimisation — memoisation, lazy loading, code splitting"],
    duration: "Self-paced — estimated 60 hours | Lifetime Access | Certificate on Completion",
  },
  {
    id: 3, title: "Python for Data Analysis", price: 179, category: "Data & Analytics", level: "Beginner",
    short: "A practical, project-driven course covering Python, Pandas, NumPy, and data visualisation for aspiring data analysts and business professionals.",
    full: "Data analysis with Python is one of the most in-demand skill sets in the modern workplace. Starting from Python fundamentals and progressing to advanced data manipulation, statistical analysis, and professional-grade visualisation, you will work with real datasets drawn from business and finance contexts throughout. The course culminates in a full capstone analysis project — exactly the kind of work expected in a data analyst role.",
    learns: ["Python fundamentals for data professionals", "Data manipulation with Pandas — cleaning, transforming, and aggregating", "Numerical computing with NumPy", "Data visualisation with Matplotlib and Seaborn", "Exploratory data analysis methodology", "SQL integration and database access from Python", "Capstone project — end-to-end data analysis and reporting"],
    duration: "Self-paced — estimated 70 hours | Lifetime Access | Certificate on Completion",
  },
  {
    id: 4, title: "Ethical Hacking & Penetration Testing", price: 199, category: "Cybersecurity", level: "Intermediate",
    short: "A hands-on penetration testing course covering the full attack lifecycle. Practical, lab-based, and mapped to CompTIA PenTest+ and CEH frameworks.",
    full: "This course teaches you to approach security from the attacker's perspective — systematically identifying, exploiting, and documenting vulnerabilities in a controlled lab environment. Every concept is taught through hands-on labs using real tools and techniques. Curriculum is mapped to CompTIA PenTest+ and CEH certification frameworks. Comes with access to the Veltrano virtual lab environment — no additional software purchases required.",
    learns: ["Reconnaissance and OSINT techniques", "Network scanning and enumeration with Nmap and Nessus", "Exploitation with Metasploit", "Web application attacks — SQL injection, XSS, CSRF", "Password attacks and privilege escalation", "Post-exploitation and lateral movement", "Professional penetration testing report writing"],
    duration: "Self-paced — estimated 80 hours | Virtual Lab Access Included | Certificate on Completion",
  },
  {
    id: 5, title: "Complete Digital Marketing Masterclass", price: 159, category: "Digital Marketing", level: "Beginner",
    short: "Every channel, every tactic — one complete digital marketing education covering SEO, paid ads, social media, email, and analytics.",
    full: "This course cuts through the overwhelming landscape of digital marketing with a structured, practical approach. From SEO and paid advertising to email automation and Google Analytics 4, you will develop a complete working knowledge of the modern digital marketing toolkit. Every module includes real campaign examples, immediately usable templates, and exercises that produce actual portfolio-ready work.",
    learns: ["SEO — keyword research, on-page, link building, and technical SEO", "Google Ads — search, display, and shopping campaigns", "Meta Ads — Facebook and Instagram strategy and execution", "Content marketing strategy and editorial planning", "Email marketing and automation", "Social media marketing — organic strategy across platforms", "Google Analytics 4 — tracking, reporting, and insight"],
    duration: "Self-paced — estimated 65 hours | Lifetime Access | Certificate on Completion",
  },
  {
    id: 6, title: "UI/UX Design Fundamentals to Professional", price: 189, category: "UI/UX Design", level: "Beginner",
    short: "A complete beginner-to-job-ready UI/UX design course in Figma. Five portfolio projects included.",
    full: "This course teaches you to approach digital product design the way professionals do — starting with user needs, building evidence-based solutions, and communicating design decisions to stakeholders and developers. You will work entirely in Figma and build five portfolio projects.",
    learns: ["Design thinking and human-centred design process", "User research — interviews, surveys, and usability testing", "Information architecture and user flow mapping", "Wireframing and low-fidelity prototyping", "Visual design principles — typography, colour, spacing, and hierarchy", "High-fidelity UI design and interactive prototyping in Figma", "Design systems and component libraries", "Presenting and communicating design decisions to stakeholders"],
    duration: "Self-paced — estimated 90 hours | Lifetime Access | Certificate on Completion",
  },
];

const filters = ["All Courses", "Web Development", "Data & Analytics", "Cybersecurity", "Digital Marketing", "UI/UX Design", "Beginner", "Intermediate", "Advanced"];

const faqs = [
  { q: "Do I need prior experience to enrol?", a: "Most courses include beginner-friendly pathways. Each course page clearly states the recommended starting point. If you are unsure, email us and we will help you find the right course." },
  { q: "How long do I have access?", a: "Every Veltrano course comes with lifetime access, including all future curriculum updates. Learn at whatever pace suits your life." },
  { q: "Will I receive a certificate?", a: "Yes. Every course includes a Veltrano Technologies certificate of completion, issued once you finish all modules and required assessments. Certificates can be shared directly to LinkedIn." },
  { q: "What is your refund policy?", a: "We offer a 14-day satisfaction guarantee. If you have completed less than 20% of the course and are not satisfied within 14 days of enrolment, contact us for a full refund. Please see our Refund Policy for full details." },
  { q: "Can I access courses on mobile?", a: "Yes. The Veltrano platform is fully responsive and optimised for mobile and tablet. Stream lessons and access materials from any device, anywhere." },
  { q: "Is there instructor support?", a: "Yes. Every course includes access to the Veltrano learner community where instructors and fellow learners are active throughout the week." },
];

const CourseCard = ({ course }: { course: typeof courses[0] }) => {
  const [expanded, setExpanded] = useState(false);
  const { formatPrice } = useCurrency();
  const { addItem, isInCart } = useCart();
  const { toast } = useToast();
  const inCart = isInCart(course.id);

  const handleAdd = () => {
    if (inCart) return;
    addItem({ id: course.id, title: course.title, price: course.price });
    toast({ title: "Added to cart", description: `${course.title} has been added to your cart.` });
  };

  return (
    <div className="glass-card rounded-lg p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">{course.category}</span>
        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">{course.level}</span>
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-2">{course.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{course.short}</p>

      {expanded && (
        <div className="mb-4 space-y-3 animate-in fade-in duration-200">
          <p className="text-sm text-muted-foreground leading-relaxed">{course.full}</p>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">What You Will Learn:</h4>
            <ul className="space-y-1">
              {course.learns.map((l, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary shrink-0">•</span>{l}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-muted-foreground">{course.duration}</p>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs text-primary hover:underline mb-4 flex items-center gap-1 w-fit"
      >
        {expanded ? <>Show Less <ChevronUp className="h-3 w-3" /></> : <>View Details <ChevronDown className="h-3 w-3" /></>}
      </button>

      <div className="mt-auto flex gap-2">
        <Button className="flex-1" size="sm" onClick={handleAdd} disabled={inCart} variant={inCart ? "secondary" : "default"}>
          {inCart ? (
            <><Check className="mr-1.5 h-3.5 w-3.5" /> In Cart</>
          ) : (
            <>Enrol Now — {formatPrice(course.price)} <ArrowRight className="ml-2 h-3.5 w-3.5" /></>
          )}
        </Button>
        {inCart && (
          <Button asChild size="sm" variant="outline">
            <Link to="/checkout">Checkout</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

const Courses = () => {
  const [active, setActive] = useState("All Courses");

  const filtered = courses.filter((c) => {
    if (active === "All Courses") return true;
    return c.category === active || c.level === active;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-20 grid-pattern hero-glow">
        <div className="container text-center max-w-4xl">
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
            Professional Digital Courses Built for Real Career Outcomes<span className="text-primary">.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every Veltrano Technologies course is built around what the industry actually requires — practical, current, and delivered by professionals who know the field from the inside.
          </p>
        </div>
      </section>

      {/* Filter + Courses */}
      <section className="section-gap">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`text-xs font-medium px-4 py-2 rounded-full border transition-all duration-200 ${
                  active === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-gap border-t border-border/50">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card rounded-lg px-6 border-none">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-gap border-t border-border/50 hero-glow">
        <div className="container text-center max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Find Your Course and Start Building Something Real.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Browse the Veltrano Technologies catalogue, find the course that matches where you want to go, and start learning today. Your first lesson is available the moment you enrol.
          </p>
          <Button size="lg" className="text-base px-8 mb-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Browse All Courses <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-sm text-muted-foreground">
            Not sure where to start? Email us —{" "}
            <a href="mailto:contact@veltranomtechnologies.com" className="text-primary hover:underline">contact@veltranomtechnologies.com</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
