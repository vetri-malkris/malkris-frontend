import { Component, OnInit, OnDestroy, signal, computed, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content.html',
  styleUrls: ['./content.scss']
})
export class Content implements OnInit, OnDestroy {

  private contactService = inject(ContactService);



  // --- Services Data ---
  services = [
    { title: 'SaaS Platform', desc: 'Scalable multi-tenant cloud platforms built for performance, security, and growth.', icon: 'fas fa-cloud' },
    { title: 'Custom Software', desc: 'Tailored enterprise software designed to solve complex business challenges.', icon: 'fas fa-code' },
    { title: 'Mobile App Development', desc: 'High-performance mobile applications for iOS, Android, and cross-platform deployment.', icon: 'fas fa-mobile-screen' },
    { title: 'White-Label Solutions', desc: 'Ready-to-deploy software solutions customized for your brand.', icon: 'fas fa-tag' }
  ];
  currentServiceIndex = signal(0);
  currentService = computed(() => this.services[this.currentServiceIndex()]);
  serviceIntervalId: any;

  formSubmitted = false;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  submitForm(form: any) {
    this.formSubmitted = true;
    if (form.valid) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      this.contactService.submitForm(form.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.formSubmitted = false;
          form.resetForm();
          
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        error: (err) => {
          console.error('Form submission error', err);
          this.isSubmitting = false;
          this.submitError = true;
        }
      });
    }
  }

  // --- Projects Data ---
  projects = [
    { type: 'PLATFORM', title: 'Inventory SaaS Platform', desc: 'AI-driven stock visibility and multi-warehouse management platform.', img: 'fas fa-boxes-stacked' },
    { type: 'APPLICATION', title: 'Mobile Ordering App', desc: 'Barcode-enabled ordering and rapid checkout for retail and logistics.', img: 'fas fa-mobile-button' },
    { type: 'SYSTEM', title: 'Global Payment Gateway', desc: 'AI-powered payment infrastructure for secure, high-volume global transactions.', img: 'fas fa-credit-card' }
  ];
  currentProjectIndex = signal(0);
  currentProject = computed(() => this.projects[this.currentProjectIndex()]);
  projectIntervalId: any;

  // --- Testimonials Data ---
  testimonials = [
    { text: '“A practical solution that brought structure to our operations and supported our growth.”', author: 'Arun K., Founder, Retail Startup'},
    { text: '"Reliable, easy to use, and tailored to the way our business runs.”', author: 'Priya S., Operations Manager, SME'},
    { text: '“It simplified our workflows and gave us much better control over daily operations.”', author: 'Rahul M., Managing Director, Distribution Company' },
    { text: '“The platform scaled effortlessly as our business expanded.”', author: 'Divya R., Co-Founder, D2C Brand'},
    { text: '“Stock accuracy improved significantly and manual effort dropped right away.”', author: 'Suresh V., Warehouse Head'},
    { text: '“The reporting clarity helped us make faster and more informed decisions.”', author: 'Meena T., Finance Manager, Trading Firm'},
    { text: '“A dependable technology partner that understands long-term business needs.”', author: 'Karthik P., CEO, Growing SME'},
    { text: '“Implementation was smooth, and the benefits were visible almost immediately.”', author: 'Nisha L., Operations Lead, Healthcare Startup'},
    { text: '“Flexible and scalable—exactly what we needed for expansion.”', author: 'Vikram R., Founder, Multi-Branch Business'},
    { text: '“It added structure, efficiency, and confidence to our operations.”', author: 'Anand S., Director, Wholesale Business'}
  ];
  currentTestimonialIndex = signal(0);
  currentTestimonial = computed(() => this.testimonials[this.currentTestimonialIndex()]);
  testimonialIntervalId: any;

  // --- FAQ Data ---
  faqs = [
    { question: 'What software solutions do you build?', answer: 'We build custom web and mobile applications, SaaS platforms, ERP systems, inventory solutions, and business automation tools tailored to your operational needs.' },
    { question: 'How long does it take to launch an MVP?', answer: 'Most MVPs are ready within 6–12 weeks, depending on the scope, integrations, and level of complexity.' },
    { question: 'Do you build multi-tenant SaaS platforms?', answer: 'Yes. We design scalable multi-tenant architectures with secure data isolation, subscription management, and role-based access controls.' },
    { question: 'Will I own the source code?', answer: 'Absolutely. Once the project is completed and final payment is made, the full source code and intellectual property belong to you.' },
    { question: 'Do you provide post-launch support?', answer: 'Yes. We offer ongoing maintenance, monitoring, feature enhancements, and technical support to keep your platform running smoothly.'},
    { question: 'How much does a project typically cost?', answer: 'Costs vary based on scope and complexity. We provide transparent pricing and work with you to define a budget that meets your goals.' }
  ];
  openFaqIndex = signal<number | null>(null);

  toggleFaq(index: number) {
    this.openFaqIndex.update(prev => prev === index ? null : index);
  }

  // --- Blog Data ---
  blogPosts = [
    {
      id: 1,
      title: 'SaaS <br> Cost <br> Savings',
      icon: 'fas fa-money-bill-trend-up',
      content: `
        <h3><i class="fas fa-cloud"></i> How Cloud Software Reduces Costs and Improves Operational Efficiency</h3>
        <p>Many businesses continue to rely on spreadsheets, disconnected tools, and manual processes that increase operational costs and limit visibility.</p>
        <p>SaaS (Software as a Service) replaces this complexity with a centralized cloud platform that automates workflows, improves data accuracy, and reduces infrastructure overhead.</p>

        <h4><i class="fas fa-wallet"></i> Key Cost-Saving Benefits</h4>
        <ul>
          <li>No upfront server or hardware investment</li>
          <li>Lower maintenance and support costs</li>
          <li>Reduced manual effort through automation</li>
          <li>Real-time visibility across operations</li>
          <li>Faster implementation and upgrades</li>
          <li>Predictable subscription pricing</li>
        </ul>

        <h4><i class="fas fa-chart-line"></i> Typical Business Impact</h4>
        <p>Organizations commonly achieve:</p>
        <ul>
          <li>30–70% reduction in manual work</li>
          <li>Fewer inventory and billing errors</li>
          <li>Faster reporting and reconciliation</li>
          <li>Improved decision-making with real-time data</li>
        </ul>

        <h4><i class="fas fa-lightbulb"></i> Conclusion</h4>
        <p>SaaS helps businesses operate more efficiently while creating a scalable foundation for long-term growth.</p>
      `
    },
    {
      id: 2,
      title: 'White-Label <br> vs. <br> Custom Software',
      icon: 'fas fa-code-compare',
      content: `
        <h3><i class="fas fa-map"></i> Choosing the Right Development Approach for Your Business</h3>
        <p>When building software, businesses often choose between white-label solutions and custom development.</p>

        <h4><i class="fas fa-box-open"></i> White-Label Software</h4>
        <p>Pre-built products that can be rebranded and launched quickly.</p>
        <p><strong>Best for:</strong></p>
        <ul>
          <li>Faster time to market</li>
          <li>Lower initial investment</li>
          <li>Proven functionality</li>
        </ul>
        <p><strong>Limitations:</strong></p>
        <ul>
          <li>Limited customization</li>
          <li>Dependence on the original platform</li>
        </ul>

        <h4><i class="fas fa-pen-ruler"></i> Custom Software</h4>
        <p>Solutions designed specifically for your workflows and business requirements.</p>
        <p><strong>Best for:</strong></p>
        <ul>
          <li>Unique operational needs</li>
          <li>Competitive differentiation</li>
          <li>Long-term scalability</li>
        </ul>
        <p><strong>Limitations:</strong></p>
        <ul>
          <li>Higher upfront investment</li>
          <li>Longer development timeline</li>
        </ul>

        <h4><i class="fas fa-scale-balanced"></i> Which Option Is Right?</h4>
        <p>Choose white-label if speed matters most.</p>
        <p>Choose custom software if strategic flexibility and ownership are more important.</p>
      `
    },
    {
      id: 3,
      title: 'Why <br> Software <br> Projects Fail',
      icon: 'fas fa-triangle-exclamation',
      content: `
        <h3><i class="fas fa-circle-exclamation"></i> Common Pitfalls and How to Avoid Them</h3>
        <p>Software projects rarely fail because of technology alone. Most failures result from poor planning, unclear requirements, and weak execution.</p>

        <h4><i class="fas fa-list-ul"></i> Common Reasons Projects Fail</h4>
        <ul>
          <li>Undefined business objectives</li>
          <li>Scope changes without control</li>
          <li>Poor communication</li>
          <li>Lack of user involvement</li>
          <li>Inadequate testing</li>
          <li>No post-launch support plan</li>
        </ul>

        <h4><i class="fas fa-shield-halved"></i> How to Prevent Failure</h4>
        <ul>
          <li>Start with clear requirements</li>
          <li>Build an MVP first</li>
          <li>Validate continuously</li>
          <li>Maintain structured project governance</li>
          <li>Plan for long-term support</li>
        </ul>

        <h4><i class="fas fa-flag-checkered"></i> Conclusion</h4>
        <p>Successful software projects combine business clarity, disciplined execution, and a scalable technical architecture.</p>
      `
    }
  ];

  selectedBlog = signal<any | null>(null);

  openBlog(blog: any) {
    this.selectedBlog.set(blog);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  closeBlog() {
    this.selectedBlog.set(null);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  ngOnInit(): void {
    this.startServiceSlider();
    this.startProjectSlider();
    this.startTestimonialSlider();
  }

  // --- Service Methods ---
  startServiceSlider() {
    this.serviceIntervalId = setInterval(() => this.nextService(), 4000);
  }
  nextService() {
    const next = this.currentServiceIndex() + 1;
    this.currentServiceIndex.set(next >= this.services.length ? 0 : next);
  }
  setService(index: number) {
    clearInterval(this.serviceIntervalId);
    this.currentServiceIndex.set(index);
    this.serviceIntervalId = setInterval(() => this.nextService(), 4000);
  }


  // --- Project Methods ---
  startProjectSlider() {
    this.projectIntervalId = setInterval(() => this.nextProject(), 4000);
  }
  nextProject() {
    const next = this.currentProjectIndex() + 1;
    this.currentProjectIndex.set(next >= this.projects.length ? 0 : next);
  }
  setProject(index: number) {
    clearInterval(this.projectIntervalId);
    this.currentProjectIndex.set(index);
    this.projectIntervalId = setInterval(() => this.nextProject(), 4000);
  }
  

  // --- Testimonial Methods ---
  startTestimonialSlider() {
    this.testimonialIntervalId = setInterval(() => this.nextTestimonial(), 5000);
  }
  nextTestimonial() {
    const next = this.currentTestimonialIndex() + 1;
    this.currentTestimonialIndex.set(next >= this.testimonials.length ? 0 : next);
  }
  prevTestimonial() {
    const prev = this.currentTestimonialIndex() - 1;
    this.currentTestimonialIndex.set(prev < 0 ? this.testimonials.length - 1 : prev);
  }
  manualTestimonial(direction: 'next'|'prev') {
    clearInterval(this.testimonialIntervalId);
    direction === 'next' ? this.nextTestimonial() : this.prevTestimonial();
    this.testimonialIntervalId = setInterval(() => this.nextTestimonial(), 5000);
  }
  

  

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'auto'
      });
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.serviceIntervalId);
    clearInterval(this.projectIntervalId);
    clearInterval(this.testimonialIntervalId);
  }
}
