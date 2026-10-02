export const MARQUEE_ITEMS = ["Stripe", "PayPal", "Wise", "Xero", "CSV export", "30 currencies"];

export const FEATURES = [
  {
    id: "quick-invoices",
    colour: "pink",
    title: "Quick invoices",
    body: "Client, amount, send. A clean PDF and a pay link in under a minute — tax lines worked out for you.",
  },
  {
    id: "reminders",
    colour: "blue",
    title: "Automatic reminders",
    body: "Polite nudges go out before, on and after the due date, from your name. They stop the second you're paid.",
  },
  {
    id: "client-portal",
    colour: "green",
    title: "Client portal",
    body: "One private link per client with every invoice, receipt and quote. They pay and download without emailing you.",
  },
] as const;

export const STEPS = [
  { title: "Add a client", body: "Name and email. Stackd remembers their address, currency and tax rate." },
  { title: "Send the invoice", body: "Pick a template, add lines, hit send. They get an email with a pay button." },
  { title: "Get paid", body: "Card, PayPal or bank transfer. Money lands with your processor, not with us." },
];

export const TESTIMONIALS = [
  {
    quote: "I used to spend Sunday night chasing invoices. Now the reminders do it and I just watch the paid badges turn green.",
    name: "Priya Raman",
    role: "Brand designer, Leeds",
    colour: "yellow",
    rotate: -1.5,
  },
  {
    quote: "Hooked it up to Stripe in about four minutes. Clients pay by card from the email. That's the whole review.",
    name: "Tom Okafor",
    role: "Freelance developer",
    colour: "pink",
    rotate: 1.5,
  },
  {
    quote: "The client portal killed the 'can you resend that invoice?' email. Our clients actually comment on how good it looks.",
    name: "Marta & Jonas",
    role: "Two-person studio, Berlin",
    colour: "cream",
    rotate: -1,
  },
  {
    quote: "I recommend it to my sole-trader clients because the CSV export is clean. Columns I need, nothing I don't.",
    name: "Helen Achterberg",
    role: "Chartered accountant",
    colour: "green",
    rotate: 2,
  },
  {
    quote: "Swapped from a spreadsheet. Same price as free once you count the late payments it got me.",
    name: "Sam Whitlock",
    role: "Illustrator",
    colour: "white",
    rotate: -2,
  },
] as const;

export const HOME_FAQ = [
  {
    q: "Is my clients' payment data safe?",
    a: "Card and bank details go straight to Stripe, PayPal or Wise and never touch our servers. Everything we do store is encrypted in transit (TLS 1.2+) and at rest (AES-256), and hosted in the EU.",
  },
  {
    q: "Does it work with Stripe?",
    a: "Yes. Connect your Stripe account in two clicks and every invoice gets a card payment link. PayPal and Wise work the same way on paid plans.",
  },
  {
    q: "What happens after the 14-day trial?",
    a: "You choose a plan or drop to Free, which keeps 3 clients and 5 invoices a month forever. We never charge you without asking, and the trial needs no card.",
  },
  {
    q: "Can I get my data out?",
    a: "Any time, on every plan: invoices as PDF, line items and payments as CSV, or the whole account as JSON. If you leave, it all comes with you.",
  },
  {
    q: "I already use a spreadsheet. Why switch?",
    a: "A spreadsheet doesn't send reminders, take card payments or notice when you're paid. Most people get one late invoice paid sooner and the subscription has covered itself.",
  },
];
